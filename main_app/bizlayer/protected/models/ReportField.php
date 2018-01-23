<?php

/**
 * This is the model class for table "sys_csv_report_field".
 *
 * The followings are the available columns in table 'sys_csv_report_field':
 * @property integer $csv_report_field_id
 * @property integer $company_id
 * @property integer $department_id
 * @property integer $csv_report_id
 * @property string $csv_field_name
 * @property string $table_field_ids
 * @property string $default_value
 * @property string $option_value
 * @property integer $display_order
 * @property integer $format_id
 * @property integer $max_length
 * @property integer $delete_flg
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 */
class ReportField extends YIGBaseCsvModel
{
    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'sys_csv_report_field';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('company_id, department_id, csv_report_id, display_order, format_id, max_length, delete_flg, created_by, updated_by', 'numerical', 'integerOnly'=>true),
            array('default_value', 'length', 'max'=>20),
            array('csv_field_name, table_field_ids, option_value, created_datetime, updated_datetime', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('csv_report_field_id, company_id, department_id, csv_report_id, csv_field_name, table_field_ids, default_value, option_value, display_order, format_id, max_length, delete_flg, created_by, created_datetime, updated_by, updated_datetime', 'safe', 'on'=>'search'),
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
            'csv_report_field_id' => 'Csv Report Field',
            'company_id' => 'Company',
            'department_id' => 'Department',
            'csv_report_id' => 'Csv Report',
            'csv_field_name' => 'Csv Field Name',
            'table_field_ids' => 'Table Field Ids',
            'default_value' => 'Default Value',
            'option_value' => 'Option Value',
            'display_order' => 'Display Order',
            'format_id' => 'Format',
            'max_length' => 'Max Length',
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

        $criteria->compare('csv_report_field_id',$this->csv_report_field_id);
        $criteria->compare('company_id',$this->company_id);
        $criteria->compare('department_id',$this->department_id);
        $criteria->compare('csv_report_id',$this->csv_report_id);
        $criteria->compare('csv_field_name',$this->csv_field_name,true);
        $criteria->compare('table_field_ids',$this->table_field_ids,true);
        $criteria->compare('default_value',$this->default_value,true);
        $criteria->compare('option_value',$this->option_value,true);
        $criteria->compare('display_order',$this->display_order);
        $criteria->compare('format_id',$this->format_id);
        $criteria->compare('max_length',$this->max_length);
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
     * @return ReportField the static model class
     */
    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }
    public function getCsvMappedFields($csvReportId) {
        $sql = "SELECT
                    rf.csv_report_field_id,
                    tf.table_field_id,
                    tf.table_id,
                    T . TABLE_NAME,
                    tf. COLUMN_NAME,
                    tf.field_label,
                    ft.xtype,
                    ft.type_name
                FROM
                    {$this->tableName()} rf
                INNER JOIN ".t('tblSchema','sys_').".sys_table_field tf ON tf.table_field_id = ANY (rf.table_field_ids)
                INNER JOIN ".t('tblSchema','sys_').".sys_table T ON tf.table_id = T .table_id
                LEFT JOIN ".t('tblSchema','sys_').".sys_field_type ft ON tf.field_type_id = ft.field_type_id
                WHERE
                    (
                        rf.delete_flg = 0
                        OR rf.delete_flg IS NULL
                    )
                AND rf.csv_report_id = :csvReportId
                ORDER BY
                    rf.display_order,
                    idx (
                        rf.table_field_ids,
                        tf.table_field_id
        ) ";
        $cmd = Yii::app()->db->createCommand($sql);   
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);         
        $results = $cmd->queryAll();
        return $results;
    }

    public function getFieldMappedLabel($field_id) {
        $sql = "SELECT tf.field_label
                FROM ".t('tblSchema','sys_').".sys_table_fields AS tf
                WHERE tf.table_field_id = :field_id";
        $cmd = Yii::app()->db->createCommand($sql);  
        $cmd->bindParam(':field_id', $field_id, PDO::PARAM_INT);     
        $result = $cmd->queryRow();
        return $result;
    }

    public function getCsvFields($csvReportId) {
        $sql="select csv_report_field_id, csv_report_id, csv_field_name, table_field_ids, 
                default_value, option_value, display_order, format_id, max_length
                from {$this->tableName()} rf
                where (rf.delete_flg = 0 or rf.delete_flg is null) and rf.csv_report_id = :csvReportId
                ORDER BY
                rf.display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        return $cmd->queryAll();
    }

    /* public function getCsvMappedDetails() { 
      $sql = "SELECT md.csv_field_name , md.csv_report_field_id, tf.field_label AS mapped_fields, md.table_id, md.field_id, md.default_value
      FROM {$this->tableName()} AS md
      LEFT JOIN sys_table_fields tf
      ON tf.table_field_id = md.field_id";
      $cmd = Yii::app()->db->createCommand($sql);
      return $cmd->queryAll();
      } */
    public function getWinstonFields($csvReportId) {
            $sql="SELECT
                    table_id,
                    TABLE_NAME,
                    table_display_order,
                    table_field_id,
                    COLUMN_NAME,
                    field_label,
                    display_order,
                    xtype,
                    type_name,
                    SUM (is_mapped) AS is_mapped
                FROM
                    (
                        SELECT
                            tf.table_id,
                            T . TABLE_NAME,
                            idx (
                                r.mapped_table_ids,
                                T .table_id
                            ) AS table_display_order,
                            tf.table_field_id,
                            tf. COLUMN_NAME,
                            tf.field_label,
                            tf.display_order,
                            ft.xtype,
                            ft.type_name,
                            CASE
                        WHEN rf.csv_report_field_id IS NULL THEN
                            0
                        ELSE
                            1
                        END AS is_mapped
                        FROM
                            ".t('tblSchema','sys_').".sys_csv_report r
                        INNER JOIN ".t('tblSchema','sys_').".sys_table T ON T .table_id = ANY (r.mapped_table_ids)
                        INNER JOIN ".t('tblSchema','sys_').".sys_table_field tf ON tf.table_id = T .table_id
                        INNER JOIN ".t('tblSchema','sys_').".sys_field_type ft ON tf.field_type_id = ft.field_type_id
                        LEFT JOIN {$this->tableName()} rf ON tf.table_field_id = ANY (rf.table_field_ids) and rf.csv_report_id = :csvReportId
                        WHERE
                            r.csv_report_id = :csvReportId
                    ) AS tmp
                GROUP BY
                    table_id,
                    TABLE_NAME,
                    table_display_order,
                    table_field_id,
                    COLUMN_NAME,
                    field_label,
                    display_order,
                    xtype,
                    type_name
                ORDER BY
                    table_display_order,
                    display_order
                ";
            $cmd = Yii::app()->db->createCommand($sql);
            $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
            //$cmd->bindParam(':mappedTableId', $mappedTableId, PDO::PARAM_STR);
            // $cmd->bindParam(':mappedTableId', $mappedTableId, PDO::PARAM_STR);
            $result = $cmd->queryAll();
            return $result;
    }

    public function saveHeader() {
    }

    /*last inserted row primary key=$pkId*/
    public function SaveCsv($pkId, $csvFieldName) {
        foreach ($csvFieldName as $display_order => $value) 
        {
            $csv_field_name = $value['csv_field_name'];
            $display_order = $display_order + 1;
            $sql = "INSERT INTO {$this->tableName()} 
                    (csv_field_name, csv_report_id, display_order)
                    VALUES (:csv_field_name, :pkId, :display_order) ";
            $cmd = Yii::app()->db->createCommand($sql);
            $cmd->bindParam(':csv_field_name', $csv_field_name, PDO::PARAM_STR);
            $cmd->bindParam(':pkId', $pkId, PDO::PARAM_INT);
            $cmd->bindParam(':display_order', $display_order, PDO::PARAM_INT);
            $response = $cmd->execute();           
        }
        return $response;
    }
    
    public function updateCsvMappedDetail($csvReportId, $csvFieldName) {
        foreach ($csvFieldName as $display_order => $value) 
        {
            $csvReportFieldId = $value['csv_report_field_id'];
            $csvFieldName = $value['csv_field_name'];
            $displayOrder = $display_order+1;
            $csv_field_name = $value['csv_field_name'];
            if(!empty($csvReportFieldId)) {
                $sql = "UPDATE {$this->tableName()} 
                        SET csv_field_name=:csvFieldName, display_order =:displayOrder
                        WHERE csv_report_field_id =:csvReportFieldId ";
                $cmd = Yii::app()->db->createCommand($sql);
                $cmd->bindParam(':csvFieldName', $csvFieldName, PDO::PARAM_STR);
                $cmd->bindParam(':displayOrder', $displayOrder, PDO::PARAM_STR);
                $cmd->bindParam(':csvReportFieldId', $csvReportFieldId, PDO::PARAM_INT);
            }
            else {

                $sql = "INSERT INTO {$this->tableName()} (csv_field_name, csv_report_id, display_order)
                        VALUES ('$csvFieldName', $csvReportId, $displayOrder) ";
                $cmd = Yii::app()->db->createCommand($sql);
            }
            $response = $cmd->queryRow();      
        }
        return $response;

        /*$sql = "DELETE FROM {$this->tableName()}
                WHERE csv_report_id = :csvReportId
                AND field_id is NULL";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        $response = $cmd->queryRow();   
        foreach ($csvFieldName as $value) 
        {
            $csv_field_name = $value['csv_field_name'];
            $sql = "INSERT INTO {$this->tableName()} 
                    (csv_field_name, csv_report_id)
                    VALUES (:csv_field_name, :csvReportId) ";
            $cmd = Yii::app()->db->createCommand($sql);
            $cmd->bindParam(':csv_field_name', $csv_field_name, PDO::PARAM_STR);
            $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
            $response = $cmd->queryRow();           
        }*/
        return $response;
    }

    public function mappedTables($csvReportId) {
        $sql = "SELECT mm.mapped_table_ids 
                FROM ".t('tblSchema','sys_').".sys_csv_report as mm 
                WHERE csv_report_id = :csvReportId";
        $cmd = Yii::app()->db->createCommand($sql); 
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        $result = $cmd->queryRow();
        $mappedTableId = $result['mapped_table_ids'];
        // changes the string to array
        // $mappedTableIdArray = explode( ',', $mappedTableId);
        if(!empty($mappedTableId))
        {
            $sql = "SELECT st.table_id, st.table_name
                    FROM sys_table AS st
                    WHERE st.table_id =ANY(:mappedTableId)";
            /*for($i=0; $i<count($mappedTableIdArray); $i++)
                {
                    $sql .= " st.table_id = $mappedTableIdArray[$i]";
                    if($i<count($mappedTableIdArray)-1)
                    {
                        $sql .=" OR";
                    }     
                }
            $sql .=")";*/
        }
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':mappedTableId', $mappedTableId, PDO::PARAM_STR);
        return $cmd->queryAll();
    }

    public function getCsvFieldName($csvReportId) {

       /* $sql = "SELECT mm.mapped_table_ids 
                FROM yig_csv_mapped_master as mm 
                WHERE csv_report_id = :csvReportId";
        $cmd = Yii::app()->db->createCommand($sql); 
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        $result = $cmd->queryRow();
        $mappedTableId = $result['mapped_table_ids'];
        // changes the string to array
        $mappedTableIdArray = explode( ',', $mappedTableId);
        if(!empty($mappedTableId))
        {*/
        $sql = "SELECT
                cmd.csv_field_name,
                cmd.display_order,
                cmd.csv_report_field_id,
                -- cmd.is_single_mapped,
                mm.report_name,
                mm.bill_code,
                -- mm.name_jp,
                mm.report_name,
                mm.mapped_table_ids,
                mm.csv_report_id,
                mm.csv_type
                FROM
                ".t('tblSchema','sys_').".sys_csv_report AS mm
                LEFT JOIN {$this->tableName()} AS cmd ON (
                    mm.csv_report_id = cmd.csv_report_id
                )";
        $sql .= "WHERE mm.csv_report_id =:csvReportId";
        $sql .= " ORDER BY cmd.display_order";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csvReportId', $csvReportId, PDO::PARAM_INT);
        return $cmd->queryAll();
    }

    public function deleteCsvMapped($csvReportFieldId) {
        $sql = "DELETE FROM {$this->tableName()}
                WHERE csv_report_field_id =:csv_report_field_id";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':csv_report_field_id', $csvReportFieldId, PDO::PARAM_INT);
        return $cmd->queryRow();
    }

    public function getListData($params) {
        $user_id                = Yii::app()->user->user_id;
        $csv_report_id          = $params['csv_report_id'];
        if(!empty($params['order_master_ids']))
            $order_master_ids       = rtrim($params['order_master_ids'],",");
        $order_masters_ids      = array_key_exists('order_masters_ids', $params) ? $params['order_masters_ids'] : '';
        $order_detail_ids       = array_key_exists('order_detail_ids', $params) ? $params['order_detail_ids'] : '';
        // $auction_member_ids     = array_key_exists('auction_member_ids', $params) ? $params['auction_member_ids'] : '';
        $searchParams           = $params['searchParams'];
        $pageSize               = $params['pageSize'];
        $page                   = $params['page'];
        $table_alias            = $params['table_alias'];
        $date                   = $params['date'];
        $user_info              = Yii::app()->user->getUserInfo();
        $store_id               = $user_info['department_id'];
        $csv_master = ReportCsv::model()->findByPk($csv_report_id);
       // var_dump($csv_master); die;
        $include_from_clause = 1;
        $include_where_clause = 1;
        $include_orderby_clause = 0;


        $sql1 = " SELECT yigfx_get_csv_report_query ($csv_report_id, {$include_from_clause}, {$include_where_clause}, {$include_orderby_clause}) ";
        $cmd = Yii::app()->db->createCommand($sql1);
        $innerQuery = $cmd->queryScalar();
        // echo $innerQuery;die;
        // $innerQuery .= " WHERE ((t3.delete_flg = 0 OR t3.delete_flg IS NULL) 
        //                     AND (t4.delete_flg = 0 OR t4.delete_flg IS NULL))";
        if (!empty($order_masters_ids)){
            // if ($csv_report_id == 4 || $csv_report_id == 5){
                $innerQuery .= " AND $table_alias.id in ($order_masters_ids)";
            // }
            // else
            // {
                // $innerQuery .= " AND t1.id in ($order_masters_ids)";
            // }
        }
        $productType = Yii::t('csv','productType');
        if($csv_report_id=='12'){
            $innerQuery .= " AND t5.store_id = {$store_id} 
                            and t5.column_5_06 = '$productType'
                            and t5.column_5_23 is not null and CAST(t5.column_5_23 as INT) > 0 "; //stock qty >0
            $innerQuery .= " order by t5.column_5_09, t5.column_5_16 ";

        }
        else if($csv_report_id=='13'){
            $innerQuery .= " AND t1.store_id = {$store_id} 
                               and t1.column_1_09 LIKE '%$date%' and t2.column_2_07 = '$productType' ";
            $innerQuery .= " order by t2.column_2_27 ";
        }else if($csv_report_id=='14'){
            $store_id               = $params['store_id'];
            $transferStatusDone = Yii::t('csv','transferStatusDone');
            $innerQuery .= " AND (t8.store_id = {$store_id} or t8.column_8_14 = '$store_id' or t8.column_8_10 = '$store_id')
                                and t8.column_8_16 = '$transferStatusDone' 
                                   and t8.column_8_05 LIKE '%$date%'  ";
            $innerQuery .= " order by t8.column_8_14,t9.column_9_10 ";
        }
       
      /*  if (!empty($order_detail_ids)){
            if ($csv_report_id == 4 || $csv_report_id == 5){
                $innerQuery .= " AND t5.id in ($order_detail_ids)";
            }
            else
            {
                $innerQuery .= " AND t5.id in ($order_detail_ids)";
            }
        }*/

        $outerCondition = " WHERE 1 = 1";
        if($csv_report_id=='20' || $csv_report_id=='19' || $csv_report_id=='18'){
            $innerQuery .= " AND t1.id IN ({$order_master_ids}) ";
        }
        $select_clause = Yii::t('report','select_clause');
        $group_clause = Yii::t('report','group_clause');
        $select_clause = array_key_exists($csv_report_id, $select_clause) ? $select_clause[$csv_report_id] : '*';
        $group_clause = array_key_exists($csv_report_id, $group_clause) ? $group_clause[$csv_report_id] : ' ';
        $outerQuery = "SELECT {$select_clause} FROM ({$innerQuery}) AS x1 ";
        if (!empty($searchParams)) {
            $whereCondition = " AND (" . implode(" AND ", $searchParams) . ") ";
            $outerCondition .= " {$whereCondition} ";
        }  

        $outerQuery .= $outerCondition;
        $outerQuery.= $group_clause;
        $order_by = "";
        //$order_by = " ORDER BY id ASC";

        $sort_order = Yii::t('report','sort_order');
        $sort_order = array_key_exists($csv_report_id, $sort_order) ? $sort_order[$csv_report_id] :"";

        if (!empty($sort_order)){
            $order_by = $sort_order;
        }
        // echo $outerQuery; die;
        if(!empty($pageSize)) { 
            $selectQuery = $outerQuery. $order_by ." limit {$pageSize} offset " . $pageSize * ($page - 1);
            // echo $selectQuery; exit;
            $cmd = Yii::app()->db->createCommand($selectQuery);
        }else{
            $cmd = Yii::app()->db->createCommand($outerQuery.$order_by);
        }
        $recordData = $cmd->queryAll(); 
        $countQuery = " select count(*) from ( {$outerQuery}) as x2";
        $cmd = Yii::app()->db->createCommand($countQuery);
        $record_count = $cmd->queryScalar();
        // if($csv_report_id == 19)
        // {
        //     echo $outerQuery;
        //     die;
        // }
        $resultArr= array('data' =>$recordData,
                           'count' =>$record_count
                        );
        return $resultArr;
    }
}
