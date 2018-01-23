Ext.define('YBase.controller.ServiceEntryWindowController', {
    extend: 'YBase.controller.EntryPanelBaseController', 
    pnlName : 'ServiceEntryWindow',
    pnlNo : 10,
    currentViewAlias: 'serviceEntryWindow',
    is_bill_order : 1,
    absCmp:null,
    msgCmp: null,
    refs:[
        {
            ref: 'serviceEntryWindow',
            selector: 'serviceEntryWindow'
        } 
    ],
    getPnlTitle : function(params) {
        var me = this,
            lang = Ext.LANG.serviceEntryPanel,
            title;
            title = lang.pnlTitle;
        return title;
    },
    resetEntryPanel: function(pnl,actionType){
        var me = this;
        Ext.bodyTab.setActiveTab(pnl);
        me.absCmp = pnl;
        me.resetEntryFormForNewMode(pnl,actionType);    
    },
    languageImplementation: function(absCmp) {
        var lang = Ext.LANG,
            btnLang = lang.globalLang.buttons,
            entryPnlLang = lang.entryPanel;
        // entry action buttons
        absCmp.query('button[itemId=btnNewOrderEntry]')[0].setText(entryPnlLang.btnNewSalesEntry);
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
    onEntryPanelBeforerender: function(absCmp) {
        // if(Ext.msk)
        //     Ext.msk.hide();
        var me = this;
        me.absCmp =  absCmp;
        me.absCmp.actualWidth =  absCmp.width;
        me.absCmp.actualHeight =  absCmp.height;
        me.callParent(arguments);
        me.hidePnlActionButtons(absCmp);
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
    hidePnlActionButtons: function(absCmp) 
    {
        // absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAddComment]')[0].setVisible(false);

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
            url: 'bizlayer/serviceEntryPanel/getEntryData',
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
                        var cmpEvent = new Ext.ux.ServiceComponentEvent(),
                            btnSave  = absCmp.query('button[itemId=btnSave]')[0];
                        YBase.utility.ServiceEntryPanelHelper.renderScreenComponents(me);
                        absCmp.cmpEvent = cmpEvent;
                        cmpEvent.init(me,me.absCmp);
                        me.addClearButton(me.absCmp);
                        if(resp.data.dynamic_fields["dynamic_fields[column_10_27]"] == "Received")
                        {
                            btnSave.disable();
                        }
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
    addClearButton: function(absCmp) {
        var customer_name = absCmp.query('textfield[itemId=column_10_14]')[0]; //customer_name
        if(!Ext.isEmpty(customer_name))
            YBase.utility.UxHelper.addClearButton(customer_name);
    },
    
    setEntryData: function(absCmp){
        var me=this,
            data = absCmp.resp.data,
            // entryDetailRecords = absCmp.resp.entryDetailRecords,
            frm= absCmp.query('form[itemId=entryFormPanel]')[0].getForm();
            // entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            // gridStore = entryDetailGrid.getStore();
        absCmp.entry_id = data.id;
        absCmp.entry_code =  data.entry_code;
        dynamic_fields = absCmp.resp.data.dynamic_fields;
        absCmp.customer_data ={
                        customer_code : dynamic_fields['dynamic_fields[column_10_13]'],
                        is_free : dynamic_fields['dynamic_fields[column_10_33]']
                    };
        if(absCmp.params.mode=="new"){
            frm.reset();
            // gridStore.removeAll();

            if(absCmp.params.is_clone == 1){
                // gridStore.loadRawData(entryDetailRecords);
            }
            else{
                // me.addBlankRecord(gridStore,5);
                // me.addBlankRecord(tabGroupGridStore);
            }
        }
        else{
        }
        
        frm.setValues(data.dynamic_fields);
        if(absCmp.params.mode=="new" && !Ext.isEmpty(absCmp.params.order_master_id)){
            absCmp.cmpEvent.mapServiceCompanyRecords(absCmp,absCmp.resp.customerData,true);
        }
       if(absCmp.params.mode=="new" && !Ext.isEmpty(absCmp.params.customer_code)){
            absCmp.cmpEvent.mapCustomerRecords(absCmp,absCmp.resp.customerData,true);
        }
        // if(absCmp.params.mode=="edit"){
        //     me.reloadEntryPanelGridAfterSave(gridStore,absCmp,null);
        // }
        me.reRoutePopupWin(absCmp.entry_code);
        YBase.utility.ButtonHelper.setWindowBtnVisibility(absCmp);
        me.setFldOldValues(data.dynamic_fields);
        absCmp.query('hiddenfield[itemId=id]')[0].setValue(data.id);
        // absCmp.query('textfield[itemId=column_4_02]')[0].focus();
        absCmp.initialFormValues = JSON.parse(JSON.stringify(frm.getValues()));
        me.setOldCustomerServiceInfo(absCmp);
        if (Ext.msk) 
            Ext.msk.hide();
    },
    setFldOldValues: function(data){
        var absCmp = this.absCmp;
        // absCmp.oldFldValues['column_4_17'] = data['dynamic_fields[column_4_17]']; //B1:Company CD
        // absCmp.oldFldValues['column_4_18'] = data['dynamic_fields[column_4_18]']; //B2:Company Name
        // absCmp.oldFldValues['column_4_19'] = data['dynamic_fields[column_4_19]']; //B3:ZipCode
        // absCmp.oldFldValues['column_4_32'] = data['dynamic_fields[column_4_32]']; //C3:ZipCode
        // absCmp.oldFldValues['column_4_50'] = data['dynamic_fields[column_4_50]']; //D3:ZipCode
    },
    gridEmptyCheck: function(gridStore,modifiedRecords,compulsarCol) {
        if(Ext.isEmpty(compulsarCol))
            compulsarCol = 'column_11_08';
        var me = this,
            gridRecords = !Ext.isEmpty(gridStore) ? gridStore.getRange() : [],
            recCount = gridRecords.length,
            isEntryGridEmpty = false;
        if(me.absCmp.params.mode == "new" && Ext.isEmpty(modifiedRecords)){
                // product name must be entered.
                if(Ext.isEmpty(gridRecords[0].data[compulsarCol])){
                    isEntryGridEmpty = true;
                }
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
        // if(Ext.isEmpty(showMsgAfterSave)){
        //     showMsgAfterSave = true;
        // }
        var me = this,
            absCmp = me.absCmp,
            formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = formPanel.getForm(),
            mode = absCmp.params.mode,
            frmValues = frm.getValues(),
            // entryDetailGridId = YBase.utility.EntryPanelHelper.entryDetailGridId,
            // entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            // gridStore = entryDetailGrid.getStore(),
            params = {}, 
            user_tz = jstz.determine().name();//gets the browser or system timezone
        // var hasError = YBase.utility.GridHelper.validateGrid(entryDetailGrid,gridStore,entryDetailGrid.view),
        //     entryDetailRecords = me.getGridRecords(gridStore,'column_11_08','id','column_11_29'),
        //     isEmpty = me.gridEmptyCheck(gridStore,entryDetailRecords,'column_11_08');
        
        // if(!hasError && !isEmpty){
        if(true){
            // entryDetailRecords = JSON.stringify(entryDetailRecords);

            // params['entryDetailRecords'] = entryDetailRecords;
            params['mode'] = mode;
            params['old_customer_service_data'] = JSON.stringify(absCmp.customer_service_data);
            params['deleted_customer_service_data']  = JSON.stringify(absCmp.deleted_customer_service_data);
            params['time_zone'] = user_tz;
            if(frm.isValid()){
                if(Ext.msk)
                    Ext.msk.hide();
                if(absCmp.params.mode == "new"){
                    Ext.msk = Ext.create('YBase.utility.Mask',{hideOnErrorInterval: 20000});
                    Ext.msk.show(Ext.LANG.globalLang.progressBarText.saving,Ext.getBody());
                }
                //set disabled so that double click wont work
                button.setDisabled(true);

                frm.submit({
                    url : 'bizlayer/serviceEntryPanel/save',
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
                            route = 'ServiceEntryWindow',
                            customPanelId = route;
                        // Set Last Updated By and Datetime
                        form.setValues(res.dynamic_fields);
                        absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));
                        if(Ext.msk){
                            Ext.msk.hide();
                        }
                        if(absCmp.params.popup == true){
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,msg);
                            // me.reloadEntryPanelGridAfterSave(gridStore,absCmp,res.id);
                            // if(Ext.msk){
                            //     Ext.msk.hide();
                            // }
                            return;
                        }
                        if(absCmp.params.mode=="new" /*|| absCmp.params.order_code!=res.order_code*/){
                            params = {mode: 'edit'};
                            me.changePanelToEditMode(absCmp,res,customPanelId);
                            absCmp.action_roles = res.editModeActionRoles;
                            YBase.utility.ButtonHelper.setWindowBtnVisibility(absCmp);
                            absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));
                            Ext.defer(function(){
                                // if(Ext.msk){
                                //     Ext.msk.hide();
                                // }
                                Ext.Router.redirect(route + '/edit?id='+res.id+'&entry_code='+res.entry_code+'&mode=edit'); 
                                absCmp.route = location.href;
                            },300);
                        }
                        else{
                            me.changePanelToEditMode(absCmp,res,customPanelId);
                            absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));  
                        }
                        me.showToolBarMsg(msg,true);
                        // me.reloadEntryPanelGridAfterSave(gridStore,absCmp,res.id);
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
        var me = this,
            title = Ext.LANG.serviceEntryPanel.pnlTitle+'['+res.entry_code+']';
        absCmp.setTitle(title);
        me.setOldCustomerServiceInfo(absCmp);
        me.callParent(arguments);
    },
    setOldCustomerServiceInfo: function(absCmp){
        var formPanel = absCmp.query('form[itemId=entryFormPanel]')[0],
            frm = formPanel.getForm(),
            frmValues = frm.getValues();
            absCmp.customer_service_data = {
                                        'customer_code':  frmValues['dynamic_fields[column_10_13]'] || null,
                                        'is_freeFlag' : frmValues['dynamic_fields[column_10_33]']|| null,
                                        'usedService' :  frmValues['dynamic_fields[column_10_31]'] || null,
                                        'balanceService' : frmValues['dynamic_fields[column_10_30]'] || null
                                    };


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
    reloadEntryPanelGridAfterSave : function(gridStore,absCmp,id) {
        return;
        var me = this;
        gridStore.removeAll();
        gridStore.load();
        if(Ext.msk){
            Ext.msk.hide();
        }
        // me.loadTabGridStore(absCmp);
        // me.loadAppFilesStore(absCmp);
    },
    loadAppFilesStore: function(absCmp) {
        if(absCmp.params.mode == "new")
            return;
        var dataviewId = YBase.utility.EntryPanelHelper.entryDataViewId,
            dataview = absCmp.query('dataview[itemId='+dataviewId+']')[0],
            store = dataview.getStore();
        store.reload();
    },
    resetEntryFormForNewMode : function(absCmp,actionType){
        var me=this, 
            params=absCmp.params,
            user_tz = jstz.determine().name();//gets the browser or system timezone
        params['resetEntryForm']=1;
        params['time_zone'] = user_tz;
        Ext.Ajax.request({
            url: 'bizlayer/serviceEntryPanel/getEntryData',
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
                    url : 'bizlayer/batchMaster/deleteRecord',
                    method : 'POST',
                    params : {id : absCmp.entry_id, entry_code: absCmp.entry_code},
                    success : function(response) {
                        var resp = Ext.decode(response.responseText);
                        if(resp.success){
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.successMsg.deleteSuccess);
                            absCmp.close();
                        }
                        else{
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.deleteError);    
                        }
                    },
                });
            }
        });
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
            return YBase.utility.GridHelper.isGridStoreDirty(store,'column_10_08');
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
   /* onBtnFilePopupClick: function(btn) {
        var me =this,
            absCmp = me.absCmp,
            route = 'popupWindow#orderFileSelection?entry_code='+absCmp.entry_code,
            name  = 'fileSelectionWindow';

        me.popupWin = window.open(route,name,'directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,top=0,left=0,width=1024,height=600');
    },*/
    onBtnAddCommentClick: function(button, e, eOpts) {
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
        me.reRoutePopupWin(absCmp.entry_code);
        me.reRouteMsgTabPopupWin(absCmp);
    },
    reRouteEntryPanelWin: function(route,params){
        var me = this,
            res = {},
            customPanelId = 'EntryPanel';
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
    reRoutePopupWin: function(entry_code) {
        var me = this;
        if(!Ext.isEmpty(me.popupWin) && !Ext.isEmpty(entry_code)){
            var route = 'popupWindow#orderFileSelection?entry_code='+entry_code;
            fileSelectionCtrl = me.popupWin.YBase.app.getController('OrderFileSelectionPanelController');
            fileSelectionCtrl.reRoute(route,entry_code);
        }
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
    getModifiedRecordsForSave : function(gridStore,gridRecords,displayOrdercol) {
        var entryDetailRecords = [],
            writer = gridStore.getProxy().writer;
        for(var i =0; i<gridRecords.length;i++){
            var rec = writer.getRecordData(gridRecords[i]);
            if(gridRecords[i].data.delete_flg == 1){
                rec.delete_flg = 1;
            }
            if(!Ext.isEmpty(gridRecords[i].raw) && !Ext.isEmpty(gridRecords[i].raw.id))
                rec.id = gridRecords[i].raw.id;
            else{
                rec.id = gridRecords[i].data.id;
            }
            if(!Ext.isEmpty(displayOrdercol))
                rec[displayOrdercol] = gridRecords[i].data[displayOrdercol];
            if(!Ext.isEmpty(gridRecords[i].raw.supplier_id))
                rec['supplier_id'] = gridRecords[i].raw['supplier_id'];
            /*if(!Ext.isEmpty(gridRecords[i].data.column_10_10))
                rec['column_10_10'] = gridRecords[i].data['column_10_10'];*/
            if(!Ext.isEmpty(gridRecords[i].data.column_11_10))
                rec['column_11_10'] = gridRecords[i].data['column_11_10'];
            entryDetailRecords.push(rec);
        }
        return entryDetailRecords;
    },
    activateEntryPanelTab : function(entryPanel,params,bodyTab) {
        var me = this;
        if(params.is_clone == 1 && entryPanel[0].params.clone_master_id != params.clone_master_id){
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);  
        }
        else if(Ext.isEmpty(params.order_master_id) && !Ext.isEmpty(entryPanel[0].params.order_master_id) && params.mode == "new")
        {
            entryPanel[0].params = params;
            bodyTab.setActiveTab(entryPanel[0]);
            me.absCmp = entryPanel[0];
            me.absCmp.cmpEvent.mapOrderCodeRecords(entryPanel[0],{data:[]},true);              
        }
        else if(!Ext.isEmpty(params.customer_code) && params.customer_code != entryPanel[0].query('textfield[itemId=column_10_13]')[0].value)
        {
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);
        }
        else if(!Ext.isEmpty(params.order_master_id) && entryPanel[0].params.order_master_id != params.order_master_id) 
        {
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);
        }
        // else if(params.createBill == true){
        //     entryPanel[0].params = params;
        //     me.resetEntryPanel(entryPanel[0]);  
        // }
        else{
            entryPanel[0].params = params;
            bodyTab.setActiveTab(entryPanel[0]);
            me.absCmp = entryPanel[0];

            if(params.mode=="new" && params.is_clone==1  && entryPanel[0].params.clone_master_id != params.clone_master_id && entryPanel[0].params.clone_type != params.clone_type){
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
                    is_bill_order : isBillOrder,
                    is_new : true
                };

                pnl.params = params;
                me.resetEntryPanel(pnl);
                Ext.defer(function() {
                    Ext.Router.redirect(route+'/new?mode=new');
                },300);
                
                return;
            }
            else if(!Ext.isEmpty(pnl.params.order_master_id)){
                var params = {
                    mode : 'new',
                    is_new : true
                };

                pnl.params = params;
                me.resetEntryPanel(pnl);
                Ext.defer(function() {
                    Ext.Router.redirect(route+'/new?mode=new');
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
            if(Ext.msk)
                Ext.msk.hide();
            // Ext.defer(function() {
            //     if(Ext.msk)
            //         Ext.msk.hide();
            // },300);
            Ext.Router.redirect(route+'/new?mode=new');
        }
    },
    btnNewOrderEntry: function(btn) {
        var me = this,
            url = ''; 
            customer_code =  me.absCmp.query('textfield[itemId=column_10_13]')[0].getValue();
        url = 'SalesPanel/new?mode=new';
        me.absCmp.close();
        if(!Ext.isEmpty(customer_code)){
            url +="&customer_code="+customer_code;
        }
        Ext.Router.redirect(url);
    },
    loadEntryPanel: function(params){
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.serviceEntryPanel,
            entryMasterId = params.id,
            entryMasterCode = params.entry_code,
          //  bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            bodyTab = Ext.ComponentQuery,
            entryPanelItemId = 'ServiceEntryWindow', 
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
        me.entryPanel = Ext.create('YBase.view.ServiceEntryWindow', {
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
            activeTab = tab.getActiveTab(),
            route = activeTab.route;
        if(!Ext.isEmpty(route)){
            route = activeTab.route.split('#')[1];
            Ext.Router.redirect(route);
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
    init: function(application) {
        var me=this;
        me.control({
          /*  "entryPanel button[itemId=btnFilePopup]":{
                click:me.onBtnFilePopupClick
            },*/
            "serviceEntryWindow button[itemId=btnAddComment]":{
                click:me.onBtnAddCommentClick
            },
            "serviceEntryWindow button[itemId=btnNewOrderEntry]" : {
                click : me.btnNewOrderEntry
            },
            "serviceEntryWindow tool[itemId=resizeTool]":{
                'click' : me.onMaxmizeToolClick
            }
        });
        this.callParent(arguments);
    }
});