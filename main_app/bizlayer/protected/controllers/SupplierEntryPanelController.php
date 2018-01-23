<?php
class SupplierEntryPanelController extends PrivateController {
    protected $_allowed_file_types;
    public function __construct($arg = NULL)
	{
        $this->_parent_screen_id = 24;
        $this->_model_name = 'ProductOrderMaster';
        $this->_idField = 'id';
        parent::__construct($arg);
    }

    /*
    @params mode=new/edit/view
    */
    public function actionGetEntryData(){
        $app=Yii::app();
        $request=$app->request;
        $id = $request->getParam('id',null);
        $entry_code = $request->getParam('entry_code',null);
        $resetEntryForm = $request->getParam('resetEntryForm','0');
        $is_clone = $request->getParam('is_clone',0);
        $clone_master_id = $request->getParam('clone_master_id',null);
        $popup = CJSON::decode($request->getParam('popup','FALSE'));
        $supplier_id = $request->getParam('supplier_id',0);
        // $clone_type = $request->getParam('clone_type',0);
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $company_id = $user_info['company_id'];
        if(!empty($id) && !is_numeric($id)){
            $response = array('success' => FALSE,'msg' => t('entryPanel','Invalid Entry Master ID'));
            $this->renderJSON($response);
            exit;
        }
        if ($id < 1)
            $mode = "new";
        else{
            $mode = "edit";
        }
        // $this->_parent_screen_id =  $is_bill_order == "1" ? 1 : 22;
        $model=ProductOrderMaster::model();
        if($is_clone==1){
            $mode = "edit";
            // $entry_id = $entryMasterModel->cloneOrderMaster($clone_master_id,$user_id,$_include_files,$_include_print,$_include_sku,$_include_order_items);
        }
        $entryDataParams = array(
                'id'                => $id,
                'mode'              => $mode,
                'user_info'         => $user_info,
                'parent_screen_id'  => $this->_parent_screen_id,
                'is_clone'          => $is_clone,
                'popup'             => $popup
            );
        $recordData = $model->getEntryData($entryDataParams);
        // $order_master_code = $productMaster['order_master_code']; 
        
        // if($resetEntryForm!=1){

        //     // $entryDetailRecords = $entryDetailModel->getListData($listDataParams);  
        // }
        // else{
        //     $entryDetailRecords =  array();
        // }
        $entryDetailRecords =  array();
        // if($mode == 'new'){
        //     $csv_report_id = 1;
        //     $entryDetailRecords = ProductOrderDetail::model()->getEntryDetailRecords($csv_report_id,$supplier_id);
        // }
        $latestComment=null;
        $commentCount = null;
        // if(!empty($entry_code)) {
        //     $page_size = 2000;
        //     $limit = 100;
        //     $start_from = 0;
        //     $latestComment= Comment::model()->getCommentList($page_size, $limit, $start_from, $entry_code,false);
        //     $commentCount = Comment::model()->getCommentRecordCount($entry_code);
        // }
        $supplierInfo = Client::model()->findByAttributes(array('id' => $supplier_id,'column_8_22'=> 'supplier','delete_flg' => 0));
        $response=array(
            'success'=>true,
            'data'=>$recordData,
            'entryDetailRecords' => $entryDetailRecords,
            'mode' => $mode,
            'is_clone' => $is_clone,
            'latestComment' => $latestComment,
            'commentCount' => $commentCount,
            'supplierInfo' => array('data' => $supplierInfo),
            'synctime' => date('Y-m-d H:i:s')
        );
        $this->renderJSON($response);
    }

