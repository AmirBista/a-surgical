Ext.define('overrides.data.Store', {
    override: 'Ext.data.Store',
    loadRawData  : function(data, append) {
    	this.callParent(arguments);
    	this.fireEvent('load',this, this.getRange(), true);
    },
    commitChanges: function() {
		var me = this,
            recs = me.getModifiedRecords(),
            len = recs.length,
            i = 0;

        for (; i < len; i++){
        	if(!Ext.isEmpty(recs[i].get('id')))
            	recs[i].commit();
        }
        me.removed.length = 0;
    },
    /**
     * @override
     * The fix is to rearrange store.data so that it has the same order as the records in groups.
     * Multiple methods are using the order of store.data for finding the record.
     */
    // group: function () {
    //     var store = this,
    //         groups;


    //     grid.getSelectionModel().deselectAll();


    //     store.callOverridden(arguments);


    //     groups = store.getGroups();


    //     store.data.clear();


    //     Ext.Array.each(groups, function (group) {
    //         Ext.Array.each(group.children, function (child) {
    //             store.data.add(child.internalId, child);
    //         });
    //     });


    //     // update the view index after the store data is sorted by groups
    //     grid.getView().updateIndexes();
    // }

});
