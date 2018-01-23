<?php

class FileController extends PrivateController
{
    protected $_allowed_file_types;

    public function __construct($arg = NULL)
    {
        parent::__construct($arg);
        $this->_datagrid_id = 14;
        $this->_controller_name = 'file';
        $this->_model_name ='AppFile';
        $this->_table_name = 'app_file';
        $this->_pk_col = 'file_id';
        $this->_allowed_file_types = array('jpg','jpeg','png','pdf');
    }
    public function actionList() {
        $app = Yii::app();
        $request = $app->request;
        $app = Yii::app();
        $request = $app->request;
        $filter_params = $request->getParam('filter', null);
        $get_columns = $request->getParam('get_columns', 0);
        $ref_record_id = $request->getParam('ref_record_id', 0);

        $datagrid_id = $request->getParam('datagrid_id', 0);
        if (empty($datagrid_id)){
            //if datagrid_id is not passed by client side then use controller assigned datagrid_id
            $datagrid_id = $this->_datagrid_id;
        }

        $keywords = $request->getParam('query', null);
        $page = $request->getParam('page', 1);

        $user_info = $app->user->getUserInfo();
        $user_role = $user_info['userRole'];
        $user_id = $user_info['user_id'];

        $set_template_id = null;
        $template_id = $request->getParam('template_id', null);
        $search_id = $request->getParam('search_id', null);
        $default = Yii::t('datagridTemplateHelper','default');
         if (empty($template_id)){
            //if template_id is not passed then only set_template_id will work
            $set_template_id = $request->getParam('set_template_id', null);
            if(!empty($set_template_id)) {
                if($set_template_id == $default) {
                    $set_template_id=null;
                }
                $this->setTemplate($datagrid_id,$set_template_id);
                $template_id = $set_template_id;
            }
        }
        $get_template_list = $request->getParam('get_template_list', false);
        if($get_template_list) {
            $templates = $this->getTemplates($datagrid_id, $user_id);
        }
        else {
            $templates['template_id']=null;
            $templates['templateList']=null;
        }
        /*gets the saved search list*/
        $searchList = $request->getParam('get_search_list', false);
        if($searchList) {
            $searchList = Search::model()->getSearchResult($datagrid_id, $user_id);
        }
        else {
            $searchList=null;
        }

         /*param sent from client side for all page CSV dwnld*/
        $clientPage = $request->getParam('pages',null);
        
        $save_page_size = $request->getParam('save_page_size', 0);
        $sort = CJSON::decode($request->getParam('sort', ''),true);
        $page_size = $request->getParam('limit', 0);

        if (!empty($save_page_size) && $save_page_size > 0)
        {
            UserPreference::model()->saveDatagridPageSize($user_id, $this->_datagrid_id, $save_page_size);
        }    


        $filesModel = AppFile::model();
        
        $alais = "t19";

        $sql_where_rolewise = null;

        $grid_header_filter_sql = Search::model()->getGridHeaderFilterSql($filter_params);
        $getWhereConditionParams = array(
            'keyword_searchable_fields' => $this->_keyword_searchable_fields,
            'alais'                     => $alais,
            'keywords'                  => $keywords,
            'grid_header_filter_sql'    => $grid_header_filter_sql,
        );
        $sql_where = $filesModel->getWhereCondition($getWhereConditionParams);
        $col_info = array();
        
        $dgUtil = new DatagridUtil();
        $dgUtil->_datagrid_id = $datagrid_id;
        $filter_components=array();
        $helpTextInfo=array();
        if ($get_columns == 1)
        {
            $col_info = $dgUtil->getColumnInfo($user_role,null,$templates['template_id']);
            $fields = $col_info['fields'];

            $column_fields = array_merge($fields);      
            $column_fields[] = array('name' => 'id','mapping' => 'id');
            $column_fields[] = array('name' => 'ext_id','mapping' => 'ext_id');
            $column_fields[] = array('name' => 'file_status','mapping' => 'file_status');

            $col_info['fields'] = $column_fields;
            $datagrid_info = $col_info['datagrid_info'];
           // $helpTextInfo = HelpText::model()->getRespectiveHelp($dgUtil->_datagrid_id);
        }
        else
        {
            $datagrid_info = $dgUtil->getDatagridInfo($user_role);
        }
        if($clientPage == 'allPages')
            $page_size = 2000;
        else {
            if (empty($page_size))
                $page_size = $datagrid_info['page_size'] > 0 ? $datagrid_info['page_size'] : 100;
        }
        $startFrom= 0;
        $getListDataFuncParams = array(
            'for_count'             => true,
            'sql_where'             => $sql_where,
            'user_role'             => $user_role,
            'fields'                => null,
            'pageSize'              => $page_size,
            'startFrom'             => $startFrom,
            'sort'                  => $sort,
            'dgUtil'                => $dgUtil,
            'datagrid_template_id'  => $templates['template_id'],
            'ref_record_id'    =>$ref_record_id
        );
        $total = $filesModel->getListData($getListDataFuncParams);


        //pagination
        list($totalPages, $startFrom, $currentPage, $isLast) = $this->getDatagridPagination($total, $page, $page_size);
        //end pagination

        $getListDataFuncParams['for_count'] = false;
        $recordData = $filesModel->getListData($getListDataFuncParams);
        
        $searchTemplateData = Search::model()->getTemplateSearchResult($datagrid_id,$user_id);
        foreach ($searchTemplateData as $key => $value) {
            $search_criteria = CJSON::decode($value['search_criteria']);
            $search_criteria = $this->checkDate($search_criteria);
            // $search_criteria = $this->_checkToday($search_criteria);
            $searchTemplateData[$key]['search_criteria']=$search_criteria;
        }
       /* if(empty($auction_product_id)){
            $total = $totalPages =  $recordData = $page_size = '';
        }*/
       
        $data = array(
            'success' => TRUE,
            'total' => $total,
            'current_page' => $currentPage + 1,
            'total_pages' => $totalPages,
            'page_size' => $page_size,
            'isLast' => $isLast,
            'columns' => array_key_exists('columns', $col_info) ? $col_info['columns'] : array(),
            'fields' => array_key_exists('fields', $col_info) ? $col_info['fields'] : array(),
            'data' => $recordData,
            'filter_components' =>$filter_components,
            'templateList'=>$templates['templateList'],
            'templateId'=>$templates['template_id'],
            'searchList'=>$searchList,
            'searchTemplateData' =>$searchTemplateData,
            'synctime' =>date('Y-m-d H:i:s'),
            'helpTextInfo' => $helpTextInfo
        );
        if($clientPage == 'allPages')
        {
            $prefix = 'auctionMaster';
            $allPageCsv = new AllPageCsv();
            /*column parameter sent to get columns instead of using datagrid_id for getting columns*/
            $allPageCsv->getAllCsvDownload($recordData,$datagrid_id, $prefix, $col_info['columns']);
        }
        else
            $this->renderJSON($data);
    }
    private  function _updateRecord($orderFilesRow) {
        $model = AppFile::model();
        //if  delete flg  set as 1  then only move file;
        if(array_key_exists('delete_flg', $orderFilesRow)){
            if($orderFilesRow['delete_flg']=='1'){
                $filename      =  $orderFilesRow['file_name'];
                $actionType    = 'completedToNew';
                $ref_record_id =  $orderFilesRow['ref_record_id'];
                FBUtility::moveFile($filename,$actionType,$ref_record_id);
            }
        }
        $model->updateByPk($orderFilesRow['file_id'],$orderFilesRow);
    }

