<?php

/**
 * This is the model class for table "sys_data_format".
 *
 * The followings are the available columns in table 'sys_data_format':
 * @property integer $format_id
 * @property string $format_name
 * @property string $format_desc
 * @property string $datatype
 * @property string $format_str
 * @property string $format_regexp
 * @property string $replace_str
 * @property string $regex_modifiers
 */
class DataFormat extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_data_format';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('format_name', 'length', 'max'=>250),
			array('format_desc', 'length', 'max'=>1024),
			array('datatype', 'length', 'max'=>100),
			array('format_str, format_regexp, replace_str', 'length', 'max'=>1000),
			array('regex_modifiers', 'length', 'max'=>20),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('format_id, format_name, format_desc, datatype, format_str, format_regexp, replace_str, regex_modifiers', 'safe', 'on'=>'search'),
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
			'format_id' => 'Format',
			'format_name' => 'Format Name',
			'format_desc' => 'Format Desc',
			'datatype' => 'Datatype',
			'format_str' => 'Format Str',
			'format_regexp' => 'Format Regexp',
			'replace_str' => 'Replace Str',
			'regex_modifiers' => 'Regex Modifiers',
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

		$criteria->compare('format_id',$this->format_id);
		$criteria->compare('format_name',$this->format_name,true);
		$criteria->compare('format_desc',$this->format_desc,true);
		$criteria->compare('datatype',$this->datatype,true);
		$criteria->compare('format_str',$this->format_str,true);
		$criteria->compare('format_regexp',$this->format_regexp,true);
		$criteria->compare('replace_str',$this->replace_str,true);
		$criteria->compare('regex_modifiers',$this->regex_modifiers,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return DataFormat the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getFormatList() {
		$sql = "SELECT format_id, format_name FROM sys_data_format";
		$cmd = Yii::app()->db->createCommand($sql);
		$results = $cmd->queryAll();
		return $results;
	}
}
