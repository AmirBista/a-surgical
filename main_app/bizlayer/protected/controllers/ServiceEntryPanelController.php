<?php
class ServiceEntryPanelController extends PrivateController {
    protected $_allowed_file_types;
    public function __construct($arg = NULL)
	{
        $this->_parent_screen_id = 29;
        $this->_model_name = 'ServiceMaster';
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
        $createBill = CJSON::decode($request->getParam('createBill','FALSE'));
        $popup = CJSON::decode($request->getParam('popup','FALSE'));
        $customer_code = $request->getParam('customer_code',null);
        $order_master_id = $request->getParam('order_master_id',null);
        // $clone_type = $request->getParam('clone_type',0);
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];
        $company_id = $user_info['company_id'];
        $time_zone = $request->getParam('time_zone',null);
        if(!empty($time_zone))
            SET_TIMEZONE($time_zone);
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
        if($mode == "new" && RoleUtil::isAdmin($user_role))
        {
            $response = array('success' => FALSE,'msg' => t('entryPanel','Access Error'));
            $this->renderJSON($response);
            exit;
        }
        // $this->_parent_screen_id =  $is_bill_order == "1" ? 1 : 22;

        $model=ServiceMaster::model();
        if($is_clone==1){
            $mode = "edit";
            // $entry_id = $entryMasterModel->cloneServiceMaster($clone_master_id,$user_id,$_include_files,$_include_print,$_include_sku,$_include_order_items);
            
        }
        else if($createBill == TRUE){
            $mode = "edit";
        }
        $entryDataParams = array(
                'id'                => $id,
                'mode'              => $mode,
                'user_info'         => $user_info,
                'parent_screen_id'  => $this->_parent_screen_id,
                'is_clone'          => $is_clone,
                'popup'             => $popup,
                'createBill'       => $createBill
            );
        $recordData = $model->getEntryData($entryDataParams);
        // $order_master_code = $productMaster['order_master_code']; 
        
        // if($resetEntryForm!=1){

        //     // $entryDetailRecords = $entryDetailModel->getListData($listDataParams);  
        // }
        // else{
        //     $entryDetailRecords =  array();
        // }
        $latestComment=null;
        $commentCount = null;

