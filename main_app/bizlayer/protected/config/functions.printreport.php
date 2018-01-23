<?php
	// BASE-LEGO [PrintReport] functions
	/**
	 * This is the shortcut to Yii::t() with default category = 'stay'
	*/
	if(!function_exists('t')) {
		function t($category = 'common', $message, $params = array(), $source = null, $language = null) {
			return Yii::t($category, $message, $params, $source, $language);
		}
	}
	if(!function_exists('sendHttpReq')) {
		function sendHttpReq($fax_data,$param_name = 'fax_data') {
			require_once "HTTP/Request2.php";
			$url = REQUEST_ON_HTML_SAVE;
			// $url = 'http://localhost/tbase/TBase/bizlayer/fax/generateCSV';
			try {
			        $req =new HTTP_Request2($url, HTTP_Request2::METHOD_POST);
			        $req->addPostParameter($param_name, $fax_data);
			        $res = $req->send();
			        if ($res->getStatus() == 200)   {
			        	$bodyResp = $res->getBody();
			        	if(!empty($bodyResp)) {
			        		$bodyResp = CJSON::decode($bodyResp);
			        		if($bodyResp == true) {
			        			$response['success'] = true;
			            		$response['msg'] = $bodyResp['msg'];
			        		}
			        		else {
			        			$response['success'] = false;
			            		$response['msg'] = $bodyResp['msg'];
			        		}
			        	}
			        	else {
			        		$response['success'] = true;
			            	$response['msg'] = '';
			        	}
			        }
			        else{
			            $response['success'] = false;
			            $response['msg']= ' Unable to connect tbase server/file but ';
			        }
			        return $response;
			        // var_dump($response);
			} catch (HTTP_Request2_Exception $e) {
			    $response['msg'] = $e->getMessage();
			} catch (Exception $e) {
			    $response['msg']= $e->getMessage();
			}
		}
	}
	if(!function_exists('jpTextEncode')) {
		function jpTextEncode($value="", $to_encoding = "UTF-8", $from_encoding = FROM_ENCODING ) {
		    if (!empty($value)) {
		    	return mb_convert_encoding($value, $to_encoding, $from_encoding);
		    }else{
		    	return NULL;
		    }
		}
	}
