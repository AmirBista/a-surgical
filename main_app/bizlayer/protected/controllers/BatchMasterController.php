<?php
class BatchMasterController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 1;
        $this->_controller_name = 'batchMaster';
        $this->_model_name ='BatchMaster';
        $this->_table_name = 'h_batch_master';
        $this->_pk_col = 'id';
        $this->_keyword_searchable_fields = array("column_1_02","column_1_03","column_1_05");
    }

    /*
    * retunrs BatchMaster list for gridview
    */
    public function actionList() {
        $this->_getList();
    }
    private function _getList($return_array=array()) {
        $app = Yii::app();
        $request = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns = $request->getParam('get_columns', 0);
        $is_draft = $request->getParam('is_draft', 0);
        $company_code = $request->getParam('company_code', null);
        $entry_id = $request->getParam('entry_id', null);
        $get_batch_master_detail = $request->getParam('get_batch_master_detail',null);
        $datagrid_id = $request->getParam('datagrid_id', 0);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        if (empty($datagrid_id)){
            //if datagrid_id is not passed by client side then use controller assigned datagrid_id
            $datagrid_id = $this->_datagrid_id;
        }

        $keywords = $request->getParam('query', null);
        $page = $request->getParam('page', 1);

        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        if(RoleUtil::isStoreManager($user_role))
        {
            $response = array('success' => FALSE,'msg' => t('entryPanel','Access Error'));
            $this->renderJSON($response);
            exit;
        }
        $set_template_id = null;
        $template_id = $request->getParam('template_id', null);
        $search_id = $request->getParam('search_id', null);
        $default = Yii::t('datagridTemplateHelper','default');
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


        $BatchMasterModel = BatchMaster::model();
        
        $alais = "t4";

        // $sql_where_rolewise = null;
       $roleFilterParams = array(
            'user_info'             => $user_info,
            'alais'                 => $alais
        );
        $sql_where_rolewise = $BatchMasterModel->getFilterByRoleCondition($roleFilterParams);
        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);

        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
            'company_code'              => $company_code,
            'entry_id'                  => $entry_id,
            'sql_where_rolewise'        => $sql_where_rolewise
            // 'for_order_history'         => $for_order_history,
            // 'forPickingEntry'           => $forPickingEntry,
            // 'supplier_id'               => $supplier_id,
            // 'product_id'                => $product_id,
            // 'delivery_date'             => $delivery_date,
            // 'mode'                      => $mode,

        );
        $sql_where = $BatchMasterModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $filter_components=array();
        $helpTextInfo=array();
        $skuSummary_col_info = array();
        $batch_master_detail_info = array();

        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];
            if($get_batch_master_detail)
            {
                $dgUtil->_datagrid_id = 7;
                $batch_master_detail_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);

                $dgUtil->_datagrid_id = !empty($datagrid_id) ? $datagrid_id :9; 
                $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
              
                $datagrid_info = $col_info['datagrid_info'];
            }
            $column_fields = array_merge($fields);      
            // $column_fields[] = array('name' => 'id','mapping' => 'id');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
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
            'is_draft'             => $is_draft,
            // 'mode'                 => $mode,
        );
        $total = $BatchMasterModel->getListData($getListDataFuncParams);

        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination

        $getListDataFuncParams['for_count'] = false;
        $getListDataFuncParams['startFrom'] = $startFrom;
        $recordData = $BatchMasterModel->getListData($getListDataFuncParams);
        
        $tempSearchList = $request->getParam('get_temp_search_list', 0);
        $orderArr =  array('no_orders'=>null,'total_sp'=>null);
        
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
                'batch_master_detail_info'=>$batch_master_detail_info
            );
        }
        if($clientPage == 'allPages')
        {
            $prefix = 'BatchMaster';
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
            if(RoleUtil::isAdmin($user_role)){
                $arr = array(
                    'success' => false,
                    'msg' => Yii::t('general','previlageDeclined')
                );
                $this->renderJSON($arr);
            }
            $model = new BatchMaster;
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
                foreach ($newRecords as $newRecord) {
                    $this->_insertRecord($newRecord,$user_id);
                }
            }
            $transaction->commit();
            
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
        $model = new BatchMaster;
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
        return array('success'=>true,'msg'=>Yii::t('general','delete success'));
    }

    public function actionDeleteRecord(){
        $id = Yii::app()->request->getPost('id',0);
        $entry_code   = Yii::app()->request->getPost('entry_code',0);
        // $fileModel    =   File::Model();
        // $getOrderFile = $fileModel->findAllByAttributes(array('ref_record_id'=>$entry_code));
        // if($getOrderFile){
        //     foreach ($getOrderFile as  $filename) {
        //         $file_id = $filename['file_id'];
        //         $folder_filename = explode('a*_^F>9_',$filename['file_path']);
        //         FBUtility::removeDeletedFiles($file_id,$folder_filename[0]);
        //     }
        // }
        $model = BatchMaster::model();
        $this->_deleteRecord($model,$id);
        $response = array('success' => TRUE);
        $this->renderJSON($response);
    }
}
