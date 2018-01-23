/**
 * This is a utility class that can be passed into a {@link Ext.grid.column.Column} as a column config that provides
 * an automatic row numbering column.
 *
 * Usage:
 *
 *     columns: [
 *         {xtype: 'sno_col_renderer'},
 *         {text: "Company", flex: 1, sortable: true, dataIndex: 'company'},
 *         {text: "Price", width: 120, sortable: true, renderer: Ext.util.Format.usMoney, dataIndex: 'price'},
 *         {text: "Change", width: 120, sortable: true, dataIndex: 'change'},
 *         {text: "% Change", width: 120, sortable: true, dataIndex: 'pctChange'},
 *         {text: "Last Updated", width: 120, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'}
 *     ]
 *
 */
Ext.define('Ext.ux.SnoColRenderer', {
    extend: 'Ext.grid.column.Column',
    alias: 'widget.sno_col_renderer',

    /**
     * @cfg {String} text
     * Any valid text or HTML fragment to display in the header cell for the row number column.
     */
    text: "&#160",

    /**
     * @cfg {Number} width
     * The default width in pixels of the row number column.
     */
    width: 23,

    /**
     * @cfg {Boolean} sortable
     * @hide
     */
    sortable: false,

    /**
     * @cfg {Boolean} [draggable=false]
     * False to disable drag-drop reordering of this column.
     */
    draggable: false,

    // Flag to Lockable to move instances of this column to the locked side.
    autoLock: true,

    // May not be moved from its preferred locked side when grid is enableLocking:true
    lockable: false,

    align: 'right',

    constructor : function(config){

        // Copy the prototype's default width setting into an instance property to provide
        // a  default width which will not be overridden by AbstractContainer.applyDefaults use of Ext.applyIf
        this.width = this.width;

        this.callParent(arguments);
        if (this.rowspan) {
            this.renderer = Ext.Function.bind(this.renderer, this);
        }
    },

    // private
    resizable: false,
    hideable: false,
    menuDisabled: true,
    dataIndex: '',
    cls: Ext.baseCSSPrefix + 'sno-col-renderer',
    rowspan: undefined,

    // private
    renderer: function(value, metaData, record, rowIndex, colIndex, store) {
    	var rowspan = this.rowspan;
        if (rowspan){
            metaData.tdAttr = 'rowspan="' + rowspan + '"';
        }
        
        metaData.tdCls = Ext.baseCSSPrefix + 'grid-cell-special';
        var val = ((store.currentPage-1) * store.pageSize) + rowIndex + 1 ;
        var newRecords = store.getNewRecords();
        for(var rec in newRecords){
            if(store.indexOf(newRecords[rec]) == rowIndex)
                return rowIndex + 1;
        }
        // return val - newRecords.length;
        return val;
    }
});
