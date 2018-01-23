Ext.define('YBase.utility.ScreenHelper', {
    extend: "Ext.util.Observable",
    controller:null,
    filter_holder:null,
    filter_obj_info:null,
    constructor: function(config) {
        var me = this;

        config = config || {};
        if (config.initialConfig) {

            // Being initialized from an Ext.Action instance...
            if (config.isAction) {
                me.baseAction = config;
            }
            config = config.initialConfig;
            // component cloning / action set up
        }
        else if (config.tagName || config.dom || Ext.isString(config)) {
            // element object
            config = {
                applyTo: config,
                id: config.id || config
            };
        }
        //adding custom event handlers.
        me.addEvents("filterChange");

        me.callParent([config]);

        // If we were configured from an instance of Ext.Action, (or configured with a baseAction option),
        // register this Component as one of its items
        if (me.baseAction){
            me.baseAction.addComponent(me);
        }
    },
    getComboStore:function(option_data,queryMode,storeUrl)
    {
        if(Ext.isEmpty(queryMode))
            queryMode = 'local';

        if(queryMode=="remote"){
            return Ext.create('Ext.data.Store', {
                model: 'YBase.model.ComboItemModel',
                proxy : {
                    type: 'ajax',
                    url: storeUrl,
                    reader: {
                        type: 'json',
                        root: 'data'
                    }
                }
            });
        }

        return Ext.create('Ext.data.Store', {
            model: 'YBase.model.ComboItemModel',
            data:option_data,
            proxy: {
                type: 'memory'
            }
        });
    },

    createScreenComponents:function(paramObj){
        var me=this, i, 
            len = paramObj.components.length,
            cmpItems=[], cmp_itemid, optionList, 
            cmp, cmp_width =275, cmp_name='',field_label='',cls='',
            detail_link_index='',xtype,
            company_respObj = paramObj.company_respObj,
            deliveryAddr_respObj = paramObj.deliveryAddr_respObj,
            comboGridParamsObj = {};
        if(Ext.isEmpty(paramObj.changeTxtAreaToTxtFld))
            paramObj.changeTxtAreaToTxtFld = false;

        if(Ext.isEmpty(paramObj.labelAlign)){
            paramObj.labelAlign = 'top';
        }

        if(Ext.isEmpty(paramObj.labelClsExtra)){
            paramObj.labelClsExtra = 'label-bg-cls';
        }

        for(i=0; i<len; i++){
            cmp = paramObj.components[i];
            cmp['labelAlign'] = paramObj.labelAlign;
            cmp['labelClsExtra'] = paramObj.labelClsExtra;
            if(cmp['labelAlign'] == "left"){
                cmp['width'] = '150' ;
            }
            
            if(paramObj.changeTxtAreaToTxtFld == true && xtype == "textareafield"){
                cmp['xtype'] = "textfield";
            }
            xtype=cmp['xtype'];

            cmp_itemid = cmp['itemId'];
            // cmp_itemid = Ext.String.format('{0}__{1}__{2}', cmp['table_id'], cmp['table_field_id'], cmp['column_name']),
            // cmp_name = Ext.String.format('dynamic_fields[{0}]',cmp['column_name']);
            // }
            field_label = cmp['fieldLabel'];
            var cmpObj = {},
                comboConfig_company;
            switch (xtype)
            {
                case "numberfield":
                    break;
                case "textfield":
                    break;
                case "datefield":
                    break;
                case "textareafield":
                    break;
                case "combobox":
                    if(cmp.field_type_id == 104 || cmp.field_type_id == 105){
                    	var dg_cmp = cmp.datagrid_component,
                            extra_params = {};
                        extra_params['datagrid_id'] = dg_cmp.datagrid_info.datagrid_id;
                        if(cmp.field_type_id == 105){
                            extra_params['field_option_id'] = cmp.field_option_id;    
                        }
                    	comboGridParamsObj = {
                            combo_itemId       : cmp_itemid,
                            combo_label        : field_label,
                            hide_label         : cmp.hide_label,
                            pageSize           : dg_cmp.page_size,
                            store_fields       : dg_cmp.fields,
                            template_fields    : dg_cmp.columns,
                            storeId            : cmp_itemid+'_store',
                            storeUrl           : cmp.store_url,
                            extra_params       : extra_params,
                            display_field      : cmp.displayField,
                            value_field        : cmp.valueField,
                            listeners          : null,
                            is_form_combo_grid : cmp.is_form_combo_grid
                        };
                        var comboConfig = YBase.utility.ComboGridHelper.setComboGridConfig(comboGridParamsObj);
                        cmp = Ext.Object.merge(cmp, comboConfig);  
                    }
                    /*CompanyBranch :: B3*/
                    else if(cmp.field_type_id == 101 && !Ext.isEmpty(cmp.store_url)){
                        var store = me.getComboStore(null,'remote',cmp.store_url);
                        cmp['store'] = store;
                        cmp['queryMode'] = 'remote';
                    }
                    else{
                        cmp['store'] = me.getComboStore(cmp['option_data']);
                    }
                    break;
                case "filtercheckpanel":
                    break;
            }
            if (cmp['focus_on_enterkey'] == '1'){
                cmp['componentCls'] = (cmp['componentCls'] || '') + ' focus_on_enterkey';
            }
            cmpItems.push(cmp); 
            
        } //for closing
        return cmpItems;        
    }    
});