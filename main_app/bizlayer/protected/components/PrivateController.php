<?php
class PrivateController extends MainController {
    protected $_controller_name;
    protected $_table_name;
    protected $_pk_col;
    protected $_model_name;
    protected $_keyword_searchable_fields;
    protected $_screen_names;
    protected $_datagrid_model;
    protected $_datagrid_id;
    protected $_table_id;
    protected $_parent_screen_id;
    protected $_idField = "id";
    protected $_department_code;
    protected $_unique_columns;
    protected $_csv_report_id;
    protected $_col_01_fld;
	protected function beforeAction($action) {
        $app = Yii::app();
        $request = $app->request;
        $token = $request->getParam('access_token', null);
        if(parent::beforeAction($action)) {
            if(!Yii::app()->user->isGuest) {
                return TRUE;
            }
        }
        if (!empty($token)){
            if($this->isValidAccessToken($token)){
                $this->increaseAccessCount($token);
                return ($this->checkLogin());
            }
        }
      
        throw new CHttpException(403,Yii::t('yii', 'Login Required'));
        exit;
    }
    private function increaseAccessCount($token=null){
        $token_model = Token::model()->findByAttributes(
                array(),
                array(
                    'condition'=>'access_token=:access_token',
                    'params'=>array('access_token' =>$token)
                    ));
       $token_model->updateByPk($token_model['token_id'], array('access_count'=>$token_model['access_count']+1));
   }
    private function checkLogin(){
        //by login process
        $auth=new UserAuth();
        $auth->username='public';
            //$auth->authenticate($without_pass=true)
            if($auth->authenticate(true,1))
            {
                return true;
            } 

        // without login process
        // $username='admin';
        // $identity=new UserIdentity($username,null);
        // $id_test=$identity->authenticate(true);
        // return true;
    }
    protected function isValidAccessToken(){
        $app = Yii::app();
        $request = $app->request;
        $redirectUrl  = $request->getParam('redirectUrl', null);
        //$redirectUrl  = $redirectUrl.'&createFile=1';
        $token = $request->getParam('access_token', null);
        if (empty($token)){
            return false;
        }
        else
        {
            if (strlen($token) != 32){
                return false;
            }
            $token_model = Token::model()->findByAttributes(
                array(),
                array(
                    'condition'=>'access_token=:access_token',
                    'params'=>array('access_token' =>$token)
                    ));

            if (!empty($token_model)){
                $access_token = $token_model['access_token'];
                $access_count_limit = $token_model['access_count_limit'];
                $expiry_date = $token_model['expiry_date'];
                $access_count = $token_model['access_count'];
                $db_url=$token_model['access_url'];
                $currentTime = date('Y-m-d H:i:s');
                if($access_token != $token){
                    return false;
                }

                if(!empty($access_count_limit) && $access_count_limit <= $access_count){
                    return false;
                }

                if(!empty($expiry_date) && $expiry_date < $currentTime){
                    return false;
                }

                if($token_model['is_locked']==1){
                    return false;
                }

                if($redirectUrl!=$db_url){
                    return false;
                }
                return true;
            }
            return false;
        }
    }

    protected function getDatagridPagination($total, $page, $pageSize) {
        //pagination
        $pages = new CPagination($total);
        $pages->pageSize = $pageSize;
        $currentPage = $pages->getCurrentPage(true); //starts with 0
        $totalPages = $pages->getPageCount();
        $isLast = 0;
        if ($currentPage == ($totalPages - 1) || $totalPages < 1) {
            $isLast = 1;
        }

        $page = intval($page);
        if ($page > $totalPages) {
            $page = $totalPages;
        }
        if ($page < 1)
            $page = 1;
        $startFrom = ($page - 1) * $pageSize;

        return array($totalPages, $startFrom, $currentPage, $isLast);
    }

