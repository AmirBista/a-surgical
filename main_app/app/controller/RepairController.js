Ext.define('YBase.controller.RepairController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'RepairController',
    currentViewAlias:'repair',
    abstractcomponent:null,
    refs: [
        {
            ref: 'repair',
            selector: 'repair'
        }
    ],
    views:['Repair'],
    implementLanguage: function( absCmp) {
       var me=this,
            lang=Ext.LANG,
            repairListLang=lang.repairList;
             absCmp.setTitle(repairListLang.pnlTitle);
        basicBasePanelLang=lang.BasicBasePanel;
        absCmp.query('button[itemId=btnNewEntry]')[0].setText(basicBasePanelLang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(basicBasePanelLang.btnSave);
        absCmp.query('button[itemId=btnDelete]')[0].setText(basicBasePanelLang.btnDelete);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setText(basicBasePanelLang.btnCsvDwnld);
        absCmp.query('menuitem[itemId=menuSelectedCsv]')[0].setText(basicBasePanelLang.menuSelectedCsv);
        absCmp.query('menuitem[itemId=menuAllCsv]')[0].setText(basicBasePanelLang.menuAllCsv);
        absCmp.query('button[itemId=btnPrint]')[0].setText(basicBasePanelLang.btnPrint);
    },
    
    onRepairBeforeRender: function(absCmp, eOpts) {
        var me = this;
        me.currentView =  absCmp;
        absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setVisible(false);
        me.implementLanguage(absCmp);
        absCmp.route = location.href;
        
        if(Ext.CURRENT_USER.userRole==50) {
            absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        }

       /* var me = this;
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(true);
        
        if(me.verified == Ext.LANG.order.notVerified) {
            abstractcomponent.query('button[itemId=btnVerifyOrder]')[0].enable(true);
        }
        me.implementLanguage(abstractcomponent);*/
    },

    onRepairContianerBeforeRender: function(gridCnt, options) {
        var me = this;
            mainPanel = me.getRepair();
        me.gridCnt = gridCnt;
        me.gridCnt.removeAll();
        me.addGridCntProperty();
        me.loadGrid(me,mainPanel);
    },

    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo                      = 25;
        me.gridCnt.colNo                       = 3;
        me.gridCnt.rowNo                       = 0;
        me.gridCnt.gridItemId                  = 'repairListGrid';  
        me.gridCnt.addSearchCmp                = true;
        me.gridCnt.hideHeaderFilterButtons     = false;
        me.gridCnt.addBulkMenuItem             = true;
        me.gridCnt.addTempSearch               = 1;
        me.gridCnt.chkboxSelModel              = true;
        me.gridCnt.showSaveMsg                 = true;
        me.gridCnt.storeLoadOnSave             = true;
        me.gridCnt.createMsgCmp                = true;
        me.gridCnt.sortable_grid               = true;
        me.gridCnt.hidePagingToolbar           = false;
        //me.gridCnt.addUndoRedo                 = true;
        me.gridCnt.getSyncData                 = false;
        if(!Ext.CURRENT_USER.is_super_user) {
            me.gridCnt.addDatagridTemplate    = 0;
            me.gridCnt.showBulkUpdate         = false;
        }
        else {
            me.gridCnt.addDatagridTemplate    = 1;
            me.gridCnt.showBulkUpdate         = true;
        }
        if(!Ext.CURRENT_USER.is_super_user) {
            me.gridCnt.showBulkUpdate         = false;
        } else {
            me.gridCnt.showBulkUpdate         = true;
        }
    },

    loadGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
               // Ext.Ajax.abort(me.ajaxObj);
            }
        }
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        
        if(me.gridCnt.addSearchCmp == true) {
            params['get_search_list'] = true;
        }

        if(!Ext.isEmpty(me.gridCnt.addSearchCmp) &&  me.gridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        
        if(!Ext.isEmpty(me.gridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.gridCnt.addTempSearch;
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
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.gridCnt.gridNo;
        params_with_col['verified'] = me.verified;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        // Ext.msk.show();
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/repair/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.gridCnt.responseObj    = resp;
                    me.gridCnt.templateId     = resp.templateId;
                    me.gridCnt.templateList   = resp.templateList;
                    me.gridCnt.searchList     = resp.searchList;
                    //me.gridCnt.synctime       = resp.synctime;         
                    YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'cntrl'             : me,
                            'pageSize'          : pageSize, 
                            'fields'            : fields,
                            'validations'       : resp.validations,
                            'storeId'           : 'newRepairListJSON', 
                            'storeUrl'          : 'bizlayer/repair/list', 
                            'create'            : 'bizlayer/repair/crud', 
                            'destroy'           : 'bizlayer/repair/crud', 
                            'extra_params'      : {'synctime':me.gridCnt.synctime}, 
                            'writeAllFields'    : false,
                            'editable'          : true,
                            // 'idProperty'        : 'id',
                            'forceSubmitFields' : ['id'/*,'ext_id'*/],
                        };
                    
                    me.gridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.gridCnt.responseObj,
                            'gridCnt'               : me.gridCnt,
                            'gridStore'             : me.gridCnt.gridStore, 
                            'gridItemId'            : me.gridCnt.gridItemId,
                            'chkboxSelModel'        : me.gridCnt.chkboxSelModel,
                            'addSearchCmp'          : me.gridCnt.addSearchCmp,
                            'addDatagridTemplate'   : me.gridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'hidePagingToolbar'     : me.gridCnt.hidePagingToolbar,
                            'loadMask'              : true,
                            'cellEditorTriggerEvent': 'celldblclick',
                            'selModelMode'          : 'MULTI',
                            'setTemplateId'         : me.gridCnt.templateId,
                            'templateList'          : me.gridCnt.templateList,
                            'searchList'            : me.gridCnt.searchList,
                            'addTempSearch'         : me.gridCnt.addTempSearch,
                            'sortable_grid'         : me.gridCnt.sortable_grid,
                            'createMsgCmp'          : me.gridCnt.createMsgCmp,
                            'hideHeaderFilterButtons':me.gridCnt.hideHeaderFilterButtons,
                            //'auto_add_row'          : me.gridCnt.auto_add_row,
                            'actionRenderer'        : me.delete_edit_renderer,
                            'actionColWidth'        : 110
                        };
                    
                    me.gridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    me.gridCnt.grid.on('itemclick', me.onRepairMasterGridItemClick, me);
                    // me.gridCnt.gridStore.on('beforeload', me.gridCntGridBeforeStoreLoad,me);
                    // me.gridCnt.gridStore.on('load', me.gridCntGridBeforeStoreLoad,me);
                    me.gridCnt.gridStore.loadRawData(resp);

                    if(!Ext.isEmpty(abstractcomponent.filter_params)) {
                        for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                            me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
                        }
                    }
                    else {
                        // do nth
                    }
                    me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
                    YBase.utility.GridHelper.hideMsk();
                }
            }
        });
    },
    onCustomerNameSelect: function(fld,record){
        var me = this,
            repairController = this.getRepair(),
            grid = repairController.query('grid[itemId=repairListGrid]')[0],
            selected = grid.getSelectionModel().getLastSelected(),
            customer_name = record[0].data.column_3_07,
            gender = record[0].data.column_3_10,
            address = record[0].data.column_3_13,
            email = record[0].data.column_3_16,
            phone = record[0].data.column_3_17;

            selected.set("column_12_13",customer_name);
            selected.set("column_12_14",gender);
            selected.set("column_12_15",address);
            selected.set("column_12_16",phone);
            selected.set("column_12_17",email);
    },
    onBtnNewEntryClick: function(btn){
        Ext.Router.redirect('RepairEntryWindow/new?mode=new');
    },
    delete_edit_renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-view" data-qtip="{0}">{0}</span><span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.globalLang.buttons.btnEdit);
    },
    onRepairMasterGridItemClick: function(gridView,record,item,index,e,eOpts){
        if(e.getTarget('.icons-view')){
            Ext.Router.redirect('RepairEntryWindow/edit?id='+record.get('id')+'&entry_code='+record.get('column_12_01')+'&mode=edit');
        }
        else if (e.getTarget('.icons-delete')) {
            Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
                if(o=="yes"){
                    var me = this,
                        grid = gridView.up('grid'),
                        store = grid.getStore(),
                        extra_params = store.getProxy().extraParams;
                    // extra_params['synctime']= me.clientMasterGridCnt.synctime;
                    store.remove(record);
                    me.storeSync(store,grid,me.gridCnt);
                    

                }
            },this);
        }
    },
    /*storeSync: function(store, grid) {
        var me = this,
            modifiedRecords = store.getModifiedRecords(),
            deletedRecords = store.getRemovedRecords(),
            newRecordArray = [],
            modifiedRecordArray = [],
            deletedRecordArray = [],
            extra_params = store.getProxy().extraParams,
            params={},
            writer = store.getProxy().writer;
        if(!Ext.isEmpty(modifiedRecords)) {
            for(var i=0;i<modifiedRecords.length;i++) {
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
                var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        me.onStoreSyncSuccess(resp,store,grid);
                        me.showToolBarMsg(Ext.LANG.globalLang.successMsg.saveSuccess,true);
                    }
            },
            failure: function(response) {
            }
        },store);
    },
    onStoreSyncSuccess:function(resp,store,grid){
        store.loadRawData(resp);
    },
    onBtnDeleteClick: function(button, e, options){
        Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
            if(o=="yes"){
                var me = this, pnl = me.currentView, 
                    grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
                    selectedRecords = grid.getSelectionModel().selected.items,
                    gridStore = grid.getStore(),
                    extra_params = gridStore.getProxy().extraParams;
                // extra_params['synctime']= me.clientMasterGridCnt.synctime;
                gridStore.remove(selectedRecords);
                me.storeSync(gridStore, grid);
            }
        },this);
    },
    onBtnSaveClick: function(button){
        var me = this, pnl = me.currentView, grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridStore = grid.getStore(),
            gridView = grid.getView();
        me.saveData(grid, gridStore, gridView, me.gridCnt.gridNo, me.gridCnt);
    },
    saveData: function(grid,store,view,gridNo,gridCnt) {
        var me = this,
            error = false;
        var error = YBase.utility.GridHelper.validateGrid(grid, store, view,gridNo);
        if(!Ext.isEmpty(store.getModifiedRecords())){
            if (error === false) {
                me.storeSync(store, grid);
            } else {
                me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.validateError,false);
            }
        }
    },*/
    init: function(application) {
        this.control({
            "repair":{
                beforerender: this.onRepairBeforeRender
            },
            "repair container[itemId=gridCnt]": {
                beforerender: this.onRepairContianerBeforeRender
            },
            "repair button[itemId=btnNewEntry]": {
                click: this.onBtnNewEntryClick
            },
            "repair button[itemId=btnDelete]": {
                click: this.onBtnDeleteClick
            },
            "repair button[itemId=btnSave]": {
                click: this.onBtnSaveClick
            },
            "repair combobox[itemId=column_12_763]":{
                select : this.onCustomerNameSelect
            }
            /*,
            "repairList button[itemId=btnPrintOrderStock]" : {
                click : this.onBtnPrintOrderStockClick
            },
             "repairList button[itemId=btnVerifyOrder]" : {
                click : this.onBtnVerifyOrderClick
            },
            "repairList radiofield[itemId=radioOrderVerified]" : {
                change : this.onRadioOrderVerifiedChange
            },
            "repairList radiofield[itemId=radioOrderNotVerified]" : {
                change : this.onRadioOrderNotVerifiedChange
            },
            "repairList radiofield[itemId=radioOrderAll]" : {
                change : this.onRadioOrderAllChange
            },
            "repairList button[itemId=btnSave]" : {
                click : this.onBtnSaveClick
            },*/

        });
       // this.callParent(arguments);
    }

});
