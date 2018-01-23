Ext.define('YBase.controller.HelpWindowController', {
    extend: 'Ext.app.Controller',

    id: 'HelpWindowController',
    refs:[
        {
            ref: 'helpWindow',
            selector: 'helpWindow'
        }
    ],
    currentSelectedRec:null,
    lastSelectedRec:null,
    renderAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn;
        btn = '<div  class="btn_row_del"> </div>';
        return btn;
    },
    onHelpWIndowBeforeRender: function(abstractcomponent, options) {
        var me=this;
            me.implementLanguage(abstractcomponent);
            h=Ext.getBody().getViewSize().height;
            abstractcomponent.setHeight(h);
            var helpTextGrid = abstractcomponent.query('grid[itemId=helpGrid]')[0],
                helpTextGridStore = helpTextGrid.getStore();
                me.helpTextGrid=helpTextGrid;
            helpTextGridStore.on('load',function(store,records) {
                if(!Ext.isEmpty(records)) {
                    var helpWin=this.getHelpWindow();
                    for (var i=0; i<records.length; i++){
                        if(records[i].get('help_id')==helpWin.helpTextInfo.help_id){
                            row_idx=i;
                            break;
                        }
                    }
                    me.helpTextGrid.getSelectionModel().select(row_idx, true);
                }
            },me);
            helpTextGrid.query('gridcolumn[itemId=deleteHelpCol]')[0].renderer = me.renderAction;
            helpTextGrid.getStore().load();
            me.hideShowComponents(abstractcomponent);
    },
    onHelpWindowAfterRender: function(abstractcomponent, eOpts) {
        var editor=abstractcomponent.query("htmleditor")[0],
            fontData = editor.fontSelect;
        fontData.dom.firstChild.value='ヒラギノ角ゴ pro w3';
        fontData.dom.firstChild.text="ヒラギノ角ゴ pro w3";
        return;
    },
    hideShowComponents:function(abstractcomponent){
        var helpTextEditor = abstractcomponent.query('htmleditor[itemId=helpTextEditor]')[0],
            helpTextGrid = abstractcomponent.query('grid[itemId=helpGrid]')[0],
            helpTextEditBtn = abstractcomponent.query('button[itemId=btnHelpTextEdit]')[0],
            helpTextSaveBtn = abstractcomponent.query('button[itemId=btnHelpTextSave]')[0],
            btnHelpNameSave = abstractcomponent.query('button[itemId=btnHelpNameSave]')[0],
            helpTextAddBtn = abstractcomponent.query('button[itemId=btnHelpTextAdd]')[0],
            userRole=Ext.CURRENT_USER.userRole,
            is_super_user=Ext.CURRENT_USER.is_super_user;
            //helpTextEditBtn.show();
           // helpTextEditor.setDisabled(false);//added this 
           // helpTextSaveBtn.show();//added this 
            if(!is_super_user){
                helpTextGrid.setVisible(false);
                helpTextEditBtn.setVisible(false);
                btnHelpNameSave.setVisible(false);
                //if(userRole==50 && !is_limited_user){
                    //helpTextEditor.setDisabled(false);
                    
                   // helpTextSaveBtn.show();
                //}
            }else{
                helpTextEditBtn.setVisible(true);
            }
        /*if(Ext.CURRENT_USER.is_super_user){
            //helpTextEditBtn.setVisible(true);
          //  helpTextEditor.setDisabled(false);
            helpTextAddBtn.setVisible(true);
            helpTextSaveBtn.setVisible(true);
        }*/
    },
    implementLanguage:function(abstractcomponent){
        var helpWindowLang=Ext.LANG.helpTextWindow;
        abstractcomponent.setTitle(helpWindowLang.winTitle);
        abstractcomponent.query('button[itemId=btnHelpTextEdit]')[0].setText(helpWindowLang.btnHelpTextEdit);
        abstractcomponent.query('button[itemId=btnHelpTextSave]')[0].setText(helpWindowLang.btnHelpTextSave);
        abstractcomponent.query('button[itemId=btnHelpNameSave]')[0].setText(helpWindowLang.btnHelpTextSave);
        abstractcomponent.query('button[itemId=btnCancel]')[0].setText(helpWindowLang.btnCancel);
//        abstractcomponent.query('button[itemId=btnHelpTextAdd]')[0].setText(helpWindowLang.btnHelpTextAdd);
       // abstractcomponent.query('button[itemId=btnOk]')[0].setText(helpWindowLang.btnOk);
        abstractcomponent.query('gridcolumn[itemId=help_code_col]')[0].setText(helpWindowLang.help_code_col);
        abstractcomponent.query('gridcolumn[itemId=help_name_col]')[0].setText(helpWindowLang.help_name_col);
        abstractcomponent.query('gridcolumn[itemId=deleteHelpCol]')[0].setText(helpWindowLang.deleteHelpCol);
    },
    
    onhelpGridSelectionChange:function(grid, selected, eOpts ){
        var me = this,
            helpWindow = me.getHelpWindow(),
            helpTextGrid = helpWindow.query('grid[itemId=helpGrid]')[0],
            helpTextEditor = helpWindow.query('htmleditor[itemId=helpTextEditor]')[0],
            helpTextForm=helpWindow.query('form[itemId=helpTextForm]')[0],
            helpTextEditBtn=helpWindow.query('button[itemId=btnHelpTextEdit]')[0],
            helpTextSaveBtn=helpWindow.query('button[itemId=btnHelpTextSave]')[0];

        if(Ext.isEmpty(me.currentSelectedRec)){
            me.currentSelectedRec=selected[0];
        }else{
            me.lastSelectedRec=me.currentSelectedRec;
            me.currentSelectedRec=selected[0];
        }
        if(!Ext.isEmpty(me.lastSelectedRec)){
            var lastRec_help_text=helpTextEditor.getValue('help_text');
                me.lastSelectedRec.set('help_text',lastRec_help_text);
        }
        if(!Ext.isEmpty(me.currentSelectedRec)){
        var helpText=me.currentSelectedRec.get('help_text');
            helpTextEditor.setValue(helpText);
            helpTextEditor.hide();
            helpTextForm.update(helpText);
            helpTextForm.show();
            if(Ext.CURRENT_USER.is_super_user)
                helpTextEditBtn.setVisible(true);
            helpTextSaveBtn.setVisible(false);
       }
    },
    onBtnCancelClick:function(button,e, eOpts){
        var win=button.up('window');
            win.close();
    },
    onEditHelpTextBtnClick:function(button, e, eOpts){
        var me=this,
            helpWindow = me.getHelpWindow(),
            helpTextForm=helpWindow.query('form[itemId=helpTextForm]')[0],
            helpTextEditBtn=helpWindow.query('button[itemId=btnHelpTextEdit]')[0],
            helpTextEditor = helpWindow.query('htmleditor[itemId=helpTextEditor]')[0],
            helpTextSaveBtn = helpWindow.query('button[itemId=btnHelpTextSave]')[0];
            helpTextEditor.show();
            helpTextSaveBtn.show();
            helpTextEditBtn.hide();
            helpTextForm.hide();
    },
    onBtnHelpTextSaveClick:function(button, e, eOpts){
        var me=this,
            helpWindow = me.getHelpWindow(),
            helpTextEditor = helpWindow.query('htmleditor[itemId=helpTextEditor]')[0],
            bd= helpTextEditor.getEditorBody(),
            html = bd.innerHTML,
            tagsLink = bd.getElementsByTagName("a");
            for (var i = 0; i < tagsLink.length; i++) { 
                var target = tagsLink[i].target;
                if (!target) {
                    tagsLink[i].target = '_blank';
                }
            }
            helpTextEditor.syncValue();
            helpTextValue=helpTextEditor.getValue();

            if(!Ext.isEmpty(me.currentSelectedRec)){
                record=me.currentSelectedRec;
                record.set('help_text',helpTextValue);
            }

            var helpGrid=helpWindow.query('grid[itemId=helpGrid]')[0],
                helpGridStore=helpGrid.getStore(),
                allGridRows=helpGridStore.getRange(),
                removedRecords=helpGrid.store.removed;
                dirtyRows=[];
                removedRows=[];
            for(var i=0; i<allGridRows.length; i++){
                if(allGridRows[i].dirty){
                    dirtyRows.push(allGridRows[i].data);
                }
            }
            for(var j=0;j<removedRecords.length;j++){
                removedRows.push(removedRecords[j].data);
            }
            removedRecords=helpGrid.store.removed;
            if(dirtyRows.length>0 || removedRows.length>0){
                param={
                    rowDatas : JSON.stringify(dirtyRows),
                    removedRows : JSON.stringify(removedRows)
                };
                Ext.Ajax.request({
                    url: 'bizlayer/helpText/saveUpdateHelpText',
                    method: 'POST',
                    params:param,
                    success: function(response) {
                        var resp = Ext.decode(response.responseText);
                        if(resp.success) {
                            var lang=Ext.LANG;
                            Ext.MessageBox.confirm(lang.globalLang.app.appTitle, lang.helpTextWindow.saveSuccessCloseWindow, function(btn) {
                                var helpWin=Ext.ComponentQuery.query('window[itemId=HelpWindow]')[0];
                                if (btn == 'yes') {
                                  helpWin.close();
                                }else{
                                    var helpTextGridStore=helpWin.query('grid[itemId=helpGrid]')[0].getStore();
                                        helpTextGridStore.reload();
                                }
                            });
                        }
                    }
                });
            }else{
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:  Ext.LANG.helpTextWindow.noChange,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
            }



    },
    onBtnHelpTextAddClick:function(button,e,eOpts){
        var me=this,
        helpWindow=me.getHelpWindow(),
        helpGrid= helpWindow.query('grid[itemId=helpGrid]')[0];
        var row = Ext.create(helpGrid.store.model);
        helpGrid.store.insert(0,row);
        var rowEditing = helpGrid.getPlugin('plgGridListCellEditing');
            rowEditing.startEditByPosition({
                row: 0,
                column: 0
            });
    },
    onHelpGridItemClick:function(gridView, record, item, index, e, options){
        if (e.getTarget('.btn_row_del')){
            var me=this,
                lang = Ext.LANG,
                helpWindow=me.getHelpWindow(),
                helpGrid=helpWindow.query('grid[itemId=helpGrid]')[0],
                helpGridStore=helpGrid.getStore(),
                helpTextEditor = helpWindow.query('htmleditor[itemId=helpTextEditor]')[0];
                Ext.MessageBox.confirm(lang.globalLang.app.appTitle, lang.globalLang.alertMsg.deleteRecord, function(btn) {
                    if (btn == 'yes') {
                        record.set('delete_flg','1');
                        helpGridStore.remove(record);
                        helpTextEditor.setValue('');
                    }
                });
        }
    },
    init: function(application) {
        var me = this;
        me.control({
            "helpWindow": {
                beforerender: this.onHelpWIndowBeforeRender,
                afterrender: this.onHelpWindowAfterRender
            },
            "helpWindow button[itemId=btnCancel]":{
                click:me.onBtnCancelClick
            },
            "helpWindow grid[itemId=helpGrid]":{
                selectionchange:me.onhelpGridSelectionChange,
                itemclick:me.onHelpGridItemClick
            },
            "helpWindow button[itemId=btnHelpTextEdit]":{
                click:me.onEditHelpTextBtnClick
            },
            "helpWindow button[itemId=btnHelpTextSave]":{
                click:me.onBtnHelpTextSaveClick
            },
            "helpWindow button[itemId=btnHelpNameSave]":{
                click:me.onBtnHelpTextSaveClick
            },
             "helpWindow button[itemId=btnHelpTextAdd]":{
                click:me.onBtnHelpTextAddClick
            }
        });
    }
});
