<?php
	include("xmlrpc.inc");

	$url = 'localhost:8069';
	$db = 'smv';
	#base datos
	$username = $_POST["username"];
	$password = $_POST["password"];

	try
	{
		$connexion = new xmlrpc_client($url . "/xmlrpc/common");
		$connexion->setSSLVerifyPeer(0);

		$c_msg = new xmlrpcmsg('login');
		$c_msg->addParam(new xmlrpcval($db, "string"));
		$c_msg->addParam(new xmlrpcval($username, "string"));
		$c_msg->addParam(new xmlrpcval($password, "string"));
		$c_response = $connexion->send($c_msg);
		$uid = $c_response->value()->scalarval();

		if($uid > 1){
			session_start();
			$_SESSION['login_user'] = $username;
			echo $uid;
		}else{
			echo $uid;
		}

	} catch (Exception $e) {
		echo 1;
	}
?>