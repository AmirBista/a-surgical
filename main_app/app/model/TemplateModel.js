Ext.define('YBase.model.TemplateModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'search_id'
        },
        {
            name: 'search_name'
        },
        {
            name: 'system_flg'
        },
        {
            name: 'search_criteria'
        }
    ]
});