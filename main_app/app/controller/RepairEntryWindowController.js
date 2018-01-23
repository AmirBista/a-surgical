Ext.define('YBase.controller.RepairEntryWindowController', { 
    extend: 'YBase.controller.EntryPanelBaseController', 
    
    refs:[
        {
            ref: 'repairEntryWindow',
            selector: 'repairEntryWindow'
        } 
    ], 
    requires:[
        
    ],
    pnlName : 'RepairEntryWindow',
    currentViewAlias: 'repairEntryWindow',
    absCmp:null,
    msgCmp: null,
    toolType:'maximize',
    resetEntryPanel: function(pnl,actionType){
        var me = this;
        Ext.bodyTab.setActiveTab(pnl);
        me.absCmp = pnl;
        me.resetEntryFormForNewMode(pnl,actionType);    
    },
    onEntryPanelBeforerender: function(absCmp) {
        var me = this;
        me.absCmp =  absCmp;
        me.absCmp.actualWidth =  absCmp.width;
        me.absCmp.actualHeight =  absCmp.height;
        me.callParent(arguments);
        me.hidePnlActionButtons(absCmp);

    },
    hidePnlActionButtons: function(absCmp) 
    {
        absCmp.query('button[itemId=btnAddComment]')[0].setVisible(false);
    },
    languageImplementation: function(absCmp) {
        var lang = Ext.LANG,
            btnLang = lang.globalLang.buttons,
            entryPnlLang = lang.entryPanel;
        // entry action buttons
        absCmp.query('button[itemId=btnNew]')[0].setText(btnLang.btnNewRegister);
        absCmp.query('button[itemId=btnSave]')[0].setText(btnLang.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(btnLang.btnCancel);
        absCmp.query('button[itemId=btnDelete]')[0].setText(btnLang.btnDelete);
        absCmp.query('button[itemId=btnPrint]')[0].setText(btnLang.btnPrint);
        absCmp.query('checkbox[itemId=autoSaveChkbox]')[0].boxLabel = lang.help_label.auto_save;
        if(absCmp.params.mode == 'new') {
            absCmp.query('button[itemId=btnAddComment]')[0].disable(true);
        }
    },
    viewEntryDetails :function(params, is_new) {
        var me=this, 
            absCmp = me.absCmp,
            lang=Ext.LANG;
        if(is_new === true){
            params['mode']='new';
        }
        else{
            params['mode']='edit';
           // params['order_master_code']= orderMasterComponent.query('hiddenfield[itemId=order_master_code]')[0].getValue();
        }
        var user_tz = jstz.determine().name();//gets the browser or system timezone
        params['time_zone'] = user_tz;
        Ext.Ajax.request({
            url: 'bizlayer/repairEntryPanel/getEntryData',
            method: 'GET',
            params:params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    var renderFormFlds = Ext.isEmpty(absCmp.cmpEvent) ? true : false,
                        latestComment = null,commentCount=null;
                    absCmp.entry_id = resp.data.id;
                    absCmp.entry_code = resp.data.entry_code;
                    absCmp.synctime = resp.synctime;
                    me.addHelpCmp(absCmp,resp.helpTextInfo);
                    if(renderFormFlds){
                        var cmpEvent = new Ext.ux.RepairComponentEvent();
                        YBase.utility.RepairEntryPanelHelper.renderScreenComponents(me);
                        absCmp.cmpEvent = cmpEvent;
                        cmpEvent.init(me,me.absCmp);
                        me.addClearButton(me.absCmp);
                        // if(Ext.msk)
                        //     Ext.msk.hide();
                    }
                    /*
                    * Set Entry Panel's data if rendered for the 1st time or opened in popup
                    */
                    if(renderFormFlds === true || params.popup === true){
                        me.showEntryPanel(me, resp, absCmp.params);
                        
                        if(!Ext.isEmpty(resp.latestComment)) {
                            latestComment = resp.latestComment.comment;
                            commentCount = resp.commentCount;
                        }
                        me.updateCommentCmp(me.absCmp,latestComment,commentCount);
                    }
                   /* var tab =  Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0];
                    if(!Ext.isEmpty(tab)){
                        var entryFormPanel = tab.query('form[itemId=entryFormPanel]')[0];
                            if(!Ext.isEmpty(entryFormPanel)){
                                me.setEntryValuesForClientEntryPanel(absCmp,tab,entryFormPanel,resp);
                            }
                    }*/
                }
                else{
                    absCmp.close();
                    Ext.Msg.show({
                        title:Ext.LANG.globalLang.app.appTitle,
                        msg: resp.msg,
                        buttons: Ext.Msg.OK,
                        icon: Ext.Msg.ERROR
                    });
                }
            }
        });
    },
    setEntryValuesForClientEntryPanel: function(absCmp,tab,entryFormPanel,resp){
        var me =  this;
            me.mapScreenBToClientEntryWindowScreen(tab, null, resp);
            clientDeliveryAddressGrid = absCmp.query('grid[itemId=client_delivery_address_grid]')[0],
            gridStore = clientDeliveryAddressGrid.getStore();
            if(absCmp.params.mode=="edit"){
                me.reloadEntryPanelGridAfterSave(gridStore,absCmp,null);
            }
            else{
                me.addBlankRecord(gridStore,10);
            }
            absCmp.query('hiddenfield[itemId=id]')[0].setValue(resp.data.id);
            if(Ext.msk)
                Ext.msk.hide();
    },
    mapScreenBToClientEntryWindowScreen: function(absCmp,clearFld, resp){
        if(Ext.isEmpty(clearFld))
            clearFld = false;
        var me = this,
            mapperArr = YBase.utility.DataMapperHelper.entryCompanyDataMapper,
            data = me.getMapperData(absCmp,mapperArr,clearFld, resp);
    },
    getMapperData : function(absCmp,mapperArr,clearFld, resp) {
        var me=this,
            orderForm = absCmp.query('form[itemId=entryFormPanel]')[0],
            frmValues = orderForm.getValues(),
            data = {}, company_field, order_field;
        for(company_field in mapperArr){
            order_field = mapperArr[company_field];

            data['dynamic_fields['+company_field+']'] = clearFld == true ? null : frmValues['dynamic_fields['+order_field+']'];
        }

        var clientform = me.absCmp.query('form[itemId=entryFormPanel]')[0].getForm(),
            dynamic_fields =  Ext.merge(resp.data.dynamic_fields, data);

        clientform.setValues(dynamic_fields);
        return data;
    },    

    showEntryPanel:function(me, resp, params){
        var absCmp = me.absCmp;
        absCmp.resp = resp;
        absCmp.params = params;
        absCmp.action_roles = resp.data['action_roles'];
       // me.ButtonHelper.setWindowBtnVisibility(absCmp);
        
        me.setEntryData(absCmp);
        var formPanel = absCmp.query('form[itemId=entryFormPanel]')[0];
        YBase.utility.EntryPanelHelper.assignNxtCmpIdToScreenFields(absCmp,formPanel);
        me.msgCmp = absCmp.query('component[itemId=msgCmp]')[0];
    },
    addClearButton: function(absCmp) {
        var fld_B2 = absCmp.query('textfield[itemId=column_12_13]')[0]; //company
        if(!Ext.isEmpty(fld_B2))
            YBase.utility.UxHelper.addClearButton(fld_B2);
    },
    
    setEntryData: function(absCmp){
        var me=this,
            data = absCmp.resp.data,
           // entryDetailRecords = absCmp.resp.entryDetailRecords,
            frm= absCmp.query('form[itemId=entryFormPanel]')[0].getForm();
           // entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
           // gridStore = entryDetailGrid.getStore(); 
           //clientDeliveryAddressGrid = absCmp.query('grid[itemId=client_delivery_address_grid]')[0],
           //gridStore = clientDeliveryAddressGrid.getStore();
        absCmp.entry_id = data.id;
        absCmp.entry_code =  data.entry_code;
        Ext.order_number  = absCmp.entry_code;
        if(absCmp.params.mode=="new"){
            frm.reset();
            //gridStore.removeAll();
            if(absCmp.params.is_clone == 1){
                 //gridStore.loadRawData(entryDetailRecords);
            }
            else{
             //   me.addBlankRecord(gridStore,10);
            }

        }
        else{
            //absCmp.query('panel[itemId=tabPnlNew]')[0].removeCls('new-entry-tab-panel');     
           // absCmp.query('panel[itemId=tabPnlNew]')[0].addCls('edit-entry-tab-panel');     
        }
        
        frm.setValues(data.dynamic_fields);
        if(absCmp.params.mode=="new" && !Ext.isEmpty(absCmp.params.customer_code)){
            absCmp.cmpEvent.mapCustomerRecords(absCmp,absCmp.resp.customerData,true);
        } 
        if(absCmp.params.mode=="edit"){
          //  me.reloadEntryPanelGridAfterSave(gridStore,absCmp,null);
        }
        else{
           // me.loadTab3Grid();
        }
        //   me.reRoutePopupWin(absCmp.entry_code);
        YBase.utility.ButtonHelper.setWindowBtnVisibility(absCmp);
       // me.setFldOldValues(data.dynamic_fields);
        absCmp.query('hiddenfield[itemId=id]')[0].setValue(data.id);
        
        //absCmp.query('textfield[itemId=column_8_02]')[0].focus();
        absCmp.initialFormValues = JSON.parse(JSON.stringify(frm.getValues()));
        if (Ext.msk) 
            Ext.msk.hide();
    },

    setFldOldValues: function(data){
        var absCmp = this.absCmp;
        absCmp.oldFldValues['column_8_17'] = data['dynamic_fields[column_8_17]']; //B1:Company CD
        absCmp.oldFldValues['column_8_18'] = data['dynamic_fields[column_8_18]']; //B2:Company Name
        absCmp.oldFldValues['column_8_19'] = data['dynamic_fields[column_8_19]']; //B3:ZipCode
        absCmp.oldFldValues['column_8_32'] = data['dynamic_fields[column_8_32]']; //C3:ZipCode
        absCmp.oldFldValues['column_8_50'] = data['dynamic_fields[column_8_50]']; //D3:ZipCode
    },
    
    gridEmptyCheck: function(gridStore,modifiedRecords,compulsarCol) {
        if(Ext.isEmpty(compulsarCol))
            compulsarCol = 'column_15_03';
        var me = this,
            gridRecords = !Ext.isEmpty(gridStore) ? gridStore.getRange() : [],
            recCount = gridRecords.length,
            isEntryGridEmpty = false;
        if(me.absCmp.params.mode == "new" && Ext.isEmpty(modifiedRecords)){

            // for(var i=0;i<recCount;i++){
                // product name must be entered.
                if(Ext.isEmpty(gridRecords[0].data[compulsarCol])){
                    isEntryGridEmpty = true;
                    // break;    
                }
            // }
        }
        else if(recCount== 1 && Ext.isEmpty(gridRecords[0].data[compulsarCol])){
            isEntryGridEmpty = true;
        }
        else{
            for(var i=0;i<recCount;i++){
                // product name must be entered.
                if(me.checkEmpty(gridRecords[i],compulsarCol)){
                    isEntryGridEmpty = true;
                    break;    
                }
            }
        }
        return (isEntryGridEmpty);
    },
    saveRecord: function(button,showMsgAfterSave,actionType){
        var me = this,
            absCmp = me.absCmp,
            formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = formPanel.getForm(),
            mode = absCmp.params.mode,
            entryDetailGridId = 'client_delivery_address_grid';//YBase.utility.EntryPanelHelper.entryDetailGridId;
            entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            params = {},
            gridStore =  null;
            if(!Ext.isEmpty(entryDetailGrid))
                gridStore = entryDetailGrid.getStore();

        var hasError = false,  
            user_tz = jstz.determine().name();//gets the browser or system timezone
           /* hasError =   YBase.utility.GridHelper.validateGrid(entryDetailGrid,gridStore,entryDetailGrid.view),
            entryDetailRecords = me.getGridRecords(gridStore,'column_15_03','column_15_19'),
            isEmpty = me.gridEmptyCheck(gridStore,entryDetailRecords,'column_15_03');*/

       // if(!hasError && !isEmpty){
        if(!hasError){
            // me.setSerialNumberToGridRecords(entryDetailRecords,'column_3_22');
            //entryDetailRecords = JSON.stringify(entryDetailRecords);
            params['clientDeliveryAddressRecords'] = null;//entryDetailRecords;
            params['forRepairEntryWindow'] = 'repairEntryWindow';
            params['isSaveRec'] = true;
            params['time_zone'] = user_tz;
            if(frm.isValid()){
                if(Ext.msk)
                    Ext.msk.hide();
                 if(absCmp.params.mode == "new"){
                    Ext.msk = Ext.create('YBase.utility.Mask',{hideOnErrorInterval: 20000});
                    Ext.msk.show(Ext.LANG.globalLang.progressBarText.saving,Ext.getBody());
                }
               // me.showSavingMask(true);
                button.setDisabled(true);
                frm.submit({
                    url : 'bizlayer/repairEntryPanel/save',
                    params: params,
                    scope: me,
                    // clientValidation: !isTempSave,
                    success: function(form, o){
                        //set save button enabled
                        button.setDisabled(false);
                        var me = this,
                            absCmp = me.absCmp,
                            res = o.result,
                            msg = Ext.LANG.globalLang.successMsg.saveSuccess,
                            route = 'RepairEntryWindow',
                            customPanelId = route;
                        // Set Last Updated By and Datetime
                        form.setValues(res.dynamic_fields);
                        absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));
                        if(Ext.msk)
                            Ext.msk.hide();
                        if(absCmp.params.popup == true){
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,msg);
                            //me.reloadEntryPanelGridAfterSave(gridStore,absCmp,res.id);
                            // if(Ext.msk){
                            //     Ext.msk.hide();
                            // }
                            return;
                        }
                        //Edit Mode
                        if(absCmp.params.mode=="new" /*|| absCmp.params.order_code!=res.order_code*/){
                            params = {mode: 'edit'}; 
                            me.changePanelToEditMode(absCmp,res,customPanelId);
                            absCmp.action_roles = res.editModeActionRoles;
                            YBase.utility.ButtonHelper.setWindowBtnVisibility(absCmp);
                            absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));
                            Ext.defer(function(){
                                Ext.Router.redirect(route + '/edit?id='+res.id+'&entry_code='+res.entry_code+'&mode=edit'); 
                                absCmp.route = location.href;
                                // if(Ext.msk){
                                //     Ext.msk.hide();
                                // }
                            },300);
                        }
                        else{
                            me.changePanelToEditMode(absCmp,res,customPanelId);
                            absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));  
                        }
                        me.showToolBarMsg(msg,true);
                        // if(Ext.msk){
                        //     Ext.msk.hide();
                        // }
                        
                    },
                    failure: function(form, o){
                        //set save button enabled
                        button.setDisabled(false);
                        if(Ext.msk){
                            Ext.msk.hide();
                        }
                        var msg = '';
                        if(!Ext.isEmpty(o.result) && !Ext.isEmpty(o.result.msg)){
                            var errorMsg = o.result.msg;
                            if(Ext.isArray(errorMsg)){
                                for(var key in errorMsg){
                                    msg += errorMsg[key][0] + '<br/>';
                                }
                            }
                            else
                                msg = errorMsg;
                            
                            msg = Ext.isEmpty(msg) ? o.result.data : msg;
                        }
                        /*Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   msg,
                            modal: true,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });*/
                        me.showToolBarMsg(msg,false);
                    }
                });
            }
            else{
                /*Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.invalidFormFields,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });*/   
                me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.invalidFormFields,false);
            }
        }
        else{
            /*Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.errorMsg.emptyOrderDetailEntry,
                modal: true,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });*/   
            me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.emptyOrderDetailEntry,false);
        }
    },
    changePanelToEditMode: function  (absCmp,res,customPanelId) {
        absCmp.params.mode = "edit";
        absCmp.mode = "edit";
        absCmp.is_new = false;
        absCmp.customPanelId = customPanelId + '-' + res.entry_code;
        // absCmp.itemId = customPanelId + '-' + res.order_code;
        var title = Ext.LANG.repairEntryPanel.pnlTitle+'['+res.entry_code+']';
        absCmp.setTitle(title);
        absCmp.query('hiddenfield[itemId=id]')[0].setValue(res.id);
        absCmp.entry_code = res.entry_code;
        absCmp.entry_id = res.id;
    },
    onNewEntryAfterSaveClick: function(absCmp,gridStore,id) {
        var me = this,
            route = me.pnlName; 
           // purchaseEntry = absCmp.params.purchaseEntry == true ? '&purchaseEntry=true' : '';
        if(absCmp.params.mode=="new"){
            absCmp.params = {mode: 'new'};
            me.resetEntryPanel(absCmp);
            Ext.defer(function(){
                Ext.Router.redirect(route+'/new?mode=new');
            },300);
        }
        else if(absCmp.params.mode=="edit"/* && absCmp.params.order_code==res.order_code*/){
            //me.reloadEntryPanelGridAfterSave(gridStore,absCmp,id);
            Ext.defer(function(){
                Ext.Router.redirect(route+'/new?mode=new');
            },300);
        }
    },
    setSerialNumberToGridRecords: function(records,colName){
        var me = this,
            absCmp = me.absCmp;
        
        for (var i=0,j=0;i<records.length; i++){
            if(Ext.isEmpty(records[i].delete_flg)){
                records[i][colName] = ++j;
            }
        }
    },
    loadEntryPanel: function(params){
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.repairEntryPanel,
            entryMasterId = params.id,
            entryMasterCode = params.entry_code,
          //  bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            bodyTab = Ext.ComponentQuery,
            entryPanelItemId = 'RepairEntryWindow', 
            entryPanelId = me.pnlName,//pnlName is retrived from respective derived controller
            title,entryPanel;

        title = entryPanelLang.pnlTitle;
        if(params.mode=="new"){
            // entryPanelId = entryPanelItemId;
        }
        else if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelId = entryPanelId + '-' + entryMasterCode;
            title = title+'['+entryMasterCode+']';
        }
        // entryPanel = bodyTab.query('panel[itemId=' + entryPanelId + ']');

        entryPanel = bodyTab.query('panel[customPanelId=' + entryPanelId + ']');
        YBase.utility.TabLoader.initGlobalVariable();
        
        if (typeof(entryPanel) !== "undefined" && entryPanel.length > 0) {
            if(params.is_clone == 1 && entryPanel[0].params.clone_master_id !=params.clone_master_id){
                entryPanel[0].params = params;
                me.resetEntryPanel(entryPanel[0]);  
            }
            else{
                entryPanel[0].params = params;
               // bodyTab.setActiveTab(entryPanel[0]);
                me.absCmp = entryPanel[0];

                if(params.mode=="new" && params.is_clone==1  && entryPanel[0].params.clone_master_id !=params.clone_master_id){
                    if(entryPanel[0].isActive !== true){
                        entryPanel[0].isActive = true;
                        me.viewEntryDetails(params,true);    
                    }
                    else
                        entryPanel[0].isActive = false;    
                }
                else{
                    if(Ext.msk)
                        Ext.msk.hide();
                }
            }
        } 
        else {
            me.createEntryPanel(entryPanelItemId,entryPanelId,params,title,bodyTab);  
        }
       // Ext.bodyTab = bodyTab;
        return;
    },
    createEntryPanel : function(entryPanelItemId,entryPanelId,params,title,bodyTab){  
        var me = this;
        me.entryPanel = Ext.create('YBase.view.RepairEntryWindow', {
                customItemId : entryPanelItemId,
                customPanelId : entryPanelId,
                params: params,
                title: title,
                is_new:true,
                closable: true,
                modal : true,
                height:500,
                width:1200
                //PanelNo: 9,
               // showBulkUpdate:false,
               // iconCls:iconClass
            });
        //me.entryPanel.on('close',me.onClientEntryWindowClose, me);
        me.entryPanel.show(); 

    },
    onClientEntryWindowClose: function(){
        this.entryPanel =  null;
    },
    reloadEntryPanelGridAfterSave : function(gridStore,absCmp,id) {
        var me = this,
            orderHistoryGrid = absCmp.query('grid[itemId=order_history_grid]')[0];
        gridStore.removeAll();
        gridStore.load();
        orderHistoryGrid.getStore().load();
    },
    resetEntryFormForNewMode : function(absCmp,actionType){
        var me=this, 
            params=absCmp.params,
            user_tz = jstz.determine().name();//gets the browser or system timezone
        params['resetEntryForm']=1;
        params['time_zone'] = user_tz;
        Ext.Ajax.request({
            url: 'bizlayer/repairEntryPanel/getEntryData',
            method: 'GET',
            params:params,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    var formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
                        frm = formPanel.getForm();
                    absCmp.resp = resp;
                    // absCmp.fromEditBtn = false;
                    me.setEntryData(absCmp);
                    
                }
            }
        });
    },
    onBtnDeleteClick: function(button) {
        var me = this,
            absCmp = me.absCmp;
        Ext.Msg.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.confirmMsg.deleteConfirm, function(o) {
            if(o=="yes") {
                Ext.Ajax.request({
                    url : 'bizlayer/repairEntryPanel/deleteRecord',
                    method : 'POST',
                    params : {entry_id : absCmp.entry_id},
                    success : function(response) {
                        var resp = Ext.decode(response.responseText);
                        if(resp.success){
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.successMsg.deleteSuccess);
                                /*var tab =  Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0];
                                if(!Ext.isEmpty(tab)){
                                    var entryForm =  tab.query('form[itemId=entryFormPanel]')[0],
                                        b_fields = me.getBlankBFormFields();
                                        entryForm.getForm().setValues(b_fields);
                                        tab.query('hidden[itemId=client_id]')[0].setValue(null);
                                }*/
                            absCmp.close();
                        }
                        else{
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.deleteError);    
                        }
                    },
                });
            }
        },me);
    },
    getBlankBFormFields:  function(){
        var bScreenFields = {
                'dynamic_fields[column_1_17]' : null,
                'dynamic_fields[column_1_18]' : null,
                'dynamic_fields[column_1_19]' : null,
                'dynamic_fields[column_1_20]' : null,
                'dynamic_fields[column_1_21]' : null,
                'dynamic_fields[column_1_22]' : null,
                'dynamic_fields[column_1_23]' : null,
                'dynamic_fields[column_1_24]' : null,
                'dynamic_fields[column_1_25]' : null,
                'dynamic_fields[column_1_26]' : null,
                'dynamic_fields[column_1_27]' : null,
                'dynamic_fields[column_1_28]' : null,
                'dynamic_fields[column_1_29]' : null,
                'dynamic_fields[column_1_44]' : null,
                'dynamic_fields[column_1_45]' : null,
                'dynamic_fields[column_1_46]' : null
        }
        return bScreenFields;
    },
    isEntryGridDirty: function(absCmp){
        var me = this,
            grid = absCmp.query('grid[itemId='+YBase.utility.EntryPanelHelper.entryDetailGridId+']')[0];
        if(Ext.isEmpty(grid))
            return false;
        var store = grid.getStore();
        if(absCmp.params.mode == 'new' && store.count() == 0){
            return false;
        }
        else
            return YBase.utility.GridHelper.isGridStoreDirty(store,'column_2_04');
    },
    showToolBarMsg: function(msg,success) {
        var me = this,
            msgCmp = me.msgCmp;
        if(msgCmp.hidden) {
            msgCmp.show();
        }
        if(Ext.isEmpty(success)) {
            success=true;
        }
        if(!success) {
            msg = '<div class="msg-cmp msg-failure"><span>'+msg+'</span><span class="icons-delete"></span></div>';
        }else {
            msg = '<div class="msg-cmp msg-success"><span>'+msg+'</span><span class="icons-delete"></span></div>';
        }
        if(!Ext.isEmpty(msgCmp)) {
            msgCmp.update(msg);
            Ext.defer(function() {
                me.hideToolBarMsg();
            },1000);
            
        }
        else {
            console.log('noMsgCnt',msg);
        }
    },
    hideToolBarMsg: function() {
        var me = this,
            msgCmp = me.msgCmp;
        if(!msgCmp.hidden)
            msgCmp.hide();
    },
    BtnAddCommentClick: function(button, e, eOpts) {
        var me =this,
            msgTabWinObj = me.setMsgTabWin(),
            bodyTab = Ext.bodyTab,
            bodyTabItems = bodyTab.items.items,
            activeTab = bodyTab.getActiveTab(),
            activeTabCntrl = activeTab.cntrl,
            absCmp,tabpanel={};
        for(var i=0;i<bodyTabItems.length;i++) {
            tabpanel = bodyTabItems[i];
            if(tabpanel.itemId != 'DashBoardPanel' && 'cntrl' in tabpanel && !Ext.isEmpty(tabpanel.cntrl.msgTabWin)) {
                tabpanel.cntrl.msgTabWin = null;
            }
        }
        if(!Ext.isEmpty(activeTabCntrl.msgTabWin)) {
            activeTabCntrl.msgTabWin = null;
        }
        var activeTabStr = msgTabWinObj['activeTabStr'],
            inactiveTabArrStr = msgTabWinObj['inactiveTabArrStr'],
            encodedActiveUri = encodeURI(activeTabStr),
            encodedInActiveUri = encodeURI(inactiveTabArrStr),
            route = 'popupWindow#messageWin?at='+encodedActiveUri+'&iat='+encodedInActiveUri,
            // route = 'popupWindow#messageWin?activeTabWinStr='+activeTabStr+'&inactiveTabWinArrStr='+inactiveTabArrStr,
            name  = 'messageWin';
        var w = 640, h= document.body.clientHeight-70,
        t = window.screenTop + (window.outerHeight- window.innerHeight)
        l = window.screenLeft + window.outerWidth - (window.outerWidth-window.innerWidth) - w, options="";
        options = Ext.String.format('directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width={0},height={1},top={2},left={3}',w,h,t,l);
        // window.opener.parent = this.absCmp;
        me.msgTabWin = window.open(route,name,options);
        me.msgTabWin.opener['parentPanel'] = this.absCmp;
    },
    onEntryPanelActivate: function(absCmp) {
        var me = this;
        me.absCmp = absCmp;
        // me.reRoutePopupWin(absCmp.entry_code);
        me.reRouteMsgTabPopupWin(absCmp);
    },
    reRouteEntryPanelWin: function(route,params){
        var me = this,
            res = {},
            customPanelId = 'ClientEntryPanel';
        if(Ext.msk){
            Ext.msk.hide();
        }
        Ext.msk = Ext.create('YBase.utility.Mask');
        Ext.msk.on('afterrender', function(){
            Ext.Router.redirect(route);
            me.absCmp.params = params;
            me.viewEntryDetails(params, false);
        });
        var mskBody = me.absCmp.hasOwnProperty('getBody') ? me.absCmp.getBody() : me.absCmp.getEl();
        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, mskBody);
    },
    
    reRouteMsgTabPopupWin: function(absCmp) {
        var me =this,
            msgTabWinObj = me.setMsgTabWin();
        var activeTabStr = msgTabWinObj['activeTabStr'],
            inactiveTabArrStr = msgTabWinObj['inactiveTabArrStr'],
            encodedActiveUri = encodeURI(activeTabStr),
            encodedInActiveUri = encodeURI(inactiveTabArrStr),
            route = 'messageWin?at='+encodedActiveUri+'&iat='+encodedInActiveUri,
            name  = 'messageWin';
        if(absCmp.params.mode == 'edit' && !Ext.isEmpty(me.msgTabWin) && !me.msgTabWin.closed){
            me.msgTabWin.opener.parentPanel = absCmp;
            // var route = 'popupWindow#messageWin?activeTabWinStr='+activeTabStr+'&inactiveTabWinArrStr='+inactiveTabArrStr,
            var msgTabWinCntrl = me.msgTabWin.YBase.app.getController('MsgTabWinController');
            msgTabWinCntrl.reRoute(route);
        }
    },
    setMsgTabWin: function() {
        var me = this,
            messagePanelLang = Ext.LANG.messagePanel,
            activeTabObj = {
                't':1,
                'r':me.absCmp.params.entry_code,
                'app': messagePanelLang.orderAppName,
                'id': me.absCmp.params.id
            },
            inactiveTabArr = [
                {
                    't'   : 5,
                    'r'   : this.absCmp.params.company_code,
                    'app' : messagePanelLang.horensoAppName
                },
                {
                    't':101,
                    'r':25,
                    'app': messagePanelLang.emailAppName
                }
            ],
            activeTabStr = JSON.stringify(activeTabObj),
            inactiveTabArrStr = JSON.stringify(inactiveTabArr),
            msgTabWinObj = {
                'activeTabStr':activeTabStr,
                'inactiveTabArrStr':inactiveTabArrStr
            };
        return msgTabWinObj;
    },
    onMenuItemPrintClick: function(btn) {
        var me = this,
            absCmp = me.absCmp,
            itemId = btn.itemId;
        me.printCsvReport(absCmp.entry_id,itemId);
    },
    printCsvReport: function(entry_ids,menuItemId){
        if(menuItemId == 'menuItemPrintJson'){
            type = 'report-json';
        }
        else if(menuItemId == "menuItemPrintCsv"){
            type = 'report-csv';
            var form_325 = new Ext.FormPanel({
                    id: 'csvForm',
                    method: "POST",
                    url: "bizlayer/csvExport/getRptListData",
                    baseParams: {
                        order_masters_ids:JSON.stringify(entry_ids),
                        csv_report_id:3,
                        printAll:true,
                    },
                    standardSubmit: true
                });

            form_325.getForm().submit({
                target: '_blank'
            });
            return;
        }
        var report_id = 5,
            url = 'bizlayer/csvReport/getReportArray?report_id='+report_id+'&entry_id='+entry_ids;
        window.open(url,'_blank');
        return;
    },
    showSavingMask: function(load){
        if(load){
            var  mskBody = Ext.getBody();
            Ext.msk.show(Ext.LANG.globalLang.progressBarText.saving, mskBody);
        }
        else
            Ext.msk.hide();
    },
    onBtnNewClick: function(btn) {
        var me = this,
            route = me.pnlName,
            bodyTab = !Ext.isEmpty(Ext.bodyTab) ? Ext.bodyTab : Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPanel = bodyTab.query('panel[customPanelId='+route+'][is_new=true]');
        if(!Ext.isEmpty(entryPanel)){
            var pnl = entryPanel[0],
                isDirty = me.entryPanelDirtyCheck(pnl);    
            if(pnl.params.is_clone==1){
                var params = {
                    mode : 'new',
                   // is_bill_order : isBillOrder,
                    is_new : true
                };

                pnl.params = params;
                me.resetEntryPanel(pnl);
                Ext.defer(function() {
                    Ext.Router.redirect('settings/'+route+'/new?mode=new');
                },300);
                
                return;
            }

            if(isDirty){
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:  Ext.LANG.globalLang.confirmMsg.askBeforeClose,
                    modal: true,
                    icon: Ext.Msg.QUESTION,
                    buttons: Ext.Msg.YESNO,
                    fn: function(btn){
                        if(btn=="yes"){
                            me.resetEntryPanel(pnl); 
                        }
                    }
                }); 
                return;  
            }
            else{
                me.resetEntryPanel(pnl);    
            }
        }
        else{
            Ext.Router.redirect('settings/'+route+'/new?mode=new');
        }
    },
    entryPanelDirtyCheck : function(absCmp){
        var me = this,
            //entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            //entryDetailGridStore = entryDetailGrid.getStore(),
            isFrmDirty = me.isFormFieldsDirty(absCmp),
            isCancelClicked = Ext.isEmpty(absCmp.isCancelClicked) ? false : absCmp.isCancelClicked,
            isEntryGridDirty = isCancelClicked === false ? me.isEntryGridDirty(absCmp) : false;
        absCmp.isCancelClicked = false;
        if(isFrmDirty === true || isEntryGridDirty === true){
            return true;
        }
        else{
            return false;
        }
    },
  /*  isFormFieldsDirty: function(absCmp){
        var initialFormValues = absCmp.initialFormValues,
            currentFormValues = absCmp.query('form[itemId=entryFormPanel]')[0].getValues(),
            isDirty = false;
        for(var key in initialFormValues){
            if( key!="page_size" && 
                !Ext.isEmpty(currentFormValues[key]) &&
                initialFormValues[key]!=currentFormValues[key])
            {
                isDirty = true;
                break;
            }
        }
        return isDirty;
    },*/
    onBtnCancelClick: function(button){
        var me = this;
        me.checkRecordDirty();        
    },
    checkRecordDirty: function(absCmp) {
        var me = this,
            absCmp = absCmp || me.absCmp,
            isDirty = me.entryPanelDirtyCheck(absCmp);
        if(isDirty){
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:  Ext.LANG.globalLang.confirmMsg.askBeforeClose,
                modal: true,
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn=="yes"){
                        absCmp.un('beforeclose',me.onEntryPanelBeforeClose,me);
                        absCmp.close(); 
                    }
                }
            }); 
            return false; 
        }
        else{
            absCmp.un('beforeclose',me.onEntryPanelBeforeClose,me);
            absCmp.close();
           
        }
    },
    onEntryPanelBeforeClose: function(absCmp,eOpts) {
        var me = this,
            fromEditBtn  = absCmp.fromEditBtn === true ? true : false;
            close = true;
        me.absCmp = absCmp;
        // if(fromEditBtn) {
        //     absCmp.fromEditBtn=null;
        //     return true;
        // }
        close = me.checkRecordDirty(absCmp);
        return close;
    },
    onBtnSaveClick: function(button,e,eOpts){
        var me = this;
        me.saveRecord(button);    
    },
    onMaxmizeToolClick: function(tool, e, eOpts){
        var me = this;
        toolType =  tool.type;
        w = (toolType=="maximize") ? Ext.getBody().getViewSize().width-4  : me.absCmp.actualWidth;
        h = (toolType=="maximize") ? Ext.getBody().getViewSize().height  : me.absCmp.actualHeight;
        toggleTool =  (toolType=="maximize") ? tool.setType("minimize") : tool.setType("maximize");
        me.toolType=toggleTool;
        me.absCmp.maxWidth = 1900;
        me.absCmp.setWidth(w);
        me.absCmp.setHeight(h);
        me.absCmp.center();
    },
    onEntryPanelAfterrender: function(absCmp){
        var me = this, 
            windowEl = absCmp.getEl();
        windowEl.on("dblclick", function(e, el) {
            if (e.getTarget(".x-window-header") && e.getTarget(".window-maximize")) {
                    tool = absCmp.query('tool[itemId=resizeTool]')[0];
                    w = (me.toolType=="maximize") ? Ext.getBody().getViewSize().width-4 :absCmp.actualWidth;
                    h = (me.toolType=="maximize") ? Ext.getBody().getViewSize().height  : me.absCmp.actualHeight;
                    toggleTool =  (me.toolType=="maximize") ? tool.setType("minimize") : tool.setType("maximize");
                    absCmp.maxWidth = 1900;
                    absCmp.setWidth(w);
                    absCmp.setHeight(h);
                    absCmp.center();
                if(me.toolType=="maximize"){
                    me.toolType='minimize';
                }else{
                    me.toolType='maximize';
                }
            }
        });
    },
    onBtnCancelClick: function(button){
        var me = this;
        me.checkRecordDirty();        
    },
    checkRecordDirty: function(absCmp) {
        var me = this,
            absCmp = absCmp || me.absCmp,
            isDirty = me.entryPanelDirtyCheck(absCmp);
        if(isDirty){
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:  Ext.LANG.globalLang.confirmMsg.askBeforeClose,
                modal: true,
                icon: Ext.Msg.QUESTION,
                buttons: Ext.Msg.YESNO,
                fn: function(btn){
                    if(btn=="yes"){
                        absCmp.un('beforeclose',me.onEntryPanelBeforeClose,me);
                        absCmp.close(); 
                    }
                }
            }); 
            return false; 
        }
        else{
            absCmp.un('beforeclose',me.onEntryPanelBeforeClose,me);
            absCmp.close();
            me.redirectInActivePanel();
        }
    },
    redirectInActivePanel: function(){
        var tabPnl = Ext.bodyTab,
            tab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            activeTab = tab.getActiveTab();
        if(!Ext.isEmpty(activeTab)){
            if(activeTab.getItemId()=='CustomerPanel')
                 Ext.Router.redirect('customer');
            else if(activeTab.getItemId()=='Repair')
                    Ext.Router.redirect('repairList');
        }
    },
    init: function(application) {
        var me=this;
        me.control({
            "repairEntryWindow tool[itemId=resizeTool]":{
                'click' : me.onMaxmizeToolClick
            }   
        });
        this.callParent(arguments);
    }
});