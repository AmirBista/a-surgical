<?php

/**
 * This is the model class for table "hbase.h_transfer_detail".
 *
 * The followings are the available columns in table 'hbase.h_transfer_detail':
 * @property integer $id
 * @property integer $company_id
 * @property integer $store_id
 * @property integer $created_by
 * @property string $created_datetime
 * @property integer $updated_by
 * @property string $updated_datetime
 * @property integer $delete_flg
 * @property integer $is_draft
 * @property integer $transfer_master_id
 * @property integer $column_9_01
 * @property string $column_9_02
 * @property string $column_9_03
 * @property string $column_9_04
 * @property string $column_9_05
 * @property string $column_9_06
 * @property string $column_9_07
 * @property string $column_9_08
 * @property string $column_9_09
 * @property string $column_9_10
 * @property string $column_9_11
 * @property string $column_9_12
 * @property string $column_9_13
 * @property string $column_9_14
 * @property string $column_9_15
 * @property string $column_9_16
 * @property string $column_9_17
 * @property string $column_9_18
 * @property string $column_9_19
 * @property string $column_9_20
 * @property string $column_9_21
 * @property string $column_9_22
 * @property string $column_9_23
 * @property string $column_9_24
 * @property string $column_9_25
 * @property string $column_9_26
 * @property string $column_9_27
 * @property string $column_9_28
 * @property string $column_9_29
 * @property string $column_9_30
 * @property string $column_9_31
 * @property string $column_9_32
 * @property string $column_9_33
 * @property string $column_9_34
 * @property string $column_9_35
 * @property string $column_9_36
 * @property string $column_9_37
 * @property string $column_9_38
 * @property string $column_9_39
 * @property string $column_9_40
 * @property string $column_9_41
 * @property string $column_9_42
 * @property string $column_9_43
 * @property string $column_9_44
 * @property string $column_9_45
 * @property string $column_9_46
 * @property string $column_9_47
 * @property string $column_9_48
 * @property string $column_9_49
 * @property string $column_9_50
 * @property string $column_9_51
 * @property string $column_9_52
 * @property string $column_9_53
 * @property string $column_9_54
 * @property string $column_9_55
 * @property string $column_9_56
 * @property string $column_9_57
 * @property string $column_9_58
 * @property string $column_9_59
 * @property string $column_9_60
 * @property string $column_9_61
 * @property string $column_9_62
 * @property string $column_9_63
 * @property string $column_9_64
 * @property string $column_9_65
 * @property string $column_9_66
 * @property string $column_9_67
 * @property string $column_9_68
 * @property string $column_9_69
 * @property string $column_9_70
 * @property string $column_9_71
 * @property string $column_9_72
 * @property string $column_9_73
 * @property string $column_9_74
 * @property string $column_9_75
 * @property string $column_9_76
 * @property string $column_9_77
 * @property string $column_9_78
 * @property string $column_9_79
 * @property string $column_9_80
 * @property string $column_9_81
 * @property string $column_9_82
 * @property string $column_9_83
 * @property string $column_9_84
 * @property string $column_9_85
 * @property string $column_9_86
 * @property string $column_9_87
 * @property string $column_9_88
 * @property string $column_9_89
 * @property string $column_9_90
 * @property string $column_9_91
 * @property string $column_9_92
 * @property string $column_9_93
 * @property string $column_9_94
 * @property string $column_9_95
 * @property string $column_9_96
 * @property string $column_9_97
 * @property string $column_9_98
 * @property string $column_9_99
 * @property string $column_9_100
 * @property string $ext_id
 * @property integer $supplier_id
 * @property integer $product_id
 */
class TransferDetail extends YIGBaseModel
{

	public function __construct() {
       	parent::__construct();
		$this->_table_id = 9;
		
    }
	/**
	 * @return string the associated database table name
	 */
	public function tableName()
	{
		return 'hbase.h_transfer_detail';
	}

