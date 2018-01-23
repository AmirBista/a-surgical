<?php

/**
 * This is the model class for table "sys_field_option_data".
 *
 * The followings are the available columns in table 'sys_field_option_data':
 * @property integer $field_option_data_id
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $field_option_id
 * @property string $code
 * @property string $name
 * @property string $description
 * @property string $view_role
 * @property integer $display_order
 * @property string $option_1
 * @property string $option_2
 * @property string $option_3
 * @property string $option_4
 * @property string $option_5
 * @property integer $system_flg
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class FieldOptionData extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_field_option_data';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, field_option_id, display_order, system_flg, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('code', 'length', 'max'=>50),
			array('name', 'length', 'max'=>100),
			array('description', 'length', 'max'=>500),
			array('option_1, option_2, option_3, option_4, option_5', 'length', 'max'=>200),
			array('view_role, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('field_option_data_id, company_id, department_id, field_option_id, code, name, description, view_role, display_order, option_1, option_2, option_3, option_4, option_5, system_flg, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'field_option_data_id' => 'Field Option Data',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'field_option_id' => 'Field Option',
			'code' => 'Code',
			'name' => 'Name',
			'description' => 'Description',
			'view_role' => 'View Role',
			'display_order' => 'Display Order',
			'option_1' => 'Option 1',
			'option_2' => 'Option 2',
			'option_3' => 'Option 3',
			'option_4' => 'Option 4',
			'option_5' => 'Option 5',
			'system_flg' => 'System Flg',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
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

		$criteria->compare('field_option_data_id',$this->field_option_data_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('field_option_id',$this->field_option_id);
		$criteria->compare('code',$this->code,true);
		$criteria->compare('name',$this->name,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('view_role',$this->view_role,true);
		$criteria->compare('display_order',$this->display_order);
		$criteria->compare('option_1',$this->option_1,true);
		$criteria->compare('option_2',$this->option_2,true);
		$criteria->compare('option_3',$this->option_3,true);
		$criteria->compare('option_4',$this->option_4,true);
		$criteria->compare('option_5',$this->option_5,true);
		$criteria->compare('system_flg',$this->system_flg);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return FieldOptionData the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}


	public function getGetOptionData($option_code, $department_code, $userRole){
		$sql = "SELECT *
				FROM sys_field_option_data AS fd
				WHERE fd.field_option_id = (SELECT field_option_id 
											FROM sys_field_option AS fpd
											WHERE fpd.option_code=:option_code and fpd.department_code = :department_code)
				ORDER BY fd.code";
        
        $command = Yii::app()->db->createCommand($sql);
		$command->bindParam(':option_code', $option_code, PDO::PARAM_STR);        
		$command->bindParam(':department_code', $department_code, PDO::PARAM_STR);        
        $data = $command->queryAll();
        return $data;
	}
	public function getMaxVal($field_option_id,$field="display_order"){
		$sql = "SELECT max({$field})+1 as {$field}
				FROM ".$this->tableName()." 
				WHERE field_option_id = '".$field_option_id."'";
        $command = Yii::app()->db->createCommand($sql);
        $data = $command->queryRow();
        return @$data[$field];
	}

	//check duplicate entry for code
	public function checkDupliCode($field_option_id,$code,$name,$field_option_data_id=null){
		$sql = "select code from ".$this->tableName()." 
				where 
					field_option_id=:field_option_id 
					 and delete_flg=0 and 
					 (code=:code or name=:name) 
					 and field_option_data_id!=:field_option_data_id";
			$command = Yii::app()->db->createCommand($sql);
			$command->bindParam(':field_option_id', $field_option_id, PDO::PARAM_INT);
			$command->bindParam(':field_option_data_id', $field_option_data_id, PDO::PARAM_INT);
			$command->bindParam(':code', $code, PDO::PARAM_STR);
			$command->bindParam(':name', $name, PDO::PARAM_STR);
		 $dataReader=$command->query();
		 $count = $dataReader->rowCount;
		/*$count = $this->countByAttributes(array(
            'field_option_id'=> $field_option_id,
            'code' => $code,
            'delete_flg' => 0
        ),"field_option_data_id!=".$field_option_data_id);
        */
        if($count>0) return true;
	}

	public function getRecordCount($field_option_id)
    {	
    	$sql = "SELECT count(*) as cnt 
    			from sys_field_option_data  as sf";
		if (!empty($field_option_id))
		{
			$sql .= " WHERE field_option_id= $field_option_id";
		}
        $cmd = Yii::app()->db->createCommand($sql);
        $count = $cmd->queryScalar();
		return $count;
    }


	public function getFieldOptionsPredefinedData($field_option_id,$page_size, $startFrom){
		if(!empty($field_option_id)){
			$sql = 	"SELECT * FROM sys_field_option_data 
            		 WHERE field_option_id= $field_option_id  ORDER BY display_order";
         	if(!empty($page_size) && $page_size>0)
	 		{
				$sql.= " LIMIT {$page_size} OFFSET {$startFrom}";
	 		}

            $cmd = Yii::app()->db->createCommand($sql); 
            $result= $cmd->queryAll();
            return $result;
		}
	}

	public function getNextValSequence(){
		$sql = "SELECT nextval(pg_get_serial_sequence('sys_field_option_data', 'field_option_data_id'))";
		// $sql = "SELECT nextval('sys_field_option_data_field_option_data_id_seq'::regclass) as field_option_data_id";
		$command = Yii::app()->db->createCommand($sql);
		$result = $command->queryScalar();
		return $result;
	}

}