    public function actionGetOptionData(){
        $option_code=Yii::app()->request->getParam('option_code');
        $userRole = Yii::app()->user->getAttr('userRole');

		$data =SysFieldOptionData::model()->getGetOptionData($option_code, $this->_department_code, $userRole);

        $arr = array('success'=>true,'data'=>$data,'total'=>count($data));
        $this->renderJSON($arr, true);
    }
    public function actionGetFldOptData() {
        $field_option_id = Yii::app()->request->getParam('field_option_id',null);
        $sysFieldOptionDataUtil =  new SysFieldOptionDataUtil;
        $data = $sysFieldOptionDataUtil->getFldOptData($field_option_id);
        $result = array('success' => TRUE,'data'=>$data);
        $this->renderJSON($data);
    }
    protected function _setDefaultValue($field_template_str,$defaultValues,$templateValueArr,$column_name,$user_role){
        if(empty($field_template_str)){
            return null;
        }
        $numeric_tpl_regex = "/\{[0-9][0-9]*}$/"; //return true if the string is "{123}" false if "{staff_code}"
        foreach ($defaultValues as $key=>$field) {
            if($column_name != $field['column_name'])
                continue;
            $is_numeric_tpl = false;
            $option_index=0;
            $templateTxt="";
            // $field_template_str=$field['default_value'];
            if (preg_match($numeric_tpl_regex, $field_template_str)){
                // Get the template text value without the curly brackets i.e {templateTxt} => templateTxt
                $option_index = substr($field_template_str,1,(strlen($field_template_str)-2));
                $is_numeric_tpl = true;
            }
            if ($is_numeric_tpl){
                
                //"{1}" or "{2}"... template string
                if($field['type_name']=="combobox"){
                    if (empty($fieldOptionDatas))
                        $fieldOptionDatas=$hlpr->getScreenFieldsOptionData($this->_table_id,$user_role);
                    
                    foreach ($fieldOptionDatas as $index => $fldOption) {
                        if($fldOption['field_option_id']==$field['field_option_id'] && $fldOption['display_order']==$option_index){
                            return $fldOption['name'];
                        }
                    }
                }
            }
            else
            {
                //"{staff-name}" or "{staff-job-title}"... template string
                //parse template value
                $templat_value = VText::t($field_template_str, $templateValueArr);
                return $templat_value;
            }
        }
        // return $field_template_str;
    }

    /*
    gets template value array
    */
    protected function _getTemplateValuesArray($user_info){
        $valueArr = array();
        $valueArr["{today}"]=date('Y-m-d');
        $valueArr["{now}"]=date('Y-m-d H:i:s');
        $valueArr["{username}"] = $user_info['username'];

        return $valueArr;
    }

    //exports grid data user can show hide grid columns
    public function actionExportSelectedColGridData()
    {
        $data = CJSON::decode(Yii::app()->request->getParam('selectedRows', 0), true);
        $file_prefix = $this->_controller_name;
        $model = $this->_model_name;

        $user_info = Yii::app()->user->getUserInfo();
        
        $defaultValues=$model::model()->CSVDefaultValues($user_info,$this->_department_code);

        $csvUtil = new  CSVUtil();
        //$csvUtil->export($data, $file_prefix,$model);
        $csvUtil->exportSelectedCol($data, $file_prefix,$defaultValues);     
    }

    //Import via csv 
    public function actionImportGridData()
    {
        $user_info = Yii::app()->user->getUserInfo();
        $user_role = $user_info['userRole'];
        if (!RoleUtil::hasCSVImportRole($user_role))
        {
            $response=array(
                'success'=>FALSE,
                'msg'=> t('csv', 'noImportRights')
            );

            echo CJSON::encode($response);
            exit;               
        }

        $dynamic['controller_name'] = $this->_controller_name;
        $dynamic['model_name'] = $this->_model_name;
        $dynamic['table_name'] = $this->_table_name;
        $dynamic['table_id'] = $this->_department_code;
        $dynamic['pk_col'] = $this->_pk_col;

        $_FILE = $_FILES['csvFile'];

        
        if(empty($_FILE['name'])){
            $response = array(
                'success' => false,
                'msg' => t('csv','noCsvFile')
            );
            echo CJSON::encode($response);
            exit;
        }
        $csvUtil = new  CSVUtil();
        $csvUtil->import($_FILE, $dynamic);    
    }