    protected function _processReceiptMasterSaveData($params){
        $entry_id                   = $params['entry_id'];
        $user_info                  = $params['user_info'];
        $mode                       = $params['mode'];
        $user_id                    = $params['user_id'];
        $supplier_id                = &$params['supplier_id'];
        $last_updated_datetime      = $params['last_updated_datetime'];
        $dynamic_fields             = $params['dynamic_fields'];
        $_dynamic_fields            = &$params['_dynamic_fields'];
        $removeOldSupplierDetail    = &$params['removeOldSupplierDetail'];
        // $fixed_fields               = $params['fixed_fields'];
        $supplierOrderStatus        = $params['supplierOrderStatus'];
        $supplierStockStatus        = $params['supplierStockStatus'];

        $oldSupplierCD = null;
        $date = $params['date'];
        $getDynamicFormFlds = FALSE;

        if($mode == 'new'){
            $orderStatus = t('supplier','supplierOrderStatus');
            $supplierOrderStatus = $orderStatus['Order Done'];
            $stockStatus = t('supplier','supplierStockStatus');
            $supplierStockStatus = $stockStatus['NA'];
        }
        if (!empty($entry_id)){
            $entryMaster = ProductOrderMaster::model()->findByAttributes(array('id'=>$entry_id,'delete_flg' => 0));    

            if (empty($entryMaster)){
                $response=array(
                    'success'=>FALSE,
                    'data'=>t('entryPanel','recordNotFound')
                );
                echo CJSON::encode($response);
                exit;                
            } 
            // if($orderMaster['is_draft'] == 1){
            //     $isNewRecord = TRUE;
            // }

            // if($last_updated_datetime < $entryMaster['column_9_08']){
            //     $getDynamicFormFlds = TRUE;    
            // }

            $entryMaster->isNewRecord = false;
            $entryMaster->is_draft = 0;
            $mode = 'edit';
            $entryMaster['column_9_06'] =  $user_info['username'];//$user_info['last_name'].' '.$user_info['firstName'];
            $entryMaster['column_9_07'] = date('Y-m-d H:i');
            // Supplier Order Status
            
            $oldSupplierCD = $entryMaster->column_9_17;
        }
        else
        {
            $entryMaster = new ProductOrderMaster();
            //fields will not be updated only set for new record
            $entryMaster->created_by = $user_id;
            $entryMaster->created_datetime = $date;
            $entryMaster->delete_flg = 0;
            
            $mode = 'new';

        }

        //set dynamic fields
        if(!empty($dynamic_fields)){
            foreach ($dynamic_fields as $field => $field_value) {
                // if($field=="column_9_08" || $field=="column_9_09"/* || $field=="column_9_03"*/)
                    // continue;

                if ($field_value == '')
                    $entryMaster->$field = null;
                else
                    $entryMaster->$field = convertDBStr($field_value);
            }
        }

        // if(!empty($fixed_fields)){
        //     foreach ($fixed_fields as $field => $field_value) {
        //         if ($field_value == '')
        //             $entryMaster->$field = null;
        //         else
        //             $entryMaster->$field = convertDBStr($field_value);
        //     }
        // }
        
        // $is_clone = !empty($orderMaster['parent_entry_id']) ? 1 : 0;
        $entryMaster->updated_by = $user_id;
        $entryMaster->updated_datetime = $date;
        $entryMaster->client_id = $supplier_id;
        $entryMaster->column_9_48 = $supplierOrderStatus;
        $entryMaster->column_9_49 = $supplierStockStatus;

        if($getDynamicFormFlds){
            $_dynamic_fields = $this->_getLatestEntryFldVal($entryMaster);
        }
        $_dynamic_fields['dynamic_fields[column_9_06]'] = $entryMaster->column_9_06;
        $_dynamic_fields['dynamic_fields[column_9_07]'] = $entryMaster->column_9_07;
        $_dynamic_fields['dynamic_fields[column_9_48]'] = $entryMaster->column_9_48;
        $_dynamic_fields['dynamic_fields[column_9_49]'] = $entryMaster->column_9_49;
        
        if($oldSupplierCD != $entryMaster->column_9_17){
            $removeOldSupplierDetail = TRUE;
        }
        // var_dump($_dynamic_fields);exit;
        return $entryMaster;

    }

    private function _getLatestEntryFldVal($entryMaster){
        $_dynamic_fields = array();
        $attributes = $entryMaster->attributes;
        foreach ($attributes as $key => $value) {
            $_dynamic_fields['dynamic_fields['.$key.']'] = $value;
        }

        return $_dynamic_fields;
    }

