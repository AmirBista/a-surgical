Ext.define('YBase.controller.MsgTabWinController', {
    extend: 'Ext.app.Controller',
    id: 'MsgTabWinController',
    refs:[
        {
            ref: 'msgTabCnt',
            selector: 'msgTabCnt'
        }
    ],
    commentPanelExpand:false,
    activeTabWinObj:{},
    inactiveTabWinArr:[],
    dblRec:false,
    unioinRec:false,
    customer_table_id:3,
    order_table_id:1,
    globalObj: {},
    orderDataObj: {},
    horensoDataObj: {},
    currentView:null,
    reRoute: function(route,tabchangeFlg) {
        var me = this;
        Ext.Router.redirect(route);
    },
    updateCodeCmp: function(order_code,customer_code) {
        var me = this, 
            msgLang = Ext.LANG.messagePanel,
            codeCmp = Ext.ComponentQuery.query('component[itemId=codeCmp]')[0]
            html = '<span class="order-code"><p><label>'+msgLang.orderCode+':</label>'+order_code+'</p></span><span class="company-code"><p><label>'+msgLang.customerCode+':</label>'+customer_code+'</p></span>';
        codeCmp.update(html);
    },
    updateEntryPanel: function() {
        var me = this,
            msgTabCnt = me.currentView,
            msgTabPanel = msgTabCnt.query('tabpanel[itemId=msgTabPanel]')[0],
            activeTab = msgTabPanel.getActiveTab(),
            parentPanel = window.opener.parentPanel;
        if(!Ext.isEmpty(parentPanel) && activeTab.itemId == 'commentTab') {
            var dataviewStore = activeTab.query('dataview')[0].getStore(),
                rec = dataviewStore.data.items,
                lastCommentObj = null,commentCount=0;
            if(!Ext.isEmpty(rec)) {
                var lastRec = dataviewStore.last(),
                    lastCommentObj = lastRec.data,
                    commentCount = dataviewStore.count();
            }
            YBase.app.getController('EntryPanelController').updateCommentCmp(parentPanel,lastCommentObj,commentCount);
        }
    },   
    init: function(application) {
        var me = this;
        me.callParent(arguments);
    }
});