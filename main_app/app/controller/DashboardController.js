Ext.define('YBase.controller.DashboardController', {
    extend: 'Ext.app.Controller',
    alias: 'controller.DashboardController',
    refs: [
        {
            ref: 'mainPanel',
            selector: 'mainPanel'
        }
    ],
    noteValue:null,
    implementLanguage: function(abstractcomponent) {
        var btnLang=Ext.LANG.globalLang.buttons;
        if(Ext.CURRENT_USER.userRole != 50) {
            abstractcomponent.query('button[itemId=btnMessageEdit]')[0].setVisible(false);
        }else {
            abstractcomponent.query('button[itemId=btnMessageEdit]')[0].setVisible(true);
        }
        abstractcomponent.query('button[itemId=btnMessageEdit]')[0].setText(btnLang.btnEdit);
        abstractcomponent.query('button[itemId=btnDashBoardRefresh]')[0].setText(btnLang.btnRefresh);
    },
    onDashBoardPanelBeforeRender: function(abstractcomponent, eOpts){
        var me=this;
  /*          container =  abstractcomponent.query('container[itemId=actionBtnContainer1]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help;
        //YBase.utility.CommonFunctions.addHelpCmp(container,link,label);
        var me = this;*/
        me.implementLanguage(abstractcomponent);
    },
    addHelpCmp: function(helpTextInfo) {
        var me=this,
            absCmp=me.getMainPanel(),
            container =  absCmp.query('container[itemId=actionBtnContainer1]')[0],
            lang=Ext.LANG,
            link = lang.help_link.orderMasterLink,
            label = lang.help_label.help;
        YBase.utility.CommonFunctions.addHelpCmp(container,link,label,helpTextInfo);
    },
    onDashboardActivate:function(abstractcomponent, eOpts){
        abstractcomponent.setTitle("");
        var me=this;
        Ext.msk = Ext.create('YBase.utility.Mask');
        Ext.msk.on('afterrender', function(){
            if(Ext.msk) 
                Ext.msk.hide();
            // me.loadDashboardStores();
        },me);
        Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, Ext.getBody());
    },
    onDasboardNoteBlur: function(textareafield,event, eOpts) {
        var me = this;
        if(textareafield.getValue() != me.noteValue)
            me.saveDasboardNote();
    },
    saveDasboardNote: function(){
        var me =this,
            pnl=me.getMainPanel(),
            dashboardNotes=pnl.query('textareafield[itemId=DasboardNote1]')[0].getValue(),
            user_tz = jstz.determine().name();//gets the browser or system timezone

        Ext.Ajax.request({
            url: 'bizlayer/userNote/save',
            method: 'POST',
            params:
            {
                dashboardNotes:dashboardNotes,
                user_tz:user_tz
            },
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                me.updateNotePanel(resp);
            },
            failure:function(response){
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.saveError,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    updateNotePanel: function(resp){
        var noteData = resp.data.note,
            respDate = resp.data.updated_datetime;
            dateTime = respDate.split(' '),
            date = dateTime[0],
            time =dateTime[1];
        if(!Ext.isEmpty(noteData))
            Ext.ComponentQuery.query('textareafield[itemId=DasboardNote1]')[0].setValue(noteData);
        this.noteValue = this.getMainPanel().query('textareafield[itemId=DasboardNote1]')[0].value;
        //Ext.ComponentQuery.query("label[itemId=NoteTitle1]")[0].update("<div class='date-container'>"+"<span class='left-bracket'>"+'【'+"</span>"+date+' :: '+"<i>"+'｢'+"</i>"+time+"<i>"+'｣'+"</i>"+"<span class='right-bracket'>"+'        】'+"</span>"+"</div>");
        //--Ext.ComponentQuery.query("label[itemId=NoteTitle1]")[0].update("<div class='date-container' style='font-weight:bold'>"+"<span class='left-bracket'>"+"</span>"+date+'　'+"<i>"+' '+"</i>"+time+"<i>"+' '+"</i>"+"<span class='right-bracket'>"+"</span>"+"</div>");
        // Ext.ComponentQuery.query("label[itemId=NoteTitle1]")[0].update("<div class='date-container'>"+"<span class='left-bracket'>"+"</span>"+date+' :: '+"<i>"+'｢'+"</i>"+time+"<i>"+'｣'+"</i>"+"<span class='right-bracket'>"+"</span>"+"</div>");
    },
    onDasboardNoteKeypress: function(e, target) {
        var me = this;
        e.preventDefault();
        if((e.getKey() == e.ENTER)) {
            // e.preventDefault();
            me.saveDasboardNote();
        }
        if((e.ctrlKey == true && e.getKey() == e.S) &&(textareafield.getValue() != me.noteValue)) {
            me.saveDasboardNote();
        }
    },
    onMessagePanelBeforeRender: function(abstractcomponent, eOpts) {
        this.reloadUserNote();
        Ext.Ajax.request({
            url: 'bizlayer/notice/getNotice',
            method: 'POST',
            success: function(response) {
                var resp = Ext.decode(response.responseText),
                    respData = resp.data;
                if(!Ext.isEmpty(respData.updated_datetime))
                    var dateTime = (respData.updated_datetime).split(' '),
                
                date = dateTime[0],
                time =dateTime[1];
                if (!Ext.isEmpty(resp.data.notice_id)){
                    
                    //--Ext.ComponentQuery.query("label[itemId=NoteTitle1]")[0].update("<div class='date-container' style='font-weight:bold'>"+"<span class='left-bracket'>"+"</span>"+date+'　'+"<i>"+' '+"</i>"+time+"<i>"+' '+"</i>"+"<span class='right-bracket'>"+"</span>"+"</div>");
                    // Ext.ComponentQuery.query("label[itemId=MessageDate1]")[0].update("<div class='date-container'>"+"<span class='left-bracket'>"+'【'+"</span>"+date+' :: '+"<i>"+'｢'+"</i>"+time+"<i>"+'｣'+"</i>"+"<span class='right-bracket'>"+'        】'+"</span>"+"</div>");
                   // Ext.ComponentQuery.query("label[itemId=MessageDate1]")[0].update("<b>"+'[ '+"</b>"+date+' :: '+"<i>"+'{'+"</i>"+time+"<i>"+'}'+"</i>"+"<b>"+']'+"</b>");
                    Ext.ComponentQuery.query("panel[itemId=MessagePanel]")[0].update(respData.message);
                    //hide progress bar
                    // YBase.utility.CommonFunctions.showProgressBar(false);
                }
                if(Ext.msk) 
                    Ext.msk.hide();
            },
            failure: function(response) {
                // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.errorMsg.failuretoLoadPreviousMessage);
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.failuretoLoadPreviousMessage,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    reloadUserNote: function(){  
        var me =this,
            user_tz = jstz.determine().name();//gets the browser or system timezone
        Ext.Ajax.request({
            url: 'bizlayer/userNote/getUsersNote',
            method: 'POST',
            params:
            {
                user_tz:user_tz
            },
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                me.updateNotePanel(resp);
                me.addHelpCmp(resp.helpInfo);
            },
            failure: function(response) {
                // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.errorMsg.failuretoLoadUserNote);
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.errorMsg.failuretoLoadUserNote,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    onBtnMessageEditClick: function(button, e, eOpts) {
        var win = Ext.create('YBase.view.DashBoardEditWindow');
        win.show();
    },
    init: function(application) {
        var me = this;
        me.control({
            "mainPanel panel[itemId=DashBoardPanel]": {
                beforerender: me.onDashBoardPanelBeforeRender,
                activate : me.onDashboardActivate
            },
            "mainPanel panel[itemId=MessagePanel]": {
                beforerender: me.onMessagePanelBeforeRender,
            },
            "mainPanel button[itemId=btnMessageEdit]": {
                click: me.onBtnMessageEditClick
            },
            "mainPanel textareafield[itemId=DasboardNote1]": {
                blur: me.onDasboardNoteBlur,
                keypress: me.onDasboardNoteKeypress
            }
        });
    }

});
