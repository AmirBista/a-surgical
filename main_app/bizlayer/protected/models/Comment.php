<?php

/**
 * This is the model class for table "public.yig_comment".
 *
 * The followings are the available columns in table 'public.yig_comment':
 * @property integer $comment_id
 * @property integer $ref_table
 * @property string $ref_record_id
 * @property string $title
 * @property string $comment
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $column_14_01
 * @property string $column_14_02
 * @property string $column_14_03
 * @property string $column_14_04
 * @property string $column_14_05
 * @property string $column_14_06
 * @property string $column_14_07
 * @property string $column_14_08
 * @property string $column_14_09
 * @property string $column_14_10
 */
class Comment extends CActiveRecord
{
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'public.yig_comment';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('comment', 'required'),
			array('ref_table, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
			array('ref_record_id', 'length', 'max'=>80),
			array('column_14_02, column_14_03, column_14_04, column_14_05, column_14_06, column_14_07, column_14_08, column_14_09, column_14_10', 'length', 'max'=>200),
			array('title, created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('comment_id, ref_table, ref_record_id, title, comment, delete_flg, created_by, created_datetime, updated_by, updated_datetime, column_14_01, column_14_02, column_14_03, column_14_04, column_14_05, column_14_06, column_14_07, column_14_08, column_14_09, column_14_10', 'safe', 'on'=>'search'),
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
			'comment_id' => 'Comment',
			'ref_table' => 'Ref Table',
			'ref_record_id' => 'Ref Record',
			'title' => 'Title',
			'comment' => 'Comment',
			'delete_flg' => 'Delete Flg',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'column_14_01' => 'Column 14 01',
			'column_14_02' => 'Column 14 02',
			'column_14_03' => 'Column 14 03',
			'column_14_04' => 'Column 14 04',
			'column_14_05' => 'Column 14 05',
			'column_14_06' => 'Column 14 06',
			'column_14_07' => 'Column 14 07',
			'column_14_08' => 'Column 14 08',
			'column_14_09' => 'Column 14 09',
			'column_14_10' => 'Column 14 10',
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

		$criteria->compare('comment_id',$this->comment_id);
		$criteria->compare('ref_table',$this->ref_table);
		$criteria->compare('ref_record_id',$this->ref_record_id,true);
		$criteria->compare('title',$this->title,true);
		$criteria->compare('comment',$this->comment,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('column_14_01',$this->column_14_01);
		$criteria->compare('column_14_02',$this->column_14_02,true);
		$criteria->compare('column_14_03',$this->column_14_03,true);
		$criteria->compare('column_14_04',$this->column_14_04,true);
		$criteria->compare('column_14_05',$this->column_14_05,true);
		$criteria->compare('column_14_06',$this->column_14_06,true);
		$criteria->compare('column_14_07',$this->column_14_07,true);
		$criteria->compare('column_14_08',$this->column_14_08,true);
		$criteria->compare('column_14_09',$this->column_14_09,true);
		$criteria->compare('column_14_10',$this->column_14_10,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Comment the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getMessageList($params){
        $user_id        = Yii::app()->user->user_id;
        $limit          = !empty($params['limit']) ? $params['limit'] : 50;
        $start_from     = !empty($params['start_from']) ? $params['start_from'] : 0;
        $ref_table      = !empty($params['ref_table']) ? $params['ref_table'] : null;
        $ref_record_id  = !empty($params['ref_record_id']) ? $params['ref_record_id'] : null;
        $app_name       = !empty($params['app_name']) ? $params['app_name'] : null;
        $all_records    = $params['all_records'];
        $openBracket    = Yii::t('app', 'openBracket');
        $closeBracket   = Yii::t('app', 'closeBracket');
        $sql = "SELECT
                C .comment_id,
                C . COMMENT,
                C .created_datetime :: TIMESTAMP (0) AS comment_date,
                C .updated_datetime :: TIMESTAMP (0) AS updated_date,
                (A.last_name ||' '||A.first_name) as firstLastName,
                '$openBracket'||A.username||'$closeBracket' as username,
                C .created_by,
                C .updated_by,
                C. column_14_02 as app_name,
                C. column_14_03 as opt,
                C. ref_table,
                C. ref_record_id
                FROM
                    {$this->tableName()} AS C
                JOIN ".t('tblSchema','app_').".app_user AS A ON A .user_id = C .created_by";
        $sql.=" WHERE 
                 C.delete_flg=0 AND 
                 C.ref_record_id=:ref_record_id AND 
                 C.ref_table=:ref_table AND 
                 C.column_14_02=:app_name";
        if($all_records) {
            $sql.=" ORDER BY C.created_datetime ASC";
        }else {
            $sql.=" ORDER BY C.created_datetime DESC";
        }
        $sql.=" LIMIT $limit OFFSET $start_from ";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':ref_record_id', $ref_record_id, PDO::PARAM_STR);
        $cmd->bindParam(':ref_table', $ref_table, PDO::PARAM_INT);
        $cmd->bindParam(':app_name', $app_name, PDO::PARAM_STR);
        if($all_records) {
            $result = $cmd->queryAll();
        }else {
            $result = $cmd->queryRow();
        }
        return $result;
    }
    public function getMessageCount($ref_table, $ref_record_id, $app_name){
        $sql = "SELECT COUNT(DISTINCT comment_id) as total 
                 FROM {$this->tableName()} 
                 WHERE 
                    delete_flg = 0 AND 
                    ref_record_id =:ref_record_id AND 
                    ref_table =:ref_table AND 
                    column_14_02 =:app_name ";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':ref_record_id', $ref_record_id, PDO::PARAM_STR);
        $cmd->bindParam(':ref_table', $ref_table, PDO::PARAM_INT);
        $cmd->bindParam(':app_name', $app_name, PDO::PARAM_STR);
        $result = $cmd->queryRow();
        return $result;
    }
    public function getUnionMessageCount($ref_table, $ref_record_id, $app_name, $ref_order_table_id,$ref_order_app_name){
        $sql = "SELECT COUNT(DISTINCT C.comment_id) as total 
                 FROM {$this->tableName()} as C
                 JOIN ".t('tblSchema','app_').".app_user AS A ON A .user_id = C .created_by 
                  WHERE 
                    (C.delete_flg = 0 OR C.delete_flg IS NULL)
                    AND (
                         (
                            C.ref_table = :ref_table AND 
                            C.ref_record_id = :ref_record_id AND 
                            C.column_14_02 = :app_name
                         ) OR
                         ( 
                            C.ref_table = :ref_order_table_id AND
                            C.ref_record_id IN 
                            ( 
                                SELECT CAST( t1.column_1_01 AS VARCHAR ) 
                                FROM hbase.h_order_master AS t1 
                                WHERE 
                                    t1.column_1_15 ='$ref_record_id' AND 
                                    (t1.delete_flg = 0 OR t1.delete_flg IS NULL)
                            ) AND 
                            C.column_14_02 = :ref_order_app_name
                         )
                        )";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':ref_record_id', $ref_record_id, PDO::PARAM_STR);
        $cmd->bindParam(':ref_table', $ref_table, PDO::PARAM_INT);
        $cmd->bindParam(':app_name', $app_name, PDO::PARAM_STR);
        $cmd->bindParam(':ref_order_table_id', $ref_order_table_id, PDO::PARAM_INT);
        $cmd->bindParam(':ref_order_app_name', $ref_order_app_name, PDO::PARAM_STR);
        $result = $cmd->queryRow();
        return $result;
    }
    public function getUnionMessageList($params) {
        $user_id            = Yii::app()->user->user_id;
        $limit              = $params['limit'];
        $start_from         = $params['page'];
        $ref_table          = $params['ref_table'];
        $ref_record_id      = $params['ref_record_id'];
        $app_name           = $params['app_name'];
        $ref_order_table_id = $params['ref_order_table_id'];
        $ref_order_app_name = $params['ref_order_app_name'];
        $all_records    = $params['all_records'];
        $openBracket=Yii::t('app', 'openBracket');
        $closeBracket=Yii::t('app', 'closeBracket');
        $sql = " SELECT
                 C .comment_id,
                 C . COMMENT,
                 C .created_datetime :: TIMESTAMP (0) AS comment_date,
                 C .updated_datetime :: TIMESTAMP (0) AS updated_date,
                 (A.last_name ||' '||A.first_name) as firstLastName,
                 '$openBracket'||A.username||'$closeBracket' as username,
                 C .created_by,
                 C .updated_by,
                 C. column_14_03 as opt
                 FROM {$this->tableName()} AS C
                 JOIN ".t('tblSchema','app_').".app_user AS A ON A .user_id = C .created_by 
                 WHERE 
                    (C.delete_flg = 0 OR C.delete_flg IS NULL)
                    AND (
                         (
                            C.ref_table = :ref_table AND 
                            C.ref_record_id = :ref_record_id AND 
                            C.column_14_02 = :app_name
                         ) OR
                         ( 
                            C.ref_table = :ref_order_table_id AND
                            C.ref_record_id IN 
                            ( 
                                SELECT CAST ( t1.column_1_01 AS VARCHAR)
                                FROM hbase.h_order_master AS t1 
                                WHERE 
                                    t1.column_1_15 ='$ref_record_id' AND 
                                    (t1.delete_flg = 0 OR t1.delete_flg IS NULL)
                            ) AND 
                            C.column_14_02 = :ref_order_app_name
                         )
                        )
                ORDER BY  C.created_datetime ASC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':ref_record_id', $ref_record_id, PDO::PARAM_STR);
        $cmd->bindParam(':ref_table', $ref_table, PDO::PARAM_INT);
        $cmd->bindParam(':app_name', $app_name, PDO::PARAM_STR);
        $cmd->bindParam(':ref_order_table_id', $ref_order_table_id, PDO::PARAM_INT);
        $cmd->bindParam(':ref_order_app_name', $ref_order_app_name, PDO::PARAM_STR);
        $result = $cmd->queryAll();
        return $result;
    }
}
