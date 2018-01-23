<?php

/**
 * This is the model class for table "app_file".
 *
 * The followings are the available columns in table 'app_file':
 * @property integer $file_id
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $ref_table_id
 * @property integer $ref_record_id
 * @property string $file_name
 * @property string $file_path
 * @property string $extension
 * @property string $file_tag
 * @property string $file_status
 * @property string $display_order
 * @property string $remarks
 * @property string $description
 * @property integer $is_draft
 * @property string $original_file_name
 */
class File extends YIGBaseModel
{
	/**
	 * @return string the associated database table name
	 */
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_name = 'App_file';
		$this->_datagrid_id = 14;
	}
	
	public function tableName()
	{
		return 'app_file';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, department_id, delete_flg, created_by, updated_by, ref_table_id, ref_record_id, is_draft', 'numerical', 'integerOnly'=>true),
			array('file_name, file_path, extension, file_tag, file_status, display_order', 'length', 'max'=>100),
			array('remarks, original_file_name', 'length', 'max'=>200),
			array('description', 'length', 'max'=>1000),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('file_id, company_id, department_id, delete_flg, created_by, created_datetime, updated_by, updated_datetime, ref_table_id, ref_record_id, file_name, file_path, extension, file_tag, file_status, display_order, remarks, description, is_draft, original_file_name', 'safe', 'on'=>'search'),
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
			'file_id' => 'File',
			'company_id' => 'Company',
			'department_id' => 'Department',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'ref_table_id' => 'Ref Table',
			'ref_record_id' => 'Ref Record',
			'file_name' => 'File Name',
			'file_path' => 'File Path',
			'extension' => 'Extension',
			'file_tag' => 'File Tag',
			'file_status' => 'File Status',
			'display_order' => 'Display Order',
			'remarks' => 'Remarks',
			'description' => 'Description',
			'is_draft' => 'Is Draft',
			'original_file_name' => 'Original File Name',
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

		$criteria->compare('file_id',$this->file_id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('department_id',$this->department_id);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('ref_table_id',$this->ref_table_id);
		$criteria->compare('ref_record_id',$this->ref_record_id);
		$criteria->compare('file_name',$this->file_name,true);
		$criteria->compare('file_path',$this->file_path,true);
		$criteria->compare('extension',$this->extension,true);
		$criteria->compare('file_tag',$this->file_tag,true);
		$criteria->compare('file_status',$this->file_status,true);
		$criteria->compare('display_order',$this->display_order,true);
		$criteria->compare('remarks',$this->remarks,true);
		$criteria->compare('description',$this->description,true);
		$criteria->compare('is_draft',$this->is_draft);
		$criteria->compare('original_file_name',$this->original_file_name,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return File the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getListData($params) {
    	$for_count				= $params['for_count'];
    	$user_id 				= Yii::app()->user->user_id;
    	$sql_where 				= $params['sql_where'];
    	$user_role				= $params['user_role'];
    	$fields 				= $params['fields'];
    	$pageSize 				= $params['pageSize'];
    	$startFrom 				= $params['startFrom'];
    	$sort 					= $params['sort'];
    	$dgUtil 				= $params['dgUtil'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
    	$ref_record_id 	= $params['ref_record_id'];
    	if ((empty($fields) || count($fields) < 1) && $for_count != true) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}

    	if ($for_count != true)
    		$select_fields = $this->getSelectFields($fields);

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {		
			$sql .= "{$select_fields},file_status";
			$sql .= $this->getSyncStatusColumn('t8', $synctime, $user_id);
    	}

    	$sql .= " FROM app_file AS t8";

		/*if(!empty($synctime)) {
        	$sql .= " WHERE (t3.updated_datetime > '{$synctime}'";
        }else {*/
			$sql .= " WHERE  (t8.delete_flg = 0 ";
       // }

 		$sql .= " AND t8.ref_record_id = '{$ref_record_id}'";
		if (!empty($sql_where))
		{
			$sql .= " AND {$sql_where}";
		}
		if (!empty($bulk_sql_where))
		{
			$sql .= " AND ({$bulk_sql_where})";
		}
		$sql .=")";

    	if ($for_count != true){
			$default_sort_order = "t8.display_order ASC";
			$sort_order = $this->getSortOrder('t8', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0)
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";

    	}

        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){
			$results = $cmd->queryScalar();
    	}else
    	{
        	$results = $cmd->queryAll();
    	}

		return $results;
    }

   //  public function getMainImageId($ref_record_id){
   //  	$sql = "select file_id from app_file 
			// where delete_flg = 0 and ref_record_id = :ref_record_id and display_order = (
			// select min(display_order) 
			// from app_file where ref_record_id = :ref_record_id and delete_flg = 0)
			// limit 1"

   //  	$cmd = Yii::app()->db->createCommand($sql);
   //      $file_id =  $cmd->queryScalar();
   //      return $file_id;
   //  }
    
    public function getDisplayOrder($ref_record_id){
    	$sql =  "select max(display_order) from app_file where delete_flg = 0";
    	if(!empty($ref_record_id))
    		$sql .=  "and ref_record_id = $ref_record_id";
    	
    	$cmd = Yii::app()->db->createCommand($sql);
        $max =  $cmd->queryScalar();
        if(empty($max)){
        	return $max = 1;
        }
        else
		return $max+1;
    }

    public function deleteOrderFile($user_id, $ref_record_id, $file_id){
    	$sql =  "DELETE  FROM  app_file where created_by = $user_id  AND ref_record_id=:ref_record_id AND is_draft=1";
		if(!empty($ref_record_id))
    		$sql .=  "and ref_record_id = $ref_record_id";

    	if(!empty($orderFilesId))
    		$sql .= " and file_id = $file_id";


    	$cmd = Yii::app()->db->createCommand($sql);
    	$cmd->bindParam(':ref_record_id', $ref_record_id, PDO::PARAM_INT);
    	/*$cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    	$cmd->bindParam(':order_master_id', $order_master_id, PDO::PARAM_INT);
    	$cmd->bindParam(':sku_component_id', $sku_component_id, PDO::PARAM_INT);*/
        $results =  $cmd->queryAll();
        return $results;
    }
    public function getdeleteOrderFiles($user_id, $ref_record_id, $fileId){
    	$sql =  "SELECT name,ref_record_id,id,extension   FROM  app_file where created_by = $user_id ";
    	if(!empty($ref_record_id))
    		$sql .= " and ref_record_id = $ref_record_id";
    	
    	
    	if(!empty($fileId))
    		$sql .= " and file_id = $fileId";

    	$cmd = Yii::app()->db->createCommand($sql);
    	/*$cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
    	$cmd->bindParam(':order_master_id', $order_master_id, PDO::PARAM_INT);
    	$cmd->bindParam(':sku_component_id', $sku_component_id, PDO::PARAM_INT);*/
        $results =  $cmd->queryAll();
        return $results;
    }

    public function getLastOrderFiles($ref_record_id){
    	$sql =  "SELECT *  FROM  app_file where delete_flg = 0 ";
    	if(!empty($ref_record_id))
    		$sql .= " and ref_record_id = {$ref_record_id}";

    	$sql .= "ORDER BY file_id DESC LIMIT 1";
    	$cmd = Yii::app()->db->createCommand($sql);
        $results =  $cmd->queryAll();
        return $results;
    }

    public function getOrderFileRecords($ref_record_id){
    	$sql =  "SELECT *  FROM  app_file 
    			 WHERE ref_record_id = {$ref_record_id}";
    	$cmd = Yii::app()->db->createCommand($sql);
        $results =  $cmd->queryAll();
        return $results;	
    }
    public function getMinDisplayOrder($ref_record_id){
    	$sql =  "select min(display_order) from app_file where delete_flg = 0";
    	if(!empty($ref_record_id))
    		$sql .=  "and ref_record_id = $ref_record_id";
    	
    	$cmd = Yii::app()->db->createCommand($sql);
        $min =  $cmd->queryScalar();
       	return $min;
    }
    public function getFileIdByDisplayOrder($currentDsiplayOrder,$auction_product_id){
		$sql =  "select file_id,file_path from app_file where delete_flg = 0 
			and display_order='$currentDsiplayOrder' and ref_record_id=$auction_product_id";
		$cmd = Yii::app()->db->createCommand($sql);
   		$result=$cmd->queryRow();
   		return  $result;
    }

}
