<?php
    $empty_var = '&nbsp;';
    $date_format = 'm/d';
    if(!empty($array_data)) {
    foreach ($array_data as $array_data_key=>$array_value) {
      $array_driver_info = isset($array_value['driver_info'])?$array_value['driver_info']:array();
      $array_task_info = isset($array_value['task_info'])?$array_value['task_info']:array();

     //Driver Information
      $I6 = isset($array_driver_info['I6']) && !empty($array_driver_info['I6']) ? changeDateFormat($array_driver_info['I6'],$date_format) : $empty_var;
      $J7 = isset($array_driver_info['J7']) && !empty($array_driver_info['J7']) ? $array_driver_info['J7'] : $empty_var;
      $J1 = isset($array_driver_info['J1']) && !empty($array_driver_info['J1']) ? $array_driver_info['J1'] : $empty_var;
      $J2 = isset($array_driver_info['J2']) && !empty($array_driver_info['J2']) ? $array_driver_info['J2'] : $empty_var;
      $J3 = isset($array_driver_info['J3']) && !empty($array_driver_info['J3']) ? $array_driver_info['J3'] : $empty_var;
      
      
  ?>

<div class="wrapper">
 <?php include('driver_header.php');?>
  <div class="main-table">
    <?php 
      foreach (@$array_task_info as $task_info_key => $task_info_value):
        $array_detail_info = isset($task_info_value['detail_info'])?$task_info_value['detail_info']:array();
        $array_order_master = isset($task_info_value['order_master'])?$task_info_value['order_master']:array();
        $array_order_detail = isset($task_info_value['order_detail'])?$task_info_value['order_detail']:array();
        //Detail Info
        $I1 = isset($array_detail_info['I1']) && !empty($array_detail_info['I1']) ? $array_detail_info['I1'] : $empty_var;
        $I6 = isset($array_detail_info['I6']) && !empty($array_detail_info['I6']) ? changeDateFormat($array_detail_info['I6'],$date_format) : $empty_var;
        $K6 = isset($array_detail_info['K6']) && !empty($array_detail_info['K6']) ? $array_detail_info['K6'] : $empty_var;
        $K7 = isset($array_detail_info['K7']) && !empty($array_detail_info['K7']) ? $array_detail_info['K7'] : $empty_var;
        $I15 = isset($array_detail_info['I15']) && !empty($array_detail_info['I15']) ? $array_detail_info['I15'] : $empty_var;

        //Order Master
        $A1 = isset($array_order_master['A1']) && !empty($array_order_master['A1']) ? $array_order_master['A1'] : $empty_var;
        $B2 = isset($array_order_master['B2']) && !empty($array_order_master['B2']) ? $array_order_master['B2'] : $empty_var;
        $D4 = isset($array_order_master['D4']) && !empty($array_order_master['D4']) ? $array_order_master['D4'] : $empty_var;
        $D5 = isset($array_order_master['D5']) && !empty($array_order_master['D5']) ? $array_order_master['D5'] : $empty_var;
        $D8 = isset($array_order_master['D8']) && !empty($array_order_master['D8']) ? $array_order_master['D8'] : $empty_var;
        $D11 = isset($array_order_master['D11']) && !empty($array_order_master['D11']) ? $array_order_master['D11'] : $empty_var;
        $D13 = isset($array_order_master['D13']) && !empty($array_order_master['D13']) ? $array_order_master['D13'] : $empty_var;
        $D19 = isset($array_order_master['D19']) && !empty($array_order_master['D19']) ? $array_order_master['D19'] : $empty_var;
    ?>
    <table width="100%" border="2">
      <tr>
        <td width="20%" class="padd0 mainTd">
          <table width="100%">
            <tr>
              <td class="border0"><?php echo $A1;?></td>
            </tr>
            <tr>
              <td class="border0"><?php echo $B2;?> </td>
            </tr>
            <tr class="border0">
              <td class="border0">
                <?php 
                  // Product Information
                  foreach(@$task_info_value['product_information'] as $product_information_key=>$product_information) {
                    $H3 = isset($product_information['H3']) && !empty($product_information['H3']) ? $product_information['H3'] : $empty_var;
                    $H4 = isset($product_information['H4']) && !empty($product_information['H4']) ? $product_information['H4'] : $empty_var;
                    $H6 = isset($product_information['H6']) && !empty($product_information['H6']) ? $product_information['H6'] : $empty_var;
                ?>
                <p><?php echo $H3;?>&nbsp; <?php echo $H4;?>　 <span class="tright"><?php echo $H6;?></span></p>
               <!--  <p>UP　U1 <span class="tright">1</span></p>
                <p>UP　U1 <span class="tright">1</span></p> -->
                <?php 
                  } 
                ?>
              </td>
            </tr>

          </table>
        </td>
        <td width="80%" class="padd0 mainTd">
          <table width="100%">
          <?php
            //Detail
            $totalRecord = count($array_order_detail)>4?count($array_order_detail):4;
            
          ?>
              <?php
                $order_detail_td = array();
                $order_detail_td_null = '
                  <td width="7%" class="textcenter">&nbsp;</td>
                  <td width="7%" class="textcenter">&nbsp;</td>
                  <td width="10%">&nbsp;</td>
                  <td width="19%">&nbsp;</td>
                  <td width="10%">&nbsp;</td>';

                foreach ($array_order_detail as $order_detail_key => $order_detail) {
                  $OD_I1 = isset($order_detail['I1'])?$order_detail['I1']:'';
                  $OD_I6 = isset($order_detail['I6']) && !empty($order_detail['I6'])?changeDateFormat($order_detail['I6'],$date_format):'';
                  $OD_I7 = isset($order_detail['I7'])?$order_detail['I7']:'';
                  $OD_I5 = isset($order_detail['I5'])?$order_detail['I5']:'';
                  $OD_J1 = isset($order_detail['J1'])?$order_detail['J1']:'';
                  $order_detail_td[] = '
                  <td width="7%" class="textcenter">'.$OD_I1.'</td>
                  <td width="7%" class="textcenter">'.$OD_I6.'</td>
                  <td width="10%">'.$OD_I7.'</td>
                  <td width="19%">'.$OD_I5.'</td>
                  <td width="10%">'.$OD_J1.'</td>';
                }
              for($i=0;$i<$totalRecord;$i++){
                if($i==0){
                ?>
                <tr>
                    <td width="7%" class="borderRBL textcenter"><?php echo $I1;?></td>
                    <td width="7%"><?php echo $I6;?></td>
                    <td width="15%"><?php echo $D11;?> 指定</td>
                    <td width="18%"  class="border3 textcenter"><?php echo $D13;?></td>
                <?php 
                  echo isset($order_detail_td[$i])?$order_detail_td[$i]:$order_detail_td_null.'</tr>';
                }
                else if($i==1){
               ?>
               <tr>
                    <td class="borderRBL textcenter"><?php echo $I15;?></td>
                    <td colspan="2" class="textcenter"><?php echo $D4;?></td>
                    <td class="border3 textcenter"><?php echo $D19;?></td>
              <?php
                  echo isset($order_detail_td[$i])?$order_detail_td[$i]:$order_detail_td_null.'</tr>';
                }
                else if($i==2){
                 ?>
                 <tr>
                    <td class="borderRBL textcenter">&nbsp;</td>
                    <td colspan="2" class="textcenter"><?php echo $D5;?></td>
                    <td class="border3 textcenter"><?php echo $D8;?></td>
              <?php
              echo isset($order_detail_td[$i])?$order_detail_td[$i]:$order_detail_td_null.'</tr>';
                }
                else if($i==3){
               ?>
               <tr>
                    <td class="borderRBL textcenter"><?php echo $K6;?></td>
                    <td colspan="2" class="textcenter"><?php echo $K7;?></td>
                    <td class="border3 textcenter">□可　□留　□不</td>
              <?php
              echo isset($order_detail_td[$i])?$order_detail_td[$i]:$order_detail_td_null.'</tr>';
                }
                else{
                  ?>
                  <tr>
                    <td class="borderRBL textcenter">&nbsp;</td>
                    <td colspan="2" class="textcenter">&nbsp;</td>
                    <td class="border3 textcenter">&nbsp;</td>
                  <?php
                  echo isset($order_detail_td[$i])?$order_detail_td[$i]:$order_detail_td_null.'</tr>';
                }
              }
                // new dbug($order_detail_td);die;
              ?>
          </table>
        </td>
      </tr>
    </table>
    <?php
      endforeach;
    ?>   
  </div>
</div>
<?php
    } 
  }
?>

