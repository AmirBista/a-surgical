Ext.define('overrides.grid.GridHeaderFilters', {
    override: 'Ext.ux.grid.GridHeaderFilters',
    renderFilters: function()
    {
        this.destroyFilters();

        this.fields = {};
        this.containers = {};




        var filters = this.grid.headerFilters;

        /**
         * @cfg {Boolean} ignoreSavedHeaderFilters
         * <b>Configuration parameter for grid</b>
         * Allows to ignore saved filter status when {@link #stateful} is enabled.
         * This can be useful to use {@link #headerFilters} configuration directly and ignore status.
         * The state will still be saved if {@link #stateful} is enabled.
         */
        if(this.stateful && this.grid.savedHeaderFilters && !this.grid.ignoreSavedHeaderFilters)
        {
            Ext.apply(filters, this.grid.savedHeaderFilters);
        }

        var storeFilters = this.parseStoreFilters();
        filters = Ext.apply(storeFilters, filters);

        var columns = this.grid.headerCt.getGridColumns();
        for(var c=0; c < columns.length; c++)
        {
            var column = columns[c];
            if(column.filter)
            {
                var filterContainerConfig = {
                    id: column.id + '-filtersContainer',
                    cls: this.filterContainerCls,
                    layout: 'anchor',
                    bodyStyle: {
                        'background-color': 'transparent'
                    },
                    border: false,
                    width: column.getWidth(),
                    listeners: {
                        scope: this,
                        element: 'el',
                        mousedown: function(e)
                        {
                            e.stopPropagation();
                        },
                        click: function(e)
                        {
                            e.stopPropagation();
                        },
                        keydown: function(e) {
                            if (e.getKey() == Ext.EventObject.ENTER)
                            {
                                e.preventDefault();
                                this.onFilterContainerEnter();
                                e.handled = true;
                            }
                            e.stopPropagation();
                        },
                        keypress: function(e){
                            e.stopPropagation();
                            if(e.getKey() == Ext.EventObject.ENTER)
                            {
                                this.onFilterContainerEnter();
                            }
                        },
                        keyup: function(e){
                            e.stopPropagation();
                        },
                        
                    },
                    items: []
                }

                var fca = [].concat(column.filter);

                for(var ci = 0; ci < fca.length; ci++)
                {
                    var fc = fca[ci];
                    Ext.applyIf(fc, {
                        filterName: column.dataIndex,
                        fieldLabel: column.text || column.header,
                        hideLabel: fca.length == 1
                    });
                    var initValue = Ext.isEmpty(filters[fc.filterName]) ? null : filters[fc.filterName];
                    Ext.apply(fc, {
                        cls: this.filterFieldCls,
                        itemId: fc.filterName,
                        anchor: '-1'
                    });

                    var filterField = Ext.ComponentManager.create(fc);
                    if(filterField.xtype =="combobox" || filterField.xtype =="datefield"){
                        filterField.on('select',this.onFilterSelect,this);
                        filterField.on('textCleared',this.onFilterTxtCleared,this);
                    }
                    filterField.column = column;
                    this.setFieldValue(filterField, initValue);
                    this.fields[filterField.filterName] = filterField;
                    filterContainerConfig.items.push(filterField);
                }

                var filterContainer = Ext.create('Ext.container.Container', filterContainerConfig);
                filterContainer.render(column.el);
                this.containers[column.id] = filterContainer;
                column.setPadding = Ext.Function.createInterceptor(column.setPadding, function(h){
                    return false;
                });
            }
        }

        if(this.enableTooltip)
        {
            this.tooltipTpl = new Ext.XTemplate(this.tooltipTpl,{
                text: this.text
            });
            this.tooltip = Ext.create('Ext.tip.ToolTip',{
                target: this.grid.headerCt.el,
                //delegate: '.'+this.filterContainerCls,
                renderTo: Ext.getBody()
            });
            this.grid.on('headerfilterchange',function(grid, filters)
            {
                var sf = filters.filterBy(function(filt){
                    return !Ext.isEmpty(filt.value);
                });
                this.tooltip.update(this.tooltipTpl.apply({
                    filters: sf.getRange()
                }));
            },this);
        }

        this.applyFilters();
        this.grid.fireEvent('headerfiltersrender',this.grid,this.fields,this.parseFilters());
        
    },
    onFilterSelect: function(fld,records) {
        this.applyFilters();
    },
    onFilterTxtCleared: function(fld) {
        this.applyFilters();
    },
    applyFilters: function()
    {
        var filters = this.parseFilters();
        if(this.grid.fireEvent('beforeheaderfiltersapply', this.grid, filters, this.grid.getStore()) !== false)
        {
            var storeFilters = this.grid.getStore().filters;
            var exFilters = storeFilters.clone();
            var change = false;
            var active = 0;
            var idx=0;
            for(var fn in filters)
            {
                var value = filters[fn];

                var sf = storeFilters.findBy(function(filter){
                    return filter.property == fn;
                });

                if(Ext.isEmpty(value))
                {
                    if(sf)
                    {
                        storeFilters.remove(sf);
                        change = true;
                    }
                }
                else
                {
                    //check if alias added in field
                    var field, fld_arr = fn.split('.');
                    if (fld_arr.length === 2){
                        field = this.fields[fld_arr[1]];
                    }
                    else
                    {
                        field = this.fields[fn];
                    }
                    if(!sf || sf.value != filters[fn])
                    {
                        var newSf = new Ext.util.Filter({
                            root: this.filterRoot,
                            property: fn,
                            value: filters[fn],
                            label: field.fieldLabel
                        });
                        if(sf)
                        {
                            //idx = this.grid.store.indexOf(sf)
                            storeFilters.remove(sf);
                        }
                        storeFilters.insert(active,newSf);
                        change = true;
                    }
                    active ++;
                }
            }
            this.grid.fireEvent('headerfiltersapply', this.grid, filters, active, this.grid.getStore());
            if(change)
            {
                var curFilters = this.getFilters();
                this.grid.fireEvent('headerfilterchange', this.grid, curFilters, this.lastApplyFilters, active, this.grid.getStore());
                this.lastApplyFilters = curFilters;
                this.grid.invalidateScrollerOnRefresh= true;
            }
        }
    }
});