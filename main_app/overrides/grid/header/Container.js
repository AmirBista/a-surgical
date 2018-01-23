Ext.define('overrides.grid.header.Container', {
    override: 'Ext.grid.header.Container',
    isFirstMenuAdd:true,
    /**
     * Returns an array of menu CheckItems corresponding to all immediate children
     * of the passed Container which have been configured as hideable.
     */
    getColumnMenu: function(headerContainer) {
        if (headerContainer.lockedCt !== true){
        	return this.callParent(arguments);    		
		}

        var menuItems = [],
            i = 0,
            item,
            items = headerContainer.query('>gridcolumn[hideable]'),
            itemsLn,
            menuItem,
            normalColumns;

            if (headerContainer.lockedCt === true){
            	normalColumns = headerContainer.ownerCt.ownerCt.normalGrid.headerCt.query('>gridcolumn[hideable]');
            	items = Ext.Array.merge(items, normalColumns);
            }
            itemsLn = items.length;

        for (; i < itemsLn; i++) {
            item = items[i];
            menuItem = new Ext.menu.CheckItem({
                text: item.menuText || item.text,
                checked: !item.hidden,
                hideOnClick: false,
                headerId: item.id,
                menu: item.isGroupHeader ? this.getColumnMenu(item) : undefined,
                checkHandler: this.onColumnCheckChange,
                scope: this
            });
            menuItems.push(menuItem);

            // If the header is ever destroyed - for instance by dragging out the last remaining sub header,
            // then the associated menu item must also be destroyed.
            item.on({
                destroy: Ext.Function.bind(menuItem.destroy, menuItem)
            });
        }
        return menuItems;
    },    
	getMenu:function(){
		// debugger;
		//for hiding sort ascending/descending menu
		var me = this, sortable = me.sortable, menu, m;
		me.columnsText = Ext.LANG.globalLang.gridHeader.lblcolumnListMenu;
		me.sortable = false;
		menu = this.callParent(arguments);
		// debugger;

		m = menu.query('menuseparator');
		if (!Ext.isEmpty(m))
			m[0].hidden = true;

		m = menu.query('[itemId=unlockItem]');
		if (!Ext.isEmpty(m))
			m[0].hidden = true;

		m = menu.query('[itemId=lockItem]');
		if (!Ext.isEmpty(m))
			m[0].hidden = true;

		// menu.items.remove(menu.items.indexOf(menu.query('[itemId=unlockItem]')[0]));
		// menu.items.remove(menu.items.indexOf(menu.query('[itemId=lockItem]')[0]));
		// menu.remove(menu.query('[itemId=unlockItem]')[0]);
		// menu.remove(menu.query('[itemId=lockItem]')[0]);

		// debugger;
		/*if(me.grid.itemId=='orderStatusGrid' && this.isFirstMenuAdd==true){
			var menuItem =Ext.create('Ext.menu.Menu', {
			   // width: 100,
			    //height: 110,
			    floating: false,  // usually you want this set to True (default)
			   // renderTo: Ext.getBody(),
			     text: 'select all', // usually rendered by it's containing component
			    items:[
			    	{
			    	menu:{
			    		xtype:'menu',
			    		//text:'1323235',
			    		items:[{
					        xtype: 'menucheckitem',
					        text: 'select all'
					    },{
					        xtype: 'menucheckitem',
					        text: 'select specific'
					    },{
					        iconCls: 'add16',
					        text: 'icon item'
					    },{
					        text: 'regular item'
					    }
					    ]
			    	}
			    }]
			});
    		menu.items.add(menuItem);
    		this.isFirstMenuAdd=false;
		}*/
		me.sortable = sortable;
		return menu;
	},
	getEditor:function(){
		return this.editor;
	}
});
