Ext.define('overrides.grid.plugin.CellEditing', {
    override: 'Ext.grid.plugin.CellEditing',
    showEditor: function(ed, context, value) {
        var me = this,
            record = context.record,
            columnHeader = context.column,
            sm = me.grid.getSelectionModel(),
            selection = sm.getCurrentPosition(me.grid.view),
            otherView = selection && selection.view;

        // Selection is for another view.
        // This can happen in a lockable grid where there are two grids, each with a separate Editing plugin
        if (otherView && otherView !== me.view) {
             return me.lockingPartner.showEditor(ed,  me.lockingPartner.getEditingContext(selection.record,  selection.columnHeader), value);
        }

        me.setEditingContext(context);
        me.setActiveEditor(ed);
        me.setActiveRecord(record);
        me.setActiveColumn(columnHeader);

        // Select cell on edit only if it's not the currently selected cell
         if (sm.selectByPosition && (!selection || selection.column !==  context.colIdx || selection.row !== context.rowIdx)) {
            if (!sm.isCellModel && sm.select) {
                sm.select(record);
            }
            else {
                sm.selectByPosition({
                    row: context.rowIdx,
                    column: context.colIdx,
                    view: me.view
                });
            }
        }

        ed.startEdit(me.getCell(record, columnHeader), value, context);
        me.editing = true;
        me.scroll = me.view.el.getScroll();
    }
});
Ext.selection.RowModel.override({
    getCurrentPosition: function(view) {
        var firstSelection = this.selected.items[0];
        if (firstSelection) {
            return new Ext.grid.CellContext(view || this.view).setPosition(this.store.indexOf(firstSelection), 0);
        }
    }
});