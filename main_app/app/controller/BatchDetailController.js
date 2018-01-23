Ext.define('YBase.controller.BatchDetailController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'BatchDetailController',
    currentViewAlias:'batchDetailPanel',
    abstractcomponent:null,
    refs:[
        {
            ref: 'productMaster',
            selector: 'productMaster'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    bulkPanelSearch:false,
    errorFlg:false,
    delete_renderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.globalLang.buttons.btnDelete);
        // return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span>',Ext.LANG.buttons['delete']);
    },
    addHelpCmp: function(absCmp,helpTextInfo) {
        var me=this,
            container =  absCmp.query('container[itemId=topMainCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help+lang.help_label.auto_save;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    languageImplementation: function(absCmp){
        var me=this,
            lang=Ext.LANG,
            batchDetailLang=lang.batchDetailPanel;
        absCmp.setTitle(batchDetailLang.pnlTitle);
        me.showHideCmp(absCmp);
    },
    showHideCmp: function(absCmp){
        var me = this;
            absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
    },
    onViewBeforeRender:function(absCmp, eOpts){
        this.callParent(arguments);
        var me = this;
        me.hidePnlActionButtons(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
    },
    hidePnlActionButtons: function(absCmp) {
        absCmp.query('checkbox[itemId=rwChkBox]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
        // absCmp.query('button[itemId=btnSave]')[0].setVisible(false);
        // absCmp.query('button[itemId=btnDelete]')[0].setVisible(false);
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 7;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'batchDetailGrid';   
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
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }
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
            url: 'bizlayer/batchDetail/list',
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
                    // me.gridCnt.templateId = resp.templateId;
                   // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize'      : pageSize, 
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'batchDetailJSON', 
                            'storeUrl'      : 'bizlayer/batchDetail/list', 
                            'create'        : 'bizlayer/batchDetail/crud', 
                            'destroy'       : 'bizlayer/batchDetail/crud', 
                            'extra_params'  : {
                                'synctime': me.gridCnt.synctime,
                                'datagrid_id': me.gridCnt.gridNo
                            }, 
                            'writeAllFields':false,
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
                            'actionRenderer'        : me.delete_renderer
                        };
                    me.gridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
                        YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.gridCnt.grid);
                        YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.gridCnt.grid,me.gridCnt.gridNo,resp.templateId);
                    }
                    if(abstractcomponent.showSkuCmp == true) {
                        YBase.utility.SkuCmpHelper.gridEventHandleForSkuCmpPanel(me.gridCnt.grid);
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

                    me.gridCnt.gridStore.on('load', me.onGridStoreLoad,me);
                    //me.gridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

                    me.gridCnt.grid.on('itemclick', me.onGridItemClick, me);
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
                }
            }
        });
    },
    onGridStoreUpdate:function(){
        //do nothing
    },
    init: function(application) {
        var me=this;
        this.callParent(arguments);
    }
});