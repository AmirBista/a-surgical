Ext.define('YBase.utility.DataMapperHelper',{
    singleton: true,
    entryCompanyDataMapper : {
        // column_3_02   : 'column_1_14',  //B1:Customer Type
        column_3_05   : 'column_1_15',  //B2:Customer Code
        column_3_07   : 'column_1_16',  //B3:Customer Name
        column_3_10   : 'column_1_17',  //B4:Gender
        column_3_13   : 'column_1_18',  //B5:Address
        column_3_17   : 'column_1_19',  //B6:Phone
        column_3_16   : 'column_1_20',  //B7:Email
        column_3_28   : 'column_1_21',  //Fax
        column_3_09   : 'column_1_46'  //B7:NIRC
       // column_3_28   : 'column_1_21'  //B8:Fax
        
    },
    entryServiceCompanyDataMapper : {
        column_1_05 : 'column_10_06',   // Order Code : Order Code
        column_1_16 : 'column_10_14',    // Customer Name : Customer Name
        column_1_14 : 'column_10_12',    // Customer Type : Customer Type
        column_1_15 : 'column_10_13',    // Customer Code : Customer Code
        column_1_17 : 'column_10_15',    // Gender : Gender
        column_1_18 : 'column_10_16',    // Address : Address
        column_1_19 : 'column_10_17',    // Phone No : Phone No
        column_1_20 : 'column_10_18',    // Email : Email
        column_1_21 : 'column_10_19',   // Fax No : Fax No
        column_3_25 : 'column_10_30',    // Balance Service : Balance Service
        column_3_24 : 'column_10_31'    // Used Service : Used Service
        
    },
    /*
    * @Map Screen B and C flds with company info
    * @returns fields mapped with columns of oms_company with oms_order_master
    */
    /*getEntryCompanyDataMapper : {
            // column_3_02   : 'column_1_14',  //B1:Customer Type
            column_3_05   : 'column_1_15',  //B2:Customer Code
            column_3_07   : 'column_1_16',  //B3:Customer Name
            column_3_10   : 'column_1_17',  //B4:Gender
            column_3_13   : 'column_1_18',  //B5:Address
            column_3_17   : 'column_1_19',  //B6:Phone
            column_3_16   : 'column_1_20',  //B7:Email
            // column_3_09   : 'column_1_21',  //B8:Fax
            
        };
        return mappedArr;
    },*/
        /*maps company and department code*/

    companyDepartmentFromStoreDataMapper:{
        code : 'column_8_10', //from store code
         name : 'column_8_11' //form store
    },

    companyDepartmentToStoreDataMapper:{
        code : 'column_8_14', //To store code
        name : 'column_8_15' //To store
    },
    
    /*
    *@map product master combo grid records with order products grid records .
    * @returns fields mapped with columns of p_products with p_order_products
    */
    orderProductsDataMapper:{
            column_5_07  : 'column_2_08', //product_name
            column_5_05  : 'column_2_06', //product_code
            column_5_06  : 'column_2_07', //product_type
            column_5_08  : 'column_2_09', //product_label   
            column_5_12  : 'column_2_10', //brand
            column_5_13  : 'column_2_11', //category
            column_5_14  : 'column_2_12', //color
            column_5_15  : 'column_2_13', //size
            column_5_16  : 'column_2_27', //currency_type
            column_5_19  : 'column_2_14', //sales_price
            supplier_id  : 'supplier_id',
            id           : 'product_id',
            column_5_09  : 'column_2_28'
    },
    
    /*
    *@map batch detail combo grid records with order products grid records .
    * @returns fields mapped with columns of h_products with h_batch_detail
    */
    batchDetailOrderProductsDataMapper : {
            column_4_04  : 'column_2_20', //batch no
            column_6_04  : 'column_2_21', //batch detail no
            column_6_05  : 'column_2_22',  //batch detail code
            column_6_09  : 'column_2_29',    //Cost Price
            column_6_25  : 'column_2_30'   //Stock Balance 
    },

    /*
    *@map batch detail combo grid records with order products grid records .
    * @returns fields mapped with columns of h_products with h_batch_detail
    */
    batchDetailServiceProductsDataMapper : {
            column_4_04  : 'column_11_17', //batch no
            column_6_04  : 'column_11_18', //batch detail no
            column_6_05  : 'column_11_19', //batch detail code
            column_6_25  : 'column_10_32'  //Stock Balance 
    },
    
    /*@map batch detail combo grid records with order products grid records .
    * @returns fields mapped with columns of h_products with h_batch_detail
    */
    batchDetailTransferProductsDataMapper : {
            // column_4_04  : '', //batch no
            column_6_04  : 'column_9_04', //batch detail no
            column_6_05  : 'column_9_05', //batch detail code
            column_6_25  : 'column_9_20'  //Stock Balance 
    },
  
    /*
    *@map transfer detail combo grid records with  products grid records .
    * @returns fields mapped with columns of h_products with h_transfer_detail
    */
     transferOrderProductsDataMapper : {
            column_5_07  : 'column_9_07', //product_name
            column_5_05  : 'column_9_06', //product_code
            column_5_19  : 'column_9_09', //cost_price
            column_5_08  : 'column_2_09', //product_label   
            column_5_16  : 'column_9_10', //currency_type
            supplier_id  : 'supplier_id',
            id           : 'product_id',
            column_5_06  : 'column_9_17', //product type
            column_5_09  : 'column_9_16' //Supplier Name
    },
    
    /*
    *@map product master combo grid records with order products grid records .
    * @returns fields mapped with columns of p_products with p_order_products
    */
    serviceOrderProductsDataMapper: {
            column_5_07  : 'column_11_08', //product_name
            column_5_05  : 'column_11_06', //product_code
            column_5_06  : 'column_11_07', //product_type
            column_5_08  : 'column_11_09', //product_label   
            column_5_18  : 'column_11_11', //sales_price
            column_5_16  : 'column_11_23',
            id           : 'product_id',
            supplier_id  : 'supplier_id'
    },
    
    /*
    * @Map Screen Bwith company info
    * @returns fields mapped with columns of oms_company with oms_order_master
    */
    purchaseEntryCompanyDataMapper : {
            // column_7_04   : 'column_1_14',  //B1:Customer Type
            column_7_07   : 'column_4_13',  //B2:Supplier Name
            column_7_05   : 'column_4_12',  //B3:Supplier Code
            column_7_14   : 'column_4_14',  //B4:Country
            column_7_08   : 'column_4_15',  //B5:Address1
            column_7_09   : 'column_4_16',  //B6:Address2
            column_7_10   : 'column_4_17',  //B7:Address3
            column_7_11   : 'column_4_18',  //B7:Email
            column_7_12   : 'column_4_19',  //B7:Phone Number
            id            : 'supplier_id'  // upplier_id
    },
   
    customerDetailDataMapper : {
        /*maps for Service entry panel*/
        // column_3_02   : 'column_1_14',  //B1:Customer Type
        column_3_05   : 'column_10_13',  //B2:Customer Code
        column_3_07   : 'column_10_14',  //B3:Customer Name
        column_3_10   : 'column_10_15',  //B4:Gender
        column_3_13   : 'column_10_16',  //B5:Address
        column_3_17   : 'column_10_17',  //B6:Phone
        column_3_16   : 'column_10_18',  //B7:Email
        column_3_25   : 'column_10_30',  // Balance Service : Balance Service
        column_3_24   : 'column_10_31',  //Used Service
        column_3_28   : 'column_10_19'  // Fax
       // column_3_22   : 'column_10_33'   // Is Free Flag

        // column_3_09   : 'column_1_21',  //B8:Fax
        // id             : 'id'  // upplier_id
    },
    repairCustomerDetailMapper : {
        /*maps for Repair entry panel*/
        // column_3_02   : 'column_1_14',  //B1:Customer Type
        column_3_05   : 'column_12_12',  //B2:Customer Code
        column_3_07   : 'column_12_13',  //B3:Customer Name
        column_3_10   : 'column_12_14',  //B4:Gender
        column_3_13   : 'column_12_15',  //B5:Address
        column_3_17   : 'column_12_16',  //B6:Phone
        column_3_16   : 'column_12_17',  //B7:Email
        column_3_28   : 'column_12_18'  // Fax
    },
    repairItemDetailMapper : {
        /*maps for Repair entry panel*/
        column_5_05   :  'column_12_30' //product code
    },
    /*
    *@map product master combo grid records with order products grid records .
    * @returns fields mapped with columns of p_products with p_order_products
    */
    purchaseOrderProductsDataMapper: {
            column_5_07  : 'column_6_07', //product_name
            column_5_06  : 'column_6_29', //product_type
            column_5_05  : 'column_6_06', //product_code
            column_5_16  : 'column_6_10', //currency_type
            supplier_id  : 'supplier_id',  //supplier_id,
            id           : 'product_id'
    },
    orderCodeDataMapper:{
            column_1_05 : "column_10_06", //order_code
            column_1_14 : "column_10_12", // Customer Type
            column_3_05 : "column_10_13", //Customer Code
            column_1_16 : "column_10_14", //Customer Name: Customer Name
            column_3_10 : "column_10_15", //Gender
            column_3_13 : "column_10_16", //Address
            column_3_17 : "column_10_17", //Phone No
            column_3_16 : "column_10_18", //Email
            column_1_21 : "column_10_19", //Fax No
            column_3_25 : "column_10_30"    // Balance Service : Balance Service
    },
    repairOrderCodeDataMapper:{
            column_1_14 : "column_12_11", // Customer Type
            column_3_05 : "column_12_12", //Customer Code
            column_1_16 : "column_12_13", //Customer Name: Customer Name
            column_3_10 : "column_12_14", //Gender
            column_3_13 : "column_12_15", //Address
            column_3_17 : "column_12_16", //Phone No
            column_3_16 : "column_12_17", //Email
            column_1_21 : "column_12_18", //Fax No
            column_3_25 : "column_12_42"    // Balance Service : Balance Service
    },
    getStockTransferMasterToStockTransferDetailMapper : {
        column_9_04 : 'column_6_04',  //Batch Detail No
        column_9_05 : 'column_6_05',  //Bach Detail Code
        column_9_10 : 'column_6_10',  //currency_type
        column_9_06 : 'column_5_05',  //product_code
        column_9_07 : 'column_5_07',  //product_name
        column_9_09 : 'column_5_18',  //cost price
        supplier_id : 'supplier_id',
        product_id  : 'id'
        //            : 'column_5_19'   //sale price
    },
    toCompanyNameToCompanyCodeDataMapper:{
        name : 'column_8_30',
        id: 'column_8_29'
    },
});
