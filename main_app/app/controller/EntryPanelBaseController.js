Ext.define('YBase.controller.EntryPanelBaseController', {
    extend: 'Ext.app.Controller', 
    requires:[
        'Ext.ux.upload.Button',
        'Ext.ux.upload.Basic'
        // 'YBase.utility.ButtonHelper'
    ],
    currentViewAlias : null,
    pnlName : null,
    addHelpCmp: function(absCmp,helpTextInfo) {
        var me=this,
            container =  absCmp.query('container[itemId=topMainCnt]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help+lang.help_label.auto_save;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    getPnlTitle : function(params) {
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.entryPanel,
            title = entryPanelLang.pnlTitle;
        return title;
    },
    loadEntryPanel: function(params){
        if(Ext.msk)
            Ext.msk.hide();
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.entryPanel,
            entryMasterId = params.id,
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPanelItemId = me.pnlName, 
            entryPanelId = me.pnlName,//pnlName is retrived from respective derived controller
            title,entryPanel;
        title = me.getPnlTitle(params);
        if(params.mode=="new"){
            // entryPanelId = entryPanelItemId;
        }
        else if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelId = entryPanelId + '-' + entryMasterCode;
            title = title+'['+entryMasterCode+']';
        }
        entryPanel = bodyTab.query('panel[customPanelId=' + entryPanelId + '][is_bill_order='+params.is_bill_order+']');
        
        YBase.utility.TabLoader.initGlobalVariable();
        if (typeof(entryPanel) !== "undefined" && entryPanel.length > 0) {
            me.activateEntryPanelTab(entryPanel,params,bodyTab);   
        } 
        else {
            me.createEntryPanel(entryPanelItemId,entryPanelId,params,title,bodyTab);  
        }
        Ext.bodyTab = bodyTab;
        return;
    },
    activateEntryPanelTab : function(entryPanel,params,bodyTab) {
        var me = this;
        if(params.is_clone == 1 && entryPanel[0].params.clone_master_id != params.clone_master_id){
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);  
        }
        else if(params.createBill == true){
            entryPanel[0].params = params;
            me.resetEntryPanel(entryPanel[0]);  
        }
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
    createEntryPanel : function(entryPanelItemId,entryPanelId,params,title,bodyTab){  
        var iconClass='yig-supply-entry-s-w',
            viewName = 'YBase.view.' + this.pnlName;
           // is_new = params.mode == 'edit' ? false : true ;
        var entryPanel = Ext.create(viewName, {
                customItemId : entryPanelItemId,
                customPanelId : entryPanelId,
                params: params,
                is_bill_order : params.is_bill_order,
                // convertToSales : params.convertToSales,
                title: title,
                is_new:params.is_new,
                closable: true,
                PanelNo: this.pnlNo,
                showBulkUpdate:false,
                iconCls:iconClass
            });
        bodyTab.add(entryPanel);
        bodyTab.setActiveTab(entryPanel);
    },
    resetEntryPanel: function(pnl,actionType){
        var me = this;
        Ext.bodyTab.setActiveTab(pnl);
        me.absCmp = pnl;
        me.resetEntryFormForNewMode(pnl,actionType);    
    },
    onEntryPanelBeforerender: function(absCmp) {
        var me = this,
            params = absCmp.params,
            is_new = !Ext.isEmpty(params.id) && params.mode == "edit" ? false : true;
        absCmp.oldFldValues = {};
        // absCmp.is_new = is_new;
        me.absCmp = absCmp;
        me.languageImplementation(absCmp);
        me.viewEntryDetails(absCmp.params,is_new);
        absCmp.on('beforeclose',me.onEntryPanelBeforeClose,me);
        absCmp.query('button[itemId=btnNew]')[0].setVisible(false);
        absCmp.route = location.href;
    },
    languageImplementation: function(absCmp) {
        var lang = Ext.LANG,
            btnLang = lang.globalLang.buttons,
            entryPnlLang = lang.entryPanel;
        // entry action buttons
        absCmp.query('button[itemId=btnConvertToSales]')[0].setText(lang.entryPanel.btnConvertToSales);
        absCmp.query('button[itemId=btnNewServiceEntry]')[0].setText(lang.entryPanel.btnNewServiceEntry);
        absCmp.query('button[itemId=btnNew]')[0].setText(btnLang.btnNewRegister);
        absCmp.query('button[itemId=btnSave]')[0].setText(btnLang.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(btnLang.btnCancel);
        absCmp.query('button[itemId=btnDelete]')[0].setText(btnLang.btnDelete);
        absCmp.query('button[itemId=btnPrint]')[0].setText(btnLang.btnPrint);
        if (!Ext.isEmpty(absCmp.query('button[itemId=btnClone]')))
        	absCmp.query('button[itemId=btnClone]')[0].setText(btnLang.btnClone);
        if (!Ext.isEmpty(absCmp.query('button[itemId=btnAdditionalClone]')))
            absCmp.query('button[itemId=btnAdditionalClone]')[0].setText(btnLang.btnAdditionalClone);
        if (!Ext.isEmpty(absCmp.query('button[itemId=btnConvertToOrder]')))
            absCmp.query('button[itemId=btnConvertToOrder]')[0].setText(btnLang.btnCreateOrder);
        if (!Ext.isEmpty(absCmp.query('button[itemId=btnNewEntry]')))
            absCmp.query('button[itemId=btnNewEntry]')[0].setText(btnLang.btnNewRegister);
        if (!Ext.isEmpty(absCmp.query('button[itemId=btnEditPopupEntry]')))
            absCmp.query('button[itemId=btnEditPopupEntry]')[0].setText(btnLang.btnNewRegister);
        if (!Ext.isEmpty(absCmp.query('checkbox[itemId=autoSaveChkbox]')))
            absCmp.query('checkbox[itemId=autoSaveChkbox]')[0].boxLabel = lang.help_label.auto_save;
        if (!Ext.isEmpty(absCmp.query('menuitem[itemId=orderContractPrintMenu]')))
            absCmp.query('menuitem[itemId=orderContractPrintMenu]')[0].setText(entryPnlLang.orderContractPrintMenu);
        if (!Ext.isEmpty(absCmp.query('menuitem[itemId=menuItemServiceInvoice]')))
            absCmp.query('menuitem[itemId=menuItemServiceInvoice]')[0].setText(entryPnlLang.menuItemServiceInvoice);

    },
    showEntryPanel:function(me, resp, params){
        var absCmp = me.absCmp;
        absCmp.resp = resp;
        absCmp.params = params;
        absCmp.action_roles = resp.data['action_roles'];
        var btnEntryDetail =  absCmp.query('button[itemId=btn_entry_detail]')[0];
       if(!Ext.isEmpty(btnEntryDetail)){
            btnEntryDetail.setDisabled(true);
       }
        // me.ButtonHelper.setWindowBtnVisibility(absCmp);
        
        me.setEntryData(absCmp);
        var formPanel = absCmp.query('form[itemId=entryFormPanel]')[0];
        YBase.utility.EntryPanelHelper.assignNxtCmpIdToScreenFields(absCmp,formPanel);
        me.msgCmp = absCmp.query('component[itemId=msgCmp]')[0];
    },
    onEntryPanelAfterrender: function(absCmp) {
        var me = this;
        absCmp.getEl().on('keydown',function(e,target) {
            if(e.getKey()==e.F2){ //F2
                var entryDetailGrid = this.absCmp.query('grid[itemId=entryDetailGrid]')[0],
                    store = entryDetailGrid.getStore(),
                    firstRec = store.first();
                entryDetailGrid.editingPlugin.startEdit(firstRec,1);
            }
        },me);
    },
    onEntryPanelBeforeActivate: function(absCmp) {
        var me=this;
        var activeTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0].activeTab;
        activeTab.cntrl = me;
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
            Ext.Router.redirect(route+'/new?mode=new');
        }
    },
    onBtnCancelClick: function(button){
        var me = this;
        me.checkRecordDirty();        
    },
    onBtnSaveClick: function(button,e,eOpts){
        var me = this;
        me.saveRecord(button);    
    },
    onBtnDeleteClick: function(btn) {
                
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
    entryPanelDirtyCheck : function(absCmp){
        if(Ext.isEmpty(absCmp.query('grid[itemId=entryDetailGrid]')[0]))
            return false;
        
        var me = this,
            entryDetailGrid = absCmp.query('grid[itemId=entryDetailGrid]')[0],
            entryDetailGridStore = entryDetailGrid.getStore(),
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
    isFormFieldsDirty: function(absCmp){
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
    },
    onNewEntryAfterSaveClick: function(absCmp,gridStore,id) {
        var me = this,
            route = me.pnlName,
            purchaseEntry = absCmp.params.purchaseEntry == true ? '&purchaseEntry=true' : '';
        if(absCmp.params.mode=="new"){
            absCmp.params = {mode: 'new'};
            me.resetEntryPanel(absCmp);
            Ext.defer(function(){
                Ext.Router.redirect(route+'/new?mode=new'+purchaseEntry);
            },300);
        }
        else if(absCmp.params.mode=="edit"/* && absCmp.params.order_code==res.order_code*/){
            me.reloadEntryPanelGridAfterSave(gridStore,absCmp,id);
            Ext.defer(function(){
                Ext.Router.redirect(route+'/new?mode=new'+purchaseEntry);
            },300);
        }
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
      
    onEntryPanelActivate: function(absCmp) {
        var me = this;
        me.absCmp = absCmp;
        // me.reRoutePopupWin(absCmp.entry_code);
        // me.reRouteCommentPopupWin(absCmp);
    },
    addBlankRecord: function(store,count,rowIdx){
        if(!Ext.isEmpty(rowIdx)){
            store.insert(rowIdx,store.model);
            return;
        }
        if(Ext.isEmpty(count))
            count = 1;
        for(var i=0;i<count;i++){
            store.add(store.model);
            // store.insert(rowIdx,store.model);
        }
    },
    updateCommentCmp: function(absCmp,commentObj,count) {
        var me                  = this,
            lang                = Ext.LANG,
            entryPnlLang        = lang.entryPanel,
            latestComment       = entryPnlLang.latestComment,
            cmp                 = absCmp.query('component[itemId=latestCommentCmp]')[0],
            btnAddComment       = absCmp.query('button[itemId=btnAddComment]')[0],
            comment             = null,opt = null, optJp = null, optEn = null, optClass = '',
            btnAddCommentLang   = entryPnlLang.btnAddComment;
        if(!Ext.isEmpty(commentObj)) {
            comment             = commentObj.comment;
            // opt                 = commentObj.opt;
            // optClass            = 'msg-'+opt;
            optJp               = commentObj.opt,
            optEn               = Ext.LANG.messagePanel[optJp],
            optClass            = 'msg-'+optEn;
        }
        if(!Ext.isEmpty(count)) {
            btnAddCommentLang = btnAddCommentLang+'['+count+']';
        }
            // activeTab           = Ext.bodyTab.getActiveTab();
        btnAddComment.setText(btnAddCommentLang);
        if(!Ext.isEmpty(comment)) {
            commentHtml = '<div class="comment-cmp"><span class="'+optClass+'">'+optJp+'</span><span>'+latestComment+comment+'</span></div>';
            // commentHtml = '<div class="comment-cmp"><span>'+latestComment+comment+'</span></div>';
        }else {
            commentHtml = null;
        }
        cmp.update(commentHtml);
    },  
    /*updateCommentCmp: function(absCmp,comment,count) {
        var me                  = this,
            lang                = Ext.LANG,
            entryPnlLang        = lang.entryPanel,
            latestComment       = entryPnlLang.latestComment,
            cmp                 = absCmp.query('component[itemId=latestCommentCmp]')[0],
            btnAddComment       = absCmp.query('button[itemId=btnAddComment]')[0],
            btnAddCommentLang   = entryPnlLang.btnAddComment;
            if(!Ext.isEmpty(count)) {
                btnAddCommentLang = btnAddCommentLang+'['+count+']';
            }
            // activeTab           = Ext.bodyTab.getActiveTab();
        btnAddComment.setText(btnAddCommentLang);
        if(!Ext.isEmpty(comment)) {
            commentHtml = '<div class="comment-cmp"><span>'+latestComment+comment+'</span></div>';
        }else {
            commentHtml = null;
        }
        cmp.update(commentHtml);
    }, */ 
    checkEmpty : function(record,compulsaryCol) {
        if(Ext.isEmpty(record.data[compulsaryCol])){
            for(var key in record.data){
                if(!Ext.isEmpty(record.data[key]))
                    return true;
            }
        }
        return false;
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
           
            if(!Ext.isEmpty(gridRecords[i].data.column_2_06))
                rec['column_2_06'] = gridRecords[i].data['column_2_06'];
            
            entryDetailRecords.push(rec);
        }
        return entryDetailRecords;
    },
    getGridRecords : function(gridStore,compulsaryCol,idIdx,displayOrdercol) {
        var me = this,
            gridRecords = gridStore.getModifiedRecords(), // : gridStore.getRange(),
            deletedRecords = gridStore.getRemovedRecords(),
            newDeletedRecords = [],
            entryDetailRecords = [];
            
        if(Ext.isEmpty(idIdx))
            idIdx = 'id';

        for(var i =0; i<deletedRecords.length;i++){
            if(deletedRecords[i].data.delete_flg == 1 && !Ext.isEmpty(deletedRecords[i].data[idIdx])){
                newDeletedRecords.push(deletedRecords[i]);
            }
        }

        gridRecords = gridRecords.concat(newDeletedRecords);
        gridRecords = me.removeEmptyGridRecords(gridRecords,compulsaryCol);
        
        entryDetailRecords = me.getModifiedRecordsForSave(gridStore,gridRecords,displayOrdercol);
        return entryDetailRecords;
        
    },
    removeEmptyGridRecords : function(records,compulsaryCol){
        if(Ext.isEmpty(compulsaryCol)){
            compulsaryCol = 'column_3_03';
        }
        var newRecords = [];
        for(var i =0; i<records.length;i++){
            var isEmpty = false;
            if(Ext.isEmpty(records[i].data) && Ext.isEmpty(records[i][compulsaryCol])){
                if(!Ext.isEmpty(records[i]['id']))
                    records[i]['delete_flg'] = 1;
                else
                    isEmpty = true;
            }
            else if(!Ext.isEmpty(records[i].data) && Ext.isEmpty(records[i].data[compulsaryCol]))
                isEmpty = true;
            if(!isEmpty)
                newRecords.push(records[i]);
        }
        return newRecords;
    },
    loadTabGridStore: function(absCmp) {
        var me = this,
            // gridStore = absCmp.tabGroupGridStore;
            tabItemId = YBase.utility.EntryPanelHelper.tabItemId,
            tabPnl = !Ext.isEmpty(tabItemId) ? absCmp.query('tabpanel[itemId='+tabItemId+']')[0] : null,
            grids = !Ext.isEmpty(tabPnl) ? tabPnl.query('grid') : [];
        for(var i=0;i<grids.length;i++){
            grids[i].getStore().load();
        }
    },
    changePanelToEditMode: function  (absCmp,res,customPanelId) {
        absCmp.params.mode = "edit";
        absCmp.mode = "edit";
        absCmp.is_new = false;
        absCmp.customPanelId = customPanelId + '-' + res.entry_code;
        // absCmp.itemId = customPanelId + '-' + res.order_code;
        /*var title = Ext.LANG.entryPanel.pnlTitle+'['+res.entry_code+']';
        absCmp.setTitle(title);*/
        absCmp.query('hiddenfield[itemId=id]')[0].setValue(res.id);
        absCmp.entry_code = res.entry_code;
        absCmp.entry_id = res.id;
        //A2
//         absCmp.query('textfield[itemId=column_1_01]')[0].setValue(res.entry_code);
        //A8
        // absCmp.query('textfield[itemId=column_1_11]')[0].setValue(res.column_1_11);
        //A9
        // absCmp.query('textfield[itemId=column_1_10]')[0].setValue(res.column_1_10);
    },
    setDisplayOrder: function(store,compulsaryCol,displayOrdercol) {
        var records = store.getRange();
        for(var i=0;i<records.length;i++){
            if(!Ext.isEmpty(records[i].data[compulsaryCol])){
                var idx = store.indexOf(records[i]) + 1;
                if(records[i].data[displayOrdercol] != idx){
                    records[i].set(displayOrdercol,idx);
                }
            }
        }
    },
    onEntryPanelClose: function(absCmp) {
        var me = this,
            activeEntryPnl = Ext.bodyTab.getActiveTab();
        if(activeEntryPnl.customItemId == absCmp.customItemId && activeEntryPnl.customPanelId != absCmp.customPanelId){
            Ext.defer(function() {
                me.absCmp = activeEntryPnl;    
            },100);
        }
        
    },
   /* loadOrderMasterEntryPanel: function(params){
        var me = this,
            lang = Ext.LANG,
            entryPanelLang = lang.entryPanel,
            entryMasterId = params.id,
            entryMasterCode = params.entry_code,
            bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=bodyTab]')[0],
            entryPanelItemId = bodyTab.activeTab.customItemId,
            //entryPanelItemId = me.pnlName, 
            entryPanelId = me.pnlName,//pnlName is retrived from respective derived controller
            title,entryPanel;
        if(params.is_bill_order == 0){
            entryPanelItemId = 'SalesPanel';
            title = entryPanelLang.salesEntryPanel;
        }
        else{
            entryPanelItemId = 'EntryPanel';
            title = entryPanelLang.orderEntryPanel;  
        }
        if(params.mode=="new"){
            // orderMasterEntryPanelId = 'OrderMasterEntry';
            // title = ordermasterPanelLang.pnlTitle;
        }
        else if(params.mode=="edit" && !Ext.isEmpty(entryMasterCode)){
            entryPanelItemId = entryPanelItemId + '-' + entryMasterCode;
            title = title+'['+entryMasterCode+']';
        }
        // orderMasterEntryPanel = bodyTab.query('panel[itemId=' + orderMasterEntryPanelId + ']');
        orderMasterEntryPanel = bodyTab.query('panel[customItemId=' + entryPanelItemId + '][is_bill_order='+params.is_bill_order+']');
        if(params.mode=="new"){
            //for order entry and sales entry panels
            if(!Ext.isEmpty(params.convertToSales) ){
                if(!Ext.isEmpty(orderMasterEntryPanel[0])){
                    if(orderMasterEntryPanel[0].params.id != params.id){
                        orderMasterEntryPanel = bodyTab.query('panel[customItemId=' + entryPanelItemId + '][is_bill_order='+params.is_bill_order+'][convertToSales='+params.convertToSales+']');
                    }
                }
            }
        }
        YBase.utility.TabLoader.initGlobalVariable();
        if (typeof(orderMasterEntryPanel) !== "undefined" && orderMasterEntryPanel.length > 0) {
            if(params.is_clone == 1 && orderMasterEntryPanel[0].params.clone_type !=params.clone_type){
                orderMasterEntryPanel[0].params = params;
                me.resetOrderEntryPanel(orderMasterEntryPanel[0]);
                // orderMasterEntryPanel[0].close();
                // me.createEntryPanel(orderMasterEntryPanelId,params,title,bodyTab);    
            }
            else{
                orderMasterEntryPanel[0].params = params;
                bodyTab.setActiveTab(orderMasterEntryPanel[0]);
                me.abstractcomponent = orderMasterEntryPanel[0];
                
                if(params.mode=="new" && params.is_clone==1 && orderMasterEntryPanel[0].params.clone_type !=params.clone_type){
                    if(orderMasterEntryPanel[0].isActive !== true){
                        orderMasterEntryPanel[0].isActive = true;
                        me.viewOrderMasterEntryDetails(params,true);    
                    }
                    else
                        orderMasterEntryPanel[0].isActive = false;    
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
        Ext.bodyTab = bodyTab;
        return;
    },*/
    
    onBtnNewServiceEntry: function(btn) {
        var me = this,
            url = '', 
            order_master_id = Ext.bodyTab.activeTab.params.id;
        url = 'ServiceEntryWindow/new?mode=new';
        if(!Ext.isEmpty(order_master_id)){
            url +="&order_master_id="+order_master_id;
        }
        Ext.Router.redirect(url);
    },
    init: function(application) {
        var me=this,
            is_bill_order = me.is_bill_order,
            selector = me.currentViewAlias,
            selectorObj = {};
        selectorObj[selector] = {
            'beforerender' : me.onEntryPanelBeforerender,
            'afterrender'  : me.onEntryPanelAfterrender,
            'beforeactivate' : me.onEntryPanelBeforeActivate,
            'activate'     : me.onEntryPanelActivate,
            'close'        : me.onEntryPanelClose 
        };

        selectorObj[selector+" button[itemId=btnNew]"] = {
            'click' : me.onBtnNewClick
        };

        selectorObj[selector+" button[itemId=btnCancel]"] = {
            'click' : me.onBtnCancelClick
        };

        selectorObj[selector+" button[itemId=btnSave]"] = {
            'click' : me.onBtnSaveClick
        };

        selectorObj[selector+" button[itemId=btnDelete]"] = {
            'click' : me.onBtnDeleteClick
        };

        selectorObj[selector+" button[itemId=btnConvertToOrder]"] = {
            click : me.onBtnConvertToOrderClick
        };
        me.control(selectorObj);
            // "entryPanel" :{
            //     'beforerender' : me.onEntryPanelBeforerender,
            //     'afterrender'  : me.onEntryPanelAfterrender,
            //     'activate'     : me.onEntryPanelActivate 
            // },
            
            // "entryPanel button[itemId=btnSave]":{
            //     click:me.onBtnSaveClick
            // },
            // "entryPanel button[itemId=btnCancel]":{
            //     click:me.onBtnCancelClick
            // },
            // "entryPanel button[itemId=btnDelete]":{
            //     click:me.onBtnDeleteClick
            // },
            // "entryPanel button[itemId=btnFilePopup]":{
            //     click:me.onBtnFilePopupClick
            // },
            // "entryPanel button[itemId=btnAddComment]":{
            //     click:me.onBtnAddCommentClick
            // },
            // "entryPanel menuitem[itemId=menuItemPrintJson],entryPanel menuitem[itemId=menuItemPrintCsv]":{
            //     click:me.onMenuItemPrintClick
            // }

        // });
    }

    
});