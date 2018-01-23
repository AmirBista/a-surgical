<?php

/**
 * This is the model class for table "hbase.h_repair".
 *
 * The followings are the available columns in table 'hbase.h_repair':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_12_01
 * @property string $column_12_02
 * @property string $column_12_03
 * @property string $column_12_04
 * @property string $column_12_05
 * @property string $column_12_06
 * @property string $column_12_07
 * @property string $column_12_08
 * @property string $column_12_09
 * @property string $column_12_10
 * @property string $column_12_11
 * @property string $column_12_12
 * @property string $column_12_13
 * @property string $column_12_14
 * @property string $column_12_15
 * @property string $column_12_16
 * @property string $column_12_17
 * @property string $column_12_18
 * @property string $column_12_19
 * @property string $column_12_20
 * @property string $column_12_21
 * @property string $column_12_22
 * @property string $column_12_23
 * @property string $column_12_24
 * @property string $column_12_25
 * @property string $column_12_26
 * @property string $column_12_27
 * @property string $column_12_28
 * @property string $column_12_29
 * @property string $column_12_30
 * @property string $column_12_31
 * @property string $column_12_32
 * @property string $column_12_33
 * @property string $column_12_34
 * @property string $column_12_35
 * @property string $column_12_36
 * @property string $column_12_37
 * @property string $column_12_38
 * @property string $column_12_39
 * @property string $column_12_40
 * @property string $column_12_41
 * @property string $column_12_42
 * @property string $column_12_43
 * @property string $column_12_44
 * @property string $column_12_45
 * @property string $column_12_46
 * @property string $column_12_47
 * @property string $column_12_48
 * @property string $column_12_49
 * @property string $column_12_50
 * @property string $column_12_51
 * @property string $column_12_52
 * @property string $column_12_53
 * @property string $column_12_54
 * @property string $column_12_55
 * @property string $column_12_56
 * @property string $column_12_57
 * @property string $column_12_58
 * @property string $column_12_59
 * @property string $column_12_60
 * @property string $column_12_61
 * @property string $column_12_62
 * @property string $column_12_63
 * @property string $column_12_64
 * @property string $column_12_65
 * @property string $column_12_66
 * @property string $column_12_67
 * @property string $column_12_68
 * @property string $column_12_69
 * @property string $column_12_70
 * @property string $column_12_71
 * @property string $column_12_72
 * @property string $column_12_73
 * @property string $column_12_74
 * @property string $column_12_75
 * @property string $column_12_76
 * @property string $column_12_77
 * @property string $column_12_78
 * @property string $column_12_79
 * @property string $column_12_80
 * @property string $column_12_81
 * @property string $column_12_82
 * @property string $column_12_83
 * @property string $column_12_84
 * @property string $column_12_85
 * @property string $column_12_86
 * @property string $column_12_87
 * @property string $column_12_88
 * @property string $column_12_89
 * @property string $column_12_90
 * @property string $column_12_91
 * @property string $column_12_92
 * @property string $column_12_93
 * @property string $column_12_94
 * @property string $column_12_95
 * @property string $column_12_96
 * @property string $column_12_97
 * @property string $column_12_98
 * @property string $column_12_99
 * @property string $column_12_100
 * @property string $ext_id
 */
