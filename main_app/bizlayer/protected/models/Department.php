<?php

/**
 * This is the model class for table "app_department".
 *
 * The followings are the available columns in table 'app_department':
 * @property integer $department_id
 * @property integer $company_id
 * @property string $department_name
 * @property string $department_type_code
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property string $department_code
 * @property string $signature
 */
class Department extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_department';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('department_type_code', 'length', 'max'=>100),
			array('department_code', 'length', 'max'=>50),
			array('department_name, created_datetime, updated_datetime, signature', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('department_id, company_id, department_name, department_type_code, delete_flg, created_by, created_datetime, updated_by, updated_datetime, department_code, signature', 'safe', 'on'=>'search'),
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
			'department_id' => 'Department',
			'company_id' => 'Company',
			'department_name' => 'Department Name',
			'department_type_code' => 'Department Type Code',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'department_code' => 'Department Code',
			'signature' => 'Signature',
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

		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_name',$this->department_name,true);
		$criteria->compare('department_type_code',$this->department_type_code,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('department_code',$this->department_code,true);
		$criteria->compare('signature',$this->signature,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Department the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getDepartmentListData()
	{
		$userInfo = Yii::app()->user->getUserInfo();
		$department_id = $userInfo['department_id'];
		$company_id = $userInfo['company_id'];
		$user_role = $userInfo['userRole'];
        $sql = "SELECT department_name AS name, department_type_code AS code 
        		FROM  app_department 
        		WHERE (delete_flg = 0 OR delete_flg IS NULL) ";
        
        
        if(!(RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)))
	    {
	    	// if not admin or super Admin
	    	if(!empty($department_id) || !empty($company_id))
	    	{
		        $sql.= " AND ";
	    	}
		    if (RoleUtil::isCompanyAdmin($user_role))
	        {
	            // all department of same company
	            $sql.= " company_id = {$company_id} ";
	        }
	        else if (RoleUtil::isStoreManager($user_role))
	        {
	            // same department of same company
	            $sql.= " company_id = {$company_id} AND department_id = {$department_id} ";
	        }
	        else
	        {
	            // same department of same company
	            $sql.= " company_id = {$company_id} AND department_id = {$department_id} ";    
	        }
	    }
        $command = Yii::app()->db->createCommand($sql);
        $innerResults = $command->queryAll();
		return $innerResults;
	}

	public function getCompanyDepartmentList($company_id){

		$userInfo = Yii::app()->user->getUserInfo();
		$department_id = $userInfo['department_id'];
		if(empty($company_id))
		{
			$company_id = $userInfo['company_id'];
		}
		$user_role = $userInfo['userRole'];
        $sql = "SELECT department_name AS name, department_id AS code 
        		FROM  app_department 
        		WHERE (delete_flg = 0 OR delete_flg IS NULL) ";
        
        $roleCondition = "";
        if (RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)){
            //allow all records for for super user.
        }
        else
        {
            // all department of same company
            $roleCondition = " company_id = {$company_id} ";
        }

        if(!empty($roleCondition))
        	$sql.= " AND ".$roleCondition;
        $command = Yii::app()->db->createCommand($sql);
        $innerResults = $command->queryAll();
		return $innerResults;	
	}
}
