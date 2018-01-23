<?php

class YIGBaseModel extends CActiveRecord {
    public $_datagrid_name;
    public $_datagrid_id;
    public $_table_id;
    public $_default_sort_field = "_default_sort";
    // public $_to_store_id;
    public function beforeSave() {
        $user_info = Yii::app()->user->getUserInfo();
        if ($this->isNewRecord){
            $store_col_name = 'column_'.$this->_table_id.'_03';
            $company_id = $user_info['company_id'];
            $store_name = $this->$store_col_name;
        
            if ($this->hasAttribute('company_id'))
                $this->company_id = $user_info['company_id'];

            if($this->scenario != "onTransferProductInsert" )
            {
                if ($this->hasAttribute('store_id'))
                    $this->store_id = $user_info['department_id'];
            }
            if($this->hasAttribute($store_col_name))
            {
                if(isset($store_name))
                {
                    $sql ="SELECT department_id FROM app_department WHERE department_name = '$store_name' and company_id = $company_id";
                    $cmd = Yii::app()->db->createCommand($sql);
                    $results = $cmd->queryScalar();
                    if($results)
                    {
                        $this->store_id = $results;
                    }
                    else
                    {
                        $this->store_id = $user_info['department_id'];
                    }
                }
                else
                {
                    $this->store_id = $user_info['department_id'];
                }
            }
            if ($this->hasAttribute('department_id'))
                $this->department_id = $user_info['department_id'];

            if ($this->hasAttribute('created_datetime'))
                $this->created_datetime = date('Y-m-d H:i:s');

            if ($this->hasAttribute('created_by'))
                $this->created_by = $user_info['user_id'];

            if ($this->hasAttribute('delete_flg'))
                $this->delete_flg = 0;
            
            if (isset($this->_table_id)){
                $company_col_name = 'column_'.$this->_table_id.'_02';
                if ($this->hasAttribute($company_col_name)){
                    if(!isset($this->$company_col_name) || $this->$company_col_name==''){
                        $this->$company_col_name = $user_info['company_name'];
                    }
                }
                    

                if ($this->hasAttribute($store_col_name)){
                     if(!isset($this->$store_col_name ) || $this->$store_col_name==''){
                        $this->$store_col_name = $user_info['department_name'];
                    }
                }
            }

        }
        else{
             if ($this->hasAttribute('updated_datetime'))
                $this->updated_datetime = date('Y-m-d H:i:s');
            
             if ($this->hasAttribute('updated_by'))
                $this->updated_by = $user_info['user_id'];
            //$this->modified = date('Y-m-d H:i:s');
        }
        
        return parent::beforeSave();
    }

    public function hasEditRole($mode, $user_role,$creator_id,$current_user_id){
        return true;
    }

    protected function getTableIdFromColumnName($column_name){
        //works only when $column_name is in format column_1_15.
        //the mid part is table id
        $arr = explode("_", $column_name);
        if (!empty($arr) && count($arr) == 3 && is_numeric($arr[1]))
        {
            return $arr[1];
        }
        //column_name not in 3 part format
        return false;
    }

    protected function _getSort($alais, $sort, $default_sort_order,$sort_by_index){
        $order_by = "";
        $by_index = false;
        $sort_field = $sort['property'];
        $sort_direction = $field = $sort['direction'];

        if (!empty($sort_field) && $sort_field != $this->_default_sort_field){
            $sort_field = pg_escape_string($sort_field);
            
            if (array_key_exists($sort_field, $sort_by_index)){
                $sort_field = $sort_by_index[$sort_field];
                $fieldTypeId = 5; 
                $by_index = true;
            }
            else
            {
                $fieldTypeId = $this->getFieldType($sort_field);
            }

            $sort_direction = strtoupper($sort_direction);
            if ($sort_direction == "ASC" || $sort_direction == "DESC")
            {
                if ($sort_direction == "ASC")
                    $sort_direction .= " nulls first";
                else
                    $sort_direction .= " nulls last";

                if ($by_index === true){
                    $tableAlais = "";
                }
                else
                {
                    $table_id = $this->getTableIdFromColumnName($sort_field);
                    if ($table_id === false){
                        $tableAlais = $alais.".";
                    }
                    else
                    {
                        $tableAlais = "t{$table_id}.";
                    }
                }
                if($fieldTypeId == 1||$fieldTypeId == 12|| $fieldTypeId == 16) {
                    $order_by = " convert_tonumeric({$tableAlais}{$sort_field}::text) {$sort_direction}";
                }
                else {
                    $order_by = " {$tableAlais}{$sort_field} {$sort_direction}";
                }
            }
        }
        return $order_by;
    }

