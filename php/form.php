<style>
  form#sweet-captcha{
    width: 370px;
  }
  div.sweetcaptcha p {
    font-size: 16px;
  }
  div.sweetcaptcha p span {
    font-size: 16px;
    font-weight: bold;
  }
</style>
<?php
define('APP_RAN', true);
require_once('sweetcaptcha.php');
require_once('send_sms.php');
$phoneNumber = $_POST['phoneNumber'];
$closeModal = '<input type="hidden" id="closeModal" value="true">';

if (@!$_POST['scvalue']):
  $captcha = str_replace("false", "true", $sweetcaptcha->get_html());

  ?>
  <form id="sweet-captcha" method="post">
    <!-- implement sweetcaptcha -->
    <?php echo $captcha; ?>
    <input type="hidden" name="phoneNumber" value="<?php echo $phoneNumber;?>">
    <!-- continue with your form -->
  </form>
<?php

else:
  // looks like someone has submitted a form, let's validate it
  if (isset($_POST['sckey']) and isset($_POST['scvalue']) and $sweetcaptcha->check(array('sckey' => $_POST['sckey'], 'scvalue' => $_POST['scvalue'])) == "true") {
    // success! your form was validated
    // do what you like next ...
    $message = "Download WhatsDue by clicking this link \n http://whatsdueapp.com";
    sendSMS("+1".$phoneNumber, $message);
    echo $closeModal;

  }
  else {
    // alas! the validation has failed, the user might be a spam bot or just got the result wrong
    // handle this as you like
    echo 'OOPS, if you are a human <a href="javascript:history.back()">Try Again</a>';
  }
endif;

?>
