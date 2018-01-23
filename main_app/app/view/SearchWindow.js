Ext.define('YBase.view.SearchWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.searchWindow',

    // height: 150,
    minHeight: 140,
    itemId: 'SearchWindow',
    width: 400,
    resizable: false,
    layout: {
        align: 'stretch',
        type: 'vbox'
    },
    title: 'New Search ',
    modal: true,

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'form',
                    itemId: 'SearchForm',
                    // margin: 5,
                    layout: {
                        align: 'stretch',
                        type: 'vbox'
                    },
                    // bodyPadding: 10,
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'SearchName',
                            fieldLabel: 'Search',
                            name: 'search_name',
                            stripCharsRe: /(^\s+|\s+$)/g,
                            maxLength:20,
                            margin: '5 5 0 0',
                            allowOnlyWhitespace:false
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            margin: '5 5 0 5',
                            layout: {
                                align: 'middle',
                                pack: 'end',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'Public',
                                    hidden: true,
                                    labelPad: 10,
                                    margin:'0 5 0 0',
                                    name: 'is_public',
                                    boxLabel: 'Public',
                                    inputValue: '1'
                                },
                                {
                                    xtype: 'checkboxfield',
                                    itemId: 'chkBoxShowTemplate',
                                    hidden: false,
                                    labelPad: 10,
                                    margin:'0 0 0 0',
                                    name: 'show_template',
                                    boxLabel: 'showTemplate',
                                    inputValue: '1'
                                }
                            ]
                        },
                        {
                            xtype: 'container',
                            flex: 1,
                            height: 40,
                            layout: {
                                align: 'middle',
                                pack: 'center',
                                type: 'hbox'
                            },
                            items: [
                                {
                                    xtype: 'button',
                                    margins: '0 5 0 0',
                                    id: 'btnSearchSave',
                                    itemId: 'btnSearchSave',
                                    // iconCls: 'yig-ok-b',
                                    text: 'Save'
                                },
                                {
                                    xtype: 'button',
                                    margins: '0 0 0 5',
                                    id: 'btnSearchCancel',
                                    itemId: 'btnSearchCancel',
                                    // iconCls: 'yig-delete-b',
                                    text: 'Cancel'
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