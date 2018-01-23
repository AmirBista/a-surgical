Ext.define('YBase.controller.UserController', {
    extend: 'Ext.app.Controller',
    refs: [
    {
        ref: 'userProfileEdit',
        selector: 'userProfileEdit'
    }
    ],
    
    languageImplementation: function(abstractcomponent) {
        var win = abstractcomponent;
            lang = Ext.LANG.userProfiles;
            abstractcomponent.setTitle(lang.winTitle);
        win.query('button[itemId=UserSaveBtn]')[0].setText(lang.btnSave);
        win.query('button[itemId=CancelBtn]')[0].setText(lang.btnCancel);
        win.query('textfield[itemId=UserName]')[0].fieldLabel=lang.lblUserName;
        win.query('textfield[itemId=Password]')[0].fieldLabel=lang.lblPassword;
        win.query('textfield[itemId=FirstName]')[0].fieldLabel=lang.lblFirstName;
        win.query('textfield[itemId=LastName]')[0].fieldLabel=lang.lblLastName;
        win.query('textfield[itemId=PhoneNo]')[0].fieldLabel=lang.lblPhoneNo;
        win.query('textfield[itemId=EmailId]')[0].fieldLabel=lang.lblEmail;
        win.query('combobox[itemId=LanguageSelectCombo]')[0].setFieldLabel(lang.lblAvaiableLangauge);
        win.query('checkboxfield[itemId=ResetPaswordCkb]')[0].boxLabel=lang.lblResetPassword;
    },
    onUserProfileEditWindowBeforeRender: function(abstractcomponent, eOpts) {
        var me = this,
            user_id = Ext.CURRENT_USER.user_id;
         me.languageImplementation(abstractcomponent);
        me.loadLanguageCombo(abstractcomponent);
        me.setupEdit(user_id);
    },
    onUserProfileEditWindowAfterRender: function(abstractcomponent, options) {
        var me = this,
            lang = Ext.LANG.userProfiles;
            win = me.getUserProfileEdit(),
            passPassword = win.query('textfield[itemId=Password]')[0],
            resetPassword = win.query('checkboxfield[itemId=ResetPaswordCkb]')[0];
            phoneNo = win.query('textfield[itemId=PhoneNo]')[0];
            phoneNo.emptyText=lang.textPhoneNo;
            passPassword.setDisabled(true);
            resetPassword.setVisible(true);
    },
    loadLanguageCombo: function(abstractcomponent) {
        abstractcomponent.query('combobox[itemId=LanguageSelectCombo]')[0].getStore().load();
    },
    setupEdit: function(user_id) {
        var win = this.getUserProfileEdit(),
            formPanel = win.query('form[itemId=UserEditForm]')[0];
            form = formPanel.getForm();
        form.load({
            url: 'bizlayer/user/getUser'
        });
    },
    onUserSaveBtnClick:function(button, e, eOpts) {
        var me = this,
            win = this.getUserProfileEdit(),
            formPanel = win.query('form[itemId=UserEditForm]')[0],
            form = formPanel.getForm();
        if (form.isValid()) {
            var url = 'bizlayer/user/save';
            form.submit({
                url: url,
                submitEmptyText:false,
                success: function(form, o) {
                    Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.windowReload,function(btn) {
                        if(btn == 'yes') {
                            /*reloads the window*/
                            window.location.reload();
                        }
                    });              
                    win.close();
                },
                failure: function(form, o) {
                    Ext.Msg.alert('Message','User edited failed!!!');
                }
            });
        } else {
            Ext.Msg.alert('Message','fields required or invalid field input');
        }  
    },
    onCancelBtnClick:function(button, e, eOpts) {
        button.up('window').close();
    },
    onResetPaswordCkbChange: function(field, newValue, oldValue, eOpts) {
        var win = this.getUserProfileEdit(),
            passPassword = win.query('textfield[itemId=Password]')[0];
        if(newValue) {
            passPassword.setDisabled(false);
            passPassword.setValue("");
        }else{
            passPassword.setDisabled(true);
        }
    },
    init: function(application) {
        this.control({
            "#UserProfileEditWindow": {
                beforerender: this.onUserProfileEditWindowBeforeRender,
                afterrender: this.onUserProfileEditWindowAfterRender
            },
            "#UserSaveBtn": {
                click: this.onUserSaveBtnClick
            },
            "#CancelBtn": {
                click: this.onCancelBtnClick
            },
            "userProfileEdit checkboxfield[itemId=ResetPaswordCkb]": {
                change: this.onResetPaswordCkbChange
            },
        });
    }
});
