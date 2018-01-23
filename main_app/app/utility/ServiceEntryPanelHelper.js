Ext.define('YBase.utility.ServiceEntryPanelHelper',{
    extend : 'YBase.utility.EntryPanelBaseHelper',
    singleton: true,
    renderScreenComponents: function(controller) {
        var me = this,
            absCmp = controller.absCmp;
        me.localStorageItemName = 'serviceEntryPanelFormComponents';
        me.callParent(arguments);
    },
    renderEntryDetailGrid : function(gridParamObj) {
        var controller = gridParamObj['controller'],
            absCmp = controller.absCmp;
    	gridParamObj['gridHeight'] = 192;
        gridParamObj['actionColWidth'] = 60;
    	return this.callParent(arguments);
    },
});