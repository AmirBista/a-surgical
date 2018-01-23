<?php

/**
 * This is the model class for table "tbasei.ti_product_set".
 *
 * The followings are the available columns in table 'tbasei.ti_product_set':
 * @property integer $product_set_id
 * @property integer $product_master_id
 * @property integer $product_id
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property string $quantity
 * @property string $smile_product_master_cd
 * @property string $smile_product_cd
 */
class ProductSet extends YIGBaseModel
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'tbasei.ti_product_set';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('product_master_id, product_id, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('smile_product_master_cd, smile_product_cd', 'length', 'max'=>50),
			array('created_datetime, updated_datetime, quantity', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('product_set_id, product_master_id, product_id, delete_flg, created_by, created_datetime, updated_by, updated_datetime, quantity, smile_product_master_cd, smile_product_cd', 'safe', 'on'=>'search'),
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
			'product_set_id' => 'Product Set',
			'product_master_id' => 'Product Master',
			'product_id' => 'Product',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'quantity' => 'Quantity',
			'smile_product_master_cd' => 'Smile Product Master Cd',
			'smile_product_cd' => 'Smile Product Cd',
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

		$criteria->compare('product_set_id',$this->product_set_id);
		$criteria->compare('product_master_id',$this->product_master_id);
		$criteria->compare('product_id',$this->product_id);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('quantity',$this->quantity,true);
		$criteria->compare('smile_product_master_cd',$this->smile_product_master_cd,true);
		$criteria->compare('smile_product_cd',$this->smile_product_cd,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return ProductSet the static model class
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
    	$alais = "t21";

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
			$sql .= "{$select_fields}, t21.product_set_id as id, t21.ext_id";
    		$sql .= $this->getSyncStatusColumn('t21', $synctime, $user_id);
    	}

    	$sql .= " FROM {$this->tableName()} AS t21 ";
    			/*	LEFT JOIN ".t('tblSchema','ti_').".ti_product AS t5 ON (t21.product_id = t5.id)
    				LEFT JOIN ".t('tblSchema','ti_').".ti_client AS t8 ON (t21.client_id = t8.id)";*/

		if(!empty($synctime)) {
        	$sql .= " WHERE (t21.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " WHERE  (t21.delete_flg = 0 ";
        }

	/*	if (!empty($sql_where))
		{
			$sql .= " AND {$sql_where}";
		}
*/
		if (!empty($bulk_sql_where))
		{
			$sql .= " AND ({$bulk_sql_where})";
		}
		$sql .=")";

    	if ($for_count != true){
			$default_sort_order = " t21.product_set_id DESC ";
			// $default_sort_order = " t21.updated_datetime DESC ";
			$sort_order = $this->getSortOrder('t21', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0)
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";

    	}
        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){
			$results = $cmd->queryScalar();
    	}
    	else{
    		$results = $cmd->queryAll();
    	} 
		return $results;
    }
    public function getProductMappedData($product_id) {
		$sql = "SELECT 
				 ps.product_set_id,
				 ps.product_master_id,
				 ps.product_id,
				 ps.quantity,
				 tp.column_5_01,
				 tp.column_5_02
			FROM {$this->tableName()} AS ps
			JOIN tbasei.ti_product tp ON (
				tp.id = ps.product_id
			)
			WHERE ps.product_master_id=:product_id";
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $record = $cmd->queryAll();
        return $record;
	}
	 /*
    @params $$user_role = 1 or 50
    @params $mode=view or edit
    return true if the user has access to open window in add or edit mode
    */
    public function hasSaveRole($user_role){
        if ($user_role == 50)
            return TRUE;
        else
            return FALSE;
    }
    public function updateRecord($product_set_id,$product_master_id,$product_id,$qty,$user_id) {
		$updated_datetime = new CDbExpression('NOW()');
		$sql = "UPDATE {$this->tableName()} 
				 SET quantity=:qty, updated_datetime=$updated_datetime, updated_by = :user_id
				 WHERE (product_set_id=:product_set_id
						 AND product_master_id=:product_master_id
						 AND product_id = :product_id
						)";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':qty', $qty, PDO::PARAM_INT);
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $cmd->bindParam(':product_set_id', $product_set_id, PDO::PARAM_INT);
        $cmd->bindParam(':product_master_id', $product_master_id, PDO::PARAM_INT);
        $cmd->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $result = $cmd->queryRow();
        return $result;
	}
	public function deleteRecord($product_set_id,$product_master_id,$product_id) {
		$sql = "DELETE FROM {$this->tableName()} 
                 WHERE (product_set_id=:product_set_id
						 AND product_master_id=:product_master_id
						 AND product_id = :product_id
						)";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':product_set_id', $product_set_id, PDO::PARAM_INT);
        $cmd->bindParam(':product_master_id', $product_master_id, PDO::PARAM_INT);
        $cmd->bindParam(':product_id', $product_id, PDO::PARAM_INT);
        $result = $cmd->execute();
        return $result;
	}

}
