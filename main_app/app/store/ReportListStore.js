Ext.define('YBase.store.ReportListStore', {
    extend: 'Ext.data.Store',

    requires: [
        'YBase.model.ReportListModel',
        'Ext.data.proxy.Ajax',
        'Ext.data.reader.Json'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: false,
            model: 'YBase.model.ReportListModel',
            storeId: 'ReportListStore',
            proxy: {
                type: 'ajax',
                url: 'bizlayer/report/reportList',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            }
        }, cfg)]);
    }
});