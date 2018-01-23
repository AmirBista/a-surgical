Ext.define('YBase.store.AvailableLanguageStore', {
    extend: 'Ext.data.Store',

    requires: [
        'YBase.model.AvailableLanguageModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            model: 'YBase.model.AvailableLanguageModel',
            storeId: 'AvailableLanguageStore',
            proxy: {
                type: 'ajax',
                url: 'bizlayer/App/getAvailableLanguage',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});