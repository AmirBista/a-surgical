<?php

/**
 * This is the model class for table "hbase.h_order_master".
 *
 * The followings are the available columns in table 'hbase.h_order_master':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_1_01
 * @property string $column_1_02
 * @property string $column_1_03
 * @property string $column_1_04
 * @property string $column_1_05
 * @property string $column_1_06
 * @property string $column_1_07
 * @property string $column_1_08
 * @property string $column_1_09
 * @property string $column_1_10
 * @property string $column_1_11
 * @property string $column_1_12
 * @property string $column_1_13
 * @property string $column_1_14
 * @property string $column_1_15
 * @property string $column_1_16
 * @property string $column_1_17
 * @property string $column_1_18
 * @property string $column_1_19
 * @property string $column_1_20
 * @property string $column_1_21
 * @property string $column_1_22
 * @property string $column_1_23
 * @property string $column_1_24
 * @property string $column_1_25
 * @property string $column_1_26
 * @property string $column_1_27
 * @property string $column_1_28
 * @property string $column_1_29
 * @property string $column_1_30
 * @property string $column_1_31
 * @property string $column_1_32
 * @property string $column_1_33
 * @property string $column_1_34
 * @property string $column_1_35
 * @property string $column_1_36
 * @property string $column_1_37
 * @property string $column_1_38
 * @property string $column_1_39
 * @property string $column_1_40
 * @property string $column_1_41
 * @property string $column_1_42
 * @property string $column_1_43
 * @property string $column_1_44
 * @property string $column_1_45
 * @property string $column_1_46
 * @property string $column_1_47
 * @property string $column_1_48
 * @property string $column_1_49
 * @property string $column_1_50
 * @property string $column_1_51
 * @property string $column_1_52
 * @property string $column_1_53
 * @property string $column_1_54
 * @property string $column_1_55
 * @property string $column_1_56
 * @property string $column_1_57
 * @property string $column_1_58
 * @property string $column_1_59
 * @property string $column_1_60
 * @property string $column_1_61
 * @property string $column_1_62
 * @property string $column_1_63
 * @property string $column_1_64
 * @property string $column_1_65
 * @property string $column_1_66
 * @property string $column_1_67
 * @property string $column_1_68
 * @property string $column_1_69
 * @property string $column_1_70
 * @property string $column_1_71
 * @property string $column_1_72
 * @property string $column_1_73
 * @property string $column_1_74
 * @property string $column_1_75
 * @property string $column_1_76
 * @property string $column_1_77
 * @property string $column_1_78
 * @property string $column_1_79
 * @property string $column_1_80
 * @property string $column_1_81
 * @property string $column_1_82
 * @property string $column_1_83
 * @property string $column_1_84
 * @property string $column_1_85
 * @property string $column_1_86
 * @property string $column_1_87
 * @property string $column_1_88
 * @property string $column_1_89
 * @property string $column_1_90
 * @property string $column_1_91
 * @property string $column_1_92
 * @property string $column_1_93
 * @property string $column_1_94
 * @property string $column_1_95
 * @property string $column_1_96
 * @property string $column_1_97
 * @property string $column_1_98
 * @property string $column_1_99
 * @property string $column_1_100
 * @property string $ext_id
 */
