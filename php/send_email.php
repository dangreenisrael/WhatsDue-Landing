<?php
/**
 * Created by PhpStorm.
 * User: Dan
 * Date: 3/11/15
 * Time: 18:21
 */
if(!defined('APP_RAN')){ die(); }
require 'vendor/autoload.php';

use Mailgun\Mailgun;

function sendEmail ($destination, $subject, $body){
    # First, instantiate the SDK with your API credentials and define your domain.
    $mg = new Mailgun("key-3997afe1674cb12b3bcecb21c993147a");
    $domain = "whatsdueapp.com";

# Now, compose and send your message.
    $mg->sendMessage($domain, array
        (
            'from'    => 'aaron@whatsdueapp.com',
            'to'      => $destination,
            'subject' => $subject,
            'text'    => $body
        )
    );
}

