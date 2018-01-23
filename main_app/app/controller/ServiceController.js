Ext.define('YBase.controller.ServiceController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'ServiceController',
    currentViewAlias:'serviceMaster',
    abstractcomponent:null,
    refs:[
        {
            ref: 'serviceMaster',
            selector: 'serviceMaster'
        }
    ],
    currentRecord:null,
    previousRecord:null,
    bulkPanelSearch:false,
    errorFlg:false,
   
    languageImplementation: function(absCmp){
        var me = this,
            lang = Ext.LANG,
            serviceLang = lang.servicePanel,
            basicBasePanelLang = lang.BasicBasePanel;
        absCmp.setTitle(serviceLang.pnlTitle);
        absCmp.query('button[itemId=btnAdd]')[0].setText(basicBasePanelLang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(basicBasePanelLang.btnSave);
        absCmp.query('button[itemId=btnNewEntry]')[0].setText(serviceLang.btnNewEntry);
        absCmp.query('button[itemId=btnDelete]')[0].setText(basicBasePanelLang.btnDelete);
        absCmp.query('button[itemId=btnCsvDwnld]')[0].setText(basicBasePanelLang.btnCsvDwnld);
    },

    
    // addHelpCmp: function(absCmp,helpTextInfo) {
    //     var me=this,
    //         container =  absCmp.query('container[itemId=topMainCnt]')[0],
    //         lang=Ext.LANG,
    //         link = lang.help_link.orderMasterLink,
    //         label = lang.help_label.help+lang.help_label.auto_save;
    //     YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    // },

    onGridStoreUpdate:function(){
        //do nothing
    },
    onViewBeforeRender: function(absCmp){
        this.callParent(arguments);
        var me=this;
        me.hidePnlActionButtons(absCmp);
        me.languageImplementation(absCmp);
        absCmp.route = location.href;
        me.currentView = absCmp;
        me.loadViewGrid(absCmp);
        // absCmp.query('container[itemId=topMainCnt]')[0].setVisible(true);
        // absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
    },
    loadViewGrid: function(absCmp){
        var  me = this;
        me.gridCnt = absCmp.query('container[itemId=gridCnt]')[0]; 
        me.serviceDetailGridCnt = absCmp.query('container[itemId=serviceDetailGridCnt]')[0];
        me.gridCnt.removeAll();  
        me.serviceDetailGridCnt.removeAll();
    },
    addGridCntProperty: function() {
        var me = this;
        me.gridCnt.gridNo             = 22;
        me.gridCnt.colNo              = 4;
        me.gridCnt.rowNo              = 0;
        me.gridCnt.gridItemId         = 'serviceMasterGrid';
        me.gridCnt.addSearchCmp       = true;   
        me.gridCnt.addTempSearch      = 1;
        me.gridCnt.showSaveMsg        = true;
        me.gridCnt.storeLoadOnSave    = false;
        me.gridCnt.createMsgCmp       = true;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.gridCnt.addDatagridTemplate= 0;
        else{
            me.gridCnt.addDatagridTemplate= 1; 
        } 

        me.serviceDetailGridCnt.gridNo             = 23;
        me.serviceDetailGridCnt.colNo              = 4;
        me.serviceDetailGridCnt.rowNo              = 0;
        me.serviceDetailGridCnt.gridItemId         = 'serviceDetailGrid';
        me.serviceDetailGridCnt.addSearchCmp       = false;   
        me.serviceDetailGridCnt.addTempSearch      = 1;
        me.serviceDetailGridCnt.showSaveMsg        = true;
        me.serviceDetailGridCnt.storeLoadOnSave    = false;
        me.serviceDetailGridCnt.createMsgCmp       = true;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.serviceDetailGridCnt.addDatagridTemplate= 0;
        else 
            me.serviceDetailGridCnt.addDatagridTemplate= 1;

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
                // YBase.utility.DatagridTemplateHelper.delStatus=null;
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
        params_with_col['get_service_detail'] = 1;

        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.gridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/service/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.renderServiceMasterGrid(me, abstractcomponent,resp);
                    // me.renderServiceDetailGrid(me,abstractcomponent,resp.service_detail_info);
                    me.serviceDetailGridCnt.setVisible(false);
                    if(Ext.msk)
                        Ext.msk.hide();
                }
            }
        });
    },
    renderServiceMasterGrid: function(me,abstractcomponent,resp)
    {
        var me              = this,
            pageSize        = resp.page_size,
            fields          = resp.fields;
        me.gridCnt.responseObj    = resp;
        me.gridCnt.templateId     = resp.templateId;
        me.gridCnt.templateList   = resp.templateList;
        me.gridCnt.searchList     = resp.searchList;
        me.gridCnt.synctime       = resp.synctime;
        
        var storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'ServiceMasterJSON', 
                'storeUrl'      : 'bizlayer/service/list', 
                'create'        : 'bizlayer/service/crud', 
                'destroy'       : 'bizlayer/service/crud', 
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
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'addSearchCmp'          : me.gridCnt.addSearchCmp,
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
            'actionRenderer'        : YBase.utility.GridHelper.actionViewDeleteRenderer,
            'actionColWidth'        : 110
        };
        me.gridCnt.serviceMasterGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);

        // if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
        //     YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.gridCnt.grid);
        //     YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.gridCnt.grid,me.gridCnt.gridNo,resp.templateId);
        // }
        if(abstractcomponent.showSkuCmp == true) {
            YBase.utility.SkuCmpHelper.gridEventHandleForSkuCmpPanel(me.gridCnt.grid);
        }

        // if(me.gridCnt.addTempSearch == 1) {
        //     abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
        //     var tempSearchDataView = me.gridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
        //     tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
        //         var colDataIndex=[],searchData=[],
        //             obj=record.data.search_criteria;
        //         for (property in obj) {
        //             colDataIndex.push(property);
        //             searchData.push(obj[property]);
        //         }
        //         YBase.utility.SearchHelper.setDataInHeaderFilter1(me.gridCnt.grid,colDataIndex,searchData,true);
        //     });
        // }
        if(me.gridCnt.addDatagridTemplate == 1) {
            me.gridCnt.serviceMasterGrid.datagridTempId = resp.templateId;
        }

        me.gridCnt.gridStore.on('load', me.onServiceMasterGridStoreLoad,me,me.gridCnt);
        //me.gridCnt.gridStore.on('update', me.onGridStoreUpdate, me);
       /**/
        me.gridCnt.serviceMasterGrid.on('itemclick', me.onServiceMasterInfoGridItemClick, me);
        me.gridCnt.serviceMasterGrid.on('selectionchange', me.onServiceMasterInfoGridSelectionChange, me);
       // me.gridCnt.serviceMasterGrid.on('itemclick', me.onGridItemClick, me);
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
    },
    renderServiceDetailGrid:function(me,abstractcomponent,resp)
    {
         var me             = this,
            pageSize        = resp.page_size,
            fields          = resp.fields,
            storeParamObj   = {
                'pageSize'      : pageSize, 
                'fields'        : fields,
                'validations'   : resp.validations,
                'storeId'       : 'serviceDetailJSON', 
                'storeUrl'      : 'bizlayer/serviceDetail/list', 
                'create'        : 'bizlayer/serviceDetail/crud', 
                'destroy'       : 'bizlayer/serviceDetail/crud', 
                'extra_params'  : {
                    'synctime': me.serviceDetailGridCnt.synctime,
                    'datagrid_id': me.serviceDetailGridCnt.gridNo
                }, 
                'writeAllFields':false,
                'editable'      : true,
                'idProperty'    : 'id',
                'forceSubmitFields' : ['id','ext_id']

            };
        me.serviceDetailGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
        var paramObj = {
            'cntrl'                 : me,
            'absCmp'                : abstractcomponent,
            'respObj'               : resp,
            'gridCnt'               : me.serviceDetailGridCnt,
            'addSearchCmp'          : me.serviceDetailGridCnt.addSearchCmp,
            'gridStore'             : me.serviceDetailGridCnt.gridStore, 
            'gridItemId'            : me.serviceDetailGridCnt.gridItemId,
            'addDatagridTemplate'   : me.serviceDetailGridCnt.addDatagridTemplate,
            'listDataFn'            : me.loadGrid,
            'loadMask'              : true,
            'setTemplateId'         : me.serviceDetailGridCnt.templateId,
            'templateList'          : me.serviceDetailGridCnt.templateList,
            'searchList'            : me.serviceDetailGridCnt.searchList,
            'addTempSearch'         : me.serviceDetailGridCnt.addTempSearch,
            'createMsgCmp'          : me.serviceDetailGridCnt.createMsgCmp,
            // 'hideHeaderFilterButtons':true,
            // 'actionRenderer'        : me.delete_renderer
        };
        me.serviceDetailGridCnt.serviceDetailGrid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        /*if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
            YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.serviceDetailGridCnt.grid);
            YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.serviceDetailGridCnt.grid,me.serviceDetailGridCnt.gridNo,resp.templateId);
        }*/
        if(abstractcomponent.showSkuCmp == true) {
            YBase.utility.SkuCmpHelper.gridEventHandleForSkuCmpPanel(me.serviceDetailGridCnt.grid);
        }

        /*if(me.serviceDetailGridCnt.addTempSearch == 1) {
            abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
            var tempSearchDataView = me.serviceDetailGridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
            // tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
                var colDataIndex=[],searchData=[],
                    obj=record.data.search_criteria;
                for (property in obj) {
                    colDataIndex.push(property);
                    searchData.push(obj[property]);
                }
                YBase.utility.SearchHelper.setDataInHeaderFilter1(me.serviceDetailGridCnt.grid,colDataIndex,searchData,true);
            });
        }*/
        if(me.serviceDetailGridCnt.addDatagridTemplate == 1) {
            me.serviceDetailGridCnt.serviceDetailGrid.datagridTempId = resp.templateId;
        }

        //me.serviceDetailGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);
        me.serviceDetailGridCnt.gridStore.on('beforeload', me.onServiceDetailGridStoreBeforeLoad, me);
        // me.serviceDetailGridCnt.grid.on('itemclick', me.onGridItemClick, me);
        me.serviceDetailGridCnt.gridStore.loadRawData(resp);

        if(!Ext.isEmpty(abstractcomponent.filter_params)) {
            for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
            }
        }
        else {
            // do nth
        }
       // me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
        me.serviceDetailGridCnt.gridStore.load();
    },

    onServiceDetailGridStoreBeforeLoad:function(store, operation, eOpts) {
        var me = this,
            extra_params = store.getProxy().extraParams;
        // extra_params['delivery_master_id']   = me.currentOrderDeliveryRec.raw.delivery_master_id;
        if(!Ext.isEmpty(me.currentServiceMasterRec)) {
            extra_params['entry_id']   = me.currentServiceMasterRec.get('id');
        }else {
            extra_params['entry_id']   = null;
        }
        extra_params['datagrid_id'] = me.serviceDetailGridCnt.gridNo;
    },

    onServiceMasterInfoGridSelectionChange:function(grid, selected, eOpts )
    {
        var me =  this
           detailGrid = me.serviceDetailGridCnt.serviceDetailGrid,
        me.currentServiceMasterRec = null;
            
        /*if(!Ext.isEmpty(selected)){
            var lastSelectedRecord      =  grid.getLastSelected();
            me.currentServiceMasterRec  = lastSelectedRecord;
            if(!Ext.isEmpty(detailGrid))
            {
                detailGridStore         = detailGrid.getStore();
                detailGridStore.load();
            }
        }
        else{
            var detailGridStore = detailGrid.getStore();
                detailGridStore.loadData({});
        }*/
    },
    onServiceMasterGridStoreLoad: function(store, records, success, gridCnt) {
        var me      = this,
            pnl     = me.currentView,
            grid    = pnl.query('grid[itemId='+gridCnt.gridItemId+']')[0];
        // me.gridCnt.synctime = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        gridCnt.synctime = store.getProxy().reader.rawData.synctime;
        gridCnt.gridStore.is_loaded = true;
        if (!Ext.isEmpty(records) && records.length > 0) {
            if(me.bulkPanelSearch) {
                grid.getSelectionModel().selectAll();
                me.bulkPanelSearch=false;
            }else {
                grid.getSelectionModel().deselectAll();
                grid.getSelectionModel().select(0, true);
            }
            me.currentRecord=records[0];
        }
        if(me.bulkPanelSearch) {
            me.bulkPanelSearch=false;
        }
        if (Ext.msk) Ext.msk.hide();
    },
    onGridStoreUpdate:function(){
        //do nothing
    },
     hidePnlActionButtons: function(absCmp) {
        absCmp.query('button[itemId=btnSave]')[0].setVisible(true);
        absCmp.query('button[itemId=btnUpdateStock]')[0].setVisible(false);
        absCmp.query('button[itemId=btnEditPopupEntry]')[0].setVisible(false);
        absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAdd]')[0].setVisible(false);
        if(Ext.CURRENT_USER.userRole==50)
        {
            absCmp.query('button[itemId=btnNewEntry]')[0].setVisible(false);
        }
    },
    
    onBtnNewEntryClick: function() {
        Ext.Router.redirect('ServiceEntryWindow/new?mode=new');
    },
    onServiceMasterInfoGridItemClick:function(gridView,record,item,index,e,eOpts){
        if(e.getTarget('.icons-view')){
            Ext.Router.redirect('ServiceEntryWindow/edit?id='+record.get('id')+'&entry_code='+record.get('column_10_01')+'&mode=edit');
        }
        else if (e.getTarget('.icons-delete')) {
            Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o){
                if(o=="yes"){
                    var me = this,
                        grid = gridView.up('grid'),
                        store = grid.getStore();
                    store.remove(record);
                    me.storeSync(store, grid, me.gridCnt);
                }
            },this);
        }   
    },
    init: function(application) {
        var me=this;
        me.control({
            "serviceMaster button[itemId=btnNewEntry]":{
                click: me.onBtnNewEntryClick,
            }
        });
        this.callParent(arguments);
    }
});