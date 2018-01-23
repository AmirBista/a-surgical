<?php

/**
 * This is the model class for table "sys_datagrid_template".
 *
 * The followings are the available columns in table 'sys_datagrid_template':
 * @property integer $datagrid_template_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $template_name
 * @property integer $datagrid_id
 * @property integer $is_public
 * @property integer $system_flg
 * @property string $locked_column
 * @property string $view_role
 * @property string $remarks
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class DatagridTemplate extends YIGBaseModel
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'sys_datagrid_template';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, datagrid_id, is_public, system_flg, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('locked_column', 'length', 'max'=>100),
			array('template_name, view_role, remarks, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('datagrid_template_id, company_id, department_id, template_name, datagrid_id, is_public, system_flg, locked_column, view_role, remarks, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
			'datagrid_template_id' => 'Datagrid Template',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'template_name' => 'Template Name',
			'datagrid_id' => 'Datagrid',
			'is_public' => 'Is Public',
			'system_flg' => 'System Flg',
			'locked_column' => 'Locked Column',
			'view_role' => 'View Role',
			'remarks' => 'Remarks',
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

		$criteria->compare('datagrid_template_id',$this->datagrid_template_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('template_name',$this->template_name,true);
		$criteria->compare('datagrid_id',$this->datagrid_id);
		$criteria->compare('is_public',$this->is_public);
		$criteria->compare('system_flg',$this->system_flg);
		$criteria->compare('locked_column',$this->locked_column,true);
		$criteria->compare('view_role',$this->view_role,true);
		$criteria->compare('remarks',$this->remarks,true);
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
	 * @return DatagridTemplate the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getTemplateName($datagrid_id,$user_id) {
		$sql = "SELECT dt.datagrid_template_id, dt.template_name, dt.datagrid_id, dt.created_by, dt.is_public,dt.system_flg,dt.locked_column
				FROM sys_datagrid_template as dt
				WHERE (datagrid_id =:datagrid_id AND (dt.is_public=1 OR dt.created_by=:user_id))
				ORDER BY dt.is_public DESC";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(":datagrid_id", $datagrid_id,PDO::PARAM_INT);
		$cmd->bindParam(":user_id", $user_id,PDO::PARAM_INT);
		$result = $cmd->queryAll();
		return $result;
	}
	public function saveTemplateName($template_name, $datagrid_id) {
		$sql = "INSERT INTO sys_datagrid_template (template_name, datagrid_id)
				VALUES ('$template_name', $datagrid_id)";
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryRow();
		return $result;
	}
	public function getDefaultPanelFields($datagrid_id, $datagrid_template_id,$shownColId) {
		$user_role = Yii::app()->user->getAttr('userRole');
		$role_arr = formatPGArray($user_role);
		$sql = "SELECT DISTINCT df.table_field_id,
				df.display_order,
				df.system_field_flg,
				tf.field_label,";

        // if (!empty($datagrid_template_id)){
        //     $sql.= " dtf.hidden";
        // }
        // else
        // {
            $sql.= "case when df.default_role @> :role_arr then false else true end as hidden";
        // }

		/*$sql .= " FROM
				sys_datagrid_field df
				LEFT JOIN sys_table_field tf ON df.table_field_id = tf.table_field_id";*/
		$sql .= " FROM
				sys_datagrid_field df
				INNER JOIN sys_table_field tf ON (
					df.table_id = tf.table_id
					AND df.table_field_id = tf.table_field_id
					AND tf.delete_flg = 0
				)";
		/*enters when default tempalte columns are hidden or shown*/
		if((empty($datagrid_template_id)||$datagrid_template_id==0) && !empty($shownColId)) {
			$sql .= " WHERE ((df.table_field_id  NOT IN ($shownColId";
		}
		/*enters when user created template are clicked*/
		else {
			$sql .= " LEFT JOIN sys_datagrid_template_field dtf 
						ON df.table_field_id = dtf.table_field_id
						WHERE ((df.table_field_id NOT IN (";
			if(!empty($datagrid_template_id) && !empty($shownColId))
				$sql .="$shownColId";
			else {
				$sql .="SELECT dtf.table_field_id
						 FROM sys_datagrid_template_field dtf 
						 WHERE dtf.datagrid_id=:datagrid_id 
					 	 AND dtf.datagrid_template_id=$datagrid_template_id";
			}
		}
		$sql .=") AND df.system_field_flg=0) 
				AND  df.datagrid_id=:datagrid_id
				)
				ORDER BY
				df.display_order";
		// echo $sql;die;
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(":datagrid_id", $datagrid_id,PDO::PARAM_INT);
		// if (empty($datagrid_template_id)){
			$cmd->bindParam(":role_arr", $role_arr,PDO::PARAM_STR);
        // }
		// $cmd->bindParam(":datagrid_template_id", $datagrid_template_id,PDO::PARAM_INT);
		$result = $cmd->queryAll();
		return $result;
	}
	public function getTemplatePanelFields($datagrid_template_id, $datagrid_id, $shownColId) {
		$user_id = Yii::app()->user->user_id;
		/*enters when default tempalte columns are hidden or shown*/
		if((empty($datagrid_template_id)||$datagrid_template_id==0) && !empty($shownColId)) {
			/*$sql = "SELECT
						ndf.table_field_id,
						ndf.display_order,
						ndf.system_field_flg,
						0 hidden,
						stf.field_label
					FROM sys_datagrid_field ndf
					LEFT JOIN sys_table_field stf
					ON ndf.table_field_id = stf.table_field_id
					WHERE (
						ndf.datagrid_id = $datagrid_id
						AND (
							ndf.table_field_id IN ($shownColId)
						)
					) 
					UNION ALL
					SELECT
						ndf.table_field_id,
						ndf.display_order,
						ndf.system_field_flg,
						1 hidden,
						stf.field_label
					FROM sys_datagrid_field ndf
					LEFT JOIN sys_table_field stf
					ON ndf.table_field_id = stf.table_field_id
					WHERE (
						ndf.datagrid_id = $datagrid_id
						AND (
							ndf.table_field_id NOT IN ($shownColId)
							AND ndf.system_field_flg = 1
						)
					)
					ORDER BY display_order";*/
			/*finds lock column in app_user_preference if not found then in sys_datagrid*/
			$lockColSql = "	SELECT up.preference_value as locked_col
							FROM app_user_preference up 
							WHERE (
								CAST(up.panel_no AS INT) = $datagrid_id AND 
								up.preference_name='datagrid_locked_column' AND 
								up.user_id=$user_id
							)";
			$cmd = Yii::app()->db->createCommand($lockColSql);
			$result = $cmd->queryRow();
			if(empty($result)) {
				$lockColSql = "	SELECT sd.locked_column as locked_col
								FROM sys_datagrid sd 
								WHERE sd.datagrid_id = $datagrid_id";
				$cmd = Yii::app()->db->createCommand($lockColSql);
				$result = $cmd->queryRow();
			}
			$lockedCol = $result['locked_col'];
			$sql = "SELECT
						ndf.table_field_id,
						ndf.display_order,
						ndf.system_field_flg,
						0 hidden,
						stf.field_label,
						CASE WHEN stf.field_label ='$lockedCol' THEN true ELSE false END as locked
					FROM sys_datagrid_field ndf
					LEFT JOIN sys_table_field stf
					ON ndf.table_field_id = stf.table_field_id
					WHERE (
						ndf.datagrid_id = $datagrid_id
						AND (
							ndf.table_field_id IN ($shownColId)
						)
					) 
					UNION ALL
					SELECT
						ndf.table_field_id,
						ndf.display_order,
						ndf.system_field_flg,
						1 hidden,
						stf.field_label,
						CASE WHEN stf.field_label ='$lockedCol' THEN true ELSE false END as locked
					FROM sys_datagrid_field ndf
					LEFT JOIN sys_table_field stf
					ON ndf.table_field_id = stf.table_field_id
					WHERE (
						ndf.datagrid_id = $datagrid_id
						AND (
							ndf.table_field_id NOT IN ($shownColId)
							AND ndf.system_field_flg = 1
						)
					)
					ORDER BY display_order";
		}
		/*enters when user created template are clicked*/
		else {
			$user_fld = "SELECT 
					ndtf.table_field_id, 
					ndtf.display_order, 
					ndtf.user_id,";
			if(empty($shownColId)){
				$user_fld .=" ndtf.hidden,";
			}
			else{
				$user_fld .=" 0 hidden,";
			}
			$user_fld .=" ndf.system_field_flg,	
						  stf.field_label,
						  CASE WHEN dt.locked_column IS NULL THEN false ELSE true END as locked
						FROM sys_table_field stf
						LEFT JOIN sys_datagrid_field ndf 
						ON (ndf.table_id = stf.table_id AND ndf.table_field_id = stf.table_field_id)
						LEFT JOIN sys_datagrid_template_field ndtf 
						ON (ndtf.datagrid_id = ndf.datagrid_id AND ndtf.table_field_id = stf.table_field_id)
						LEFT JOIN sys_datagrid_template dt 
						ON (
							dt.locked_column=stf.field_label AND 
							dt.datagrid_id=$datagrid_id AND 
							dt.datagrid_template_id=$datagrid_template_id
							)
						WHERE ndtf.datagrid_template_id=$datagrid_template_id AND ndtf.datagrid_id =$datagrid_id";
			if(!empty($shownColId)){
				$user_fld .=" AND ndtf.table_field_id IN ($shownColId)";
			}
			$system_fld = "SELECT 
							ndf.table_field_id,
							ndf.display_order,
							0 user_id, 
							1 hidden,
							ndf.system_field_flg,
							stf.field_label,
							CASE WHEN dt.locked_column IS NULL THEN false ELSE true END as locked
						FROM sys_table_field stf
						LEFT JOIN sys_datagrid_field ndf ON (
							ndf.table_id = stf.table_id
							AND ndf.table_field_id = stf.table_field_id
						)";
			if(empty($shownColId) && !empty($datagrid_template_id)){
				$system_fld .= " LEFT JOIN sys_datagrid_template_field ndtf 
								 ON (ndtf.datagrid_id = ndf.datagrid_id 
									AND ndtf.table_field_id = stf.table_field_id)";
			}
			$system_fld .="LEFT JOIN sys_datagrid_template dt 
							ON (
								dt.locked_column=stf.field_label AND 
								dt.datagrid_id=$datagrid_id AND 
								dt.datagrid_template_id=$datagrid_template_id
							)";
			$system_fld .= " WHERE
						ndf.datagrid_id = $datagrid_id 
						AND	ndf.system_field_flg = 1
						";
			if(!empty($shownColId)){
				$system_fld .=" AND ndf.table_field_id NOT IN ($shownColId)";
			}
			else{
				$system_fld .=" AND ndtf.datagrid_template_field_id is null";
			}

			$sql ="{$user_fld} UNION ALL {$system_fld}  ORDER BY display_order ASC";
		}
		// echo $sql;die;
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryAll();
		return $result;
	}
	public function deleteTemplatePanelFields($datagrid_template_id, $datagrid_id) {
		$sql = "DELETE 
				FROM sys_datagrid_template_field ndtf 
				WHERE (ndtf.datagrid_template_id=:datagrid_template_id AND ndtf.datagrid_id =:datagrid_id) ";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(':datagrid_template_id', $datagrid_template_id, PDO::PARAM_INT);
		$cmd->bindParam(':datagrid_id', $datagrid_id,PDO::PARAM_INT);
		$result = $cmd->queryRow();
		return $result;
	}
	public function insertTemplatePanelFields($fields, $datagrid_template_id, $datagrid_id,$display_order,$user_id) {
		$table_field_id = $fields['table_field_id'];
		$hidden = $fields['hidden'];
		//$display_order = $fields['display_order'];
		$sql = "INSERT INTO sys_datagrid_template_field 
					(table_field_id, display_order, user_id, datagrid_id, datagrid_template_id, hidden)
				VALUES 
					($table_field_id, $display_order, $user_id, $datagrid_id, $datagrid_template_id,$hidden)";
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryRow();
		return $result;
	}
	public function deleteTemplate($datagrid_template_id) {
		$sql = "DELETE FROM sys_datagrid_template  WHERE datagrid_template_id=:datagrid_template_id";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(':datagrid_template_id', $datagrid_template_id);
		$result = $cmd->queryRow();
		return $result;
	}
	public function getPanelName($panelId) {
		$sql="SELECT datagrid_name FROM sys_datagrid WHERE datagrid_id=$panelId";
		$cmd = Yii::app()->db->createCommand($sql);
		$result = $cmd->queryRow();
		return $result;
	}
	public function checkRights($datagrid_template_id) {
		$sql = "SELECT ft.created_by FROM sys_datagrid_template ft WHERE datagrid_template_id=:datagrid_template_id";
		$cmd = Yii::app()->db->createCommand($sql);
		$cmd->bindParam(':datagrid_template_id', $datagrid_template_id);
		$result = $cmd->queryRow();
		return $result;
	}
}
