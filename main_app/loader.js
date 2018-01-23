
Ext.Loader.setConfig({
   // disableCaching: false,
    enabled: true
});
Ext.ns('YBase');
Ext.ns('Ext.ux');

Ext.Loader.setPath('YBase', 'app');
Ext.Loader.setPath('Ext.ux', 'ext/ux');
// Ext.Loader.setPath('Ext.ux.upload', 'ext/ux/upload');

Ext.Loader.setPath('YBase.ux', 'app/ux');
Ext.override(Ext.grid.View, { enableTextSelection: true });


Ext.Ajax.on('requestexception', function (conn, response, options) {
    if (response.status === 403) {
        window.location = Ext.APP_URL;
    }
});

//enable caching by svn_version_code constant
Ext.Ajax.disableCaching = false;
Ext.Ajax.extraParams = {
    '_dc': window.APP_DC,
    'lang': window.APP_LANG
};

//ajax time out 5 minutes
var  counter = 0;
Ext.Ajax.timeout = 1000*60*5;
	// Show the dropzone when dragging files (not folders or page
	// elements). The dropzone is hidden after a timer to prevent 
	// flickering to occur as `dragleave` is fired constantly.
$(document).on('dragover', function(e) {
        var dt = e.originalEvent.dataTransfer;
        if(dt.types != null && (dt.types.indexOf ? dt.types.indexOf('Files') != -1 : dt.types.contains('application/x-moz-file'))) {
            var bodyTab = Ext.ComponentQuery.query('panel[itemId=bodyTab]')[0];
            if(Ext.isEmpty(Ext.order_number))
               return;
            else if(Ext.isEmpty(Ext.entryPanel))
                return;
            else{
                if(!Ext.isEmpty(Ext.imageDragDropWindow))
                    Ext.imageDragDropWindow.show();
            }
        }
        e.stopPropagation();
        e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        dt.effectAllowed = dt.dropEffect = 'none';
    });

    $(document).on('dragleave', function(e) {
        counter--;
        if (counter === 0) { 
            if(!Ext.isEmpty(Ext.imageDragDropWindow))
            Ext.imageDragDropWindow.hide();
        }
    });
    $(document).on('dragenter', function(e) {
        counter++;
        e.stopPropagation();
        e.preventDefault();
        var dt = e.originalEvent.dataTransfer;
        dt.effectAllowed = dt.dropEffect = 'none';
        if (counter === 0) { 
            if(!Ext.isEmpty(Ext.imageDragDropWindow))
                Ext.imageDragDropWindow.hide();
        }
    });
    $(document).on('drop', function(e) {
        counter --;
        if(!Ext.isEmpty(Ext.imageDragDropWindow))
            Ext.imageDragDropWindow.hide();
    }); 
      

