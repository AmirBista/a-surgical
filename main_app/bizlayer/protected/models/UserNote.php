<?php

/**
 * This is the model class for table "app_user_note".
 *
 * The followings are the available columns in table 'app_user_note':
 * @property integer $note_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $title
 * @property string $note_type
 * @property string $note
 * @property integer $user_id
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class UserNote extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_user_note';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id', 'required'),
			array('company_id, department_id, user_id, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('title, note_type, note, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('note_id, company_id, department_id, title, note_type, note, user_id, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'note_id' => 'Note',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'title' => 'Title',
			'note_type' => 'Note Type',
			'note' => 'Note',
			'user_id' => 'User',
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

		$criteria->compare('note_id',$this->note_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('note_type',$this->note_type,true);
		$criteria->compare('note',$this->note,true);
		$criteria->compare('user_id',$this->user_id);
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
	 * @return UserNote the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getUsersNotes($user_id){
		$sql = "select n.note,user_id, updated_datetime from app_user_note as n where n.created_by=:user_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $result = $cmd->queryRow();
        return $result;
	}
}