    public function actionSave(){
        $response=array(
            'success'=>TRUE,
            'data'=> t('entryPanel', 'Record saved successfully')
        );

        $app = Yii::app();
        $request = $app->request;
        
        $entryDetailRecords = CJSON::decode($request->getPost('entryDetailRecords'), true);
        $purchaseDetailRecords = CJSON::decode($request->getPost('purchaseDetailRecords'), true);
        $entry_id = $request->getPost('id');
        $dynamic_fields = $request->getPost('dynamic_fields');
        // $fixed_fields = $request->getPost('fixed_fields',array());
        $partialSave = $request->getPost('partialSave',0);
        $supplier_id = $request->getPost('supplier_id',0);
        $supplierOrderStatus = $request->getPost('supplierOrderStatus',null);
        $supplierStockStatus = $request->getPost('supplierStockStatus',null);
        $synctime = $request->getPost('synctime',null);
        $mode = $request->getPost('mode',null);
        $last_updated_datetime = $request->getPost('last_updated_datetime',null);
        $date = date('Y-m-d H:i:s');
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        
        // $mode = '';
        $isNewRecord = FALSE;
        $oldA0aValue = null;
        // if($partialSave == 0 && (empty($entryDetailRecords) || empty($orderDetailsRecords))){
        //     $response=array(
        //         'success'=>FALSE,
        //         'data'=>array(),
        //         'msg'=> t('entryPanel','record save error')
        //     );
        //     echo CJSON::encode($response);
        //     exit;
        // }
        $_dynamic_fields = array();
        $removeOldSupplierDetail = FALSE;
        $entryMasterSaveParam = array(
            'entry_id' => $entry_id,
            'user_info' => $user_info,
            'mode' => $mode,
            'user_id' => $user_id,
            'dynamic_fields' => $dynamic_fields,
            // 'fixed_fields' => $fixed_fields,
            'date' => $date,
            'supplier_id' => $supplier_id,
            'last_updated_datetime' => $last_updated_datetime,
            '_dynamic_fields' => &$_dynamic_fields,
            'removeOldSupplierDetail' => &$removeOldSupplierDetail,
            'supplierOrderStatus' => $supplierOrderStatus,
            'supplierStockStatus' => $supplierStockStatus
        );
        // Manage Data for Receipt Master for save 
        $entryMaster = $this->_processReceiptMasterSaveData($entryMasterSaveParam);
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();

        try{
            $saved = $entryMaster->save();
            
            if(!$saved) {
                // throw new Exception("Productcategory :".$this->formatErrors($Size->errors));
                $response=array(
                    'success'=>FALSE,
                    'data'=>t('entryPanel','record save error'),
                    'msg'=> $entryMaster->errors
                );

                if ($transaction)
                    $transaction->rollback();
                echo CJSON::encode($response);
                exit;
            }
            else
            {
                if($removeOldSupplierDetail == TRUE){
                    ProductOrderDetail::model()->deleteOldEntry($entryMaster['id']);    
                }
                // SAVE ORDER PRODUCTS RECORD
                if(!empty($entryDetailRecords)){
                    $this->_saveProductOrderDetailRecords($entryDetailRecords,$entryMaster['id'],$user_id,$supplier_id);
                }


                // SAVE PURCHASE PRODUCTS RECORD
                if(!empty($purchaseDetailRecords)){
                    $this->_savePurchaseDetailRecords($purchaseDetailRecords,$entryMaster['id'],$user_id,$entryMaster['column_9_01']);
                    
                }

                
                $editModeActionRoles = ProductOrderMaster::model()->getRecordActionRoles('edit',false,$entryMaster);
                // $transaction->rollback();
                $transaction->commit();
                
                // $actionType = "moveToComplete";
                // foreach ($selectedPdfRecords as $filename) {
                //     FBUtility::moveFile($filename,$actionType);    
                // }

                // $entry_detail_data = $partialSave == 1 ? $this->_getSyncedEntryDetailData($user_role,$entryMaster['id'],$synctime) : array();
                // $order_detail_data = $partialSave == 1 ? $this->_getSyncedOrderDetailData($user_role,$entryMaster['id'],$synctime) : array();
                
                $response=array(
                    'success'               => TRUE,
                    'data'                  => t('entryPanel', 'Record saved successfully'),
                    'id'                    => $entryMaster['id'],
                    'entry_code'            => $entryMaster['column_9_01'],
                    'supplier_id'           => $supplier_id,
                    'editModeActionRoles'   => $editModeActionRoles,
                    'dynamic_fields'        => $_dynamic_fields,
                    // 'entry_detail_data'     => $entry_detail_data,
                    'synctime'              => date('Y-m-d H:i:s')
                );
                echo CJSON::encode($response);
                exit;
            }
        } catch (Exception $e) {
            if ($transaction){
                $transaction->rollback();
            }
            $response=array(
                'success'=>FALSE,
                'data'=>$e->getMessage()
            );
            echo CJSON::encode($response);
            exit;
        }
    }

