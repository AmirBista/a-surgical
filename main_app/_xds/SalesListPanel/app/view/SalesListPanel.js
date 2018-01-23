/*
 * File: app/view/SalesListPanel.js
 *
 * This file was generated by Sencha Architect version 3.1.0.
 * http://www.sencha.com/products/architect/
 *
 * This file requires use of the Ext JS 4.1.x library, under independent license.
 * License of Sencha Architect does not include license for Ext JS 4.1.x. For more
 * details see http://www.sencha.com/license or contact license@sencha.com.
 *
 * This file will be auto-generated each and everytime you save your project.
 *
 * Do NOT hand edit this file.
 */

Ext.define('YBase.view.SalesListPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.salesListPanel',

    requires: [
        'Ext.button.Button',
        'Ext.menu.Menu',
        'Ext.menu.Item',
        'Ext.resizer.Splitter'
    ],

    itemId: 'SalesListPanel',
    ui: 'addredui',
    iconCls: 'yig-order-s-w',
    title: 'Order',

    layout: {
        type: 'hbox',
        align: 'stretch'
    },

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    flex: 1,
                    itemId: 'mainCnt',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            componentCls: 'middle-menu',
                            height: 40,
                            id: '',
                            itemId: 'topMainCnt',
                            layout: {
                                type: 'hbox',
                                align: 'middle'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'topHelpCnt',
                                    width: 125,
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            itemId: 'topMdlCnt',
                                            layout: {
                                                type: 'hbox',
                                                align: 'middle'
                                            }
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    itemId: 'topBtnCnt',
                                    layout: {
                                        type: 'hbox',
                                        align: 'middle',
                                        pack: 'end'
                                    },
                                    items: [
                                        {
                                            xtype: 'button',
                                            shortcutKey: 'N',
                                            itemId: 'btnNewEntry',
                                            margin: '0 2 0 0',
                                            ui: 'newbtn-ui-small',
                                            iconCls: 'yig-add-s-w',
                                            text: 'New Entry'
                                        },
                                        {
                                            xtype: 'button',
                                            shortcutKey: 'N',
                                            itemId: 'btnEditPopupEntry',
                                            margin: '0 2 0 0',
                                            ui: 'semi-action-small',
                                            iconCls: 'yig-popup-win-cls ',
                                            text: 'Edit Popup Entry'
                                        },
                                        {
                                            xtype: 'button',
                                            shortcutKey: 'N',
                                            itemId: 'btnAdd',
                                            margin: '0 2 0 0',
                                            ui: 'newbtn-ui-small',
                                            iconCls: 'yig-add-s-w',
                                            text: 'Add'
                                        },
                                        {
                                            xtype: 'button',
                                            shortcutKey: 'S',
                                            hidden: true,
                                            itemId: 'btnSave',
                                            margin: '0 2 0 0',
                                            ui: 'savebtn-ui-small',
                                            iconCls: 'yig-save-s-w',
                                            text: 'Save'
                                        },
                                        {
                                            xtype: 'button',
                                            shortcutKey: 'D',
                                            itemId: 'btnDelete',
                                            margin: '0 2 0 0',
                                            ui: 'delbtn-ui-small',
                                            iconCls: 'yig-cancel-s-w',
                                            text: 'Delete'
                                        },
                                        {
                                            xtype: 'button',
                                            itemId: 'btnCsvDwnld',
                                            margin: '0 2 0 0',
                                            ui: 'semi-action-small',
                                            iconCls: 'yig-download-s-w',
                                            text: 'Csv Dwnld',
                                            menu: {
                                                xtype: 'menu',
                                                itemId: 'mnuCsv',
                                                items: [
                                                    {
                                                        xtype: 'menuitem',
                                                        itemId: 'menuSelectedCsv',
                                                        iconCls: 'yig-selected-s-b',
                                                        text: 'Selected Csv'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        itemId: 'menuAllCsv',
                                                        iconCls: 'yig-selectall-s-b',
                                                        text: 'All Csv'
                                                    }
                                                ]
                                            }
                                        },
                                        {
                                            xtype: 'button',
                                            hidden: true,
                                            itemId: 'btnPrint',
                                            margin: '0 2 0 0',
                                            ui: 'semi-action-small',
                                            iconCls: 'yig-print-ico',
                                            text: 'Print',
                                            menu: {
                                                xtype: 'menu',
                                                itemId: 'menuPrint',
                                                items: [
                                                    {
                                                        xtype: 'menuitem',
                                                        itemId: 'monthlySalesPrintMenu',
                                                        iconCls: 'yig-selected-print-s-b',
                                                        text: 'monthlySales'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        hidden: true,
                                                        itemId: 'menuSelectedTemp92Print',
                                                        iconCls: 'yig-selectall-print-s-b',
                                                        text: 'Temp92'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        hidden: true,
                                                        itemId: 'menuSelectedTemp93Print',
                                                        iconCls: 'yig-selectall-print-s-b',
                                                        text: 'Temp92'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        hidden: true,
                                                        itemId: 'menuSelectedDataPrint',
                                                        iconCls: 'yig-selectall-print-s-b',
                                                        text: 'DataPrint'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        hidden: true,
                                                        itemId: 'menuSelectedTemp95Print',
                                                        iconCls: 'yig-selectall-print-s-b',
                                                        text: 'DataPrint'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        itemId: 'orderContractPrintMenu',
                                                        iconCls: 'yig-selected-print-s-b',
                                                        text: 'Order Contract'
                                                    },
                                                    {
                                                        xtype: 'menuitem',
                                                        itemId: 'menuItemServiceInvoice',
                                                        iconCls: 'yig-selected-print-s-b',
                                                        text: 'Service Invoice'
                                                    }
                                                ]
                                            }
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            itemId: 'bodyCnt',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'orderGridCnt',
                                    margin: '0 5 0 5',
                                    layout: 'fit'
                                },
                                {
                                    xtype: 'splitter'
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    itemId: 'gridOrderDetailCnt',
                                    layout: 'fit'
                                }
                            ]
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});