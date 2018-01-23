Ext.define('YBase.utility.GridHelper', {
    singleton: true,
    createStoreModel:function(modelId, fields, validation, idProperty, forceSubmitFields) {
    	var idField;
        if (Ext.isEmpty(idProperty)){
            idField = {
                name: Ext.isEmpty(idProperty) ? '_id_' : idProperty, 
                type:'string', 
                convert: function(value,record) {
                    if(!Ext.isEmpty(record) && !Ext.isEmpty(record.raw))
                       return record.raw[idProperty];
                }
            };
            fields.push(idField);
        }
        // for (var i = 0; i < fields.length; i++) {
        //     if (fields[i].type == 'numeric'){
        //         fields[i].convert = function(value, record){
        //             if (Ext.isNumeric(value)){
        //                 return Number(value);
        //             }
        //             return value;
        //         };
        //     }
        // };
        var cfg = {
            extend: 'Ext.data.Model',
            fields: fields,
            validation: validation,
            forceSubmitFields : forceSubmitFields
        };
        cfg.idProperty = Ext.isEmpty(idProperty) ? '_id_' : idProperty;
        // if (!Ext.isEmpty(idProperty)){
        //     cfg.idProperty = '_id_';
        // }
        Ext.define(modelId, cfg);
    },
    createStore: function(storeParamObj) {
        var modelId = 'model_'+storeParamObj.storeId, 
            autoLoad = false,
            proxyConfig;
        this.createStoreModel(modelId, storeParamObj.fields, storeParamObj.validation, storeParamObj.idProperty, storeParamObj.forceSubmitFields);

        if (storeParamObj.editable === true){
            proxyConfig = {
                type: 'ajax',
                api: {
                    read: storeParamObj.storeUrl,
                    create: storeParamObj.create,
                    update: storeParamObj.create,
                    destroy: storeParamObj.destroy
                },
                actionMethods: {
                    create: 'POST',
                    read: 'GET',
                    update: 'POST',
                    destroy: 'POST'
                },
                reader: {
                    type: 'json',
                    root: 'data'
                },
                writer: {
                    root: 'data',
                    type: 'json',
                    writeAllFields: storeParamObj.writeAllFields, //for update case set false
                    encode: true
                },
                extraParams: storeParamObj.extra_params
            };
        }
        else{
            proxyConfig = {
                type: 'ajax',
                url: storeParamObj.storeUrl,
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                writer: {
                    root: 'data',
                    type: 'json',
                    writeAllFields: false, //for update case set false
                    encode: true
                },
                extraParams:storeParamObj.extra_params
            };
        }
        return Ext.create('Ext.data.Store',{
            model: ''+modelId+'',/*storeParamObj.model,*/
            storeId: storeParamObj.storeId,
            remoteFilter: true,
            pageSize: storeParamObj.pageSize,
            is_loaded: false,
            remoteSort:true,
            autoLoad: autoLoad,
            listeners: {
                beforeload: function(store, operation, eOpts ){
                    if(store.isLoading()) {
                        return false;
                    }
                },
                load:function(store, records){
                    store.is_loaded = true;
                    // if (Ext.msk) Ext.msk.hide();
                },
                scope : {
                    controller : storeParamObj.controller,
                    gridItemId : storeParamObj.gridItemId,
                    hasDynamicHeight: storeParamObj.hasDynamicHeight
                },
            },
            proxy: proxyConfig,
            groupField : storeParamObj.groupField,
            groupDir:storeParamObj.groupDir
        });
    },
    hideMsk: function() {
        if (Ext.msk) 
            Ext.msk.hide();
    },
    actionRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<div class="icons-view">{0}</div>',Ext.LANG.globalLang.buttons.btnEdit);
    },
    detailLinkRenderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.String.format('<div class="detail-link">{0}</div>',value);
    },
    actionDragDropRenderer: function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-drag-drop" data-qtip="{0}">{0}</span>',Ext.LANG.globalLang.buttons.btnDragDrop);
    },
    actionViewDeleteRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-view" data-qtip="{0}">{0}</span><span class="icons-delete" data-qtip="{1}">{1}</span>',Ext.LANG.globalLang.buttons.btnEdit,Ext.LANG.globalLang.buttons.btnDelete);
    },
    readUnreadRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        if (record.get('is_read') == '1')
            return "<div class='read-icon'></div>";
        else
            return "<div class='unread-icon'></div>";
    },
    setDefaultGridProperty: function(paramObj) {
        var default_grid_property = {
            'addSearchCmp'              : true,
            'hideHeaderFilterButtons'   : false,
            'addDatagridTemplate'       : 0,
            'addTempSearch'             : 0,
            'addSummary'                : false,
            'chkboxSelModel'            : true,
            'selModelMode'              : 'MULTI',
            'cellEditorTriggerEvent'    : 'celldblclick',
            'sortable_grid'             : true,
            'showSaveMsg'               : true,
            'storeLoadOnSave'           : true,
            'createMsgCmp'              : false,
            'addDDPlugin'               : false,
            'showBulkUpdate'            : false
        };
        paramObj = Ext.applyIf(paramObj,default_grid_property);
        return paramObj;
    },
    /*add toolbarMsg,bulk,datagridTemplate,msgCmptempSearch,skuCmp*/
    manageGrid: function(paramObj,list_grid) {
        if(!Ext.isEmpty(paramObj.createMsgCmp) && paramObj.createMsgCmp &&  !paramObj.hidePagingToolbar) {
            var msgCmp = list_grid.query('pagingtoolbar')[0].query('component[itemId=msgCmp]')[0];
            paramObj.cntrl.msgCmp = msgCmp;
        }
        if(!Ext.isEmpty(paramObj.gridCnt.showBulkUpdate) && paramObj.gridCnt.showBulkUpdate == true) {
            YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(list_grid);
            YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(list_grid,paramObj.gridCnt.gridNo,paramObj.respObj.templateId);
        }
        if(paramObj.gridCnt.addDatagridTemplate == 1) {
            list_grid.datagridTempId = paramObj.respObj.templateId;
        }
        if(paramObj.absCmp.showMsgCmp == true) {
            YBase.utility.MsgCmpHelper.gridEventHandleForMsgCmpPanel(list_grid);
        }
        if(paramObj.gridCnt.addTempSearch == 1) {
            paramObj.absCmp.searchTemplateStore.loadRawData(paramObj.respObj.searchTemplateData);
            var tempSearchDataView = list_grid.query('dataview[itemId=tempSearchDataView]')[0];
            tempSearchDataView.on('itemclick',function(template,record,item,index,e,eOpts) {

                var colDataIndex=[],searchData=[],
                    obj=record.data.search_criteria;
                for (property in obj) {
                    colDataIndex.push(property);
                    searchData.push(obj[property]);
                }
                YBase.utility.SearchHelper.setDataInHeaderFilter1(list_grid,colDataIndex,searchData,true);
            });
        }
        if(paramObj.absCmp.showSkuCmp == true) {
            YBase.utility.SkuCmpHelper.gridEventHandleForSkuCmpPanel(list_grid);
        }
        return list_grid;
    },
    prepareListGrid:function(paramObj) {
        var me = this,
            lang = Ext.LANG;
        paramObj = me.setDefaultGridProperty(paramObj);
        
        var list_grid = me.createListGrid(paramObj);
        list_grid = me.manageGrid(paramObj,list_grid);
        paramObj.cntrl.is_rendered_view = true;
        paramObj.gridCnt.removeAll();
        paramObj.gridCnt.add(list_grid);
        return list_grid;
    },
    createListGrid:function(paramObj) {
        var me                  = this,
            sortable_grid       = paramObj.sortable_grid,
            cols                = paramObj.respObj.columns,
            col_length          = cols.length,
            gridHlpr            = YBase.utility.GridHelper,
            gridHeader          = Ext.LANG.globalLang.gridHeader,
            controller          = paramObj.cntrl,
            comboGridParamsObj  = {},
            auto_add_row        = paramObj.auto_add_row;
        for(var i=0;i<col_length;i++) {
            if(cols[i].hidden == 1) {
                cols[i].hidden=true;
            }
            if(cols[i].editorxtype == 'numberfield'){
                cols[i].filter.xtype = 'textfield';
                if(!Ext.isEmpty(cols[i].editor)){
                    cols[i].editor.keyNavEnabled= false;
                    cols[i].editor.mouseWheelEnabled = false;
                }
            }
            if(cols[i].xtype == "sno_col_renderer") {
                continue;
            }
            if (cols[i].editorxtype == "combobox") {
                cols[i].editor = Ext.clone(cols[i][cols[i].editorprop]);
            }
            if(cols[i].colItemId == "action_column") {
                // cols[i].text = gridHeader.lblColumnSetting;
                if(!Ext.isEmpty(paramObj.actionRenderer)){
                    cols[i].renderer = paramObj.actionRenderer;
                }
                if(!Ext.isEmpty(paramObj.actionColWidth)){
                    cols[i].width = paramObj.actionColWidth;
                }
                if(!Ext.isEmpty(paramObj.hideActionCol) && paramObj.hideActionCol == true){
                    cols[i].hidden = true;
                }
            }
            else {
                // cols[i].menuDisabled = true;
                if(sortable_grid){
                    // cols[i].componentCls = cols[i].componentCls;;
                }
                else{
                    if (!Ext.isEmpty(cols[i].componentCls))
                        cols[i].componentCls = cols[i].componentCls.replace('sortable-col',"");
                    
                    cols[i].sortable = false;
                }
                // if(!Ext.isEmpty(showOnlyDelete) && showOnlyDelete==true){
                //    // cols[i].sortable= false;
                //     cols[i].componentCls = 'sortable-col';
                // }
            }
            if(cols[i].itemId == "drag_drop_column") {
                cols[i].renderer = gridHlpr.actionDragDropRenderer;
                cols[i].componentCls = '';
                cols[i].sortable = false;
            }

            if(cols[i].itemId == "file_action") {
                // cols[i].text = gridHeader.lblColumnSetting;
                cols[i].renderer = gridHlpr.fileActionRenderer;
            }
            if(cols[i].itemId == "readunread_column") {
                cols[i].text = gridHeader.lblReadonly;
                cols[i].renderer = gridHlpr.readUnreadRenderer;
            }
            // if(cols[i].dataIndex == "hash_id") {
            //     cols[i].renderer = gridHlpr.hashIdRenderer;
            //     cols[i].hidden = true;
            // }
            if(cols[i].has_detail_link == 1) {
                cols[i].renderer = gridHlpr.detailLinkRenderer;
            }
            var extraParams = null, fields,tpl_fields;   
            // if (typeof cols[i].filter.storeData != 'undefined' && cols[i].editorxtype == "combobox") {
            if (cols[i].editorxtype == "combobox") {
                //if(!Ext.isEmpty(cols[i].editor) && (cols[i].dataIndex=="column_4_3" || cols[i].dataIndex=="column_5_6" || cols[i].dataIndex=="column_2_2")){
                if(/*!Ext.isEmpty(cols[i].editor) &&*/ (cols[i].field_type_id==104 || cols[i].field_type_id==105)){    
                    
                    if (Ext.isArray(cols[i].filter.fields)) {
                        fields = cols[i].filter.fields;
                    } else {
                        fields = [cols[i].filter.fields];
                    } 

                     if (Ext.isArray(cols[i].filter.tpl_fields)) {
                        tpl_fields = cols[i].filter.tpl_fields;
                    } else {
                        tpl_fields = [cols[i].filter.tpl_fields];
                    } 
                    var comboConfig = {};
                    extraParams = cols[i].filter.extraParams || {};
                    comboGridParamsObj = {
                        combo_itemId       : cols[i].filter.itemId,
                        combo_label        : null,
                        hide_label         : cols[i].filter.hide_label,
                        pageSize           : cols[i].filter.store_page_size,
                        store_fields       : fields,
                        template_fields    : tpl_fields,
                        storeId            : 'product_name_store_'+i,
                        storeUrl           : cols[i].filter.store_url,
                        // storeData          : cols[i].editor.storeData,
                        extra_params       : extraParams,
                        display_field      : cols[i].filter.displayField,
                        value_field        : cols[i].filter.valueField,
                        listeners          : cols[i].filter['listeners'],
                        is_form_combo_grid : cols[i].filter.is_form_combo_grid,
                        queryMode          : !Ext.isEmpty(cols[i].filter.queryMode) ? cols[i].filter.queryMode : 'remote', 
                    };  
                    comboConfig= YBase.utility.ComboGridHelper.setComboGridConfig(comboGridParamsObj);
                    cols[i].filter = Ext.Object.merge(cols[i].filter, comboConfig);
                    if(!Ext.isEmpty(cols[i].editor)){
                        cols[i].editor = Ext.clone(cols[i].filter);
                        // cols[i].editor.store = cols[i].filter.store;
                        cols[i].editor['listeners'] = {
                            // 'select' : {
                            //     fn: controller.onEditorComboSelect,
                            //     scope: controller
                            // },
                            'expand' : {
                                fn: function(fld){
                                    var me =this;
                                },
                                scope: controller
                            },
                            'change' : {
                                fn: function(fld,newValue,oldValue){
                                    var me =this;
                                },
                                scope: controller    
                            }
                        };
                    }
                }
                else if (!Ext.isEmpty(cols[i].filter.storeData)) /*cols[i].filter.storeData != '' && cols[i].filter.storeData != undefined) {*/
                { 
                       
                    if (Ext.isArray(cols[i].filter.fields)) {
                        var fields = cols[i].filter.fields;
                    } else {
                        var fields = [cols[i].filter.fields];
                    }
                    var store;
                    if(!Ext.isEmpty(cols[i].filter.store_url) && cols[i].filter.storeData == "[]"){
                        store = Ext.create('Ext.data.Store', {
                                autoLoad: false,
                                fields: fields,
                                proxy : {
                                    type: 'ajax',
                                    url: cols[i].filter.store_url,
                                    reader: {
                                        type: 'json',
                                        root: 'data',
                                        totalProperty: 'total'
                                    },
                                }
                            });
                    }
                    else{
                        store = Ext.create('Ext.data.Store', {
                            autoLoad: true,
                            fields: fields,
                            data: JSON.parse(cols[i].filter.storeData)
                        });
                    }
                    if (typeof cols[i].editor != 'undefined') {
                        cols[i].editor.store = store;
                        cols[i].editor.forceSelection = false;
                        cols[i].editor.disableKeyFilter = false;
                        cols[i].editor.anyMatch = true;
                        // cols[i].editor.clearFilterOnBlur = true;
                    }
                    cols[i].filter.store = store;
                    if(!Ext.isEmpty(cols[i].editor) && (cols[i].field_type_id==101)){
                        cols[i].editor['listeners'] = {
                            'select' : {
                                fn: function(combo,record){
                                    if(this.id=='ItemMasterDetailController') {
                                        this.onItemNameComboSelect(combo,record);
                                    }
                                    if(this.id=='OrderStatusController') {
                                        this.onStatusComboSelect(combo,record);
                                    }
                                },
                                scope: paramObj.cntrl
                            }
                        };
                    }
                }
                /*category product filter store define*/
                if (!Ext.isEmpty(cols[i].filter.filterStore)) {
                    cols[i].filter.store = cols[i].filter.filterStore;
                }
            }
            /*For Memo Type*/
            if (!Ext.isEmpty(cols[i].field_type_id) && cols[i].field_type_id == 18) {
                cols[i].renderer = function(value, metaData, record) {
                    var val = value.split('<div>');
                    var vv = val[0].replace(/<\/?[^>]+(>|$)/g, ""),
                            html = "<span class='memo-record' data-qtip='" + value + "'>" + vv + "</span>";
                    html += "<span class='btn_row_memo' data-qtip='" + value + "'></span>";
                    return html;
                };
            }
            //for currency type
            if (!Ext.isEmpty(cols[i].field_type_id) && cols[i].field_type_id == 16) {
                cols[i].renderer = YBase.utility.CommonFunctions.currency_renderer;
            }
            //for comma_number type
            if (!Ext.isEmpty(cols[i].dataIndex) && (cols[i].field_type_id == 12)) {
                cols[i].renderer = YBase.utility.CommonFunctions.comma_number_renderer;
            }
            //for time type
            if (!Ext.isEmpty(cols[i].field_type_id) && cols[i].field_type_id == 17) {
                cols[i].renderer = YBase.utility.CommonFunctions.time_renderer;
            }
            if(!Ext.isEmpty(cols[i].summaryType) && cols[i].field_type_id == 17) {
                // cols[i].renderer = gridHlpr.timeTotalRenderer;
                // cols[i].summaryRenderer = gridHlpr.timeTotalRenderer;
                cols[i].summaryRenderer = YBase.utility.CommonFunctions.summary_time_renderer;
            }

            if(typeof cols[i].editor != 'undefined'){
                var colListeners = cols[i].editor['listeners'],
                    listeners = {};
                cols[i].editor.enableKeyEvents=true;
                var specialkeyListener = {
                    specialkey : {
                        fn: function(fld,e,eOpts){
                            var me = this,
                                abstractcomponent = !Ext.isEmpty(me.abstractcomponent) ? me.abstractcomponent : this.absCmp; 
                            if(Ext.isEmpty(abstractcomponent))
                                return;
                            
                            var editPlugin = fld.up().editingPlugin,
                                colIdx, //= editPlugin.context.colIdx,
                                rowIdx = editPlugin.context.rowIdx,
                                grid = fld.up('grid'),//abstractcomponent.query('grid[itemId=orderDetailGrid]')[0],
                                selModel = grid.getSelectionModel(),
                                selectedRec = selModel.getSelection()[0],
                                // gridColumns = grid.query('gridcolumn'),
                                gridColumns,
                                key = e.getKey(),
                                nxtColIdx,//=colIdx+1,
                                nxtCol,
                                nxtRowIdx;

                                if (!Ext.isEmpty(grid.lockedGrid)){
                                    gridColumns = Ext.Array.merge(grid.lockedGrid.headerCt.columnManager.columns, grid.normalGrid.headerCt.columnManager.columns);
                                }
                                else
                                {
                                    gridColumns = grid.headerCt.columnManager.columns;
                                }

                                colIdx = gridColumns.indexOf(editPlugin.context.column);
                                nxtColIdx=colIdx+1;

                                //add new row on down key or enter key of last row
                                if(key==e.DOWN){
                                    if(fld.xtype=="combobox" || fld.xtype=="datefield"  || fld.xtype=="timefield")
                                        return;
                                    
                                    if (auto_add_row === true && selectedRec.store.indexOf(selectedRec) +1 == selectedRec.store.getCount()){
                                        if (controller.addNewRecord)
                                            controller.addNewRecord(false);
                                    }
                                }
                            if(key==e.LEFT){
                                if (e.ctrlKey || e.shiftKey){
                                    return;
                                }
                                for(var i=colIdx-1; i>=0;i--){
                                    if(!Ext.isEmpty(gridColumns[i].getEditor())){
                                        nxtCol = gridColumns[i];
                                        nxtColIdx = i;
                                        break;
                                    }
                                }
                            }
                            else if(key==e.RIGHT){
                                if (e.ctrlKey || e.shiftKey){
                                    return;
                                }

                                for(var i=nxtColIdx; i<gridColumns.length;i++){
                                    if(!Ext.isEmpty(gridColumns[i].getEditor())){
                                        nxtCol = gridColumns[i];
                                        nxtColIdx = i;
                                        break;
                                    }
                                }
                            }
                            else if(key==e.UP){
                                if(fld.xtype=="combobox" || fld.xtype=="datefield"  || fld.xtype=="timefield")
                                    return;
                                nxtColIdx = colIdx;
                                nxtCol = gridColumns[colIdx];
                                if(selModel.selectPrevious()==true)
                                    selectedRec = selModel.getSelection()[0];
                            }
                            else if(key==e.DOWN){
                                if(fld.xtype=="combobox" || fld.xtype=="datefield"  || fld.xtype=="timefield")
                                    return;
                                nxtColIdx = colIdx;
                                nxtCol = gridColumns[colIdx];
                                if(selModel.selectNext()==true)
                                    selectedRec = selModel.getSelection()[0];
                            }
                            else if(key==e.ENTER){
                                for(var i=nxtColIdx; i<gridColumns.length;i++){
                                    if(!Ext.isEmpty(gridColumns[i].getEditor())){
                                        nxtCol = gridColumns[i];
                                        nxtColIdx = i;
                                        break;
                                    }
                                }

                                if(fld.xtype=="combobox"|| fld.xtype=="timefield"){
                                    var picker = fld.getPicker(),
                                        highlightedItem = picker.highlightedItem,
                                        selectedValue;
                                    if(!Ext.isEmpty(highlightedItem)){
                                        // selectedValue = picker.highlightedItem.innerText;
                                        
                                        var records=[];
                                        records[0] = picker.getRecord(picker.highlightedItem);
                                        fld.setValue(records[0].data[fld.valueField]);
                                        fld.fireEvent('select',fld,records);
                                        // fld.fireEvent('select',fld,fld.getStore().getRange());
                                    }
                                }
                            }
                            if(!Ext.isEmpty(grid.disableSpecialKeyEnterListener) && grid.disableSpecialKeyEnterListener==true){
                                return;
                            }

                            if(nxtCol){
                                if (nxtCol.locked === true){
                                    grid.lockedGrid.editingPlugin.startEdit(selectedRec,nxtCol);
                                }
                                else
                                {
                                    if (!Ext.isEmpty(grid.lockedGrid)){
                                        grid.normalGrid.editingPlugin.startEdit(selectedRec,nxtCol);
                                    }
                                    else
                                    {
                                        editPlugin.startEdit(selectedRec,nxtCol);
                                    }
                                }
                            }
                            else{
                                nxtCol = null;
                                nxtColIdx = 2;
                                if(key==e.RIGHT || key==e.ENTER){
                                    if(selModel.selectNext()==true){
                                        selectedRec = selModel.getSelection()[0];
                                        if(selectedRec){
                                            if (gridColumns.length >= nxtColIdx)
                                                nxtCol = gridColumns[nxtColIdx];
                                            // editPlugin.startEdit(selectedRec,3);
                                        }
                                    }else {
                                        if(me.id == 'AuctionDetailController' && me.absCmp.PanelNo == 4 && key==e.ENTER) {
                                            me.addNewRecord(true,true);
                                        }
                                    }
                                }
                                else if(key==e.LEFT){
                                    if(selModel.selectPrevious()==true){
                                        selectedRec = selModel.getSelection()[0];
                                        if(selectedRec){
                                            if (gridColumns.length >= nxtColIdx)
                                                nxtCol = gridColumns[nxtColIdx];
                                            // editPlugin.startEdit(selectedRec,3);
                                        }
                                    }   
                                }
                                if(nxtCol){
                                    if(Ext.isEmpty(nxtCol.getEditor())){
                                        nxtColIdx++;
                                        for(var i=nxtColIdx; i<gridColumns.length;i++){
                                            if(!Ext.isEmpty(gridColumns[i].getEditor())){
                                                nxtCol = gridColumns[i];
                                                nxtColIdx = i;
                                                break;
                                            }
                                        }
                                    }

                                    if(nxtCol){
                                        if (nxtCol.locked === true){
                                            grid.lockedGrid.editingPlugin.startEdit(selectedRec,nxtCol);
                                        }
                                        else
                                        {
                                            if (!Ext.isEmpty(grid.lockedGrid)){
                                                grid.normalGrid.editingPlugin.startEdit(selectedRec,nxtCol);
                                            }
                                            else
                                            {
                                                editPlugin.startEdit(selectedRec,nxtCol);
                                            }
                                        }
                                    }
                                }                                
                            }
                        },
                        scope: paramObj.cntrl
                    }
                };
                listeners['specialkey'] = specialkeyListener['specialkey'];
                /*------------allow only 0-9 and "." character--------------*/
                if (!Ext.isEmpty(cols[i].field_type_id) && cols[i].field_type_id == 17) {
                    var keyListener = {
                        keypress : {
                            fn: function(fld,e,eOpts){
                                //46='.' charCode
                                //49-56=0-9 charCode
                                var charCode = e.charCode;
                                if (charCode >= 48 && charCode <= 57 || charCode == 46) {
                                    return true;
                                }
                                else {
                                    e.preventDefault();;
                                }
                            }
                        }
                    };
                    for(var events in colListeners){
                        listeners[events] = colListeners[events];
                    }
                    listeners['keypress'] = keyListener['keypress'];
                    // cols[i].editor.maskRe =/^[0-9a-bA-B]+$/;regEx
                }
                cols[i].editor['listeners'] = listeners;
            }
            if (typeof cols[i].editorxtype != 'undefined' && cols[i].editorxtype == "datefield") {
                cols[i].renderer = Ext.util.Format.dateRenderer('Y-m-d');
            }
            else if (typeof cols[i].editorxtype != 'undefined' && cols[i].editorxtype == "datefieldex") {
                cols[i].renderer = function(value) {
                    var str = null;
                    if (!Ext.isEmpty(value))
                    {
                        str = Ext.Date.toJapaneseDateString(value, false);
                    }
                    return str;
                };
            }
            else {
                //do nth
            }
            if (typeof cols[i].editorxtype != 'undefined' && cols[i].editorxtype == "timefield") {
                cols[i].renderer = Ext.util.Format.dateRenderer('H:i');
            }
            if(!Ext.isEmpty(cols[i].summaryType)) {
                if(controller.id=='DayBookController') {
                    cols[i].summaryRenderer = controller.summary_renderer;
                }
            }
        }
        var list_grid = me.getPagingGrid(paramObj);
        return list_grid;
    },
    getPagingGrid:function(paramObj) {
        var me=this,templateMenu,searchMenu,items,plugins,topDockedItem,
            selModel = Ext.create('Ext.selection.CheckboxModel', {
                mode:paramObj.selModelMode,
                forceFit:true
            }),
            grid_config = {},
            page_size_combo = me.getPageResizerCombo(paramObj.gridStore,paramObj.gridCnt),
            msgCmp = null;
        if(!Ext.isEmpty(paramObj.createMsgCmp) && paramObj.createMsgCmp)
            msgCmp = YBase.utility.CommonFunctions.createMsgCmp(paramObj.cntrl);
        /*adds the menus in the temp field button*/
        templateMenu = me.templateMenu(paramObj);
        searchMenu = me.searchMenu(paramObj);
        items = me.addGridHeaderFilterCmp(paramObj,templateMenu,searchMenu);
        plugins = me.addPlugins(paramObj);
        topDockedItem = me.addTopDockedItem(items);

        grid_config = {
            autoRender: true,
            itemId: paramObj.gridItemId,
            store: paramObj.gridStore,
            columns: paramObj.respObj.columns,
            columnLines:true,
            autoScroll: true,
            plugins: plugins,
            disableSpecialKeyEnterListener : paramObj.disableSpecialKeyEnterListener,
            isScreenDatagrid : paramObj.isScreenDatagrid,
            isTabGrid : paramObj.isTabGrid,
            gridPanelNo: paramObj.gridCnt.gridNo,
            gridFieldTempId:paramObj.setTemplateId,
            componentCls:'grid-config non-editable-cell-background',
            dockedItems: [topDockedItem,{
                    xtype: 'pagingtoolbar',
                    dock: 'bottom',
                    hidden: paramObj.hidePagingToolbar,
                    displayInfo: true,
                    store: paramObj.gridStore,
                    items: [page_size_combo,msgCmp],
                    inputItemWidth:60
                }
            ]
        };
        if(!Ext.isEmpty(paramObj.addSummary) && paramObj.addSummary){
            grid_config['features'] = [{
                ftype: 'summary'
            }];  
        }
        else if(!Ext.isEmpty(paramObj.addGroupingSummary) && paramObj.addGroupingSummary){
            // var groupingHeaderTplArr = paramObj.groupingHeaderTplArr;
            grid_config['features'] = [{
                id : 'gridgroupingsummary',
                ftype: 'groupingsummary',
                // groupHeaderTpl: '{name}',
                groupHeaderTpl: paramObj.groupingHeaderTpl,
                startCollapsed: true
            }];  
        }
        else if(!Ext.isEmpty(paramObj.addGridGrouping) && paramObj.addGridGrouping){
            // var groupingHeaderTplArr = paramObj.groupingHeaderTplArr;
            grid_config['features'] = [{
                id : 'gridGrouping',
                ftype: 'grouping',
                // groupHeaderTpl: '{name}',
                groupHeaderTpl: paramObj.groupingHeaderTpl,
                startCollapsed: true
            }];  
        }

        if(!Ext.isEmpty(paramObj.gridViewHeight)){
            grid_config['height'] = paramObj.gridViewHeight;  
        }
        /*
        * @Adds extra component cls to grid 
        * @To show border in grid headers.
        * @Set this class only if grid header filter is ON.
        */
        if(!Ext.isEmpty(paramObj.addSearchCmp) && paramObj.addSearchCmp!=true){
            grid_config['componentCls'] += ' window-grid-filter-border-cls';  
        }else {
            grid_config['componentCls'] += ' grid-filter-border-cls ';  
            if(!Ext.isEmpty(paramObj.hideHeaderFilterButtons) && paramObj.hideHeaderFilterButtons==true){
                grid_config['componentCls'] += ' window-grid-filter-border-cls';    
            }
        }

        grid_config['viewConfig'] ={
            'markDirty': false,
            enableTextSelection: true,
            loadMask : paramObj.loadMask,
            // preserveScrollOnRefresh:true,
            listeners: {
                itemkeydown: function(view, record, item, index, e) {
                    var grid = view.panel,
                        gridCnt = this.paramObj.gridCnt,
                        rowEditing = grid.getPlugin('plgGridListCellEditing');
                    YBase.utility.CommonFunctions.getGridKeyPressEvent(this.paramObj.cntrl, grid, rowEditing, gridCnt.rowNo, gridCnt.colNo, e);
                },
                scope: {'paramObj': paramObj}
            }
        };
        if(paramObj.addDDPlugin===true){
            grid_config['viewConfig']['plugins'] = {
                ptype: 'gridviewdragdrop',
                dragText: 'Drag and drop to reorganize'
            }; 
        }
        //for buffered rendering...
        // grid_config['plugins'] = 'bufferedrenderer';
        if (Ext.isEmpty(paramObj.chkboxSelModel) || paramObj.chkboxSelModel) {
           grid_config['selModel'] = selModel;
           grid_config['selModel']['hasCheckBox'] = true;
        }
        return Ext.create('Ext.grid.Panel',grid_config);
    },
    /*saves the search criteria*/
    searchMenu: function(paramObj) {
        var searchMenu = {
            xtype:'menu',
            itemId: 'SearchMenu',
            items: []
        };
        if(!Ext.isEmpty(paramObj.searchList)) {
            var searchParams = paramObj.searchList,
                len = searchParams.length;
            //@TO-DO
            for (i=0; i<len; i++) {
                var mnu = {
                    'xtype': 'menuitem',
                    'JSON_search':searchParams[i],
                    'text': searchParams[i].search_name,
                    'search_id':searchParams[i].search_id,
                    'menuIndex': i,
                    'textAlign':'left',
                    'iconAlign': 'right',
                    'cls':'search-menu ',
                    listeners:{
                        click:{
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function(e, element, params){ 
                                var gridCnt = this.paramObj.gridCnt,
                                    grid = gridCnt.query('grid[itemId='+this.paramObj.gridItemId+']')[0],
                                    menuitem = this.menuitem;
                                YBase.utility.SearchHelper.setSearchName(e,grid,menuitem);
                            },
                            scope:{'paramObj':paramObj,'menuitem':searchParams[i]},
                        }
                    }
                } 
                if(searchParams[i].system_flg == 0 && Ext.CURRENT_USER.user_id == searchParams[i].user_id) {
                   mnu['iconCls'] = 'btn_search_remove';
                }
                searchMenu.items.push(mnu);
            };
        }
        else {
            searchMenu.items=[];
        }
        if(Ext.CURRENT_USER.is_super_user) {
            searchMenu = this.addSettingMenu(paramObj,searchMenu);
        }
        return searchMenu;
    },
    addSettingMenu: function(paramObj,searchMenu) {
        var  settingMenu = this.settingMenuProp(paramObj,searchMenu);
        searchMenu.items.push(settingMenu);
        return searchMenu;
    },
    settingMenuProp: function(paramObj,searchMenu) {
        var settingMenu = {
            'xtype': 'menuitem',
            'JSON_search':null,
            'text': 'searchEdit',
            'search_id':null,
            'menuIndex': searchMenu.items.length-1,
            'textAlign':'right',
            'iconAlign': 'left',
            'cls':'search-menu ',
            'iconCls': 'cbo-setting-btn-ico',
            listeners:{
                click:{
                    element: 'el', //bind to the underlying el property on the panel
                    fn: function(e, element, params){ 
                        var gridCnt = this.paramObj.gridCnt,
                            gridNo = gridCnt.gridNo,
                            grid = gridCnt.query('grid[itemId='+this.paramObj.gridItemId+']')[0],
                            searchMenu = this.searchMenu,
                            user_id = Ext.CURRENT_USER.user_id;
                        YBase.utility.SearchHelper.openSearchEditWin(grid, gridNo, user_id, searchMenu);
                    },
                    scope:{'paramObj':paramObj},
                }
            }
        } 
        return settingMenu;
    },
    templateMenu: function(paramObj) {
        var defaultMnuCls=false,
            defaultCls = 'template-menu',
            templateMenu ={
                xtype:'menu',
                itemId: 'TemplateMenu',
                items: []
            },
            defaultMnu = {
                'xtype': 'menuitem',
                'text': Ext.LANG.template.defaultTemplate,
                'iconAlign': 'left',
                'datagrid_template_id': null,
                'isSelected':false,
                'iconCls':'nst-default',
                'cls':defaultCls,
                'tempId':'default-temp',
                listeners:{
                    click:{
                        // element: 'el', //bind to the underlying el property on the panel
                        fn: function(menuItem, e){ 
                            menuItem.isSelected=false;
                            paramObj = this.paramObj;
                            YBase.utility.DatagridTemplateHelper.setDatagridTemplateName(e,paramObj,menuItem,templateMenu);
                        },
                        scope:{'paramObj':paramObj},
                    }
                }
            };
        templateMenu.items.push(defaultMnu);
        if(!Ext.isEmpty(paramObj.templateList)) {
            fieldLen = paramObj.templateList.length;
            for (i=0; i<fieldLen; i++) {
                fldMenu = paramObj.templateList[i]
                datagridId = fldMenu.datagrid_id,
                componentCls = 'template-menu ';
                iconCls = '';
                publicIconCls = '';
                if(fldMenu.datagrid_template_id == paramObj.gridCnt.templateId) {
                    componentCls+='selected-template-menu';
                    defaultMnuCls=true;
                }
                if(fldMenu.created_by == Ext.CURRENT_USER.user_id && 
                    (fldMenu.system_flg!=1) || Ext.isEmpty(fldMenu.system_flg)) {
                    iconCls = 'btn_search_remove';
                }
                if(fldMenu.is_public == 1) {
                    componentCls += ' public-template';
                }
                if(fldMenu.is_public == 0) {
                    componentCls += ' private-template';
                }
                var mnu = {
                    'xtype': 'menuitem',
                    'text': fldMenu.template_name,
                    'iconCls': iconCls,
                    'menuIndex': i,
                    'cls':componentCls,
                    'iconAlign': 'right',
                    'datagrid_template_id': fldMenu.datagrid_template_id,
                    'width':200,
                    'isPublic':fldMenu.is_public,
                    listeners:{
                        click:{
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function(e, element, params){ 
                                paramObj = this.paramObj;
                                button = this.menuitem;
                                button['menuIndex']=this.menuIndex;
                                templateMenu = this.menuitem;
                                this.defaultMnu.isSelected=false;
                                YBase.utility.DatagridTemplateHelper.setDatagridTemplateName(e,paramObj,button,templateMenu);
                            },
                            scope:{'paramObj':paramObj,'defaultMnu':defaultMnu,'menuitem':fldMenu,'menuIndex':i},
                        }
                    },
                    scope:{'paramObj':paramObj,'defaultMnu':defaultMnu}
                }
                templateMenu.items.push(mnu);
            }
            if(!defaultMnuCls) {
                defaultMnu['cls']='selected-template-menu';
                defaultMnu['isSelected']=true;
            }
        }
        else {
            defaultMnu['cls']='selected-template-menu';
            // templateMenu.items=[];
        }
        return templateMenu;
    },
    /*adds the reload,search and save search button in the grid*/
    addGridHeaderFilterCmp: function(paramObj,templateMenu,searchMenu) {
        if(!Ext.isEmpty(paramObj.addSearchCmp) &&  paramObj.addSearchCmp== false) {
            paramObj.hideHeaderFilterButtons=true;
        }
        var items = [
            {
                xtype: 'button',
                iconCls: 'yig-refresh-s-b',
                componentCls: 'btn-margin',
                itemId: 'gridFilterResetBtn',
                // text:'reload',
                ui: 'actionbtn-ui',
                text: Ext.LANG.globalLang.buttons.btnReset,
                margins: '5 2 5 5',
                hidden:paramObj.hideHeaderFilterButtons,
                handler: function(button) {
                    var grid = button.up('grid'),
                        controllerName = this.paramObj.cntrl.id;
                    if(controllerName == 'AuctionDetailController') {
                        var headerFilters = grid.getHeaderFilters().items;
                        for( var i=0;i<headerFilters.length;i++) {
                            if(headerFilters[i].property == "column_4_02" && !Ext.isEmpty(headerFilters[i].value)) {
                                var colDataIndex=[],searchData=[];
                                colDataIndex.push(headerFilters[i].property);
                                searchData.push(headerFilters[i].value);
                                YBase.utility.SearchHelper.setDataInHeaderFilter1(grid,colDataIndex,searchData,true);
                                return;
                            }
                        }
                    }
                    grid.clearHeaderFilters();
                    if (!Ext.isEmpty(paramObj.absCmp.filter_params)) {
                        var colDataIndex=[],searchData=[],
                            filter_param = paramObj.absCmp.filter_params;
                        if(filter_param.length > 0) {
                            for(var i=0; i<filter_param.length; i++){
                                colDataIndex.push(filter_param[i].property);
                                searchData.push(filter_param[i].colValue);
                                YBase.utility.SearchHelper.setDataInHeaderFilter1(grid,colDataIndex,searchData,false);
                            }
                        }
                        grid.headerFilterPlugin.applyFilters();
                    }
                    else if (!Ext.isEmpty(paramObj.fieldTempSearchCriteria)) {
                        var colDataIndex=[],searchData=[],
                            filter_param = paramObj.fieldTempSearchCriteria;
                        for(var key in filter_param){
                            colDataIndex.push(key);
                            searchData.push(filter_param[key]);
                            YBase.utility.SearchHelper.setDataInHeaderFilter1(grid,colDataIndex,searchData,false);
                        }
                        grid.headerFilterPlugin.applyFilters();
                    }
                    else{
                        grid.resetHeaderFilters();
                    }
                    // if (Ext.CURRENT_USER.department_type_code != 'admin') {
                    //     // YBase.app.getController('' + controllerName + '').setInitialGridFilter();
                    // }
                },
                scope: {'paramObj': paramObj}
            },
            {
                xtype: 'button',
                iconCls: 'yig-search-s-b',
                componentCls: 'btn-margin',
                // text:'search',
                text: Ext.LANG.globalLang.buttons.btnSearch,
                margins: '5 2 5 0',
                ui: 'actionbtn-ui',
                hidden:paramObj.hideHeaderFilterButtons,
                handler: function(button, e) {
                    var listGrid = button.up('grid'),
                        listStore = listGrid.getStore(),
                        listView = listGrid.getView(),
                        error = false;
                    listStore.each(function(record, idx) {
                        if (record.dirty == true) {
                            var productLen = listGrid.columns;
                            for (var i = 0; i < productLen.length; i++) {
                                cell = listView.getCellByPosition({
                                    row: idx,
                                    column: i
                                });

                                cell.removeCls("x-form-invalid-field");
                                cell.set({
                                    'data-errorqtip': ''
                                });
                                fieldName = listGrid.columns[i].dataIndex;
                                allowBlank = listGrid.columns[i].allowBlank;

                                if (!allowBlank && record.get(fieldName) == '') {
                                    cell.addCls("x-form-invalid-field");
                                    cell.set({
                                        'data-errorqtip': Ext.LANG.globalLang.errorMsg.mandatoryField
                                    });

                                    error = true;
                                }
                            }
                        }
                    });

                    if (error == true) {
                        Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.unsavedRecordContinue, function(btn) {
                            if (btn === 'yes') {
                                listStore.reload();
                            }
                        });
                    } else {
                        listGrid.applyHeaderFilters();
                    }
                }
            },
            {
                xtype: 'splitbutton',
                iconCls: 'yig-search-save-s-b',
                componentCls: 'btn-margin',
                itemId:'btnSaveSearch',
                ui: 'actionbtn-ui',
                text: Ext.LANG.globalLang.subMenuText.saveSearch,
                margin: '5 2 5 0',
                hidden:paramObj.hideHeaderFilterButtons,
                handler: function(button, e) {
                    var gridCnt = this.paramObj.gridCnt,
                        gridNo = gridCnt.gridNo,
                        grid = gridCnt.query('grid[itemId='+this.paramObj.gridItemId+']')[0],
                        searchMenu = this.searchMenu,
                        user_id = Ext.CURRENT_USER.user_id;
                    YBase.utility.SearchHelper.getSearchConditionName(grid, gridNo, user_id, searchMenu, gridCnt);
                },
                scope:{'paramObj':paramObj, 'searchMenu':searchMenu},
                menu: searchMenu
            },
            {
                xtype: 'tbspacer',
                flex: 1
            },
            {
                xtype: 'button',
                margin: '5 2 5 0',
                //iconCls: 'nst-icon-setting',
                // hidden:!paramObj.absCmp.showBulkUpdate,
                hidden:!paramObj.gridCnt.showBulkUpdate,
                itemId:'btnBulkUpdate',
                ui: 'actionbtn-ui',
                componentCls: 'btn-bg btn-margin',
                text: Ext.LANG.bulkUpdate.bulkUpdate,
                iconCls:'yig-grid-reload-b-s',
                handler: function(button,e) {
                    // YBase.utility.BulkUpdateHelper.getCollapseExpand(e);
                    YBase.utility.BulkUpdateHelper.showBulkUpdatePanel(button,e);
                }
            },
            {
                xtype: 'splitbutton',
                iconCls: 'yig-search-save-s-b',
                componentCls: 'btn-bg btn-margin',
                itemId:'btnSaveTemplate1',
                text: Ext.LANG.template.templateSave,
                ui: 'actionbtn-ui',
                margin: '5 2 5 0',
                hidden:!paramObj.addDatagridTemplate,
                handler: function(button, e) {
                    var department_id=1;
                    // var department_id = Ext.CURRENT_USER.department_id.toString();
                    YBase.utility.DatagridTemplateHelper.showDatagridTempWin(this.paramObj,department_id,templateMenu);
                },
                scope:{'paramObj':paramObj},
                menu: templateMenu
            },  
        ];
        if(!Ext.isEmpty(paramObj.addTempSearch) && paramObj.addTempSearch ==1) {
            var fields= [
                {
                    name: 'search_id'
                },
                {
                    name: 'search_name'
                },
                {
                    name: 'system_flg'
                },
                {
                    name: 'search_criteria'
                }
            ];
            var storeParamObj1 = {
                'pageSize' : 5, 
                'fields' : fields,
                'validations': null,
                'storeId' : '', 
                'storeUrl' : 'bizlayer/search/getTemplateSearch', 
                'create' : null, 
                'extra_params' : null, 
                'writeAllFields':null,
                'editable' : true
            };
            paramObj.absCmp.searchTemplateStore = YBase.utility.GridHelper.createStore(storeParamObj1);
            var tempSearchObj = {
                xtype: 'dataview',
                // flex: 1,
                autoShow: true,
                componentCls:'tempSearch',
                itemId: 'tempSearchDataView',
                tpl: [
                    '<tpl for=".">',
                    '    <div class="tempSearchSelector-div">',
                    '       <span>{search_name}</span>',
                    '</div>',
                    '</tpl>'
                ],
                itemSelector: 'div.tempSearchSelector-div',
                store: paramObj.absCmp.searchTemplateStore
            }
            items.splice(3,0,tempSearchObj);
        }

        if(!Ext.isEmpty(paramObj.entryDetailScreenBtnConfig)){
            items.push(paramObj.entryDetailScreenBtnConfig);
        }
        return items;
    },
    /*adds the cell editing and gridHeaderFilter plugins in the grid*/
    addPlugins: function(paramObj) {
        var controller              = paramObj['controller'],
            addSearchCmp            = paramObj['addSearchCmp'],
            cellEditorTriggerEvent  = paramObj['cellEditorTriggerEvent'],
            addDDPlugins            = paramObj['addDDPlugins'],
            plgProductListCellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
                ptype: 'cellediting',
                pluginId: 'plgGridListCellEditing',
                triggerEvent: cellEditorTriggerEvent,
                listeners: {
                    beforeedit: function(editor,e){
                        var currentView = this.cntrl.currentView;
                        if(!Ext.isEmpty(currentView)) {
                            rwChkBox = currentView.query('checkbox[itemId=rwChkBox]');
                            if(!Ext.isEmpty(rwChkBox[0]) && rwChkBox[0] == true) {
                                if(!rwChkBox[0].checked) {
                                    return false;
                                }
                            }
                        }
                    },
                    scope: paramObj,
                }
            }),
            plugins = [plgProductListCellEditing];
        /*
        * ADDED - 2015/09-01 :: ROHAN 
        * @Add bufferedrenderer plugin for non grouping/groupingsummary grid only
        * @else grid summary toggle and/or scroll issue will occur.
        */
        if((Ext.isEmpty(paramObj.addGridGrouping) && Ext.isEmpty(paramObj.addGroupingSummary)) || (paramObj.addGridGrouping == false && paramObj.addGroupingSummary == false)){
            plugins.push('bufferedrenderer');
        }
        if(addSearchCmp == true){
            var gridHdrFltr = {
                pluginId: 'plgProductListGridFilter',
                ptype: 'gridheaderfilters',
                filterRoot: 'data'
            };
            plugins.push(gridHdrFltr);
        }
        if(addDDPlugins == true){
            var dragDropPlugin = {
                pluginId: 'gridViewDragDrop',
                ptype: 'gridviewdragdrop',
                dragText: 'Drag and drop to reorganize',
                enableDrag: true
            };
            //console.log(dragDropPlugin);
            plugins.push(dragDropPlugin);   
        }
        return plugins;
    },
    addTopDockedItem: function(items) {
        dockedItem = {
            dock: 'top',
            componentCls: 'search-tab',
            items: [
                {
                    xtype: 'container',
                    itemId: 'gridActionController',
                    componentCls: 'grid-action-panel',
                    layout: {
                        align: 'stretch',
                        pack: 'start',
                        type: 'hbox'
                    },
                    items: items
                }
            ]
        };
        return dockedItem;
    },
    getPageResizerCombo:function(grid_store,list_grid_container){
        var me=this,
            cbo = {
                xtype: 'combobox',
                itemId: 'pageSizeComboBox',
                name: 'page_size',
                grid_store : grid_store,
                value: grid_store.pageSize,
                // value:20,
                width: 70,
                fieldLabel: '',
                editable: false,
                hideLabel: true,
                displayField: 'page',
                store: 'PageSizeStore',
                valueField: 'page',
                listeners: {
                    change: function(combo, newValue, oldValue, eOpts) {
                        var me = this.me;
                        me.onPageSizeComboChange(list_grid_container, combo, newValue, oldValue, eOpts);
                    },
                    scope: {'me': me}
                }
            };
        return cbo;
    },
    onPageSizeComboChange : function(gridCnt,combo, newValue, oldValue, eOpts){
        var me = this,
            pageSizeAvoid = false,
            datagrid_id = gridCnt.gridNo;
        if (!Ext.isEmpty(newValue)) {
            combo.grid_store.pageSize = newValue;
            combo.grid_store.load({params:{'save_page_size':newValue,'datagrid_id': datagrid_id}});
        }
    },
    /*validation of fields in the grid*/
    validateGrid: function(grid, store, view, datagrid_id) {
        var gridColumns = grid.columns,
            gridColumnsLength = grid.columns.length;
            visibleGridColumns=[];
        for (var i = 0; i < gridColumnsLength; i++) {
            if(typeof gridColumns[i].hidden == 'undefined' || gridColumns[i].hidden == false)
                visibleGridColumns.push(gridColumns[i]);
        }
        var me = this;
            error = me.checkDirtyRecords(visibleGridColumns, store, view);
        return error;
    },
    checkDirtyRecords: function(gridColumns, store, view) {
        var me = this,
            error = false,
            cell=null;
        store.each(function(record, idx) {

            /*@To_*/
            if (record.dirty == true) {
                var gridColumnsLength = visibleGridColumns.length;

                for (var i = 0; i < gridColumnsLength; i++) {
                    if (typeof gridColumns[i].allowBlank == 'undefined') {
                        continue;
                    }
                    try {
                        cell = view.getCell(record,gridColumns[i]);
                    }
                    catch(err) {
                        cell = null;
                    }                    

                    /*cell = view.getCellByPosition({
                        row: idx,
                        column: gridColumns[i].index
                    });*/
                    var dataIndex = gridColumns[i].dataIndex,
                            fieldValue = record.get(dataIndex),
                            ret;

                    /* Validate Blank's Exceptional Case for Order Master Entry Panel */
                    var activeTab = Ext.bodyTab.getActiveTab();
                    
                    /*@IF validation is on Entry Pnl's entryDetail Grid
                    *@AND dataIndex = Batch Detail CD column
                    *@AND prodType = Product
                    *@THEN validate blank ELSE no batch detail CD blank validation is not reqd.
                    */
                    if(activeTab.customItemId == 'EntryPanel' && dataIndex == 'column_2_22'){
                       /* if(record.data.column_2_07 == Ext.LANG.entryPanel.productType.product){
                            Ext.apply(gridColumns[i],{allowBlank: false},{});
                        }
                        else{
                            Ext.apply(gridColumns[i],{allowBlank: true},{});
                           // ret = {};
                        }*/
                    }
                    else if(activeTab.itemId == 'ProductMaster' && (dataIndex == 'column_5_16' || dataIndex == 'column_5_09')){
                        /*var productType = Ext.LANG.entryPanel.productType;
                          if(record.data.column_5_06 == productType.product){
                              Ext.apply(gridColumns[i],{allowBlank: false},{});
                        }
                        else{
                            Ext.apply(gridColumns[i],{allowBlank: true},{});
                           // ret = {};
                        }*/

                    }
                    else if(activeTab.customItemId == "ServiceEntryPanel" && dataIndex == 'column_11_19')
                    {
                         if(record.data.column_11_07 == Ext.LANG.entryPanel.productType.product){
                            Ext.apply(gridColumns[i],{allowBlank: false},{});
                        }
                        else{
                            Ext.apply(gridColumns[i],{allowBlank: true},{});
                           // ret = {};
                        }
                    }
                     else if(activeTab.customItemId == "StockTransferEntryPanel" && dataIndex == 'column_9_05')
                    {
                        /* if(record.data.column_9_17 == Ext.LANG.entryPanel.productType.product){
                            Ext.apply(gridColumns[i],{allowBlank: false},{});
                        }
                        else{
                            Ext.apply(gridColumns[i],{allowBlank: true},{});
                           // ret = {};
                        }*/
                    }
                    ret = me.validateBlank(gridColumns[i], fieldValue);
                    // var ret = YBase.utility.CommonFunctions.validate(gridColumns[i], fieldValue);
                    if (typeof ret != 'undefined' && ret.error === true) {
                        error = true;
                        if (cell){
                            cell.addCls("x-form-invalid-field");
                            cell.set({
                                'data-errorqtip': ret.message
                            });
                        }
                    }
                    else
                    {
                        if (cell){
                            cell.removeCls("x-form-invalid-field");
                            cell.set({
                                'data-errorqtip': ''
                            });
                        }
                    }
                }
            }
            /*@TO-Do*/
        });
        return error;
    },
    validateBlank: function(gridColumn, columnValue) {
        var me=this,
           allowBlank = gridColumn.allowBlank,
            ret = {};
        columnValue = me.getTrimmedVal(columnValue);
        if (allowBlank == true && columnValue == '') {
            return;
        }

        if(!allowBlank && Ext.isEmpty(columnValue)) {
            ret['error'] = true;
            // ret['message'] = "required fields";
            ret['message'] = Ext.LANG.globalLang.errorMsg.mandatoryField;
            return ret;
        }
        field_type_id = null;
        if (typeof gridColumn.field_type_id != 'undefined') {
            field_type_id = gridColumn.field_type_id;
        }
        if (field_type_id != null) {
            switch(field_type_id) {
                //case 1: Numeric Validation
                // case 1,16:
                case 1:
                    //var numericReg = new RegExp(/^[0-9]+$/);
                    var numericReg = new RegExp(/^(([0-9]*)|(([0-9]*).([0-9]{1,2})))$/);
                    if (!numericReg.test(columnValue)) {
                        ret['error'] = true;
                        ret['message'] = gridColumn.message;
                        return ret;
                    }
                    break;
                /*case 19:
                    //case 19 : Numeric Value only dont get character and point value
                    //var numericReg = new RegExp(/^[0-9]+$/);
                    var numericReg = new RegExp(/^[0-9\b]+$/);
                    //var numericWithpPointReg = new RegExp(/^(((\d{1,3})(,\d{3})*)|(\d+))(.\d+)?$/);
                    if (!numericReg.test(columnValue)) {
                        ret['error'] = true;
                        ret['message'] = gridColumn.message;
                        return ret;
                    }
                    break;*/
                case 4: //email validation
                     var emailReg = new RegExp(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,4})$/);
                    if (!emailReg.test(columnValue)) {
                        ret['error'] = true;
                        ret['message'] = gridColumn.message;
                        return ret;
                    }
                    break;
                case 10: //Zip validation
                    var zipReg = new RegExp(/\b\d{3}-\d{4}$/),
                        zipReg2 = new RegExp(/\b\d{7}$/);
                    if ((!zipReg.test(columnValue) || columnValue =='000-0000')&&(!zipReg2.test(columnValue) || columnValue =='0000000')) {
                    //if (!columnValue.match(zipReg)) {
                            ret['error'] = true;
                            ret['message'] = gridColumn.message;
                            return ret;
                    }
                    break;

                case 11: //Phone validation
                     var phoneReg = new RegExp(/\b\d{3}-\d{4}-\d{4}$/);
                    if (!phoneReg.test(columnValue)) {
                    //if (!columnValue.match(phoneReg)) {
                        ret['error'] = true;
                        ret['message'] = gridColumn.message;
                        return ret;
                    }
                    break;
                /*case 14: //Public code >> english small letter and numbers only
                     // var publicCodeReg = new RegExp(/^[a-z0-9 _]*[a-z0-9][a-z0-9 _]*$/);
                     var publicCodeReg = new RegExp(/(^[a-z0-9]*[a-z0-9]$)|(^[a-z0-9]+([-_]*[a-z0-9]$))|(^[a-z0-9]+([-_]*[a-z0-9])+([-_]*[a-z0-9]$))/);
                    if (!publicCodeReg.test(columnValue)) {
                    //if (!columnValue.match(publicCodeReg)) {
                        ret['error'] = true;
                        ret['message'] = gridColumn.message;
                        return ret;
                    }
                    break;*/
                /*case 15: //offer_price >> number and % sign only
                     // var publicCodeReg = new RegExp(/^[a-z0-9 _]*[a-z0-9][a-z0-9 _]*$/);
                     var offerPriceReg = new RegExp(/(^[0-9]+%?$)/);
                    if (!offerPriceReg.test(columnValue)) {
                        ret['error'] = true;
                        return ret;
                    }
                    break;*/
            }
        }
    },
    getTrimmedVal:function(value) {
        var str = value;
        if (Ext.isEmpty(value) || value==undefined) {
            str = "";
        } else if (typeof value == 'object') {
            str = Ext.String.trim(value.toString());
        } else if (typeof value == 'string'){
            str =Ext.String.trim(value);
        }
        return str;
    },
    /*
        function to add the header filter in the static grids
    */
    addHeaderFilterPlugin:function(grid){
        var colLength=grid.columns.length;
        for (var i = 0; i<colLength;i++) {
            if(grid.columns[i].colItemId!='action_column')
                grid.columns[i]['filter']={'xtype':'textfield'};
        }
        var filter_Config = {
                pluginId: 'filterPlugin'+grid.itemId,
                ptype: 'gridheaderfilters',
                filterRoot: 'data'
            };
        grid.addPlugin(filter_Config);
        if(!grid.store.remoteFilter){
            grid.store.remoteFilter=true;
        }
    },
    isGridStoreDirty: function(store,compulsaryCol){
        var isDirty = false,
            newRecord = store.getNewRecords(),
            updateRecord = store.getUpdatedRecords(),
            deletedRecord = store.getRemovedRecords(),
            concatRec = updateRecord.concat(newRecord),
            records = [];

        for(var i =0;i<concatRec.length;i++){
            if(!Ext.isEmpty(concatRec[i].data[compulsaryCol])){
                records.push(concatRec[i]);
            }    
        }
        if(Ext.isEmpty(compulsaryCol)){
            records = concatRec;    
        }
        if(records.length > 0 || deletedRecord.length > 0){
            isDirty = true;
        }
        return isDirty;
    }
    /*hashIdRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return "#"+value;
    },*/
});