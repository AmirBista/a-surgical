Ext.define('YBase.model.FileListModel', {
    extend: 'Ext.data.Model',

    fields: [
        {
            name: 'file_name'
        },
        {
            name: 'extension'
        },
        {
            name: 'original_file_name'
        },
        {
        	name: 'src'
        }
    ]
});