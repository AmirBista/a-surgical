<?php
return array(
  	"sort_order" =>array(
		"1"  =>' ORDER BY convert_tonumeric("ID"), convert_tonumeric("出品番号") asc',
		"2"  =>' ORDER BY convert_tonumeric("ID"), convert_tonumeric("出品番号") asc',
		"3"  =>' ORDER BY convert_tonumeric("出品番号") asc',
		"4"  =>' ORDER BY "display_order" asc',
		"5"  =>' ORDER BY convert_tonumeric("ID") asc',
		'6'  =>' ORDER BY convert_tonumeric("ID") asc',
        '7'  => " ORDER BY t2.order_masters_id,t2.column_2_20,t2.column_2_06 ",
        '8'  => '',
        '9'  => " ORDER BY t3.column_3_22,t3.column_3_01 ",
        '10' => " ORDER BY t2.column_2_70,t2.column_2_01 ",
        '13' => " ORDER BY currency_type"

    ),
    "select_clause" => array(
    	"13"  =>' product_name,product_code,currency_type,supplier_name,cost_price,store_name,SUM(convert_tonumeric(order_qty)) AS order_qty',
    ),
    "group_clause" => array(
    	"13"  =>' GROUP BY product_name,product_code,currency_type,supplier_name,cost_price,store_name',
	)
);
