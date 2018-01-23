Ext.define('YBase.utility.PrintHelper', {
    singleton: true,
    printSelectedData: function(csvParams)  {

    },
    printData: function(csvParams)  {
        var me = this,
            cntrl = csvParams.cntrl,
            csvName = csvParams.csvName,
            datagrid_id = csvParams.datagrid_id,
            csv_report_id = csvParams.csv_report_id,
            auction_master_ids = csvParams.auction_master_ids,
            print_all = csvParams.print_all,
            url = csvParams.url,
            grid = csvParams.grid,
            gridStore = grid.getStore(),
            selectedRows = grid.getSelectionModel().getSelection();
        if (!print_all && selectedRows.length == 0) {
            cntrl.showToolBarMsg(Ext.LANG.globalLang.alertMsg.rowsNotSelect,false);
            return;
        }
        me.csvFunction = function(selectedRows) {
            var selected = [], auction_detail_ids = "";
            if (!print_all){
                Ext.each(selectedRows, function(row) {
                    selected.push(row.raw.id);
                });
                auction_detail_ids = selected.join(",");
            }

            var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: url,
                baseParams: {
                	'csv_report_id': csv_report_id,
                    'order_masters_ids': auction_master_ids,
                    'order_detail_ids': auction_detail_ids,
                    'prefix': csvName,
                    'printAll':true
                },
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
        };

        if (gridStore.getModifiedRecords().length > 0) {
            Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.unsavedRecordExportCSV, function(btn) {
                if (btn === 'no') {
                    return;
                } else {
                    me.csvFunction(selectedRows);
                }
            });
        } else {
            me.csvFunction(selectedRows);
        }
    },
    printAllData: function(csvParams) {
        var me = this,
            cntrl = csvParams.cntrl,
            datagrid_id = csvParams.datagrid_id,
            get_template_list = csvParams.get_template_list,
            templateId = csvParams.templateId,
            csv_report_id = csvParams.csv_report_id,
            grid = csvParams.grid,
            gridStore = grid.getStore(),
            filterData = grid.getHeaderFilters(),
            filterRecords = filterData.getRange(),
            filterLength = filterRecords.length,
            lang = Ext.LANG,
            filterCount=null,
            data = {},
            filter = [];
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
        
         /*datagrid_id is PanelNo and is sent for get getting columns in php side*/
        var form_325 = new Ext.FormPanel({
            id: 'csvForm',
            method: "POST",
            url: "bizlayer/csvExport/getRptListData",
            baseParams: {
                get_columns: 1,
                get_sku_column:1,
                showAllField: me.showAllField,
                filter : JSON.stringify(filter),
                printAll: true,
                csv_report_id : csv_report_id/*me.csv_report_id*/,
                prefix: me.csv_mapped_name
            },
            
            standardSubmit: true
        });

        form_325.getForm().submit({
            target: '_blank'
        });
    }
})