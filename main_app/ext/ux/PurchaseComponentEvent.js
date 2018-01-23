Ext.define('Ext.ux.PurchaseComponentEvent', {
    // extend:'YBase.controller.OrderMasterEntryController',
    alternateClassName: 'Ext.PurchaseComponentEvent',
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
         
        /*B2:: Supplier Name */
        if(itemId == "column_4_13"){
            if(!Ext.isEmpty(absCmp.customItemId) && absCmp.customItemId == "PurchaseEntryPanel"){
                var entryDetailGridStore = absCmp.query('grid[itemId=entryDetailGrid]')[0].getStore();
                    entryDetailGridStore.each(function(record){
                        if(!Ext.isEmpty(record.get('column_6_06'))){
                            record.setDirty(true);
                        }
                    });
            }
            me.mapCompanyRecords(absCmp,record,false);
        }
        //column_4_30 :: remarks combo
        else if(itemId == "combo_column_4_30")
        {
            var description = record[0].raw.description,
                parentCnt = fld.up('container'),
                textareaFld = parentCnt.query('textareafield[itemId=column_4_30]')[0];
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
            if(itemId == "column_4_13"){
                //B2:: Company Name
                me.mapCompanyRecords(absCmp,[],false);
                me.removeEntryDetailGridRec(me,absCmp);
            }
        }
        else{
            if(itemId == "column_4_13"){
               me.removeEntryDetailGridRec(me,absCmp);
            }
        }
    },
    removeEntryDetailGridRec: function(me,absCmp){
        var grid  = absCmp.query('grid[itemId=entryDetailGrid]')[0];
            store =  grid.getStore(),
            storeRecord = store.getRange();
            if(!Ext.isEmpty(storeRecord)){
                Ext.each(storeRecord, function(record) {
                        if(!Ext.isEmpty(record.get('product_id'))){
                        record.set({'delete_flg':1});
                        store.remove(record);
                    }
                });
            }
    },
    onFormFieldSpecialKey : function(fld, e){
        var me = this,
            absCmp = me.controller.absCmp,
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
            haltPartialSave = false;

        if(!Ext.isEmpty(fld.getValue()) && fld.getValue()!=absCmp.oldFldValues[itemId]){
            
        }
        // DISCOUNT
        if(itemId=='column_4_22'){
            me.calculateTotal();
        }else if(itemId == 'column_4_12'){
            var fldValue = fld.getValue();
            var params = {};
            params['supplier_code'] = fld.getValue();
            Ext.Ajax.request({
                url : 'bizlayer/supplier/getSupplierInfo',
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
            mapperArr = YBase.utility.DataMapperHelper.purchaseEntryCompanyDataMapper;
            data = null;
        if(!Ext.isEmpty(record))
            data = is_code == true ? record.data : record[0].raw;
        YBase.utility.PurchaseEntryPanelHelper.mapRecords(absCmp,mapperArr,data);
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
    mapEntryGridRecords: function(record,data,grid,is_bill_order){
        var mapperArr = YBase.utility.DataMapperHelper.purchaseOrderProductsDataMapper;
        this.mapToEntryGrid(record,data,grid,mapperArr);
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
        if(itemId == "column_6_457"){
            index = me.hasDuplicateRecord(gridStore,selectedRec,record,'column_6_06');
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
            compulsaryCol = 'column_6_07';
        /*
        * Product Name:: column_6_457
        */
        
        if(itemId == "column_6_457"){
            me.mapEntryGridRecords(selectedRec,record[0].raw,grid);
            me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
        }
    },
    onEditorComboChange: function(combo,newValue,oldValue){
        var me =this,
            absCmp = me.controller.absCmp,
            itemId= combo.itemId; 
        if(itemId == "column_6_07"){
            if(Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue)){
                var grid = combo.up('grid');
                grid.oldItemNameValue = oldValue;
            }
        }
    },
    onOrderFileViewClick: function(view, record, item, index, e, eOpts){
        var me =this,
            lang = Ext.LANG;
        if(e.getTarget('.show_drop_down')){
               var fileMenu = me.controller.fileMenuItems;
               fileMenu.dataViewConfig = {
                    view    : view, 
                    record  : record, 
                    item    : item, 
                    idx     : index, 
                    evt     : e
               };
               var status = record.get('file_status');
               if (Ext.isEmpty(status)){
                    status = lang.fileMenu.status;
               }
               fileMenu.query('menuitem[itemId=statusMenuItem]')[0].setText(status);
               fileMenu.showAt(e.getXY());
        }
    },
    onOrderFileViewUpdate: function(record, index, node, eOpts){
        var me = this,
            lang = Ext.LANG.globalLang,
            changed_file_name = record.data.original_file_name;
            if(Ext.isEmpty(record.modified.original_file_name)){
                return;
            }
            if(Ext.isEmpty(changed_file_name)){
                 Ext.Msg.show({
                        title:lang.app.appTitle,
                        msg: lang.errorMsg.mandatoryField,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                });
                return;
            }
            else{
                var fileName = changed_file_name.indexOf('.'),
                    newFileName = '';
                if(fileName<0){
                    newFileName = changed_file_name+'.'+record.data.extension;
                }
                else if(fileName>0){
                    fileExtension = changed_file_name.substr(changed_file_name.lastIndexOf('.'));
                    oldFileExtension = '.'+record.data.extension;
                    if(fileExtension == oldFileExtension){
                        newFileName = changed_file_name;
                    }
                    else{
                        newFileName = changed_file_name+'.'+record.data.extension;
                    }
                }
            }
            record.data.original_file_name = newFileName;
            data = [],
            data.push(record.data);
            changeFileData =JSON.stringify(data);
            Ext.Ajax.request({
                        url: 'bizlayer/file/gridUpdate',
                        method: 'POST',
                        params:{
                            'data' : changeFileData
                        },
                        success:function(resp){
                            //need not to do anything 
                        }
                    });
    },
    onOrderFileMenuClick:  function(item){
        var me = this,
            ctrl = me.controller,
            text = item.text,
            lang = Ext.LANG,
            iconCls = item.iconCls,
            dataViewConfig = ctrl.fileMenuItems.dataViewConfig,
            record =  dataViewConfig.record,
            file_id = record.data.file_id,
            fileSrc =  Ext.String.format('bizlayer/file/renderImg?file_path='+record.raw.file_path+'');
        if(iconCls =='close_icon'){
            Ext.MessageBox.confirm(lang.globalLang.app.appTitle, lang.globalLang.alertMsg.deleteRecord, function(btn) {
                if (btn == 'yes') {
                    var fileStore =  absCmp.query('dataview[itemId=orderFileDataView]')[0].getStore();
                    ref_record_id =  record.raw.ref_record_id;
                    record.set({delete_flg:1,ref_record_id:ref_record_id});
                    fileStore.remove(record);
                    deleteRec = [];
                    deleteRec.push(record.data);
                    deleteRec = JSON.stringify(deleteRec);
                    Ext.Ajax.request({
                        url: 'bizlayer/file/gridUpdate',
                        method: 'POST',
                        params:{
                            data : deleteRec
                        },
                        success: function(response) {
                        }
                    });
                }
            });
        }
        else if(iconCls =='icon_view'){
            var extension = record.data.extension;
            if(extension=='jpg' || extension=='png' || extension=='jpeg'|| extension=='bmp' ||  extension=='gif' ||  extension=='tiff'  || extension=='tif'){
                 me.showWindow(fileSrc);
                //me.controller.getController('FileViewController').openSrcView(fileSrc);
            }
            else if(extension=='pdf'){
                me.showWindow(fileSrc);
            }
            else{
                Ext.Msg.show({
                        title:lang.globalLang.app.appTitle,
                        msg: lang.globalLang.alertMsg.invalidExtension,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                });
            }
        }
        else if(iconCls =='icon_download'){
            var link =  Ext.String.format(fileSrc+'&action=download');
            window.open(link,'_self');
        }
        else if(iconCls =='icon_edit'){
            // editor=dataview.getPlugin();
            // item = dataview.findItemByChild(target);
            // record = dataview.store.getAt(dataview.indexOf(item));
            // editor.startEdit(target, record.data[me.dataIndex]);
           // dataview.fireEvent('itemclick',dataview, record, dataViewConfig.item, dataViewConfig.idx, dataViewConfig.evt);
        }
        else if(iconCls =='file_status1'){
            record.set({'file_status':text});
            //dataview.refresh();
            me.updateStatus(text,file_id);
           // item.ownerCt.ownerItem.setText(text);
        }
        else if(iconCls =='file_status2'){
            record.set({'file_status':text});
            //dataview.refresh();
            me.updateStatus(text,file_id);
           // item.ownerCt.ownerItem.setText(text);
        }
        else if(iconCls =='file_status3'){
            record.set({'file_status':text});
           // dataview.refresh();
            me.updateStatus(text,file_id);
           // item.ownerCt.ownerItem.setText(text);
        }
        else if(iconCls=='icon_filemanage'){
            var params = {};
                params['order_code'] = me.absCmp.entry_code,
                win =  Ext.create('YBase.view.FileManageWindow',{
                params:  params,
                closeAction : 'destroy',
                modal : true
            });
            win.show();
        }
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
    hasDuplicateRecord: function(store,selectedRecord,record,compulsaryCol){
        var index = store.findBy(function(rec,id){
                    // if(rec.id != this.selectedRec.id && rec.data[this.compulsaryCol] == this.record.data.column_5_05)
                    //     return true;
                    if(!Ext.isEmpty(rec.data.product_id)){
                        if(rec.id != this.selectedRec.id 
                            && rec.data.product_id == this.record.data.id //&& rec.data.column_6_06 == this.record.data.column_5_05 
                            && rec.data.column_6_10 == this.record.data.column_5_16
                            ){
                            return true;
                        }
                    }
                    else{
                        if(rec.id != this.selectedRec.id 
                            && rec.data.column_6_06 == this.record.data.column_5_05 
                            && rec.data.column_6_07 == this.record.data.column_5_07
                            ){
                            return true;
                        }
                    }
                    
            },{selectedRec : selectedRecord , record: record,compulsaryCol: compulsaryCol});
        return index;
    },
    onGridItemClick : function(grid, record,item,index,e,eOpts){
        var me = this,
            absCmp = me.controller.absCmp,
            gridStore = grid.getStore(),
            compulsaryCol;

        if(grid.panel.itemId=='entryDetailGrid'){
            compulsaryCol = "column_6_07";//absCmp.is_bill_order == 1 ? 'column_6_07' : 'column_4_04';
            if(e.getTarget('.icons-delete')){
                if(Ext.isEmpty(record.data[compulsaryCol])){
                    gridStore.remove(record);
                    me.calculateBillAmount();
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
                            me.calculateBillAmount();
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
            compulsaryCol = absCmp.is_bill_order == 1 ? 'column_6_07' : 'column_4_04';
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

        if(modifiedFldName == 'column_6_16'){
            /*Do nothing.*/
            return;
        }
        /*
        * @column_6_07 for order master entry
        */
        else if(modifiedFldName == "column_6_07"){
            var compulsaryCol = modifiedFldName;
            if(Ext.isEmpty(record.data[compulsaryCol])){
                //me.mapEntryGridRecords(record,[],grid,absCmp.is_bill_order);
            }
            else{
                // Set Display Order
                var displayOrderCol = 'column_6_16';
                record.set(displayOrderCol,rowIdx);
                me.addNewBlankRecIfLastRow(store,compulsaryCol);
            }
        }
        /*
        * @column_6_08::qty
        * @column_6_09::rate
        */
        else if(modifiedFldName == "column_6_09" || modifiedFldName == "column_6_08" || modifiedFieldNames.indexOf("column_6_10")!= -1 ){
            me.calculateOrderGridTotal(record,grid);
        }
    },
    calculateOrderGridTotal: function(record,grid){
        var me = this,
            data = record.data,
            absCmp = me.controller.absCmp,
            total = 0;
        
        total = parseInt(record.data.column_6_08 || 0) * parseInt(record.data.column_6_09 || 0);
        record.set('column_6_11',total);
         
        me.calculateBillAmount();
    },
    calculateBillAmount: function() {
        var me = this,
            absCmp = me.controller.absCmp,
            form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = form.getForm(),
            records = absCmp.query('grid[itemId=entryDetailGrid]')[0].getStore().getRange(),
            paramObj= {},
            totalQty = 0,
            totalAmt = 0,
            totalAmt_USD = 0,
            totalAmt_JY = 0,
            totalAmt_SGD = 0;
        
        for(var i=0;i<records.length;i++){
            totalQty += parseInt(records[i].data.column_6_08 || 0);
            totalAmt += parseInt(records[i].data.column_6_11 || 0);
            totalAmt_USD += records[i].data['column_6_10'] == Ext.LANG.defaultValues.currencyType.usd ? parseInt(records[i].data.column_6_11 || 0) : 0;
            totalAmt_JY  += records[i].data['column_6_10'] == Ext.LANG.defaultValues.currencyType.yen ? parseInt(records[i].data.column_6_11 || 0) : 0;
            totalAmt_SGD += records[i].data['column_6_10'] == Ext.LANG.defaultValues.currencyType.sgd ? parseInt(records[i].data.column_6_11 || 0) : 0;
        }

        paramObj = { 
            'dynamic_fields[column_4_20]' : totalQty,
            'dynamic_fields[column_4_31]' : totalAmt_USD,
            'dynamic_fields[column_4_32]' : totalAmt_JY,
            'dynamic_fields[column_4_33]' : totalAmt_SGD,
        };
        frm.setValues(paramObj);
        me.calculateTotal();
    },
    calculateTotal: function() {
        var me = this,
            absCmp = me.controller.absCmp,
            form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = form.getForm(),
            // discount = parseInt(absCmp.query('textfield[itemId=column_4_22]')[0].getValue() || 0),
            // subTotal = parseInt(absCmp.query('textfield[itemId=column_4_21]')[0].getValue() || 0),
            paramObj = {},
            tax = 0,
            total = 0;
        
        // tax = (subTotal - discount) * 0.08;
        // total = (subTotal - discount) + tax;
        
        // paramObj = { 
        //     'dynamic_fields[column_4_23]' : tax,
        //     'dynamic_fields[column_4_24]' : total
        // };
        // frm.setValues(paramObj);
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
            fld = e.field;
        grid.oldProductName = e.value;
        //Product Name
        if(fld == 'column_6_07'){

            var cb = e.column.editor,
                cbStore = cb.store,
                extraParams = cbStore.getProxy().extraParams || {},
                supplier_id = absCmp.query('textfield[itemId=supplier_id]')[0].getValue();
                extraParams['forPurchasePanel'] = 1;
            if(supplier_id != ['supplier_id'] )
            {
                isSame = false;
                extraParams['supplier_id'] = supplier_id; 
                cbStore.getProxy().extraParams = extraParams;
                grid.is_supplier_changed = true;
            }
            else{
                grid.is_supplier_changed = false;

            }

            if(!cb.listeners.hasOwnProperty('beforequery'))
            {
                var beforequery = {
                        beforequery : function(qe){
                            if(qe.combo.up('grid').is_supplier_changed){
                                delete qe.combo.lastQuery;
                            }
                        }
                };
                cb.listeners = Ext.Object.merge(cb.listeners,beforequery);

            }

            

            // Change Column Editor.
            // var editorxtype = e.record.data.column_2_07 == Ext.LANG.entryPanel.productType.item ? {xtype: 'textfield'} :  {xtype : 'combobox'},
            //     newEditorConfig = Ext.Object.merge(e.column.editor,editorxtype);
            //     newEditor = Ext.create('Ext.grid.CellEditor', {
            //                     field: newEditorConfig
            //                 });
            //     e.column.setEditor(newEditor);

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
    },
    onEntryDetailGridLoad: function(store) {
        this.addNewBlankRecIfLastRow(store,'column_6_07');
    },
    onScreenBBtnClick: function(btn) {
        var me = this,
            absCmp = me.controller.absCmp,
            screenBCnt = btn.up('container[screenContainer=true]'),
            flds = screenBCnt.query('textfield'),
            mapperArr = YBase.utility.DataMapperHelper.purchaseEntryCompanyDataMapper,
            params = {},
            saveObj = {};
        if(Ext.isEmpty(screenBCnt.query('combobox[itemId=column_4_13]')[0].getValue())){
            me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.requiredFieldMissing,false); 
            return;
        }
        for(var i =0;i<flds.length;i++){
            params[flds[i].name] = flds[i].getSubmitValue();
        }
        for(var key in mapperArr){
            var frmKey = 'dynamic_fields['+mapperArr[key]+']';
            saveObj[key] = params[frmKey];
        }

        Ext.Ajax.request({
            url : 'bizlayer/supplier/saveSupplierInfo',
            params : {clientInfo: JSON.stringify(saveObj)},
            success : function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success){
                    var itemId = 'column_4_13',
                        fld_B2 = absCmp.query('combobox[itemId='+itemId+']')[0],
                        fldB2Store = fld_B2.getStore();
                    fldB2Store.reload();
                    absCmp.query('textfield[itemId=supplier_id]')[0].setValue(resp.supplier_id);
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
            displayOrderCol = absCmp.is_bill_order == 1 ? 'column_6_19' : 'column_4_19',
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
    onEditorComboTxtCleared : function(combo) {
        var me =this,
            absCmp = me.controller.absCmp,
            itemId= combo.itemId,
            grid = combo.up('grid'),
            gridStore = grid.getStore(),
            selectedRec  = grid.getSelectionModel().getSelection()[0];
        /*
        *@Product Detail Grid Product Name :: column_6_457
         */
        if(itemId == "column_6_457")
        {
            if(!Ext.isEmpty(grid.editingPlugin.activeEditor))
                grid.editingPlugin.activeEditor.completeEdit();
            if(!Ext.isEmpty(selectedRec))
            {
                if(itemId == "column_6_457"){
                    me.clearEntryDetailRecord(absCmp,gridStore,selectedRec,grid.oldProductName);
                }
               
            }
        }
        
    },
    clearEntryDetailRecord : function (absCmp,store,record,productName) {
        var me = this;
        record.set({
            'delete_flg' : 1,
            'column_6_07' : productName
        });
        store.remove(record);
        me.calculateBillAmount();
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
            // entryDetailGrid.view.on('drop',me.onGridRowDrop,me);
            entryDetailGridStore.on('datachanged',me.onEntryDetailGridStoreDataChanged,me);
            entryDetailGridStore.on('update',me.onEntryDetailGridStoreUpdate,me);
            entryDetailGridStore.on('beforeload',function(store, operation){
                operation.params = operation.params || {};
                var entry_id = me.absCmp.entry_id,
                    sortCol = 'column_6_19',
                    datagrid_id = 8;
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
                orderFileDataViewStore.getProxy().extraParams = {'ref_record_id':Ext.order_number};
            });
        }


        if(controller.isEventBinded === true){

        }
        else{
            var is_bill_order = controller.is_bill_order,
                selector = this.controller.currentViewAlias,
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
                'textCleared' :{
                    fn: me.onEditorComboTxtCleared,
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

            selectorObj[selector+" button[itemId=btn_B_supplier_info]"] = {
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