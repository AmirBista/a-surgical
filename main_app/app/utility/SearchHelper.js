Ext.define('YBase.utility.SearchHelper',
    {
        statics:{
            getSearchConditionName:function(grid,datagrid_id,user_id,customMenu,gridCnt){
                var me = this,
                    filterData =  grid.getHeaderFilters(),
                    filterRecords = filterData.getRange(),
                    filterLength = filterRecords.length,
                    lang = Ext.LANG,
                    filterCount=null,
                    data = {};
                filterData.each(function(record){
                    if(record.value=='' || record.value==null){
                        filterCount++;
                    }
                    data[record.property] = record.value;
                });
                if(filterCount==filterLength){
                    // Ext.MessageBox.alert(lang.globalLang.app.appTitle, lang.globalLang.searchCriteria.emptySearchField);
                    Ext.Msg.show({
                        title: lang.globalLang.app.appTitle,
                        msg:   lang.globalLang.searchCriteria.emptySearchField,
                        modal: true,
                        icon: Ext.Msg.INFO,
                        buttons: Ext.Msg.OK
                    });
                    return;
                }
                else{
                    var win = Ext.create('YBase.view.SearchWindow',{
                        'filterRecords' : filterData,
                        'datagrid_id'   : datagrid_id,
                        'user_id'       : user_id,
                        'gridpnl'       : grid,
                        'customMenu'    : customMenu,
                        'parentGridCnt' : gridCnt
                    });
                    win.show();
                }
            },
            setSearchName:function(e,grid,menu){
                if (e.getTarget('.btn_search_remove')) {
                    Ext.MessageBox.confirm(Ext.LANG.globalLang.app.appTitle, Ext.LANG.globalLang.alertMsg.deleteSearchName, function(btn) {
                        if (btn === 'yes') {
                            var deletedRecordArray=[];
                            deletedRecordArray.push(menu.search_id);
                            Ext.Ajax.request({
                                url: 'bizlayer/search/gridSearchCriteriaSave',
                                method: 'POST',
                                params: {
                                    datagrid_id     : grid.up('container').gridNo,
                                    deletedRecords  : JSON.stringify(deletedRecordArray)
                                },
                                scope:{'grid':grid},
                                success: function(response) {
                                    var resp = Ext.decode(response.responseText);
                                    if(resp.success) {
                                        var searchList = resp.data.searchList,
                                            parentGridCnt = this.grid.up('container'),
                                            tempSearchDataView = parentGridCnt.query('dataview[itemId=tempSearchDataView]')[0],
                                            tempSearchDataViewStore = tempSearchDataView.getStore();
                                        tempSearchDataViewStore.loadRawData(resp.data.searchTemplateData);
                                        YBase.utility.SearchHelper.updateSearchMenuBtn(parentGridCnt,searchList);
                                    }else {
                                        Ext.Msg.show({
                                            title: Ext.LANG.globalLang.app.appTitle,
                                            msg:   Ext.LANG.globalLang.errorMsg.saveError,
                                            modal: true,
                                            icon: Ext.Msg.ERROR,
                                            buttons: Ext.Msg.OK
                                        });
                                    }
                                    /*var resp = Ext.decode(response.responseText),
                                        searchSaveBtn = this.grid.query('splitbutton[itemId=btnSaveSearch]')[0],
                                        menuItem = searchSaveBtn.query('menuitem[search_id='+resp.search_id+']')[0];
                                    menuItem.ownerCt.remove(menuItem);*/
                                    // mneu.ownerCt.remove(menu);
                                },
                                failure:function(response){
                                }
                            });
                        }
                    });
                }
                else{
                    filterData = JSON.parse(menu.search_criteria);
                    /*clears the headerfilters*/
                    grid.clearHeaderFilters();
                    Ext.iterate(filterData, function(key, value) {
                        grid.setHeaderFilter(key,value, false);
                    });
                    grid.headerFilterPlugin.applyFilters();
                }
            },
            setDataInHeaderFilter:function(grid, colDataIndex, value,chkBoxChecked,dateFieldValue, dateColIndex){
                /*if (gridpnl.xtype =="container") {
                    grid = gridpnl.items.items[0];
                }else{
                    grid = gridpnl;
                }*/
                grid.clearHeaderFilters();
                if(chkBoxChecked){
                    grid.setHeaderFilter(dateColIndex,dateFieldValue, false);
                }
                grid.setHeaderFilter(colDataIndex,value, false);
                grid.headerFilterPlugin.applyFilters();
            },
            setDataInHeaderFilter1:function(grid, colDataIndex, value, reload){
                /*if (gridpnl.xtype =="container") {
                    grid = gridpnl.items.items[0];
                }else{
                    grid = gridpnl;
                }*/
                grid.clearHeaderFilters();
                for(var i=0;i<colDataIndex.length;i++)
                    grid.setHeaderFilter(colDataIndex[i],value[i], reload);
                // grid.headerFilterPlugin.applyFilters();
            },
            openSearchEditWin: function(grid,datagrid_id,user_id,customMenu) {
                var win = Ext.create('YBase.view.SearchEditWindow',{
                    'parentGridCnt' : grid.up('container'),
                    'datagrid_id'   : datagrid_id,
                    'user_id'       : user_id
                });
                win.show();
            },
            updateSearchMenuBtn: function(gridCnt,searchList) {
                var searchMenu = gridCnt.query('menu[itemId=SearchMenu]')[0],
                    len = searchList.length,
                    paramObj = {'gridItemId':gridCnt.gridItemId,'gridCnt':gridCnt};
                searchMenu.removeAll();
                if(!Ext.isEmpty(searchList)) {
                    for (i=0; i<len; i++) {
                        var mnu = {
                            'xtype'         : 'menuitem',
                            'JSON_search'   : searchList[i],
                            'text'          : searchList[i].search_name,
                            'search_id'     : searchList[i].search_id,
                            'menuIndex'     : i,
                            'textAlign'     : 'left',
                            'iconAlign'     : 'right',
                            'cls'           : 'search-menu ',
                            listeners:{
                                click:{
                                    element: 'el', //bind to the underlying el property on the panel
                                    fn: function(e, element, params){ 
                                        var gridCnt = this.gridCnt,
                                            grid = gridCnt.query('grid[itemId='+gridCnt.gridItemId+']')[0],
                                            menuitem = this.menuitem;
                                        YBase.utility.SearchHelper.setSearchName(e,grid,menuitem);
                                    },
                                    scope:{'gridCnt':gridCnt,'menuitem':searchList[i]},
                                }
                            }
                        } 
                        if(searchList[i].system_flg == 0 && Ext.CURRENT_USER.user_id == searchList[i].user_id) {
                           mnu['iconCls'] = 'btn_search_remove';
                        }
                        searchMenu.add(mnu)
                        // searchMenu.items.items.push(mnu);
                    };
                } 
                if(Ext.CURRENT_USER.is_super_user) {
                    var settingMenu = YBase.utility.GridHelper.settingMenuProp(paramObj,searchMenu);
                    searchMenu.add(settingMenu);
                }
            }
        }
    });
