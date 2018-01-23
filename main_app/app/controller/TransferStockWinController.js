Ext.define('YBase.controller.TransferStockWinController', {
    extend: 'Ext.app.Controller',
    id: 'TransferStockWinController',
    abstractcomponent:null,
    refs:[
        {
            ref: 'transferStockWindow',
            selector: 'transferStockWindow'
        }
    ],
    languageImplementation: function(){
        var me=this,
            lang=Ext.LANG,
            stockTransferWindow = me.getTransferStockWindow(),
            globalLang=lang.globalLang;
        stockTransferWindow.query('button[itemId=btnTransferToEntryGrid]')[0].setText(globalLang.buttons.btnSave);
        // abstractcomponent.setTitle(companyListLang.WinTitle);
        // abstractcomponent.query('button[itemId=btnNewCompany]')[0].setText(companyListLang.btnNewCompany);
        // abstractcomponent.query('button[itemId=btnSaveCompany]')[0].setText(companyListLang.btnSaveCompany);
        // abstractcomponent.query('button[itemId=btnMasterCsvDwnld]')[0].setText(companyListLang.btnCsvDwnld);
        // abstractcomponent.query('menuitem[itemId=menuSelectedRecords]')[0].setText(companyListLang.menuSelectedRecords);
        // abstractcomponent.query('menuitem[itemId=menuAllRecords]')[0].setText(companyListLang.menuAllRecords);
        // abstractcomponent.query('button[itemId=btnAddBranch]')[0].setText(companyListLang.btnAddBranch);
        // abstractcomponent.query('button[itemId=btnSaveBranch]')[0].setText(companyListLang.btnSaveBranch);
        // abstractcomponent.query('button[itemId=btnCsvDwnld]')[0].setText(companyListLang.btnCsvDwnld);
        // abstractcomponent.query('menuitem[itemId=menuDetailSelectedRecords]')[0].setText(companyListLang.menuDetailSelectedRecords);
        // abstractcomponent.query('menuitem[itemId=menuDetailAllRecords]')[0].setText(companyListLang.menuDetailAllRecords);
    },

    onTransferProdMasterGridCntBeforeRender : function(gridCnt, eOpts){
        var me = this,
            win = gridCnt.up('window');
        me.gridCnt = gridCnt;
        me.gridCnt.removeAll();
        me.addGridCntProperty();
        me.loadGrid(me,win);
        me.languageImplementation();
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 16;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'transferProdMasterGrid';   
        me.gridCnt.addTempSearch      = 0;
        me.gridCnt.showSaveMsg        = false;
        me.gridCnt.storeLoadOnSave    = false;
        me.gridCnt.createMsgCmp       = false;
        me.gridCnt.hideHeaderFilter   = true
        if(!Ext.CURRENT_USER.is_super_user) 
            me.gridCnt.addDatagridTemplate= 0;
        else 
            me.gridCnt.addDatagridTemplate= 1; 
    },
    loadGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        /*if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }*/
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;
        if(!Ext.isEmpty(me.gridCnt.addSearchCmp) &&  me.gridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        if(!Ext.isEmpty(me.gridCnt.addDatagridTemplate)) {
            params['get_template_list'] = me.gridCnt.addDatagridTemplate;
            if(delStatus != null) {
                // YBase.utility.GridHelper.getFieldTemplateName(me, me.gridCnt.gridNo);
                YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        if(!Ext.isEmpty(me.gridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.gridCnt.addTempSearch;
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.gridCnt.gridNo;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/transferStockWin/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.gridCnt.responseObj    = resp;
                    me.gridCnt.templateId     = resp.templateId;
                    me.gridCnt.templateList   = resp.templateList;
                    me.gridCnt.searchList     = resp.searchList;
                    me.gridCnt.synctime       = resp.synctime;
                   // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize'      : pageSize, 
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'newTransferMasterJSON', 
                            'storeUrl'      : 'bizlayer/transferStockWin/list', 
                            // 'create'        : 'bizlayer/transferStockWin/crud', 
                            // 'destroy'       : 'bizlayer/transferStockWin/crud', 
                            'extra_params'  : {'synctime':me.gridCnt.synctime,'datagrid_id':me.gridCnt.gridNo}, 
                            'writeAllFields': false,
                            'editable'      : true,
                            'idProperty'    : '',
                            'forceSubmitFields' : ['column_6_01','ext_id']
                        };
                    me.gridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.gridCnt.responseObj,
                            'gridCnt'               : me.gridCnt,
                            'gridStore'             : me.gridCnt.gridStore, 
                            'gridItemId'            : me.gridCnt.gridItemId,
                            'addDatagridTemplate'   : me.gridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'loadMask'              : true,
                            'setTemplateId'         : me.gridCnt.templateId,
                            'templateList'          : me.gridCnt.templateList,
                            'searchList'            : me.gridCnt.searchList,
                            'addTempSearch'         : me.gridCnt.addTempSearch,
                            'createMsgCmp'          : me.gridCnt.createMsgCmp,
                            'actionRenderer'        : me.detailLinkRenderer,
                            'hideHeaderFilterButtons': me.gridCnt.hideHeaderFilter
                        };
                    me.gridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    var product_no      = me.gridCnt.grid.query('gridcolumn[dataIndex=column_5_04]')[0],
                        product_code    = me.gridCnt.grid.query('gridcolumn[dataIndex=column_5_05]')[0],
                        product_type    = me.gridCnt.grid.query('gridcolumn[dataIndex=column_5_06]')[0],
                        product_name    = me.gridCnt.grid.query('gridcolumn[dataIndex=column_5_07]')[0],
                        product_label   = me.gridCnt.grid.query('gridcolumn[dataIndex=column_5_08]')[0];
                    
                    if(!Ext.isEmpty(product_code)){
                        product_code.renderer = me.productCodeRenderer;
                        me.gridCnt.grid.productCodeColValue = null;
                        me.gridCnt.grid.productCodeColChanged = null;
                    }
                    if(!Ext.isEmpty(product_no)){
                        product_no.renderer = me.productCodeDependentProductNoRenderer;
                        me.gridCnt.grid.productNoColValue = null;
                    }
                    if(!Ext.isEmpty(product_type)){
                        product_type.renderer = me.productCodeDependentProductTypeRenderer;
                        me.gridCnt.grid.productTypeColValue = null;
                    }
                    if(!Ext.isEmpty(product_name)){
                        product_name.renderer = me.productCodeDependentProductNameRenderer;
                        me.gridCnt.grid.productNameColValue = null;
                    }
                    if(!Ext.isEmpty(product_label)){
                        product_label.renderer = me.productCodeDependentProductLabelRenderer;
                        me.gridCnt.grid.productLabelColValue = null;
                    }
                    me.gridCnt.grid.on("selectionchange",me.onTransferProdMasterSelectionChange,me);
                    me.gridCnt.gridStore.loadRawData(resp);
                    // me.loadEntryDetailGridRecords();

                }
            }
        });
    },
    productCodeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var me=this;
        if(me.productCodeColValue==null){
            me.productCodeColValue=value;
            me.productCodeColChanged=true;
            return value;
        }
        else if(me.productCodeColValue==value){
            me.productCodeColChanged=false;
            return '<div></div>';
        }else{
            me.productCodeColValue=value;
            me.productCodeColChanged=true;
            return value;
        }
    },
    productCodeDependentProductNoRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var me=this;
        if(me.productCodeColChanged==false){
            return '<div></div>';
        }
        else{
            return value;
        }
    },
    productCodeDependentProductTypeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var me=this;
        if(me.productCodeColChanged==false){
            return '<div></div>';
        }
        else{
            return value;
        }
    },
    productCodeDependentProductNameRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var me=this;
        if(me.productCodeColChanged==false){
            return '<div></div>';
        }
        else{
            return value;
        }
    },
    productCodeDependentProductLabelRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var me=this;
        if(me.productCodeColChanged==false){
            return '<div></div>';
        }
        else{
            return value;
        }
    },
    onTransferProdMasterSelectionChange:function(transferProdMasterGrid, selected, eOpts){
        var me                          = this,
            grid                        = transferProdMasterGrid,
            selectedRecords             = grid.getSelection(),
            win                         = me.getTransferStockWindow(),
            transferProdDetailGrid      = win.query('grid[itemId=transferProdDetailGrid]')[0],
            mapperArr       = YBase.utility.DataMapperHelper.getStockTransferMasterToStockTransferDetailMapper;
            transferProdDetailGrid.store.removeAll();
            for (var i=0; i<selectedRecords.length; i++){
                var row = Ext.create(transferProdDetailGrid.store.model);
                for(var key in mapperArr){
                    row.set(key,selectedRecords[i].get(mapperArr[key]));
                }
                transferProdDetailGrid.store.insert(i,row);
            }
    },
     onTransferProdMasterGridAfterRender : function(detailGridCnt, eOpts){
        var me = this,
            win = detailGridCnt.up('window'),
            detailGridCnt = win.query('container[itemId=transferProdDetailGridCnt]')[0];
        me.detailGridCnt = detailGridCnt;
        me.detailGridCnt.removeAll();
        me.adddetailGridCntProperty();
        me.loadDetailGrid(me,win);
    },
    adddetailGridCntProperty: function() {
        var me = this;
        me.detailGridCnt.gridNo             = 17;
        me.detailGridCnt.colNo              = 4;
        me.detailGridCnt.rowNo              = 0;
        me.detailGridCnt.gridItemId         = 'transferProdDetailGrid';   
        me.detailGridCnt.addTempSearch      = 0;
        me.detailGridCnt.showSaveMsg        = false;
        me.detailGridCnt.storeLoadOnSave    = false;
        me.detailGridCnt.createMsgCmp       = false;
        me.detailGridCnt.hideHeaderFilter   =true;
        me.detailGridCnt.showCheckBoxSelModel =false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.detailGridCnt.addDatagridTemplate= 0;
        else 
            me.detailGridCnt.addDatagridTemplate= 1; 
    },
    loadDetailGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        /*if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }*/
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;

        if(!Ext.isEmpty(me.detailGridCnt.addSearchCmp) &&  me.detailGridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        if(!Ext.isEmpty(me.detailGridCnt.addDatagridTemplate)) {
            params['get_template_list'] = me.detailGridCnt.addDatagridTemplate;
            if(delStatus != null) {
                // YBase.utility.GridHelper.getFieldTemplateName(me, me.detailGridCnt.gridNo);
                YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        if(!Ext.isEmpty(me.detailGridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.detailGridCnt.addTempSearch;
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.detailGridCnt.gridNo;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.detailGridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/transferDetail/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.detailGridCnt.responseObj    = resp;
                    me.detailGridCnt.templateId     = resp.templateId;
                    me.detailGridCnt.templateList   = resp.templateList;
                    me.detailGridCnt.searchList     = resp.searchList;
                    me.detailGridCnt.synctime       = resp.synctime;
                   // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var /*pageSize=resp.page_size,*/
                        fields = resp.fields,
                        storeParamObj = {
                            /*'pageSize'      : pageSize, */
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'newTransferDetailJSON', 
                            'storeUrl'      : 'bizlayer/transferStockWin/list', 
                            // 'create'        : 'bizlayer/transferStockWin/crud', 
                            // 'destroy'       : 'bizlayer/transferStockWin/crud', 
                            'extra_params'  : {'synctime':me.gridCnt.synctime,'datagrid_id':me.detailGridCnt.gridNo}, 
                            'writeAllFields': false,
                            'editable'      : true,
                            'idProperty'    : 'id',
                            'forceSubmitFields' : ['id','ext_id']
                        };
                    me.detailGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.detailGridCnt.responseObj,
                            'gridCnt'               : me.detailGridCnt,
                            'hidePagingToolbar'     : true,
                            'gridStore'             : me.detailGridCnt.gridStore, 
                            'gridItemId'            : me.detailGridCnt.gridItemId,
                            'addDatagridTemplate'   : me.detailGridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'loadMask'              : true,
                            'setTemplateId'         : me.detailGridCnt.templateId,
                            'templateList'          : me.detailGridCnt.templateList,
                            'searchList'            : me.detailGridCnt.searchList,
                            'addTempSearch'         : me.detailGridCnt.addTempSearch,
                            'createMsgCmp'          : me.detailGridCnt.createMsgCmp,
                            'actionRenderer'        : me.detailLinkRenderer,
                            'hideHeaderFilterButtons': me.detailGridCnt.hideHeaderFilter,
                            'chkboxSelModel'        : me.detailGridCnt.showCheckBoxSelModel

                        };
                    me.detailGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    me.detailGridCnt.gridStore.on("update",me.onDetailGridStoreOnUpdate,me);
                    me.loadEntryDetailGridRecords();
                   // me.detailGridCnt.gridStore.loadRawData(resp);
                }
            }
        });
    },
    loadEntryDetailGridRecords: function(){
        var me = this,
            win = me.getTransferStockWindow(),
            entryPanelDetailGrid = win.entryDetailGrid;
        entryPanelDetailGrid.getView().refresh();
        entryDetailGridStore = entryPanelDetailGrid.getStore();
        entryDetailGridRecords=[];
        entryDetailGridStore.each(function(record){
            if(!Ext.isEmpty(record.get('column_9_06'))){
                entryDetailGridRecords.push(record.data);
            }
        });
        if(!Ext.isEmpty(entryDetailGridRecords)){
            var detailStore = me.detailGridCnt.gridStore, 
                gridStore = me.gridCnt.gridStore;
            detailStore.loadData(entryDetailGridRecords);
            for (var i = 0; i < entryDetailGridRecords.length; i++) 
            {
                var product_id          = entryDetailGridRecords[i].product_id,
                    batch_detail_code   = entryDetailGridRecords[i].column_9_05,
                    selectionModel      = me.gridCnt.query('grid[itemId=transferProdMasterGrid]')[0].getSelectionModel(),
                    data                = gridStore.queryBy(function(record,id)
                    {
                     return (record.get('id') == product_id && record.get('column_6_05') == batch_detail_code);
                    });
                if(!Ext.isEmpty(data))
                {
                    var index = gridStore.indexOf(data.items[0])
                    selectionModel.select(index,true)
                }
            };    
        }

    },
    onBtnSetTransferDetailClick: function(button, e , eOpts){
        var me= this,
            win = me.getTransferStockWindow(),
            transferProdMasterGrid = win.query('grid[itemId=transferProdMasterGrid]')[0],
            transferProdDetailGrid = win.query('grid[itemId=transferProdDetailGrid]')[0],

            selectedRecords = transferProdMasterGrid.getSelectionModel().getSelection();
           
            mapperArr       = YBase.utility.DataMapperHelper.getStockTransferMasterToStockTransferDetailMapper;
            transferProdDetailGrid.store.removeAll();
            for (var i=0; i<selectedRecords.length; i++){
                var row = Ext.create(transferProdDetailGrid.store.model);
                for(var key in mapperArr){
                    row.set(key,selectedRecords[i].get(mapperArr[key]));
                }
                transferProdDetailGrid.store.insert(0,row);
            }
    },
    transferStockResizeToolClick: function(tool, e, eOpts)
    {
            var me = this;
            toolType =  tool.type;
            w = (toolType=="maximize") ? Ext.getBody().getViewSize().width-4 : 800;
            h = (toolType=="maximize") ? Ext.getBody().getViewSize().height  : 500;
            toggleTool =  (toolType=="maximize") ? tool.setType("minimize") : tool.setType("maximize");
            me.toolType=toggleTool;
            me.abstractcomponent.maxWidth = 1900;
            me.abstractcomponent.setWidth(w);
            me.abstractcomponent.setHeight(h);
            me.abstractcomponent.center();
    },
    onTransferStockWindowAfterRender: function(absCmp)
    {
        var me = this, 
            windowEl = absCmp.getEl();
        windowEl.on("dblclick", function(e, el) {
            if (e.getTarget(".x-window-header") && e.getTarget(".window-maximize")) {
                    tool = absCmp.query('tool[itemId=transferStockResizeTool]')[0];
                    w = (me.toolType=="maximize") ? Ext.getBody().getViewSize().width-4 : 800;
                    h = (me.toolType=="maximize") ? Ext.getBody().getViewSize().height  : 500;
                    toggleTool =  (me.toolType=="maximize") ? tool.setType("minimize") : tool.setType("maximize");
                    absCmp.maxWidth = 1900;
                    absCmp.setWidth(w);
                    absCmp.setHeight(h);
                    absCmp.center();
                if(me.toolType=="maximize"){
                    me.toolType='minimize';
                }else{
                    me.toolType='maximize';
                }
            }
        });
    },
    onDetailGridStoreOnUpdate: function(store, record, operation, modifiedFieldNames, eOpts)
    {
        var me = this,
            dataIndex = modifiedFieldNames[0];
            if(dataIndex == "column_9_08" || dataIndex == "column_9_09")
            {
                me.calculateOrderGridTotal(record);
            }else{
                return;
            }
    },
    calculateOrderGridTotal: function(record){
        var me = this,
            data = record.data,
            total = 0;
        
        total = parseInt(record.data.column_9_08 || 0) * parseInt(record.data.column_9_09 || 0);
        record.set('column_9_11',total);
    },
    onBtnTransferToEntryGridClick : function(button,e,eOpts){
        var me= this,
            win = me.getTransferStockWindow();
            entryDetailGrid = win.entryDetailGrid;
            transferProdDetailGrid = win.query('grid[itemId=transferProdDetailGrid]')[0];
            transferProdDetailGrid_Rec = transferProdDetailGrid.getStore().getRange();
            entryDetailGrid_rec = entryDetailGrid.getStore().getRange();
            gridStore = me.gridCnt.gridStore;

            for (var i = 0; i < transferProdDetailGrid_Rec.length; i++) {

                 var product_id          = transferProdDetailGrid_Rec[i].data.product_id,
                    batch_detail_code   = transferProdDetailGrid_Rec[i].data.column_9_05,
                    selectionModel      = me.gridCnt.query('grid[itemId=transferProdMasterGrid]')[0].getSelectionModel(),
                    data                = gridStore.queryBy(function(record,id)
                    {
                     return (record.get('id') == product_id && record.get('column_6_05') == batch_detail_code);
                    });
                if(!Ext.isEmpty(data.items))
                {
                    var new_quantity = parseInt(transferProdDetailGrid_Rec[i].data.column_9_08) ,
                        total_quantity = parseInt(data.items[0].data.column_6_25);
                    if(new_quantity > total_quantity)
                    {
                        me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.validateError,false);
                        return;
                    }
                }

            };
            entryDetailGrid.store.removeAll();
            entryDetailGrid.store.loadData(transferProdDetailGrid_Rec);
        var row = Ext.create(entryDetailGrid.store.model);
            entryDetailGrid.store.add(row);
            win.entryMasterCtrl.absCmp.cmpEvent.calculateBillAmount();
            // for (var i=0; i<transferProdDetailGrid_Rec.length; i++){
            //      var row = Ext.create(entryDetailGrid.store.model);
            //      for(var key in mapperArr){
            //         row.set(key,transferProdDetailGrid_Rec[i].get(key));
            //     }
            //     entryDetailGrid.store.insert(0,row);
            // }
            win.close();
    },
    showToolBarMsg: function(msg,success) {
        var me = this,
            msgCmp = me.getTransferStockWindow().query('container[itemId=transferMsgCmpCnt]')[0];
        if(msgCmp.hidden) {
            msgCmp.show();
        }
        if(Ext.isEmpty(success)) {
            success=true;
        }
        if(!success) {
            msg = '<div class="msg-cmp msg-failure"><span>'+msg+'</span><span class="icons-delete"></span></div>';
        }else {
            msg = '<div class="msg-cmp msg-success"><span>'+msg+'</span><span class="icons-delete"></span></div>';
        }
        if(!Ext.isEmpty(msgCmp)) {
            msgCmp.update(msg);
            if(me.task) {
                me.task.stop();
            }
            me.runner = new Ext.util.TaskRunner();
            me.task = me.runner.newTask({
                run: function () {
                    msgCmp.update(null);
                },
                interval: 5000
            });
            me.task.start();
        }
        else {
            console.log('noMsgCnt',msg);
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "transferStockWindow":{
                afterrender: me.onTransferStockWindowAfterRender
            },
            "transferStockWindow container[itemId=transferProdMasterGridCnt]" : {
                beforerender: me.onTransferProdMasterGridCntBeforeRender,
            },
            "transferStockWindow grid[itemId=transferProdMasterGrid]" : {
                afterrender: me.onTransferProdMasterGridAfterRender
            },
            // "transferStockWindow grid[itemId=transferProdMasterGrid]":{
                // afterrender : me.onTransferProdMasterGridAfteRender
            // },
            "transferStockWindow button[itemId=btnTransferToEntryGrid]":{
                click : me.onBtnTransferToEntryGridClick
            },
            "transferStockWindow tool[itemId=transferStockResizeTool]":{
                'click' : me.transferStockResizeToolClick
            }  
        });
    }

});
