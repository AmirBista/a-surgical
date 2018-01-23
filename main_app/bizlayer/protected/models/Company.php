<?php

/**
 * This is the model class for table "app_company".
 *
 * The followings are the available columns in table 'app_company':
 * @property integer $id
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $company_code_auto
 * @property string $company_code
 * @property string $company_type
 * @property string $company_name
 * @property string $zip_code
 * @property string $phone
 * @property string $fax
 * @property string $email
 * @property string $website
 * @property string $address1
 * @property string $address2
 * @property string $address3
 * @property string $closing_date
 * @property string $contact_person1
 * @property string $contact_person1_title
 * @property string $contact_person2
 * @property string $contact_person2_title
 * @property string $a0name
 * @property string $a0code
 */
class Company extends YIGBaseModel
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_company';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_code', 'required'),
			array('delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('company_code, company_type, company_name, zip_code, phone, fax, email, website, address1, address2, address3, closing_date, contact_person1, contact_person1_title, contact_person2, contact_person2_title, a0name, a0code', 'length', 'max'=>100),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, delete_flg, created_by, created_datetime, updated_by, updated_datetime, company_code_auto, company_code, company_type, company_name, zip_code, phone, fax, email, website, address1, address2, address3, closing_date, contact_person1, contact_person1_title, contact_person2, contact_person2_title, a0name, a0code', 'safe', 'on'=>'search'),
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
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'company_code_auto' => 'Company Code Auto',
			'company_code' => 'Company Code',
			'company_type' => 'Company Type',
			'company_name' => 'Company Name',
			'zip_code' => 'Zip Code',
			'phone' => 'Phone',
			'fax' => 'Fax',
			'email' => 'Email',
			'website' => 'Website',
			'address1' => 'Address1',
			'address2' => 'Address2',
			'address3' => 'Address3',
			'closing_date' => 'Closing Date',
			'contact_person1' => 'Contact Person1',
			'contact_person1_title' => 'Contact Person1 Title',
			'contact_person2' => 'Contact Person2',
			'contact_person2_title' => 'Contact Person2 Title',
			'a0name' => 'A0name',
			'a0code' => 'A0code',
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
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('company_code_auto',$this->company_code_auto);
		$criteria->compare('company_code',$this->company_code,true);
		$criteria->compare('company_type',$this->company_type,true);
		$criteria->compare('company_name',$this->company_name,true);
		$criteria->compare('zip_code',$this->zip_code,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('fax',$this->fax,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('website',$this->website,true);
		$criteria->compare('address1',$this->address1,true);
		$criteria->compare('address2',$this->address2,true);
		$criteria->compare('address3',$this->address3,true);
		$criteria->compare('closing_date',$this->closing_date,true);
		$criteria->compare('contact_person1',$this->contact_person1,true);
		$criteria->compare('contact_person1_title',$this->contact_person1_title,true);
		$criteria->compare('contact_person2',$this->contact_person2,true);
		$criteria->compare('contact_person2_title',$this->contact_person2_title,true);
		$criteria->compare('a0name',$this->a0name,true);
		$criteria->compare('a0code',$this->a0code,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Company the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getCompanyListData()
	{	
		$userInfo = Yii::app()->user->getUserInfo();
		$company_id = $userInfo['company_id'];
		$user_role = $userInfo['userRole'];
        $sql = "select company_name as name, company_code as code from  app_company as t20 where (delete_flg = 0 or delete_flg is null)";
        if(!RoleUtil::isAdmin($user_role))
        {
	        if(!empty($company_id))
	        {
	        	$sql.="AND id = $company_id";
	        }
        }
        // echo $sql;
        // die; 
        $command = Yii::app()->db->createCommand($sql);
        $innerResults = $command->queryAll();
		return $innerResults;
	}
	public function getAllCompanyListData()
	{
        $sql = "select company_name as name, company_code as code, id as id from  app_company as t20 where (delete_flg = 0 or delete_flg is null)";
		$command = Yii::app()->db->createCommand($sql);
        $innerResults = $command->queryAll();
		return $innerResults;
	}
}
