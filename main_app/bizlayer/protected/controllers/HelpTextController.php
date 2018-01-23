<?php

class HelpTextController extends PrivateController {

    public function actionGetHelpList()
    {
        $result = HelpText::model()->getHelpList();
            $arr = array(
                'success' => true,
                'data' => $result
            );
        $this->renderJSON($arr);
    }
    public function actionSaveUpdateHelpText(){
        $app = Yii::app();
        $user_info = $app->user->getUserInfo();
        $user_id = $user_info['user_id'];
        $request = $app->request;
        $rowDatas = CJSON::decode($request->getParam('rowDatas',null));
        $removedRows = CJSON::decode($request->getParam('removedRows',null));
        //$helpText = $request->getParam('helpText', null);
        $connection=Yii::app()->db;
        $transaction=$connection->beginTransaction();
        try {
            foreach ($rowDatas as $rowData) {
                $rowData = array_map('trim', $rowData);
                if (@empty($rowData['help_id'])) {
                    $this->_insertRecord($rowData,$user_id);
                } else {
                    $this->_updateRecord($rowData,$user_id);
                }
            }
            foreach ($removedRows as $removedRow) {
                $this->_updateRecord($removedRow,$user_id);
            }
                $transaction->commit();
                $arr = array(
                    'success' => true,
                    'msg' => Yii::t('company','save Success')
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
    private function _insertRecord($rowData,$user_id) {
        $model = new HelpText;
        $model->attributes = $rowData;
        $model->created_datetime = $model->updated_datetime = new CDbExpression('NOW()');
        $model->created_by = $user_id;
        $model->save();
    }
    private function _updateRecord($rowData,$user_id) {
        $rowData['updated_by'] = $user_id;
        $rowData['updated_datetime'] = new CDbExpression('NOW()');
        $model = new HelpText;
        $model->updateByPk($rowData['help_id'], $rowData);
    }
}