    private function _insertRecord($OrderFilesRow,$user_id, $model) {
        $model->attributes = $OrderFilesRow;
        $model->created_by = $user_id; //user id
        $model->created_datetime = new CDbExpression('NOW()');
        $result = $model->save();
        return $result;
    }

    public function actionUploadMultipleImage() {
        $app = Yii::app();
        $request = $app->request;
        $file_field = "file";
        $file = $_FILES[$file_field];
        $file_name = $file["name"];
        $file_type = $file["type"];
        $ref_record_id =  $request->getParam('ref_record_id',1);
        //to get extension of imagefile
        $extension = pathinfo($file_name, PATHINFO_EXTENSION);
        $extension = strtolower($extension);
        //$validExtension = array('jpg','JPG','png','PNG','bmp','BMP','JPEG','jpeg','txt','TXT','doc','docx','ppt','pptx');
        $inValidExtension = array('exe','bat');
        if(!empty($file_name)) {
            if(!in_array($extension, $inValidExtension)){
                $tmp_name = $file["tmp_name"];
                $absolute_path = Yii::app()->params['absolute_path'];
                $relative_path = $absolute_path.$ref_record_id;
                FBUtility::isDirExist($relative_path,true);
                // if(!is_dir($absolute_path.$ref_record_id)){
                //     mkdir($absolute_path.$ref_record_id,0777);
                // }
                $file_size =  $file['size'];
                if($file_size<MAX_FILE_SIZE){
                    if (move_uploaded_file($tmp_name, $relative_path.'/'.$file_name)) {
                        $app = Yii::app();
                        $original_file_name =  $file_name;
                        $row = array(
                                'file_name' => $file_name,
                                'original_file_name' => $original_file_name
                            );
                        $result = $this->_save($row,$ref_record_id,null,$relative_path);
                        
                        // $files = File::model();
                       // $auctionProductModel = AuctionProduct :: model();
                        // $files->ref_record_id =  $ref_record_id;
                        // $files->ref_table_id =  1;
                        // $files->original_file_name =  $original_file_name;
                      
                        // $files->extension =  $extension;
                        // $getDisplayOrder = $files->getDisplayOrder($ref_record_id);
                        // $files->file_tag = $getDisplayOrder;
                        //$files->display_order = $getDisplayOrder;
                        // $files->created_by = $user_id;
                        // $files->created_datetime = date('Y-m-d H:i:s');
                        // $files->is_draft = 1;
                        // $save = $files->save();

                        // $oldFileName =  $relative_path.'/'.$original_file_name;
                        // $newfile_name = $files->file_id.'.'.$extension;//new  file name with extensions.
                        // $newfile_path = $ref_record_id.'/'.$newfile_name; // new  file path  and  file  name.
                        // $newFileName =  $relative_path.'/'.$files->file_id.'.'.$extension;
                        // rename($oldFileName, $newFileName);

                        // $concatOrginalFileName = $newfile_path.FILENAME_IMPLODE_TEXT.$original_file_name;
                        // $validExtension = array('png','jpg','jpeg','bmp');
                        // $fileInfo =  array();
                        // $fileInfo['id'] = $files->file_id;
                        // $fileInfo['file_name'] = $newfile_name;
                        // $fileInfo['file_path'] = $concatOrginalFileName;
                        // if(in_array($extension, $validExtension)){
                        //     $fileInfo['display_order'] = $getDisplayOrder;
                        // }
                        // $updateAuctionFiles =  $files->updateByPk($fileInfo['id'], $fileInfo);

                        /*if($getDisplayOrder==1){
                            $auctionDetail = array();
                            $auctionDetail['file_id'] = $files->file_id;
                            $auctionDetail['file_path'] = $concatOrginalFileName;
                            $updateAuction = $this->updateAuctionProduct($auctionDetail,$auctionProductModel,$auction_product_id);
                        }*/

                        if($result['success']== TRUE){
                            $lastRecord  = AppFile::model()->getLastOrderFiles($ref_record_id);
                            $arr = array('success' => true, 'msg' => t('fileupload','File Uploaded'),'data'=>$lastRecord);
                        }
                        else
                        $arr = array('success' => true, 'msg' =>t('fileupload','Cannot save in table ImageUpload'),'data'=>array());
                        
                    } else {
                        $arr = array('success' => false, 'msg' =>t('fileupload','Upload file failed '));
                    }
                }
                else{
                      $arr = array('success' => false, 'msg' =>t('fileupload','Upload file size too large'));
                }
            }
            else{
                $arr = array('success' => false, 'msg' =>t('fileupload','Exe Extension file not Supported for upload'));
            }
        } else {
            $arr = array('success' => false, 'msg' =>t('fileupload','File is empty or not image type'));
        }
        $this->renderJSON($arr);
    }

