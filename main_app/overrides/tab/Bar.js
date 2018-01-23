Ext.define('overrides.tab.Bar', {
	override: 'Ext.tab.Bar',
    onClick: function(e, target) {
        var me = this,
            tabPanel = me.tabPanel,
            tabEl, tab, isCloseClick, tabInfo;

        if (e.getTarget('.' + Ext.baseCSSPrefix + 'box-scroller')) {
            return;
        }

        if (me.orientation === 'vertical' && (Ext.isIE8 || Ext.isIE9) && Ext.isStrict) {
            tabInfo = me.getTabInfoFromPoint(e.getXY());
            tab = tabInfo.tab;
            isCloseClick = tabInfo.close;
        } else {
            // The target might not be a valid tab el.
            tabEl = e.getTarget('.' + Ext.tab.Tab.prototype.baseCls);
            tab = tabEl && Ext.getCmp(tabEl.id);
            isCloseClick = tab && tab.closeEl && (target === tab.closeEl.dom);
        }

        if (isCloseClick) {
            e.preventDefault();
        }
        // Open In New Tab Functionality
        if(e.getTarget('.x-tab-newTab-open-btn')){
            var cnt = me.up('panel').up('container');
            if(cnt.itemId == 'MsgTabCnt') {
                YBase.app.getController('MsgTabController').showMessagePopupWin(cnt);
                return;
            }
            e.preventDefault();
            route = tab.card.route;
            window.open(route,'_blank');
            isCloseClick = true;
        }

        if (tab && tab.isDisabled && !tab.isDisabled()) {
            if (tab.closable && isCloseClick) {
                tab.onCloseClick();
            } else {
                if (tabPanel) {
                    // TabPanel will card setActiveTab of the TabBar
                    tabPanel.setActiveTab(tab.card);
                } else {
                    me.setActiveTab(tab);
                }
                tab.focus();
            }
        }

        
    },
});