    private function _savePurchaseDetailRecords($purchaseDetailRecords,$entry_id,$user_id,$entry_code){
        foreach ($purchaseDetailRecords as $key => $record) {
            $purchaseDetailModel = new ProductPurchaseDetail();
            $record['product_order_master_id'] = $entry_id;
            
            if(array_key_exists('id', $record) && !empty($record['id'])){
                $this->_updateRecord($purchaseDetailModel,$record,$user_id);

            }
            else{
                $record['column_12_02'] = $entry_code;
                $pkVal = $this->_insertRecord($purchaseDetailModel,$record,$user_id,'12');
                $record['id'] = $pkVal;
            }

            // $this->_savePurchaseTransaction($record);
        }
    }

    private function _updateOrderDetailStatus($id,$model){
        $record = $model->findByPk($id);

        $status = '';
        if($record['delete_flg'] == 1){
            $orderStatusArr = t('orderDetail','orderStatus');
            $orderCancelled = $orderStatusArr['OrderCancel'];
            $status = "column_2_21='{$orderCancelled}'";
        }
        else{
            /*
            * @column_10_14 :: client Ordered Qty
            * @column_10_04 :: supplier Ordered Qty
            * @if client ordered qty <= supplier ordered qty, then client ordered qty
            * @else supplier Ordered Qty
            */
            $orderedQty = $record->column_10_04;
            $supplierPurchasedQty = $record->column_10_07;
            $clientOrderedQty = $record->column_10_14;
            // $qty = $clientOrderedQty <= $orderedQty ? $clientOrderedQty : $orderedQty;
            $supplierOrderStatusArr = t('supplier','supplierOrderStatus');
            $supplierStockStatusArr = t('supplier','supplierStockStatus');
            $allReceived = $supplierOrderStatusArr['All Received'];
            
            $supplierOrderStatus = '';
            $purchasedQty = 0;
            if($supplierPurchasedQty > 0){
                $purchasedQty = $supplierPurchasedQty < $clientOrderedQty ? $supplierPurchasedQty : $clientOrderedQty;
            }
            /*
            * @column_10_07 :: purchased Qty
            * @if client ordered qty <= purchased qty, then status = all received
            * @else if client ordered qty > purchased qty, then status = partially received
            */
            if(($clientOrderedQty <= $record->column_10_07)){
                $supplierOrderStatus = $supplierOrderStatusArr['All Received'];
            }
            else /*if($qty > $record->column_10_07)*/{
                $supplierOrderStatus = $supplierOrderStatusArr['Partially Received'];
            }

            if(!empty($supplierOrderStatus)){
                $notUpdated = $supplierStockStatusArr['notUpdated'];
                $updated = $supplierStockStatusArr['updated'];
                $status = "column_2_30='{$supplierOrderStatus}'";
                $status.= ",column_2_33 ='{$notUpdated}'";
                $status.= ",column_2_37 ='{$purchasedQty}'";
            }
        }
        if(!empty($status)){
            OrderDetail::model()->updateOrderStatus($record->column_10_11,$status);
        }
    }

    // private function _savePurchaseTransaction($record){
    //     $transaction = null;
    //     if(array_key_exists('id', $record) && !empty($record['id'])){
    //         $transaction = Transaction::model()->findByAttributes(array('column_7_03'=>$record['id'],'delete_flg'=>0));
    //     }

    //     if(empty($transaction)){
    //         $transaction = new Transaction;
    //     }
    //     else{
    //         $transaction->isNewRecord = false;    
    //     }

