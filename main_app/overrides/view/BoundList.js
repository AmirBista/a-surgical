
Ext.define('overrides.view.BoundList', {
    override:'Ext.view.BoundList',
    createSettingToolbar: function() {
        var me = this,
            btnConfig = me.getSettingBtnConfig(me);
        this.getComponentLayout().owner.minWidth=110;
        return Ext.widget('toolbar', {
            id: this.id + '-paging-toolbar',
            border: false,
            //width:120,
            minWidth:100,
            //ownerCt: this,
           // ownerLayout: this.getComponentLayout(),
            prependButtons: true,
            items:[
                '->',
                btnConfig,
                '->'
            ],
            layout: {
                type: 'hbox',
                // align: 'stretch',
                pack: 'center'
            }            
        });
    },
    getSettingBtnConfig:function(me){
        var btnConfig = {
                    text:Ext.LANG.globalLang.buttons.cboSettingBtn,
                    iconCls:'cbo-setting-btn-ico',
                    componentCls:'cbo-setting-btn',
                    scope:me,
                    handler: function() {
                        var me = this,
                            cbo = me.pickerField;
                        // console.log('Settings clicked for combo ', cbo);
                        var fieldOptionWin = Ext.create('YBase.view.FieldOptionWindow',{
                                'setting_cfg':cbo.setting_cfg,
                                'setting_combo' : cbo,
                                itemId : 'FieldOptionWindow'
                            });
                        fieldOptionWin.on('close',function(abstractcomponent){
                            if (abstractcomponent.record_updated && !Ext.isEmpty(abstractcomponent.responseObj)){
                                cbo.getStore().loadData(abstractcomponent.responseObj.comboStoreData.data);
                            }
                        }, me);
                        fieldOptionWin.show();
                    }                    
                };
        return btnConfig;
    },
    onPagingToolbarBeforeRender:function(toolbar){
        var me = this,
            btnConfig = me.getSettingBtnConfig(me),
            btn = Ext.create('Ext.button.Button', btnConfig);
        toolbar.items.add(btn);
    },
    initComponent: function() {
        var me = this,
            btnConfig = me.getSettingBtnConfig(me);
        me.callParent(arguments);
        if (me.pickerField.xtype = 'combobox'){
            if (me.pickerField.setting_cfg && 
            me.pickerField.setting_cfg.enabled == true)
            {
                if (Ext.isEmpty(me.pagingToolbar)){
                    //if paging toolbar does not exists then
                    me.pagingToolbar = me.createSettingToolbar();
                }
                else{
                    //when paging toolbar already exists
                    me.pagingToolbar.un('beforerender', me.onPagingToolbarBeforeRender);
                    me.pagingToolbar.on('beforerender', me.onPagingToolbarBeforeRender, me);
                }
            }
        }
    }
});
