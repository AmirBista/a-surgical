<?php
class ProductSetController extends PrivateController {
    public function __construct($arg = NULL)
    {
        parent::__construct($arg);
        $this->_department_code = 2;
        $this->_filter_screen_id = 703;
        $this->_controller_name = 'productSet';
        $this->_model_name ='ProductSet';
        $this->_table_name = 'oms_product_set';
        $this->_pk_col = 'product_set_id';
        $this->_keyword_searchable_fields=array("subject","description","answer_place","registration_point");
        //$this->_creatorParams = array('staff_id_col' => 'user_name','creator' => 'creator');
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
        $product_id = $request->getParam('product_id', null);
        $datagrid_id = $request->getParam('datagrid_id', $this->_datagrid_id);
        $get_sync_data = $request->getParam('get_sync_data', 0);
        $keywords = $request->getParam('query', null);
        $page = $request->getParam('page', 1);
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];

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

        $ProductModel = Product::model();
            
        $alais = "t5";

        $sql_where_rolewise = null;
        
        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql
        );
        $sql_where = $ProductModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $helpTextInfo=array();
        
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];

            $column_fields = array_merge($fields);      
            // $column_fields[] = array('name' => 'id','mapping' => 'id','type'=> 'int');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            $column_fields[] = array('name' => 'product_id','mapping' => 'product_id');
            // $column_fields[] = array('name' => 'is_locked','mapping' => 'is_locked');

            $col_info['fields'] = $column_fields;
            $datagrid_info = $col_info['datagrid_info'];
           // $helpTextInfo = HelpText::model()->getRespectiveHelp($dgUtil->_datagrid_id);
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
            'synctime'              => $synctime,
            'product_id'            => $product_id
        );
        
        $total = $ProductModel->getListData($listDataParams);
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        
        $listDataParams['for_count'] = false;
        $listDataParams['startFrom'] = $startFrom;
        //end pagination
        $recordData = $ProductModel->getListData($listDataParams);
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
                'helpTextInfo' => $helpTextInfo
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

    /*loads the left sided grid*/
    public function actionLoadProductSetData() {
        $yes=t('general', 'yes');
        $keywords = Yii::app()->request->getParam('keywords',null);
        $sql = "SELECT t5.id as product_id, t5.column_5_01 AS Product_code, t5.column_5_02 AS product_name
                FROM tbasei.ti_product AS t5";
        if(!empty($keywords))
            $sql.=" WHERE
                    (
                        t5.delete_flg = 0 AND(
                            CAST(t5.column_5_01 AS VARCHAR) LIKE '%$keywords%'
                            OR CAST(t5.column_5_02 AS VARCHAR) LIKE '%$keywords%'
                        )AND t5.column_5_16 = '$yes'
                    )";
        else
            $sql.=" WHERE (t5.delete_flg = 0 AND t5.column_5_16 = '$yes')";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryAll();
        $data = array(
            'success' => TRUE,
            'data' => $results
            );
        $this->renderJSON($data);
    }
    /*loads the left sided mappedgrid*/
    public function actionGetProductMappedData() {
        $app = Yii::app();
        $request = $app->request;
        $product_id = $request->getParam('product_id', 0);
        $productSetModel = ProductSet::model();
        $result = $productSetModel->getProductMappedData($product_id);
        $data = array(
            'success' => TRUE,
            'data' => $result
            );
        $this->renderJSON($data);
    }

    public function actionSaveProductMappedData() {
        $app = Yii::app();
        $request = $app->request;
        $setData =  CJSON::decode($request->getParam('setData', null));
        $deletedData =  CJSON::decode($request->getParam('deletedData', null));
        $product_master_id = $request->getParam('productSetId', 0);
        $productSetModel = new ProductSet;
        /*get the user info*/
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $saveRole = $productSetModel->hasSaveRole($user_role);
        if($saveRole)
        {
            /*begin transaction*/
            $connection=Yii::app()->db;
            $transaction=$connection->beginTransaction();
            try {
                if(!empty($deletedData)) {
                    foreach ($deletedData as $value) 
                        $this->_deleteRecord($value,$user_role);
                }
                foreach ($setData as $value) {
                    if(!isset($value['product_set_id']))
                        $this->_insertRecord($value,$user_role,$user_id);
                    else
                        $this->_updateRecord($value,$user_role,$user_id);
                }
                $transaction->commit();
                $arr = array(
                    'success' => true,
                    'msg' => Yii::t('general','saveSuccess')
                );
            }
            catch (Exception $e) {
                $transaction->rollback();
                Yii::app()->user->setFlash('error', "{$e->getMessage()}");
                $arr = array(
                    'success' => false,
                    'msg' => $e->getMessage()
                );
            }
        }

        else {
            $arr = array(
                    'success' => false,
                    'msg' => Yii::t('general','previlageDeclined')
                );
        }
        return $this->renderJSON($arr);
    }

    private function _insertRecord($value,$user_role,$user_id) {
        $productSetModel = new ProductSet;
        if(empty($value['quantity']))
                $value['quantity'] =1;
        $productSetModel->product_master_id = $value['product_master_id'];
        $productSetModel->product_id = $value['product_id'];
        $productSetModel->quantity = $value['quantity'];
        $productSetModel->created_by = $user_id;
        $productSetModel->created_datetime = new CDbExpression('NOW()');
        $productSetModel->updated_datetime = new CDbExpression('NOW()');
        $productSetModel->save();
    }

    private function _updateRecord($value,$user_role,$user_id) {
        $productSetModel = new ProductSet;
        $qty = $value['quantity'];
        $product_set_id = $value['product_set_id'];
        $product_master_id=$value['product_master_id'] ;
        $product_id=$value['product_id'];
        $result = $productSetModel->updateRecord($product_set_id,$product_master_id,$product_id,$qty,$user_id);
        return $result;
    }

    private function _deleteRecord($value,$user_role) {
        $productSetModel = new ProductSet;
        $product_set_id = $value['product_set_id'];
        $product_master_id=$value['product_master_id'];
        $product_id=$value['product_id'];
        $result = $productSetModel->deleteRecord($product_set_id,$product_master_id,$product_id);
        return $result;
    }
}