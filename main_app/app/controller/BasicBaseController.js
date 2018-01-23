Ext.define('YBase.controller.BasicBaseController', {
    extend: 'Ext.app.Controller',
    id: 'BasicBaseController',
    currentView:null,
    currentViewAlias:null,
    addHelpCmp: function(absCmp,helpTextInfo) {
        var me=this,
            container =  absCmp.query('container[itemId=topMainCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help+lang.help_label.auto_save;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    implementLang: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            basicBasePanelLang=lang.BasicBasePanel;
        absCmp.query('button[itemId=btnAdd]')[0].setText(basicBasePanelLang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(basicBasePanelLang.btnSave);
        absCmp.query('button[itemId=btnDelete]')[0].setText(basicBasePanelLang.btnDelete);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setText(basicBasePanelLang.btnCsvDwnld);
        absCmp.query('menuitem[itemId=menuSelectedCsv]')[0].setText(basicBasePanelLang.menuSelectedCsv);
        absCmp.query('menuitem[itemId=menuAllCsv]')[0].setText(basicBasePanelLang.menuAllCsv);
        absCmp.query('button[itemId=btnPrint]')[0].setText(basicBasePanelLang.btnPrint);
        var chkRW = absCmp.query('checkbox[itemId=rwChkBox]');
        if(!Ext.isEmpty(chkRW[0])) {
            chkRW[0].setBoxLabel(lang.help_label.auto_save);
            chkRW[0].setValue(true);
        }
    },
    managePanel: function() {
        var me=this,
            absCmp = me.currentView,
            rwChkBox = absCmp.query('checkbox[itemId=rwChkBox]'),
            btnBulkUpdate = absCmp.query('button[itemId=btnBulkUpdate]'),
            bulkUpdatePanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
        if(!Ext.isEmpty(rwChkBox[0])) {
            if(!rwChkBox[0].checked) {
                absCmp.query('button[itemId=btnAdd]')[0].disable();
                absCmp.query('button[itemId=btnSave]')[0].disable();
                if(!Ext.isEmpty(btnBulkUpdate)) {
                    btnBulkUpdate[0].disable();
                    if(!Ext.isEmpty(bulkUpdatePanel)) {
                        bulkUpdatePanel.hide();
                    }
                }

                // absCmp.query('button[itemId=btnDelete]')[0].disable();
            }else {
                absCmp.query('button[itemId=btnAdd]')[0].enable();
                absCmp.query('button[itemId=btnSave]')[0].enable();
                if(!Ext.isEmpty(btnBulkUpdate)) {
                    btnBulkUpdate[0].enable();
                }
                // absCmp.query('button[itemId=btnDelete]')[0].enable();
            }
        }
    },
    /*addHelpCmp: function(absCmp) {
        var me=this,
            container =  absCmp.query('container[itemId=topMainCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label);
    },*/
    onViewBeforeRender: function(absCmp, eOpts) {
        var me= this;
        me.absCmp = absCmp;
        me.currentView = absCmp;
        //me.addHelpCmp(absCmp);
        me.implementLang(absCmp);
        /*Auto Save not used so this fx call  is disabled.*/
        // me.managePanel();  

        // me.overwriteBulkPanel(absCmp);
    },
    overwriteBulkPanel: function(absCmp) {
        if(Ext.CURRENT_USER.is_super_user) 
            absCmp.showBulkUpdate = true;
        else
            absCmp.showBulkUpdate = false;
    },
    onViewAfterRender: function(absCmp, eOpts) {
        //do nth
    },
    onViewBeforeActivate:function(absCmp, eOpts){
        var me=this;
        me.currentView = absCmp;
        var activeTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0].activeTab;
        activeTab.cntrl = me;
        if(!Ext.isEmpty(me.gridCnt)) {
            var grid = absCmp.query('grid[itemId='+me.gridCnt.gridItemId+']')[0];
            if (!Ext.isEmpty(grid) && grid.getStore().is_loaded === true){
                grid.getStore().reload();
                if(me.gridCnt.addDatagridTemplate == 1 && !Ext.isEmpty(grid.datagridTempId)) {
                    YBase.utility.DatagridTemplateHelper.globalDatagridTempId = grid.datagridTempId;
                }
            }
        }
        // me.managePanel();
    },
    onViewGridCntBeforeRender: function(gridCnt,options) {
        var me = this,
            mainPanel = gridCnt.up('panel');
        me.gridCnt = gridCnt;
        me.gridCnt.removeAll();
        me.addGridCntProperty();
        me.loadGrid(me,mainPanel);
    },
    onBtnAddClick: function(button, e, options){
        this.addNewRecord();
    },
    addNewRecord: function(set_focus){
        var me              = this, colIdx = 0, increment = 0,
            pnl             = me.currentView,
            grid            = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridCols        = grid.columns,
            cellEditing      = grid.getPlugin('plgGridListCellEditing');
            row             = Ext.create(grid.store.model),
            fields          = grid.store.getProxy().getModel().getFields(),
            default_values  = {};
            
        if (Ext.isEmpty(set_focus))
            set_focus = true;
        default_values = me.setDefaultValues(fields);
        default_values['ext_id'] = pnl.id+','+Ext.id();
        row.set(default_values);
        grid.store.insert(0,row);
        me.cellFocus(set_focus);
    },
    cellFocus: function(set_focus) {
        var me              = this,
            pnl             = me.currentView,
            grid            = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridCols        = grid.columns,
            cellEditing     = grid.getPlugin('plgGridListCellEditing'),
            focusedCol      = null;
        if (set_focus === true){
            if(!Ext.isEmpty(me.gridCnt.colNo)) {
                focusedCol = me.gridCnt.colNo;
            }else {
                for(var i=0;i<gridCols.length;i++) {
                    if(gridCols[i].editable && gridCols[i].isVisible()) {
                        focusedCol=gridCols[i];
                        break;
                    }
                }
                /*if(!Ext.isEmpty(grid.selModel.hasCheckBox) || grid.selModel.hasCheckBox) {
                    colIdx = colIdx+1;
                }*/
            }
            if(!Ext.isEmpty(grid.lockedGrid)) {
                lockedColumns = grid.lockedGrid.headerCt.getGridColumns();
                if(lockedColumns.length>focusedCol) {
                    cellEditing = grid.lockedGrid.getPlugin('plgGridListCellEditing');
                } else {
                    cellEditing = grid.normalGrid.getPlugin('plgGridListCellEditing');
                    focusedCol = focusedCol-lockedColumns.length;
                }
            }
            
            if (!Ext.isEmpty(cellEditing) && !Ext.isEmpty(focusedCol)){
                cellEditing.startEditByPosition({
                    row: row,
                    column: focusedCol
                });
            } 
        }
    },
    setDefaultValues: function(fields) {
        var default_values  = {};
        for (var i = 0; i < fields.length; i++) {
            if (!Ext.isEmpty(fields[i].default_value)){
                default_values[fields[i].name] = YBase.utility.CommonFunctions.convertTemplateValues(fields[i].default_value);
            }
        };
        return default_values;
    },
    onGridStoreLoad: function(store, records, success) {
        var me      = this,
            pnl     = me.currentView,
            grid    = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0];
        // me.gridCnt.synctime = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        me.gridCnt.synctime = store.getProxy().reader.rawData.synctime;
        me.gridCnt.gridStore.is_loaded = true;
        if (!Ext.isEmpty(records) && records.length > 0) {
            grid.getSelectionModel().deselectAll();
            if(me.bulkPanelSearch) {
                grid.getSelectionModel().selectAll();
                me.bulkPanelSearch=false;
            }else {
                grid.getSelectionModel().select(0, true);
            }
            me.currentRecord=records[0];
        }
        if(me.bulkPanelSearch) {
            me.bulkPanelSearch=false;
        }
        if (Ext.msk) Ext.msk.hide();
    },
    onGridStoreUpdate: function(store, record, operation, eOpts) {
        
        this.showToolBarMsg(Ext.LANG.globalLang.progressBarText.saving,true);
        var me    = this,
            pnl   = me.currentView,
            rwChkBox            = pnl.query('checkbox[itemId=rwChkBox]'),
            grid                = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridStore           = grid.getStore(),
            gridView            = grid.getView(),
            gridNo              = me.gridCnt.gridNo;

        if((!Ext.isEmpty(rwChkBox) && !rwChkBox[0].checked) || Ext.isEmpty(pnl)) {
            return;
        }
        me.saveData(grid,gridStore,gridView,gridNo,me.gridCnt);
    },
    onSecondGridStoreUpdate: function(store, record, operation, eOpts) {
        var me                  = this,
            pnl                 = me.currentView;
            if(Ext.isEmpty(pnl)){
                return;
            }
            grid                = pnl.query('grid[itemId='+me.filesGridCnt.gridItemId+']')[0],
            gridStore           = grid.getStore(),
            gridView            = grid.getView(),
            gridNo              = me.gridCnt.gridNo,
            extra_params        = gridStore.getProxy().extraParams,
            newRecords          = gridStore.getNewRecords();
        me.saveData(grid,gridStore,gridView,gridNo,me.filesGridCnt);
    },
    onGridItemClick: function(gridView,record,item,index,e,eOpts){
        if (e.getTarget('.icons-delete')) {
            Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
                if(o=="yes"){
                    var me = this,
                        grid = gridView.up('grid'),
                        store = grid.getStore(),
                        extra_params = store.getProxy().extraParams;
                    // extra_params['synctime']= me.gridCnt.synctime;
                    store.remove(record);
                    me.storeSync(store, grid, me.gridCnt);
                }
            },this);
        }
    },
    onBtnSaveClick: function(button,e,opts) {
        var me = this, pnl = me.currentView, grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridStore = grid.getStore(),
            gridView = grid.getView();
        // grid.getSelectionModel().deselectAll();
        if(!Ext.isEmpty(gridStore.getModifiedRecords())){
            me.saveData(grid, gridStore, gridView, me.gridCnt.gridNo, me.gridCnt);
        }
    },
    onBtnDeleteClick: function(button, e, options){
        var me   = this, 
            pnl  = me.currentView, 
            grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0];
           var selectedRecords = grid.getSelectionModel().selected.items;

        if(Ext.isEmpty(selectedRecords))
        {
            return;
            //show error message for not selecting any record.
        }
        // grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
                 
        Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
            if(o=="yes"){
                var gridStore       = grid.getStore(),
                    extra_params    = gridStore.getProxy().extraParams;
                // extra_params['synctime']= me.gridCnt.synctime;
                gridStore.remove(selectedRecords);
                // If not Empty RemoveRecords then  only send request.
                if(!Ext.isEmpty(gridStore.getRemovedRecords())){
                    me.storeSync(gridStore, grid, me.gridCnt);
                }
                //me.storeSync(gridStore, grid, me.gridCnt);
            }
        },this);
    },
    saveData: function(grid,store,view,gridNo,gridCnt) {
        var me = this,
            error = false;
        var error = YBase.utility.GridHelper.validateGrid(grid, store, view,gridNo);
        if (error === false) {
            me.storeSync(store, grid, gridCnt);
        } else {
            me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.validateError,false);
        }
    },
    storeSync: function(store, grid, gridCnt) {
        var mainCntrl = YBase.app.getController('MainController');
        if(mainCntrl.task) {
            mainCntrl.task.restart();
        }
        var me = this,
            modifiedRecords = store.getModifiedRecords(),
            deletedRecords = store.getRemovedRecords(),
            newRecordArray = [],
            modifiedRecordArray = [],
            deletedRecordArray = [],
            extra_params = store.getProxy().extraParams,
            headerFilter = me.getHeaderFilters(grid),params={},
            writer = store.getProxy().writer;
                
        grid._scrollPosition =grid.getEl().down('.x-grid-view').getScroll();
        if(!Ext.isEmpty(modifiedRecords)) {
            for(var i=0;i<modifiedRecords.length;i++) {
                /*if(!Ext.isEmpty(modifiedRecords[i].data.column_2_03)) {
                    modifiedRecords[i].data.column_2_03 = Ext.Date.format(modifiedRecords[i].data.column_2_03,'Y-m-d');
                }*/
                if(!Ext.isEmpty(modifiedRecords[i].get('id'))) {
                    modifiedRecordArray.push(writer.getRecordData(modifiedRecords[i]));
                }
                else {
                    newRecordArray.push(writer.getRecordData(modifiedRecords[i]));
                }
            }
        }
        if(!Ext.isEmpty(deletedRecords)) {
            for(var i=0;i<deletedRecords.length;i++) {
                deletedRecordArray.push(deletedRecords[i].get('id'));
            }
        }
        params['deletedRecords']    = JSON.stringify(deletedRecordArray);
        params['modifiedRecords']   = JSON.stringify(modifiedRecordArray);
        params['newRecords']        = JSON.stringify(newRecordArray);
        params['get_sync_data']     = 1;
        params['synctime']          = me.gridCnt.synctime;
        if(!Ext.isEmpty(extra_params)) {
            for(var key in extra_params) {
                params[key] = extra_params[key];
            }
        }
        Ext.Ajax.request({
            url: store.getProxy().api.update,
            method: 'POST',
            params:params,
            success: function(response) {
                me.onStoreSyncSuccess(response,store,grid,gridCnt);
            },
            failure: function(response) {
                me.onStoreSyncFailure(response,store,grid);
            }
        });
        /*store.sync({
            success: function(response) {
                me.onStoreSyncSuccess(response,store,grid,gridCnt);
            },
            failure: function(response) {
                me.onStoreSyncFailure(response,store,grid);
            }
        });*/
        // extra_params['get_sync_data']= 0;
        me.resetExtraParams(extra_params);
    },
    onStoreSyncSuccess: function(response,store,grid,gridCnt) {
        var me = this,
            resp = Ext.decode(response.responseText);
            // resp = Ext.decode(response.operations[0].response.responseText);
        me.responseObj = resp;
        if (resp.success === true) {
            if(!Ext.isEmpty(gridCnt.showSaveMsg) && !gridCnt.showSaveMsg) {
                //donot show msgBox
            }else {
                var msg = resp.msg;
                me.showToolBarMsg(msg/*Ext.LANG.globalLang.successMsg.saveSuccess*/,true);
            }
            if(!Ext.isEmpty(gridCnt.storeLoadOnSave) && !gridCnt.storeLoadOnSave) {
                me.updateStore(store,resp.syncedData, grid);
                grid.view.refresh();
                gridCnt.synctime = resp.synctime;
                //donot load store
            }else {
                store.load();
            }
        }else if(resp.success === false) {
            me.onStoreSyncFailure(response,store,grid);
        }else {
            //do nth
        }
    },
    onStoreSyncFailure: function(response,store,grid) {
        var me          = this,
            view        = grid.getView(),
            resp        = Ext.decode(response.responseText),
            record      = resp.record,
            recordIdx   = !Ext.isEmpty(record) ? store.find('ext_id',record.ext_id) : -1,
            storeRecord = recordIdx > -1 ? store.getAt(recordIdx) : 0;
        if(!Ext.isEmpty(resp.syncedData)) {
            me.updateStore(store,resp.syncedData, grid);
            me.gridCnt.synctime = resp.synctime;
        }
        if(!Ext.isEmpty(resp.validate_error) && resp.validate_error) {
            var dataIndex = resp.column_idx,
                gridColumn = grid.query('gridcolumn[dataIndex='+dataIndex+']')[0],
                cell = view.getCell(storeRecord,gridColumn),
                errorMsg;
            if(!Ext.isEmpty(resp.is_duplicate) && resp.is_duplicate) {
                errorMsg = Ext.LANG.globalLang.errorMsg.duplicateEntry;
            }else if(!Ext.isEmpty(resp.is_empty) && resp.is_empty) {
                errorMsg = Ext.LANG.globalLang.errorMsg.emptyField;
            }else {
                errorMsg = Ext.LANG.globalLang.errorMsg.basicError;
            }
            if (cell){
                cell.addCls("x-form-invalid-field");
                cell.set({
                    'data-errorqtip': errorMsg
                });
            }
        }
        var saveErrorMsg = !Ext.isEmpty(resp.msg) ? resp.msg : Ext.LANG.globalLang.errorMsg.saveError;
        me.showToolBarMsg(saveErrorMsg,false);
    },
    updateActiveEditorValue:function(record, grid){
        /*
            if editor is active then set fetched value 
        */
        if (!Ext.isEmpty(record)){
            var p2 = grid.getPlugin("plgGridListCellEditing"),
                editingRec = p2.activeRecord,
                store = record.store;
                if (!Ext.isEmpty(p2.activeEditor) && !Ext.isEmpty(editingRec)){
                    if (store.indexOf(record) === store.indexOf(editingRec)){
                        /*if(p2.activeEditor.getValue() != record.get(p2.activeColumn.dataIndex)) {
                            var cell = p2.getCell(p2.activeRecord,p2.activeColumn);
                            cell.set({
                                'data-errorqtip': 'same data'
                            });
                        }*/
                        p2.activeEditor.setValue(record.get(p2.activeColumn.dataIndex));
                    }
                }
        }
    },
    updateStore: function(store,syncedData, grid) {
        var me = this, record, idx, id_array, pnl_id, ext_id,
            editPlugin = grid.getPlugin('plgGridListCellEditing'),
            gridCnt = grid.up('container');
        grid._activeColumn = editPlugin.activeColumn;
        grid._activeRecord = editPlugin.activeRecord;
        if(gridCnt.itemId=='gridCnt'){
            store.un('update', me.onGridStoreUpdate,me);
        }
        else{
            store.un('update', me.onSecondGridStoreUpdate,me);
        }
        for(var i=0;i<syncedData.length;i++) {
            record = null;
            if(syncedData[i].data_status == 'inserted') {
                store.insert(0,syncedData[i]);
            }
            if(syncedData[i].data_status == 'updated') {
                if(!Ext.isEmpty(syncedData[0].ext_id)) {
                    id_array = syncedData[0].ext_id.split(','),
                        pnl_id= id_array[0],
                        ext_id = id_array[1];
                    if(pnl_id == me.currentView.id) {
                        me.updateStoreRecord(store, 'ext_id', syncedData[i], grid);
                    }else {
                        me.updateStoreRecord(store, 'id', syncedData[i], grid);
                    }
                }else {
                    me.updateStoreRecord(store, 'id', syncedData[i], grid);
                }
            }
            if(syncedData[i].data_status == 'deleted') {
                var idx = store.find('id',syncedData[i].id);
                store.removeAt(idx);
            }
        }
        store.commitChanges();
        if (!Ext.isEmpty(grid._scrollPosition) && grid._scrollPosition.top > 0){
            grid.getView().scrollBy( 0, grid._scrollPosition.top, false );
        }
        if (!Ext.isEmpty(grid._activeColumn) && !Ext.isEmpty(grid._activeRecord)){
            editPlugin.startEdit(grid._activeRecord, grid._activeColumn);
        }
        if(gridCnt.itemId=='gridCnt'){
            store.on('update', me.onGridStoreUpdate,me);
        }
        else{
            store.on('update', me.onSecondGridStoreUpdate,me);
        }
    },
    updateStoreRecord:function(store, field, syncedData, grid){
        var me = this, record,
            idx = store.find(field,syncedData[field]);
        if(idx>=0) {
            record = store.getAt(idx);
            record.set(syncedData);
            record.commit(true);
        }else {
            store.insert(0,syncedData);
        }
        grid.view.refresh();
        me.updateActiveEditorValue(record, grid);
    },
    onMenuSelectedCsvClick: function(button, e, options)  {
        var me = this,
            lang = Ext.LANG,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            url = 'bizlayer/csvExport/selectedCsvExport',
            csvParams = {};
        csvParams = {
            'cntrl'         : me,
            'csvName'       : me.currentViewAlias,
            'datagrid_id'   : me.gridCnt.gridNo,
            'grid'          : grid,
            'url'           : url
        };
        YBase.utility.CsvHelper.dwnldSelectedDataCsv(csvParams);
    },
    onMenuAllCsvClick: function(button, e, options) {
        var me = this,
            lang = Ext.LANG,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            csvParams = {};
        csvParams = {
            'cntrl'         : me,
            'datagrid_id'   : me.gridCnt.gridNo,
            'grid'          : grid,
            'templateId'    : me.gridCnt.templateId,
            'get_template_list':me.gridCnt.addDatagridTemplate
        };
        YBase.utility.CsvHelper.dwnldAllDataCsv(csvParams);
    },
    showToolBarMsg: function(msg,success) {
        var me = this,
            msgCmp = me.msgCmp;
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
    hideToolBarMsg: function() {
        var me = this,
            msgCmp = me.msgCmp;
        if(!msgCmp.hidden)
            msgCmp.hide();
    },
    getSyncData: function(grid) {
        var me = this,
            store = grid.getStore(),
            proxy = store.getProxy(),
            extra_params = proxy.extraParams,
            readUrl = proxy.api.read;
        me.showToolBarMsg(Ext.LANG.globalLang.progressBarText.syncing,true);
        var filter = me.getHeaderFilters(grid);
        extra_params['synctime']= me.gridCnt.synctime;
        extra_params['get_sync_data'] = 1;
        if(!Ext.isEmpty(filter))
            extra_params['filter'] = JSON.stringify(filter);
        Ext.Ajax.request({
            url: readUrl,
            method: 'GET',
            params:extra_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.updateStore(store, resp.syncedData, grid);
                    me.hideToolBarMsg();
                    me.gridCnt.synctime = resp.synctime;
                }
            },
            failure: function(response) {

            }
        });
        me.resetExtraParams(extra_params);
    },
    onGridCellClickForMemo:function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts){
         if(Ext.CURRENT_USER.userRole!=50){
            return;
         }
         var me=this,
            clicked_cell_column=me.gridCnt.masterGrid.columnManager.columns[cellIndex];
            if(me.id=="ProjectMasterController"){
                fromProjectMaster=true;
                fromProjectDetail=false;
            }else if(me.id=="ProjectDetailController"){
                fromProjectMaster=false;
                fromProjectDetail=true;
            }
            if(clicked_cell_column.field_type_id==9 ){
                var winMemo = Ext.create('YBase.view.MemoEditWindow');
                winMemo.project_memo=record.get(clicked_cell_column.dataIndex);
                winMemo.fromProjectMaster=fromProjectMaster;
                winMemo.fromProjectDetail=fromProjectDetail;
                winMemo.project_id=record.get('id');
                winMemo.col_dataIndex=clicked_cell_column.dataIndex;
                winMemo.show();
            }
    },
    onGridViewReady:function(){
        var me=this,
            grid=me.gridCnt.masterGrid,
            view = grid.view,
            targetClass = '.memo-tip-cell';
            
        me.tip = Ext.create('Ext.tip.ToolTip', {
            target: view.el,
            delegate: targetClass,
            trackMouse: true,
            width:300,
            height:400,
            renderTo: Ext.getBody(),
            listeners: {
                beforeshow: function updateTipBody(tip) {
                    var col = grid.view.getGridColumns()[tip.triggerElement.cellIndex],
                        record = grid.view.getRecord(tip.triggerElement.parentNode);
                    if (!Ext.isEmpty(col) && !Ext.isEmpty(record)) {
                        tip.update(record.get(col.dataIndex));
                    }
                }
            }
        });
    },
    /*resetValues: function() {
        var me = this;
        me.gridCnt=null;
        me.gridCnt.grid.view.refresh();
    },*/
    getHeaderFilters: function(grid) {
        var me = this,params={},filter=[],
            store = grid.getStore(),
            gridHeaderFilter = store.filters.items;
        if(!Ext.isEmpty(gridHeaderFilter)) {
            for(var i=0;i<gridHeaderFilter.length;i++) {
                var obj = {};
                obj['property'] = gridHeaderFilter[i].property;
                obj['value'] = gridHeaderFilter[i].value;
                filter.push(obj);
            }
        }
        return filter;
    },
    overwriteResetBtn: function(grid) {
        var me = this,
            resetBtn = grid.query('button[itemId=gridFilterResetBtn]')[0];
        resetBtn.on('click',me.onResetBtnClick,me);
    },
    onResetBtnClick: function(button, e, options) {
        var me = this,
            grid = me.gridCnt.grid,
            store = grid.getStore(),
            extra_params = store.getProxy().extraParams;
        me.resetExtraParams(extra_params);
    },
    resetExtraParams: function(extra_params) {
        if('synctime' in extra_params){
            delete extra_params['synctime'];
        }
        if('get_sync_data' in extra_params) {
            delete extra_params['get_sync_data'];
        }
        if(!Ext.isEmpty(extra_params['filter'])) {
            delete extra_params['filter'];
        }
    },
    onRwChkBoxChange: function(checkbox, newValue, oldValue, eOpts) {
        var me = this;
        me.managePanel();
    },
    init: function(application) {
        var me = this,
            currentViewAlias = me.currentViewAlias;
            var selectorObj = {};
            selectorObj[currentViewAlias] = {
                'beforerender': me.onViewBeforeRender, 
                'afterrender' : me.onViewAfterRender,
                'beforeactivate' : me.onViewBeforeActivate
            };
            selectorObj[currentViewAlias+" container[itemId=gridCnt]"] = {
                'beforerender': me.onViewGridCntBeforeRender
            };
            selectorObj[currentViewAlias+" button[itemId=btnAdd]"] = {
                'click': me.onBtnAddClick
            };
            selectorObj[currentViewAlias+" button[itemId=btnSave]"] = {
                'click': me.onBtnSaveClick
            };
            selectorObj[currentViewAlias+" button[itemId=btnDelete]"] = {
                'click': me.onBtnDeleteClick
            };
            selectorObj[currentViewAlias+" menuitem[itemId=menuSelectedCsv]"] = {
                'click': me.onMenuSelectedCsvClick
            };
            selectorObj[currentViewAlias+" menuitem[itemId=menuAllCsv]"] = {
                'click': me.onMenuAllCsvClick
            };
            selectorObj[currentViewAlias+" checkbox[itemId=rwChkBox]"] = {
                'change': me.onRwChkBoxChange
            };
        me.control(selectorObj);
    }
});
