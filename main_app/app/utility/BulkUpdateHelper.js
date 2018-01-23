Ext.define('YBase.utility.BulkUpdateHelper',
{
    statics:{
        BlukUpdatePanel:null,
        //this function is used for manage display order of grid rows
        GridEventHandleForBulkUpdate:function(grid) {
            if (grid) {
                var BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
                if(!Ext.isEmpty(grid.lockedGrid)) {
                    if(!Ext.isEmpty(grid.getView().lockedGrid)) {
                        var lockedGrid = grid.getView().lockedGrid;
                        lockedGrid.on('cellclick', function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts){
                            var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
                            if(Ext.isEmpty(lockedGrid.headerCt.columnManager.columns)){
                                return;
                            }
                            var col = lockedGrid.headerCt.columnManager.columns[cellIndex],
                                dataIndex = col.dataIndex,
                                field_type_id = col.field_type_id,
                                isCollapsed = BulkPanel.getCollapsed();
                            if(col.editable)
                                YBase.app.getController('BulkUpdateController').comboSelectedFieldType = field_type_id;
                            if(!isCollapsed){
                                if (!Ext.isEmpty(dataIndex) && col.editable) {
                                    var fieldCombo = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
                                    fieldCombo.setValue(dataIndex);
                                }
                            }
                        }, this);
                    }
                    if(!Ext.isEmpty(grid.getView().normalGrid)) {
                        var normalGrid = grid.getView().normalGrid;
                        normalGrid.on('cellclick', function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts){
                            var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
                            if(Ext.isEmpty(normalGrid.headerCt.columnManager.columns)){
                                return;
                            }
                            var col = normalGrid.headerCt.columnManager.columns[cellIndex],
                                dataIndex = col.dataIndex,
                                field_type_id = col.field_type_id,
                                isCollapsed = BulkPanel.getCollapsed();
                            if(col.editable)
                                YBase.app.getController('BulkUpdateController').comboSelectedFieldType = field_type_id;
                            if(!isCollapsed){
                                if (!Ext.isEmpty(dataIndex) && col.editable) {
                                    var fieldCombo = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
                                    fieldCombo.setValue(dataIndex);
                                }
                            }
                        }, this);
                    }
                }
                else {
                    var BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
                    grid.on('cellclick', function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts){
                        var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
                        if(Ext.isEmpty(grid.headerCt.columnManager.columns)){
                            return;
                        }
                        var col = grid.headerCt.columnManager.columns[cellIndex],
                            dataIndex = col.dataIndex,
                            field_type_id = col.field_type_id,
                            isCollapsed = BulkPanel.getCollapsed();
                        if(col.editable)
                            YBase.app.getController('BulkUpdateController').comboSelectedFieldType = field_type_id;
                        if(!isCollapsed){
                            if (!Ext.isEmpty(dataIndex) && col.editable) {
                                var fieldCombo = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
                                fieldCombo.setValue(dataIndex);
                            }
                        }
                    }, this);
                }
                grid.on('selectionchange', function(model, selected, eOpts){
                    if (!Ext.isEmpty(selected)) {
                        // var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
                        var isCollapsed = BulkPanel.getCollapsed();
                        if(!isCollapsed){
                            var getBtn=BulkPanel.query('button[itemId=GetFieldButton]')[0];
                            getBtn.fireEvent('click');
                        }
                    }
                }, this);
            }
        },
        // copy:function (txt) {
        //     var flashcopier = 'flashcopier';
        //     if(!document.getElementById(flashcopier)) {
        //             var divholder = document.createElement('div');
        //             divholder.id = flashcopier;
        //             document.body.appendChild(divholder);
        //     }
        //     document.getElementById(flashcopier).innerHTML = '';
        //     var divinfo = '<embed src='clipboard.swf' FlashVars="clipboard='+encodeURIComponent(txt)+'" width="0" height="0" type="application/x-shockwave-flash"></embed>';
        //     document.getElementById(flashcopier).innerHTML = divinfo;
        // },

        isAlreadyCopied:function(store,val){
            if (this.isDate(val)) {
                val = Ext.Date.format(val,'Y-m-d');
                if (store.findRecord("CopiedValue",val)) {
                    return true;
               }else{
                    return false;
               }
            }else{
               if (store.findRecord("CopiedValue",val)) {
                    return true;
               }else{
                    return false;
               }
           }
        },

        isDate:function(sDate) {
            var isdate = new Date(sDate);
            if (isdate.toString() == "NaN" || isdate.toString() == "Invalid Date") {
                return false;
            }
            else{
                var val = Ext.Date.format(sDate,'Y-m-d');
                if(!Ext.isEmpty(val)){
                     return true;
                 }else{
                    return false;
                 }
            }
        },

        setActiveTabStore:function(activeTab,grid){
            var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
                gridCnt;
            if(!Ext.isEmpty(grid)) {
                gridCnt = grid.up('container');
            }
            // if(!Ext.isEmpty(activeTab.showBulkUpdate) && activeTab.showBulkUpdate == true) {
            if(!Ext.isEmpty(gridCnt) && !Ext.isEmpty(gridCnt.showBulkUpdate) && gridCnt.showBulkUpdate == true) {
                if(grid != null && grid.gridPanelNo !=null ) {
                    var comboGrid = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
                    var SelectedFieldGrid = BulkPanel.query('gridpanel[itemId=SelectedFieldGrid]')[0];
                    SelectedFieldGrid.getStore().removeAll();
                    comboGrid.setValue("");
                    this.loadAndSetStoreforBulkUpdate(grid,grid.gridPanelNo,grid.gridFieldTempId);
                }
            }
            else {
                if(!Ext.isEmpty(grid) && !Ext.isEmpty(grid.query('button[itemId=btnBulkUpdate]'))) {
                    grid.query('button[itemId=btnBulkUpdate]')[0].removeCls('active-btn');
                }
                BulkPanel.setVisible(false);
            }
        },

        loadAndSetStoreforBulkUpdate:function(grid,gridNo,datagridTempId){
            var store = grid.getStore(),
                BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
                // isCollapsed = BulkPanel.getCollapsed();
                isHidden = BulkPanel.hidden;
            BulkPanel.dataStore =store;
            BulkPanel.panelId = gridNo;
            BulkPanel.datagridTempId = datagridTempId;
            BulkPanel.activeGrid=grid;
            if (!isHidden) {
                grid.query('button[itemId=btnBulkUpdate]')[0].addCls('active-btn');
                this.getBulkupdateFieldComboLoad(BulkPanel);
            }
            else {
                grid.query('button[itemId=btnBulkUpdate]')[0].removeCls('active-btn');
            }
        },

        getBulkupdateFieldComboLoad:function(BulkPanel){
            YBase.app.getController('BulkUpdateController').LoadedPanelId = BulkPanel.panelId;
            YBase.app.getController('BulkUpdateController').LoadedFieldTempId = BulkPanel.datagridTempId;
            var comboGrid = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
            var SelectedFieldGrid = BulkPanel.query('gridpanel[itemId=SelectedFieldGrid]')[0];
            SelectedFieldGrid.getStore().removeAll();
            var comboStore=comboGrid.getStore();
                comboGrid.setValue("");
                
            comboStore.load({params:{'panel_id':BulkPanel.panelId,'datagrid_template_id':BulkPanel.datagridTempId}});
        },

        getCollapseExpand:function(e){
            var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
            var isCollapsed = BulkPanel.getCollapsed();
            if(isCollapsed){
                BulkPanel.expand();
            }else{
                var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
                BulkPanel.collapse();
                checkbox.setValue(false);
            }
        },

        getCopyValue:function(){
            var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
            var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
            var isCollapsed = BulkPanel.getCollapsed();
            if (checkbox.checked) {
                checkbox.setValue(false);
            }else{
                checkbox.setValue(true);
            }
            if(isCollapsed){
                BulkPanel.expand();
                checkbox.setValue(true);
            }
             
        },
        setIsTabSaved:function(OldTab){
            var activePanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
                activeGrid = activePanel.activeGrid;
            if (typeof store != 'undefined') {
                 var store =  activePanel.activeGrid.getStore();
                 store.each(function(record,idx) {
                    if (record.dirty == true) {
                        OldTab.setIconCls('nst-icon-setting');
                        return;
                    }
                 });
             }
        },
        setResetIcon:function(tab){
             if (tab.PanelNo>0 && tab.PanelNo==1) {
                tab.setIconCls('nst-tab-member');
            }else if (tab.PanelNo>0 && tab.PanelNo==2) {
             
            }else if (tab.PanelNo>0 && tab.PanelNo==6) {
                
            }else{
               
            }
        },
        showBulkUpdatePanel: function(button,e) {
            var bulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
                bulkUpdCntrl = YBase.app.getController('BulkUpdateController'),
                panelId = bulkUpdCntrl.PanelId;
            if(bulkPanel.hidden) {
                bulkPanel.setVisible(true);
                // button.addCls('active-btn');
                if(panelId == null) {
                    bulkUpdCntrl.PanelId = bulkPanel.panelId;
                    this.getBulkupdateFieldComboLoad(bulkPanel);
                }
                else if(bulkUpdCntrl.LoadedPanelId != bulkPanel.panelId || bulkUpdCntrl.LoadedFieldTempId !=bulkPanel.datagridTempId)
                    this.getBulkupdateFieldComboLoad(bulkPanel);
                else {
                    //do nth
                }
            }
            else {
                bulkPanel.setVisible(false);
                // button.removeCls('active-btn');  
            }
        }
    }
});
