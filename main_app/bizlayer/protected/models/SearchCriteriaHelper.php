<?php

/**
 * This is the model class for table "sys_search".
 *
 * The followings are the available columns in table 'sys_search':
 * @property integer $search_id
 * @property integer $datagrid_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $system_flg
 * @property integer $is_public
 * @property string $search_name
 * @property integer $user_id
 * @property string $search_criteria
 */
class SearchCriteriaHelper extends CActiveRecord
{
    /**
     * @return string the associated database table name
     */
    public function tableName()
    {
        return 'sys_search';
    }

    /**
     * @return array validation rules for model attributes.
     */
    public function rules()
    {
        // NOTE: you should only define rules for those attributes that
        // will receive user inputs.
        return array(
            array('datagrid_id, system_flg, search_name, user_id', 'required'),
            array('datagrid_id, created_by, system_flg, is_public, user_id', 'numerical', 'integerOnly'=>true),
            array('created_datetime', 'length', 'max'=>6),
            array('search_criteria', 'safe'),
            // The following rule is used by search().
            // @todo Please remove those attributes that should not be searched.
            array('search_id, datagrid_id, created_by, created_datetime, system_flg, is_public, search_name, user_id, search_criteria', 'safe', 'on'=>'search'),
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
            'search_id' => 'Search',
            'datagrid_id' => 'Datagrid',
            'created_by' => 'Created By',
            'created_datetime' => 'Created Datetime',
            'system_flg' => 'System Flg',
            'is_public' => 'Is Public',
            'search_name' => 'Search Name',
            'user_id' => 'User',
            'search_criteria' => 'Search Criteria',
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

        $criteria->compare('search_id',$this->search_id);
        $criteria->compare('datagrid_id',$this->datagrid_id);
        $criteria->compare('created_by',$this->created_by);
        $criteria->compare('created_datetime',$this->created_datetime,true);
        $criteria->compare('system_flg',$this->system_flg);
        $criteria->compare('is_public',$this->is_public);
        $criteria->compare('search_name',$this->search_name,true);
        $criteria->compare('user_id',$this->user_id);
        $criteria->compare('search_criteria',$this->search_criteria,true);

        return new CActiveDataProvider($this, array(
            'criteria'=>$criteria,
        ));
    }

    /**
     * Returns the static model of the specified AR class.
     * Please note that you should have this exact method in all your CActiveRecord descendants!
     * @param string $className active record class name.
     * @return Search the static model class
     */
    public static function model($className=__CLASS__)
    {
        return parent::model($className);
    }
    #11 function call from respected controller
    public function getSearchResult($panel_no,$user_id) {
        $sql = " SELECT ss.search_id,ss.search_name,ss.system_flg, ss.search_criteria
                    from sys_search AS ss
                 WHERE ss.datagrid_id = :panel_no 
                 AND ((ss.user_id = :user_id OR ss.is_public = 1) AND ss.system_flg=0)
                 ORDER BY ss.search_name DESC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':panel_no', $panel_no, PDO::PARAM_INT);        
        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }
    public function getFieldTempSearchResult($datagrid_id,$user_id,$searchId) {
        $sql = " SELECT ss.search_criteria
                    FROM sys_search AS ss
                 WHERE ss.datagrid_id = :datagrid_id 
                 AND (ss.search_id =:searchId)
                 AND (ss.system_flg = 1) ";
        // if (empty($searchId)){
        //     $sql .= " AND (ss.user_id = :user_id AND ss.is_public = 0)";
        // }
         $sql .= " ORDER BY ss.search_name DESC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':datagrid_id', $datagrid_id, PDO::PARAM_INT);        
        $cmd->bindParam(':searchId', $searchId, PDO::PARAM_INT);        
        // if (empty($searchId)){
        //     $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        // }
        $result = $cmd->queryRow();
        return $result;
    }
    public function getTemplateSearchResult($panel_no,$user_id) {
        $sql = " SELECT ss.search_id,ss.search_name,ss.system_flg, ss.search_criteria
                    from sys_search AS ss
                 WHERE ss.datagrid_id = :panel_no 
                 AND (ss.system_flg = 1 AND ss.is_public = 1)
                 ORDER BY ss.search_name DESC";
        $cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':panel_no', $panel_no, PDO::PARAM_INT);        
        // $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);        
        $result = $cmd->queryAll();
        return $result;
    }

    public function deleteSearch($search_id, $user_id) {
        $sql = "DELETE FROM sys_search 
                WHERE search_id=:search_id AND created_by = :user_id AND system_flg = 0";
        $command = Yii::app()->db->createCommand($sql);
        $command->bindParam(':search_id', $search_id, PDO::PARAM_INT);
        $command->bindParam(':user_id', $user_id, PDO::PARAM_INT);
        $result = $command->execute();
    }

    public function convertDbSearchCriteriaToGrid($search_criteria){

            $criteria_arr = CJSON::decode($search_criteria, true);
            $filter = array();
            foreach ($criteria_arr as $column => $value) {
                $filter[] = array('property'=>$column,'value'=>$value);
            }
            return CJSON::encode($filter);
    }

}