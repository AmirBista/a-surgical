Ext.define('YBase.controller.DatagridTemplateController', {
    extend: 'Ext.app.Controller',
    alias: 'widget.datagridTemplateWindow',
    views: [
        'DatagridTemplateWindow'
    ],
    refs: [
        {
            ref: 'datagridTemplateWindow',
            selector: 'datagridTemplateWindow'
        }
    ],
    datagrid_id:0,
    datagrid_template_id:0,
    saveAsForm:null,
    updateStatus:null,
    /*arrow-move-icon renderer*/
    renderMapped: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn;
        btn = '<div class="select move-right"> </div>';
        return btn;
    },
    renderDragAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn = '<div class="move_action_selected move_action_unselected mi-action-move-btn">  </div>';
        return btn;
    },
    renderMoveAction: function (value, metaData, record, rowIndex, colIndex, store, view) {
        var btn='';
        if(record.get('system_field_flg') == 0) {
            btn = '<div class="move-left">  </div>';
        }
        return btn;
    },
    hideShowRenderer: function(value, metaData, record, rowIndex, colIndex, store, view) {
        if(record.get('hidden') == 1) {
            return '<div class="hidden-ico">  </div>';
        }
        else {
            return '<div class="visible-ico"> </div>';
        }
    },
    /*grid-updown-icon renderer*/
    GridUpDownButtonRender:function(value, metaData, record, rowIndex, colIndex, store, view)   {
        var htm = '<div  class="moveDown mi-moveDown-icon   cursor-hand" >   </div>';
        htm += '<div  class="moveUp mi-moveUp-icon   cursor-hand" > </div>';
        return htm;
    },
    ColumnLockRender:function(value, metaData, record, rowIndex, colIndex, store, view)   {
       if(record.get('locked') == true) {
            return '<div class="column-locked">  </div>';
        }
        else {
            return '<div class="column-unlocked"> </div>';
        }
    },
    implementLanguage:function(abstractcomponent){
        var me=this,
            lang=Ext.LANG;
        abstractcomponent.setTitle(lang.datagridTemplate.winTitle);
        abstractcomponent.query('combobox[itemId=panelNameCombo]')[0].setFieldLabel(lang.datagridTemplate.panelNameCombo);
        abstractcomponent.query('combobox[itemId=datagridTemplateCombo]')[0].setFieldLabel(lang.datagridTemplate.datagridTemplateCombo);
        abstractcomponent.query('button[itemId=btnUpdateDatagridTemplate]')[0].setText(lang.datagridTemplate.btnUpdateDatagridTemplate);
        abstractcomponent.query('button[itemId=btnSaveAsDatagridTemplate]')[0].setText(lang.datagridTemplate.btnSaveAsDatagridTemplate);
        abstractcomponent.query('gridcolumn[itemId=leftGridFieldName]')[0].setText(lang.datagridTemplate.leftGridDatagridName);
        abstractcomponent.query('gridcolumn[itemId=rightGridFieldName]')[0].setText(lang.datagridTemplate.leftGridDatagridName);
        abstractcomponent.query('gridcolumn[itemId=columnHideShow]')[0].setText(lang.datagridTemplate.columnHideShow);
        abstractcomponent.query('gridcolumn[itemId=removeAction]')[0].setText(lang.datagridTemplate.remove);
        abstractcomponent.query('gridcolumn[itemId=removeColAction]')[0].setText(lang.datagridTemplate.removeCol);
        abstractcomponent.query('gridcolumn[itemId=displayCol]')[0].setText(lang.datagridTemplate.displayCol);
        abstractcomponent.query('gridcolumn[itemId=columnLock]')[0].setText(lang.datagridTemplate.columnLock);
        abstractcomponent.query('gridcolumn[itemId=displayOrderColumn]')[0].setText(lang.datagridTemplate.displayOrderColumn);
        abstractcomponent.query('gridcolumn[itemId=columnLock]')[0].setText(lang.datagridTemplate.columnLock);
        abstractcomponent.query('button[itemId=btnDatagridTemplateCancel]')[0].setText(lang.globalLang.buttons.btnCancel);
        abstractcomponent.query('button[itemId=btnDatagridTemplateApply]')[0].setText(lang.globalLang.buttons.btnSelect);
        abstractcomponent.query('checkbox[itemId=isPublicDatagridTemp]')[0].boxLabel = lang.datagridTemplate.isPublic;
        abstractcomponent.query('label[itemId=DatagridTemplatesHelpLabel]')[0].setText(lang.datagridTemplate.datagridTemplateHelp);
    },
    onTemplateComboStoreLoad:function(store, records, success) {
        var me = this;
        if (!Ext.isEmpty(me.datagrid_template_id)){
            me.datagrid_template_id = Ext.String.format("{0}",me.datagrid_template_id);
        }
        if(success == true) {
            var w1 = me.getDatagridTemplateWindow(),
            cbo = w1.query('combo[itemId=datagridTemplateCombo]')[0],
            chkBox = w1.query('checkbox[itemId=isPublicDatagridTemp]')[0],
            defaultDatagridPanelGrid = w1.query('grid[itemId=defaultDatagridPanelGrid]')[0],
            datagridTemplatePanelGrid = w1.query('grid[itemId=datagridTemplatePanelGrid]')[0],
            defaultDatagridPanelGridStore = defaultDatagridPanelGrid.getStore(),
            datagridTemplatePanelGridStore = datagridTemplatePanelGrid.getStore();

            // console.log('datagrid_template_id', me.datagrid_template_id, cbo.findRecordByValue(me.datagrid_template_id), records);
            cbo.setValue(me.datagrid_template_id);
            if(records.length>0) {
                var rec = cbo.findRecordByValue(me.datagrid_template_id);
                if (!Ext.isEmpty(rec) && Ext.isObject(rec) && rec.raw.is_public == 1){
                    chkBox.setValue(true);
                }
            }
            if(Ext.isEmpty(cbo.getValue())) {
                cbo.setValue(Ext.LANG.template.defaultTemplate);
                // w1.query('button[itemId=btnUpdateDatagridTemplate]')[0].disable();
                // w1.query('checkbox[itemId=isPublicDatagridTemp]')[0].disable();
            }
                
            /*loads the datagrid template grid*/
            datagridTemplatePanelGridStore.load({
                params:{
                    'datagrid_template_id':me.datagrid_template_id, 
                    'datagrid_id':me.datagrid_id,
                    'shownColId':JSON.stringify(shownColId)

                }
            });
             /*lodas the default grid*/
            defaultDatagridPanelGridStore.load({
                params:{
                    'datagrid_template_id':me.datagrid_template_id,
                    'datagrid_id':me.datagrid_id,
                    'shownColId':JSON.stringify(shownColId)
                }
            });
            shownColId = [];
        }
        else {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.alertMsg.failure);
        }
    },

    onDatagridTemplateWindowBeforeRender: function(abstractcomponent, eOpts) {
        var me = this,
            defaultDatagridGrid=abstractcomponent.query('grid[itemId=defaultDatagridPanelGrid]')[0],
            datagridTemplateGrid=abstractcomponent.query('grid[itemId=datagridTemplatePanelGrid]')[0],
            defaultDatagridGridStore = defaultDatagridGrid.getStore(),
            datagridTemplateGridStore = datagridTemplateGrid.getStore();
        defaultDatagridGridStore.clearData();
        datagridTemplateGridStore.clearData();
        me.implementLanguage(abstractcomponent);

        var panelNameCombo = abstractcomponent.query('combo[itemId=panelNameCombo]')[0],
            datagridTemplateCombo = abstractcomponent.query('combo[itemId=datagridTemplateCombo]')[0],
            defaultDatagridPanelGrid = abstractcomponent.query('grid[itemId=defaultDatagridPanelGrid]')[0],
            datagridTemplatePanelGrid = abstractcomponent.query('grid[itemId=datagridTemplatePanelGrid]')[0],
            defaultDatagridPanelGridStore = defaultDatagridPanelGrid.getStore(),
            datagridTemplatePanelGridStore = datagridTemplatePanelGrid.getStore(),
            datagridTemplateComboStore = datagridTemplateCombo.getStore();

        datagridTemplateCombo.clearValue();
        datagridTemplateComboStore.clearFilter();
        datagridTemplateComboStore.un('load');
        datagridTemplateComboStore.on('load', me.onTemplateComboStoreLoad, me);

        datagridTemplateComboStore.load({
            params:{datagrid_id:me.datagrid_id}
        });        

        /*sets the panel combo*/
        panelNameCombo.setValue(datagrid_id);
        panelNameCombo.disable(true);
         /*renderer functions*/
        defaultDatagridPanelGrid.query('gridcolumn[itemId=removeAction]')[0].renderer = me.renderMapped;
        datagridTemplatePanelGrid.query('gridcolumn[itemId=removeColAction]')[0].renderer = me.renderMoveAction;
        datagridTemplatePanelGrid.query('gridcolumn[itemId=moveColSelected]')[0].renderer = me.renderDragAction;
        datagridTemplatePanelGrid.query('gridcolumn[itemId=columnHideShow]')[0].renderer = me.hideShowRenderer;  
        datagridTemplatePanelGrid.query('gridcolumn[itemId=displayCol]')[0].renderer = me.GridUpDownButtonRender; 
        datagridTemplatePanelGrid.query('gridcolumn[itemId=columnLock]')[0].renderer = me.ColumnLockRender; 
    },

    
    showWindow:function(paramObj,department_id,datagridMenu) {
        var me = this,
            gridpnl = paramObj.gridCnt,
            gridItemId = gridpnl.gridItemId
            datagrid_id = gridpnl.gridNo,
            template_id = gridpnl.templateId,
            controller = paramObj.cntrl,
            columns = gridpnl.query('grid[itemId='+gridItemId+']')[0].columns,
            tabPanel = paramObj.absCmp,
            shownColId = [];
            me.datagrid_id = datagrid_id;
            me.datagrid_template_id = template_id;
        /*visible column's id array*/
         for(var j=0;j<columns.length;j++) {
            if(columns[j].hidden == false &&
                !Ext.isEmpty(columns[j].dataIndex) &&
                columns[j].itemId!='action_column' && 
                columns[j].colItemId!= "action_column" &&
                columns[j].xtype!="sno_col_renderer") {
                    shownColId.push(columns[j].table_field_id);
            }
        }
        /*if(gridpnl.xtype =="container") {
            tabPanel = gridpnl.findParentByType('container');
        }else if(gridpnl.xtype =="panel"){
            tabPanel = gridpnl.findParentByType('panel');
        }else {
            //do nth
        }*/
        var win = Ext.create('YBase.view.DatagridTemplateWindow',{
            'tabPanel':tabPanel,
            'datagrid_id':me.datagrid_id,
            // 'department_id':department_id,
            'gridpnl':gridpnl,
            'datagridMenu':datagridMenu,
            'datagrid_template_id': me.datagrid_template_id ,
            'controller':controller,
            'loadFn':paramObj.listDataFn,
            'paramObj':paramObj
        });
        win.show();
    },
    onDatagridTemplateComboSelect: function(combo, records, eOpts ) {
        var me = this;
        /*enter when there are datas in combo already else the saved temp name must be first one to be saved*/
        // if(oldValue !== undefined ) {
            updatBtn = me.getDatagridTemplateWindow().query('button[itemId=btnUpdateDatagridTemplate]')[0];
            if(updatBtn.disabled == true)
                updatBtn.enable();
            chkBox =  me.getDatagridTemplateWindow().query('checkbox[itemId=isPublicDatagridTemp]')[0];
            templateData = combo.getStore().data.items;
            for(var i=0;i<templateData.length;i++) {
                if(templateData[i].raw.datagrid_template_id == records[0].data.datagrid_template_id) {
                    if(templateData[i].raw.is_public == 0)
                        chkBox.setValue(false);
                    else 
                        chkBox.setValue(true);
                }
            }
            me.getStore('DatagridTemplatePanelStore').load({params:{datagrid_template_id:records[0].data.datagrid_template_id, datagrid_id:me.datagrid_id}});
            me.getStore('DefaultPanelDatagridStore').load({params:{datagrid_template_id:records[0].data.datagrid_template_id, datagrid_id:me.datagrid_id}});
        // }
        if(!Ext.isEmpty(records[0].data.datagrid_template_id))// !=Ext.LANG.template.defaultTemplate)
            me.datagrid_template_id = records[0].data.datagrid_template_id;
    },
    /*moves record from default grid to template grid*/
    onDefaultDatagridPanelGridItemClick: function(grid, record, item, index, e, options) {
        if (e.getTarget('.move-right')){
            var me = this,
                win = me.getDatagridTemplateWindow(),
                unselected = win.query('grid[itemId=defaultDatagridPanelGrid]')[0],
                selected = win.query('grid[itemId=datagridTemplatePanelGrid]')[0],
                index = selected.getStore().data.length;

            unselected.getStore().remove(record);
            selected.getStore().insert(index, record);
        }
    },
    /*moves record from template grid to default grid*/
    onDatagridTemplatePanelGridItemClick: function(grid, record, item, index, e, options) {
        var me = this,
            win = me.getDatagridTemplateWindow(),
            selected = win.query('grid[itemId=defaultDatagridPanelGrid]')[0],
            unselected = win.query('grid[itemId=datagridTemplatePanelGrid]')[0];
        if (e.getTarget('.move-left'))
        {
            var index = selected.getStore().data.length;
            unselected.getStore().remove(record);
            selected.getStore().insert(index, record);
        }    
        else if(e.getTarget('.moveDown')){
            this.reorderGridSelectedRow(unselected,1);
        }
        else if(e.getTarget('.moveUp')){
            this.reorderGridSelectedRow(unselected,-1);
        }
        else if(e.getTarget('.hidden-ico')) {
            record.set('hidden',0);
        }
        else if(e.getTarget('.visible-ico')) {
            record.set('hidden',1);
        }
        else if(e.getTarget('.column-locked')) {
            record.set('locked',false);
        }
        else if(e.getTarget('.column-unlocked')) {
            grid.getStore().each(function(record) {
                if(this.record.data.table_field_id == record.data.table_field_id) {
                    record.set('locked',true);
                }
                else {
                    record.set('locked',false);
                }
            },{'record':record});
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
    /*creates a new form panel to save new template*/
    onSaveAsDatagridTemplateBtnClick:function(button, e, eOpts) {
        var me = this,locked_column,
            win = me.getDatagridTemplateWindow(),
            datagridTemplatePanelGrid = win.query('grid[itemId=datagridTemplatePanelGrid]')[0],
            datagridTemplateCombo = win.query('combobox[itemId=datagridTemplateCombo]')[0],
            datagridTemplateComboStore = datagridTemplateCombo.getStore(),
            datagridTemplateComboStoreRange = datagridTemplateComboStore.getRange(),
            datagridTemplatePanelGridStore = datagridTemplatePanelGrid.getStore().getRange(),
            tempName = datagridTemplateCombo.rawValue,
            selected_array = [];
        if(datagridTemplateCombo.isValid() == false) {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.characterExceeds);
            return;
        }
        if(tempName == Ext.LANG.template.defaultTemplate) {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.tempNameExists);
            return;
        }
        for(var i=0;i<datagridTemplateComboStoreRange.length;i++) {
            template_name = datagridTemplateComboStoreRange[i].get('template_name');
            if(tempName == template_name) {
                Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.tempNameExists);
                return;
            }
        }
        /*checks if newly saved template has columns or not*/
        if(!Ext.isEmpty(datagridTemplatePanelGridStore)) {
            for (var j = 0; j < datagridTemplatePanelGridStore.length; j++) {
                if(datagridTemplatePanelGridStore[j].data.hidden == false) {
                    datagridTemplatePanelGridStore[j].data.hidden=0;
                }
                if(datagridTemplatePanelGridStore[j].data.locked == true) {
                    locked_column = datagridTemplatePanelGridStore[j].data.field_label
                }
                selected_array.push(datagridTemplatePanelGridStore[j].data);
            }
            checked = win.query('checkbox[itemId=isPublicDatagridTemp]')[0].checked;
            if(checked)
                isPublic=1;
            else
                isPublic=0;
            me.saveTempName(tempName, selected_array, isPublic, locked_column);
        }
        else {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.transferOneColumnAtleast);
        }
    },
    /*saves the new template*/
    saveTempName: function(tempName, selected_array, isPublic,locked_column) {
        var me = this,
            win = me.getDatagridTemplateWindow(),
            gridpnl = win.gridpnl,
            datagridMenu = win.datagridMenu,
            menuIndex = datagridMenu.items.length,
            panelNo = me.datagrid_id;
        Ext.Ajax.request({
            url:'bizlayer/datagridTemplate/saveTemplateName',
            params: {
                'datagrid_id': me.datagrid_id,
                'template_name': tempName,
                'isPublic': isPublic,
                'locked_column':locked_column,
                'selected_field': JSON.stringify(selected_array)
            },
            scope:win,
            success: function(response) {
                var resp = Ext.decode(response.responseText);
                me.datagrid_template_id = Ext.String.format("{0}",resp.data.datagrid_template_id);
                if(resp.data.is_public == 1) {
                    componentCls = ' template-menu  public-template'
                }
                else {
                    componentCls = ' template-menu  private-template'
                }
                var mnu ={
                    'xtype': 'menuitem',
                    'text':resp.data.template_name,
                    'iconCls': 'btn_search_remove',
                    'iconAlign': 'right',
                    'datagrid_template_id': resp.data.datagrid_template_id,
                    'cls':componentCls,
                    'width':200,
                    'isPublic':resp.is_public,
                    listeners:{
                        click:{
                            element: 'el', //bind to the underlying el property on the panel
                            fn: function(e, element, params){ 
                                paramObj = this.paramObj;
                                menuItems = this.menuitem.items;
                                datagrid_template_id = this.datagrid_template_id;
                                for(i=0;i<menuItems.length;i++) {
                                    if(datagrid_template_id == menuItems[i].datagrid_template_id) {
                                        button = menuItems[i];
                                        button['menuIndex']=i;
                                    }
                                    continue;
                                }
                                datagridMenu = this.menuitem;
                                YBase.utility.DatagridTemplateHelper.setDatagridTemplateName(e,paramObj,button,datagridMenu);
                            },
                            scope:{'paramObj':this.paramObj,'menuitem':datagridMenu,'datagrid_template_id': resp.data.datagrid_template_id},
                        }
                    }
                };
                datagridMenu.items.push(mnu);
                var menuBtn=(gridpnl.query('button[itemId=btnSaveTemplate1]')[0]);
                menuBtn.menu.add(mnu);
                updatBtn = this.query('button[itemId=btnUpdateDatagridTemplate]')[0];
                if(updatBtn.disabled == true)
                    updatBtn.enable();
                Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.successMsg.saveSuccess);
                me.loadDatagridTemplateCombo(this);
            },
            failure: function() {
                Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.errorMsg.saveError);
            }
        });
    },
    loadDatagridTemplateCombo: function(win) {
        var me = this,
            datagridTemplateCombo = win.query('combo[itemId=datagridTemplateCombo]')[0],
            datagridTemplateComboStore = datagridTemplateCombo.getStore();
        datagridTemplateComboStore.load({
            params:{datagrid_id:me.datagrid_id}
            /*scope: datagridTemplateCombo,
            callback: function(records,operation, success) {
                if(success == true) {
                    debugger;
                    this.setValue(records[records.length-1].get('datagrid_template_id'));
                }
            }*/
        });
    },
    onUpdateDatagridTemplateBtnClick: function(button, e, eOpts) {
        var me = this,is_public,locked_column,
            win = me.getDatagridTemplateWindow(),
            chkBox = win.query('checkbox[itemId=isPublicDatagridTemp]')[0],
            datagridTemplatePanelGrid = win.query('grid[itemId=datagridTemplatePanelGrid]')[0],
            datagridTemplatePanelGridStore = datagridTemplatePanelGrid.getStore().getRange(),
            defaultDatagridPanelGrid = win.query('grid[itemId=defaultDatagridPanelGrid]')[0],
            defaultDatagridPanelGridStore = defaultDatagridPanelGrid.getStore(),
            datagridTemplateCombo = win.query('combobox[itemId=datagridTemplateCombo]')[0],
            datagridTemplateComboStore = datagridTemplateCombo.getStore(),
            datagridTemplateComboStoreRange = datagridTemplateComboStore.getRange(),
            tempName = datagridTemplateCombo.rawValue,
            selected_array = [];
        if(datagridTemplateCombo.isValid() == false) {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.characterExceeds);
            return;
        }
        if(tempName == Ext.LANG.template.defaultTemplate) {
            if(!Ext.isEmpty(datagridTemplatePanelGridStore )) {
                for (var j = 0; j < datagridTemplatePanelGridStore.length; j++) {
                    if(datagridTemplatePanelGridStore[j].data.locked == true) {
                        locked_column = datagridTemplatePanelGridStore[j].data.field_label;
                        break;
                    }
                }
                Ext.Ajax.request({
                    url:'bizlayer/datagridTemplate/updateDefaultDatagridTemplate',
                    params: {
                        'datagrid_id':me.datagrid_id, 
                        'locked_column':locked_column,
                    },
                    scope:me,
                    success: function(response) {
                        var resp = Ext.decode(response.responseText);
                        if(resp.success == true) {
                            me.updateStatus=1;
                            // comboStore = me.getDatagridTemplateWindow().query('combobox[itemId=datagridTemplateCombo]')[0].getStore();
                            // comboStore.load({params:{'datagrid_id':me.datagrid_id}});
                            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.successMsg);
                        }
                        else {
                            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, resp.message);
                        }
                        
                    },
                    failure: function() {
                        Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.alertMsg.failure);
                    }
                });
            }
            // Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.tempNameExists);
            return;
        }
        for(var i=0;i<datagridTemplateComboStoreRange.length;i++) {
            template_name = datagridTemplateComboStoreRange[i].get('template_name');
            temp_id = datagridTemplateComboStoreRange[i].get('datagrid_template_id');
            if((template_name == tempName && temp_id != me.datagrid_template_id)) {
                Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.tempNameExists);
                return;
            }
        }
        if(!Ext.isEmpty(datagridTemplatePanelGridStore )) {
            for (var j = 0; j < datagridTemplatePanelGridStore.length; j++) {
                if(datagridTemplatePanelGridStore[j].data.hidden == false) {
                    datagridTemplatePanelGridStore[j].data.hidden=0;
                }
                if(datagridTemplatePanelGridStore[j].data.locked == true) {
                    locked_column = datagridTemplatePanelGridStore[j].data.field_label
                }
                selected_array.push(datagridTemplatePanelGridStore[j].data);
            }
            if(chkBox.checked == true)
                is_public=1;
            else
                is_public=0;
            Ext.Ajax.request({
                url:'bizlayer/datagridTemplate/updateDatagridTemplate',
                params: {
                    'datagrid_id':me.datagrid_id, 
                    'datagrid_template_id':me.datagrid_template_id, 
                    'is_public':is_public,
                    'locked_column':locked_column,
                    'template_name':tempName,
                    'selected_field': JSON.stringify(selected_array)
                },
                scope:me,
                success: function(response) {
                    var resp = Ext.decode(response.responseText);
                    if(resp.success == true) {
                        me.updateStatus=1;
                        comboStore = me.getDatagridTemplateWindow().query('combobox[itemId=datagridTemplateCombo]')[0].getStore();
                        comboStore.load({params:{'datagrid_id':me.datagrid_id}});
                        // defaultDatagridPanelGridStore.load({params:{datagrid_template_id:me.datagrid_template_id, datagrid_id:me.datagrid_id}});
                        // datagridTemplatePanelGrid.getStore().load({params:{datagrid_template_id:me.datagrid_template_id, datagrid_id:me.datagrid_id}});
                        Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, Ext.LANG.datagridTemplate.successMsg);
                    }
                    else {
                        Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle, resp.message);
                    }
                    
                },
                failure: function() {
                    Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.globalLang.alertMsg.failure);
                }
            });
        }
        else {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.datagridTemplate.transferOneColumnAtleast);
        }
    },
    onDatagridTemplateWindowClose: function(panel, eOpts) {
        var me = this,
            cntrl = panel.controller,
            loadFn = panel.loadFn,
            tabPanel = panel.tabPanel,
            panelNo = me.datagrid_id;
        // YBase.utility.DatagridTemplateHelper.globalDatagridTempId = me.datagrid_template_id;
        if(me.datagrid_template_id == panel.datagrid_template_id && me.updateStatus ==1) {
            YBase.utility.DatagridTemplateHelper.globalDatagridTempId = me.datagrid_template_id;
            // setTemplate = {datagridTempId:null};
            setTemplate = null;
            loadFn(cntrl,tabPanel,panel.datagrid_template_id,null,setTemplate);
            me.updateStatus=null;
        }
    },
    onDatagridTemplateApplyBtnClick: function(button,e,eOpts) {
        var me = this,
            panel = me.getDatagridTemplateWindow(),
            cntrl = panel.controller,
            loadFn = panel.loadFn,
            tabPanel = panel.tabPanel,
            panelNo = me.datagrid_id;
        YBase.utility.DatagridTemplateHelper.globalDatagridTempId = me.datagrid_template_id;
        //for default template column lock update
        var combo = panel.query('combo[itemId=datagridTemplateCombo]')[0],
            selectedValue = combo.getValue(),
            defaultTemplate = Ext.LANG.template.defaultTemplate;
        if(!Ext.isEmpty(me.datagrid_template_id) && 
            (me.datagrid_template_id != panel.datagrid_template_id ||
                (me.datagrid_template_id == panel.datagrid_template_id && me.updateStatus ==1))) 
        {
            /*datagridTempTd is set to null so that isSelected column is not updated*/
            var setTemplate = {};
            setTemplate = me.datagrid_template_id;
            // setTemplate = {datagridTempId:me.datagrid_template_id};
            // YBase.utility.GridHelper.setDatagridTemplateName(cntrl, panelNo);
            /*if(me.datagrid_template_id != panel.datagrid_template_id) {
                setTemplate = {datagridTempId:me.datagrid_template_id};
            }
            else {
                 setTemplate = {datagridTempId:null};
            }*/
            loadFn(cntrl,tabPanel,me.datagrid_template_id,null,setTemplate);
            // YBase.utility.DatagridTemplateHelper.saveTempDataGrid(me.datagrid_template_id, me.datagrid_id);
            me.updateStatus=null;
            panel.close();
        }else if(me.updateStatus ==1 && defaultTemplate == selectedValue) {
            loadFn(cntrl,tabPanel,null,null,null);
            me.updateStatus=null;
            panel.close();
        }
        else {
            Ext.MessageBox.alert(Ext.LANG.globalLang.app.appTitle,Ext.LANG.datagridTemplate.noChange);
        }
    },
    onDatagridTemplateCancelBtnClick: function(button, e, eOpts) {
        var me=this,
            panel = me.getDatagridTemplateWindow();
        panel.close();
    },
    init: function(application) {
        this.control({
            'datagridTemplateWindow':{
                beforerender: this.onDatagridTemplateWindowBeforeRender,
                close: this.onDatagridTemplateWindowClose
            },
            'datagridTemplateWindow combo[itemId=datagridTemplateCombo]': {
                select: this.onDatagridTemplateComboSelect
            },
            'datagridTemplateWindow button[itemId=btnSaveAsDatagridTemplate]': {
                click: this.onSaveAsDatagridTemplateBtnClick
            },
            'datagridTemplateWindow button[itemId=btnUpdateDatagridTemplate]': {
                click: this.onUpdateDatagridTemplateBtnClick
            },
             "datagridTemplateWindow grid[itemId=defaultDatagridPanelGrid]" :{
                itemclick: this.onDefaultDatagridPanelGridItemClick               
            },
            "datagridTemplateWindow grid[itemId=datagridTemplatePanelGrid]" :{
                itemclick: this.onDatagridTemplatePanelGridItemClick               
            },
            "datagridTemplateWindow button[itemId=btnDatagridTemplateCancel]" :{
                click: this.onDatagridTemplateCancelBtnClick               
            },
            "datagridTemplateWindow button[itemId=btnDatagridTemplateApply]" :{
                click: this.onDatagridTemplateApplyBtnClick               
            }
        });
    }
});