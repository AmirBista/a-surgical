<?php

/**
 * This is the model class for table "hbase.h_order_detail".
 *
 * The followings are the available columns in table 'hbase.h_order_detail':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $column_2_01
 * @property string $column_2_02
 * @property string $column_2_03
 * @property string $column_2_04
 * @property string $column_2_05
 * @property string $column_2_06
 * @property string $column_2_07
 * @property string $column_2_08
 * @property string $column_2_09
 * @property string $column_2_10
 * @property string $column_2_11
 * @property string $column_2_12
 * @property string $column_2_13
 * @property string $column_2_14
 * @property string $column_2_15
 * @property string $column_2_16
 * @property string $column_2_17
 * @property string $column_2_18
 * @property string $column_2_19
 * @property string $column_2_20
 * @property string $column_2_21
 * @property string $column_2_22
 * @property string $column_2_23
 * @property string $column_2_24
 * @property string $column_2_25
 * @property string $column_2_26
 * @property string $column_2_27
 * @property string $column_2_28
 * @property string $column_2_29
 * @property string $column_2_30
 * @property string $column_2_31
 * @property string $column_2_32
 * @property string $column_2_33
 * @property string $column_2_34
 * @property string $column_2_35
 * @property string $column_2_36
 * @property string $column_2_37
 * @property string $column_2_38
 * @property string $column_2_39
 * @property string $column_2_40
 * @property string $column_2_41
 * @property string $column_2_42
 * @property string $column_2_43
 * @property string $column_2_44
 * @property string $column_2_45
 * @property string $column_2_46
 * @property string $column_2_47
 * @property string $column_2_48
 * @property string $column_2_49
 * @property string $column_2_50
 * @property string $column_2_51
 * @property string $column_2_52
 * @property string $column_2_53
 * @property string $column_2_54
 * @property string $column_2_55
 * @property string $column_2_56
 * @property string $column_2_57
 * @property string $column_2_58
 * @property string $column_2_59
 * @property string $column_2_60
 * @property string $column_2_61
 * @property string $column_2_62
 * @property string $column_2_63
 * @property string $column_2_64
 * @property string $column_2_65
 * @property string $column_2_66
 * @property string $column_2_67
 * @property string $column_2_68
 * @property string $column_2_69
 * @property string $column_2_70
 * @property string $column_2_71
 * @property string $column_2_72
 * @property string $column_2_73
 * @property string $column_2_74
 * @property string $column_2_75
 * @property string $column_2_76
 * @property string $column_2_77
 * @property string $column_2_78
 * @property string $column_2_79
 * @property string $column_2_80
 * @property string $column_2_81
 * @property string $column_2_82
 * @property string $column_2_83
 * @property string $column_2_84
 * @property string $column_2_85
 * @property string $column_2_86
 * @property string $column_2_87
 * @property string $column_2_88
 * @property string $column_2_89
 * @property string $column_2_90
 * @property string $column_2_91
 * @property string $column_2_92
 * @property string $column_2_93
 * @property string $column_2_94
 * @property string $column_2_95
 * @property string $column_2_96
 * @property string $column_2_97
 * @property string $column_2_98
 * @property string $column_2_99
 * @property string $column_2_100
 * @property string $ext_id
 */
