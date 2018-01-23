Ext.define('YBase.utility.EntryPanelBaseHelper',{
	localStorageItemName : null,
	entryDetailGridId : 'entryDetailGrid',
    entryDataViewId :'orderFileDataView',
    tabItemId : null,
    fileHelper : null,
	actionDeleteRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<div class="icons-delete">{0}</div>',Ext.LANG.globalLang.buttons.btnDelete);
    },
    actionDeleteRowInsertRowRenderer:function(value, metaData, record, rowIndex, colIndex, store, view){
        return Ext.String.format('<span class="icons-delete" data-qtip="{0}">{0}</span><span class="icons-insert-row" data-qtip="{1}">{1}</span>',Ext.LANG.globalLang.buttons.btnDelete,Ext.LANG.globalLang.buttons.btnInsertRow);
    },
    getStoreParamObj : function(gridParamObj) {
        var  me = this;
        var respObj = gridParamObj['components'],
            storeParamObj = {
                storeId     : gridParamObj['screen_name'] + '_store_'+Ext.id(),
                fields      : respObj.fields,
                storeUrl    : respObj.datagrid_info.store_url,
                extra_params: {'datagrid_id': respObj.datagrid_info.datagrid_id},
                pageSize    : respObj.page_size,
                autoLoad    : false,
                validation  : null,
                idProperty  : 'id',
                groupField  : respObj.datagrid_info.store_group_field,
                groupDir    : 'ASC'
            };
        if(gridParamObj['screen_name']=='app_file'){
            Ext.appFileStore = storeParamObj['storeId'];
            me.appFileStore = storeParamObj['storeId'];
        }
        return storeParamObj;
    
        
    },
	renderEntryDetailGrid: function(gridParamObj){
        var controller           = gridParamObj['controller'],
            respObj              = gridParamObj['components'],
            screen_name          = gridParamObj['screen_name'],
            component_cls        = gridParamObj['component_cls'],
            screenTypeId         = gridParamObj['screenTypeId'],
            flex                 = gridParamObj['flex'] || 0,
            addGridGrouping      = gridParamObj['addGridGrouping'] || false,
            groupingHeaderTpl    = gridParamObj['groupingHeaderTpl'],
            gridHeight           = gridParamObj['gridHeight'],
            customActionRenderer = gridParamObj['actionRenderer'],
            hidePagingToolbar    = Ext.isEmpty(gridParamObj['hidePagingToolbar']) ? true : gridParamObj['hidePagingToolbar'],
            absCmp               = controller.absCmp,
            dgName               = respObj.datagrid_info.datagrid_name,
            btnConfig            = gridParamObj['btnConfig'],
            config               = {},
            gridHolderContainer,
            storeParamObj,
            height = absCmp.is_bill_order == 1 ? 121 : 135; //195
        height = !Ext.isEmpty(gridHeight) ? gridHeight : height;
        var actionRenderer = (Ext.isEmpty(is_bill_order) || is_bill_order == 1) ? this.actionDeleteRenderer : this.actionDeleteRowInsertRowRenderer;
        actionRenderer = Ext.isEmpty(customActionRenderer) ? actionRenderer : customActionRenderer;
        gridHolderContainer = Ext.create('Ext.container.Container', {
                                layout: {
                                    type : 'fit'
                                },
                                margin: '0 0 10 0',
                                height: height,
                                autoScroll: true,
                                itemId: 'gridContainer',
                                componentCls : component_cls,
                                screenContainer: true,
                                flex: flex
                            });
        storeParamObj = this.getStoreParamObj(gridParamObj);
        
        var entryDetailStore = YBase.utility.GridHelper.createStore(storeParamObj);
        gridHolderContainer.gridNo = controller.PanelNo;
        var is_bill_order = absCmp.is_bill_order;
        var paramObj={
                'cntrl': controller,
                'absCmp': absCmp,
                'respObj': respObj,
                'gridCnt': gridHolderContainer,
                'gridStore': entryDetailStore, 
                'gridItemId': this.entryDetailGridId,
                'chkboxSelModel': false,
                'addSearchCmp': false,
                'addBulkMenuItem': false,
                'addDatagridTemplate': false,
                // 'listDataFn': me.loadGrid,
                'hidePagingToolbar': hidePagingToolbar,
                'loadMask': false,
                'cellEditorTriggerEvent': 'cellclick',
                'helpText':'Ext.LANG.help.member',
                'selModelMode': 'SINGLE',
                'templateList':null,
                'searchList': null,
                'addDDPlugin' : (Ext.isEmpty(is_bill_order) || is_bill_order == 1) ? false : true,
                'addSummary' : false,
                'addGridGrouping' : addGridGrouping,
                'groupingHeaderTpl' : groupingHeaderTpl,
                'actionRenderer' : actionRenderer,
                'actionColWidth' : Ext.isEmpty(gridParamObj['actionColWidth']) ? 60 : gridParamObj['actionColWidth'],
                'sortable_grid' : false,
                'gridViewHeight' : height,
                'isScreenDatagrid': respObj.isScreenDatagrid,
                'hideHeaderFilterButtons':true,
                'showOnlyDelete':(Ext.isEmpty(is_bill_order) || is_bill_order == 1) ? true : false,
                'addNonEditableCellBg' : true,
                'entryDetailScreenBtnConfig' : btnConfig,
                'loadMask' : false
            };
        var list_grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        entryDetailStore.proxy.reader.idProperty= 'id';
        this.addDockedItems(list_grid);
        return gridHolderContainer;
    }, 
    renderOtherDetailGrid: function(gridParamObj){
        var controller      = gridParamObj['controller'],
            respObj         = gridParamObj['components'],
            screen_name     = gridParamObj['screen_name'],
            component_cls   = gridParamObj['component_cls'],
            screenTypeId    = gridParamObj['screenTypeId'],
            flex            = gridParamObj['flex'] || 0,
            actionRenderer  = gridParamObj['actionRenderer'] || this.actionDeleteRenderer,
            actionColWidth  = gridParamObj['actionColWidth'] || 60,
            height          = gridParamObj['gridHeight'] || 135,
            btnConfig       = gridParamObj['btnConfig'],
            hidden          = Ext.isEmpty(gridParamObj['hidden']) ? true : gridParamObj['hidden'],
            hidePagingToolbar = Ext.isEmpty(gridParamObj['hidePagingToolbar']) ? true : gridParamObj['hidePagingToolbar'],
            absCmp = controller.absCmp,
            dgName = respObj.datagrid_info.datagrid_name,
            gridHolderContainer,
            config = {},
            storeParamObj;
            // height = 135; //195
        
        gridHolderContainer = Ext.create('Ext.container.Container', {
                                layout: {
                                    type : 'fit'
                                },
                                margin: '0 0 10 0',
                                height: height,
                                autoScroll: false,
                                itemId: screen_name+'_cnt',
                                componentCls : component_cls,
                                screenContainer: true,
                                hidden: hidden,
                                flex: flex
                            });
        storeParamObj = this.getStoreParamObj(gridParamObj);
        
        var entryDetailStore = YBase.utility.GridHelper.createStore(storeParamObj);
        gridHolderContainer.gridNo = controller.PanelNo;
        var is_bill_order = absCmp.is_bill_order;
        var paramObj={
                'cntrl': controller,
                'absCmp': absCmp,
                'respObj': respObj,
                'gridCnt': gridHolderContainer,
                'gridStore': entryDetailStore, 
                'gridItemId': screen_name,
                'chkboxSelModel': respObj.datagrid_info.show_checkbox_column== 1 ? true : false,
                'addSearchCmp': false,
                'addBulkMenuItem': false,
                'addDatagridTemplate': false,
                // 'listDataFn': me.loadGrid,
                'hidePagingToolbar': hidePagingToolbar,
                'loadMask': false,
                'cellEditorTriggerEvent': 'cellclick',
                'helpText':'Ext.LANG.help.member',
                'selModelMode': Ext.isEmpty(gridParamObj['selModelMode']) ? 'SINGLE' : gridParamObj['selModelMode'],
                'templateList':null,
                'searchList': null,
                'addDDPlugin' : false,
                'addSummary' : false,
                'actionColWidth' : actionColWidth,
                'actionRenderer' : this.actionDeleteRenderer,
                'sortable_grid' : false,
                'gridViewHeight' : height,
                'isScreenDatagrid': respObj.isScreenDatagrid,
                'hideHeaderFilterButtons':true,
                'showOnlyDelete': true,
                'addNonEditableCellBg' : true
            };
        var list_grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
        entryDetailStore.proxy.reader.idProperty= 'id';
        return gridHolderContainer;
    }, 
    addDockedItems: function(list_grid) {
    },
    renderFormFields: function(formParamObj){
        var components      = formParamObj['components'],
            screen_name     = formParamObj['screen_name'],
            component_cls   = formParamObj['component_cls'],
            screenTypeId    = formParamObj['screenTypeId'],
            groupName       = formParamObj['groupName'],
            controller      = formParamObj['controller'],
            container = Ext.create('Ext.container.Container', {
                            itemId: screen_name + '_container',
                            screenContainer: true,
                            flex: !Ext.isEmpty(groupName) ? 1 : 0,
                            componentCls: component_cls,
                            margin: !Ext.isEmpty(groupName) ? '0 5 10 0' : '0 0 10 0',
                            padding:'0 0 0 1',
                            layout: screenTypeId == 2 ? 'column' : 'fit'
                        }),
            hlpr = new YBase.utility.ScreenHelper(),
            paramObj = {
                'components' : components,
                'changeTxtAreaToTxtFld' : screenTypeId == 2 ? true : false
            },
            items = hlpr.createScreenComponents(paramObj);

        container.add(items);
        // For Txt Area field with combobox.
        if(screenTypeId == 5){
            var cb = this.createTxtAreaCombo(components[0],controller);
            container.add(cb);
        }
        return container;
    },
    createTxtAreaCombo: function(cmp,controller) {
        var hlpr = new YBase.utility.ScreenHelper,
            combo_config = cmp['combo_config'],
            storeData = !Ext.isEmpty(combo_config) ? Ext.decode(combo_config['storeData']) : [],
            store = hlpr.getComboStore(),
            cb = Ext.create('Ext.form.ComboBox', {
                itemId : combo_config.itemId,
                fieldLabel: Ext.LANG.defaultValues.txtAreaWithComboLbl,
                componentCls : 'input-fld-hidden-cls',
                triggerCls : 'combo-icon-cls',
                isTxtAreaCombo : true,
                store: store,
                labelCls: 'combo-label-cls',
                labelSeparator : '',
                labelWidth : 135,
                queryMode: 'local',
                displayField: combo_config.key_column,
                valueField: combo_config.key_column,
                matchFieldWidth :  false,
                width: 250,
                setting_cfg:cmp['setting_cfg'],
                listeners : {
                    afterrender : function(combo) {
                        combo.getEl().on('click',function(e,target){
                            if(e.getTarget('.combo-label-cls')){
                                if(Ext.isEmpty(combo.collapseCombo))
                                    combo.collapseCombo = false;
                                if(combo.collapseCombo == true){
                                    combo.collapse();
                                }
                                else{
                                    combo.expand();    
                                }
                                combo.collapseCombo = !combo.collapseCombo;

                                var txtAreaCombos = controller.absCmp.query('combobox[componentCls=input-fld-hidden-cls]');
                                for(var i =0;i<txtAreaCombos.length;i++){
                                    if(combo.itemId!=txtAreaCombos[i].itemId){
                                        txtAreaCombos[i].collapseCombo = false;  
                                    }
                                }
                            }
                        },combo);
                    }
                }
            });
        
        store.loadData(storeData); 
        return cb;  
    },
    renderTabPanel : function(tabParamObj) {
        var controller      = tabParamObj['controller'],
            respObj         = tabParamObj['components'],
            screen_name     = tabParamObj['screen_name'],
            component_cls   = tabParamObj['component_cls'],
            screenTypeId    = tabParamObj['screenTypeId'],
            groupName       = tabParamObj['groupName'],
            groupStoreFields= tabParamObj['groupStoreFields'],
            screen_title    = tabParamObj['screen_title'],
            groupCnt        = tabParamObj['groupCnt'],
            hideActionCol   = tabParamObj['hideActionCol'] ,
            tabId = groupName+'_tab',
            absCmp = controller.absCmp,
            // tabCnt = absCmp.query('container[itemId=tabContainer]')[0],
            dgName = !Ext.isEmpty(respObj.datagrid_info) ? respObj.datagrid_info.datagrid_name : null,
            gridHolderContainer,
            height = 141,//225
            tabPanelArr,tabPanel,pnl;
        YBase.utility.EntryPanelHelper.tabItemId = tabId;
        tabPanelArr = absCmp.query('tabpanel[itemId='+tabId+']');

        if(Ext.isEmpty(tabPanelArr)){
            tabPanel = Ext.create('Ext.tab.Panel',{
                itemId : tabId,
                margin: '0 0 0 0'
            });
            groupCnt.add(tabPanel);

        }
        else{
            tabPanel = tabPanelArr[0];
        }

        pnl = Ext.create('Ext.panel.Panel', {
                        itemId: screen_name + '_tab',
                        title: screen_title,
                        screenContainer: true,
                        componentCls: component_cls,
                        layout: 'fit'
                    });
        //Tab Panel with txt area
        if(screenTypeId == 6){
            var hlpr = new YBase.utility.ScreenHelper(),
                paramObj = {
                    'components' : [respObj],
                    'changeTxtAreaToTxtFld' : true
                },
                items = hlpr.createScreenComponents(paramObj);
            pnl.add(items);
        }
        // Tab Panel with Grid
        else if(screenTypeId == 7){
            pnl = Ext.create('Ext.panel.Panel', {
                            layout: {
                                type : 'fit'
                            },
                            title : screen_title,
                            height: height,
                            autoScroll: true,
                            itemId: screen_name+'_container',
                            componentCls : component_cls,
                            screenContainer: true,
                            // flex: 1
                        });
            var storeParamObj = this.getStoreParamObj(tabParamObj),
                gridStore;
            if(!Ext.isEmpty(groupStoreFields)){
                storeParamObj['fields'] = groupStoreFields;
                storeParamObj['storeId'] = groupName + '_' + absCmp.entry_code + '_store';
                
                if(Ext.isEmpty(controller.absCmp.tabGroupGridStore)){
                    controller.absCmp.tabGroupGridStore = YBase.utility.GridHelper.createStore(storeParamObj);
                }
                gridStore = controller.absCmp.tabGroupGridStore;
            }
            else{
                gridStore = YBase.utility.GridHelper.createStore(storeParamObj);
            }
            
            // gridHolderContainer.gridNo = controller.PanelNo;
            var paramObj={
                    'cntrl': controller,
                    'absCmp': absCmp,
                    'respObj': respObj,
                    'gridCnt': pnl,
                    'gridStore': gridStore, 
                    'gridItemId': screen_name + '_grid',
                    'chkboxSelModel': false,
                    'addSearchCmp': false,
                    'addBulkMenuItem': false,
                    'addDatagridTemplate': false,
                    // 'listDataFn': me.loadGrid,
                    'hidePagingToolbar': false,
                    'loadMask': false,
                    'cellEditorTriggerEvent': 'cellclick',
                    'selModelMode': 'SINGLE',
                    'templateList':null,
                    'searchList': null,
                    'addDDPlugin' : false,
                    'actionRenderer' : this.actionDeleteRenderer,
                    'sortable_grid' : false,
                    'gridViewHeight' : height,
                    'hideHeaderFilterButtons':true,
                    // 'showOnlyDelete':true,
                    'isTabGrid': 1,
                    'hideActionCol' : hideActionCol,
                    isScreenDatagrid: true
                    // 'addNonEditableCellBg' : true
                };
            var list_grid = YBase.utility.GridHelper.prepareListGrid(paramObj);
            // list_grid.isTabGrid = true;
            gridStore.proxy.reader.idProperty= 'id';
        }
        tabPanel.add(pnl);
        tabPanel.setActiveTab(0);
    },
    renderDataview: function(dataviewParamObj) {
        var components      = dataviewParamObj['components'],
            screen_name     = dataviewParamObj['screen_name'],
            component_cls   = dataviewParamObj['component_cls'],
            screenTypeId    = dataviewParamObj['screenTypeId'],
            storeParamObj = this.getStoreParamObj(dataviewParamObj),
            store = YBase.utility.GridHelper.createStore(storeParamObj),
            tpl = this.getDataViewTpl(),
            container,dataview;
        if(Ext.isEmpty(component_cls)){
            component_cls =  '';
        }
        container = Ext.create('Ext.container.Container', {
            itemId: screen_name + '_container',
            // screenContainer: true,
            componentCls: component_cls + ' order_files_cmp_cls ',
            margin: '0 0 10 0',
            padding:'0 0 0 1',
            layout: 'hbox'
        });
        dataview = Ext.create('Ext.view.View', {
            itemId:this.entryDataViewId,
            flex: 1,
            store: store,
            tpl: tpl,
            itemSelector: 'div.fileListSelector-div',
            plugins: [
                Ext.create('Ext.ux.dataview.LabelEditor', {dataIndex: 'original_file_name'})
            ]
        });
        container.add(dataview);
        return container;
        
    },
	renderScreenComponents: function(controller){
        var me = this,
            absCmp = controller.absCmp,
            topFldContainer = absCmp.query('container[itemId=top_screen_container]')[0],
            screenFormComponents = JSON.parse(localStorage.getItem(me.localStorageItemName)),
            sys_screens = screenFormComponents.sys_screens,
            components =screenFormComponents.screen_components,
            hlpr = new YBase.utility.ScreenHelper(),
            container,paramObj,tab,tabPanel;
        for(var i =0;i<sys_screens.length;i++){
            /*FORM FIELDS*/
            if(sys_screens[i].screen_type == 2 || sys_screens[i].screen_type == 4  || sys_screens[i].screen_type == 5){
                var groupName = sys_screens[i].group_name;
                paramObj = {
                    'components'    :  components[sys_screens[i].screen_name],
                    'screen_name'   :  sys_screens[i].screen_name,
                    'component_cls' :  sys_screens[i].component_cls,
                    'screenTypeId'  :  sys_screens[i].screen_type,
                    'groupName'     :  groupName,
                    'controller'    :  controller
                };
                container = this.renderFormFields(paramObj);
                if(!Ext.isEmpty(groupName)){
                    groupCnt = this.renderGroupContainer(absCmp,topFldContainer,groupName,sys_screens[i].layout_cls);
                    groupCnt.add(container);
                    container.addCls('screen-group-child-cnt-cls');
                    continue;
                }
            }
            /*ENTRY DETAIL GRID*/
            else if(sys_screens[i].screen_type == 3 || sys_screens[i].screen_type == 9){
                var btnConfig = null;
                if(sys_screens[i].show_button == 1){
                    btnConfig = {
                        xtype : 'button',
                        text : Ext.LANG.transferEntryPanel.entryDetail.btn_entry_detail,
                        itemId: 'btn_' + sys_screens[i].screen_name,
                        componentCls : sys_screens[i].button_cls,
                        iconCls : sys_screens[i].button_icon_cls,
                        ui : sys_screens[i].button_ui_cls,
                        margin : '2 5'
                    };
                }
                paramObj = {
                    'controller'    :  controller,
                    'components'    :  components[sys_screens[i].screen_name],
                    'screen_name'   :  sys_screens[i].screen_name,
                    'component_cls' :  sys_screens[i].component_cls,
                    'screenTypeId'  :  sys_screens[i].screen_type,
                    'btnConfig'     :  btnConfig

                };
                if(sys_screens[i].screen_type == 3)
                    container = this.renderEntryDetailGrid(paramObj);
                else{
                    container = this.renderOtherDetailGrid(paramObj);
                }  
            }
            /*TAB PANEL WITH TXTAREA OR GRID*/
            else if(sys_screens[i].screen_type == 6 || sys_screens[i].screen_type == 7){
                var groupName = sys_screens[i].group_name;
                if(!Ext.isEmpty(groupName)){
                    groupCnt = this.renderGroupContainer(absCmp,topFldContainer,groupName,sys_screens[i].layout_cls,true);
                }

                paramObj = {
                    controller      :  controller,
                    // components      :  components[sys_screens[i].screen_name],
                    components      :  components[groupName][sys_screens[i].screen_name],
                    screen_name     :  sys_screens[i].screen_name,
                    component_cls   :  sys_screens[i].component_cls,
                    screenTypeId    :  sys_screens[i].screen_type,
                    groupName       :  groupName,
                    screen_title    :  sys_screens[i].screen_title,
                    groupStoreFields:  components[groupName]['groupStoreFields'],
                    groupCnt        :  groupCnt
                };
                this.renderTabPanel(paramObj);  
                continue;  
            }
            /*DATAVIEW*/
            else if(sys_screens[i].screen_type == 8){
                Ext.imageDragDropWindow = Ext.create('YBase.view.ImageDragDropWindow');
                paramObj = {
                    'controller'    :  controller,
                    'components'    :  components[sys_screens[i].screen_name],
                    'screen_name'   :  sys_screens[i].screen_name,
                    'component_cls' :  sys_screens[i].component_cls,
                    'screenTypeId'  :  sys_screens[i].screen_type 
                };
                me.fileHelper = YBase.utility.FileHelper;
                container = me.fileHelper.renderFileDataview(me,paramObj);  
                //container = this.renderDataview(paramObj);      
            }
            
            if(sys_screens[i].show_button == 1 && (sys_screens[i].screen_type != 3 && sys_screens[i].screen_type != 9)){
                if(sys_screens[i].screen_type == 8){
                    me.fileHelper.addButtonInContainer(me,container);  
                   /* var cnt = Ext.create('Ext.container.Container',{
                            layout:'hbox',
                            pack: 'end',
                            componentCls:'file-container'
                        }),
                        btn =  me.addUploadButton();
                    cnt.add(btn);
                    container.add(cnt);*/
                }
                else{
                    var btn = Ext.create('Ext.Button', {
                    // text: 'Screen Button',
                    itemId: 'btn_' + sys_screens[i].screen_name,
                    componentCls : sys_screens[i].button_cls,
                    iconCls : sys_screens[i].button_icon_cls,
                    ui : sys_screens[i].button_ui_cls,
                    margin: '15 0 0 5'

                });
                    container.add(btn);   
                }
            }
            if(sys_screens[i].show_file_popup_win == 1){
                var popupBtn = Ext.create('Ext.Button', {
                        // text: 'Screen Button',
                        // itemId: 'btn_' + sys_screens[i].screen_name,
                        itemId: 'btnFilePopup',
                        componentCls : sys_screens[i].button_cls,
                        iconCls : 'yig-popup-win-cls',
                        ui: 'custom-ui',
                        margin: '5 0 0 5'    
                    });
                container.add(popupBtn);
            }
            //dynamicFldContainer.add(container);
            this.addScreenContainer(topFldContainer,container,sys_screens[i].layout_cls,absCmp);
            
        }
    },
    addUploadButton: function(){
        var me =  this,
            multiUploadWinLang = Ext.LANG.multiImageWin,
            multiUploadBtn =  Ext.create('Ext.ux.upload.Button', {
            // text: 'Select files',
            //text: multiUploadWinLang.fileUpload,
            componentCls:'plugin-button',
            iconCls:'yig-upload-s-w',
            margin:'5 0 0 5',
            ui:'custom-ui',
            //singleFile: true,
            plugins: [{
                    ptype: 'ux.upload.window',
                    //title: 'Upload',
                    title:multiUploadWinLang.fileUpload,
                    //componentCls:'plugin-window',
                    width: 520,
                    height: 490
                }
            ],
            uploader: 
            {
                url: 'bizlayer/file/uploadMultipleImage',
                // uploadpath: '/Root/files',
                autoStart: true,
                max_file_size: '3mb',            
                //drop_element: dragElement,
                activePanelItemId:this.activePanelItemId,
                // Specify what files to browse for
                filters: [{title : "Image files", extensions : "jpg,gif,png,pdf,txt,jpeg,tiff,doc,docx,xls,xlsx,zip"}],
                statusQueuedText: multiUploadWinLang.readyToUpload,
                statusUploadingText: multiUploadWinLang.fileUpload +'({0}%)',
                statusFailedText: '<span style="color: red">Error</span>',
                statusDoneText: '<span style="color: green">'+multiUploadWinLang.completed+'</span>',
                statusInvalidSizeText: '<span style="color: red">'+multiUploadWinLang.statusInvalidSize+'</span>',
                statusInvalidExtensionText: '<span style="color: red">'+multiUploadWinLang.statusInvalidExtension+'</span>',
            },
            listeners: 
            {
                beforeupload: function(uploader, files) {
                    if(!Ext.isEmpty(Ext.order_number))
                        uploader.multipart_params.ref_record_id= Ext.order_number;
                    else
                        return false;
                },
                fileuploaded: function(uploader, file, status) {
                   if(status.success == true){
                        if(!Ext.isEmpty(me.appFileStore)){
                            store = Ext.getStore(me.appFileStore);//Ext.getStore('app_file_store');
                            store.add(status.data);
                            lastRecord = store.last();
                        }
                    }
                },
                filesadded:function(uploader, files){
                },
                beforestart:  function(uploader){
                   if(Ext.isEmpty(Ext.order_number)){
                        return false;
                    }
                },
                scope: me
            }
        });
        return multiUploadBtn;
    },
    addScreenContainer:function(topFldContainer,container,layout_cls,absCmp) {
        if(layout_cls == "top-screen-cls"){
            topFldContainer.add(container);
        }
    },
    renderGroupContainer: function(absCmp,topFldContainer,groupName,layout_cls,forTabPanel) {
        var itemId = groupName + '_container',
            groupCnt = absCmp.query('container[itemId='+itemId+']'),
            cnt;
        if(Ext.isEmpty(groupCnt)){
            var cfg  = {
                    itemId : itemId,
                    margin: '0 0 10 0',
                    padding:'0 0 0 1',
                    componentCls: 'screen-group-parent-cnt-cls',
                    layout: {
                        type: forTabPanel == true ? 'fit' : 'hbox'
                    },    
                };
            if(forTabPanel == true){
                cfg['minHeight'] = 210;
            }
            cnt = Ext.create('Ext.container.Container',cfg);
            this.addScreenContainer(topFldContainer,cnt,layout_cls,absCmp);
        }
        else{
            cnt = groupCnt[0];
    }
        return cnt;
    },
    getDataViewTpl: function() {
        var  dragDrop =  Ext.LANG.multiImageWin.dragDropFile;
        lang =  Ext.LANG.fileMenu;
        var tpl = new Ext.XTemplate(
               '<tpl for=".">',
                '   <div   class="fileListSelector-div   {[this.getStatusClass(values.file_status)]}" style=" float: left;display: inline-block;">',
                '       <span style="margin-right: 2px;" class="view_pdf x-editable  file-{file_id}">{original_file_name}</span>',
                '       <span class="show_drop_down" style="font-weight:bold">X</span>',
                // '       <div class="show-on-hover-menu">',
                // '           <span class="icon_view"></span>',
                // '           <span class="icon_download"></span>',
                // '       </div>',
                '    </div>',
                '</tpl>',
                '<div class="file-dragdrop-msg">',
                    '<span>'+dragDrop+'<span>',
                '</div>',                
                {
                    getStatusClass : function(status_cls){
                        if(status_cls ==lang.status1){
                            return 'cls-file_status1';
                        }
                        else if(status_cls ==lang.status2){
                            return 'cls-file_status2';
                        }
                        else if(status_cls ==lang.status3){
                            return 'cls-file_status3';
                        }
                        else{
                            return 'no-cls';
                        }
                    }
                }
                
            );
        return tpl;
    },
    assignNxtCmpIdToScreenFields: function(absCmp,formPanel){
        var me = this, i,
            txtFlds = formPanel.query('textfield[isDynamicFormFld=true]'),
            enabledFlds = formPanel.query('textfield[isDynamicFormFld=true][disabled=false][readOnly=false][focus_on_enterkey=1]');
        var j =1;    
        for(i = 0; i<txtFlds.length;i++){
            txtFlds[i]['nxt_cmp_id'] = i+1;
            if(txtFlds[i].focus_on_enterkey==1){
                txtFlds[i]['nxt_focus_cmp_id'] = j++;    
            }
        }
        var j =1;
        for(i = 0; i<enabledFlds.length;i++){
            if(enabledFlds[i].ownerCt.isVisible()==true){
                enabledFlds[i]['editable_cmp_id'] = j++;
            }
        }        
    },
    mapRecords: function(absCmp,mapperArr,data){
        var frm = absCmp.query('form[itemId=entryFormPanel]')[0].getForm(),
            mappedRec = {};
        if(Ext.isEmpty(data)){
            for(var key in mapperArr){
                mappedRec['dynamic_fields['+mapperArr[key]+']'] = null;
            }
        }
        else{
            for(var key in mapperArr){
                mappedRec['dynamic_fields['+mapperArr[key]+']'] = data[key];
            }
        }
        frm.setValues(mappedRec);
    },
    
    setScreenVisibility: function(abs){
        var screen_roles = abs.screen_roles;
        try{
            if (!Ext.isEmpty(abs.query('container[itemId=record_header_container]')))
                abs.query('container[itemId=record_header_container]')[0].setVisible(screen_roles['screenA']);
            if (!Ext.isEmpty(abs.query('container[itemId=company_info_container]')))
               abs.query('container[itemId=company_info_container]')[0].setVisible(screen_roles['screenB']);
            if (!Ext.isEmpty(abs.query('container[itemId=process_info_container]')))
                abs.query('container[itemId=process_info_container]')[0].setVisible(screen_roles['screenC']);
            if (!Ext.isEmpty(abs.query('container[itemId=delivery_info_container]')))
                abs.query('container[itemId=delivery_info_container]')[0].setVisible(screen_roles['screenD']);
            if (!Ext.isEmpty(abs.query('container[itemId=total_order_info_container]')))
                abs.query('container[itemId=total_order_info_container]')[0].setVisible(screen_roles['screenF']);
        }
        catch(ex)
        {
            //
        }
    },
});