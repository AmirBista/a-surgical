Ext.define('YBase.utility.ButtonHelper', {
    singleton: true,
    
    setWindowBtnVisibility: function(win){
        var action_roles=win.action_roles, btn, btn_state;
        try{
            // if (!Ext.isEmpty(win.query('button[itemId=btnNew]')))
                // win.query('button[itemId=btnNew]')[0].setVisible(action_roles['new']);
            if (!Ext.isEmpty(win.query('button[itemId=btnSave]')))
                win.query('button[itemId=btnSave]')[0].setVisible(action_roles['save']);
            if (!Ext.isEmpty(win.query('button[itemId=btnDraft]')))
                win.query('button[itemId=btnDraft]')[0].setVisible(action_roles['draft']);
            if (!Ext.isEmpty(win.query('button[itemId=btnDelete]')))
                win.query('button[itemId=btnDelete]')[0].setVisible(action_roles['delete']);
            if (!Ext.isEmpty(win.query('button[itemId=btnCancel]')))
                win.query('button[itemId=btnCancel]')[0].setVisible(action_roles['cancel']);
            if (!Ext.isEmpty(win.query('button[itemId=btnClone]')))
                win.query('button[itemId=btnClone]')[0].setVisible(action_roles['clone']);
            if (!Ext.isEmpty(win.query('button[itemId=btnAdditionalClone]')))
                win.query('button[itemId=btnAdditionalClone]')[0].setVisible(action_roles['additionalClone']);
            if (!Ext.isEmpty(win.query('button[itemId=btnPrint]')))
                win.query('button[itemId=btnPrint]')[0].setVisible(action_roles['print']);
            if (!Ext.isEmpty(win.query('button[itemId=btnConvertToOrder]')))
                win.query('button[itemId=btnConvertToOrder]')[0].setVisible(action_roles['bill']);
            if (!Ext.isEmpty(win.query('button[itemId=btnPurchaseEntry]')))
                win.query('button[itemId=btnPurchaseEntry]')[0].setVisible(action_roles['purchaseEntry']);
            if (!Ext.isEmpty(win.query('button[itemId=btnUpdateStock]')))
                win.query('button[itemId=btnUpdateStock]')[0].setVisible(action_roles['updateStock']);
            if (!Ext.isEmpty(win.query('button[itemId=btnNewServiceEntry]')))
                win.query('button[itemId=btnNewServiceEntry]')[0].setVisible(action_roles['serviceEntry']);
            if (!Ext.isEmpty(win.query('button[itemId=btnNewOrderEntry]')))
                win.query('button[itemId=btnNewOrderEntry]')[0].setVisible(action_roles['newOrderEntry']);
            if(win.is_bill_order == 1 && win.params.mode == 'edit'){
                if (!Ext.isEmpty(win.query('button[itemId=btnConvertToSales]')))
                    win.query('button[itemId=btnConvertToSales]')[0].setVisible(action_roles['btnConvertToSales']);
            }
        }
        catch(ex)
        {
            //
        }

    },
    generateUrlQueryString: function(urlParam){
        var queryString="", sybl, i=0;
        if(!Ext.isEmpty(urlParam)){
            for(var key in urlParam){
                if(i==0)
                    sybl='?';
                else
                    sybl='&';
                queryString+=sybl+key+'='+urlParam[key];
                i++;
            }
        }
        return queryString;
    }
    
});