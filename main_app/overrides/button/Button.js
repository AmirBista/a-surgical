Ext.define('overrides.button.Button', {
	override: 'Ext.button.Button',
	openInNewTab : true,
	

    getTemplateArgs: function() {
        var me = this,
            glyph = me.glyph,
            glyphFontFamily = Ext._glyphFontFamily,
            glyphParts;

        if (typeof glyph === 'string') {
            glyphParts = glyph.split('@');
            glyph = glyphParts[0];
            glyphFontFamily = glyphParts[1];
        }
        if(me.openInNewTab){
        	debugger;
        }
        return {
            innerCls : me.getInnerCls(),
            splitCls : me.getSplitCls(),
            iconUrl  : me.icon,
            iconCls  : me.iconCls,
            glyph: glyph,
            glyphCls: glyph ? me.glyphCls : '', 
            glyphFontFamily: glyphFontFamily,
            text     : me.text || '&#160;',
            openInNewTab : me.openInNewTab
        };
    },
});