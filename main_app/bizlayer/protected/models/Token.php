<?php

/**
 * This is the model class for table "app_token".
 *
 * The followings are the available columns in table 'app_token':
 * @property integer $token_id
 * @property string $access_token
 * @property integer $access_count_limit
 * @property string $access_url
 * @property string $expiry_date
 * @property integer $is_locked
 * @property string $locked_datetime
 * @property integer $role
 * @property string $language
 * @property integer $access_count
 * @property string $last_accessed_on
 * @property string $user_agent
 * @property string $ip
 * @property integer $created_by
 * @property string $created_datetime
 */
class Token extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_token';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('access_count_limit, is_locked, role, access_count, created_by', 'numerical', 'integerOnly'=>true),
			array('access_token', 'length', 'max'=>200),
			array('access_url', 'length', 'max'=>1000),
			array('language', 'length', 'max'=>50),
			array('user_agent', 'length', 'max'=>512),
			array('ip', 'length', 'max'=>255),
			array('expiry_date, locked_datetime, last_accessed_on, created_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('token_id, access_token, access_count_limit, access_url, expiry_date, is_locked, locked_datetime, role, language, access_count, last_accessed_on, user_agent, ip, created_by, created_datetime', 'safe', 'on'=>'search'),
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
			'token_id' => 'Token',
			'access_token' => 'Access Token',
			'access_count_limit' => 'Access Count Limit',
			'access_url' => 'Access Url',
			'expiry_date' => 'Expiry Date',
			'is_locked' => 'Is Locked',
			'locked_datetime' => 'Locked Datetime',
			'role' => 'Role',
			'language' => 'Language',
			'access_count' => 'Access Count',
			'last_accessed_on' => 'Last Accessed On',
			'user_agent' => 'User Agent',
			'ip' => 'Ip',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
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

		$criteria->compare('token_id',$this->token_id);
		$criteria->compare('access_token',$this->access_token,true);
		$criteria->compare('access_count_limit',$this->access_count_limit);
		$criteria->compare('access_url',$this->access_url,true);
		$criteria->compare('expiry_date',$this->expiry_date,true);
		$criteria->compare('is_locked',$this->is_locked);
		$criteria->compare('locked_datetime',$this->locked_datetime,true);
		$criteria->compare('role',$this->role);
		$criteria->compare('language',$this->language,true);
		$criteria->compare('access_count',$this->access_count);
		$criteria->compare('last_accessed_on',$this->last_accessed_on,true);
		$criteria->compare('user_agent',$this->user_agent,true);
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Token the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
}
