Ext.define('YBase.controller.ImportExportCsvWindowController', {
    extend: 'Ext.app.Controller',

views: [
        'ImportExportCsvWindow',
        'EcSiteExportPanel'
    ],
    refs: [
    {
        ref: 'importExportCsvWindow',
        selector: 'importExportCsvWindow'
    },
    {
        ref: 'ecSiteExportPanel',
        selector: 'ecSiteExportPanel'
    },
    {
        ref: 'addCsvWindow',
        selector: 'addCsvWindow'
    }     
    ],
    saveError:false,
    renderDragAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn = '<div class="move_action_selected move_action_unselected mi-action-move-btn">  </div>';
        return btn;
    },
    /*del-button renderer of importexport window renderer*/
    renderActionCsvImport:function(value, metaData, record, rowIndex, colIndex, store, view)
    {
        var btn = '<div  class="btn_row_del">  </div>';
        return btn;
    },
    /*grid-updown-icon renderer*/
    GridUpDownButtonRender:function(value, metaData, record, rowIndex, colIndex, store, view)
    {
        var htm = '<div  class="moveDown mi-moveDown-icon   cursor-hand" >   </div>';
        htm += '<div  class="moveUp mi-moveUp-icon   cursor-hand" > </div>';
        return htm;
    },
    onAddCsvWindowBeforeRender: function(abstractcomponent, options) {
        var me = this;
        me.addCsvWinLangImplement(abstractcomponent);
    },
    addCsvWinLangImplement: function(absCmp) {
        var lang = Ext.LANG;
        absCmp.setTitle(lang.addCsvField.headerTitle);
        absCmp.query('button[itemId=btnSave]')[0].setText(lang.globalLang.buttons.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(lang.globalLang.buttons.btnCancel);
    },
    implementLanguage: function(abstractcomponent) {
        var importExportCsvWindow = abstractcomponent;
            csvNameLbl = importExportCsvWindow.query('textfield[itemId=CsvNameLbl]')[0],
            csvNameJp = importExportCsvWindow.query('textfield[itemId=CsvNameJp]')[0],
            csvBillCode = importExportCsvWindow.query('textfield[itemId=CsvBillCode]')[0],
            csvReportName = importExportCsvWindow.query('textfield[itemId=CsvReportName]')[0],
            mappedCombo = importExportCsvWindow.query('combobox[itemId=MappedCombo]')[0],
            csvType = importExportCsvWindow.query('combobox[itemId=ImportExportCsvCombo]')[0];
        importExportCsvWindow.setTitle(lang.importExportCsvWindow.headerTitle);
        importExportCsvWindow.query('button[itemId=SaveCsvBtn]')[0].setText(lang.globalLang.buttons.btnSave);
        importExportCsvWindow.query('button[itemId=CancelCsvBtn]')[0].setText(lang.globalLang.buttons.btnCancel);
        importExportCsvWindow.query('button[itemId=AddCsvBtn]')[0].setText(lang.globalLang.buttons.btnAdd);
        abstractcomponent.query('gridcolumn[itemId=csvFieldName]')[0].setText(lang.importExportCsvWindow.csvFieldName);
        abstractcomponent.query('gridcolumn[itemId=DisplayColCsvImport]')[0].setText(lang.importExportCsvWindow.displayColCsvImport);
        abstractcomponent.query('gridcolumn[itemId=removeActionCsvImport]')[0].setText(lang.importExportCsvWindow.removeActionCsvImport);
        //csvNameLbl.setFieldLabel(lang.importExportCsvWindow.csvName);
        //csvNameJp.setFieldLabel(lang.importExportCsvWindow.csvNameJp);
        csvBillCode.setFieldLabel(lang.importExportCsvWindow.csvBillCode);
        csvReportName.setFieldLabel(lang.importExportCsvWindow.csvReportName);
        mappedCombo.setFieldLabel(lang.importExportCsvWindow.mappedFrom);
        csvType.setFieldLabel(lang.importExportCsvWindow.csvType);
    },
     /*importExportCSVWindow*/
    onImportExportCsvWindowBeforeRender: function(abstractcomponent, options) {
        var me = this, i;
        abstractcomponent.query('gridcolumn[itemId=MoveColSelectedCsvImport]')[0].renderer = me.renderDragAction;
        abstractcomponent.query('gridcolumn[itemId=removeActionCsvImport]')[0].renderer = me.renderActionCsvImport;
        abstractcomponent.query('gridcolumn[itemId=DisplayColCsvImport]')[0].renderer = me.GridUpDownButtonRender;
        // abstractcomponent.query('gridcolumn[itemId=MoveColSelectedCsvImport]')[0].renderer = me.renderMoveAction;
        me.implementLanguage(abstractcomponent);
        me.loadMappedCombo(abstractcomponent);
        me.loadImportExportCsvCombo(abstractcomponent);      
    },

     /*Mapped From Combo*/
    loadMappedCombo:function(abstractcomponent) {
        var me = this, 
        mappedComboStore = abstractcomponent.query('combo[itemId=MappedCombo]')[0].getStore();
        mappedComboStore.load();
    },

    /*CSV Type Combo*/
    loadImportExportCsvCombo:function(abstractcomponent) {
        var me = this, 
        importExportCsvCombo = abstractcomponent.query('combo[itemId=ImportExportCsvCombo]')[0].getStore();
        //importExportCsvCombo.load();
     /*   importExportCsvCombo.load({
            callback:function(records, operation, success){
                abstractcomponent.query('combo[itemId=ImportExportCsvCombo]')[0].setValue(records[1].data.display_value);
            }
        });*/
    },

    createImportExportCsvWindow: function(header)
    {
        var me = this,
            importExportCsvWin = Ext.create('YBase.view.ImportExportCsvWindow'),
            csvImportExportStore = importExportCsvWin.query('grid[itemId=ImportExportCsvGrid]')[0].getStore();
        // this.csvImportExportStore = csvImportExportStore;
        /*removes previous data from store*/
        if(!Ext.isEmpty(csvImportExportStore.data.items))
        {
            csvImportExportStore.removeAll();
        }   
        /*enters when header is passed from onFileFieldChange()*/     
        if(typeof(header) !='number')
        {
            /*inserts data into store*/      
            for(var i=0;i<header.length;i++)
            {
                csvImportExportStore.insert(i, {'csv_field_name':header[i]});
            }    
        }
        else
        {   
            var csvReportId = header;
            Ext.Ajax.request({
                url: 'bizlayer/reportField/getCsvFieldName',
                params:
                {
                    'csv_report_id':csvReportId
                },
                success: function(response) {
                    resp = Ext.decode(response.responseText);
                    var win = Ext.ComponentQuery.query('window[itemId=ImportExportCsvWindow]')[0],
//                        csvName = win.query('textfield[itemId=CsvNameLbl]')[0].setValue(resp.csvFields[0].mapped_name), 
                        csvBillCode = win.query('textfield[itemId=CsvBillCode]')[0].setValue(resp.csvFields[0].bill_code), 
                       // csvNameJp = win.query('textfield[itemId=CsvNameJp]')[0].setValue(resp.csvFields[0].name_jp), 
                        csvReportName = win.query('textfield[itemId=CsvReportName]')[0].setValue(resp.csvFields[0].report_name), 
                        tableId = win.query('hiddenfield[itemId=TableId]')[0].setValue(resp.csvFields[0].csv_report_id);
                        csv_type = win.query('combo[itemId=ImportExportCsvCombo]')[0].setValue(resp.csvFields[0].csv_type),              
                        tableNameArray = [],
                        tableIdArray = [];
                    for(var i=0; i<resp.mappedTables.length; i++)
                    { 
                        tableNameArray.push(resp.mappedTables[i].table_name);  
                        tableIdArray.push(resp.mappedTables[i].table_id);
                    }
                    win.query('combo[itemId=MappedCombo]')[0].display_field = tableNameArray;
                    combo =  win.query('combo[itemId=MappedCombo]')[0].setValue(tableIdArray);
                    csvImportExportStore.loadData(resp.csvFields);
                },
                failure:function(response){
                    // Ext.Msg.alert('Messsage','failure');
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   Ext.LANG.alertMsg.globalLang.invalidFileType,
                        modal: true,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });      
        }
        importExportCsvWin.show();

    },
    // onImportExportCsvWindowClose: function(panel, eOpts) {
    //     debugger;
    //     var me = this,
    //         ecSiteGridStore = Ext.ComponentQuery.query('grid[itemId=EcSiteGrid]')[0].getStore(),
    //         csvReportId = ecSiteGridStore.data.items[0].data.csv_report_id;
    //     var ecStore = Ext.getStore('EcSiteStore');
    //                 ecStore.load({
    //                     params:{
    //                         csv_report_id:csvReportId
    //                     }
    //                 });
    //     /*winStore loaded because on ImportExportCsvWindow close ismapped of winston has to reload as well */
    //     var winstonStore = Ext.getStore('WinstonStore');
    //                 winstonStore.load({
    //                     params:{
    //                         csv_report_id:csvReportId
    //                     }
    //                 });  
    // },

    onCsvImportExportGridItemClick: function(grid, record, item, index, e, options) {
        var me = this, table_field_id,idx;
        if (e.getTarget('.btn_row_del'))
        {
            /*removes record for new csv file import*/
            if(Ext.isEmpty(record.data.csv_report_id) && Ext.isEmpty(record.data.csv_report_field_id)) {
                grid.getStore().remove(record);      
            }
            /*removes the record for edited csv file import*/
            else if(Ext.isEmpty(record.data.is_single_mapped)) {
                Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o) {
                    if (o == "yes") {
                        Ext.Ajax.request({
                            url: 'bizlayer/reportField/deleteCsvMapped',
                            method: 'POST',
                            params:
                            {
                                'csv_report_field_id':record.data.csv_report_field_id,
                                'csv_report_id':record.data.csv_report_id
                            },
                            success: function(response) {
                                var resp = Ext.decode(response.responseText);
                                // Ext.getStore('EcSiteStore').load({params:{
                                //     'csv_report_id':parseInt(resp.csvReportId)
                                // }});
                                // debugger;
                                grid.getStore().remove(record);                            
                                // Ext.MessageBox.alert('Messsage', 'Successfully record deleted');
                                Ext.Msg.show({
                                    title: Ext.LANG.globalLang.app.appTitle,
                                    msg:   Ext.LANG.globalLang.successMsg.deleteSuccess,
                                    modal: true,
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK
                                });
                            },
                            failure:function(response){
                                // Ext.MessageBox.alert('Messsage', 'failure');
                                Ext.Msg.show({
                                    title: Ext.LANG.globalLang.app.appTitle,
                                    msg:   Ext.LANG.globalLang.errorMsg.deleteError,
                                    modal: true,
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                            
                        });
                    }
                });                
            }
            else {
                // Ext.Msg.alert('Message','the record is mapped and cannot be deleted');
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.deleteError,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
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

    /*Save button of ImportExportCsvWindow*/
    SaveCsvBtnClick: function(button, e, eOpts) {  
        var me = this,
            ecSiteExportPanel = me.getEcSiteExportPanel(),
            ecSiteGrid = ecSiteExportPanel.query('grid[itemId=EcSiteGrid]')[0],
            winstonGrid = ecSiteExportPanel.query('grid[itemId=winstonGrid]')[0],
            csvMasterMappedCombo = ecSiteExportPanel.query('combobox[itemId=CsvMasterMappedCombo]')[0],
            importExportCsvForm = button.up('form'),
            csvImportExportStore = importExportCsvForm.query('grid[itemId=ImportExportCsvGrid]')[0].getStore(),
            //csvName = importExportCsvForm.query('textfield[itemId=CsvNameLbl]')[0],
            csvBillCode = importExportCsvForm.query('textfield[itemId=CsvBillCode]')[0],
            //csvNameJp = importExportCsvForm.query('textfield[itemId=CsvNameJp]')[0],
            csvReportName = importExportCsvForm.query('textfield[itemId=CsvReportName]')[0],
            tableId = importExportCsvForm.query('hiddenfield[itemId=TableId]')[0],
            mappedCombo = importExportCsvForm.query('combobox[itemId=MappedCombo]')[0],
            importExportCsvCombo = importExportCsvForm.query('combobox[itemId=ImportExportCsvCombo]')[0],
            mappedComboValue = mappedCombo.getValue().toString(),
            importExportCsvComboValue = importExportCsvCombo.getValue(),
            //csvNameValue = csvName.getValue(),
            csvBillCodeValue = csvBillCode.getValue(),
            //csvNameJpValue = csvNameJp.getValue(),
            csvReportNameValue = csvReportName.getValue(),
            tableIdValue = tableId.getValue();
        me.saveError=false;
            if(!importExportCsvForm.isValid())
            {
                // if(Ext.isEmpty(csvNameValue))
            // {
                // Ext.Msg.alert('Messsage','fields required');
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.requiredFieldMissing,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                return;
            // }
            }            
        dataArray = [];      
        csvImportExportStore.each(function(record){
            if(!Ext.isEmpty(record.data.csv_field_name)) {
                dataArray.push(record.data);    
            }
            else {
                this.saveError=true;
                return false;
            }
                  
        },me); 
        if(!me.saveError) {
            Ext.Ajax.request({
                url: 'bizlayer/report/saveCsvMappedName',
                method: 'POST',
                params:
                {
                   // 'csvMappedName':csvNameValue,
                    'csvBillCodeValue':csvBillCodeValue,
                   // 'csvNameJpValue':csvNameJpValue,
                    'csvReportNameValue':csvReportNameValue,
                    'mapTableId': mappedComboValue,
                    'csvFieldName':JSON.stringify(dataArray),
                    'csvReportId':tableIdValue,
                    'importExportCsvComboValue':importExportCsvComboValue
                },
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success == true) {
                        // Ext.MessageBox.alert('Messsage', 'success');
                        // Ext.MessageBox.alert(Ext.LANG.app.appTitle, Ext.LANG.successMsg.saveSuccess);
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.globalLang.successMsg.saveSuccess,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        csvMasterMappedCombo.getStore('CsvMappedMasterStore').load({params:{
                            'csv_report_id':parseInt(resp.csvReportId)
                        }});
                        ecSiteGrid.getStore('EcSiteStore').load({params:{
                            'csv_report_id':parseInt(resp.csvReportId)
                        }});
                        winstonGrid.getStore('WinstonStore').load({params:{
                            'csv_report_id':parseInt(resp.csvReportId)
                        }});
                        ecSiteExportPanel.query('combobox[itemId=CsvMasterMappedCombo]')[0].setValue(csvReportNameValue);
                        YBase.app.getController('EcSiteExportController').setCsvMappedMasterId(parseInt(resp.csvReportId));
                        // this.csv_master_id = parseInt(resp.csvReportId);

                    }
                    else {
                        // Ext.MessageBox.alert('Messsage', resp.data);
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   resp.data,
                            modal: true,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                    
                    button.up('window').close();         
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
        }
        else {
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.errorMsg.requiredFieldMissing,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
        }
    },
    
    /*Cancel button of ImportExportCsvWindow*/
    CancelCsvBtnClick: function(button, e, eOpts) 
    {
        var me =this;
        var importExportCsvWin = button.up('window');
        importExportCsvWin.close();
        // Ext.getStore('EcSiteStore').load();
    },
    onFileFieldChange:function(filefield, value, eOpts) {
        var me = this;
            ecSiteExportPanel = me.getEcSiteExportPanel(),
            squareCsvTypeRadio = ecSiteExportPanel.query('radio[itemId=SquareCsvType]')[0],
            ecCsvTypeRadio = ecSiteExportPanel.query('radio[itemId=EcCsvType]')[0];
        me.form = filefield.up('form');
        if(squareCsvTypeRadio.checked == true) {
            _params = {'csvType':'Square'};
        }
        else {
            _params = {'csvType':'EC'}
        }
        me.form.submit({
            url: 'bizlayer/reportField/uploadCsvFile',
            params: _params,
            success: function(form, action) {
                var resp = Ext.decode(action.response.responseText),
                    header = resp.data;

                    me.createImportExportCsvWindow(header);             
                    // me.saveHeader(header);
            },
            failure:function(){
                // Ext.Msg.alert('Messsage','wrong file');
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.alertMsg.globalLang.invalidFileType,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    onAddCsvBtnClick: function(button, e, eOpts) {
         var me = this,
            addCsvWin = Ext.create('YBase.view.AddCsvWindow');
        addCsvWin.show();
    },
    onBtnSaveClick: function(button, e, eOpts) {
        var me = this,
            addCsvWin = me.getAddCsvWindow(),
            csvFieldTextArea = addCsvWin.query('textareafield[itemId=csvFieldTextArea]')[0],
            csvField=csvFieldTextArea.getValue().trim(),
                /*convert multiples line brks to single space*/
            //the + sign defines the multiple \n(line brks) and g defines the global removal of all \n
            singleSpacedData=csvField.replace(/\n+/g," "),
            /*convert all the spaces to comma separated*/
            csvField1=singleSpacedData.replace(/ +/g,","),
            /*replace multiple commas*/
            finalCsvField=csvField1.replace(/,+/g,",");
        if(!Ext.isEmpty(finalCsvField)) {
            var csvFieldArray = finalCsvField.split(','),
                importExportCSVWin = me.getImportExportCsvWindow(),
                grid = importExportCSVWin.query('grid[itemId=ImportExportCsvGrid]')[0],
                gridStore = grid.getStore();
            for(var i=0;i<csvFieldArray.length;i++) {
                var rawObj = {};
                rawObj = {
                    'csv_field_name': csvFieldArray[i]
                };
                gridStore.add(rawObj);
            }
            addCsvWin.close();
        }
        else {
            //do nth
        }
    },    
    onBtnCancelClick: function(button, e, eOpts) {
        var me =this;
        var addCsvWin = button.up('window');
        addCsvWin.close();
    },
    init: function(application) {
        this.control({
            '#ImportExportCsvWindow': {
                beforerender: this.onImportExportCsvWindowBeforeRender
                // close: this.onImportExportCsvWindowClose
            },
            "importExportCsvWindow grid[itemId=ImportExportCsvGrid]": {
                itemclick: this.onCsvImportExportGridItemClick
            },
            "importExportCsvWindow button[itemId=SaveCsvBtn]": {
                click: this.SaveCsvBtnClick
            },
            "importExportCsvWindow button[itemId=CancelCsvBtn]": {
                click: this.CancelCsvBtnClick
            },
            "importExportCsvWindow button[itemId=AddCsvBtn]": {
                click: this.onAddCsvBtnClick
            },
            "#ImportCsvHeader": {
                change: this.onFileFieldChange
            },
            "addCsvWindow": {
                beforerender:this.onAddCsvWindowBeforeRender
            },
            "addCsvWindow button[itemId=btnSave]": {
                click: this.onBtnSaveClick
            },
            "addCsvWindow button[itemId=btnCancel]": {
                click: this.onBtnCancelClick
            }
        });
    }
});