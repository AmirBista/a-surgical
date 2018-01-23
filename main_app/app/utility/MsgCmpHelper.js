Ext.define('YBase.utility.MsgCmpHelper',
{
    statics:{
        msgCmpPanel:null,
        commentRefTableId:null,
        panelId:null,
        /*YBase.utility.MsgCmpHelper.MsgCmpPanel is set in MainController*/
        gridEventHandleForMsgCmpPanel:function(grid) {
            if (grid) {
                var me = this,
                    msgCmpPanel = YBase.utility.MsgCmpHelper.MsgCmpPanel,
                    msgCmpCntrl = YBase.app.getController('MsgCmpController');
                    msgCmpPanel['parentPanel'] = grid.up('panel');
                grid.on('selectionchange',msgCmpCntrl.gridSelectionChange,msgCmpPanel);
            }
        },        
        setActiveTabStore:function(activeTab,grid,oldTab){
            var msgCmpPanel = YBase.utility.MsgCmpHelper.MsgCmpPanel,
                msgCmpCntrl = YBase.app.getController('MsgCmpController');
            if(activeTab.showMsgCmp == true) {
                // msgCmpCntrl.panelTitleChanged=false;
                this.setCommentRefTableId(activeTab,msgCmpPanel);
                msgCmpPanel.panelId = activeTab.PanelNo;
                msgCmpCntrl.panelId = activeTab.PanelNo;
                // this.loadSkuComponents(grid,msgCmpCntrl,msgCmpPanel);
                msgCmpPanel.setVisible(true);
                Ext.ComponentQuery.query('splitter[itemId=bodySkuSplit]')[0].setVisible(true);
            }
            else {
                msgCmpPanel.panelId=null;
                msgCmpPanel.setVisible(false);
                Ext.ComponentQuery.query('splitter[itemId=bodySkuSplit]')[0].setVisible(false);
            }
        },
        /*refrence table id for comment*/
        setCommentRefTableId: function(activeTab,msgCmpPanel) {
            var lang = Ext.LANG;
            if(activeTab.itemId == "Order") {
                msgCmpPanel.commentRefTableId = 1;
            } else if(activeTab.PanelNo == 3) {
                msgCmpPanel.commentRefTableId = lang.OrderMaster.commentRefTableId;
            } else if(activeTab.PanelNo == 15) {
                msgCmpPanel.commentRefTableId = lang.orderStatus.commentRefTableId;
            } else {
                msgCmpPanel.commentRefTableId = null;
            }
        },
        resetMsgPanel: function(msgCmpPanel) {
            var msgTabCnt = msgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
            delete msgTabCnt['selectedRawData'];
        }
    }
});
