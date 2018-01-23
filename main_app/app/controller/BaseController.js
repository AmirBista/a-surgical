Ext.define('YBase.controller.BaseController', {
    extend: 'Ext.app.Controller',
    id: 'BaseController',
    currentView:null,
    currentViewAlias:null,
    implementLang: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            basePanelLang=lang.BasePanel;

        absCmp.query('button[itemId=leftPanelUpdateBtn]')[0].setText(basePanelLang.leftPanelUpdateBtn);
        absCmp.query('button[itemId=leftPanelAddBtn]')[0].setText(basePanelLang.leftPanelAddBtn);
        absCmp.query('button[itemId=middleCntSaveBtn]')[0].setText(basePanelLang.middleCntSaveBtn);
        absCmp.query('button[itemId=middleCntDeleteBtn]')[0].setText(basePanelLang.middleCntDeleteBtn);
        absCmp.query('button[itemId=middleCntCsvBtn]')[0].setText(basePanelLang.middleCntCsvBtn);
        absCmp.query('menuitem[itemId=selectedCsvMenu]')[0].setText(basePanelLang.selectedCsvMenu);
        absCmp.query('button[itemId=middleCntPrintBtn]')[0].setText(basePanelLang.middleCntPrintBtn);
        absCmp.query('menuitem[itemId=selectedPrintMenu]')[0].setText(basePanelLang.selectedPrintMenu);
        absCmp.query('menuitem[itemId=allPrintMenu]')[0].setText(basePanelLang.allPrintMenu);
    },
    // addHelpCmp: function(absCmp) {
    //     var me=this,
    //         container =  absCmp.query('container[itemId=topMainCnt]')[0],
    //         lang=Ext.LANG,
    //         link = lang.help_link.orderMasterLink,
    //         label = lang.help_label.help;
    //     YBase.utility.CommonFunctions.addHelpCmp(container,link,label);
    // },
    onViewBeforeRender: function(absCmp, eOpts) {
        var me= this;
        //me.addHelpCmp(absCmp);
        me.implementLang(absCmp);
    },
    onViewAfterRender: function(absCmp, eOpts) {
        //do nth
    },
    onViewBeforeActivate:function(absCmp, eOpts){
        var me=this;
        if(!Ext.isEmpty(me.masterGridCnt)) {
            var grid =absCmp.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0];
            if (!Ext.isEmpty(grid) && grid.getStore().is_loaded === true){
                grid.getStore().reload();
            }
        }
    },
    onViewClose: function(absCmp, options) {
        var me = this;
    },
    onViewBodyCntBeforeRender: function(gridCnt,options) {
        var me = this,
            delStatus = null,
            mainPanel = gridCnt.up('panel');
        me.leftPanelGridCnt = mainPanel.query('container[itemId=leftPanelGridCnt]')[0];
        me.middleGridCnt = mainPanel.query('container[itemId=middleGridCnt]')[0];
        me.rightPanelCnt = mainPanel.query('container[itemId=rightPanelCnt]')[0];
        me.leftPanelGridCnt.removeAll();
        me.middleGridCnt.removeAll();
        me.rightPanelCnt.removeAll();
        me.addLeftPanelGridCntProperty();
        me.addMiddleGridCntProperty();
        me.addRightPanelCntProperty();
        me.absCmp = mainPanel;
        me.currentView = mainPanel;
        me.bodyCnt = gridCnt;
        me.loadBodyCnt(me,mainPanel);
    },
    onViewLeftPanelGridCntBeforeRender: function(gridCnt,options) {
        var me = this;
    },
    onViewMiddleGridCntBeforeRender: function(gridCnt,options) {
        var me = this;
    },
    onViewRightPanelBeforeRender: function(gridCnt,options) {
        var me = this;
    },
    // onBtnAddClick: function(button, e, options){
    //     var me=this,colIdx=0,increment=0
    //         pnl = me.currentView,
    //         masterGrid=pnl.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0],
    //         gridCols = masterGrid.columns,
    //         rowEditing = masterGrid.getPlugin('plgGridListCellEditing');
    //     var row = Ext.create(masterGrid.store.model);
    //     masterGrid.store.insert(0, row);
    //     for(var i=0;i<gridCols.length;i++) {
    //         if(gridCols[i].editable && gridCols[i].isVisible()) {
    //             colIdx=i;
    //             break;
    //         }
    //     }
    //     if(me.masterGridCnt.chkboxSelModel) {
    //         colIdx = colIdx+1;
    //     }
    //     rowEditing.startEditByPosition({
    //         row: 0,
    //         column: colIdx
    //     });
    // },
    // onBtnSaveClick: function(button,e,opts) {
    //     var me = this, pnl = me.currentView, masterGrid = pnl.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0],
    //         masterGridStore = masterGrid.getStore(),
    //         masterView = masterGrid.getView();
    //     masterGrid.getSelectionModel().deselectAll();
    //     me.saveData(masterGrid, masterGridStore, masterView,me.masterGridCnt.gridNo);
    // },
    // onBtnDeleteClick: function(button, e, options){
    //     Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
    //         if(o=="yes"){
    //             var me = this, pnl = me.currentView, masterGrid = pnl.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0],
    //                 selectedRecords = masterGrid.getSelectionModel().selected.items,
    //                 masterGridStore = masterGrid.getStore();
    //             masterGridStore.remove(selectedRecords);
    //             me.storeSync(masterGridStore);
    //         }
    //     },this);
    // },
    // saveData: function(grid,store,view,gridNo,gridCnt) {
    //     var me = this,
    //         error = false;
    //     me.gridCnt = gridCnt;
    //     var error = YBase.utility.GridHelper.validateGrid(grid,store,view,gridNo);
    //     if (error === false) {
    //         me.storeSync(store);
    //     } else {
    //         Ext.Msg.show({
    //             title: Ext.LANG.globalLang.app.appTitle,
    //             msg:   Ext.LANG.globalLang.alertMsg.invalidFieldData,
    //             modal: true,
    //             icon: Ext.Msg.ERROR,
    //             buttons: Ext.Msg.OK
    //         });
    //     }
    // },
    // storeSync: function(store) {
    //     var me = this;
    //     store.sync({
    //         scope:store,
    //         success: function(response) {
    //             var resp = Ext.decode(response.operations[0].response.responseText);
    //             me.responseObj = resp;
    //             if (resp.success === true) {
    //                 if(!Ext.isEmpty(me.gridCnt.showSaveMsg) && !me.gridCnt.showSaveMsg) {
    //                     //donot show msgBox
    //                 }else {
    //                     // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.successMsg.saveSuccess);
    //                     Ext.Msg.show({
    //                         title: Ext.LANG.globalLang.app.appTitle,
    //                         msg:   Ext.LANG.globalLang.successMsg.saveSuccess,
    //                         modal: true,
    //                         icon: Ext.Msg.INFO,
    //                         buttons: Ext.Msg.OK
    //                     });
    //                 }
    //                 if(!Ext.isEmpty(me.gridCnt.storeLoadOnSave) && !me.gridCnt.storeLoadOnSave) {
    //                     //donot load store
    //                 }else {
    //                     var store = this;
    //                     store.load();
    //                 }
    //                 me.resetValues();
    //             }
    //         },
    //         failure: function(response) {
    //             me.resetValues();
    //             // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.errorMsg.saveError);
    //             Ext.Msg.show({
    //                 title: Ext.LANG.globalLang.app.appTitle,
    //                 msg:   Ext.LANG.globalLang.errorMsg.saveError,
    //                 modal: true,
    //                 icon: Ext.Msg.ERROR,
    //                 buttons: Ext.Msg.OK
    //             });
    //         }
    //     });
    // },
    // onMenuSelectedCsvClick: function(button, e, options)  {
    //     var me = this,
    //         lang = Ext.LANG,
    //         masterGrid = me.currentView.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0],
    //         masterGridStore = masterGrid.getStore(),
    //         selectedRows = masterGrid.getSelectionModel().getSelection(),
    //         cols = masterGrid.columns,
    //         columnCount = cols.length,
    //         visibleColumn = [],
    //         colObj={};

    //     for (i = 0; i < columnCount; i++) {
    //         if (cols[i].hidden !== true 
    //             && cols[i].dataIndex !== ''
    //             && cols[i].itemId !== 'action_column')
    //         {
    //             colObj['field_label'] = cols[i].text;
    //             colObj['column_name'] = cols[i].dataIndex;
    //             visibleColumn.push(colObj);
    //             colObj={};
    //             // visibleColumn.push(masterGrid.columns[i].dataIndex);
    //         }
    //     }
    //     if (selectedRows.length == 0) {
    //         // Ext.MessageBox.alert(lang.globalLang.app.appTitle, lang.globalLang.alertMsg.rowsNotSelect);
    //         Ext.Msg.show({
    //             title: lang.globalLang.app.appTitle,
    //             msg:   lang.globalLang.alertMsg.rowsNotSelect,
    //             modal: true,
    //             icon: Ext.Msg.INFO,
    //             buttons: Ext.Msg.OK
    //         });
    //         return;
    //     }
    //     var csvFunction = function() {
    //         var selected = [];
    //         Ext.each(selectedRows, function(row) {
    //             /*@change here. row.dirty === true*/
    //                 var data = {};
    //                 for (i = 0; i < visibleColumn.length; i++) {
    //                     //data[visibleColumn[i]] = row.get(visibleColumn[i]);
    //                     data[visibleColumn[i].column_name] = row.raw[visibleColumn[i].column_name];//row.get(visibleColumn[i]);
    //                 }
    //                 selected.push(data);
    //         });
    //         var selectedContainerRows = JSON.stringify(selected),
    //             columns = JSON.stringify(visibleColumn);
    //         var form_325 = new Ext.FormPanel({
    //             id: 'csvForm',
    //             method: "POST",
    //             url: "bizlayer/csvExport/selectedCsvExport",
    //             baseParams: {
    //                 'datagrid_id': 1,
    //                 'selectedRows': selectedContainerRows,
    //                 'columns':columns,
    //                 'prefix': me.currentViewAlias+'_'
    //             },
    //             standardSubmit: true
    //         });

    //         form_325.getForm().submit({
    //             target: '_blank'
    //         });
    //     }
    //     if (masterGridStore.getModifiedRecords().length > 0) {
    //         Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.unsavedRecordExportCSV, function(btn) {
    //             if (btn === 'no') {
    //                 return;
    //             } else {
    //                 csvFunction();
    //             }
    //         });
    //     } else {
    //         csvFunction();
    //     }
    // },
    // onMenuAllCsvClick: function(button, e, options) {
    //     var me = this,
    //         params = null,
    //         masterGrid =  me.currentView.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0],
    //         masterGridStore = masterGrid.getStore(),
    //         filterData =  me.currentView.query('grid[itemId='+me.masterGridCnt.gridItemId+']')[0].getHeaderFilters(),
    //         filterRecords = filterData.getRange(),
    //         filterLength = filterRecords.length,
    //         lang = Ext.LANG,
    //         filterCount=null;
    //         var data = {},
    //             filter = [];
    //         filterData.each(function(record){
    //             if(!Ext.isEmpty(record.value))
    //             {
    //                data['property'] = record.property;
    //                data['value'] = record.value;
    //                filter.push(data);
    //             }           
    //         });
    //     if(!Ext.isEmpty(me.masterGridCnt.templateId))
    //         templateId=me.masterGridCnt.templateId;
    //     else
    //         templateId=null;

    //     var form_325 = new Ext.FormPanel({
    //         id: "csvForm",
    //         method: "POST",
    //         url: masterGridStore.getProxy().api.read,
    //         baseParams: {
    //             get_columns: 1,
    //             get_sku_column:1,
    //             showAllField: me.masterGridCnt.showAllField,
    //             datagrid_id: me.masterGridCnt.gridNo,
    //             filter : JSON.stringify(filter),
    //             filter_params: JSON.stringify(me.radioParams),
    //             pages : "allPages",
    //             setTemplateId:templateId
    //         },
    //         standardSubmit: true
    //     });

    //     form_325.getForm().submit({
    //         target: '_blank'
    //     });
    // },
    // resetValues: function() {
    //     var me = this;
    //     me.gridCnt=null;
    // },
    showToolBarMsg: function(msg,success) {
        var me = this,
            msgCmp = me.msgCmp;
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
        var me = this,
            currentViewAlias = me.currentViewAlias,
            selectorObj = {};
        selectorObj[currentViewAlias] = {
            'beforerender'      : me.onViewBeforeRender, 
            'afterrender'       : me.onViewAfterRender,
            'beforeactivate'    : me.onViewBeforeActivate,
            'close'             : me.onViewClose
        };
        selectorObj[currentViewAlias+" container[itemId=bodyCnt]"] = {
            'beforerender': me.onViewBodyCntBeforeRender
        };
        selectorObj[currentViewAlias+" container[itemId=leftPanelGridCnt]"] = {
            'beforerender': me.onViewLeftPanelGridCntBeforeRender
        };
        selectorObj[currentViewAlias+" container[itemId=middleGridCnt]"] = {
            'beforerender': me.onViewMiddleGridCntBeforeRender
        };
        selectorObj[currentViewAlias+" container[itemId=rightPanelCnt]"] = {
            'beforerender': me.onViewRightPanelBeforeRender
        };
        // selectorObj[currentViewAlias+" button[itemId=leftPanelUpdateBtn]"] = {
        //     'click': me.onLeftPanelUpdateBtnClick
        // };
        // selectorObj[currentViewAlias+" button[itemId=leftPanelAddBtn]"] = {
        //     'click': me.onLeftPanelAddBtnClick
        // };
        // selectorObj[currentViewAlias+" button[itemId=middleCntSaveBtn]"] = {
        //     'click': me.onMiddleCntSaveBtnClick
        // };
        // selectorObj[currentViewAlias+" button[itemId=middleCntDeleteBtn]"] = {
        //     'click': me.onMiddleCntDeleteBtnClick
        // };
        // selectorObj[currentViewAlias+" menuitem[itemId=selectedCsvMenu]"] = {
        //     'click': me.onSelectedCsvMenuClick
        // };
        // selectorObj[currentViewAlias+" menuitem[itemId=allCsvMenu]"] = {
        //     'click': me.onAllCsvMenuClick
        // };
        me.control(selectorObj);
    }
});
