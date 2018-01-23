/*
 * File: app/view/Dashboard.js
 *
 * This file was generated by Sencha Architect version 3.0.2.
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

Ext.define('YBase.view.Dashboard', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.Dashboard',

    requires: [
        'Ext.form.Label',
        'Ext.grid.Panel',
        'Ext.grid.View',
        'Ext.grid.column.Column',
        'Ext.button.Button',
        'Ext.XTemplate'
    ],

    id: 'Dashboard',
    itemId: 'Dashboard',
    margin: '5 0 5 0',

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
                    border: 1,
                    id: 'leftContainer',
                    itemId: 'leftContainer',
                    margin: '0 10 0 0',
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            flex: 1,
                            overflowY: 'auto',
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    id: 'noticeFieldSet',
                                    itemId: 'noticePanel',
                                    margin: '0 0 0 0',
                                    minHeight: 200,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            componentCls: 'conainer-box',
                                            height: 40,
                                            padding: '13 5 0 5',
                                            items: [
                                                {
                                                    xtype: 'label',
                                                    itemId: 'noticeLabel',
                                                    margin: '5 0 0 0',
                                                    text: 'My Label'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            componentCls: 'gridcontainer',
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    componentCls: 'gridcontainer',
                                                    itemId: 'NoticeGrid',
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    store: 'NoticeStore',
                                                    viewConfig: {
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            var cls=record.get('is_draft')==1 ? 'draftCls' : '';
                                                            if (!Ext.isEmpty(record.get('is_read')) && record.get('is_read') == 1)
                                                            cls=cls +" read-row";
                                                            else
                                                            cls=cls +" unread-row";
                                                            return cls;
                                                        },
                                                        markDirty: false
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            id: 'notice_date',
                                                            itemId: 'notice_date',
                                                            sortable: false,
                                                            dataIndex: 'posted_date',
                                                            menuDisabled: true,
                                                            text: 'Date'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            id: 'notices',
                                                            itemId: 'notices',
                                                            sortable: false,
                                                            dataIndex: 'subject',
                                                            menuDisabled: true,
                                                            text: 'Notices',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'container',
                                    flex: 1,
                                    componentCls: 'newinformation',
                                    id: 'incidenceFieldSet',
                                    itemId: 'incidencePanel',
                                    minHeight: 200,
                                    layout: {
                                        type: 'vbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'container',
                                            componentCls: 'conainer-box',
                                            height: 40,
                                            width: 100,
                                            layout: {
                                                type: 'hbox',
                                                pack: 'end',
                                                padding: 5
                                            },
                                            items: [
                                                {
                                                    xtype: 'container',
                                                    flex: 1,
                                                    margin: '6 0 0 0',
                                                    items: [
                                                        {
                                                            xtype: 'label',
                                                            itemId: 'incidentLabel',
                                                            text: 'My Label'
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btnConfirmed',
                                                    itemId: 'btnConfirmed',
                                                    margin: '0 5 0 0',
                                                    ui: 'gridbuttonui',
                                                    iconCls: 'icons-confirm',
                                                    text: 'Confirmed'
                                                },
                                                {
                                                    xtype: 'button',
                                                    id: 'btnInciList',
                                                    itemId: 'btnInciList',
                                                    margin: '0 5 0 0',
                                                    ui: 'gridbuttonui',
                                                    iconCls: 'icons-list',
                                                    text: 'List View'
                                                },
                                                {
                                                    xtype: 'button',
                                                    itemId: 'btnInciNew',
                                                    ui: 'addredui',
                                                    iconCls: 'icons-add',
                                                    text: 'New Reg'
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            flex: 1,
                                            componentCls: 'gridcontainer',
                                            padding: 5,
                                            layout: {
                                                type: 'vbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'gridpanel',
                                                    flex: 1,
                                                    itemId: 'meetingGridPanel',
                                                    autoScroll: true,
                                                    header: false,
                                                    title: 'My Grid Panel',
                                                    store: 'MeetingMgmtStore',
                                                    viewConfig: {
                                                        getRowClass: function(record, rowIndex, rowParams, store) {
                                                            var cls=record.get('is_draft')==1 ? 'draftCls' : '';
                                                            if (!Ext.isEmpty(record.get('is_read')) && record.get('is_read') == 1)
                                                            cls=cls +" read-row";
                                                            else
                                                            cls=cls +" unread-row";
                                                            return cls;

                                                        },
                                                        markDirty: false
                                                    },
                                                    columns: [
                                                        {
                                                            xtype: 'gridcolumn',
                                                            id: 'pi_registered',
                                                            itemId: 'pi_registered',
                                                            sortable: false,
                                                            dataIndex: 'posted_date',
                                                            menuDisabled: true,
                                                            text: 'Registered'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            id: 'pi_created',
                                                            itemId: 'pi_created',
                                                            minWidth: 115,
                                                            sortable: false,
                                                            dataIndex: 'created_datetime',
                                                            menuDisabled: true,
                                                            text: 'Created'
                                                        },
                                                        {
                                                            xtype: 'gridcolumn',
                                                            id: 'pi_subject',
                                                            itemId: 'pi_subject',
                                                            sortable: false,
                                                            dataIndex: 'subject',
                                                            menuDisabled: true,
                                                            text: 'Subject',
                                                            flex: 1
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                },
                {
                    xtype: 'container',
                    flex: 1,
                    componentCls: 'dashboardRight',
                    itemId: 'dataViewContainer',
                    margin: '0 0 0 0',
                    autoScroll: true,
                    items: [
                        {
                            xtype: 'dataview',
                            autoRender: true,
                            itemId: 'newsView',
                            tpl: [
                                '\'\''
                            ],
                            itemSelector: 'div.event-detail'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});