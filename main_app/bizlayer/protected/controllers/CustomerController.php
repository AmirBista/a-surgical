<?php
class CustomerController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 10;
        $this->_keyword_searchable_fields = array("column_3_05","column_3_07","column_3_08","column_3_09","column_3_16","column_3_17");
        // $this->_unique_columns = array("column_3_02");
    }

    /*
    * retunrs member list for gridview
    */
    public function actionList() {
        $this->_getList();
    }
    private function _getList($return_array=array()) {
        $app = Yii::app();
        $request = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns   = $request->getParam('get_columns', 0);
        $id            = $request->getParam('id', 0);
        $datagrid_id   = $request->getParam('datagrid_id', $this->_datagrid_id);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        $keywords      = $request->getParam('query', null);
        $page          = $request->getParam('page', 1);
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];

        $set_template_id = null;
        $template_id = $request->getParam('template_id', null);
        $search_id = $request->getParam('search_id', null);
        $default = Yii::t('datagridTemplateHelper','default');
        $get_customer_order_detail = $request->getParam('get_customer_order_detail',null);


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
        if($get_template_list == 1) {
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
            UserPreference::model()->saveDatagridPageSize($user_id, $datagrid_id, $save_page_size);
        }    

        $customerModel = Customer::model();
            
        $alais = "t3";

        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $roleFilterParams = array(
            'user_info'             => $user_info,
            'alais'                 => $alais
        );
        $sql_where_rolewise = $customerModel->getFilterByRoleCondition($roleFilterParams);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
            'sql_where_rolewise'        => $sql_where_rolewise
        );
        $sql_where = $customerModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $helpTextInfo=array();
        $orderHistoryInfo = array();
        $salesHistoryInfo = array();
        $service_info = array();
        $repair_info = array();
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];
            if($get_customer_order_detail)
            {
                $dgUtil->_datagrid_id = 31;
                $orderHistoryInfo = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);

                $dgUtil->_datagrid_id = 32;
                $salesHistoryInfo = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);

                $dgUtil->_datagrid_id = 22;
                $service_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
                
                $dgUtil->_datagrid_id = 25;
                $repair_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);

                $dgUtil->_datagrid_id = !empty($datagrid_id) ? $datagrid_id :1; 
                $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
                $datagrid_info = $col_info['datagrid_info'];
            }
            else{
                $dgUtil->_datagrid_id = !empty($datagrid_id) ? $datagrid_id :1; 
                $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
                $datagrid_info = $col_info['datagrid_info'];
            }
            $column_fields = array_merge($fields);      
            // $column_fields[] = array('name' => 'id','mapping' => 'id','type'=> 'int');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            $column_fields[] = array('name' => 'column_3_28','mapping' => 'column_3_28');
            // $column_fields[] = array('name' => 'id','mapping' => 'id');
            // $column_fields[] = array('name' => 'is_locked','mapping' => 'is_locked');

            $col_info['fields'] = $column_fields;
            $datagrid_info = $col_info['datagrid_info'];
            $helpTextInfo = HelpText::model()->getRespectiveHelp($dgUtil->_datagrid_id);
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
        //pagination
        $listDataParams = array(
            'for_count'             => true,
            'sql_where'             => $sql_where,
            'user_role'             => $user_role,
            'fields'                => null,
            'pageSize'              => $page_size,
            'startFrom'             => $startFrom,
            'sort'                  => $sort,
            'dgUtil'                => $dgUtil,
            'datagrid_template_id'  => $templates['template_id'],
            'synctime'              => $synctime
        );
        
        $total = $customerModel->getListData($listDataParams);
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        
        $listDataParams['for_count'] = false;
        $listDataParams['startFrom'] = $startFrom;
        //end pagination
        $recordData = $customerModel->getListData($listDataParams);
        $searchTemplateData = array();
        $tempSearchList = $request->getParam('get_temp_search_list', 0);
        if($tempSearchList == 1) {
            $searchTemplateData = Search::model()->getTemplateSearchResult($datagrid_id,$user_id);
            foreach ($searchTemplateData as $key => $value) {
                $search_criteria = CJSON::decode($value['search_criteria']);
                $search_criteria = $this->checkDate($search_criteria);
                // $search_criteria = $this->_checkToday($search_criteria);
                $searchTemplateData[$key]['search_criteria']=$search_criteria;
            }
        }
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
                'templateList'=>$templates['templateList'],
                'templateId'=>$templates['template_id'],
                'searchList'=>$searchList,
                'searchTemplateData' =>$searchTemplateData,
                'synctime' =>date('Y-m-d H:i:s'),
                'helpTextInfo' => $helpTextInfo,
                'orderHistoryInfo'=>$orderHistoryInfo,
                'salesHistoryInfo'=>$salesHistoryInfo,
                'service_info'=>$service_info,
                'repair_info'=>$repair_info
            );
        }
        if($clientPage == 'allPages')
        {
            $prefixArr = t('csv','prefix');
            $prefix = $prefixArr['clients'];
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

        $new_resp           = null;
        $update_resp        = null;
        $delete_resp        = null;
        // $projectDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $synctime = Yii::app()->request->getParam('synctime');
        
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            if(RoleUtil::isAdmin($user_role)){
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','previlageDeclined')
            );
            $this->renderJSON($arr);
            }
            $model = new Customer;
            $success_array = array(
                    'success' => true,
                    'msg' => Yii::t('general','saveSuccess'),
                );
            if(!empty($deletedRecords)) {
                foreach ($deletedRecords as $deletedRecord) {
                    $delete_resp = $this->_deleteRecord($model, $deletedRecord);
                }
                $success_array = $delete_resp;
            }
            if(!empty($modifiedRecords)) {
                foreach ($modifiedRecords as $modifiedRecord) {

                    $update_resp = $this->_updateRecord($model, $modifiedRecord,$user_id);
                }
            }
            if(!empty($newRecords)) {
                foreach ($newRecords as $newRecord) {

                    $new_resp = $this->_insertRecord($newRecord,$user_id);
                }
            }

            if(is_array($update_resp))
            {
                $transaction->rollback();

                $arr = array(
                    'success' => false,

                    'msg' => $update_resp['msg']
                );
                $this->_getList($arr);
            }
            else if(is_array($new_resp) )
            {
                $transaction->rollback();
                $arr = array(
                    'success' => false,
                    'msg' => $new_resp['msg']
                );
                $this->_getList($arr);
            }
            else
            {
                $transaction->commit();
                /*$success_array = array(
                    'success' => true,
                    'msg' => Yii::t('general','saveSuccess'),
                );*/
                $this->_getList($success_array);
            }
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
        $model = new Customer;
        $model->attributes = $orderRow;
        $model->ext_id = $orderRow['ext_id'];
        $model->created_datetime = $model->updated_datetime = date('Y-m-d H:i:s');
        $model->created_by = $model->updated_by = $user_id;
        $result = $model->save();
        if(!$result)
        {
       
            $error = $model->getErrors();
            $reset = reset($error);
            $msg = $reset[0];
            return array('success'=>false,'msg'=>$msg);
        }
        $isUpdate=false;
        return $isUpdate;
    }
    private function _updateRecord($model, $orderRow, $user_id) {
        $orderRow['updated_datetime'] = date('Y-m-d H:i:s');
        $orderRow['updated_by'] = $user_id;

        if(isset($orderRow['column_3_05']))
        {
            $customer_Code = $orderRow['column_3_05'];
            $model->column_3_05 = $customer_Code;
            $val = $model->validate('column_3_05');
            if(!$val)
            {
                $error = $model->getErrors();
                $reset = reset($error);
                $msg = $reset[0];
                return array('success'=>false,'msg'=>$msg);
            }
        }
        if(isset($orderRow['column_3_09']))
        {
            $nirc_Code = $orderRow['column_3_09'];
            $model->column_3_09 = $nirc_Code;
            $val = $model->validate('column_3_09');
            if(!$val)
            {
                $error = $model->getErrors();
                $reset = reset($error);
                $msg = $reset[0];
                return array('success'=>false,'msg'=>$msg);
            }
        }
        $result = $model->updateByPk($orderRow[$this->_idField], $orderRow);
        return;
    }
    private function _deleteRecord($model,$id) {
        $result = $model->updateByPk($id, array('delete_flg'=>1,'updated_datetime'=>date('Y-m-d H:i:s')));
        if($result){
            return array('success'=>true,'msg'=>Yii::t('general','delete success'));
        }
        else{
            return array('success'=>false,'msg'=>Yii::t('general','delete failure'));
        }
        
    }

    public function actionSaveClientInfo(){
        $request = Yii::app()->request;
        $clientInfo = CJSON::decode($request->getParam('clientInfo',array()));
        
        if(empty($clientInfo['column_3_05'])){
            echo CJSON::encode(array('success' => FALSE,'msg' => t('general','Empty data')));
            exit;
        }

        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try{
            $model = Customer::model()->findByAttributes(array('column_3_05' => $clientInfo['column_3_05'],'delete_flg' => 0));
            if(empty($model)){
                $model = new Customer;
                $model->isNewRecord = TRUE;
            }
            else{
                $model->isNewRecord = FALSE;
            }
            $model->attributes = $clientInfo;
            if($model->save()){
                $transaction->commit();
                echo CJSON::encode(array('success' => TRUE, 'msg' => t('general','saveSuccess')));
                exit;
            } 
            else{
                $transaction->rollback();
                echo CJSON::encode(array('success' => FALSE, 'msg' => t('general','saveFailed')));
                exit;
            } 
        }
        catch(Exception $e){
            if($transaction){
                $transaction->rollback();
            }
            echo CJSON::encode(array('success' => FALSE, 'msg' => $e->getMessage()));
            exit;
        }
    }
    public function actionGetCustomerInfo(){
        $app                = Yii::app();
        $request            = $app->request;
        $user_info          = $app->user->getUserInfo();
        $company_id         = $user_info['company_id']; 
        $customer_code = $request->getParam('customer_code',null);
        $customer = Customer::model()->getCustomerRecord($customer_code, $company_id);
        if(!empty($customer)){
            echo CJSON::encode(array('success' => TRUE, 'data'=> $customer));
        }
        else{
            echo CJSON::encode(array('success' => FALSE, 'msg' => t('general','Invalid data')));
        }
    }
}
