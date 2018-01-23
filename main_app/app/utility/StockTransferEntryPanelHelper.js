Ext.define('YBase.utility.StockTransferEntryPanelHelper',{
    extend : 'YBase.utility.EntryPanelBaseHelper',
    singleton: true,
    renderScreenComponents: function(controller) {
        var me = this,
            absCmp = controller.absCmp;
        me.localStorageItemName = 'transferEntryPanelFormComponents';
        me.callParent(arguments);
    },
    renderEntryDetailGrid : function(gridParamObj) {
        var controller = gridParamObj['controller'],
            absCmp = controller.absCmp;
    	gridParamObj['gridHeight'] = 205;
        gridParamObj['actionColWidth'] = absCmp.is_bill_order == 0 ? 115 : 60;
    	return this.callParent(arguments);
    },
});