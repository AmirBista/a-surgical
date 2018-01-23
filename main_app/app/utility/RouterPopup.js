Ext.define('YBase.utility.RouterPopup', {
    singleton: true,
    alternateClassName: 'YBase.RouterPopup',
    requires: [
        'Ext.app.Application'
    ]
},

function() {
    /*
     * Patch Ext.Application to auto-initialize Router
     */
     var routes= {
            '' : 'MainPopUpController#index',
            'orderFileSelection?*args': 'MainPopUpController#showOrderFileSelection',
            'commentWin?*args': 'MainPopUpController#showComment',
            'EntryPanel/edit?*args': 'MainPopUpController#showEntryPanelView',
            'Invoice':'MainController#showInvoiceView',
            'Payment':'MainController#showPaymentView',
            'invoiceOrder?*args': 'MainPopUpController#showInvoiceOrder',
            'paymentOrder?*args': 'MainPopUpController#showPaymentOrder',
            'invoiceList?*args' : 'MainPopUpController#showInvoiceListOrder',
            'messageWin?*args': 'MainPopUpController#showMessageView',
            'supplierInvoiceOrder?*args': 'MainPopUpController#showSupplierInvoiceOrder',
            'supplierPaymentOrder?*args': 'MainPopUpController#showSupplierPaymentOrder',
            'SalesPanel/new?*args': 'MainPopUpController#showSalesEntryPanelView',
            'SalesPanel/edit?*args': 'MainPopUpController#showSalesEntryPanelView',
            'ServiceEntryWindow/new?*args': 'MainPopUpController#showServiceEntryWindowView',
            'ServiceEntryWindow/edit?*args': 'MainPopUpController#showServiceEntryWindowView',
            'ServiceEntryPanel/new?*args': 'MainPopUpController#showServiceEntryWindowView',
            'ServiceEntryPanel/edit?*args': 'MainPopUpController#showServiceEntryWindowView'
         };

    Ext.override(Ext.app.Application, {
        enableRouter: true,
        routes: routes
    });

    
    // Ext.ux.Router.on('routemissed', function(uri) {
    //     Ext.Router.redirect('Dashboard');
    // });
});

