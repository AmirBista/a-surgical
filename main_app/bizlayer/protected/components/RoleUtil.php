<?php
class RoleUtil
{
    public static $ROLE_SUPER_ADMIN = 100;
    public static $ROLE_ADMIN = array(50);
    public static $ROLE_COMPANY_ADMIN = array(10,110);
    public static $ROLE_STORE_MANAGER = array(1,101);
    public static $ROLE_USER = 1;
    
    public static function isSuperAdmin($role_id){
        if ($role_id == RoleUtil::$ROLE_SUPER_ADMIN)
            return true;
        else 
            return false;
    }

    public static function isAdmin($role_id){
        if (in_array($role_id,RoleUtil::$ROLE_ADMIN))
            return true;
        else 
            return false;
    }

    public static function isCompanyAdmin($role_id){
        if (in_array($role_id,RoleUtil::$ROLE_COMPANY_ADMIN))
            return true;
        else 
            return false;
    }

    public static function isStoreManager($role_id){
        if (in_array($role_id,RoleUtil::$ROLE_STORE_MANAGER))
            return true;
        else 
            return false;
    }

    public static function hasCSVImportRole($role_id){

        if ($role_id == RoleUtil::$ROLE_ADMIN)
            return true;
        else 
            return false;
    }

    public static function getUserRoles(){
        $sql = "SELECT role_id FROM app_role WHERE delete_flg = 0 OR delete_flg IS NULL";
        $cmd = Yii::app()->db->createCommand($sql);
        return $cmd->queryAll();
    }  
}
