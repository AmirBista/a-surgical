/*
 * File: app/view/FieldOptionWindow.js
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

Ext.define('YBase.view.FieldOptionWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.fieldOptionWindow',

    requires: [
        'Ext.form.field.Hidden',
        'Ext.form.field.Display',
        'Ext.toolbar.Spacer',
        'Ext.button.Button',
        'Ext.grid.Panel',
        'Ext.grid.column.Column',
        'Ext.grid.View',
        'Ext.grid.plugin.DragDrop',
        'Ext.util.Point',
        'Ext.grid.plugin.CellEditing',
        'Ext.resizer.Splitter',
        'Ext.form.field.TextArea'
    ],

    height: 500,
    itemId: 'FieldOptionWindow',
    width: 620,
    layout: 'fit',
    title: 'Field Option',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    itemId: 'mainCnt',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 50,
                            itemId: 'headerCnt',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'hiddenfield',
                                    flex: 1,
                                    itemId: 'fieldOptionIdTxtFld',
                                    fieldLabel: 'Label'
                                },
                                {
                                    xtype: 'displayfield',
                                    componentCls: 'fld-opt-name-display',
                                    itemId: 'fieldOptionNameDisplayFld',
                                    margin: '0 0 0 10',
                                    fieldLabel: ''
                                },
                                {
                                    xtype: 'tbspacer',
                                    flex: 1
                                },
                                {
                                    xtype: 'button',
                                    disabled: true,
                                    itemId: 'btnAdd',
                                    margin: '0 0 0 5',
                                    ui: 'newbtn-ui-small',
                                    iconCls: 'yig-add-s-w',
                                    text: 'Add'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnSave',
                                    margin: '0 5 0 5',
                                    ui: 'savebtn-ui-small',
                                    iconCls: 'yig-save-s-w',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    itemId: 'btnCancel',
                                    margin: '0 5 0 0',
                                    ui: 'custom-ui',
                                    iconCls: 'yig-cancel-s-w',
                                    text: 'Cancel'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'bodyCnt',
                            margin: '0 0 5 0',
                            layout: {
                                type: 'hbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'gridpanel',
                                    itemId: 'fieldOptionDataGrid',
                                    margin: '0 0 0 5',
                                    width: 240,
                                    title: '',
                                    store: 'FieldOptionDataStore',
                                    columns: [
                                        {
                                            xtype: 'gridcolumn',
                                            itemId: 'moveColSelected',
                                            width: 20,
                                            menuDisabled: true,
                                            text: ''
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            itemId: 'fieldOptionDataCol',
                                            dataIndex: 'name',
                                            menuDisabled: true,
                                            text: 'fieldOptionName',
                                            flex: 1,
                                            editor: {
                                                xtype: 'textfield',
                                                itemId: 'fieldOptionNameEditor',
                                                allowBlank: false
                                            }
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            itemId: 'displayCol',
                                            width: 60,
                                            menuDisabled: true,
                                            text: ''
                                        },
                                        {
                                            xtype: 'gridcolumn',
                                            itemId: 'removeAction',
                                            width: 40,
                                            menuDisabled: true,
                                            text: ''
                                        }
                                    ],
                                    viewConfig: {
                                        plugins: [
                                            Ext.create('Ext.grid.plugin.DragDrop', {
                                                pluginId: 'ddPlugin'
                                            })
                                        ]
                                    },
                                    plugins: [
                                        Ext.create('Ext.grid.plugin.CellEditing', {
                                            pluginId: 'plgGridListCellEditing'
                                        })
                                    ]
                                },
                                {
                                    xtype: 'splitter'
                                },
                                {
                                    xtype: 'textareafield',
                                    flex: 1,
                                    itemId: 'fieldOptionDataDesp',
                                    margin: '0 5 0 0',
                                    fieldLabel: ''
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            height: 50,
                            hidden: true,
                            itemId: 'btnCnt',
                            layout: {
                                type: 'hbox',
                                align: 'middle',
                                pack: 'center'
                            }
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});