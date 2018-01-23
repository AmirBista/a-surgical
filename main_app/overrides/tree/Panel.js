Ext.define('overrides.tree.Panel', {
    override: 'Ext.tree.Panel',
  /**
  * Checks all found TreeNode items
  * @param {store} checked_store Ext.data.store which store checked items
  * @param {String} id_col The field name to compare
  * @param {Ext.tree.TreeNode} startNode (optional) The node to start from, defaults to the root
  * @return {Array} An array of the checked records
  */
  setChecked : function(checked_store, id_col, startNode){
    startNode = startNode || this.getRootNode();
    var r = [], idx;
    var f = function(){
        if (!Ext.isEmpty(checked_store))
          idx = checked_store.find(id_col, this.get(id_col), 0, false, true, true);
        else
          idx = -1;

        if (idx >= 0)
        {
          this.set('checked', true);
          r.push(this);
        }
        else
        {
          this.set('checked', false);
        }
      };

      startNode.cascadeBy(f);
      return r;
  }	
});