    public function actionSaveFile(){
        $user_info = Yii::app()->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $orderFilesDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $ref_record_id = CJSON::decode(Yii::app()->request->getParam('ref_record_id',0));
        
        try{
            $absolute_path = Yii::app()->params['absolute_path'];
            $original_file_path = Yii::app()->params['file_list_path'].'temp'.DS.$ref_record_id;
            $relative_path = $absolute_path.$ref_record_id;
            FBUtility::isDirExist($relative_path,true);
            foreach ($orderFilesDataRows as $key => $orderFilesRow) {
                
                $response = $this->_save($orderFilesRow,$ref_record_id,$key,$relative_path,$original_file_path);
                if($response['success'] == FALSE){
                    break;
                }
            }
            $this->renderJSON($response);
            // echo CJSON::encode($response);
        }
        catch(Exception $e){
            $response = array('success' => FALSE,'error' => $e);
            $this->renderJSON($response);
        }
    }

    protected function _save($row,$ref_record_id,$rowIdx,$relative_path,$original_file_path=null){
        $is_new = FALSE;
        if(empty($original_file_path))
            $original_file_path = $relative_path;
        if(!array_key_exists('file_id', $row) || (array_key_exists('file_id', $row) && empty($row['file_id']))){
            $files = new AppFile;
            $row['file_id'] = $files->getNextSeqValue('app_file_file_id_seq');
            $files->file_id = $row['file_id'];
            $files->is_draft = 1;
            $is_new = TRUE;
        }
        else{
            $files = AppFile::model()->findByAttributes(array('file_id' => $row['file_id'],'delete_flg' => 0));
            $files->isNewRecord = FALSE;
        }
        $extension = pathinfo($row['file_name'], PATHINFO_EXTENSION);
        $extension = strtolower($extension);
        
        $files->ref_record_id =  $ref_record_id;
        $files->ref_table_id =  1;
        $files->original_file_name =  $row['original_file_name'];
        $files->extension =  $extension;
        if(array_key_exists('delete_flg',$row)){
            $files->delete_flg = $row['delete_flg'];
        }
        // $files->file_tag = $getDisplayOrder;
        $files->display_order = empty($rowIdx) ? $files->getDisplayOrder($ref_record_id) : ($rowIdx + 1);
        
        $oldFileName  = $original_file_path.'/'.$row['original_file_name'];
        $newfile_name = $files->file_id.'.'.$extension;//new  file name with extensions.
        $newfile_path = $ref_record_id.'/'.$newfile_name; // new  file path  and  file  name.
        $newFileName  = $relative_path.'/'.$files->file_id.'.'.$extension;
        
        $concatOrginalFileName = $newfile_path.FILENAME_IMPLODE_TEXT.$row['original_file_name'];
            
        if($is_new == TRUE){
            $files->file_name = $newfile_name;
            $files->file_path = $concatOrginalFileName;
        }


        if($files->save()){
            if($is_new == TRUE){
                rename($oldFileName, $newFileName);
            }
            return array('success' => TRUE);
        }
        else
            return array('success' => FALSE, 'msg' => $files->getError());
        
    }

