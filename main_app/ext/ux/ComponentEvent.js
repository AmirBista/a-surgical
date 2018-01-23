Ext.define('Ext.ux.ComponentEvent', {
    // extend:'YBase.controller.OrderMasterEntryController',
    alternateClassName: 'Ext.ComponentEvent',
    // singleton: true,
    absCmp: null,
    controller: null,
    // @private
    constructor: function(cfg) {
        Ext.apply(this, cfg);
    },
    onComboFormFieldSelect: function(fld,record){
        var me = this,
            absCmp = me.controller.absCmp,
            fldValue = fld.getValue(),
            itemId = fld.itemId;
        /*B2:: Company Name */
        if(itemId == "column_1_16"){
            me.mapCompanyRecords(absCmp,record,false);
        }
        else if(itemId == "column_1_22"){
            var fld_collection_store_id = absCmp.query('textfield[itemId=column_1_06]')[0];
            fld_collection_store_id.setValue(record[0].data.code);
        }
        /*Customer Type*/
        // else if(itemId == "column_1_14"){
        //     // Change Fld Editor.
        //     var editorxtype = fldValue == Ext.LANG.entryPanel.customerType.registered ? {xtype : 'combobox'} : {xtype: 'textfield'},
        //         fld_B2 = absCmp.query('textfield[itemId=column_1_16]')[0];
        //     
        //     Ext.apply(fld_B2,editorxtype,{});
        // }
        // Service Flag
        else if(itemId == "column_1_44"){
            var fld_serviceCount = absCmp.query('textfield[itemId=column_1_45]')[0];
            if(fldValue == Ext.LANG.entryPanel.serviceFlag.yes){
                fld_serviceCount.setReadOnly(false);
                fld_serviceCount.removeCls('disabled-field');
            }
            else if(fldValue == Ext.LANG.entryPanel.serviceFlag.no){
                fld_serviceCount.setReadOnly(true);
                fld_serviceCount.setValue(0);
                fld_serviceCount.addCls('disabled-field');
            }
        }
        // Receive Status
        else if(itemId == "column_1_29"){
        	me.onReceivedStatus(absCmp,fldValue);
        }
        //column_1_43 :: remarks combo
        else if(itemId == 'combo_column_1_43')
        {
             var description = record[0].raw.description,
                parentCnt = fld.up('container'),
                textareaFld = parentCnt.query('textareafield[itemId=column_1_43]')[0];
                addedDescription = textareaFld.getValue().concat(description);
            textareaFld.setValue(addedDescription);
        }
    },
    onComboFormFieldChange: function(fld, newValue,oldValue) {
        var me = this,
            absCmp = me.controller.absCmp,
            fldValue = fld.getValue(),
            itemId = fld.itemId;
        
        if(Ext.isEmpty(newValue)){
            if(itemId== 'column_1_16'){
                 /*B2:: Company Name*/
                me.mapCompanyRecords(absCmp,[],false);
            }

        }
        else{
            if(itemId=="column_1_22"){
               me.clearGridRecord(me,absCmp);
            }
        }
    },
    onReceivedStatus:function(absCmp,fldValue)
    {
        var fld_paymentAmt  = absCmp.query('textfield[itemId=column_1_40]')[0],
            fld_grandTotal  = absCmp.query('textfield[itemId=column_1_36]')[0],
            fld_balance     = absCmp.query('textfield[itemId=column_1_41]')[0],
            fld_rcvDateTime = absCmp.query('textfield[itemId=column_1_30]')[0],
            fld_depositAmt  = absCmp.query('textfield[itemId=column_1_37]')[0];
            fld_ttlPayable = absCmp.query('textfield[itemId=column_1_56]')[0];

        if(fldValue == Ext.LANG.entryPanel.receiveStatus.received){
            fld_balance.setValue(0);
            var grandTotal = fld_grandTotal.getValue(),
                depositAmt = fld_depositAmt.getValue(),
                ttlPayable = fld_ttlPayable.getValue();
            if(absCmp.is_bill_order == 1)
                fld_paymentAmt.setValue(ttlPayable - depositAmt);
            else
                fld_paymentAmt.setValue(grandTotal - depositAmt);
            fld_rcvDateTime.setValue(Ext.Date.format(new Date(), "Y-m-d"));
        }
    },

    clearGridRecord: function(me,absCmp){
        var entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            store = entryDetailGrid.getStore();
            productNameCombo = entryDetailGrid.query('gridcolumn[itemId=column_2_108]')[0];
            if(!Ext.isEmpty(productNameCombo)){
                var productCombo = productNameCombo.editor;
                productCombo.highlightedItemIds = null;
            }
            store.removeAll();
        var removeRec = store.getRemovedRecords();
        for(var i=0;i<removeRec.length;i++) {
            if(!Ext.isEmpty(removeRec[i].data.id))
                removeRec[i].set('delete_flg',1);
        }
        if(absCmp.params.mode=="new")
            me.controller.addBlankRecord(store,5);
        else
            me.controller.addBlankRecord(store);
    },
    onFormFieldSpecialKey : function(fld, e){
        var me = this,
            absCmp = me.absCmp,
            formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
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
        else if(e.getKey() == e.TAB && e.shiftKey == true){
            if(fld.readOnly == false && fld.disabled == false){
                fld.enableCustomShiftTab = false;
            }
        }
    },
    onFormFieldBlur: function(fld,e){
        var me = this,
            absCmp = me.controller.absCmp,
            formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
            fldVal = fld.getValue(),
            itemId = fld.itemId,
            haltPartialSave = false,
            taxPercent = parseInt(Ext.LANG.defaultValues.taxValue|| 0);

        if(!Ext.isEmpty(fld.getValue()) && fld.getValue()!=absCmp.oldFldValues[itemId]){
            
        }
        // Discount = column_1_34, Payment Amt = column_1_40, Deposit Amt = column_1_37 , Grand Total = column_1_36
        if(itemId=='column_1_34' ||itemId=='column_1_40' || itemId == 'column_1_37' || itemId == "column_1_36"){
                me.calculateTotal();
        }
        // Price = column_1_54 
        else if(itemId =='column_1_54')
        {
            var fld_totalPayable = absCmp.query('textfield[itemId=column_1_56]')[0],
                fld_tax = absCmp.query('textfield[itemId=column_1_55]')[0],
                tpValue = (fldVal * 100) / (100 - taxPercent),
                taxValue = (taxPercent/100)*tpValue;
            fld_tax.setValue(Math.round(taxValue));
            fld_totalPayable.setValue(Math.round(tpValue));
            me.calculateTotal();
        }
        // Total Payable = column_1_56
        else if(itemId == 'column_1_56')
        {
            var fld_price = absCmp.query('textfield[itemId=column_1_54]')[0],
                fld_tax = absCmp.query('textfield[itemId=column_1_55]')[0],
                taxValue = (taxPercent/100)*fldVal,
                priceValue = fldVal - taxValue;
            fld_tax.setValue(Math.round(taxValue));
            fld_price.setValue(Math.round(priceValue));
            me.calculateTotal();
        }
        if(itemId=='column_1_63' ||itemId=='column_1_64'){
                me.calculateBaseSize();
        }
         if(itemId=='column_1_15'){
            var fldValue = fld.getValue();
            var params = {};
            params['customer_code'] = fld.getValue();
            Ext.Ajax.request({
                url : 'bizlayer/customer/getCustomerInfo',
                params: params,
                success: function(response){
                    var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        me.mapCompanyRecords(absCmp,resp,true); 
                    }
                    else{
                        // fld.setValue(abstractcomponent.oldFldValues[itemId]);
                        me.controller.showToolBarMsg(resp.msg,resp.success); 
                        return false;
                    }
                }
            });
        }
        //         var fldValue = fld.getValue();
        //         var params = {};
        //         params['company_code'] = fld.getValue();
        //         Ext.Ajax.request({
        //             url : 'bizlayer/companyList/getCompanyInfo',
        //             params: params,
        //             success: function(response){
        //                 var resp = Ext.decode(response.responseText);
        //                 if(resp.success){
        //                     me.mapCompanyRecords(abstractcomponent,resp,true); 
        //                 }
        //                 else{
        //                     // fld.setValue(abstractcomponent.oldFldValues[itemId]);
        //                     me.controller.showToolBarMsg(resp.msg,resp.success); 
        //                     return false;
        //                 }
        //             }
        //         });
        //     }
        // }
    },
    getFormPostData: function(absCmp,form) {
        var frmValues = form.getValues(),
            initialFormValues = absCmp.initialFormValues,
            postData = {};
            
        for(var key in frmValues){
            if(frmValues[key] != initialFormValues[key]){
                postData[key] = frmValues[key]; 
            }
        }
        postData['last_updated_datetime'] = absCmp.query('textfield[itemId=column_1_08]')[0].getValue(); 
        return postData;
    },
    getMapperData : function(absCmp,mapperArr,clearFld) {
        var form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frmValues = form.getValues(),
            data = {};
        for(var key in mapperArr){
            data[key] = clearFld == true ? null : frmValues['dynamic_fields['+key+']'];
        }
        return data;
    },
    getConcatMapperData : function(absCmp,mapperArr) {
        var form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frmValues = form.getValues(),
            data = '';
        for(var key in mapperArr){
            data += frmValues['dynamic_fields['+key+']'] + ' ';
        }
        data = data.trim();
        return data;
    },
    
    
    /*
    * @map company screen fld on company code set
    */
    setCompanyInfo: function(absCmp,fld,fldVal) {
        var me = this,
            itemId = fld.itemId;
        Ext.Ajax.request({  
            url: 'bizlayer/client/getRecord',
            params: {'code': fldVal},
            success: function(response){
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    me.mapCompanyRecords(absCmp,resp,true);
                    // me.partialSave(absCmp,false,'form');
                }
                else{
                    me.controller.showToolBarMsg(resp.msg,resp.success); 
                    fld.setValue(absCmp.oldFldValues[itemId]);
                }
            }
        });
    },
    mapCompanyRecords: function(absCmp,record,is_code){
        var me = this,
            // mapperArr = YBase.utility.DataMapperHelper.entryCompanyDataMapper;
            mapperArr = YBase.utility.DataMapperHelper.entryCompanyDataMapper;
            data = null;
        if(!Ext.isEmpty(record))
            data = is_code == true ? record.data : record[0].raw;
        YBase.utility.EntryPanelHelper.mapRecords(absCmp,mapperArr,data);
    },
    
    mapToEntryGrid : function(record,data,grid,mapperArr) {
        var editor = grid.editingPlugin.getActiveEditor(),
            activeField,
            obj = {};
        if (editor)
            activeField = editor.field;
        for(var key in mapperArr){
            obj[mapperArr[key]] = data[key];
            if(!Ext.isEmpty(activeField) && (activeField.displayField == key || activeField.gridDataIndex==mapperArr[key])){
                activeField.setValue(data[key]);
            } 
        }
        record.set(obj);
    },
    mapEntryGridRecords: function(record,data,grid){
        var mapperArr = YBase.utility.DataMapperHelper.orderProductsDataMapper;
        this.mapToEntryGrid(record,data,grid,mapperArr);
    },
    mapBatchDetailToEntryGridRecords: function(record,data,grid){
        var mapperArr = YBase.utility.DataMapperHelper.batchDetailOrderProductsDataMapper;
        this.mapToEntryGrid(record,data,grid,mapperArr);
    },
    onEditorComboExpand: function(combo) {
        var me =this,
            absCmp = me.controller.absCmp,
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            selectedRec = entryDetailGrid.getSelectionModel().getSelection()[0],
            gridStore = entryDetailGrid.getStore(),
            cbStore = combo.getStore(),
            rowIdx = gridStore.indexOf(selectedRec);

        if(!Ext.isEmpty(combo.highlightedItemIds) &&  !Ext.isEmpty(combo.highlightedItemIds[rowIdx])){
            if(cbStore.currentPage == combo.highlightedItemIds[rowIdx].storePageNumber){
                var rec = cbStore.getAt(combo.highlightedItemIds[rowIdx].idx);
                combo.select(rec);
            }
        }
        // if(combo.itemId=='column_2_122'){
        //     var store_field = absCmp.query('textfield[itemId=column_1_06]')[0],
        //         store_id = !Ext.isEmpty(store_field.getValue()) ? store_field.getValue() : null;
        //     cbStore.getProxy().extraParams['supplier_id'] = store_id;
        //     cbStore.reload();
        // }
  
    },
    onEditorComboBeforeSelect: function(combo,record){
        var me = this,
            grid = combo.up('grid'),
            gridStore = grid.getStore(),
            selectedRec  = grid.getSelectionModel().getSelection()[0],
            itemId = combo.itemId,
            comboVal = combo.getValue(),
            index = -1;
            
        grid.oldItemNameValue = combo.getValue();
       /* if(itemId=='column_2_127'){
            var cmb_store=grid.query('gridcolumn[itemId=column_2_127]')[0].editor.store;
            var index = me.hasDuplicateRecord1(gridStore,selectedRec,record);
             if(index!=-1){
                me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.duplicateEntry,false); 
                return false;
            }
        }*/
       
        if(itemId == "column_2_108"){
            var prod_code     = record.data.column_5_05,
                currency_type = record.data.column_5_16,
                supplier_id   = record.data.supplier_id,
                cbStore       = combo.getStore(),
                rowIdx        = gridStore.indexOf(selectedRec),
                idx        = cbStore.findBy(function(rec,id){
                    var recData = rec.data;
                    if(recData.column_5_05 == this.prod_code && recData.column_5_16 == this.currency_type && recData.supplier_id == this.supplier_id)
                        return true;    
                },{prod_code: prod_code,currency_type : currency_type, supplier_id : supplier_id});
            combo.highlightedItemIds = combo.highlightedItemIds || {};
            combo.highlightedItemIds[rowIdx] = {
                        idx : idx,
                        storePageNumber  : cbStore.currentPage
                    };
            if(!Ext.isEmpty(comboVal) && comboVal == record.raw.column_5_07 && (selectedRec.data.column_2_27 != record.raw.column_5_16 || selectedRec.data.supplier_id != record.raw.supplier_id )){
                var records = [];
                records[0] = record;
                combo.fireEvent('select',combo,records);
            }  

            var index = me.hasDuplicateRecord(gridStore,selectedRec,record,'column_2_08');
            
            if(index!=-1){
                me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.duplicateEntry,false); 
                return false;
            }
        }
        return true;
    },
    /*
    * @ OrderDetailEntryGrid Combo Editor Select Fx.
    */
    onEditorComboSelect : function(combo,record){
        var me = this,
            absCmp = me.controller.absCmp,
            // grid = combo.up('grid'),
            grid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            gridStore = grid.getStore(),
            selectedRec  = grid.getSelectionModel().getSelection()[0],
            itemId = combo.itemId,
            comboVal = combo.getValue(),
            is_bill_order = absCmp.is_bill_order,
            compulsaryCol = 'column_2_08';
        /*
        * Product Name:: column_2_108
        */
        if(itemId == "column_2_108"){
            gridStore.each(function(record){
                if(!Ext.isEmpty(record.get('column_6_06'))){
                    record.setDirty(true);
                }
            });
            me.mapEntryGridRecords(selectedRec,record[0].raw,grid);
            me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
            me.mapBatchDetailToEntryGridRecords(selectedRec,{data:[]},grid);
        }
        /*
        * Batch Detail CD:: column_2_122
        */
        else if(itemId == "column_2_122"){
            me.mapBatchDetailToEntryGridRecords(selectedRec,record[0].raw,grid);
        }
    },
    onEditorComboChange: function(combo,newValue,oldValue){
        var me =this,
            absCmp = me.controller.absCmp,
            itemId= combo.itemId; 
        if(itemId == "column_2_08"){
            if(Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue)){
                var grid = combo.up('grid');
                grid.oldItemNameValue = oldValue;
            }
        }
        // making null  combohighlightIds null while  click on  clear  button in product name.
        if(itemId=="column_2_108"){
            if(Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue)){
                combo.highlightedItemIds = null;
            }
        }
    },
    onOrderFileMenuClick:  function(item){
        var me =  this;
        me.fileHelper.onFileMenuClick(me, item);
    },
    onOrderFileViewClick: function(view, record, item, index, e, eOpts){
        var me =this;
        me.fileHelper = YBase.utility.FileHelper;
        me.fileHelper.orderFileClick(me, view, record, item, index, e, eOpts);
    },
    onOrderFileViewUpdate: function(record, index, node, eOpts){
        var me = this;
        me.fileHelper.onFileViewUpdate(me, record, index, node, eOpts);
    },
    assignProductId: function(gridStore,selectedRec) {
        var prevRowIdx = gridStore.indexOf(selectedRec) - 1;
        if(prevRowIdx >=0){
            var prevRec = gridStore.getAt(prevRowIdx);
            selectedRec.set('column_4_02',prevRec.data.column_4_02);
        }
    },
    updateStatus : function(text,file_id){
        var  me =  this;
        data =  [{'file_status':text,'file_id':file_id}];
        params = JSON.stringify(data);
        Ext.Ajax.request({
            url: 'bizlayer/file/gridUpdate',
            method: 'POST',
            params:{
                'data' : params
            },
            success:function(resp){
                //need not to do anything 
            }
        });
    },
    showWindow : function(fileSrc){
        var name  =  'File  Window';
        window.open(fileSrc,name,'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=640,height=480');
    },
    hasDuplicateRecord: function(store,selectedRecord,record){
        var index = store.findBy(function(rec,id){
                if(rec.id != this.selectedRec.id 
                   // && rec.data.column_2_06 == this.record.data.column_5_05 
                    && rec.data.product_id == this.record.data.id
                    && rec.data.column_2_27 == this.record.data.column_5_16
                     && rec.data.supplier_id == this.record.raw.supplier_id){
                        return true;
                }
                    
            },{selectedRec : selectedRecord , record: record});
        return index;
    },
    hasDuplicateRecord1: function(store,selectedRecord,record){
        var index = store.findBy(function(rec,id){

                    if(rec.id != this.selectedRec.id 
                        && (rec.data.column_2_06 == this.selectedRec.data.column_2_06
                            && rec.data.column_2_27 != this.record.data.name)){
                        console.log(1);
                    }else if (rec.id != this.selectedRec.id && 
                        (rec.data.column_2_06 != this.selectedRec.data.column_2_06
                            && rec.data.column_2_27 == this.record.data.name)){
                        console.log(2);
                    } 
                    else if(rec.id != this.selectedRec.id 
                        && rec.data.column_2_06 == this.selectedRec.data.column_2_06 
                        && rec.data.column_2_27 == this.record.data.name
                         && rec.data.supplier_id == this.selectedRec.raw.supplier_id){
                            return true;
                    }else{
                        console.log(1234);
                    }
                    
            },{selectedRec : selectedRecord , record: record});
        return index;
    },
    onGridItemClick : function(grid, record,item,index,e,eOpts){
        var me = this,
            absCmp = me.controller.absCmp,
            gridStore = grid.getStore(),
            compulsaryCol;

        if(grid.panel.itemId=='entryDetailGrid'){
            compulsaryCol = "column_2_08";//absCmp.is_bill_order == 1 ? 'column_2_08' : 'column_4_04';
            if(e.getTarget('.icons-delete')){
                if(Ext.isEmpty(record.data[compulsaryCol])){
                    gridStore.remove(record);
                    if(gridStore.count() == 0){
                        me.controller.addBlankRecord(gridStore);
                    }
                    else{
                        me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
                    }
                    return;
                }
                else{
                    Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o) {
                        if(o=="yes") {
                            record.set('delete_flg',1);
                            gridStore.remove(record);
                            if(gridStore.count() == 0){
                                me.controller.addBlankRecord(gridStore);
                            }
                            else{
                                me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
                            }
                        }
                    });
                }
            }
            else if(e.getTarget('.icons-insert-row')){
                me.controller.addBlankRecord(gridStore,null,index);
                grid.refresh();
            }
            else{
                // me.loadItemSupplierGrid(record,compulsaryCol);
            }
        }
        else if(grid.panel.isTabGrid == 1){

        }
    },
    onGridSelectionChange: function(selModel,records,eOpts) {
        var me = this,
            absCmp = me.controller.absCmp,
            compulsaryCol;
        if(selModel.view.panel.itemId=='entryDetailGrid'){
            compulsaryCol = absCmp.is_bill_order == 1 ? 'column_2_08' : 'column_4_04';
        }
    },
    
    onEntryDetailGridStoreDataChanged: function(store) {
        if(store.count()>5){
            var me = this,
                ctrl = me.controller,
                absCmp = ctrl.absCmp,
                grid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
                parentCnt = grid.up('container'),
                gridHeaderHeight = grid.headerCt.gridDataColumns[0].getHeight() || 29,
                rowHeight = 30,
                scrollBarHeight = /*absCmp.is_bill_order == 1 ? 0 :*/ 17,
                newHeight = gridHeaderHeight + (rowHeight * store.count()) + scrollBarHeight; 
            Ext.defer(function() {
                var editPlugin = grid.editingPlugin,
                    record = grid.getSelectionModel().getSelection()[0];
                    colIdx = !Ext.isEmpty(editPlugin.context) ? (editPlugin.context.colIdx) : -1;
                parentCnt.setHeight(newHeight);
                // active Editor's focus being lost after height auto calculation
                if(colIdx >= 0)
                    editPlugin.startEdit(record,colIdx);
            },100);
        }
    },
    onEntryDetailGridStoreUpdate : function( store, record, operation, modifiedFieldNames, eOpts){
        var me = this,
            modifiedFldName = modifiedFieldNames[0],
            absCmp = me.controller.absCmp, 
            grid =  absCmp.query('grid[itemId=entryDetailGrid]')[0],
            selectedRec  = grid.getSelectionModel().getSelection()[0],
            rowIdx = store.indexOf(record) + 1;

        if(modifiedFldName == 'column_2_26'){
            /*Do nothing.*/
            return;
        }
        /*
        * @column_2_08 for order master entry
        */
        else if(modifiedFldName == "column_2_08"){
            var compulsaryCol = modifiedFldName;
            if(Ext.isEmpty(record.data[compulsaryCol])){
                me.mapEntryGridRecords(record,[],grid,absCmp.is_bill_order);
                me.mapBatchDetailToEntryGridRecords(selectedRec,{data:[]},grid);
            }
            else{
                // Set Display Order
                var displayOrderCol = 'column_2_26';
                record.set(displayOrderCol,rowIdx);
                me.addNewBlankRecIfLastRow(store,compulsaryCol);
            }
        }
        /*
        * @column_2_15::qty
        * @column_2_14::rate
        */
        else if(modifiedFldName == "column_2_14" || modifiedFldName == "column_2_15" || modifiedFldName == "column_2_17"  || modifiedFldName == "column_2_18"){
            me.calculateOrderGridTotal(record,grid);
        }
    },
    calculateOrderGridTotal: function(record,grid){
        var me          = this,
            data        = record.data,
            absCmp      = me.controller.absCmp,
            tax         = 0,
            subTotal    = 0,
            total       = 0,
            price       = 0,
            taxRate     = 0,
            price       = 0,
            taxPercent  = parseInt(Ext.LANG.defaultValues.taxValue || 0);

        discount    = parseInt(record.data.column_2_17 || 0);
        total       = parseInt(record.data.column_2_14 || 0) * parseInt(record.data.column_2_15 || 0);
        taxRate     = (100 + taxPercent) / 100;
        price       = parseInt(total/taxRate);
        tax         = total - price;
        record.set({
            column_2_31 : price,
            column_2_18 : tax,
            column_2_19 : total
        });
        me.calculateBillAmount();
    },
    calculateBillAmount: function() {
        var me       = this,
            absCmp   = me.controller.absCmp,
            form     = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm      = form.getForm(),
            records  = absCmp.query('grid[itemId=entryDetailGrid]')[0].getStore().getRange(),
            paramObj = {},
            discount = 0,
            totalQty = 0,
            tax      = 0,
            totalAmt = 0,
            totalPrice = 0;
        
        for(var i=0;i<records.length;i++){
            totalQty += parseInt(records[i].data.column_2_15 || 0);
            totalAmt += parseInt(records[i].data.column_2_19 || 0);
            discount += parseInt(records[i].data.column_2_17 || 0);
            tax      += parseInt(records[i].data.column_2_18 || 0);
            totalPrice += parseInt(records[i].data.column_2_31 || 0);
        }

        paramObj = { 
            'dynamic_fields[column_1_32]' : totalQty,
            'dynamic_fields[column_1_33]' : totalAmt,
            'dynamic_fields[column_1_34]' : discount,
            'dynamic_fields[column_1_35]' : tax,
            'dynamic_fields[column_1_62]' : totalPrice
        };
        frm.setValues(paramObj);
        me.calculateTotal();
    },
    calculateTotal: function() {
        var me          = this,
            absCmp      = me.controller.absCmp,
            form        = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm         = form.getForm(),
            discount    = parseInt(absCmp.query('textfield[itemId=column_1_34]')[0].getValue() || 0),
            subTotal    = parseInt(absCmp.query('textfield[itemId=column_1_33]')[0].getValue() || 0),
            tax         = parseInt(absCmp.query('textfield[itemId=column_1_35]')[0].getValue() || 0),
            totalPayable = parseInt(absCmp.query('textfield[itemId=column_1_56]')[0].getValue() || 0),
            itemTax     = parseInt(absCmp.query('textfield[itemId=column_1_55]')[0].getValue() || 0);
            paymentAmt  = parseInt(absCmp.query('textfield[itemId=column_1_40]')[0].getValue() || 0);
            depositAmt  = parseInt(absCmp.query('textfield[itemId=column_1_37]')[0].getValue() || 0);
            paramObj    = {},
            totalTax    = 0,
            grandTotal  = 0,
            total       = 0,
            balance     = 0;
        totalTax = itemTax + tax;
        // tax = (subTotal - discount) * 0.08;
        // var balanceAmt = grandTotal - paymentAmt - depositAmt;
        total = (subTotal - discount);
        grandTotal = total + totalPayable;
        paramObj = { 
            // 'dynamic_fields[column_1_35]' : tax,
            'dynamic_fields[column_1_36]' : total,
            'dynamic_fields[column_1_58]' : discount,
            'dynamic_fields[column_1_59]' : totalTax,
            'dynamic_fields[column_1_60]' : grandTotal,
        };
        if(absCmp.is_bill_order==1)
        {
            balance = totalPayable - paymentAmt - depositAmt;
            paramObj['dynamic_fields[column_1_41]'] = balance;
        }
        else
        {   
            paramObj['dynamic_fields[column_1_40]'] = grandTotal;
        }
        frm.setValues(paramObj);
    },
    calculateBaseSize: function(){
         var me          = this,
            absCmp      = me.controller.absCmp,
            form        = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm         = form.getForm(),
            length      = parseInt(absCmp.query('textfield[itemId=column_1_63]')[0].getValue() || 0),
            width       = parseInt(absCmp.query('textfield[itemId=column_1_64]')[0].getValue() || 0),
            baseSize    = parseInt(length || 0) * parseInt(width || 0);
            frm.setValues({'dynamic_fields[column_1_65]':baseSize});
    },
    getGridSum: function(store,sumCol) {
        var sum = 0,
            records = store.getRange();
        for(var i=0;i<records.length;i++){
            sum += parseInt(records[i].data[sumCol] || 0);
        }
        return sum;
        
    },
    clearRecord: function(record) {
        var obj = {};
        for(var key in record.data){
            obj[key] = null;
        }
        record.set(obj);
    },
    setProductInfoToOrderDetailGrid: function(productData,grid,store,gridRecord){
        var me = this,
            absCmp= me.absCmp,
            editor = grid.editingPlugin.getActiveEditor(),
            activeField;
            if (editor){
            activeField = editor.field;
        }

        if(Ext.isEmpty(productData)){
            var storeFields = store.model.getFields(),
                fld;
            for(var i=0; i<storeFields.length;i++){
                fld = storeFields[i];
                if(fld['name']!="id")
                    gridRecord.data[fld['name']] = null;
            }
        }
        grid.reconfigure(store);
    },
    addNewBlankRecIfLastRow: function(store,compulsaryCol){
        var me = this,
            lastRec = store.last();
        if(Ext.isEmpty(lastRec) || !Ext.isEmpty(lastRec.data[compulsaryCol])){ //item_name
            me.controller.addBlankRecord(store);
        }
    },
    onGridCellBeforeEdit: function(editor,e){
        var absCmp = this.controller.absCmp,
            grid = e.grid,
            store = grid.getStore(),
            fld = e.field,
            record = e.record;
        /*Batch Detail CD*/
        if(fld == 'column_2_22'){
            var cb = e.column.editor,
                cbStore = cb.store,
                extraParams = cbStore.getProxy().extraParams || {};
            //if(!Ext.isEmpty(record.data.column_2_08)){
                extraParams['supplier_id'] = record.data.supplier_id;
                extraParams['product_code'] = record.data.column_2_06;
                extraParams['currency_type'] = record.data.column_2_27;
                extraParams['collection_store_id'] = absCmp.query('textfield[itemId=column_1_06]')[0].getValue();
                extraParams['forOrderMasterEntryPanel'] = 1;
                

                cbStore.getProxy().extraParams = extraParams;
                if(!cb.listeners.hasOwnProperty('beforequery')){
                    var beforequery = {
                            beforequery : function(qe){
                                delete qe.combo.lastQuery;
                            }
                    };
                    cb.listeners = Ext.Object.merge(cb.listeners,beforequery);
                }

           // }
           //commemt for  editor type combo to textfield;
           /* var editorxtype = e.record.data.column_2_07 == Ext.LANG.entryPanel.productType.product ? {xtype : 'combobox'} : {xtype: 'textfield'},
                newEditorConfig,newEditor;
                if(editorxtype.xtype != e.column.editor.xtype){
                    newEditorConfig = Ext.Object.merge(e.column.editor,editorxtype);
                    newEditor = Ext.create('Ext.grid.CellEditor', {
                                    field: newEditorConfig
                                });
                    e.column.setEditor(newEditor);
                }*/
        }
        /*Product Name*/
        else if(fld == 'column_2_08'){
            var cb = e.column.editor,
                cbStore = cb.store,
                extraParams = cbStore.getProxy().extraParams || {},
                collection_store_id = absCmp.query('textfield[itemId=column_1_06]')[0].getValue();

            extraParams['excludeEmptyStock'] = 1;
            //extraParams['product_type'] = record.data.column_2_07;
            if(collection_store_id != extraParams['collection_store_id'] )
            {
                extraParams['collection_store_id'] = collection_store_id; 
                cbStore.getProxy().extraParams = extraParams;
                grid.reload_prod_name_cbStore = true;
            }
            else{
                grid.reload_prod_name_cbStore = false;

            }
            if(extraParams['product_type'] != record.data.column_2_07 )
            {
                extraParams['product_type'] = record.data.column_2_07;
                cbStore.getProxy().extraParams = extraParams;
                grid.reload_prod_name_cbStore = true;
            }
            
            if(!cb.listeners.hasOwnProperty('beforequery')){
                var beforequery = {
                        beforequery : function(qe){ 
                            if(qe.combo.up('grid').reload_prod_name_cbStore){
                                delete qe.combo.lastQuery;
                            }
                        }
                };
                cb.listeners = Ext.Object.merge(cb.listeners,beforequery);
            }

            // Change Column Editor.
            var editorxtype = e.record.data.column_2_07 == Ext.LANG.entryPanel.productType.item ? {xtype: 'textfield'} :  {xtype : 'combobox'},
                newEditorConfig,newEditor;
                if(editorxtype.xtype != e.column.editor.xtype){
                    newEditorConfig = Ext.Object.merge(e.column.editor,editorxtype);
                    newEditor = Ext.create('Ext.grid.CellEditor', {
                                    field: newEditorConfig
                                });
                    e.column.setEditor(newEditor);
                }
        }
    },
    onGridCellValidateEdit : function(editor, e, eOpts) {
        var me = this,
            absCmp = me.controller.absCmp,
            grid = e.grid,
            store = grid.getStore(),
            record = e.record,
            fld = e.field,
            fldVal = e.value;
            if(fld == 'column_2_15')
            {
                return me.validateQuantityBalanceEntry(me,record,fldVal);
            }
    },
    validateQuantityBalanceEntry: function(me,record,fldVal)
    {
        var balanceAmt = record.data.column_2_30;
        if(fldVal>parseInt(balanceAmt))
        {
            me.controller.showToolBarMsg(Ext.LANG.entryPanel.invalidQuantity,false); 
            return false;
        }
        else
        {
            return true;
        }
    },
    onEntryDetailGridLoad: function(store) {
        this.addNewBlankRecIfLastRow(store,'column_2_08');
    },
    onScreenBBtnClick: function(btn) {
        var me = this,
            absCmp = me.controller.absCmp,
            screenBCnt = btn.up('container[screenContainer=true]'),
            flds = screenBCnt.query('textfield'),
            mapperArr = YBase.utility.DataMapperHelper.entryCompanyDataMapper,
            params = {},
            saveObj = {};
        for(var i =0;i<flds.length;i++){
            params[flds[i].name] = flds[i].getSubmitValue();
        }
        for(var key in mapperArr){
            // saveObj[mapperArr[key]] = params[key];
            var frmKey = 'dynamic_fields['+mapperArr[key]+']';
            saveObj[key] = params[frmKey];
        }

        Ext.Ajax.request({
            url : 'bizlayer/customer/saveClientInfo',
            params : {clientInfo: JSON.stringify(saveObj)},
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var itemId = 'column_1_16',
                        fld_B2 = absCmp.query('combobox[itemId='+itemId+']')[0],
                        fldB2Store = fld_B2.getStore();
                    fldB2Store.reload();
                }   
                else{
                }      
                me.controller.showToolBarMsg(resp.msg,resp.success); 
            },
        });

    },
    onGridRowDrop: function(node,data,overModel,dropPosition,eOpts) {
        var me = this,
            absCmp = me.controller.absCmp,
            gridView = data.view,
            gridStore = gridView.getStore(),
            compulsaryCol = 'column_4_04',
            displayOrderCol = absCmp.is_bill_order == 1 ? 'column_2_19' : 'column_4_19',
            selectedRec = gridView.getSelectionModel().getSelection()[0];
        me.reAssignDisplayOrder(gridStore,compulsaryCol,displayOrderCol);
        if(absCmp.is_bill_order == 0){
        
            me.reAssignProductId(gridStore);
            me.reComputeOtherProdTypeContent(gridStore);
        }
        gridView.refresh();
    },
    reAssignProductId: function(store) {
        var records = store.getRange(),
            productId = 0;
        for(var i=0;i<records.length;i++){
            if(records[i].data.column_4_21 == Ext.LANG.defaultValues.product){
                productId = records[i].data.column_4_02;
            }
            else{
                records[i].set('column_4_02',productId);
            }        
        }
    },
    reAssignDisplayOrder: function(store,compulsaryCol,displayOrderCol) {
        var records = store.getRange();
        for(var i=0;i<records.length;i++){
            if(!Ext.isEmpty(records[i].data[compulsaryCol])){
                records[i].set(displayOrderCol,(i+1));
            }
        }
    },
    init:function (controller) {
        var me = this;
        me.controller = controller;
        absCmp = me.absCmp = me.controller.absCmp;
        var entryDetailGridId = YBase.utility.EntryPanelHelper.entryDetailGridId,
            orderFileDataView = absCmp.query('dataview[itemId=orderFileDataView]')[0],
            entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            entryDetailGridStore,
            orderDetailStore = absCmp.tabGroupGridStore;

        if(!Ext.isEmpty(entryDetailGrid)){
            entryDetailGridStore= entryDetailGrid.getStore();
            absCmp.entryDetailGrid = entryDetailGrid;
            entryDetailGrid.view.on('drop',me.onGridRowDrop,me);
            entryDetailGridStore.on('datachanged',me.onEntryDetailGridStoreDataChanged,me);
            entryDetailGridStore.on('update',me.onEntryDetailGridStoreUpdate,me);
            entryDetailGridStore.on('beforeload',function(store, operation){
                operation.params = operation.params || {};
                var entry_id = me.absCmp.entry_id,
                    sortCol = me.absCmp.is_bill_order == 1 ? 'column_2_19' : 'column_4_19',
                    datagrid_id = 5;
                operation.params['entry_id'] = entry_id;
                operation.params['datagrid_id'] = datagrid_id;
                operation.params['forEntryPanel'] = 1;
                // operation.params['sort'] = JSON.stringify([{property: sortCol, direction: 'ASC'}]);
            });
            entryDetailGridStore.on('load',me.onEntryDetailGridLoad,me);

        }
        if(!Ext.isEmpty(orderFileDataView)){
            orderFileDataViewStore = orderFileDataView.getStore();
            orderFileDataViewStore.on('beforeload',function(store, operation){
                orderFileDataViewStore.getProxy().extraParams = {'ref_record_id':absCmp.entry_code};
            });
            orderFileDataViewStore.reload();

        }


        if(controller.isEventBinded === true){

        }
        else{
            var is_bill_order = controller.is_bill_order,
                selector = is_bill_order == 1 ? 'entryPanel[is_bill_order='+is_bill_order+']' : 'salesPanel',
                selectorObj = {};
            
            selectorObj[selector+" combobox[isDynamicFormFld=true], combobox[isTxtAreaCombo=true]"] = {
                'select': {
                    fn : me.onComboFormFieldSelect,
                    scope: me
                },
                'change': {
                    fn : me.onComboFormFieldChange,
                    scope: me
                }
            };

            selectorObj[selector+" textfield[isDynamicFormFld=true]"] = {
                'specialkey': {
                    fn : me.onFormFieldSpecialKey,
                    scope: me
                },
                'blur': {
                    fn : me.onFormFieldBlur,
                    scope: me
                }
            };

            // selectorObj[selector+" grid[isTabGrid=1]"] = {
            //     'itemclick':{
            //         fn : me.onGridItemClick,
            //         scope: me
            //     },
            // };

            selectorObj[selector+" grid[itemId=entryDetailGrid]"] = {
                'beforeedit': {
                    fn : me.onGridCellBeforeEdit,
                    scope: me
                },
                'validateedit': {
                    fn : me.onGridCellValidateEdit,
                    scope: me
                },
                'itemclick':{
                    fn : me.onGridItemClick,
                    scope: me
                },
                'selectionchange': {
                    fn : me.onGridSelectionChange,
                    scope : me
                }
                // 'change': {
                //     fn : me.onEditorComboChange,
                //     scope: me
                // }
            };

            selectorObj[selector+" grid[isScreenDatagrid=true] combobox"] = {
                'beforeselect': {
                    fn : me.onEditorComboBeforeSelect,
                    scope: me
                },
                'select': {
                    fn : me.onEditorComboSelect,
                    scope: me
                },
                'change': {
                    fn : me.onEditorComboChange,
                    scope: me
                },
                'expand': {
                    fn : me.onEditorComboExpand,
                    scope: me
                }
            };
            
            selectorObj[selector+" dataview[itemId=orderFileDataView]"] = {
                'itemclick':{
                    fn : me.onOrderFileViewClick,
                    scope: me
                },
                'itemupdate':{
                    fn : me.onOrderFileViewUpdate,
                    scope: me
                }
            };
            
            selectorObj[" menu[itemId=fileDataMenu] menuitem"] = {
                click:{
                    fn : me.onOrderFileMenuClick,
                    scope: me
                }
            };

            selectorObj[selector+" button[itemId=btn_B_client_info]"] = {
                click:{
                    fn : me.onScreenBBtnClick,
                    scope: me
                }
            };

            controller.control(selectorObj);
            // controller.control({
                
                
            //     // "grid[isScreenDatagrid=true]" : {
            //     //     'itemclick': {
            //     //         fn : me.onOrderDetailEntryGridItemClick,
            //     //         scope: me
            //     //     },
            //     //     'itemcontextmenu': {
            //     //         fn : me.onOrderDetailEntryGridItemContextMenu,
            //     //         scope: me
            //     //     }
            //     // },
            //     // "grid[isScreenDatagrid=true] gridview": {
            //     //     'beforedrop': {
            //     //         fn : me.onOrderDetailEntryGridBeforeDrop,
            //     //         scope: me
            //     //     }
            //     // },
                
                
               
            // });
            controller.isEventBinded = true;
        }
    }
});