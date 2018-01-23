Ext.define('YBase.controller.SearchController', {
    extend: 'Ext.app.Controller',

    refs: [
    {
        ref: 'searchWindow',
        selector: 'searchWindow'
    }
    ],
    in_array: function(needle, haystack) {
        for (var i in haystack) {
            if (haystack[i] == needle)
                return true;
        }
        return false;
    },
    implementLanguage: function(absCmp){
        var lang = Ext.LANG.globalLang.buttons,
            searchCriteria = Ext.LANG.globalLang.searchCriteria,
            publicSearchChkBoxArr = searchCriteria.publicSearchChkBoxArr;

        absCmp.setTitle(searchCriteria.winTitle);
        absCmp.query('textfield[itemId=SearchName]')[0].setFieldLabel(searchCriteria.lblSearchConditon);
        // absCmp.setTitle(searchCriteria.title);
        absCmp.query('button[itemId=btnSearchSave]')[0].setText(lang.btnSave);
        absCmp.query('button[itemId=btnSearchCancel]')[0].setText(lang.btnCancel);
        absCmp.query('checkboxfield[itemId=chkBoxShowTemplate]')[0].boxLabel = searchCriteria.chkBoxShowTemplate;
        if(publicSearchChkBoxArr.indexOf(Ext.CURRENT_USER.userRole)>-1) {
            var isPublicChkBox = absCmp.query('checkboxfield[itemId=Public]')[0];
            isPublicChkBox.boxLabel = searchCriteria.isPublic;
            isPublicChkBox.setVisible(true);
        }
    },
    onSearchWindowBeforeRender: function(abstractcomponent, options){
        var me = this;
        me.implementLanguage(abstractcomponent);
    },
    onBtnSearchSaveClick: function(button, e, eOpts) {
        var me = this, error = true, lang = Ext.LANG, msg = Ext.Msg,
            searchWin       = button.up('window'),
            parentGridCnt   = searchWin.parentGridCnt,
            formControl     = button.up('form'),
            form            = formControl.getForm(),
            datagrid_id     = searchWin.datagrid_id,
            filterData      = searchWin.filterRecords,
            text            = searchWin.query('textfield[itemId=SearchName]')[0].getValue(),
            customMenu      = searchWin.customMenu,
            menuIndex       = customMenu.items.length,
            totalSearchName = [], recentSearchName = [], filterCount = null,
            data            = {}, params = {};
        filterData.each(function(record){
            if(record.value=='' || record.value==null){
                filterCount++;
            }
            if(record.value!='' && record.value!=null) {
                var key = record.property;
                /*removes the alais from the property like t1.product_code to product_code*/
                var keyArray = key.split('.');
                if(keyArray.length>1) {
                   record.property = keyArray[1];
                }
                data[record.property] = record.value;
            }
        });
        
        recentSearchName.push(text);
        for (var i = 0; i < menuIndex; i++) {
            totalSearchName.push(customMenu.items[i].text)
        };
        if(me.in_array(recentSearchName, totalSearchName)) {
            error = true;
        }else {
            error = false;
        } 
        var is_public       = 'is_public' in form.getValues() ? form.getValues().is_public :0,
            show_template   = 'show_template' in form.getValues() ? form.getValues().show_template :0,
            search_name     = 'search_name' in form.getValues() ? form.getValues().search_name :0;
            newRecordArray  = [{
                'is_public'         : is_public,
                'show_template'     : show_template,
                'search_name'       : search_name,
                'search_criteria'   : JSON.stringify(data),
                'datagrid_id'       : datagrid_id
            }];
        if(form.isValid() && error == false){
            Ext.Ajax.request({
                url     : 'bizlayer/search/gridSearchCriteriaSave',
                method  : 'POST',
                type    : 'json',
                params  : {
                    'newRecords'        : JSON.stringify(newRecordArray),
                    'grid_header_search': true,
                    'datagrid_id'       : datagrid_id
                },
                scope   : searchWin,
                success:function(response){
                    var searchWin = this,
                        parentGridCnt = searchWin.parentGridCnt,
                        resp = Ext.decode(response.responseText);
                    if(resp.success) {
                        var searchList = resp.data.searchList,
                            tempSearchDataView = parentGridCnt.query('dataview[itemId=tempSearchDataView]')[0],
                            tempSearchDataViewStore = tempSearchDataView.getStore();
                        tempSearchDataViewStore.loadRawData(resp.data.searchTemplateData);
                        YBase.utility.SearchHelper.updateSearchMenuBtn(parentGridCnt,searchList);
                        searchWin.close();
                    }else {
                        Ext.Msg.show({
                            title: lang.globalLang.app.appTitle,
                            msg:   lang.globalLang.errorMsg.duplicateEntry,
                            modal: true,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                },
                failure:function(form, action){
                    Ext.Msg.show({
                        title: lang.globalLang.app.appTitle,
                        msg:   lang.globalLang.errorMsg.duplicateEntry,
                        modal: true,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            });
        }else{
            if (error == true) {
                Ext.Msg.show({
                    title: lang.globalLang.app.appTitle,
                    msg:   lang.globalLang.errorMsg.duplicateEntry,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }else{
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

    onBtnSearchCancelClick: function(button, e, eOpts) {
        button.up('window').close();
    },

    init: function(application) {
        this.control({
            'searchWindow':{
                beforerender: this.onSearchWindowBeforeRender
            },
            "#btnSearchSave": {
                click: this.onBtnSearchSaveClick
            },
            "#btnSearchCancel": {
                click: this.onBtnSearchCancelClick
            }
           
        });
    }

});