    public function actionSavePageSize(){
        $page_size=Yii::app()->request->getParam('page_size');
        $model=$this->_model_name;

        $response=$model::model()->setPgSize($page_size);
       
        if($response==TRUE)
            $result['success']=TRUE;
        else
            $result['success']=FALSE;

        $this->renderJSON($result);
    } 

    public function actionGetPageSize(){
        $model_name=$this->_model_name;
        
        $response=$model_name::model()->getDatagridPageSize();
        $result=array('success'=>false, 'page_size'=>0);
        if(!empty($response)){
            $result['success']=TRUE;
            $result['page_size']=$response;
        }

        $this->renderJSON($result);   
    }


    public function isImg($src_file_name){
        $supported_image = array(
            'gif',
            'jpg',
            'jpeg',
            'png',
            'bmp',
            'tif'
        );

        $ext = strtolower(pathinfo($src_file_name, PATHINFO_EXTENSION)); // Using strtolower to overcome case sensitive
        if (in_array($ext, $supported_image)) {
            return true;
        } else {
            return false;
        }
    }

    public function actionExportAllCsv(){
        $model=$this->_model_name;
        $app=Yii::app();
        $file_prefix=$this->_controller_name;

        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $user_branch = $user_info['branch_name'];
        $alais="t".$this->_department_code;
        $sql_where_rolewise = $model::model()->getFilterByRoleCondition($user_id, $user_role, $user_branch, $alais);
        $data=$model::model()->getListData($user_role,null,0,null,null,$sql_where_rolewise,null,null);
        
        $csvUtil = new  CSVUtil();
        $csvUtil->export($data, $file_prefix,$model,$user_role);   
        
    }

    /*inserts/updates/deletes the template in app_user_prefrence*/
    public function setTemplate($datagrid_id, $datagrid_temp_id) {
        $user_id = Yii::app()->user->id;
        if(empty($datagrid_temp_id)) {
            /*removes the set selected template in the app_user_prefrence 
            since the template now is selected is default temp*/
            UserPreference::model()->deleteUserSelectedTemp($datagrid_id,$user_id);
        }else {
            /*inserts/updates the template in app_user_prefrence*/
            UserPreference:: model()->saveDatagridTemplate($user_id, $datagrid_id, $datagrid_temp_id);
        }
    }
    
    /*gets the selected templateId and template list for that specific grid*/
    public function getTemplates($datagrid_id,$user_id) {
        $templateList   = DatagridTemplate::model()->getTemplateName($datagrid_id,$user_id);
        $datagridTempId = UserPreference::model()->getDatagridTemplate($datagrid_id,$user_id);
        $arr = array(
            'template_id'=>$datagridTempId,
            'templateList' => $templateList
        );
        return $arr;
    }

