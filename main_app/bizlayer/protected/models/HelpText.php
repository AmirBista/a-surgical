<?php

/**
 * This is the model class for table "public.yig_help".
 *
 * The followings are the available columns in table 'public.yig_help':
 * @property integer $help_id
 * @property string $help_code
 * @property string $help_name
 * @property string $help_text
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class HelpText extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'public.yig_help';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('help_code, help_name', 'length', 'max'=>100),
			array('help_text, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('help_id, help_code, help_name, help_text, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'help_id' => 'Help',
			'help_code' => 'Help Code',
			'help_name' => 'Help Name',
			'help_text' => 'Help Text',
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

		$criteria->compare('help_id',$this->help_id);
		$criteria->compare('help_code',$this->help_code,true);
		$criteria->compare('help_name',$this->help_name,true);
		$criteria->compare('help_text',$this->help_text,true);
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
	 * @return HelpText the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getHelpList(){
        $sql = "SELECT help_id, help_name, help_code, help_text,delete_flg 
        		 FROM {$this->tableName()} 
        		 WHERE delete_flg = 0 
        		 ORDER BY help_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryAll();
        return $results;
    }
    public function getRespectiveHelp($datagrid_id){
    	$sql = "SELECT 
					yh.help_text, yh.help_name, yh.help_id FROM {$this->tableName()} yh
					join sys_datagrid sd
					ON sd.help_id=yh.help_id
					WHERE
					datagrid_id=$datagrid_id and yh.delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
     public function getHelpTextForOrderEntry(){
    	$sql = "SELECT help_id, help_code, help_name, help_text 
    			 FROM {$this->tableName()} 
    			 WHERE help_id = 101 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
    public function getHelpTextForPurchaseEntry(){
    	$sql = "SELECT help_id, help_code, help_name, help_text 
    			 FROM {$this->tableName()} 
    			 WHERE help_id = 102 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
    public function getHelpTextForTransferEntry(){
    	$sql = "SELECT help_id, help_code, help_name, help_text 
    			 FROM {$this->tableName()} 
    			 WHERE help_id = 103 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
    public function getHelpTextForServiceEntry(){
    	$sql = "SELECT help_id, help_code, help_name, help_text 
    			 FROM {$this->tableName()} 
    			 WHERE help_id = 104 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
    public function getHelpTextForRepairEntry(){
    	$sql = "SELECT help_id, help_code, help_name, help_text 
    			 FROM {$this->tableName()} 
    			 WHERE help_id = 105 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }

    //  public function getHelpTextForOrderEstimationEntry(){
    // 	$sql = "SELECT 
				// 	help_id, help_code, help_name, help_text FROM {$this->tableName()} WHERE help_id = 102";
    //     $cmd = Yii::app()->db->createCommand($sql);
    //     $results = $cmd->queryRow();
    //     return $results;
    // }
    public function getHelpTextForCsvMap(){
		$sql = "SELECT help_id, help_code, help_name, help_text 
				 FROM {$this->tableName()} 
				 WHERE help_id = 102 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
    public function getHelpTextForDashboard(){
    	$sql = "SELECT  help_id, help_code, help_name, help_text 
    		 	 FROM {$this->tableName()}
    		 	 WHERE help_id = 999 AND delete_flg=0";
        $cmd = Yii::app()->db->createCommand($sql);
        $results = $cmd->queryRow();
        return $results;
    }
}
