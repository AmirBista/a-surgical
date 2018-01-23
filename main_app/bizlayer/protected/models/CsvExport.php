<?php

/**
 * This is the model class for table "sys_datagrid".
 *
 * The followings are the available columns in table 'sys_datagrid':
 * @property integer $datagrid_id
 * @property string $datagrid_name
 * @property integer $page_size
 * @property integer $show_row_number
 * @property integer $display_column_count
 * @property integer $show_action_column
 * @property integer $show_checkbox_column
 *
 * The followings are the available model relations:
 * @property Search[] $searches
 */
class CsvExport extends YIGBaseModel
{
	/**
	 * Returns the static model of the specified AR class.
	 * @param string $className active record class name.
	 * @return CsvExport the static model class
	 */
	#00 YII auto generated code
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_datagrid';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('datagrid_name, page_size', 'required'),
			array('page_size, show_row_number, display_column_count, show_action_column, show_checkbox_column', 'numerical', 'integerOnly'=>true),
			array('datagrid_name', 'length', 'max'=>100),
			// The following rule is used by search().
			// Please remove those attributes that should not be searched.
			array('datagrid_id, datagrid_name, page_size, show_row_number, display_column_count, show_action_column, show_checkbox_column', 'safe', 'on'=>'search'),
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
			'searches' => array(self::HAS_MANY, 'Search', 'datagrid_id'),
		);
	}

	/**
	 * @return array customized attribute labels (name=>label)
	 */
	public function attributeLabels()
	{
		return array(
			'datagrid_id' => 'Datagrid',
			'datagrid_name' => 'Datagrid Name',
			'page_size' => 'Page Size',
			'show_row_number' => 'Show Row Number',
			'display_column_count' => 'Display Column Count',
			'show_action_column' => 'Show Action Column',
			'show_checkbox_column' => 'Show Checkbox Column',
		);
	}

	/**
	 * Retrieves a list of models based on the current search/filter conditions.
	 * @return CActiveDataProvider the data provider that can return the models based on the search/filter conditions.
	 */
	public function search()
	{
		// Warning: Please modify the following code to remove attributes that
		// should not be searched.

		$criteria=new CDbCriteria;

		$criteria->compare('datagrid_id',$this->datagrid_id);
		$criteria->compare('datagrid_name',$this->datagrid_name,true);
		$criteria->compare('page_size',$this->page_size);
		$criteria->compare('show_row_number',$this->show_row_number);
		$criteria->compare('display_column_count',$this->display_column_count);
		$criteria->compare('show_action_column',$this->show_action_column);
		$criteria->compare('show_checkbox_column',$this->show_checkbox_column);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}
}