    public function actionGetCommentList() {
        $request        = Yii::app()->request;
        $limit          = $request->getParam('limit',null);
        $pageSize       = $limit;
        // $pageSize       = $request->getParam('page_size',null);
        $page           = $request->getParam('start',0);
        $ref_table      = $request->getParam('ref_table', null);
        $ref_record_id  = $request->getParam('ref_record_id', null);
        $load_data      = $request->getParam('loadData', true);
        $total          = Comment::model()->getCommentRecordCount($ref_record_id);
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $pageSize);
        if($load_data == 'true') {
            $result= Comment::model()->getCommentList($pageSize, $limit, $page, $ref_record_id,true);
        } else {
            $result=null;
        }
        $data = array(
            'success' => TRUE,
            'total' => $total,
            'current_page' => $currentPage + 1,
            'total_pages' => $totalPages,
            'pageSize' => $pageSize,
            'isLast' => $isLast,
            'data' => $result
        );
        $this->renderJSON($data);
    }
    public function actionSaveComment($commentParams = null) {
        $comment     = !empty($commentParams['comment']) ? $commentParams['comment'] : Yii::app()->request->getPost('comment', null);
        $ref_record_id = !empty($commentParams['ref_record_id']) ? $commentParams['ref_record_id'] :   Yii::app()->request->getPost('ref_record_id', null);
        $ref_table =  !empty($commentParams['table_id']) ? $commentParams['table_id'] :  Yii::app()->request->getPost('table_id', null);
        //$comment = Yii::app()->request->getPost('comment', null);
        //$ref_record_id = Yii::app()->request->getPost('ref_record_id', null);
        //$ref_table = Yii::app()->request->getPost('table_id', null);
        $user_id=Yii::app()->user->getAttr('user_id');
        $model = new Comment;
        $model->comment = $comment;  
        $model->ref_table=$ref_table;
        $model->ref_record_id=$ref_record_id;
        $model->updated_datetime = new CDbExpression('NOW()');
        $model->created_datetime = new CDbExpression('NOW()');
        $model->created_by = $user_id;
        $model->delete_flg = 0;
        $model->save();
        if(empty($commentParams)){
            $result = array(
                    'success' => true,
                    'msg' =>Yii::t('TaskList', 'savedComment')
                );
            $this->renderJSON($result);
        }
    }

    public function checkDate($search_criteria) {
        $value_arr = array(
            '{today}'=>date('Y-m-d'),
            '{yesterday}'=>date('Y-m-d',strtotime("-1 days")),
            '{tomorrow}'=>date('Y-m-d',strtotime("+1 days"))
        );
        foreach ($search_criteria as $key => $value) {
            $templat_value = VText::t($value, $value_arr);
            $search_criteria[$key] = $templat_value;
        }
        return $search_criteria;
    }

    protected function getSearchFilters($filterData = null){
        return Search::model()->getSearchFilters($filterData);
    }

    /*
    * UPLOAD CSV FILE TO filebox/csv/csvupload folder
    */
    public function actionUploadCSVFile(){
        $app=Yii::app();
        $request=$app->request;
        $user_info = $app->user->getUserInfo();
        
        $fileFieldName=$request->getParam('filefield_name');
        $textFldValue=$request->getParam('filename');
        $oldFileName=$request->getParam('old_filename');
        $csv_report_id=$this->_csv_report_id;
        // $dynamic=array(
        //     'model_name' => $this->_model_name,
        //     'table_id' => $this->_table_id,
        //     'pk_col' => $this->_pk_col
        // );

        $_FILE = $_FILES[$fileFieldName];

        $uploadParams = array(
            'user_info'     => $user_info,
            '_FILE'         => $_FILE,
            'textFldValue'  => $textFldValue,
            'oldFileName'   => $oldFileName,
            // 'dynamic'       => $dynamic,
            'csv_report_id' => $csv_report_id

        );

        $csvUtil = new CSVUtil();
        $csvUtil->uploadCSVFile($uploadParams);
    }

    /*
    * 1. Model validation of csv records
    * 2. Create Valid CSV file
    * 3. Create Error CSV file
    */
    public function actionCheckCsvFile(){
        $app=Yii::app();
        $request=$app->request;
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $fileName=$request->getPost('filename');
        $checkNew=$request->getPost('checkNew');
        $oldFileName=$request->getPost('old_filename');
        
        $csv_report_id = $this->_csv_report_id;
        //$creatorParams=CJSON::decode($request->getPost('creatorParams'));

        $dynamic=array(
            'model_name' => $this->_model_name,
            'table_id'   => $this->_table_id,
            'pk_col'     => $this->_pk_col,
            'col_01_fld' => $this->_col_01_fld
        );

        $checkFileParams = array(
            'user_info'         => $user_info,
            'fileName'          => $fileName,
            'oldFileName'       => $oldFileName,
            'checkNew'          => $checkNew,
            'dynamic'           => $dynamic,
            'csv_report_id'     => $csv_report_id

        );

        $csvUtil = new  CSVUtil();
        $csvUtil->checkCsvFile($checkFileParams);
        
    }

    /*
    * MAKE DB MANIPULATION FROM SUCCESS CSV FILE 
    */
    public function actionConfirmCsvImport(){
        $fileName=Yii::app()->request->getPost('filename');
        // $oldFileName=Yii::app()->request->getParam('old_filename');
        
        $csvUtil= new CSVUtil();
        $csvUtil->confirmCsvImport($fileName/*,$oldFileName,$fileFolder*/);
    }

    public function actionImportCsv(){
        $app=Yii::app();
        $fileName=$app->request->getParam('filename');
        $oldFileName=$app->request->getParam('old_filename');
        $auction_master_id=$app->request->getParam('auction_master_id',0);
        // $fileFolder=$app->request->getParam('fileFolder');
        $user_info=Yii::app()->user->getUserInfo();
        $user_role=$user_info['userRole'];
        $csv_report_id = $this->_csv_report_id;
        $dynamic=array(
            'model_name' => $this->_model_name,
            'table_id'   => $this->_table_id,
            'pk_col'     => $this->_pk_col,
            'col_01_fld' => $this->_col_01_fld
        );

        $importParams = array(
            'user_info'         => $user_info,
            'fileName'          => $fileName,
            'oldFileName'       => $oldFileName,
            // 'checkNew'          => $checkNew,
            'dynamic'           => $dynamic,
            'csv_report_id'     => $csv_report_id

        );
        $csvUtil = new  CSVUtil();
        $result = $csvUtil->importCsv($importParams);        
        $this->renderJSON($result);
        exit;
    }

    /*
    * DOWNLOAD FAILED/ERROR CSV FILE
    */
    public function actionDownloadFailedCsv(){
        $fileName= Yii::app()->request->getParam('filename');
        
        $csvUtil = new  CSVUtil();
        $csvUtil->downloadFailedCsv($fileName);
    }

    public function actionGetZipCodeData(){
        $zip_code = Yii::app()->request->getPost('zip_code',0);
        $response = array('success' => TRUE,'data' => array());
        if(!empty($zip_code)){
            $model_name = $this->_model_name;
            $response['data'] = $model_name::model()->getZipCodeData($zip_code);
        }
        if(empty($response['data'])){
            $response['success'] = FALSE;
            $response['msg'] = t('general','Invalid Zip Code');
        }
        echo CJSON::encode($response);
        exit;
    }

    public  function getComboConfig($field_option_id){
        $dgUtil = new  DatagridUtil;
        $sysFieldOptionDataUtil =  new SysFieldOptionDataUtil;
        $cmp = $sysFieldOptionDataUtil->getSysFieldOptionRecord($field_option_id);
        $userRole =  Yii::app()->user->getAttr('userRole');
        $fld = array();
        $dgUtil->_datagrid_id = $cmp['datagrid_id'];
        // var_dump($dgUtil->_datagrid_id);exit;
        $fld['datagrid_component'] = $dgUtil->getDatagridColumnInfo($userRole,null,null); 
        $fld['editable'] = TRUE;
        $fld['displayField'] = $cmp['key_column'];
        $fld['valueField'] = $cmp['value_column'];
        $fld['queryMode'] = 'remote';
        $fld['store_url'] = $fld['datagrid_component']['datagrid_info']['store_url'];
        $fld['option_data'] = $cmp['option_data'];
        $fld['extraParams'] = array('datagrid_id' => $cmp['datagrid_id']);
        // if($cmp['datagrid_id'] == 7){
        //     $fld['extraParams']['field_option_id'] = $field_option_id;
        // }
        $fld['is_form_combo_grid'] = TRUE;//$cmp['is_form_combo_grid'] == 1 ? TRUE : FALSE;
        return $fld;
    }
}