    //     // invoice number
    //     if(array_key_exists('column_12_09', $record)){
    //         $transaction->column_7_02 = $record['column_12_09'];   
    //     }
    //     // Debit Amount
    //     if(array_key_exists('column_12_07', $record)){
    //         $transaction->column_7_06 = $record['column_12_07'];   
    //     }
    //     // Purchase ID
    //     $transaction->column_7_03 = $record['id'];

    //     $transaction->save();
    // }

    private function _saveProductOrderDetailRecords($entryDetailRecords,$entry_id,$user_id,$supplier_id){
        $orderDetailIds = array();
        $mode = null;
        $oldRec = null;
        foreach ($entryDetailRecords as $key => $record) {

            if(!array_key_exists('id', $record)){
                $mode = 'new';
            }
            else{
                if(array_key_exists('delete_flg', $record)){
                    $mode = 'delete';
                }
                else 
                    $mode = 'edit';
            }
            /* 
            * Entry Detail Ids
            * For New Records Only
            */
            if(array_key_exists('column_10_11', $record) && !empty($record['column_10_11'])  && !array_key_exists('id', $record)){
                array_push($orderDetailIds, $record['column_10_11']);
            }

            $entryDetailModel = new ProductOrderDetail();
            $record['product_order_master_id'] = $entry_id;
            
            /* IF ordered_qty col exists, set original ordered qty = ordered qty*/
            if(array_key_exists('column_10_04', $record)){
                $record['column_10_05'] = $record['column_10_04'];
            }

            /* IF purchased_qty col exists, set old purchased qty = purchased qty*/
            if(array_key_exists('column_10_07', $record)){
                $record['column_10_15'] = $record['column_10_07'];
            }

            if(array_key_exists('id', $record) && !empty($record['id'])){
                $oldRec = $entryDetailModel->findByPk($record['id']);
                $this->_updateRecord($entryDetailModel,$record,$user_id);
                /*
                * @column_10_07:: purchase Qty
                * @Update Order Detail Status only during purchase entry.
                */
                if(array_key_exists('column_10_07', $record) || array_key_exists('delete_flg', $record)){
                    $this->_updateOrderDetailStatus($record['id'],$entryDetailModel);
                }
            }
            else{
                $this->_insertRecord($entryDetailModel,$record,$user_id,'10');
            }
            /*
            * IF CHANGED ORDERED QTY IS GREATER THAN 0, UPDATE STOCK PENDING IN qk_client_product table.
            */
            // if(array_key_exists('column_10_06', $record) && $record['column_10_06'] != 0){
            $this->_updateClientProductStock($record,$supplier_id,$mode,$oldRec);
            $this->_updateProductStock($record,$mode,$oldRec);
            // }
            
        }
        OrderDetail::model()->updateOrderStatus($orderDetailIds);
    }
    

