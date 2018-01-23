<?php

/**
 * This is the model class for table "p_staff".
 *
 * The followings are the available columns in table 'p_staff':
 * @property integer $id
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $column_6_01
 * @property string $column_6_02
 * @property string $column_6_03
 * @property string $column_6_04
 * @property string $column_6_05
 * @property string $column_6_06
 * @property string $column_6_07
 * @property string $column_6_08
 * @property string $column_6_09
 * @property string $column_6_10
 * @property string $column_6_11
 * @property string $column_6_12
 * @property string $column_6_13
 * @property string $column_6_14
 * @property string $column_6_15
 * @property string $column_6_16
 * @property string $column_6_17
 * @property string $column_6_18
 * @property string $column_6_19
 * @property string $column_6_20
 * @property string $column_6_21
 * @property string $column_6_22
 * @property string $column_6_23
 * @property string $column_6_24
 * @property string $column_6_25
 * @property string $column_6_26
 * @property string $column_6_27
 * @property string $column_6_28
 * @property string $column_6_29
 * @property string $column_6_30
 * @property string $column_6_31
 * @property string $column_6_32
 * @property string $column_6_33
 * @property string $column_6_34
 * @property string $column_6_35
 * @property string $column_6_36
 * @property string $column_6_37
 * @property string $column_6_38
 * @property string $column_6_39
 * @property string $column_6_40
 * @property string $ext_id
 */
