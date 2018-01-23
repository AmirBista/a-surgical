Ext.define('YBase.controller.MsgCmpController', {
    extend: 'Ext.app.Controller',
    id: 'MsgCmpController',
    refs:[
        {
            ref: 'mainPanel',
            selector: 'mainPanel'
        }
    ],
    msgCmpPanelExpand:false,
    currentRecord:null,
    msgTabCntrl:null,
    collapsedSelectionchange:false,
    expandIsFirstTime:null,//since dataview would not have been render on first expand so need to avoid loadComment
    languageImplementation: function(absCmp){
        var me                  = this,
            lang                = Ext.LANG,
            messageLang         = lang.messagePanel;

        absCmp.setTitle(messageLang.panelTitle);
    },
    onMsgCmpPanelBeforeRender: function(absCmp, eOpts) {
        var me = this;
        me.msgTabCntrl = YBase.app.getController('MsgTabController');
    },
    onMsgCmpPanelBeforeCollapse: function(absCmp, direction, animate, eOpts) {
        var me= this;
        me.msgCmpPanelExpand=false;
    },
    onMsgCmpPanelBeforeExpand: function(absCmp, animate, eOpts) {
        var me              = this,
            msgTabCnt       = absCmp.query('container[itemId=MsgTabCnt]')[0],
            selectedRecord  = me.currentRecord;
        me.msgCmpPanelExpand= true;
        absCmp.getHeader().hide();
        if(Ext.isEmpty(me.expandIsFirstTime)) {
            me.expandIsFirstTime = true;
        }else {
            me.expandIsFirstTime = false;
        }
        if(Ext.isEmpty(selectedRecord)) {
            YBase.utility.MsgCmpHelper.resetMsgPanel(absCmp);
            return false;
        }
        if(me.collapsedSelectionchange) {
            me.collapsedSelectionchange = false;
            if(!Ext.isEmpty(me.expandIsFirstTime) && !me.expandIsFirstTime) {
                me.msgTabCntrl.loadComment(msgTabCnt);
            }
        }
        // me.msgTabCntrl.loadComment(msgTabCnt);
    },
    onMsgCmpPanelAfterRender:function(abstractcomponent, options) {
        var me = this,
            afterCollapsedEl = abstractcomponent.getEl();
        me.languageImplementation(abstractcomponent)
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget(".sku-cmp-panel") && !e.getTarget(".no-collapse")) {
               abstractcomponent.collapse();
            }
            if (e.getTarget(".collapsed_cls")) {
               abstractcomponent.expand();
            } 
            /*if (e.getTarget('x-tab-newTab-open-btn')) {
                me.showCommentPopupWin();
            }*/
        });
    },
    gridSelectionChange: function(grid, selected, eOpts) {
        var me              = YBase.app.getController('MsgCmpController'),
            msgCmpPanel     = this,
            msgTabCnt       = msgCmpPanel.query('container[itemId=MsgTabCnt]')[0],
            parentPanel     = msgCmpPanel.parentPanel,
            parentCntrl     = parentPanel.cntrl,
            lang            = Ext.LANG,
            msgCmpPanelLang = lang.msgCmpPanel,
            globalRecObj    = {},
            msgTabCntrl     = YBase.app.getController('MsgTabController');
        if(Ext.isEmpty(selected)) {
            me.currentRecord = null;
            msgTabCnt = me.setMsgTabGlobalRec(msgTabCnt);
            me.reRouteMsgTabPopupWin(msgTabCntrl,parentCntrl);
            if(me.msgCmpPanelExpand) {
                msgCmpPanel.collapse();
                // me.msgTabCntrl.loadComment(msgTabCnt);
            }
            YBase.utility.MsgCmpHelper.resetMsgPanel(msgCmpPanel);
        }else {
            me.currentRecord = grid.lastSelected;
            if('mapObj' in grid.view.up('grid')) {
                var obj = grid.view.up('grid').mapObj;
                for(var key in obj) {
                    var objKey = obj[key];
                    me.currentRecord.data[key] =  me.currentRecord.data[objKey];
                }
                me.currentRecord.data['id'] = null;
                me.currentRecord.data['column_1_01'] = null;
            }
            msgTabCnt = me.setMsgTabGlobalRec(msgTabCnt);
            me.reRouteMsgTabPopupWin(msgTabCntrl,parentCntrl);

            if(me.msgCmpPanelExpand) {
                me.msgTabCntrl.loadComment(msgTabCnt);
            } else {
                me.collapsedSelectionchange=true
            }
        }
    },
    reRouteMsgTabPopupWin: function(msgTabCntrl,parentCntrl) {
        if(!Ext.isEmpty(parentCntrl.msgTabWin) && !parentCntrl.msgTabWin.closed) {
            var route = msgTabCntrl.generateUrl(true);
            parentCntrl.msgTabWin.YBase.app.getController('MsgTabWinController').reRoute(route);
        }
    },
    setMsgTabGlobalRec: function(msgTabCnt) {
        var me = this,
            globalRecObj= {};
        globalRecObj['order_no']        = Ext.isEmpty(me.currentRecord) ? null:me.currentRecord.get('column_1_01');
        globalRecObj['order_master_id'] = Ext.isEmpty(me.currentRecord) ? null:me.currentRecord.get('id');
        globalRecObj['customer_code']   = Ext.isEmpty(me.currentRecord) ? null:me.currentRecord.get('column_1_15');
        msgTabCnt['selectedRawData']    = globalRecObj;

        me.msgTabCntrl.setGlobalRecords(msgTabCnt);
        return msgTabCnt;
    },
    init: function(application) {
        var me=this;
        me.control({
            "mainPanel panel[itemId=msgCmpPanel]": {
                beforerender: me.onMsgCmpPanelBeforeRender,
                beforecollapse: me.onMsgCmpPanelBeforeCollapse,
                beforeexpand: me.onMsgCmpPanelBeforeExpand,
                afterrender: me.onMsgCmpPanelAfterRender
            }
        });
    }

});
