Ext.define('YBase.controller.CustomerController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'CustomerController',
    currentViewAlias:'customerPanel',
    abstractcomponent:null,
    refs:[
        {
            ref: 'customerPanel',
            selector: 'customerPanel'
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
    editLinkRenderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.String.format('<div class="icons-view" data-qtip="{0}">{0}</div>',Ext.LANG.globalLang.buttons.btnEdit);
    },
    multiBtnsLinkRenderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
        //<div class="icons-delete" data-qtip="{0}">{0}</div> FOR DELETE ICON
            return (Ext.String.format(
                '<div class="icon-sales" data-qtip="{4}">{4}</div>'+
                '<div class="icon-order-entry" data-qtip="{1}">{1}</div>'+
                ' <div class="icon-service-entry" data-qtip="{2}">{2}</div> '+
                '<div class="icon-repair-entry" data-qtip="{3}">{3}</div> ', 
            	Ext.LANG.globalLang.buttons.btnDelete, 
            	Ext.LANG.customerPanel.btnOrderEntryEdit,
            	Ext.LANG.customerPanel.btnServiceEntryEdit, 
                Ext.LANG.customerPanel.btnRepairEntryEdit,
            	Ext.LANG.customerPanel.btnSale
            ));
    },
    onViewBeforeRender: function(absCmp){
        var me=this;
        me.hidePnlActionButtons(absCmp);
        absCmp.route = location.href;
        me.loadViewGrid(absCmp);
        this.callParent(arguments);
    },
    hidePnlActionButtons:function(absCmp)
    {
     if(Ext.CURRENT_USER.userRole==50){
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
    }
    absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
    absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);

    },
    loadViewGrid: function(absCmp){
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=gridCnt]')[0]; 
        me.gridCnt.removeAll();  
    },
   
    implementLang: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            customerLang=lang.customerPanel,
            tabPanel = absCmp.query('tabpanel')[0];

        me.callParent(arguments);
        
        absCmp.setTitle(customerLang.pnlTitle);
        tabPanel.query('panel[itemId=historyTabPanel]')[0].setTitle(customerLang.historyTab);
        tabPanel.query('panel[itemId=salesHistoryTabPanel]')[0].setTitle(customerLang.salesTab);
        tabPanel.query('panel[itemId=serviceTabPanel]')[0].setTitle(customerLang.serviceTab);
        tabPanel.query('panel[itemId=repairTabPanel]')[0].setTitle(customerLang.repairTab);
        me.showHideCmp(absCmp);
    },
    showHideCmp: function(absCmp){
        // var me = this;
        //     absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
        // absCmp.query('checkbox[itemId=rwChkBox]')[0].setVisible(false);
        // if(Ext.CURRENT_USER.userRole==50)
        // {
        //     absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
        // }
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 1;
        me.gridCnt.colNo              = 5;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'customerGrid';   
        me.gridCnt.addTempSearch      = 1;
        me.gridCnt.showSaveMsg        = true;
        me.gridCnt.storeLoadOnSave    = true;
        me.gridCnt.createMsgCmp       = true;
        if(!Ext.CURRENT_USER.is_super_user) {
            me.gridCnt.addDatagridTemplate= 0;
            me.gridCnt.showBulkUpdate = false;
        }
        else {
            me.gridCnt.addDatagridTemplate= 1; 
            me.gridCnt.showBulkUpdate = true;
        } 
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
        params_with_col['get_customer_order_detail'] = 1;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/customer/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                me.renderCustomerMasterGrid(me, abstractcomponent,resp);
                me.renderHistoryGrid(me,abstractcomponent,resp.orderHistoryInfo);
                me.renderSalesGrid(me,abstractcomponent,resp.salesHistoryInfo);
                me.renderServiceGrid(me,abstractcomponent,resp.service_info);
                me.renderRepairGrid(me,abstractcomponent,resp.repair_info);
                me.gridCnt.gridStore.loadRawData(resp);                
                if(Ext.msk)
                    Ext.msk.hide();
            }
        });
    },
    calculateAge:function (dateString) 
    {
        var today = new Date();
        var birthDate = new Date(dateString);
        var age = today.getFullYear() - birthDate.getFullYear();
        var m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
        {
            age--;
        }
        return age;
    },
    onCustomerGridStoreUpdate:function(store, record, operation, eOpts){
        var me = this,
            pnl = me.getCustomerPanel(),
            grid = pnl.query('grid[itemId='+me.gridCnt.gridItemId+']')[0],
            dataIndex = eOpts[0];
        var age = "";
            dob = record.get("column_3_11"); //date of birth
            if(dataIndex=="column_3_11"){
                if(!Ext.isEmpty(dob)){
                    age = me.calculateAge(dob);
                    if(age>=0){
                        store.un('update',me.onCustomerGridStoreUpdate, me);
                        record.set("column_3_12", age); //age
                        store.on('update',me.onCustomerGridStoreUpdate, me);
                    }
                    else{
                        store.un('update',me.onCustomerGridStoreUpdate, me);
                        record.set("column_3_12", "");
                        record.set("column_3_11", "");
                        store.on('update',me.onCustomerGridStoreUpdate, me);
                        me.showToolBarMsg(Ext.LANG.customerPanel.invalidDateOfBirth,false);
                    }
                }
            }
    },
    renderCustomerMasterGrid: function(me,abstractcomponent,resp){
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
                'storeId'       : 'customerMasterJSON', 
                'storeUrl'      : 'bizlayer/customer/list', 
                'create'        : 'bizlayer/customer/crud', 
                'destroy'       : 'bizlayer/customer/crud', 
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
            'actionRenderer'        : me.multiBtnsLinkRenderer,
            'actionColWidth'        : 210   //210 FOR 4 ICONS
        };
        me.gridCnt.customerGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        
        if(me.gridCnt.addDatagridTemplate == 1) {
            me.gridCnt.customerGrid.datagridTempId = resp.templateId;
        }

        me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.gridCnt);
        me.gridCnt.gridStore.on('update', me.onCustomerGridStoreUpdate, me);
       /**/
         me.gridCnt.customerGrid.on('itemclick', me.onGridItemClick, me);
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
    renderHistoryGrid:function(me,abstractcomponent,resp){
        var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = 
            {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'customerOrderDetailJSON', 
                'storeUrl'      : 'bizlayer/orderMaster/list', 
                'create'        : 'bizlayer/orderMaster/crud', 
                'destroy'       : 'bizlayer/orderMaster/crud', 
                'extra_params'  : {
                    'synctime': me.historyGridCnt.synctime,
                    'datagrid_id': me.historyGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.historyGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.historyGridCnt,
            'gridStore'             : me.historyGridCnt.gridStore, 
            'gridItemId'            : me.historyGridCnt.gridItemId,
            'addDatagridTemplate'   : me.historyGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.historyGridCnt.templateId,
            'templateList'          : me.historyGridCnt.templateList,
            'searchList'            : me.historyGridCnt.searchList,
            'addTempSearch'         : me.historyGridCnt.addTempSearch,
            'createMsgCmp'          : me.historyGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true,
            'actionRenderer'        : me.editLinkRenderer
        };
        me.historyGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        // me.historyGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.historyGridCnt);
        me.historyGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var customer_code = me.getSelectedCustomerRecord(me);
            me.historyGridCnt.gridStore.getProxy().extraParams = ({
                'customer_code':customer_code,
                forCustomerPanel:1,
                'datagrid_id':me.historyGridCnt.gridNo,
                'order_type':'order'
                 });
        },me);

        var orderCodeCol = me.historyGridCnt.grid.query('gridcolumn[dataIndex=column_1_05]')[0];
        if(!Ext.isEmpty(orderCodeCol)){
            orderCodeCol.renderer = me.orderCodeRenderer;
        }
        //me.historyGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.historyGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.historyGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    renderSalesGrid:function(me,abstractcomponent,resp){
        var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = 
            {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'customerSalesDetailJSON', 
                'storeUrl'      : 'bizlayer/orderMaster/list', 
                'create'        : 'bizlayer/orderMaster/crud', 
                'destroy'       : 'bizlayer/orderMaster/crud', 
                'extra_params'  : {
                    'synctime': me.salesGridCnt.synctime,
                    'datagrid_id': me.salesGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.salesGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.salesGridCnt,
            'gridStore'             : me.salesGridCnt.gridStore, 
            'gridItemId'            : me.salesGridCnt.gridItemId,
            'addDatagridTemplate'   : me.salesGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.salesGridCnt.templateId,
            'templateList'          : me.salesGridCnt.templateList,
            'searchList'            : me.salesGridCnt.searchList,
            'addTempSearch'         : me.salesGridCnt.addTempSearch,
            'createMsgCmp'          : me.salesGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true,
            'actionRenderer'        : me.editLinkRenderer
        };
        me.salesGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        // me.salesGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.salesGridCnt);
        me.salesGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var customer_code = me.getSelectedCustomerRecord(me);
            me.salesGridCnt.gridStore.getProxy().extraParams = ({
                'customer_code':customer_code,
                forCustomerPanel:1,
                'datagrid_id':me.salesGridCnt.gridNo,
                'order_type':'sales'
                 });
        },me);

        var orderCodeCol = me.salesGridCnt.grid.query('gridcolumn[dataIndex=column_1_05]')[0];
        if(!Ext.isEmpty(orderCodeCol)){
            orderCodeCol.renderer = me.orderCodeRenderer;
        }
        //me.salesGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.salesGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.salesGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
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
    setDefaultValues: function(fields) {
        var default_values  = {};
        for (var i = 0; i < fields.length; i++) {
            if(fields[i].name == "column_3_02")
            {
                fields[i].default_value = Ext.CURRENT_USER.company_name;
            }
            else if(fields[i].name == "column_3_03")
            {
                fields[i].default_value = Ext.CURRENT_USER.department_name;
            }
            if (!Ext.isEmpty(fields[i].default_value)){
                default_values[fields[i].name] = YBase.utility.CommonFunctions.convertTemplateValues(fields[i].default_value);
            }
        };
        return default_values;
    },
    oncustomerPanelGridSelectionChange:function(grid, selected, eOpts ){
        var me =  this;
        if(!Ext.isEmpty(selected)){
            var selectedIndex =  selected.length,
                lastSelectedRecord = selected[selectedIndex-1];
                if(!Ext.isEmpty(lastSelectedRecord)){
                    me.loadAllTabGrid(lastSelectedRecord);
                    /*grid.getStore().getProxy().extraParams = {'customer_code':lastSelectedRecord.data.column_3_05};
                    grid.getStore().load();*/
                }
            // me.getCustomerOrderDetailRecords(lastSelectedRecord,grid);
        }
       /* else
            grid.getStore().removeAll();*/
    },
    loadAllTabGrid: function(record){
        var me = this,
            customer_code = record.data.column_3_05,
            customer_id = record.get('id'),
            historyGrid = me.absCmp.query('grid[itemId='+me.historyGridCnt.gridItemId+']')[0],
            salesGrid = me.absCmp.query('grid[itemId='+me.salesGridCnt.gridItemId+']')[0],
            serviceGrid = me.absCmp.query('grid[itemId='+me.serviceGridCnt.gridItemId+']')[0],
            repairGrid = me.absCmp.query('grid[itemId='+me.repairGridCnt.gridItemId+']')[0];
        if(!Ext.isEmpty(customer_id)){
            if(!Ext.isEmpty(historyGrid))
                historyGrid.getStore().reload();
            if(!Ext.isEmpty(salesGrid))
                salesGrid.getStore().reload();
            if(!Ext.isEmpty(serviceGrid))
                serviceGrid.getStore().reload();
            if(!Ext.isEmpty(repairGrid))            
                repairGrid.getStore().reload();
        }
            
    },
    getCustomerOrderDetailRecords: function(record,grid){
        var me =  this;
        Ext.Ajax.request({
            url : 'bizlayer/orderMaster/list',
            params: {
                'customer_code' : record.data.column_3_05,
                'datagrid_id'   : me.historyGridCnt.gridNo,
                'forCustomerPanel' : 1
            },
            method: 'POST',
            scope: me,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var me = this,
                        gridStore = me.historyGridCnt.grid.getStore();
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
    onTabPanelBeforeRender:  function(absCmp,eOpts){
        var me =  this;
        me.addTabGridContainer(me,absCmp);
        me.addTabGridCntProperty(me,absCmp);
    },
    addTabGridContainer: function(me,absCmp){
        me.historyGridCnt = absCmp.query('container[itemId=historyGridCnt]')[0]; 
        me.serviceGridCnt = absCmp.query('container[itemId=serviceGridCnt]')[0];
        me.repairGridCnt = absCmp.query('container[itemId=repairGridCnt]')[0];
        me.salesGridCnt = absCmp.query('container[itemId=salesHistoryGridCnt]')[0];
        me.historyGridCnt.removeAll();  
        me.salesGridCnt.removeAll();  
        me.serviceGridCnt.removeAll();
        me.repairGridCnt.removeAll();
    },
    addTabGridCntProperty: function(me,absCmp) {
        me.historyGridCnt.gridNo             = 31;
        me.historyGridCnt.colNo              = 4;
        me.historyGridCnt.rowNo              = 0;
        me.historyGridCnt.gridItemId         = 'customerOrderDetailGrid';   
        me.historyGridCnt.addTempSearch      = 1;
        me.historyGridCnt.showSaveMsg        = true;
        me.historyGridCnt.storeLoadOnSave    = false;
        me.historyGridCnt.createMsgCmp       = false;
        me.historyGridCnt.showBulkUpdate     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.historyGridCnt.addDatagridTemplate= 0;
        else 
            me.historyGridCnt.addDatagridTemplate= 1;

        me.serviceGridCnt.gridNo             = 22;
        me.serviceGridCnt.colNo              = 4;
        me.serviceGridCnt.rowNo              = 0;
        me.serviceGridCnt.gridItemId         = 'serviceGrid';   
        me.serviceGridCnt.addTempSearch      = 1;
        me.serviceGridCnt.showSaveMsg        = true;
        me.serviceGridCnt.storeLoadOnSave    = false;
        me.serviceGridCnt.createMsgCmp       = false;
        me.serviceGridCnt.showBulkUpdate     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.serviceGridCnt.addDatagridTemplate= 0;
        else 
          me.serviceGridCnt.addDatagridTemplate= 1; 

        me.repairGridCnt.gridNo             = 25;
        me.repairGridCnt.colNo              = 4;
        me.repairGridCnt.rowNo              = 0;
        me.repairGridCnt.gridItemId         = 'repairGrid';   
        me.repairGridCnt.addTempSearch      = 1;
        me.repairGridCnt.showSaveMsg        = true;
        me.repairGridCnt.storeLoadOnSave    = false;
        me.repairGridCnt.createMsgCmp       = false;
        me.repairGridCnt.showBulkUpdate     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.repairGridCnt.addDatagridTemplate= 0;
        else 
          me.repairGridCnt.addDatagridTemplate= 1;

        me.salesGridCnt.gridNo             = 32;
        me.salesGridCnt.colNo              = 4;
        me.salesGridCnt.rowNo              = 0;
        me.salesGridCnt.gridItemId         = 'customerSalesDetailGrid';   
        me.salesGridCnt.addTempSearch      = 1;
        me.salesGridCnt.showSaveMsg        = true;
        me.salesGridCnt.storeLoadOnSave    = false;
        me.salesGridCnt.createMsgCmp       = false;
        me.salesGridCnt.showBulkUpdate     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.salesGridCnt.addDatagridTemplate= 0;
        else 
            me.salesGridCnt.addDatagridTemplate= 1;  
    },
    renderServiceGrid: function(me,absCmp,resp){
       var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = 
            {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'serviceMasterJSON', 
                'storeUrl'      : 'bizlayer/service/list', 
                'create'        : 'bizlayer/service/crud', 
                'destroy'       : 'bizlayer/service/crud', 
                'extra_params'  : {
                    'synctime': me.serviceGridCnt.synctime,
                    'datagrid_id': me.serviceGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']
            };
        me.serviceGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : absCmp,
            'respObj'               : resp,
            'gridCnt'               : me.serviceGridCnt,
            'gridStore'             : me.serviceGridCnt.gridStore, 
            'gridItemId'            : me.serviceGridCnt.gridItemId,
            'addDatagridTemplate'   : me.serviceGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.serviceGridCnt.templateId,
            'templateList'          : me.serviceGridCnt.templateList,
            'searchList'            : me.serviceGridCnt.searchList,
            'addTempSearch'         : me.serviceGridCnt.addTempSearch,
            'createMsgCmp'          : me.serviceGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true,
            'actionRenderer'        : me.editLinkRenderer
        };
        me.serviceGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        // me.serviceGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.serviceGridCnt);
        me.serviceGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var customer_code = me.getSelectedCustomerRecord(me);
            me.serviceGridCnt.gridStore.getProxy().extraParams = ({'customer_code':customer_code,'datagrid_id':me.serviceGridCnt.gridNo });
        },me);
        //me.serviceGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.serviceGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.serviceGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(absCmp.filter_params)) {
            for(var k=0;k<absCmp.filter_params.length;k++) {
                me.setInitialGridFilter(absCmp.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    renderRepairGrid: function(me,absCmp,resp){
       var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = 
            {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'repairMasterJSON', 
                'storeUrl'      : 'bizlayer/repair/list', 
                'create'        : 'bizlayer/repair/crud', 
                'destroy'       : 'bizlayer/repair/crud', 
                'extra_params'  : {
                    'synctime': me.repairGridCnt.synctime,
                    'datagrid_id': me.repairGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']
            };
        me.repairGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : absCmp,
            'respObj'               : resp,
            'gridCnt'               : me.repairGridCnt,
            'gridStore'             : me.repairGridCnt.gridStore, 
            'gridItemId'            : me.repairGridCnt.gridItemId,
            'addDatagridTemplate'   : me.repairGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.repairGridCnt.templateId,
            'templateList'          : me.repairGridCnt.templateList,
            'searchList'            : me.repairGridCnt.searchList,
            'addTempSearch'         : me.repairGridCnt.addTempSearch,
            'createMsgCmp'          : me.repairGridCnt.createMsgCmp,
            'hideHeaderFilterButtons': true,
            'actionRenderer'        : me.editLinkRenderer
        };
        me.repairGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        // me.repairGridCnt.gridStore.on('load', me.onGridStoreLoad,me,me.repairGridCnt);
        me.repairGridCnt.gridStore.on('beforeload', function (store, operation, eOpts) {
            var customer_code = me.getSelectedCustomerRecord(me);
            me.repairGridCnt.gridStore.getProxy().extraParams = ({'customer_code':customer_code,'datagrid_id':me.repairGridCnt.gridNo });
        },me);
        //me.repairGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

        // me.repairGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.repairGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(absCmp.filter_params)) {
            for(var k=0;k<absCmp.filter_params.length;k++) {
                me.setInitialGridFilter(absCmp.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
    },
    getSelectedCustomerRecord: function(me){
        var grid =  me.gridCnt.customerGrid,
        gridSelection = grid.getSelectionModel().getSelection(),
        customer_code = null;
        if(!Ext.isEmpty(gridSelection)){
            var  lastSelectedRecord =  grid.getSelectionModel().getLastSelected();
            if(!Ext.isEmpty(lastSelectedRecord)){
                if(!Ext.isEmpty(lastSelectedRecord.get('column_3_05')))
                    customer_code =  lastSelectedRecord.get('column_3_05');
            }
        }
        return customer_code;
    },
    onGridItemClick:function(gridView,record,item,index,e,eOpts) {
    	var me = this,
            customer_id = record.get('id');
        if(!Ext.isEmpty(customer_id)){
            if (e.getTarget('.icon-order-entry')) {
                Ext.Router.redirect('EntryPanel/new?mode=new&customer_code='+record.get('column_3_05'));
            }
            if (e.getTarget('.icon-service-entry')) {
                Ext.Router.redirect('ServiceEntryWindow/new?mode=new&customer_code='+record.get('column_3_05'));
            }
            if (e.getTarget('.icon-repair-entry')) {
                Ext.Router.redirect('RepairEntryWindow/new?mode=new&customer_code='+record.get('column_3_05'));
            }
            if (e.getTarget('.icon-sales')) {
                Ext.Router.redirect('SalesPanel/new?mode=new&customer_code='+record.get('column_3_05'));
            }
            me.callParent(arguments);
        }
        
    },
    onHistoryPanelGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('EntryPanel/edit?id='+record.get('id')+'&entry_code='+record.get('column_1_01')+'&mode=edit');
        }
    },
    onSalesPanelGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('SalesPanel/edit?id='+record.get('id')+'&entry_code='+record.get('column_1_01')+'&mode=edit');
        }
    },
    onServicerPanelGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('ServiceEntryWindow/edit?id='+record.get('id')+'&entry_code='+record.get('column_10_01')+'&mode=edit');
        }
    },
    onCustomerPanelGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('RepairEntryWindow/edit?id='+record.get('id')+'&entry_code='+record.get('column_12_01')+'&mode=edit');
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "customerPanel grid[itemId=customerGrid]":{
                selectionchange: me.oncustomerPanelGridSelectionChange,
            },
            "customerPanel tabpanel[itemId=tabPanel]":{
                beforerender : me.onTabPanelBeforeRender
            },
            "customerPanel grid[itemId=customerOrderDetailGrid]":{
                itemclick: me.onHistoryPanelGridItemClick
            },
            "customerPanel grid[itemId=customerSalesDetailGrid]":{
                itemclick: me.onSalesPanelGridItemClick
            },
            "customerPanel grid[itemId=serviceGrid]":{
                itemclick: me.onServicerPanelGridItemClick
            },
            "customerPanel grid[itemId=repairGrid]":{
                itemclick: me.onCustomerPanelGridItemClick
            }
        });
        this.callParent(arguments);
    }
});