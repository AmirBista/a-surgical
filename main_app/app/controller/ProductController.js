Ext.define('YBase.controller.ProductController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'ProductController',
    currentViewAlias:'productMaster',
    abstractcomponent:null,
    refs:[
        {
            ref: 'productMaster',
            selector: 'productMaster'
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
        var me = this,
            lang = Ext.LANG,
            productLang = lang.productPanel,
            basicBasePanelLang = lang.BasicBasePanel;
        absCmp.setTitle(productLang.pnlTitle);
        absCmp.query('button[itemId=btnAdd]')[0].setText(basicBasePanelLang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(basicBasePanelLang.btnSave);
        absCmp.query('button[itemId=btnNewEntry]')[0].setText(productLang.btnNewEntry);
        absCmp.query('button[itemId=btnDelete]')[0].setText(basicBasePanelLang.btnDelete);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setText(basicBasePanelLang.btnCsvDwnld);
        absCmp.query('menuitem[itemId=menuSelectedTemp91Print]')[0].setText(basicBasePanelLang.menuSelectedTemp91Print);

        // me.showHideCmp(absCmp);
    },
    // showHideCmp: function(absCmp){
    //     var me = this;
    //     absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
    //     absCmp.query('button[itemId=btnAdd]')[0].setVisible(true);
    //     absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
    //     absCmp.query('button[itemId=btnPrint]')[0].setVisible(true);
    // },
    
    onGridStoreUpdate:function(){
        //do nothing
    },
    onViewBeforeRender: function(absCmp){
        this.callParent(arguments);
        var me=this;
        me.hidePnlActionButtons(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
        // me.currentView = absCmp;
        me.loadViewGrid(absCmp);
        // absCmp.query('container[itemId=topMainCnt]')[0].setVisible(true);
        // absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
    },
    loadViewGrid: function(absCmp){
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=gridCnt]')[0]; 
        me.productBatchDetailGridCnt = absCmp.query('container[itemId=productBatchDetailGridCnt]')[0];
        me.storeGridCnt = absCmp.query('container[itemId=storeCnt]')[0];
        me.gridCnt.removeAll();  
        me.productBatchDetailGridCnt.removeAll();
        me.storeGridCnt.removeAll();  
        /* me.addGridCntProperty();
        me.loadGrid(me,absCmp);*/
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 9;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'productMasterGrid';   
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

        me.productBatchDetailGridCnt.gridNo             = 7;
        me.productBatchDetailGridCnt.colNo              = 4;
        me.productBatchDetailGridCnt.rowNo              = 0;
        me.productBatchDetailGridCnt.gridItemId         = 'productBatchDetailGrid';   
        me.productBatchDetailGridCnt.addTempSearch      = 1;
        me.productBatchDetailGridCnt.showSaveMsg        = false;
        me.productBatchDetailGridCnt.storeLoadOnSave    = false;
        me.productBatchDetailGridCnt.createMsgCmp       = false;
        me.productBatchDetailGridCnt.showBulkUpdate     = false;
        me.productBatchDetailGridCnt.addDatagridTemplate= 0;

        me.storeGridCnt.gridNo             = 30;
        me.storeGridCnt.colNo              = 4;
        me.storeGridCnt.rowNo              = 0;
        me.storeGridCnt.gridItemId         = 'productStoreGrid';   
        me.storeGridCnt.addTempSearch      = 1;
        me.storeGridCnt.showSaveMsg        = false;
        me.storeGridCnt.storeLoadOnSave    = false;
        me.storeGridCnt.createMsgCmp       = false;
        me.storeGridCnt.showBulkUpdate     = false;
        me.storeGridCnt.addDatagridTemplate= 0;


        /*if(!Ext.CURRENT_USER.is_super_user) 
            me.productBatchDetailGridCnt.addDatagridTemplate= 0;
        else 
            me.productBatchDetailGridCnt.addDatagridTemplate= 1;*/

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
        params_with_col['get_batch_product_detail'] = 1;

        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/product/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.renderProductMasterGrid(me, abstractcomponent,resp);
                    me.renderProductBatchDetailGrid(me,abstractcomponent,resp.product_batchdetail_info);
                    me.renderProductStoreGrid(me,abstractcomponent,resp.product_store_info);
                    me.gridCnt.gridStore.loadRawData(resp);
                    if(Ext.msk)
                        Ext.msk.hide();
                }
            }
        });
    },
    renderProductMasterGrid: function(me,abstractcomponent,resp)
    {
        var me              = this,
            pageSize        = resp.page_size,
            fields          = resp.fields;
        me.gridCnt.responseObj    = resp;
        me.gridCnt.templateId     = resp.templateId;
        me.gridCnt.templateList   = resp.templateList;
        me.gridCnt.searchList     = resp.searchList;
        me.gridCnt.synctime       = resp.synctime;
        
        var storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'productMasterJSON', 
                'storeUrl'      : 'bizlayer/product/list', 
                'create'        : 'bizlayer/product/crud', 
                'destroy'       : 'bizlayer/product/crud', 
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
        var paramObj = {
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
            'actionRenderer'        : me.delete_renderer
        };
        me.gridCnt.productMasterGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);

        me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.gridCnt);
        //me.gridCnt.gridStore.on('update', me.onGridStoreUpdate, me);
       /**/
        me.gridCnt.productMasterGrid.on('itemclick', me.onGridItemClick, me);
        // me.gridCnt.gridStore.loadRawData(resp);

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
    renderProductBatchDetailGrid:function(me,abstractcomponent,resp){
        var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'producBatchDetailJSON', 
                'storeUrl'      : 'bizlayer/batchDetail/list', 
                'create'        : 'bizlayer/batchDetail/crud', 
                'destroy'       : 'bizlayer/batchDetail/crud', 
                'extra_params'  : {
                    'synctime': me.productBatchDetailGridCnt.synctime,
                    'datagrid_id': me.productBatchDetailGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.productBatchDetailGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.productBatchDetailGridCnt,
            'gridStore'             : me.productBatchDetailGridCnt.gridStore, 
            'gridItemId'            : me.productBatchDetailGridCnt.gridItemId,
            'addDatagridTemplate'   : me.productBatchDetailGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.productBatchDetailGridCnt.templateId,
            'templateList'          : me.productBatchDetailGridCnt.templateList,
            'searchList'            : me.productBatchDetailGridCnt.searchList,
            'addTempSearch'         : me.productBatchDetailGridCnt.addTempSearch,
            'createMsgCmp'          : me.productBatchDetailGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true
            // 'actionRenderer'        : me.delete_renderer
        };
        me.productBatchDetailGridCnt.productBatchDetailGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        me.productBatchDetailGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.productBatchDetailGridCnt);
        me.productBatchDetailGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var grid =  me.gridCnt.productMasterGrid,
                gridSelection = grid.getSelectionModel().getSelection(),
                product_code = null,
                company_id = 0,
                store_id = 0,
                hasOrderId =  false;
                if(!Ext.isEmpty(gridSelection)){
                    var  lastSelectedRecord =  grid.getSelectionModel().getLastSelected();
                    if(!Ext.isEmpty(lastSelectedRecord) && !Ext.isEmpty(lastSelectedRecord.raw)){
                        product_code =  lastSelectedRecord.raw.column_5_05;
                        hasOrderId = true;
                        company_id =lastSelectedRecord.raw.company_id;
                        store_id =lastSelectedRecord.raw.store_id;
                    }
                }
                
            me.productBatchDetailGridCnt.gridStore.getProxy().extraParams = ({
                                                                'product_code':product_code,
                                                                forBatchDetailPanel:1,
                                                                'hasOrderId':hasOrderId, 
                                                                'datagrid_id':me.productBatchDetailGridCnt.gridNo,
                                                                'company_id' : company_id,
                                                                'store_id' : store_id
                                         });
        },me);
        //me.productBatchDetailGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.productBatchDetailGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.productBatchDetailGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    renderProductStoreGrid:function(me,abstractcomponent,resp){
        var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'productStoreJSON', 
                'storeUrl'      : 'bizlayer/product/list', 
             /*   'create'        : 'bizlayer/batchDetail/crud', 
                'destroy'       : 'bizlayer/batchDetail/crud', */
                'extra_params'  : {
                    'synctime': me.storeGridCnt.synctime,
                    'datagrid_id': me.storeGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.storeGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.storeGridCnt,
            'gridStore'             : me.storeGridCnt.gridStore, 
            'gridItemId'            : me.storeGridCnt.gridItemId,
            'addDatagridTemplate'   : me.storeGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.storeGridCnt.templateId,
            'templateList'          : me.storeGridCnt.templateList,
            'searchList'            : me.storeGridCnt.searchList,
            'addTempSearch'         : me.storeGridCnt.addTempSearch,
            'createMsgCmp'          : me.storeGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true
            // 'actionRenderer'        : me.delete_renderer
        };
        me.storeGridCnt.productStoreGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        me.storeGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.storeGridCnt);
        me.storeGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var grid =  me.gridCnt.productMasterGrid,
                gridSelection = grid.getSelectionModel().getSelection(),
                product_code = null,
                store_id = null;
                if(!Ext.isEmpty(gridSelection)){
                    var  lastSelectedRecord =  grid.getSelectionModel().getLastSelected();
                    if(!Ext.isEmpty(lastSelectedRecord)){
                        product_code =  lastSelectedRecord.raw.column_5_05,
                        store_id  = lastSelectedRecord.raw.store_id
                    }
                }
            me.storeGridCnt.gridStore.getProxy().extraParams = 
                ({  'product_code':product_code,
                     'forBatchDetailPanel':1,
                     'getStoreOthers':1,
                     'collection_store_id':store_id,
                     'datagrid_id':me.storeGridCnt.gridNo
                });
        },me);
        //me.storeGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.storeGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.storeGridCnt.gridStore.loadRawData(resp);

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
    onProductMasterInfoGridSelectionChange:function(grid, selected, eOpts )
    {
        var me =  this,
            storeGrid =  me.storeGridCnt.productStoreGrid,
            batchDetailGrid = me.productBatchDetailGridCnt.productBatchDetailGrid;
        if(!Ext.isEmpty(selected)){
            var selectedIndex =  selected.length,
                lastSelectedRecord = selected[selectedIndex-1];
            if(!Ext.isEmpty(lastSelectedRecord.data.id)){
                me.getProductBatchDetailRecords(lastSelectedRecord,batchDetailGrid);
                me.getProductStoreRecords(lastSelectedRecord,storeGrid);
            }
        }
        else{
            batchDetailGrid.getStore().removeAll();
            storeGrid.getStore().removeAll();
        }
    },
    getProductBatchDetailRecords: function(record,grid){
        var me =  this,
            gridStore = grid.getStore();
        gridStore.load();
    },
    getProductStoreRecords: function(record,grid){
        var me =  this,
            gridStore = me.storeGridCnt.productStoreGrid.getStore();
        gridStore.load();
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
                    grid.getSelectionModel().deselectAll();
                    grid.getSelectionModel().select(0, true);
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
    hidePnlActionButtons: function(absCmp) {
        absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
        absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(true);
        absCmp.query('button[itemId=btnUpdateStock]')[0].setVisible(false);
        absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
        
        if(Ext.CURRENT_USER.userRole==50)
        {
            absCmp.query('button[itemId=btnDelete]')[0].setVisible(true);
        }
        else
        {
            absCmp.query('button[itemId=btnDelete]')[0].setVisible(false);
        }
    },
    removeProductMasterRec: function(grid){
        var me = this,
            store =  grid.getStore(),
            modifiedRec =  store.getRemovedRecords(),
            modifiedRecArr= [],
            selectableArray = ['column_9_01','delete_flg','id'];
            Ext.each(modifiedRec, function(row) {
                var data = {};
                for (i = 0; i < selectableArray.length; i++) {
                    data[selectableArray[i]] = row.data[selectableArray[i]];
                 }
                modifiedRecArr.push(data);
            });
            var records = {'modifiedRecords':JSON.stringify(modifiedRecArr),
                                    'deletedRecords':null,
                                    'newRecords':null
                                    };
            Ext.Ajax.request({
                url: 'bizlayer/product/crud',
                method: 'POST',
                params:records,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success) {
                        store.reload();
                    }   
                }
            });  
    },
    
    // onBtnNewEntryClick: function() {
    //     Ext.Router.redirect('PurchaseEntryPanel/new?mode=new&purchaseEntry=true');
    // },
    onEditorComboSelect: function(combo,record){
        var me = this,
            absCmp = me.absCmp,
            itemId = combo.itemId;
        // Supplier Combo Grid
        if(itemId == "column_5_409"){
            var grid = absCmp.query('grid[itemId=productMasterGrid]')[0],
                selectedRecord = grid.getSelectionModel().getSelection()[0];
            selectedRecord.set('supplier_id',record[0].raw.id);
        }
    },
    onTabBeforeRender: function(absCmp,eOpts){
        var  productLang = Ext.LANG.productPanel;
        absCmp.query('panel[itemId=productBatchDetail]')[0].setTitle(productLang.productDetailTab);
        absCmp.query('panel[itemId=store]')[0].setTitle(productLang.storeTab);
    },
    onTabchange: function(tabPanel, newCard, oldCard, eOpts){
        var me = this,
            grid =  me.gridCnt.productMasterGrid;
            grid.getView().refresh();
    },
    onStockPrintMenuItemClick : function(button,e,eOpts){
         var me = this,
            lang = Ext.LANG,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            url = 'bizlayer/csvReport/getCsvReportArray',
            date = new Date(),
            date = Ext.Date.format(date,'Y-m');
        var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: url,
                baseParams: {
                    'store_name'    : Ext.CURRENT_USER.department_name,
                    'date'          : date,
                    'csv_report_id' : 12,
                    'report_type'          : 'stock'
                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
    },
    onProductMasterGridAfterRender:function(absCmp)
    {
        var me = this;
        if(Ext.CURRENT_USER.userRole != 50)
        {
            absCmp.query('gridcolumn[colItemId=action_column]')[0].setVisible(false);
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "productMaster grid[itemId=productMasterGrid]":{
                afterrender: me.onProductMasterGridAfterRender,
                selectionchange: me.onProductMasterInfoGridSelectionChange
            },
            "productMaster grid[itemId=productMasterGrid] combo":{
                select: me.onEditorComboSelect
            },
            "productMaster tabpanel[itemId=productDetailTabPanel]":{
                beforerender: me.onTabBeforeRender,
                tabchange: me.onTabchange
            },
            "productMaster menuitem[itemId=menuSelectedTemp91Print]":{
                click : me.onStockPrintMenuItemClick
            }
        });
        this.callParent(arguments);
    }
});