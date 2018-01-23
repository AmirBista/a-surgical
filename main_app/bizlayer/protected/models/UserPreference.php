<?php

/**
 * This is the model class for table "app_user_preference".
 *
 * The followings are the available columns in table 'app_user_preference':
 * @property integer $preference_id
 * @property string $panel_no
 * @property string $preference_type
 * @property string $preference_name
 * @property string $preference_value
 * @property integer $user_id
 * @property string $updated_datetime
 */
class UserPreference extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'app_user_preference';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('user_id', 'numerical', 'integerOnly'=>true),
			array('panel_no', 'length', 'max'=>10),
			array('preference_type, preference_name', 'length', 'max'=>100),
			array('updated_datetime', 'length', 'max'=>6),
			array('preference_value', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('preference_id, panel_no, preference_type, preference_name, preference_value, user_id, updated_datetime', 'safe', 'on'=>'search'),
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
			'preference_id' => 'Preference',
			'panel_no' => 'Panel No',
			'preference_type' => 'Preference Type',
			'preference_name' => 'Preference Name',
			'preference_value' => 'Preference Value',
			'user_id' => 'User',
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

		$criteria->compare('preference_id',$this->preference_id);
		$criteria->compare('panel_no',$this->panel_no,true);
		$criteria->compare('preference_type',$this->preference_type,true);
		$criteria->compare('preference_name',$this->preference_name,true);
		$criteria->compare('preference_value',$this->preference_value,true);
		$criteria->compare('user_id',$this->user_id);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return UserPreference the static model class
	 */
	public static function model($className=__CLASS__) {
		return parent::model($className);
	}
	public function saveDatagridPageSize($user_id, $datagrid_id, $page_size) {
		$preference_type="datagrid";
		$preference_name= "datagrid_page_size";
		$sql = "select save_user_preference({$user_id}::int, {$datagrid_id}::text, '{$preference_type}', '{$preference_name}', '{$page_size}')";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryScalar();	
	}

	public function getDatagridPageSize($user_id, $datagrid_id) {
		$preference_type="datagrid";
		$preference_name= "datagrid_page_size";
		$sql="	SELECT value 
				FROM app_user_preference 
				WHERE user_id={$user_id} 
				AND  department_code={$datagrid_id}
				AND preference_type='{$preference_type}' 
				AND preference_name='{$preference_name}'";
		$cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryRow();	
	}

	public function getDatagridTemplate($datagrid_id,$user_id) {
    	$preference_name = 'datagrid_template';
        $sql= "SELECT up.preference_value AS temp_id
                FROM app_user_preference up
                WHERE up.user_id=:user_id AND up.panel_no=:datagrid_id AND preference_name =:preference_name";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':preference_name', $preference_name, PDO::PARAM_STR);
        $result = $cmd->queryScalar();

        if (empty($result)){
            $sql = "SELECT sd.temp_id 
                FROM sys_datagrid sd 
                WHERE sd.datagrid_id =:datagrid_id";
            $cmd = Yii::app()->db->createCommand($sql);
            $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
            $result = $cmd->queryScalar();
        }
        return $result;
    }

    /*removes all selected template of evey user by user that created specific template from app_user_preference*/
	public function deleteSelectedTemp($datagrid_id,$datagrid_temp_id) {
        $preference_name = 'datagrid_template';
		/*$sql = "DELETE FROM app_user_preference up 
                WHERE (	up.panel_no=:datagrid_id 
                		AND up.preference_name=:preference_name 
                		AND up.user_id=:user_id 
                	)";*/
		$sql = "DELETE FROM app_user_preference up 
                WHERE (	up.panel_no=:datagrid_id AND 
                		up.preference_value=:datagrid_temp_id AND 
                		up.preference_name=:preference_name 
                	)";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':datagrid_temp_id', $datagrid_temp_id, PDO::PARAM_INT);
        $cmd->bindParam(':preference_name', $preference_name, PDO::PARAM_STR);
        $cmd->execute();	
	}
	/*removes the set selected template in the app_user_preference 
    since the template now is selected is default temp for specified user*/
	public function deleteUserSelectedTemp($datagrid_id,$user_id) {
        $preference_name = 'datagrid_template';
		$sql = "DELETE FROM app_user_preference up 
                WHERE (	up.panel_no=:datagrid_id 
                		AND up.preference_name=:preference_name 
                		AND up.user_id=:user_id 
                	)";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':preference_name', $preference_name, PDO::PARAM_STR);
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $cmd->execute();	
	}
	

	public function saveDatagridTemplate($user_id, $datagrid_id, $templete_id) {
		$preference_type="datagrid";
		$preference_name= "datagrid_template";
		$sql = "select save_user_preference({$user_id}::int, {$datagrid_id}::text, '{$preference_type}', '{$preference_name}', '{$templete_id}')";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryScalar();	
	}

	public function checkTemplate($datagridTempId,$datagridId) {
        $preference_name = 'datagrid_template';
		$sql = "SELECT up.user_id 
				FROM app_user_preference up 
				WHERE ( up.panel_no=:datagridId AND 
						up.preference_value=:datagridTempId AND
					 	up.preference_name=:preference_name
					)";
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagridTempId', $datagridTempId, PDO::PARAM_INT);
        $cmd->bindParam(':datagridId', $datagridId, PDO::PARAM_INT);
        $cmd->bindParam(':preference_name', $preference_name, PDO::PARAM_STR);
        $result = $cmd->queryAll();	
        return $result;	
	}

}
