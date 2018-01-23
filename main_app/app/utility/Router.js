
Ext.define('YBase.utility.Router', {
    singleton: true,
    alternateClassName: 'YBase.Router',
    requires: [
    'Ext.app.Application'
    ]
},

function() {
    /*
     * Patch Ext.Application to auto-initialize Router
     */
     var routes= {
            '' : 'MainController#index',
            'dashboard': 'MainController#showDashboardView',
            // 'EntryPanel/new?*args': 'MainController#showEntryPanelView',
            // 'EntryPanel/edit?*args': 'MainController#showEntryPanelView',
            'PurchaseEntryPanel/new?*args': 'MainController#showPurchaseEntryPanelView',
            'PurchaseEntryPanel/edit?*args': 'MainController#showPurchaseEntryPanelView',
            'StockTransferEntryPanel/new?*args': 'MainController#showStockTransferEntryPanelView',
            'StockTransferEntryPanel/edit?*args': 'MainController#showStockTransferEntryPanelView',
            // 'ServiceEntryPanel/new?*args': 'MainController#showServiceEntryPanelView',
            // 'ServiceEntryPanel/edit?*args': 'MainController#showServiceEntryPanelView',
            'supplier': 'MainController#showSupplierPanelView',
            'clientProduct' : 'MainController#showClientProductPanelView',
            'productList' : 'MainController#showProductListPanelView',

            'dashboard/error?*args': 'MainController#showDashboardView',
            'repairList' :'MainController#showRepairListView',
            // 'report': 'MainController#showReportView',
            // 'report?*args': 'MainController#showReportView',
            'order': 'MainController#showOrderView',
            'sales': 'MainController#showSalesView',
            'orderDetails': 'MainController#showOrderDetailsView',
            'settings'  :'SettingsController#showSettings',
            'settings/csvMap' :'SettingsController#showCsvMapView',
            // 'settings/productMaster' :'SettingsController#showProductMasterView',
            'settings/clientMaster' :'SettingsController#showClientMasterView',
            // 'settings/staff' :'SettingsController#showStaffView',
            // 'orderFileSelection?*args': 'MainPopUpController#showOrderFileSelection',
            // // 'orderFileSelection': 'MainPopUpController#showOrderFileSelection',
            // 'commentWin?*args': 'MainPopUpController#showComment',
            // 'invoice':'MainController#showInvoiceView',
            // 'payment':'MainController#showPaymentView',
            'message': 'MainController#showMessageView',
            // 'invoiceList?*args':'MainController#showInvoiceList',
            'orderStatus': 'MainController#showOrderStatus',
            // 'supplierInvoicePanel': 'MainController#showSupplierInvoice',
            // 'supplierPaymentPanel': 'MainController#showSupplierPayment',
            // 'supplierInvoiceList?*args':'MainController#showSupplierInvoiceList',
            // 'companyTransaction':'MainController#showCompanyTransactionList',
            // 'supplierTransaction':'MainController#showSupplierTransactionList',
            // 'accountTransaction':'MainController#showAccountTransactionList',
            // 'customerAccStatement':'MainController#showCustomerAccStatment',
            // 'pickingOrderMaster':'MainController#showPickingOrderMaster',
            // 'pickingDetail':'MainController#showPickingDetail'

            //
            'customer' : "MainController#showCustomerPanelView",
            'productmaster' : "MainController#showProductMasterView",
            'batchmaster' : "MainController#showBatchMasterView",
            'batchdetail' : "MainController#showBatchDetailView",
            'transfermaster' : "MainController#showTransferMasterView",
            'RepairEntryWindow/new?*args': 'MainController#showRepairEntryWindowView',
            'RepairEntryWindow/edit?*args': 'MainController#showRepairEntryWindowView',
            'serviceMaster' : "MainController#showServiceMasterView",
            'ServiceEntryWindow/new?*args': 'MainController#showServiceEntryWindowView',
            'ServiceEntryWindow/edit?*args': 'MainController#showServiceEntryWindowView',

            'EntryPanel/new?*args': 'MainController#showOrderEntryPanelView',
            'SalesPanel/new?*args': 'MainController#showSalesEntryPanelView',
            'EntryPanel/edit?*args': 'MainController#showOrderEntryPanelView',
            'SalesPanel/edit?*args': 'MainController#showSalesEntryPanelView',

         };

    Ext.override(Ext.app.Application, {
        enableRouter: true,
        routes: routes
    });

    
    // Ext.ux.Router.on('routemissed', function(uri) {
    //     Ext.Router.redirect('Dashboard');
    // });
});