	/**
	 * @return array validation rules for model attributes.
	 */
	public function rules()
	{
		// NOTE: you should only define rules for those attributes that
		// will receive user inputs.
		return array(
			array('company_id, store_id, created_by, updated_by, delete_flg, is_draft, transfer_master_id, supplier_id, product_id', 'numerical', 'integerOnly'=>true),
			array('column_9_02, column_9_03, column_9_04, column_9_05, column_9_06, column_9_07, column_9_08, column_9_09, column_9_11, column_9_12, column_9_13, column_9_14, column_9_15, column_9_17, column_9_18, column_9_19, column_9_20, column_9_21, column_9_22, column_9_23, column_9_24, column_9_25, column_9_26, column_9_27, column_9_28, column_9_29, column_9_31, column_9_32, column_9_33, column_9_34, column_9_35, column_9_37, column_9_38, column_9_39, column_9_40, column_9_41, column_9_42, column_9_43, column_9_44, column_9_45, column_9_46, column_9_47, column_9_48, column_9_49, column_9_51, column_9_52, column_9_53, column_9_54, column_9_55, column_9_57, column_9_58, column_9_59, column_9_60, column_9_61, column_9_62, column_9_63, column_9_64, column_9_65, column_9_66, column_9_67, column_9_68, column_9_69, column_9_71, column_9_72, column_9_73, column_9_74, column_9_75, column_9_77, column_9_78, column_9_79, column_9_80, column_9_81, column_9_82, column_9_83, column_9_84, column_9_85, column_9_86, column_9_87, column_9_88, column_9_89, column_9_90, column_9_91, column_9_92, column_9_93, column_9_94, column_9_95, column_9_96, column_9_97, column_9_98, column_9_99, column_9_100, ext_id', 'length', 'max'=>100),
			array('column_9_10, column_9_30, column_9_50, column_9_70', 'length', 'max'=>1000),
			array('column_9_16, column_9_36, column_9_56, column_9_76', 'length', 'max'=>500),
			array('created_datetime, updated_datetime', 'safe'),
			// The following rule is used by search().
			// @todo Please remove those attributes that should not be searched.
			array('id, company_id, store_id, created_by, created_datetime, updated_by, updated_datetime, delete_flg, is_draft, transfer_master_id, column_9_01, column_9_02, column_9_03, column_9_04, column_9_05, column_9_06, column_9_07, column_9_08, column_9_09, column_9_10, column_9_11, column_9_12, column_9_13, column_9_14, column_9_15, column_9_16, column_9_17, column_9_18, column_9_19, column_9_20, column_9_21, column_9_22, column_9_23, column_9_24, column_9_25, column_9_26, column_9_27, column_9_28, column_9_29, column_9_30, column_9_31, column_9_32, column_9_33, column_9_34, column_9_35, column_9_36, column_9_37, column_9_38, column_9_39, column_9_40, column_9_41, column_9_42, column_9_43, column_9_44, column_9_45, column_9_46, column_9_47, column_9_48, column_9_49, column_9_50, column_9_51, column_9_52, column_9_53, column_9_54, column_9_55, column_9_56, column_9_57, column_9_58, column_9_59, column_9_60, column_9_61, column_9_62, column_9_63, column_9_64, column_9_65, column_9_66, column_9_67, column_9_68, column_9_69, column_9_70, column_9_71, column_9_72, column_9_73, column_9_74, column_9_75, column_9_76, column_9_77, column_9_78, column_9_79, column_9_80, column_9_81, column_9_82, column_9_83, column_9_84, column_9_85, column_9_86, column_9_87, column_9_88, column_9_89, column_9_90, column_9_91, column_9_92, column_9_93, column_9_94, column_9_95, column_9_96, column_9_97, column_9_98, column_9_99, column_9_100, ext_id, supplier_id, product_id', 'safe', 'on'=>'search'),
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
			'transfer_master_id' => 'Transfer Master',
			'column_9_01' => 'Column 9 01',
			'column_9_02' => 'Column 9 02',
			'column_9_03' => 'Column 9 03',
			'column_9_04' => 'Column 9 04',
			'column_9_05' => 'Column 9 05',
			'column_9_06' => 'Column 9 06',
			'column_9_07' => 'Column 9 07',
			'column_9_08' => 'Column 9 08',
			'column_9_09' => 'Column 9 09',
			'column_9_10' => 'Column 9 10',
			'column_9_11' => 'Column 9 11',
			'column_9_12' => 'Column 9 12',
			'column_9_13' => 'Column 9 13',
			'column_9_14' => 'Column 9 14',
			'column_9_15' => 'Column 9 15',
			'column_9_16' => 'Column 9 16',
			'column_9_17' => 'Column 9 17',
			'column_9_18' => 'Column 9 18',
			'column_9_19' => 'Column 9 19',
			'column_9_20' => 'Column 9 20',
			'column_9_21' => 'Column 9 21',
			'column_9_22' => 'Column 9 22',
			'column_9_23' => 'Column 9 23',
			'column_9_24' => 'Column 9 24',
			'column_9_25' => 'Column 9 25',
			'column_9_26' => 'Column 9 26',
			'column_9_27' => 'Column 9 27',
			'column_9_28' => 'Column 9 28',
			'column_9_29' => 'Column 9 29',
			'column_9_30' => 'Column 9 30',
			'column_9_31' => 'Column 9 31',
			'column_9_32' => 'Column 9 32',
			'column_9_33' => 'Column 9 33',
			'column_9_34' => 'Column 9 34',
			'column_9_35' => 'Column 9 35',
			'column_9_36' => 'Column 9 36',
			'column_9_37' => 'Column 9 37',
			'column_9_38' => 'Column 9 38',
			'column_9_39' => 'Column 9 39',
			'column_9_40' => 'Column 9 40',
			'column_9_41' => 'Column 9 41',
			'column_9_42' => 'Column 9 42',
			'column_9_43' => 'Column 9 43',
			'column_9_44' => 'Column 9 44',
			'column_9_45' => 'Column 9 45',
			'column_9_46' => 'Column 9 46',
			'column_9_47' => 'Column 9 47',
			'column_9_48' => 'Column 9 48',
			'column_9_49' => 'Column 9 49',
			'column_9_50' => 'Column 9 50',
			'column_9_51' => 'Column 9 51',
			'column_9_52' => 'Column 9 52',
			'column_9_53' => 'Column 9 53',
			'column_9_54' => 'Column 9 54',
			'column_9_55' => 'Column 9 55',
			'column_9_56' => 'Column 9 56',
			'column_9_57' => 'Column 9 57',
			'column_9_58' => 'Column 9 58',
			'column_9_59' => 'Column 9 59',
			'column_9_60' => 'Column 9 60',
			'column_9_61' => 'Column 9 61',
			'column_9_62' => 'Column 9 62',
			'column_9_63' => 'Column 9 63',
			'column_9_64' => 'Column 9 64',
			'column_9_65' => 'Column 9 65',
			'column_9_66' => 'Column 9 66',
			'column_9_67' => 'Column 9 67',
			'column_9_68' => 'Column 9 68',
			'column_9_69' => 'Column 9 69',
			'column_9_70' => 'Column 9 70',
			'column_9_71' => 'Column 9 71',
			'column_9_72' => 'Column 9 72',
			'column_9_73' => 'Column 9 73',
			'column_9_74' => 'Column 9 74',
			'column_9_75' => 'Column 9 75',
			'column_9_76' => 'Column 9 76',
			'column_9_77' => 'Column 9 77',
			'column_9_78' => 'Column 9 78',
			'column_9_79' => 'Column 9 79',
			'column_9_80' => 'Column 9 80',
			'column_9_81' => 'Column 9 81',
			'column_9_82' => 'Column 9 82',
			'column_9_83' => 'Column 9 83',
			'column_9_84' => 'Column 9 84',
			'column_9_85' => 'Column 9 85',
			'column_9_86' => 'Column 9 86',
			'column_9_87' => 'Column 9 87',
			'column_9_88' => 'Column 9 88',
			'column_9_89' => 'Column 9 89',
			'column_9_90' => 'Column 9 90',
			'column_9_91' => 'Column 9 91',
			'column_9_92' => 'Column 9 92',
			'column_9_93' => 'Column 9 93',
			'column_9_94' => 'Column 9 94',
			'column_9_95' => 'Column 9 95',
			'column_9_96' => 'Column 9 96',
			'column_9_97' => 'Column 9 97',
			'column_9_98' => 'Column 9 98',
			'column_9_99' => 'Column 9 99',
			'column_9_100' => 'Column 9 100',
			'ext_id' => 'Ext',
			'supplier_id' => 'Supplier',
			'product_id' => 'Product',
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
		$criteria->compare('transfer_master_id',$this->transfer_master_id);
		$criteria->compare('column_9_01',$this->column_9_01);
		$criteria->compare('column_9_02',$this->column_9_02,true);
		$criteria->compare('column_9_03',$this->column_9_03,true);
		$criteria->compare('column_9_04',$this->column_9_04,true);
		$criteria->compare('column_9_05',$this->column_9_05,true);
		$criteria->compare('column_9_06',$this->column_9_06,true);
		$criteria->compare('column_9_07',$this->column_9_07,true);
		$criteria->compare('column_9_08',$this->column_9_08,true);
		$criteria->compare('column_9_09',$this->column_9_09,true);
		$criteria->compare('column_9_10',$this->column_9_10,true);
		$criteria->compare('column_9_11',$this->column_9_11,true);
		$criteria->compare('column_9_12',$this->column_9_12,true);
		$criteria->compare('column_9_13',$this->column_9_13,true);
		$criteria->compare('column_9_14',$this->column_9_14,true);
		$criteria->compare('column_9_15',$this->column_9_15,true);
		$criteria->compare('column_9_16',$this->column_9_16,true);
		$criteria->compare('column_9_17',$this->column_9_17,true);
		$criteria->compare('column_9_18',$this->column_9_18,true);
		$criteria->compare('column_9_19',$this->column_9_19,true);
		$criteria->compare('column_9_20',$this->column_9_20,true);
		$criteria->compare('column_9_21',$this->column_9_21,true);
		$criteria->compare('column_9_22',$this->column_9_22,true);
		$criteria->compare('column_9_23',$this->column_9_23,true);
		$criteria->compare('column_9_24',$this->column_9_24,true);
		$criteria->compare('column_9_25',$this->column_9_25,true);
		$criteria->compare('column_9_26',$this->column_9_26,true);
		$criteria->compare('column_9_27',$this->column_9_27,true);
		$criteria->compare('column_9_28',$this->column_9_28,true);
		$criteria->compare('column_9_29',$this->column_9_29,true);
		$criteria->compare('column_9_30',$this->column_9_30,true);
		$criteria->compare('column_9_31',$this->column_9_31,true);
		$criteria->compare('column_9_32',$this->column_9_32,true);
		$criteria->compare('column_9_33',$this->column_9_33,true);
		$criteria->compare('column_9_34',$this->column_9_34,true);
		$criteria->compare('column_9_35',$this->column_9_35,true);
		$criteria->compare('column_9_36',$this->column_9_36,true);
		$criteria->compare('column_9_37',$this->column_9_37,true);
		$criteria->compare('column_9_38',$this->column_9_38,true);
		$criteria->compare('column_9_39',$this->column_9_39,true);
		$criteria->compare('column_9_40',$this->column_9_40,true);
		$criteria->compare('column_9_41',$this->column_9_41,true);
		$criteria->compare('column_9_42',$this->column_9_42,true);
		$criteria->compare('column_9_43',$this->column_9_43,true);
		$criteria->compare('column_9_44',$this->column_9_44,true);
		$criteria->compare('column_9_45',$this->column_9_45,true);
		$criteria->compare('column_9_46',$this->column_9_46,true);
		$criteria->compare('column_9_47',$this->column_9_47,true);
		$criteria->compare('column_9_48',$this->column_9_48,true);
		$criteria->compare('column_9_49',$this->column_9_49,true);
		$criteria->compare('column_9_50',$this->column_9_50,true);
		$criteria->compare('column_9_51',$this->column_9_51,true);
		$criteria->compare('column_9_52',$this->column_9_52,true);
		$criteria->compare('column_9_53',$this->column_9_53,true);
		$criteria->compare('column_9_54',$this->column_9_54,true);
		$criteria->compare('column_9_55',$this->column_9_55,true);
		$criteria->compare('column_9_56',$this->column_9_56,true);
		$criteria->compare('column_9_57',$this->column_9_57,true);
		$criteria->compare('column_9_58',$this->column_9_58,true);
		$criteria->compare('column_9_59',$this->column_9_59,true);
		$criteria->compare('column_9_60',$this->column_9_60,true);
		$criteria->compare('column_9_61',$this->column_9_61,true);
		$criteria->compare('column_9_62',$this->column_9_62,true);
		$criteria->compare('column_9_63',$this->column_9_63,true);
		$criteria->compare('column_9_64',$this->column_9_64,true);
		$criteria->compare('column_9_65',$this->column_9_65,true);
		$criteria->compare('column_9_66',$this->column_9_66,true);
		$criteria->compare('column_9_67',$this->column_9_67,true);
		$criteria->compare('column_9_68',$this->column_9_68,true);
		$criteria->compare('column_9_69',$this->column_9_69,true);
		$criteria->compare('column_9_70',$this->column_9_70,true);
		$criteria->compare('column_9_71',$this->column_9_71,true);
		$criteria->compare('column_9_72',$this->column_9_72,true);
		$criteria->compare('column_9_73',$this->column_9_73,true);
		$criteria->compare('column_9_74',$this->column_9_74,true);
		$criteria->compare('column_9_75',$this->column_9_75,true);
		$criteria->compare('column_9_76',$this->column_9_76,true);
		$criteria->compare('column_9_77',$this->column_9_77,true);
		$criteria->compare('column_9_78',$this->column_9_78,true);
		$criteria->compare('column_9_79',$this->column_9_79,true);
		$criteria->compare('column_9_80',$this->column_9_80,true);
		$criteria->compare('column_9_81',$this->column_9_81,true);
		$criteria->compare('column_9_82',$this->column_9_82,true);
		$criteria->compare('column_9_83',$this->column_9_83,true);
		$criteria->compare('column_9_84',$this->column_9_84,true);
		$criteria->compare('column_9_85',$this->column_9_85,true);
		$criteria->compare('column_9_86',$this->column_9_86,true);
		$criteria->compare('column_9_87',$this->column_9_87,true);
		$criteria->compare('column_9_88',$this->column_9_88,true);
		$criteria->compare('column_9_89',$this->column_9_89,true);
		$criteria->compare('column_9_90',$this->column_9_90,true);
		$criteria->compare('column_9_91',$this->column_9_91,true);
		$criteria->compare('column_9_92',$this->column_9_92,true);
		$criteria->compare('column_9_93',$this->column_9_93,true);
		$criteria->compare('column_9_94',$this->column_9_94,true);
		$criteria->compare('column_9_95',$this->column_9_95,true);
		$criteria->compare('column_9_96',$this->column_9_96,true);
		$criteria->compare('column_9_97',$this->column_9_97,true);
		$criteria->compare('column_9_98',$this->column_9_98,true);
		$criteria->compare('column_9_99',$this->column_9_99,true);
		$criteria->compare('column_9_100',$this->column_9_100,true);
		$criteria->compare('ext_id',$this->ext_id,true);
		$criteria->compare('supplier_id',$this->supplier_id);
		$criteria->compare('product_id',$this->product_id);

		return new CActiveDataProvider($this, array(
			'criteria'=>$criteria,
		));
	}

	/**
	 * Returns the static model of the specified AR class.
	 * Please note that you should have this exact method in all your CActiveRecord descendants!
	 * @param string $className active record class name.
	 * @return TransferDetail the static model class
	 */
	public static function model($className=__CLASS__)
	{
		return parent::model($className);
	}
	public function getWhereCondition($params) {
		$alais              = $params['alais'];
		$transfer_master_id = empty($params['transfer_master_id']) ? 0:$params['transfer_master_id'];
		$forTransferMasterPanel = empty($params['forTransferMasterPanel']) ? 0:$params['forTransferMasterPanel'];


        $sql_where = parent::getWhereCondition($params);

        if ($forTransferMasterPanel == 1){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.transfer_master_id = ". $transfer_master_id;
        }
        else if(!empty($transfer_master_id)){
            if(!empty($sql_where)){
                $sql_where.= " AND ";
            }
            $sql_where .= " {$alais}.transfer_master_id = ". $transfer_master_id;
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
    	$groupDir				= empty($params['groupDir']) ? 'asc':$params['groupDir'];
    	$forEntryPanel			= empty($params['forEntryPanel']) ? 0:$params['forEntryPanel'];
    	$mode   				= empty($params['mode']) ? null:$params['mode'];
        $company_id 			= Yii::app()->user->getAttr('company_id');
    	$select_fields 			= null;
    	if ((empty($fields) || count($fields) < 1) && $for_count != true && $all_columns != 1) {
    		$fields = $dgUtil->getDatagridFields($user_role,null,$datagrid_template_id);
    	}
    	
    	if ($for_count != true && $all_columns != 1)
    		$select_fields = $this->getSelectFields($fields);
    	else if($for_count != true && $all_columns == 1){
    		$select_fields = "t9.*";
    	}

    	$sql = "SELECT ";
    	if ($for_count == true){
			$sql .= " COUNT(*) as cnt";
    	}
		else {
			$sql .= "{$select_fields}, t9.id, t9.ext_id,t9.transfer_master_id,t9.supplier_id";
			
			$sql .= $this->getSyncStatusColumn('t9', $synctime, $user_id);
			// if($dgUtil->_datagrid_id=='16'){
			// 	$lock = t('orderMaster','order_detail_lock');
			// 	$sql .= ",(CASE WHEN (t9.column_9_35 <>'{$lock}' OR t9.column_9_35 IS NULL) THEN '1'
	  //           		ELSE '0' END) as is_matched";
			// }
			
    	}

    	$sql .= " from {$this->tableName()} as t9";

    	if(!$forEntryPanel == 1){
    		$sql.= " INNER JOIN ".t('tblSchema','hb_').".h_transfer_master t8 ON t8.id = t9.transfer_master_id AND t8.delete_flg = 0";
    	} else {
	    	// do nth
	    }
		if(!empty($synctime)) {
        	$sql .= " where (t9.updated_datetime > '{$synctime}'";
        }else {
			$sql .= " where  (t9.delete_flg = 0 ";
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
    		if($forEntryPanel == 1){
				$default_sort_order = "convert_tonumeric(t9.column_9_19) ASC";
    		}
			else
				$default_sort_order = "t9.column_9_01 DESC";
			$sort_order = $this->getSortOrder('t9', $sort, $default_sort_order);
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

