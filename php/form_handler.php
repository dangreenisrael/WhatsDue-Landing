
<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 3/11/15
 * Time: 17:13
 */
define('APP_RAN', true);
include "send_email.php";

if ($_POST['type']=['teacherInterest']){
    $body = "Name: ".$_POST['teacherName']."\nSchool: ".$_POST['teacherSchool']."\nEmail: ".$_POST['teacherEmail'];
    sendEmail("aaron@whatsdueapp.com","Teacher Interest", $body);
    echo "success";
} else{
    echo "failure";
}