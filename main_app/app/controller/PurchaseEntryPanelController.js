Ext.define('YBase.controller.PurchaseEntryPanelController', {
    extend: 'YBase.controller.EntryPanelBaseController', 
    pnlName : 'PurchaseEntryPanel',
    pnlNo : 10,
    currentViewAlias: 'purchaseEntryPanel',
    is_bill_order : 1,
    absCmp:null,
    msgCmp: null,
    getPnlTitle : function(params) {
        var me = this,
            lang = Ext.LANG.purchaseEntryPanel,
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
    onEntryPanelBeforerender: function(absCmp) {
        var me = this;
        me.callParent(arguments);
        me.hidePnlActionButtons(absCmp);
        // if(Ext.isEmpty(me.fileMenuItems)){
        //     me.fileMenuItems = me.renderMenuItem();
        // }
    },
    hidePnlActionButtons: function(absCmp) 
    {
        // absCmp.query('button[itemId=btnPrint]')[0].setVisible(false);
        absCmp.query('button[itemId=btnAddComment]')[0].setVisible(false);
        absCmp.query('menuitem[itemId=orderContractPrintMenu]')[0].setVisible(false);
        absCmp.query('menuitem[itemId=menuItemServiceInvoice]')[0].setVisible(false);
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
            url: 'bizlayer/purchaseEntryPanel/getEntryData',
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
                        var cmpEvent = new Ext.ux.PurchaseComponentEvent();
                        YBase.utility.PurchaseEntryPanelHelper.renderScreenComponents(me);
                        absCmp.cmpEvent = cmpEvent;
                        cmpEvent.init(me,me.absCmp);
                        me.addClearButton(me.absCmp);
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
        var fld_B2 = absCmp.query('textfield[itemId=column_4_13]')[0]; //company
        if(!Ext.isEmpty(fld_B2))
            YBase.utility.UxHelper.addClearButton(fld_B2);
    },
    
    setEntryData: function(absCmp){
        var me=this,
            data = absCmp.resp.data,
            entryDetailRecords = absCmp.resp.entryDetailRecords,
            frm= absCmp.query('form[itemId=entryFormPanel]')[0].getForm(),
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            gridStore = entryDetailGrid.getStore();
        absCmp.entry_id = data.id;
        absCmp.entry_code =  data.entry_code;
         
        if(absCmp.params.mode=="new"){
            frm.reset();
            gridStore.removeAll();
            if(absCmp.params.is_clone == 1){
                // gridStore.loadRawData(entryDetailRecords);
            }
            else{
                me.addBlankRecord(gridStore,5);
                // me.addBlankRecord(tabGroupGridStore);
            }
        }
        else{
        }
        
        frm.setValues(data.dynamic_fields); 
        
        if(absCmp.params.mode=="edit"){
            me.reloadEntryPanelGridAfterSave(gridStore,absCmp,null);
        }
        me.reRoutePopupWin(absCmp.entry_code);
        YBase.utility.ButtonHelper.setWindowBtnVisibility(absCmp);
        me.setFldOldValues(data.dynamic_fields);
        absCmp.query('hiddenfield[itemId=id]')[0].setValue(data.id);
        absCmp.query('textfield[itemId=column_4_02]')[0].focus();
        absCmp.initialFormValues = JSON.parse(JSON.stringify(frm.getValues()));
        if (Ext.msk) 
            Ext.msk.hide();
    },
    setFldOldValues: function(data){
        var absCmp = this.absCmp;
        absCmp.oldFldValues['column_4_17'] = data['dynamic_fields[column_4_17]']; //B1:Company CD
        absCmp.oldFldValues['column_4_18'] = data['dynamic_fields[column_4_18]']; //B2:Company Name
        absCmp.oldFldValues['column_4_19'] = data['dynamic_fields[column_4_19]']; //B3:ZipCode
        absCmp.oldFldValues['column_4_32'] = data['dynamic_fields[column_4_32]']; //C3:ZipCode
        absCmp.oldFldValues['column_4_50'] = data['dynamic_fields[column_4_50]']; //D3:ZipCode
    },
    gridEmptyCheck: function(gridStore,modifiedRecords,compulsarCol) {
        if(Ext.isEmpty(compulsarCol))
            compulsarCol = 'column_6_08';
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
            entryDetailGridId = YBase.utility.EntryPanelHelper.entryDetailGridId,
            entryDetailGrid = absCmp.query('grid[itemId='+entryDetailGridId+']')[0],
            gridStore = entryDetailGrid.getStore(),
            params = {};
       var hasError = YBase.utility.GridHelper.validateGrid(entryDetailGrid,gridStore,entryDetailGrid.view),
            entryDetailRecords = me.getGridRecords(gridStore,'column_6_07','id','column_6_16'),
            isEmpty = me.gridEmptyCheck(gridStore,entryDetailRecords,'column_6_07'),
            user_tz = jstz.determine().name();//gets the browser or system timezone
          //  supplierCmb = absCmp.query('combobox[itemId=column_4_13]')[0];//supplier Combobox

       /* if(!Ext.isEmpty(supplierCmb)){
            var cmbValue = supplierCmb.value;
        }  
        gridStore.each( function(record){
            if(!Ext.isEmpty(cmbValue)){
                record.set('column_6_17', cmbValue);
            }   
        });
*/
        if(!hasError && !isEmpty){
            entryDetailRecords = JSON.stringify(entryDetailRecords);
            params['time_zone'] = user_tz;
            params['entryDetailRecords'] = entryDetailRecords;
            params['mode'] = absCmp.params.mode;
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
                    url : 'bizlayer/purchaseEntryPanel/save',
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
                            route = 'PurchaseEntryPanel',
                            customPanelId = route;
                        // Set Last Updated By and Datetime
                        form.setValues(res.dynamic_fields);
                        absCmp.initialFormValues= JSON.parse(JSON.stringify(form.getValues()));
                        if(Ext.msk){
                            Ext.msk.hide();
                        }
                        if(absCmp.params.popup == true){
                            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,msg);
                            me.reloadEntryPanelGridAfterSave(gridStore,absCmp,res.id);
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
                        me.reloadEntryPanelGridAfterSave(gridStore,absCmp,res.id);
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
            }); */  
            me.showToolBarMsg(Ext.LANG.globalLang.errorMsg.emptyOrderDetailEntry,false);
        }
    },
    changePanelToEditMode: function  (absCmp,res,customPanelId) {
        var me = this,
            title = Ext.LANG.purchaseEntryPanel.pnlTitle+'['+res.entry_code+']';
        absCmp.setTitle(title);
        me.callParent(arguments);
    },
    // setSerialNumberToGridRecords: function(records,colName){
    //     var me = this,
    //         absCmp = me.absCmp;
        
    //     for (var i=0,j=0;i<records.length; i++){
    //         if(Ext.isEmpty(records[i].delete_flg)){
    //             records[i][colName] = ++j;
    //         }
    //     }
    // },
    reloadEntryPanelGridAfterSave : function(gridStore,absCmp,id) {
        var me = this;
        gridStore.removeAll();
        gridStore.load();
        // me.loadTabGridStore(absCmp);
        // me.loadAppFilesStore(absCmp);
    },
    // loadAppFilesStore: function(absCmp) {
    //     if(absCmp.params.mode == "new")
    //         return;
    //     var dataviewId = YBase.utility.EntryPanelHelper.entryDataViewId,
    //         dataview = absCmp.query('dataview[itemId='+dataviewId+']')[0],
    //         store = dataview.getStore();
    //     store.reload();
    // },
    resetEntryFormForNewMode : function(absCmp,actionType){
        var me=this, 
            params=absCmp.params,
            user_tz = jstz.determine().name();//gets the browser or system timezone
        params['resetEntryForm']=1;
        params['time_zone'] = user_tz;
        Ext.Ajax.request({
            url: 'bizlayer/purchaseEntryPanel/getEntryData',
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
            return YBase.utility.GridHelper.isGridStoreDirty(store,'column_6_08');
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
        if(this.absCmp.params.customer_code == 'null') {
            this.absCmp.params.customer_code=null;
        }
        var me = this,
            messagePanelLang = Ext.LANG.messagePanel,
            activeTabObj = {
                't':1,
                'r': me.absCmp.params.mode == 'new'? me.absCmp.entry_code : me.absCmp.params.entry_code ,
                'app': messagePanelLang.orderAppName,
                'id': me.absCmp.params.mode == 'new'? me.absCmp.entry_id : me.absCmp.params.id,
            },
            inactiveTabArr = [
                {
                    't'   : 3,
                    'r'   : me.absCmp.params.mode == 'new'? null : me.absCmp.params.customer_code,
                    'app' : messagePanelLang.horensoAppName
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
            if(!Ext.isEmpty(gridRecords[i].data.column_6_10))
                rec['column_6_10'] = gridRecords[i].data['column_6_10'];
            if(!Ext.isEmpty(gridRecords[i].data.product_id))
                rec['product_id'] = gridRecords[i].data['product_id'];
            entryDetailRecords.push(rec);
        }
        return entryDetailRecords;
    },
    init: function(application) {
        var me=this;
        me.control({
          /*  "entryPanel button[itemId=btnFilePopup]":{
                click:me.onBtnFilePopupClick
            },*/
            "purchaseEntryPanel button[itemId=btnAddComment]":{
                click:me.onBtnAddCommentClick
            }
        });
        this.callParent(arguments);
    }
});