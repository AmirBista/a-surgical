Ext.define('overrides.upload.UploadWindow', {
    override: 'Ext.ux.upload.plugin.Window',
    constructor: function(config)
    {
        var me = this;
        Ext.apply(me, config);
        me.callParent(arguments);
    },
    
    init: function(cmp)
    {
        var me = this,
            uploader = cmp.uploader;
        
        cmp.on({
            filesadded: {
                fn: function(uploader, files)
                {
                    var st = me.window.query('gridpanel')[0].getStore();  
                    st.clearFilter();
                    st.filter([
                        {filterFn: function(item) 
                            { 
                                var name = item.get('name');
                                //for required file type 
                                if ( name.indexOf('.jpg') >=0 ||name.indexOf('.JPG') >=0 || name.indexOf('.png') >= 0 || name.indexOf('.PNG') >= 0 || name.indexOf('.bmp')|| name.indexOf('.jpeg') >= 0 || name.indexOf('.JPEG') >= 0)
                                    return true;
                                else
                                    return false;                            
                            }
                        }
                    ]);                                       
                    //me.window.show();
                },
                scope: me
            },
            updateprogress: {
                fn: function(uploader, total, percent, sent, success, failed, queued, speed)
                {
                    var t = Ext.String.format( Ext.LANG.multiImageWin.upload + '  {0}% ({1} on {2})', percent, sent, total);
                    me.statusbar.showBusy({
                        text: t,
                        clear: false
                    });
                },
                scope: me
            },
            uploadprogress: {
                fn: function(uploader, file, name, size, percent)
                {
                    // me.statusbar.setText(name + ' ' + percent + '%');
                },
                scope: me
            },
            uploadcomplete: {
                fn: function(uploader, success, failed)
                {
                    if(failed.length == 0)
                        me.window.hide();
                },
                scope: me
            },
            uploaderror: {
                fn : function(uploader,success,failed){
                    me.window.show();
                }
            }
        });
        
        me.statusbar = new Ext.ux.StatusBar({
            dock: 'bottom',
            id: 'form-statusbar',
            defaultText: 'Ready'
        });
        
        me.view = new Ext.grid.Panel({
            store: uploader.store,
            stateful: true,
            multiSelect: true,
            hideHeaders: true,
            stateId: 'stateGrid',
            columns: [{
                text: 'Name',
                flex: 1,
                sortable: false,
                dataIndex: 'name'
            },
                    {
                        text: 'Size',
                        width: 90,
                        sortable: true,
                        align: 'right',
                        renderer: Ext.util.Format.fileSize,
                        dataIndex: 'size'
                    },
                    {
                        text: 'Change',
                        width: 75,
                        sortable: true,
                        hidden: true,
                        dataIndex: 'percent'
                    },
                    {
                        text: 'status',
                        width: 75,
                        hidden: true,
                        sortable: true,
                        dataIndex: 'status'
                    },
                    {
                        text: 'msg',
                        width: 175,
                        sortable: true,
                        dataIndex: 'msg'
                    }],
            viewConfig: {
                stripeRows: true,
                enableTextSelection: false
            },
            dockedItems: [{
                dock: 'top',
                enableOverflow: true,
                xtype: 'toolbar',
                style: {
                    background: 'transparent',
                    border: 'none',
                    padding: '5px 0'
                },
                listeners: {
                    beforerender: function(toolbar)
                    {
                        if(uploader.autoStart == false)
                        {
                            startBtn = toolbar.add(uploader.actions.start);
                            startBtn.setText(Ext.LANG.multiImageWin.Start);
                        }
                        cancelBtn = toolbar.add(uploader.actions.cancel);
                        cancelBtn.setText(Ext.LANG.multiImageWin.cancel);
                        removeAllBtn = toolbar.add(uploader.actions.removeAll);
                        removeAllBtn.setText(Ext.LANG.multiImageWin.removeAll);
                        if(uploader.autoRemoveUploaded == false)
                        {
                            removeUploadedBtn = toolbar.add(uploader.actions.removeUploaded);
                            removeUploadedBtn.setText(Ext.LANG.multiImageWin.removeUploaded);
                        }
                            
                    },
                    scope: me
                }
            },
                    me.statusbar]
        });
        
        me.window = new Ext.Window({
            title: me.title || 'Upload files',
            width: me.width || 640,
            height: me.height || 380,
            modal : true, // harry
            plain: true,
            constrain: true,
            border: false,
            layout: 'fit',
            items: me.view,
            componentCls:'plugin-window',
            resizable: false,
            closeAction: 'hide',
            listeners: {
                hide: function(window)
                {
                    /*
                     * if(this.clearOnClose) { this.uploadpanel.onDeleteAll(); }
                     */
                },
                scope: this
            }
        });
    }
   
    
});
