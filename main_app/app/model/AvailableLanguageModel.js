Ext.define('YBase.model.AvailableLanguageModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'ID'
        },
        {
            name: 'name'
        }
    ]
});