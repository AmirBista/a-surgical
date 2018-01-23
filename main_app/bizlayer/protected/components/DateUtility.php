<?php

class DateUtility {
//    public static 
    //put your code here
    

    public static function getEndDate($start_date){
      $en = date('Y-m-d', strtotime("+1 months", strtotime($start_date)));
      $endDate = date('Y-m-d', strtotime("-1 days", strtotime($en)));
      return $endDate;
    }
}

