Ext.define('YBase.utility.CommonFunctions',{
    statics:{
        /*checks current user role*/
        isValiedUserRole:function(role){

            if (Ext.CURRENT_USER.role == null || Ext.CURRENT_USER.role>role) {
                return false;
            }else{
                return true;
            }
        },
        getGridKeyPressEvent:function(me,grid,rowEditing,rowNo, colNo,e){
            //key down
            if (e.getKey() ===40) {
                if (grid.getStore().data.items.length >me.rowNo+1) {
                    me.rowNo=me.rowNo+1;
                }
            }
            //key up
            if (e.getKey() ===38) {
                if (me.rowNo>0) {
                    me.rowNo=me.rowNo-1;
                }
            }
            //Enter key
            if (e.getKey() ===13){
                if(!Ext.isEmpty(me.rowNo) && !Ext.isEmpty(me.colNo)){
                    rowEditing.startEditByPosition({
                        row: me.rowNo,
                        column: me.colNo
                    });
                }
            }
            //with control key
            if (e.ctrlKey==true) { 
                if (e.getKey() ==37) {
                    YBase.utility.BulkUpdateHelper.getCollapseExpand(e);
                }else if(e.getKey() ==39){
                    YBase.utility.BulkUpdateHelper.getCollapseExpand(e);
                }else if(e.getKey() ==40){
                    var BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
                    var dataIndex = grid.columns[colNo].dataIndex;
                    var isCollapsed = BulkPanel.getCollapsed();
                    if(!isCollapsed){
                        if (!Ext.isEmpty(dataIndex)) {
                            var fieldCombo = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
                            fieldCombo.setValue(dataIndex);
                            fieldCombo.focus(true, 200);
                        }
                    }
                }
            }
        },
        currency_renderer:function(value){
            if (YBase.utility.CommonFunctions.isInt(value))
                return Ext.util.Format.number(value,'¥,');
            else
                return Ext.util.Format.currency(value,'¥');
        },
        comma_number_renderer:function(value) {
            return Ext.util.Format.number(value,',');
        },
        comma_number_with_decimal_renderer:function(value) {
            return Ext.util.Format.number(value,"0,000.00");
        },
        comma_number_with_floor_value_renderer:function(value) {
            if(!Ext.isEmpty(value))
                value = Math.floor(value);
            return Ext.util.Format.number(value,"0,000");
        },
        isInt:function (n) {
           return n % 1 === 0;
        },
        // addHelpCmp: function(container,link,label) {
        //     var me = this,
        //         helpCmp = Ext.create('Ext.Component', {
        //         itemId: 'orderMasterEntryHelpTxt',
        //         // flex: 1,
        //         height:36,
        //         widht:40,
        //         padding: '5 0 0 5',
        //         autoEl: {
        //             tag: 'a class="help-text-link"',
        //             href: link,
        //             target: '_blank',
        //             html: '<span class="yig-help-m-b help-icon">help</span><label class="help-text">'+label+'</label>'
        //         }
        //     });
        //     container.insert(0,helpCmp);
        // },
        addHelpCmp: function(container,link,label,helpTextInfo) {
           // container.removeAll();
            var me = this;
            if(!Ext.isEmpty(helpTextInfo) && helpTextInfo != false){
                var label=helpTextInfo.help_name;
                    autoEl={
                        tag:'a class="help-text-link"',
                        html: '<span class="yig-help-m-b help-icon">help</span><label class="help-text">'+label+'</label>'
                    };
            }else{
                autoEl={
                    tag: 'a class="help-text-link"',
                    href: link,
                    target: '_blank',
                    html: '<span class="yig-help-m-b help-icon">help</span><label class="help-text">'+label+'</label>'
                };
            }
            var helpCmp = Ext.create('Ext.Component', {
                itemId: 'orderMasterEntryHelpTxt',
                // flex: 1,
                height:36,
                widht:40,
                padding: '5 0 0 5',
                autoEl: autoEl,/*{
                    tag: 'a class="help-text-link"',
                   // href: link,
                    //target: target,
                    html: '<span class="yig-help-m-b help-icon">help</span><label class="help-text">'+label+'</label>'
                },*/
                listeners:{
                   'click': {
                        element: 'el',
                        fn: me.onSearchLabelClick,
                        scope:{cmp:helpTextInfo}
                    }
                },    
            });
            container.insert(0,helpCmp);
            container.doLayout();
        },
        onSearchLabelClick:function(){
            if(Ext.isEmpty(this.cmp)  || this.cmp == false)
                    return;
            var win = Ext.create('YBase.view.HelpWindow');
                win.helpTextInfo=this.cmp;
                win.show();
        },
        createMsgCmp:function(cntrl) {
            var me = cntrl;
            var cmp = { 
                xtype   : 'component',
                itemId  : 'msgCmp',
                html    : null,
                listeners : {
                    click: {
                        element: 'el', //bind to the underlying el property on the panel
                        scope:me,
                        //cmp:this,
                        fn: function(e,view,params) { 
                            if(e.getTarget('.icons-delete')) {
                                this.msgCmp.update(null);
                                if(this.task) {
                                    this.task.stop();
                                }
                            }   
                        }
                    }
                } 
            };
            return cmp;
        },
        convertTemplateValues:function(tpl_value){
            if (Ext.isEmpty(tpl_value))
                return tpl_value;
            var tpl_values = Ext.LANG.tplValues;
            for (var key in tpl_values) {
                tpl_value = tpl_value.replace(key,tpl_values[key]);
            };
            return tpl_value;
        }
    }
});