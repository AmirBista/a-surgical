Ext.define('YBase.controller.SettingsController', {
    extend: 'Ext.app.Controller',
    views:[
        'SettingsPanel'
    ],
    refs:[
        {
            ref: 'settingsPanel',
            selector: 'settingsPanel'
        }
    ],
    onSettingsBeforeActivate:function(abstractcomponent, eOpts){
        var me=this, filter_params,
            grid =abstractcomponent.query('gridpanel')[0];
        if (!Ext.isEmpty(grid) && grid.getStore().is_loaded === true){
            grid.getStore().reload();
        }
    },
    onSettingsBeforeRender:function(abstractcomponent){
        var me=this;
        settingsDataViewStore=abstractcomponent.query('dataview[itemId=settingsDataView]')[0].getStore();
        if(!Ext.CURRENT_USER.is_super_user){
            settingsDataViewStore.clearFilter(true);
            settingsDataViewStore.filter('userRole', '50');
        }
        me.implementLanguage(abstractcomponent);
        if(Ext.msk) 
            Ext.msk.hide();
    },
    settingsAfterRender:function(abstractcomponent){
        var me=this;
         me.setActiveBtnClass();
        if (Ext.msk)
            Ext.msk.hide();
        /*var tooltipHelper = JRQSSTracker.utility.TooltipHelper;
            tooltipHelper.actionToolTip(component);*/
        //hide tab panel header
        var tabpanel=abstractcomponent.query('tabpanel[itemId=settingsBodyTab]');
            tabpanel[0].tabBar.hide();
    },
    implementLanguage:function(abstractcomponent){
        var me=this,
        settingLang=Ext.LANG.settingsPanel;
        abstractcomponent.setTitle(settingLang.settingPnlTitle);
        abstractcomponent.query('button[itemId=btnCsvMap]')[0].setText(settingLang.btnCsvMap);
    },
    showSettings:function(){
        Ext.Router.redirect('settings/clientMaster');      
    },
    showCsvMapView:function(params){
        var me=this;
        me.showSettingView(params);
        YBase.utility.SettingsTabLoader.showComponent('YBase.view.EcSiteExportPanel', true);
        me.setActiveBtnClass();
    },
    showProductMasterView:function(params){
        var me=this;
        me.showSettingView(params);
        me.activeMenuItemId="menuProductMaster";
        YBase.utility.SettingsTabLoader.showComponent('YBase.view.ProductMaster', true);
        me.setActiveBtnClass();
    },
    showClientMasterView:function(params){
        var me=this;
        me.showSettingView(params);
        me.activeMenuItemId="menuClientMaster";
        YBase.utility.SettingsTabLoader.showComponent('YBase.view.ClientMaster', true);
        me.setActiveBtnClass();
    },
    showStaffView:function(params){
        var me=this;
        me.showSettingView(params);
        me.activeMenuItemId="menuStaff";
        YBase.utility.SettingsTabLoader.showComponent('YBase.view.Staff', true);
        me.setActiveBtnClass();
    },
    showSettingView: function(params){
        var me=this,
        mainCtrl=me.getController('MainController');
        me.activeMenuItemId="menuCsvMap";
        mainCtrl.setActiveBtnClass();
        YBase.utility.TabLoader.showComponent('YBase.view.SettingsPanel', true);
    },
    setActiveBtnClass: function(){
        if(!Ext.isEmpty(this.getSettingsPanel())){
            var me                      = this,
                activeMenuItemId        = me.activeMenuItemId,
                mainPanel               = me.getSettingsPanel(),
                btnCnt                  = mainPanel.query('container[itemId=btnsContainer]')[0],
                btns                    = btnCnt.query('button'),
                settingsDataView        = mainPanel.query('dataview[itemId=settingsDataView]')[0],
                settingsDataViewStore   = settingsDataView.getStore(),
                idx                     = settingsDataViewStore.find('menuItemId',activeMenuItemId),
                record                  = settingsDataViewStore.getAt(idx);
            settingsDataView.select(record);
            for(var i=0;i<btns.length;i++){
                btns[i].removeCls('active-btn');  
                //btns[i].removeUI('activebtn-small');
            }
            if(!Ext.isEmpty(btnCnt.query('button[itemId='+me.activeBtnId+']'))){
                btnCnt.query('button[itemId='+me.activeBtnId+']')[0].addCls('active-btn');
                // topButtonContainer.query('button[itemId='+me.activeBtnId+']')[0].addUI('activebtn-small');
            }
        }
    },
    onBodyTabChange: function(tabPanel, newPanel, oldPanel, eOpts) {
        if(newPanel.itemId=='EcSiteExportPanel'){
            Ext.Router.redirect('settings/csvMap');
        } else if(newPanel.itemId=='ClientMaster') {
            Ext.Router.redirect('settings/clientMaster');
        } else if(newPanel.itemId=='ProductMaster') {
            Ext.Router.redirect('settings/productMaster');
        } else if(newPanel.itemId=='Staff') {
            Ext.Router.redirect('settings/staff');
        }else{
            //do nothing
        }
        this.showSettingsBulkPanel(tabPanel, newPanel, oldPanel)
    },
    showSettingsBulkPanel:function(tabPanel, newPanel, oldPanel) {
        tabPanel.isNew = false;
        newPanel.isNew = false;
        newGrid = newPanel.query('grid')[0];
        if(Ext.isEmpty(newGrid))
            newGrid = null;
        // if(newPanel.PanelNo!=9 && newPanel.PanelNo!=10){
            // YBase.utility.BulkUpdateHelper.setIsTabSaved(oldPanel);
            YBase.utility.BulkUpdateHelper.setActiveTabStore(newPanel,newGrid);    
        // }
    },
    onSettingsPanelDataViewItemClick:function(view, record, item, index, e, eOpts) {
        if(record.data.route=='mailSystem')
            window.open('mailSystem#mailHistory');
        else
            Ext.Router.redirect('settings/'+record.data.route);
    },
    init: function(application) {
        var me=this;
        me.control({
            "settingsPanel": {
                beforerender: me.onSettingsBeforeRender,
                beforeactivate : me.onSettingsBeforeActivate,
                afterrender:me.settingsAfterRender
            },
            "settingsPanel button[itemId=btnCsvMap]":{
                click:me.btnCsvMapClick
            }, 
            "tabpanel[itemId=settingsBodyTab]":{
                tabchange: me.onBodyTabChange
            },
            "settingsPanel dataview[itemId=settingsDataView]":{
                itemclick:me.onSettingsPanelDataViewItemClick
            }
            
        });
    }

});