class OrderDetail extends YIGBaseModel
{
	public function __construct()
	{
		parent::__construct();
		//$this->_datagrid_id = 1;
		$this->_table_id = 2;
		

	}

	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_order_detail';
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
			array('column_2_02, column_2_03, column_2_04, column_2_05, column_2_06, column_2_07, column_2_08, column_2_09, column_2_11, column_2_12, column_2_13, column_2_14, column_2_15, column_2_17, column_2_18, column_2_19, column_2_20, column_2_21, column_2_22, column_2_23, column_2_24, column_2_25, column_2_26, column_2_27, column_2_28, column_2_29, column_2_31, column_2_32, column_2_33, column_2_34, column_2_35, column_2_37, column_2_38, column_2_39, column_2_40, column_2_41, column_2_42, column_2_43, column_2_44, column_2_45, column_2_46, column_2_47, column_2_48, column_2_49, column_2_51, column_2_52, column_2_53, column_2_54, column_2_55, column_2_57, column_2_58, column_2_59, column_2_60, column_2_61, column_2_62, column_2_63, column_2_64, column_2_65, column_2_66, column_2_67, column_2_68, column_2_69, column_2_71, column_2_72, column_2_73, column_2_74, column_2_75, column_2_77, column_2_78, column_2_79, column_2_80, column_2_81, column_2_82, column_2_83, column_2_84, column_2_85, column_2_86, column_2_87, column_2_88, column_2_89, column_2_90, column_2_91, column_2_92, column_2_93, column_2_94, column_2_95, column_2_96, column_2_97, column_2_98, column_2_99, column_2_100, ext_id', 'length', 'max'=>100),
			array('column_2_10, column_2_30, column_2_50, column_2_70', 'length', 'max'=>1000),
			array('column_2_16, column_2_36, column_2_56, column_2_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, column_2_01, column_2_02, column_2_03, column_2_04, column_2_05, column_2_06, column_2_07, column_2_08, column_2_09, column_2_10, column_2_11, column_2_12, column_2_13, column_2_14, column_2_15, column_2_16, column_2_17, column_2_18, column_2_19, column_2_20, column_2_21, column_2_22, column_2_23, column_2_24, column_2_25, column_2_26, column_2_27, column_2_28, column_2_29, column_2_30, column_2_31, column_2_32, column_2_33, column_2_34, column_2_35, column_2_36, column_2_37, column_2_38, column_2_39, column_2_40, column_2_41, column_2_42, column_2_43, column_2_44, column_2_45, column_2_46, column_2_47, column_2_48, column_2_49, column_2_50, column_2_51, column_2_52, column_2_53, column_2_54, column_2_55, column_2_56, column_2_57, column_2_58, column_2_59, column_2_60, column_2_61, column_2_62, column_2_63, column_2_64, column_2_65, column_2_66, column_2_67, column_2_68, column_2_69, column_2_70, column_2_71, column_2_72, column_2_73, column_2_74, column_2_75, column_2_76, column_2_77, column_2_78, column_2_79, column_2_80, column_2_81, column_2_82, column_2_83, column_2_84, column_2_85, column_2_86, column_2_87, column_2_88, column_2_89, column_2_90, column_2_91, column_2_92, column_2_93, column_2_94, column_2_95, column_2_96, column_2_97, column_2_98, column_2_99, column_2_100, ext_id', 'safe', 'on'=>'search'),
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
			'column_2_01' => 'Column 2 01',
			'column_2_02' => 'Column 2 02',
			'column_2_03' => 'Column 2 03',
			'column_2_04' => 'Column 2 04',
			'column_2_05' => 'Column 2 05',
			'column_2_06' => 'Column 2 06',
			'column_2_07' => 'Column 2 07',
			'column_2_08' => 'Column 2 08',
			'column_2_09' => 'Column 2 09',
			'column_2_10' => 'Column 2 10',
			'column_2_11' => 'Column 2 11',
			'column_2_12' => 'Column 2 12',
			'column_2_13' => 'Column 2 13',
			'column_2_14' => 'Column 2 14',
			'column_2_15' => 'Column 2 15',
			'column_2_16' => 'Column 2 16',
			'column_2_17' => 'Column 2 17',
			'column_2_18' => 'Column 2 18',
			'column_2_19' => 'Column 2 19',
			'column_2_20' => 'Column 2 20',
			'column_2_21' => 'Column 2 21',
			'column_2_22' => 'Column 2 22',
			'column_2_23' => 'Column 2 23',
			'column_2_24' => 'Column 2 24',
			'column_2_25' => 'Column 2 25',
			'column_2_26' => 'Column 2 26',
			'column_2_27' => 'Column 2 27',
			'column_2_28' => 'Column 2 28',
			'column_2_29' => 'Column 2 29',
			'column_2_30' => 'Column 2 30',
			'column_2_31' => 'Column 2 31',
			'column_2_32' => 'Column 2 32',
			'column_2_33' => 'Column 2 33',
			'column_2_34' => 'Column 2 34',
			'column_2_35' => 'Column 2 35',
			'column_2_36' => 'Column 2 36',
			'column_2_37' => 'Column 2 37',
			'column_2_38' => 'Column 2 38',
			'column_2_39' => 'Column 2 39',
			'column_2_40' => 'Column 2 40',
			'column_2_41' => 'Column 2 41',
			'column_2_42' => 'Column 2 42',
			'column_2_43' => 'Column 2 43',
			'column_2_44' => 'Column 2 44',
			'column_2_45' => 'Column 2 45',
			'column_2_46' => 'Column 2 46',
			'column_2_47' => 'Column 2 47',
			'column_2_48' => 'Column 2 48',
			'column_2_49' => 'Column 2 49',
			'column_2_50' => 'Column 2 50',
			'column_2_51' => 'Column 2 51',
			'column_2_52' => 'Column 2 52',
			'column_2_53' => 'Column 2 53',
			'column_2_54' => 'Column 2 54',
			'column_2_55' => 'Column 2 55',
			'column_2_56' => 'Column 2 56',
			'column_2_57' => 'Column 2 57',
			'column_2_58' => 'Column 2 58',
			'column_2_59' => 'Column 2 59',
			'column_2_60' => 'Column 2 60',
			'column_2_61' => 'Column 2 61',
			'column_2_62' => 'Column 2 62',
			'column_2_63' => 'Column 2 63',
			'column_2_64' => 'Column 2 64',
			'column_2_65' => 'Column 2 65',
			'column_2_66' => 'Column 2 66',
			'column_2_67' => 'Column 2 67',
			'column_2_68' => 'Column 2 68',
			'column_2_69' => 'Column 2 69',
			'column_2_70' => 'Column 2 70',
			'column_2_71' => 'Column 2 71',
			'column_2_72' => 'Column 2 72',
			'column_2_73' => 'Column 2 73',
			'column_2_74' => 'Column 2 74',
			'column_2_75' => 'Column 2 75',
			'column_2_76' => 'Column 2 76',
			'column_2_77' => 'Column 2 77',
			'column_2_78' => 'Column 2 78',
			'column_2_79' => 'Column 2 79',
			'column_2_80' => 'Column 2 80',
			'column_2_81' => 'Column 2 81',
			'column_2_82' => 'Column 2 82',
			'column_2_83' => 'Column 2 83',
			'column_2_84' => 'Column 2 84',
			'column_2_85' => 'Column 2 85',
			'column_2_86' => 'Column 2 86',
			'column_2_87' => 'Column 2 87',
			'column_2_88' => 'Column 2 88',
			'column_2_89' => 'Column 2 89',
			'column_2_90' => 'Column 2 90',
			'column_2_91' => 'Column 2 91',
			'column_2_92' => 'Column 2 92',
			'column_2_93' => 'Column 2 93',
			'column_2_94' => 'Column 2 94',
			'column_2_95' => 'Column 2 95',
			'column_2_96' => 'Column 2 96',
			'column_2_97' => 'Column 2 97',
			'column_2_98' => 'Column 2 98',
			'column_2_99' => 'Column 2 99',
			'column_2_100' => 'Column 2 100',
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
		$criteria->compare('column_2_01',$this->column_2_01);
		$criteria->compare('column_2_02',$this->column_2_02,true);
		$criteria->compare('column_2_03',$this->column_2_03,true);
		$criteria->compare('column_2_04',$this->column_2_04,true);
		$criteria->compare('column_2_05',$this->column_2_05,true);
		$criteria->compare('column_2_06',$this->column_2_06,true);
		$criteria->compare('column_2_07',$this->column_2_07,true);
		$criteria->compare('column_2_08',$this->column_2_08,true);
		$criteria->compare('column_2_09',$this->column_2_09,true);
		$criteria->compare('column_2_10',$this->column_2_10,true);
		$criteria->compare('column_2_11',$this->column_2_11,true);
		$criteria->compare('column_2_12',$this->column_2_12,true);
		$criteria->compare('column_2_13',$this->column_2_13,true);
		$criteria->compare('column_2_14',$this->column_2_14,true);
		$criteria->compare('column_2_15',$this->column_2_15,true);
		$criteria->compare('column_2_16',$this->column_2_16,true);
		$criteria->compare('column_2_17',$this->column_2_17,true);
		$criteria->compare('column_2_18',$this->column_2_18,true);
		$criteria->compare('column_2_19',$this->column_2_19,true);
		$criteria->compare('column_2_20',$this->column_2_20,true);
		$criteria->compare('column_2_21',$this->column_2_21,true);
		$criteria->compare('column_2_22',$this->column_2_22,true);
		$criteria->compare('column_2_23',$this->column_2_23,true);
		$criteria->compare('column_2_24',$this->column_2_24,true);
		$criteria->compare('column_2_25',$this->column_2_25,true);
		$criteria->compare('column_2_26',$this->column_2_26,true);
		$criteria->compare('column_2_27',$this->column_2_27,true);
		$criteria->compare('column_2_28',$this->column_2_28,true);
		$criteria->compare('column_2_29',$this->column_2_29,true);
		$criteria->compare('column_2_30',$this->column_2_30,true);
		$criteria->compare('column_2_31',$this->column_2_31,true);
		$criteria->compare('column_2_32',$this->column_2_32,true);
		$criteria->compare('column_2_33',$this->column_2_33,true);
		$criteria->compare('column_2_34',$this->column_2_34,true);
		$criteria->compare('column_2_35',$this->column_2_35,true);
		$criteria->compare('column_2_36',$this->column_2_36,true);
		$criteria->compare('column_2_37',$this->column_2_37,true);
		$criteria->compare('column_2_38',$this->column_2_38,true);
		$criteria->compare('column_2_39',$this->column_2_39,true);
		$criteria->compare('column_2_40',$this->column_2_40,true);
		$criteria->compare('column_2_41',$this->column_2_41,true);
		$criteria->compare('column_2_42',$this->column_2_42,true);
		$criteria->compare('column_2_43',$this->column_2_43,true);
		$criteria->compare('column_2_44',$this->column_2_44,true);
		$criteria->compare('column_2_45',$this->column_2_45,true);
		$criteria->compare('column_2_46',$this->column_2_46,true);
		$criteria->compare('column_2_47',$this->column_2_47,true);
		$criteria->compare('column_2_48',$this->column_2_48,true);
		$criteria->compare('column_2_49',$this->column_2_49,true);
		$criteria->compare('column_2_50',$this->column_2_50,true);
		$criteria->compare('column_2_51',$this->column_2_51,true);
		$criteria->compare('column_2_52',$this->column_2_52,true);
		$criteria->compare('column_2_53',$this->column_2_53,true);
		$criteria->compare('column_2_54',$this->column_2_54,true);
		$criteria->compare('column_2_55',$this->column_2_55,true);
		$criteria->compare('column_2_56',$this->column_2_56,true);
		$criteria->compare('column_2_57',$this->column_2_57,true);
		$criteria->compare('column_2_58',$this->column_2_58,true);
		$criteria->compare('column_2_59',$this->column_2_59,true);
		$criteria->compare('column_2_60',$this->column_2_60,true);
		$criteria->compare('column_2_61',$this->column_2_61,true);
		$criteria->compare('column_2_62',$this->column_2_62,true);
		$criteria->compare('column_2_63',$this->column_2_63,true);
		$criteria->compare('column_2_64',$this->column_2_64,true);
		$criteria->compare('column_2_65',$this->column_2_65,true);
		$criteria->compare('column_2_66',$this->column_2_66,true);
		$criteria->compare('column_2_67',$this->column_2_67,true);
		$criteria->compare('column_2_68',$this->column_2_68,true);
		$criteria->compare('column_2_69',$this->column_2_69,true);
		$criteria->compare('column_2_70',$this->column_2_70,true);
		$criteria->compare('column_2_71',$this->column_2_71,true);
		$criteria->compare('column_2_72',$this->column_2_72,true);
		$criteria->compare('column_2_73',$this->column_2_73,true);
		$criteria->compare('column_2_74',$this->column_2_74,true);
		$criteria->compare('column_2_75',$this->column_2_75,true);
		$criteria->compare('column_2_76',$this->column_2_76,true);
		$criteria->compare('column_2_77',$this->column_2_77,true);
		$criteria->compare('column_2_78',$this->column_2_78,true);
		$criteria->compare('column_2_79',$this->column_2_79,true);
		$criteria->compare('column_2_80',$this->column_2_80,true);
		$criteria->compare('column_2_81',$this->column_2_81,true);
		$criteria->compare('column_2_82',$this->column_2_82,true);
		$criteria->compare('column_2_83',$this->column_2_83,true);
		$criteria->compare('column_2_84',$this->column_2_84,true);
		$criteria->compare('column_2_85',$this->column_2_85,true);
		$criteria->compare('column_2_86',$this->column_2_86,true);
		$criteria->compare('column_2_87',$this->column_2_87,true);
		$criteria->compare('column_2_88',$this->column_2_88,true);
		$criteria->compare('column_2_89',$this->column_2_89,true);
		$criteria->compare('column_2_90',$this->column_2_90,true);
		$criteria->compare('column_2_91',$this->column_2_91,true);
		$criteria->compare('column_2_92',$this->column_2_92,true);
		$criteria->compare('column_2_93',$this->column_2_93,true);
		$criteria->compare('column_2_94',$this->column_2_94,true);
		$criteria->compare('column_2_95',$this->column_2_95,true);
		$criteria->compare('column_2_96',$this->column_2_96,true);
		$criteria->compare('column_2_97',$this->column_2_97,true);
		$criteria->compare('column_2_98',$this->column_2_98,true);
		$criteria->compare('column_2_99',$this->column_2_99,true);
		$criteria->compare('column_2_100',$this->column_2_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return OrderDetail the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}

