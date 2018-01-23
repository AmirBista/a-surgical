Ext.application({
    name: 'YBase',
    views: [
        'EntryPanel',
        'OrderFileSelectionPanel',
        'SalesPanel',
        'ServiceEntryPanel',
        'TransferStockWindow',
        'ServiceEntryWindow',
       // 'InvoiceOrder',
        //'PaymentOrder',
        'MsgTabCnt'
        //'SupplierInvoiceOrderPanel',
       // 'SupplierPaymentOrderPanel'
    ],
    controllers: [
        'EntryPanelController',
        'SalesEntryPanelController',
        'OrderSalesEntryPanelController',
        'MainPopUpController',
        'OrderFileSelectionPanelController',
        'ServiceEntryWindowController',
        'ServiceController',
        //'InvoiceOrderController',
        //'PaymentOrderController',
        //'InvoiceListPopUpController',
        'MsgTabController',
        'MsgTabWinController',
        'HelpWindowController'

        //'SupplierInvoiceOrderController',
        //'SupplierPaymentOrderController'
	],
    stores: [
        'HelpTextStore',
        'FileListStore',
        'OptCommentStore',
        'PageSizeStore'     //GridList Pagination Combo
       
    ],
    requires:[
        'Ext.ux.Router',
        'Ext.ux.ComponentEvent',
        'YBase.utility.ComboGridHelper',
        'YBase.utility.CommonFunctions',
        'YBase.utility.DatagridTemplateHelper',
        'YBase.utility.GridHelper',
        'YBase.utility.RouterPopup',
        'YBase.model.FileListModel',
        'YBase.utility.TabLoader',
        'YBase.utility.EntryPanelHelper',
        'YBase.utility.DataMapperHelper',
        'YBase.utility.ButtonHelper',
        'YBase.utility.FileHelper',
        'YBase.utility.ServiceEntryPanelHelper',
        'Ext.ux.ServiceComponentEvent',
        'YBase.utility.PurchaseEntryPanelHelper',
        
        //'YBase.utility.InvoiceBaseHelper',
        //'YBase.utility.SupplierInvoiceBaseHelper',

        'Ext.ux.SnoColRenderer', 
        'Ext.ux.form.NumericField',
        'Ext.ux.form.field.ClearButton',  
       // 'Ext.ux.dataview.LabelEditor',
        'YBase.utility.UxHelper',
        'Ext.grid.plugin.RowEditing',
        'overrides.grid.plugin.RowEditing',
        'overrides.grid.plugin.CellEditing',
        'overrides.data.Model',
        'overrides.data.AbstractStore',
        'overrides.data.Store',
        'overrides.grid.header.Container',
        'overrides.window.Window',
        'overrides.grid.GridHeaderFilters',
        'overrides.panel.Tool',
        'overrides.view.BoundList',
        'overrides.form.field.ComboBox',
        'Ext.form.action.StandardSubmit',
        'Ext.ux.grid.GridHeaderFilters',
        // 'Ext.ux.grid.Printer',
        'Ext.ux.upload.plugin.Window',
        'Ext.ux.upload.Button',
        'YBase.model.ComboItemModel',
       // 'Ext.ux.upload.plugin.Window',
        'YBase.utility.ScreenHelper',
        'YBase.utility.BulkUpdateHelper'
    ],
    launch: function() {
        Ext.MessageBox = Ext.Msg = Ext.create('Ext.window.MessageBox', {
            modal : true
        });
        
        Ext.Msg.buttonText.ok = Ext.LANG.globalLang.buttons.btnOk;
        Ext.Msg.buttonText.cancel = Ext.LANG.globalLang.buttons.btnCancel;
        Ext.Msg.buttonText.yes = Ext.LANG.globalLang.buttons.btnYes;
        Ext.Msg.buttonText.no = Ext.LANG.globalLang.buttons.btnNo;
        
        YBase.app = this;
        var loading = Ext.get('loading'),
            mask = Ext.get('loading-mask');
        loading.fadeOut({ duration: 0.2, remove: true});
        mask.setOpacity(0.9);
        mask.shift({
            xy: loading.getXY(),
            width: loading.getWidth(),
            height: loading.getHeight(),
            remove: true,
            duration: 1,
            opacity: 0.1,
            easing: 'bounceOut'
        });

        var cmp = Ext.create('YBase.view.MainPopup', {
            renderTo: Ext.getBody()
        });
        cmp.show();
    }   
});