class Repair extends YIGBaseModel
{
	public function __construct($arg = NULL) {
       parent::__construct();
		//$this->_datagrid_id = 1;
		$this->_table_id = 12;
    }

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_repair';
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
			array('column_12_02, column_12_03, column_12_04, column_12_05, column_12_06, column_12_07, column_12_08, column_12_09, column_12_11, column_12_12, column_12_13, column_12_14, column_12_15, column_12_17, column_12_18, column_12_19, column_12_20, column_12_21, column_12_22, column_12_23, column_12_24, column_12_25, column_12_26, column_12_27, column_12_28, column_12_29, column_12_31, column_12_32, column_12_33, column_12_34, column_12_35, column_12_37, column_12_38, column_12_39, column_12_40, column_12_41, column_12_42, column_12_43, column_12_44, column_12_45, column_12_46, column_12_47, column_12_48, column_12_49, column_12_51, column_12_52, column_12_53, column_12_54, column_12_55, column_12_57, column_12_58, column_12_59, column_12_60, column_12_61, column_12_62, column_12_63, column_12_64, column_12_65, column_12_66, column_12_67, column_12_68, column_12_69, column_12_71, column_12_72, column_12_73, column_12_74, column_12_75, column_12_77, column_12_78, column_12_79, column_12_80, column_12_81, column_12_82, column_12_83, column_12_84, column_12_85, column_12_86, column_12_87, column_12_88, column_12_89, column_12_90, column_12_91, column_12_92, column_12_93, column_12_94, column_12_95, column_12_96, column_12_97, column_12_98, column_12_99, column_12_100, ext_id', 'length', 'max'=>100),
			array('column_12_10, column_12_30, column_12_50, column_12_70', 'length', 'max'=>1000),
			array('column_12_16, column_12_36, column_12_56, column_12_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_12_01, column_12_02, column_12_03, column_12_04, column_12_05, column_12_06, column_12_07, column_12_08, column_12_09, column_12_10, column_12_11, column_12_12, column_12_13, column_12_14, column_12_15, column_12_16, column_12_17, column_12_18, column_12_19, column_12_20, column_12_21, column_12_22, column_12_23, column_12_24, column_12_25, column_12_26, column_12_27, column_12_28, column_12_29, column_12_30, column_12_31, column_12_32, column_12_33, column_12_34, column_12_35, column_12_36, column_12_37, column_12_38, column_12_39, column_12_40, column_12_41, column_12_42, column_12_43, column_12_44, column_12_45, column_12_46, column_12_47, column_12_48, column_12_49, column_12_50, column_12_51, column_12_52, column_12_53, column_12_54, column_12_55, column_12_56, column_12_57, column_12_58, column_12_59, column_12_60, column_12_61, column_12_62, column_12_63, column_12_64, column_12_65, column_12_66, column_12_67, column_12_68, column_12_69, column_12_70, column_12_71, column_12_72, column_12_73, column_12_74, column_12_75, column_12_76, column_12_77, column_12_78, column_12_79, column_12_80, column_12_81, column_12_82, column_12_83, column_12_84, column_12_85, column_12_86, column_12_87, column_12_88, column_12_89, column_12_90, column_12_91, column_12_92, column_12_93, column_12_94, column_12_95, column_12_96, column_12_97, column_12_98, column_12_99, column_12_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_12_01' => 'Column 12 01',
			'column_12_02' => 'Column 12 02',
			'column_12_03' => 'Column 12 03',
			'column_12_04' => 'Column 12 04',
			'column_12_05' => 'Column 12 05',
			'column_12_06' => 'Column 12 06',
			'column_12_07' => 'Column 12 07',
			'column_12_08' => 'Column 12 08',
			'column_12_09' => 'Column 12 09',
			'column_12_10' => 'Column 12 10',
			'column_12_11' => 'Column 12 11',
			'column_12_12' => 'Column 12 12',
			'column_12_13' => 'Column 12 13',
			'column_12_14' => 'Column 12 14',
			'column_12_15' => 'Column 12 15',
			'column_12_16' => 'Column 12 16',
			'column_12_17' => 'Column 12 17',
			'column_12_18' => 'Column 12 18',
			'column_12_19' => 'Column 12 19',
			'column_12_20' => 'Column 12 20',
			'column_12_21' => 'Column 12 21',
			'column_12_22' => 'Column 12 22',
			'column_12_23' => 'Column 12 23',
			'column_12_24' => 'Column 12 24',
			'column_12_25' => 'Column 12 25',
			'column_12_26' => 'Column 12 26',
			'column_12_27' => 'Column 12 27',
			'column_12_28' => 'Column 12 28',
			'column_12_29' => 'Column 12 29',
			'column_12_30' => 'Column 12 30',
			'column_12_31' => 'Column 12 31',
			'column_12_32' => 'Column 12 32',
			'column_12_33' => 'Column 12 33',
			'column_12_34' => 'Column 12 34',
			'column_12_35' => 'Column 12 35',
			'column_12_36' => 'Column 12 36',
			'column_12_37' => 'Column 12 37',
			'column_12_38' => 'Column 12 38',
			'column_12_39' => 'Column 12 39',
			'column_12_40' => 'Column 12 40',
			'column_12_41' => 'Column 12 41',
			'column_12_42' => 'Column 12 42',
			'column_12_43' => 'Column 12 43',
			'column_12_44' => 'Column 12 44',
			'column_12_45' => 'Column 12 45',
			'column_12_46' => 'Column 12 46',
			'column_12_47' => 'Column 12 47',
			'column_12_48' => 'Column 12 48',
			'column_12_49' => 'Column 12 49',
			'column_12_50' => 'Column 12 50',
			'column_12_51' => 'Column 12 51',
			'column_12_52' => 'Column 12 52',
			'column_12_53' => 'Column 12 53',
			'column_12_54' => 'Column 12 54',
			'column_12_55' => 'Column 12 55',
			'column_12_56' => 'Column 12 56',
			'column_12_57' => 'Column 12 57',
			'column_12_58' => 'Column 12 58',
			'column_12_59' => 'Column 12 59',
			'column_12_60' => 'Column 12 60',
			'column_12_61' => 'Column 12 61',
			'column_12_62' => 'Column 12 62',
			'column_12_63' => 'Column 12 63',
			'column_12_64' => 'Column 12 64',
			'column_12_65' => 'Column 12 65',
			'column_12_66' => 'Column 12 66',
			'column_12_67' => 'Column 12 67',
			'column_12_68' => 'Column 12 68',
			'column_12_69' => 'Column 12 69',
			'column_12_70' => 'Column 12 70',
			'column_12_71' => 'Column 12 71',
			'column_12_72' => 'Column 12 72',
			'column_12_73' => 'Column 12 73',
			'column_12_74' => 'Column 12 74',
			'column_12_75' => 'Column 12 75',
			'column_12_76' => 'Column 12 76',
			'column_12_77' => 'Column 12 77',
			'column_12_78' => 'Column 12 78',
			'column_12_79' => 'Column 12 79',
			'column_12_80' => 'Column 12 80',
			'column_12_81' => 'Column 12 81',
			'column_12_82' => 'Column 12 82',
			'column_12_83' => 'Column 12 83',
			'column_12_84' => 'Column 12 84',
			'column_12_85' => 'Column 12 85',
			'column_12_86' => 'Column 12 86',
			'column_12_87' => 'Column 12 87',
			'column_12_88' => 'Column 12 88',
			'column_12_89' => 'Column 12 89',
			'column_12_90' => 'Column 12 90',
			'column_12_91' => 'Column 12 91',
			'column_12_92' => 'Column 12 92',
			'column_12_93' => 'Column 12 93',
			'column_12_94' => 'Column 12 94',
			'column_12_95' => 'Column 12 95',
			'column_12_96' => 'Column 12 96',
			'column_12_97' => 'Column 12 97',
			'column_12_98' => 'Column 12 98',
			'column_12_99' => 'Column 12 99',
			'column_12_100' => 'Column 12 100',
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
		$criteria->compare('column_12_01',$this->column_12_01);
		$criteria->compare('column_12_02',$this->column_12_02,true);
		$criteria->compare('column_12_03',$this->column_12_03,true);
		$criteria->compare('column_12_04',$this->column_12_04,true);
		$criteria->compare('column_12_05',$this->column_12_05,true);
		$criteria->compare('column_12_06',$this->column_12_06,true);
		$criteria->compare('column_12_07',$this->column_12_07,true);
		$criteria->compare('column_12_08',$this->column_12_08,true);
		$criteria->compare('column_12_09',$this->column_12_09,true);
		$criteria->compare('column_12_10',$this->column_12_10,true);
		$criteria->compare('column_12_11',$this->column_12_11,true);
		$criteria->compare('column_12_12',$this->column_12_12,true);
		$criteria->compare('column_12_13',$this->column_12_13,true);
		$criteria->compare('column_12_14',$this->column_12_14,true);
		$criteria->compare('column_12_15',$this->column_12_15,true);
		$criteria->compare('column_12_16',$this->column_12_16,true);
		$criteria->compare('column_12_17',$this->column_12_17,true);
		$criteria->compare('column_12_18',$this->column_12_18,true);
		$criteria->compare('column_12_19',$this->column_12_19,true);
		$criteria->compare('column_12_20',$this->column_12_20,true);
		$criteria->compare('column_12_21',$this->column_12_21,true);
		$criteria->compare('column_12_22',$this->column_12_22,true);
		$criteria->compare('column_12_23',$this->column_12_23,true);
		$criteria->compare('column_12_24',$this->column_12_24,true);
		$criteria->compare('column_12_25',$this->column_12_25,true);
		$criteria->compare('column_12_26',$this->column_12_26,true);
		$criteria->compare('column_12_27',$this->column_12_27,true);
		$criteria->compare('column_12_28',$this->column_12_28,true);
		$criteria->compare('column_12_29',$this->column_12_29,true);
		$criteria->compare('column_12_30',$this->column_12_30,true);
		$criteria->compare('column_12_31',$this->column_12_31,true);
		$criteria->compare('column_12_32',$this->column_12_32,true);
		$criteria->compare('column_12_33',$this->column_12_33,true);
		$criteria->compare('column_12_34',$this->column_12_34,true);
		$criteria->compare('column_12_35',$this->column_12_35,true);
		$criteria->compare('column_12_36',$this->column_12_36,true);
		$criteria->compare('column_12_37',$this->column_12_37,true);
		$criteria->compare('column_12_38',$this->column_12_38,true);
		$criteria->compare('column_12_39',$this->column_12_39,true);
		$criteria->compare('column_12_40',$this->column_12_40,true);
		$criteria->compare('column_12_41',$this->column_12_41,true);
		$criteria->compare('column_12_42',$this->column_12_42,true);
		$criteria->compare('column_12_43',$this->column_12_43,true);
		$criteria->compare('column_12_44',$this->column_12_44,true);
		$criteria->compare('column_12_45',$this->column_12_45,true);
		$criteria->compare('column_12_46',$this->column_12_46,true);
		$criteria->compare('column_12_47',$this->column_12_47,true);
		$criteria->compare('column_12_48',$this->column_12_48,true);
		$criteria->compare('column_12_49',$this->column_12_49,true);
		$criteria->compare('column_12_50',$this->column_12_50,true);
		$criteria->compare('column_12_51',$this->column_12_51,true);
		$criteria->compare('column_12_52',$this->column_12_52,true);
		$criteria->compare('column_12_53',$this->column_12_53,true);
		$criteria->compare('column_12_54',$this->column_12_54,true);
		$criteria->compare('column_12_55',$this->column_12_55,true);
		$criteria->compare('column_12_56',$this->column_12_56,true);
		$criteria->compare('column_12_57',$this->column_12_57,true);
		$criteria->compare('column_12_58',$this->column_12_58,true);
		$criteria->compare('column_12_59',$this->column_12_59,true);
		$criteria->compare('column_12_60',$this->column_12_60,true);
		$criteria->compare('column_12_61',$this->column_12_61,true);
		$criteria->compare('column_12_62',$this->column_12_62,true);
		$criteria->compare('column_12_63',$this->column_12_63,true);
		$criteria->compare('column_12_64',$this->column_12_64,true);
		$criteria->compare('column_12_65',$this->column_12_65,true);
		$criteria->compare('column_12_66',$this->column_12_66,true);
		$criteria->compare('column_12_67',$this->column_12_67,true);
		$criteria->compare('column_12_68',$this->column_12_68,true);
		$criteria->compare('column_12_69',$this->column_12_69,true);
		$criteria->compare('column_12_70',$this->column_12_70,true);
		$criteria->compare('column_12_71',$this->column_12_71,true);
		$criteria->compare('column_12_72',$this->column_12_72,true);
		$criteria->compare('column_12_73',$this->column_12_73,true);
		$criteria->compare('column_12_74',$this->column_12_74,true);
		$criteria->compare('column_12_75',$this->column_12_75,true);
		$criteria->compare('column_12_76',$this->column_12_76,true);
		$criteria->compare('column_12_77',$this->column_12_77,true);
		$criteria->compare('column_12_78',$this->column_12_78,true);
		$criteria->compare('column_12_79',$this->column_12_79,true);
		$criteria->compare('column_12_80',$this->column_12_80,true);
		$criteria->compare('column_12_81',$this->column_12_81,true);
		$criteria->compare('column_12_82',$this->column_12_82,true);
		$criteria->compare('column_12_83',$this->column_12_83,true);
		$criteria->compare('column_12_84',$this->column_12_84,true);
		$criteria->compare('column_12_85',$this->column_12_85,true);
		$criteria->compare('column_12_86',$this->column_12_86,true);
		$criteria->compare('column_12_87',$this->column_12_87,true);
		$criteria->compare('column_12_88',$this->column_12_88,true);
		$criteria->compare('column_12_89',$this->column_12_89,true);
		$criteria->compare('column_12_90',$this->column_12_90,true);
		$criteria->compare('column_12_91',$this->column_12_91,true);
		$criteria->compare('column_12_92',$this->column_12_92,true);
		$criteria->compare('column_12_93',$this->column_12_93,true);
		$criteria->compare('column_12_94',$this->column_12_94,true);
		$criteria->compare('column_12_95',$this->column_12_95,true);
		$criteria->compare('column_12_96',$this->column_12_96,true);
		$criteria->compare('column_12_97',$this->column_12_97,true);
		$criteria->compare('column_12_98',$this->column_12_98,true);
		$criteria->compare('column_12_99',$this->column_12_99,true);
		$criteria->compare('column_12_100',$this->column_12_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return Repair the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function setInitialValue(&$dynamic_fields,$user_info,$is_clone=0,$parent_screen_id){
    	$date = date('Y-m-d');
    	// $parent_screen_id = 24;

    	if($is_clone == 0){
    		$this->setDefaultValues($dynamic_fields,$user_info,$parent_screen_id);
    	}
    	if($is_clone == 0){
    		/*Get Next Sequence Value for column_12_01 ::A1 */
    		$dynamic_fields['dynamic_fields[column_12_01]'] = $this->getNextSequenceValue();
    	}
	}
	/*
    @params $id primary key
    */
    public function getRepairMasterRecord($id){
    	if (empty($id) && empty($repair_code))
    		return;
    	$sql = "SELECT *
				FROM {$this->tableName()} 
				WHERE (delete_flg = 0 OR delete_flg = NULL)";
		if(!empty($id))
			$sql .= "  AND id = {$id}";
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
        //$cmd->bindParam(':id', $id, PDO::PARAM_INT);
        $record = $cmd->queryRow();
        return $record;
    }

    public function getEntryData($entryDataParams){
		$id 				= $entryDataParams['id']; 
		$mode 				= $entryDataParams['mode'];
		$user_info 			= $entryDataParams['user_info'];
		$parent_screen_id	= !empty($entryDataParams['parent_screen_id']) ? $entryDataParams['parent_screen_id'] : 0;
		$is_clone			= !empty($entryDataParams['is_clone']) ? $entryDataParams['is_clone'] : 0;
		$normArr			= !empty($entryDataParams['normArr']) ? $entryDataParams['normArr'] : array();
		$popup				= !empty($entryDataParams['popup']) ? $entryDataParams['popup'] : FALSE;
		$repair_code		= !empty($entryDataParams['company_code']) ? $entryDataParams['company_code'] : 0;
		$entryPanel			= !empty($entryDataParams['entryPanel']) ? $entryDataParams['entryPanel'] : 0;
		//$repair_code		= !empty($entryDataParams['repair_code']) ? $entryDataParams['repair_code'] : 0;

    	$user_role = $user_info['userRole'];
    	$user_id = $user_info['user_id'];
        $fixed_fields = $fixed_fields_ = $dynamic_fields_ = array();
        $dynamic_fields = array();
        $hlpr = new ScreenHelper();
        $created_by="";
        $action_roles = array();
        // $screen_roles = array();
        $orderDetailRecords = array();
        $order_master_code = $a2Code = "";
        $entryMasterRecord = $this->getRepairMasterRecord($id);
        
        if ($mode == 'new')
    	{
    		$entryMasterRecord = new Repair();
	        $user_info = Yii::app()->user->getUserInfo();

	        $this->setInitialValue($dynamic_fields,$user_info,null,$parent_screen_id);
	        $dynamic_fields["dynamic_fields[column_12_09]"]=null; // set update by to null because no need in new mode
			$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			foreach ($fields as $key => $field) {
				if(!empty($dynamic_fields['dynamic_fields['.$field['column_name'].']'])){
					$entryMasterRecord->$field['column_name'] = $dynamic_fields['dynamic_fields['.$field['column_name'].']'];
				}
			}
			$entryMasterRecord->is_draft = 1;
			$entryMasterRecord->created_by = $user_id;
			$entryMasterRecord->created_datetime = date('Y-m-d H:i:s');

			//$entryMasterRecord->column_12_07 = $dynamic_fields['dynamic_fields[column_12_07]'] = NULL;
			//$entryMasterRecord->column_12_08 = $dynamic_fields['dynamic_fields[column_12_08]'] = NULL;
			if($entryMasterRecord->save()){
				$id = $entryMasterRecord->getPrimaryKey();
			}
			
			// $fixed_fields['fixed_fields[id]'] = null;
			$entry_code = $dynamic_fields['dynamic_fields[column_12_01]'];
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

	        // $parent_gift_order_code = !empty($parent_gift_order_code) ? $parent_gift_order_code : $entryMasterRecord['parent_gift_order_code'];
			
			$id = $fixed_fields['fixed_fields[id]'] = $entryMasterRecord['id'];
			$entry_code = $fixed_fields['fixed_fields[column_12_01]'] = $entryMasterRecord['column_12_01'];

	  		$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				$dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $entryMasterRecord[$field['column_name']];
			}
			if($is_clone == 1){
				$mode = 'new';
				/*$order_master_id = $fixed_fields['fixed_fields[order_master_id]'] = null;*/
				$this->setInitialValue($dynamic_fields,$user_info,$is_clone);
			}
			/*Order Remarks Fld*/
			// $dynamic_fields['dynamic_fields[column_12_57]'] = $entryMasterRecord['column_12_57'];
			$created_by=$entryMasterRecord['created_by'];

    	}
    	
    	if($normArr) {
            $fixed_fields = $fixed_fields_;
            $dynamic_fields = $dynamic_fields_;
        }
        
        $action_roles = $this->getRecordActionRoles($mode,$popup,$entryPanel);
        
        // SET DELETE BUTTON AS DISABLED.
        $disableDeleteBtn = FALSE;
        if(!empty($entryMasterRecord)){
	        
        }
	  	$repairMaster = array(
  			'action_roles'	=>$action_roles, 
  			'id'			=>$id, 
  			'entry_code'	=>$entry_code,
  			// 'parent_order_code' => $entryMasterRecord['column_12_48'],
  			// 'fixed_fields'	=>$fixed_fields, 
  			'dynamic_fields'=>$dynamic_fields,
  		);
	  	return $repairMaster;
    }
    public function getRecordActionRoles($mode,$popup=FALSE,$entryPanel){
    	$role_arr = array(
    		'new'       	=>  true,
    		'save'			=>	true,
    		'delete'		=>	false,
    		'cancel'		=>	true,
    		'print'     	=>  true
    	);
    	switch ($mode) {
    		case 'new':
    			if($entryPanel=='repairEntryWindow'){
					$role_arr['new'] = false;
					$role_arr['print'] = false;
    			}
				break;
    		case 'edit':
    			if($popup === TRUE){
    				$role_arr['new'] = FALSE;	
    			} 
    			$user_info = Yii::app()->user->getUserInfo();
    			$role_arr['delete'] = TRUE;
    			$role_arr['print'] = false;
    			if($entryPanel=='repairEntryWindow'){
					$role_arr['new'] = false;
					$role_arr['print'] = false;
    			}
				break;
    		default:
    			break;
    	}

    	return $role_arr;
    }
    public function getWhereCondition($params){
        $alais         = $params['alais'];
        $customer_code =  empty($params['customer_code'])?'':$params['customer_code'];
        $sql_where = parent::getWhereCondition($params);
        if (!empty($customer_code)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_12_12 = '{$customer_code}'";
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
			$sql .= "{$select_fields}"; //,id,ext_id
			if(!empty($select_fields))
				$sql .= " ,id,ext_id ";
			//$sql .= $this->getSyncStatusColumn('t12', $synctime, $user_id);
    	}

    	$sql .= " from ".$this->tableName()." as t12";

		if(!empty($synctime)) {
        	$sql .= " where (t12.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t12.delete_flg = 0 AND t12.is_draft = 0 ";
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
			$default_sort_order = "t12.column_12_01 DESC";
			// $default_sort_order = "t12.column_5_01 desc";
			$sort_order = $this->getSortOrder('t12', $sort, $default_sort_order);
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
}
