Ext.define('YBase.controller.BatchMasterController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'BatchMasterController',
    currentViewAlias:'batchMasterPanel',
    abstractcomponent:null,
    refs:[
        {
            ref: 'batchMaster',
            selector: 'batchMaster'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    bulkPanelSearch:false,
    errorFlg:false,
    delete_renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.globalLang.buttons.btnDelete);
        // return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.buttons['delete']);
    },
    languageImplementation: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            batchMasterLang=lang.batchMasterPanel;
        absCmp.setTitle(batchMasterLang.pnlTitle);
        absCmp.query('button[itemId=btnNewEntry]')[0].setText(batchMasterLang.btnNewEntry);
        me.showHideCmp(absCmp);
    },
    showHideCmp: function(absCmp){
        var me = this;
            absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
    },
    onViewBeforeRender:function(absCmp, eOpts){
        this.callParent(arguments);
        var me = this;
        me.hidePnlActionButtons(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
        me.loadViewGrid(absCmp);
    },
    hidePnlActionButtons: function(absCmp) {
        // absCmp.query('checkbox[itemId=rwChkBox]')[0].setVisible(false);
        absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnUpdateStock]')[0].setVisible(true);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);

        if(Ext.CURRENT_USER.userRole==50)
        {
        absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        }
        // absCmp.query('button[itemId=btnDelete]')[0].setVisible(false);
    },
    loadViewGrid:function(absCmp)
    {
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=batchMasterInfoGridCnt]')[0]; 
        me.batchMasterDetailGridCnt = absCmp.query('container[itemId=batchMasterDetailGridCnt]')[0];
        me.gridCnt.removeAll();  
        me.batchMasterDetailGridCnt.removeAll();
        me.addGridCntProperty();
        me.loadGrid(me,absCmp);

    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 6;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'batchMasterGrid';   
        me.gridCnt.addTempSearch      = 1;
        me.gridCnt.showSaveMsg        = true;
        me.gridCnt.storeLoadOnSave    = false;
        me.gridCnt.createMsgCmp       = true;
        if(!Ext.CURRENT_USER.is_super_user) {
            me.gridCnt.addDatagridTemplate= 0;
            me.gridCnt.showBulkUpdate = false;
        }
        else {
            me.gridCnt.addDatagridTemplate= 1;
            me.gridCnt.showBulkUpdate = true;
        }

        me.batchMasterDetailGridCnt.gridNo             = 7;
        me.batchMasterDetailGridCnt.colNo              = 4;
        me.batchMasterDetailGridCnt.rowNo              = 0;
        me.batchMasterDetailGridCnt.gridItemId         = 'batchMasterDetailGrid';   
        me.batchMasterDetailGridCnt.addTempSearch      = 1;
        me.batchMasterDetailGridCnt.showSaveMsg        = true;
        me.batchMasterDetailGridCnt.storeLoadOnSave    = false;
        me.batchMasterDetailGridCnt.createMsgCmp       = true;
        me.batchMasterDetailGridCnt.showBulkUpdate     = false;
        me.batchMasterDetailGridCnt.addDatagridTemplate= 0;
        /*if(!Ext.CURRENT_USER.is_super_user) 
            me.batchMasterDetailGridCnt.addDatagridTemplate= 0;
        else 
            me.batchMasterDetailGridCnt.addDatagridTemplate= 1;*/
 
    },
    loadGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;

        if(!Ext.isEmpty(me.gridCnt.addSearchCmp) &&  me.gridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
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
        if(!Ext.isEmpty(me.gridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.gridCnt.addTempSearch;
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.gridCnt.gridNo;
        params_with_col['get_batch_master_detail'] = 1;
        params_with_col['is_draft']                = 0;

        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/batchMaster/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.renderBatchMasterGrid(me, abstractcomponent,resp);
                    me.renderBatchMasterDetailGrid(me,abstractcomponent,resp.batch_master_detail_info);
                }else{
                    abstractcomponent.destroy();
                    Ext.Msg.show({
                        title:Ext.LANG.globalLang.app.appTitle,
                        msg: resp.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
                if(Ext.msk)
                    Ext.msk.hide();
            }
        });
    },
    renderBatchMasterGrid:function(me, abstractcomponent,resp)
    {
        var me          = this,
            pageSize    = resp.page_size,
            fields      = resp.fields;
        me.gridCnt.responseObj    = resp;
        me.gridCnt.templateId     = resp.templateId;
        me.gridCnt.templateList   = resp.templateList;
        me.gridCnt.searchList     = resp.searchList;
        me.gridCnt.synctime       = resp.synctime;
        // me.gridCnt.templateId = resp.templateId;
       // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
        var storeParamObj = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'batchMasterJSON', 
                'storeUrl'      : 'bizlayer/batchMaster/list', 
                'create'        : 'bizlayer/batchMaster/crud', 
                'destroy'       : 'bizlayer/batchMaster/crud', 
                'extra_params'  : {
                    'synctime': me.gridCnt.synctime,
                    'datagrid_id': me.gridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.gridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj={
                'cntrl'                 : me,
                'absCmp'                : abstractcomponent,
                'respObj'               : me.gridCnt.responseObj,
                'gridCnt'               : me.gridCnt,
                'gridStore'             : me.gridCnt.gridStore, 
                'gridItemId'            : me.gridCnt.gridItemId,
                'addDatagridTemplate'   : me.gridCnt.addDatagridTemplate,
                'listDataFn'            : me.loadGrid,
                'loadMask'              : true,
                'setTemplateId'         : me.gridCnt.templateId,
                'templateList'          : me.gridCnt.templateList,
                'searchList'            : me.gridCnt.searchList,
                'addTempSearch'         : me.gridCnt.addTempSearch,
                'createMsgCmp'          : me.gridCnt.createMsgCmp,
                'actionRenderer'        : YBase.utility.GridHelper.actionViewDeleteRenderer,
                'actionColWidth'        : 110
            };
        me.gridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.gridCnt);
        //me.gridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        me.gridCnt.grid.on('itemclick', me.onBatchMasterGridItemClick, me);
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
    },
    renderBatchMasterDetailGrid :function(me,abstractcomponent,resp)
    {
        var me          = this,
            pageSize    = resp.page_size,
            fields      = resp.fields,
            storeParamObj = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'batchMasterDetailJSON', 
                'storeUrl'      : 'bizlayer/batchDetail/list', 
                'create'        : 'bizlayer/batchDetail/crud', 
                'destroy'       : 'bizlayer/batchDetail/crud', 
                'extra_params'  : {
                    'synctime': me.batchMasterDetailGridCnt.synctime,
                    'datagrid_id': me.batchMasterDetailGridCnt.gridNo,
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.batchMasterDetailGridCnt.responseObj    = resp;
        me.batchMasterDetailGridCnt.templateId     = resp.templateId;
        me.batchMasterDetailGridCnt.templateList   = resp.templateList;
        me.batchMasterDetailGridCnt.searchList     = resp.searchList;
        me.batchMasterDetailGridCnt.synctime       = resp.synctime;
          // me.batchMasterDetailGridCnt.templateId = resp.templateId;
       // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
       
        me.batchMasterDetailGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj={
                'cntrl'                 : me,
                'absCmp'                : abstractcomponent,
                'respObj'               : me.batchMasterDetailGridCnt.responseObj,
                'gridCnt'               : me.batchMasterDetailGridCnt,
                'gridStore'             : me.batchMasterDetailGridCnt.gridStore, 
                'gridItemId'            : me.batchMasterDetailGridCnt.gridItemId,
                'addDatagridTemplate'   : me.batchMasterDetailGridCnt.addDatagridTemplate,
                'listDataFn'            : me.loadGrid,
                'loadMask'              : true,
                'setTemplateId'         : me.batchMasterDetailGridCnt.templateId,
                'templateList'          : me.batchMasterDetailGridCnt.templateList,
                'searchList'            : me.batchMasterDetailGridCnt.searchList,
                'addTempSearch'         : me.batchMasterDetailGridCnt.addTempSearch,
                'createMsgCmp'          : me.batchMasterDetailGridCnt.createMsgCmp,
                'actionRenderer'        : me.delete_renderer
            };
        me.batchMasterDetailGridCnt.batchMasterDetailGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        me.batchMasterDetailGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.batchMasterDetailGridCnt);

        me.batchMasterDetailGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var grid =  me.gridCnt.grid,
                gridSelection = grid.getSelectionModel().getSelection(),
                batch_master_id = null,
                hasOrderId =  false;
                if(!Ext.isEmpty(gridSelection)){
                    var  lastSelectedRecord =  grid.getSelectionModel().getLastSelected();
                    if(!Ext.isEmpty(lastSelectedRecord)){
                        batch_master_id =  lastSelectedRecord.raw.id;
                        hasOrderId = true;
                    }
                }
            me.batchMasterDetailGridCnt.gridStore.getProxy().extraParams = ({'entry_id':batch_master_id,forBatchDetailPanel:2,'hasOrderId':hasOrderId, 'datagrid_id':me.batchMasterDetailGridCnt.gridNo,
                                         });
        },me);
        //me.batchMasterDetailGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.batchMasterDetailGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.batchMasterDetailGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    onGridStoreLoad: function(store, records, success, gridCnt) {
        var me      = this,
            pnl     = me.currentView,
            grid    = pnl.query('grid[itemId='+gridCnt.gridItemId+']')[0];
        // me.gridCnt.synctime = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        gridCnt.synctime = store.getProxy().reader.rawData.synctime;
        gridCnt.gridStore.is_loaded = true;
        if (!Ext.isEmpty(records) && records.length > 0) {
            if(me.bulkPanelSearch) {
                grid.getSelectionModel().selectAll();
                me.bulkPanelSearch=false;
            }else {
                if(grid.itemId == me.gridCnt.gridItemId)
                {
                    grid.getSelectionModel().deselectAll();
                    grid.getSelectionModel().select(0, true);
                }
           }
            me.currentRecord=records[0];
        }
        if(me.bulkPanelSearch) {
            me.bulkPanelSearch=false;
        }
        if (Ext.msk) Ext.msk.hide();
    },
    onGridStoreUpdate:function(){
        //do nothing
    },
    onSecondGridStoreUpdate: function(store, record, operation, eOpts) {
        var me                  = this,
            pnl                 = me.currentView;
            if(Ext.isEmpty(pnl)){
                return;
            }
            grid                = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            gridStore           = grid.getStore(),
            gridView            = grid.getView(),
            gridNo              = me.gridCnt.gridNo,
            extra_params        = gridStore.getProxy().extraParams,
            newRecords          = gridStore.getNewRecords();
        me.saveData(grid,gridStore,gridView,gridNo,me.gridCnt);
    },
    onBatchMasterGridSelectionChange:function(grid, selected, eOpts )
    {
        var me =  this,
            grid = me.batchMasterDetailGridCnt.batchMasterDetailGrid;
        if(!Ext.isEmpty(selected)){
            var selectedIndex =  selected.length,
                lastSelectedRecord = selected[selectedIndex-1];
            me.getBatchMasterDetailRecords(lastSelectedRecord,grid);
        }
        else
            grid.getStore().removeAll();
    },
    getBatchMasterDetailRecords: function(record,grid){
        var me =  this;
        Ext.Ajax.request({
            url : 'bizlayer/batchDetail/list',
            params: {
                'entry_id':record.data.id,
                'forBatchDetailPanel':2,
                'hasOrderId':true,
                'datagrid_id':me.batchMasterDetailGridCnt.gridNo},
            method: 'POST',
            scope: me,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var me = this,
                        gridStore = me.batchMasterDetailGridCnt.batchMasterDetailGrid.getStore();
                    gridStore.loadRawData(resp);
                }
                else{
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   resp.message,
                        modal: true,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            }
        });
    },
    onBtnNewEntryClick: function() {
        Ext.Router.redirect('PurchaseEntryPanel/new?mode=new&purchaseEntry=true');
    },
    onBtnUpdateStockClick: function(button, e, eOpts){
        var me=this,
            batchMasterPanel =  me.currentView,
            batchMasterGrid = batchMasterPanel.query('grid[itemId=batchMasterGrid]')[0],
            batchMasterIds=[],
            selectedRecords = batchMasterGrid.getSelectionModel().getSelection();
            
            if(Ext.isEmpty(selectedRecords)){
                me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.noRowsSelected,false);
                return;
            }
            var batchMasterPanelLang = Ext.LANG.batchMasterPanel,
                stockUpdateStatus_Done = batchMasterPanelLang.stockUpdateStatus.done;
            
            if(!Ext.isEmpty(selectedRecords)){
                var  is_stockUpdateStatusDone = false;
                Ext.each(selectedRecords, function(record) {
                    if(record.raw.column_4_26 == stockUpdateStatus_Done){
                       is_stockUpdateStatusDone = true;
                    }else if (record.raw.column_4_26!=stockUpdateStatus_Done){
                        batchMasterIds.push(record.get('id'));
                    }
                });
                if(is_stockUpdateStatusDone){
                    Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.findedDoneStatus, function(o){
                        if(o=="yes"){
                            me.updateStock(batchMasterIds,batchMasterGrid);
                        }
                    });
                }else{
                    me.updateStock(batchMasterIds,batchMasterGrid);
                }
            }
    },
    updateStock:function(batchMasterIds,batchMasterGrid){
        var me = this;
        if(Ext.isEmpty(batchMasterIds)){
            me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.noRecordToUpdate,false);
            return;
        }
        Ext.msk = Ext.create('YBase.utility.Mask');
        Ext.msk.show();
         Ext.Ajax.request({
                url : 'bizlayer/batchDetail/updateStock',
                params: {
                    'batch_master_ids': JSON.stringify(batchMasterIds)
                },
                method: 'POST',
                scope: me,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        batchMasterGrid.getStore().reload();
                        me.showToolBarMsg(resp.msg,true);
                    }else{
                         me.showToolBarMsg(resp.msg,false);
                    }
                    if(Ext.msk)
                    {
                        Ext.msk.hide();
                    }
                }
            });
    },
    onBatchMasterGridItemClick: function(gridView,record,item,index,e,eOpts){
        if(e.getTarget('.icons-view')){
            Ext.Router.redirect('PurchaseEntryPanel/edit?id='+record.get('id')+'&entry_code='+record.get('column_4_01')+'&mode=edit');
        }
        else if (e.getTarget('.icons-delete')) {
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
    init: function(application) {
        var me=this;
        me.control({
            "batchMasterPanel grid[itemId=batchMasterGrid]":{
                selectionchange: me.onBatchMasterGridSelectionChange
            },
            "batchMasterPanel button[itemId=btnNewEntry]" : {
                click:me.onBtnNewEntryClick
            },
            "batchMasterPanel button[itemId=btnUpdateStock]" : {
                click : me.onBtnUpdateStockClick
            }
        });
        this.callParent(arguments);
    }
});