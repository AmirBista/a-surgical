Ext.define('YBase.utility.EntryPanelHelper',{
    extend : 'YBase.utility.EntryPanelBaseHelper',
    singleton: true,
    renderScreenComponents: function(controller) {
        var me = this,
            absCmp = controller.absCmp;
        // me.localStorageItemName = absCmp.is_bill_order == 1 ? 'entryPanelFormComponents' : 'entryPanelFormComponents';
        me.localStorageItemName = 'entryPanelFormComponents';
        me.callParent(arguments);
    },
    renderEntryDetailGrid : function(gridParamObj) {
        var controller = gridParamObj['controller'],
            absCmp = controller.absCmp;

    	gridParamObj['gridHeight'] = 192;
        gridParamObj['actionColWidth'] = absCmp.is_bill_order == 0 ? 115 : 60;
    	return this.callParent(arguments);
    },

     renderOtherDetailGrid : function(gridParamObj) {
        gridParamObj['hidden'] = false;
        gridParamObj['actionColWidth'] = 60;
        gridParamObj['actionRenderer'] = this.actionViewRenderer;
        gridParamObj['gridHeight'] = 250;
        
        
        return this.callParent(arguments);
    },

    
});