	public function getWhereCondition($params) {
        $alais                      = $params['alais'];
        $product_order_master_id    = empty($params['product_order_master_id']) ? null:$params['product_order_master_id'];
        $supplier_id    			= empty($params['supplier_id']) ? null:$params['supplier_id'];
        $mode   				 	= empty($params['mode']) ? null:$params['mode'];
        $forSupplierEntry    		= empty($params['forSupplierEntry']) ? 0:$params['forSupplierEntry'];

        $sql_where = parent::getWhereCondition($params);

        if (!empty($product_order_master_id)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.product_order_master_id = ". $product_order_master_id;
        }

        if ($forSupplierEntry == 1 && $mode == 'new'){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.column_2_20 = '{$supplier_id}'";
            $sql_where .= " AND ({$alais}.column_2_21 = '".t('orderDetail','pending')."' OR {$alais}.column_2_21 IS NULL) ";
        }

        return $sql_where;
    }

	public function getListData($params) {
    	$for_count				= $params['for_count'];
    	$user_id 				= Yii::app()->user->user_id;
    	$sql_where 				= $params['sql_where'];
    	$user_role				= $params['user_role'];
    	$fields 				= $params['fields'];
    	$pageSize 				= empty($params['pageSize']) ? null:$params['pageSize'];
    	$startFrom 				= empty($params['startFrom']) ? 0:$params['startFrom'];
    	$sort 					= empty($params['sort']) ? null:$params['sort'];
    	$dgUtil 				= $params['dgUtil'];
    	$datagrid_template_id 	= empty($params['datagrid_template_id']) ? null:$params['datagrid_template_id'];
    	$synctime 				= empty($params['synctime']) ? null:$params['synctime'];
    	$all_columns			= empty($params['all_columns']) ? 0:$params['all_columns'];
    	// $forOrderDetailSummary	= empty($params['forOrderDetailSummary']) ? 0:$params['forOrderDetailSummary'];
    	$groupDir				= empty($params['groupDir']) ? 'asc':$params['groupDir'];
    	$mode   				= empty($params['mode']) ? null:$params['mode'];
        $supplier_id    		= empty($params['supplier_id']) ? 0:$params['supplier_id'];
    	$forEntryPanel			= empty($params['forEntryPanel']) ? 0:$params['forEntryPanel'];
        $order_no     			= empty($params['order_no']) ? false:$params['order_no'];

        $company_id 			= Yii::app()->user->getAttr('company_id');
    	$select_fields 			= null;

    	if ((empty($fields) || count($fields) < 1) && $for_count != true && $all_columns != 1) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}
    	