    private function _updateClientProductStock($record,$supplier_id,$mode='new',$oldRec=null){
        $product_id = $record['product_id'];
        // $stock_qty = $record['column_10_06'];
        $model = ClientProduct::model()->findByAttributes(array('product_id' => $product_id,'client_id' => $supplier_id,'delete_flg' => 0));
        if(empty($model)){
            $model = new ClientProduct;
            $model->isNewRecord = true;
            // changed stock:: supplier Ordered Qty
            if(array_key_exists('column_10_06', $record)){
                $model->column_11_14 = $record['column_10_06'];
            }
            // net purchased qty as purchased_qty
            if(array_key_exists('column_10_16', $record)){
                $model->column_11_15 = $record['column_10_16'];

                $model->column_11_14 = intval($model['column_11_14']) - intval($record['column_10_16']);
            }
            // purchased rate
            if(array_key_exists('column_10_08', $record)){
                $model->column_11_10 = $record['column_10_08'];
            }
            // client Ordered Qty
            if(array_key_exists('column_10_14', $record)){
                $model->column_11_12 = $record['column_10_14'];
                // Bal Qty(11-12)
                $model->column_11_13 = intval($model->column_11_11) - $model->column_11_12;
            }
            $model->client_id  = $supplier_id;
            $model->product_id = $product_id;
            $model->save();
        }
        else{
            if($mode == 'delete'){
                //client ordered qty
                $model->column_11_12 = intval($model->column_11_12) - intval($oldRec['column_10_14']);
                // Bal Qty(11-12)
                $model->column_11_13 = intval($model->column_11_11) - $model->column_11_12;

                if(empty($oldRec['column_10_15'])){
                    // Supplier Ordered Qty subtract from old_ordered_qty
                    $model->column_11_14 = intval($model->column_11_14) - intval($oldRec['column_10_05']);
                }
                else{
                    // Supplier Ordered Qty = Supplier Ordered Qty - (old_ordered_qty - old_purchased_qty)
                    $model->column_11_14 = intval($model->column_11_14) - (intval($oldRec['column_10_05']) - intval($oldRec['column_10_15']));
                }
            }
            else{
                // changed stock
                if(array_key_exists('column_10_06', $record)){
                    $model->column_11_14 = intval($model['column_11_14']) + intval($record['column_10_06']);
                }
                // net purchased qty as purchased_qty
                if(array_key_exists('column_10_16', $record)){
                    $model->column_11_15 = intval($model['column_11_15']) + intval($record['column_10_16']);
                    $model->column_11_14 = intval($model['column_11_14']) - intval($record['column_10_16']);
                }
                // purchased rate
                if(array_key_exists('column_10_08', $record)){
                    $model->column_11_10 = $record['column_10_08'];
                }
                // client Ordered Qty
                if(array_key_exists('column_10_14', $record)){
                    $model->column_11_12 = intval($model['column_11_12']) + intval($record['column_10_14']);
                    // Bal Qty(11-12)
                    $model->column_11_13 = intval($model->column_11_11) - intval($model->column_11_12);
                }
            }
            $model->update();
        }
    }

    private function _updateProductStock($record,$mode='new',$oldRec=null){
        $product_id = $record['product_id'];
        // $stock_qty = $record['column_10_06'];
        $model = Product::model()->findByAttributes(array('id' => $product_id,'delete_flg' => 0));
        if(empty($model)){
            $model = new Product;
            $model->isNewRecord = true;
            // $model->product_id = $product_id;
            // changed stock:: supplier Ordered Qty
            if(array_key_exists('column_10_06', $record)){
                $model->column_5_14 = $record['column_10_06'];
            }
            // net purchased qty as purchased_qty
            if(array_key_exists('column_10_16', $record)){
                $model->column_5_15 = $record['column_10_16'];
                $model->column_5_14 = intval($model->column_5_14) - intval($record['column_10_16']);
            }
            // purchased rate
            if(array_key_exists('column_10_08', $record)){
                $model->column_5_10 = $record['column_10_08'];
            }
            // client Ordered Qty
            if(array_key_exists('column_10_14', $record)){
                $model->column_5_12 = $record['column_10_14'];
                // Bal Qty(11-12)
                $model->column_5_13 = intval($model->column_5_11) - intval($model->column_5_12);
            }
            $model->save();
        }
        else{
            if($mode == 'delete'){
                //client ordered qty
                $model->column_5_12 = intval($model->column_5_12) - intval($oldRec['column_10_14']);
                // Bal Qty(11-12)
                $model->column_5_13 = intval($model->column_5_11) - $model->column_5_12;

                if(empty($oldRec['column_10_15'])){
                    // Supplier Ordered Qty subtract from old_ordered_qty
                    $model->column_5_14 = intval($model->column_5_14) - intval($oldRec['column_10_05']);
                }
                else{
                    // Supplier Ordered Qty = Supplier Ordered Qty - (old_ordered_qty - old_purchased_qty)
                    $model->column_5_14 = intval($model->column_5_14) - (intval($oldRec['column_10_05']) - intval($oldRec['column_10_15']));
                }
            }
            else{
                // changed stock :: supplier Ordered Qty
                if(array_key_exists('column_10_06', $record)){
                    $model->column_5_14 = intval($model['column_5_14']) + intval($record['column_10_06']);
                }
                // net purchased qty as purchased_qty
                if(array_key_exists('column_10_16', $record)){
                    $model->column_5_15 = intval($model['column_5_15']) + intval($record['column_10_16']);
                    $model->column_5_14 = intval($model->column_5_14) - intval($record['column_10_16']);
                }
                // purchased rate
                if(array_key_exists('column_10_08', $record)){
                    $model->column_5_10 = $record['column_10_08'];
                }
                // client Ordered Qty
                if(array_key_exists('column_10_14', $record)){
                    $model->column_5_12 = intval($model['column_5_12']) + intval($record['column_10_14']);
                    // Bal Qty(11-12)
                    $model->column_5_13 = intval($model->column_5_11) - intval($model->column_5_12);
                }
            }
            $model->update();
        }
    }

