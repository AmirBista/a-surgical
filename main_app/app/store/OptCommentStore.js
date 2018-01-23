Ext.define('YBase.store.OptCommentStore', {
    extend: 'Ext.data.Store',
    requires: [
        'Ext.data.Field'
    ],
    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            storeId: 'OptCommentStore',
            proxy: {
                type: 'ajax',
                url: 'bizlayer/msgTab/getFldOptData',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            fields: [
                {
                    name: 'code'
                }
            ]
        }, cfg)]);
    }
});