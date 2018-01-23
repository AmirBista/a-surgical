Ext.define('YBase.model.ReportListModel', {
    extend: 'Ext.data.Model',

    requires: [
        'Ext.data.Field'
    ],

    fields: [
        {
            name: 'csv_report_id'
        },
        {
            name: 'mapped_name'
        },
        {
            name: 'bill_code'
        },
        {
            name: 'name_jp'
        },
        {
            name: 'report_name'
        },
        {
            name: 'filter_params'
        },
        {
            name: 'group_name'
        },
        {
            defaultValue: 0,
            name: 'record_count'
        },
        {
            name: 'is_selected'
        },
        {
            name: 'print_template'
        }
    ]
});