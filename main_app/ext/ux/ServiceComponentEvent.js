Ext.define('Ext.ux.ServiceComponentEvent', {
    // extend:'YBase.controller.OrderMasterEntryController',
    alternateClassName: 'Ext.ServiceComponentEvent',
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
    /*    if(itemId == "column_4_13"){
            if(!Ext.isEmpty(absCmp.customItemId) && absCmp.customItemId == "PurchaseEntryPanel"){
                var entryDetailGridStore = absCmp.query('grid[itemId=entryDetailGrid]')[0].getStore();
                    entryDetailGridStore.each(function(record){
                        if(!Ext.isEmpty(record.get('column_11_06'))){
                            record.setDirty(true);
                        }
                    });
            }
            me.mapCompanyRecords(absCmp,record,false);
        }*/

        /*order_code*/
        if(itemId == "column_10_06"){
            me.mapOrderCodeRecords(absCmp,record,false);
        }
        /* :: Customer  Name*/
        else if(itemId == "column_10_14"){
            me.mapCustomerRecords(absCmp,record,false);
            absCmp.customer_service_data = {
                'customer_code':  record[0].data['column_3_05'] || null,
                'is_freeFlag' : null,
                'usedService' :   record[0].data['column_3_24'] || null,
                'balanceService' :  record[0].data['column_3_25'] || null
            };
            me.calculateBalanceService(absCmp,record);
        }
        else if(itemId == "column_10_33"){
            //for  make  empty  deleted_customer_data 
            if(absCmp.params.mode =='edit'){
                if(!Ext.isEmpty(absCmp.deleted_customer_service_data) && record[0].data.name==Ext.LANG.serviceEntryPanel.isFree.no){
                    absCmp.deleted_customer_service_data =  null;
                }
            }
            me.calculateBalanceService(absCmp,record);
        }
    },
    onComboFormBeforeSelect: function(fld, record, index, eOpts){
        var me = this,
            absCmp = me.controller.absCmp,
            fldValue = fld.getValue(),
            itemId = fld.itemId,
            frm = fld.up('form').getForm(),
            frmValues = frm.getValues(),
            formfieldValues =  frm.getFieldValues();
        if(itemId == "column_10_14"){
            if(formfieldValues['dynamic_fields[column_10_33]']==Ext.LANG.serviceEntryPanel.isFree.no)
                absCmp.isFreeFlagOldValue =  null;

            if(absCmp.params.mode=='edit'){
                if(Ext.isEmpty(absCmp.deleted_customer_service_data)){
                    if(Ext.isEmpty(frmValues['dynamic_fields[column_10_13]'])){
                       frmValues =  absCmp.initialFormValues;
                    }
                    var is_freeFlag =  frmValues['dynamic_fields[column_10_33]'],
                        usedService = is_freeFlag==Ext.LANG.serviceEntryPanel.isFree.yes ? 1 : 0;
                            absCmp.deleted_customer_service_data = {
                                'customer_code':  frmValues['dynamic_fields[column_10_13]'] || null,
                                'is_freeFlag' : frmValues['dynamic_fields[column_10_33]']|| null,
                                'usedService' :  usedService,
                                'balanceService' :   frmValues['dynamic_fields[column_10_30]'] || null
                            };
                }
            }
        }
        else if(itemId == "column_10_33"){
             absCmp.isFreeFlagOldValue = fldValue;
        }
    },
    onComboFormFieldChange: function(fld, newValue,oldValue) {
        var me = this,
            absCmp = me.controller.absCmp,
            fldValue = fld.getValue(),
            itemId = fld.itemId;
        
        if(Ext.isEmpty(newValue)){
            if(itemId == "column_10_14"){
                //B2:: Company Name
                me.mapCustomerRecords(absCmp,[],false);
            }

            if(itemId == "column_10_06"){//Order Code
                me.mapOrderCodeRecords(absCmp,[],false);
            }
        }
        else{

        }
    },
    calculateBalanceService:  function (absCmp,record) {
        var balanceServiceField = absCmp.query('textfield[itemId=column_10_30]')[0],
            balanceService = balanceServiceField.getValue(),
            usedServiceFld = absCmp.query('textfield[itemId=column_10_31]')[0],
            usedService = usedServiceFld.getValue(),
            previousIsFreeComboVal =  absCmp.initialFormValues['dynamic_fields[column_10_33]'],
            remainBalance = 0,
            fldValue = absCmp.query('combobox[itemId=column_10_33]')[0].getValue(),
            isFreeFlagOldValue = absCmp.isFreeFlagOldValue;
            if(!Ext.isEmpty(balanceService)){
                if(fldValue==Ext.LANG.serviceEntryPanel.isFree.yes){
                    remainBalance = parseInt(balanceService || 0) - 1;
                    usedService = parseInt(usedService || 0) + 1;
                    balanceServiceField.setValue(remainBalance);
                    usedServiceFld.setValue(usedService);
                }
                if(fldValue==Ext.LANG.serviceEntryPanel.isFree.no && (previousIsFreeComboVal==Ext.LANG.serviceEntryPanel.isFree.yes || isFreeFlagOldValue ==  Ext.LANG.serviceEntryPanel.isFree.yes)){
                    remainBalance = parseInt(balanceService || 0) + 1;
                    usedService = !Ext.isEmpty(usedService) ? parseInt(usedService || 0) - 1 : 1;
                    balanceServiceField.setValue(remainBalance);
                    usedServiceFld.setValue(usedService);
                }
               /* if(!Ext.isEmpty(fldValue)){
                    balanceServiceField.setValue(remainBalance);
                    usedServiceFld.setValue(usedService);
                }*/
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
        if(itemId=='column_10_22'){
            me.calculateTotal();
        }else if(itemId=='column_10_13'){
            var fldValue = fld.getValue();
            var params = {};
            params['customer_code'] = fld.getValue();
            Ext.Ajax.request({
                url : 'bizlayer/customer/getCustomerInfo',
                params: params,
                success: function(response){
                    var resp = Ext.decode(response.responseText);
                    if(resp.success){
                        me.mapCustomerRecords(absCmp,resp,true); 
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
    mapServiceCompanyRecords:function(absCmp,record,is_code){
        var me = this,
            mapperArr = YBase.utility.DataMapperHelper.orderCodeDataMapper;
            data = null;
        if(!Ext.isEmpty(record))
            data = is_code == true ? record.data[0] : record[0].raw;
        YBase.utility.PurchaseEntryPanelHelper.mapRecords(absCmp,mapperArr,data);
    },
    mapOrderCodeRecords: function(absCmp,record,is_code){
        var me = this,
            params = {},
            data = null;
        /*params['order_code'] = record[0].get('column_1_01');
        Ext.Ajax.request({
            url: 'bizlayer/serviceEntryPanel/getOrderMasterData',
            method: 'GET',
            params:params,
            scope:me,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    var mapperArr = YBase.utility.DataMapperHelper.orderCodeDataMapper;
                    YBase.utility.ServiceEntryPanelHelper.mapRecords(absCmp,mapperArr,resp.data);
                    grid = absCmp.query('grid[itemId=entryDetailGrid]')[0];
                    grid.getStore().removeAll();
                    me.addBlankRecord(grid.getStore(),5);
                }
            }
        });*/
        
        if(!Ext.isEmpty(record))
                data = is_code == true ? record.data : record[0].raw;
            var mapperArr = YBase.utility.DataMapperHelper.orderCodeDataMapper;
            YBase.utility.ServiceEntryPanelHelper.mapRecords(absCmp,mapperArr,data);
    },
    addBlankRecord: function(store,count,rowIdx){
        if(!Ext.isEmpty(rowIdx)){
            store.insert(rowIdx,store.model);
            return;
        }
        if(Ext.isEmpty(count))
            count = 1;
        for(var i=0;i<count;i++){
            store.add(store.model);
            // store.insert(rowIdx,store.model);
        }
    },
    
    mapCustomerRecords: function(absCmp,record,is_code){
        var me = this,
            mapperArr = YBase.utility.DataMapperHelper.customerDetailDataMapper;
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
        var mapperArr = YBase.utility.DataMapperHelper.serviceOrderProductsDataMapper;
        this.mapToEntryGrid(record,data,grid,mapperArr);
    },
    mapBatchDetailToEntryGridRecords: function(record,data,grid){
        var mapperArr = YBase.utility.DataMapperHelper.batchDetailServiceProductsDataMapper;
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
        if(itemId == "column_11_457"){
            index = me.hasDuplicateRecord(gridStore,selectedRec,record,'column_11_07');
            if(index!=-1){
                me.controller.showToolBarMsg(Ext.LANG.globalLang.errorMsg.duplicateEntry,false); 
                return false;
            }
        }
        else if(itemId=="column_11_708"){
            index = me.hasDuplicateRecord(gridStore,selectedRec,record);
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
            lang = Ext.LANG;
            absCmp = me.controller.absCmp,
            // grid = combo.up('grid'),
            grid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            gridStore = grid.getStore(),
            selectedRec  = grid.getSelectionModel().getSelection()[0],
            itemId = combo.itemId,
            comboVal = combo.getValue(),
            is_bill_order = absCmp.is_bill_order,
            compulsaryCol = 'column_11_07';
        /*
        * Product Name:: column_11_457
        */
        
        if(itemId == "column_11_708"){
            me.mapEntryGridRecords(selectedRec,record[0].raw,grid,is_bill_order);
            me.addNewBlankRecIfLastRow(gridStore,compulsaryCol);
        }
        /*
        * Batch Detail CD:: column_11_719
        */
        else if(itemId == "column_11_719"){
            me.mapBatchDetailToEntryGridRecords(selectedRec,record[0].raw,grid);
        }
        /*
        * is_free:: column_11_710
        * rate :: column_11_11
        */
        if(itemId == "column_11_710"){
            if(combo.value==lang.serviceEntryPanel.isFree.yes)
                selectedRec.set('column_11_11',0);
        }
    },
    onEditorComboChange: function(combo,newValue,oldValue){
        var me =this,
            absCmp = me.controller.absCmp,
            itemId= combo.itemId; 
        if(itemId == "column_11_07"){
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
                if(rec.id != this.selectedRec.id
                    && rec.data.product_id == this.record.data.id
                    && rec.data.column_11_23 == this.record.data.column_5_16
                    && rec.data.supplier_id == this.record.raw.supplier_id
                    ){
                    return true;
                }
            },{selectedRec : selectedRecord , record: record});
            /* if(rec.id != this.selectedRec.id && rec.data[this.compulsaryCol] == this.record.data.column_5_07)
                        return true;
            },{selectedRec : selectedRecord , record: record,compulsaryCol: compulsaryCol});*/
        return index;
    },
    onGridItemClick : function(grid, record,item,index,e,eOpts){
        var me = this,
            absCmp = me.controller.absCmp,
            gridStore = grid.getStore(),
            compulsaryCol;

        if(grid.panel.itemId=='entryDetailGrid'){
            compulsaryCol = 'column_11_07';//absCmp.is_bill_order == 1 ? 'column_11_07' : 'column_4_04';
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
            compulsaryCol = absCmp.is_bill_order == 1 ? 'column_11_07' : 'column_4_04';
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

        if(modifiedFldName == 'column_11_29'){
            /*Do nothing.*/
            return;
        }
        /*
        * @column_11_07 for order master entry
        */
        else if(modifiedFldName == "column_11_08"){
            var compulsaryCol = modifiedFldName;
            if(Ext.isEmpty(record.data[compulsaryCol])){
                me.mapEntryGridRecords(record,[],grid,absCmp.is_bill_order);
            }
            else{

                // Set Display Order
                var displayOrderCol = 'column_11_29';
                record.set(displayOrderCol,rowIdx);
                me.addNewBlankRecIfLastRow(store,compulsaryCol);
            }
        }
        /*
        * @column_11_11::qty
        * @column_11_12::rate
        * @column_11_14::discount
        * @column_11_15::tax
        */
        else if(modifiedFldName == "column_11_11" || modifiedFldName == "column_11_12"  || modifiedFldName == "column_11_14"  || modifiedFldName == "column_11_15"){
            me.calculateOrderGridTotal(record,grid);
        }
    },
    calculateOrderGridTotal: function(record,grid){
        var me = this,
            data = record.data,
            absCmp = me.controller.absCmp,
            tax         = 0,
            subTotal    = 0,
            total       = 0,
            price       = 0,
            taxRate     = 0,
            price       = 0,
            taxPercent  = parseInt(Ext.LANG.defaultValues.taxValue || 0);

        discount    = parseInt(record.data.column_11_14 || 0);
        total       = parseInt(record.data.column_11_11 || 0) * parseInt(record.data.column_11_12 || 0);
        taxRate     = (100 + taxPercent) / 100;
        price       = parseInt(total/taxRate);
        tax         = total - price;
        record.set({
            column_11_30 : price,
            column_11_15 : tax,
            column_11_16 : total
        });   
         
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
            totalTax = 0,
            totalDiscount = 0,
            totalAmt = 0,
            totalPrice = 0;
        
        for(var i=0;i<records.length;i++){
            totalQty += parseInt(records[i].data.column_11_12 || 0);
            totalAmt += parseInt(records[i].data.column_11_16 || 0);
            totalDiscount += parseInt(records[i].data.column_11_14 || 0);
            totalTax += parseInt(records[i].data.column_11_15 || 0);
            totalPrice += parseInt(records[i].data.column_11_30 || 0);
        }

        paramObj = { 
            'dynamic_fields[column_10_20]' : totalQty,
            'dynamic_fields[column_10_21]' : totalAmt,
            'dynamic_fields[column_10_22]' : totalDiscount,
            'dynamic_fields[column_10_23]' : totalTax,
            'dynamic_fields[column_10_34]' : totalPrice
        };
        frm.setValues(paramObj);
        me.calculateTotal();
    },
    calculateTotal: function() {
        var me          = this,
            absCmp      = me.controller.absCmp,
            form        = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm         = form.getForm(),
            subTotal    = parseInt(absCmp.query('textfield[itemId=column_10_21]')[0].getValue() || 0),
            discount    = parseInt(absCmp.query('textfield[itemId=column_10_22]')[0].getValue() || 0),
            tax         = parseInt(absCmp.query('textfield[itemId=column_10_23]')[0].getValue() || 0),
            paramObj    = {},
            total       = 0;
        
        // tax = (subTotal - discount) * 0.08;
        total = subTotal - discount;
        
        paramObj = { 
            // 'dynamic_fields[column_4_23]' : tax,
            'dynamic_fields[column_10_24]' : total
        };
        frm.setValues(paramObj);
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
        if(fld == 'column_11_19'){
            var cb = e.column.editor,
                cbStore = cb.store,
                extraParams = cbStore.getProxy().extraParams || {};
            if(!Ext.isEmpty(record.data.column_11_08)){
                extraParams['supplier_id'] = record.data.supplier_id;
                extraParams['product_code'] = record.data.column_11_06;
                extraParams['currency_type'] = record.data.column_11_23;
                //extraParams['collection_store_id'] = absCmp.query('textfield[itemId=column_1_06]')[0].getValue();
                extraParams['forServiceEntryPanel'] = 1;

                cbStore.getProxy().extraParams = extraParams;
                if(!cb.listeners.hasOwnProperty('beforequery')){
                    var beforequery = {
                            beforequery : function(qe){
                                delete qe.combo.lastQuery;
                            }
                    };
                    cb.listeners = Ext.Object.merge(cb.listeners,beforequery);
                }
            }
            var editorxtype = e.record.data.column_11_07 == Ext.LANG.entryPanel.productType.product ? {xtype : 'combobox'} : {xtype: 'textfield'},
                newEditorConfig,newEditor;
                if(editorxtype.xtype != e.column.editor.xtype){
                    newEditorConfig = Ext.Object.merge(e.column.editor,editorxtype);
                    newEditor = Ext.create('Ext.grid.CellEditor', {
                                    field: newEditorConfig
                                });
                    e.column.setEditor(newEditor);
                }
        }
         /*Product Name*/
        else if(fld == 'column_11_08'){
            var cb = e.column.editor,
                cbStore = cb.store,
                extraParams = cbStore.getProxy().extraParams || {};
            extraParams['excludeEmptyStock'] = 1;

            cbStore.getProxy().extraParams = extraParams;
            // Change Column Editor.
            var editorxtype = e.record.data.column_11_07 == Ext.LANG.entryPanel.productType.item ? {xtype: 'textfield'} :  {xtype : 'combobox'},
                newEditorConfig,newEditor;
                if(editorxtype.xtype != e.column.editor.xtype){
                    newEditorConfig = Ext.Object.merge(e.column.editor,editorxtype);
                    newEditor = Ext.create('Ext.grid.CellEditor', {
                                    field: newEditorConfig
                                });
                    e.column.setEditor(newEditor);
                }
            if(extraParams['product_type'] != record.data.column_11_07 )
            {
                extraParams['product_type'] = record.data.column_11_07;
                cbStore.getProxy().extraParams = extraParams;
                cbStore.load();
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
        // QTY    
      /*   if(fld=="column_11_12" && record.data.column_11_10 == Ext.LANG.serviceEntryPanel.isFree.yes){
            return me.validateBalanceService(me,record,fldVal);
        }*/
        // Is Free
        /*else if(fld=="column_11_10"){
            var rollbackFreeService=1;
            if(fldVal == Ext.LANG.serviceEntryPanel.isFree.yes && record.data[fld] != Ext.LANG.serviceEntryPanel.isFree.yes){
                rollbackFreeService = 0;
                fldVal = record.data.column_11_12;
            }
            if((Ext.isEmpty(record.data.column_11_10) && fldVal == Ext.LANG.serviceEntryPanel.isFree.no) ||
                (Ext.isEmpty(fldVal) && record.data.column_11_10 ==  Ext.LANG.serviceEntryPanel.isFree.no)) {

            }
            else
                return me.validateBalanceService(me,record,fldVal,rollbackFreeService);
        }*/
            
    },
    validateBalanceService: function(me,record,fldVal,rollbackFreeService){
        var balanceServiceField = me.controller.absCmp.query('textfield[itemId=column_10_30]')[0],
            balanceService = balanceServiceField.getValue(),
            usedServiceFld = me.controller.absCmp.query('textfield[itemId=column_10_31]')[0],
            usedService = usedServiceFld.getValue(),
            remainBalance = 0;
            // From is Free status
            if(rollbackFreeService===1){
                remainBalance = parseInt(balanceService || 0) + parseInt(record.data['column_11_12'] || 0);
                usedService = parseInt(usedService || 0) - parseInt(record.data['column_11_12'] || 0);
            }
            // From is Free status
            else if(rollbackFreeService===0){
                remainBalance = parseInt(balanceService || 0) - parseInt(record.data['column_11_12'] || 0);
                usedService = parseInt(usedService || 0) + parseInt(record.data['column_11_12'] || 0);
            }
            // From qty
            else{
                remainBalance = parseInt(balanceService || 0) + parseInt(record.data['column_11_12'] || 0) - parseInt(fldVal || 0);
                usedService = parseInt(usedService || 0) - parseInt(record.data['column_11_12'] || 0) + parseInt(fldVal || 0);
            }

           // remainBalance = parseInt(balanceService || 0) + parseInt(record.data['column_11_12'] || 0) - parseInt(fldVal || 0);
        
        
        if(remainBalance<0){
              me.controller.showToolBarMsg(Ext.LANG.serviceEntryPanel.inValidServiceBalance,false); 
            return false;
        }
        else{
            balanceServiceField.setValue(remainBalance);
            usedServiceFld.setValue(usedService);
        }
        return true;

    },
    onEntryDetailGridLoad: function(store) {
        this.addNewBlankRecIfLastRow(store,'column_11_08');
    },
    onScreenBBtnClick: function(btn) {
        var me = this,
            absCmp = me.controller.absCmp,
            screenBCnt = btn.up('container[screenContainer=true]'),
            flds = screenBCnt.query('textfield'),
            mapperArr = YBase.utility.DataMapperHelper.purchaseEntryCompanyDataMapper,
            params = {},
            saveObj = {};
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
            displayOrderCol = absCmp.is_bill_order == 1 ? 'column_11_19' : 'column_4_19',
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
            entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            entryDetailGridStore;

        if(!Ext.isEmpty(entryDetailGrid)){
            entryDetailGridStore= entryDetailGrid.getStore();
            absCmp.entryDetailGrid = entryDetailGrid;
            // entryDetailGrid.view.on('drop',me.onGridRowDrop,me);
            entryDetailGridStore.on('datachanged',me.onEntryDetailGridStoreDataChanged,me);
            entryDetailGridStore.on('update',me.onEntryDetailGridStoreUpdate,me);
            entryDetailGridStore.on('beforeload',function(store, operation){
                operation.params = operation.params || {};
                var entry_id = me.absCmp.entry_id,
                    sortCol = 'column_11_29',
                    datagrid_id = 24;
                operation.params['entry_id'] = entry_id;
                operation.params['datagrid_id'] = datagrid_id;
                operation.params['forEntryPanel'] = 1;
                // operation.params['sort'] = JSON.stringify([{property: sortCol, direction: 'ASC'}]);
            });
            entryDetailGridStore.on('load',me.onEntryDetailGridLoad,me);

        }

        var orderDetailCb = me.controller.absCmp.query('combobox[itemId=column_10_06]')[0],
            orderDtailCbStore = orderDetailCb.getStore(),
            extraParams = orderDtailCbStore.getProxy().extraParams  || {};
        extraParams['forServiceEntryPanel'] = 1;
        orderDtailCbStore.getProxy().extraParams = extraParams;

        if(controller.isEventBinded === true){

        }
        else{
            var is_bill_order = controller.is_bill_order,
                selector = this.controller.currentViewAlias,
                selectorObj = {};
            
            selectorObj[selector+" combobox[isDynamicFormFld=true], combobox[isTxtAreaCombo=true]"] = {
                'beforeselect': {
                    fn : me.onComboFormBeforeSelect,
                    scope: me
                },
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