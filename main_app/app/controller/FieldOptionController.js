Ext.define('YBase.controller.FieldOptionController', {
    extend: 'Ext.app.Controller',
    id: 'FieldOptionController',
    absCmp:null,
    refs:[
        {
            ref: 'fieldOptionWindow',
            selector: 'fieldOptionWindow'
        }
    ],
    currentFieldOptRecord:null,
    previousFieldOptRecord:null,
    currentFieldId:null,
    setting_cfg:null,
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
        var btn = '<div  class="btn_row_del">  </div>';
        return btn;
    },
    languageImplementation: function(absCmp){
        var me=this,
            fieldOptionWindowLang=Ext.LANG.fieldOptionWindow,
            setting_cfg = absCmp.setting_cfg;
        absCmp.setTitle(fieldOptionWindowLang.WinTitle);
        // absCmp.query('textfield[itemId=fieldOptionNameDisplayFld]')[0].setFieldLabel(fieldOptionWindowLang.fieldOptionNameDisplayFld);
        absCmp.query('gridcolumn[itemId=moveColSelected]')[0].setText(fieldOptionWindowLang.moveColSelected);
        absCmp.query('gridcolumn[itemId=fieldOptionDataCol]')[0].setText(fieldOptionWindowLang.fieldOptionDataCol);
        absCmp.query('gridcolumn[itemId=displayCol]')[0].setText(fieldOptionWindowLang.displayCol);
        absCmp.query('gridcolumn[itemId=removeAction]')[0].setText(fieldOptionWindowLang.removeAction);

        absCmp.query('button[itemId=btnAdd]')[0].setText(fieldOptionWindowLang.btnAdd);
        absCmp.query('button[itemId=btnSave]')[0].setText(fieldOptionWindowLang.btnSave);
        absCmp.query('button[itemId=btnCancel]')[0].setText(fieldOptionWindowLang.btnCancel);
        // absCmp.query('displayfield[itemId=fieldOptionNameDisplayFld]')[0].setValue(fieldOptionWindowLang.fieldOptionNameDisplayFld);
    },
    onFieldOptionWindowBeforeRender: function(absCmp,eOpts) {
    	var me = this,
    		fieldOptIdTxtFld = absCmp.query('hiddenfield[itemId=fieldOptionIdTxtFld]')[0],
            fieldOptionNameDisplayFld = absCmp.query('displayfield[itemId=fieldOptionNameDisplayFld]')[0],
    		fieldOptDataGrid = absCmp.query('grid[itemId=fieldOptionDataGrid]')[0],
            fieldOptDataGridStore = fieldOptDataGrid.getStore();
        // debugger;
        me.setting_cfg = absCmp.setting_cfg;
        absCmp.responseObj = null;
        absCmp.record_updated = false;
        fieldOptIdTxtFld.setValue(me.setting_cfg.field_option_id);
        fieldOptionNameDisplayFld.setValue(me.setting_cfg.field_option_name);
        me.currentFieldId = fieldOptIdTxtFld.getValue();
        me.modifyWindow(absCmp);
        fieldOptDataGridStore.on('load',me.onFieldOptDataGridStoreLoad,me);
    	fieldOptDataGridStore.load({params:{'field_option_id':me.setting_cfg.field_option_id}});
        fieldOptDataGrid.on('beforeedit',me.fieldOptDataGridBeforeEdit,me); 
        // fieldOptDataGrid.query('gridcolumn[itemId=removeAction]')[0].setVisible(false);
    	me.languageImplementation(absCmp);
    },
    onFieldOptDataGridStoreLoad: function(store,records) {
        var me = this;
            win = me.getFieldOptionWindow(),
            fieldOptionDataGrid = win.query('grid[itemId=fieldOptionDataGrid]')[0],
            fieldOptionDataDesp = win.query('textareafield[itemId=fieldOptionDataDesp]')[0];
        fieldOptionDataDesp.setValue(null);
        if (!Ext.isEmpty(records) && records.length > 0) {
            fieldOptionDataGrid.getSelectionModel().select(0, true);
        }
    },
    fieldOptDataGridBeforeEdit: function(editor, e) {
        var me = this,
            win = me.getFieldOptionWindow();
        if(!win.setting_cfg.edit_role) {
            return false;
        }
    },
    modifyWindow: function(absCmp) {
        var me = this, 
            fieldOptDataGrid = absCmp.query('grid[itemId=fieldOptionDataGrid]')[0];
        if(me.setting_cfg.delete_role) {
            fieldOptDataGrid.query('gridcolumn[itemId=removeAction]')[0].renderer = me.renderAction;
        }
        if(me.setting_cfg.new_role) {
            absCmp.query('button[itemId=btnAdd]')[0].enable(true);
            fieldOptDataGrid.query('gridcolumn[itemId=displayCol]')[0].renderer = me.GridUpDownButtonRender;
            fieldOptDataGrid.query('gridcolumn[itemId=moveColSelected]')[0].renderer = me.renderDragAction;
            return;
        }
        if(me.setting_cfg.edit_role) {
            fieldOptDataGrid.query('gridcolumn[itemId=displayCol]')[0].renderer = me.GridUpDownButtonRender;
            fieldOptDataGrid.query('gridcolumn[itemId=moveColSelected]')[0].renderer = me.renderDragAction;
        }else {
            var ddPlugin = fieldOptDataGrid.getView().getPlugin('ddPlugin');
            ddPlugin.enableDrag=false;
        }
    },
    onFieldOptDataGridSelChange: function(gridView, selected, eOpts) {
    	if(Ext.isEmpty(selected)) {
            return;
        }
        var me=this,
            fieldOptWin=me.getFieldOptionWindow(),
            fieldOptionDataDesp = fieldOptWin.query('textareafield[itemId=fieldOptionDataDesp]')[0],
            record = selected[0];
        if(Ext.isEmpty(me.currentFieldOptRecord)) {
            me.currentFieldOptRecord=record;
        }else {
            me.previousFieldOptRecord =  me.currentFieldOptRecord;
            me.currentFieldOptRecord = record;
        }
        fieldOptionDataDesp.setValue(record.get('description'));
    },
    onFieldOptionDataDespBlur: function(textareafield, e, eOpts) {
        var me = this
        me.currentFieldOptRecord.set('description',textareafield.getValue());
    },
    onBtnAddClick: function(button,e,eOpts) {
        var me=this,
            fieldOptWin=me.getFieldOptionWindow(),
            fieldOptDataGrid = fieldOptWin.query('grid[itemId=fieldOptionDataGrid]')[0],
            fieldOptDataGridStore=fieldOptDataGrid.getStore(),
            rowEditing = fieldOptDataGrid.getPlugin('plgGridListCellEditing'),
            row = Ext.create(fieldOptDataGrid.store.model);
        row.set('field_option_id',me.currentFieldId);
        fieldOptDataGridStore.add(row);
        var idx = fieldOptDataGridStore.indexOf(row);
        rowEditing.startEditByPosition({
            row: idx,
            column: 1
        });
    },
    onBtnSaveClick: function(button,e,eOpts) {
        var me = this,i=1,error=false,
            fieldOptWin=me.getFieldOptionWindow(),
            fieldOptDataGrid = fieldOptWin.query('grid[itemId=fieldOptionDataGrid]')[0],
            fieldOptDataGridStore=fieldOptDataGrid.getStore(),
            removedRecords = fieldOptDataGridStore.getRemovedRecords(),
            data = [];

        fieldOptDataGridStore.each( function(record){
            if(Ext.isEmpty(record.get('name'))) {
                Ext.Msg.show({
                    title: Ext.LANG.globalLang.app.appTitle,
                    msg:   Ext.LANG.globalLang.alertMsg.emptyField,
                    modal: true,
                    icon: Ext.Msg.INFO,
                    buttons: Ext.Msg.OK
                });
                error = true;
            }
            record.set('display_order',i);
            data.push(record.data);
            i++;
        });
        for(var j=0;j<removedRecords.length;j++) {
            data.push(removedRecords[j].data);
        };
        var params = fieldOptDataGridStore.proxy.extraParams || {};
        params['field_option_id'] = fieldOptWin.setting_cfg.field_option_id;
        params['from_order_master_entry'] = 1;
        params['data'] = JSON.stringify(data);
        fieldOptDataGridStore.proxy.extraParams = params;
        if(!error) {
            Ext.Ajax.request({
                url: 'bizlayer/fieldOption/gridUpdate',
                method: 'POST',
                params:params,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if (resp.success === true) {
                        fieldOptWin.responseObj = resp;
                        fieldOptWin.record_updated = true;
                        // fieldOptWin.setting_combo.getStore().loadData(resp.comboStoreData.data);
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.globalLang.successMsg.saveSuccess,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        fieldOptDataGridStore.load();
                    }else {
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.globalLang.errorMsg.saveError,
                            modal: true,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            });

            /*fieldOptDataGridStore.sync({
                success: function(response) {
                    var resp = Ext.decode(response.operations[0].response.responseText);
                    if (resp.success === true) {
                        fieldOptWin.responseObj = resp;
                        fieldOptWin.record_updated = true;
                        // fieldOptWin.setting_combo.getStore().loadData(resp.comboStoreData.data);
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.globalLang.successMsg.saveSuccess,
                            modal: true,
                            icon: Ext.Msg.INFO,
                            buttons: Ext.Msg.OK
                        });
                        fieldOptDataGridStore.load();
                    }else {
                        Ext.Msg.show({
                            title: Ext.LANG.globalLang.app.appTitle,
                            msg:   Ext.LANG.globalLang.errorMsg.saveError,
                            modal: true,
                            icon: Ext.Msg.ERROR,
                            buttons: Ext.Msg.OK
                        });
                    }
                }
            }); */
        }
        
    },
    /*moves record from template grid to default grid*/
    onFieldOptionDataGridItemClick: function(gridView, record, item, index, e, options) {
        var me = this,
            win = me.getFieldOptionWindow(),
            selected = win.query('grid[itemId=defaultFieldPanelGrid]')[0],
            unselected = win.query('grid[itemId=fieldOptionDataGrid]')[0],
            store = unselected.getStore()
        if (e.getTarget('.btn_row_del')){
            record.set('description',null);
            record.set('delete_flg','1');
            store.remove(record);
        }
        else if(e.getTarget('.moveDown')){
            this.reorderGridSelectedRow(unselected,1);
        }
        else if(e.getTarget('.moveUp')){
            this.reorderGridSelectedRow(unselected,-1);
        }
    },
    reorderGridSelectedRow:function (grid, direction) {
        var records = grid.getSelectionModel().selected.items;
        var record = null;
        var nextRecord = null;
        if (records.length > 0)
            record = records[records.length-1];

        if (!record) {
            return;
        }
        var index = grid.getStore().indexOf(record);
        if (direction < 0) {
            index--;
            if (index < 0) {
                return;
            }

        } else {
            index++;
            if (index >= grid.getStore().getCount()) {
                return;
            }
        }
        nextRecord =grid.getStore().getAt(index);
        grid.getStore().remove(record);
        grid.getStore().insert(index, record);
        grid.getSelectionModel().select(record, false, true);
    },
    onBtnCancelClick: function(button,e,eOpts) {
        var me = this,
            win = button.up('window');
        win.close();
    },
    init: function(application) {
        var me=this;
        me.control({
            "fieldOptionWindow": {
                beforerender: me.onFieldOptionWindowBeforeRender
            },
            "fieldOptionWindow grid[itemId=fieldOptionDataGrid]": {
            	selectionchange: me.onFieldOptDataGridSelChange,
                itemclick: me.onFieldOptionDataGridItemClick              
            },
            "fieldOptionWindow textareafield[itemId=fieldOptionDataDesp]": {
                blur: me.onFieldOptionDataDespBlur
            },
            "fieldOptionWindow button[itemId=btnAdd]": {
                click: me.onBtnAddClick
            },
            "fieldOptionWindow button[itemId=btnSave]": {
                click: me.onBtnSaveClick
            },
            "fieldOptionWindow button[itemId=btnCancel]": {
                click: me.onBtnCancelClick
            }
        });
        this.callParent(arguments);
    }
});
