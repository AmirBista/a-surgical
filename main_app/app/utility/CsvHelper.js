Ext.define('YBase.utility.CsvHelper', {
    singleton: true,
    dwnldSelectedDataCsv: function(csvParams)  {
        var me = this,
            cntrl = csvParams.cntrl,
            csvName = csvParams.csvName,
            datagrid_id = csvParams.datagrid_id,
            url = csvParams.url,
            grid = csvParams.grid,
            gridStore = grid.getStore(),
            selectedRows = grid.getSelectionModel().getSelection(),
            cols = grid.columns,
            columnCount = cols.length,
            visibleColumn = [],
            colObj={};

        for (i = 0; i < columnCount; i++) {
            if (cols[i].hidden !== true 
                && cols[i].dataIndex !== ''
                && cols[i].itemId !== 'action_column'
                && cols[i].colItemId !== 'action_column')
            {
                colObj['field_label'] = cols[i].text;
                colObj['column_name'] = cols[i].dataIndex;
                visibleColumn.push(colObj);
                colObj={};
                // visibleColumn.push(grid.columns[i].dataIndex);
            }
        }
        if (selectedRows.length == 0) {
            cntrl.showToolBarMsg(Ext.LANG.globalLang.alertMsg.rowsNotSelect,false);
            return;
        }
        var csvFunction = function() {
            var selected = [];
            Ext.each(selectedRows, function(row) {
                /*@change here. row.dirty === true*/
                    var data = {};
                    for (i = 0; i < visibleColumn.length; i++) {
                        //data[visibleColumn[i]] = row.get(visibleColumn[i]);
                        data[visibleColumn[i].column_name] = row.raw[visibleColumn[i].column_name];//row.get(visibleColumn[i]);
                    }
                    selected.push(data);
            });
            var selectedContainerRows = JSON.stringify(selected),
                columns = JSON.stringify(visibleColumn);
            var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: "bizlayer/csvExport/selectedCsvExport",
                baseParams: {
                    'datagrid_id': datagrid_id,
                    'selectedRows': selectedContainerRows,
                    'columns':columns,
                    'prefix': csvName+'_'
                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
        }
        if (gridStore.getModifiedRecords().length > 0) {
            Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.unsavedRecordExportCSV, function(btn) {
                if (btn === 'no') {
                    return;
                } else {
                    csvFunction();
                }
            });
        } else {
            csvFunction();
        }
    },
    dwnldAllDataCsv: function(csvParams) {
        var me                  = this,
            cntrl               = csvParams.cntrl,
            datagrid_id         = csvParams.datagrid_id,
            get_template_list   = csvParams.get_template_list,
            templateId          = csvParams.templateId,
            extraParams         = csvParams.extra_params,
            grid                = csvParams.grid,
            gridStore           = grid.getStore(),
            filterData          = grid.getHeaderFilters(),
            filterRecords       = filterData.getRange(),
            filterLength        = filterRecords.length,
            lang                = Ext.LANG,
            filterCount         = null,
            data                = {},
            filter              = [];
        if(Ext.isEmpty(templateId))
            templateId=null;
        
        filterData.each(function(record){
            if(!Ext.isEmpty(record.value))
            {
               data['property'] = record.property;
               data['value'] = record.value;
               filter.push(data);
            }           
        });
        
        var form_325 = new Ext.FormPanel({
            id: "csvForm",
            method: "POST",
            url: gridStore.getProxy().api.read,
            baseParams: {
                get_columns: 1,
                get_sku_column:1,
                showAllField: true,
                datagrid_id: datagrid_id,
                filter : JSON.stringify(filter),
                pages : "allPages",
                set_template_id:templateId,
                get_template_list:get_template_list
            },
            standardSubmit: true
        });
        if(!Ext.isEmpty(extraParams)) { 
            for(var key in extraParams) {
                form_325.baseParams[key] = extraParams[key];
            }
        }
        form_325.getForm().submit({
            target: '_blank'
        });
    }
    /*
    * Exports All CSV Data and All Grid Column
    */
    /*downloadAllCsv: function(phpController){
        var url='bizlayer/'+ phpController +'/exportAllCsv',
            form=Ext.create('Ext.form.Panel', {
                'url': url,
                standardSubmit: true
            });
        form.getForm().submit();     
    },*/
    /*
    * Exports Selected Record Only and All Grid Column
    */
    /*downloadSelectedRecCsv: function(grid, phpController){
        var selModel = grid.getSelectionModel(),
            records = grid.getStore().data.items,
            dataLen = records.length,
            cols = grid.columns,
            columnCount =  cols.length,
            visibleColumn = [],
            visibleColumnLbl=[],
            selected =[],
            i, j,
            url = 'bizlayer/'+ phpController +'/exportSelectedColGridData';
        if (selModel.hasSelection() !== true) {
            // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.rowsNotSelect);
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.alertMsg.rowsNotSelect,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }

        for (var i = 0; i < columnCount; i++) {
            if (cols[i].dataIndex!=='' && cols[i].dataIndex !=='is_read'){
                visibleColumn.push(cols[i].dataIndex);
                visibleColumnLbl.push(cols[i].text);
            }
        }

        for (j = 0; j < dataLen; j++) {
            if (selModel.isSelected(records[j]))
            {

                data = {};
                //selected.push(records[j].raw[hash_id]);
                for (i = 0; i < visibleColumn.length; i++) {
                    data[visibleColumnLbl[i]] = records[j].raw[visibleColumn[i]];
                }
                selected.push(data);
            }
        }
            
        var form=Ext.create('Ext.form.Panel', {
            'url': url,
            baseParams: {
                id: 'incCsvForm',
                selectedRows: JSON.stringify(selected)
            },
            standardSubmit: true
        });
        form.getForm().submit();
    },*/
    /*
    * Exports Selected CSV Data and Selected Grid Columns Only 
    */
    /*downloadSelectedColRecCsv: function(grid, controller){
        
        var selModel = grid.getSelectionModel(),
            records = grid.getStore().data.items,
            dataLen = records.length,
            cols = grid.columnManager.columns,
            columnCount =  cols.length,
            visibleColumn = [],
            visibleColumnLbl=[],
            selected =[],
            hasHashId=false,
            i, j,
            url = 'bizlayer/'+ controller +'/exportSelectedColGridData';

        visibleColumn.push('hash_id');
        visibleColumnLbl.push(Ext.LANG.globalLang.gridHeader.lblHashId);

        if (selModel.hasSelection() !== true) {
            // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.rowsNotSelect);
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.alertMsg.rowsNotSelect,
                modal: true,
                icon: Ext.Msg.INFO,
                buttons: Ext.Msg.OK
            });
            return;
        }
        for (var i = 0; i < columnCount; i++) {
            if (cols[i].hidden !== true && !Ext.isEmpty(cols[i].dataIndex) && cols[i].dataIndex !=='is_read'){
                if(cols[i].dataIndex=="hash_id"){
                    hasHashId=true;
                }
                visibleColumn.push(cols[i].dataIndex);
                visibleColumnLbl.push(cols[i].text);
            }
        }
        var start=0;
        if(hasHashId===true)
            start=1;
        else
            start=0;

        for (j = 0; j < dataLen; j++) {
            if (selModel.isSelected(records[j]))
            {
                data = {};
                for (i=start; i < visibleColumn.length; i++) {
                    data[visibleColumnLbl[i]] = records[j].raw[visibleColumn[i]];
                }
                selected.push(data);
            }
        }
            
        var form=Ext.create('Ext.form.Panel', {
            'url': url,
            baseParams: {
                id: 'incCsvForm',
                selectedRows: JSON.stringify(selected)
            },
            standardSubmit: true
        });
        form.getForm().submit();
    },*/
    /*
    * Exports All Record Only and Selected/Visible Grid Column
    */
    /*downloadSelectedColCsv: function(grid, phpController,jsController){
        var cols = grid.columnManager.columns,
            columnCount =  cols.length,
            visibleColumn = [],
            i, j,params,
            url = 'bizlayer/'+ phpController +'/exportSelectedColCsv';
        
        for (var i = 0; i < columnCount; i++) {
            if (cols[i].hidden !== true && cols[i].dataIndex!=='' && cols[i].dataIndex !=='is_read'){
                visibleColumn.push(cols[i].dataIndex);
            }
        }

        params=jsController.getParams();
        
        var form=Ext.create('Ext.form.Panel', {
            'url': url,
            baseParams: {
                'selectedCol': JSON.stringify(visibleColumn),
                'filter_params' : JSON.stringify(params)
            },
            standardSubmit: true
        });
        form.getForm().submit();
    },
    importCsv :function(controller,grids,win){
        var me=this;
        if(Ext.isEmpty(win)) win='CsvImportWin';
            // fw = abstractcomponent.getCsvImportWin(),
        var fw= Ext.ComponentQuery.query('window[itemId='+win+']')[0],
            attForm = fw.query('form[itemId=CsvImpForm]')[0],
            frm=attForm.getForm(),
            url = 'bizlayer/'+ controller +'/importGridData';
            var relGrid=Ext.ComponentQuery.query('grid[itemId='+grids+']')[0];
        if(frm.isValid()) {
            frm.submit({
                'url': url,
                success: function(form,action) {
                    var importInfo=action.result.importInfo,
                        message=    action.result.msg + '\n\r' + 
                                'Affected Rows : ' + importInfo.successImports + '\n\r' +
                                'Rows Inserted : ' + importInfo.numberOfRecAdded + '\n\r' +
                                'Rows Updated : ' + importInfo.numberOfRecUpdated;
                    // Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle, message);
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   message,
                        modal: true,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    fw.close();
                    relGrid.getStore().reload();
                },
                failure:function(form, action){
                    var importInfo=action.result.importInfo,
                        message=    action.result.msg + '\n\r';
                    if(!Ext.isEmpty(importInfo)){
                        message = message +
                                    'Total Records : ' + importInfo['totalCsvRecord'] + '\n\r' +
                                    'No. Of Valid Records : ' + importInfo['successImports'] + '\n\r' +
                                    'No. Of Invalid Records : ' + importInfo['failedImports'] + '\n\r' +
                                    'Invalid CSV Row Number : ' + importInfo['failedRecordIds'];
                    }
                    // Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle, message);
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   message,
                        modal: true,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }
    },
    createCsvMenu: function(abstractcomponent,phpController,jsController){
        var me=this,
            mnuCsv = abstractcomponent.query('menu[itemId=mnuCSV]')[0],
            mnu = [];

        // mnu.push({
        //     'text': 'All Columns All Records',
        //     handler: function(item,e){
        //         var me=this.myScope;
        //         me.downloadAllCsv(this.phpController);
        //     },
        //     scope: {
        //         myScope: me,
        //         phpController: phpController
        //     }
        // });

        mnu.push({
            'text': Ext.LANG.globalLang.csvExport.btnCSVExportAllclmSelrec,
            handler: function(item,e){
                var me=this.myScope,
                    abstractcomponent=this.abstractcomponent,
                    phpController=this.phpController,
                    grid=abstractcomponent.query('grid')[0];
                me.downloadSelectedRecCsv(grid, phpController);

            },
            scope: {
                myScope: me,
                abstractcomponent: abstractcomponent,
                phpController: phpController
            }
        });

        mnu.push({
            'text': Ext.LANG.globalLang.csvExport.btnCSVExportSleclmSlerec,
            handler: function(item,e){
                var me=this.myScope,
                    abstractcomponent=this.abstractcomponent,
                    phpController=this.phpController,
                    grid=abstractcomponent.query('grid')[0];
                me.downloadSelectedColRecCsv(grid, phpController);
            },
            scope: {
                myScope: me,
                abstractcomponent: abstractcomponent,
                phpController: phpController
            }
        });

        // mnu.push({
        //     'text': 'Selected Columns All Records',
        //     handler: function(item,e){
        //         var me=this.myScope,
        //             abstractcomponent=this.abstractcomponent,
        //             phpController=this.phpController,
        //             jsController=this.jsController,
        //             grid=abstractcomponent.query('grid')[0];
        //         me.downloadSelectedColCsv(grid, phpController,jsController);
        //     },
        //     scope: {
        //         myScope: me,
        //         abstractcomponent: abstractcomponent,
        //         phpController: phpController,
        //         jsController: jsController
        //     }
        // });

        mnuCsv.add(mnu);
    }  */  
});