   /* public function updateAuctionProduct($fileInfo,$model, $auction_product_id){
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        $auctionDetail = $model->findByAttributes(array('column_4_01'=>$auction_product_id));
        $auctionDetail['column_4_22'] =  $fileInfo['file_path'];
        $auctionDetail['column_4_21'] = $fileInfo['file_id'];
        $model->updateByPk($auctionDetail['id'],$auctionDetail);
        $transaction->commit();
    }*/

    public function actionGridUpdate() {
        $user_info = Yii::app()->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $orderFilesDataRows = CJSON::decode(Yii::app()->request->getParam('data'));
        $ref_record_id = CJSON::decode(Yii::app()->request->getParam('ref_record_id',0)); 
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            foreach ($orderFilesDataRows as $orderFilesRow) {
                   $orderFilesRow = array_map('trim', $orderFilesRow);
                $model =  new AppFile;
                if (@empty($orderFilesRow['file_id'])) {
                    $mode = $this->_insertRecord($orderFilesRow, $user_id, $model);
                } else {
                    $mode = $this->_updateRecord($orderFilesRow);
                } 
            }
            $transaction->commit();
            $arr = array(
                'success' => true,
                'msg' => Yii::t('general','saveSuccess')
            );
        } catch (Exception $e) {
            $transaction->rollback();
            Yii::app()->user->setFlash('error', "{$e->getMessage()}");
            $arr = array(
                'success' => false,
                'msg' => $e->getMessage()
            );
        }
        $this->renderJSON($arr);
    }
    public function actionDeleteOrderFiles(){
        $app = Yii::app();
        $request = $app->request;
        $user_info = $app->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $orderFilesId = $request->getParam('id',null);
        $order_master_id =  $request->getParam('order_master_id',null);
        //$sku_component_id =  $request->getParam('sku_component_id',null);
            $absolute_path = Yii::app()->params['absolute_path'];
            $model  = OrderFiles::model();
            $getOrderFilesName = $model->getdeleteOrderFiles($user_id, $order_master_id, $orderFilesId);
                if($getOrderFilesName){
                    foreach ($getOrderFilesName as  $filename) {
                        @unlink($absolute_path.$filename['order_master_id'].'/'.$filename['id'].'.'.$filename['extension']);
                    }
                }
            $deleteOrderFiles =  $model->deleteOrderFile($user_id, $order_master_id, $orderFilesId);
                if($deleteOrderFiles){
                    $arr = array(
                        'success' => true,
                        'msg' => Yii::t('general','removed order Files Success')
                    );
                }
                else{
                    $arr = array(
                        'success' => false,
                        'msg' => Yii::t('general','removed order Files Fail')
                    );
                }
                $this->renderJSON($arr);
    }

    public function actionRenderImg(){
        $file_id = Yii::app()->request->getParam('file_id', 0);
        $file_path = Yii::app()->request->getParam('file_path', 0);
        $action = Yii::app()->request->getParam('action', '');
        $table_id = 4;
        if (!empty($file_id))
        {
            FBUtility::renderImage($file_id, $table_id, $action);
        }
        else
        {
            FBUtility::renderFile($file_path, $table_id, $action);
        }
    }
    public function actionDeleteFile(){
        $file_id = Yii::app()->request->getParam('file_id');
        $ref_record_id = Yii::app()->request->getParam('ref_record_id');
        //$new_displayOrder_file = array();
        $model = AppFile::model();
        $minDisplayOrder=$model->getMinDisplayOrder($ref_record_id);
        $fileModel = $model->findByPk($file_id);
        if($fileModel['display_order']==$minDisplayOrder){
            $newDisplayRecord=$fileModel->getFileIdByDisplayOrder($minDisplayOrder+1,$ref_record_id);

            // $auctionProductModel = AuctionProduct :: model();
            // $auctionDetail = $auctionProductModel->findByAttributes(array('column_4_01'=>$auction_product_id));
            // $auctionDetail['column_4_21'] = $newDisplayRecord['file_id'];
            // $auctionDetail['column_4_22'] = $newDisplayRecord['file_path'];
            // $auctionProductModel->updateByPk($auctionDetail['id'],$auctionDetail);
            // $new_displayOrder_file['file_id'] =  $newDisplayRecord['file_id'];
            // $new_displayOrder_file['file_path'] =  $newDisplayRecord['file_path'];
        }
        $updateRecord = $model->updateByPk($file_id,array('delete_flg'=>1));
        if($updateRecord){
         $arr=array('success'=>TRUE,
                    'msg'=>t('general','delete success'));
          echo CJSON::encode($arr);
        }
    }
    public function actionUpdateDisplayOrder(){
        $auction_product_id = Yii::app()->request->getParam('auction_product_id');
        $fileRows = CJSON::decode(Yii::app()->request->getParam('fileRows'),true);
        $new_displayOrder_fileId = '';
         /*begin transaction*/
            $connection=Yii::app()->db;
            $transaction=$connection->beginTransaction();
            try {
                $display_order = 0;
                    foreach ($fileRows as $fileRow) {
                        $display_order=$display_order+1;
                        $newFileDetails= $this->updateDisplayOrderFile($fileRow,$display_order,$auction_product_id);
                        if(!empty($newFileDetails))
                            $new_displayOrder_file = $newFileDetails;
                    }
                    $transaction->commit();
                    $arr=array(
                        'success'=>TRUE,
                        'msg'=>Yii::t('fieldSetting', 'saved'),
                        'new_displayOrder_file'=>$new_displayOrder_file
                    );
                }
                catch (Exception $e) {
                $transaction->rollback();
                $arr=array(
                    'success'=>FALSE,
                    'msg'=>$e->getMessage()
                );
            }
            echo CJSON::encode($arr);
    }
    private function updateDisplayOrderFile($fileRow,$display_order,$auction_product_id){
        $file_id = $fileRow['file_id'];
        $model = AppFile::model();
        $model->updateByPk($file_id,array('display_order'=>$display_order));
        if($display_order==1){
            $getFilePath =  $model->findByPk($file_id);
            $auctionProductModel = AuctionProduct :: model();
            $auctionDetail = $auctionProductModel->findByAttributes(array('column_4_01'=>$auction_product_id));
            $auctionDetail['column_4_21'] = $file_id;
            $auctionDetail['column_4_22'] = $getFilePath['file_path'];
            $auctionProductModel->updateByPk($auctionDetail['id'],$auctionDetail);
            $fileDetail = array('file_path'=>$getFilePath['file_path'], 'file_id'=>$file_id);
            return $fileDetail;
        }
    }
    // public function actionDownloadFile(){
    //     $app = Yii::app();
    //     $request = $app->request;
    //     $src=Yii::app()->getRequest()->getQuery('src');
    //     $order_master_code=Yii::app()->getRequest()->getQuery('order_master_code');
    //     $id=Yii::app()->getRequest()->getQuery('id');
    //     $ext = pathinfo($src, PATHINFO_EXTENSION);
    //     $fb_absolute_path = Yii::app()->params['absolute_path'];
    //     $source=$fb_absolute_path.$order_master_code.'/'.$id.'.'.$ext;
    //     //$fileName=$id.'.'.$ext;
    //     $fileName=Yii::app()->getRequest()->getQuery('filename');
    //     header('Content-Type: application/octet-stream');
    //     header('Cache-Control: jpayotyahi-to-fix-ie8-issue'); //public, no-cache
    //     header("Content-Disposition: attachment; filename={$fileName}"); 
    //     header('Content-Length: ' . filesize($source));
    //     ob_clean();
    //     flush();
    //     readfile($source);
    // }

    public function actionGetFilesList(){
        $filebox = Yii::app()->params['file_list_path'].'new';
        $baseUrl = getMainUrl(false);
        $fileArr = array();
        if(is_dir($filebox)){
            $files = scandir($filebox);
            
            foreach ($files as $file) {
                $ext = pathinfo($file, PATHINFO_EXTENSION);
                
                if($file == "." || $file== ".." || !in_array($ext, $this->_allowed_file_types))
                    continue;
                $fileArr[] = array(
                            'file_name' => $file,
                            'original_file_name' => $file,
                            'extension' => $ext,
                            'src' => $baseUrl.'bizlayer/file/renderFile?filename='.$file,
                        );
            }
        }

        echo CJSON::encode(array('success' => TRUE, 'data' => $fileArr));
    }

    public function actionRenderFile(){
        $filebox = Yii::app()->params['file_list_path'];
        $filename = Yii::app()->request->getParam('filename',null);
        $type = Yii::app()->request->getParam('type','new');
        $ref_record_id = Yii::app()->request->getParam('ref_record_id',null);
        // $file_path = PDF_FILEBOX.$type.'/'.$filename;
        
        if($type == 'new'){
            $file_path = $filebox.$type.DS.$filename;
        }
        else if($type == 'selected'){
            $file_path = $filebox.'temp'.DS. $ref_record_id.DS.$filename;
        }
        else if($type == 'completed'){
            $filebox = Yii::app()->params['absolute_path'];
            $file_path =  $filebox.$ref_record_id.DS.$filename;    
        }
        
        $mimeType = FBUtility::getMimeTypeByFileExtension($filename);
        //header('Cache-Control: public');
        header("Content-type: {$mimeType}");
        ob_clean();
        flush();
        readfile($file_path);
        Yii::app()->end();
    }

    public function actionMoveFile(){
        $filename = Yii::app()->request->getParam('filename',null);
        $actionType = Yii::app()->request->getParam('actionType',null);
        $ref_record_id = Yii::app()->request->getParam('ref_record_id',null);
        $response = FBUtility::moveFile($filename,$actionType,$ref_record_id);
        echo CJSON::encode($response);
        exit;
    }

    public function  actionGetFileStatus(){
        $sysFieldOptionDataUtil  = new SysFieldOptionDataUtil;
        $sysFieldoptionData = $sysFieldOptionDataUtil->getFieldOptionData(48);
        ob_clean();
        header("content-type: application/x-javascript; charset=utf-8");
        header('Cache-Control: public'); //must-revalidate, public, no-cache
        ob_start();
        $fieldOption= CJSON::encode($sysFieldoptionData);
        $fileStatusGridFields = " var Ext=Ext||{}; ";
        $fileStatusGridFields.= " Ext.fileStatusComponents = {$fieldOption};";
        echo $fileStatusGridFields;
        ob_end_flush();
    }
}       
