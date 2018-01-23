Ext.define('YBase.controller.EcSiteExportController', {
    extend: 'Ext.app.Controller',

    views: [
        'EcSiteExportPanel',
    ],
    refs: [
    {
        ref: 'ecSiteExportPanel',
        selector: 'ecSiteExportPanel'
    }    
    ],
    csv_master_id:0,
    /*delete icon renderer*/ 
    renderAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var checkMappedFields = record.get('mapped_fields'), str='',
            default_value = record.get('default_value'),
            option_value = record.get('option_value'),
            format_id = record.get('format_id'),
            max_length = record.get('max_length');

        if ((!Ext.isEmpty(checkMappedFields) && Ext.isArray(checkMappedFields)) ||
            !Ext.isEmpty(default_value) ||
            !Ext.isEmpty(option_value) ||
            !Ext.isEmpty(format_id) ||
            !Ext.isEmpty(max_length))
        {
            var btn = '<div  class="btn_row_del">  </div>';
            return btn;
        }
        /*if (!Ext.isEmpty(checkMappedFields) && Ext.isArray(checkMappedFields)){
            var btn = '<div  class="btn_row_del">  </div>';
            return btn;
        }*/
    },
    /*add mapped field label in left sided grid which is EcSiteGrid*/
    renderMappedFields: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var mapped_fields = record.get('mapped_fields'), str='';
        var specialCharLang=Ext.LANG.globalLang.specialChar,
            openBracket=specialCharLang.openBracket;
            closeBracket=specialCharLang.closeBracket;
        if (!Ext.isEmpty(mapped_fields) && Ext.isArray(mapped_fields))
        {
            var len = mapped_fields.length;
            for (var i = 0; i < len; i++) {
                var table_field_id=mapped_fields[i].table_field_id;
                // str += i+1 +") "+Ext.String.format('<span class="mapped-field">{0}</span>', mapped_fields[i].table_field_id)+"["+Ext.String.format(mapped_fields[i].table_name)+"]"+"<br>";
                str += Ext.String.format('<span class="mapped-field">{0}</span>', openBracket+table_field_id+closeBracket+mapped_fields[i].field_label)+/*'<span  class="btn_row_del">  </span>'+*/"<br>";
            }
        }
        return str;
    },
    /*add mapped field ids in left sided grid which is EcSiteGrid*/
    renderFieldId: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var mapped_fields = record.get('mapped_fields'), str='';
        // if (!Ext.isEmpty(mapped_fields) && Ext.isArray(mapped_fields) || !Ext.isEmpty(record.get('default_value')))
        if (!Ext.isEmpty(mapped_fields) && Ext.isArray(mapped_fields))
        {
            var len = mapped_fields.length;
            for (var i = 0; i < len; i++) {
                // str += i+1 +") "+Ext.String.format('<span class="mapped-field">{0}</span>', mapped_fields[i].table_field_id)+"["+Ext.String.format(mapped_fields[i].mapped_table_name)+"]"+"<br>";
                str += i+1 +") "+Ext.String.format('<span class="mapped-field">{0}</span>', mapped_fields[i].table_field_id)+"<br>";
            }
        }
        return str;
    },
    /*square-icon renderer*/
    renderIsMapped: function (value, metaData, record, rowIndex, colIndex, store, view) {
        if(!Ext.isEmpty(record.get('is_mapped')) && record.get('is_mapped')>0){
         //   var isMappedInt = parseInt(record.get('ismapped'));
                //var btn = '<div  class="action_remove ismappedsquare" data-qtip= '+Ext.LANG.buttonToolTip.mappedTo+''+isMappedInt+''+Ext.LANG.buttonToolTip.fields+'> </div>';
                 var btn = '<div  class="action_remove ismappedsquare" > </div>';
                return btn; 
        }       
    },
    /*arrow-move-icon renderer*/
    renderMapped: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn;
        // if(!Ext.isEmpty(record.get('ismapped')) && record.get('ismapped')>0){
        //     btn = '<div  class="action_remove remove_disabled" > </div>';
        // }
        // else
        // {
        btn = '<div  class="move-left" > </div>';
        // }
        return btn;
    },
    /*dragDrop renderer*/
    renderMoveAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn = '<div class="move_action_selected move_action_unselected mi-action-move-btn">  </div>';
        return btn;
    },
    /*grid-updown-icon renderer*/
    GridUpDownButtonRender:function(value, metaData, record, rowIndex, colIndex, store, view) {
        var htm = '<div  class="moveDown mi-moveDown-icon   cursor-hand" >   </div>';
        htm += '<div  class="moveUp mi-moveUp-icon   cursor-hand" > </div>';
        return htm;
    },
    /*default_value_column editor type renderer*/
    rendererDefaultValue:function(editorType) {
        if(editorType == "datefield")
        {
            return Ext.util.Format.dateRenderer('Y-m-d');
        }  
        if(editorType == "numberfield")
        {
            // alert('numberfield');
        }      
    },
    /*data formating of mapped columns from right side to left sided grid*/
    GridColumnComboRender: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if(!Ext.isEmpty(value)) {
            var store = Ext.getStore('DataFormatStore'),
                combo = view.headerCt.columnManager.getColumns()[colIndex].getEditor(),
                idx=store.find(combo.valueField,value),
                rec=store.getAt(idx),
                formatName=rec.get(combo.displayField);
            /*adds the clear icon in combo */
            combo['plugins']='clearbutton';
        }
        else { 
            formatName= '';
        }
        return formatName;
    },
    implementLanguage: function(abstractcomponent) {
        lang = Ext.LANG;
        var ecExportPanel = abstractcomponent,
            importCsvHeader = ecExportPanel.query('filefield[itemId=ImportCsvHeader]')[0];            
        ecExportPanel.query('button[itemId=EcSiteSaveBtn]')[0].setText(lang.globalLang.buttons.btnSave);
        // ecExportPanel.setTitle(lang.panels.ecSiteExportPanel);
        // ecExportPanel.query('button[itemId=EcSiteCancelBtn]')[0].setText(lang.buttons.cancel);
        ecExportPanel.query('button[itemId=CsvMasterEditBtn]')[0].setText(lang.globalLang.buttons.btnEdit);
        importCsvHeader.setFieldLabel(lang.ecSiteExport.csvImport);
        importCsvHeader.buttonText = lang.ecSiteExport.btnBrowse;
        var winstonGrid =  ecExportPanel.query('grid[itemId=winstonGrid]')[0];
            winstonGrid.columns[0].setText(lang.ecSiteExport.operation);
            winstonGrid.columns[1].setText(lang.ecSiteExport.fieldLabel);
            winstonGrid.columns[2].setText(lang.ecSiteExport.tableId);
            winstonGrid.columns[3].setText(lang.ecSiteExport.tableFieldId);
            winstonGrid.columns[4].setText(lang.ecSiteExport.fieldType);
            winstonGrid.columns[5].setText(lang.ecSiteExport.isMapped);

        var EcSiteGrid = ecExportPanel.query('grid[itemId=EcSiteGrid]')[0];
            EcSiteGrid.columns[1].setText(lang.ecSiteExport.csvFieldName);
            EcSiteGrid.columns[2].setText(lang.ecSiteExport.displayOrder);
            EcSiteGrid.query('gridcolumn[itemId=mapped_fields]')[0].setText(lang.ecSiteExport.mappedFields);
            EcSiteGrid.columns[4].setText(lang.ecSiteExport.mappedTableName);
            EcSiteGrid.columns[5].setText(lang.ecSiteExport.mappedTableId);
            EcSiteGrid.columns[6].setText(lang.ecSiteExport.fieldId);
            EcSiteGrid.columns[7].setText(lang.ecSiteExport.csvReportFieldId);
            EcSiteGrid.columns[8].setText(lang.ecSiteExport.isSingleMapped);
            EcSiteGrid.columns[9].setText(lang.ecSiteExport.csvReportId);
            EcSiteGrid.columns[10].setText(lang.ecSiteExport.mappedFieldType);
            EcSiteGrid.columns[11].setText(lang.ecSiteExport.DefaultValue);
            EcSiteGrid.columns[12].setText(lang.ecSiteExport.optionValue);
            EcSiteGrid.columns[13].setText(lang.ecSiteExport.idFieldTable);
            EcSiteGrid.columns[14].setText(lang.ecSiteExport.formatName);
            EcSiteGrid.columns[15].setText('max_length');
            EcSiteGrid.columns[16].setText(lang.ecSiteExport.actions);
    },
    addHelpCmp: function(absCmp,helpTextInfo) {
        var me=this,
            container =  absCmp.query('container[itemId=csvBtnContainer]')[0],
            lang=Ext.LANG,
            link = lang.help_link.csvMapLink,
            label = lang.help_label.help;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    /*EcSiteExport Panel*/
    onEcExportPanelBeforeRender: function(abstractcomponent, options) {
        var me = this,i,
            container =  abstractcomponent.query('container[itemId=csvBtnContainer]')[0],
            lang=Ext.LANG,
            link = lang.help_link.csvMapLink,
            label = lang.help_label.help;
        //YBase.utility.CommonFunctions.addHelpCmp(container,link,label);
        abstractcomponent.query('gridcolumn[itemId=removeAction]')[0].renderer = me.renderAction;
        abstractcomponent.query('gridcolumn[itemId=mapped_fields]')[0].renderer = me.renderMappedFields;
        abstractcomponent.query('gridcolumn[itemId=field_id]')[0].renderer = me.renderFieldId;
        abstractcomponent.query('gridcolumn[itemId=selectionColumn]')[0].renderer = me.renderMapped;
        abstractcomponent.query('gridcolumn[itemId=ismapped]')[0].renderer = me.renderIsMapped; 
        abstractcomponent.query('gridcolumn[itemId=MoveColSelected]')[0].renderer = me.renderMoveAction; 
        abstractcomponent.query('gridcolumn[itemId=DisplayCol]')[0].renderer = me.GridUpDownButtonRender; 
        abstractcomponent.query('gridcolumn[itemId=format_name]')[0].renderer = me.GridColumnComboRender; 
        var dataFormatStore = Ext.getStore('DataFormatStore');
            dataFormatStore.load();
        me.loadCombo(abstractcomponent);  
        me.implementLanguage(abstractcomponent); 
        var ecSiteGrid = abstractcomponent.query('grid[itemId=EcSiteGrid]')[0],
            ecSiteGridStore = ecSiteGrid.getStore();
        /*disable column if not mapped and changes the xtype of default value column*/
        /*ecSiteGrid.on('beforeedit',function(editor, e, eOpts) {
            if(Ext.isEmpty(ecSiteGrid.getSelectionModel().lastSelected.get('mapped_fields')))
            {
                if(e.column.itemId=='id_field_table')
                {
                    return false;
                }
                else if(e.column.itemId=='default_value')
                {
                    var default_value_column = ecSiteGrid.query('gridcolumn[itemId=default_value]')[0];
                    default_value_column.setEditor('textfield');
                }
                else
                {
                    return true;
                }
            }
            if(!Ext.isEmpty(ecSiteGrid.getSelectionModel().lastSelected.get('mapped_fields')))
            {
                var mappedFieldColumnType = ecSiteGrid.getSelectionModel().lastSelected.get('mapped_fields')[0].xtype;
                if(e.column.itemId=='default_value' )
                {
                    if(mappedFieldColumnType == "datefield")
                    {
                        var default_value_column = ecSiteGrid.query('gridcolumn[itemId=default_value]')[0],
                        editor = {'xtype':'datefield',submitFormat:'Y-m-d'};
                        default_value_column.setEditor(editor);  
                    }
                    else if(mappedFieldColumnType == "numberfield")
                    {
                        var default_value_column = ecSiteGrid.query('gridcolumn[itemId=default_value]')[0],
                        editor = {'xtype':'numberfield', hideTrigger: true, keyNavEnabled: false, mouseWheelEnabled: false};
                            editorType = default_value_column.setEditor(editor);
                    }
                    else
                    {
                        var default_value_column = ecSiteGrid.query('gridcolumn[itemId=default_value]')[0];
                        editor = {'xtype':'textfield'}
                        default_value_column.setEditor(editor);
                    }                   
                }                
            }
        });*/
        /*delete icon render */    
        ecSiteGridStore.on('update' ,function(store, record, operation, modifiedFieldNames, eOpts){
            if (!Ext.isEmpty(modifiedFieldNames) && modifiedFieldNames.length > 0)
            {
                for (i = 0; i < modifiedFieldNames.length; i++) {
                    if (modifiedFieldNames[i] == 'default_value' || modifiedFieldNames[i] == 'option_value')
                    {
                        /*default_value column renderer*/
                        var defaultValueColumn = ecSiteGrid.query('gridcolumn[itemId=default_value]')[0],
                            editorType = defaultValueColumn.getEditor().xtype;      
                        defaultValueColumn.renderer = me.rendererDefaultValue(editorType);
                    }
                    record.beginEdit(); 
                    record.endEdit();
                    record.commit();
                } 
            }
        });
        /*disable column if not mapped*/
        /*grid.on('beforeedit',function(editor, e, eOpts)
        {
            if(Ext.isEmpty(grid.getSelectionModel().lastSelected.get('mapped_fields'))){
                if(e.column.itemId=='id_field_table'){
                    return false;
                }else{
                    return true;
                }
            }
        });*/
        if(Ext.msk) 
            Ext.msk.hide();
    },
    /*EcSiteExport Panel Combo*/
    loadCombo: function(abstractcomponent) {
        var me = this, 
            ecSiteExportPanel = me.getEcSiteExportPanel(),
            ecSiteGrid = ecSiteExportPanel.query('grid[itemId=EcSiteGrid]')[0],
            winstonGrid = ecSiteExportPanel.query('grid[itemId=winstonGrid]')[0],
        comboStore = abstractcomponent.query('combo[itemId=CsvMasterMappedCombo]')[0].getStore();
        comboStore.load({
            callback: function(records, operation, success){
                if(records.length>0){
                    //for helpText 
                    var helpTextInfo=this.proxy.reader.rawData.helpInfo;
                        me.addHelpCmp(abstractcomponent,helpTextInfo);
                    var csvReportId = comboStore.getAt(0).get('csv_report_id');
                    if(Ext.isEmpty(csvReportId))
                    {
                        // Ext.MessageBox.alert('Message', 'combo selection doesnt have field value');
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.ecSiteExport.comboDoesnotHaveValue,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        return;
                    }
                    else
                    {
                        me.csv_master_id = csvReportId;
                    }
                    abstractcomponent.query('combobox[itemId=CsvMasterMappedCombo]')[0].setValue(records[0].data.csv_report_id);
                    
                    var ecSiteGridStore = ecSiteGrid.getStore('EcSiteStore');
                    ecSiteGridStore.load({
                        params:{
                            csv_report_id:csvReportId
                        }
                    });  
                    
                    var winstonStore = winstonGrid.getStore('WinstonStore');
                    winstonStore.load({
                        params:{
                            csv_report_id:csvReportId
                        }
                    }); 
                }
            }
        });
    },
    /*EcSiteExport Panel Winston Grid*/
    onWinstonGridItemClick: function(grid, record, item, index, e, options){ 
        if (e.getTarget('.move-left'))
        {
            var me = this, 
                panel = me.getEcSiteExportPanel(),
                grd = panel.query('grid[itemId=EcSiteGrid]')[0];
            /*if (record.get('ismapped') >0)
            {
                Ext.Msg.alert('Messsage','it is already mapped'); 
                return;
            }*/
            
           if(me.gridMappedRecord(grid,record)==true){
                /*HERE*/
                record.beginEdit();
                /*var isMappedInt = parseInt(record.get('ismapped'));
                record.set('ismapped',isMappedInt+1);*/
                record.endEdit();
                record.commit();
                grd.getSelectionModel().deselectAll();
            }        
        }    
    },
    /*EcSiteExport Panel EcSite Grid*/
    onEcSiteGridItemClick: function(grid, record, item, index, e, options){
        var me = this, table_field_id,idx;
        if (e.getTarget('.btn_row_del')){
            var len = record.get('mapped_fields').length;
            for (j = 0; j < len; j++) {
                table_field_id= record.get('mapped_fields')[j].table_field_id;
                var stores=[];
                stores.push(Ext.data.StoreManager.lookup('WinstonStore'));
                for (i = 0; i < stores.length; i++) {
                    idx = stores[i].find('table_field_id', table_field_id, 0 , false, true, true);
                    if (idx > -1)
                    {
                        var rec = stores[i].getAt(idx);
                        var isMappedInt = parseInt(rec.get('ismapped'));
                        rec.beginEdit();
                        rec.set('ismapped',isMappedInt-1);
                        //rec.set('table_id','');
                         //rec.commit();
                    }
                }
            }
            me.gridClearRecord(grid,record);
        }
        if (e.getTarget('.moveDown')){
            me.reorderGridSelectedRow(grid,1);
        }
        else if(e.getTarget('.moveUp')){
            me.reorderGridSelectedRow(grid,-1);
        }
    },
    reorderGridSelectedRow:function (grid, direction) {
        var records = grid.getSelectionModel().selected.items,
        record = null,
        nextRecord = null;
        
        if (records.length > 0)
            record = records[records.length-1];

        if (!record) {
            return;
        }
        var index = grid.getStore().indexOf(record);
        if (direction < 0) {
            index--;
            if (index < 0) {
                return;
            }

        } else {
            index++;
            if (index >= grid.getStore().getCount()) {
                return;
            }
        }
        nextRecord = grid.getStore().getAt(index);
        grid.getStore().remove(record);
        grid.getStore().insert(index, record);
        grid.getSelectionModel().select(record, false, true);
    },
    gridClearRecord:function(grid,record){
        record.set('mapped_fields', []);
        record.set('field_id', []);
        record.set('mapped_table_id', null);
        record.set('table_id', null);
        record.set('is_single_mapped', null);
        record.set('default_value', null);
        record.set('option_value', null);
        record.set('id_field_table', null);
        record.set('xtype', null);
        record.set('mapped_table_name', null);
        record.set('format_id', null);
        record.set('xtype', null);
        record.set('format_name', null);
        record.set('max_length', null);
        /*record.data.mapped_table_id=null;
        record.data.table_id=null;
        // record.data.field_id = null;
        record.data.is_single_mapped = null;
        record.data.default_value = null;
        record.data.option_value = null;
        record.data.id_field_table = null;
        record.data.xtype = null;
        record.data.mapped_table_name = null;
        record.data.format_id = null;
        record.data.format_name = null;
        record.data.max_length = null;*/
        record.commit();
        return;
    },
    onEcSiteSaveBtnClick: function(button, e, eOpts) {
        var me = this,
            panel = me.getEcSiteExportPanel(),
            ecSiteGridStore = panel.query('gridpanel[itemId=EcSiteGrid]')[0].getStore(),
            modifiedRecords = ecSiteGridStore.getModifiedRecords(),
            dataArray = [];  
        // if(!Ext.isEmpty(modifiedRecords)) {
            ecSiteGridStore.each(function(record){
                // if(!Ext.isEmpty(record.data.mapped_fields) &&  Ext.isArray(record.data.mapped_fields))
                if(record.data.xtype == 'datefield' && typeof(record.data.default_value) != 'string' && !Ext.isEmpty(record.data.default_value))
                {
                    var dateOnly = Ext.Date.format(record.data.default_value,'Y-m-d');
                    record.set('default_value',dateOnly);
                    dataArray.push(record.data);
                }
                else
                {
                    dataArray.push(record.data);
                }                
            });
            var csvReportId = me.csv_master_id;
            Ext.Ajax.request({
                url: 'bizlayer/reportField/save',
                method: 'POST',
                params:
                {
                    'mappedData':JSON.stringify(dataArray),
                    'csvReportId':csvReportId
                },
                success: function(response) {
                    var ecSiteGridStore = Ext.getStore('EcSiteStore');
                    ecSiteGridStore.load({
                        params:{
                            csv_report_id:csvReportId
                        }
                    }); 
                    // Ext.MessageBox.alert('Ext.LANG.app.appTitle', 'Ext.LANG.successMsg.saveSuccess');
                    // ecSiteGridStore.removeAll();
                    // button.up('window').close();                   
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   Ext.LANG.globalLang.successMsg.saveSuccess,
                        modal: true,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                },
                failure:function(response){
                    // Ext.MessageBox.alert('Messsage', 'failure');
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   Ext.LANG.globalLang.errorMsg.saveError,
                        modal: true,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        // }
        // else {
        //     Ext.Msg.show({
        //         title: Ext.LANG.globalLang.app.appTitle,
        //         msg:   Ext.LANG.globalLang.alertMsg.recordsNotChanged,
        //         modal: true,
        //         icon: Ext.Msg.ERROR,
        //         buttons: Ext.Msg.OK
        //     });
        // }
    },
    /*maps the record from winston(right) to ecsite grid(left)*/
    gridMappedRecord: function(grid,record){
        var me = this,i,lang = Ext.LANG,
            panel = me.getEcSiteExportPanel(),
            selectedRecords = panel.query('grid[itemId=EcSiteGrid]')[0].getSelectionModel().getSelection();
        if(selectedRecords[0] == undefined)
        {
            // Ext.MessageBox.alert('lang.app.appTitle', 'lang.alertMsg.noRowsSelected');
            Ext.Msg.show({
                title: lang.globalLang.app.appTitle,
                msg:   lang.globalLang.alertMsg.rowsNotSelect,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        /*allows only one record to be mapped in ecsite grid from winston*/
        /*if(!Ext.isEmpty(selectedRecords[0].data.mapped_fields))
        {
            Ext.MessageBox.alert(lang.app.appTitle, lang.alertMsg.mappedfielderror);
            return;
        }*/

        if (selectedRecords.length>1){
            // Ext.Msg.alert('Messsage','unique');
            Ext.Msg.show({
                title:Ext.LANG.globalLang.app.appTitle,
                msg: Ext.LANG.globalLang.alertMsg.unique,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
            return;
        }  
 
        if (!Ext.isEmpty(selectedRecords))
        {
            var len = selectedRecords.length, mapped_fields;
            for (i = 0; i < len; i++) {
                var mapped_fields = selectedRecords[i].get('mapped_fields'),
                    field_id = selectedRecords[i].get('field_id'),
                    table_field_id = record.get('table_field_id'),
                    uniqueCheck = me.checkUniqueMappedRecord(mapped_fields,table_field_id);
                if(uniqueCheck==true){
                    // Ext.Msg.alert('Messsage','Already Mapped"');
                    Ext.Msg.show({
                        title:Ext.LANG.globalLang.app.appTitle,
                        msg: Ext.LANG.globalLang.alertMsg.alreadyMapped,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.INFO
                    });
                    return;                                 
                }
                if (Ext.isEmpty(mapped_fields))                
                    mapped_fields = [];
                var mapped_field_object = { 'csv_multi_mapped_detail_id':'',
                        'csv_report_field_id':selectedRecords[i].get('csv_report_field_id'),
                        'field_label': record.data.field_label,
                        'mapped_table_name': record.data.mapped_table_name,
                        'table_field_id': record.data.table_field_id,
                        'table_id': record.data.table_id,
                        'xtype': record.data.xtype
                    };
                mapped_fields.push(mapped_field_object);

                if(Ext.isEmpty(field_id))
                    field_id = [];
                field_id.push(record.data.table_field_id);
                var mapped_table_id = record.data.table_id,
                    // field_id = record.data.table_field_id,
                    mapped_field_type = record.data.xtype,
                    mapped_table_name = record.data.mapped_table_name;
                selectedRecords[i].set('mapped_fields', mapped_fields);
                selectedRecords[i].set('mapped_table_id', mapped_table_id);
                selectedRecords[i].set('field_id', field_id);
                selectedRecords[i].set('xtype', mapped_field_type);
                selectedRecords[i].set('mapped_table_name', mapped_table_name);
                /*sets the mapped default_value and option_value column null*/
               // selectedRecords[i].data.default_value = null;
               // selectedRecords[i].data.option_value = null;

                /*is_single_mapped=>1*/
                selectedRecords[i].set('is_single_mapped', '1');
                var isMappedInt = parseInt(record.get('is_mapped'));
                record.set('is_mapped',isMappedInt+1);
                selectedRecords[i].commit(); 
                // debugger;
                // var a = panel.query('grid[itemId=EcSiteGrid]')[0].getColumnModel().getIndexById('IdFieldTable');
                // var editor = grid.getSelectionModel().getCellEditor(a,rowIndex);
                // editor.enable();
                // column = panel.query('gridcolumn[itemId=IdFieldTable]')[0];
             
                // column.editor.disabled = false;
                // debugger;

            }
            return true;
        }
        else{
            // Ext.MessageBox.alert('lang.app.appTitle', 'lang.alertMsg.nextEngineReportField');
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.alertMsg.nextEngineReportField,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return false;
        }
    },
    checkUniqueMappedRecord:function(mapped_fields,tableFieldId){
        if (!Ext.isEmpty(mapped_fields) && Ext.isArray(mapped_fields)){
            for (i = 0; i < mapped_fields.length; i++) {
                if(mapped_fields[i].table_field_id == tableFieldId){
                    return true;
                }
            }
        }       
    },
    /*EcSitePanel MasterCombo*/
    onComboSelect:function(combo, records, eOpts) {
        var me = this,
            ecSiteExportPanel = me.getEcSiteExportPanel(),
            ecSiteGrid = ecSiteExportPanel.query('grid[itemId=EcSiteGrid]')[0],
            winstonGrid = ecSiteExportPanel.query('grid[itemId=winstonGrid]')[0],
            csvMasterMappedCombo = ecSiteExportPanel.query('combobox[itemId=CsvMasterMappedCombo]')[0],
            csvReportId = records[0].get('csv_report_id');

        if(Ext.isEmpty(csvReportId))
        {
            // Ext.MessageBox.alert('Message', 'combo selection doesnt have field value');
            // Ext.MessageBox.alert('lang.app.appTitle', 'lang.alertMsg.nocomboselection');
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.alertMsg.selectCombo,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        else
        {
            me.csv_master_id = csvReportId;
        }
        
        Ext.Ajax.request({
            url: 'bizlayer/reportField/getCsvMappedDetails',
            params:
            {
                'csv_report_id':csvReportId
            },
            success: function(response) {
                var resp = Ext.decode(response.responseText),
                    ecSiteGridStore = ecSiteGrid.getStore('EcSiteStore');
                    ecSiteGridStore.loadData(resp.data);
                
                var winstonStore = winstonGrid.getStore('WinstonStore');
                winstonStore.load({
                    params:{
                        csv_report_id:csvReportId
                    }
                }); 
            },
            failure:function(response){
                // Ext.Msg.alert('Messsage','failure');
                Ext.Msg.show({
                    title:Ext.LANG.globalLang.app.appTitle,
                    msg: Ext.LANG.globalLang.alertMsg.selectCombo,
                    buttons: Ext.Msg.OK,
                    icon: Ext.Msg.ERROR
                });
            }
        });
    },
     /*Edit button of EcSitePanel*/
    CsvMasterMappedComboEditBtnClick: function(button, e, eOpts) {
        var me = this;
            // combo = me.getEcSiteExportPanel(),
            // csvReportId = combo.query('combo[itemId=CsvMasterMappedCombo]')[0].getValue();
        if(!Ext.isEmpty(me.csv_master_id)) {
            csvReportId = me.csv_master_id;
            YBase.app.getController('ImportExportCsvWindowController').createImportExportCsvWindow(csvReportId);            
        }
        else {
            // Ext.Msg.alert('Messsage','select a value');
            Ext.Msg.show({
                title:Ext.LANG.globalLang.app.appTitle,
                msg: Ext.LANG.globalLang.alertMsg.selectValue,
                buttons: Ext.Msg.OK,
                icon: Ext.Msg.INFO
            });
        }
    },
    /*sets the CsvMappedMasterId of combo golbally*/
    setCsvMappedMasterId: function (csvReportId) {
        this.csv_master_id = csvReportId;
    },
    init: function(application) {
        this.control({
            "#EcSiteExportPanel": {
                beforerender: this.onEcExportPanelBeforeRender
            },
            "#EcSiteSaveBtn": {
                click: this.onEcSiteSaveBtnClick
            },
            "ecSiteExportPanel grid[itemId=winstonGrid]" :{
                itemclick: this.onWinstonGridItemClick               
            },
            "ecSiteExportPanel grid[itemId=EcSiteGrid]" :{
                itemclick: this.onEcSiteGridItemClick
            },
            "#CsvMasterMappedCombo": {
                select: this.onComboSelect
            },
            'ecSiteExportPanel button[itemId=CsvMasterEditBtn]': {
                click: this.CsvMasterMappedComboEditBtnClick
            }
        });
    }
});
