<?php
class MsgTabController extends PrivateController {
    public function __construct($arg = NULL) {
        parent::__construct($arg);
        $this->_datagrid_id = null;
        $this->_controller_name = 'message';
        $this->_model_name ='Comment';
        $this->_table_name = 'yig_comment';
        $this->_pk_col = 'comment_id';
        $this->_keyword_searchable_fields = null;
    }

    public function actionGetMessageList() {
        $request        	= Yii::app()->request;
        $limit          	= $request->getParam('limit',null);
        $pageSize       	= $limit;
        // $pageSize       	= $request->getParam('page_size',null);
        $page           	= $request->getParam('start',0);
        $load_data      	= $request->getParam('loadData', true);

        $active_obj         = CJSON::decode($request->getParam('active_obj', true));
        $inactive_arr       = CJSON::decode($request->getParam('inactive_arr', true));

        $ref_table          = !empty($active_obj['t']) ? $active_obj['t'] : null;
        $ref_record_id      = !empty($active_obj['r']) ? $active_obj['r'] : null;
        $app_name           = !empty($active_obj['app']) ? $active_obj['app'] : null;
        /*for union of horenso and order*/
        $ref_order_table_id = !empty($active_obj['ref_id']) ? $active_obj['ref_id'] : null;
        $ref_order_app_name = !empty($active_obj['ref_app']) ? $active_obj['ref_app'] : null;

        $countArr = array();
        foreach ($inactive_arr as $key => $value) {
        	$inactive_ref_table    = $value['t'];
            $inactive_record_id    = $value['r'];
        	$inactive_app_name     = $value['app'];
        	$inactive_tab_count    = Comment::model()->getMessageCount($inactive_ref_table, $inactive_record_id,$inactive_app_name);
        	if(!$inactive_tab_count) {
        		$inactive_tab_count = array();
        		$inactive_tab_count['total'] = "0";
        	}
        	$inactive_tab_count['app_name'] = $inactive_app_name;
        	array_push($countArr, $inactive_tab_count);
        }
        if(!empty($ref_order_table_id)) {
            $total = Comment::model()->getUnionMessageCount($ref_table, $ref_record_id,$app_name,$ref_order_table_id,$ref_order_app_name);
        } else {
            $total = Comment::model()->getMessageCount($ref_table, $ref_record_id,$app_name);
        }

        $total['app_name'] = $app_name;
        array_push($countArr, $total);

        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total['total'], $page, $pageSize);
        if($load_data === true) {
        	$getListDataFuncParams = array(
	            'limit'			=> $limit,
	            'page'			=> $page,
	            'ref_table'		=> $ref_table,
	            'ref_record_id'	=> $ref_record_id,
	            'app_name'      => $app_name,
	            'all_records'	=> true,
                'ref_order_table_id'=>$ref_order_table_id,
                'ref_order_app_name'=>$ref_order_app_name
	        );
            if(!empty($ref_order_table_id)) {
                $result= Comment::model()->getUnionMessageList($getListDataFuncParams);
            } else {
                $result= Comment::model()->getMessageList($getListDataFuncParams);
            }
        } else {
            $result=null;
        }
        $data = array(
            'success'       => TRUE,
            'total'         => $total['total'],
            'tab_count_arr' => $countArr,
            'current_page'  => $currentPage + 1,
            'total_pages'   => $totalPages,
            'pageSize'      => $pageSize,
            'isLast'        => $isLast,
            'data'          => $result
        );
        $this->renderJSON($data);
    }
    public function actionSaveMessage($commentParams = null) {
        $request                = Yii::app()->request;
        $user_id                = Yii::app()->user->getAttr('user_id');
        $active_obj             = CJSON::decode($request->getParam('comment_obj', true));
        $comment                = !empty($active_obj['comment']) ? $active_obj['comment'] : null;
        $ref_record_id          = !empty($active_obj['ref_record_id']) ? $active_obj['ref_record_id'] : null;
        $ref_table              = !empty($active_obj['table_id']) ? $active_obj['table_id'] : null;
        $comment_id             = !empty($active_obj['comment_id']) ? $active_obj['comment_id'] : null;
        $created_by             = !empty($active_obj['created_by']) ? $active_obj['created_by'] : null;
        $app_name               = !empty($active_obj['app_name']) ? $active_obj['app_name'] : null;
        $opt                    = !empty($active_obj['opt']) ? $active_obj['opt'] : null;
        $customer_table_id      = !empty($active_obj['customer_table_id']) ? $active_obj['customer_table_id'] : null;
        $customer_ref_rec_id    = !empty($active_obj['customer_ref_rec_id']) ? $active_obj['customer_ref_rec_id'] : null;
        $customer_app_name      = !empty($active_obj['customer_app_name']) ? $active_obj['customer_app_name'] : null;
        $order_master_id        = !empty($active_obj['order_master_id']) ? $active_obj['order_master_id'] : null;
        $tpl_data               = !empty($active_obj['tpl_data']) ? $active_obj['tpl_data'] : null;
        $result                 = $this->_checkUser($created_by);
        if(!$result) {
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','Invalid Credentials'),
            );
            echo CJSON::encode($arr);
            exit;
        }
        $model = new Comment;
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            /*updates the comment*/
            if(!empty($comment_id)) {
                $isLatest = $this->checkLatestOrderComment($comment_id,$ref_table, $ref_record_id, $app_name);
                if($isLatest['is_latest'] && $ref_table == 1) {
                    $orderMasterModel = new OrderMaster();
                    $updated_datetime = new CDbExpression('NOW()');
                    $orderMasterModel->updateByPk($order_master_id, array(
                        'column_1_98'=>$comment,
                        'column_1_99'=>$opt,
                        'updated_datetime'=>$updated_datetime,
                        'updated_by'=>$user_id
                    ));
                }
                $updated_datetime = new CDbExpression('NOW()');
                $model->updateByPk($comment_id, array(
                    'comment'=>$comment,
                    'updated_datetime'=>$updated_datetime,
                    'updated_by'=>$user_id,
                    'column_14_03'=>$opt
                ));
            } 
            /*inserts new comment*/
            else {
                if(empty($ref_table) || empty($ref_record_id)) {
                    $transaction->rollback();
                    $arr = array(
                        'success'   => false,
                        'msg'       => 'invalid refTable or refRecordId'
                    );
                    $this->renderJSON($arr);
                }
                if(!empty($ref_table) && $ref_table ==1 && empty($order_master_id)) {
                    $transaction->rollback();
                    $arr = array(
                        'success'   => false,
                        'msg'       => 'empty orderMasterId'
                    );
                    $this->renderJSON($arr);
                }
                /*inserts new comment in OrderMaster table*/
                if($ref_table == 1) {
                    $orderMasterModel = new OrderMaster();
                    $updated_datetime = new CDbExpression('NOW()');
                    $orderMasterModel->updateByPk($order_master_id, array(
                        'column_1_98'=>$comment,
                        'column_1_99'=>$opt,
                        'updated_datetime'=>$updated_datetime,
                        'updated_by'=>$user_id
                    ));
                }
                $model->comment = $comment;  
                $model->ref_table=$ref_table;
                $model->ref_record_id=$ref_record_id;
                //commented and is updated only when data is edited
                // $model->updated_datetime = new CDbExpression('NOW()');
                $model->created_datetime = new CDbExpression('NOW()');
                $model->created_by = $user_id;
                $model->delete_flg = 0;
                $model->column_14_02 = $app_name;
                $model->column_14_03 = $opt;
                $model->save();
            }
            /*for double data entry*/
            if(!empty($customer_table_id) && !empty($customer_ref_rec_id)) {
            	$model 						= new Comment;
            	$model->comment 			= $comment;  
                $model->ref_table 			= $customer_table_id;
                $model->ref_record_id 		= $customer_ref_rec_id;
                //commented and is updated only when data is edited
                // $model->updated_datetime = new CDbExpression('NOW()');
                $model->created_datetime 	= new CDbExpression('NOW()');
                $model->created_by 			= $user_id;
                $model->delete_flg			= 0;
                $model->column_14_02 		= $customer_app_name;
                $model->column_14_03 		= $opt;
                $model->save();
            }
            /*for status update*/ 
            if(!empty($tpl_data)) {
                $model = new OrderMaster;
                $updated_datetime = new CDbExpression('NOW()');
                $update_data_array = array(
                    'updated_datetime'=>$updated_datetime,
                    'updated_by'=>$user_id,
                    $tpl_data['option_1']=>$comment
                );
                if(!empty($tpl_data['option_2']) && !empty($tpl_data['option_3'])) {
                    $idx = $tpl_data['option_2'];
                    $update_data_array[$idx] = $tpl_data['option_3'];
                }
                $model->updateByPk($tpl_data['order_master_id'], $update_data_array);
            }
            $transaction->commit();
            

            $result = array(
                'success' => true,
                'msg' => Yii::t('TaskList','savedComment'),
            );
            $this->renderJSON($result);
        }
        catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
        }
    }
    public function actionDeleteMessage() {
        $request            = Yii::app()->request;
        $user_id            = Yii::app()->user->getAttr('user_id');
        $active_obj         = CJSON::decode($request->getParam('comment_obj', true));
        $comment_id         = !empty($active_obj['comment_id']) ? $active_obj['comment_id'] : null;
        $ref_record_id      = !empty($active_obj['ref_record_id']) ? $active_obj['ref_record_id'] : null;
        $ref_table          = !empty($active_obj['table_id']) ? $active_obj['table_id'] : null;
        $comment_id         = !empty($active_obj['comment_id']) ? $active_obj['comment_id'] : null;
        $created_by         = !empty($active_obj['created_by']) ? $active_obj['created_by'] : null;
        $app_name           = !empty($active_obj['app_name']) ? $active_obj['app_name'] : null;
        $order_master_id    = !empty($active_obj['order_master_id']) ? $active_obj['order_master_id'] : null;
        $validUser          = $this->_checkUser($created_by);
        if(!$validUser) {
            $arr = array(
                'success' => false,
                'msg' => Yii::t('general','Invalid Credentials'),
            );
            echo CJSON::encode($arr);
            exit;
        }
        $model = new Comment;
        if(!empty($comment_id)) {
            $isLatest = $this->checkLatestOrderComment($comment_id,$ref_table, $ref_record_id, $app_name);
            if($isLatest['is_latest'] && $ref_table == 1) {
                $orderMasterModel = new OrderMaster();
                $updated_datetime = new CDbExpression('NOW()');
                $orderMasterModel->updateByPk($order_master_id, array(
                    'column_1_98'=>null,
                    'updated_datetime'=>$updated_datetime,
                    'updated_by'=>$created_by
                ));
                $model->updateByPk($comment_id, array('delete_flg'=>'1'));
                /*inserts new comment in order*/
                $isLatest = $this->checkLatestOrderComment(null,$ref_table, $ref_record_id, $app_name);
                $orderMasterModel = new OrderMaster();
                $updated_datetime = new CDbExpression('NOW()');
                $orderMasterModel->updateByPk($order_master_id, array(
                    'column_1_98'=>$isLatest['comment'],
                    'updated_datetime'=>$updated_datetime,
                    'updated_by'=>$created_by
                ));
            }else {
                $model->updateByPk($comment_id, array('delete_flg'=>'1'));
            }
            $arr = array(
                'success' => true
            );
            echo CJSON::encode($arr);
        } 
    }
    private function _checkUser($created_by) {
        $user_id=Yii::app()->user->getAttr('user_id');
        if($user_id == $created_by) {
            return true;
        }else {
            return false;
        }
    }
    /*checks if the edited comment is the latest for particular order data*/
    public function checkLatestOrderComment($comment_id,$ref_table, $ref_record_id, $app_name) {
        $getListDataFuncParams = array(
            'ref_table'     => $ref_table,
            'ref_record_id' => $ref_record_id,
            'app_name'      => $app_name,
            'all_records'   => false
        );
        $result = Comment::model()->getMessageList($getListDataFuncParams);
        $resp_array=array(
            'is_latest'=>false,
            'comment'=>null
        );
        if(!empty($comment_id) && $result['comment_id'] == $comment_id) {
            $resp_array['is_latest'] = true;
        }
        $resp_array['comment'] = $result['comment'];
        return $resp_array;
    }
    public function actionGetStatusComboConfig() {
        $field_option_id = Yii::app()->request->getParam('field_option_id',17);
        $fld = $this->getStatusComboConfig($field_option_id);
        $data = array(
            'success' => TRUE,
            'statusComboConfig'=>$fld
        );
        $this->renderJSON($data);
    }
    public  function getStatusComboConfig($field_option_id){
        $dgUtil = new  DatagridUtil;
        $sysFieldOptionDataUtil =  new SysFieldOptionDataUtil;
        $cmp = $sysFieldOptionDataUtil->getSysFieldOptionRecord($field_option_id);
        $userRole =  Yii::app()->user->getAttr('userRole');
        $fld = array();
        $dgUtil->_datagrid_id = $cmp['datagrid_id'];
        $fld['datagrid_component'] = $dgUtil->getDatagridColumnInfo($userRole,null,null); 
        $fld['editable'] = TRUE;
        $fld['displayField'] = $cmp['key_column'];
        $fld['valueField'] = $cmp['value_column'];
        $fld['queryMode'] = 'remote';
        $fld['store_url'] = $cmp['store_url'];
        $fld['option_data'] = $cmp['option_data'];
        $fld['is_form_combo_grid'] = $cmp['is_form_combo_grid'] == 1 ? TRUE : FALSE;
        return $fld;
    }
}
?>