        if(!empty($entry_code)) {
            $ref_table = 1;
            $app_name = "order";
            $latestComment= ServiceMaster::model()->getComment($entry_code);
            $commentCount = Comment::model()->getMessageCount($ref_table,$entry_code,$app_name);
        }
        $customerData =  array();
        if(!empty($customer_code)){
            $customerModel = Customer::model()->findByAttributes(array('column_3_05'=>$customer_code, 'delete_flg'=>0));
            if(!empty($customerModel)){
                $customerData = $customerModel->attributes;
            }
        }
        $orderMasterData =  array();
        if(!empty($order_master_id)){
            $orderMasterModel = OrderMaster::model();
             $orderMasterAlais = "t1";
               $roleFilterParams = array(
                'user_info'             => $user_info,
                'alais'                 => $orderMasterAlais
            );
            $sql_where_rolewise = $orderMasterModel->getFilterByRoleCondition($roleFilterParams);

            $getWhereConditionParams = array(
                'keyword_searchable_fields' => null,
                'alais'                     => $orderMasterAlais,
                'keywords'                  => null,
                'grid_header_filter_sql'    => null,
                'entry_id'                  => $order_master_id,
                'sql_where_rolewise'        => $sql_where_rolewise

            );
            $sql_where = $orderMasterModel->getWhereCondition($getWhereConditionParams);
            
            $dgUtil = new DatagridUtil();
            $datagrid_id = 124;
            $dgUtil->_datagrid_id = $datagrid_id;
            $orderMasterListParams = array(
            'for_count'            => false,
            'sql_where'            => $sql_where,
            'user_role'            => $user_role,
            'fields'               => null,
            'pageSize'             => null,
            'startFrom'            => null,
            'sort'                 => null,
            'dgUtil'               => $dgUtil,
            'datagrid_template_id' => null,
            'synctime'             => null,
            'forServiceEntryPanel' => 1,
        );
            $customerData = $orderMasterModel->getListData($orderMasterListParams);
            // $customerData = $orderMasterModel->getOrderMasterRecord($order_master_id);
        }
        $helpTextInfo=array();
        $helpTextInfo = HelpText::model()->getHelpTextForServiceEntry();
        $response=array(
            'success'=>true,
            'data'=>$recordData,
            // 'entryDetailRecords' => $entryDetailRecords,
            'mode' => $mode,
            'is_clone' => $is_clone,
            'latestComment' => $latestComment,
            'commentCount' => $commentCount['total'],
            'synctime' => date('Y-m-d H:i:s'),
            'customerData'  => array('data'=>$customerData),
            'helpTextInfo'  => $helpTextInfo
        );
        $this->renderJSON($response);
    }

    public function actionGetEntryFields(){
        $createFile = Yii::app()->request->getParam('createFile',0);
        $screen_id = Yii::app()->request->getParam('screen_id',null);
        $parent_screen_id = Yii::app()->request->getParam('parent_screen_id',null);
        // $screen_name = Yii::app()->request->getParam('screen_name',null);
        /*--------------------------------------Screen Fields  - START ---------------------------------------------*/
        // $screenFormComponentData = $this->actionGetWindowFormComponents(true);
        if($createFile == 0 && !empty($parent_screen_id)){
            $this->_parent_screen_id = $parent_screen_id;
        }
        if($createFile == 1){
            $role_ids = RoleUtil::getUserRoles();
            $parentScreenIds = array('1' => 'entryPanel',
                                    '15' => 'purchaseEntryPanel',
                                    '22' => 'transferEntryPanel',
                                    '29' => 'serviceEntryPanel',
                                    '34' => 'repairEntryPanel',
                                );
            $screenIds = array();
            $screen_name = '';
            if(!empty($role_ids)){
                if(!empty($screen_id)){
                    $screenIds[$screen_id]=$parentScreenIds[$screen_id];
                    $screen_name= $parentScreenIds[$screen_id];
                }else{
                    $screenIds  = $parentScreenIds;
                }
                $this->createBackup($screen_id, $screen_name, $role_ids);
                $this->createVersion($screen_id, $screen_name, $role_ids, $parentScreenIds);
                foreach ($screenIds as $parentScreenId => $parentScreenName) {
                    $this->_parent_screen_id = $parentScreenId;
                    $localStorageKey = $parentScreenName.'FormComponents';
                    foreach ($role_ids as $row) {
                        // if($row['role_id'] == 101 /*|| $row['role_id'] == 1*/){
                            $screenFormComponentData = $this->getScreenFormComponentData($row['role_id']);
                            $screenFormComponents = CJSON::encode($screenFormComponentData);
                            $orderEntryGridFields = " var Ext=Ext||{}; ";
                            $orderEntryGridFields.= " Ext.screenFormComponents = {$screenFormComponents};";
                            $filename = $localStorageKey."_".$row['role_id'].".js";
                            $myfile = fopen(SCREEN_COMPONENT_FOLDER.$filename, "w+");
                            $orderEntryGridFields = " var screenFormComponents = {$screenFormComponents};";
                            $orderEntryGridFields.= " localStorage.setItem('{$localStorageKey}',JSON.stringify(screenFormComponents));";
                            fwrite($myfile, $orderEntryGridFields);
                            fclose($myfile);
                            echo "<h3>File Created SuccessFully for ".$parentScreenName." with Role ID =".$row['role_id']."</h3>";
                        // }
                    }
                    
                }
            }
            else 
                echo "No Role Found In App Role";
            exit; 
        }
        
        $screenFormComponentData = $this->getScreenFormComponentData();
            
        /*--------------------------------------Screen Fields  - END ---------------------------------------------*/
        ob_clean();
        header("content-type: application/x-javascript; charset=utf-8");
        header('Cache-Control: public'); //must-revalidate, public, no-cache
        ob_start();
        $screenFormComponents = CJSON::encode($screenFormComponentData);

        echo $screenFormComponents; exit;
        // $orderEntryGridFields = " var Ext=Ext||{}; ";
        // $orderEntryGridFields.= " Ext.screenFormComponents = {$screenFormComponents};";
        $orderEntryGridFields = " var screenFormComponents = {$screenFormComponents};";
        $orderEntryGridFields.= " localStorage.setItem('estimationPanelFormComponents',JSON.stringify(screenFormComponents));";
        echo $orderEntryGridFields;        
        ob_end_flush();
    }
    private function createBackup($screen_id=null,$screen_name=null, $role_ids=null){
        $source_folder = SCREEN_COMPONENT_FOLDER;
            // Get array of all source files
        $files = scandir($source_folder);
        // Identify directories

        $source = SCREEN_COMPONENT_FOLDER;
        $currentDateTime= date('YmdHis');
        $destination = SCREEN_COMPONENT_BACKUP_FOLDER;
        if (!file_exists($destination)) {
            mkdir($destination, 0777, true);
        }

        //$checkFileName = $screen_name.'FormComponents';
        foreach ($files as $file) {
            if (in_array($file, array(".",".."))) 
                continue;
            if(is_dir($source.$file))
                continue;
            $pathinfo=pathinfo($file);
            $newFileName = $pathinfo['filename'].'_'.$currentDateTime.'.'.$pathinfo['extension'];
            
            if(!empty($screen_id)){
                foreach ($role_ids as $row) {
                    //echo $row['role_id']."</br>";
                    $checkFileName=$screen_name.'FormComponents'."_".$row['role_id'].".js";
                    if($file==$checkFileName)
                        copy($source.$file, $destination.$newFileName);
                }
            }else{
                copy($source.$file, $destination.$newFileName);
            }
        }
    }
    public function createVersion($screen_id=null,$screen_name=null, $role_ids=null, $parentScreenIds=null){
        $version_folder = SCREEN_COMPONENT_VERSION_FOLDER;
        if (!file_exists($version_folder)) {
            mkdir($version_folder, 0777, true);
        }
        $fileName = $version_folder."version";
       
        $version_screen_arr = array();
        if(file_exists($fileName)){
            $version_screen_arr = json_decode(file_get_contents($fileName), true);
        }

        if(empty($version_screen_arr)){
            $version_screen_arr = array();
        }

        if(empty($screen_id)){
            foreach ($parentScreenIds as $screen_id => $screen_name) {
                $screen_name = $screen_name."FormComponents"; //screen_name from the default array
                if(array_key_exists($screen_name,$version_screen_arr))
                    $version_screen_arr[$screen_name] = $version_screen_arr[$screen_name]+1;
                else
                    $version_screen_arr[$screen_name] = 1;
            }
        }else{
            $screen_name = $screen_name."FormComponents";
            if(array_key_exists($screen_name,$version_screen_arr))
                $version_screen_arr[$screen_name] = $version_screen_arr[$screen_name]+1;
            else
                $version_screen_arr[$screen_name] = 1;
        }
        $content = json_encode($version_screen_arr);
        $myfile = fopen($fileName, "w+");
        fwrite($myfile, $content);
        fclose($myfile);
    }
    public function getScreenFormComponentData($userRole=null){
        $userRole = !empty($userRole) ? $userRole : Yii::app()->user->getAttr('userRole');
        $hlpr = new ScreenHelper();
        $sys_screens = $hlpr->getScreenNames($this->_parent_screen_id);
        $components = $hlpr->getWindowFormComponents($this->_parent_screen_id, $userRole);
        // var_dump($components);exit;
        $screen_components = $datagrid_components = array();
        // Set FALSE to create separate grid store for separate tab grids.
        $sameTabGroupGridStore  = FALSE;
        $dgUtil = new DatagridUtil;
        foreach ($sys_screens as $key => $screens) {
            $screen_name = $screens['screen_name'];
            $screen_components[$screen_name] = array();
            // array_push($screen_components[$screen_name]['group_name'],$screens['group_name']);
            if($screens['screen_type'] == 3 || $screens['screen_type'] == 7 || $screens['screen_type'] == 9){
                $dgUtil->_datagrid_id = $screens['datagrid_id'];
                $datagridCmp = $dgUtil->getDatagridColumnInfo($userRole, null,null,true);
                if($screens['screen_type'] == 3 || $screens['screen_type'] == 9){
                    $screen_components[$screen_name] = $datagridCmp;
                }
                else if($screens['screen_type'] == 7){
                    unset($screen_components[$screen_name]);
                    $screen_components[$screens['group_name']]['sameTabGroupGridStore'] = $sameTabGroupGridStore;
                    $screen_components[$screens['group_name']]['groupStoreFields'] = array();
                    $screen_components[$screens['group_name']][$screen_name] = $datagridCmp; // ['group_name'] = $screens['group_name'];
                    if($sameTabGroupGridStore == true){
                        $tabGroupStoreFields = $this->_mergeStoreFields($screen_components[$screens['group_name']]);
                        $screen_components[$screens['group_name']]['groupStoreFields'] = $tabGroupStoreFields;
                    }     
                }
                
            }
            else if($screens['screen_type'] == 8){
                $dgUtil->_datagrid_id = $screens['datagrid_id']; 
                $screen_components[$screen_name] = $dgUtil->getStoreModelFields($userRole, null);
                $screen_components[$screen_name]['fields'][] = array('name' => 'file_status','mapping' => 'file_status');
            }
            else if($screens['screen_type'] == 2 || $screens['screen_type'] == 4  || $screens['screen_type'] == 6 || $screens['screen_type'] == 5){
                $user_info = Yii::app()->user->getUserInfo();
                $defaultValues=$hlpr->getDefaultValues($this->_parent_screen_id);
                $templateValueArr = $this->_getTemplateValuesArray($user_info);

                foreach ($components as $k=>$cmp) {
                    if($screen_name != $cmp['screen_name'])
                        continue;
                    if($screens['screen_type'] == 2 && $cmp['xtype'] == "textareafield"){
                        $cmp['xtype'] = "textfield";
                    }
                    $xtype = $cmp['xtype'];
                    $fld = array(
                        'xtype'             => $xtype,
                        'itemId'            => $cmp['column_name'],
                        'fieldLabel'        => $cmp['field_label'],
                        'name'              => 'dynamic_fields['.$cmp['column_name'].']',
                        'componentCls'      => $cmp['component_cls'],
                        'allowBlank'        => $cmp['allow_blank'],
                        'new_role'          => $cmp['new_role'],
                        'edit_role'         => $cmp['edit_role'],
                        'field_role'        => $cmp['field_role'],
                        'width'             => $cmp['field_width'],
                        'hidden'            => empty($cmp['field_width']) ? TRUE : FALSE,
                        'label_width'       => 0,
                        'labelAlign'        => 'top',
                        'labelClsExtra'     => 'label-bg-cls',
                        'height'            => '22',
                        'labelSeparator'    => '',
                        'validateBlank'     => $cmp['allow_blank'] == FALSE ? TRUE : FALSE,
                        'readOnly'          => $cmp['edit_role'] == TRUE ? FALSE : TRUE,
                        'submitValue'       => $cmp['edit_role'] == FALSE && $cmp['new_role'] == FALSE ? FALSE : TRUE,
                        'field_type_id'     => $cmp['field_type_id'],
                        'field_option_id'   => $cmp['field_option_id'],
                        'default_value'     => $this->_setDefaultValue($cmp['default_value'],$defaultValues,$templateValueArr,$cmp['column_name'],$user_info['userRole']),
                        'category'          => $cmp['category'],
                        'sub_category'      => $cmp['sub_category'],
                        'column_name'       => $cmp['column_name'],
                        'screen_name'       => $cmp['screen_name'],
                        'hide_label'        => FALSE,
                        'isDynamicFormFld'  => TRUE,
                        'is_form_combo_grid'=> TRUE,
                        'focus_on_enterkey'=> $cmp['focus_on_enterkey'],
                    );
                    $fld['value'] = !empty($fld['default_value']) ? $fld['default_value'] : null;
                    if($xtype == "numberfield"){
                        $fld['hideTrigger'] = TRUE;
                        $fld['enableKeyEvents'] = TRUE;
                        $fld['align'] = 'right';

                        if($cmp['field_type_id'] == 12) {
                            $fld['xtype'] = 'numericfield';
                        }
                    }
                    else if($xtype == "datefield"){
                        $fld['format'] = 'Y-m-d';
                        $fld['submitFormat'] = 'Y-m-d';   
                    }
                    else if($xtype == "textareafield"){
                        $fld['xtype'] = 'textareafield';
                        $fld['grow'] = true;
                        $fld['anchor'] = '100%';
                        $fld['maxHeight'] = 400;
                        if($screens['screen_type'] == 5){
                            $combo_config = array();
                            $combo_config['itemId'] = 'combo_'.$fld['itemId'];
                            $option_id = $cmp['field_option_id'];
                            $sql = "select name, code,description from sys_field_option_data where field_option_id = $option_id AND (delete_flg = 0 or delete_flg is null) order by display_order ";
                            $command = Yii::app()->db->createCommand($sql);
                            $innerResults = $command->queryAll();
                            $jsonData = CJSON::encode($innerResults);
                            $combo_config['storeData'] = $jsonData;
                            $combo_config['key_column'] = 'name';

                            $fld['combo_config'] = $combo_config;
                            $setting_config = array();
                            $setting_config['field_option_id'] = $cmp['field_option_id'];
                            $setting_config['field_option_name'] = $cmp['option_name'];
                            $setting_config['new_role'] = $cmp['field_option_new_role']; 
                            $setting_config['edit_role'] = $cmp['field_option_edit_role']; 
                            $setting_config['delete_role'] = $cmp['field_option_delete_role']; 
                            $setting_config['enabled'] = $cmp['field_option_new_role'] || $cmp['field_option_edit_role'] || $cmp['field_option_delete_role'];
                            
                            $fld['setting_cfg'] = $setting_config;
                        }
                    }
                    else if($xtype == "combobox"){
                        $fld['editable'] = TRUE;
                        $fld['displayField'] = $cmp['key_column'];
                        $fld['valueField'] = $cmp['value_column'];
                        $fld['queryMode'] = 'local';
                        $fld['store_url'] = $cmp['store_url'];
                        $fld['option_data'] = $cmp['option_data'];
                        $fld['componentCls'] .= ' screen-fld-ux-clear-css ';
                        if($cmp['field_type_id'] == 104 || $cmp['field_type_id'] == 105){
                            $dgUtil->_datagrid_id = $cmp['datagrid_id'];
                            $fld['datagrid_component'] = $dgUtil->getDatagridColumnInfo($userRole,null,null); 
                            $fld['store_url'] = $fld['datagrid_component']['datagrid_info']['store_url'];
                        }
                    }
                    
                    if ($fld['allowBlank'] != TRUE){
                        $fld['componentCls'] .= ' compulsory-field ';
                    }
                    if ($fld['readOnly'] == true){
                        $fld['componentCls'] .= ' disabled-field ';
                    } 
                    if( $screens['screen_type'] == 6){
                        unset($screen_components[$screen_name]);
                        $fld['group_name'] = $screens['group_name'];
                        $fld['hideLabel'] = TRUE;
                        $fld['fieldLabel'] = '';
                        $screen_components[$screens['group_name']][$screen_name] = $fld;
                    }
                    else{
                        array_push($screen_components[$screen_name],$fld);
                    }
                    
                    // array_push($screen_components,$fld);
                    unset($components[$k]);
                }
            }

        }

        $arr = array(
                'success'     => true,
                'sys_screens' => $sys_screens,
                'screen_components'  => $screen_components,
            );
        // $this->renderJSON($arr, true);exit;
        return $arr;
    }
    protected function _mergeStoreFields($groupScreen){
        $fields = array();
        $tempFlds = array();
        foreach ($groupScreen as $screen_name => $arr) {
            // var_dump($arr['fields']);exit;
            if(is_array($arr) &&  array_key_exists('fields', $arr))
                $tempFlds = array_merge($tempFlds,$arr['fields']);  
        }

        foreach ($tempFlds as $tf) {
            if(empty($fields)){
                array_push($fields, $tf);
            }
            else{
                $isDuplicate = FALSE;
                foreach ($fields as $f) {
                    if($tf['name'] == $f['name']){
                        $isDuplicate = TRUE;
                        break;   
                    }
                }
                if($isDuplicate == FALSE){
                    array_push($fields, $tf);
                }
            }
        }
        return $fields;
    }
    protected function _processEntryMasterSaveData($params){
        $entry_id                 = $params['entry_id'];
        $user_info                = $params['user_info'];
        $user_id                  = $params['user_id'];
        // $selectedPdfRecords    = $params['selectedPdfRecords'];
        // $last_updated_datetime = $params['last_updated_datetime'];
        $dynamic_fields           = $params['dynamic_fields'];
        $_dynamic_fields          = &$params['_dynamic_fields'];
        $date                     = $params['date'];
        $mode                     = $params['mode'];
        $oldReceiveStatus         = &$params['oldReceiveStatus'];
        $customer_data            = &$params['customer_data'];
        $customer_code            = &$customer_data['customer_code'];
        $is_free                  = &$customer_data['is_free'];
        $getDynamicFormFlds = FALSE;
        if (!empty($entry_id)){
            $entryMaster = ServiceMaster::model()->findByAttributes(array('id'=>$entry_id,'delete_flg' => 0));    

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

            // if($last_updated_datetime < $entryMaster['column_10_08']){
            //     $getDynamicFormFlds = TRUE;    
            // }
            $oldReceiveStatus = $entryMaster['column_10_27'];
            $entryMaster->isNewRecord = false;
            $entryMaster->is_draft = 0;
            if($mode == "edit"){
                $entryMaster['column_10_10'] =  $user_info['firstName'].' '.$user_info['last_name'];
                // $entryMaster['column_10_10'] =  $user_info['username'];//$user_info['last_name'].' '.$user_info['firstName'];
                $entryMaster['column_10_11'] = date('Y-m-d H:i');
            }
            $mode = 'edit';
        }
        else
        {
            $entryMaster = new ServiceMaster();
            //fields will not be updated only set for new record
            $entryMaster->created_by = $user_id;
            $entryMaster->created_datetime = $date;
            $entryMaster->delete_flg = 0;
            $mode = 'new';
        }
        //set dynamic fields
        if(!empty($dynamic_fields)){
            $cust_code = $dynamic_fields['column_10_13'];
            $free = $dynamic_fields['column_10_33'];
            // echo "<pre>";print_r($dynamic_fields);die;
            foreach ($dynamic_fields as $field => $field_value) {
                // if($field=="column_10_08" || $field=="column_10_09"/* || $field=="column_10_03"*/)
                    // continue;
                if ($field_value == '' )
                    $entryMaster->$field = null;
                else
                    $entryMaster->$field = convertDBStr($field_value);
            }
        }

        
        // $is_clone = !empty($orderMaster['parent_entry_id']) ? 1 : 0;
        $entryMaster->updated_by = $user_id;
        $entryMaster->updated_datetime = $date;
        // $entryMaster->column_10_10 = $user_info['firstName'].' '.$user_info['last_name'];$user_info['username'];
        // $entryMaster->column_10_11 = date('Y-m-d H:i');

        if($getDynamicFormFlds){
            $_dynamic_fields = $this->_getLatestEntryFldVal($entryMaster);
        }
        $_dynamic_fields['dynamic_fields[column_10_10]'] = $entryMaster->column_10_10;
        $_dynamic_fields['dynamic_fields[column_10_11]'] = $entryMaster->column_10_11;
        
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
        
        // $entryDetailRecords    = CJSON::decode($request->getPost('entryDetailRecords'), true);
        // $appFilesRecords       = CJSON::decode($request->getPost('appFilesRecords'), true);
       // $customer_data         = CJSON::decode($request->getPost('customer_data'), true);
        $old_customer_service_data   = CJSON::decode($request->getPost('old_customer_service_data'), true);
        $deleted_customer_service_data   = CJSON::decode($request->getPost('deleted_customer_service_data'), true);
        $entry_id              = $request->getPost('id');
        $dynamic_fields        = $request->getPost('dynamic_fields');
        $mode                  = $request->getPost('mode',null);
        $date      = date('Y-m-d H:i:s');
        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id   = $user_info['user_id'];
        $time_zone = $request->getParam('time_zone',null);
        if(!empty($time_zone))
            SET_TIMEZONE($time_zone);
        $oldReceiveStatus = null;
        $_dynamic_fields = array();
        $entryMasterSaveParam = array(
            'entry_id'        => $entry_id,
            'user_info'       => $user_info,
            'user_id'         => $user_id,
            'dynamic_fields'  => $dynamic_fields,
            'date'            => $date,
            '_dynamic_fields' => &$_dynamic_fields,
            'mode'            => $mode,
            'oldReceiveStatus'=> &$oldReceiveStatus
           // 'customer_data'   => $customer_data

        );
        // Manage Data for Receipt Master for save 
        $entryMaster = $this->_processEntryMasterSaveData($entryMasterSaveParam);
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
            $new_customer_service_data = array(
                                            'customer_code'=>  $dynamic_fields['column_10_13'],
                                            'is_freeFlag' => $dynamic_fields['column_10_33'],
                                            'usedService' =>  $dynamic_fields['column_10_31'],
                                            'balanceService' => $dynamic_fields['column_10_30']
                                        );
        try{
            $updateCustomerServiceInfo =  $this->isCustomerServiceUpdateNeeded($old_customer_service_data, 
                $new_customer_service_data);

            if($updateCustomerServiceInfo){
                $balanceService = $this->_updateCustomerRecord($old_customer_service_data,$new_customer_service_data);
                $entryMaster->column_10_30 =  $balanceService;
            }
            if(!empty($deleted_customer_service_data))
                $balanceService = $this->_updateCustomerRecord($deleted_customer_service_data);
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
                // SAVE ORDER PRODUCTS RECORD
                // if(!empty($entryDetailRecords)){
                //     // $display_order = 1;
                //     // $balanceServiceQty =  null;
                //     foreach ($entryDetailRecords as $key => $record) {
                //         $serviceDetailModel = new ServiceDetail();
                //         $record['service_master_id'] = $entryMaster['id'];

                //         if(!empty($record['id'])){
                //             $oldModel = ServiceDetail::model()->findByPk($record['id']);
                //             $this->_updateRecord($serviceDetailModel,$record,$user_id, '11');
                //             $newModel = ServiceDetail::model()->findByPk($record['id']);
                //         }
                //         else{
                //             $this->_insertRecord($serviceDetailModel,$record,$user_id,'11');
                //             $oldModel = null;
                //             $newModel = $serviceDetailModel;
                //         }
                //     }
                    
                // }
                // $receiveStatusArr = t('entryPanel','receiveStatus');
                // if($entryMaster['column_10_27'] == $receiveStatusArr['received'] && $oldReceiveStatus != $receiveStatusArr['received']){
                //     Product::model()->deductServiceReceivedProductQty($entryMaster['id'],$user_info['department_id']);
                // }

                $editModeActionRoles = ServiceMaster::model()->getRecordActionRoles('edit');
                
                $transaction->commit();
                
                $response=array(
                    'success'               => TRUE,
                    'data'                  => t('entryPanel', 'Record saved successfully'),
                    'id'                    => $entryMaster['id'],
                    'entry_code'            => $entryMaster['column_10_01'],
                    'editModeActionRoles'   => $editModeActionRoles,
                    'dynamic_fields'        => $_dynamic_fields,
                    'synctime'              => date('Y-m-d H:i:s'),
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
    private function isCustomerServiceUpdateNeeded($oldServiceData,$newServiceData){
        $isFreeStatus = t('serviceEntryPnl','isFreeStatus');
        $updateCustomerServiceInfo = false;
        if($oldServiceData['is_freeFlag'] === $isFreeStatus['yes']  && $newServiceData['is_freeFlag'] != $isFreeStatus['yes'] ){
            $updateCustomerServiceInfo = TRUE;
        }
        else if($oldServiceData['is_freeFlag'] != $isFreeStatus['yes'] && $newServiceData['is_freeFlag'] == $isFreeStatus['yes']){
            $updateCustomerServiceInfo = TRUE;
        }
        if($updateCustomerServiceInfo === FALSE && $oldServiceData['customer_code'] != $newServiceData['customer_code']){
            $updateCustomerServiceInfo = TRUE;
        }
        return $updateCustomerServiceInfo;
     }

    private function _updateCustomerRecord($oldServiceData, $newServiceData = array()){
        $balanceService = 0; 
        if(!empty($oldServiceData['customer_code'])){
            $oldModel = Customer::model()->findByAttributes(array('column_3_05'=>$oldServiceData['customer_code'],'delete_flg' => 0));
            if(!empty($oldModel)){
                $oldModel->isNewRecord = FALSE;
                $oldModel->column_3_25 =  intVal($oldModel->column_3_25) + intVal($oldServiceData['usedService']); // Balance  Service;
                $oldModel->column_3_24 =  intVal($oldModel->column_3_24) - intVal($oldServiceData['usedService']); //used Service;
                $oldModel->update();
            }
        }
        if(!empty($newServiceData)){
            if(!empty($newServiceData['customer_code'])){
                $balanceService = $newServiceData['balanceService'];
                $newModel = Customer::model()->findByAttributes(array('column_3_05'=>$newServiceData['customer_code'],'delete_flg' => 0));
                if(!empty($newModel)){
                    $newModel->isNewRecord = FALSE;
                    $newModel->column_3_25 = intVal($newModel->column_3_25) - intVal($newServiceData['usedService']); // Balance  Service;
                    $newModel->column_3_24 = intVal($newModel->column_3_24) + intVal($newServiceData['usedService']); //used Service; 
                    if($newModel->update()){
                        $balanceService = $newModel->column_3_25;
                    }
                }
            }
        }
        return $balanceService;
    }

    private function _getSyncedEntryDetailData($user_role,$entry_id,$synctime){
        $model = OrderProduct::model();
        $getWhereConditionParams = array(
            'alais'                     => 't3',
            'order_masters_id'          => $entry_id
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

    private function _getSyncedOrderDetailData($user_role,$entry_id,$synctime){
        $model = OrderDetail::model();
        $getWhereConditionParams = array(
            'alais'                     => 't2',
            'order_masters_id'          => $entry_id,
        );
        $sql_where = $model->getWhereCondition($getWhereConditionParams);
        $sort = array(array('property' => 'column_2_70','direction'=>'ASC'));//CJSON::decode('[{"property":"column_2_70","direction":"ASC"}]');
        
        $dgUtil = new DatagridUtil;
        $dgUtil->_datagrid_id = 3;
        $listDataParams = array(
            'for_count'  => FALSE,
            'sql_where'  => $sql_where,
            'user_role'  => $user_role,
            'fields'     => null,
            'synctime'   => $synctime,
            'all_columns'=> 1,
            'dgUtil'     => $dgUtil
        );
        $syncedData = $model->getListData($listDataParams);
        return $syncedData;
    }

    private function _insertRecord(&$model,$row,$user_id,$alais) {
        $service_master_id = $row['service_master_id'];
        $arrRecords        = $this->_prepareRow($row,$alais);
        $rec               = $arrRecords['id'];
        $model->attributes        = $rec;
        $model->service_master_id = $service_master_id;
        $model->supplier_id       = $row['supplier_id'];
        $model->product_id        = $row['product_id'];
        // $model->ext_id         = $memberRow['ext_id'];
        $model->created_datetime  = $model->updated_datetime = date('Y-m-d H:i:s');
        $model->created_by        = $model->updated_by = $user_id;
        $result                   = $model->save();
        $isUpdate                 = false;
        return $isUpdate;
    }

    private function _updateRecord(&$model, $row, $user_id) {
        //$this->updateProductQuantity($row, $user_id);
        $row['updated_datetime'] = date('Y-m-d H:i:s');
        $row['updated_by'] = $user_id;
        $model->updateByPk($row[$this->_idField], $row);
        return;
    }
    private function _updateProductRecord($oldModel,$newModel,$user_id,$entryMaster){
        $app = Yii::app();
        $request = $app->request;
        $user_info = $app->user->getUserInfo();
        $store_id = $user_info['department_id'];
        if(!empty($oldModel)){
            /* DELETE OLD PURCHASE QTY*/
            //column_5_05 productCode  column_2_06   
            //column_5_16 currencyType column_2_27
            //column_5_31 purchaseQty  column_2_15 qty
            $productModel = Product::model()->findByAttributes(array(
                                                            'delete_flg'  => 0, 
                                                            'supplier_id' => $oldModel['supplier_id'], 
                                                            'column_5_05' => $oldModel['column_2_06'], //product_Code
                                                            'column_5_16' => $oldModel['column_2_27'],  //currency_type
                                                            'store_id'    => $store_id
                                                        ));
            $productModel->isNewRecord = FALSE;
            $blc_qty = intval($productModel['column_5_23']) + intval($oldModel['column_2_15']);
            $order_qty = $productModel->column_5_24 - $oldModel['column_2_15'];
            //$qty = intval($productModel->column_5_31) - intval($oldModel['column_2_15']);
            $obj = array('column_5_24' => $order_qty,'column_5_25' => $blc_qty);
            $result= Product::model()->updateByPk($productModel['id'],$obj);
        }

        $productModel = Product::model()->findByAttributes(array(
                                                                'delete_flg'    => 0, 
                                                                'supplier_id'   => $newModel['supplier_id'], 
                                                                'column_5_05'   => $newModel['column_2_06'], 
                                                                'column_5_16'   => $newModel['column_2_27'],
                                                                'store_id'      => $store_id
                                                            ));
        if(empty($productModel)){
            // $productModel = new Product;
            // $record = $newModel->attributes;
            // $record['supplier_id'] = $entryMaster['supplier_id'];
            // $record['supplier_name'] = $entryMaster['column_4_13'];
            //$this->_insertProductRecord($productModel,$record,$user_id);
        }
        else{
            $productModel->isNewRecord = FALSE;
            
            $order_qty = intval($productModel['column_5_24']) + intval($newModel['column_2_15']);
            $blc_qty = $productModel['column_5_23'] - $order_qty;   //balance qty
            $obj = array('column_5_24' => $order_qty,'column_5_25' => $blc_qty);
            $result= Product::model()->updateByPk($productModel['id'],$obj);
        }
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
    private function updateProductQuantity($row, $user_id){
        if(!empty($row['column_2_15'])){
            $productModel = Product::model()->findByAttributes(array(
                                        'column_5_05' => $row['column_2_06'],
                                        'delete_flg' => 0
                                    ));
        
            $productModel->column_5_24 = $row['column_2_15']; //order qty 
            $productModel->column_5_25 = $productModel['column_5_23'] - $row['column_2_15'];   //balance qty
            $productModel->isNewRecord = FALSE;  
            $save = $productModel->save();
        }
    }

    public function actionGetOrderMasterData(){
        $app = Yii::app();
        $request = $app->request;
        $order_code   = $request->getParam('order_code',null);
        $csv_report_id = 10;
        $innerQuery = "SELECT yigfx_get_csv_report_query({$csv_report_id}, 1,1,0,0)";
        $cmd = $app->db->createCommand($innerQuery);
        $innerQuery = $cmd->queryScalar();
        if(!empty($order_code)){
            $sql_where = " AND t1.column_1_01 = {$order_code} ";
            $sql = $innerQuery . $sql_where;
            $cmd = $app->db->createCommand($sql);
            $result = $cmd->queryRow();
            $data = array('success'=> true,'data' => $result);
            $this->renderJSON($data); 
        }
    }

    
}
