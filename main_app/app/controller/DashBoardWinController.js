Ext.define('YBase.controller.DashBoardWinController', {
// #01 Extend and References 
    extend: 'Ext.app.Controller',
    refs: [
    {
        ref: 'dashBoardEditWindow',
        selector: 'dashBoardEditWindow'
    }
    ],
    

// #03 Language Implement
    languageImplementation: function(abstractcomponent) {
        var lang = Ext.LANG.globalLang,
            btnLang= lang.buttons;
        abstractcomponent.setTitle(lang.app.appTitle);
        abstractcomponent.query('button[itemId=btnDBEditSave]')[0].setText(btnLang.btnSave);
        abstractcomponent.query('button[itemId=btnDBCancel]')[0].setText(btnLang.btnCancel);
    },


// #06 Panel Event function list
    onDashBoardEditWindowBeforeRender: function(abstractcomponent, eOpts) {
        if(abstractcomponent.openFrom =='memo')
        {
            var fieldValue = abstractcomponent.store.get(abstractcomponent.dataIndex);
            abstractcomponent.query('htmleditor')[0].setValue(fieldValue);
            
        }else{
            Ext.Ajax.request({
                url: 'bizlayer/notice/getNotice',
                method: 'POST',
                success: function(response) {
                    var resp = Ext.decode(response.responseText),
                    respData = resp.data;
                    abstractcomponent.query('htmleditor')[0].setValue(respData.message);
                }
            });
        }
        this.languageImplementation(abstractcomponent);
    },
    
    onBtnDBSaveClick:function(button, e, eOpts) {
        var me = this,
        pnl = me.getDashBoardEditWindow(),
        dataIndex = pnl.dataIndex,
        rec = pnl.store,
        lang = Ext.LANG,
        msg = Ext.Msg,
        formControl = button.up('form'),
        form = formControl.getForm();
        /*gets the HTMLeditor*/
        var editor = pnl.query("htmleditor")[0],
        bd= editor.getEditorBody(),
        html = bd.innerHTML,
        tagsLink = bd.getElementsByTagName("a");
        for (var i = 0; i < tagsLink.length; i++) { 
            var target = tagsLink[i].target;
            if (!target) {
                tagsLink[i].target = '_blank';
            }
        }
        editor.syncValue();
        
        if(pnl.openFrom=="memo"){
            var fieldValue = form.getValues().message;
            rec.set(dataIndex, fieldValue);
            formControl.up('window').close();
            
        }else{
            if(form.isValid()){
                form.submit({
                    url:'bizlayer/notice/edit',
                    params:{
                    //user_id: cuser.user_id
                    },
                    success:function(form, action){
                        formControl.up('window').close();
                        // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.successMsg.saveSuccess, showResult);
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg: Ext.LANG.globalLang.successMsg.saveSuccess,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        //function showResult(btn){                        
                            Ext.Ajax.request({
                                url: 'bizlayer/notice/getNotice',
                                method: 'POST',
                                success: function(response) {
                                    var resp = Ext.decode(response.responseText),
                                    respData = resp.data,
                                    dateTime = (respData.updated_datetime).split(' '),
                                    date = dateTime[0],
                                    time =dateTime[1];
                                    if (!Ext.isEmpty(resp.data.message_id))
                                        //Ext.ComponentQuery.query("panel[itemId=MessageListPanel]")[0].update(respData.message+' '+respData.updated_datetime);
                                        Ext.ComponentQuery.query("label[itemId=MessageDate]")[0].update("<div class='date-container'>"+"<span class='left-bracket'>"+'【 '+"</span>"+date+' :: '+"<i>"+'｢'+"</i>"+time+"<i>"+'｣'+"</i>"+"<span class='left-bracket'>"+'        】'+"</span>"+"</div>");
                                        Ext.ComponentQuery.query("panel[itemId=MessagePanel]")[0].update(respData.message);
                                }
                            });
                        //}
                    },
                    failure:function(form, action){
                        Ext.Msg.show({
                            title: lang.globalLang.app.appTitle,
                            msg: action.result.msg,
                            modal: true,
                            icon: msg.INFO,
                            buttons: msg.OK,
                            buttonText : {
                                ok : lang.globalLang.buttons.ok
                            }
                        });
                    }
                });
            }
            else{
                // Ext.MessageBox.alert(lang.globalLang.app.appTitle, lang.globalLang.alertMsg.invalidFieldData);
                Ext.Msg.show({
                    title: lang.globalLang.app.appTitle,
                    msg:   lang.globalLang.alertMsg.invalidFieldData,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
            
        }
   
    },

    onBtnDBCancelClick:function(button, e, eOpts) {
        button.up('window').close();
    },

    onDashBoardEditWindowAfterRender: function(abstractcomponent, eOpts) {
        var editor=abstractcomponent.query("htmleditor")[0],
            fontData = editor.fontSelect;
        fontData.dom.firstChild.value='ヒラギノ角ゴ pro w3';
        fontData.dom.firstChild.text="ヒラギノ角ゴ pro w3";
        return;
    },

// #07 Init Function 
    init: function(application) {
        this.control({
            "#DashBoardEditWindow": {
                beforerender: this.onDashBoardEditWindowBeforeRender,
                afterrender: this.onDashBoardEditWindowAfterRender
            },
            "#btnDBEditSave": {
                click: this.onBtnDBSaveClick
            },
            "#btnDBCancel": {
                click: this.onBtnDBCancelClick
            }
        });
    }
});