class OrderMaster extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		$this->_datagrid_id = 1;
		$this->_table_id = 1;

	}
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_order_master';
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
			array('column_1_02, column_1_03, column_1_04, column_1_05, column_1_06, column_1_07, column_1_08, column_1_09, column_1_11, column_1_12, column_1_13, column_1_14, column_1_15, column_1_17, column_1_18, column_1_19, column_1_20, column_1_21, column_1_22, column_1_23, column_1_24, column_1_25, column_1_26, column_1_27, column_1_28, column_1_29, column_1_31, column_1_32, column_1_33, column_1_34, column_1_35, column_1_37, column_1_38, column_1_39, column_1_40, column_1_41, column_1_42, column_1_43, column_1_44, column_1_45, column_1_46, column_1_47, column_1_48, column_1_49, column_1_51, column_1_52, column_1_53, column_1_54, column_1_55, column_1_57, column_1_58, column_1_59, column_1_60, column_1_61, column_1_62, column_1_63, column_1_64, column_1_65, column_1_66, column_1_67, column_1_68, column_1_69, column_1_71, column_1_72, column_1_73, column_1_74, column_1_75, column_1_77, column_1_78, column_1_79, column_1_80, column_1_81, column_1_82, column_1_83, column_1_84, column_1_85, column_1_86, column_1_87, column_1_88, column_1_89, column_1_90, column_1_91, column_1_92, column_1_93, column_1_94, column_1_95, column_1_96, column_1_97, column_1_98, column_1_99, column_1_100, ext_id', 'length', 'max'=>100),
			array('column_1_10, column_1_30, column_1_50, column_1_70', 'length', 'max'=>1000),
			array('column_1_16, column_1_36, column_1_56, column_1_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_1_01, column_1_02, column_1_03, column_1_04, column_1_05, column_1_06, column_1_07, column_1_08, column_1_09, column_1_10, column_1_11, column_1_12, column_1_13, column_1_14, column_1_15, column_1_16, column_1_17, column_1_18, column_1_19, column_1_20, column_1_21, column_1_22, column_1_23, column_1_24, column_1_25, column_1_26, column_1_27, column_1_28, column_1_29, column_1_30, column_1_31, column_1_32, column_1_33, column_1_34, column_1_35, column_1_36, column_1_37, column_1_38, column_1_39, column_1_40, column_1_41, column_1_42, column_1_43, column_1_44, column_1_45, column_1_46, column_1_47, column_1_48, column_1_49, column_1_50, column_1_51, column_1_52, column_1_53, column_1_54, column_1_55, column_1_56, column_1_57, column_1_58, column_1_59, column_1_60, column_1_61, column_1_62, column_1_63, column_1_64, column_1_65, column_1_66, column_1_67, column_1_68, column_1_69, column_1_70, column_1_71, column_1_72, column_1_73, column_1_74, column_1_75, column_1_76, column_1_77, column_1_78, column_1_79, column_1_80, column_1_81, column_1_82, column_1_83, column_1_84, column_1_85, column_1_86, column_1_87, column_1_88, column_1_89, column_1_90, column_1_91, column_1_92, column_1_93, column_1_94, column_1_95, column_1_96, column_1_97, column_1_98, column_1_99, column_1_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_1_01' => 'Column 1 01',
			'column_1_02' => 'Column 1 02',
			'column_1_03' => 'Column 1 03',
			'column_1_04' => 'Column 1 04',
			'column_1_05' => 'Column 1 05',
			'column_1_06' => 'Column 1 06',
			'column_1_07' => 'Column 1 07',
			'column_1_08' => 'Column 1 08',
			'column_1_09' => 'Column 1 09',
			'column_1_10' => 'Column 1 10',
			'column_1_11' => 'Column 1 11',
			'column_1_12' => 'Column 1 12',
			'column_1_13' => 'Column 1 13',
			'column_1_14' => 'Column 1 14',
			'column_1_15' => 'Column 1 15',
			'column_1_16' => 'Column 1 16',
			'column_1_17' => 'Column 1 17',
			'column_1_18' => 'Column 1 18',
			'column_1_19' => 'Column 1 19',
			'column_1_20' => 'Column 1 20',
			'column_1_21' => 'Column 1 21',
			'column_1_22' => 'Column 1 22',
			'column_1_23' => 'Column 1 23',
			'column_1_24' => 'Column 1 24',
			'column_1_25' => 'Column 1 25',
			'column_1_26' => 'Column 1 26',
			'column_1_27' => 'Column 1 27',
			'column_1_28' => 'Column 1 28',
			'column_1_29' => 'Column 1 29',
			'column_1_30' => 'Column 1 30',
			'column_1_31' => 'Column 1 31',
			'column_1_32' => 'Column 1 32',
			'column_1_33' => 'Column 1 33',
			'column_1_34' => 'Column 1 34',
			'column_1_35' => 'Column 1 35',
			'column_1_36' => 'Column 1 36',
			'column_1_37' => 'Column 1 37',
			'column_1_38' => 'Column 1 38',
			'column_1_39' => 'Column 1 39',
			'column_1_40' => 'Column 1 40',
			'column_1_41' => 'Column 1 41',
			'column_1_42' => 'Column 1 42',
			'column_1_43' => 'Column 1 43',
			'column_1_44' => 'Column 1 44',
			'column_1_45' => 'Column 1 45',
			'column_1_46' => 'Column 1 46',
			'column_1_47' => 'Column 1 47',
			'column_1_48' => 'Column 1 48',
			'column_1_49' => 'Column 1 49',
			'column_1_50' => 'Column 1 50',
			'column_1_51' => 'Column 1 51',
			'column_1_52' => 'Column 1 52',
			'column_1_53' => 'Column 1 53',
			'column_1_54' => 'Column 1 54',
			'column_1_55' => 'Column 1 55',
			'column_1_56' => 'Column 1 56',
			'column_1_57' => 'Column 1 57',
			'column_1_58' => 'Column 1 58',
			'column_1_59' => 'Column 1 59',
			'column_1_60' => 'Column 1 60',
			'column_1_61' => 'Column 1 61',
			'column_1_62' => 'Column 1 62',
			'column_1_63' => 'Column 1 63',
			'column_1_64' => 'Column 1 64',
			'column_1_65' => 'Column 1 65',
			'column_1_66' => 'Column 1 66',
			'column_1_67' => 'Column 1 67',
			'column_1_68' => 'Column 1 68',
			'column_1_69' => 'Column 1 69',
			'column_1_70' => 'Column 1 70',
			'column_1_71' => 'Column 1 71',
			'column_1_72' => 'Column 1 72',
			'column_1_73' => 'Column 1 73',
			'column_1_74' => 'Column 1 74',
			'column_1_75' => 'Column 1 75',
			'column_1_76' => 'Column 1 76',
			'column_1_77' => 'Column 1 77',
			'column_1_78' => 'Column 1 78',
			'column_1_79' => 'Column 1 79',
			'column_1_80' => 'Column 1 80',
			'column_1_81' => 'Column 1 81',
			'column_1_82' => 'Column 1 82',
			'column_1_83' => 'Column 1 83',
			'column_1_84' => 'Column 1 84',
			'column_1_85' => 'Column 1 85',
			'column_1_86' => 'Column 1 86',
			'column_1_87' => 'Column 1 87',
			'column_1_88' => 'Column 1 88',
			'column_1_89' => 'Column 1 89',
			'column_1_90' => 'Column 1 90',
			'column_1_91' => 'Column 1 91',
			'column_1_92' => 'Column 1 92',
			'column_1_93' => 'Column 1 93',
			'column_1_94' => 'Column 1 94',
			'column_1_95' => 'Column 1 95',
			'column_1_96' => 'Column 1 96',
			'column_1_97' => 'Column 1 97',
			'column_1_98' => 'Column 1 98',
			'column_1_99' => 'Column 1 99',
			'column_1_100' => 'Column 1 100',
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
		$criteria->compare('column_1_01',$this->column_1_01);
		$criteria->compare('column_1_02',$this->column_1_02,true);
		$criteria->compare('column_1_03',$this->column_1_03,true);
		$criteria->compare('column_1_04',$this->column_1_04,true);
		$criteria->compare('column_1_05',$this->column_1_05,true);
		$criteria->compare('column_1_06',$this->column_1_06,true);
		$criteria->compare('column_1_07',$this->column_1_07,true);
		$criteria->compare('column_1_08',$this->column_1_08,true);
		$criteria->compare('column_1_09',$this->column_1_09,true);
		$criteria->compare('column_1_10',$this->column_1_10,true);
		$criteria->compare('column_1_11',$this->column_1_11,true);
		$criteria->compare('column_1_12',$this->column_1_12,true);
		$criteria->compare('column_1_13',$this->column_1_13,true);
		$criteria->compare('column_1_14',$this->column_1_14,true);
		$criteria->compare('column_1_15',$this->column_1_15,true);
		$criteria->compare('column_1_16',$this->column_1_16,true);
		$criteria->compare('column_1_17',$this->column_1_17,true);
		$criteria->compare('column_1_18',$this->column_1_18,true);
		$criteria->compare('column_1_19',$this->column_1_19,true);
		$criteria->compare('column_1_20',$this->column_1_20,true);
		$criteria->compare('column_1_21',$this->column_1_21,true);
		$criteria->compare('column_1_22',$this->column_1_22,true);
		$criteria->compare('column_1_23',$this->column_1_23,true);
		$criteria->compare('column_1_24',$this->column_1_24,true);
		$criteria->compare('column_1_25',$this->column_1_25,true);
		$criteria->compare('column_1_26',$this->column_1_26,true);
		$criteria->compare('column_1_27',$this->column_1_27,true);
		$criteria->compare('column_1_28',$this->column_1_28,true);
		$criteria->compare('column_1_29',$this->column_1_29,true);
		$criteria->compare('column_1_30',$this->column_1_30,true);
		$criteria->compare('column_1_31',$this->column_1_31,true);
		$criteria->compare('column_1_32',$this->column_1_32,true);
		$criteria->compare('column_1_33',$this->column_1_33,true);
		$criteria->compare('column_1_34',$this->column_1_34,true);
		$criteria->compare('column_1_35',$this->column_1_35,true);
		$criteria->compare('column_1_36',$this->column_1_36,true);
		$criteria->compare('column_1_37',$this->column_1_37,true);
		$criteria->compare('column_1_38',$this->column_1_38,true);
		$criteria->compare('column_1_39',$this->column_1_39,true);
		$criteria->compare('column_1_40',$this->column_1_40,true);
		$criteria->compare('column_1_41',$this->column_1_41,true);
		$criteria->compare('column_1_42',$this->column_1_42,true);
		$criteria->compare('column_1_43',$this->column_1_43,true);
		$criteria->compare('column_1_44',$this->column_1_44,true);
		$criteria->compare('column_1_45',$this->column_1_45,true);
		$criteria->compare('column_1_46',$this->column_1_46,true);
		$criteria->compare('column_1_47',$this->column_1_47,true);
		$criteria->compare('column_1_48',$this->column_1_48,true);
		$criteria->compare('column_1_49',$this->column_1_49,true);
		$criteria->compare('column_1_50',$this->column_1_50,true);
		$criteria->compare('column_1_51',$this->column_1_51,true);
		$criteria->compare('column_1_52',$this->column_1_52,true);
		$criteria->compare('column_1_53',$this->column_1_53,true);
		$criteria->compare('column_1_54',$this->column_1_54,true);
		$criteria->compare('column_1_55',$this->column_1_55,true);
		$criteria->compare('column_1_56',$this->column_1_56,true);
		$criteria->compare('column_1_57',$this->column_1_57,true);
		$criteria->compare('column_1_58',$this->column_1_58,true);
		$criteria->compare('column_1_59',$this->column_1_59,true);
		$criteria->compare('column_1_60',$this->column_1_60,true);
		$criteria->compare('column_1_61',$this->column_1_61,true);
		$criteria->compare('column_1_62',$this->column_1_62,true);
		$criteria->compare('column_1_63',$this->column_1_63,true);
		$criteria->compare('column_1_64',$this->column_1_64,true);
		$criteria->compare('column_1_65',$this->column_1_65,true);
		$criteria->compare('column_1_66',$this->column_1_66,true);
		$criteria->compare('column_1_67',$this->column_1_67,true);
		$criteria->compare('column_1_68',$this->column_1_68,true);
		$criteria->compare('column_1_69',$this->column_1_69,true);
		$criteria->compare('column_1_70',$this->column_1_70,true);
		$criteria->compare('column_1_71',$this->column_1_71,true);
		$criteria->compare('column_1_72',$this->column_1_72,true);
		$criteria->compare('column_1_73',$this->column_1_73,true);
		$criteria->compare('column_1_74',$this->column_1_74,true);
		$criteria->compare('column_1_75',$this->column_1_75,true);
		$criteria->compare('column_1_76',$this->column_1_76,true);
		$criteria->compare('column_1_77',$this->column_1_77,true);
		$criteria->compare('column_1_78',$this->column_1_78,true);
		$criteria->compare('column_1_79',$this->column_1_79,true);
		$criteria->compare('column_1_80',$this->column_1_80,true);
		$criteria->compare('column_1_81',$this->column_1_81,true);
		$criteria->compare('column_1_82',$this->column_1_82,true);
		$criteria->compare('column_1_83',$this->column_1_83,true);
		$criteria->compare('column_1_84',$this->column_1_84,true);
		$criteria->compare('column_1_85',$this->column_1_85,true);
		$criteria->compare('column_1_86',$this->column_1_86,true);
		$criteria->compare('column_1_87',$this->column_1_87,true);
		$criteria->compare('column_1_88',$this->column_1_88,true);
		$criteria->compare('column_1_89',$this->column_1_89,true);
		$criteria->compare('column_1_90',$this->column_1_90,true);
		$criteria->compare('column_1_91',$this->column_1_91,true);
		$criteria->compare('column_1_92',$this->column_1_92,true);
		$criteria->compare('column_1_93',$this->column_1_93,true);
		$criteria->compare('column_1_94',$this->column_1_94,true);
		$criteria->compare('column_1_95',$this->column_1_95,true);
		$criteria->compare('column_1_96',$this->column_1_96,true);
		$criteria->compare('column_1_97',$this->column_1_97,true);
		$criteria->compare('column_1_98',$this->column_1_98,true);
		$criteria->compare('column_1_99',$this->column_1_99,true);
		$criteria->compare('column_1_100',$this->column_1_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return OrderMaster the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	/*
    @params $id primary key
    */
    public function getOrderMasterRecord($id,$is_bill_order){
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
		$orderTypeArr = t('entryPanel','order_type');
		if(!empty($is_bill_order))
		{
			$order_type = $orderTypeArr['order']; 	
		}
		else
		{
			$order_type = $orderTypeArr['sales'];
		}
		if(!empty($order_type))
		{
			if(!empty($sql)){
                $sql.= " AND ";
            }
            $sql.= "column_1_61 = '$order_type'";
		}
		$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':id', $id, PDO::PARAM_INT);
        $record = $cmd->queryRow();
        return $record;
    }

    public function setInitialValue(&$dynamic_fields,$user_info,$is_clone=0,$is_bill_order=0,$mode=null){
    	$date = date('Y-m-d');
    	$parent_screen_id = 1;
    	// $receiveStatusArr = t('entryPanel','receiveStatus');
    	if($is_clone == 0){
    		$this->setDefaultValues($dynamic_fields,$user_info,$parent_screen_id);
    	}
    	if($is_clone == 0){
    		/*Get Next Sequence Value for column_1_01 ::A1 */
    		$dynamic_fields['dynamic_fields[column_1_01]'] = $this->getNextSequenceValue();
    	}
    	$orderTypeArr = t('entryPanel','order_type');
    	if($is_bill_order == 1){
    		$dynamic_fields['dynamic_fields[column_1_61]'] = $orderTypeArr['order'];	
    	}
    	else{
    		$dynamic_fields['dynamic_fields[column_1_61]'] = $orderTypeArr['sales'];	

    	}

    	if($mode == "new" && $is_bill_order == 0){
    		$paymentModeArr = t('entryPanel','paymentMode');
    		$dynamic_fields['dynamic_fields[column_1_23]'] = $date;	
    		$dynamic_fields['dynamic_fields[column_1_24]'] = date('H:i');	
    		$dynamic_fields['dynamic_fields[column_1_30]'] = $date;	
    		$dynamic_fields['dynamic_fields[column_1_38]'] = $date;	
    		$dynamic_fields['dynamic_fields[column_1_39]'] = $paymentModeArr['cash'];
    		// $dynamic_fields['dynamic_fields[column_1_29]'] = $receiveStatusArr['received'];	
    	}
    	else if($mode == "new" && $is_bill_order == 1){
    		// $dynamic_fields['dynamic_fields[column_1_29]']= $receiveStatusArr['notReceived'];
    	}


  		// /*Entry Date ::A4 */
		// $dynamic_fields['dynamic_fields[column_1_04]'] = $date;
		// /*User name ::A8 */
		// $dynamic_fields['dynamic_fields[column_1_08]'] = $user_info['last_name'].' '.$user_info['firstName'];
		// /*Entry DateTime ::A9 */
		// $dynamic_fields['dynamic_fields[column_1_09]'] = date('Y-m-d H:i');
		// /*Last Updated By*/
		// $dynamic_fields['dynamic_fields[column_1_10]'] = null;
		// /*Last Updated On*/
		// $dynamic_fields['dynamic_fields[column_1_11]'] = null;
	}

	public function getEntryData($entryDataParams){
		$id 				= $entryDataParams['id']; 
		$mode 				= $entryDataParams['mode'];
		$user_info 			= $entryDataParams['user_info'];
		$is_bill_order		= $entryDataParams['is_bill_order'];
		$parent_screen_id	= !empty($entryDataParams['parent_screen_id']) ? $entryDataParams['parent_screen_id'] : 0;
		$is_clone			= !empty($entryDataParams['is_clone']) ? $entryDataParams['is_clone'] : 0;
		$normArr			= !empty($entryDataParams['normArr']) ? $entryDataParams['normArr'] : array();
		$popup				= !empty($entryDataParams['popup']) ? $entryDataParams['popup'] : FALSE;
		$createBill			= !empty($entryDataParams['createBill']) ? $entryDataParams['createBill'] : FALSE;
		$convertToSales		= !empty($entryDataParams['convertToSales']) ? $entryDataParams['convertToSales'] : FALSE;

    	
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
        $receiveStatusArr = t('entryPanel','receiveStatus');
        $entryMasterRecord = $this->getOrderMasterRecord($id,$is_bill_order);
        
        if ($mode == 'new')
    	{
    		$entryMasterRecord = new OrderMaster();
	        $user_info = Yii::app()->user->getUserInfo();
	        
	        $this->setInitialValue($dynamic_fields,$user_info,null,$is_bill_order,$mode);
			$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				if(!empty($dynamic_fields['dynamic_fields['.$field['column_name'].']'])){
					$entryMasterRecord->$field['column_name'] = $dynamic_fields['dynamic_fields['.$field['column_name'].']'];
				}
			}
			// var_dump($dynamic_fields); die;
			$entryMasterRecord->created_by = $user_id;
			$entryMasterRecord->created_datetime = date('Y-m-d H:i:s');
			$entryMasterRecord->column_1_10 = $dynamic_fields['dynamic_fields[column_1_10]'] = $user_info['firstName']." ".$user_info['last_name'];
			$entryMasterRecord->column_1_12 = $dynamic_fields['dynamic_fields[column_1_12]'] = NULL;
			$entryMasterRecord->column_1_13 = $dynamic_fields['dynamic_fields[column_1_13]'] = NULL;
			
			
			if($entryMasterRecord->save()){
				$id = $entryMasterRecord->getPrimaryKey();
			}
			$receiveStatusArr = t('entryPanel','receiveStatus');
			if($is_bill_order == 0){
	    		$dynamic_fields['dynamic_fields[column_1_29]'] = $receiveStatusArr['received'];	
	    	}
	    	else {
	    		$dynamic_fields['dynamic_fields[column_1_29]']= $receiveStatusArr['notReceived'];
	    	}

			$entry_code = $dynamic_fields['dynamic_fields[column_1_01]'];
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
			
			$id = $entryMasterRecord['id'];
			$entry_code = $entryMasterRecord['column_1_01'];

	  		$fields = $hlpr->getScreenFields($parent_screen_id, $user_role, ScreenHelper::$SCREEN_TYPE_FORM);
			
			foreach ($fields as $key => $field) {
				$dynamic_fields['dynamic_fields['.$field['column_name'].']'] = $entryMasterRecord[$field['column_name']];
			}
			if($is_clone == 1 || $convertToSales === TRUE){
				$mode = 'new';
				/*$order_master_id = $fixed_fields['fixed_fields[order_master_id]'] = null;*/
				$this->setInitialValue($dynamic_fields,$user_info,$is_clone,$is_bill_order,$mode);
				$receiveStatusArr = t('entryPanel','receiveStatus');
				if($is_bill_order == 0){
		    		$dynamic_fields['dynamic_fields[column_1_29]'] = $receiveStatusArr['received'];	
		    	}
		    	else {
		    		$dynamic_fields['dynamic_fields[column_1_29]']= $receiveStatusArr['notReceived'];
		    	}
			}
			/*Order Remarks Fld*/
			// $dynamic_fields['dynamic_fields[column_1_57]'] = $entryMasterRecord['column_1_57'];
			$dynamic_fields['dynamic_fields[column_1_12]'] = $entryMasterRecord['column_1_12'];
			$dynamic_fields['dynamic_fields[column_1_13]'] = $entryMasterRecord['column_1_13'];
			$created_by=$entryMasterRecord['created_by'];
    	}
    	
    	if($normArr) {
            $dynamic_fields = $dynamic_fields_;
        }
        
        $action_roles = $this->getRecordActionRoles($mode,$popup,$entryMasterRecord,$convertToSales);
        
        // SET DELETE BUTTON AS DISABLED.
        $disableDeleteBtn = FALSE;
        if(!empty($entryMasterRecord)){
	        
        }
	  	$orderMaster = array(
  			'action_roles'	=>$action_roles, 
  			'id'			=>$id, 
  			'entry_code'	=>$entry_code,
  			// 'parent_order_code' => $entryMasterRecord['column_1_48'],
  			'dynamic_fields'=>$dynamic_fields,
  		);

	  	return $orderMaster;
    }

    public function getRecordActionRoles($mode,$popup=FALSE,$entryMasterRecord=null,$convertToSales=false){
    	$role_arr = array(
    		'new'       =>  true,
    		'save'		=>	true,
    		'delete'	=>	false,
    		'bill'		=>	false,
    		'cancel'	=>	true,
    		'print'     =>  false,
    		'serviceEntry'=> false,
    		'btnConvertToSales' => true
    	);
    	switch ($mode) {
    		case 'new':
    			
				break;
    		case 'edit':
    		
                $receiveStatusArr = t('entryPanel','receiveStatus');
                $user_info = Yii::app()->user->getUserInfo();
				$role_arr['bill'] = FALSE;
                if(RoleUtil::isAdmin($user_info['userRole']))
                {
    				$role_arr['new'] = FALSE;	
                }
                if($entryMasterRecord['column_1_29'] == $receiveStatusArr['received'])
                {
    				$role_arr['save'] = FALSE;	
                }
    			if($popup === TRUE){
    				$role_arr['new'] = FALSE;	
    			}
    			// if($createBill == 0){
	    		// 	$role_arr['delete'] = TRUE;
    			// }
    			if($convertToSales === FALSE)
    			{
	    			$role_arr['print'] = TRUE;
	    			$role_arr['serviceEntry'] = TRUE;
    			}
    			
				break;
    		default:
    			break;
    	}

    	return $role_arr;
    }

    public function getWhereCondition($params){
		$company_code     = empty($params['company_code']) ? null:$params['company_code'];
		$entry_id         = empty($params['entry_id']) ? null:$params['entry_id'];
		$alais            = $params['alais'];
		$forCustomerPanel = empty($params['forCustomerPanel']) ? 0:$params['forCustomerPanel'];
		$customer_code    = empty($params['customer_code']) ? 0:$params['customer_code'];
		$order_type      = empty($params['order_type']) ? null:$params['order_type'];
    	$sql_where = parent::getWhereCondition($params);
    	
    	if ($forCustomerPanel == 1){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_1_15 = '". $customer_code."'";
        }
        else if (!empty($company_code)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_1_17 = '{$company_code}'";
        }
        else if(!empty($entry_id)){
    		if(!empty($sql_where)){
           		$sql_where.= " AND ";
        	}
        	$sql_where .= " {$alais}.id = ". $entry_id;
    	}

    	if(!empty($order_type))
    	{
    		if(!empty($sql_where)){
           		$sql_where.= " AND ";
        	}
        	$sql_where .= " {$alais}.column_1_61 = '$order_type'";
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
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$forServiceEntryPanel   = empty($params['forServiceEntryPanel']) ? null:$params['forServiceEntryPanel'];
    	$forRepairEntryPanel    = empty($params['forRepairEntryPanel']) ? null:$params['forRepairEntryPanel'];
    	$select_fields 			= null;
    	// $dataForMemberInfo 		= empty($params['dataForMemberInfo']) ? false:$params['dataForMemberInfo'];
     //    $forPickingEntry      	= empty($params['forPickingEntry']) ? 0:$params['forPickingEntry'];
     //    $delivery_date        	= empty($params['delivery_date']) ? null:$params['delivery_date'];
     //    $mode        			= empty($params['mode']) ? null:$params['mode'];
     //    $picking_master_id      = empty($params['picking_master_id']) ? 0:$params['picking_master_id'];

        
    	$alais = "t1";
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
			// if($forPickingEntry == 1){
			// 	$sql.= " DISTINCT ON (t1.column_1_01) column_1_01, ";
			// }
			$sql .= "{$select_fields}, t1.id, t1.ext_id,t1.column_1_03,t1.column_1_17,t1.column_1_29,t1.column_1_61";
    		$sql .= $this->getSyncStatusColumn('t1', $synctime, $user_id);

    	}
    	$sql .= " FROM {$this->tableName()} AS t1";

    	if($forServiceEntryPanel == 1 || $forRepairEntryPanel == 1){
    		$sql.= " INNER JOIN ".t('tblSchema','hb_').".h_customer AS t3 ON t3.column_3_05 = t1.column_1_15 AND t3.delete_flg=0 ";
    	}
    	
		if(!empty($synctime)) {
        	$sql .= " WHERE (t1.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " WHERE  (t1.delete_flg = 0  AND  t1.is_draft = 0";
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
   //  		if($forPickingEntry == 1){
			// 	$default_sort_order = " t1.column_1_01 ASC ";
			// }
			// else
				$default_sort_order = " convert_tonumeric(t1.column_1_01::text) DESC ";
			$sort_order = $this->getSortOrder('t1', $sort, $default_sort_order);
			if (!empty($sort_order)){
				$sql .= $sort_order;
			}
			if(!empty($pageSize) && $pageSize>0){
				$sql.= " LIMIT {$pageSize} OFFSET {$startFrom}";
			}
			
    	}
        $cmd = Yii::app()->db->createCommand($sql);
    	if ($for_count == true){

			$results = $cmd->queryScalar();
    	}
   //  	else if($dataForMemberInfo) {
			// $results = $cmd->queryRow();
   //  	}
    	else {
        	$results = $cmd->queryAll();
    	}

		return $results;
    }

    public function getComment($entry_code) {
    	$sql = "SELECT t1.column_1_98 as comment, t1.column_1_99 AS opt
    			FROM {$this->tableName()} t1 
    			WHERE (t1.column_1_01 =:entry_code AND (t1.delete_flg = 0 OR t1.delete_flg IS NULL))";
    	$cmd = Yii::app()->db->createCommand($sql);
        $cmd->bindParam(':entry_code', $entry_code, PDO::PARAM_INT);
    	$result = $cmd->queryRow();
	    return $result;
    }
    public function getFilterByRoleCondition($params)
    {
    	$alais 					=  $params['alais'];
    	$user_info 				=  $params['user_info'];
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
        $role_condition = "";
        if (!empty($alais))
            $alais .= ".";
        if (RoleUtil::isSuperAdmin($user_role) || RoleUtil::isAdmin($user_role)){
            //allow all records for for super user.
        }
        else if (RoleUtil::isCompanyAdmin($user_role))
        {
            // all department of same company
            $role_condition = " {$alais}company_id = {$company_id} ";
        }
        else if (RoleUtil::isStoreManager($user_role))
        {
            // same department of same company
            $role_condition = " (({$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id}) OR ({$alais}column_1_06 = '{$department_id}')) ";
        }
        else
        {
            // same department of same company
            $role_condition = " {$alais}company_id = {$company_id} AND {$alais}store_id = {$department_id} ";    
        }
        return $role_condition;
    }    
     public function convertOrderToSales($clone_params){
			$user_id 		 		= $clone_params['user_id'];          	
			$company_id 			= $clone_params['company_id'];         	
			$company_name 			= $clone_params['company_name'];       
			$department_id 			= $clone_params['department_id'];         	
			$department_name 		= $clone_params['department_name'];     
			$order_master_id		= $clone_params['id'];

    	$connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try{
	    	$sql = "SELECT * FROM hbase.yigfx_convert_to_sales_order(:order_master_id,:user_id,:company_id,:company_name,:department_id,:department_name)";
	    	//$sql = "SELECT * FROM hbase.clone_order($order_master_id,$user_id,$company_id,$company_name,$department_id,$department_name)";

	    	//echo $sql;die;
	    	$cmd = $connection->createCommand($sql);
	        $cmd->bindParam(':order_master_id', $order_master_id, PDO::PARAM_INT);
	        $cmd->bindParam(':user_id', $user_id, PDO::PARAM_INT);
	        $cmd->bindParam(':department_id', $department_id, PDO::PARAM_INT);
	        $cmd->bindParam(':company_id', $company_id, PDO::PARAM_INT);
	        $cmd->bindParam(':company_name', $company_name, PDO::PARAM_STR);
	        $cmd->bindParam(':department_id', $department_id, PDO::PARAM_INT);
	        $cmd->bindParam(':department_name', $department_name, PDO::PARAM_STR);
	        $result = $cmd->queryScalar();
	        $transaction->commit();
	        return $result;
	    }
    	catch(Exception $e){
    		if($transaction)
    			$transaction->rollback();
    		$response['msg'] = $e;
    		return $response;	
    	}
    }
}
