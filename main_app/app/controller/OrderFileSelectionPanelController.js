Ext.define('YBase.controller.OrderFileSelectionPanelController', {
    extend: 'Ext.app.Controller', 

    refs:[
        {
            ref: 'orderFileSelectionPanel',
            selector: 'orderFileSelectionPanel'
        },
    ], 
    
    requires:[
        // 'YBase.utility.ButtonHelper'
    ],
    absCmp:null,
    // ButtonHelper:YBase.utility.ButtonHelper,
    msgCmp: null,
    onOrderFileSelectionPanelBeforerender : function(absCmp) {
        Ext.EventManager.un(window, "beforeunload",this.onOrderFileSelectionPanelClose, this);
        Ext.EventManager.on(window, "beforeunload",this.onOrderFileSelectionPanelClose, this);
        var me = this,
            winOpener = window.opener;
        winOpener.popupWin = window;
        absCmp.entryPnl = winOpener.absCmp;
        me.absCmp = absCmp;
	    me.languageImplementation(absCmp);
        me.renderDataview();
        me.setSaveBtnDisable(absCmp,true);
        Ext.ComponentQuery.query('displayfield[itemId=entryCodeDisplayFld]')[0].setValue(absCmp.params.entry_code);
        Ext.msk.hide();
    },
    onOrderFileSelectionPanelClose: function() {
        window.opener.controller.popupWin = null; 
    },
    languageImplementation: function(absCmp) {
        var lang = Ext.LANG,
            globalLang = lang.globalLang,
            orderFileSelectionLang = lang.orderFileSelection;
        absCmp.query('button[itemId=btnSave]')[0].setText(globalLang.buttons.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(globalLang.buttons.btnCancel);
        
        absCmp.query('panel[itemId=fileListPnl]')[0].setTitle(orderFileSelectionLang.fileListPnl);
        // absCmp.query('panel[itemId=selectedFileListPnl]')[0].setTitle(orderFileSelectionLang.selectedFileListPnl);
        // absCmp.query('panel[itemId=filePreviewPnl]')[0].setTitle(orderFileSelectionLang.filePreviewPnl);
    },
    renderDataview : function() {
        var me = this,
            absCmp = me.absCmp,
            fileListView = absCmp.query('dataview[itemId=fileListView]')[0],
            selectedFileListView = absCmp.query('dataview[itemId=selectedFileListView]')[0],
            screenFormComponents = JSON.parse(localStorage.getItem('entryPanelFormComponents')),
            appFileConfig = screenFormComponents.screen_components.app_file,
            storeParamObj = {
                storeId     : 'selectedFileListView_store',
                fields      : appFileConfig.fields,
                storeUrl    : appFileConfig.datagrid_info.store_url,
                extra_params: {'datagrid_id': appFileConfig.datagrid_info.datagrid_id,'ref_record_id': absCmp.params.entry_code},
                pageSize    : appFileConfig.page_size,
                autoLoad    : false,
                validation  : null,
                idProperty  : null
            };
        me.getTpl(fileListView);
        
        selectedStore = YBase.utility.GridHelper.createStore(storeParamObj);
        selectedFileListView.bindStore(selectedStore);
        me.getTpl(selectedFileListView);
        
        fileListView.getStore().load();
        selectedStore.on('datachanged',function(store) {
            if(store.count() > 0){
                me.setSaveBtnDisable(absCmp,false);
            }
        },me);
        selectedStore.load();

    },
    getTpl: function(dataview) {
        var tpl;
        if(dataview.itemId == 'fileListView'){
            tpl = new Ext.XTemplate(
                '<tpl for=".">',
                '   <div class="fileListSelector-div">',
                '       <span class="view_file">{original_file_name}</span>',
                '       <span class="move_right"></span>',
                '   </div>',
                '</tpl>'
            );
        }
        else if(dataview.itemId == 'selectedFileListView'){
            tpl = new Ext.XTemplate(
                '<tpl for=".">',
                '   <div class="fileListSelector-div"  style="float: left;display: inline-block;">',
                '       <span class="view_file">{original_file_name}</span>',
                '       <span class="remove"> [X] </span>',
                '   </div>',
                '</tpl>'
            );
        }
        dataview.itemSelector = 'div.fileListSelector-div';
        dataview.tpl = tpl;
    },
    createStore : function(dataviewId,store_url) {
        var store = Ext.create('Ext.data.Store',{
                autoLoad: false,
                model: 'YBase.model.FileListModel',
                storeId: dataviewId + '_store',
                proxy: {
                    type: 'ajax',
                    url: store_url,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            });
        return store;
    },
    moveFile: function(actionType,record,fileListStore,selectedViewStore) {
        var me = this,
            absCmp = me.absCmp,
            ref_record_id = absCmp.params.entry_code;
        
        Ext.Ajax.request({
            url : 'bizlayer/file/moveFile',
            params: {filename : record.data.file_name,actionType: actionType,ref_record_id: ref_record_id},
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var movedRec = JSON.parse(JSON.stringify(record.data)),
                        file_name = actionType == 'completedToNew' ? record.data.original_file_name : record.data.file_name;

                    movedRec['src'] = 'bizlayer/file/renderFile?filename='+file_name;
                    if(actionType == "newToTemp"){
                        selectedViewStore.add(movedRec);
                        fileListStore.remove(record);
                    }
                    else{
                        if(actionType == 'completedToNew'){
                            movedRec['file_name'] = file_name;    
                        }
                        record.set('delete_flg',1);
                        selectedViewStore.remove(record);
                        fileListStore.add(movedRec);
                    }
                }
                else{
                    Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.fileNotFound);   
                }
            }
        });
    },
    transferToSelectedView: function(absCmp,fileListStore,record) {
        var me = this,
            selectedFileListView = absCmp.query('dataview[itemId=selectedFileListView]')[0],
            selectedViewStore = selectedFileListView.getStore();
        me.moveFile('newToTemp',record,fileListStore,selectedViewStore);
    },
    onDataviewItemClick: function(view,record,item,index,e) {
        var me = this,
            absCmp = me.absCmp,
            itemId = view.itemId
            store = view.getStore();
        if(itemId=='fileListView'){
            if(e.getTarget('.move_right')){
                me.transferToSelectedView(absCmp,store,record);
            }
            else if(e.getTarget('.view_file')){
                me.reCreateFileViewerCmp(absCmp,record,'new');
            }
        }
        else if(itemId == 'selectedFileListView'){
            if(e.getTarget('.remove')){
                var fileListView = absCmp.query('dataview[itemId=fileListView]')[0],
                    fileListStore = fileListView.getStore(),
                    type;
                
                if(Ext.isEmpty(record.data.file_id)){
                    type = 'tempToNew';
                }
                else{
                    type = 'completedToNew';
                }
                me.moveFile(type,record,fileListStore,store);
                // fileLisStore.add(movedRec);
            }
            else if(e.getTarget('.view_file')){
                var type = Ext.isEmpty(record.data.file_id) ? 'selected' : 'completed';
                me.reCreateFileViewerCmp(absCmp,record,type);
            }
        }
    },
    reCreateFileViewerCmp: function(absCmp,record,type) {
        if(Ext.isEmpty(type))
            type = 'new';

        var me = this,
            fileViewerCmp = absCmp.query('component[itemId=fileViewerCmp]')[0],
            ref_record_id = type == "new" ? null : absCmp.params.entry_code,
            url = !Ext.isEmpty(record.raw.src) ? record.raw.src : 'bizlayer/file/renderFile?filename='+record.data.file_name;
            src = url+'&type='+type+'&ref_record_id='+ref_record_id,
            html = Ext.String.format("<iframe id='file-iframe' src='{0}' style='height: 100%; width: 100%; border: none'></iframe>",src);
        fileViewerCmp.update(html);

        $('#file-iframe').load(function() {
            var css = '<link href="'+Ext.APP_URL+'css/customIframe.css" rel="stylesheet" />';
            $('#file-iframe').contents().find("head").append(css);
            
        });
    },
    onBtnSaveClick: function(btn) {
        var me = this,
            absCmp = me.absCmp,
            entryPnl =  window.opener.Ext.bodyTab.getActiveTab(),//window.opener.controller.absCmp
            selectedFileListView = absCmp.query('dataview[itemId=selectedFileListView]')[0],
            selectedViewStore = selectedFileListView.getStore(),
            newRecords = selectedViewStore.getRange(),
            deletedRecords = selectedViewStore.getRemovedRecords(),
            modifiedRecords = newRecords.concat(deletedRecords),
            orderFileRecords = [],
            orderFileStore = null;
            if(!Ext.isEmpty(entryPnl)){
                if(entryPnl.customItemId=='EntryPanel'){
                    var orderFileDataView = entryPnl.query('dataview[itemId=orderFileDataView]')[0];
                    orderFileStore = orderFileDataView.getStore();
                    
                }
            }
        // newRecords = selectedViewStore.getNewRecords(),
            
        for(var i=0;i<modifiedRecords.length;i++){
            orderFileRecords.push(modifiedRecords[i].data);
        }

        var params = {};
        params['ref_record_id'] = absCmp.params.entry_code;
        params['data'] = JSON.stringify(orderFileRecords);
        Ext.Ajax.request({
            url : 'bizlayer/file/saveFile',
            params : params,
            method: 'POST',
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    me.setSaveBtnDisable(absCmp,true);
                    selectedViewStore.reload();
                    if(!Ext.isEmpty(orderFileStore))
                        orderFileStore.getProxy().extraParams = {'datagrid_id':14,'ref_record_id':absCmp.params.entry_code};
                    orderFileStore.load();
                    // window.close();    
                }
                else{
                    Ext.Msg.show({
                        title : Ext.LANG.globalLang.app.appTitle,
                        msg   : Ext.LANG.globalLang.errorMsg.fileSelectionSaveFailed,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }    
            },
        });
    },
    onBtnCancelClick: function(btn) {
        window.close();
    },
    onPanelRefreshClick: function(tool) {
        var me = this,
            absCmp = me.absCmp,
            dataview = absCmp.query('dataview[itemId=fileListView]')[0],
            store;

        if(!Ext.isEmpty(dataview)){
            store = dataview.getStore();
            store.reload();
        }
    },
    setSaveBtnDisable: function(absCmp,disable) {
        absCmp.query('button[itemId=btnSave]')[0].setDisabled(disable);    
    },
    onBtnProceedClick: function() {
        var me = this,
            absCmp = me.absCmp,
            fileListView = absCmp.query('dataview[itemId=fileListView]')[0],
            fileListStore = fileListView.getStore(),
            selModel = fileListView.getSelectionModel(),
            record = selModel.getSelection()[0];
        me.transferToSelectedView(absCmp,fileListStore,record);
    },
    reRoute: function(route,entry_code) {
        Ext.Router.redirect(route);
        this.applyRerouteChange(entry_code);
    },
    applyRerouteChange : function(entry_code) {
        var me = this,
            absCmp = me.absCmp,
            fileListView = absCmp.query('dataview[itemId=fileListView]')[0],
            fileListStore = fileListView.getStore(),
            selectedFileListView = absCmp.query('dataview[itemId=selectedFileListView]')[0],
            selectedViewStore = selectedFileListView.getStore(),
            fileViewerCmp = absCmp.query('component[itemId=fileViewerCmp]')[0],
            html = '';
        fileListStore.load();
        absCmp.params.entry_code = entry_code;
        selectedViewStore.getProxy().extraParams['ref_record_id'] = entry_code;
        selectedViewStore.load();
        Ext.ComponentQuery.query('displayfield[itemId=entryCodeDisplayFld]')[0].setValue(entry_code);
        me.setSaveBtnDisable(absCmp,true);  

        fileViewerCmp.update(html);
    },
    init: function(application) {
        var me=this;

        me.control({
            "orderFileSelectionPanel":{
                'beforerender' : me.onOrderFileSelectionPanelBeforerender,
            },
            "orderFileSelectionPanel dataview":{
                'itemclick' : me.onDataviewItemClick,
            },
            "orderFileSelectionPanel button[itemId=btnSave]":{
                'click' : me.onBtnSaveClick,
            },
            "orderFileSelectionPanel button[itemId=btnProceed]":{
                'click' : me.onBtnProceedClick,
            },
            "orderFileSelectionPanel button[itemId=btnCancel]":{
                'click' : me.onBtnCancelClick,
            },
            "orderFileSelectionPanel tool[type=refresh]":{
                click:me.onPanelRefreshClick
            }

        });
    }
});