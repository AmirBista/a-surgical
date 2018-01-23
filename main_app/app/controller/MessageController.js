Ext.define('YBase.controller.MessageController', {
    extend: 'YBase.controller.BasicBaseController',
    id: 'MessageController',
    currentViewAlias:'messagePanel',
    commentPanelExpand:true,
    currentCustomerRec:null,
    currentOrderRec:null,
    collapsedSelectionchange:false,
    msgTabCntrl:null,
    detailLinkRenderer:function(value, metaData, record, rowIndex, colIndex, store, view) {
        return Ext.String.format('<div class="icons-view" data-qtip="{0}">{0}</div>',Ext.LANG.globalLang.buttons.btnEdit);
    },
    languageImplementation: function(absCmp){
        var me                  = this,
            lang                = Ext.LANG,
            messageLang         = lang.messagePanel,
            commentLang         = lang.CommentPanel,
            customerPanel       = absCmp.query('panel[itemId=customerPanel]')[0],
            commentPanel        = absCmp.query('panel[itemId=commentPanel]')[0],
            commentEmptyText    = commentLang.commentEmptyText,
            commentOnEnter      = commentLang.commentOnEnter;
        absCmp.setTitle(messageLang.panelTitle);
        customerPanel.setTitle(messageLang.customerTitle);
        commentPanel.setTitle(commentLang.panelTitle);
    },
    onMessagePanelBeforeRender: function(absCmp, eOpts) {
        var me = this;
        me.msgTabCntrl = YBase.app.getController('MsgTabController');
        me.languageImplementation(absCmp);
    },
    onCommentPanelBeforeRender: function(absCmp, eOpts) {
        var me              = this,
            msgTabCnt       = Ext.create('YBase.view.MsgTabCnt');
        absCmp.removeAll();
        absCmp.add(msgTabCnt);
        // me.msgTabCntrl.manageMsgTab(msgTabCnt);
    },
    onCommentPanelBeforeCollapse: function(absCmp, direction, animate, eOpts) {
        var me= this,
            lang = Ext.LANG,
            skuCmpPanelLang = lang.skuCmpPanel,
            selectedRecord = me.currentCustomerRec;
        me.commentPanelExpand=false;
    },
    onCommentPanelBeforeExpand: function(absCmp, animate, eOpts) {
        var me          = this,
            msgTabCnt   = absCmp.query('container[itemId=MsgTabCnt]')[0],
            msgTabPanel = absCmp.query('tabpanel[itemId=msgTabPanel]')[0],
            activeTab   = msgTabPanel.getActiveTab();
        me.commentPanelExpand = true;
        if(me.collapsedSelectionchange === true) {
            me.collapsedSelectionchange = false;
            me.msgTabCntrl.loadComment(msgTabCnt);
        }
    },
    onCommentPanelAfterRender:function(absCmp, options) {
        absCmp.getHeader().hide();
        var me = this,
            afterCollapsedEl = absCmp.getEl();
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget(".comment-cmp-panel") && !e.getTarget(".no-collapse") || e.getTarget('.collapse-left')) {
               absCmp.collapse();
            }
            if (e.getTarget(".collapsed_cls")) {
               absCmp.expand();
            }
        });
    },
    onBottomCommentPanelAfterRender: function(abstractcomponent, options) {
        var me = this,
            afterCollapsedEl = abstractcomponent.getEl();
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget(".collapse-bottom")) {
               abstractcomponent.collapse();
            } 
            if (e.getTarget(".collapsed_cls")) {
               abstractcomponent.expand();
            } 
        });
    },
    onCustomerPanelAfterRender:function(abstractcomponent, options) {
        var me = this,
            afterCollapsedEl = abstractcomponent.getEl();
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget(".collapsed_cls")) {
               abstractcomponent.expand();
            } 
        });
    },
    onCustomerGridCntBeforerender: function(gridCnt,options) {
        var me = this,
            // mainPanel = gridCnt.up('panel');
            mainPanel = me.currentView;
        me.customerGridCnt = gridCnt;
        me.customerGridCnt.removeAll();
        me.addCustomerGridCntProperty();
        me.loadCustomerGrid(me,mainPanel);
    },
    addCustomerGridCntProperty: function() {
        var me = this;
        me.customerGridCnt.gridNo             = 27;
        me.customerGridCnt.colNo              = 4;
        me.customerGridCnt.rowNo              = 0;
        me.customerGridCnt.gridItemId         = 'customerGrid';   
        me.customerGridCnt.addTempSearch      = 1;
        me.customerGridCnt.showSaveMsg        = true;
        me.customerGridCnt.storeLoadOnSave    = false;
        me.customerGridCnt.createMsgCmp       = false;
        me.customerGridCnt.chkboxSelModel     = false;
        if(!Ext.CURRENT_USER.is_super_user) 
            me.customerGridCnt.addDatagridTemplate= 0;
        else 
            me.customerGridCnt.addDatagridTemplate= 1; 
    },
    loadCustomerGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;

        if(!Ext.isEmpty(me.customerGridCnt.addSearchCmp) &&  me.customerGridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        if(!Ext.isEmpty(me.customerGridCnt.addDatagridTemplate)) {
            params['get_template_list'] = me.customerGridCnt.addDatagridTemplate;
            if(delStatus != null) {
                // YBase.utility.GridHelper.getFieldTemplateName(me, me.customerGridCnt.gridNo);
                YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        if(!Ext.isEmpty(me.customerGridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.customerGridCnt.addTempSearch;
        }
        me.abstractcomponent = abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.customerGridCnt.gridNo;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.customerGridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/customer/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    // me.createStatusCombo(abstractcomponent,resp.statusComboConfig);
                    me.customerGridCnt.responseObj    = resp;
                    me.customerGridCnt.templateId     = resp.templateId;
                    me.customerGridCnt.templateList   = resp.templateList;
                    me.customerGridCnt.searchList     = resp.searchList;
                    me.customerGridCnt.synctime       = resp.synctime;
                    // me.customerGridCnt.templateId = resp.templateId;
                    // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize'      : pageSize, 
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'customerJSON', 
                            'storeUrl'      : 'bizlayer/customer/list', 
                            'create'        : 'bizlayer/customer/crud', 
                            'destroy'       : 'bizlayer/customer/crud', 
                            'extra_params'  : {
                                'synctime': me.customerGridCnt.synctime,
                                'datagrid_id': me.customerGridCnt.gridNo
                            }, 
                            'writeAllFields':false,
                            'editable'      : true,
                            'idProperty'    : 'id',
                            'forceSubmitFields' : ['id','ext_id']

                        };
                    me.customerGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.customerGridCnt.responseObj,
                            'gridCnt'               : me.customerGridCnt,
                            'gridStore'             : me.customerGridCnt.gridStore, 
                            'gridItemId'            : me.customerGridCnt.gridItemId,
                            'addDatagridTemplate'   : me.customerGridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'loadMask'              : true,
                            'setTemplateId'         : me.customerGridCnt.templateId,
                            'templateList'          : me.customerGridCnt.templateList,
                            'searchList'            : me.customerGridCnt.searchList,
                            'addTempSearch'         : me.customerGridCnt.addTempSearch,
                            'createMsgCmp'          : me.customerGridCnt.createMsgCmp,
                            'chkboxSelModel'        : me.customerGridCnt.chkboxSelModel
                        };
                    me.customerGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
                        YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.customerGridCnt.grid);
                        YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.customerGridCnt.grid,me.customerGridCnt.gridNo,resp.templateId);
                    }
                    if(abstractcomponent.showMsgCmp == true) {
                        YBase.utility.MsgCmpHelper.gridEventHandleForMsgCmpPanel(me.customerGridCnt.grid);
                    }

                    if(me.customerGridCnt.addTempSearch == 1) {
                        abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
                        var tempSearchDataView = me.customerGridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
                        tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
                            var colDataIndex=[],searchData=[],
                                obj=record.data.search_criteria;
                            for (property in obj) {
                                colDataIndex.push(property);
                                searchData.push(obj[property]);
                            }
                            YBase.utility.SearchHelper.setDataInHeaderFilter1(me.customerGridCnt.grid,colDataIndex,searchData,true);
                        });
                    }
                    if(me.customerGridCnt.addDatagridTemplate == 1) {
                        me.customerGridCnt.grid.datagridTempId = resp.templateId;
                    }
                    me.customerGridCnt.grid.on('selectionchange',me.onCustomerGridSelectionChange,me);
                    me.customerGridCnt.gridStore.on('beforeload', me.onCustomerGridStoreBeforeLoad,me);
                    me.customerGridCnt.gridStore.on('load', me.onCustomerGridStoreLoad,me);
                    // me.customerGridCnt.gridStore.on('update', me.onGridStoreUpdate, me);

                    // me.customerGridCnt.grid.on('itemclick', me.onGridItemClick, me);
                    me.customerGridCnt.gridStore.loadRawData(resp);
                    me.loadOrderGrid(me,abstractcomponent);

                    if(!Ext.isEmpty(abstractcomponent.filter_params)) {
                        for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                            me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
                        }
                    }
                    else {
                        // do nth
                    }
                    // me.addHelpCmp(abstractcomponent,resp.helpTextInfo);
                }
            }
        });
    },
    onCustomerGridSelectionChange: function(grid, selected, eOpts) {
        var me = this,
            pnl = me.currentView,
            orderGrid = pnl.query('grid[itemId='+me.orderGridCnt.gridItemId+']');
        if(Ext.isEmpty(orderGrid)) {
            return;
        }else {
            orderGrid = orderGrid[0];
        }
        // var commentTabPanel = pnl.query('tabpanel[itemId=commentTabPanel]')[0],
        var msgTabPanel = pnl.query('tabpanel[itemId=msgTabPanel]')[0],
            activeTab   = msgTabPanel.getActiveTab();
        if(Ext.isEmpty(selected)) {
            me.currentCustomerRec = null;
            if(!Ext.isEmpty(orderGrid)) {
                orderGrid.getStore().loadData({})
            }
            return;
        }
        me.currentCustomerRec = grid.lastSelected;
        if(me.commentPanelExpand === false && activeTab.itemId == 'horensoTab') {
            me.collapsedSelectionchange = true;
        }
        // me.currentCustomerRec = grid.lastSelected;
        if(!Ext.isEmpty(orderGrid)) {
            /*loads orderMasterGrid*/
            if(!Ext.isEmpty(orderGrid)) {
                orderGrid.getStore().load();
            }
        }
    },
    onCustomerGridStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            extra_params = store.getProxy().extraParams;
        extra_params['datagrid_id'] = me.customerGridCnt.gridNo;
    },
    onCustomerGridStoreLoad: function(store, records, success) {
        var me      = this,
            pnl     = me.currentView,
            grid    = pnl.query('grid[itemId='+me.customerGridCnt.gridItemId+']')[0];
        // me.customerGridCnt.synctime = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        me.customerGridCnt.synctime = store.getProxy().reader.rawData.synctime;
        me.customerGridCnt.gridStore.is_loaded = true;
        if (!Ext.isEmpty(records) && records.length > 0) {
            if(me.bulkPanelSearch) {
                grid.getSelectionModel().selectAll();
                me.bulkPanelSearch=false;
            }else {
                grid.getSelectionModel().select(0, true);
            }
            me.currentCustomerRec = records[0];
        }
        if(me.bulkPanelSearch) {
            me.bulkPanelSearch=false;
        }
        // if (Ext.msk) Ext.msk.hide();
    },
    onOrderGridCntBeforerender: function(gridCnt,options) {
        var me = this,
            // mainPanel = gridCnt.up('panel');
            mainPanel = me.currentView;
        me.orderGridCnt = gridCnt;
        me.orderGridCnt.removeAll();
        me.addOrderGridCntProperty();
        // me.loadOrderGrid(me,mainPanel);
    },
    addOrderGridCntProperty: function() {
        var me = this;
        me.orderGridCnt.gridNo             = 28;
        me.orderGridCnt.colNo              = 4;
        me.orderGridCnt.rowNo              = 0;
        me.orderGridCnt.gridItemId         = 'orderMasterGrid';   
        me.orderGridCnt.addTempSearch      = 1;
        me.orderGridCnt.showSaveMsg        = true;
        me.orderGridCnt.storeLoadOnSave    = false;
        me.orderGridCnt.createMsgCmp       = true;
        me.orderGridCnt.chkboxSelModel     = false;

        if(!Ext.CURRENT_USER.is_super_user) 
            me.orderGridCnt.addDatagridTemplate= 0;
        else 
            me.orderGridCnt.addDatagridTemplate= 1; 
    },
    loadOrderGrid: function(me, abstractcomponent, templateId, delStatus, setTemplate) {
        var params = {}, ajax_params = {},params_with_col = Ext.clone({});
        params['get_search_list'] = true;
        //params['get_template_list'] = 0;

        if(!Ext.isEmpty(me.orderGridCnt.addSearchCmp) &&  me.orderGridCnt.addSearchCmp != true) {
            params['get_search_list'] = false;
        }
        if(!Ext.isEmpty(me.orderGridCnt.addDatagridTemplate)) {
            params['get_template_list'] = me.orderGridCnt.addDatagridTemplate;
            if(delStatus != null) {
                // YBase.utility.GridHelper.getFieldTemplateName(me, me.orderGridCnt.gridNo);
                // YBase.utility.DatagridTemplateHelper.delStatus=null;
            }
            if(!Ext.isEmpty(setTemplate)) {
                params_with_col['set_template_id'] = setTemplate;
            }
        }
        if(!Ext.isEmpty(me.orderGridCnt.addTempSearch)) {
            params['get_temp_search_list'] = me.orderGridCnt.addTempSearch;
        }
        me.abstractcomponent=abstractcomponent;
        params_with_col['get_columns'] = 1;
        params_with_col['datagrid_id'] = me.orderGridCnt.gridNo;
        params_with_col['customer_code'] = me.currentCustomerRec.get('column_3_05');
        params_with_col['forCustomerPanel'] = 1;
        ajax_params = Ext.Object.merge(ajax_params, params);
        ajax_params = Ext.Object.merge(ajax_params, params_with_col);
        // me.orderGridCnt.templateId = templateId;
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/orderMaster/list',
            method: 'GET',
            params:ajax_params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.orderGridCnt.responseObj    = resp;
                    me.orderGridCnt.templateId     = resp.templateId;
                    me.orderGridCnt.templateList   = resp.templateList;
                    me.orderGridCnt.searchList     = resp.searchList;
                    me.orderGridCnt.synctime       = resp.synctime;
                    // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = resp.templateId;
                    var pageSize=resp.page_size,
                        fields = resp.fields,
                        storeParamObj = {
                            'pageSize'      : pageSize, 
                            'fields'        : fields,
                            'validations'   : resp.validations,
                            'storeId'       : 'newAuctionMasterJSON', 
                            'storeUrl'      : 'bizlayer/orderMaster/list', 
                            'create'        : 'bizlayer/orderMaster/crud', 
                            'destroy'       : 'bizlayer/orderMaster/crud', 
                            'extra_params'  : {
                                'synctime'      : me.orderGridCnt.synctime,
                                'forCustomerPanel': 1,
                                'customer_code'  : me.currentCustomerRec.get('column_3_05')
                            }, 
                            'writeAllFields': false,
                            'editable'      : true,
                            'idProperty'    : 'id',
                            'forceSubmitFields' : ['id','ext_id']
                        };
                    me.orderGridCnt.gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                    var paramObj={
                            'cntrl'                 : me,
                            'absCmp'                : abstractcomponent,
                            'respObj'               : me.orderGridCnt.responseObj,
                            'gridCnt'               : me.orderGridCnt,
                            'gridStore'             : me.orderGridCnt.gridStore, 
                            'gridItemId'            : me.orderGridCnt.gridItemId,
                            'addDatagridTemplate'   : me.orderGridCnt.addDatagridTemplate,
                            'listDataFn'            : me.loadGrid,
                            'loadMask'              : true,
                            'setTemplateId'         : me.orderGridCnt.templateId,
                            'templateList'          : me.orderGridCnt.templateList,
                            'searchList'            : me.orderGridCnt.searchList,
                            'addTempSearch'         : me.orderGridCnt.addTempSearch,
                            'createMsgCmp'          : me.orderGridCnt.createMsgCmp,
                            'actionRenderer'        : me.detailLinkRenderer,
                            'chkboxSelModel'        : me.orderGridCnt.chkboxSelModel
                        };
                    me.orderGridCnt.grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
                    if(!Ext.isEmpty(abstractcomponent.showBulkUpdate) && abstractcomponent.showBulkUpdate == true) {
                        YBase.utility.BulkUpdateHelper.GridEventHandleForBulkUpdate(me.orderGridCnt.grid);
                        YBase.utility.BulkUpdateHelper.loadAndSetStoreforBulkUpdate(me.orderGridCnt.grid,me.orderGridCnt.gridNo,resp.templateId);
                    }
                    if(abstractcomponent.showMsgCmp == true) {
                        YBase.utility.MsgCmpHelper.gridEventHandleForMsgCmpPanel(me.orderGridCnt.grid);
                    }

                    if(me.orderGridCnt.addTempSearch == 1) {
                        abstractcomponent.searchTemplateStore.loadRawData(resp.searchTemplateData);
                        var tempSearchDataView = me.orderGridCnt.grid.query('dataview[itemId=tempSearchDataView]')[0];
                        tempSearchDataView.on('ItemClick',function(template,record,item,index,e,eOpts) {
                            var colDataIndex=[],searchData=[],
                                obj=record.data.search_criteria;
                            for (property in obj) {
                                colDataIndex.push(property);
                                searchData.push(obj[property]);
                            }
                            YBase.utility.SearchHelper.setDataInHeaderFilter1(me.orderGridCnt.grid,colDataIndex,searchData,true);
                        });
                    }

                    if(me.orderGridCnt.addDatagridTemplate == 1) {
                        me.orderGridCnt.grid.datagridTempId = resp.templateId;
                    }

                    me.orderGridCnt.grid.on('selectionchange',me.onOrderMasterGridSelectionChange,me);
                    me.orderGridCnt.grid.on('itemclick',me.onOrderMasterGridItemClick,me);
                    me.orderGridCnt.gridStore.on('beforeload', me.onOrderGridStoreBeforeLoad,me);
                    me.orderGridCnt.gridStore.on('load', me.onOrderGridStoreLoad,me);
                    // me.orderGridCnt.gridStore.on('update', me.onGridStoreUpdate,me);
                    me.orderGridCnt.gridStore.loadRawData(resp);
                    if(!Ext.isEmpty(abstractcomponent.filter_params)) {
                        for(var k=0;k<abstractcomponent.filter_params.length;k++) {
                            me.setInitialGridFilter(abstractcomponent.filter_params[k].property,abstractcomponent.filter_params[k].colValue);
                        }
                    }
                    else {
                        // do nth
                    }
                    YBase.utility.GridHelper.hideMsk();
                    // var msgTabCnt = abstractcomponent.query('container[itemId=MsgTabCnt]')[0];
                    // me.setMsgTabGlobalRec(msgTabCnt);
                }
            }
        });
    },
    onOrderGridStoreLoad: function(store, records, success) {
        var me          = this,
            pnl         = me.currentView,
            grid        = pnl.query('grid[itemId='+me.orderGridCnt.gridItemId+']')[0],
            msgTabCnt   = pnl.query('container[itemId=MsgTabCnt]')[0];
        // me.customerGridCnt.synctime = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
        me.orderGridCnt.synctime = store.getProxy().reader.rawData.synctime;
        me.orderGridCnt.gridStore.is_loaded = true;
        if (!Ext.isEmpty(records) && records.length > 0) {
            if(me.bulkPanelSearch) {
                grid.getSelectionModel().selectAll();
                me.bulkPanelSearch=false;
            }else {
                grid.getSelectionModel().select(0, true);
            }
            me.currentOrderRec=records[0];
        } else {
            me.currentOrderRec = null;
            msgTabCnt = me.setMsgTabGlobalRec(msgTabCnt);
            me.reRouteMsgTabPopupWin(me.msgTabCntrl);

            if(me.commentPanelExpand) {
                me.msgTabCntrl.loadComment(msgTabCnt);
            }
        }
        if(me.bulkPanelSearch) {
            me.bulkPanelSearch=false;
        }
        if(!me.commentPanelExpand && !me.collapsedSelectionchange) {
            me.collapsedSelectionchange=true;
        }
        // if (Ext.msk) Ext.msk.hide();
    },
    onOrderGridStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            extra_params = store.getProxy().extraParams;
        extra_params['customer_code'] = me.currentCustomerRec.get('column_3_05');
        extra_params['datagrid_id'] = me.orderGridCnt.gridNo;
    },
    onOrderMasterGridItemClick: function(gridView,record,item,index,e,eOpts) {
        if (e.getTarget('.icons-view')) {
            Ext.Router.redirect('EntryPanel/edit?id='+record.get('id')+'&entry_code='+record.get('column_1_01')+'&mode=edit&customer_code='+record.get('column_1_15'));
        }
    },
    onOrderMasterGridSelectionChange: function(grid, selected, eOpts) {
        var me          = this,
            pnl         = me.currentView,
            msgTabPanel = pnl.query('tabpanel[itemId=msgTabPanel]')[0],
            activeTab   = msgTabPanel.getActiveTab(),
            msgTabCnt   = msgTabPanel.up('container');
        if(Ext.isEmpty(selected)) {
            if(Ext.isEmpty(grid.getStore().data.items)) {
                me.currentOrderRec = null;
                msgTabCnt = me.setMsgTabGlobalRec(msgTabCnt);
                me.reRouteMsgTabPopupWin(me.msgTabCntrl);
                if(me.commentPanelExpand === true) {
                    me.msgTabCntrl.loadComment(msgTabCnt);
                }
            }
        } else {
            me.currentOrderRec = grid.lastSelected;
            if(me.commentPanelExpand === false && activeTab.itemId == 'commentTab') {
                me.collapsedSelectionchange = true;
            }
            msgTabCnt = me.setMsgTabGlobalRec(msgTabCnt);
            
            me.reRouteMsgTabPopupWin(me.msgTabCntrl);

            if(me.commentPanelExpand === true) {
                me.msgTabCntrl.loadComment(msgTabCnt);
            }
        }
    },
    setMsgTabGlobalRec: function(msgTabCnt) {
        var me = this,
            globalRecObj= {};
        globalRecObj['order_no']        = Ext.isEmpty(me.currentOrderRec) ? null:me.currentOrderRec.get('column_1_01');
        globalRecObj['order_master_id'] = Ext.isEmpty(me.currentOrderRec) ? null:me.currentOrderRec.get('id');
        globalRecObj['customer_code']    = Ext.isEmpty(me.currentCustomerRec) ? null:me.currentCustomerRec.get('column_3_05');
        msgTabCnt['selectedRawData']    = globalRecObj;

        me.msgTabCntrl.setGlobalRecords(msgTabCnt);
        return msgTabCnt;
    },
    reRouteMsgTabPopupWin: function(msgTabCntrl) {
        var me = this,
            messagePanelLang = Ext.LANG.messagePanel;
        if(!Ext.isEmpty(me.msgTabWin) && !me.msgTabWin.closed) {
            var route = msgTabCntrl.generateUrl(true);
            me.msgTabWin.YBase.app.getController('MsgTabWinController').reRoute(route);
        }
    },
    
    init: function(application) {
        var me = this;
        me.control({
            "messagePanel": {
                beforerender: me.onMessagePanelBeforeRender
            },
            "messagePanel panel[itemId=commentPanel]": {
                beforerender: me.onCommentPanelBeforeRender,
                beforecollapse: me.onCommentPanelBeforeCollapse,
                beforeexpand: me.onCommentPanelBeforeExpand,
                afterrender: me.onCommentPanelAfterRender
            },
            "messagePanel panel[itemId=customerPanel]": {
                afterrender: me.onCustomerPanelAfterRender
            },
            "messagePanel container[itemId=customerGridCnt]": {
                beforerender: me.onCustomerGridCntBeforerender
            },
            "messagePanel container[itemId=orderGridCnt]": {
                beforerender: me.onOrderGridCntBeforerender
            },
             "messagePanel panel[itemId=bottomCommentPanel]": {
                afterrender: me.onBottomCommentPanelAfterRender
            }
        });
        me.callParent(arguments);
    }
});