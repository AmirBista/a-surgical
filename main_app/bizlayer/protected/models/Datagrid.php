<?php

/**
 * This is the model class for table "sys_datagrid".
 *
 * The followings are the available columns in table 'sys_datagrid':
 * @property integer $datagrid_id
 * @property integer $company_id
 * @property integer $department_id
 * @property string $datagrid_name
 * @property string $display_name
 * @property string $tables_from
 * @property integer $page_size
 * @property integer $show_row_number
 * @property integer $display_column_count
 * @property integer $show_action_column
 * @property string $edit_role
 * @property string $view_role
 * @property string $delete_role
 * @property integer $show_image_column
 * @property integer $show_checkbox_column
 * @property integer $view_datagrid
 * @property integer $temp_id
 * @property integer $has_detail_link
 * @property string $locked_column
 * @property string $updated_datetime
 */
class Datagrid extends CActiveRecord
{
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
			array('datagrid_id, datagrid_name, page_size', 'required'),
			array('datagrid_id, company_id, department_id, page_size, show_row_number, display_column_count, show_action_column, show_image_column, show_checkbox_column, view_datagrid, temp_id, has_detail_link', 'numerical', 'integerOnly'=>true),
			array('datagrid_name, display_name', 'length', 'max'=>100),
			array('locked_column', 'length', 'max'=>200),
			array('updated_datetime', 'length', 'max'=>6),
			array('tables_from, edit_role, view_role, delete_role', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('datagrid_id, company_id, department_id, datagrid_name, display_name, tables_from, page_size, show_row_number, display_column_count, show_action_column, edit_role, view_role, delete_role, show_image_column, show_checkbox_column, view_datagrid, temp_id, has_detail_link, locked_column, updated_datetime', 'safe', 'on'=>'search'),
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
			'datagrid_id' => 'Datagrid',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'datagrid_name' => 'Datagrid Name',
			'display_name' => 'Display Name',
			'tables_from' => 'Tables From',
			'page_size' => 'Page Size',
			'show_row_number' => 'Show Row Number',
			'display_column_count' => 'Display Column Count',
			'show_action_column' => 'Show Action Column',
			'edit_role' => 'Edit Role',
			'view_role' => 'View Role',
			'delete_role' => 'Delete Role',
			'show_image_column' => 'Show Image Column',
			'show_checkbox_column' => 'Show Checkbox Column',
			'view_datagrid' => 'View Datagrid',
			'temp_id' => 'Temp',
			'has_detail_link' => 'Has Detail Link',
			'locked_column' => 'Locked Column',
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

		$criteria->compare('datagrid_id',$this->datagrid_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('datagrid_name',$this->datagrid_name,true);
		$criteria->compare('display_name',$this->display_name,true);
		$criteria->compare('tables_from',$this->tables_from,true);
		$criteria->compare('page_size',$this->page_size);
		$criteria->compare('show_row_number',$this->show_row_number);
		$criteria->compare('display_column_count',$this->display_column_count);
		$criteria->compare('show_action_column',$this->show_action_column);
		$criteria->compare('edit_role',$this->edit_role,true);
		$criteria->compare('view_role',$this->view_role,true);
		$criteria->compare('delete_role',$this->delete_role,true);
		$criteria->compare('show_image_column',$this->show_image_column);
		$criteria->compare('show_checkbox_column',$this->show_checkbox_column);
		$criteria->compare('view_datagrid',$this->view_datagrid);
		$criteria->compare('temp_id',$this->temp_id);
		$criteria->compare('has_detail_link',$this->has_detail_link);
		$criteria->compare('locked_column',$this->locked_column,true);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Datagrid the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getGridsButton() {
        $sql = "SELECT display_name  AS datagrid_name, tables_from, datagrid_id
                FROM sys_datagrid
                    WHERE view_datagrid=1 ORDER BY display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryAll();
        return $result;
    }

    public function getCategoryProductListData($category_en) {
        $sql = " SELECT category_product_id AS catp_id, category_en, category_name_en, category_name_ja, category_name_th FROM yig_category_product ";
        if (!empty($category_en)) {
            $sql .= " WHERE category_en='{$category_en}' ";
        }
        $sql.=' ORDER BY catp_id ';
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryAll();
        return $result;
    }

    public function getDatagrid() {
        $sql = "SELECT sd.datagrid_id, sd.datagrid_name FROM sys_datagrid AS sd";
        $cmd = Yii::app()->db->createCommand($sql);
        $result = $cmd->queryAll();
        return $result;
    }

    public function saveTempDataGrid($template_id, $datagrid_id) {
        $sql = "UPDATE sys_datagrid SET temp_id=:template_id WHERE datagrid_id=:datagrid_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':template_id', $template_id, PDO::PARAM_INT);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $result = $cmd->queryRow();
        return $result;
    }

    public function setLockColumn($datagrid_id,$column_name) {
    	$sql = "UPDATE sys_datagrid SET locked_column=:column_name WHERE datagrid_id=:datagrid_id";
    	$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);
        $cmd->bindParam(':column_name', $column_name, PDO::PARAM_STR);
        $result = $cmd->execute();
    }
}


