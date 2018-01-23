Ext.application({
    name: 'YBase',
    views: [
        'MainPanel',
        'Dashboard',
        // 'CsvImportWin',
        // 'BaseEntryPanel',
        'EntryPanel',
        'SalesPanel',
        'PurchaseEntryPanel',
        // 'ServiceEntryPanel',
        'Order',
        'OrderDetails',
        'CustomerPanel',
        'ProductMaster',
        'BatchMasterPanel',
        'BatchDetailPanel',
        'SupplierPanel',
        'TransferMaster',
        'StockTransferEntryPanel',
        'TransferStockWindow',
        'ImageDragDropWindow',
        'RepairEntryWindow',
        'ServiceEntryWindow',
        'PrintReportPopUp'
    ],
    controllers: [
        'BaseController',
        'MainController',
        'DashboardController',
        'DashBoardWinController',
        'BulkUpdateController',
        'SettingsController',
        'EntryPanelController',
        'PurchaseEntryPanelController',
        // 'ServiceEntryPanelController',
        // 'EcSiteExportController',
        'ReportController',
        'OrderController',
        'ProductController',
        'OrderDetailsController',
        'MsgCmpController',
        'MsgTabController',
        'MessageController',
        'CustomerController',
        'BatchMasterController',
        'BatchDetailController',
        'SupplierPanelController',
        'SearchController',
        'StockTransferEntryController',
        'TransferStockWinController',
        'ImageDragDropWinController',
        'RepairController',
        'RepairEntryWindowController',

        'TransferMasterController',
        'ServiceController',
		'RepairEntryWindowController',
        'UserController',
        'SearchEditController',
        'FieldOptionController',
        'PrintReportPopUpController',
        'HelpWindowController',
        'SalesEntryPanelController',
        'SalesController',
        'ServiceEntryWindowController'        
	],
    stores: [
        // 'CheckedItemTreeStore',
        'AvailableLanguageStore', //userProfile edit window
        'PageSizeStore',     //GridList Pagination Combo
        'DefaultPanelDatagridStore',
        'DatagridTemplatePanelStore',
        'PanelNameStore',
        'DatagridTemplateStore',
        'FieldListJson',
        'SelectedValueJson',
        //for settings panel and csvMap panel
        'SettingsPanelStore',
        'CsvMappedMasterStore',
        'EcSiteStore',
        'WinstonStore',
        'DataFormatStore',
        'MappedComboStore',
        'CsvImportExportComboStore',
        'CsvImportExportStore',
        // 'ReportListStore',
        // 'FilesStore',
        //for helpText window 
        'HelpTextStore',
        'FieldOptionDataStore',
        'MainCommentStore',
        // 'MonthStore',
        'OptCommentStore',
        'SearchCriteriaStore',
        'StoreListStore'
        // 'ClientTypeStore'

    ],
	requires:[
        'Ext.ux.Router',
        'Ext.ux.SnoColRenderer', 
        'Ext.ux.form.field.ClearButton',  
        'Ext.ux.dataview.LabelEditor',
        'Ext.ux.ComponentEvent',
        'Ext.ux.RepairComponentEvent',
        'Ext.ux.PurchaseComponentEvent',
        'Ext.ux.StockTransferComponentEvent',
        'Ext.ux.ServiceComponentEvent',
        'YBase.utility.BulkUpdateHelper',
        'YBase.utility.ComboGridHelper',
        'YBase.utility.CommonFunctions',
        'YBase.utility.CsvHelper',
        'YBase.utility.DatagridTemplateHelper',
        'YBase.utility.GridHelper',
        'YBase.utility.Router',
        'YBase.utility.SearchHelper',
        'YBase.utility.TabLoader',
        'YBase.utility.UxHelper',
        'YBase.utility.SettingsTabLoader',
        'YBase.utility.EntryPanelHelper',
        'YBase.utility.PurchaseEntryPanelHelper',
        'YBase.utility.StockTransferEntryPanelHelper',
        'YBase.utility.RepairEntryPanelHelper',
        'YBase.utility.ServiceEntryPanelHelper',
        'YBase.utility.DataMapperHelper',
        'YBase.utility.ButtonHelper',
        'YBase.utility.FileHelper',
        'Ext.ux.form.NumericField',
        'Ext.grid.plugin.RowEditing',
        'overrides.grid.plugin.RowEditing',
        'overrides.grid.plugin.CellEditing',
        'overrides.data.Model',
        'overrides.data.AbstractStore',
        'overrides.data.Store',
        'overrides.grid.header.Container',
        'overrides.tree.Panel',
        'overrides.window.Window',
        'overrides.grid.GridHeaderFilters',
        'overrides.tab.Tab',
        'overrides.tab.Bar',
        'overrides.panel.Tool',
        'overrides.view.BoundList',
        'overrides.form.field.ComboBox',
        'overrides.view.Table',
        'Ext.form.action.StandardSubmit',
        'Ext.ux.grid.GridHeaderFilters',
        // 'Ext.ux.upload.Button',
        'YBase.model.ComboItemModel',
        'Ext.ux.upload.plugin.Window',
        // 'overrides.pagingtoolbar.PagingToolbar'
        'YBase.utility.PrintHelper',
        'YBase.utility.ScreenHelper',
        'Ext.ux.grid.Printer',
        'YBase.utility.MsgCmpHelper'
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

		var cmp = Ext.create('YBase.view.MainPanel', {
			renderTo: Ext.getBody()
		});
		cmp.show();
	}	
});
