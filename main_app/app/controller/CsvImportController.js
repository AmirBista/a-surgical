
Ext.define('YBase.controller.CsvImportController', {
    extend: 'Ext.app.Controller',
    refs:[
        {
            ref: 'CsvImportWin',
            selector: 'CsvImportWin'
        }
    ],
    absCmp: null,
    
    onCsvImportWinBeforeRender : function(absCmp){
        var me=this;
        me.absCmp=absCmp;

        // absCmp.query('image[itemId=csvMaskImg]')[0].setSrc('images/csv_mask.gif');
        absCmp.query('label[itemId=csvMaskLbl]')[0].setText(Ext.LANG.globalLang.csvImport.lblCheckMask);
        me.renderCombo(absCmp);
        me.languageImplementation(absCmp);
        me.showHideCsvCheckMask(absCmp,false);
    },
    renderCombo : function(absCmp) {
        var store = Ext.create('Ext.data.Store', {
                fields: [
                    {name: 'name', type: 'string'},
                    {name: 'code',  type: 'string'},
                ],
                data : [
                    {name : 'OrderProducts', code : 'OrderProducts'},
                    {name : 'OrderDetails', code : 'OrderDetails'}

                ]
            });

        var combo = Ext.create('Ext.form.ComboBox', {
                itemId          : 'importTypeCombo',
                allowBlank      : false,
                name            : 'import_type',
                fieldLabel      : 'Import Type',
                displayField    : 'name',
                valueField      : 'name',
                store           : store
            });
        absCmp.query('container[itemId=comboCnt]')[0].add(combo);
        
    },
    languageImplementation : function(absCmp){
        var me=this,
        csvImport = Ext.LANG.globalLang.csvImport,
        orderCsvImport = Ext.LANG.orderCsvImport;
        absCmp.setTitle(csvImport.csvImportWin);
        
        absCmp.query("displayfield[itemId=totalCsvRecords]")[0].fieldLabel=csvImport.lbltotalCsvRecords;
        absCmp.query("displayfield[itemId=correctCsvRecords]")[0].fieldLabel=csvImport.lblcorrectCsvRecords;
        absCmp.query("displayfield[itemId=incorrectCsvRecords]")[0].fieldLabel=csvImport.lblincorrectCsvRecords;
       
        //buttons
        absCmp.query("filefield[itemId=csvFileUpload]")[0].buttonConfig.text = csvImport.btnFileUpload;
        absCmp.query("button[itemId=btnCsvCheck]")[0].setText(csvImport.btnCsvCheck);
        // absCmp.query("button[itemId=btnCsvDelete]")[0].setText(csvImport.btnCsvDelete);
        absCmp.query("button[itemId=btnUpload]")[0].setText(csvImport.btnImportData);
        absCmp.query("button[itemId=btnCancel]")[0].setText(csvImport.btnCancel);
        absCmp.query("button[itemId=btnErrorCsvDownload]")[0].setText(csvImport.btnErrorCsvDownload);
    },

    onBtnCsvCancelClick: function(button){
        Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.csvImport.msgBox.closeWin, function(btn){
            if(btn=="yes"){
                button.up('window').close();
            }
        });
    },
    showHideCsvCheckMask : function(win,showMask){
        win.query('container[itemId=csvMask]')[0].setVisible(showMask);
        win.query('panel[itemId=logPanel]')[0].setVisible(!showMask);
    },
    getBtnCtrl: function() {
        var obj = {};
        obj['btnCsvCheck'] = true;
        obj['btnErrorCsvDownload'] = false;
        obj['btnUpload'] = false;
    },
    csvImportBtnCtrl:function(win,btnCtrl){
        win.query('button[itemId=btnCsvCheck]')[0].setDisabled(!(btnCtrl.btnCsvCheck));
        win.query('button[itemId=btnErrorCsvDownload]')[0].setDisabled(!(btnCtrl.btnErrorCsvDownload));
        win.query('button[itemId=btnUpload]')[0].setDisabled(!(btnCtrl.btnUpload));
        if(!Ext.isEmpty(win.query('menuitem[itemId=orderMasterErrorMenuItem]')[0])){
            win.query('menuitem[itemId=orderMasterErrorMenuItem]')[0].setDisabled(!(btnCtrl.btnOrderMasterErrorDwld));
        }
        if(!Ext.isEmpty(win.query('menuitem[itemId=orderDetailsErrorMenuItem]')[0])){
            win.query('menuitem[itemId=orderDetailsErrorMenuItem]')[0].setDisabled(!(btnCtrl.btnOrderDetailErrorDwld));
        }
        
        // win.query('button[itemId=btnNewCsvInsert]')[0].setDisabled(!(btnCtrl.btnNewCsvInsert));
        // win.query('button[itemId=btnCsvDelete]')[0].setDisabled(!(btnCtrl.btnCsvDelete));
        // win.query('button[itemId=btnCpUpdate]')[0].setDisabled(!(btnCtrl.btnCpUpdate));
    },

    getLogTemplate : function() {
        var tpl = new Ext.XTemplate(
                        '<div style="text-align:left;">',
                        '   <div> {[Ext.LANG.globalLang.csvImport.log.log]}: </div>',
                        '   <div>-------------------------------------------------------</div>',
                        '   <tpl for=".">',
                        '       <tpl if="this.isSuccess(values.success)===true">',
                        '           <div class="successCsv">{[Ext.LANG.globalLang.csvImport.log.success]} : {[Ext.LANG.globalLang.csvImport.log.csvRowNumber]} : {row} </div>',
                        '       <tpl else>',
                        '           <div class="errorCsv">',
                        '               {[Ext.LANG.globalLang.csvImport.log.error]} : {[Ext.LANG.globalLang.csvImport.log.csvRowNumber]} : {row} ',
                        '               {[Ext.LANG.globalLang.specialChar.openBracket]} {[Ext.LANG.globalLang.csvImport.log.csvErrorMsg]} : {error.errorCode} {[Ext.LANG.globalLang.specialChar.closeBracket]}',
                        '               {error.errorMsg} : {error.errorValue} ',
                        '           </div>',
                        '       </tpl>',
                        '   </tpl>',
                        '</div>',
                
                {
                    isSuccess: function(success){
                        return success===true ? true : false;
                    }
                }
            );
        return tpl;
    },

    onBtnCsvCheckClick: function(button,e,eOpts){
        var me = this,
            win= me.absCmp,
            formPanel = win.query('form[itemId=csvUploadForm]')[0],
            frm = formPanel.getForm(),
            logPanel=win.query('panel[itemId=logPanel]')[0],
            tpl = me.getLogTemplate(),
            phpCtrl = me.phpCtrl;
        
        if(frm.isValid()){
            me.showHideCsvCheckMask(win,true);
            frm.submit({
                url : 'bizlayer/'+phpCtrl+'/checkCsvFile',
                params : {},
                success: function(form,action){
                    var res = action.result;
                    if(res.success){
                        var data = res.checkResult,
                            btnCtrl=res.status,
                            orderCsvImportLang = Ext.LANG.orderCsvImport;
                        tpl.overwrite(logPanel.body, data);
                        me.showHideCsvCheckMask(win,false);
                        win.query('displayfield[itemId=totalCsvRecords]')[0].setValue(res.totalRecords);
                        win.query('displayfield[itemId=correctCsvRecords]')[0].setValue(res.successImports);
                        win.query('displayfield[itemId=incorrectCsvRecords]')[0].setValue(res.failedImports);
                        me.csvImportBtnCtrl(win,btnCtrl);
                    }
                    else{
                        console.log('Action Failed');
                    }
                }
                
            });
        }
    },
    downloadErrorCsv: function(button,csv_import_type) {
        var win = button.up('window'),
            csvUploadForm = win.query('form[itemId=csvUploadForm]')[0],
            csvUploadFrm = csvUploadForm.getForm(),
            params = csvUploadFrm.getValues();

        params['csv_import_type'] = csv_import_type;
        var form=Ext.create('Ext.form.Panel', {
                'url': 'bizlayer/orderCsvImport/downloadFailedOrderCsv',
                baseParams: params,
                standardSubmit: true
            });
        form.getForm().submit();
    },
    importCsv: function(win,params){
        var me = this,
            phpCtrl = this.phpCtrl;
        Ext.Ajax.request({
            url : 'bizlayer/'+phpCtrl+'/importCsv',
            method: 'POST',
            params: params,
            success: function(response){
                var resp=Ext.decode(response.responseText);
                
                Ext.Msg.show({
                    title:Ext.LANG.globalLang.app.appTitle,
                    msg: resp.msg, 
                    modal:true,
                    buttons:Ext.Msg.OK,
                    icon: Ext.Msg.INFO,
                    fn: function(btn){
                        
                        // store.reload();
                        win.close();
                        return;
                    }
                });
            } 
        });
    },
    onBtnCsvUploadClick : function (button,e,eOpts){
        var me = this,
            win= me.absCmp,
            form = win.query('form[itemId=csvUploadForm]')[0],
            frm = form.getForm(),
            params = frm.getValues(),
            phpCtrl = me.phpCtrl;
        me.showHideCsvCheckMask(win,true);

        //CHECK IF ANY FAILED CSV FILE EXISTS
        Ext.Ajax.request({
            url   : 'bizlayer/'+phpCtrl+'/confirmCsvImport',
            method: 'POST',
            params: params,
            success: function(response){
                var resp=Ext.decode(response.responseText),
                    askConfirmUpload=false;
                    
                if(resp.success){
                    if(resp.hasSuccessImports===true && resp.hasFailedImports===true)
                        askConfirmUpload=true;
                    else{
                        me.importCsv(win,params);    
                    }
                    // button.setDisabled(true);
                }
                else{
                    Ext.Msg.show({
                        title:Ext.LANG.globalLang.app.appTitle,
                        msg: Ext.LANG.globalLang.csvImport.msgBox.invalidCsvData,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                     me.showHideCsvCheckMask(win,false);
                }
                if(askConfirmUpload===true){
                    Ext.Msg.show({
                        title:Ext.LANG.globalLang.app.appTitle,
                        msg: Ext.LANG.globalLang.csvImport.msgBox.importOnlyCorrectCsv,
                        buttons: Ext.Msg.YESNO,
                        icon: Ext.Msg.QUESTION,
                        fn: function(btn){
                            if(btn=="yes"){
                                me.importCsv(win,params);    
                            }
                        }
                    });
                }
             }
        });
    },
    onImportDateFieldSelect: function(fld,value,eOpts) {
        var me = this,
            win = me.absCmp,
            // radiofield = win.query('radiofield[name=csv_import_type][checked=true]'),
            btnCtrl =  {
                btnCsvCheck : true,
                btnErrorCsvDownload : false,
                btnUpload : false
            };
        // if(Ext.isEmpty(radiofield)){
        //     btnCtrl['btnCsvCheck'] = false;
        // }
        me.csvImportBtnCtrl(win,btnCtrl);    
    },
    csvFileUploadFieldChange: function(filefield,value,eOpts){
        if (filefield.getValue().length < 1)
            return;
        var me=this,
            win=me.absCmp,
            formPanel=win.query('form[itemId=csvUploadForm]')[0],
            frm=formPanel.getForm(),
            phpCtrl = me.phpCtrl;
        
        if(frm.isValid()){
            frm.submit({
                url: 'bizlayer/'+phpCtrl+'/uploadCSVFile',
                params: {'filefield_name': filefield.name},
                scope: win,
                clientValidation: true,
                success: function(form, action) {
                    var win=this,
                        result=action.result,
                        btnCtrl=result.status;
                    win.query('textfield[itemId=csvFilePath]')[0].setValue(result.filename);
                    // win.query('hiddenfield[itemId=checkNew]')[0].setValue(result.checkNew);
                    //set hidden field only if upload is for the first time
                    // if(result.checkNew=="yes")
                    //     win.query('hiddenfield[itemId=oldFilename]')[0].setValue(result.filename);
                    me.csvImportBtnCtrl(win,btnCtrl);
                },
                failure: function(form, action) {
                    var message=action.result.missingMsg;
                    if(!Ext.isEmpty(action.result.missingHeaders))
                        message+= " " + action.result.missingHeaders + '<br/>';
                    if(!Ext.isEmpty(action.result.availableHeaders)){
                        message+=action.result.availableMsg;
                        message+= " " + action.result.availableHeaders  + '<br/>';    
                    }
                    Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,message );
                }
            });
        }
        else{

            filefield.reset();
            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.importTypeMissing);   
        }
    },
    csvImportBtnCtrl:function(win,btnCtrl){
        win.query('button[itemId=btnCsvCheck]')[0].setDisabled(!(btnCtrl.btnCsvCheck));
        win.query('button[itemId=btnErrorCsvDownload]')[0].setDisabled(!(btnCtrl.btnErrorCsvDownload));
        win.query('button[itemId=btnUpload]')[0].setDisabled(!(btnCtrl.btnUpload));
        
        // win.query('button[itemId=btnNewCsvInsert]')[0].setDisabled(!(btnCtrl.btnNewCsvInsert));
        // win.query('button[itemId=btnCsvDelete]')[0].setDisabled(!(btnCtrl.btnCsvDelete));
        // win.query('button[itemId=btnCpUpdate]')[0].setDisabled(!(btnCtrl.btnCpUpdate));
    },
    onSupplierCodeTxtFldBlur: function(fld){
        var me = this,
            win = me.absCmp,
            fldVal = fld.getValue();
        if(!Ext.isEmpty(fldVal)){
            Ext.Ajax.request({
                url : 'bizlayer/supplier/getSupplierInfo',
                params : {supplierCD : fldVal},
                success : function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        var supplier_combo = win.query('combobox[itemId=supplierNameCombobox]')[0];
                        supplier_combo.setValue(resp.data.column_6_03);
                    }
                    else{
                        fld.setValue(null);
                    }
                },
            });              
        }
    },
    onSupplierNameComboSelect: function(fld,records){
        var me = this,
            win = me.absCmp,
            supplierCodeTxtFld = win.query('textfield[itemId=supplierCodeTxtFld]')[0];
        supplierCodeTxtFld.setValue(records[0].data.column_6_02);
    },
    onFormFieldSpecialKey : function(fld, e){
        var me = this,
            absCmp = me.absCmp,
            formPanel = absCmp.query('form[itemId=csvUploadForm]')[0],
            itemId = fld.itemId;
        if (e.getKey() == e.ENTER) {
            if(fld.xtype=="combobox"){
                var picker = fld.getPicker(),
                    highlightedItem = picker.highlightedItem,
                    selectedValue;
                if(!Ext.isEmpty(highlightedItem)){
                    // selectedValue = picker.highlightedItem.innerText;
                    var records=[];
                    records[0] = picker.getRecord(highlightedItem);
                    fld.setValue(records[0].data[fld.valueField]);
                    fld.fireEvent('select',fld,records);
                }
            }
            
            if(typeof fld.triggerBlur === "function")
                fld.triggerBlur();
            fld.blur();
            var nextFld = null, qry, cmp_id;
            
            if (fld.disabled === false && fld.readOnly === false && fld.focus_on_enterkey == 1){
                //editable fields
                cmp_id = parseInt(fld.editable_cmp_id)+1;
                qry = 'textfield[isDynamicFormFld=true][editable_cmp_id='+ cmp_id +']';
            }
            else
            {
                //readonly or disabled field
                if(fld.focus_on_enterkey == 1){
                    cmp_id = parseInt(fld.nxt_focus_cmp_id)+1;
                    qry = 'textfield[isDynamicFormFld=true][focus_on_enterkey=1][nxt_focus_cmp_id='+ cmp_id +']';
                }
                else{
                    cmp_id = parseInt(fld.nxt_cmp_id)+1;
                    qry = 'textfield[isDynamicFormFld=true][nxt_cmp_id='+ cmp_id +']';

                }
                
            }

            nextFld = absCmp.query(qry);
            
            if(!Ext.isEmpty(nextFld)){
                nextFld[0].focus(true, false );
            }
        }
    },
    onBtnErrorCsvDownloadClick : function (button,e,eOpts){
        var win=button.up('window'),
            textfield=win.query('textfield[itemId=csvFilePath]')[0],
            txtfldValue=textfield.getValue(),
            phpCtrl=this.phpCtrl,
            url = 'bizlayer/'+phpCtrl+'/downloadFailedCsv',
            form=Ext.create('Ext.form.Panel', {
                'url': url,
                baseParams: {
                    filename: txtfldValue
                },
                standardSubmit: true
            });
        form.getForm().submit();
        // win.query('filefield[itemId=csvErrorFileUpload]')[0].setDisabled(false);
    },
    onComboSelect : function(combo,records) {
        var me = this,
            val = combo.getValue(),
            ctrl = 'order';
        if(val == 'OrderProducts')
            ctrl = 'orderProducts';
        else if(val == 'OrderDetails')
            ctrl = 'orderDetails';
        me.phpCtrl = ctrl;
    
        
    },
    init: function(application) {
        var me=this;
        me.control({
            "CsvImportWin": {
                beforerender: me.onCsvImportWinBeforeRender,
            },
            "CsvImportWin filefield[itemId=csvFileUpload]": {
                change: me.csvFileUploadFieldChange
            },
            "CsvImportWin button[itemId=btnCsvCheck]": {
                click: me.onBtnCsvCheckClick
            },
            "CsvImportWin button[itemId=btnCancel]": {
                click: me.onBtnCsvCancelClick
            },
            "CsvImportWin button[itemId=btnUpload]": {
                click: me.onBtnCsvUploadClick
            },
            "CsvImportWin button[itemId=btnErrorCsvDownload]": {
                click: me.onBtnErrorCsvDownloadClick
            },
            "CsvImportWin textfield":{
                specialkey: me.onFormFieldSpecialKey
            },
            "CsvImportWin textfield[itemId=supplierCodeTxtFld]": {
                blur: me.onSupplierCodeTxtFldBlur

            },
            "CsvImportWin combobox[itemId=importTypeCombo]": {
                select: me.onComboSelect
            },
        });
    }
});
