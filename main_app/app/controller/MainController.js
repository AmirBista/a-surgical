Ext.define('YBase.controller.MainController', {
    extend: 'Ext.app.Controller',
    views: [
        'MainPanel'
    ],
    refs:[
        {
            ref: 'mainPanel',
            selector: 'mainPanel'
        }
    ],
    requires:[
        'YBase.utility.TabLoader'
    ],
    activeBtnId:null,
    mainPanel:null,
    bodyTab: null,
    setActiveMenuItemClass: function(){
        var me=this,
            mainPanel=me.getMainPanel(),
            topButtonContainer=mainPanel.query('container[itemId=TopButtonContainer]')[0];
            menuItems=topButtonContainer.query('menuitem');
        for(var i=0;i<menuItems.length;i++){
            menuItems[i].removeCls('active-btn');  
            //btns[i].removeUI('activebtn-small');
        }
        if(!Ext.isEmpty(topButtonContainer.query('menuitem[itemId='+me.activeMenuId+']'))){
            topButtonContainer.query('menuitem[itemId='+me.activeMenuId+']')[0].addCls('active-btn');
            // topButtonContainer.query('button[itemId='+me.activeBtnId+']')[0].addUI('activebtn-small');
        }
    },
    setActiveBtnClass: function(){
        var me=this,
            mainPanel=me.getMainPanel(),
            topButtonContainer=mainPanel.query('container[itemId=TopButtonContainer]')[0],
            btns=topButtonContainer.query('button');
        for(var i=0;i<btns.length;i++){
            btns[i].removeCls('active-btn');  
            //btns[i].removeUI('activebtn-small');
        }
        if(!Ext.isEmpty(topButtonContainer.query('button[itemId='+me.activeBtnId+']'))){
            topButtonContainer.query('button[itemId='+me.activeBtnId+']')[0].addCls('active-btn');
            // topButtonContainer.query('button[itemId='+me.activeBtnId+']')[0].addUI('activebtn-small');
        }
    },
    index: function(){
        Ext.Router.redirect('dashboard');
    },
    languageImplementation: function(abs){
        var lang = Ext.LANG,
            globalLang = lang.globalLang,
            headerLang = globalLang.headerMenu;
        abs.query('button[itemId=btnMenuAcc]')[0].setText(Ext.CURRENT_USER.last_name + ' ' + Ext.CURRENT_USER.firstName);
        abs.query('menuitem[itemId=menuUserProfile]')[0].setText(headerLang.menuUserProfile);
        abs.query('menuitem[itemId=menuSwitchUser]')[0].setText(headerLang.menuSwitchUser);
        abs.query('menuitem[itemId=menuSignOut]')[0].setText(headerLang.btnLogout);
        
        /*bulkUpdatePanel*/
        var bulkUpdate = lang.bulkUpdate;
        abs.query('panel[itemId=BlukUpdatePanel]')[0].title = bulkUpdate.bulkUpdateTitle;
        
        var ValuesGrid = abs.query('gridpanel[itemId=SelectedValuesGrid]')[0];
        var FieldGrid = abs.query('gridpanel[itemId=SelectedFieldGrid]')[0];

  
        abs.query('button[itemId=GetFieldButton]')[0].setText(bulkUpdate.getButton);
        abs.query('button[itemId=SetButton]')[0].setText(bulkUpdate.setButton);

        abs.query('radiofield[itemId=ReplaceValueRadioBox]')[0].boxLabel=bulkUpdate.replaceValue;
        abs.query('radiofield[itemId=SpecifiedFormatCheckvalue]')[0].boxLabel =bulkUpdate.specifiedFormat;

        /*end of bulkUpdatePanel*/
        abs.query('button[itemId=btnCustomer]')[0].setText(headerLang.btnCustomer);
        
        /*order/ sales*/
        abs.query('button[itemId=salesEntryMenuItem]')[0].setText(headerLang.menuItemSalesEntry);
        abs.query('button[itemId=orderEntryMenuItem]')[0].setText(headerLang.menuItemOrderEntry);
        /*Sales*/
        abs.query('button[itemId=btnOrderMaster]')[0].setText(headerLang.btnOrderMaster);
        abs.query('menuitem[itemId=orderMasterMenuItem]')[0].setText(headerLang.orderMasterMenuItem);
        abs.query('menuitem[itemId=orderDetailMenuItem]')[0].setText(headerLang.orderDetailMenuItem);
        abs.query('menuitem[itemId=salesMasterMenuItem]')[0].setText(headerLang.salesEntryMenuItem);
        /*Entry Panel*/
        abs.query('button[itemId=btnEntry]')[0].setText(headerLang.entryPnlMenuItem);
        abs.query('menuitem[itemId=menuOrderEntry]')[0].setText(headerLang.menuItemOrderEntry);
        abs.query('menuitem[itemId=menuSalesEntry]')[0].setText(headerLang.menuItemSalesEntry);
        /*Store*/
        abs.query('button[itemId=btnStore]')[0].setText(headerLang.btnStore);
        abs.query('menuitem[itemId=purchaseEntryPnlMenuItem]')[0].setText(headerLang.purchaseEntryPnlMenuItem);
        abs.query('menuitem[itemId=productPnlMenuItem]')[0].setText(headerLang.productPnlMenuItem);
        abs.query('menuitem[itemId=batchMasterPnlMenuItem]')[0].setText(headerLang.batchMasterPnlMenuItem);
        abs.query('menuitem[itemId=batchDetailPnlMenuItem]')[0].setText(headerLang.batchDetailPnlMenuItem);
        abs.query('menuitem[itemId=supplierPnlMenuItem]')[0].setText(headerLang.supplierPnlMenuItem);
        
        abs.query('button[itemId=btnMessage]')[0].setText(headerLang.btnMessage);
        abs.query('button[itemId=btnPurchaseBilling]')[0].setText(headerLang.btnPurchaseBilling);
        abs.query('button[itemId=btnAccount]')[0].setText(headerLang.btnAccount);
        abs.query('button[itemId=btnBilling]')[0].setText(headerLang.btnBilling);

        /*Support*/
        abs.query('button[itemId=btnSupport]')[0].setText(headerLang.btnSupport);
        abs.query('menuitem[itemId=serivceMasterMenuItem]')[0].setText(headerLang.serivceMasterMenuItem);
        abs.query('menuitem[itemId=repairMasterPnlMenuItem]')[0].setText(headerLang.repairMasterPnlMenuItem);
         /*Store*/
        abs.query('button[itemId=btnStoreTransfer]')[0].setText(headerLang.btnStoreTransfer);
        abs.query('menuitem[itemId=stockTransferEntryPnlMenuItem]')[0].setText(headerLang.stockTransferEntryPnlMenuItem);
        abs.query('menuitem[itemId=stockTransferMasterPnlMenuItem]')[0].setText(headerLang.stockTransferMasterPnlMenuItem);

        
    },
    onMainPanelBeforeRender: function(component, eOpts) {
        var me = this;
            me.mainPanel = component;
        // YBase.utility.ResolutionHelper.addBodyCls();
        Ext.LANG.globalLang.app.appTitle = Ext.LANG.globalLang.app.appTitle;
        me.languageImplementation(component);
        me.bulkUpdateHelper(component);
        me.msgCmpHelper(component);
        if(Ext.CURRENT_USER.is_super_user) {
            component.query('button[itemId=btnSettings]')[0].setVisible(true);
            component.query('button[itemId=btnReport]')[0].setVisible(true);
        }
        if(Ext.CURRENT_USER.userRole==50) {
            component.query('button[itemId=btnEntry]')[0].setVisible(false);
            component.query('menuitem[itemId=purchaseEntryPnlMenuItem]')[0].setVisible(false);
            component.query('menuitem[itemId=stockTransferEntryPnlMenuItem]')[0].setVisible(false);
            
            // component.query('button[itemId=btnReport]')[0].setVisible(true);
        }
        if(Ext.CURRENT_USER.userRole==1 || Ext.CURRENT_USER.userRole == 101){
            component.query('menuitem[itemId=purchaseEntryPnlMenuItem]')[0].setVisible(false);
            component.query('menuitem[itemId=batchMasterPnlMenuItem]')[0].setVisible(false);
            component.query('menuitem[itemId=supplierPnlMenuItem]')[0].setVisible(false);
            component.query('button[itemId=btnStoreTransfer]')[0].setVisible(false);
        }
        var interval = Ext.LANG.taskRunner.interval;

        if(interval>0)
            me.createTask(interval);
    },
    createTask: function(interval) {
        return;
        var me = this,activeTab;
        me.runner = new Ext.util.TaskRunner();
        me.task = me.runner.newTask({
            run: function () {
                activeTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0].activeTab;
                if(activeTab.id != "Dashboard") {
                    activeTab.cntrl.getSycData(activeTab.cntrl.gridCnt.grid);
                }
            },
            interval: interval
        });
        me.task.start();
    },
    bulkUpdateHelper: function(component) {
        YBase.utility.BulkUpdateHelper.BlukUpdatePanel = component.query('panel[itemId=BlukUpdatePanel]')[0];
    },
    msgCmpHelper: function(component) {
        YBase.utility.MsgCmpHelper.MsgCmpPanel = component.query('panel[itemId=msgCmpPanel]')[0];
    },
    onMainPanelAfterRender: function(component, eOpts) {
        this.controlShortcutKey();
        var tabpanel=component.query('tabpanel[itemId=bodyTab]');
        tabpanel[0].tabBar.show();
        var msgTabCnt = Ext.create('YBase.view.MsgTabCnt'),
            msgTabCntrl = YBase.app.getController('MsgTabController');

        YBase.utility.MsgCmpHelper.MsgCmpPanel.removeAll();
        YBase.utility.MsgCmpHelper.MsgCmpPanel.add(msgTabCnt);
    },
    showDashboardView: function(params){
        if(!Ext.isEmpty(params.msg) && params.msg=="access_denied")
        {
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg: Ext.LANG.globalLang.alertMsg.accessError,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.ERROR
            });
        }
        var me=this;
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        me.activeBtnId="btnDashboard";
        me.activeMenuId='';
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
        bodyTab = Ext.ComponentQuery.query('panel[itemId=bodyTab]')[0];
        tab = Ext.ComponentQuery.query('panel[itemId=DashBoardPanel]')[0];
        if(bodyTab.activeTab.id!='Dashboard')
            bodyTab.setActiveTab(tab);
    },
    showReportView: function(params) {
         var me=this;
        // Ext.msk = Ext.create('YBase.utility.Mask');
        // Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnReport";
            YBase.utility.TabLoader.showComponent('YBase.view.Report', true, {'showBulkUpdate':false,csv_report_id:params.id});
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        // });
        // Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, Ext.getBody());
    },
    showRepairListView: function(params) {
         var me=this;
        // Ext.msk = Ext.create('YBase.utility.Mask');
        // Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnSupport";
            me.activeMenuId="repairMasterPnlMenuItem";
            YBase.utility.TabLoader.showComponent('YBase.view.Repair', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
             me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        // });
        // Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, Ext.getBody());
    },

    showServiceMasterView: function(params) {
         var me=this;
        // Ext.msk = Ext.create('YBase.utility.Mask');
        // Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnOrderMaster";
            me.activeMenuId="serivceMasterMenuItem";
            YBase.utility.TabLoader.showComponent('YBase.view.ServiceMaster', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        // });
        // Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, Ext.getBody());
    },
    
    showInvoiceView:function(params){
        var me=this;
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        me.activeBtnId="btnBilling";
        me.activeMenuId='invoiceMenuItem';
        YBase.utility.TabLoader.showComponent('YBase.view.Invoice', true);
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showInvoiceList:function(params){
        var me=this;
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        params['pnlType'] = (params.showInvoiceList==true)?'invoice':'payment';
        YBase.utility.TabLoader.showComponent('YBase.view.InvoiceList', true, params,false);
    }, 
    showSupplierInvoiceList:function(params){
        var me=this;
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        params['pnlType'] = (params.showSupplierInvoiceList==true)?'invoice':'payment';
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierInvoiceListPanel', true, params,false);
    },
    showPaymentView:function(params){
        var me=this;
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        me.activeBtnId="btnBilling";
        me.activeMenuId='paymentMenuItem';
        YBase.utility.TabLoader.showComponent('YBase.view.Payment', true);
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showTransferMasterView:function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole == 1 || Ext.CURRENT_USER.userRole == 101)
        {
            me.accessDenied();
            return;
        }
        if(!Ext.isEmpty(me.win))
            me.win.destroy();
        me.activeBtnId="btnStoreTransfer";
        me.activeMenuId='stockTransferMasterPnlMenuItem';
        YBase.utility.TabLoader.showComponent('YBase.view.TransferMaster', true);
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    onBtnDashboardClick: function(button, e, options){
        Ext.Router.redirect('dashboard');
    },
    onBtnReportClick: function(button, e, options) {
        Ext.Router.redirect('report');
    },
    onMenuSignOutClick: function(button, e, options){
        Ext.Ajax.request({
            url:'bizlayer/auth/logout',
            success: function(response){
               location.href = Ext.APP_URL;
            }
        });
    },

    onBodyTabClick: function(tab,e){
        tab.reloadData = false;
    },
    onBodyTabChange:function(tabPanel, newPanel, oldPanel, eOpts) {
        var me = this;
        Ext.entryPanel = '';
        if(!Ext.isEmpty(newPanel.isNew) && newPanel.isNew == false){
            if(newPanel.itemId=='DashBoardPanel'){
                Ext.Router.redirect('dashboard');   
            }else if(newPanel.itemId=='Order'){
                Ext.Router.redirect('order');
            }else if(newPanel.itemId=='SalesListPanel'){
                Ext.Router.redirect('sales'); 
            }else if(newPanel.itemId=='ClientProductPanel'){
                Ext.Router.redirect('clientProduct'); 
            }else if(newPanel.itemId=='ProductMaster'){
                Ext.Router.redirect('productmaster'); 
            }
            else if(newPanel.customItemId == 'EntryPanel' || newPanel.customItemId == 'SalesPanel'){
                var params = {},
                    is_new = true,
                    is_clone='',
                    clone_type = '',
                    clone_master_id='',
                    createBill='',
                    entry_id='',
                    entry_code='',
                    convertToSales='',
                    customer_code='',
                   // route = 'EntryPanel';
                   route = newPanel.is_bill_order == 1 ? 'EntryPanel' : 'SalesPanel';
                if(!Ext.isEmpty(newPanel.params.convertToSales)){
                    convertToSales = '&convertToSales='+newPanel.params.convertToSales;
                }
                if(!Ext.isEmpty(newPanel.params.id)){
                    entry_id = '&id='+newPanel.params.id;
                }
                
                if(!Ext.isEmpty(newPanel.params.is_clone)){
                    is_clone = '&is_clone='+newPanel.params.is_clone;
                }
                if(!Ext.isEmpty(newPanel.params.clone_master_id))
                    clone_master_id = '&clone_master_id='+newPanel.params.clone_master_id;
                if(!Ext.isEmpty(newPanel.params.clone_type)){
                    clone_type = '&clone_type='+newPanel.params.clone_type;
                }
                if(!Ext.isEmpty(newPanel.params.entry_code)){
                    entry_code = '&entry_code='+newPanel.params.entry_code;
                }
                 if(!Ext.isEmpty(newPanel.params.customer_code)){
                    customer_code = '&customer_code='+newPanel.params.customer_code;
                }
                Ext.entryPanel = newPanel.customPanelId;
                if(newPanel.params.mode=="new"){
                    if(newPanel.params.is_new)
                        Ext.Router.redirect(route+'/new?mode=new&is_new=true');
                    else    
                        Ext.Router.redirect(route+'/new?mode=new'+is_clone+clone_master_id+clone_type+convertToSales+entry_id+entry_code+customer_code);
                }
                else if(newPanel.params.mode=="edit"){
                    newPanel.params.createBill=null;
                    params = newPanel.params;
                    is_new= false;
                    Ext.Router.redirect(route+'/edit?'+entry_id+entry_code+'&mode=edit');
                    // Ext.Router.redirect(route+'/edit?id='+newPanel.params.id+'&entry_code='+params.entry_code+'&mode=edit');
                }
                
                // if(newPanel.tab.reloadData != false && is_new==false){
                //     var ctrl = this.getController('OrderMasterEntryController');
                //     ctrl.abstractcomponent = newPanel;
                //     ctrl.viewOrderMasterEntryDetails(params,is_new);    
                // }
                // else
                //     newPanel.tab.reloadData = true;
            } 
            else if(newPanel.customItemId == 'PurchaseEntryPanel'){
                var params = {},
                    is_new = true,
                    is_clone='',
                    clone_type = '',
                    clone_master_id='',
                    purchaseEntry = '',
                    supplier_id = '',
                    route = 'PurchaseEntryPanel';
                if(!Ext.isEmpty(newPanel.params.purchaseEntry)){
                    purchaseEntry = '&purchaseEntry='+newPanel.params.purchaseEntry;
                }

                // if(!Ext.isEmpty(newPanel.params.is_clone)){
                //     is_clone = '&is_clone='+newPanel.params.is_clone;
                // }
                // if(!Ext.isEmpty(newPanel.params.clone_master_id))
                //     clone_master_id = '&clone_master_id='+newPanel.params.clone_master_id;
                // if(!Ext.isEmpty(newPanel.params.clone_type)){
                //     clone_type = '&clone_type='+newPanel.params.clone_type;
                // }
                // Ext.entryPanel = newPanel.customPanelId;
                if(newPanel.params.mode=="new"){
                    Ext.Router.redirect(route+'/new?mode=new'+is_clone+clone_master_id+clone_type+supplier_id+purchaseEntry);
                }
                else if(newPanel.params.mode=="edit"){
                    params = newPanel.params;
                    is_new= false;
                    Ext.Router.redirect(route+'/edit?id='+newPanel.params.id+'&entry_code='+params.entry_code+supplier_id+purchaseEntry+'&mode=edit');
                }
                
            }
            else if(newPanel.customItemId == 'StockTransferEntryPanel'){
                var params = {},
                    is_new = true,
                    is_clone='',
                    clone_type = '',
                    clone_master_id='',
                    route = 'StockTransferEntryPanel';
                
                // if(!Ext.isEmpty(newPanel.params.is_clone)){
                //     is_clone = '&is_clone='+newPanel.params.is_clone;
                // }
                // if(!Ext.isEmpty(newPanel.params.clone_master_id))
                //     clone_master_id = '&clone_master_id='+newPanel.params.clone_master_id;
                // if(!Ext.isEmpty(newPanel.params.clone_type)){
                //     clone_type = '&clone_type='+newPanel.params.clone_type;
                // }
                // Ext.entryPanel = newPanel.customPanelId;
                if(newPanel.params.mode=="new"){
                    Ext.Router.redirect(route+'/new?mode=new'+is_clone+clone_master_id+clone_type);
                }
                else if(newPanel.params.mode=="edit"){
                    params = newPanel.params;
                    is_new= false;
                    Ext.Router.redirect(route+'/edit?id='+newPanel.params.id+'&entry_code='+params.entry_code+'&mode=edit');
                }
                
            }
            else if(newPanel.customItemId == 'ServiceEntryPanel'){
                var params = {},
                    is_new = true,
                    is_clone='',
                    clone_type = '',
                    clone_master_id='',
                    customer_code='',
                    order_code='',
                    order_master_id='',
                    route = 'ServiceEntryPanel';

                // if(!Ext.isEmpty(newPanel.params.is_clone)){
                //     is_clone = '&is_clone='+newPanel.params.is_clone;
                // }
                // if(!Ext.isEmpty(newPanel.params.clone_master_id))
                //     clone_master_id = '&clone_master_id='+newPanel.params.clone_master_id;
                // if(!Ext.isEmpty(newPanel.params.clone_type)){
                //     clone_type = '&clone_type='+newPanel.params.clone_type;
                // }
                // Ext.entryPanel = newPanel.customPanelId;
                if(!Ext.isEmpty(newPanel.params.order_master_id)){
                    order_master_id = '&order_master_id='+newPanel.params.order_master_id;
                }
                
                if(!Ext.isEmpty(newPanel.params.customer_code)){
                    customer_code = '&customer_code='+newPanel.params.customer_code;
                }
                if(!Ext.isEmpty(newPanel.params.order_code)){
                    order_code = '&order_code='+newPanel.params.order_code;
                }
                if(newPanel.params.mode=="new"){
                    Ext.Router.redirect(route+'/new?mode=new'+is_clone+clone_master_id+clone_type+order_master_id+customer_code+order_code);
                }
                else if(newPanel.params.mode=="edit"){
                    params = newPanel.params;
                    is_new= false;
                    Ext.Router.redirect(route+'/edit?id='+newPanel.params.id+'&entry_code='+params.entry_code+'&mode=edit');
                }
                
            }
            else if(newPanel.itemId=='Report'){
                Ext.Router.redirect('report');   
            }else if(newPanel.PanelNo==100){
                var SettingsActiveTab=newPanel.query('tabpanel')[0].activeTab;
                if(SettingsActiveTab.itemId=='EcSiteExportPanel'){
                    Ext.Router.redirect('settings/csvMap');
                } else if(SettingsActiveTab.itemId=='ClientMaster') {
                    Ext.Router.redirect('settings/clientMaster');
                } else if(SettingsActiveTab.itemId=='ProductMaster') {
                    Ext.Router.redirect('settings/productmaster');
                } else if(SettingsActiveTab.itemId=='Staff') {
                    Ext.Router.redirect('settings/staff');
                } else{
                    //do nothing
                }
            }
            // else if(newPanel.itemId=='Invoice') {
            //     Ext.Router.redirect('invoice');
            // }
            // else if(newPanel.itemId=='Payment') {
            //     Ext.Router.redirect('payment');
            // }
            // else if(newPanel.itemId=='OrderDetails') {
            //     Ext.Router.redirect('orderDetails');
            // }
            // else if(newPanel.itemId=='InvoiceList') {
            //     if(newPanel.pnlType=='invoice'){
            //         Ext.Router.redirect('invoiceList?showInvoiceList=true');
            //     }
            //     else if(newPanel.pnlType=='payment'){
            //         Ext.Router.redirect('invoiceList?showInvoiceList=false');
            //     }
            // }
            else if(newPanel.itemId=='SupplierPanel') {
                Ext.Router.redirect('supplier');
            }
            else if(newPanel.itemId=='MessagePanel') {
                Ext.Router.redirect('message');
            }
            // else if(newPanel.itemId=='OrderStatusPanel') {
            //     Ext.Router.redirect('orderStatus');
            // }
            // else if(newPanel.itemId=='StatusPanel') {
            //     Ext.Router.redirect('orderStatus');
            // }
            // else if(newPanel.itemId=='SupplierInvoicePanel') {
            //     Ext.Router.redirect('supplierInvoicePanel');
            // }
            // else if(newPanel.itemId=='SupplierPaymentPanel') {
            //     Ext.Router.redirect('supplierPaymentPanel');
            // }
            // else if(newPanel.itemId=='purchaseTransactionMenuItem') {
            //    Ext.Router.redirect('supplierTransaction');
            // }
            // else if(newPanel.pnlType=='transactionMenuItem'){
            //     Ext.Router.redirect('companyTransaction');
            // }
            // else if(newPanel.itemId=='PickingOrderMasterListPanel') {
            //    Ext.Router.redirect('pickingOrderMaster');
            // }
            // else if(newPanel.itemId=='PickingDetailPanel') {
            //    Ext.Router.redirect('pickingDetail');
            // }
            else if(newPanel.itemId=='CustomerPanel') {
                Ext.Router.redirect('customer');
            }
            else if(newPanel.itemId=='BatchDetailPanel') {
                Ext.Router.redirect('batchdetail');
            }
            else if(newPanel.itemId=='BatchMasterPanel') {
                Ext.Router.redirect('batchmaster');
            }
            else if(newPanel.itemId=='TransferMaster') {
                Ext.Router.redirect('transfermaster');
            }
            else if(newPanel.itemId=='Repair') {
                Ext.Router.redirect('repairList');
            }
             else if(newPanel.itemId=='ServiceMaster') {
                Ext.Router.redirect('serviceMaster');
            }

            else {
                //do nth
            }
        }else {
            if(newPanel.itemId=='DashBoardPanel'){
                Ext.Router.redirect('dashboard');   
            }
            else if(newPanel.customItemId == 'EntryPanel'){
                Ext.entryPanel = newPanel.customPanelId;
            }
            else if(newPanel.itemId=='MessagePanel') {
                Ext.Router.redirect('message');
            }
            else if(newPanel.itemId=='OrderStatusPanel') {
                Ext.Router.redirect('orderStatus');
            }
            else {
                //do nth
            }
        }
        newPanel.isNew = false;
        me.showHideBulkPanel(newPanel, oldPanel);
        me.showMsgCmpPanel(newPanel, oldPanel);
    },
    showHideBulkPanel:function(newPanel, oldPanel) {
        var newGrid = newPanel.query('grid')[0];
        YBase.utility.BulkUpdateHelper.setActiveTabStore(newPanel,newGrid);    
    },
    showMsgCmpPanel:function(newPanel, oldPanel) {
        newPanel.isNew = false;
        newGrid = newPanel.query('grid')[0];
        if(Ext.isEmpty(newGrid))
            newGrid = null;
        YBase.utility.MsgCmpHelper.setActiveTabStore(newPanel,newGrid,oldPanel);    
    },
    onMenuUserProfileClick:function(button,e,eOpts){
        this.loadUserProfileEditWindow();
    },
    loadUserProfileEditWindow: function() {
        var win = Ext.create('YBase.view.UserProfileEdit');
        win.show();
    },
    onFieldBlur: function(e){
        if(e.readOnly===false && !Ext.isEmpty(e.getValue()) && e.xtype!='datefield' && e.xtype!='combobox')
            e.setValue(e.getValue());
            // e.setValue(e.getValue().trim());
    },
    onMainPanelTopButtonClick: function(btn){
        if(btn){
            btn.fireEvent('mouseover',btn);
        }
    },
    onMainPanelTopButtonMouseOver: function(btn){
        Ext.defer(function(){
            if(btn.menu)
                btn.showMenu();    
        },98);
    },
    onMainPanelTopButtonMouseOut: function(btn){
        if(btn.hasVisibleMenu())
            btn.hideMenu();
    },
    onMainPanelTopButtonMenuMouseOver: function(menu,item){
        menu.show();
    },
    onMainPanelTopButtonMenuMouseLeave: function(menu,item){
        menu.hide();
    },
    onComboExpand: function(combo,eOpts){
        var picker = combo.picker,
            itemNode = picker.getSelectedNodes()[0];
        if(itemNode)
            picker.listEl.scrollChildIntoView(itemNode,false);
    },
    onBtnSettingsClick:function(button, e, eOpts){
        var me=this;
        me.activeMenuId='';
        me.setActiveMenuItemClass();
        Ext.Router.redirect('settings');  
    },
    onStockTransferEntryClick: function(btn) {
        Ext.Router.redirect('StockTransferEntryPanel/new?mode=new');
    },
    onStockTransferMasterClick:function (btn)
    {
        Ext.Router.redirect('transfermaster');
    },
    onServiceMasterClick:function (btn)
    {
        Ext.Router.redirect('serviceMaster');
    },
    onBtnEntryPanelClick: function(btn) {
        Ext.Router.redirect('EntryPanel/new?mode=new');
    },
    onBtnPurchaseEntryClick: function() {
        Ext.Router.redirect('PurchaseEntryPanel/new?mode=new&purchaseEntry=true');
    },
    // Order Entry
    // showEntryPanelView: function(params){
    //     var me=this;
    //     if(Ext.msk)
    //         Ext.msk.hide();
    //     if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
    //     {
    //         me.accessDenied();
    //         return;
    //     }
    //     Ext.msk = Ext.create('YBase.utility.Mask');
    //     Ext.msk.on('afterrender', function(){
    //         me.activeBtnId="btnEntry";
    //         me.activeMenuId="";
    //         params['is_bill_order'] = 1;
    //         me.getController('EntryPanelController').loadEntryPanel(params);
    //         me.setActiveBtnClass();
    //         me.setActiveMenuItemClass();
            
    //     });

    //     var entryPanelItemId = 'EntryPanel',
    //         entryMasterCode = params.entry_code,
    //         bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
    //         entryPnl,
    //         mskBody;

    //     if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
    //         entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
    //     }

    //     entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

    //     if(!Ext.isEmpty(entryPnl)){
    //         mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
    //     }
    //     else
    //         mskBody = Ext.getBody();

    //     Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    // },
    // Transfer Entry
    showStockTransferEntryPanelView: function(params) {
        var me=this;
        if(Ext.msk)
            Ext.msk.hide();
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.CURRENT_USER.userRole == 1 || Ext.CURRENT_USER.userRole == 101)
        {
            me.accessDenied();
            return;
        }
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnStoreTransfer";
            me.activeMenuId="stockTransferEntryPnlMenuItem";
            params['is_bill_order'] = 1;
            me.getController('StockTransferEntryController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'StockTransferPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    // Purchase Entry
    showPurchaseEntryPanelView: function(params){
        var me=this;
        if(Ext.msk)
            Ext.msk.hide();
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.CURRENT_USER.userRole == 1 || Ext.CURRENT_USER.userRole == 101)
        {
            me.accessDenied();
            return;
        }
        
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnStore";
            me.activeMenuId="purchaseEntryPnlMenuItem";
            params['is_bill_order'] = 1;
            me.getController('PurchaseEntryPanelController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'SupplierEntryPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    accessDenied:function()
    {
        Ext.Router.redirect('dashboard/error?msg=access_denied');
    },
    onOrderMasterMenuItemClick: function(item, e, eOpts) {
        Ext.Router.redirect('order');
    },
    onSalesMasterMenuItemClick:function(item, e, eOpts) {
        Ext.Router.redirect('sales');
    },
    onBtnEstimateMasterMenuItemClick: function(button,e,eOpts){
        Ext.Router.redirect('estimate');
    },  
    onBtnEstimateDetailMenuItemClick: function(button,e,eOpts){
        Ext.Router.redirect('estimateDetails');
    },  
    onBtnSupplyListPanelClick: function(item, e, eOpts) {
        Ext.Router.redirect('supplier');
    },
    onClientProductListMenuItemClick : function(item, e, eOpts){
        Ext.Router.redirect('clientProduct');
    },
    onProductListMenuItemClick : function(item, e, eOpts){
        Ext.Router.redirect('productList');
    },
    onBtnInvoiceMenuItemClick: function(button, e, eOpts){
        Ext.Router.redirect('invoice');
    },
    onBtnPaymentMenuItemClick: function(button, e, eOpts){
        Ext.Router.redirect('payment');
    },
    onOrderDetailMenuItemClick: function(menuitem) {
        Ext.Router.redirect('orderDetails');
    },
    onPickingEntryMenuItemClick: function(item) {
        Ext.Router.redirect('PickingEntryPanel/new?mode=new');
    },
   
    showOrderView: function(params){
        var me=this;
        me.activeBtnId="btnOrderMaster";
        me.activeMenuId="orderMasterMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.Order', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showSalesView: function(params){
        var me=this;
        me.activeBtnId="btnOrderMaster";
        me.activeMenuId="salesMasterMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.SalesListPanel', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    // showEstimateView : function(params){
    //     var me=this;
    //     me.activeBtnId="btnEntryPanel";
    //     me.activeMenuId="estimateMasterMenuItem";
    //     YBase.utility.TabLoader.showComponent('YBase.view.Estimate', true, {'showBulkUpdate':false,params: params});
    //     me.setActiveBtnClass();
    //     me.setActiveMenuItemClass();
    // },
    showSupplierPanelView: function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==1 || Ext.CURRENT_USER.userRole == 101)
        {
            me.accessDenied();
            return;
        }
        me.activeBtnId="btnStore";
        me.activeMenuId="supplierPnlMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showClientProductPanelView : function(params){
        var me=this;
        me.activeBtnId="btnClient";
        me.activeMenuId="clientProductListMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.ClientProductPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showProductListPanelView : function(params){
        var me=this;
        me.activeBtnId="btnClient";
        me.activeMenuId="productListMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.ProductMaster', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showOrderDetailsView: function(params){
        var me=this;
        me.activeBtnId="btnOrderMaster";
        me.activeMenuId = "orderDetailMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.OrderDetails', true, {'showBulkUpdate':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showEstimateDetailsView: function(params){
        var me=this;
        me.activeBtnId="btnEntryPanel";
        me.activeMenuId = "estimateDetailMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.EstimateDetails', true, {'showBulkUpdate':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    /*showServiceEntryPanelView: function(params) {
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk)
            Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnSupport";
            me.activeMenuId="serivceMasterMenuItem";
            me.getController('ServiceEntryPanelController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });
        var entryPanelItemId = 'ServiceEntryPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },*/
    showPickingEntryPanelView: function(params){
        var me=this;
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnPickingList";
            me.activeMenuId="pickingEntryMenuItem";
            me.getController('PickingEntryPanelController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'PickingEntryPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    controlShortcutKey: function(){
        //TODO: need to manage main panel menu button events shortcut event.


        //shift+TAB: change active tabs
        var a = new Ext.util.KeyMap(document.body, {
            key  : Ext.EventObject.TAB,
            shift:true,
            fn   : function(keycode, e) {
                
                if (Ext.isEmpty(Ext.bodyTab)){
                    Ext.bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0];
                }

                var tab  = Ext.bodyTab,
                    activeTab = tab.getActiveTab();
                
                if(activeTab.customItemId == "EntryPanel"){
                    var formPanel = activeTab.query('form[itemId=entryFormPanel]')[0],
                        focusedFld = formPanel.query('textfield[enableCustomShiftTab=false]');
                    if(!Ext.isEmpty(focusedFld)){
                        var flds = formPanel.query('textfield');
                        for(var i=0;i<flds.length;i++){
                            flds[i].enableCustomShiftTab = null;
                        }
                        return;
                    }
                }
                e.stopEvent();
                for (var i = 0; i < tab.items.length; i++) {
                    if (tab.items.items[i] == tab.activeTab) {
                        if (i==tab.items.length-1) {
                            tab.setActiveTab(tab.items.items[0]);
                            return;
                        }else{
                            tab.setActiveTab(tab.items.items[i+1]);
                            return;
                        }
                    }
                }
            }
        });

        //Alt+N:New, Alt+S:Save, Alt+D:Delete, Alt+E:Export
        var b = new Ext.util.KeyMap(document.body, {
            key  : 'NSDE',
            alt:true,
            fn   : function(keycode, e) {
                e.stopEvent();
                if (Ext.isEmpty(Ext.bodyTab)){
                    Ext.bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0];
                }
                var tab  = Ext.bodyTab,
                    sKey = String.fromCharCode(keycode),
                    query = Ext.String.format('button[shortcutKey={0}]', sKey);
                var btns =tab.activeTab.query(query);
                if (!Ext.isEmpty(btns) && btns.length > 0){
                        btns[0].fireEvent("click");
                    }
            }
        });
        // F2: make select  Datagrid 
        var c = new Ext.util.KeyMap(document.body, {
            key  : Ext.EventObject.F2,
            fn   : function(keycode, e) {
                e.stopEvent();
                if (Ext.isEmpty(Ext.bodyTab)){
                    Ext.bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0];
                }
                var tab  = Ext.bodyTab;
                var grid =tab.activeTab.query('grid')[0];
                if (typeof(grid) !== "undefined") {
                    var rowEditing = grid.getPlugin('plgGridListCellEditing');
                    if (typeof(rowEditing) !== "undefined") {
                        rowEditing.cancelEdit();
                        try{
                            rowEditing.startEditByPosition({
                                //TODO need to manage this active cell address dynamic
                                row: 0,
                                column: 3
                            });
                        }
                        catch(err) {
                            cell = null;
                        }  
                    }
                }
            }
        });
    },
    printCsvReport: function(entry_ids,menuItemId){
        var report_id = 5,
            url,type;
        if(menuItemId == 'menuItemPrintJson'){
            type = 'driver_report';
            url = 'bizlayer/csvReport/getReportArray?report_id='+report_id+'&entry_id='+entry_ids;
        }
        else if(menuItemId == "menuItemPrintCsv"){
            type = 'driver_report';
            url = 'bizlayer/pbasePrintReport/getReportView?type='+type+'&order_detail_ids='+entry_ids;

            // var form_325 = new Ext.FormPanel({
            //         id: 'csvForm',
            //         method: "POST",
            //         url: "bizlayer/pbasePrintReport/getReportView",
            //         baseParams: {
            //             type : type,
            //             order_detail_ids : JSON.stringify(entry_ids),
            //             // order_masters_ids:JSON.stringify(entry_ids),
            //             // csv_report_id:3,
            //             // printAll:true,
            //         },
            //         standardSubmit: true
            //     });

            // form_325.getForm().submit({
            //     target: '_blank'
            // });
            // return;
        }
        
        window.open(url,'_blank');
        return;
    },
    onBtnMessageClick: function() {
        Ext.Router.redirect('message');
    },
    showMessageView: function(params) {
        var me = this;
        me.activeBtnId="btnMessage";
        YBase.utility.TabLoader.showComponent('YBase.view.MessagePanel', true, {'showBulkUpdate':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    onPickingMasterMenuItemClick: function(menuitem) {
        Ext.Router.redirect('pickingOrderMaster');
    },
    onPickingDetailMenuItemClick: function(menuitem) {
        Ext.Router.redirect('pickingDetail');
    },
    onOrderStatusMenuItemClick: function(menuitem) {
        Ext.Router.redirect('orderStatus');
    },
    onPickingListMenuItemClick: function(menuitem) {
        alert('comminSoon');
    },
    onTransactionMenuItemClick: function(menuitem) {
        Ext.Router.redirect('companyTransaction');
    },
    onPayableBillMenuItemClick: function(menuitem) {
        Ext.Router.redirect('supplierInvoicePanel');
    },
    onPurchasePaymentMenuItemClick: function(menuitem) {
        Ext.Router.redirect('supplierPaymentPanel');
    },
    onPurchaseTransactionMenuItemClick: function(menuitem) {
       Ext.Router.redirect('supplierTransaction');
    },
    onAccTranasctionMenuItemClick: function(menuitem) {
        Ext.Router.redirect('accountTransaction');
    },
    onCustomerAccStatementMenuItemClick: function(menuitem) {
        Ext.Router.redirect('customerAccStatement');
    },
    showOrderStatus: function(params) {
        var me=this;
        me.activeBtnId="btnOrderMaster";
        me.activeMenuId="orderStatusMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.OrderStatusPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showSupplierInvoice: function(params) {
        var me=this;
        me.activeBtnId="btnPurchaseBilling";
        me.activeMenuId="payableBillMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierInvoicePanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showSupplierPayment: function(params) {
        var me=this;
        me.activeBtnId="btnPurchaseBilling";
        me.activeMenuId="purchasePaymentMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierPaymentPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showCompanyTransactionList: function(params) {
        var me=this;
        me.activeBtnId="btnBilling";
        me.activeMenuId="transactionMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.ClientTransactionListPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showSupplierTransactionList: function(params) {
        var me=this;
        me.activeBtnId="btnPurchaseBilling";
        me.activeMenuId="purchaseTransactionMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierTransactionListPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showPickingOrderMaster: function(params) {
        var me=this;
        me.activeBtnId="btnPickingList";
        me.activeMenuId="pickingMasterMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.PickingOrderMasterListPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showPickingDetail: function(params) {
        var me=this;
        me.activeBtnId="btnPickingList";
        me.activeMenuId="pickingDetailMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.PickingDetailPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showAccountTransactionList: function(params) {
        var me=this;
        me.activeBtnId="btnAccount";
        me.activeMenuId="accTranasctionMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.AccountTransactionListPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    showCustomerAccStatment: function(params) {
        var me=this;
        me.activeBtnId="btnAccount";
        me.activeMenuId="customerAccStatementMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.CustomerAccStatementListPanel', true, {'showBulkUpdate':false,'showSkuCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    },
    onBtnCustomerClick:function()
    {
        Ext.Router.redirect('customer');
    },
    showCustomerPanelView:function(params)
    {
        var me=this;
        me.activeBtnId="btnCustomer";
        me.activeMenuId="";
        YBase.utility.TabLoader.showComponent('YBase.view.CustomerPanel', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    
    },
    onProductPnlClick:function()
    {
        Ext.Router.redirect('productmaster');
    },
    showProductMasterView:function(params)
    {
        var me=this;
        me.activeBtnId="btnStore";
        me.activeMenuId="productPnlMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.ProductMaster', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    
    },
    onBatchMasterPnlMenuItemClick:function()
    {
        Ext.Router.redirect('batchmaster');
    },
    showBatchMasterView:function(params)
    {
        var me=this;
        if(Ext.CURRENT_USER.userRole == 1 || Ext.CURRENT_USER.userRole == 101)
        {
            me.accessDenied();
            return;
        }
        me.activeBtnId="btnStore";
        me.activeMenuId="batchMasterPnlMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.BatchMasterPanel', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    
    },
    onbatchDetailPnlMenuItemClick:function()
    {
        Ext.Router.redirect('batchdetail');
    },
    showBatchDetailView:function(params)
    {
        var me=this;
        me.activeBtnId="btnStore";
        me.activeMenuId="batchDetailPnlMenuItem";
        YBase.utility.TabLoader.showComponent('YBase.view.BatchDetailPanel', true, {'showBulkUpdate':false,'showMsgCmp':false,params: params});
        me.setActiveBtnClass();
        me.setActiveMenuItemClass();
    
    },
    onsupplierPnlMenuItemClick:function()
    {
        Ext.Router.redirect('supplier');
    },
    onRepairMasterPnlEntryClick:function(){
        Ext.Router.redirect('repairList');
    },
    showRepairEntryWindowView: function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk)
            Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnOrderMaster";
            me.activeMenuId="repairMasterPnlMenuItem";
            params['entryPanel'] = 'repairEntryWindow';
            me.getController('RepairEntryWindowController').loadEntryPanel(params);
            me.setActiveBtnClass();
        });
        var entryPanelItemId = 'RepairEntryWindow',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    // Service Entry Window
    showServiceEntryWindowView: function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk)
            Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnSupport";
            me.activeMenuId="serivceMasterMenuItem";
            params['entryPanel'] = 'serviceEntryWindow';
            me.getController('ServiceEntryWindowController').loadEntryPanel(params);
            me.setActiveBtnClass();
        });
        var entryPanelItemId = 'ServiceEntryWindow',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    onOrderEntryMenuitemClick: function(button,e,eOpts){
        //orderEntryMenuItem
        var me = this;
            me.onNewOrderSalesEntryClick(button);
    },
    onSalesEntryMenuitemClick: function(button,e,eOpts){
        //salesEntryMenuItem
        var me = this;
            me.onNewOrderSalesEntryClick(button);
    },
    onNewOrderSalesEntryClick: function(button, e, options){
        var me = this,
            isBillOrder = null;
        if(button.itemId == "orderEntryMenuItem"){
            isBillOrder =  1;
        }
        else if(button.itemId == "salesEntryMenuItem"){
            isBillOrder =  0;
        }
        var route = isBillOrder == 1 ? 'EntryPanel' : 'SalesPanel';
           // bodyTab = !Ext.isEmpty(Ext.bodyTab) ? Ext.bodyTab : Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            Ext.Router.redirect(route+'/new?mode=new');
    },
    // Order Entry
    showOrderEntryPanelView : function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk) Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnEntrySales";
            me.activeMenuId="orderEntryMenuItem";
            params['is_bill_order'] = 1;
            me.getController('EntryPanelController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'EntryPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    showSalesEntryPanelView : function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk) Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnEntrySales";
            me.activeMenuId="salesEntryMenuItem";
            params['is_bill_order'] = 0;
            me.getController('SalesEntryPanelController').loadEntryPanel(params);
            me.setActiveBtnClass();
            me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'SalesPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    init: function(application) {
        var me=this;
        me.control({
            "mainPanel": {
                beforerender: me.onMainPanelBeforeRender,
                afterrender: me.onMainPanelAfterRender
            },
            "mainPanel button[itemId=btnDashboard]": {
                click: me.onBtnDashboardClick            
            },
            "mainPanel button[itemId=btnMember]": {
                click: me.onBtnMemberClick            
            },
            // "mainPanel button[itemId=btnSupplier]": {
            //     click: me.onBtnSupplierClick            
            // },
            "mainPanel button[itemId=btnAuction]": {
                click: me.onBtnAuctionClick            
            },
            "mainPanel button[itemId=btnAuctionDetail]": {
                click: me.onBtnAuctionDetailClick            
            },
            "mainPanel button[itemId=btnReport]": {
                click: me.onBtnReportClick            
            },
            "tabpanel[itemId=bodyTab] tab":{
                click: me.onBodyTabClick
            },
            "tabpanel[itemId=bodyTab]":{
                tabchange: me.onBodyTabChange
            },
            "mainPanel menuitem[itemId=menuUserProfile]": {
                click:me.onMenuUserProfileClick
            },
            "mainPanel button[itemId=btnSettings]": {
                click:me.onBtnSettingsClick
            },
            "mainPanel button": {
                click : me.onMainPanelTopButtonClick,
                mouseover: me.onMainPanelTopButtonMouseOver,
                mouseout : me.onMainPanelTopButtonMouseOut
            },
            "mainPanel button menu": { 
                mouseover: me.onMainPanelTopButtonMenuMouseOver,
                mouseleave : me.onMainPanelTopButtonMenuMouseLeave
            },
            "textfield,textareafield,combobox": {
                blur:me.onFieldBlur
            },
            "textarea,textfield": {
                //focus: me.onFocusMakeBlur
            },
            "mainPanel combobox":{
                expand: me.onComboExpand
            },
            "mainPanel menuitem[itemId=menuSignOut]": {
                click: me.onMenuSignOutClick
            },
            "mainPanel button[itemId=btnEntry]":{
                click: me.onBtnEntryPanelClick
            },
            "mainPanel menuitem[itemId=orderMasterMenuItem]": {
                click: me.onOrderMasterMenuItemClick            
            },
            "mainPanel menuitem[itemId=salesMasterMenuItem]": {
                click: me.onSalesMasterMenuItemClick            
            },
            "mainPanel menuitem[itemId=orderDetailMenuItem]": {
                click: me.onOrderDetailMenuItemClick
            },

            "mainPanel menuitem[itemId=purchaseEntryPnlMenuItem]":{
                click: me.onBtnPurchaseEntryClick
            },
            "mainPanel menuitem[itemId=productPnlMenuItem]": {
                click: me.onProductPnlClick            
            },
            "mainPanel menuitem[itemId=batchMasterPnlMenuItem]": {
                click: me.onBatchMasterPnlMenuItemClick
            },
            // "mainPanel menuitem[itemId=batchMasterPnlMenuItem]": {
            //     click: me.onOrderMasterMenuItemClick            
            // },
            "mainPanel menuitem[itemId=batchDetailPnlMenuItem]": {
                click: me.onbatchDetailPnlMenuItemClick
            },
            "mainPanel menuitem[itemId=supplierPnlMenuItem]": {
                click: me.onsupplierPnlMenuItemClick
            },

            "mainPanel menuitem[itemId=invoiceMenuItem]": {
                click: me.onBtnInvoiceMenuItemClick            
            },
            "mainPanel menuitem[itemId=paymentMenuItem]": {
                click: me.onBtnPaymentMenuItemClick            
            },
            "mainPanel menuitem[itemId=clientProductListMenuItem]":{
                click: me.onClientProductListMenuItemClick
            },
            "mainPanel menuitem[itemId=productListMenuItem]":{
                click: me.onProductListMenuItemClick
            },
            "mainPanel button[itemId=btnMessage]": {
                click: me.onBtnMessageClick
            },
            "mainPanel menuitem[itemId=orderStatusMenuItem]":{
                click: me.onOrderStatusMenuItemClick
            },
            "mainPanel menuitem[itemId=transactionMenuItem]":{
                click: me.onTransactionMenuItemClick
            },
            "mainPanel menuitem[itemId=payableBillMenuItem]":{
                click: me.onPayableBillMenuItemClick
            },
            "mainPanel menuitem[itemId=purchasePaymentMenuItem]":{
                click: me.onPurchasePaymentMenuItemClick
            },
            "mainPanel menuitem[itemId=purchaseTransactionMenuItem]":{
                click: me.onPurchaseTransactionMenuItemClick
            },
            "mainPanel menuitem[itemId=accTranasctionMenuItem]":{
                click: me.onAccTranasctionMenuItemClick
            },
            "mainPanel menuitem[itemId=customerAccStatementMenuItem]":{
                click: me.onCustomerAccStatementMenuItemClick
            },
           "mainPanel button[itemId=btnCustomer]":{
                click: me.onBtnCustomerClick
            },
            "mainPanel menuitem[itemId=stockTransferEntryPnlMenuItem]":{
                click: me.onStockTransferEntryClick
            },
            "mainPanel menuitem[itemId=repairMasterPnlMenuItem]":{
                click: me.onRepairMasterPnlEntryClick
            },
            // "mainPanel menuitem[itemId=stockTransferMasterPnlMenuItem]": {
            //     click: me.onProductPnlClick            
            // },
            "mainPanel menuitem[itemId=stockTransferMasterPnlMenuItem]": {
                click: me.onStockTransferMasterClick            
            },
            // "mainPanel menuitem[itemId=stockTransferDetailPnlMenuItem]": {
            //     click: me.onBatchMasterPnlMenuItemClick
            // },
            "mainPanel menuitem[itemId=serivceMasterMenuItem]": {
                click: me.onServiceMasterClick            
            },
            "mainPanel button[itemId=orderEntryMenuItem]":{
                 click : me.onOrderEntryMenuitemClick
            },
            "mainPanel button[itemId=salesEntryMenuItem]":{
                 click : me.onSalesEntryMenuitemClick
            }
             
        });
    }
});
