Ext.define('YBase.controller.SalesController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'SalesController',
    currentViewAlias:'salesListPanel',
    abstractcomponent:null,
    csv_report_id: 4,
    refs:[
        {
            ref: 'salesListPanel',
            selector: 'salesListPanel'
        }
    ],
    // currentRecord:null,
    // entryPanelWin: null,
    detailLinkRenderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.String.format('<div class="icons-view" data-qtip="{0}">{0}</div>',Ext.LANG.globalLang.buttons.btnEdit);
    },
    // addCsvImportBtn: function(absCmp) {
    //     var me=this,
    //         container =  absCmp.query('container[itemId=topMainCnt]')[0],
    //         btn = Ext.create('Ext.button.Button',{
    //             itemId  : 'btnCsvImport',
    //             text    : Ext.LANG.globalLang.buttons.btnCsvImport,
    //             margin: '0 2 0 0',
    //             ui: 'semi-action-small',
    //             iconCls: 'yig-import-s-w'
    //         });
        
    //     container.insert(2,btn);
    // },
    languageImplementation: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            salesLang=lang.sales;
        absCmp.setTitle(salesLang.panelTitle);
         absCmp.query('menuitem[itemId=monthlySalesPrintMenu]')[0].setText(salesLang.monthlySalesPrintMenu);
         absCmp.query('menuitem[itemId=orderContractPrintMenu]')[0].setText(salesLang.orderContractPrintMenu);
         absCmp.query('menuitem[itemId=menuItemServiceInvoice]')[0].setText(salesLang.menuItemServiceInvoice);
        // absCmp.query('button[itemId=btnNewEntry]')[0].setText(salesLang.btnNewEntry);
        // absCmp.query('button[itemId=btnEditPopupEntry]')[0].setText(salesLang.btnEditPopupEntry);
    },
     hidePnlActionButtons: function(absCmp) {
         if(Ext.CURRENT_USER.userRole==50)
        {
        absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        }
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false)
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(true);
        absCmp.query('menuitem[itemId=orderContractPrintMenu]')[0].setVisible(false);
        // absCmp.query('button[itemId=btnSave]')[0].setVisible(false);
        // absCmp.query('button[itemId=btnDelete]')[0].setVisible(false);
    },
    onViewBeforeRender:function(absCmp, eOpts){
        var me = this;
        me.callParent(arguments);
        me.abstractcomponent = absCmp;
        me.hidePnlActionButtons(absCmp);
        //me.addPrintReportBtn(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
        me.loadViewGrid(absCmp);

    },
    loadViewGrid:function(absCmp)
    {
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=orderGridCnt]')[0]; 
        me.gridOrderDetailCnt = absCmp.query('container[itemId=gridOrderDetailCnt]')[0];
        me.gridCnt.removeAll();  
        me.gridOrderDetailCnt.removeAll();
        me.addGridCntProperty();
        me.loadGrid(me,absCmp);
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 3;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'orderMasterGrid';   
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

        me.gridOrderDetailCnt.gridNo             = 4;
        me.gridOrderDetailCnt.colNo              = 4;
        me.gridOrderDetailCnt.rowNo              = 0;
        me.gridOrderDetailCnt.gridItemId         = 'orderDetailGrid';   
        me.gridOrderDetailCnt.addTempSearch      = 1;
        me.gridOrderDetailCnt.showSaveMsg        = true;
        me.gridOrderDetailCnt.storeLoadOnSave    = false;
        me.gridOrderDetailCnt.createMsgCmp       = true;
        me.gridOrderDetailCnt.addDatagridTemplate= 0;
        /*if(!Ext.CURRENT_USER.is_super_user) 
            me.gridOrderDetailCnt.addDatagridTemplate= 0;
        else 
          me.gridOrderDetailCnt.addDatagridTemplate= 1;*/ 


    },
    loadGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        /*if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }*/
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;
        params['order_type'] = Ext.LANG.sales.orderType.sales;

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
        params_with_col['getOrderDetail'] = 1;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/orderMaster/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.renderOrderMasterGrid(me, abstractcomponent,resp);
                    me.renderOrderDetailGrid(me, abstractcomponent,resp.orderDetail_col_info);
                    me.gridCnt.gridStore.loadRawData(resp);
                    if(Ext.msk)
                        Ext.msk.hide();
                }
            }
        });
    },
    renderOrderMasterGrid: function(me, abstractcomponent,resp){
        // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
        var pageSize=resp.page_size,
        fields = resp.fields;
        me.gridCnt.responseObj    = resp;
        me.gridCnt.templateId     = resp.templateId;
        me.gridCnt.templateList   = resp.templateList;
        me.gridCnt.searchList     = resp.searchList;
        me.gridCnt.synctime       = resp.synctime;
        var storeParamObj = {
            'pageSize'      : pageSize, 
            'fields'        : fields,
            'validations'   : resp.validations,
            'storeId'       : 'newAuctionMasterJSON', 
            'storeUrl'      : 'bizlayer/orderMaster/list', 
            'create'        : 'bizlayer/orderMaster/crud', 
            'destroy'       : 'bizlayer/orderMaster/crud', 
            'extra_params'  : {'synctime':me.gridCnt.synctime,'datagrid_id':me.gridCnt.gridNo}, 
            'writeAllFields': false,
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
        if(abstractcomponent.showMsgCmp == true) {
            YBase.utility.MsgCmpHelper.gridEventHandleForMsgCmpPanel(me.gridCnt.grid);
        }

        if(me.gridCnt.addTempSearch == 1) {
            abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
            var tempSearchDataView = me.gridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
            tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
                var colDataIndex=[],searchData=[],
                    obj=record.data.search_criteria;
                for (property in obj) {
                    colDataIndex.push(property);
                    searchData.push(obj[property]);
                }
                YBase.utility.SearchHelper.setDataInHeaderFilter1(me.gridCnt.grid,colDataIndex,searchData,true);
            });
        }

        if(me.gridCnt.addDatagridTemplate == 1) {
            me.gridCnt.grid.datagridTempId = resp.templateId;
        }
        me.gridCnt.grid.on('selectionchange',me.onOrderMasterGridSelectionChange,me);
        me.gridCnt.grid.on('itemclick',me.onOrderMasterGridItemClick,me);
        var orderCodeCol = me.gridCnt.grid.query('gridcolumn[dataIndex=column_1_05]')[0],
            orderMasterGridStore = me.gridCnt.grid.getStore();
        orderMasterGridStore.on('load', me.onOrderMasterGridStoreLoad,me,me.gridCnt);
        if(!Ext.isEmpty(orderCodeCol)){
            orderCodeCol.renderer = me.orderCodeRenderer;
        }
        me.gridCnt.gridStore.on('beforeload', function( store, operation, eOpts){
            store.getProxy().extraParams = {'order_type' : Ext.LANG.sales.orderType.sales};
        });
        // me.gridCnt.gridStore.on('update', me.onGridStoreUpdate,me);
        
        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
        me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
        // me.getDetailReportGridConfig(abstractcomponent);
        //me.loadDetailReportGrid(abstractcomponent);
    },
    renderOrderDetailGrid: function(me, abstractcomponent,resp){
        var pageSize=resp.page_size,
            fields = resp.fields;
        me.gridOrderDetailCnt.responseObj    = resp;
        me.gridOrderDetailCnt.templateId     = resp.templateId;
        me.gridOrderDetailCnt.templateList   = resp.templateList;
        me.gridOrderDetailCnt.searchList     = resp.searchList;
        me.gridOrderDetailCnt.synctime       = resp.synctime;
       // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
        var storeParamObj = {
            'pageSize'      : pageSize, 
            'fields'        : fields,
            'validations'   : resp.validations,
            'storeId'       : 'orderDetailJSON', 
            'storeUrl'      : 'bizlayer/orderDetail/list', 
            'create'        : 'bizlayer/orderDetail/crud', 
            'destroy'       : 'bizlayer/orderDetail/crud', 
            'extra_params'  : {'synctime':me.gridOrderDetailCnt.synctime,'datagrid_id':me.gridOrderDetailCnt.gridNo}, 
            'writeAllFields': false,
            'editable'      : true,
            'idProperty'    : 'id',
            'forceSubmitFields' : ['id','ext_id']
        };
        me.gridOrderDetailCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj={
                'cntrl'                 : me,
                'absCmp'                : abstractcomponent,
                'respObj'               : me.gridOrderDetailCnt.responseObj,
                'gridCnt'               : me.gridOrderDetailCnt,
                'gridStore'             : me.gridOrderDetailCnt.gridStore, 
                'gridItemId'            : me.gridOrderDetailCnt.gridItemId,
                'addDatagridTemplate'   : me.gridOrderDetailCnt.addDatagridTemplate,
                'listDataFn'            : me.loadGrid,
                'loadMask'              : true,
                'setTemplateId'         : me.gridOrderDetailCnt.templateId,
                'templateList'          : me.gridOrderDetailCnt.templateList,
                'searchList'            : me.gridOrderDetailCnt.searchList,
                'addTempSearch'         : me.gridOrderDetailCnt.addTempSearch,
                'createMsgCmp'          : me.gridOrderDetailCnt.createMsgCmp,
                // 'actionRenderer'        : YBase.utility.GridHelper.actionViewDeleteRenderer,
                'hideHeaderFilterButtons':true,
            };
        me.gridOrderDetailCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        /*if(abstractcomponent.showMsgCmp == true) {
            YBase.utility.MsgCmpHelper.gridEventHandleForMsgCmpPanel(me.gridOrderDetailCnt.grid);
        }*/

        // me.gridOrderDetailCnt.grid.on('selectionchange',me.onOrderMasterGridSelectionChange,me);
        //me.gridOrderDetailCnt.grid.on('itemclick',me.onOrderMasterGridItemClick,me);
        // me.gridOrderDetailCnt.gridStore.on('load', me.onGridStoreLoad,me);
        me.gridOrderDetailCnt.gridStore.on('beforeload', function( store, operation, eOpts){
            var orderMasterGrid  =  me.gridCnt.grid,
                selectedOrder = orderMasterGrid.getSelectionModel().getLastSelected();
            if(!Ext.isEmpty(selectedOrder)){
                store.getProxy().extraParams = {'entry_id' : selectedOrder.data.id, datagrid_id:me.gridOrderDetailCnt.gridNo};
            }
        });
        // me.gridOrderDetailCnt.gridStore.on('update', me.onGridStoreUpdate,me);
        me.gridOrderDetailCnt.gridStore.loadRawData(resp);
        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
       // me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
    },
    onOrderMasterGridStoreLoad: function(store, records, success, gridCnt){
         var me      = this,
            pnl     = me.currentView,
            grid    = pnl.query('grid[itemId='+gridCnt.gridItemId+']')[0];
            
            if (!Ext.isEmpty(records) && records.length > 0) {
                grid.getSelectionModel().deselectAll();
                grid.getSelectionModel().select(0, true);
            }
            
    },
    orderCodeRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        var recievedStatus =  Ext.LANG.entryPanel.receiveStatus.received;
        if(!Ext.isEmpty(record)){
            if(record.raw.column_1_29 == recievedStatus){
               return '<div class="yig-order-received-cls">'+value+'</div>';
            }
            else
                return value;
        }
    },
    onOrderMasterGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            if(record.raw.column_1_61 == 'sales'){
                var is_bill_order = 0;
            }else{
                var is_bill_order = 1;
            }
                 var route = is_bill_order == 1 ? 'EntryPanel' : 'SalesPanel';
            Ext.Router.redirect(route+'/edit?id='+record.get('id')+'&entry_code='+record.get('column_1_01')+'&mode=edit'+'&is_bill_order='+is_bill_order);
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
    onOrderMasterGridSelectionChange: function(grid, selected, eOpts) {
        var me = this,
            orderPanel  = me.getSalesListPanel(),
            gridDetailGrid =  me.absCmp.query('grid[itemId='+me.gridOrderDetailCnt.gridItemId+']')[0];
            // detailTab = orderPanel.query('tabpanel[itemId=order_detail_grid_tab]')[0];
        if(Ext.isEmpty(selected)) {
            me.currentRecord = null;
            /*if(!Ext.isEmpty(detailTab) && !Ext.isEmpty(detailTab.getActiveTab().query('grid'))) {
                detailTab.getActiveTab().query('grid')[0].getStore().loadData({})
            }*/
            if(!Ext.isEmpty(gridDetailGrid)){
                gridDetailGrid.getStore().removeAll();
            }
            if(!Ext.isEmpty(me.entryPanelWin) && !me.entryPanelWin.closed) {
                me.entryPanelWin.close();
            }
            return;
        }
        else
        {
            me.currentRecord = grid.lastSelected;
            if(!Ext.isEmpty(me.entryPanelWin) && !me.entryPanelWin.closed) {
                me.openEntryPanelPopupWin(me.currentRecord);
            }
            if(!Ext.isEmpty(gridDetailGrid)){
                gridDetailGrid.getStore().reload();
            }
        }
        // orderPanel.entry_code = me.currentRecord.get('column_1_01');
        // if(!Ext.isEmpty(detailTab)) {
        //     var activeTab = detailTab.getActiveTab(),
        //         detailReportPnl = detailTab.query('panel[itemId=detailReportPnl]')[0],
        //         detailReportGrid = detailReportPnl.query('grid'),
        //         orderDetailPnl = detailTab.query('panel[itemId=I_order_detail_1_container]')[0],
        //         orderReportGrid = orderDetailPnl.query('grid');
        //     /*loads detailReport*/
        //     if(!Ext.isEmpty(detailReportGrid[0])) {
        //         detailReportGrid[0].getStore().load();
        //     }
        //     /*loads orderDetail*/
        //     if(!Ext.isEmpty(orderReportGrid[0])) {
        //         orderReportGrid[0].getStore().load({
        //             params:{
        //                 'entry_id':me.currentRecord.get('id'),
        //                 'all_columns':1
        //             }
        //         });
        //     }
        // }
        // var cntrl =  YBase.app.getController('EntryPanelController'),
        //     route = 'commentWin?entry_code='+orderPanel.entry_code;
        // if(!Ext.isEmpty(cntrl.commentPopupWin) && !cntrl.commentPopupWin.closed) {
        //     cntrl.commentPopupWin.YBase.app.getController('CommentPanelController').reRoute(route,orderPanel);
        // }
        
        
        // if(!Ext.isEmpty(selected)){
            
        // }

    },
    onBtnNewEntryClick: function() {
        Ext.Router.redirect('SalesPanel/new?mode=new');
    },
    onBtnCsvImportClick: function(btn) {
        var win = Ext.create('YBase.view.CsvImportWin',{
            modal : true
        });
        win.show();
    },
    onBtnEditPopupEntryClick: function(btn) {
        var me = this,
            grid = me.gridCnt.grid,
            selModel = grid.getSelectionModel();
        if(Ext.isEmpty(selModel.selected.items))
        {
            Ext.Msg.alert("Error","No Record Selected.");
            return;
        }
        var record = selModel.getLastSelected();// Last Selected Record
        me.openEntryPanelPopupWin(record);
    },
    openEntryPanelPopupWin: function(record) {
        var me = this,
            params = {
                id          : record.data.id,
                entry_code  : record.data.column_1_01,
                mode        : 'edit',
                popup       : true
            },
            queryString = YBase.utility.ButtonHelper.generateUrlQueryString(params),
            route = '#SalesPanel/edit' + queryString,
            name  = 'salesPopupWin';
        if(Ext.isEmpty(me.entryPanelWin)){
            route = 'popupWindow#SalesPanel/edit' + queryString;
            me.entryPanelWin = window.open(route,name,'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,top=0,left=0,width=1024,height=600');
            Ext.EventManager.un(me.entryPanelWin, "beforeunload",me.onEntryPanelWindowClose, me);
            Ext.EventManager.on(me.entryPanelWin, "beforeunload",me.onEntryPanelWindowClose, me);
        }
        else{
            if(!Ext.isEmpty(me.entryPanelWin.YBase)){
                entryPanelCtrl = me.entryPanelWin.YBase.app.getController('SalesEntryPanelController');
                entryPanelCtrl.reRouteEntryPanelWin(route,params);
            }
        }
    },
    onEntryPanelWindowClose: function() {
        this.entryPanelWin = null; 
    },
    onOrderContractPrintMenuClick : function(button,e,eOpts){
       var me = this,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            selected = grid.getSelectionModel().getSelection(),
            url = 'bizlayer/csvReport/getCsvReportArray',
            date = new Date(),
            date = Ext.Date.format(date,'Y-m'),
            order_master_ids='';
            for(var i =0;i<selected.length;i++){
                if(selected[i].get('column_1_61') == Ext.LANG.order.orderType.order){
                    order_master_ids += selected[i].get('id')+",";
                }
            }
            if(Ext.isEmpty(order_master_ids)){
                 Ext.Msg.show({
                    title:Ext.LANG.globalLang.app.appTitle,
                    msg: Ext.LANG.order.selectionEmptyMsg.order,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
                return false;
            }
        var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: url,
                baseParams: {
                    'store_name'    : Ext.CURRENT_USER.department_name,
                    'date'          : date,
                    'order_master_ids' : order_master_ids,
                    'csv_report_id' : 18,
                    'report_type'   : 'order_contract'

                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
    },
    onMonthlySalesPrintMenuClick : function(button,e,eOpts){
        var me = this,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            selected = grid.getSelectionModel().getSelection(),
            url = 'bizlayer/csvReport/getCsvReportArray',
            order_master_ids='';
            for(var i =0;i<selected.length;i++){
                order_master_ids += selected[i].get('id')+",";
            }
        var win = Ext.create('YBase.view.PrintReportPopUp',{
            url : url,
            type : 'monthly_sales',
            csv_report_id : 13,
            order_master_ids : order_master_ids,
            parentAbsCmp : me
        });
        win.show();
    },
    onMenuItemServiceInvoiceClick: function(button,e,eOpts)
    {
        var me = this,
            grid = me.currentView.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            selected = grid.getSelectionModel().getSelection(),
            url = 'bizlayer/csvReport/getCsvReportArray',
            date = new Date(),
            date = Ext.Date.format(date,'Y-m'),
            order_master_ids='';
            for(var i =0;i<selected.length;i++){
                if(selected[i].get('column_1_61') == Ext.LANG.order.orderType.sales){
                    order_master_ids += selected[i].get('id')+",";
                }
            }
            if(Ext.isEmpty(order_master_ids)){
                 Ext.Msg.show({
                    title:Ext.LANG.globalLang.app.appTitle,
                    msg: Ext.LANG.order.selectionEmptyMsg.sales,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.INFO
                });
                return false;
            }
        var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: url,
                baseParams: {
                    'store_name'    : Ext.CURRENT_USER.department_name,
                    'date'          : date,
                    'order_master_ids' : order_master_ids,
                    'csv_report_id' : 20,
                    'report_type'   : 'service_invoice'

                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
    },
    init: function(application) {
        var me=this;
        me.control({
            // "order container[itemId=tabContainer]" : {
            //     beforerender:me.onTabContainerBeforeRender
            // },
            "salesListPanel button[itemId=btnNewEntry]" : {
                click:me.onBtnNewEntryClick
            },
            "salesListPanel button[itemId=btnCsvImport]" : {
                click:me.onBtnCsvImportClick
            },
            "salesListPanel button[itemId=btnEditPopupEntry]" : {
                click : me.onBtnEditPopupEntryClick
            },
            "salesListPanel menuitem[itemId=monthlySalesPrintMenu]":{
                click : me.onMonthlySalesPrintMenuClick
            },
            "salesListPanel menuitem[itemId=orderContractPrintMenu]":{
                click : me.onOrderContractPrintMenuClick
            },
            "salesListPanel menuitem[itemId=menuItemServiceInvoice]":{
                click : me.onMenuItemServiceInvoiceClick
            }
        });
        this.callParent(arguments);
    }
});