class Staff extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 9;
	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'p_staff';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, created_by, updated_by, delete_flg', 'numerical', 'integerOnly'=>true),
			array('column_6_02, column_6_03, column_6_04, column_6_05, column_6_06, column_6_07, column_6_08, column_6_09, column_6_11, column_6_12, column_6_13, column_6_14, column_6_15, column_6_17, column_6_18, column_6_19, column_6_20, column_6_21, column_6_22, column_6_23, column_6_24, column_6_25, column_6_26, column_6_27, column_6_28, column_6_29, column_6_31, column_6_32, column_6_33, column_6_34, column_6_35, column_6_37, column_6_38, column_6_39, column_6_40, ext_id', 'length', 'max'=>100),
			array('column_6_10, column_6_30', 'length', 'max'=>1000),
			array('column_6_16, column_6_36', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, department_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, column_6_01, column_6_02, column_6_03, column_6_04, column_6_05, column_6_06, column_6_07, column_6_08, column_6_09, column_6_10, column_6_11, column_6_12, column_6_13, column_6_14, column_6_15, column_6_16, column_6_17, column_6_18, column_6_19, column_6_20, column_6_21, column_6_22, column_6_23, column_6_24, column_6_25, column_6_26, column_6_27, column_6_28, column_6_29, column_6_30, column_6_31, column_6_32, column_6_33, column_6_34, column_6_35, column_6_36, column_6_37, column_6_38, column_6_39, column_6_40, ext_id', 'safe', 'on'=>'search'),
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
			'id' => 'ID',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'delete_flg' => 'Delete Flg',
			'column_6_01' => 'Column 6 01',
			'column_6_02' => 'Column 6 02',
			'column_6_03' => 'Column 6 03',
			'column_6_04' => 'Column 6 04',
			'column_6_05' => 'Column 6 05',
			'column_6_06' => 'Column 6 06',
			'column_6_07' => 'Column 6 07',
			'column_6_08' => 'Column 6 08',
			'column_6_09' => 'Column 6 09',
			'column_6_10' => 'Column 6 10',
			'column_6_11' => 'Column 6 11',
			'column_6_12' => 'Column 6 12',
			'column_6_13' => 'Column 6 13',
			'column_6_14' => 'Column 6 14',
			'column_6_15' => 'Column 6 15',
			'column_6_16' => 'Column 6 16',
			'column_6_17' => 'Column 6 17',
			'column_6_18' => 'Column 6 18',
			'column_6_19' => 'Column 6 19',
			'column_6_20' => 'Column 6 20',
			'column_6_21' => 'Column 6 21',
			'column_6_22' => 'Column 6 22',
			'column_6_23' => 'Column 6 23',
			'column_6_24' => 'Column 6 24',
			'column_6_25' => 'Column 6 25',
			'column_6_26' => 'Column 6 26',
			'column_6_27' => 'Column 6 27',
			'column_6_28' => 'Column 6 28',
			'column_6_29' => 'Column 6 29',
			'column_6_30' => 'Column 6 30',
			'column_6_31' => 'Column 6 31',
			'column_6_32' => 'Column 6 32',
			'column_6_33' => 'Column 6 33',
			'column_6_34' => 'Column 6 34',
			'column_6_35' => 'Column 6 35',
			'column_6_36' => 'Column 6 36',
			'column_6_37' => 'Column 6 37',
			'column_6_38' => 'Column 6 38',
			'column_6_39' => 'Column 6 39',
			'column_6_40' => 'Column 6 40',
			'ext_id' => 'Ext',
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

		$criteria->compare('id',$this->id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('column_6_01',$this->column_6_01);
		$criteria->compare('column_6_02',$this->column_6_02,true);
		$criteria->compare('column_6_03',$this->column_6_03,true);
		$criteria->compare('column_6_04',$this->column_6_04,true);
		$criteria->compare('column_6_05',$this->column_6_05,true);
		$criteria->compare('column_6_06',$this->column_6_06,true);
		$criteria->compare('column_6_07',$this->column_6_07,true);
		$criteria->compare('column_6_08',$this->column_6_08,true);
		$criteria->compare('column_6_09',$this->column_6_09,true);
		$criteria->compare('column_6_10',$this->column_6_10,true);
		$criteria->compare('column_6_11',$this->column_6_11,true);
		$criteria->compare('column_6_12',$this->column_6_12,true);
		$criteria->compare('column_6_13',$this->column_6_13,true);
		$criteria->compare('column_6_14',$this->column_6_14,true);
		$criteria->compare('column_6_15',$this->column_6_15,true);
		$criteria->compare('column_6_16',$this->column_6_16,true);
		$criteria->compare('column_6_17',$this->column_6_17,true);
		$criteria->compare('column_6_18',$this->column_6_18,true);
		$criteria->compare('column_6_19',$this->column_6_19,true);
		$criteria->compare('column_6_20',$this->column_6_20,true);
		$criteria->compare('column_6_21',$this->column_6_21,true);
		$criteria->compare('column_6_22',$this->column_6_22,true);
		$criteria->compare('column_6_23',$this->column_6_23,true);
		$criteria->compare('column_6_24',$this->column_6_24,true);
		$criteria->compare('column_6_25',$this->column_6_25,true);
		$criteria->compare('column_6_26',$this->column_6_26,true);
		$criteria->compare('column_6_27',$this->column_6_27,true);
		$criteria->compare('column_6_28',$this->column_6_28,true);
		$criteria->compare('column_6_29',$this->column_6_29,true);
		$criteria->compare('column_6_30',$this->column_6_30,true);
		$criteria->compare('column_6_31',$this->column_6_31,true);
		$criteria->compare('column_6_32',$this->column_6_32,true);
		$criteria->compare('column_6_33',$this->column_6_33,true);
		$criteria->compare('column_6_34',$this->column_6_34,true);
		$criteria->compare('column_6_35',$this->column_6_35,true);
		$criteria->compare('column_6_36',$this->column_6_36,true);
		$criteria->compare('column_6_37',$this->column_6_37,true);
		$criteria->compare('column_6_38',$this->column_6_38,true);
		$criteria->compare('column_6_39',$this->column_6_39,true);
		$criteria->compare('column_6_40',$this->column_6_40,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Staff the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getListData($params) {
    	$for_count				= $params['for_count'];
    	$user_id 				= Yii::app()->user->user_id;
    	$sql_where 				= $params['sql_where'];
    	$user_role				= $params['user_role'];
    	$fields 				= $params['fields'];
    	$pageSize 				= $params['pageSize'];
    	$startFrom 				= $params['startFrom'];
    	$sort 					= $params['sort'];
    	$dgUtil 				= $params['dgUtil'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
    	if ((empty($fields) || count($fields) < 1) && $for_count != true) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}

    	if ($for_count != true)
    		$select_fields = $this->getSelectFields($fields);

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {		
			$sql .= "{$select_fields}, t6.id, t6.ext_id";
			$sql .= $this->getSyncStatusColumn('t6', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t6";

		if(!empty($synctime)) {
        	$sql .= " where (t6.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t6.delete_flg = 0 ";
        }
		if (!empty($sql_where))
		{
			$sql .= " AND {$sql_where}";
		}
		if (!empty($bulk_sql_where))
		{
			$sql .= " AND ({$bulk_sql_where})";
		}

		$sql .=")";

    	if ($for_count != true){
			$default_sort_order = "convert_tonumeric(t6.column_6_02) ASC";
			$sort_order = $this->getSortOrder('t6', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0)
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";

    	}
        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){

			$results = $cmd->queryScalar();
    	}else{
    		$results = $cmd->queryAll();
    	}
		return $results;
    }

}
