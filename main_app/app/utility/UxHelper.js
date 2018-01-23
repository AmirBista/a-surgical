Ext.define('YBase.utility.UxHelper', {
	statics: {
		getClearButton: function (hideClearButtonWhenReadOnly) {
			if (!Ext.isEmpty(hideClearButtonWhenReadOnly))
				return new Ext.ux.form.field.ClearButton({'hideClearButtonWhenReadOnly':hideClearButtonWhenReadOnly});
			else
				return new Ext.ux.form.field.ClearButton();
		},
		addClearButton:function(control, hideClearButtonWhenReadOnly){
			this.getClearButton(hideClearButtonWhenReadOnly).init(control);
		}
	}
});
