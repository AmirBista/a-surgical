Ext.define('YBase.utility.DatagridTemplateHelper',{
    statics:{
        /*declared for the use during deletion of temp*/
        globalDatagridTempId:0,
        delStatus:null,
        /*displays the template window*/
        showDatagridTempWin:function(paramObj,department_id,fieldMenu){
            YBase.app.getController('DatagridTemplateController').showWindow(paramObj,department_id,fieldMenu);
        },
        /*runs on click on the field menus*/
        setDatagridTemplateName:function(e,paramObj,menuItem,fieldMenu){
            var grid,
                me = this,
                cntrl = paramObj.cntrl,
                loadfn = paramObj.listDataFn,
                gridpnl = paramObj.gridCnt,
                panelNo = gridpnl.gridNo,
                newTemplateName = menuItem.text,
                menuIndex = menuItem.menuIndex,
                isPublic = menuItem.is_public,
                tempId = menuItem.datagrid_template_id;
                tabPanel = gridpnl.findParentByType('panel');
            // if (gridpnl.xtype =="container") {
            //     grid = gridpnl.items.items[0];
            //     tabPanel = gridpnl.findParentByType('container');
            // }else if(gridpnl.xtype =="panel"){
            //     grid = gridpnl;
            //     tabPanel = gridpnl.findParentByType('panel');
            // }else {
            //     //do nth
            // }
            /*deletion of template*/
            if (e.getTarget('.btn_search_remove')) {
                Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o) {
                    if(o=="yes") {
                        Ext.Ajax.request({
                            url: 'bizlayer/datagridTemplate/templateDelete',
                            method: 'POST',
                            params: {
                                template_id:tempId,
                                datagrid_id: panelNo,
                                global_temp_id: me.globalDatagridTempId,
                                is_public:isPublic
                            },
                            scope:{'me':me,'paramObj':paramObj},
                            success: function(response) {
                                var resp = Ext.decode(response.responseText);
                                if(resp.inUse == true) {
                                    Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o) {
                                        if(o=="yes") {
                                            Ext.Ajax.request({
                                                url: 'bizlayer/datagridTemplate/templateDelete',
                                                method: 'POST',
                                                params:{
                                                    template_id:tempId,
                                                    datagrid_id: panelNo,
                                                    global_temp_id: me.globalDatagridTempId,
                                                    is_public:isPublic,
                                                    delete_confirm:true
                                                },
                                                scope:{'me':me,'paramObj':paramObj},
                                                success: function(response) {
                                                    resp = Ext.decode(response.responseText);
                                                    this.me.delStatus = 1;
                                                    // menu.ownerCt.remove(menu);
                                                    tempSaveBtn = this.paramObj.gridCnt.query('splitbutton[itemId=btnSaveTemplate1]')[0];
                                                    menuItem = tempSaveBtn.query('menuitem[datagrid_template_id='+resp.templateId+']')[0];
                                                    menuItem.ownerCt.remove(menuItem);
                                                    // fieldMenu.items.splice(menuIndex,1);
                                                    resp = Ext.decode(response.responseText);
                                                    if(resp.success == true) {
                                                        /*enters when the temp just deleted was active in the grid*/
                                                        if(resp.wasSelected == true){
                                                            /*enters when there are other templates*/
                                                            if(!Ext.isEmpty(resp.data)) {
                                                                panelNo = resp.data[0].datagrid_id;
                                                                tempId = resp.data[0].datagrid_template_id;
                                                                this.me.globalDatagridTempId = tempId;
                                                            }
                                                            /*enters when just deleted templte was the only one template or last one*/
                                                            else {
                                                                panelNo = panelNo;
                                                                tempId = 0;
                                                            }
                                                            this.me.gridLoad(panelNo, tempId, tabPanel, cntrl, me.delStatus, loadfn);
                                                        }
                                                        else {
                                                            panelNo = panelNo;
                                                            tempId = me.globalDatagridTempId;
                                                        }
                                                    }
                                                    else {
                                                        Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, resp.message);
                                                    }
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    me.delStatus = 1;
                                    tempSaveBtn = this.paramObj.gridCnt.query('splitbutton[itemId=btnSaveTemplate1]')[0];
                                    menuItem = tempSaveBtn.query('menuitem[datagrid_template_id='+resp.templateId+']')[0];
                                    menuItem.ownerCt.remove(menuItem);
                                    // fieldMenu.items.splice(menuIndex,1);
                                    resp = Ext.decode(response.responseText);
                                    if(resp.success == true) {
                                        /*enters when the temp just deleted was active in the grid*/
                                        if(resp.wasSelected == true){
                                            /*enters when there are other templates*/
                                            if(!Ext.isEmpty(resp.data)) {
                                                panelNo = resp.data[0].datagrid_id;
                                                tempId = resp.data[0].datagrid_template_id;
                                                this.me.globalDatagridTempId = tempId;
                                            }
                                            /*enters when just deleted templte was the only one template or last one*/
                                            else {
                                                panelNo = panelNo;
                                                tempId = 0;
                                            }
                                            this.me.gridLoad(panelNo, tempId, tabPanel, cntrl, me.delStatus, loadfn);
                                        }
                                        else {
                                            panelNo = panelNo;
                                            tempId = this.globalDatagridTempId;
                                        }
                                    }
                                    else {
                                        Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, resp.message);
                                    }
                                }
                            },
                            failure:function(response){
                            }
                        });
                    }
                });
            }
            else {
                /*checks if the clicked template is the same one or not*/
                if(me.globalDatagridTempId != tempId) {
                    // var delStatus = null;
                    me.globalDatagridTempId = tempId;
                    /*for orderstatus panel from ordermaster,summaryReport,print and delivery panel*/
                    if(!Ext.isEmpty(cntrl.abstractcomponent.defaultTemplate))
                        cntrl.abstractcomponent.defaultTemplate=false;
                    me.gridLoad(panelNo,tempId,tabPanel,cntrl,me.delStatus,loadfn);
                }
            }
        },
        /*loads the grid according to the template selected*/
        gridLoad: function(panelNo, tempId, tabPanel, cntrl, delStatus, loadfn) {
            var me = this,
                setTemplateId = tempId;
            if(Ext.isEmpty(tempId)) {
                setTemplateId = 'default';
            }
            loadfn(cntrl,tabPanel,tempId,delStatus,setTemplateId);
            // me.saveTempDataGrid(tempId, panelNo);
        }
        /*saves the template id in nst_datagrid table*/
        /*saveTempDataGrid: function(tempId, panelNo) {
            Ext.Ajax.request({
                url: 'bizlayer/common/saveTempDataGrid',
                method: 'POST',
                params:{template_id:tempId, datagrid_id:panelNo}, 
                success: function(response) {
                    resp = Ext.decode(response.responseText);
                },
                failure:function(response){
                }
            });
        },*/
    }
});
