Ext.define('YBase.utility.SettingsTabLoader',
{
	requires: [
		'YBase.utility.Mask'
	],
	statics:{
		isTabLoaded:function(componentName) {
			YBase.utility.SettingsTabLoader.initGlobalVariable();
			if(!Ext.isEmpty(Ext.SettingsloadedCmpArr[componentName])) {
				var tabPnl = Ext.settingsBodyTab;
				var arr = componentName.split(".");
				if(arr.length == -1) {
					return false;
				}
				var name  = arr[arr.length-1];
				if (tabPnl.items.length > 0)
				{
					if (Ext.Array.indexOf(tabPnl.items.keys, name) > -1)
					{
						return true;
					}
				}
				return false;
			}
			return false;
		},
		closeTab:function(componentName) {
			YBase.utility.SettingsTabLoader.initGlobalVariable();
			if(!Ext.isEmpty(Ext.SettingsloadedCmpArr[componentName])) {
				try {
					var cmp = Ext.SettingsloadedCmpArr[componentName];
					cmp.close();
					return true;
				} catch (e) {
					return false;
				}
			}
			return false;
		},
		createComponent:function(componentName, closable, vars) {
            YBase.utility.SettingsTabLoader.initGlobalVariable();
            YBase.utility.SettingsTabLoader.hideTooltips();
            var cmp = null, tab = null, me = this;
            var tabPnl = Ext.settingsBodyTab;
            var arr = componentName.split(".");
            if(arr.length == -1) {
                return;
            }
            if (Ext.isEmpty(closable)) {
                closable = true;
            }
            var name  = arr[arr.length-1];
            cmp = Ext.SettingsloadedCmpArr[componentName];
            if(Ext.isEmpty(cmp)) {
                cmp = Ext.create(componentName, Ext.apply({
                    renderTo: Ext.getBody(),
                    closable: closable,
                    closeAction:'hide'
                },
                vars)
                );
                tab = tabPnl.add(cmp);
                Ext.SettingsloadedCmpArr[componentName] = tab;
                tabPnl.setActiveTab(tab);
                tabPnl.doLayout();
            } else {
                if (tabPnl.items.length > 0)
                {
                    //console.log(tabPnl.items,cmp);
                    var i = Ext.Array.indexOf(tabPnl.items.keys, name);
                    if (i > -1)
                    {
                        tabPnl.setActiveTab(cmp);
                        return cmp;
                    }
                }
                cmp.destroy();
                cmp = Ext.create(componentName, {
                    renderTo: Ext.getBody(),
                    closable: closable,
                    closeAction:'hide'
                });
                tab = tabPnl.add(cmp);
                //Ext.SettingsloadedCmpArr[componentName] = tab;
                tabPnl.setActiveTab(tab);
                tabPnl.doLayout();

            }
		},

		
		showComponent:function(componentName, closable, extraParams, re_create, parentCmp,mode, hideMaskOnActivate){
			var me = this;
			if ((Ext.isEmpty(re_create)  || re_create == false) && YBase.utility.SettingsTabLoader.isTabLoaded(componentName))
			{
				me.showComponent_withmask(componentName, closable, extraParams, re_create, parentCmp, mode, hideMaskOnActivate);
				return;
			}

			Ext.msk = Ext.create('YBase.utility.Mask');
			Ext.msk.on('afterrender', function(){
				me.showComponent_withmask(componentName, closable, extraParams, re_create, parentCmp, mode, hideMaskOnActivate);
			});
			Ext.msk.show(Ext.LANG.globalLang.progressBarText.loading, Ext.getBody());
		},
			/*Default is closable true
			If not closable pass false; */
		showComponent_withmask:function(componentName, closable, extraParams, re_create, parentCmp,mode){
			YBase.utility.SettingsTabLoader.initGlobalVariable();
            YBase.utility.SettingsTabLoader.hideTooltips();
			//if component already loaded then close it or destroy it.
			var cmp = null, tab = null, me = this;
			var tabPnl = Ext.settingsBodyTab;//this.getComponent('controlContainer').getComponent('bodyTab');//this.container;
			var arr = componentName.split(".");
			if(arr.length == -1)
				return;

			if (Ext.isEmpty(closable))
				closable = true;

			var params={
				renderTo: Ext.getBody(),
				closable: closable,
				closeAction:'hide'
			};
			if(typeof extraParams !== 'undefined') {
				params=Ext.apply(params,extraParams);
			}
			
			var name  = arr[arr.length-1];
			cmp = Ext.SettingsloadedCmpArr[componentName];
			if (!Ext.isEmpty(cmp) && re_create == true)
			{
				try
				{
					tabPnl.remove(cmp,true);
					cmp.destroy();
					cmp = null;
				}
				catch (err)
				{
					//
				}
			}
			//if(cmp == null) {
			if(Ext.isEmpty(cmp)) {
				cmp = Ext.create(componentName, params);
				cmp.hideMask = true;
                cmp.on('activate',function(tab,opt) {
                    me.onTabActivate(tab);
                });
                cmp.on('boxready',function(comp, width, height, eOpts){
                	// console.log('boxready', comp);
                	// if (Ext.msk) Ext.msk.hide();
                });
				//cmp.setHeight(this.getComponent("bodyTab").height - 400);
				tab = tabPnl.add(cmp);
				cmp.parentCmp = parentCmp;
                cmp.mode = mode;
				Ext.SettingsloadedCmpArr[componentName] = tab;
				tabPnl.setActiveTab(tab);
				tabPnl.doLayout();
                //me.onTabActivate(cmp);
				// //added this control to make the content of the tab visible at the first click.\
				// tabPnl.setActiveTab(tabPnl.getComponent('dumpTab'));
				// tabPnl.setActiveTab(tab);
			}
			else{
				if (tabPnl.items.length > 0)
				{
					if (Ext.Array.indexOf(tabPnl.items.keys, name) > -1)
					{
						if (!Ext.isEmpty(params))
						{
							cmp = Ext.apply(cmp,params);
						}
						//setting the tab as active tab
						//tabPnl.setActiveTab(Ext.SettingsloadedCmpArr[componentName]);
						cmp.hideMask = true;
						if (tabPnl.getActiveTab() == cmp)
						{
							//already active
							if (!Ext.isEmpty(cmp.hideMask) && cmp.hideMask == true)
							{
								cmp.hideMask = false;
								// if (Ext.msk) Ext.msk.hide();
							}
						}
						else
						{
							//activate the tab
							tabPnl.setActiveTab(cmp);
						}
                        cmp.parentCmp = parentCmp;
                        cmp.mode = mode;
                        //me.onTabActivate(cmp);
						return cmp;
					}
				}

				cmp.destroy();
				cmp = Ext.create(componentName, params);
				//cmp.setHeight(this.getComponent("bodyTab").height - 400);
				tab = tabPnl.add(cmp);
				cmp.parentCmp = parentCmp;
                cmp.mode = mode;
				//Ext.SettingsloadedCmpArr[componentName] = tab;
				tabPnl.setActiveTab(tab);
				tabPnl.doLayout();
			}
			return tab;
		},
		breadCrumbcontainer : null,
		onTabActivate:function(tab) {
			
			this.refreshBreadCrumb(tab);
			//
		},
		initBreadCrumb:function(container){
			// return;
			// var lang = Ext.LANG,
			// 	dashboard20 = lang.dashboard20,
			// 	ohomeGoiken30 = dashboard20.ohomeGoiken30,
			// 	hiyari70 = dashboard20.hiyari70,
			// 	bc = hiyari70;

			// if(Ext.JRQS_BRANCH=="30") bc=hiyari70;
			this.breadCrumbcontainer = container;

			container.data = {"items":[
				{"key":"Dashboard","displayText":"Calendar"}]};
				/*,
				{"key":"ProductDetailsPanel","displayText":"Product detail"}
				]};*/

			var tpl = new Ext.XTemplate(
				'<div class="breadCrumbHolder module">',
				'    <div id="breadCrumb3" class="breadCrumb module">',
				'        <ul>',
				'        <tpl for="items">',
				'            <li> <tpl if="xindex == 0"><a href="javascript:;" key="{key}" class="breadCrumbItem" onclick="Garage.utility.SettingsTabLoader.onBreadCrumbClick(this)">{displayText}</a><tpl else><span class="breadcrumb-separater">{displayText}</span></tpl></li>',
				'        </tpl>',
				'        </ul>',
				'    </div>',
				'</div>'
			);
			container.tpl = tpl;

			//container.on('afterrender',this.onBreadCrumbAfterRender);
		},
		refreshBreadCrumb:function(cmp){
			
			// var container_data = {"items":[]};
			// container_data.items[0] =  {"key":cmp.id,"displayText":cmp.title};
			// this.breadCrumbcontainer.update(container_data);
		},
        forceActivateMenu:function(menu) {
            //
        },

		isEmptyObject:function(obj) {
			for(var prop in obj) {
				if(obj.hasOwnProperty(prop)) {
					return false;
				}
			}
			return true;
		},
		initGlobalVariable: function() {

			if(Ext.isEmpty(Ext.settingsBodyTab))
			{
				var bodyTab = Ext.ComponentQuery.query('tabpanel[itemId=settingsBodyTab]')[0];
				Ext.settingsBodyTab = bodyTab;
				Ext.SettingsloadedCmp = null;
				Ext.SettingsloadedCmpNames = [];
				Ext.SettingsloadedCmpArr = [];
			}
		},
        hideTooltips:function() {
            return;
        }
	}
});