Ext.define('YBase.utility.FileHelper',{
    singleton: true,
    renderMenuItem:function(){
        var me = this,
            lang = Ext.LANG,
            fileStatusComponents =  Ext.fileStatusComponents.data,
            statusItems = [],
            i  = 0;
            Ext.each(fileStatusComponents, function(row) {
                i++;
                var iconCls = 'file_status'+i,
                    itemId = 'statusMenuItem'+i;
                data = {
                    text:row.name,
                    iconCls:iconCls,
                    itemId:itemId
                };
                statusItems.push(data);
            });
            fileMenu =  Ext.create('Ext.menu.Menu', {
           // width: 100,
            //height: 100,
            itemId:'fileDataMenu',
            margin: '0 0 5 0',
            items: [
                    {
                        text: lang.fileMenu.view,
                        iconCls:'icon_view',
                        itemId :'viewMenuItem'
                    },
                    {
                        text: lang.fileMenu.download,
                        componentCls: 'separator',
                        iconCls:'icon_download',
                        itemId :'downloadMenuItem'
                    },
                   /* {
                        text: lang.fileMenu.edit,
                        itemId :'editMenuItem',
                        iconCls:'icon_edit'
                    },*/
                    {
                        text: lang.fileMenu.remove,
                        itemId :'deleteMenuItem',
                        componentCls: 'separator',
                        iconCls:'close_icon'
                    }
                    /*{
                        text: lang.fileMenu.status,
                        iconCls:'icon_status',
                        itemId :'statusMenuItem',
                        menu: {
                                items:statusItems
                        },
                        listeners:{
                            'click': {
                                fn : me.onOrderFileMenuClick,
                                scope: me
                            }   
                        }
                    },*/
                   /* {
                        text: lang.fileMenu.fileManage,
                        iconCls:'icon_filemanage',
                        itemId :'fileManageMenuItem'
                    }*/
                    ]
        });
        return fileMenu;
    },
    renderFileDataview: function(me,dataviewParamObj) {
        var components      = dataviewParamObj['components'],
            screen_name     = dataviewParamObj['screen_name'],
            component_cls   = dataviewParamObj['component_cls'],
            screenTypeId    = dataviewParamObj['screenTypeId'],
            storeParamObj = me.getStoreParamObj(dataviewParamObj),
            store = YBase.utility.GridHelper.createStore(storeParamObj),
            tpl = this.getDataViewTpl(),
            container,dataview;
        if(Ext.isEmpty(component_cls)){
            component_cls =  '';
        }
        container = Ext.create('Ext.container.Container', {
            itemId: screen_name + '_container',
            // screenContainer: true,
            componentCls: component_cls + ' order_files_cmp_cls ',
            margin: '0 0 10 0',
            padding:'0 0 0 1',
            layout: 'hbox'
        });
        dataview = Ext.create('Ext.view.View', {
            itemId:me.entryDataViewId,
            flex: 1,
            store: store,
            tpl: tpl,
            itemSelector: 'div.fileListSelector-div',
            plugins: [
                Ext.create('Ext.ux.dataview.LabelEditor', {dataIndex: 'original_file_name'})
            ]
        });
        container.add(dataview);
        return container;
    },
    getDataViewTpl: function() {
        var  dragDrop =  Ext.LANG.multiImageWin.dragDropFile;
        lang =  Ext.LANG.fileMenu;
        var tpl = new Ext.XTemplate(
               '<tpl for=".">',
                '   <div   class="fileListSelector-div   {[this.getStatusClass(values.file_status)]}" style=" float: left;display: inline-block;">',
                '       <span style="margin-right: 2px;" class="view_pdf x-editable  file-{file_id}">{original_file_name}</span>',
                '       <span class="show_drop_down" style="font-weight:bold">X</span>',
                // '       <div class="show-on-hover-menu">',
                // '           <span class="icon_view"></span>',
                // '           <span class="icon_download"></span>',
                // '       </div>',
                '    </div>',
                '</tpl>',
                '<div class="file-dragdrop-msg">',
                    '<span>'+dragDrop+'<span>',
                '</div>',                
                {
                    getStatusClass : function(status_cls){
                        if(status_cls ==lang.status1){
                            return 'cls-file_status1';
                        }
                        else if(status_cls ==lang.status2){
                            return 'cls-file_status2';
                        }
                        else if(status_cls ==lang.status3){
                            return 'cls-file_status3';
                        }
                        else{
                            return 'no-cls';
                        }
                    }
                }
                
            );
        return tpl;
    },
    addButtonInContainer: function(me,container){
        var cnt =   Ext.create('Ext.container.Container',{
                            layout:'hbox',
                            pack: 'end',
                            componentCls:'file-container'
                    }),
            btn = this.addUploadButton(me);
        cnt.add(btn);
        container.add(cnt);
    },
    addUploadButton: function(me){
        var multiUploadWinLang = Ext.LANG.multiImageWin,
            multiUploadBtn =  Ext.create('Ext.ux.upload.Button', {
            // text: 'Select files',
            //text: multiUploadWinLang.fileUpload,
            componentCls:'plugin-button',
            iconCls:'yig-upload-s-w',
            margin:'5 0 0 5',
            ui:'custom-ui',
            //singleFile: true,
            plugins: [{
                    ptype: 'ux.upload.window',
                    //title: 'Upload',
                    title:multiUploadWinLang.fileUpload,
                    //componentCls:'plugin-window',
                    width: 520,
                    height: 490
                }
            ],
            uploader: 
            {
                url: 'bizlayer/file/uploadMultipleImage',
                // uploadpath: '/Root/files',
                autoStart: true,
                max_file_size: '3mb',            
                //drop_element: dragElement,
                activePanelItemId:this.activePanelItemId,
                // Specify what files to browse for
                filters: [{title : "Image files", extensions : "jpg,gif,png,pdf,txt,jpeg,tiff,doc,docx,xls,xlsx,zip"}],
                statusQueuedText: multiUploadWinLang.readyToUpload,
                statusUploadingText: multiUploadWinLang.fileUpload +'({0}%)',
                statusFailedText: '<span style="color: red">Error</span>',
                statusDoneText: '<span style="color: green">'+multiUploadWinLang.completed+'</span>',
                statusInvalidSizeText: '<span style="color: red">'+multiUploadWinLang.statusInvalidSize+'</span>',
                statusInvalidExtensionText: '<span style="color: red">'+multiUploadWinLang.statusInvalidExtension+'</span>',
            },
            listeners: 
            {
                beforeupload: function(uploader, files) {
                    if(!Ext.isEmpty(Ext.order_number))
                        uploader.multipart_params.ref_record_id= Ext.order_number;
                    else
                        return false;
                },
                fileuploaded: function(uploader, file, status) {
                   if(status.success == true){
                        if(!Ext.isEmpty(me.appFileStore)){
                            store = Ext.getStore(me.appFileStore);//Ext.getStore('app_file_store');
                            store.add(status.data);
                            lastRecord = store.last();
                        }
                    }
                },
                filesadded:function(uploader, files){
                },
                beforestart:  function(uploader){
                   if(Ext.isEmpty(Ext.order_number)){
                        return false;
                    }
                },
                scope: me
            }
        });
        return multiUploadBtn;
    },
    orderFileClick: function(me, view, record, item, index, e, eOpts){
        var  lang = Ext.LANG;
        if(e.getTarget('.show_drop_down')){
            var fileMenu = me.controller.fileMenuItems;
                fileMenu.dataViewConfig = {
                    view    : view, 
                    record  : record, 
                    item    : item, 
                    idx     : index, 
                    evt     : e
                };
           /* var status = record.get('file_status');
            if (Ext.isEmpty(status)){
                status = lang.fileMenu.status;
            }*/
           //fileMenu.query('menuitem[itemId=statusMenuItem]')[0].setText(status);
            fileMenu.showAt(e.getXY());
        }
    },
    onFileViewUpdate: function(me, record, index, node, eOpts){
        var lang = Ext.LANG.globalLang,
            changed_file_name = record.data.original_file_name;
        if(Ext.isEmpty(record.modified.original_file_name)){
            return;
        }
        if(Ext.isEmpty(changed_file_name)){
             Ext.Msg.show({
                    title:lang.app.appTitle,
                    msg: lang.errorMsg.mandatoryField,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
            });
            return;
        }
        else{
            var fileName = changed_file_name.indexOf('.'),
                newFileName = '';
            if(fileName<0){
                newFileName = changed_file_name+'.'+record.data.extension;
            }
            else if(fileName>0){
                fileExtension = changed_file_name.substr(changed_file_name.lastIndexOf('.'));
                oldFileExtension = '.'+record.data.extension;
                if(fileExtension == oldFileExtension){
                    newFileName = changed_file_name;
                }
                else{
                    newFileName = changed_file_name+'.'+record.data.extension;
                }
            }
        }
        record.data.original_file_name = newFileName;
        data = [],
        data.push(record.data);
        changeFileData =JSON.stringify(data);
        Ext.Ajax.request({
            url: 'bizlayer/file/gridUpdate',
            method: 'POST',
            params:{
                'data' : changeFileData
            },
            success:function(resp){
                //need not to do anything 
            }
        });
    },
    onFileMenuClick:  function(me, item){
        var ctrl = me.controller,
            text = item.text,
            lang = Ext.LANG,
            iconCls = item.iconCls,
            dataViewConfig = ctrl.fileMenuItems.dataViewConfig,
            record =  dataViewConfig.record,
            file_id = record.data.file_id,
            fileSrc =  Ext.String.format('bizlayer/file/renderImg?file_path='+record.raw.file_path+'');
        if(iconCls =='close_icon'){
            Ext.MessageBox.confirm(lang.globalLang.app.appTitle, lang.globalLang.alertMsg.deleteRecord, function(btn) {
                if (btn == 'yes') {
                    var fileStore =  absCmp.query('dataview[itemId=orderFileDataView]')[0].getStore();
                    ref_record_id =  record.raw.ref_record_id;
                    record.set({delete_flg:1,ref_record_id:ref_record_id});
                    fileStore.remove(record);
                    var deleteRec = [];
                    deleteRec.push(record.data);
                    deleteRec = JSON.stringify(deleteRec);
                    Ext.Ajax.request({
                        url: 'bizlayer/file/gridUpdate',
                        method: 'POST',
                        params:{
                            data : deleteRec
                        },
                        success: function(response) {
                        }
                    });
                }
            });
        }
        else if(iconCls =='icon_view'){
            var extension = record.data.extension;
            if(extension=='jpg' || extension=='png' || extension=='jpeg'|| extension=='bmp' ||  extension=='gif' ||  extension=='tiff'  || extension=='tif'){
                 this.showWindow(fileSrc);
                //me.controller.getController('FileViewController').openSrcView(fileSrc);
            }
            else if(extension=='pdf'){
                this.showWindow(fileSrc);
            }
            else{
                Ext.Msg.show({
                    title:lang.globalLang.app.appTitle,
                    msg: lang.globalLang.alertMsg.invalidExtension,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        }
        else if(iconCls =='icon_download'){
            var link =  Ext.String.format(fileSrc+'&action=download');
            window.open(link,'_self');
        }
        else if(iconCls =='icon_edit'){
            // editor=dataview.getPlugin();
            // item = dataview.findItemByChild(target);
            // record = dataview.store.getAt(dataview.indexOf(item));
            // editor.startEdit(target, record.data[me.dataIndex]);
           // dataview.fireEvent('itemclick',dataview, record, dataViewConfig.item, dataViewConfig.idx, dataViewConfig.evt);
        }
        else if(iconCls =='file_status1'){
            record.set({'file_status':text});
            me.updateStatus(text,file_id);
        }
        else if(iconCls =='file_status2'){
            record.set({'file_status':text});
            me.updateStatus(text,file_id);
        }
        else if(iconCls =='file_status3'){
            record.set({'file_status':text});
           // dataview.refresh();
            me.updateStatus(text,file_id);
           // item.ownerCt.ownerItem.setText(text);
        }
        else if(iconCls=='icon_filemanage'){
            var params = {};
                params['order_code'] = me.absCmp.entry_code,
                win =  Ext.create('YBase.view.FileManageWindow',{
                params:  params,
                closeAction : 'destroy',
                modal : true
            });
            win.show();
        }
    },
    showWindow : function(fileSrc){
        var name  =  'File  Window';
        window.open(fileSrc,name,'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=640,height=480');
    }


});