    	if ($for_count != true && $all_columns != 1)
    		$select_fields = $this->getSelectFields($fields);
    	else if($for_count != true && $all_columns == 1){
    		$select_fields = "t2.*";
    	}

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {
			$sql .= "{$select_fields}, t2.id, t2.ext_id,t2.order_master_id";
			
			$sql .= $this->getSyncStatusColumn('t2', $synctime, $user_id);
			// if($dgUtil->_datagrid_id=='16'){
			// 	$lock = t('orderMaster','order_detail_lock');
			// 	$sql .= ",(CASE WHEN (t2.column_2_35 <>'{$lock}' OR t2.column_2_35 IS NULL) THEN '1'
	  //           		ELSE '0' END) as is_matched";
			// }
			
    	}

    	$sql .= " from {$this->tableName()} as t2";
    	$sql.= " INNER JOIN ".t('tblSchema','hb_').".h_order_master t1 ON t1.id = t2.order_master_id AND t1.delete_flg = 0";

    	// if(!$forEntryPanel == 1){
    	// } else {
	    // 	// do nth
	    // }
		if(!empty($synctime)) {
        	$sql .= " where (t2.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t2.delete_flg = 0 ";
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
			$default_sort_order = "convert_tonumeric(t2.column_2_26) ASC";
    		/*if($forEntryPanel == 1){
				$default_sort_order = "convert_tonumeric(t2.column_2_26) ASC";
    		}
			else
				$default_sort_order = "t2.column_2_01 DESC";*/
			$sort_order = $this->getSortOrder('t2', $sort, $default_sort_order);
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

    public function updateOrderStatus($ids,$status = null){
    	$order_codes = is_array($ids) ? implode(',', $ids) : $ids;
    	if(empty($order_codes))
    		return;
    	$orderStatus =  t('orderDetail','orderStatus');
    	$orderApproved = $orderStatus['OrderApproved'];
    	$status = empty($status) ? "column_2_21 = '{$orderApproved}'" : $status;
    	$sql = " UPDATE {$this->tableName()} 
    			SET {$status}
    			WHERE column_2_01 IN ({$order_codes}) ";
    	$cmd = Yii::app()->db->createCommand($sql);
    	$cmd->execute();
    }

    public function checkLockRecords($order_masters_id,$user_company_id){
    	$lock = t('orderMaster','order_detail_lock');
		$sql = "SELECT count(*)
    		FROM  {$this->tableName()} as t2
    		WHERE  t2.order_master_id = (SELECT id from  ".t('tblSchema','qk_').".qk_order_master WHERE id IN ({$order_masters_id}))
    		AND t2.column_2_35 = '{$lock}' 
    		AND (t2.delete_flg = 0 OR t2.delete_flg IS NULL)  
    		AND t2.company_id ='{$user_company_id}'";
		$cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryScalar();
    	return $result;
    }
    public function getUnLockRec($order_masters_id,$user_company_id){
    	$lock = t('orderMaster','order_detail_lock');
		$sql = "SELECT id
	    		FROM  {$this->tableName()} as t2
	    		WHERE  
	    		t2.order_master_id = (SELECT id from ".t('tblSchema','qk_').".qk_order_master where id IN ({$order_masters_id}))
	    		AND t2.column_2_35 <> '{$lock}'
	    		AND (t2.delete_flg = 0 OR t2.delete_flg IS NULL )  
	    		AND t2.company_id ='{$user_company_id}'";
		$cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryAll();
    	return $result;
    }

    public function getNotUpdatedPickingOrderDetails($orderCodes,$ids){
    	$sql = "SELECT * 
    			FROM  {$this->tableName()} 
    			WHERE column_2_01 IN ({$orderCodes})
    			AND (delete_flg = 0 OR delete_flg IS NULL ) ";
    	if(!empty($ids)){
    		$sql.="	AND id NOT IN ({$ids}) ";
    	}	
    	$cmd = Yii::app()->db->createCommand($sql);
    	$result = $cmd->queryAll();
    	return $result;

    }

    public function getFilterByRoleCondition($params)
    {
        $alais                  =  $params['alais'];
        $user_info              =  $params['user_info'];
        $user_role = $user_info['userRole'];
        $company_id = $user_info['company_id'];
        $department_id = $user_info['department_id'];
        $role_condition = parent::getFilterByRoleCondition($params);

        if (!empty($alais))
            $alais .= ".";
        
        if (RoleUtil::isStoreManager($user_role))
        {
            // same department of same company
            $role_condition = "( {$alais}company_id = {$company_id} 
            						AND ( {$alais}store_id = {$department_id} OR convert_tonumeric(t1.column_1_06) = {$department_id}) 
            					) ";
        }
        
        return $role_condition;
    } 
}
