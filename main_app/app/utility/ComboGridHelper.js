Ext.define('YBase.utility.ComboGridHelper', {
    singleton: true,
    createStoreModel:function(modelId, fields)
    {
         Ext.define(modelId, {
             extend: 'Ext.data.Model',
             fields: fields
         });
    },

    createStore: function(paramObj) {
        var modelId = 'model_'+paramObj.storeId, 
            proxyConfig;
        this.createStoreModel(modelId, paramObj.store_fields);
            proxyConfig = {
                type: 'ajax',
                url: paramObj.storeUrl,
                reader: {
                    type: 'json',
                    root: 'data',
                    totalProperty: 'total'
                },
                extraParams:paramObj.extra_params
            };
            

            return Ext.create('Ext.data.Store',{
                model: ''+modelId+'',
                storeId: paramObj.storeId,
                remoteFilter: false,
                pageSize: !Ext.isEmpty(paramObj.pageSize)?paramObj.pageSize:10,
                is_loaded: false,
                remoteSort:false,
                autoLoad: false,
                listeners: {
                    beforeload: function(store, operation, eOpts ){
                        if(store.isLoading()) {
                            return false;
                        }
                    },
                    load:function(store, records){
                        store.is_loaded = true;
                        if (Ext.msk) Ext.msk.hide();
                    }
                },
                proxy: proxyConfig
            });
    },
    isNumeric : function (n){
      return !isNaN(parseFloat(n)) && isFinite(n);
    },
    /*
    * @ returns XTemplate object.
    * @ params fields containing header label and data index.
    */
    createTemplate : function(fields,is_form_combo_grid){
        var me=this,
            list='',
            dataCol='',
            col_width=0, 
            total_width=0;
        for(var j=0;j<fields.length;j++) {
            if(is_form_combo_grid==true &&  Ext.isEmpty(fields[j].text))
                continue;
            if(fields[j].hidden == true){
                continue;
            }
            if (me.isNumeric(fields[j].width)){
                col_width = parseInt(fields[j].width);
            }
            else{
                col_width = 100;
            }
            total_width += col_width;


            var label = is_form_combo_grid == true ? fields[j].text : fields[j].field_label,
                dataIndex = is_form_combo_grid == true ? fields[j].dataIndex : fields[j].name;
            // if(!Ext.isEmpty(fields[j].editor) && fields[j].editor.xtype == "datefield"){
            //     dataIndex = '[Ext.util.Format.date(values.'+dataIndex+',"Y-m-d")]';
            // }
            if(!Ext.isEmpty(fields[j].field_type_id) && fields[j].field_type_id == 7){
                dataIndex = '[Ext.util.Format.date(values.'+dataIndex+',"Y-m-d")]';
            }

            else if(!Ext.isEmpty(fields[j].field_type_id) && fields[j].field_type_id == 8){
                dataIndex = '[Ext.util.Format.date(values.'+dataIndex+',"Y-m-d D")]';
            }


            list=list+'<td width="' + col_width + '" class="producthead"><strong>'+ label +'</strong></td>';
            dataCol=dataCol+'<td>{'+ dataIndex +'}</td>';
        }

        var tpl = Ext.create('Ext.XTemplate',
                '<table width="100%" class="product-table" cellpadding="0" cellspacing="0">',
                    '<tr class="prod_info-header">'+list+'</tr>',
                    '<tpl for=".">',
                        '<tr class="x-boundlist-item prod_info_{#} {[this.getTplRowCls(xindex)]}">'+dataCol+'</tr>',
                    '</tpl>',
                '</table>',
                {
                    getTplRowCls : function(xindex){
                        var rec = this.store.getAt(xindex-1);
                        if(!Ext.isEmpty(rec.raw.has_purchased_product) && rec.raw.has_purchased_product == 1)
                            return 'has-purchased-product-cls';
                        else
                            return '';
                    }
                }
            );
        tpl.total_width = total_width +1;
        return tpl;
    },
    setComboGridConfig: function(paramObj){
        var store = this.createStore(paramObj),
            tpl = this.createTemplate(paramObj.template_fields,paramObj.is_form_combo_grid),
            comboConfig = {
                itemId          :  paramObj.combo_itemId,
                fieldLabel      :  paramObj.combo_label,
                queryMode       :  paramObj.queryMode,
                editable        :  true,
                typeAhead       :  false,
                hideLabel       :  paramObj.hide_label,
                hideTrigger     :  false,
                anchor          :  '100%',
                pageSize        :  10,//paramObj.pageSize,
                matchFieldWidth :  false,
                displayField    :  paramObj.display_field,
                valueField      :  paramObj.value_field,
                minChars        :  1,
                store           :  store,
                emptyText       : !Ext.isEmpty(paramObj.emptyText) ? paramObj.emptyText:null,
                tpl             :  tpl,
                listConfig :  {
                    loadingText: Ext.LANG.globalLang.comboGrid.loadingText,
                    emptyText: Ext.LANG.globalLang.comboGrid.emptyText,
                    width: tpl.total_width > 350 ? tpl.total_width : 350
                },
            };
        if('fromMsgTab' in paramObj && paramObj.fromMsgTab == true) {
           comboConfig['renderTo'] =Ext.getBody();
        }
       // console.log(combo_itemId, tpl.total_width);
        return comboConfig;
        
        
    },
    reconfigureComboConfig : function(combo,respObj,storeId,store_url,extra_params){
        var comboConfig = this.setComboGridConfig(combo.itemId,combo.fieldLabel,combo.hideLabel,respObj.pageSize, respObj.fields, respObj.columns, storeId, store_url, extra_params,respObj.display_field,respObj.value_field,null,true);
       
        // Ext.Object.merge(combo,comboConfig);
        combo.displayField = respObj.display_field;
        combo.valueField = respObj.value_field;
        combo.bindStore(comboConfig.store);
        combo.on('beforequery',function(query){
            query.combo.store = this.comboConfig.store;
            query.combo.tpl = this.comboConfig.tpl;
           
        },{comboConfig: comboConfig});
        combo.store.load();
        // if(combo.view){
        //     debugger;
        //     combo.store.load();
        //     combo.view.refresh();
        // }
        // 
        
    }
    
});