Ext.define('YBase.controller.ReportController', {
    extend: 'YBase.controller.BaseController',
    id: 'ReportController',
    currentViewAlias:'report',
    abstractcomponent:null,
    refs:[
        {
            ref: 'report',
            selector: 'report'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    skuCmpPanelExpand:false,
    bulkPanelSearch:false,
    errorFlg:false,
    getEditorRowCol: function(editor, e) {
        this.rowNo = editor.context.rowIdx;
        this.colNo = editor.context.colIdx;
    },
    implementLang: function(absCmp) {
        var me=this,
            lang=Ext.LANG,
            basePanelLang=lang.BasePanel;
        absCmp.setTitle(lang.report.panelTitle);
        absCmp.query('button[itemId=leftPanelUpdateBtn]')[0].setVisible(false);
        absCmp.query('button[itemId=leftPanelAddBtn]')[0].setVisible(false);
        absCmp.query('button[itemId=middleCntSaveBtn]')[0].setVisible(false);
        absCmp.query('button[itemId=middleCntDeleteBtn]')[0].setVisible(false);
        absCmp.query('button[itemId=middleCntCsvBtn]')[0].setText(basePanelLang.middleCntCsvBtn);
        absCmp.query('menuitem[itemId=selectedCsvMenu]')[0].setText(basePanelLang.selectedCsvMenu);
        absCmp.query('menuitem[itemId=allCsvMenu]')[0].setText(basePanelLang.allCsvMenu);
        absCmp.query('button[itemId=middleCntPrintBtn]')[0].setText(basePanelLang.middleCntPrintBtn);
        absCmp.query('menuitem[itemId=selectedPrintMenu]')[0].setText(basePanelLang.selectedPrintMenu);
        absCmp.query('menuitem[itemId=allPrintMenu]')[0].setText(basePanelLang.allPrintMenu);

        absCmp.query('container[itemId=middleDisplayFieldCnt]')[0].setVisible(false);
        absCmp.query('panel[itemId=rightPanel]')[0].setVisible(false);
        absCmp.query('panel[itemId=leftPanel]')[0].setWidth(300);
        absCmp.query('panel[itemId=leftPanel]')[0].setTitle(lang.report.leftPanelTitle);
    },
    /*------------------------MainPanel[START]----------------------------------*/
    onViewBeforeRender: function(absCmp, eOpts) {
        var me = this,
            leftPanel = absCmp.query('panel[itemId=leftPanel]')[0];
        leftPanel.removeAll();
        me.absCmp = absCmp;
        var dataView = me.createTpl(absCmp);

        leftPanel.add(dataView);
        var dView = absCmp.query('dataview[itemId=reportListView]')[0],
            st = dView.getStore();
        st.on('load',me.onTplStoreLoad,me);
        dView.on('beforeitemclick',me.onReportListViewBeforeItemClick,me);
        dView.on('selectionchange',me.onReportListViewSelectionChange,me);
        st.load();

        if (Ext.msk) 
            Ext.msk.hide();
        me.implementLang(absCmp);
    },
    addHelpCmp: function(absCmp,helpTextInfo) {
        var me=this,
            container =  absCmp.query('container[itemId=topHelpCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.reportLink,
            label = lang.help_label.help;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    onViewAfterRender: function(absCmp, eOpts) {
        var me = this,
            leftPanel = absCmp.query('panel[itemId=leftPanel]')[0];
        // leftPanel.expand();
    },
    /*------------------------MainPanel[END]----------------------------------*/
    onViewBodyCntBeforeRender: function(gridCnt,options) {
       //do nth
    },
    createTpl: function(absCmp) {
        var me = this;
        var tpl = new Ext.XTemplate(
            '<tpl for=".">',
                ' <tpl if="this.isNewGroup(values)">',
                    '{[this.setGroup(values)]}',
                        ' <tpl if="this.isNotfirstItem(xindex)">',
                            '    </div>', //closing for previous div
                        ' </tpl>',
                    '    <div class="{group_name}">',
                ' </tpl>',
                '    <div class="reportList-div {[this.getHighlightClass(values)]}">',
                '        <div class="yig-report-s-w">&nbsp</div>',
                '       <div class="image-tpl"> <span class="report-name-jp">{name_jp}</span><span class="report-name">{report_name}</span></div>',
                '    </div>',
                ' <tpl if="this.isLastItem(xindex, xcount)">',
                    '    </div>', //closing for previous div
                ' </tpl>',
            '</tpl>',
            {
                // XTemplate configuration:
                disableFormats: true,
                pregroup: '',
                isNewGroup: function(values){
                   return this.pregroup !== values.group_name;
                },
                setGroup: function(values){
                   this.pregroup = values.group_name;
                },
                isNotfirstItem:function(idx){
                    return idx > 1;
                },
                isLastItem:function(idx, cnt){
                    return idx == cnt;
                },
                getHighlightClass:function(values){
                    if (values.is_selected == '1'){
                        return "active-report-btn";
                    }
                    return "";
                }
            }
        );
        var dataView =  {
            xtype: 'dataview',
            itemId: 'reportListView',
            tpl: tpl,
            itemSelector: 'div.reportList-div',
            store: 'ReportListStore'
        };     
        return dataView;
    },
    onTplStoreLoad: function(store, records) {
        var me      = this,
            len     = records.length, 
            absCmp  = me.absCmp,
            dView   = absCmp.query('dataview[itemId=reportListView]')[0],
            is_csvMasterIdMatch = false;
        if(len>0){
            for (var i = 0; i < len; i++) {
                if(records[i].get('csv_report_id')==absCmp.csv_report_id){
                    dView.selModel.select(records[i]);
                    this.isAnyReportLoaded=true;
                    is_csvMasterIdMatch=true;
                }
            }
            var helpTextInfo=store.proxy.reader.rawData.helpInfo;
            me.addHelpCmp(absCmp,helpTextInfo);
        }
    },
    /*-----------------------------------LeftGridPanel[START]----------------------------------------------*/
    onReportListViewBeforeItemClick:function(view, record, item, index, e, eOpts){
        //if opening in new window then do nothing in current browser window
        if ((e.ctrlKey || e.shiftKey) && e.getTarget('a'))
            return false;
    },
    onReportListViewSelectionChange: function(panel, selected, eOpts) {
        var me = this,
            record = selected[0],
            abstractcomponent = me.getReport();
            if(Ext.isEmpty(record))
                return;
            me.print_template=record.get('print_template');
            me.PanelNo = record.data.csv_report_id;
            me.PanelNo = '9999'+me.PanelNo;//me.PanelNo set for sys_search table
            me.filter_params = Ext.clone(record.data.filter_params);

        if(me.csv_report_id != null && me.csv_report_id == record.data.csv_report_id) {
            me.showToolBarMsg( Ext.LANG.globalLang.alertMsg.alreadyLoaded,false);
        }
        else {
            me.csv_report_id = record.data.csv_report_id;
            me.report_name = record.data.report_name;
            Ext.Router.redirect('report?id='+me.csv_report_id);
            me.middleGridCnt = abstractcomponent.query('container[itemId=middleGridCnt]')[0];
            me.middleGridCnt.removeAll();
            me.addMiddleGridCntProperty();
            me.loadMiddleGridData(me,abstractcomponent);
        }
    },
    /*-----------------------------------LeftGridPanel[END]----------------------------------------------*/

    /*-----------------------------------MddleGridCnt[START]----------------------------------------------*/
    addMiddleGridCntProperty: function() {
        var me = this;
        me.middleGridCnt.gridNo                     = me.PanelNo;
        me.middleGridCnt.colNo                      = 3;
        me.middleGridCnt.rowNo                      = 0;
        me.middleGridCnt.gridItemId                 = 'reportGrid-'+me.csv_report_id;   
        me.middleGridCnt.addSearchCmp               = true;
        me.middleGridCnt.hideHeaderFilterButtons    = false;
        me.middleGridCnt.addDatagridTemplate        = false;
        me.middleGridCnt.addSummary                 = false;
        me.middleGridCnt.addBulkMenuItem            = false;
        me.middleGridCnt.addTempSearch              = false;
        me.middleGridCnt.chkboxSelModel             = true;
        me.middleGridCnt.showSaveMsg                = false;
        me.middleGridCnt.storeLoadOnSave            = true;
        me.middleGridCnt.createMsgCmp               = true;
        me.middleGridCnt.sortable_grid              = false;
    },
    loadMiddleGridData: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});

        if(me.middleGridCnt.addSearchCmp == true) {
            params['get_search_list'] = true;
        }
        if(me.middleGridCnt.addDatagridTemplate == true) {
            params['get_template_list'] = true;
            if(delStatus != null) {
                YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['csv_report_id'] = me.csv_report_id;
        params_with_col['datagrid_id'] = '9999'+me.csv_report_id;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.middleGridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/reportField/getListData',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.middleGridCnt.responseObj = resp;
                    me.middleGridCnt.templateId = resp.templateId;
                    me.middleGridCnt.templateList = resp.templateList;
                    me.middleGridCnt.searchList = resp.searchList;
                    // me.middleGridCnt.templateId = resp.templateId;
                    YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.pageSize,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize' : pageSize, 
                            'fields' : fields,
                            'validations': resp.validations,
                            'storeId' : 'reportStore', 
                            'storeUrl' : 'bizlayer/reportField/getListData', 
                            'create' : 'bizlayer/reportField/save', 
                            'destroy' : 'bizlayer/reportField/delete', 
                            'extra_params' : {
                                csv_report_id:me.csv_report_id,
                                datagrid_id:'9999'+me.csv_report_id
                            }, 
                            'writeAllFields':true,
                            'editable' : true,
                            'idProperty' : null
                        };
                    me.middleGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl': me,
                            'absCmp': abstractcomponent,
                            'respObj': me.middleGridCnt.responseObj,
                            'gridCnt': me.middleGridCnt,
                            'gridStore': me.middleGridCnt.gridStore, 
                            'gridItemId': me.middleGridCnt.gridItemId,
                            'chkboxSelModel': me.middleGridCnt.chkboxSelModel,
                            'addSearchCmp': me.middleGridCnt.addSearchCmp,
                            'addBulkMenuItem': me.middleGridCnt.addBulkMenuItem,
                            'addDatagridTemplate': me.middleGridCnt.addDatagridTemplate,
                            'addSummary': me.middleGridCnt.addSummary,
                            'listDataFn': me.loadMiddleGridData ,
                            'hidePagingToolbar': false,
                            'loadMask': true,
                            'cellEditorTriggerEvent': null,
                            'selModelMode': null,
                            'setTemplateId':me.middleGridCnt.templateId,
                            'templateList':me.middleGridCnt.templateList,
                            'searchList':me.middleGridCnt.searchList,
                            'addTempSearch':me.middleGridCnt.addTempSearch,
                            'sortable_grid':true,
                            'hideHeaderFilterButtons':me.middleGridCnt.hideHeaderFilterButtons,
                            'createMsgCmp': me.middleGridCnt.createMsgCmp,
                            'sortable_grid':me.middleGridCnt.sortable_grid
                        };
                    me.middleGridCnt.masterGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    if(abstractcomponent.showBulkUpdate == true) {
                        YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.middleGridCnt.masterGrid);
                        YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.middleGridCnt.masterGrid,me.middleGridCnt.gridNo,resp.templateId);
                    }
                    if(abstractcomponent.showSkuCmp == true) {
                        YBase.utility.SkuCmpHelper.gridEventHandleForSkuCmpPanel(me.middleGridCnt.masterGrid);
                    }
                    me.middleGridCnt.gridStore.loadRawData(resp);
                }
            }
        });
    },
    /*-----------------------------------MddleGridCnt[END]----------------------------------------------*/
    getCsvName: function(me) {
        if(me.csv_report_id == 1)
            me.csv_mapped_name = 'OP11_受注データ_';
        if(me.csv_report_id == 2)
            me.csv_mapped_name = 'OP21_手書用１型_';
        if(me.csv_report_id == 3)
            me.csv_mapped_name = 'OP22_手書用_';
        if(me.csv_report_id == 4)
            me.csv_mapped_name = 'OP23_全通2型_';
        if(me.csv_report_id == 5)
            me.csv_mapped_name = 'OP24_百貨店_';
        if(me.csv_report_id == 6)
            me.csv_mapped_name = 'OP25_ラッキー_';
        if(me.csv_report_id == 7)
            me.csv_mapped_name = 'OP26_3つ折_';
        return true;
    },
    exportSelectedRecords: function(url) {
        var me = this;
        if(!Ext.isEmpty(me.csv_report_id)) {
            var lang = Ext.LANG,
                reportGrid = me.getReport().query('grid[itemId='+me.middleGridCnt.gridItemId+']')[0],
                reportGridStore = reportGrid.getStore(),
                selectedRows = reportGrid.getSelectionModel().getSelection(),
                columnCount = reportGrid.columns.length,
                visibleColumn = [],
                date_format = "Y-m-d",
                time_format = "H:i:s",
                numeric_date_format ="Ymd";
            
            var date_time_format = date_format + ' ' + time_format;

            for (i = 0; i < columnCount; i++) {
                if (reportGrid.columns[i].hidden !== true && reportGrid.columns[i].dataIndex !== '')
                {
                    visibleColumn.push(reportGrid.columns[i].dataIndex);
                }
            }
            if (selectedRows.length == 0) {
                me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.rowsNotSelect,false);
                return;
            }
            orderMasterIds=[];orderDetailIds=[];
            /*for(var j=0; j<selectedRows.length; j++){
                orderMasterIds.push(selectedRows[j].raw.order_master_id);
                orderDetailIds.push(selectedRows[j].raw.order_detail_id);
            }*/
            /*for respective csv Names*/
            me.getCsvName(me);
            var csvFunction = function() {
                var selected = [],
                    postal_code_label =  [],
                    order_date_label = [],
                    num_date_format_fields =  [],
                    max_length_fields =  [],
                    maxByteLength = /*Ext.LANG.report.maxByteLength*/null,
                    max_len_fields=[], data ={}, summary_data={},
                    round_off_fields = []; //30
                Ext.each(selectedRows, function(row) {
                    /*@change here. row.dirty === true*/
                    // if (!Ext.isEmpty(selectedRows[0].data.container_id)) {
                        var field_value, formatted_value, field_name, is_formatted;
                        data = {};
                        for (i = 0; i < visibleColumn.length; i++) {
                            field_name = visibleColumn[i];
                            //data[visibleColumn[i]] = row.get(visibleColumn[i]);
                            if (row.data.hasOwnProperty(field_name)){
                                field_value = row.get(field_name);
                            }
                            else
                            {
                                field_value = row.raw[field_name];
                            }

                            is_formatted = false;

                           //data format change for toshiba sys export
                            if (Ext.Array.contains(postal_code_label, field_name)){
                                //'000-0000 format'
                                if (!Ext.isEmpty(field_value) && field_value.length >= 7 && field_value.indexOf('-') < 0){
                                    is_formatted = true;
                                    formatted_value = field_value.substr(0,3) + '-' + field_value.substr(3);
                                }
                            }
                            else if (Ext.Array.contains(order_date_label, field_name)){

                                //'yyyy-mm-dd hh:mm:ss format'
                                if (!Ext.isEmpty(field_value)){
                                    if (Ext.isDate(field_value))
                                    {
                                        is_formatted = true;
                                        formatted_value = Ext.Date.format(field_value, date_time_format);
                                    }
                                    else
                                    {
                                        if (field_value.length < 12){
                                            is_formatted = true;
                                            formatted_value = field_value + ' 00:00:00';
                                        }
                                    }
                                }
                            }
                            else if (Ext.Array.contains(num_date_format_fields, field_name)){
                                //'yyyy-mm-dd hh:mm:ss format'
                                if (!Ext.isEmpty(field_value)){
                                    if (Ext.isDate(field_value))
                                    {
                                        is_formatted = true;
                                        formatted_value = Ext.Date.format(field_value, numeric_date_format);
                                    }
                                }
                            }
                            else if (Ext.Array.contains(round_off_fields, field_name)){
                                if (!Ext.isEmpty(field_value)){
                                    is_formatted = true;
                                    formatted_value = Math.round(field_value);
                                }
                            }
                            for (var prop in max_length_fields) {
                                maxByteLength = prop;
                                max_len_fields = max_length_fields[prop];
                                if (Ext.Array.contains(max_len_fields, field_name)){
                                    // console.log(field_name, field_value, maxByteLength, max_len_fields);
                                    is_formatted = true;
                                    //'yyyy-mm-dd hh:mm:ss format'
                                    if (!Ext.isEmpty(field_value)){
                                        formatted_value = substr_utf8_bytes(field_value, 0, maxByteLength);
                                    }
                                }
                            }                            

                            if (is_formatted == false)
                            {
                                if (Ext.isDate(field_value))
                                {
                                    formatted_value = Ext.Date.format(field_value, date_format);
                                }
                                else
                                {
                                    formatted_value = field_value;    
                                }
                            }
                            
                            data[field_name] = formatted_value;
                        }
                        selected.push(data);
                    // }
                });

                var selectedReportRows = JSON.stringify(selected);
                var form_325 = new Ext.FormPanel({
                    id: 'csvForm',
                    method: "POST",
                    url: url,
                    baseParams: {
                        'csv_report_id': me.csv_report_id,
                        selectedRows: selectedReportRows,
                        prefix: me.csv_mapped_name,
                        orderMasterIds:JSON.stringify(orderMasterIds),
                        orderDetailIds:JSON.stringify(orderDetailIds)
                    },
                    standardSubmit: true
                });

                form_325.getForm().submit({
                    target: '_blank'
                });
            };
            csvFunction();
        }
        else {
            me.showToolBarMsg(Ext.LANG.report.selectReportFirst,false);
            return;
        }
    },
    onSelectedCsvMenuClick: function(item, e, eOpts ) {
        var me=this,
            url = "bizlayer/csvExport/mappedCsvExport";
        me.exportSelectedRecords(url);
    },
    onAllCsvMenuClick: function(item, e, eOpts ) {
        var me = this;
        if(!Ext.isEmpty(me.csv_report_id)) {
            var params = null,
                reportGrid = me.getReport().query('grid[itemId='+me.middleGridCnt.gridItemId+']')[0],
                filterData = reportGrid.getHeaderFilters(),
                filterRecords = filterData.getRange(),
                filterLength = filterRecords.length,
                lang = Ext.LANG,
                filterCount=null;
                var filter = [];
                filterData.each(function(record){
                    if(!Ext.isEmpty(record.value)) {
                        data = {};
                        data['property'] = record.property;
                        data['value'] = record.value;
                        filter.push(data);
                    }           
                });
            me.getCsvName(me);
            /*datagrid_id is PanelNo and is sent for get getting columns in php side*/
            var form_325 = new Ext.FormPanel({
                id: 'csvForm',
                method: "POST",
                url: "bizlayer/reportField/getListData",
                baseParams: {
                    get_columns: 1,
                    get_sku_column:1,
                    showAllField: me.showAllField,
                    filter : JSON.stringify(filter),
                    pages : 'allPages',
                    csv_report_id : me.csv_report_id,
                    prefix: me.csv_mapped_name
                },
                
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
        }
        else {
            me.showToolBarMsg(Ext.LANG.report.selectReportFirst,false);
            return;
        }
    },
    onSelectedPrintMenuClick: function(item, e, eOpts ) {
        var me=this,
            lang=Ext.LANG,
            url = "bizlayer/csvExport/mappedCsvPrint";
        me.exportSelectedRecords(url);
    },
    onAllPrintMenuClick: function(item, e, eOpts ) {
        var me=this,
            lang=Ext.LANG;
        if(me.print_template=='0' || Ext.isEmpty(me.print_template)){
            me.showToolBarMsg(Ext.LANG.globalLang.alertMsg.noTemplate,false);
            return;
        }
        if(!Ext.isEmpty(me.csv_report_id)) {
            var params = null,
                reportGrid = me.getReport().query('grid[itemId='+me.middleGridCnt.gridItemId+']')[0],
                filterData =  reportGrid.getHeaderFilters(),
                filterRecords = filterData.getRange(),
                filterLength = filterRecords.length,
                lang = Ext.LANG,
                filterCount=null;
                var filter = [];
                filterData.each(function(record){
                    if(!Ext.isEmpty(record.value))
                    {
                    data = {};
                       data['property'] = record.property;
                       data['value'] = record.value;
                       filter.push(data);
                    }           
                });
            me.getCsvName(me);
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
                    csv_report_id : me.csv_report_id,
                    prefix: me.csv_mapped_name
                },
                
                standardSubmit: true
            });

            form_325.getForm().submit({
                target: '_blank'
            });
        }
        else {
            me.showToolBarMsg(Ext.LANG.report.selectReportFirst,false);
            return;
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "report #selectedCsvMenu": {
                click: me.onSelectedCsvMenuClick
            },
            "report #allCsvMenu": {
                click: me.onAllCsvMenuClick
            },
            "report #selectedPrintMenu": {
                click: me.onSelectedPrintMenuClick
            },
            "report #allPrintMenu": {
                click: me.onAllPrintMenuClick
            }
        });
        me.callParent(arguments);
    }
});
