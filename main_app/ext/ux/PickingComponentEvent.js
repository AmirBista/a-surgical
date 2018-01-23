Ext.define('Ext.ux.PickingComponentEvent', {
    alternateClassName: 'Ext.PickingComponentEvent',
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
        if(itemId == "column_9_18" ){
            me.mapCompanyRecords(absCmp,record[0],false);
            absCmp.supplier_id = record[0].data.id;
            absCmp.supplierIDChanged = true;
            var purchaseEntry = absCmp.params.purchaseEntry == true ? '&purchaseEntry=true' : '';
            var route = absCmp.params.mode == 'new' ? 'SupplierEntryPanel/new?mode=new&supplier_id='+absCmp.supplier_id+purchaseEntry : 'SupplierEntryPanel/edit?id='+absCmp.entry_id+'&entry_code='+absCmp.entry_code+'&supplier_id='+absCmp.supplier_id+purchaseEntry+'&mode=edit',
                grid = absCmp.query('grid[itemId=entryDetailGrid]')[0];
            Ext.Router.redirect(route);
            grid.getStore().load({
                callback: function(records, operation, success) {
                    if(absCmp.params.mode == "edit"){
                        for(var i=0;i<records.length;i++){
                            records[i].setDirty(true);
                        }
                    }
                }
            });
        }
        else if(itemId == "column_9_30"){
            if(fldValue == Ext.LANG.defaultValues.b_fld){
                me.mapScreenBToScreenD(absCmp);
            }
        }
    },
    onComboFormFieldChange: function(fld, newValue,oldValue) {
        var me = this,
            absCmp = me.controller.absCmp,
            fldValue = fld.getValue(),
            itemId = fld.itemId;
        
        if(Ext.isEmpty(newValue)){
            if(itemId == "column_1_18"){
                 /*B2:: Company Name*/
                me.mapCompanyRecords(absCmp,[],false);
            }
        }
    },
    onFormDateFieldSelect: function(fld,value) {
        var me = this,
            absCmp = me.controller.absCmp,
            itemId = fld.itemId;
        if(itemId == 'column_15_04'){
            var entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
                pickingAllOrderMasterGrid = absCmp.query('grid[itemId=picking_all_order_master_grid]')[0],
                pickingSelectedOrderMasterGrid = absCmp.query('grid[itemId=picking_selected_order_master_grid]')[0],
                pickingOrderDetailGrid = absCmp.query('grid[itemId=picking_order_detail_grid]')[0];
            entryDetailGrid.getStore().reload();
            pickingAllOrderMasterGrid.getStore().reload();
            pickingSelectedOrderMasterGrid.getStore().removeAll();
            pickingOrderDetailGrid.getStore().removeAll();
        }
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
            haltPartialSave = false;

        if(!Ext.isEmpty(fld.getValue()) && fld.getValue()!=absCmp.oldFldValues[itemId]){
            
        }
    },
    onEditorComboAfterRender: function(combo) {
        var me = this,
            grid = combo.up('grid'),
            selectedRec = grid.getSelectionModel().getSelection()[0],
            itemId = combo.itemId;
        if(itemId == "column_12_50265"){
            var el = combo.getEl();
            el.on('click',function(e,t){
                if(e.getTarget('.ext-ux-clearbutton')){
                    var me = this;
                    me.setPurchaseDetailInEntryDetailGrid(grid.getStore(),selectedRec,true);
                    me.clearPurchaseDetailRecord(selectedRec);
                }
            },me);
        }
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
        if(itemId == "column_10_653"){
            index = me.hasDuplicateRecord(gridStore,selectedRec,record,'column_10_03');
            if(index!=-1){
                me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.duplicateEntry,false); 
                return false;
            }
        }
        else if(itemId == "column_12_50265"){
            /* @Deduct purchase_qty, purchase_amt, and recalcuate purchase rate */
            if(!Ext.isEmpty(selectedRec.data.column_12_03)){
                me.setPurchaseDetailInEntryDetailGrid(gridStore,selectedRec,true); 
            }
        }
    },
    /*
    * @ OrderDetailEntryGrid Combo Editor Select Fx.
    */
    onEditorComboSelect : function(combo,record){
        var me = this,
            absCmp = me.controller.absCmp,
            grid = combo.up('grid'),
            gridStore = grid.getStore(),
            selectedRec  = grid.getSelectionModel().getSelection()[0],
            itemId = combo.itemId,
            comboVal = combo.getValue(),
            compulsaryCol = 'column_10_03';
        /*
        * Product Name
        * column_10_653:: entry_detail_grid
        * column_12_50265 :: purchase_detail_grid
        */
        if(itemId == "column_10_653" || itemId == "column_12_50265"){
            var isEntryGrid = itemId == "column_10_653" ? 1 : 0,
                compulsaryCol = isEntryGrid == 1 ? 'column_10_03' : 'column_12_03';
            me.mapEntryGridRecords(selectedRec,record[0].raw,grid,compulsaryCol,isEntryGrid);
            if(itemId == "column_12_50265"){
                /* @Recompute purchase record data */
                me.setPurchaseDetailInEntryDetailGrid(gridStore,selectedRec,false);
                var entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0]; 
                // me.addNewBlankRecIfLastRow(entryDetailGrid.getStore(),'column_10_03');   
            }
            // if(isEntryGrid == 0){
                me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
            // }
        }
         
    },
    onEditorComboChange: function(combo,newValue,oldValue){
        var me =this,
            absCmp = me.controller.absCmp,
            itemId= combo.itemId; 
        // if(itemId == "column_2_04"){
        //     if(Ext.isEmpty(newValue) && !Ext.isEmpty(oldValue)){
        //         var grid = combo.up('grid');
        //         grid.oldItemNameValue = oldValue;
        //     }
        // }
    },
    clearPurchaseDetailRecord: function(record) {
        var obj = {
            column_12_03 : '',
            column_12_04 : '',
            column_12_05 : '',
            column_12_06 : '',
            column_12_07 : '',
            column_12_08 : '',
            column_12_09 : '',
            product_id   : ''
        };
        record.set(obj);
    },
    hasDuplicateRecord: function(store,selectedRecord,record,compulsaryCol){
        var index = store.findBy(function(rec,id){
                    if(rec.id != this.selectedRec.id && rec.data[this.compulsaryCol] == this.record.data.column_5_03)
                        return true;
            },{selectedRec : selectedRecord , record: record,compulsaryCol: compulsaryCol});
        return index;
    },
    mapEntryGridRecords: function(record,data,grid,compulsaryCol,isEntryGrid){
        var mapperArr = isEntryGrid == 1 ? YBase.utility.DataMapperHelper.purchaseOrderProductsDataMapper : YBase.utility.DataMapperHelper.purchaseOrderProductsDataMapper;
        this.mapToEntryGrid(record,data,grid,mapperArr);
    },
    mapCompanyRecords: function(absCmp,record,is_code){
        var me = this,
            mapperArr = YBase.utility.DataMapperHelper.getSupplierEntryCompanyDataMapper(),
            data = null;
        if(!Ext.isEmpty(record)){
            // data = is_code == true ? record.data : record[0].raw;
            data = record.data;
        }
        YBase.utility.EntryPanelHelper.mapRecords(absCmp,mapperArr,data);
        
        // absCmp.oldFldValues['column_1_17'] = !Ext.isEmpty(data) ? data['column_5_02'] : null;
        // absCmp.oldFldValues['column_1_18'] = !Ext.isEmpty(data) ? data['column_5_03'] : null;
        // absCmp.oldFldValues['column_1_19'] = !Ext.isEmpty(data) ? data['column_5_04'] : null;
    },
    mapScreenBToScreenD: function(absCmp) {
        var me = this,
            mapperArr = YBase.utility.DataMapperHelper.getSupplierScreenBToScreenDMapper(),
            data = me.getMapperData(absCmp,mapperArr);
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
    getMapperData : function(absCmp,mapperArr,clearFld) {
        var form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frmValues = form.getValues(),
            data = {};
        for(var key in mapperArr){
            data[key] = clearFld == true ? null : frmValues['dynamic_fields['+key+']'];
        }
        return data;
    },
    recalculatePurchaseData: function(absCmp,purchaseGridStore,record) {
        var me = this;
        me.setPurchaseDetailInEntryDetailGrid(purchaseGridStore,record,true);
        me.calculateBillAmount();
    },
    addNewBlankRecIfLastRow: function(store,compulsaryCol,rowIdx){
        var me = this,
            lastRec = store.last();
        if(!Ext.isEmpty(lastRec.data[compulsaryCol])){ //item_name
            me.controller.addBlankRecord(store,null,rowIdx);     
        }
    },
    calculateNetOrderedQty: function(record,orderedQty) {
        var oldOrderedQty = record.data.column_10_05,
            newOrderedQty = orderedQty,
            changedQty = newOrderedQty - oldOrderedQty;
        if(changedQty != 0)
            record.set('column_10_06',changedQty);
    },
    validatePurchaseQty: function(absCmp,purchaseStore,purchaseRec,purchasedQty) {
        var entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            entryDetailStore = entryDetailGrid.getStore(),
            entryCollection = entryDetailStore.query('product_id',purchaseRec.data.product_id),
            purchaseCollection = purchaseStore.query('product_id',purchaseRec.data.product_id),
            entryRecords = entryCollection.getRange(),
            purchaseRecords = purchaseCollection.getRange(),
            purchasedQtyTotal = 0;
            orderedQtyTotal = 0,
            isValid = true;

        for(var i =0;i<entryRecords.length;i++){
            orderedQtyTotal += parseInt(entryRecords[i].data.column_10_04 || 0);    
        }

        for(var i =0;i<purchaseRecords.length;i++){
            if(purchaseRec.id == purchaseRecords[i].id){
                purchasedQtyTotal += parseInt(purchasedQty || 0);    
            }
            else{
                purchasedQtyTotal += parseInt(purchaseRecords[i].data.column_12_05 || 0);    
            }
        }
        if(orderedQtyTotal < purchasedQtyTotal)
            isValid = false;
        return isValid;
    },
    onGridItemClick : function(grid, record,item,index,e,eOpts){
        var me = this,
            absCmp = me.controller.absCmp,
            gridStore = grid.getStore(),
            gridItemId = grid.panel.itemId,
            isEntryGrid = gridItemId =='entryDetailGrid' ? true : false,
            compulsaryCol;
        compulsaryCol = isEntryGrid ? 'column_10_03' : 'column_12_03';
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
                        if(isEntryGrid == false){
                            me.recalculatePurchaseData(absCmp,gridStore,record);
                        }
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
        else{
            
        }
    },
    onGridCellBeforeEdit: function(editor,e){
        var absCmp = this.controller.absCmp,
            grid = e.grid,
            store = grid.getStore(),
            record = e.record,
            fld = e.field;
        if(grid.itemId == 'purchase_entry_detail_grid'){
            if(record.data.column_12_11 == '1')
                return false;
        }
        else if(grid.itemId == 'entryDetailGrid'){
            if(absCmp.params.purchaseEntry == true){
                // return false;
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
        /*Ordered Qty*/
        if(fld == 'column_10_04'){
            me.calculateNetOrderedQty(record,fldVal);
        }
        else if(fld == 'column_12_05'){
            var isValid = me.validatePurchaseQty(absCmp,store,record,fldVal);
            grid.isPurchaseQtyValid = isValid;
            if(!isValid){
                Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.purchaseQtyExceedsOrderedQtyConfirm,function(btn){
                    if(btn == 'yes'){
                        grid.isPurchaseQtyValid = true;
                        record.set('column_12_05',fldVal);
                    }
                });
                return false;
            }
        }
        /*Packing Qty::Picking Order Detail Grid*/
        else if(fld == 'column_2_25'){
            if(parseInt(fldVal || 0) > parseInt(record.data.column_2_05 || 0)){
                me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.packingQtyExceeded,false); 
                return false;
            }
        }
    },
    onGridSelectionChange : function(selModel,selected,eOpts) {
        if(Ext.isEmpty(selected))
            return;

        var me = this,
            absCmp = me.controller.absCmp,
            grid = selModel.view.panel,
            gridItemId = grid.itemId;
        if(gridItemId == 'entryDetailGrid'){
            var orderMasterGrid = absCmp.query('grid[itemId=picking_selected_order_master_grid]')[0];
            orderMasterGrid.getStore().reload();
        }
        else if(gridItemId == 'picking_selected_order_master_grid' || gridItemId == 'picking_all_order_master_grid'){
            var orderDetailGrid = absCmp.query('grid[itemId=picking_order_detail_grid]')[0],
                orderDetailGridStore = orderDetailGrid.getStore(),
                selectedRec = selected[0],
                extraParams = orderDetailGridStore.getProxy().extraParams || {},
                entry_id = gridItemId == 'picking_selected_order_master_grid' ? selectedRec.raw.id : selectedRec.raw.order_master_id;
            extraParams['entry_id'] = entry_id;
            orderDetailGridStore.getProxy().extraParams = extraParams;
            orderDetailGrid.getStore().reload();
        }
        
    },
    onEntryDetailGridStoreDataChanged: function(store) {
        if(store.count()>4){
            var me = this,
                ctrl = me.controller,
                absCmp = ctrl.absCmp,
                grid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
                parentCnt = grid.up('container'),
                gridHeaderHeight = grid.headerCt.gridDataColumns[0].getHeight() || 29,
                gridActionBtnHeight = 0,//37,
                rowHeight = 30,
                scrollBarHeight = 17,
                newHeight = gridHeaderHeight + (rowHeight * store.count()) + scrollBarHeight + gridActionBtnHeight; 
            Ext.defer(function() {
                parentCnt.setHeight(newHeight);
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
        /*Changed Ordered Qty*/
        if(modifiedFldName == "column_10_06"){
            // record.setDirty(true);
        }
        /*
        * column_10_04:: Ordered Qty
        * column_10_12:: Ordered Rate*/
        else if(modifiedFldName == "column_10_04" || modifiedFldName == "column_10_12"){
            var orderedTotal = parseInt(record.data.column_10_04 || 0) * parseInt(record.data.column_10_12 || 0);  
            record.set('column_10_13',orderedTotal);
            me.calculateBillAmount();
        }
        /* Product Name */
        else if(modifiedFieldNames.indexOf("column_10_03") > -1){
            record.set('column_10_19',rowIdx);
            me.addNewBlankRecIfLastRow(store,modifiedFldName);
        }
        /* Purchased Qty */
        else if(modifiedFieldNames.indexOf("column_10_07") > -1){
            // NetPurchase = Total Purchased - Old Purchased
            var netPurchase = parseInt(record.data.column_10_07 || 0) - parseInt(record.data.column_10_15 || 0);
            record.set('column_10_16',netPurchase);

            if(record.data.column_10_07 > 0 && parseInt(record.data.column_10_07) > parseInt(record.data.column_10_04)){
                record.set('column_10_04',record.data.column_10_07);
                me.calculateNetOrderedQty(record,record.data.column_10_04);
            }
        }
    },
    onEntryDetailGridStoreBeforeLoad: function(store, operation) {
        operation.params = operation.params || {};
        var me = this,
            absCmp = me.controller.absCmp,
            entry_id = me.controller.absCmp.entry_id,
            mode = me.absCmp.params.mode;
        operation.params['entry_id'] = entry_id;
        if(mode == "new"){
            var fld_as4 = absCmp.query('datefield[itemId=column_15_04]')[0].getValue();
            operation.params['mode'] = 'new';
            operation.params['delivery_date'] = Ext.Date.format(fld_as4,'Y-m-d');
            operation.params['forPickingEntry'] = 1;
            operation.params['entry_id'] = entry_id;
        }
    },
    onEntryDetailGridStoreLoad: function(store, records){
        var me = this,
            absCmp = me.controller.absCmp;
        if(absCmp.params.mode == 'new'){
            for(var i=0;i<records.length;i++){
                records[i].set('column_16_19',(i+1));
                records[i].setDirty(true);
            }
        }
        // me.controller.addBlankRecord(store);
    },
    onOrderMasterAllGridStoreBeforeLoad:function(store,operation) {
        operation.params = operation.params || {};
        var me = this,
            absCmp = me.controller.absCmp,
            entry_id = me.controller.absCmp.entry_id,
            mode = me.absCmp.params.mode,
            fld_as4 = absCmp.query('datefield[itemId=column_15_04]')[0].getValue();
        operation.params['mode'] = mode;
        operation.params['forPickingEntry'] = 1;
        operation.params['entry_id'] = mode == 'new' ? null : entry_id;
        operation.params['delivery_date'] = Ext.Date.format(fld_as4,'Y-m-d');
    },
    onOrderMasterAllGridStoreLoad: function(store,records) {
        var me = this,
            absCmp = me.controller.absCmp;
        if(absCmp.params.mode == 'new'){
            for(var i=0;i<records.length;i++){
                // records[i].set('column_16_19',(i+1));
                records[i].setDirty(true);
            }
        }
    
        
    },
    onOrderMasterSelectedGridStoreBeforeLoad: function(store, operation) {
        operation.params = operation.params || {};
        var me              = this,
            absCmp          = me.controller.absCmp,
            entry_id = me.controller.absCmp.entry_id,
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            record          = entryDetailGrid.getSelectionModel().getSelection()[0],
            fld_as4 = absCmp.query('datefield[itemId=column_15_04]')[0].getValue(),
            mode = me.absCmp.params.mode;       
        operation.params['forPickingEntry'] = 1;
        operation.params['mode'] = mode;
        operation.params['picking_master_id'] = mode == 'new' ? null : entry_id;
        operation.params['delivery_date'] = Ext.Date.format(fld_as4,'Y-m-d');
        // if(mode == "new"){
            operation.params['product_id']      = record.data.product_id;
            operation.params['supplier_id']     = record.data.client_id;
        // }
    },
    onOrderMasterSelectedGridStoreLoad: function() {
        
    },
    orderDetailGridStoreBeforeLoad: function(store,operation) {
        operation.params = operation.params || {};
        var me     = this,
            absCmp = me.controller.absCmp,
            mode   = absCmp.params.mode;         
        operation.params['forPickingEntry'] = 1;
        operation.params['mode'] = mode;
    },
    orderDetailGridStoreLoad: function(store,records) {
        var me = this,
            absCmp = me.controller.absCmp,
            abstractStore = absCmp.abstractPickingOrderDetailStore;
        for(var i=0;i<records.length;i++){
            var rec = abstractStore.findRecord('id',records[i].data.id);
            if(!Ext.isEmpty(rec)){
                records[i].set(rec.data);
            }
        }
    },
    orderDetailGridStoreUpdate: function(store,record,operation,modifiedFieldNames,eOpts) {
        var me = this,
            modifiedFldName = modifiedFieldNames[0],
            absCmp = me.controller.absCmp, 
            grid =  absCmp.query('grid[itemId=picking_order_detail_grid]')[0],
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            entryDetailGridStore = entryDetailGrid.getStore(),
            abstractStore = absCmp.abstractPickingOrderDetailStore;
            rowIdx = store.indexOf(record) + 1;

        if(modifiedFldName == 'column_2_25'){
            var pickingStatusLang = Ext.LANG.pickingStatus,
                packingQty = parseInt(record.data[modifiedFldName] || 0),
                oldPackingQty = parseInt(record.data.column_2_28 || 0),
                netPackingQty = packingQty - oldPackingQty,
                // netPackingQty =  absCmp.params.mode == 'new' && record.raw.column_2_31 == 1 ? (packingQty + oldPackingQty) : (),
                totalPackedQty = 0;
            if(absCmp.params.mode == 'new'){
                if(record.raw.column_2_31 == 0){
                    totalPackedQty = packingQty;
                }
                else{
                    netPackingQty = packingQty;
                    totalPackedQty = oldPackingQty + packingQty;
                }
            }
            else{
                totalPackedQty = oldPackingQty + netPackingQty;
            }
            var packingStatus = (totalPackedQty == record.data.column_2_05) ? pickingStatusLang.allPacked : pickingStatusLang.partialPacked;

            // Set Total Packed Qty To Picking Entry Detail Grid.
            var index = entryDetailGridStore.findBy(function(rec,id) {
                    var record = this.record.data;
                    if(rec.data.product_id == record.column_2_02 && rec.data.client_id == record.column_2_20)
                        return true;
                
            },{record : record});
            if(index != -1){
                var entryDetailRecord = entryDetailGridStore.getAt(index),
                    changedPackingQty = parseInt(entryDetailRecord.data.column_16_12 || 0) + totalPackedQty - record.data.column_2_32;
                entryDetailRecord.set({'column_16_12' : changedPackingQty});
            }
            record.set({
                        'column_2_29': netPackingQty, 
                        'column_2_26': packingStatus,
                        'column_2_32': totalPackedQty
                    });
            
            var index = abstractStore.find('id',record.data.id);
            if(index == -1){
                abstractStore.add(record);
            }
            else{
                var rec = abstractStore.getAt(index);
                rec.set(record.data);
            }
        }
    },
    calculatePurchaseGridTotal: function(purchaseDetailStore,record) {
        var me = this,
            purchasedAmt = parseInt(record.data.column_12_05 || 0) * parseInt(record.data.column_12_06 || 0);
        record.set('column_12_07',purchasedAmt);
        me.setPurchaseDetailInEntryDetailGrid(purchaseDetailStore,record,false);
        me.calculateBillAmount();
    },
    setPurchaseDetailInEntryDetailGrid: function(purchaseDetailStore,record,isDeleteOp) {
        var me = this,
            absCmp = me.controller.absCmp,
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            entryDetailStore = entryDetailGrid.getStore(),
            purchaseRecords = purchaseDetailStore.query('product_id',record.data.product_id).getRange(),
            purchasedRate =0,purchasedAmt=0,purchasedQty = 0,
            latestPurchasedDate = null,
            purchasedDate;
        // Compute New Purchase Rate 
        for(var i=0;i<purchaseRecords.length;i++){
            if(isDeleteOp == true && purchaseRecords[i].data.column_12_01 == record.data.column_12_01){
                continue;
            }
            purchasedDate = Ext.Date.format(purchaseRecords[i].data.column_12_04,'Y-m-d');
            purchasedQty += parseInt(purchaseRecords[i].data.column_12_05 || 0);    
            purchasedAmt += parseInt(purchaseRecords[i].data.column_12_07 || 0);
            if(Ext.isEmpty(latestPurchasedDate)){
                latestPurchasedDate = purchasedDate;
                purchasedRate = purchaseRecords[i].data.column_12_06;
            }
            else if(purchasedDate > latestPurchasedDate){
                latestPurchasedDate = purchasedDate;
                purchasedRate = purchaseRecords[i].data.column_12_06;
            }  
        }

        var entryRec = entryDetailStore.findRecord('product_id',record.data.product_id),
            obj = {
                'column_10_07' : purchasedQty,
                'column_10_09' : purchasedAmt
            };

        /*
        * @IF RECORD NOT FOUND THEN ADD AS NEW RECORD
        */
        if(Ext.isEmpty(entryRec)){
            // entryRec = Ext.create(entryDetailStore.model);
            var lastRec = entryDetailStore.last();
            if(Ext.isEmpty(lastRec.data.column_10_03)){
                entryRec = lastRec;
            }
            else{
                entryRec = Ext.create(entryDetailStore.model);
                entryDetailStore.add(entryRec);
            }
            obj['product_id'] = record.data.product_id;     //Product ID
            obj['column_10_03'] = record.data.column_12_03; //Product Name
        }
        
        // if(isDeleteOp == true){
        //     obj['column_10_07'] = parseInt(entryRec.data.column_10_07 || 0) - parseInt(record.data.column_12_05 || 0); //purchased Qty
        //     obj['column_10_09'] = parseInt(entryRec.data.column_10_09 || 0) - parseInt(record.data.column_12_07 || 0);  //purchased Qty
        // }
        // else{
        //     obj['column_10_07'] = parseInt(entryRec.data.column_10_07 || 0) + parseInt(record.data.column_12_05 || 0); //purchased Qty
        //     obj['column_10_09'] = parseInt(entryRec.data.column_10_09 || 0) + parseInt(record.data.column_12_07 || 0);  //purchased Qty
        // }
        if(!Ext.isEmpty(purchasedRate)){
            obj['column_10_08']  = purchasedRate;
        }
        entryRec.set(obj);
    },
    calculateBillAmount: function() {
        var me = this,
            absCmp = me.controller.absCmp,
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            entryDetailStore = entryDetailGrid.getStore(),
            entryDetailRecords = entryDetailStore.getRange(),
            form = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = form.getForm(),
            obj = {},
            orderedQty=0,purchasedQty=0,orderedTotal=0,purchasedTotal=0;

        for(var i=0;i<entryDetailRecords.length;i++){
            orderedQty      += parseInt(entryDetailRecords[i].data.column_10_04 || 0); 
            orderedTotal    += parseInt(entryDetailRecords[i].data.column_10_13 || 0); 
            purchasedQty    += parseInt(entryDetailRecords[i].data.column_10_07 || 0); 
            purchasedTotal  += parseInt(entryDetailRecords[i].data.column_10_09 || 0); 
        }

        obj['dynamic_fields[column_9_44]'] = orderedQty;
        obj['dynamic_fields[column_9_45]'] = orderedTotal;
        obj['dynamic_fields[column_9_46]'] = purchasedQty;
        obj['dynamic_fields[column_9_47]'] = purchasedTotal;

        frm.setValues(obj);
        
    },
    init:function (controller) {
        var me = this;
        me.controller = controller;
        absCmp = me.absCmp = me.controller.absCmp;
        var entryDetailGridId = YBase.utility.EntryPanelHelper.entryDetailGridId,
            entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            orderMasterSelectedGrid = absCmp.query('grid[itemId=picking_selected_order_master_grid]')[0],
            orderMasterAllGrid = absCmp.query('grid[itemId=picking_all_order_master_grid]')[0],
            orderDetailGrid = absCmp.query('grid[itemId=picking_order_detail_grid]')[0],
            entryDetailGridStore,orderMasterSelectedGridStore,orderMasterAllGridStore,orderDetailGridStore;

        if(!Ext.isEmpty(entryDetailGrid)){
            entryDetailGridStore= entryDetailGrid.getStore();
            absCmp.entryDetailGrid = entryDetailGrid;
            // entryDetailGridStore.on('datachanged',me.onEntryDetailGridStoreDataChanged,me);
            entryDetailGridStore.on('update',me.onEntryDetailGridStoreUpdate,me);
            entryDetailGridStore.on('beforeload',me.onEntryDetailGridStoreBeforeLoad,me);
            entryDetailGridStore.on('load',me.onEntryDetailGridStoreLoad,me);
        }

        if(!Ext.isEmpty(orderMasterAllGrid)){
            orderMasterAllGridStore= orderMasterAllGrid.getStore();
            orderMasterAllGridStore.on('beforeload',me.onOrderMasterAllGridStoreBeforeLoad,me);
            orderMasterAllGridStore.on('load',me.onOrderMasterAllGridStoreLoad,me);
        }

        if(!Ext.isEmpty(orderMasterSelectedGrid)){
            orderMasterSelectedGridStore= orderMasterSelectedGrid.getStore();
            orderMasterSelectedGridStore.on('beforeload',me.onOrderMasterSelectedGridStoreBeforeLoad,me);
            // orderMasterSelectedGridStore.on('load',me.onOrderMasterSelectedGridStoreLoad,me);
        }

        if(!Ext.isEmpty(orderDetailGrid)){
            orderDetailGridStore= orderDetailGrid.getStore();
            orderDetailGridStore.on('update',me.orderDetailGridStoreUpdate,me);
            orderDetailGridStore.on('beforeload',me.orderDetailGridStoreBeforeLoad,me);
            orderDetailGridStore.on('load',me.orderDetailGridStoreLoad,me);
        }

        if(controller.isEventBinded === true){

        }
        else{
            var selector = controller.currentViewAlias,
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

            selectorObj[selector+" datefield[isDynamicFormFld=true]"] = {
                'select': {
                    fn : me.onFormDateFieldSelect,
                    scope: me
                },
            };

            // selectorObj[selector+" grid[isTabGrid=1]"] = {
            //     'itemclick':{
            //         fn : me.onGridItemClick,
            //         scope: me
            //     },
            // };

            // selectorObj[selector+" grid[itemId=entryDetailGrid]"] = {
            selectorObj[selector+" grid[isScreenDatagrid=true]"] = {
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
                    scope: me
                }
            };

            selectorObj[selector+" grid[isScreenDatagrid=true] combobox"] = {
                'afterrender' : {
                    fn : me.onEditorComboAfterRender,
                    scope : me
                },
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
                }
            };
            
            controller.control(selectorObj);
            
            controller.isEventBinded = true;
        }
    }
});