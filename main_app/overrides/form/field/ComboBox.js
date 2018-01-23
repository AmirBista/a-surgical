
Ext.define('overrides.form.field.ComboBox', {
    override:'Ext.form.field.ComboBox',
    anyMatch:true,
    doQuery: function(queryString, forceAll, rawQuery) {
        if (this.queryMode !== 'local') {
        	return this.callParent(arguments);
        }
        this.expand();
        this.store.clearFilter(!forceAll);

        if (!forceAll) {
            this.store.filter(this.displayField, new RegExp(Ext.String.escapeRegex(queryString), 'i'));
        }
    }    
});
