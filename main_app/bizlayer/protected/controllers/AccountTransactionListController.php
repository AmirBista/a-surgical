<?php
class AccountTransactionListController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = 48;
        $this->_controller_name = 'accountTransactionList';
        $this->_model_name ='transaction';
        $this->_table_name = 'qkbase.qk_transaction';
        $this->_pk_col = 'id';
        $this->_keyword_searchable_fields = array("column_7_02","column_7_03","column_7_05");
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
        $get_columns = $request->getParam('get_columns', 0);
        $supplier_id = $request->getParam('supplier_id', null);
        $startFrom = $request->getParam('start', 0);
        $client_type = $request->getParam('client_type', 0);
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


        $orderTrasactionModel = Transaction::model();
        $alais = "t7";

        $sql_where_rolewise = null;

        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql
        );
        $sql_where = $orderTrasactionModel->getWhereCondition($getWhereConditionParams);
        //$sql_where = $clientsModel->getWhereCondition($this->_keyword_searchable_fields, $alais, $keywords,$filter_params,$client_type,$company_code,$billClosingDay,$companyType);
       
        $col_info = array();
        $orderTransaction_col_info =  array();
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = !empty($datagrid_id) ? $datagrid_id :48; 
        $filter_components=array();
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];
            $datagrid_info = $col_info['datagrid_info'];
            $column_fields = array_merge($fields);      
            $column_fields[] = array('name' => 'id','mapping' => 'id');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            $column_fields[] = array('name' => 'is_locked','mapping' => 'is_locked');

            $col_info['fields'] = $column_fields;
            $datagrid_info = $col_info['datagrid_info'];
           // $helpTextInfo = HelpText::model()->getRespectiveHelp($dgUtil->_datagrid_id);
        }
        else
        {
            $datagrid_info = $dgUtil->getDatagridInfo($user_role);
        }
        if($clientPage == 'allPages')
            $pageSize = 2000;
        else {
            if (empty($page_size))
                $page_size = $datagrid_info['page_size'] > 0 ? $datagrid_info['page_size'] : 50;
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
            'company_code'          => $supplier_id,
            'client_type'           => $client_type
        );

        $total = $orderTrasactionModel->getListData($getListDataFuncParams);
        // $show_readunread_column = $datagrid_info['show_readunread_column'];
        $show_readunread_column = '';
        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination
        $getListDataFuncParams['for_count'] = false;
        $recordData = $orderTrasactionModel->getListData($getListDataFuncParams);
        $searchTemplateData = SearchCriteriaHelper::model()->getTemplateSearchResult($datagrid_id,$user_id);
        foreach ($searchTemplateData as $key => $value) {
            $search_criteria = CJSON::decode($value['search_criteria']);
            $search_criteria = $this->checkDate($search_criteria);
            $searchTemplateData[$key]['search_criteria']=$search_criteria;
        }
        $supplierComboConfig =  $this->getSupplierComboConfig();
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
            'supplierComboConfig'=>$supplierComboConfig,
            'synctime' =>date('Y-m-d H:i:s')
            // 'helpTextInfo' => $helpTextInfo
        );

        if($clientPage == 'allPages')
        {
            $prefix = 'SupplierInvoiceList';
            $allPageCsv = new AllPageCsv();
            /*column parameter sent to get columns instead of using datagrid_id for getting columns*/
            $allPageCsv->getAllCsvDownload($recordData,$datagrid_id, $prefix, $col_info['columns']);
            //$allPageCsv->getAllCsvDownload($recordData,$datagrid_id, $prefix, null);
        }
        else
            $this->renderJSON($data);
    }
    public  function getSupplierComboConfig(){
        $dgUtil = new  DatagridUtil;
        $sysFieldOptionDataUtil =  new SysFieldOptionDataUtil;
        $cmp = $sysFieldOptionDataUtil->getSysFieldOptionRecord(29);// for database sbase_live 84
        $userRole =  Yii::app()->user->getAttr('userRole');
        $fld = array();
        $dgUtil->_datagrid_id = $cmp['datagrid_id'];
        // var_dump($dgUtil->_datagrid_id);
        $fld['datagrid_component'] = $dgUtil->getDatagridColumnInfo($userRole,null,null); 
        $fld['editable'] = TRUE;
        $fld['displayField'] = $cmp['key_column'];
        $fld['valueField'] = $cmp['value_column'];
        $fld['queryMode'] = 'remote';
        $fld['store_url'] = $fld['datagrid_component']['datagrid_info']['store_url'];//$cmp['store_url'];
        $fld['option_data'] = $cmp['option_data'];
        $fld['is_form_combo_grid'] = $cmp['is_form_combo_grid'] == 1 ? TRUE : FALSE;
        return $fld;
    }
    public  function actionClientType(){
        $client_list = t('clientType','client_list');
        $response = array('data'=>$client_list);
        $this->renderJSON($response);
    }
}