    private function _getSyncedEntryDetailData($user_role,$entry_id,$synctime){
        $model = OrderProduct::model();
        $getWhereConditionParams = array(
            'alais'                     => 't3',
            'order_masters_id'          => $entry_id,
        );
        $sql_where = $model->getWhereCondition($getWhereConditionParams);
        $sort = array(array('property' => 'column_3_22','direction'=>'ASC'));//CJSON::decode('[{"property":"column_3_22","direction":"ASC"}]');
        $dgUtil = new DatagridUtil;
        $dgUtil->_datagrid_id = 6;
        $listDataParams = array(
            'for_count'  => FALSE,
            'sql_where'  => $sql_where,
            'user_role'  => $user_role,
            'fields'     => null,
            'sort'       => $sort,
            'synctime'   => $synctime,
            'dgUtil'     => $dgUtil
        );
        $syncedData = $model->getListData($listDataParams);
        return $syncedData;
    }

    private function _insertRecord(&$model,$row,$user_id,$alais) {
        $product_order_master_id = $row['product_order_master_id'];
        $arrRecords = $this->_prepareRow($row,$alais);
        $rec = $arrRecords['id'];
        $model->attributes          = $rec;
        $model->product_order_master_id    = $product_order_master_id;
        if(array_key_exists('product_id', $row)){
            $model->product_id = $row['product_id'];
        }

        // $model->ext_id              = $memberRow['ext_id'];
        $model->created_datetime    = $model->updated_datetime = date('Y-m-d H:i:s');
        $model->created_by          = $model->updated_by = $user_id;
        $result                     = $model->save();
        $isUpdate                   = false;
        // return $isUpdate;
        return $model->getPrimaryKey();
    }

    private function _updateRecord($model, $row, $user_id) {
        $row['updated_datetime'] = date('Y-m-d H:i:s');
        $row['updated_by'] = $user_id;
        $model->updateByPk($row[$this->_idField], $row);
        return;
    }

    private function _prepareRow($memberRow,$alais) {
        $arr = array();
        foreach ($memberRow as $key => $value) {
            $property = explode("_", $key);
            if(count($property)>1) {
                $property_id = $property[1];
                if ($property_id == $alais) {
                    $arr['id'][$key] = $value;
                }
            }
        }
        return $arr;
    }

    public function actionUpdateStock(){
        $request = Yii::app()->request;
        $entry_id = $request->getParam('entry_id',0);
        $supplier_id = $request->getParam('supplier_id',0);
        $productIds = $request->getParam('productIds',null);

        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();

        try{
            Product::model()->updateProductStock($productIds);
            ClientProduct::model()->updateClientProductStock($supplier_id,$productIds);
            
            $supplierStockStatusArr = t('supplier','supplierStockStatus');
            $updated = $supplierStockStatusArr['updated'];
            $supplierMaster = ProductOrderMaster::model()->findByPk($entry_id);
            $supplierMaster->isNewRecord = FALSE;
            $supplierMaster->column_9_49 = $updated;
            $supplierMaster->update();
            
            ProductOrderDetail::model()->setOrderDetailStatus($entry_id,$updated);
            
            $transaction->commit();    
            
            echo CJSON::encode(array(
                                        'success'=> TRUE,
                                        'msg'=> t('supplier','Stock Updated Successfully')
                                    ));
        }
        catch(Exception $e){
            if($transaction)
                $transaction->rollback();
            echo CJSON::encode(array(
                                        'success'=> FALSE,
                                        'msg'=> t('supplier','Stock Update Failed'),
                                        'error' => $e->getMessage()
                                    ));
        }
    }
}
