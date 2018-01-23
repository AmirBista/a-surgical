Ext.define('YBase.controller.BulkUpdateController', {
    extend: 'Ext.app.Controller',

    id: 'BulkUpdateController',
    comboSelectedFieldType:0,
    PanelId:null,
    LoadedPanelId:null,
    LoadedDatagridTempId:null,

    /*onBlukPanelBeforeRender: function(abstractcomponent, options) {
        var me = this,
            BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
            isHidden = BulkPanel.hidden;
        if(!isHidden) {
            if(me.PanelId == null) {
                me.PanelId = BulkPanel.panelId;
                YBase.utility.BulkUpdateHelper.getBulkupdateFieldComboLoad(BulkPanel);
            }
            else if(me.LoadedPanelId != BulkPanel.panelId || me.LoadedDatagridTempId !=BulkPanel.datagridTempId)
                YBase.utility.BulkUpdateHelper.getBulkupdateFieldComboLoad(BulkPanel);
            else {
                //do nth
            }
        }
    },*/
    onBulkPanelAfterRender: function(abstractcomponent, options) {
        var me = this,
            panelEl = abstractcomponent.getEl();
        panelEl.on("click", function(e, el) {
            if (e.getTarget(".bulkpanel-hide") || e.getTarget(".bulk-hide")) {
                abstractcomponent.setVisible(false);
                // grid.query('button[itemId=btnBulkUpdate]')[0].removeCls('active-btn');
            }
            else {
                //do  nth
            }
        });
    },  
    /*onBlukUpdatePanelExpand: function(p, eOpts) {
        var me = this;
        var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
        if(me.PanelId == null) {
            me.PanelId = BulkPanel.panelId;
            YBase.utility.BulkUpdateHelper.getBulkupdateFieldComboLoad(BulkPanel);
        }
        else if(me.LoadedPanelId != BulkPanel.panelId || me.LoadedDatagridTempId !=BulkPanel.datagridTempId)
            YBase.utility.BulkUpdateHelper.getBulkupdateFieldComboLoad(BulkPanel);
        else {
            //do nth
        }
    },*/
    onSelectedValuesGridItemClick: function(dataview, record, item, index, e, eOpts) {
        if (e.getTarget('.icons-delete'))
        {
            dataview.getStore().remove(record);
        }
    },

    generateCobo: function(myStore,comboId,displayField,tpl){
        var newCombo = Ext.create('Ext.form.ComboBox', {
                editable: false,
                forceSelection: true,
                displayField: displayField,
                store: myStore,
                valueField: displayField,
                emptyText: '',
                itemId: comboId,
                typeAhead: true,
                queryMode: 'local',
                margin: '0 80 0 10',
                tpl:tpl
            });
        return newCombo;
    },

    onFieldComboChange: function(field, newValue, oldValue, eOpts) {
        if (!Ext.isEmpty(newValue) && !Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0].isHidden()) {
            if(field.lastSelection[0].data.field_type_id == 7)
                this.comboSelectedFieldType = 7;
            this.getSelectedData();
            var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
            var Numberpan = BulkPanel.query('container[itemId=NumberPanel]')[0];
            var Datepan = BulkPanel.query('container[itemId=DatePanel]')[0];
            var Textpan = BulkPanel.query('container[itemId=TextPanel]')[0];

            var OptionheckBox = BulkPanel.query('radiofield[itemId=SpecifiedFormatCheckvalue]')[0];

            var NumberCont = BulkPanel.query('container[itemId=NumberCont]')[0];
            var DateCont = BulkPanel.query('container[itemId=DateCont]')[0];
            var TextCont = BulkPanel.query('container[itemId=TextCont]')[0];
            var ComboCont = BulkPanel.query('container[itemId=ComboCont]')[0];

            var optionCombo = BulkPanel.query('combobox[itemId=fieldOptCombo]')[0];

            if (typeof field.lastSelection[0] !=  'undefined') {

                var selectedFieldValue = field.lastSelection[0].data.field_type_id;
                this.comboSelectedFieldType =selectedFieldValue;

                OptionheckBox.setDisabled(false);
                if(selectedFieldValue==1){
                    Numberpan.setVisible(true);
                    Datepan.setVisible(false);
                    Textpan.setVisible(false);

                    NumberCont.setVisible(true);
                    DateCont.setVisible(false);
                    TextCont.setVisible(false);
                    ComboCont.setVisible(false);

                }else if(selectedFieldValue==7){
                    Numberpan.setVisible(false);
                    Datepan.setVisible(true);
                    Textpan.setVisible(false);
                    NumberCont.setVisible(false);
                    DateCont.setVisible(true);
                    TextCont.setVisible(false);
                    ComboCont.setVisible(false);
                }
                else if(selectedFieldValue>100){
                    OptionheckBox.setDisabled(true);
                    var store = Ext.create('Ext.data.Store', {
                        autoLoad: true,
                        fields: [field.lastSelection[0].data.value_column],
                        data : JSON.parse(field.lastSelection[0].data.field_data)
                    });
                    var combo = this.generateCobo(store,"fieldOptCombo",[field.lastSelection[0].data.value_column],null);
                    ComboCont.removeAll(true);
                    ComboCont.add(combo);
                    ComboCont.doLayout();

                    Numberpan.setVisible(false);
                    Datepan.setVisible(false);
                    Textpan.setVisible(false);

                    NumberCont.setVisible(false);
                    DateCont.setVisible(false);
                    TextCont.setVisible(false);
                    ComboCont.setVisible(true);
                }
                else{
                    Numberpan.setVisible(false);
                    Datepan.setVisible(false);
                    Textpan.setVisible(true);

                    NumberCont.setVisible(false);
                    DateCont.setVisible(false);
                    TextCont.setVisible(true);
                    ComboCont.setVisible(false);
                }
            }else{
                field.setValue("");
            }
        }
    },

    

    getSelectedData:function(){
        var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        var store = BulkPanel.dataStore;
        var grid = BulkPanel.activeGrid;
        var combo  = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
        var selItem =grid.getSelectionModel().selected;
        if (combo.value !==null) {
            if (selItem.length>0) {
                var SelectedFieldGrid = BulkPanel.query('gridpanel[itemId=SelectedFieldGrid]')[0];
                SelectedFieldGrid.getStore().removeAll();
                for (var j = 0; j < selItem.length; j++) {
                var store = SelectedFieldGrid.getStore();
                    var ind = store.getCount();
                    if (typeof combo.lastSelection[0] != 'undefined') {
                        if (this.comboSelectedFieldType ==7) {
                            newDate = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                            formatedDate = Ext.Date.format(newDate,'Y-m-d');
                            store.insert(ind, {'FieldSelectedValue':formatedDate});
                        }
                        else{
                            store.insert(ind, {'FieldSelectedValue':selItem.items[j].get(combo.lastSelection[0].data.column_name)});
                        }
                    }
                }
            }
        }
        var undoBtn  = BulkPanel.query('button[itemId=undo]')[0];
        undoBtn.setDisabled(true);
    },

    

    onSetButtonClick: function(button, e, eOpts) {
        var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        var store = BulkPanel.dataStore;
        var grid = BulkPanel.activeGrid;
        var combo  = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
        var selItem =grid.getSelectionModel().selected;
        var SelectedFieldGrid = BulkPanel.query('gridpanel[itemId=SelectedFieldGrid]')[0].getStore();
        var OptionheckBox = BulkPanel.query('radiofield[itemId=SpecifiedFormatCheckvalue]')[0];
        var selectedValue =null;
        var isMoreOption = OptionheckBox.lastValue;
        if (Ext.isEmpty(combo.value)) {
            return;
        }
        if (selItem.length>0) {
            if (selItem.length > SelectedFieldGrid.data.length ) {
                this.getSelectedData();
            }

            if (isMoreOption) {
                var isPercentage ="";
                if (this.comboSelectedFieldType ==1) {
                    isPercentage = BulkPanel.query('checkboxfield[itemId=PercentagecheckBox]')[0].lastValue;
                    selectedValue = BulkPanel.query('numberfield[itemId=numberText]')[0].getValue();
                    this.setValues(1,SelectedFieldGrid,  selItem, combo,selectedValue,isPercentage);
                }else if(this.comboSelectedFieldType ==7) {
                    selectedValue = BulkPanel.query('numberfield[itemId=AddDaysText]')[0].getValue();
                    this.setValues(7,SelectedFieldGrid,  selItem, combo,selectedValue,false);
                }else{
                    selectedValue = BulkPanel.query('textfield[itemId=TextText]')[0].getValue();
                    isPercentage = BulkPanel.query('checkboxfield[itemId=AtFrontCheckBox]')[0].lastValue;
                    this.setValues(10,SelectedFieldGrid,  selItem, combo,selectedValue,isPercentage);
                }
            }else{
                if (this.comboSelectedFieldType ==1) {
                    selectedValue = BulkPanel.query('numberfield[itemId=ReplaceValueNumeric]')[0].getValue();
                    this.setValues(0,SelectedFieldGrid, selItem, combo,selectedValue,false);
                }else if(this.comboSelectedFieldType ==7) {
                    selectedValue = BulkPanel.query('datefield[itemId=ReplaceValueDate]')[0].getValue();
                    this.setValues(0,SelectedFieldGrid,  selItem,combo,selectedValue,false);
                }else if(this.comboSelectedFieldType >100) {
                    selectedValue = BulkPanel.query('combobox[itemId=fieldOptCombo]')[0].getValue();
                    this.setValues(0,SelectedFieldGrid,  selItem,combo,selectedValue,false);
                }else{
                    selectedValue = BulkPanel.query('textfield[itemId=ReplaceValueTextBox]')[0].getValue();
                    this.setValues(0,SelectedFieldGrid,  selItem,combo,selectedValue,false);
                }
                
            }
            var undoBtn  = BulkPanel.query('button[itemId=undo]')[0];
            undoBtn.setDisabled(false);
        }

    },

    setValues:function(datatype,SelectedFieldGrid, selItem,combo,value,isPercentage){
        var j=0;
        var newValue = 0;
        var calVal =0;
        if (datatype ===0) {
            for (j = 0; j < selItem.length; j++) {
                if (this.comboSelectedFieldType ==7) {
                    newDate = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                    formatedDate = Ext.Date.format(newDate,'Y-m-d');
                    SelectedFieldGrid.data.items[j].set('FieldSelectedValue',formatedDate);
                }
                else{
                   SelectedFieldGrid.data.items[j].set('FieldSelectedValue',selItem.items[j].get(combo.lastSelection[0].data.column_name));
                }
                
                selItem.items[j].set(combo.lastSelection[0].data.column_name,value);
                if (this.comboSelectedFieldType ==7) {
                     newDate =Ext.Date.format(value,'Y-m-d');
                     SelectedFieldGrid.data.items[j].set('ReplaceValue',newDate);
                }else{
                    SelectedFieldGrid.data.items[j].set('ReplaceValue',value);
                }
                
            }
        }else if(datatype ==1){
            if(isPercentage){
                for (j = 0; j < selItem.length; j++) {
                    newValue = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                    if (!Ext.isEmpty(newValue)) {
                        calVal = parseInt(parseInt(newValue,0) + parseInt(newValue*value/100,0),0);
                        SelectedFieldGrid.data.items[j].set('FieldSelectedValue',newValue);
                        selItem.items[j].set(combo.lastSelection[0].data.column_name,calVal);
                        SelectedFieldGrid.data.items[j].set('ReplaceValue',calVal);
                    }
                }
            }else{
                for (j = 0; j < selItem.length; j++) {
                    newValue = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                    if (!Ext.isEmpty(newValue)) {
                        calVal = parseInt(parseInt(newValue,0) + parseInt(value,0),0);
                        SelectedFieldGrid.data.items[j].set('FieldSelectedValue',newValue);
                        selItem.items[j].set(combo.lastSelection[0].data.column_name,calVal);
                        SelectedFieldGrid.data.items[j].set('ReplaceValue',calVal);
                    }
                }
            }

        }else if(datatype ==7){
            for (j = 0; j < selItem.length; j++) {
                newValue = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                if (!Ext.isEmpty(newValue)) {
                    var newDate= Ext.Date.add(newValue, Ext.Date.DAY, value);
                        newDate =Ext.Date.format(newDate,'Y-m-d');
                        newValue =Ext.Date.format(newValue,'Y-m-d');
                    SelectedFieldGrid.data.items[j].set('FieldSelectedValue',newValue);
                    selItem.items[j].set(combo.lastSelection[0].data.column_name,newDate);
                    SelectedFieldGrid.data.items[j].set('ReplaceValue',newDate);
                }
            }
        }else{
            if (isPercentage) {
                for (j = 0; j < selItem.length; j++) {
                    newValue = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                    calVal = value + newValue;
                    SelectedFieldGrid.data.items[j].set('FieldSelectedValue',newValue);
                    selItem.items[j].set(combo.lastSelection[0].data.column_name,calVal);
                    SelectedFieldGrid.data.items[j].set('ReplaceValue',calVal);
                }
            }else{
                for (j = 0; j < selItem.length; j++) {
                    newValue = selItem.items[j].get(combo.lastSelection[0].data.column_name);
                    calVal =  newValue + value;
                    SelectedFieldGrid.data.items[j].set('FieldSelectedValue',newValue);
                    selItem.items[j].set(combo.lastSelection[0].data.column_name,calVal);
                    SelectedFieldGrid.data.items[j].set('ReplaceValue',calVal);
                }
            }
        }
    },


    onSelectedFieldGridItemClick: function(dataview, record, item, index, e, eOpts) {

    },

    onCopySelectionChange: function(checkboxfield, selected, eOpts ) {
        // var dataIndex = tableview.panel.headerCt.columnManager.columns[cellIndex].dataIndex
        /*when clear btn is clicked the selected is emptied*/
        if(!Ext.isEmpty(selected)) {
            var val = selected[0].data.CopiedValue;
            if (!Ext.isEmpty(val)) {
                var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
                var copiedGrid = BulkPanel.query('textfield[itemId=ReplaceValueTextBox]')[0];
                copiedGrid.setValue(val);
            }
        }
    },


    onReplaceValueRadioBoxChange: function(field, newValue, oldValue, eOpts) {
        var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        var advancePnl = BulkPanel.query('container[itemId=AdvanceFieldPanel]')[0];
        var inputTextBox = BulkPanel.query('container[itemId=SetPanel]')[0];
        var radioBtn = BulkPanel.query('radiofield[itemId=SpecifiedFormatCheckvalue]')[0];
        if (newValue) {
            advancePnl.setVisible(false);
            inputTextBox.setVisible(true);
            radioBtn.setValue(false);
        }
    },
    onSpecifiedFormatCheckvalueChange: function(field, newValue, oldValue, eOpts) {
        var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        var advancePnl = BulkPanel.query('container[itemId=AdvanceFieldPanel]')[0];
        var inputTextBox = BulkPanel.query('container[itemId=SetPanel]')[0];
        var radioBtn = BulkPanel.query('radiofield[itemId=ReplaceValueRadioBox]')[0];
        if (newValue) {
            advancePnl.setVisible(true);
            inputTextBox.setVisible(false);
           radioBtn.setValue(false);
        }
    },
    onUndoClick: function(button, e, eOpts) {
        var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        var grid = BulkPanel.activeGrid;
        var combo  = BulkPanel.query('combobox[itemId=FieldCombo]')[0];
        var selItem =grid.getSelectionModel().selected;
        var SelectedFieldGrid = BulkPanel.query('gridpanel[itemId=SelectedFieldGrid]')[0].getStore();
        var value ="";
        for (j = 0; j < SelectedFieldGrid.data.length; j++) {
            value =SelectedFieldGrid.data.items[j].get('FieldSelectedValue');
            SelectedFieldGrid.data.items[j].set('FieldSelectedValue',SelectedFieldGrid.data.items[j].get('ReplaceValue'));
            SelectedFieldGrid.data.items[j].set('ReplaceValue',value);
            selItem.items[j].set(combo.lastSelection[0].data.column_name,value);
        }
    },
    onGetFieldButtonClick: function(button, e, eOpts) {
        this.getSelectedData();
    },

    onGridFilterBtnClick: function(button, e, eOpts) {
        var me = this,colDataIndex=[],filterData=[],property,filterStr="",
            BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
            grid = BulkPanel.activeGrid,
            searchText=BulkPanel.query('textareafield[itemId=gridFilterTextArea]')[0].getValue().trim();
                /*convert multiples line brks to single space*/
            //the + sign defines the multiple \n(line brks) and g defines the global removal of all \n
            singleSpacedData=searchText.replace(/\n+/g," ");
            /*convert all the spaces to comma separated*/
            searchData1=singleSpacedData.replace(/ +/g,",");
            /*replace multiple commas*/
            searchData=searchData1.replace(/,+/g,",");
            if(!Ext.isEmpty(searchData)) {
                searchDataArray = searchData.split(',');
                for (var member in searchDataArray) {
                    var concatStr="'" + searchDataArray[member] + "'";
                    filterStr += concatStr+',';
                }
                searchData = filterStr.substring(',', filterStr.length-1);
            }
        /*
            if(BulkPanel.panelId==1) {
                property = 'column_1_01';
            }
            else if(BulkPanel.panelId==15) {
                property = 'column_1_01';
            }
            else {
                //do nth
            }
            var keywordObj = {},filter=[];
            keywordObj[property] = searchData;
            filter.push(keywordObj);
            var keywordObj = {};
            keywordObj['column_1_02'] = searchData;
            filter.push(keywordObj);
            colDataIndex.push(property);
            filterData.push(searchData);
        */
        if(BulkPanel.panelId == 5) {
            YBase.app.getController('MemberController').bulkPanelSearch=true;
        }
        // YBase.utility.SearchHelper.setDataInHeaderFilter1(grid,colDataIndex,filterData,false);
        var gridStore =  grid.getStore();
        gridStore.load({params:{'bulk_filter_params':searchData}});
        /*gridStore.on('load',function(store,records) {
            debugger;
            gridStore.is_loaded = true;
            if (!Ext.isEmpty(records) && records.length > 0) {
                grid.getSelectionModel().selectAll(true);
            }
            if (Ext.msk) Ext.msk.hide();
        });*/
    },
    onPreviousComboValueBtnClick: function(button, e, eOpts) {
        var me = this,
            BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
            combo = BulkPanel.query('combo[itemId=FieldCombo]')[0],
            store = combo.getStore();
            value= combo.getValue();
            index = store.find( combo.valueField, value );
            prev_index = index - 1;
            prev_record = store.getAt( prev_index );
        if( prev_record ) {
            combo.select( prev_record );
            // if(!suppressEvent ) {
            //     combo.fireEvent( 'select', combo, [ prev_record ] );
            // }
        }
    },
    onNextComboValueBtnClick: function(button, e, eOpts) {
        var me = this,
            BulkPanel = YBase.utility.BulkUpdateHelper.BlukUpdatePanel,
            combo = BulkPanel.query('combo[itemId=FieldCombo]')[0],
            store = combo.getStore(),
            value = combo.getValue(),
            index = store.find( combo.valueField, value ),
            next_index = index + 1,
            next_record = store.getAt( next_index );
        if(next_record ) {
            combo.select( next_record );
            // if( ! suppressEvent ) {
            //     combo.fireEvent( 'select', combo, [ next_record ] );
            // }
        }
    },
    onBulkPanelHide: function(absCmp,eOpts) {
        var me = this,
            btnBulkUpdate = absCmp.activeGrid.query('button[itemId=btnBulkUpdate]')[0];
        btnBulkUpdate.removeCls('active-btn');
    },
    onBulkPanelShow: function(absCmp,eOpts) {
        var me = this,
            btnBulkUpdate = absCmp.activeGrid.query('button[itemId=btnBulkUpdate]')[0];
        btnBulkUpdate.addCls('active-btn');
    },
    /*-----------hidden and disabled events-----------*/
        // onPercentagecheckBoxChange: function(field, newValue, oldValue, eOpts) {
        // },
        // onAtFrontCheckBoxChange: function(field, newValue, oldValue, eOpts) {
        // },
        // onCopyClearBtnClick: function(button, e, eOpts) {
        //     var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        //     var copiedGrid = BulkPanel.query('grid[itemId=SelectedValuesGrid]')[0].getStore().removeAll();
        // },
        // onBulkUpdateTopPanelCollapse: function(p, eOpts) {
        //     var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
        //     var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
        //     checkbox.setValue(false);
        // },
        // onBulkUpdateTopPanelExpand: function(p, eOpts) {
        //     var BulkPanel=YBase.utility.BulkUpdateHelper.BlukUpdatePanel;
        //     var checkbox = BulkPanel.query('checkboxfield[itemId=GetClickItemCheckBox]')[0];
        //     checkbox.setValue(true);
        // },
        // onSelectedValuesGridCellClick: function(tableview, td, cellIndex, record, tr, rowIndex, e, eOpts) {
        //     // var dataIndex = tableview.panel.columns[cellIndex].dataIndex;
        //     var dataIndex = tableview.panel.headerCt.columnManager.columns[cellIndex].dataIndex
        //     var val = record.get(dataIndex);
        //     if (!Ext.isEmpty(val)) {
        //         var BulkPanel=(Ext.ComponentQuery.query('panel[itemId=BlukUpdatePanel]')[0]);
        //         var copiedGrid = BulkPanel.query('textfield[itemId=ReplaceValueTextBox]')[0];
        //         copiedGrid.setValue(val);
        //     }
        // },



    init: function(application) {
        this.control({
            "#BlukUpdatePanel": {
                // expand: this.onBlukUpdatePanelExpand,
                // beforerender: this.onBlukPanelBeforeRender,
                afterrender: this.onBulkPanelAfterRender,
                hide: this.onBulkPanelHide,
                show: this.onBulkPanelShow
            },
            "#SelectedValuesGrid": {
                itemclick: this.onSelectedValuesGridItemClick,
                // cellclick: this.onSelectedValuesGridCellClick,
                selectionchange: this.onCopySelectionChange
            },
            "#FieldCombo": {
                change: this.onFieldComboChange
            },
            "#SetButton": {
                click: this.onSetButtonClick
            },
            "#SelectedFieldGrid": {
                itemclick: this.onSelectedFieldGridItemClick
            },
            "#ReplaceValueRadioBox": {
                change: this.onReplaceValueRadioBoxChange
            },
            "#SpecifiedFormatCheckvalue": {
                change: this.onSpecifiedFormatCheckvalueChange
            },
            "#undo": {
                click: this.onUndoClick
            },
            "#GetFieldButton": {
                click: this.onGetFieldButtonClick
            },
            "#gridFilterBtn": {
                click: this.onGridFilterBtnClick
            },
            "#previousComboValueBtn": {
                click: this.onPreviousComboValueBtnClick
            },
            "#nextComboValueBtn": {
                click: this.onNextComboValueBtnClick
            },
            /*is hidden*/
            // "#PercentagecheckBox": {
            //     change: this.onPercentagecheckBoxChange
            // },
            // "#AtFrontCheckBox": {
            //     change: this.onAtFrontCheckBoxChange
            // },
            // "#CopyClearBtn": {
            //     click: this.onCopyClearBtnClick
            // },
            //  "#BulkUpdateTopPanel": {
            //     collapse: this.onBulkUpdateTopPanelCollapse,
            //     expand: this.onBulkUpdateTopPanelExpand
            // },
            
        });
    }

});
