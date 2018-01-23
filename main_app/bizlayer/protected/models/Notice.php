<?php

/**
 * This is the model class for table "app_notice".
 *
 * The followings are the available columns in table 'app_notice':
 * @property integer $notice_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $message_type
 * @property string $message
 * @property string $message_to
 * @property string $status
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class Notice extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_notice';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('message_type, message, message_to, status, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('notice_id, company_id, department_id, message_type, message, message_to, status, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'notice_id' => 'Notice',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'message_type' => 'Message Type',
			'message' => 'Message',
			'message_to' => 'Message To',
			'status' => 'Status',
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

		$criteria->compare('notice_id',$this->notice_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('message_type',$this->message_type,true);
		$criteria->compare('message',$this->message,true);
		$criteria->compare('message_to',$this->message_to,true);
		$criteria->compare('status',$this->status,true);
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
	 * @return Notice the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	#11 function call From respected Controller
	public function getNotice($userId,$company_id) {
        $sql = "SELECT n.notice_id, n.message as message, n.updated_datetime::timestamp(0) as updated_datetime 
        		FROM app_notice as n 
        		where n.company_id=$company_id";

        $command = Yii::app()->db->createCommand($sql);
        $result = $command->queryRow();
        return $result;
    }
}
