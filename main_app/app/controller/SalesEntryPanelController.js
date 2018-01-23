Ext.define('YBase.controller.SalesEntryPanelController', {
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
    pnlName : 'SalesPanel',
    pnlNo : 9,
    currentViewAlias: 'salesPanel',
    is_bill_order : 0,
    absCmp:null,
    msgCmp: null,
    getPnlTitle : function(params) {
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.entryPanel,
            title = entryPanelLang.salesTitle;
        return title;
    }, 
    changePanelToEditMode: function  (absCmp,res,customPanelId) {
        var me = this,
            entryPanelLang = Ext.LANG.entryPanel,
            title = entryPanelLang.salesTitle;
        title = title+'['+res.entry_code+']';
        absCmp.setTitle(title);
        me.callParent(arguments);
    },
    activateEntryPanelTab : function(entryPanel,params,bodyTab) {
        var me = this;
        if(params.is_clone == 1 && entryPanel[0].params.clone_master_id != params.clone_master_id){
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);  
        }
        else if(params.convertToSales == true){
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);  
        }
        else if(Ext.isEmpty(params.id) && !Ext.isEmpty(entryPanel[0].params.id) && params.mode == "new")
        {
            entryPanel[0].params = params;
            bodyTab.setActiveTab(entryPanel[0]);
            me.absCmp = entryPanel[0];
            me.absCmp.cmpEvent.mapCompanyRecords(entryPanel[0],{data:[]},true);              
        }
        else if(!Ext.isEmpty(params.customer_code) && params.customer_code != entryPanel[0].params.customer_code)
        {
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);
        }
        else if(!Ext.isEmpty(params.order_master_id) && entryPanel[0].params.order_master_id != params.order_master_id) 
        {
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);
        }
        // else if(params.createBill == true){
        //     entryPanel[0].params = params;
        //     me.resetEntryPanel(entryPanel[0]);  
        // }
        else{
            entryPanel[0].params = params;
            bodyTab.setActiveTab(entryPanel[0]);
            me.absCmp = entryPanel[0];

            if(params.mode=="new" && params.is_clone==1  && entryPanel[0].params.clone_master_id != params.clone_master_id && entryPanel[0].params.clone_type != params.clone_type){
                if(entryPanel[0].isActive !== true){
                    entryPanel[0].isActive = true;
                    me.viewEntryDetails(params,true);    
                }
                else
                    entryPanel[0].isActive = false;    
            }
            else{
                if(Ext.msk)
                    Ext.msk.hide();
            }
        }
        Ext.defer(function(){
            if(Ext.msk)
                Ext.msk.hide();
        },300);
    },
    onMenuItemServiceInvoiceClick: function(button,e,eOpts)
    {
        var  me = this,
            url = 'bizlayer/csvReport/getCsvReportArray',
            date = new Date(),
            date = Ext.Date.format(date,'Y-m'),
            order_master_ids = absCmp.entry_id;
        var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: url,
                baseParams: {
                    'store_name'    : Ext.CURRENT_USER.department_name,
                    'order_master_ids' : order_master_ids,
                    'date'          : date,
                    'csv_report_id' : 20,
                    'report_type'          : 'service_invoice'

                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
    },
    hidePnlActionButtons: function(absCmp) 
    {
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAddComment]')[0].setVisible(false);
        absCmp.query('menuitem[itemId=orderContractPrintMenu]')[0].setVisible(false);
        if(Ext.CURRENT_USER.userRole == "50")
        {
            absCmp.query('button[itemId=btnNewServiceEntry]')[0].setVisible(false);
        }
    },
    init: function(application) {
        var me=this;
        // me.control({
        //     // "entryPanel button[itemId=btnFilePopup]":{
        //     //     click:me.onBtnFilePopupClick
        //     // },
        //     "salesPanel button[itemId=btnAddComment]":{
        //         click:me.onBtnAddCommentClick
        //     },
        //     "salesPanel menuitem[itemId=menuItemServiceInvoice]":{
        //         click : me.onMenuItemServiceInvoiceClick
        //     }
        // });
        this.callParent(arguments);

        
    }
});