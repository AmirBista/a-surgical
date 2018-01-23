Ext.define('YBase.controller.OrderDetailsController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'OrderDetailsController',
    currentViewAlias:'orderDetails',
    abstractcomponent:null,
    refs:[
        {
            ref: 'orderDetails',
            selector: 'orderDetails'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    bulkPanelSearch:false,
    errorFlg:false,
    edit_delete_renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-view" data-qtip="{0}">{0}</span><span class="icons-delete" data-qtip="{1}">{1}</span>',Ext.LANG.globalLang.buttons.btnEdit,Ext.LANG.globalLang.buttons.btnDelete);
    },
    addHelpCmp: function(absCmp) {
        var me=this,
            container =  absCmp.query('container[itemId=topMainCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help+lang.help_label.auto_save;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label);
        //me.addFilterSearchCmp(container);
    },
    onViewBeforeRender:function(absCmp, eOpts){
        var me = this;
        me.abstractcomponent = absCmp;
        me.callParent(arguments);
        me.hidePnlActionButtons(absCmp);
        //me.addPrintReportBtn(absCmp);
        me.addHelpCmp(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
    },
    languageImplementation: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            orderDetailsLang=lang.orderDetails;
            absCmp.setTitle(orderDetailsLang.pnlTitle);
            
    },
    hidePnlActionButtons: function(absCmp) {
        absCmp.query('checkbox[itemId=rwChkBox]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
        absCmp.query('button[itemId=btnSave]')[0].setVisible(false);
        absCmp.query('button[itemId=btnDelete]')[0].setVisible(false);
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 4;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'orderDetailsGrid';   
        me.gridCnt.addTempSearch      = 1;
        me.gridCnt.showSaveMsg        = true;
        me.gridCnt.storeLoadOnSave    = false;
        me.gridCnt.createMsgCmp       = true;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.gridCnt.addDatagridTemplate= 0;
        else 
            me.gridCnt.addDatagridTemplate= 1; 
    },
    loadGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        /*if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }*/
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;

        if(!Ext.isEmpty(me.gridCnt.addSearchCmp) &&  me.gridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        if(!Ext.isEmpty(me.gridCnt.addDatagridTemplate)) {
            params['get_template_list'] = me.gridCnt.addDatagridTemplate;
            if(delStatus != null) {
                // YBase.utility.GridHelper.getFieldTemplateName(me, me.gridCnt.gridNo);
                YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        if(!Ext.isEmpty(me.gridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.gridCnt.addTempSearch;
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.gridCnt.gridNo;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/orderDetail/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.gridCnt.responseObj    = resp;
                    me.gridCnt.templateId     = resp.templateId;
                    me.gridCnt.templateList   = resp.templateList;
                    me.gridCnt.searchList     = resp.searchList;
                    me.gridCnt.synctime       = resp.synctime;
                   // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize'      : pageSize, 
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'newAuctionMasterJSON', 
                            'storeUrl'      : 'bizlayer/orderDetail/list', 
                            'create'        : 'bizlayer/orderDetail/crud', 
                            'destroy'       : 'bizlayer/orderDetail/crud', 
                            'extra_params'  : {'datagrid_id':me.gridCnt.gridNo}, 
                            'writeAllFields': false,
                            'editable'      : true,
                            'idProperty'    : 'id',
                            'forceSubmitFields' : ['id','ext_id']
                        };
                    me.gridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.gridCnt.responseObj,
                            'gridCnt'               : me.gridCnt,
                            'gridStore'             : me.gridCnt.gridStore, 
                            'gridItemId'            : me.gridCnt.gridItemId,
                            'addDatagridTemplate'   : me.gridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'loadMask'              : true,
                            'setTemplateId'         : me.gridCnt.templateId,
                            'templateList'          : me.gridCnt.templateList,
                            'searchList'            : me.gridCnt.searchList,
                            'addTempSearch'         : me.gridCnt.addTempSearch,
                            'createMsgCmp'          : me.gridCnt.createMsgCmp,
                            'actionRenderer'        : me.edit_delete_renderer,
                            'actionColWidth'        : 100
                        };
                    me.gridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
                        YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.gridCnt.grid);
                        YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.gridCnt.grid,me.gridCnt.gridNo,resp.templateId);
                    }
                    if(me.gridCnt.addTempSearch == 1) {
                        abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
                        var tempSearchDataView = me.gridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
                        tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
                            var colDataIndex=[],searchData=[],
                                obj=record.data.search_criteria;
                            for (property in obj) {
                                colDataIndex.push(property);
                                searchData.push(obj[property]);
                            }
                            YBase.utility.SearchHelper.setDataInHeaderFilter1(me.gridCnt.grid,colDataIndex,searchData,true);
                        });
                    }

                    if(me.gridCnt.addDatagridTemplate == 1) {
                        me.gridCnt.grid.datagridTempId = resp.templateId;
                    }

                    // me.gridCnt.grid.on('selectionchange',me.onOrderMasterGridSelectionChange,me);
                    me.gridCnt.grid.on('itemclick',me.onOrderDetailGridItemClick,me);
                    // me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me);
                    // me.gridCnt.gridStore.on('update', me.onGridStoreUpdate,me);
                    me.gridCnt.gridStore.loadRawData(resp);
                    if(!Ext.isEmpty(abstractcomponent.filter_params)) {
                        for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                            me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
                        }
                    }
                    else {
                        // do nth
                    }
                    me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
                    if(Ext.msk)
                        Ext.msk.hide();
                    /*Ext.util.Observable.capture(me.gridCnt.grid.view, function(a,b,c){
                        console.log(a);
                        console.log(b);
                        console.log(c);
                    });*/
                    // me.getDetailReportGridConfig(abstractcomponent);
                    //me.loadDetailReportGrid(abstractcomponent);
                }
            }
        });
    },
    onOrderDetailGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('EntryPanel/edit?id='+record.raw.order_master_id+'&entry_code='+record.raw.column_1_01+'&mode=edit&company_code='+record.get('column_1_17'));
        }
    },
    getGridHeaderFilter: function(me,abstractcomponent) {
        var filter_params = abstractcomponent.filter_params,
            filters = [];
        for(key in filter_params){
            filters.push({property: key, value: filter_params[key]});
        }
        return filters;
    },
  
    init: function(application) {
        var me=this;
        me.control({
            // "#btnPrint": {
            //     click: me.onBtnPrintClick
            // },
            // "orderDetails container[itemId=filterSearchCnt] datefield": {
            //     select : me.onDateFieldSelect
            // },
            // "orderDetails container[itemId=filterSearchCnt] combobox": {
            //     select : me.onFilterComboSelect,
            //     change : me.onFilterComboChange
            // },
            // "orderDetails button[itemId=btnToggleGrouping]": {
            //     click : me.onBtnToggleGroupingClick
            // },
            // "orderDetails menuitem[itemId=menuItemPrintJson],orderDetails menuitem[itemId=menuItemPrintCsv]": {
            //     click : me.onMenuItemPrintClick
            // }
        });
        this.callParent(arguments);
    }
});