<?php
class TransferStockWinController extends PrivateController {
    protected $is_billGenerate;
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 16;
        $this->_controller_name = 'orderMaster';
        $this->_model_name ='OrderMaster';
        $this->_table_name = 'p_order_master';
        $this->_pk_col = 'id';
        $this->_keyword_searchable_fields = array("column_1_02","column_1_03","column_1_05");
        $this->is_billGenerate = false;
    }

    /*
    * retunrs orderMaster list for gridview
    */
    public function actionList() {
        $this->_getList();
    }
    private function _getList($return_array=array()) {
        $app = Yii::app();
        $request = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns   = $request->getParam('get_columns', 0);
        $company_code  = $request->getParam('company_code', null);
        $entry_id      = $request->getParam('entry_id', null);
        $order_type    = $request->getParam('order_type', null);
        $datagrid_id   = $request->getParam('datagrid_id', 0);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        if (empty($datagrid_id)){
            //if datagrid_id is not passed by client side then use controller assigned datagrid_id
            $datagrid_id = $this->_datagrid_id;
        }

        $keywords = $request->getParam('query', null);
        $page     = $request->getParam('page', 1);

        $user_info       = $app->user->getUserInfo();
        $user_role       = $user_info['userRole'];
        $user_id         = $user_info['user_id'];
        $set_template_id = null;
        $template_id     = $request->getParam('template_id', null);
        $search_id       = $request->getParam('search_id', null);
        $default         = Yii::t('datagridTemplateHelper','default');
        if (empty($template_id)){
            //if template_id is not passed then only set_template_id will work
            $set_template_id = $request->getParam('set_template_id', null);
            if(!empty($set_template_id)) {
                if($set_template_id == $default) {
                    $set_template_id=null;
                }
                $this->setTemplate($datagrid_id,$set_template_id);
                $template_id = $set_template_id;
            }
        }
        $get_template_list = $request->getParam('get_template_list', 0);
        if($get_template_list ==1) {
            $templates = $this->getTemplates($datagrid_id, $user_id);
        }
        else {
            $templates['template_id']=null;
            $templates['templateList']=null;
        }
        /*gets the saved search list*/
        $searchList = $request->getParam('get_search_list', false);
        if($searchList) {
            $searchList = Search::model()->getSearchResult($datagrid_id, $user_id);
        }
        else {
            $searchList=null;
        }

        /*param sent from client side for all page CSV dwnld*/
        $clientPage = $request->getParam('pages',null);
        
        $save_page_size = $request->getParam('save_page_size', 0);
        $sort = CJSON::decode($request->getParam('sort', ''),true);
        $page_size = $request->getParam('limit', 0);

        if (!empty($save_page_size) && $save_page_size > 0)
        {
            UserPreference::model()->saveDatagridPageSize($user_id, $this->_datagrid_id, $save_page_size);
        }    


        $productMasterModel = Product::model();
        
        $alais = "t5";
        $roleFilterParams = array(
                'user_info'             => $user_info,
                'alais'                 => $alais
        );
        $sql_where_rolewise = $productMasterModel->getFilterByRoleCondition($roleFilterParams);

        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
            'company_code'              => $company_code,
            'entry_id'                  => $entry_id,
            'sql_where_rolewise'        => $sql_where_rolewise

        );
        $sql_where = $productMasterModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $filter_components=array();
        $helpTextInfo=array();
        // $skuSummary_col_info = array();
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];
            // if((!empty($forInvoiceBill) && $forInvoiceBill=='true') || (!empty($forInvoicePayment) && $forInvoicePayment)){
            //     $dgUtil->_datagrid_id = 16;
            //     $skuSummary_col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            //     $dgUtil->_datagrid_id = !empty($datagrid_id) ? $datagrid_id :15; 
            //     $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            //     $datagrid_info = $col_info['datagrid_info'];
            // }
            $column_fields = array_merge($fields);      
            // $column_fields[] = array('name' => 'id','mapping' => 'id');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            $column_fields[] = array('name' => 'supplier_id','mapping' => 'supplier_id');

            $col_info['fields'] = $column_fields;
            $datagrid_info = $col_info['datagrid_info'];
            //$helpTextInfo = HelpText::model()->getRespectiveHelp($dgUtil->_datagrid_id);
        }
        else
        {
            $datagrid_info = $dgUtil->getDatagridInfo($user_role);
        }
        if($clientPage == 'allPages')
            $page_size = 2000;
        else {
            if (empty($page_size))
                $page_size = $datagrid_info['page_size'] > 0 ? $datagrid_info['page_size'] : 100;
        }
        $startFrom= 0;
        $synctime = null;
        if($get_sync_data == 1) {
            $synctime = $request->getParam('synctime', null);
        }
        $getListDataFuncParams = array(
            'for_count'            => true,
            'sql_where'            => $sql_where,
            'user_role'            => $user_role,
            'fields'               => null,
            'pageSize'             => $page_size,
            'startFrom'            => $startFrom,
            'sort'                 => $sort,
            'dgUtil'               => $dgUtil,
            'datagrid_template_id' => $templates['template_id'],
            'synctime'             => $synctime,
            'datagrid_id'          => $datagrid_id,
            // 'billClosingDate'      => $billClosingDay,
            // 'order_type'           => $order_type,
            // 'order_transaction_id' => $order_transaction_id,
            // 'forInvoicePayment'    => $forInvoicePayment,
            // 'forInvoiceBill'       => $forInvoiceBill,
            // 'invoiceYear'          => $invoiceYear,
            // 'invoiceMonth'         => $invoiceMonth,
            // 'forPickingEntry'      => $forPickingEntry,
            // 'delivery_date'        => $delivery_date,
            // 'mode'                 => $mode,
            // 'picking_master_id'    => $picking_master_id
            
        );
        $total = $productMasterModel->getListData($getListDataFuncParams);


        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination

        $getListDataFuncParams['for_count'] = false;
        $getListDataFuncParams['startFrom'] = $startFrom;
        $recordData = $productMasterModel->getListData($getListDataFuncParams);
        
        $tempSearchList = $request->getParam('get_temp_search_list', 0);
        // $orderArr =  array('no_orders'=>null,'total_sp'=>null);
        // if($forInvoiceBill=='true'){
        //     $totalOrders = $productMasterModel->getTotalOrderNumber($user_info['company_id'],$company_code,$billClosingDay,$forInvoiceBill,$order_transaction_id,$invoiceMonth,$invoiceYear);
        //     $orderArr = array('no_orders'=>$totalOrders['count'],'total_sp'=>$totalOrders['total']);
        // }
        // else if($forInvoicePayment=='true'){
        //     $totalOrders = $orderMasterModel->getTotalOrderNumber($user_info['company_id'],$company_code,$billClosingDay,$forInvoiceBill=false,$order_transaction_id);
        //     $orderArr = array('no_orders'=>$totalOrders['count'],'total_sp'=>$totalOrders['total']);
        // } 
        if($tempSearchList == 1) {
            $searchTemplateData = Search::model()->getTemplateSearchResult($datagrid_id,$user_id);
            foreach ($searchTemplateData as $key => $value) {
                $search_criteria = CJSON::decode($value['search_criteria']);
                $search_criteria = $this->checkDate($search_criteria);
                // $search_criteria = $this->_checkToday($search_criteria);
                $searchTemplateData[$key]['search_criteria']=$search_criteria;
            }
        }else {
            $searchTemplateData = null;
        }
        /*if($invoiceList=='true' && empty($order_transaction_id)){
            $total = null;
            $total_pages =  null;
            $page_size = null;
            $recordData = array();
        }*/
        if($get_sync_data == 1) {
            $data = array(
                'success'   => TRUE,
                'msg'       => Yii::t('general','saveSuccess'),
                'syncedData'=> $recordData,
                'synctime'  => date('Y-m-d H:i:s')
            );
            if(!empty($return_array)) {
                $data = array_merge($data, $return_array);      
            }
        }else {
            $data = array(
                'success' => TRUE,
                'total' => $total,
                'current_page' => $currentPage + 1,
                'total_pages' => $totalPages,
                'page_size' => $page_size,
                'isLast' => $isLast,
                'columns' => array_key_exists('columns', $col_info) ? $col_info['columns'] : array(),
                'fields' => array_key_exists('fields', $col_info) ? $col_info['fields'] : array(),
                'data' => $recordData,
                'filter_components' =>$filter_components,
                'templateList'=>$templates['templateList'],
                'templateId'=>$templates['template_id'],
                'searchList'=>$searchList,
                'searchTemplateData' =>$searchTemplateData,
                'synctime' =>date('Y-m-d H:i:s'),
                'helpTextInfo' => $helpTextInfo,
                // 'orderTotal'=>$orderArr,
                // 'skuSummaryColumns'=>$skuSummary_col_info
            );
        }
        if($clientPage == 'allPages')
        {
            $prefix = 'orderMaster';
            $allPageCsv = new AllPageCsv();
            /*column parameter sent to get columns instead of using datagrid_id for getting columns*/
            $allPageCsv->getAllCsvDownload($recordData,$datagrid_id, $prefix, $col_info['columns']);
        }
        else
            $this->renderJSON($data);
    }
    public function actionCrud() {
        $app                = Yii::app();
        $request            = $app->request;
        $user_info          = $app->user->getUserInfo();
        $user_id            = $user_info['user_id'];
        $user_role          = $user_info['userRole'];
        $newRecords         = CJSON::decode($request->getParam('newRecords', true));
        $modifiedRecords    = CJSON::decode($request->getParam('modifiedRecords', true));
        $deletedRecords     = CJSON::decode($request->getParam('deletedRecords', true));
        // $projectDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $synctime = Yii::app()->request->getParam('synctime');
        if($user_role!=50){
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','previlageDeclined')
            );
            $this->renderJSON($arr);
        }
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            $model = new OrderMaster;
            if(!empty($deletedRecords)) {
                foreach ($deletedRecords as $deletedRecord) {
                    $this->_deleteRecord($model, $deletedRecord);
                }
            }
            if(!empty($modifiedRecords)) {
                foreach ($modifiedRecords as $modifiedRecord) {
                    $this->_updateRecord($model, $modifiedRecord,$user_id);
                }
            }
            if(!empty($newRecords)) {
                foreach ($newRecords as $newRecord) {
                    $this->_insertRecord($newRecord,$user_id);
                }
            }
            $transaction->commit();
            $success_array = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess'),
            );
            $this->_getList($success_array);
        } catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
            $this->_getList($arr);
        }
    }
    private function _insertRecord($orderRow,$user_id) {
        $arrRecords = $this->_prepareRow($orderRow);
        $orderRecord = $arrRecords['id'];
        $model = new OrderMaster;
        $model->attributes = $orderRecord;
        $model->ext_id = $orderRow['ext_id'];
        $model->created_datetime = $model->updated_datetime = date('Y-m-d H:i:s');
        $model->created_by = $model->updated_by = $user_id;
        $result = $model->save();
        $isUpdate=false;
        return $isUpdate;
    }
    private function _prepareRow($orderRow) {
        $arr = array();
        foreach ($orderRow as $key => $value) {
            $property = explode("_", $key);
            // table_id = 1: a_order_masters
            if(count($property)>1) {
                $property_id = $property[1];
                if ($property_id == '1') {
                    $arr['id'][$key] = $value;
                }
            }
        }
        return $arr;
    }
    private function _updateRecord($model, $orderRow, $user_id) {
        $orderRow['updated_datetime'] = date('Y-m-d H:i:s');
        $orderRow['updated_by'] = $user_id;
        $model->updateByPk($orderRow[$this->_idField], $orderRow);
        return;
    }
    private function _deleteRecord($model,$id) {
        $model->updateByPk($id, array('delete_flg'=>1,'updated_datetime'=>date('Y-m-d H:i:s')));
        return;
    }

    public function actionDeleteRecord(){
        $id = Yii::app()->request->getPost('id',0);
        $entry_code   = Yii::app()->request->getPost('entry_code',0);
        $fileModel    =   File::Model();
        $getOrderFile = $fileModel->findAllByAttributes(array('ref_record_id'=>$entry_code));
        if($getOrderFile){
            foreach ($getOrderFile as  $filename) {
                $file_id = $filename['file_id'];
                $folder_filename = explode('a*_^F>9_',$filename['file_path']);
                FBUtility::removeDeletedFiles($file_id,$folder_filename[0]);
            }
        }
        $model = OrderMaster::model();
        $this->_deleteRecord($model,$id);
        $response = array('success' => TRUE);
        $this->renderJSON($response);
    }
    /**
     * @return Generatable  ordermasterIds
     */
    public  function actionGetOrderMasterIds(){
        $company_data = CJSON::decode(Yii::app()->request->getParam('company_data', 0));
        $forInvoicePayment = Yii::app()->request->getParam('forInvoicePayment', false);
        $forRemainPayment = Yii::app()->request->getParam('forRemainPayment', false);
        $billYear = Yii::app()->request->getParam('billYear', 0);
        $billMonth = Yii::app()->request->getParam('billMonth', 0);
        $model =  new OrderMaster;
        $generatedOrderMasterIds = array();
        $userInfo = Yii::app()->user->getUserInfo();
        $tempCompanyCode = '';
        foreach ($company_data as $company_details) {
            $company_code   = !isset($company_details['column_8_02']) ? '' : $company_details['column_8_02'];
            if($company_code!=$tempCompanyCode)
                $orderMasterIds =  array();
            $tempCompanyCode = $company_code;
            $billClosingDay   = !isset($company_details['column_8_12']) ? '' : $company_details['column_8_12'];
            if(!$forRemainPayment){
                $matchedOrderMasterIds = $model->getUnlockOrderMasterIds($company_code,$billClosingDay,$userInfo['company_id'],$forInvoicePayment,$billYear,$billMonth);
                if(!empty($matchedOrderMasterIds)){
                    foreach ($matchedOrderMasterIds as $key => $value) {
                        array_push($orderMasterIds,$value['column_1_01']);
                        array_push($generatedOrderMasterIds,$value['column_1_01']);
                    }
                    $this->updateInvoiceRelatedData($orderMasterIds,$generateOrderBill=0,
                                                    $forInvoicePayment,$company_details,null,$billMonth,$billYear);
                }
            }
            //for  Remaining Remarks Only
            else{
                $this->updateInvoiceRelatedData(null,$generateOrderBill=0,
                                                $forInvoicePayment,$company_details,$forRemainPayment);

                echo CJSON::encode(array('success'=>true,
                                'msg'=>t('orderMaster','Bill  Generated payment without order'),
                                'orderMasterIds'=>array()
                                ));
                exit;
            }
        }
       
        if(!empty($orderMasterIds)){
            $msg = ($forInvoicePayment=='true'? t('orderMaster','selected Order Bill  Paid SuccessFully') : t('orderMaster','selected Order Bill Generated'));
            echo CJSON::encode(array('success'=>true,
                                    'msg'=>$msg,
                                    'orderMasterIds'=>$generatedOrderMasterIds
                                    ));
        }
        else{
            echo CJSON::encode(array('success'=>false,
                                'msg'=>t('orderMaster','selected Order Bill Fialed to Generate'),
                                'orderMasterIds'=>array()
                                ));
        }
        exit;       
    } 
    /**
     * @return updated  Invoice and payment related data
     */
    public function updateInvoiceRelatedData($orderMasterIds = array(),$generateOrderBill=null,$forInvoicePayment=false,$companyDetails=array(),$remainAmount=null,$billMonth=null,$billYear=null){
        $connection=Yii::app()->db;
        $app = Yii::app();
        $user_info = $app->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $transaction=$connection->beginTransaction();
        $userInfo = Yii::app()->user->getUserInfo();
        try {
            $model = new OrderMaster;
           // $OrderStatusModel =  new OrderStatus;
            $companyModel       = new Client;
            $company_id         = !isset($companyDetails['column_8_01']) ? '' : $companyDetails['column_8_01'];
            $company_code       = !isset($companyDetails['column_8_02']) ? '' : $companyDetails['column_8_02'];
            $paymentAmount      = !isset($companyDetails['column_8_23']) ? 0 : $companyDetails['column_8_23'];
            $billAmount         = !isset($companyDetails['column_8_21']) ? 0 : $companyDetails['column_8_21'];
            //$billType   = !isset($companyDetails['column_7_15']) ? '' : $companyDetails['column_7_15'];
            $paymentMethod      = !isset($companyDetails['column_8_13']) ? '' : $companyDetails['column_8_13'];
            $paymentRemarks     = !isset($companyDetails['column_8_24']) ? '' : $companyDetails['column_8_24'];
            $billClosingDay     = !isset($companyDetails['column_8_12']) ? '' : $companyDetails['column_8_12'];
            $totalBillAmount    = $model->getBillAmount($company_code,$billClosingDay,$userInfo['company_id'],$forInvoicePayment,$billMonth,$billYear);
            if($generateOrderBill==1){
                $selectedGeneratedBillId = array();
                foreach ($orderMasterIds  as $key=> $value) {
                    array_push($selectedGeneratedBillId,$value);
                }
                $generateOrderBillIds = implode(',', $selectedGeneratedBillId);
                $totalBillAmount = $model->getSelectedBillAmount($generateOrderBillIds,$billClosingDay,$userInfo['company_id'],$forInvoicePayment,$billMonth,$billYear);
             
            }
            $companyInfo = $companyModel->findByAttributes(array('column_8_02'=>$company_code));
            
            //if payment without order  button click
            if(!$remainAmount)
            {
                foreach ($orderMasterIds as $orderMasterId) {
                    $orderMasterArr =  array();
                    $orderMasterRecord = $model->findByAttributes(array('column_1_01'=>$orderMasterId));
                    $orderMasterArr[$this->_idField] = $orderMasterRecord['id'];
                    $lockRecExist = $this->checkOrderDetailRec($orderMasterRecord['id'],$forInvoicePayment,$userInfo['company_id']);
                    
                    if($forInvoicePayment=='false'){
                        $bill_status = $lockRecExist<1 ? t('orderMaster','bill generated') :t('orderMaster','partial bill generated');
                        $orderMasterArr['column_1_110'] = date('Y-m-d');
                        $orderMasterArr['column_1_109'] = $bill_status;
                        $orderMasterArr['column_1_111'] = t('orderMaster','unpaid');
                    }
                    else{
                         $bill_status = $lockRecExist<1 ? t('orderMaster','paid') :t('orderMaster','partial paid');
                        $orderMasterArr['column_1_111'] = $bill_status;
                        $orderMasterArr['column_1_112'] = date('Y-m-d');
                        $paid = t('orderMaster','paid');
                        if($bill_status=="{$paid}"){
                            $orderMasterArr['column_1_109'] = t('orderMaster','bill generated');
                        }
                    }
                    $this->_updateRecord($model, $orderMasterArr,$user_id);
                    //$this->updateOrderStatus($orderStatusModel, $orderMasterId);
                    $commentParams = array(
                        'comment'                  => t('orderMaster','comments').$orderMasterId,
                        'ref_record_id'            => $orderMasterId,
                        'table_id'                 => 1
                    );
                    $this->actionSaveComment($commentParams);
                    //$this->addOrderComment($orderMasterId);
                }
            }
            $this->addNewOrderTransaction($companyDetails,$totalBillAmount,$companyInfo,$forInvoicePayment,$paymentAmount,/*$billType,*/$paymentMethod,$paymentRemarks,$remainAmount); 
            $this->updateTransactionRecord($companyDetails,$forInvoicePayment);
           
            //if no  remaining  amount  button click
            if(!$remainAmount)
            {
                $this->saveOrderTransactionItem($orderMasterIds);
            }

            $this->updateCompanyInfo($companyModel,$companyInfo,$totalBillAmount,$forInvoicePayment,$paymentAmount);
            $transaction->commit();
        } catch (Exception $e) {
            $transaction->rollback();
            //Yii::app()->user->setFlash('error', "{$e->getMessage()}");
           /* $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );*/
        }
    }
    /**
     * @return check lock or Unlock  records of orderDetail
     */
    public  function checkOrderDetailRec($orderMasterId,$forInvoicePayment,$user_company_id){
        $order_detail = array();
        $model =  new  OrderDetail;
        $lockRec = $model->checkLockRecords($orderMasterId,$user_company_id);
        $unlockRec = $model->getUnLockRec($orderMasterId,$user_company_id);
        //do not  update if  lock record is found  in  order  detail;
        if(!empty($unlockRec)){
            foreach ($unlockRec as $key => $value) {
                $order_detail['id'] =  $value['id'];
              if($forInvoicePayment=='false'){
                    $order_detail['column_2_35'] = t('orderMaster','order_detail_bill_generated');
                    $order_detail['column_2_36'] = t('orderMaster','order_detail_unpaid');
                }
                else{
                    $order_detail['column_2_36'] = t('orderMaster','order_detail_paid');
                    $order_detail['column_2_35'] = t('orderMaster','order_detail_bill_generated');
                }
                $model->updateByPk($order_detail['id'],$order_detail);
            }
        }
        return $lockRec;
    }

    /**
     * @return ADDED ORDER TRANSACTION Records.
     */

    public function addNewOrderTransaction($companyDetails, $totalBillAmount, $companyInfo,$forInvoicePayment,$paymentAmount,/*$billType,*/$paymentMethod,$paymentRemarks,$remainAmount){
        $model = new Transaction;
        //for invoiceBillPayment
        if($forInvoicePayment=='false'){
            $model->column_7_05 =  t('orderMaster','fromInvoice');
            $model->column_7_12  = $totalBillAmount;//Debit Balance
            $model->column_7_15   = Yii::t('orderMaster', 'bill generated');//$billType;
        }
        else{
            // for  forInvoicePayment
            $model->column_7_11   = $paymentAmount;//credit Balance
            $model->column_7_05 =  t('orderMaster','fromPayment');
            if($remainAmount=='true')
                $model->column_7_15  = Yii::t('orderMaster', 'payment without order');
            else
                $model->column_7_15   = Yii::t('orderMaster', 'bill payment');

            $model->column_7_14   = $paymentRemarks;
            $model->column_7_10   = $paymentMethod;
           
        }
       // $model->isNewRecord = true;
        $app                    =  Yii::app();
        $user_info              = $app->user->getUserInfo();
        $model->department_id   = $user_info['department_id'];
        $model->company_id      = $user_info['company_id'];
        $model->column_7_04     = $companyDetails['column_8_01'];
        $model->column_7_06     = date('Y-m-d'); 
        $model->column_7_07     = date('H:i:s');  
        $model->save();
        return;
    }

    /**
     * @return Update Transaction Records After Insertings Records
     */

    public  function updateTransactionRecord($companyDetails, $forInvoicePayment){
        $model = new Transaction;
        $lastTransactionId = $model->getLastOrderTransaction();
        $totalDebitCredit =  $model->getOldBalance($companyDetails['column_8_01']);
        $orderTransactionRecord = $model->findByAttributes(array('id'=>$lastTransactionId));
        //for invoiceBillPayment
        if($forInvoicePayment=='false'){
            $newBalance = $totalDebitCredit['totaldebit'] - $totalDebitCredit['totalcredit'];
            $orderTransactionRecord['column_7_13']   = $newBalance;//$companyInfo['column_7_33'];
        }
        else{
            // for  forInvoicePayment
            $newBalance = $totalDebitCredit['totalcredit'] - $totalDebitCredit['totaldebit'];
            $orderTransactionRecord['column_7_13'] = $newBalance;
        }
        $orderTransactionRecord->save();
        $model->updateByPk($lastTransactionId, $orderTransactionRecord);
        return;
    }

    /**
     * @return INSERT ORDER TRANSACTION ITEM
     */
    public function saveOrderTransactionItem($orderMasterIds){
        $orderTransactionModel =  new  Transaction;
        $orderTransactionId =  $orderTransactionModel->getLastOrderTransaction();
        $app =  Yii::app();
        $user_info = $app->user->getUserInfo();
        foreach ($orderMasterIds as $orderMasterId) {
            $model =  new TransactionItem;
            $model->isNewRecord = true;
            $model->department_id           = $user_info['department_id'];
            $model->company_id              = $user_info['company_id'];
           // $model->created_by              = $user_info['user_id'];
           // $model->created_datetime        = date('Y-m-d H:i:s');
            $model->order_master_id         = $orderMasterId;
            $model->column_13_02            = t('orderMaster','orderType');
            $model->order_transaction_id    = $orderTransactionId;
            $model->fiscal_year             = date('Y');
            $model->save();
        }
        return;
    }
    /**
     * @return Update Company Information  after Transaction.
     */
    public function updateCompanyInfo($model, $companyRows,$totalBillAmount,$forInvoicePayment,$paymentAmount){
        $orderTransaction =  new Transaction;
        $totalDebitCreditAmount = $orderTransaction->getTotalOrderDebitCreditTransac($companyRows['column_8_02']);
        $company_details =  array();
        $date= date('Y-m-d');
        if($forInvoicePayment=='true'){
            $company_details['column_8_18'] = $totalDebitCreditAmount['totalcreditamount']; //:: Total Paid Amount
            $company_details['column_8_19'] = 0;
            $company_details['column_8_16'] = $date;//::Last Payment Date
            $company_details['column_8_21'] = 0; //::Bill Amount.
            $company_details['column_8_20'] = $totalDebitCreditAmount['totaldebitamount'] - $totalDebitCreditAmount['totalcreditamount'];//::remaining.
        }
        else{
            $company_details['column_8_19'] = 0;
            $company_details['column_8_17'] = $totalDebitCreditAmount['totaldebitamount']; //:: total Bill Generate Amount.
            $company_details['column_8_20'] = $totalDebitCreditAmount['totaldebitamount'] - $totalDebitCreditAmount['totalcreditamount'];//::for remanding.
            $company_details['column_8_15'] = $date;//::last Bill Generate Amount
        }
        $model->updateByPk($companyRows['id'], $company_details);
        $this->is_billGenerate = true;
        return;
    }
    /**
     * @return Generatable  ordermasterIds  selected
     */
    public function actionGenerateOrderBill(){
        $order_master_id = CJSON::decode(Yii::app()->request->getParam('order_master_id', 0));
        $company_data =  CJSON::decode(Yii::app()->request->getParam('company_data', 0));
        $forInvoicePayment = Yii::app()->request->getParam('forInvoicePayment', false);
        $forInvoiceBill = Yii::app()->request->getParam('forInvoiceBill', false);
        $invoiceYear = Yii::app()->request->getParam('selectedInvoiceYear',0);
        $invoiceMonth = Yii::app()->request->getParam('selectedInvoiceMonth', 0);
        $paymentAmount = 0;
        $billAmount = 0;
        $userInfo = Yii::app()->user->getUserInfo();
        $order_id = implode(',', $order_master_id);
        $model =  new OrderMaster;
        $orderMasterIds =  array();
        if($company_data!=0){
            foreach ($company_data as $company_details) {
                $company_code   = !isset($company_details['column_8_02']) ? 0 : $company_details['column_8_02'];
                //for Invoice Bill Only
                if($forInvoiceBill=='true'){
                    $matchedOrderMasterIds = $model->checkGeneratableOrderMasterIds($order_id,$company_details['column_8_12'],$userInfo['company_id'],$forInvoicePayment,$invoiceYear,$invoiceMonth);
                    //for matched orderMaster Ids
                    if(!empty($matchedOrderMasterIds)){
                        foreach ($matchedOrderMasterIds as $key => $value) {
                            array_push($orderMasterIds,$value['column_1_01']);
                        }
                        $this->updateInvoiceRelatedData($orderMasterIds,$generateOrderBill=1,$forInvoicePayment,$company_details,null,$invoiceMonth,$invoiceYear); 
                    }
                    else{

                        $arr = array(
                            'success' => false,
                            'msg' => Yii::t('orderMaster','selected Order Bill Not  Generated')
                        );
                        echo CJSON::encode($arr);
                        exit;
                    }
                }
                else{// for Invoice Payment  Only
                    $paidOrders = $model->checkGeneratableOrderMasterIds($order_id,$company_details['column_8_12'],$userInfo['company_id'],$forInvoicePayment);
                    if(!empty($paidOrders)){
                        foreach ($paidOrders as $key => $value) {
                            array_push($orderMasterIds,$value['column_1_01']);
                        }
                        $this->updateInvoiceRelatedData($orderMasterIds,$generateOrderBill=1,$forInvoicePayment,$company_details);
                        $arr = array(
                            'success' => true,
                            'orderMasterIds'=>$orderMasterIds,
                            'msg' => Yii::t('orderMaster','selected Order Bill  Paid SuccessFully')
                        );
                        echo CJSON::encode($arr);
                        exit;
                    }
                    else{
                        $arr = array(
                            'success' => false,
                            'msg' => Yii::t('orderMaster','selected Order Bill Already Paid')
                        );
                        echo CJSON::encode($arr);
                        exit;
                    }
                }
            }
        }
        
        if($this->is_billGenerate=='true'){
            $arr = array(
                'success' => true,
                'orderMasterIds'=>$orderMasterIds,
                'msg' => Yii::t('orderMaster','selected Order Bill Generated SuccessFully')
            );
        }
        else{
             $arr = array(
                'success' => false,
                'msg' => Yii::t('orderMaster','selected Order Bill Not  Generated')
            );
        }
     
        echo CJSON::encode($arr);
    }
   
}
