<?php
class RepairController extends PrivateController {

	public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 25;
        $this->_keyword_searchable_fields = array("column_12_01,column_12_02,column_12_03,column_12_04,column_12_05,column_12_06,column_12_07,column_12_08,column_12_09,column_12_10");
    }

     public function actionList() {
        $this->_getList();
    }
    private function _getList($return_array=array()) {
        $app = Yii::app();
        $request = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns = $request->getParam('get_columns', 0);
        $id = $request->getParam('id', 0);
        $datagrid_id = $request->getParam('datagrid_id', $this->_datagrid_id);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        $keywords = $request->getParam('query', null);
        $customer_code = $request->getParam('customer_code',null);
        $page = $request->getParam('page', 1);
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $get_batch_product_detail = $request->getParam('get_batch_product_detail',null);     
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

        $repairModel = Repair::model();
            
        $alais = "t12";

        // $sql_where_rolewise = null;
        $roleFilterParams = array(
            'user_info'             => $user_info,
            'alais'                 => $alais
        );
        $sql_where_rolewise = $repairModel->getFilterByRoleCondition($roleFilterParams);

        
        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
            'sql_where_rolewise'        => $sql_where_rolewise,
            'customer_code'             => $customer_code
        );
        $sql_where = $repairModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $helpTextInfo=array();
        
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];

            $column_fields = array_merge($fields);     
            // $column_fields[] = array('name' => 'id','mapping' => 'id');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            // $column_fields[] = array('name' => 'type_name','mapping' => 'type_name');

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
        
        //$datagrid_id = $request->getParam('datagrid_id_for_data', 0);

        $getListDataFuncParams = array(
            'for_count'             => true,
            'sql_where'             => $sql_where,
            'user_role'             => $user_role,
            'fields'                => null,
            'pageSize'              => $page_size,
            'startFrom'             => $startFrom,
            'sort'                  => $sort,
            'dgUtil'                => $dgUtil
           // 'datagrid_template_id'  => $templates['template_id'],
            //'synctime'              => $synctime,
            
        );
        $total = $repairModel->getListData($getListDataFuncParams);
        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination

        $getListDataFuncParams['for_count'] = false;
        $getListDataFuncParams['startFrom'] = $startFrom;
       
        $recordData = $repairModel->getListData($getListDataFuncParams);
        
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
        }else{
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
            // 'filter_components' =>$filter_components,
            'templateList'=>$templates['templateList'],
            'templateId'=>$templates['template_id'],
            'searchList'=>$searchList,
            // 'searchTemplateData' =>$searchTemplateData,
            'synctime' =>date('Y-m-d H:i:s'),
            'helpTextInfo' => $helpTextInfo
        );
        }
        
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
        /*if(RoleUtil::isAdmin($user_role)){
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','previlageDeclined')
            );
            $this->renderJSON($arr);
        }*/
        /*if($user_role!=110 || $user_role!=10){
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','previlageDeclined')
            );
            $this->renderJSON($arr);
        }*/
        $success_array = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess'),
            );
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            $model = new Repair;
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


}