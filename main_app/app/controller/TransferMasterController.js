Ext.define('YBase.controller.TransferMasterController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'TransferMasterController',
    currentViewAlias:'transferMaster',
    abstractcomponent:null,
    refs:[
        {
            ref: 'transferMaster',
            selector: 'transferMaster'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    bulkPanelSearch:false,
    errorFlg:false,
    // /*delete_renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
    //     return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.globalLang.buttons.btnDelete);
    //     // return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.buttons['delete']);
    // },
    languageImplementation: function(absCmp){
        var me = this,
            lang = Ext.LANG,
            transferLang = lang.transferMasterPanel,
            basicBasePanelLang = lang.BasicBasePanel;
        absCmp.setTitle(transferLang.pnlTitle);
        // absCmp.query('button[itemId=btnAdd]')[0].setText(basicBasePanelLang.btnAd/d);
        absCmp.query('button[itemId=btnSave]')[0].setText(basicBasePanelLang.btnSave);
        //absCmp.query('panel[itemId=gridCnt]')[0].setTitle(transferLang.transferGridTitle);
      // absCmp.query('panel[itemId=transferMasterDetailGridCnt]')[0].setTitle(transferLang.transferDetailGridTitle);
        
        // absCmp.query('button[itemId=btnNewEntry]')[0].setText(transferLang.btnNewEntry);
        absCmp.query('button[itemId=btnDelete]')[0].setText(basicBasePanelLang.btnDelete);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setText(basicBasePanelLang.btnCsvDwnld);
        absCmp.query('menuitem[itemId=transferPrint]')[0].setText(transferLang.transferPrintMenu);
        absCmp.query('checkbox[itemId=chkOwnToStore]')[0].setBoxLabel(transferLang.recievedTransferChkBox);
    },
    // onGridStoreUpdate:function(){
    //     //do nothing
    // },
    onViewBeforeRender: function(absCmp){
        this.callParent(arguments);
        var me=this;
        me.hidePnlActionButtons(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
        me.currentView = absCmp;
        me.loadViewGrid(absCmp);
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(true);
        // absCmp.query('container[itemId=topMainCnt]')[0].setVisible(true);
        // absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
    },
    loadViewGrid: function(absCmp){
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=gridCnt]')[0]; 
        me.transferMasterDetailGridCnt = absCmp.query('container[itemId=transferMasterDetailGridCnt]')[0];
        me.gridCnt.removeAll();  
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 18;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'transferMasterGrid';   
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

        me.transferMasterDetailGridCnt.gridNo             = 19;
        me.transferMasterDetailGridCnt.colNo              = 4;
        me.transferMasterDetailGridCnt.rowNo              = 0;
        me.transferMasterDetailGridCnt.gridItemId         = 'transferMasterDetailGrid';   
        me.transferMasterDetailGridCnt.addTempSearch      = 1;
        me.transferMasterDetailGridCnt.showSaveMsg        = true;
        me.transferMasterDetailGridCnt.storeLoadOnSave    = false;
        me.transferMasterDetailGridCnt.createMsgCmp       = false;
        me.transferMasterDetailGridCnt.showBulkUpdate     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.transferMasterDetailGridCnt.addDatagridTemplate= 0;
        else 
            me.transferMasterDetailGridCnt.addDatagridTemplate= 1;

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
        params_with_col['get_transfer_master_detail'] = 1;

        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/transferMaster/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.renderTransferMasterGrid(me, abstractcomponent,resp);
                    me.renderTransferMasterDetailGrid(me,abstractcomponent,resp.transfer_master_detail_info);
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
    renderTransferMasterGrid: function(me,abstractcomponent,resp)
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
                'storeId'       : 'transferMasterJSON', 
                'storeUrl'      : 'bizlayer/transferMaster/list', 
                'create'        : 'bizlayer/transferMaster/crud', 
                'destroy'       : 'bizlayer/transferMaster/crud', 
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
            'actionRenderer'        : YBase.utility.GridHelper.actionViewDeleteRenderer,
            'actionColWidth'        : 110
        };
        me.gridCnt.transferMasterGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);

        me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.gridCnt);
        me.gridCnt.transferMasterGrid.on('itemclick', me.onTransferGridItemClick, me);
        //me.gridCnt.gridStore.on('update', me.onGridStoreUpdate, me);
       /**/
        // me.gridCnt.productMasterGrid.on('itemclick', me.onGridItemClick, me);
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
    renderTransferMasterDetailGrid:function(me,abstractcomponent,resp)
    {
         var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'transferMasterDetailJSON', 
                'storeUrl'      : 'bizlayer/transferDetail/list', 
                'create'        : 'bizlayer/transferDetail/crud', 
                'destroy'       : 'bizlayer/transferDetail/crud', 
                'extra_params'  : {
                    'synctime': me.transferMasterDetailGridCnt.synctime,
                    'datagrid_id': me.transferMasterDetailGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.transferMasterDetailGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.transferMasterDetailGridCnt,
            'gridStore'             : me.transferMasterDetailGridCnt.gridStore, 
            'gridItemId'            : me.transferMasterDetailGridCnt.gridItemId,
            'addDatagridTemplate'   : me.transferMasterDetailGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.transferMasterDetailGridCnt.templateId,
            'templateList'          : me.transferMasterDetailGridCnt.templateList,
            'searchList'            : me.transferMasterDetailGridCnt.searchList,
            'addTempSearch'         : me.transferMasterDetailGridCnt.addTempSearch,
            'createMsgCmp'          : me.transferMasterDetailGridCnt.createMsgCmp,
            // 'actionRenderer'      /  : me.delete_renderer
        };
        me.transferMasterDetailGridCnt.transferDetailGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        me.transferMasterDetailGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.transferMasterDetailGridCnt);

        me.transferMasterDetailGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var grid =  me.gridCnt.transferMasterGrid,
                gridSelection = grid.getSelectionModel().getSelection(),
                entry_id = null;
                if(!Ext.isEmpty(gridSelection)){
                    var  lastSelectedRecord =  grid.getSelectionModel().getLastSelected();
                    if(!Ext.isEmpty(lastSelectedRecord)){
                        entry_id =  lastSelectedRecord.raw.id;
                    }
                }
            var params = {
                    'entry_id'      : entry_id,
                    'forTransferMasterPanel'    : 1,
                    'datagrid_id'    : me.transferMasterDetailGridCnt.gridNo,}
            me.transferMasterDetailGridCnt.gridStore.getProxy().extraParams = (params);
        },me);
        //me.transferMasterDetailGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.transferMasterDetailGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.transferMasterDetailGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    onTransferMasterInfoGridSelectionChange:function(grid, selected, eOpts )
    {
        var me =  this,
            grid = me.transferMasterDetailGridCnt.transferDetailGrid;
        if(!Ext.isEmpty(selected)){
            var selectedIndex =  selected.length,
                lastSelectedRecord = selected[selectedIndex-1];
            me.getTransferMasterDetailRecords(lastSelectedRecord,grid);
        }
        else
            grid.getStore().removeAll();
    },
    getTransferMasterDetailRecords: function(record,grid){
        var me =  this,
            transferMasterPnl = me.getTransferMaster(),
            chkOwnToStore = transferMasterPnl.query('checkbox[itemId=chkOwnToStore]')[0],
            received_product_only = 0;
            if(chkOwnToStore.getValue()){
                var received_product_only=1;
            }
        Ext.Ajax.request({
            url : 'bizlayer/transferDetail/list',
            params: {
                'entry_id'      : record.data.id,
                'received_product_only' : received_product_only,
                'datagrid_id'   : me.transferMasterDetailGridCnt.gridNo,
                'forTransferMasterPanel' : 1
            },
            method: 'POST',
            scope: me,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var me = this,
                        gridStore = me.transferMasterDetailGridCnt.transferDetailGrid.getStore();
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
    hidePnlActionButtons: function(absCmp) {

        //absCmp.query('button[itemId=btnUpdateStock]')[0].setVisible(true);
        absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);

        if(Ext.CURRENT_USER.userRole==50)
        {
        absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        absCmp.query('checkbox[itemId=chkOwnToStore]')[0].setVisible(false);
        }
        // else
        // {
        // absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(true);

        // }
    },
    // removeProductMasterRec: function(grid){
    //     var me = this,
    //         store =  grid.getStore(),
    //         modifiedRec =  store.getRemovedRecords(),
    //         modifiedRecArr= [],
    //         selectableArray = ['column_9_01','delete_flg','id'];
    //         Ext.each(modifiedRec, function(row) {
    //             var data = {};
    //             for (i = 0; i < selectableArray.length; i++) {
    //                 data[selectableArray[i]] = row.data[selectableArray[i]];
    //              }
    //             modifiedRecArr.push(data);
    //         });
    //         var records = {'modifiedRecords':JSON.stringify(modifiedRecArr),
    //                                 'deletedRecords':null,
    //                                 'newRecords':null
    //                                 };
    //         Ext.Ajax.request({
    //             url: 'bizlayer/product/crud',
    //             method: 'POST',
    //             params:records,
    //             success: function(response) {
    //                 var resp = Ext.decode(response.responseText);
    //                 if(resp.success) {
    //                     store.reload();
    //                 }   
    //             }
    //         });  
    // },
    
    onBtnNewEntryClick: function() {
        Ext.Router.redirect('StockTransferEntryPanel/new?mode=new');
    },
    // onEditorComboSelect: function(combo,record){
    //     var me = this,
    //         absCmp = me.absCmp,
    //         itemId = combo.itemId;
    //     // Supplier Combo Grid
    //     if(itemId == "column_5_409"){
    //         var grid = absCmp.query('grid[itemId=productMasterGrid]')[0],
    //             selectedRecord = grid.getSelectionModel().getSelection()[0];
    //         selectedRecord.set('supplier_id',record[0].raw.id);
    //     }
    // },
    onAfterRenderGridCnt:function(panel, eOpts)
    {
        this.collpaseExpandWindow(panel,eOpts);
    },
    onAfterRenderTransferMasterDetailCnt:function(panel, eOpts)
    {
        this.collpaseExpandWindow(panel,eOpts);
    },
    collpaseExpandWindow:function(panel,eOpts)
    {
        var panelEl = panel.getEl();
            panelEl.on("click", function(e, el) {
            if (e.getTarget(".collapseWindow")) {
                panel.expand();
            }
            else {
            }
        });
    },
    onTransferGridItemClick:function(gridView,record,item,index,e,eOpts){
        if(e.getTarget('.icons-view')){
            Ext.Router.redirect('StockTransferEntryPanel/edit?id='+record.get('id')+'&entry_code='+record.raw.column_8_01+'&mode=edit');
        }
        else if (e.getTarget('.icons-delete')) {
            Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
                if(o=="yes"){
                    var me = this,
                        grid = gridView.up('grid'),
                        store = grid.getStore();
                    store.remove(record);
                    me.storeSync(store, grid, me.gridCnt);
                }
            },this);
        }   
    },
    onBtnUpdateStockClick: function(button,e,eOpts){
        var me=this,
            transferMasterPanel =  me.currentView,
            transferMasterGrid = transferMasterPanel.query('grid[itemId=transferMasterGrid]')[0],
            selectedRecords = transferMasterGrid.getSelectionModel().getSelection(),
            transferPanel = Ext.LANG.transferEntryPanel,
            transferStatusDone = transferPanel.transferStatus.done;
            transferMasterIds = [];

            if(Ext.isEmpty(selectedRecords)){
                me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.noRowsSelected,false);
                return;
            }

            if(!Ext.isEmpty(selectedRecords)){
                var  isTransferStatusDone = false;
                Ext.each(selectedRecords, function(record) {
                    if(record.raw.column_8_16== transferStatusDone){
                      isTransferStatusDone = true;
                    }else if (record.raw.column_8_16!=transferStatusDone){
                        transferMasterIds.push(record.get('id'));
                    }
                });
                if(isTransferStatusDone){
                    Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.findedDoneStatus, function(o){
                        if(o=="yes"){
                            me.updateStock(transferMasterIds,transferMasterGrid);
                        }
                    });
                }
                else{
                    me.updateStock(transferMasterIds,transferMasterGrid);
                }
            }
            
    },
    updateStock:function(transferMasterIds,transferMasterGrid){
        var me = this;
            if(Ext.isEmpty(transferMasterIds)){
                me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.noRecordToUpdate,false);
                return;
            }
            Ext.msk = Ext.create('YBase.utility.Mask');
             Ext.msk.show();
            Ext.Ajax.request({
                url : 'bizlayer/transferMaster/updateStock',
                params: {
                    'transfer_master_ids': JSON.stringify(transferMasterIds)
                },
                method: 'POST',
                scope: me,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        transferMasterGrid.getStore().reload();
                        me.showToolBarMsg(resp.msg,true);
                    }else{
                        var msg = Ext.String.format('{0} :: {1}',Ext.LANG.transferEntryPanel.transferStockFailed,resp.data);
                        me.showToolBarMsg(msg,false);
                    }
                     if(Ext.msk)
                     {
                        Ext.Function.defer(function(){
                            Ext.msk.hide();
                        }, 1000);
                     }
                }
            });
    },
    onBtnTransferPrintMenuItemClick : function(button,e,eOpts){
        var me = this,
            url = 'bizlayer/csvReport/getCsvReportArray';
        var win = Ext.create('YBase.view.PrintReportPopUp',{
            url : url,
            reportType : 'transfer',
            type : 'transfer',
            // csvReportId : 14,
            csv_report_id : 14,
            parentAbsCmp : me
        });
        win.show();
        
        //  var me = this,
        //     lang = Ext.LANG,
        //     grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
        //     url = 'bizlayer/csvReport/getCsvReportArray',
        //     date = new Date(),
        //     date = Ext.Date.format(date,'Y-m');
        // var form_325 = new Ext.FormPanel({
        //         id: 'csvForm',
        //         method: "POST",
        //         url: url,
        //         baseParams: {
        //             'store_name'    : Ext.CURRENT_USER.department_name,
        //             'date'          : date,
        //             'csv_report_id' : 14,
        //             'type'          : 'transfer'
        //         },
        //         standardSubmit: true
        //     });

        //     form_325.getForm().submit({
        //         target: '_blank'
        //     });
    },
    onChkOwnToStoreChange:function(absCmp, newValue, oldValue, eOpts)
    {
        var me              = this,
            grid            = me.getTransferMaster().query('grid[itemId=transferMasterGrid]')[0],
            gridStore       = grid.getStore(),
            storeName       = Ext.CURRENT_USER.department_name,
            companyName     = Ext.CURRENT_USER.company_name,
            btnUpdateStock  = me.getTransferMaster().query('button[itemId=btnUpdateStock]')[0],
            extraParams     = gridStore.getProxy().extraParams || {};
        if(newValue)
        {
            btnUpdateStock.enable();
            extraParams.received_product_only = 1;
            gridStore.getProxy().extraParams = extraParams;
            gridStore.filter([
              // {
              //   property     : 'column_8_15',
              //   value        : storeName
              // },
              {
                property     : 'column_8_30',
                value        : companyName
              }
            ]);            
            // gridStore.filter("column_8_15",storeName);
        }
        else
        {
            btnUpdateStock.disable();
            extraParams.received_product_only = 0;
            gridStore.getProxy().extraParams = extraParams;
            gridStore.clearFilter();
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "transferMaster grid[itemId=transferMasterGrid]":{
                selectionchange: me.onTransferMasterInfoGridSelectionChange,
            },
            "transferMaster panel[itemId=gridCnt]":{
                afterrender :this.onAfterRenderGridCnt
            },
            "transferMaster panel[itemId=transferMasterDetailGridCnt]":{
                afterrender :this.onAfterRenderTransferMasterDetailCnt
            },
            "transferMaster button[itemId=btnNewEntry]" : {
                click:me.onBtnNewEntryClick
            },
            "transferMaster button[itemId=btnUpdateStock]":{
                click:me.onBtnUpdateStockClick
            },
            "transferMaster menuitem[itemId=transferPrint]":{
                  click:me.onBtnTransferPrintMenuItemClick
            },
            "transferMaster checkbox[itemId=chkOwnToStore]":{
                  change:me.onChkOwnToStoreChange
            }
            
            // "productMaster grid[itemId=productMasterGrid] combo":{
            //     select: me.onEditorComboSelect,
            // },
        });
        this.callParent(arguments);
    }
});