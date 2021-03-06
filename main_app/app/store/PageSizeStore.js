/*
 * File: app/store/VoiceTypeStore.js
 *
 * This file was generated by Sencha Architect version 3.0.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.2.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.2.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('YBase.store.PageSizeStore', {
    extend: 'Ext.data.Store',

    requires: [
        'Ext.data.Field'
    ],

    constructor: function(cfg) {
        var me = this;
        cfg = cfg || {};
        me.callParent([Ext.apply({
            autoLoad: true,
            storeId: 'PageSizeStore',
            data: [
                {
                    page: '10'
                },
                {
                    page: '20'
                },
                {
                    page: '50'
                },
                {
                    page: '100'
                },
                {
                    page: '200'
                },
                {
                    page: '300'
                },
                {
                    page: '400'
                },
                {
                    page: '500'
                }
            ],
            fields: [
                {
                    name: 'page'
                }
            ]
        }, cfg)]);
    }
});