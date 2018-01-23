Ext.define('YBase.utility.SkuCmpHelper',
{
    statics:{
        skuCmpPanel:null,
        commentRefTableId:null,
        panelId:null,
        setEntryCode:null,
        gridEventHandleForSkuCmpPanel:function(grid) {
            if (grid) {
                var me = this,
                    skuCmpPanel = YBase.utility.SkuCmpHelper.SkuCmpPanel,
                    skuCmpCntrl = YBase.app.getController('SkuCmpController');
                grid.on('selectionchange',skuCmpCntrl.gridSelectionChange,skuCmpPanel);
            }
        },        
        setActiveTabStore:function(activeTab,grid,oldTab){
            var skuCmpPanel=YBase.utility.SkuCmpHelper.SkuCmpPanel,
                skuCmpCntrl = YBase.app.getController('SkuCmpController');
            if(activeTab.showSkuCmp == true) {
                // skuCmpCntrl.panelTitleChanged=false;
                this.setCommentRefTableId(activeTab,skuCmpPanel);
                skuCmpPanel.panelId = activeTab.PanelNo;
                skuCmpCntrl.panelId = activeTab.PanelNo;
                // this.loadSkuComponents(grid,skuCmpCntrl,skuCmpPanel);
                skuCmpPanel.setVisible(true);
                Ext.ComponentQuery.query('splitter[itemId=bodySkuSplit]')[0].setVisible(true);
            }
            else {
                skuCmpPanel.panelId=null;
                skuCmpPanel.setVisible(false);
                Ext.ComponentQuery.query('splitter[itemId=bodySkuSplit]')[0].setVisible(false);
            }
        },
        /*refrence table id for comment*/
        setCommentRefTableId: function(activeTab,skuCmpPanel) {
            var lang = Ext.LANG;
            if(activeTab.PanelNo == 3) {
                skuCmpPanel.commentRefTableId = lang.OrderMaster.commentRefTableId;
            }
            else if(activeTab.PanelNo == 15) {
                skuCmpPanel.commentRefTableId = lang.orderStatus.commentRefTableId;
            }
            else {
                skuCmpPanel.commentRefTableId = null;
            }
        },
        resetSkuPanel: function(skuCmpPanel) {
            var gridArray = skuCmpPanel.query('grid'),
                commentView = skuCmpPanel.query('dataview[itemId=mainRecentCommentDataView]')[0],
                skuCmpCntrl = YBase.app.getController('SkuCmpController');
            skuCmpCntrl.currentRecord=null;
            skuCmpCntrl.order_master_id=null;
            skuCmpPanel.commentRefTableId=null;
            skuCmpPanel.setEntryCode=null;
            if(!Ext.isEmpty(gridArray)) {
                for(var i=0;i<gridArray.length;i++) {
                    var gridStore = gridArray[i].getStore();
                    gridStore.loadData([]);
                }
            }
            if(!Ext.isEmpty(commentView)) {
                var commentStore = commentView.getStore();
                    commentStore.loadData([]);
            }
            skuCmpPanel.collapse();
        },   
        setRecord: function(skuCmpCntrl,selectedRecord) {
            if(!Ext.isEmpty(skuCmpCntrl.currentRecord)) {
                skuCmpCntrl.previousRecord = skuCmpCntrl.currentRecord;
                skuCmpCntrl.currentRecord = selectedRecord;
            }
            else {
                skuCmpCntrl.currentRecord = selectedRecord;
            }
        },
        
        // updateSkuCmpChangeLog: function(ctrl,win){
        //     var entryCtrl = ctrl.getController('OrderMasterEntryController'),
        //         orderMasterEntryPanel = entryCtrl.abstractcomponent,
        //         order_master_id = win.params.order_master_id,
        //         sku_component_id = win.params.sku_component_id,
        //         skuCmp = orderMasterEntryPanel.query('skucmp[hidden=false]'),
        //         skuCmpChangeLog = orderMasterEntryPanel.skuCmpChangeLog;
        //     for(var i=0;i<skuCmp.length;i++){
        //         var cmp = skuCmp[i].skuComponents;
        //         if(cmp.order_master_id == order_master_id && cmp.sku_component_id == sku_component_id){
        //             if(skuCmpChangeLog.indexOf(cmp.component_no) == -1){
        //                 skuCmpChangeLog.push(cmp.component_no);
        //             }
        //             break;
        //         }
        //     }
        // },
        // removeSkuCmpChangeLog : function(skuCmpChangeLog,component_no){
        //     var idx = skuCmpChangeLog.indexOf(component_no);
        //     if(idx > -1){
        //         // delete skuCmpChangeLog[idx];
        //         skuCmpChangeLog.splice(idx,1);
        //     }
        // }

        
        /*since gird is loaded on tab change so no need of this function*/
        // loadSkuComponents: function(grid,skuCmpCntrl,skuCmpPanel) {
        //     /*grid is empty when tab is opened for 1st time for any panel*/
        //     if(!Ext.isEmpty(grid)) {
        //         var selectedRecord = grid.getSelectionModel().getSelection()[0];
        //         if(skuCmpCntrl.skuCmpPanelExpand) {
        //             if(!Ext.isEmpty(selectedRecord)) {
        //                 var orderMasterId = selectedRecord.raw.order_master_id;
        //                 this.setRecord(skuCmpCntrl,selectedRecord);
        //                 skuCmpCntrl.loadSkuCmpPanel(skuCmpPanel,selectedRecord);
        //             }
        //             else {
        //                 this.resetSkuPanel(skuCmpPanel);
        //                 return;
        //             }
        //         }
        //         else {
        //             if(!Ext.isEmpty(selectedRecord)) {
        //                 skuCmpCntrl.currentRecord = selectedRecord;
        //                 if(skuCmpCntrl.currentOrderType != skuCmpCntrl.previousOrderType) {
        //                     skuCmpCntrl.changeTitle(skuCmpPanel,selectedRecord);
        //                 }
        //             }
        //             else {
        //                 skuCmpCntrl.changeTitle(skuCmpPanel,null);
        //             }
        //         }
        //     }
        // },    
    }
});
