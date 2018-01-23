<?php

/**
 * This is the model class for table "app_user".
 *
 * The followings are the available columns in table 'app_user':
 * @property integer $user_id
 * @property string $user_code
 * @property string $username
 * @property string $password
 * @property string $first_name
 * @property string $last_name
 * @property string $phone
 * @property string $email
 * @property integer $is_locked
 * @property string $locked_datetime
 * @property integer $role
 * @property string $language
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $group_user
 * @property string $group_code
 * @property integer $is_group
 * @property string $shortcut_key
 * @property string $user_agent
 * @property string $ip
 * @property string $last_login_time
 * @property integer $login_access_count
 * @property integer $login_failure_count
 * @property integer $delete_flg
 * @property string $deleted_datetime
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class User extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_user';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('is_locked, role, company_id, department_id, group_user, is_group, login_access_count, login_failure_count, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('user_code, phone, language', 'length', 'max'=>50),
			array('username, password, first_name, last_name, group_code', 'length', 'max'=>100),
			array('email, ip', 'length', 'max'=>255),
			array('shortcut_key', 'length', 'max'=>5),
			array('user_agent', 'length', 'max'=>512),
			array('locked_datetime, last_login_time, deleted_datetime, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('user_id, user_code, username, password, first_name, last_name, phone, email, is_locked, locked_datetime, role, language, company_id, department_id, group_user, group_code, is_group, shortcut_key, user_agent, ip, last_login_time, login_access_count, login_failure_count, delete_flg, deleted_datetime, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'user_id' => 'User',
			'user_code' => 'User Code',
			'username' => 'Username',
			'password' => 'Password',
			'first_name' => 'First Name',
			'last_name' => 'Last Name',
			'phone' => 'Phone',
			'email' => 'Email',
			'is_locked' => 'Is Locked',
			'locked_datetime' => 'Locked Datetime',
			'role' => 'Role',
			'language' => 'Language',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'group_user' => 'Group User',
			'group_code' => 'Group Code',
			'is_group' => 'Is Group',
			'shortcut_key' => 'Shortcut Key',
			'user_agent' => 'User Agent',
			'ip' => 'Ip',
			'last_login_time' => 'Last Login Time',
			'login_access_count' => 'Login Access Count',
			'login_failure_count' => 'Login Failure Count',
			'delete_flg' => 'Delete Flg',
			'deleted_datetime' => 'Deleted Datetime',
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

		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('user_code',$this->user_code,true);
		$criteria->compare('username',$this->username,true);
		$criteria->compare('password',$this->password,true);
		$criteria->compare('first_name',$this->first_name,true);
		$criteria->compare('last_name',$this->last_name,true);
		$criteria->compare('phone',$this->phone,true);
		$criteria->compare('email',$this->email,true);
		$criteria->compare('is_locked',$this->is_locked);
		$criteria->compare('locked_datetime',$this->locked_datetime,true);
		$criteria->compare('role',$this->role);
		$criteria->compare('language',$this->language,true);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('group_user',$this->group_user);
		$criteria->compare('group_code',$this->group_code,true);
		$criteria->compare('is_group',$this->is_group);
		$criteria->compare('shortcut_key',$this->shortcut_key,true);
		$criteria->compare('user_agent',$this->user_agent,true);
		$criteria->compare('ip',$this->ip,true);
		$criteria->compare('last_login_time',$this->last_login_time,true);
		$criteria->compare('login_access_count',$this->login_access_count);
		$criteria->compare('login_failure_count',$this->login_failure_count);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('deleted_datetime',$this->deleted_datetime,true);
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
	 * @return User the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function validateUser($user, $without_pass){
		if($user['is_locked']==1 && $without_pass==false){
			return false;
		}else{
			return true;
		}
	}
	public function validatePassword($password){
		return $this->hashPassword($password) === $this->password;
	}

    public function hashPassword($password){
		return md5($password);
	}

	public function getStaffName($username){
		$sql = " SELECT first_name || ' ' || last_name as staffname
				 FROM app_user
				 WHERE username =:username AND delete_flg=false ";
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':username', $username, PDO::PARAM_STR);
        $result = $cmd->queryRow();
        return $result;
	}	
}
