/*
 * File: app/model/DatagridTemplatePanelModel.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
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

Ext.define('YBase.model.DatagridTemplatePanelModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'table_field_id'
        },
        {
            name: 'display_order'
        },
        {
            name: 'user_id'
        },
        {
            name: 'field_label'
        },
        {
            name: 'hidden'
        },
        {
            name: 'system_field_flg'
        },
        {
            name: 'locked'
        }
    ]
});