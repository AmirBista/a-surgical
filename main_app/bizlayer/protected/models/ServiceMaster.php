<?php

/**
 * This is the model class for table "hbase.h_service_master".
 *
 * The followings are the available columns in table 'hbase.h_service_master':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_10_01
 * @property string $column_10_02
 * @property string $column_10_03
 * @property string $column_10_04
 * @property string $column_10_05
 * @property string $column_10_06
 * @property string $column_10_07
 * @property string $column_10_08
 * @property string $column_10_09
 * @property string $column_10_10
 * @property string $column_10_11
 * @property string $column_10_12
 * @property string $column_10_13
 * @property string $column_10_14
 * @property string $column_10_15
 * @property string $column_10_16
 * @property string $column_10_17
 * @property string $column_10_18
 * @property string $column_10_19
 * @property string $column_10_20
 * @property string $column_10_21
 * @property string $column_10_22
 * @property string $column_10_23
 * @property string $column_10_24
 * @property string $column_10_25
 * @property string $column_10_26
 * @property string $column_10_27
 * @property string $column_10_28
 * @property string $column_10_29
 * @property string $column_10_30
 * @property string $column_10_31
 * @property string $column_10_32
 * @property string $column_10_33
 * @property string $column_10_34
 * @property string $column_10_35
 * @property string $column_10_36
 * @property string $column_10_37
 * @property string $column_10_38
 * @property string $column_10_39
 * @property string $column_10_40
 * @property string $column_10_41
 * @property string $column_10_42
 * @property string $column_10_43
 * @property string $column_10_44
 * @property string $column_10_45
 * @property string $column_10_46
 * @property string $column_10_47
 * @property string $column_10_48
 * @property string $column_10_49
 * @property string $column_10_50
 * @property string $column_10_51
 * @property string $column_10_52
 * @property string $column_10_53
 * @property string $column_10_54
 * @property string $column_10_55
 * @property string $column_10_56
 * @property string $column_10_57
 * @property string $column_10_58
 * @property string $column_10_59
 * @property string $column_10_60
 * @property string $column_10_61
 * @property string $column_10_62
 * @property string $column_10_63
 * @property string $column_10_64
 * @property string $column_10_65
 * @property string $column_10_66
 * @property string $column_10_67
 * @property string $column_10_68
 * @property string $column_10_69
 * @property string $column_10_70
 * @property string $column_10_71
 * @property string $column_10_72
 * @property string $column_10_73
 * @property string $column_10_74
 * @property string $column_10_75
 * @property string $column_10_76
 * @property string $column_10_77
 * @property string $column_10_78
 * @property string $column_10_79
 * @property string $column_10_80
 * @property string $column_10_81
 * @property string $column_10_82
 * @property string $column_10_83
 * @property string $column_10_84
 * @property string $column_10_85
 * @property string $column_10_86
 * @property string $column_10_87
 * @property string $column_10_88
 * @property string $column_10_89
 * @property string $column_10_90
 * @property string $column_10_91
 * @property string $column_10_92
 * @property string $column_10_93
 * @property string $column_10_94
 * @property string $column_10_95
 * @property string $column_10_96
 * @property string $column_10_97
 * @property string $column_10_98
 * @property string $column_10_99
 * @property string $column_10_100
 * @property string $ext_id
 */
