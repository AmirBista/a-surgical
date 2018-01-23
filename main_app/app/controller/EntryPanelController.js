Ext.define('YBase.controller.EntryPanelController', {
    extend: 'YBase.controller.OrderSalesEntryPanelController', 
    views: [
        'ImageDragDropWindow'
    ],
    refs:[
        {
            ref: 'entryPanel',
            selector: 'entryPanel'
        } 
    ], 
    requires:[
        'Ext.ux.upload.Button',
        'Ext.ux.upload.Basic',
        // 'YBase.utility.ButtonHelper'
    ],
    pnlName : 'EntryPanel',
    pnlNo : 9,
    currentViewAlias: 'entryPanel[is_bill_order=1]',
    is_bill_order : 1,
    absCmp:null,
    msgCmp: null,
    
    getPnlTitle : function(params) {
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.entryPanel,
            title = entryPanelLang.pnlTitle;
        return title;
    },
    changePanelToEditMode: function  (absCmp,res,customPanelId) {
        var me = this,
            entryPanelLang = Ext.LANG.entryPanel,
            title = entryPanelLang.pnlTitle;
        title = title+'['+res.entry_code+']';
        absCmp.setTitle(title);
        me.callParent(arguments);
    },
    onBtnConvertToSalesClick : function(button, e,eOpts){
        var me = this,
             activeTab = Ext.bodyTab.activeTab;
        if(me.absCmp.params.popup===true){
              paramsUrl = {
                id          : activeTab.params.id,
                mode        : 'new',
                convertToSales :  true,
                popup       : true
            },
            queryString = YBase.utility.ButtonHelper.generateUrlQueryString(paramsUrl),
            route = 'popupWindow#SalesPanel/new' + queryString,
            name  = 'salesPopupWin';
            if(Ext.isEmpty(me.salesEntryWin)){
                me.salesEntryWin = window.open(route,name,'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,top=0,left=0,width=1024,height=600');
                Ext.EventManager.un(me.salesEntryWin, "beforeunload",me.onsalesEntryWindowClose, me);
                Ext.EventManager.on(me.salesEntryWin, "beforeunload",me.onsalesEntryWindowClose, me);
            }
        }
        else{
                Ext.Router.redirect('SalesPanel'+'/new?id='+activeTab.params.id+'&mode=new&convertToSales=true');
            }
    },
    hidePnlActionButtons: function(absCmp) 
    {
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAddComment]')[0].setVisible(false);
        absCmp.query('menuitem[itemId=menuItemServiceInvoice]')[0].setVisible(false);
        if(Ext.CURRENT_USER.userRole == "50")
        {
            absCmp.query('button[itemId=btnNewServiceEntry]')[0].setVisible(false);
        }
    },
    init: function(application) {
        var me=this;
        this.callParent(arguments);
    }
});