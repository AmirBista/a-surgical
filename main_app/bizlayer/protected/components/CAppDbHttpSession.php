<?php
class CAppDbHttpSession extends CDbHttpSession {
    /**
     * Updates the current session id with a newly generated one .
     * Please refer to {@link http://php.net/session_regenerate_id} for more details.
     * @param boolean $deleteOldSession Whether to delete the old associated session file or not.
     * @since 1.1.8
     */
    public function regenerateID($deleteOldSession=false)
    {
        $oldID=session_id();

        // if no session is started, there is nothing to regenerate
        if(empty($oldID))
            return;
        //by shakti
        //commented or removed code as it was generating multiple session records
        //   when sending mulitple ajax request for 1 user
        //parent::regenerateID(false);
        // session_regenerate_id();
        $newID=session_id();
        $db=$this->getDbConnection();

        $row=$db->createCommand()
            ->select()
            ->from($this->sessionTableName)
            ->where('id=:id',array(':id'=>$oldID))
            ->queryRow();

        if($row!==false)
        {
            if($deleteOldSession){
                // die('1');
                $db->createCommand()->update($this->sessionTableName,array(
                    'id'=>$newID
                ),'id=:oldID',array(':oldID'=>$oldID));
            }
            else
            {
                $row['id']=$newID;
                try {
                    $db->createCommand()->insert($this->sessionTableName, $row);
                } catch (Exception $e) {
                    Yii::log("====== BEGIN SESSION ERROR =====");
                    Yii::log($e->getMessage(), 'error');
                    Yii::log("====== END SESSION ERROR =====");
                }
            }
        }
        else
        {
            // shouldn't reach here normally
            try {
                $db->createCommand()->insert($this->sessionTableName, array(
                    'id'=>$newID,
                    'expire'=>time()+$this->getTimeout(),
                ));
            } catch (Exception $e) {
                Yii::log("====== BEGIN SESSION ERROR =====");
                Yii::log($e->getMessage(), 'error');
                Yii::log("====== END SESSION ERROR =====");
            }
        }
    }
}
