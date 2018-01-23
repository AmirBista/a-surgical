<?php

/**
 * This is the model class for table "app_user_selected_template".
 *
 * The followings are the available columns in table 'app_user_selected_template':
 * @property integer $selected_temp_id
 * @property integer $user_id
 * @property integer $datagrid_template_id
 * @property integer $datagrid_id
 */
class UserSelectedTemplate extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_user_selected_template';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id, datagrid_template_id, datagrid_id', 'numerical', 'integerOnly'=>true),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('selected_temp_id, user_id, datagrid_template_id, datagrid_id', 'safe', 'on'=>'search'),
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
			'selected_temp_id' => 'Selected Temp',
			'user_id' => 'User',
			'datagrid_template_id' => 'Datagrid Template',
			'datagrid_id' => 'Datagrid',
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

		$criteria->compare('selected_temp_id',$this->selected_temp_id);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('datagrid_template_id',$this->datagrid_template_id);
		$criteria->compare('datagrid_id',$this->datagrid_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return UserSelectedTemplate the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	/*removes the set selected template in the app_user_selected_template of created user and other users using that template*/
	public function deleteAllSelectedTemp($datagridTempId,$datagrid_id) {
		$sql = "DELETE FROM app_user_selected_template ust 
                WHERE (ust.datagrid_template_id=:datagridTempId AND ust.datagrid_id=:datagrid_id)";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagridTempId', $datagridTempId, PDO::PARAM_INT);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $result = $cmd->queryRow();		
	}

	public function checkTemplate($datagridTempId) {
		$sql = "SELECT ust.user_id 
				FROM app_user_selected_template ust 
				WHERE ust.datagrid_template_id=:datagridTempId";
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagridTempId', $datagridTempId, PDO::PARAM_INT);
        $result = $cmd->queryAll();	
        return $result;	
	}
}
