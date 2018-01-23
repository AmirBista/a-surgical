Ext.define('YBase.controller.SearchEditController', {
    extend: 'Ext.app.Controller',

    refs: [
    {
        ref: 'searchEditWindow',
        selector: 'searchEditWindow'
    }
    ],
    changeFlag:false,
    renderDragAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn = '<div class="move_action_selected move_action_unselected mi-action-move-btn">  </div>';
        return btn;
    },
    /*grid-updown-icon renderer*/
    GridUpDownButtonRender:function(value, metaData, record, rowIndex, colIndex, store, view)   {
        var htm = '<div  class="moveDown mi-moveDown-icon   cursor-hand" >   </div>';
        htm += '<div  class="moveUp mi-moveUp-icon   cursor-hand" > </div>';
        return htm;
    },
    /*delete icon renderer*/ 
    renderAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn = '';
        if(Ext.CURRENT_USER.user_id == record.get('user_id') || Ext.CURRENT_USER.is_super_user) {
            btn = '<div  class="btn_row_del">  </div>';
        }
        return btn;
    },
    renderSystemFlagCol: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var systemFlagIcon = '';
        if(Ext.CURRENT_USER.user_id == record.get('user_id')) {
            if(value == 0) {
                systemFlagIcon = '<div  class="system-flag print-type-not-checked">  </div>';
            }else {
                systemFlagIcon = '<div  class="system-flag print-type-checked">  </div>';
            }
        }
        return systemFlagIcon;
    },
    renderIsPublicCol: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var checkUncheckIcon = '';
        if(Ext.CURRENT_USER.user_id == record.get('user_id') || Ext.CURRENT_USER.is_super_user) {
            if(value == 0) {
                checkUncheckIcon =  '<div  class="is-public print-type-not-checked">  </div>';
            }else {
                checkUncheckIcon =  '<div  class="is-public print-type-checked">  </div>';
            }
        }
        return checkUncheckIcon;
    },
    renderShowTemplateCol: function(value, metaData, record, rowIndex, colIndex, store, view) {
        var showTemplateIcon = '';
        if(Ext.CURRENT_USER.user_id == record.get('user_id') || Ext.CURRENT_USER.is_super_user) {
            if(value == 0) {
                showTemplateIcon = '<div  class="show-template print-type-not-checked">  </div>';
            }else {
                showTemplateIcon = '<div  class="show-template print-type-checked">  </div>';
            }
        }
        return showTemplateIcon;
    },
    modifyWindow: function(absCmp) {
        var me = this, 
            searchCriteriaGrid = absCmp.query('grid[itemId=searchCriteriaGrid]')[0];
        absCmp.query('button[itemId=btnAdd]')[0].enable(true);
        searchCriteriaGrid.query('gridcolumn[itemId=moveColSelected]')[0].renderer = me.renderDragAction;
        // searchCriteriaGrid.query('gridcolumn[itemId=displayCol]')[0].renderer = me.GridUpDownButtonRender;
        // searchCriteriaGrid.query('gridcolumn[itemId=systemFlagCol]')[0].renderer = me.renderSystemFlagCol;
        searchCriteriaGrid.query('gridcolumn[itemId=isPublicCol]')[0].renderer = me.renderIsPublicCol;
        searchCriteriaGrid.query('gridcolumn[itemId=showTemplateCol]')[0].renderer = me.renderShowTemplateCol;
        searchCriteriaGrid.query('gridcolumn[itemId=removeAction]')[0].renderer = me.renderAction;
        // var ddPlugin = searchCriteriaGrid.getView().getPlugin('ddPlugin');
        // ddPlugin.enableDrag=true;
    },
    implementLanguage: function(absCmp){
        var lang = Ext.LANG.globalLang.buttons,
            searchEditCriteria = Ext.LANG.globalLang.searchEditCriteria;

        absCmp.setTitle(searchEditCriteria.winTitle);
        absCmp.query('button[itemId=btnAdd]')[0].setText(lang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(lang.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(lang.btnCancel);
        absCmp.query('gridcolumn[itemId=moveColSelected]')[0].setText(searchEditCriteria.moveColSelected);
        absCmp.query('gridcolumn[itemId=usernameCol]')[0].setText(searchEditCriteria.usernameCol);
        absCmp.query('gridcolumn[itemId=searchNameCol]')[0].setText(searchEditCriteria.searchNameCol);
        absCmp.query('gridcolumn[itemId=searchCriteriaCol]')[0].setText(searchEditCriteria.searchCriteriaCol);
        // absCmp.query('gridcolumn[itemId=displayCol]')[0].setText(searchEditCriteria.displayCol);
        // absCmp.query('gridcolumn[itemId=systemFlagCol]')[0].setText(searchEditCriteria.systemFlagCol);
        absCmp.query('gridcolumn[itemId=isPublicCol]')[0].setText(searchEditCriteria.isPublicCol);
        absCmp.query('gridcolumn[itemId=showTemplateCol]')[0].setText(searchEditCriteria.showTemplateCol);
        absCmp.query('gridcolumn[itemId=removeAction]')[0].setText(searchEditCriteria.removeAction);
    },
    onSearchEditWindowBeforeRender: function(absCmp, options){
        var me = this,
            grid = absCmp.query('grid[itemId=searchCriteriaGrid]')[0],
            cellEditingPlugin = grid.getPlugin('plgGridListCellEditing');
        cellEditingPlugin.on('beforeedit',me.onCellEditingPluginBeforeedit,me);
        me.implementLanguage(absCmp);
        me.modifyWindow(absCmp);
        me.datagrid_id = absCmp.datagrid_id;
        me.loadGrid(absCmp);
    },
    onCellEditingPluginBeforeedit: function(editor,e) {
        var me = this,
            record = e.record;
        if(record.get('user_id') != Ext.CURRENT_USER.user_id && record.get('user_id') != 1) {
            return false
        }
    },
    loadGrid: function(absCmp) {
        var me = this,
            searchCriteriaGrid = absCmp.query('grid[itemId=searchCriteriaGrid]')[0],
            searchCriteriaGridStore = searchCriteriaGrid.getStore();
        searchCriteriaGridStore.on('beforeload',me.onSearchCriteriaGridStoreBeforeLoad,me);
        searchCriteriaGridStore.load();
    },
    onSearchCriteriaGridStoreBeforeLoad: function(store, operation, eOpts) {
        var me = this,
            extra_params = store.getProxy().extraParams;
        extra_params['datagrid_id'] = me.datagrid_id;
    },
    onSearchCriteriaGridItemClick: function(gridview,record,item,index,e,eOpts) {
        var me = this,
            gridStore = gridview.up('grid').getStore();
        if(e.getTarget('.is-public') && e.getTarget('.print-type-checked')) {
            record.set('is_public',0);
        }
        if(e.getTarget('.is-public') && e.getTarget('.print-type-not-checked')) {
            record.set('is_public',1);
        }
        if(e.getTarget('.show-template') && e.getTarget('.print-type-checked')) {
            record.set('show_template',0);
        }
        if(e.getTarget('.show-template') && e.getTarget('.print-type-not-checked')) {
            record.set('show_template',1);
        }
        if (e.getTarget('.btn_row_del')){
            record.set('delete_flg','1');
            gridStore.remove(record);
        }
    },
    onBtnAddClick: function(button, e, eOpts) {
        var me                          = this,
            win                         = button.up('window'),
            searchCriteriaGrid          = win.query('grid[itemId=searchCriteriaGrid]')[0],
            searchCriteriaGridStore     = searchCriteriaGrid.getStore(),
            rowEditing                  = searchCriteriaGrid.getPlugin('plgGridListCellEditing'),
            row                         = Ext.create(searchCriteriaGrid.store.model);
        row.set({
            'user_id'       : Ext.CURRENT_USER.user_id,
            'is_public'     : 0,
            'show_template' : 0,
            'datagrid_id'   : win.datagrid_id
        });
        searchCriteriaGridStore.add(row);
        var idx = searchCriteriaGridStore.indexOf(row);
        rowEditing.startEditByPosition({
            row: idx,
            column: 2
        });
    },
    onBtnSaveClick: function(button, e, eOpts) {
        var me = this,
            win = button.up('window'),
            grid = win.query('grid[itemId=searchCriteriaGrid]')[0],
            gridStore = grid.getStore();
            modifiedRecords = gridStore.getModifiedRecords(),
            deletedRecords = gridStore.getRemovedRecords(),
            newRecordArray = [],
            modifiedRecordArray = [],
            deletedRecordArray = [],
            params={},
            writer = gridStore.getProxy().writer;
                
        if(!Ext.isEmpty(modifiedRecords)) {
            for(var i=0;i<modifiedRecords.length;i++) {
                if(!Ext.isEmpty(modifiedRecords[i].get('search_id'))) {
                    modifiedRecordArray.push(writer.getRecordData(modifiedRecords[i]));
                } else {
                    newRecordArray.push(writer.getRecordData(modifiedRecords[i]));
                }
            }
        }
        if(!Ext.isEmpty(deletedRecords)) {
            for(var i=0;i<deletedRecords.length;i++) {
                deletedRecordArray.push(deletedRecords[i].get('search_id'));
            }
        }
        if(Ext.isEmpty(newRecordArray) && Ext.isEmpty(modifiedRecordArray) && Ext.isEmpty(deletedRecordArray)) {
            Ext.Msg.show({
                title: Ext.LANG.globalLang.app.appTitle,
                msg:   Ext.LANG.globalLang.alertMsg.noDataChanges,
                modal: true,
                icon: Ext.Msg.ERROR,
                buttons: Ext.Msg.OK
            });  
            return; 
        }
        params['datagrid_id']       = win.datagrid_id;
        params['deletedRecords']    = JSON.stringify(deletedRecordArray);
        params['modifiedRecords']   = JSON.stringify(modifiedRecordArray);
        params['newRecords']        = JSON.stringify(newRecordArray);
        Ext.Ajax.request({
            url: gridStore.getProxy().api.update,
            method: 'POST',
            params:params,
            scope: me,
            success: function(response) {
                var me = this,
                    win = me.getSearchEditWindow(),
                    grid = win.query('grid[itemId=searchCriteriaGrid]')[0],
                    gridStore = grid.getStore();
                me.changeFlag = true;
                var resp = Ext.decode(response.responseText)
                if(resp.success) {
                    gridStore.load();
                }else {
                    Ext.Msg.show({
                        title: Ext.LANG.globalLang.app.appTitle,
                        msg:   Ext.LANG.globalLang.errorMsg.saveError,
                        modal: true,
                        icon: Ext.Msg.ERROR,
                        buttons: Ext.Msg.OK
                    });
                }
            },
            failure: function(response) {
                Ext.Msg.show({
                    title: lang.globalLang.app.appTitle,
                    msg:   lang.globalLang.errorMsg.saveError,
                    modal: true,
                    icon: Ext.Msg.ERROR,
                    buttons: Ext.Msg.OK
                });
            }
        });
    },
    onBtnCancelClick: function(button, e, eOpts) {
        button.up('window').close();
    },
    onSearchEditWindowBeforeclose: function(win, eOpts) {
        var me              = this,
            parentGridCnt   = win.parentGridCnt,
            datagrid_id     = win.datagrid_id;

        if(me.changeFlag) {
            Ext.Ajax.request({
                url     : 'bizlayer/search/getAllSerachCriteria',
                method  : 'POST',
                params  : {'datagrid_id':datagrid_id,'grid_win_search':true},
                scope   : parentGridCnt,
                success : function(response) {
                    var parentGridCnt = this,
                        resp = Ext.decode(response.responseText),
                        searchList = resp.data.searchList;
                    if(resp.success) {
                        var tempSearchDataView = parentGridCnt.query('dataview[itemId=tempSearchDataView]')[0],
                            tempSearchDataViewStore = tempSearchDataView.getStore();
                        tempSearchDataViewStore.loadRawData(resp.data.searchTemplateData);
                        YBase.utility.SearchHelper.updateSearchMenuBtn(parentGridCnt,searchList);
                    }
                }
            });
        }
        me.changeFlag = false;
    },
    init: function(application) {
        this.control({
            'searchEditWindow':{
                beforerender: this.onSearchEditWindowBeforeRender,
                beforeclose: this.onSearchEditWindowBeforeclose
            },
            'searchEditWindow grid[itemId=searchCriteriaGrid]':{
                itemclick: this.onSearchCriteriaGridItemClick
            },
            "searchEditWindow button[itemId=btnAdd]": {
                click: this.onBtnAddClick
            },
            "searchEditWindow button[itemId=btnSave]": {
                click: this.onBtnSaveClick
            },
            "searchEditWindow button[itemId=btnCancel]": {
                click: this.onBtnCancelClick
            }           
        });
    }

});