class ServiceMaster extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 10;
		$this->_table_id = 10;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_service_master';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft', 'numerical', 'integerOnly'=>true),
			array('column_10_02, column_10_03, column_10_04, column_10_05, column_10_06, column_10_07, column_10_08, column_10_09, column_10_11, column_10_12, column_10_13, column_10_14, column_10_15, column_10_17, column_10_18, column_10_19, column_10_20, column_10_21, column_10_22, column_10_23, column_10_24, column_10_25, column_10_26, column_10_27, column_10_28, column_10_29, column_10_31, column_10_32, column_10_33, column_10_34, column_10_35, column_10_37, column_10_38, column_10_39, column_10_40, column_10_41, column_10_42, column_10_43, column_10_44, column_10_45, column_10_46, column_10_47, column_10_48, column_10_49, column_10_51, column_10_52, column_10_53, column_10_54, column_10_55, column_10_57, column_10_58, column_10_59, column_10_60, column_10_61, column_10_62, column_10_63, column_10_64, column_10_65, column_10_66, column_10_67, column_10_68, column_10_69, column_10_71, column_10_72, column_10_73, column_10_74, column_10_75, column_10_77, column_10_78, column_10_79, column_10_80, column_10_81, column_10_82, column_10_83, column_10_84, column_10_85, column_10_86, column_10_87, column_10_88, column_10_89, column_10_90, column_10_91, column_10_92, column_10_93, column_10_94, column_10_95, column_10_96, column_10_97, column_10_98, column_10_99, column_10_100, ext_id', 'length', 'max'=>100),
			array('column_10_10, column_10_30, column_10_50, column_10_70', 'length', 'max'=>1000),
			array('column_10_16, column_10_36, column_10_56, column_10_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_10_01, column_10_02, column_10_03, column_10_04, column_10_05, column_10_06, column_10_07, column_10_08, column_10_09, column_10_10, column_10_11, column_10_12, column_10_13, column_10_14, column_10_15, column_10_16, column_10_17, column_10_18, column_10_19, column_10_20, column_10_21, column_10_22, column_10_23, column_10_24, column_10_25, column_10_26, column_10_27, column_10_28, column_10_29, column_10_30, column_10_31, column_10_32, column_10_33, column_10_34, column_10_35, column_10_36, column_10_37, column_10_38, column_10_39, column_10_40, column_10_41, column_10_42, column_10_43, column_10_44, column_10_45, column_10_46, column_10_47, column_10_48, column_10_49, column_10_50, column_10_51, column_10_52, column_10_53, column_10_54, column_10_55, column_10_56, column_10_57, column_10_58, column_10_59, column_10_60, column_10_61, column_10_62, column_10_63, column_10_64, column_10_65, column_10_66, column_10_67, column_10_68, column_10_69, column_10_70, column_10_71, column_10_72, column_10_73, column_10_74, column_10_75, column_10_76, column_10_77, column_10_78, column_10_79, column_10_80, column_10_81, column_10_82, column_10_83, column_10_84, column_10_85, column_10_86, column_10_87, column_10_88, column_10_89, column_10_90, column_10_91, column_10_92, column_10_93, column_10_94, column_10_95, column_10_96, column_10_97, column_10_98, column_10_99, column_10_100, ext_id', 'safe', 'on'=>'search'),
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
			'id' => 'ID',
			'company_id' => 'Company',
			'store_id' => 'Store',
			'created_by' => 'Created By',
			'created_datetime' => 'Created Datetime',
			'updated_by' => 'Updated By',
			'updated_datetime' => 'Updated Datetime',
			'delete_flg' => 'Delete Flg',
			'is_draft' => 'Is Draft',
			'column_10_01' => 'Column 10 01',
			'column_10_02' => 'Column 10 02',
			'column_10_03' => 'Column 10 03',
			'column_10_04' => 'Column 10 04',
			'column_10_05' => 'Column 10 05',
			'column_10_06' => 'Column 10 06',
			'column_10_07' => 'Column 10 07',
			'column_10_08' => 'Column 10 08',
			'column_10_09' => 'Column 10 09',
			'column_10_10' => 'Column 10 10',
			'column_10_11' => 'Column 10 11',
			'column_10_12' => 'Column 10 12',
			'column_10_13' => 'Column 10 13',
			'column_10_14' => 'Column 10 14',
			'column_10_15' => 'Column 10 15',
			'column_10_16' => 'Column 10 16',
			'column_10_17' => 'Column 10 17',
			'column_10_18' => 'Column 10 18',
			'column_10_19' => 'Column 10 19',
			'column_10_20' => 'Column 10 20',
			'column_10_21' => 'Column 10 21',
			'column_10_22' => 'Column 10 22',
			'column_10_23' => 'Column 10 23',
			'column_10_24' => 'Column 10 24',
			'column_10_25' => 'Column 10 25',
			'column_10_26' => 'Column 10 26',
			'column_10_27' => 'Column 10 27',
			'column_10_28' => 'Column 10 28',
			'column_10_29' => 'Column 10 29',
			'column_10_30' => 'Column 10 30',
			'column_10_31' => 'Column 10 31',
			'column_10_32' => 'Column 10 32',
			'column_10_33' => 'Column 10 33',
			'column_10_34' => 'Column 10 34',
			'column_10_35' => 'Column 10 35',
			'column_10_36' => 'Column 10 36',
			'column_10_37' => 'Column 10 37',
			'column_10_38' => 'Column 10 38',
			'column_10_39' => 'Column 10 39',
			'column_10_40' => 'Column 10 40',
			'column_10_41' => 'Column 10 41',
			'column_10_42' => 'Column 10 42',
			'column_10_43' => 'Column 10 43',
			'column_10_44' => 'Column 10 44',
			'column_10_45' => 'Column 10 45',
			'column_10_46' => 'Column 10 46',
			'column_10_47' => 'Column 10 47',
			'column_10_48' => 'Column 10 48',
			'column_10_49' => 'Column 10 49',
			'column_10_50' => 'Column 10 50',
			'column_10_51' => 'Column 10 51',
			'column_10_52' => 'Column 10 52',
			'column_10_53' => 'Column 10 53',
			'column_10_54' => 'Column 10 54',
			'column_10_55' => 'Column 10 55',
			'column_10_56' => 'Column 10 56',
			'column_10_57' => 'Column 10 57',
			'column_10_58' => 'Column 10 58',
			'column_10_59' => 'Column 10 59',
			'column_10_60' => 'Column 10 60',
			'column_10_61' => 'Column 10 61',
			'column_10_62' => 'Column 10 62',
			'column_10_63' => 'Column 10 63',
			'column_10_64' => 'Column 10 64',
			'column_10_65' => 'Column 10 65',
			'column_10_66' => 'Column 10 66',
			'column_10_67' => 'Column 10 67',
			'column_10_68' => 'Column 10 68',
			'column_10_69' => 'Column 10 69',
			'column_10_70' => 'Column 10 70',
			'column_10_71' => 'Column 10 71',
			'column_10_72' => 'Column 10 72',
			'column_10_73' => 'Column 10 73',
			'column_10_74' => 'Column 10 74',
			'column_10_75' => 'Column 10 75',
			'column_10_76' => 'Column 10 76',
			'column_10_77' => 'Column 10 77',
			'column_10_78' => 'Column 10 78',
			'column_10_79' => 'Column 10 79',
			'column_10_80' => 'Column 10 80',
			'column_10_81' => 'Column 10 81',
			'column_10_82' => 'Column 10 82',
			'column_10_83' => 'Column 10 83',
			'column_10_84' => 'Column 10 84',
			'column_10_85' => 'Column 10 85',
			'column_10_86' => 'Column 10 86',
			'column_10_87' => 'Column 10 87',
			'column_10_88' => 'Column 10 88',
			'column_10_89' => 'Column 10 89',
			'column_10_90' => 'Column 10 90',
			'column_10_91' => 'Column 10 91',
			'column_10_92' => 'Column 10 92',
			'column_10_93' => 'Column 10 93',
			'column_10_94' => 'Column 10 94',
			'column_10_95' => 'Column 10 95',
			'column_10_96' => 'Column 10 96',
			'column_10_97' => 'Column 10 97',
			'column_10_98' => 'Column 10 98',
			'column_10_99' => 'Column 10 99',
			'column_10_100' => 'Column 10 100',
			'ext_id' => 'Ext',
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

		$criteria->compare('id',$this->id);
		$criteria->compare('company_id',$this->company_id);
		$criteria->compare('store_id',$this->store_id);
		$criteria->compare('created_by',$this->created_by);
		$criteria->compare('created_datetime',$this->created_datetime,true);
		$criteria->compare('updated_by',$this->updated_by);
		$criteria->compare('updated_datetime',$this->updated_datetime,true);
		$criteria->compare('delete_flg',$this->delete_flg);
		$criteria->compare('is_draft',$this->is_draft);
		$criteria->compare('column_10_01',$this->column_10_01);
		$criteria->compare('column_10_02',$this->column_10_02,true);
		$criteria->compare('column_10_03',$this->column_10_03,true);
		$criteria->compare('column_10_04',$this->column_10_04,true);
		$criteria->compare('column_10_05',$this->column_10_05,true);
		$criteria->compare('column_10_06',$this->column_10_06,true);
		$criteria->compare('column_10_07',$this->column_10_07,true);
		$criteria->compare('column_10_08',$this->column_10_08,true);
		$criteria->compare('column_10_09',$this->column_10_09,true);
		$criteria->compare('column_10_10',$this->column_10_10,true);
		$criteria->compare('column_10_11',$this->column_10_11,true);
		$criteria->compare('column_10_12',$this->column_10_12,true);
		$criteria->compare('column_10_13',$this->column_10_13,true);
		$criteria->compare('column_10_14',$this->column_10_14,true);
		$criteria->compare('column_10_15',$this->column_10_15,true);
		$criteria->compare('column_10_16',$this->column_10_16,true);
		$criteria->compare('column_10_17',$this->column_10_17,true);
		$criteria->compare('column_10_18',$this->column_10_18,true);
		$criteria->compare('column_10_19',$this->column_10_19,true);
		$criteria->compare('column_10_20',$this->column_10_20,true);
		$criteria->compare('column_10_21',$this->column_10_21,true);
		$criteria->compare('column_10_22',$this->column_10_22,true);
		$criteria->compare('column_10_23',$this->column_10_23,true);
		$criteria->compare('column_10_24',$this->column_10_24,true);
		$criteria->compare('column_10_25',$this->column_10_25,true);
		$criteria->compare('column_10_26',$this->column_10_26,true);
		$criteria->compare('column_10_27',$this->column_10_27,true);
		$criteria->compare('column_10_28',$this->column_10_28,true);
		$criteria->compare('column_10_29',$this->column_10_29,true);
		$criteria->compare('column_10_30',$this->column_10_30,true);
		$criteria->compare('column_10_31',$this->column_10_31,true);
		$criteria->compare('column_10_32',$this->column_10_32,true);
		$criteria->compare('column_10_33',$this->column_10_33,true);
		$criteria->compare('column_10_34',$this->column_10_34,true);
		$criteria->compare('column_10_35',$this->column_10_35,true);
		$criteria->compare('column_10_36',$this->column_10_36,true);
		$criteria->compare('column_10_37',$this->column_10_37,true);
		$criteria->compare('column_10_38',$this->column_10_38,true);
		$criteria->compare('column_10_39',$this->column_10_39,true);
		$criteria->compare('column_10_40',$this->column_10_40,true);
		$criteria->compare('column_10_41',$this->column_10_41,true);
		$criteria->compare('column_10_42',$this->column_10_42,true);
		$criteria->compare('column_10_43',$this->column_10_43,true);
		$criteria->compare('column_10_44',$this->column_10_44,true);
		$criteria->compare('column_10_45',$this->column_10_45,true);
		$criteria->compare('column_10_46',$this->column_10_46,true);
		$criteria->compare('column_10_47',$this->column_10_47,true);
		$criteria->compare('column_10_48',$this->column_10_48,true);
		$criteria->compare('column_10_49',$this->column_10_49,true);
		$criteria->compare('column_10_50',$this->column_10_50,true);
		$criteria->compare('column_10_51',$this->column_10_51,true);
		$criteria->compare('column_10_52',$this->column_10_52,true);
		$criteria->compare('column_10_53',$this->column_10_53,true);
		$criteria->compare('column_10_54',$this->column_10_54,true);
		$criteria->compare('column_10_55',$this->column_10_55,true);
		$criteria->compare('column_10_56',$this->column_10_56,true);
		$criteria->compare('column_10_57',$this->column_10_57,true);
		$criteria->compare('column_10_58',$this->column_10_58,true);
		$criteria->compare('column_10_59',$this->column_10_59,true);
		$criteria->compare('column_10_60',$this->column_10_60,true);
		$criteria->compare('column_10_61',$this->column_10_61,true);
		$criteria->compare('column_10_62',$this->column_10_62,true);
		$criteria->compare('column_10_63',$this->column_10_63,true);
		$criteria->compare('column_10_64',$this->column_10_64,true);
		$criteria->compare('column_10_65',$this->column_10_65,true);
		$criteria->compare('column_10_66',$this->column_10_66,true);
		$criteria->compare('column_10_67',$this->column_10_67,true);
		$criteria->compare('column_10_68',$this->column_10_68,true);
		$criteria->compare('column_10_69',$this->column_10_69,true);
		$criteria->compare('column_10_70',$this->column_10_70,true);
		$criteria->compare('column_10_71',$this->column_10_71,true);
		$criteria->compare('column_10_72',$this->column_10_72,true);
		$criteria->compare('column_10_73',$this->column_10_73,true);
		$criteria->compare('column_10_74',$this->column_10_74,true);
		$criteria->compare('column_10_75',$this->column_10_75,true);
		$criteria->compare('column_10_76',$this->column_10_76,true);
		$criteria->compare('column_10_77',$this->column_10_77,true);
		$criteria->compare('column_10_78',$this->column_10_78,true);
		$criteria->compare('column_10_79',$this->column_10_79,true);
		$criteria->compare('column_10_80',$this->column_10_80,true);
		$criteria->compare('column_10_81',$this->column_10_81,true);
		$criteria->compare('column_10_82',$this->column_10_82,true);
		$criteria->compare('column_10_83',$this->column_10_83,true);
		$criteria->compare('column_10_84',$this->column_10_84,true);
		$criteria->compare('column_10_85',$this->column_10_85,true);
		$criteria->compare('column_10_86',$this->column_10_86,true);
		$criteria->compare('column_10_87',$this->column_10_87,true);
		$criteria->compare('column_10_88',$this->column_10_88,true);
		$criteria->compare('column_10_89',$this->column_10_89,true);
		$criteria->compare('column_10_90',$this->column_10_90,true);
		$criteria->compare('column_10_91',$this->column_10_91,true);
		$criteria->compare('column_10_92',$this->column_10_92,true);
		$criteria->compare('column_10_93',$this->column_10_93,true);
		$criteria->compare('column_10_94',$this->column_10_94,true);
		$criteria->compare('column_10_95',$this->column_10_95,true);
		$criteria->compare('column_10_96',$this->column_10_96,true);
		$criteria->compare('column_10_97',$this->column_10_97,true);
		$criteria->compare('column_10_98',$this->column_10_98,true);
		$criteria->compare('column_10_99',$this->column_10_99,true);
		$criteria->compare('column_10_100',$this->column_10_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return ServiceMaster the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/*
    @params $id primary key
    */
    public function getServiceMasterRecord($id){
    	if (empty($id))
    		return;
    	$sql = "SELECT *
				FROM {$this->tableName()} 
				WHERE id =:id AND  (delete_flg = 0 OR delete_flg = NULL)";
		$user_info       = Yii::app()->user->getUserInfo();
		$params = array(
			'alais' => '',
			'user_info'	=> $user_info
			);
		$sql_role_wise = $this->getFilterByRoleCondition($params);
		if(!empty($sql_role_wise))
		{
			if(!empty($sql)){
                $sql.= " AND ";
            }
            $sql.= $sql_role_wise;
		}
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':id', $id, PDO::PARAM_INT);
        $record = $cmd->queryRow();
        return $record;
    }

    public function setInitialValue(&$dynamic_fields,$user_info,$is_clone=0){
    	$date = date('Y-m-d');
    	$parent_screen_id = 29;

    	if($is_clone == 0){
    		$this->setDefaultValues($dynamic_fields,$user_info,$parent_screen_id);
    	}
    	if($is_clone == 0){
    		$dynamic_fields['dynamic_fields[column_10_01]'] = $this->getNextSequenceValue();
    	}
	}

	public function getEntryData($entryDataParams){
		$id 				= $entryDataParams['id']; 
		$mode 				= $entryDataParams['mode'];
		$user_info 			= $entryDataParams['user_info'];
		$parent_screen_id	= !empty($entryDataParams['parent_screen_id']) ? $entryDataParams['parent_screen_id'] : 0;
		$is_clone			= !empty($entryDataParams['is_clone']) ? $entryDataParams['is_clone'] : 0;
		$normArr			= !empty($entryDataParams['normArr']) ? $entryDataParams['normArr'] : array();
		$popup				= !empty($entryDataParams['popup']) ? $entryDataParams['popup'] : FALSE;

    	
    	$user_role = $user_info['userRole'];
    	$user_id = $user_info['user_id'];
        $dynamic_fields_ = array();
        $dynamic_fields = array();
        $hlpr = new ScreenHelper();
        $created_by="";
        $action_roles = array();
        // $screen_roles = array();
        $orderDetailRecords = array();
        $order_master_code = $a2Code = "";
        $entryMasterRecord = $this->getServiceMasterRecord($id);
        
        if ($mode == 'new')
    	{
    		$entryMasterRecord = new ServiceMaster();
	        $user_info = Yii::app()->user->getUserInfo();
	        
	        $this->setInitialValue($dynamic_fields,$user_info,null);
			$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				if(!empty($dynamic_fields['dynamic_fields['.$field['column_name'].']'])){
					$entryMasterRecord->$field['column_name'] = $dynamic_fields['dynamic_fields['.$field['column_name'].']'];
				}
			}

			$entryMasterRecord->created_by = $user_id;
			$entryMasterRecord->created_datetime = date('Y-m-d H:i:s');

			$entryMasterRecord->column_10_12 = $dynamic_fields['dynamic_fields[column_10_12]'] = NULL;
			$entryMasterRecord->column_10_13 = $dynamic_fields['dynamic_fields[column_10_13]'] = NULL;
			if($entryMasterRecord->save()){
				$id = $entryMasterRecord->getPrimaryKey();
			}
			
			$entry_code = $dynamic_fields['dynamic_fields[column_10_01]'];
		}
    	else{
	        if (empty($entryMasterRecord)){
	        	$response=array(
	                'success'=>FALSE,
	                'msg'=> Yii::t('user','Access Not Allowed')
	            );
	        	echo CJSON::encode($response);
	        	exit;
	        }

			$id = $entryMasterRecord['id'];
			$entry_code = $entryMasterRecord['column_10_01'];

	  		$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				$dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $entryMasterRecord[$field['column_name']];
			}
			if($is_clone == 1){
				$mode = 'new';
				$this->setInitialValue($dynamic_fields,$user_info,$is_clone);
			}
			/*Order Remarks Fld*/
			// $dynamic_fields['dynamic_fields[column_10_57]'] = $entryMasterRecord['column_10_57'];
			$dynamic_fields['dynamic_fields[column_10_12]'] = $entryMasterRecord['column_10_12'];
			$dynamic_fields['dynamic_fields[column_10_13]'] = $entryMasterRecord['column_10_13'];
			$created_by=$entryMasterRecord['created_by'];
    	}
    	
    	if($normArr) {
            $dynamic_fields = $dynamic_fields_;
        }
        
        $action_roles = $this->getRecordActionRoles($mode,$popup,$entryMasterRecord);
        
        // SET DELETE BUTTON AS DISABLED.
        $disableDeleteBtn = FALSE;
        if(!empty($entryMasterRecord)){
	        
        }
	  	$orderMaster = array(
  			'action_roles'	=>$action_roles, 
  			'id'			=>$id, 
  			'entry_code'	=>$entry_code,
  			'dynamic_fields'=>$dynamic_fields,
  		);

	  	return $orderMaster;
    }

    public function getRecordActionRoles($mode,$popup=FALSE,$entryMasterRecord=null){
    	$role_arr = array(
    		'new'       =>  true,
    		'save'		=>	true,
    		'delete'	=>	false,
    		'bill'		=>	false,
    		'cancel'	=>	true,
    		'print'     =>  false,
    		'newOrderEntry' =>false
    	);
    	switch ($mode) {
    		case 'new':
    			
				break;
    		case 'edit':
    			if($popup === TRUE){
    				$role_arr['new'] = FALSE;	
    				// $role_arr['newOrderEntry'] = TRUE;	
    			}
                $receiveStatusArr = t('entryPanel','receiveStatus');
    			$role_arr['newOrderEntry'] = TRUE;	
    			$user_info = Yii::app()->user->getUserInfo();
                if(RoleUtil::isAdmin($user_info['userRole']))
                {
    				$role_arr['new'] = FALSE;	
                }
    			if($entryMasterRecord['column_10_27'] == $receiveStatusArr['received'])
                {
    				$role_arr['save'] = FALSE;	
                }
				break;
    		default:
    			break;
    	}

    	return $role_arr;
    }

    public function getWhereCondition($params){
		$company_code      = empty($params['company_code']) ? null:$params['company_code'];
		$entry_id          = empty($params['entry_id']) ? null:$params['entry_id'];
		$customer_code 	   = empty($params['customer_code']) ? null:$params['customer_code'];
		$alais             = $params['alais'];
    	$sql_where = parent::getWhereCondition($params);
    	
    	if (!empty($company_code)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_10_17 = '{$company_code}'";
        }
    	if (!empty($customer_code)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_10_13 = '{$customer_code}'";
        }
       
        return $sql_where;
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
    	$datagrid_id 			= empty($params['datagrid_id']) ? null:$params['datagrid_id'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$select_fields 			= null;
        
    	$alais = "t10";
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
			$sql .= "{$select_fields}, t10.id, t10.ext_id,t10.column_10_03,t10.column_10_17";
			
			$sql .= $this->getSyncStatusColumn('t10', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t10";

    	
		if(!empty($synctime)) {
        	$sql .= " WHERE (t10.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " WHERE  (t10.delete_flg = 0  AND  t10.is_draft = 0";
        }
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
    		//echo $sql; die;
			$default_sort_order = "t10.column_10_01 DESC";
			// $default_sort_order = "t10.column_5_01 desc";
			$sort_order = $this->getSortOrder('t10', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0)
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";

    	}
        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){
			$results = $cmd->queryScalar();
    	}else{

        	$results = $cmd->queryAll();
    	}
		return $results;
    }

    public function getComment($entry_code) {
    	$sql = "SELECT t1.column_10_98 as comment
    			FROM {$this->tableName()} t1 
    			WHERE (t1.column_10_01 =:entry_code AND (t1.delete_flg = 0 OR t1.delete_flg IS NULL))";
    	$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':entry_code', $entry_code, PDO::PARAM_INT);
    	$result = $cmd->queryRow();
	    return $result;
    }
}
