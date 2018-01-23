Ext.define('YBase.controller.MainPopUpController', {
    extend: 'Ext.app.Controller',
    id: 'MainPopUpController',
    index: function() {
        // window.close();
    },
    showOrderFileSelection: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.OrderFileSelectionPanel', true, {'showBulkUpdate':false,params: params});
    },
    showEntryPanelView: function(params){
        var me=this;
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            me.activeBtnId="btnEntryPanel";
            me.activeMenuId="btnNewEntry";
            params['is_bill_order'] = 1;
            me.getController('EntryPanelController').loadEntryPanel(params);
            //me.setActiveBtnClass();
        });

        var entryPanelItemId = 'EntryPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    showInvoiceOrder: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.InvoiceOrder', true, {'showBulkUpdate':false,params: params});
    },
    showPaymentOrder: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.PaymentOrder', true, {'showBulkUpdate':false,params: params});
    },
    showInvoiceListOrder: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.InvoiceListPopUp', true, {'showBulkUpdate':false,params: params});
    },
    showSupplierInvoiceOrder: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierInvoiceOrderPanel', true, {'showBulkUpdate':false,params: params});
    },
    showSupplierPaymentOrder: function(params) {
        if(!Ext.isEmpty(Ext.bodyTab)) {
            Ext.bodyTab.removeAll();
            Ext.bodyTab= null;
        }
        YBase.utility.TabLoader.showComponent('YBase.view.SupplierPaymentOrderPanel', true, {'showBulkUpdate':false,params: params});
    },
    showMessageView: function(params) {
        params['message_window']=true;
        params['itemId']='msgTabWinPanel';
        YBase.utility.TabLoader.showComponent('YBase.view.MsgTabCnt', true, {'showBulkUpdate':false,params: params});
        var msgCnt = (Ext.ComponentQuery.query('container[itemId=MsgTabCnt]')),
            msgTabCntrl = YBase.app.getController('MsgTabController');
        if(!Ext.isEmpty(msgCnt[0])){
            msgTabCntrl.decodeWinUrl(params);
            msgTabCntrl.loadComment(msgCnt[0]);
        }
    },
    onMainPopupPanelBeforerender: function(absCmp) {
        var me = this,
            winOpener = window.opener;
        // winOpener.popupWin = window;
        var entryCodeDisplayFld = absCmp.query('displayfield[itemId=entryCodeDisplayFld]')[0];
        entryCodeDisplayFld.setFieldLabel(Ext.LANG.entryPanel.entryCode);
    },
    showSalesEntryPanelView : function(params){
        var me=this;
        if(Ext.msk) Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
            //me.activeBtnId="btnEntrySales";
            //me.activeMenuId="salesEntryMenuItem";
            params['is_bill_order'] = 0;
            me.getController('SalesEntryPanelController').loadEntryPanel(params);
           // me.setActiveBtnClass();
            //me.setActiveMenuItemClass();
        });

        var entryPanelItemId = 'SalesPanel',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    showServiceEntryWindowView: function(params){
        var me=this;
        if(Ext.CURRENT_USER.userRole==50 && params.mode == "new")
        {
            me.accessDenied();
            return;
        }
        if(Ext.msk)
            Ext.msk.hide();
        Ext.msk = Ext.create('YBase.utility.Mask');
            Ext.msk.on('afterrender', function(){
           // me.activeBtnId="btnSupport";
            //me.activeMenuId="serivceMasterMenuItem";
            params['entryPanel'] = 'serviceEntryWindow';
            me.getController('ServiceEntryWindowController').loadEntryPanel(params);
           // me.setActiveBtnClass();
        });
        var entryPanelItemId = 'ServiceEntryWindow',
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPnl,
            mskBody;

        if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
        }

        entryPnl = bodyTab.query('panel[customPanelId=' + entryPanelItemId + ']');

        if(!Ext.isEmpty(entryPnl)){
            mskBody =  entryPnl[0].hasOwnProperty('getBody') ? entryPnl[0].getBody() : entryPnl[0].getEl();
        }
        else
            mskBody = Ext.getBody();

        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    init: function(application) {
        var me=this;
        me.control({
            "mainPopup":{
                "beforerender":me.onMainPopupPanelBeforerender
            }
        });
    }
})