Ext.define('overrides.data.Model', {
    override: 'Ext.data.Model',
    forceSubmitFields:[],
    getChanges : function(){
    	var changes = this.callParent(arguments),
    		forceSubmitFields = this.forceSubmitFields || [],
    		i, len = forceSubmitFields.length;
    		for (i = 0; i < len; i++) {
		        if (!changes.hasOwnProperty(forceSubmitFields[i])){
		        	changes[forceSubmitFields[i]] = this.get(forceSubmitFields[i]);
				}    	
    		}
        return changes;
    },
});
