<?php
class SupplierController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 27;
        $this->_controller_name = 'supplier';
        $this->_model_name ='Supplier';
        $this->_table_name = 'hbase.h_supplier';
        $this->_pk_col = 'id';
        $this->_keyword_searchable_fields = array("column_7_02","column_7_03","column_7_05","column_7_07","column_7_12","column_7_11");
    }

    /*
    * retunrs orderMaster list for gridview
    */
    public function actionList() {
        $this->_getList();
    }
    private function _getList($return_array=array()) {
        $app           = Yii::app();
        $request       = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns   = $request->getParam('get_columns', 0);
        $entry_id      = $request->getParam('entry_id', null);
        $datagrid_id   = $request->getParam('datagrid_id', $this->_datagrid_id);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        $keywords      = $request->getParam('query', null);
        $page          = $request->getParam('page', 1);

        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id   = $user_info['user_id'];
        if(RoleUtil::isStoreManager($user_role))
        {
            $response = array('success' => FALSE,'msg' => t('entryPanel','Access Error'));
            $this->renderJSON($response);
            exit;
        }
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

        $supplierModel = Supplier::model();
        $alais = "t7";
        $roleFilterParams = array(
            'user_info'             => $user_info,
            'alais'                 => $alais
        );
        $sql_where_rolewise = $supplierModel->getFilterByRoleCondition($roleFilterParams);
        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
            'sql_where_rolewise'        => $sql_where_rolewise
        );
        $sql_where = $supplierModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;

        // $filter_components         = array();
        $helpTextInfo              = array();
        $supplier_orderdetail_info = array();
        $supplier_client_info      = array();

        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];
            $column_fields = array_merge($fields);      
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
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
        $getListDataFuncParams = array(
            'for_count'             => true,
            'sql_where'             => $sql_where,
            'user_role'             => $user_role,
            'fields'                => null,
            'pageSize'              => $page_size,
            'startFrom'             => $startFrom,
            'sort'                  => $sort,
            'dgUtil'                => $dgUtil,
            'datagrid_template_id'  => $templates['template_id'],
            'synctime'              => $synctime,
        );
        $total = $supplierModel->getListData($getListDataFuncParams);

        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination

        $getListDataFuncParams['for_count'] = false;
        $getListDataFuncParams['startFrom'] = $startFrom;
        $recordData = $supplierModel->getListData($getListDataFuncParams);
        $tempSearchList = $request->getParam('get_temp_search_list', 0);
        
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
                'success'              => TRUE,
                'total'                => $total,
                'current_page'         => $currentPage + 1,
                'total_pages'          => $totalPages,
                'page_size'            => $page_size,
                'isLast'               => $isLast,
                'columns'              => array_key_exists('columns', $col_info) ? $col_info['columns'] : array(),
                'fields'               => array_key_exists('fields', $col_info) ? $col_info['fields'] : array(),
                'data'                 => $recordData,
                // 'filter_components' =>$filter_components,
                'templateList'         =>$templates['templateList'],
                'templateId'           =>$templates['template_id'],
                'searchList'           =>$searchList,
                'searchTemplateData'   =>$searchTemplateData,
                'synctime'             =>date('Y-m-d H:i:s'),
                'helpTextInfo'         => $helpTextInfo,
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
        $delete_resp        = null;
        // $projectDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $synctime = Yii::app()->request->getParam('synctime');
        $success_array = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess'),
            );
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            $model = new Supplier;
            if(!empty($deletedRecords)) {
                foreach ($deletedRecords as $deletedRecord) {
                    $delete_resp = $this->_deleteRecord($model, $deletedRecord);
                    $success_array = $delete_resp;
                }
            }
            if(!empty($modifiedRecords)) {
                foreach ($modifiedRecords as $modifiedRecord) {
                    $this->_updateRecord($model, $modifiedRecord,$user_id);
                }
            }
            if(!empty($newRecords)) {
                if($user_role==50){
                    $arr = array(
                        'success' => false,
                        'msg' => Yii::t('general','previlageDeclined')
                    );
                    $this->renderJSON($arr);
                }
                
                foreach ($newRecords as $newRecord) {
                    $this->_insertRecord($newRecord,$user_id);
                }
            }
            $transaction->commit();
            /*$success_array = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess'),
            );*/
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
    private function _deleteRecord($model,$id) {
        $model->updateByPk($id, array('delete_flg'=>1,'updated_datetime'=>date('Y-m-d H:i:s')));
        return array('success'=>true,'msg'=>Yii::t('general','delete success'));
    }
    private function _updateRecord($model, $orderRow, $user_id) {
        $orderRow['updated_datetime'] = date('Y-m-d H:i:s');
        $orderRow['updated_by'] = $user_id;
        $model->updateByPk($orderRow[$this->_idField], $orderRow);
        return;
    }
    private function _insertRecord($orderRow,$user_id) {
        // $arrRecords = $this->_prepareRow($orderRow);
        // $orderRecord = $arrRecords['id'];
        $model = new Supplier;
        $model->attributes       = $orderRow;
        $model->ext_id           = $orderRow['ext_id'];
        $model->created_datetime = $model->updated_datetime = date('Y-m-d H:i:s');
        $model->created_by       = $model->updated_by = $user_id;
        $result                  = $model->save();
        $isUpdate                = false;
        return $isUpdate;
    }

    public function actionSaveSupplierInfo(){
        $request = Yii::app()->request;
        $clientInfo = CJSON::decode($request->getParam('clientInfo',array()));
        /*column_7_05:: Supplier CD*/
        // if(empty($clientInfo['column_7_05'])){
        //     echo CJSON::encode(array('success' => FALSE,'msg' => t('general','Empty data')));
        //     exit;
        // }

        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try{
            if(!empty($clientInfo['id'])){
                $model = Supplier::model()->findByAttributes(array('id' => $clientInfo['id'],'delete_flg' => 0));
                if(empty($model)){
                    echo CJSON::encode(array('success' => FALSE,'msg' => t('general','Empty data')));
                    exit;
                }
                else{
                    $model->isNewRecord = FALSE;    
                }
            }
            else{
                $model = new Supplier;
                $model->isNewRecord = TRUE;    
            }
            
            $model->attributes = $clientInfo;
            if($model->save()){
                $transaction->commit();
                echo CJSON::encode(array('success' => TRUE, 'msg' => t('general','saveSuccess'),'supplier_id' => $model['id']));
                exit;
            }  
        }
        catch(Exception $e){
            if($transaction){
                $transaction->rollback();
            }
            echo CJSON::encode(array('success' => TRUE, 'msg' => $e->getMessage()));
            exit;
        }
    }
    public function actionGetSupplierInfo(){
        $app                = Yii::app();
        $request            = $app->request;
        $user_info          = $app->user->getUserInfo();
        $company_id         = $user_info['company_id']; 
        $supplier_code = $request->getParam('supplier_code',null);
        $supplier = Supplier::model()->getSuppplierRecord($supplier_code, $company_id);
        if(!empty($supplier)){
            echo CJSON::encode(array('success' => TRUE, 'data'=> $supplier));
        }
        else{
            echo CJSON::encode(array('success' => FALSE, 'msg' => t('general','Invalid data')));
        }
    }
}
