Ext.define('YBase.controller.PrintReportPopUpController', {
    extend: 'Ext.app.Controller',
    id: 'PrintReportPopUpController',
    refs: [
    {
        ref: 'printReportPopUp',
        selector: 'printReportPopUp'
    }
    ],
    onPrintReportPopUpBeforerender:function(absCmp, eOpts)
    {
        var me          = this,
            dateValue   = new Date(),
            dateField   = me.getPrintReportPopUp().query('datefield[itemId=printDateField]')[0];
        dateValue = Ext.Date.format(dateValue,'Y-m-d');
        dateField.setValue(dateValue);
        me.url = absCmp.url;
        me.reportType = absCmp.type;
        me.parentAbsCmp = absCmp.parentAbsCmp;
        me.csv_report_id = absCmp.csv_report_id;
        me.languageImplementation(absCmp);
        if(Ext.bodyTab.activeTab.itemId == 'TransferMaster'){
            var storeListCombo = absCmp.query('combobox[itemId=storeListCombo]')[0];
            storeListCombo.setVisible(true);
            storeListCombo.getStore().load();
        } 
    },
    languageImplementation: function(absCmp)
    {
        var lang = Ext.LANG,
            printReportLang = lang.prinReportPopUp;
        absCmp.setTitle(printReportLang.pnlTitle)
        absCmp.query('button[itemId=btnPrintReport]')[0].setText(printReportLang.btnPrint)
    },
    onClickBtnPrintReport:function(button, e, eOpts)
    {
        var me = this,
            reportWin = button.up('window'),
            dateField = reportWin.query('datefield[itemId=printDateField]')[0],
            dateValue = dateField.getValue(),
            dateValue = Ext.Date.format(dateValue,'Y-m'),
            storeListCombo = reportWin.query('combobox[itemId=storeListCombo]')[0],
            store_id = storeListCombo.getValue();
            store_name = storeListCombo.getRawValue();
            reportForm = reportWin.query('form[itemId=printMainCnt]')[0];
            reportFrm = reportForm.getForm();
            if(me.csv_report_id != 14)
                storeListCombo.allowBlank=true
        if(reportFrm.isValid()){
            var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: me.url,
                baseParams: {
                    'store_name'    : store_name/* Ext.CURRENT_USER.department_name*/,
                    'date'          : dateValue,
                    'csv_report_id' : me.csv_report_id,
                    'report_type'   : me.reportType,
                    'store_id'      : store_id
                    // 'order_master_ids': me.order_master_ids,
                    // 'csv_report_id': csv_report_id,
                    // 'order_detail_ids': auction_detail_ids,
                    // 'prefix': csvName,
                    // 'printAll':true
                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
            me.getPrintReportPopUp().close();
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "printReportPopUp":{
                "beforerender":me.onPrintReportPopUpBeforerender
            },
            "printReportPopUp button[itemId=btnPrintReport]":
            {
                "click": me.onClickBtnPrintReport
            }

        });
    }
})