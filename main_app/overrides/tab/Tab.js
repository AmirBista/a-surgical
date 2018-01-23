Ext.define('overrides.tab.Tab', {
	override: 'Ext.tab.Tab',
	
    initComponent: function() {
        var me = this;
        me.callParent(arguments);
        me.addEvents('newTabOpen');
    },
	renderTpl: [
        '<span id="{id}-btnWrap" class="{baseCls}-wrap',
            '<tpl if="splitCls"> {splitCls}</tpl>',
            '{childElCls}" unselectable="on">',
            '<span id="{id}-btnEl" class="{baseCls}-button">',
                '<span id="{id}-btnInnerEl" class="{baseCls}-inner {innerCls}',
                    '{childElCls}" unselectable="on">',
                    '{text}',
                '</span>',
                '<span role="img" id="{id}-btnIconEl" class="{baseCls}-icon-el {iconCls}',
                    '{childElCls} {glyphCls}" unselectable="on" style="',
                    '<tpl if="iconUrl">background-image:url({iconUrl});</tpl>',
                    '<tpl if="glyph && glyphFontFamily">font-family:{glyphFontFamily};</tpl>">',
                    '<tpl if="glyph">&#{glyph};</tpl><tpl if="iconCls || iconUrl">&#160;</tpl>',
                '</span>',
            '</span>',
        '</span>',
        // if "closable" (tab) add a close element icon and open tab in new window icon
        '<tpl if="closable">',
            '<span id="{id}-closeEl" class="{baseCls}-close-btn" title="{closeText}" tabIndex="0"></span>',
            '<span id="{id}-newTabEl" class="{baseCls}-newTab-open-btn" title='+Ext.LANG.tabBar.newTabBar+' tabIndex="1"></span>',

        '</tpl>',
        
    ],
});
