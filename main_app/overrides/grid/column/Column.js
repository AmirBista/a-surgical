Ext.define('overrides.grid.column.Column', {
    override: 'Ext.grid.column.Column',
    toggleSortState: function() {
    	var me = this,
            idx,
            nextIdx;

        if (me.sortable) {
            idx = Ext.Array.indexOf(me.possibleSortStates, me.sortState);

            nextIdx = (idx + 1) % me.possibleSortStates.length;
            me.setSortState(me.possibleSortStates[nextIdx]);
        }
    },
    setSortState: function(state, skipClear, initial) {
        var me = this,
            ascCls = me.ascSortCls,
            descCls = me.descSortCls,
            ownerHeaderCt = me.getOwnerHeaderCt(),
            oldSortState = me.sortState;

         state = state || null;

        if (!me.sorting && oldSortState !== state && (me.getSortParam() != null)) {
            // don't trigger a sort on the first time, we just want to update the UI
            if (state && !initial) {
                // when sorting, it will call setSortState on the header again once
                // refresh is called
                me.sorting = true;
                me.doSort(state);
                me.sorting = false;
            }
            switch (state) {
                case 'DESC':
                    me.addCls(descCls);
                    me.removeCls(ascCls);
                    break;
                case 'ASC':
                    me.addCls(ascCls);
                    me.removeCls(descCls);
                    break;
                default:
                    me.removeCls([ascCls, descCls]);
            }
            if (ownerHeaderCt && !me.triStateSort && !skipClear) {
                ownerHeaderCt.clearOtherSortStates(me);
            }
            me.sortState = state;

            var store = me.up('[store]').store;
            
            // we only want to fire the event if we have a null state when using triStateSort
            if (me.triStateSort || state != null) {
                ownerHeaderCt.fireEvent('sortchange', ownerHeaderCt, me, state);
            }
        }
    },
    doSort: function(state) {
        var tablePanel = this.up('tablepanel'),
            store = tablePanel.store;

        // If the owning Panel's store is a NodeStore, this means that we are the unlocked side
        // of a locked TreeGrid. We must use the TreeStore's sort method because we cannot
        // reorder the NodeStore - that would break the tree.
        if (tablePanel.ownerLockable && store.isNodeStore) {
            store = tablePanel.ownerLockable.lockedGrid.store;
        }
        debugger;
        if(this.dataIndex == store.getGroupField()){
            store.groupDir = state;
            var groups = this.groupers.items;
            for(var i=0;i<groups.length;i++){
            	if(groups[i].property == this.dataIndex)
            		groups[i].direction = state;
            }
            store.fireGroupChange();
        }

        store.sort({
            property: this.getSortParam(),
            direction: state
        });
    },
});