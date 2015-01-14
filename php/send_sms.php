<?php
if(!defined('APP_RAN')){ die(); }
require 'vendor/autoload.php';

use Plivo\PlivoError;
use Plivo\RestAPI;

function sendSMS ($destination, $message){
    $to = $destination;
    $from = "16465829957";
    $text = $message;
    $auth_id = "MAZMQWNDFHZDM2ZGZHOD";
    $auth_token = "NjBhMTI3OWFiYzE3NTExYTE3YzhmN2YxM2M0N2Vj";

    $p = new RestAPI($auth_id, $auth_token);

    // Send a message
    $params = array(
        'src' => "$from",
        'dst' => "$to",
        'text' => "$text",
        'type' => 'sms',
    );
    $response = $p->send_message($params);
    if ($response['status'] == "202")
    {
        /* Success */
        return true;
    }
    else
    {
        /* Failure */
        return false;
    }
}