    public function getSortOrder($alais, $sort, $default_sort_order,$sort_by_index=array()){
        $order_by = "";
        // $sort_field = "";
        // $sort_direction = "";
        // $by_index = false;
        // var_dump($sort);exit;
        $orderByArrClause = array();
        if (!empty($sort) && is_array($sort) && count($sort) > 0)
        {
            foreach ($sort as $sortRow) {
                $clause = $this->_getSort($alais, $sortRow, $default_sort_order,$sort_by_index);
                if(!empty($clause))
                    $orderByArrClause[] = $clause;
            }
        }

        if (empty($orderByArrClause))
        {
            $order_by = " ORDER BY {$default_sort_order}";
        }
        else{
            $order_by = " ORDER BY ".implode(',', $orderByArrClause).", {$default_sort_order}"; 
        }
        return $order_by;
    }

    public function getFieldType($sort_field) {
        $sql ="SELECT tf.field_type_id FROM sys_table_field tf WHERE tf.column_name=:sort_field";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':sort_field', $sort_field, PDO::PARAM_STR);
        $results = $cmd->queryScalar();
        return $results;
    }

    /*
    * returns next sequence value
    * @params column_name
    */
    public function getNextSequenceValue($table_name=null,$col_name=null){
        if (empty($table_name))
            $table_name = $this->tableName();

        if (empty($col_name)){
            $table_id = $this->_table_id;
            $col_name = 'column_'.$table_id.'_01';
        }
        
        $sql = "SELECT nextval(pg_get_serial_sequence('{$table_name}', '{$col_name}'))";

        $cmd = Yii::app()->db->createCommand($sql);
        $sequence_id = $cmd->queryScalar();
        return $sequence_id;
    }

    /*
    * returns next sequence value
    * @params column_name
    */
    public function getNextSeqValue($sequence_name){
        $sql = "SELECT nextval('{$sequence_name}')";
        $cmd = Yii::app()->db->createCommand($sql);
        $sequence_id = $cmd->queryScalar();
        return $sequence_id;
    }

    /*
    * gets select column fields for sql 
    */
    public function getSelectFields($datagrid_fields) {
        $prefix = '';
        $fields="";
        foreach ($datagrid_fields as $field)
        {
            $fields .= $prefix . "t". $field["table_id"].".".$field["column_name"];
            $prefix = ', ';
        }
        return $fields;  
    }

    public function getFilterByRoleCondition($params)
    {
        $alais                  =  $params['alais'];
        $user_info              =  $params['user_info'];
        $collection_store_id    = empty($params['collection_store_id'])?null:$params['collection_store_id'];
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
        $role_condition = "";
        if (!empty($alais))
            $alais .= ".";
        if (RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)){
            //allow all records for for super user.
        }
        else if (RoleUtil::isCompanyAdmin($user_role))
        {
            // all department of same company
            $role_condition = " {$alais}company_id = {$company_id} ";
        }
        else if (RoleUtil::isStoreManager($user_role))
        {
            // same department of same company
            $role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id} ";
        }
        else
        {
            // same department of same company
            $role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id} ";    
        }
        return $role_condition;
    }    

    public function getWhereCondition($params) {
        $keyword_searchable_fields  = empty($params['keyword_searchable_fields']) ? null:$params['keyword_searchable_fields'];
        $alais                      = $params['alais'];
        $keywords                   = empty($params['keywords']) ? null:$params['keywords'];
        $grid_header_filter_sql     = empty($params['grid_header_filter_sql']) ? null:$params['grid_header_filter_sql'];
        $order_master_id            = empty($params['order_master_id']) ? null:$params['order_master_id'];
        $estimate_master_id         = empty($params['estimate_master_id']) ? null:$params['estimate_master_id'];
        $sql_where_rolewise         = empty($params['sql_where_rolewise']) ? null:$params['sql_where_rolewise'];
        $supplier_id            = empty($params['supplier_id']) ? null:$params['supplier_id'];


        $sql_where = "";

        $keyword_condition = $this->getKeywordFilterCondition($keyword_searchable_fields, $alais, $keywords);
        if (!empty($keyword_condition)){
            $sql_where = "({$keyword_condition})";
        }
        $company_id = Yii::app()->user->getAttr('company_id');
        // if(FILTER_COMPANY_CONDITION == true){
        //     if (!empty($sql_where))
        //         $sql_where .= " AND ";
        //     $sql_where .= "  $alais.company_id=$company_id";
        // }
        if (!empty($grid_header_filter_sql)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= "(".$grid_header_filter_sql.")";
        }

        if (!empty($order_master_id)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.order_master_id = ". $order_master_id;
        }


        if (!empty($sql_where_rolewise)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= $sql_where_rolewise;
        }
        if (!empty($supplier_id)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= "{$alais}.supplier_id = ". $supplier_id;
        }
        
        return $sql_where;
    }

    public function getKeywordFilterCondition($keyword_searchable_fields, $alais, $keywords){
        $sql_where="";
        if (!empty($keyword_searchable_fields) && count($keyword_searchable_fields)>0)
        {
            foreach ($keyword_searchable_fields as $field) {
                $field_where = "";
                if (!empty($keywords))
                {
                    $field_where = "";
                    //split by space
                    $val_arr = explode(" ", $keywords);
                    if (!empty($val_arr) && count($val_arr) > 0)
                    {
                        foreach ($val_arr as $idx => $value) {
                            $value = pg_escape_string(convertSearchStr($value));
                            if (empty($field_where))
                            {
                                $field_where .= "{$alais}.{$field}::text ilike '%{$value}%'";
                            }
                            else
                            {
                                $field_where .= " AND {$alais}.{$field}::text ilike '%{$value}%'";
                            }
                        }
                    }
                    if (!empty($field_where))
                    {
                        if (empty($sql_where))
                        {
                            $sql_where .= "($field_where)";
                        }
                        else
                        {
                            $sql_where .= " OR ($field_where)";
                        }
                    }
                }               
            }
        }
        return $sql_where;
    }    

    protected function getSyncStatusColumn($alias, $synctime, $user_id, $for_sync = true){
        $status = "";
            if($for_sync && !empty($synctime)) {
                $status = " ,CASE
                            WHEN {$alias}.delete_flg = 1 THEN 'deleted'
                            WHEN (
                                {$alias}.created_by != $user_id AND {$alias}.created_datetime = {$alias}.updated_datetime
                            ) THEN 'inserted'
                            ELSE 'updated'
                            END AS data_status";
            }
        return $status;
    }

    protected function setDefaultValues(&$dynamic_fields,$user_info,$table_id){
        $user_role = $user_info['userRole'];
        $hlpr = new ScreenHelper();
        $defaultValues=$hlpr->getDefaultValues($table_id);
        // var_dump($defaultValues);exit;
        $fieldOptionDatas=null;
        $templateValueArr = array();
        $templateValueArr = $this->getTemplateValuesArray($user_info);
        $numeric_tpl_regex = "/\{[0-9][0-9]*}$/"; //return true if the string is "{123}" false if "{staff_code}"
        
        foreach ($defaultValues as $key=>$field) {
            $is_numeric_tpl = false;
            $option_index=0;
            $templateTxt="";
            $field_template_str=$field['default_value'];
            if (preg_match($numeric_tpl_regex, $field_template_str)){
                // Get the template text value without the curly brackets i.e {templateTxt} => templateTxt
                $option_index = substr($field_template_str,1,(strlen($field_template_str)-2));
                $is_numeric_tpl = true;
            }
            if ($is_numeric_tpl){
                
                //"{1}" or "{2}"... template string
                if($field['type_name']=="combobox"){
                    if (empty($fieldOptionDatas))
                        $fieldOptionDatas=$hlpr->getScreenFieldsOptionData($table_id,$user_role);
                    
                    foreach ($fieldOptionDatas as $index => $fldOption) {
                        if($fldOption['field_option_id']==$field['field_option_id'] && $fldOption['display_order']==$option_index){
                            $dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $fldOption['name'];
                            break;
                        }
                    }
                }
            }
            else
            {
                //"{staff-name}" or "{staff-job-title}"... template string
                //parse template value
                $templat_value = VText::t($field_template_str, $templateValueArr);
                $dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $templat_value;
            }
        }
    }

    /*
    gets template value array
    */
    protected function getTemplateValuesArray($user_info){
        $valueArr=array();
        // $valueArr["{staff-code}"] = $user_info['username'];
        $valueArr["{now}"]=date('Y-m-d H:i:s');
        $valueArr["{today}"]=date('Y-m-d');
        $valueArr["{datetime}"]=date('Y-m-d H:i');
        // $valueArr["{user}"] = $user_info['username'];
        $valueArr["{user}"] = $user_info['firstName'].' '.$user_info['last_name'];
        $valueArr["{department}"] = $user_info['department_name'];
        $valueArr["{department_id}"] = $user_info['department_id'];
        $valueArr["{company}"] = $user_info['company_name'];
        $valueArr["{company_id}"] = $user_info['company_id'];

        return $valueArr;
    }

    public function getZipCodeData($zip_code){
        $sql = "SELECT * FROM ck_zipcode WHERE zipcode='{$zip_code}'";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryRow();
    }
}
