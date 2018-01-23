<?php

/**
 * This is the model class for table "public.sys_search".
 *
 * The followings are the available columns in table 'public.sys_search':
 * @property integer $search_id
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $datagrid_id
 * @property integer $system_flg
 * @property integer $is_public
 * @property string $search_name
 * @property integer $user_id
 * @property string $search_criteria
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $show_template
 */
class Search extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'public.sys_search';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('datagrid_id, search_name, user_id', 'required'),
			array('company_id, department_id, datagrid_id, system_flg, is_public, user_id, delete_flg, created_by, updated_by, show_template', 'numerical', 'integerOnly'=>true),
			array('created_datetime, updated_datetime', 'length', 'max'=>6),
			array('search_criteria', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('search_id, company_id, department_id, datagrid_id, system_flg, is_public, search_name, user_id, search_criteria, delete_flg, created_by, created_datetime, updated_by, updated_datetime, show_template', 'safe', 'on'=>'search'),
		);
	}

	/**
	 * @return array relational rules.
	 */
	public function relations()
	{
		// NOTE: you may need to adjust the relation name and the related
		// class name for the relations automatically generated below.
		return array(
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'search_id' => 'Search',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'datagrid_id' => 'Datagrid',
			'system_flg' => 'System Flg',
			'is_public' => 'Is Public',
			'search_name' => 'Search Name',
			'user_id' => 'User',
			'search_criteria' => 'Search Criteria',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'show_template' => 'Show Template',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 *
	 * Typical usecase:
	 * - Initialize the model fields with values from filter form.
	 * - Execute this method to get CActiveDataProvider instance which will filter
	 * models according to data in model fields.
	 * - Pass data provider to CGridView, CListView or any similar widget.
	 *
	 * @return CActiveDataProvider the data provider that can return the models
	 * based on the search/filter conditions.
	 */
	public function search()
	{
		// @todo Please modify the following code to remove attributes that should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('search_id',$this->search_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('datagrid_id',$this->datagrid_id);
		$criteria->compare('system_flg',$this->system_flg);
		$criteria->compare('is_public',$this->is_public);
		$criteria->compare('search_name',$this->search_name,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('search_criteria',$this->search_criteria,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('show_template',$this->show_template);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Search the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
     public function getSearchList($params) {
        $user_id                = Yii::app()->user->user_id;
        $datagrid_id            = empty($params['datagrid_id'])? null:$params['datagrid_id'];
        $grid_header_search     = empty($params['grid_header_search'])? false:$params['grid_header_search'];
        $grid_temp_search       = empty($params['grid_temp_search'])? false:$params['grid_temp_search'];
        $grid_win_search        = empty($params['grid_win_search']) ? false:$params['grid_win_search'];
        $super_user_id          = 99;
        $select_fields          = "ss.search_id,ss.search_name,ss.system_flg,ss.search_criteria,ss.is_public, ss.user_id";
        $addtional_condition    = " ";
        if($grid_win_search) {
            $select_fields .= " ,ss.show_template,ss.datagrid_id,au.username";
        }
        $sql = " SELECT {$select_fields} ";
        $sql .=" FROM {$this->tableName()} AS ss ";

        if($grid_win_search) {
            $sql .= " JOIN public.app_user AS au ON(au.user_id = ss.user_id)";
        }

        $sql .= " WHERE ss.datagrid_id = :datagrid_id AND (ss.delete_flg != 1 OR ss.delete_flg IS NULL)";

        if($grid_header_search) {
            $addtional_condition = " AND ss.show_template = 0 ";
            if($user_id != $super_user_id) {
                $addtional_condition.= " AND (ss.user_id = $user_id OR ss.is_public = 1) ";
            }
        } else if($grid_temp_search) {
            $addtional_condition = " AND (ss.show_template = 1 ";
            if($user_id != $super_user_id) {
                $addtional_condition.= " AND ss.user_id = $user_id) OR (ss.show_template = 1 AND ss.is_public = 1)";
            }else {
                $addtional_condition.= ") ";
            }
            $sql = $sql.$addtional_condition;
        } else if($grid_win_search && $user_id != $super_user_id) {
            $addtional_condition = " AND (ss.user_id = $user_id OR ss.is_public = 1) ";
        }else {
            //do nth
        }
        $sql = $sql.$addtional_condition;
        $sql .= " ORDER BY ss.search_id ASC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }
    /*query for particualr grid header searchmenu*/
    public function getSearchResult($panel_no, $user_id) {
        $sql = " SELECT 
                    ss.search_id, 
                    ss.search_name, 
                    ss.system_flg, 
                    ss.search_criteria, 
                    ss.is_public, 
                    ss.user_id
                    FROM {$this->tableName()} AS ss
                 WHERE ss.datagrid_id = :panel_no 
                 AND ss.delete_flg != 1";
        if($user_id != 99) {
            $sql .= " AND (ss.user_id = $user_id OR ss.is_public = 1) ";
        }
        $sql .= " AND ss.show_template = 0 ORDER BY ss.search_id ASC ";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':panel_no', $panel_no, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }
    /*query for particualr grid header templateSearch*/
    public function getTemplateSearchResult($panel_no, $user_id) {
        $sql = " SELECT 
                    ss.search_id, 
                    ss.search_name, 
                    ss.system_flg, 
                    ss.search_criteria, 
                    ss.is_public, 
                    ss.user_id
                    FROM {$this->tableName()} AS ss
                 WHERE ss.datagrid_id = :panel_no 
                 AND ss.delete_flg != 1";
        if($user_id != 99) {
            $sql .= " AND (
                        (ss.user_id = $user_id AND ss.show_template = 1) OR 
                        (ss.show_template = 1 AND ss.is_public = 1) 
                    )";
        } else {
            $sql .= " AND ss.show_template = 1";
        }
        $sql .= " ORDER BY ss.search_id ASC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':panel_no', $panel_no, PDO::PARAM_INT);        
        // $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }
    public function getFieldTempSearchResult($datagrid_id, $user_id, $searchId) {
        $sql = " SELECT ss.search_criteria
                    FROM {$this->tableName()} AS ss
                 WHERE ss.datagrid_id = :datagrid_id 
                 AND (ss.search_id =:searchId)
                 AND (ss.system_flg = 1) 
                 AND (ss.user_id = :user_id AND ss.is_public = 0)
                 -- ORDER BY ss.search_name DESC
                 ORDER BY ss.search_id ASC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);        
        $cmd->bindParam(':searchId', $searchId, PDO::PARAM_INT);        
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);        
        $result = $cmd->queryRow();
        return $result;
    }
    
    /*query for particualr grid searchGridWindwo which will give both search and templateSearch*/
    public function getAllSearchResult($panel_no, $user_id) {
        $sql = " SELECT 
                 ss.search_id, 
                 ss.search_name, 
                 ss.search_criteria, 
                 ss.system_flg, 
                 ss.is_public, 
                 ss.show_template, 
                 ss.datagrid_id,
                 ss.user_id,
                 au.username,
                 ss.delete_flg
                    FROM {$this->tableName()} AS ss
                 JOIN public.app_user AS au ON(au.user_id = ss.user_id)
                 WHERE ss.datagrid_id = :panel_no 
                 AND ss.delete_flg != 1 ";
        /*filters the results if not yadmin*/
        if($user_id != 99) {
            $sql .= " AND (ss.user_id = $user_id OR ss.is_public = 1)";
        }
        $sql .= " ORDER BY ss.search_id ASC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':panel_no', $panel_no, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }
    public function deleteSearch($search_id, $user_id) {
        $sql = "DELETE FROM {$this->tableName()} 
                WHERE search_id=:search_id AND system_flg = 0 ";
        if($user_id != 99) {
            $sql .= " AND created_by = $user_id ";
        }
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':search_id', $search_id, PDO::PARAM_INT);
        // $command->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $result = $command->execute();
    }
    /*Converts database filter json to grid filter format json*/
    public function convertDbFilterToGridFilter($filterData) {
        $arr = array();
        foreach ($filterData as $col => $value) {
                $jsonCol = array('property' => $col,'value' => $value);
                $arr[] = $jsonCol;
        }
        return json_encode($arr); 
    }
    /*
    Returns sql statement to use in where condition
    @param : filter_params grid header filter params
    */
    /* public function getGridHeaderFilterSql($filter_params){
        $params = $this->getSearchFilters($filter_params);
        $sql_where = "";
        if (!empty($params)){
            if (count($params) > 1)
                $sql_where = "(". implode(' AND ', $params). ")";
            else
                $sql_where = implode(' AND ', $params);
        }
        return $sql_where;
    }*/
    public function getGridHeaderFilterSql($filter_params) {
        $return_params = $this->getSearchFilters($filter_params);
        $sql_where = "";
        $array_len = count($return_params);
        for($i=0;$i<$array_len;$i++) {
            $params = $return_params[$i];
            if(!empty($params['logicalOperator']) && $params['logicalOperator'] == 'OR') {
                $logicalOperator = ' OR ';
            }else {
                $logicalOperator = ' AND ';
            }
            if($i>0) {
                $sql_where .= $logicalOperator. $params['condition'] ;
            } else {
                $sql_where .= $params['condition'] ;
            }
        }
        return $sql_where;
    }
    public function getSearchFilters($filter_params = null) {
        $searchParamsArray = array();
        $comparisonOperator=false;
        if ($filter_params != null) {
            $filterDataRows = CJSON::decode($filter_params, true);
            foreach ($filterDataRows as $filterRow) {
                $eachColFilterValue = $filterRow['value'];
                $arr = explode('.', $filterRow['property']);
                if (count($arr) === 2){
                    //when table alais passed t3.column_1_3
                    $column_name = $arr[0] . '."'.$arr[1]. '"';
                } else {
                    //when table alais not passed column_1_3
                    $column_name = '"'.$filterRow['property']. '"';
                }
                $searchParamsArray[] = $this->_seperateSearchParam($eachColFilterValue,$column_name,$filterRow);
            }
        }
        return $searchParamsArray;
    }
    /*seprates the search params of each column header */
    private function _seperateSearchParam($eachColFilterValue,$column_name,$filterRow) {
        $comparisonOperator=false;
        $seperatedSearchParamsArray = array();
        $eachColFilterValueArray = array();
        /*checks eg. asd,ttt of each column header filter*/
        if(preg_match('/,/',$eachColFilterValue, $matches)) {
            $op = $matches[0];
            $eachColFilterValueArray = preg_split('/,/', $eachColFilterValue);
        }
        /*checks eg. asd & ttt of each column header filter*/
        else if(preg_match('/\s&\s/',$eachColFilterValue, $matches)) {
            $op = $matches[0];
            $eachColFilterValueArray = preg_split('/\s&\s/', $eachColFilterValue);
        }else {
            //do nth
        }
        if(!empty($eachColFilterValueArray)) {
            $op = trim($op);
            $format =  "Y-m-d";
            $dates= array(); //date values
            $values = array(); // other values
            $conditions = array();
            /*seperates dateValue from $eachColFilterValueArray*/
            foreach ($eachColFilterValueArray as $val) {
                $str = $val;
                // $str = remove_dbl_quoted($val);
                $is_quoted = $eachColFilterValue !== $str;
                //set unquoted vaue
                $val = trim(pg_escape_string($str));
                if ($val == '') {
                    continue;
                }
                $date = DateTime::createFromFormat($format, $val);
                if($date!==false){
                    $dates[]= $date->format($format);
                }
                else{
                    $values[] = $val;
                }
            }
            foreach ($dates as $key => $str_value) {
                $resp = $this->_checkCharacter($str_value);
                if(!empty($resp['comparisonOperator'])) {
                    $comparisonOperator = true;
                    break;
                }
            }
            //for 2 dates values
            if(count($dates) == 2 && !$comparisonOperator){
                $arr = array();
                $arr['condition'] = " ({$column_name} BETWEEN '{$dates[0]}' AND '{$dates[1]}') ";
                $arr['logicalOperator'] = '';
                // $conditions[] = " ({$column_name} BETWEEN '{$dates[0]}' AND '{$dates[1]}') ";
                $conditions[] = $arr ;
            } else {
                $values = array_merge($values, $dates);
            }
            //loop for not dates values
            foreach ($values as $val) {
                $condition = $this->getValCondition($column_name, $val, true);
                if (!empty($condition['condition'])){
                    $conditions[] = $condition;
                    // $conditions[] = $condition['condition'];
                }
            }
            $arr = array();
            $arr['condition'] = null;
            $arr['logicalOperator'] = null;
            $arrLen = count($conditions);
            for($i=0;$i<$arrLen;$i++) {
                $arrayElement = $conditions[$i];
                $arr['condition'] .=  $arrayElement['condition'];
                if($i<$arrLen-1) {
                    if($op == ',') {
                        $arr['condition'] .=  " OR";
                    } else if($op == '&') {
                        $arr['condition'] .=  " AND";
                    } else {
                        //do nth
                    }
                }
            }
            if(!empty($conditions[0]['logicalOperator']))
                $arr['logicalOperator'] = $conditions[0]['logicalOperator'];
            /*if($op == ',') {
                $arr['condition'] = " (" . implode(" OR ", $conditions['condition']) . ") ";
            } else if($op == '&') {
                $arr['condition'] = " (" . implode(" AND ", $conditions['condition']) . ") ";
            }
            */
            $seperatedSearchParamsArray = $arr;
        }else {
            if (trim($filterRow['value']) == '') {
                continue;
            }
            $condition = $this->getValCondition($column_name, $filterRow['value'], false);
            if (!empty($condition['condition'])){
                $seperatedSearchParamsArray = $condition;
            }
        }
        return $seperatedSearchParamsArray;
    }
    protected function getValCondition($column_name, $str_value){
        $value          = $str_value; 
        $op             = ""; 
        $condition      = "";
        // $isDate      = false;

        /*checks if the filter criteria has !,#,< etc character*/
        $resp           = $this->_checkCharacter($str_value);
        $value          = $resp['value'];
        $op             = $resp['comparisonOperator'];
        $logicalOperator= $resp['logicalOperator'];
        $astrickAtStart = $resp['astrickAtStart'];
        $astrickAtLast  = $resp['astrickAtLast'];

        /*for date filter criteria*/
        $format         = 'Y-m-d';
        $date           = DateTime::createFromFormat($format, $value);
        if($date!==false){
            $value = $date->format($format);
            // $isDate=true;
        }
        $str = $value;
        // $str = remove_dbl_quoted($value);
        // if (!$exact_match) {
        //  $exact_match = $value !== $str;
        // }
        //set unquoted vaue
        
        $value = pg_escape_string($str);
        $op = pg_escape_string($op);
        if(!empty($op)) {
            if($op == "#") {
                $condition = " ({$column_name} is null OR trim($column_name::text) = '')";
            }else if ($op == "!") {
                if($astrickAtStart && $astrickAtLast) {
                    $condition = " ({$column_name}::TEXT NOT iLIKE '%{$value}%') ";
                } else if($astrickAtStart) {
                    $condition = " ({$column_name}::TEXT NOT iLIKE '%{$value}') ";
                } else if($astrickAtLast) {
                    $condition = " ({$column_name}::TEXT NOT iLIKE '{$value}%') ";
                } else {
                    if (is_numeric($value) || $date){
                        $condition = " ({$column_name}::TEXT !='{$value}') ";
                    }else {
                        $condition = " ({$column_name}::TEXT NOT iLIKE '%{$value}%') ";
                    }
                }
            }else {
                /*$value=$matches[2];
                $op=$matches[1];*/
                // if($isDate) {
                if (is_numeric($value)){
                    $condition = " (convert_tonumeric({$column_name}::TEXT) ".$op."{$value}) ";
                } else {
                    $condition = " ({$column_name}::TEXT ".$op."'{$value}')";   
                }
                // }else {
                    // $condition = " CAST(CASE WHEN isnumeric({$column_name}::text) =  true THEN {$column_name} ELSE NULL END AS float) ". " ". $op . " " . " {$value}";
                // }
            }
        }else {
            if($astrickAtStart && $astrickAtLast) {
                $condition = " ({$column_name}::TEXT iLIKE '%{$value}%') ";
            } else if($astrickAtStart) {
                $condition = " ({$column_name}::TEXT iLIKE '%{$value}') ";
            } else if($astrickAtLast) {
                $condition = " ({$column_name}::TEXT iLIKE '{$value}%') ";
            } else {
                if (is_numeric($value) || $date){
                    $condition = " ({$column_name}::TEXT = '{$value}') ";
                }else {
                    $condition = " ({$column_name}::TEXT iLIKE '%{$value}%') ";
                }
            }
        }
        $condArr = array(
            'condition'=>$condition,
            'logicalOperator'=>$logicalOperator,
        );
        // var_dump($condArr);
        // exit;
        return $condArr;
    }
    private function _checkCharacter($str_value) {
        $value              = $str_value;
        $op                 = "";
        $logicalOperator    = "";
        $astrickAtStart     = null;
        $astrickAtLast      = null;

        /*checks for the logical operator like OR in the search string*/
        $first3Charactes    = substr($str_value, 0,3);
        $first2Charactes    = strtoupper(substr($first3Charactes, 0,2));
        $lastCharacter      = substr($first3Charactes, -1);
        if($first2Charactes == 'OR' && $lastCharacter == ' ') {
            $logicalOperator = 'OR';
            $value = substr($str_value,3);
            /*example if search string is like 'or '*/
            if(empty($value)) {
                $logicalOperator = "";
                $value = $str_value;
            } else if(preg_match('/^(["\']).*\1$/m', $value)) {
                $value = remove_dbl_quoted($value);
                $arr = array(
                    'value'=>$value,
                    'comparisonOperator'=>$op,
                    'logicalOperator'=>$logicalOperator
                );
                return $arr;
            } else {
                // $logicalOperator = "";
                // $value = $str_value;
            }
        }
        /*checks !,#,< etc character in the search string*/
        if(preg_match('/^(?:\s*(<>|<=|>=|<|>|=|#|!))?(.*)$/',$value, $matches)) {
            $value  = $matches[2];
            $op     = $matches[1];
        }
        /*checks postion of * in the search string*/
        $hasAstrick = strpos($value,'*');
        if($hasAstrick !== false) {
            $firstChar = $value[0];
            $lastChar = $value[strlen($value)-1];
            $actualValue = $value;
            if($firstChar == "*") {
                $astrickAtStart = true;
                $actualValue = substr($actualValue, 1);
            }
            if($lastChar == "*") {
                $astrickAtLast = true;
                $actualValue = substr($actualValue, 0,strlen($actualValue)-1);
            }
            $value = $actualValue;
        }
        $arr = array(
            'value'=>$value,
            'comparisonOperator'=>$op,
            'logicalOperator'=>$logicalOperator,
            'astrickAtStart'=>$astrickAtStart,
            'astrickAtLast'=>$astrickAtLast
        );
        return $arr;
    }
}
