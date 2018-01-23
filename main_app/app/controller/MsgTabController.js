Ext.define('YBase.controller.MsgTabController', {
    extend: 'Ext.app.Controller',
    id: 'MsgTabController',
    refs:[
        {
            ref: 'msgTabCnt',
            selector: 'msgTabCnt'
        }
    ],
    activeTabObj:{},
    inactiveTabArr:[],
    dblRec:false,
    unioinRec:false,
    customer_table_id:3,
    order_table_id:1,
    globalObj: {},
    orderDataObj: {},
    horensoDataObj: {},
    statusComboFldOptId:17,
    decodeWinUrl: function(params) {
        var me = this;
        if('message_window' in params && params['message_window'] === true) {
            var decodedActiveUri    = decodeURI(params.at),
                decodedInActiveUri  = decodeURI(params.iat);
            me.activeTabObj      = JSON.parse(decodedActiveUri);
            me.inactiveTabArr    = JSON.parse(decodedInActiveUri);
            var objMerge = Ext.clone(me.inactiveTabArr);
            objMerge.push(me.activeTabObj);
            me.globalObj =  objMerge;
            for(var i=0;i<me.globalObj.length;i++) {
                if(me.globalObj[i].app == 'order') {
                    me.orderDataObj = me.globalObj[i];
                }
                if(me.globalObj[i].app == 'horenso') {
                    me.horensoDataObj = me.globalObj[i];
                }
            }
            me.setActiveTab(me.currentView,me.activeTabObj);
            me.setMsgTabGlobalRec();
            /*updates the htmlCmp*/
            Ext.ComponentQuery.query('displayfield[itemId=entryCodeDisplayFld]')[0].setVisible(false);
            YBase.app.getController('MsgTabWinController').updateCodeCmp(me.orderDataObj.r, me.horensoDataObj.r);
        }
    },
    setMsgTabGlobalRec: function() {
        var me = this,
            msgTabCnt = me.currentView,
            globalRecObj= {};
        globalRecObj['order_no']        = me.orderDataObj.r;
        globalRecObj['order_master_id'] = me.orderDataObj.id;
        globalRecObj['customer_code']    = me.horensoDataObj.r;
        msgTabCnt['selectedRawData']    = globalRecObj;

        me.setGlobalRecords(msgTabCnt);
        return msgTabCnt;
    },
    setGlobalRecords: function(msgTabCnt) {
        var me                      = this,
            messagePanelLang        = Ext.LANG.messagePanel,
            hiddenTblIdField        = msgTabCnt.query('hiddenfield[itemId=table_id]')[0],
            hiddenRefIdField        = msgTabCnt.query('hiddenfield[itemId=ref_record_id]')[0],
            optMsgCombo             = msgTabCnt.query('combobox[itemId=optMsgCombo]')[0],
            dblRecCheckbox          = msgTabCnt.query('checkbox[itemId=dblRecCheckbox]')[0],
            msgUnionCheckbox        = msgTabCnt.query('checkbox[itemId=msgUnionCheckbox]')[0],
            statusComboCnt          = msgTabCnt.query('container[itemId=statusComboCnt]')[0],
            msgTextarea             = msgTabCnt.query('textareafield[itemId=msgTextarea]')[0],
            msgTabPanel             = msgTabCnt.query('tabpanel[itemId=msgTabPanel]')[0],
            activeTab               = msgTabPanel.getActiveTab(),
            selectedRawData         = msgTabCnt.selectedRawData,
            order_no                = Ext.isEmpty(selectedRawData.order_no) ? null: selectedRawData.order_no,
            customer_code            = Ext.isEmpty(selectedRawData.customer_code) ? null: selectedRawData.customer_code;
            order_master_id         = Ext.isEmpty(selectedRawData.order_master_id) ? null: selectedRawData.order_master_id;
        me.dblRec=false;
        if(msgUnionCheckbox.checked) {
            me.unioinRec = true;
        }else {
            me.unioinRec = false;
        }
        if(activeTab.itemId == 'commentTab') {
            dblRecCheckbox.setVisible(true);
            statusComboCnt.setVisible(true);
            hiddenTblIdField.setValue(me.order_table_id);
            hiddenRefIdField.setValue(order_no);
            if(dblRecCheckbox.checked) {
                me.dblRec=true;
            }else {
                me.dblRec=false;
            }

            me.activeTabObj = {
                't':me.order_table_id,
                'r':order_no,
                'app': messagePanelLang.orderAppName,
                'id': order_master_id
            };
            me.inactiveTabArr = [
                {
                    't'    : me.customer_table_id,
                    'r'   : customer_code,
                    'app'      : messagePanelLang.horensoAppName
                }
            ];
            if(Ext.isEmpty(order_no)) {
                msgTextarea.disable();
            }else {
                msgTextarea.enable();
            }
        } else if(activeTab.itemId == 'horensoTab') {
            dblRecCheckbox.setVisible(false);
            statusComboCnt.setVisible(false);
            hiddenTblIdField.setValue(me.customer_table_id);
            hiddenRefIdField.setValue(customer_code);

            me.activeTabObj = {
                't':me.customer_table_id,
                'r':customer_code,
                'app': messagePanelLang.horensoAppName
            };
            me.inactiveTabArr = [
                {
                    't':me.order_table_id,
                    'r':order_no,
                    'app': messagePanelLang.orderAppName,
                    'id': order_master_id
                }
            ];
            if(Ext.isEmpty(customer_code)) {
                msgTextarea.disable();
            }else {
                msgTextarea.enable();
            }
        } else {
            dblRecCheckbox.setVisible(false);
            statusComboCnt.setVisible(false);
            hiddenTblIdField.setValue(null);
            hiddenRefIdField.setValue(null);
            me.activeTabObj = {};
            me.inactiveTabArr = [];
        }
        if(me.unioinRec) {
            me.activeTabObj['ref_id'] = me.order_table_id;
            me.activeTabObj['ref_app'] = messagePanelLang.orderAppName;
        }
    },
    setActiveTab: function(mainPanel, activeTabObj) {
        var tabPanel = mainPanel.query('panel[itemId=msgTabPanel]')[0],
            commentTab = tabPanel.query('panel[itemId=commentTab]')[0],
            horensoTab = tabPanel.query('panel[itemId=horensoTab]')[0];
        tabPanel.un('tabchange',this.onMsgTabChange,this);
            activeTab = {};
        if(activeTabObj.app == 'order') {
            tabPanel.setActiveTab(commentTab);
        } else if(activeTabObj.app == 'horenso') {
            tabPanel.setActiveTab(horensoTab);
        } else {
            //do nth
        }
        tabPanel.on('tabchange',this.onMsgTabChange,this);
    },
    languageImplementation: function(absCmp){
        var me                  = this,
            lang                = Ext.LANG,
            messageLang         = lang.messagePanel,
            commentLang         = lang.CommentPanel,
            commentEmptyText    = commentLang.commentEmptyText,
            commentOnEnter      = commentLang.commentOnEnter,
            emptyText           = commentEmptyText+'\n'+commentOnEnter,
            dblRecCheckbox      = absCmp.query('checkbox[itemId=dblRecCheckbox]')[0],
            msgUnionCheckbox    = absCmp.query('checkbox[itemId=msgUnionCheckbox]')[0],
            msgTextarea         = absCmp.query('textareafield[itemId=msgTextarea]')[0],
            optMsgCombo         = absCmp.query('combobox[itemId=optMsgCombo]')[0];
        optMsgCombo.emptyText = messageLang.emptyValue;
        optMsgCombo.setValue(messageLang.opt1);
        YBase.utility.UxHelper.addClearButton(optMsgCombo);
        msgTextarea.emptyText = emptyText;
        dblRecCheckbox.setBoxLabel(messageLang.dblRecCheckboxLbl);
        msgUnionCheckbox.setBoxLabel(messageLang.msgUnionCheckboxLbl);
    },
    addCmp: function(absCmp) {
        var me = this,
            cmpObj = {
                xtype: 'component',
                itemId: 'collapseCmp',
                height: 30,
                width: 30,
                componentCls: 'collapse-cmp',
                html: '<span class="collapse-bottom"></span>'
            };
        absCmp.query('container[itemId=bottomMsgCnt]')[0].add(cmpObj);
        if(!Ext.isEmpty(absCmp.params)) {
            var codeCmpObj = {
                xtype: 'component',
                itemId: 'codeCmp',
                height: 30,
                width: 30,
                componentCls: 'code-cmp',
                html: ''
            };
            Ext.ComponentQuery.query('container[itemId=codeCnt]')[0].add(codeCmpObj);
        }
    },
    onMsgTabCntBeforeRender: function(absCmp, eOpts) {
        var me = this,
            msgTabPanel = absCmp.query('tabpanel[itemId=msgTabPanel]')[0];
        me.currentView = absCmp;
        YBase.app.getController('MsgTabWinController').currentView = absCmp;
        me.languageImplementation(absCmp);
        me.manageMsgTab(absCmp);
        if(!Ext.isEmpty(absCmp.params)) {
            me.decodeWinUrl(absCmp.params);
        }
        me.loadComment(absCmp);
        msgTabPanel.on('tabchange',me.onMsgTabChange,me);
    },
    manageMsgTab: function(absCmp) {
        var me = this;
        me.addCmp(absCmp);
        me.statusCombo(me,absCmp);
        var dataviewArray = me.createDataview(absCmp);
        me.addDataview(absCmp, dataviewArray);
        var orderDataview   = absCmp.query('dataview[itemId=orderDataview]')[0],
            horensoDataview = absCmp.query('dataview[itemId=horensoDataview]')[0],
            optMsgCombo     = absCmp.query('combobox[itemId=optMsgCombo]')[0],
            optCommentStore = Ext.getStore('OptCommentStore');
        optCommentStore.load({
            params: {
                'field_option_id':16
            }
        });
        optMsgCombo.bindStore(optCommentStore);
        orderDataview.on('ItemClick',me.onOrderDataviewItemClick,me);
        horensoDataview.on('ItemClick',me.onHorensoDataviewItemClick,me);
        if(!Ext.isEmpty(absCmp.params) && 'message_window' in absCmp.params && absCmp.params.message_window) {
            absCmp.query('component[itemId=commentCollapseCmp]')[0].setVisible(false);
        }
    },
    onMsgTabCntAfterRender:function(absCmp, options) {
        absCmp.query('panel[itemId=bottomMsgPanel]')[0].getHeader().hide();
        var me = this,
            afterCollapsedEl = absCmp.getEl();
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget('.collapse-left')) {
                absCmp.up('panel').collapse();
            }
            /*if (e.getTarget(".collapsed_cls")) {
               absCmp.up('panel').collapse();
            }*/
        });
        // me.setActiveTab(absCmp, me.activeTabObj);
    },
    onBottomMsgPanelAfterRender: function(absCmp, eOpts) {
        absCmp.getHeader().hide();
        var me = this,
            afterCollapsedEl = absCmp.getEl();
        afterCollapsedEl.on("click", function(e, el) {
            if (e.getTarget(".collapse-bottom")) {
               absCmp.collapse();
            } 
            if (e.getTarget(".collapsed_cls")) {
               absCmp.expand();
            } 
        });
    },
    statusCombo: function(me,abstractcomponent) {
        if (!Ext.isEmpty(me.ajaxObj)) {
            if (Ext.Ajax.isLoading(me.ajaxObj)) {
                Ext.Ajax.abort(me.ajaxObj);
            }
        }
        me.ajaxObj= Ext.Ajax.request({
            url: 'bizlayer/msgTab/getStatusComboConfig',
            method: 'GET',
            params: {
                'field_option_id':me.statusComboFldOptId
            },
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                if(resp.success) {
                    me.createStatusCombo(abstractcomponent,resp.statusComboConfig);
                }
            }
        });
    },
    createStatusCombo: function(absCmp,cmp){
        var dg_cmp = cmp.datagrid_component,
            itemId = 'statusCombo',
            comboGridParamsObj = {
                combo_itemId        : itemId,
                combo_label         : null/*Ext.LANG.messagePanel.statusCombo*/,
                hide_label          : cmp.hide_label,
                pageSize            : dg_cmp.page_size,
                store_fields        : dg_cmp.fields,
                template_fields     : dg_cmp.columns,
                storeId             : itemId+'_store',
                storeUrl            : cmp.store_url,
                extra_params        : null,
                display_field       : cmp.displayField,
                value_field         : cmp.valueField,
                listeners           : null,
                is_form_combo_grid  : cmp.is_form_combo_grid,
                queryMode           : cmp.queryMode,
                fromMsgTab          : true,
                emptyText           : Ext.LANG.messagePanel.statusCombo
            },
        comboConfig = YBase.utility.ComboGridHelper.setComboGridConfig(comboGridParamsObj),
        cmp = Ext.Object.merge(cmp, comboConfig),
        combo = Ext.create('Ext.form.ComboBox', cmp),
        companyComboCnt = absCmp.query('container[itemId=statusComboCnt]')[0];
        companyComboCnt.removeAll();
        companyComboCnt.add(combo);
        Ext.create('Ext.tip.ToolTip', {
            target: combo.getEl(),
            html: Ext.LANG.messagePanel.statusCombo
        });
        YBase.utility.UxHelper.addClearButton(combo);

        combo.getStore().on('beforeload',function(store,operation){
            var params = store.getProxy().extraParams || {};
            params['datagrid_id'] = 25;
            store.getProxy().extraParams = params;
        });
    },
    createDataview: function(commentPanel) {
        var me = this,  
            commentviewStore = me.createDataviewStore();
       var tpl = new Ext.XTemplate(
            '<tpl>',
            '    {[this.setDataLoadFlg()]}',
            '</tpl>',
            '<tpl for=".">',
            '   {[this.changeDataLoadFlg()]}',
            '       <tpl if="this.isLastItem(xindex, xcount)">',
            '           <div class="comment-div last-div {[this.generateClass(values)]}" style="padding:5px">',
            '       <tpl else>',
            '           <div class="comment-div {[this.generateClass(values)]}" style="padding:5px">',
            '       </tpl>',
            '           <div class="user"><b>{firstlastname}</b>&nbsp<b class="user-name">{username}</b><p class="comment-allign-right">{[this.commentEditHtmlTag(values)]}{[this.formatCommentDateTime(values)]}</p></div>',
            '               <div class="comment" style="clear:both">',
            '                   <span>{comment}</span>',
            '               </div>',
            '           <div class="blank-div"></div>',
            '           <div class="comment-action">',
            '               <ul><li class="li-edit"><a><span class="icon_edit"></span><span>{[Ext.LANG.globalLang.buttons.btnEdit]}</span></a></li><li class="li-delete"><a><span class="icon_delete"></span><span>{[Ext.LANG.globalLang.buttons.btnDelete]}</span></a></li></ul>',
            '           </div>',
            '           </div>',
            '</tpl>',
            '<tpl if="this.dataloaded == false">',
            '   <div class="no-comment-div">',
            '       <p>{[Ext.LANG.CommentPanel.noComment]}</p>',
            '   </div>',
            '</tpl>',
            {
                // XTemplate configuration:
                generateClass: function(values) {
                    var optJp = values.opt,
                        optEn = Ext.LANG.messagePanel[optJp],
                        msgCls = 'msg_status_'+optEn;
                    return msgCls;
                },
                formatCommentDateTime: function(values) {
                    var commentDate = values.comment_date;
                        formattedDateTime = this.formatDateTime(commentDate);
                    return formattedDateTime;
                        formattedDateTime = null;
                    if(!Ext.isEmpty(commentDate)) {
                        var dt = new Date(commentDate);
                        formattedDateTime = Ext.Date.format(dt,'Y-m-d H:i');
                    }
                },
                formatUpdatedDateTime: function(values) {
                    var updatedDate = values.updated_date;
                        formattedDateTime = this.formatDateTime(updatedDate);
                    return formattedDateTime;
                },
                formatDateTime: function(date) {
                    var formattedDateTime = null;
                    if(!Ext.isEmpty(date)) {
                        var dt = new Date(date);
                        formattedDateTime = Ext.Date.format(dt,'Y-m-d H:i');
                    }
                    return formattedDateTime;
                },
                setDataLoadFlg: function() {
                    this.dataloaded=false;
                },
                changeDataLoadFlg: function() {
                    this.dataloaded=true;
                },
                commentEditHtmlTag: function(values) {
                    var htmlTag = '';
                    if(!Ext.isEmpty(values.updated_date)) {
                        var specialChar     = Ext.LANG.globalLang.specialChar,
                            formattedDateTime = this.formatUpdatedDateTime(values),
                            formattedDateTime = specialChar.openBracket+formattedDateTime+specialChar.closeBracket,
                            editedOnLang = Ext.LANG.messagePanel.editedOn,
                            editedOn = editedOnLang+formattedDateTime;
                        htmlTag = '<span class="icon_edit" data-qtip="'+editedOn+'"></span>';
                    }
                    return htmlTag;
                },
                isLastItem:function(idx, cnt){
                    return idx == cnt;
                },
            }
        );
        var orderDataView =  {
                autoScroll      : true,
                xtype           : 'dataview',
                itemId          : 'orderDataview',
                tpl             : tpl,
                itemSelector    : 'div.comment-div',
                store           : commentviewStore
            },
            horensoDataView = {
                autoScroll      : true,
                xtype           : 'dataview',
                itemId          : 'horensoDataview',
                tpl             : tpl,
                itemSelector    : 'div.comment-div',
                store           : commentviewStore
            },
            emailDataView = {
                autoScroll      : true,
                xtype           : 'dataview',
                itemId          : 'emailDataview',
                tpl             : tpl,
                itemSelector    : 'div.comment-div',
                store           : commentviewStore
            };
        var dataviewArray = [orderDataView,horensoDataView,emailDataView];
        return dataviewArray;
    },
    createDataviewStore: function(){
        var me = this,
            fields = [
                {
                    name: 'comment_id'
                },
                {
                    name: 'ref_table'
                },
                {
                    name: 'ref_record_id'
                },
                {
                    name: 'username'
                },
                {
                    name: 'comment'
                },
                {
                    name: 'firstlastname'
                },
                {
                    name: 'comment_date'
                },
                {
                    name: 'updated_date'
                },
                {
                    name: 'created_by'
                },
                {
                    name: 'updated_by'
                },
                {
                    name: 'opt'
                },
                {
                    name: 'app_name'
                }
            ]
        storeParamObj = {
            'pageSize'      : null, 
            'fields'        : fields,
            'validations'   : null,
            'storeId'       : 'commentDataViewStore', 
            'storeUrl'      : 'bizlayer/msgTab/getMessageList', 
            'create'        : 'bizlayer/msgTab/getMessageList',
            'writeAllFields': true,
            'editable'      : false,
            'idProperty'    : null,
            'forceSubmitFields' : []
        };
        var dataViewStore = YBase.utility.GridHelper.createStore(storeParamObj);
        return dataViewStore;
    }, 
    addDataview: function(commentPanel, dataviewArray) {
        var me = this,
            commentTabCnt = commentPanel.query('container[itemId=commentTabCnt]')[0],
            horensoTabCnt = commentPanel.query('container[itemId=horensoTabCnt]')[0];
        for(var i=0;i<dataviewArray.length;i++) {
            if(dataviewArray[i].itemId == 'orderDataview') {
                commentTabCnt.add(dataviewArray[i]);
            }else if(dataviewArray[i].itemId == 'horensoDataview') {
                horensoTabCnt.add(dataviewArray[i]);
            }else {
                //do nth
            }
        }
    },
    onOrderDataviewItemClick: function(dataview, record, item, index, e, eOpts ) {
        var me = this;
        me.dataviewItemClick(dataview, record, e);
    },
    onHorensoDataviewItemClick: function(dataview, record, item, index, e, eOpts ) {
        var me = this;
        me.dataviewItemClick(dataview, record, e);
    },
    dataviewItemClick: function(dataview, record, e) {
        var me = this,
            pnl = me.currentView,
            msgTextarea = pnl.query('textareafield[itemId=msgTextarea]')[0],
            commentId = record.get('comment_id'),
            createdBy = record.get('created_by'),
            comment = record.get('comment'),
            appName = record.get('app_name'),
            validUser=false;
        if(e.getTarget('.li-edit')) {
            validUser = me.checkUser(createdBy);
            if(validUser) {
                msgTextarea['comment_id'] = commentId;
                msgTextarea['created_by'] = createdBy;
                msgTextarea['app_name'] = appName;
                comment = me.replaceBrTag(comment);
                msgTextarea.setValue(comment);
                msgTextarea.setActive(true)
            }else {
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.alertMsg.noSaveRights,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        }
        if(e.getTarget('.li-replay')) {

        }
        if(e.getTarget('.li-delete')) {
            validUser = me.checkUser(createdBy);
            if(validUser) {
                msgTextarea['comment_id'] = commentId;
                msgTextarea['created_by'] = createdBy;
                me.deleteComment(record);
            }else {
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.alertMsg.noSaveRights,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }
        }
    },
    replaceBrTag: function(comment) {
       return comment === undefined || comment === null ? '' : comment.replace(/\<br\\?>/g, "\n");
    },
    checkUser: function(created_by) {
        if(Ext.CURRENT_USER.user_id == created_by) {
            return true;
        }else {
            return false;
        }
    },
    loadComment: function(msgTabCnt) {
        var me  = this,
            cnt = msgTabCnt;
        if(Ext.isEmpty(cnt) || Ext.isEmpty(me.activeTabObj) || Ext.isEmpty(me.inactiveTabArr)) {
            return;
        }
        var msgTabPanel = cnt.query('panel[itemId=msgTabPanel]')[0],
            activeTab   = msgTabPanel.getActiveTab(),
            dView       = activeTab.query('dataview')[0],
            dViewStore  = dView.getStore(),
            optMsgCombo = cnt.query('combobox[itemId=optMsgCombo]')[0];
        dViewStore.load({
            params:{
                'active_obj':JSON.stringify(me.activeTabObj),
                'inactive_arr':JSON.stringify(me.inactiveTabArr),
                'opt':optMsgCombo.getValue()
            }
        });
        dViewStore.on('load', me.onDataviewStoreLoad, me);
    },
    onDataviewStoreLoad: function(store, records, successful, eOpts ){
        var me = this;
        me.setTitle(store);
        me.setScrollToEnd();
        if(Ext.msk) {
            Ext.msk.hide()
        }
    },
    setTitle: function(store) {
        var me = this,
            activeTab = Ext.bodyTab.getActiveTab(),
            pnl = {};
        if(!Ext.isEmpty(activeTab.params) && 'message_window' in activeTab.params && activeTab.params.message_window) {
            pnl = activeTab;
        } else if(activeTab.itemId != 'MessagePanel') {
            pnl =  YBase.utility.MsgCmpHelper.MsgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
        } else {
            pnl = activeTab.query('container[itemId=MsgTabCnt]')[0];
        }
        var commentLang     = Ext.LANG.CommentPanel,
            specialChar     = Ext.LANG.globalLang.specialChar,
            commentTabTitle = commentLang.commentTabTitle,
            horensoTabTitle = commentLang.horensoTabTitle,
            messagePanelLang= Ext.LANG.messagePanel,
            msgTabPanel     = pnl.query('panel[itemId=msgTabPanel]')[0],
            commentTab      = pnl.query('panel[itemId=commentTab]')[0],
            horensoTab      = pnl.query('panel[itemId=horensoTab]')[0],
            storeReader     = store.getProxy().reader,
            storeRawData    = storeReader.rawData,
            count           = storeRawData.tab_count_arr;

        for(var i=0;i<count.length;i++) {
            if(count[i].app_name == messagePanelLang.orderAppName)
                commentTabTitle = commentTabTitle+specialChar.openBracket+count[i].total+specialChar.closeBracket;
            if(count[i].app_name == messagePanelLang.horensoAppName)
                horensoTabTitle = horensoTabTitle+specialChar.openBracket+count[i].total+specialChar.closeBracket;
        }
        commentTab.setTitle(commentTabTitle);
        horensoTab.setTitle(horensoTabTitle);
    },
    setScrollToEnd:  function(){
        var me = this,
            activeTab = Ext.bodyTab.getActiveTab(),
            absCmp = me.currentView;
       /* if(activeTab.itemId != 'MessagePanel') {
            absCmp =  YBase.utility.MsgCmpHelper.MsgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
        }else {
            absCmp = activeTab.query('container[itemId=MsgTabCnt]')[0];
        }*/
        var msgTabPanel = absCmp.query('panel[itemId=msgTabPanel]')[0],
            activeTab = msgTabPanel.getActiveTab(),
            dView  = activeTab.query('dataview')[0];
        dView.scrollBy(0,5000,false);
    },
    onMsgKeyPress: function(key, e, eOpts) {
        var me = this;
        if(e.shiftKey) {
            if(e.charCode == 13){
                e.preventDefault();
                me.saveComment();
            }else {
                //do nth
            }
        }
    },
    onSpecialkey: function(field, e) {
        var me = this,
            activeTab = Ext.bodyTab.getActiveTab(),
            absCmp = {};
        if(!Ext.isEmpty(activeTab.params) && 'message_window' in activeTab.params && activeTab.params.message_window) {
            absCmp = activeTab;
        } else if(activeTab.itemId != 'MessagePanel') {
            absCmp =  YBase.utility.MsgCmpHelper.MsgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
        } else {
            absCmp = activeTab.query('container[itemId=MsgTabCnt]')[0];
        }
        var msgTextarea = absCmp.query('textareafield[itemId=msgTextarea]')[0];
        if(e.getKey() == e.ESC) {
            delete msgTextarea['comment_id'];
            delete msgTextarea['created_by'];
            msgTextarea.setValue(null);
        }
    },
    onMsgTextAreaBlur: function(textarea,e,eOpts) {
        if(textarea.isValid() == false)
            textarea.markInvalid();
    }, 
    saveComment: function() {
        var me = this,
            activeTab = Ext.bodyTab.getActiveTab(),
            absCmp = {};
        if(!Ext.isEmpty(activeTab.params) && 'message_window' in activeTab.params && activeTab.params.message_window) {
            absCmp = activeTab;
        } else if(activeTab.itemId != 'MessagePanel') {
            absCmp =  YBase.utility.MsgCmpHelper.MsgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
        } else {
            absCmp = activeTab.query('container[itemId=MsgTabCnt]')[0];
        }
        var hiddenTblIdField    = absCmp.query('hiddenfield[itemId=table_id]')[0],
            hiddenRefIdField    = absCmp.query('hiddenfield[itemId=ref_record_id]')[0],
            table_id            = hiddenTblIdField.getValue(),
            ref_record_id       = hiddenRefIdField.getValue(),
            msgTextarea         = absCmp.query('textareafield[itemId=msgTextarea]')[0],
            optMsgCombo         = absCmp.query('combobox[itemId=optMsgCombo]')[0],
            statusCombo         = absCmp.query('combobox[itemId=statusCombo]'),
            comment_id          = msgTextarea['comment_id'],
            commentData         = msgTextarea.getValue(),
            //for multiline comment
            comment = commentData.replace(/\n/g,"<br>"),
            tplData = null,created_by = null;
        if(Ext.isEmpty(comment)) {
            return;
        }
        if(!Ext.isEmpty(comment_id)) {
            created_by = msgTextarea['created_by'];
        }else {
            created_by = Ext.CURRENT_USER.user_id;
        }
        if(Ext.isEmpty(msgTextarea['app_name'])) {
            msgTextarea['app_name'] = me.activeTabObj.app;
        }
        if(!Ext.isEmpty(statusCombo[0])) {
            tplData = statusCombo[0].displayTplData;
            if(!Ext.isEmpty(tplData[0])) {
                tplData = tplData[0];
                tplData['order_master_id'] = absCmp.selectedRawData.order_master_id;
            }
        }

        var app_name = msgTextarea['app_name'];
        var commentObj = {
            'comment'       : comment,
            'table_id'      : table_id,
            'ref_record_id' : ref_record_id,
            'comment_id'    : comment_id,
            'created_by'    : created_by,
            'opt'           : optMsgCombo.getValue(),
            'app_name'      : app_name,
            'dbl_rec'       : me.dblRec,
            'order_master_id': absCmp.selectedRawData.order_master_id,
            'tpl_data'      : tplData
        }
        //for new record only
        if(me.dblRec && Ext.isEmpty(comment_id)) {
            commentObj['customer_table_id'] = me.customer_table_id;
            commentObj['customer_ref_rec_id'] = absCmp.selectedRawData.customer_code;
            commentObj['customer_app_name'] = Ext.LANG.messagePanel.horensoAppName;
        }
        if((!Ext.isEmpty(table_id)) || (!Ext.isEmpty(ref_record_id))){
            var form = absCmp.query('form[itemId=msgTabFormPanel]')[0];
            if(form.isValid()){
                //form.submit({
                Ext.Ajax.request({
                    url: 'bizlayer/msgTab/saveMessage',
                    method: 'POST',
                    params:{
                        'comment_obj' : JSON.stringify(commentObj)  
                    },
                    scope:absCmp,
                    success: function(response) {
                        var msgTextarea =  this.query('textareafield[itemId=msgTextarea]')[0];
                        msgTextarea.setValue();
                        msgTextarea.markInvalid();

                        delete msgTextarea['comment_id'];
                        delete msgTextarea['created_by'];
                        delete msgTextarea['app_name'];

                        var table_id            = this.query('hiddenfield[itemId=table_id]')[0].getValue(),
                            ref_record_id       = this.query('hiddenfield[itemId=ref_record_id]')[0].getValue(),
                            opt_comment         = this.query('combobox[itemId=optMsgCombo]')[0].getValue(),
                            resp                = Ext.decode(response.responseText),
                            msgTabPanel     = this.query('panel[itemId=msgTabPanel]')[0],
                            activeTab           = msgTabPanel.getActiveTab(),
                            dView               = activeTab.query('dataview')[0],
                            dViewStore          = dView.getStore();
                        dViewStore.load({
                            scope:absCmp,
                            params:{
                                'active_obj':JSON.stringify(me.activeTabObj),
                                'inactive_arr':JSON.stringify(me.inactiveTabArr),
                                'opt':optMsgCombo.getValue()
                            },
                            callback: function(records,action,success) {
                                if(!Ext.isEmpty(this.params) && 'message_window' in this.params && this.params.message_window) {
                                    YBase.app.getController('MsgTabWinController').updateEntryPanel();
                                }
                            }
                        });
                        this.query('combobox[itemId=statusCombo]')[0].setValue(null);
                    },
                    failure: function(response) {
                        Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.saveError);
                    }
                });
            }
        }else{
            Ext.Msg.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.saveError);
        }
    },
    deleteComment: function(record) {
        var me = this,
            absCmp = me.currentView;
            commentObj = {
                'table_id'      : record.get('ref_table'),
                'ref_record_id' : record.get('ref_record_id'),
                'comment_id'    : record.get('comment_id'),
                'created_by'    : record.get('created_by'),
                'app_name'      : me.activeTabObj.app
            };
        if(me.activeTabObj.t == 1) {
            commentObj['order_master_id'] = me.activeTabObj.id;
        }
        Ext.Ajax.request({
            url: 'bizlayer/msgTab/deleteMessage',
            method: 'POST',
            params:{
                'comment_obj' : JSON.stringify(commentObj)  
            },
            scope:absCmp,
            success: function(response) {
                var msgTextarea =  this.query('textareafield[itemId=msgTextarea]')[0];
                delete msgTextarea['comment_id'];
                delete msgTextarea['created_by'];
                delete msgTextarea['app_name'];
                var msgTabPanel         = this.query('panel[itemId=msgTabPanel]')[0],
                    activeTab           = msgTabPanel.getActiveTab(),
                    dView               = activeTab.query('dataview')[0],
                    dViewStore          = dView.getStore();
                dViewStore.load({
                    scope:absCmp,
                    params:{
                        'active_obj':JSON.stringify(me.activeTabObj),
                        'inactive_arr':JSON.stringify(me.inactiveTabArr)
                    },
                    callback: function(records,action,success) {
                        if(!Ext.isEmpty(this.params) && 'message_window' in this.params && this.params.message_window) {
                            YBase.app.getController('MsgTabWinController').updateEntryPanel();
                        }
                    }
                });
            }
        });
    },
    onMsgTabChange: function(tabPanel, newPanel, oldPanel, eOpts) {
        var me = this,
            cnt = tabPanel.up('container');
        me.setGlobalRecords(cnt);
        me.loadComment(cnt);
    },
    onDblRecCheckboxChange: function( checkbox, newValue, oldValue, eOpts) {
        var me = this;
        //true aka checked
        if(newValue) {
            me.dblRec=true;
        }else {
            me.dblRec=false;
        }
    },
    onMsgUnionCheckboxChange: function( checkbox, newValue, oldValue, eOpts) {
        var me = this,
            activeTab = Ext.bodyTab.getActiveTab(),
            absCmp;
        if(!Ext.isEmpty(activeTab.params) && 'message_window' in activeTab.params && activeTab.params.message_window) {
            absCmp = activeTab;
        }else if(activeTab.itemId != 'MessagePanel') {
            absCmp =  YBase.utility.MsgCmpHelper.MsgCmpPanel.query('container[itemId=MsgTabCnt]')[0];
        }else {
            absCmp = activeTab.query('container[itemId=MsgTabCnt]')[0];
        }
        //true aka checked
        if(newValue) {
            me.unioinRec=true;
            me.activeTabObj['ref_id'] = me.order_table_id;
            me.activeTabObj['ref_app'] = Ext.LANG.messagePanel.orderAppName;
        }else {
            me.unioinRec=false;
            delete me.activeTabObj['ref_id'];
            delete me.activeTabObj['ref_app'];
        }
        me.loadComment(absCmp);
    },
    showMessagePopupWin: function(msgTabCnt) {
        var me = this,
            bodyTab = Ext.bodyTab,
            bodyTabItems = bodyTab.items.items,
            activeTab = bodyTab.getActiveTab(),
            activeTabCntrl = activeTab.cntrl,
            tabpanel={};
        /*removes popupWin from other and current tab*/
        for(var i=0;i<bodyTabItems.length;i++) {
            tabpanel = bodyTabItems[i];
            if('cntrl' in tabpanel && !Ext.isEmpty(tabpanel.cntrl.msgTabWin)) {
                tabpanel.cntrl.msgTabWin = null;
            }
        }
        var url = me.generateUrl();
        var pnl = msgTabCnt.up('panel'),
            route = url,
            name  = 'messageWin';

        var w = 640, h= document.body.customerHeight-70,
            t = window.screenTop + (window.outerHeight- window.innerHeight),
            l = window.screenLeft + window.outerWidth - (window.outerWidth-window.innerWidth) - w, 
            options="";
        options = Ext.String.format('directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width={0},height={1},top={2},left={3}',w,h,t,l);
        activeTabCntrl.msgTabWin = window.open(route,name,options);
        pnl.collapse();
    },
    generateUrl: function(selectionchange) {
        var me = this;
            activeTabStr = JSON.stringify(me.activeTabObj),
            inactiveTabArrStr = JSON.stringify(me.inactiveTabArr),
            encodedActiveUri = encodeURI(activeTabStr),
            encodedInActiveUri = encodeURI(inactiveTabArrStr),
            route ='',
            str ='popupWindow#';
        if(!Ext.isEmpty(selectionchange) && selectionchange == true) {
            str = '';
        }
        route = str+'messageWin?at='+encodedActiveUri+'&iat='+encodedInActiveUri;
        return route;
    },
    init: function(application) {
        var me = this;
        me.control({
            "msgTabCnt": {
                'beforerender': me.onMsgTabCntBeforeRender,
                'afterrender': me.onMsgTabCntAfterRender,
            },
            "msgTabCnt panel[itemId=bottomMsgPanel]": {
                'afterrender': me.onBottomMsgPanelAfterRender
            },
            /*"msgTabCnt panel[itemId=msgTabPanel]": {
                'tabchange': me.onMsgTabChange
            },*/
            "panel[itemId=msgCmpPanel] msgTabCnt textareafield[itemId=msgTextarea]": {
                'keypress': me.onMsgKeyPress,
                'blur': me.onMsgTextAreaBlur,
                'specialkey': me.onSpecialkey
            },
            "messagePanel msgTabCnt textareafield[itemId=msgTextarea]": {
                'keypress': me.onMsgKeyPress,
                'blur': me.onMsgTextAreaBlur,
                'specialkey': me.onSpecialkey
            },
            "mainPopup msgTabCnt textareafield[itemId=msgTextarea]": {
                'keypress': me.onMsgKeyPress,
                'blur': me.onMsgTextAreaBlur,
                'specialkey': me.onSpecialkey
            },
            "msgTabCnt checkbox[itemId=dblRecCheckbox]": {
                'change': me.onDblRecCheckboxChange
            },
            "msgTabCnt checkbox[itemId=msgUnionCheckbox]": {
                'change': me.onMsgUnionCheckboxChange
            }
        });
        me.callParent(arguments);
    }
});