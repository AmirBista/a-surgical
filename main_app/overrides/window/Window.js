Ext.define('overrides.window.Window', {
    override: 'Ext.window.Window',
    listeners:{
    	beforerender:function(abstractcomponent, eOpts){
            var h = Ext.getBody().getViewSize().height,
                w = Ext.getBody().getViewSize().width-4;

            if (abstractcomponent.height > h)
                abstractcomponent.height = h;

            if (abstractcomponent.width > w)
                abstractcomponent.width = w;

    		// if (YBase.utility.ResolutionHelper.isMinResolution) {
	    	// 	abstractcomponent.width = 750;
	    	// 	abstractcomponent.height = 490;
	    	// }
    	}
    },
    constrain:true,/*dont allow window to drag outside of browser visible area*/
    // constrainHeader:true/*dont allow window to drag outside of browser visible area*/
});
