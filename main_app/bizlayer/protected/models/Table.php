<?php

/**
 * This is the model class for table "sys_table".
 *
 * The followings are the available columns in table 'sys_table':
 * @property integer $table_id
 * @property string $table_name
 * @property string $alais
 * @property string $table_code
 * @property string $table_label
 * @property string $description
 * @property integer $no_of_columns
 * @property integer $is_report
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property string $view_role
 * @property string $edit_role
 */
class Table extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_table';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('table_id, table_name, alais', 'required'),
			array('table_id, no_of_columns, is_report, delete_flg', 'numerical', 'integerOnly'=>true),
			array('table_name, table_label', 'length', 'max'=>100),
			array('alais', 'length', 'max'=>5),
			array('table_code', 'length', 'max'=>10),
			array('description', 'length', 'max'=>500),
			array('updated_datetime, view_role, edit_role', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('table_id, table_name, alais, table_code, table_label, description, no_of_columns, is_report, updated_datetime, delete_flg, view_role, edit_role', 'safe', 'on'=>'search'),
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
			'table_id' => 'Table',
			'table_name' => 'Table Name',
			'alais' => 'Alais',
			'table_code' => 'Table Code',
			'table_label' => 'Table Label',
			'description' => 'Description',
			'no_of_columns' => 'No Of Columns',
			'is_report' => 'Is Report',
			'updated_datetime' => 'Updated Datetime',
			'delete_flg' => 'Delete Flg',
			'view_role' => 'View Role',
			'edit_role' => 'Edit Role',
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

		$criteria->compare('table_id',$this->table_id);
		$criteria->compare('table_name',$this->table_name,true);
		$criteria->compare('alais',$this->alais,true);
		$criteria->compare('table_code',$this->table_code,true);
		$criteria->compare('table_label',$this->table_label,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('no_of_columns',$this->no_of_columns);
		$criteria->compare('is_report',$this->is_report);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('view_role',$this->view_role,true);
		$criteria->compare('edit_role',$this->edit_role,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Table the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function GetFields($datagrid_id,$datagrid_template_id){
		$user_role = Yii::app()->user->getAttr('userRole');
        $role_arr = formatPGArray($user_role);

		if(empty($datagrid_template_id)) {
			$sql = " SELECT 
						tf.table_field_id, tf.field_label,tf.column_name,tf.field_type_id,
						ft.xtype,fop.option_data, fop.option_sql,tf.field_option_id, 
						fop.value_column, '' as field_data
					FROM sys_table_field tf
					INNER JOIN sys_datagrid_field dtf on (
						dtf.table_field_id = tf.table_field_id and
						tf.table_id=dtf.table_id and
						tf.delete_flg=0
					)
					LEFT JOIN sys_field_type ft on ft.field_type_id = tf.field_type_id
					LEFT JOIN sys_field_option fop on fop.field_option_id = tf.field_option_id 
					WHERE  
						dtf.datagrid_id = $datagrid_id 
						AND tf.delete_flg !=1 
						AND (dtf.edit_role @> :role_arr)
						
					ORDER BY  dtf.display_order asc";
			$cmd = Yii::app()->db->createCommand($sql);
			$cmd->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);
			$result = $cmd->queryAll();
		}
		else {
			$sql = " SELECT 
						utf.table_field_id, tf.field_label,tf.column_name, tf.field_type_id,
						ft.xtype,fop.option_data, fop.option_sql,tf.field_option_id, 
						fop.value_column, '' as field_data
					FROM sys_datagrid_template_field utf
					LEFT JOIN sys_table_field tf on utf.table_field_id = tf.table_field_id
					INNER JOIN sys_datagrid_field dtf on dtf.table_field_id = tf.table_field_id 
					LEFT JOIN sys_field_type ft on ft.field_type_id = tf.field_type_id
					LEFT JOIN sys_field_option fop on fop.field_option_id = tf.field_option_id 
					WHERE  dtf.datagrid_id = $datagrid_id 
						AND tf.delete_flg !=1 
						AND utf.datagrid_template_id=$datagrid_template_id
						AND (dtf.edit_role @> :role_arr)
					ORDER BY  dtf.display_order asc";

		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(':role_arr', $role_arr, PDO::PARAM_STR);

		$result = $cmd->queryAll();
		}
    	
		$i = 0;
		foreach ($result as $row) {
			$storeData = $row['option_data'];
			if ($row['xtype'] == 'combobox' && $row['field_option_id'] != '') {
				$sql = $row['option_sql'];
				 if ($row['option_data'] == '') {
				 	if (empty($sql)) {
                        $option_id = $row['field_option_id'];
                        $sql = "SELECT fod.name 
                        		 FROM sys_field_option_data AS fod
                        		 WHERE fod.field_option_id = $option_id AND 
                        		 		fod.delete_flg !=1
                        		 ORDER BY display_order";
                    }
                    $command = Yii::app()->db->createCommand($sql);
                    $innerResults = $command->queryAll();

                    $jsonData = CJSON::encode($innerResults);
                    $storeData= $jsonData;
                }

			}

			
			$result[$i]['field_data']=$storeData;
			//print_r($storeData);
            //exit();
            $i++;
		}
		// print_r($result);
		// exit();
		return $result;

    }
    public function getSysTables() {
		$sql = "SELECT st.table_id, st.table_name
				FROM sys_table as st
				ORDER BY st.table_id ASC";
		$cmd = Yii::app()->db->createCommand($sql); 
		return $cmd->queryAll();
	}
}
