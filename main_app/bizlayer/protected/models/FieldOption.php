<?php

/**
 * This is the model class for table "sys_field_option".
 *
 * The followings are the available columns in table 'sys_field_option':
 * @property integer $field_option_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $option_code
 * @property string $option_name
 * @property string $key_column
 * @property string $value_column
 * @property string $option_data
 * @property string $option_sql
 * @property string $required_params
 * @property integer $department_code
 * @property string $store_url
 * @property integer $hide_label
 * @property integer $is_form_combo_grid
 * @property integer $datagrid_id
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property string $field_option_new_role
 * @property string $field_option_edit_role
 * @property string $field_option_delete_role
 */
class FieldOption extends YIGBaseModel
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_field_option';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('option_code, option_name, key_column, value_column', 'required'),
			array('company_id, department_id, department_code, hide_label, is_form_combo_grid, datagrid_id, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('option_code, option_name, key_column, value_column', 'length', 'max'=>100),
			array('option_sql', 'length', 'max'=>1000),
			array('required_params', 'length', 'max'=>500),
			array('store_url', 'length', 'max'=>200),
			array('option_data, created_datetime, updated_datetime, field_option_new_role, field_option_edit_role, field_option_delete_role', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('field_option_id, company_id, department_id, option_code, option_name, key_column, value_column, option_data, option_sql, required_params, department_code, store_url, hide_label, is_form_combo_grid, datagrid_id, delete_flg, created_by, created_datetime, updated_by, updated_datetime, field_option_new_role, field_option_edit_role, field_option_delete_role', 'safe', 'on'=>'search'),
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
			'field_option_id' => 'Field Option',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'option_code' => 'Option Code',
			'option_name' => 'Option Name',
			'key_column' => 'Key Column',
			'value_column' => 'Value Column',
			'option_data' => 'Option Data',
			'option_sql' => 'Option Sql',
			'required_params' => 'Required Params',
			'department_code' => 'Department Code',
			'store_url' => 'Store Url',
			'hide_label' => 'Hide Label',
			'is_form_combo_grid' => 'Is Form Combo Grid',
			'datagrid_id' => 'Datagrid',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'field_option_new_role' => 'Field Option New Role',
			'field_option_edit_role' => 'Field Option Edit Role',
			'field_option_delete_role' => 'Field Option Delete Role',
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

		$criteria->compare('field_option_id',$this->field_option_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('option_code',$this->option_code,true);
		$criteria->compare('option_name',$this->option_name,true);
		$criteria->compare('key_column',$this->key_column,true);
		$criteria->compare('value_column',$this->value_column,true);
		$criteria->compare('option_data',$this->option_data,true);
		$criteria->compare('option_sql',$this->option_sql,true);
		$criteria->compare('required_params',$this->required_params,true);
		$criteria->compare('department_code',$this->department_code);
		$criteria->compare('store_url',$this->store_url,true);
		$criteria->compare('hide_label',$this->hide_label);
		$criteria->compare('is_form_combo_grid',$this->is_form_combo_grid);
		$criteria->compare('datagrid_id',$this->datagrid_id);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('field_option_new_role',$this->field_option_new_role,true);
		$criteria->compare('field_option_edit_role',$this->field_option_edit_role,true);
		$criteria->compare('field_option_delete_role',$this->field_option_delete_role,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return FieldOption the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getGetFieldOptionId($option_code){
		
		$sql ="SELECT fpd.field_option_id
				FROM sys_field_option AS fpd
				WHERE fpd.option_code = '".$option_code."' LIMIT 1";
		
        
        $command = Yii::app()->db->createCommand($sql);
        $data = $command->queryRow();
        return $data;
	}

	public function getRecordCount($department_code)
    {	
    	$sql = "SELECT count(*) as cnt 
    			from sys_field_option  as sf";
		if (!empty($department_code))
		{
			$sql .= " WHERE department_code= $department_code";
		}
        $cmd = Yii::app()->db->createCommand($sql);
        $count = $cmd->queryScalar();
		return $count;
    }


	public function getFieldOptionsPredefined($department_code,$page_size, $startFrom){
		if(!empty($department_code)){
			$sql = "SELECT * FROM sys_field_option 
            		WHERE department_code= $department_code ";

         	if(!empty($page_size) && $page_size>0)
	 		{
				$sql.= " LIMIT {$page_size} OFFSET {$startFrom}";
	 		}

            $cmd = Yii::app()->db->createCommand($sql); 
            $result= $cmd->queryAll();
            return $result;
		}
	}
	public function getUserRoles($field_option_id,$user_role) {
        $role_arr = formatPGArray($user_role);
    	$sql = "SELECT 
    				case when field_option_new_role @> :role_arr then true else false end as new_role, 
  					case when field_option_edit_role@> :role_arr then true else false end as edit_role, 
  					case when field_option_delete_role@> :role_arr  then true else false end as delete_role
				 FROM sys_field_option
				 WHERE (field_option_id = :field_option_id)";
        $cmd = Yii::app()->db->createCommand($sql);    
        $cmd->bindParam(':field_option_id', $field_option_id, PDO::PARAM_INT);
        $cmd->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
        $result = $cmd->queryRow();
        return $result;
    }
}
