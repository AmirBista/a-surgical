Ext.define('YBase.controller.ImageDragDropWinController', {
    extend: 'Ext.app.Controller',
    id: 'ImageDragDropWinController',
    currentViewAlias:'imageDragDropWindow',
    refs:[
        {
            ref: 'imageDragDropWindow',
            selector: 'imageDragDropWindow'
        }
    ],

    absCmp : null,
    languageImplementation: function(absCmp){
        var me=this,
            imageDragDropWinLang=Ext.LANG.imageDragDropWin;
            //absCmp.setTitle(imageDragDropWinLang.winTitle);
    },
    onBeforeRenderImageDragDropWin: function(absCmp){
        var  me = this;
        me.absCmp =  absCmp;
        me.languageImplementation(absCmp);
        me.renderUploadFile(absCmp);
    },
    renderUploadFile:  function(absCmp){
        var me = this,
            multiUploadWinLang = Ext.LANG.multiImageWin,
            uploadBtnContainer = absCmp.query('container[itemId=multifileContainer]')[0],
            dragElement = 'dragload',
            dragElementContainer = absCmp.query('container[itemId=dropElementContainer]')[0];
        dragElementContainer.update('<div id="'+dragElement+'" class = "dragable-element">'+'ファイルをDrag＆Dropできます。'+'<br>'+ '又は「アップロード」ボタンからファイルを選択してください。'+'</div>');
        uploadBtnContainer.removeAll();
        multiUploadBtn =  Ext.create('Ext.ux.upload.Button', {
            // text: 'Select files',
            //text: multiUploadWinLang.fileUpload,
            //componentCls:'plugin-button',
            //iconCls:'yig-upload-s-w',
            //margin:'2 1 2 0',
           // ui:'custom-ui',
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
                drop_element: dragElement,
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
                scope:me,
                fileuploaded: function(uploader, file, status) {
                   if(status.success == true){
                            var me  = this;
                            if(!Ext.isEmpty(Ext.appFileStore)){
                                store = Ext.getStore(Ext.appFileStore);// Ext.getStore('app_file_store');
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
        uploadBtnContainer.add(multiUploadBtn);

    },
    multifileContainerAfterRender: function(){
        $('#imageDragDropWindow').bind({
            dragenter: function(e) {
                $('.file-dropzone').addClass('fileOver');
                //return false;
            },
            dragleave: function(e) {
                $('.file-dropzone').removeClass('fileOver');
                //return false;
            },
            drop: function(e) {
                $('.file-dropzone').removeClass('fileOver');
                //return false;
            },
            dragover: function(e) {
                e.stopPropagation();
                e.preventDefault();
                return false;
            }

        });
    },
    init: function(application) {
        var me=this;
        me.control({
            "imageDragDropWindow" : {
                beforerender:me.onBeforeRenderImageDragDropWin
            },
            "imageDragDropWindow container[itemId=multifileContainer]":{
                'afterrender': me.multifileContainerAfterRender
            }
        });
        this.callParent(arguments);
    }
});
