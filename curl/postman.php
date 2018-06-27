<?php

function request($url, $method = 'GET', $params = array(), $headers = array())
{
    $curl = curl_init();
    if (count($params)) {
        $url = $url . '?' . http_build_query($params);
    }
    curl_setopt_array($curl, array(
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "GET",
        CURLOPT_HTTPHEADER => $headers,
    ));
    $response = curl_exec($curl);
    $err = curl_error($curl);

    curl_close($curl);

    if ($err) {
        return "cURL Error #:" . $err;
    } else {
        return $response;
    }
}

$url = "http://api.medlive.test/adcms/ads?platform=2&branch=0&type=0&post=139604";
$params = array('platform' => 2, 'branch' => 0, 'type' => 0, 'post' => 139604);
$headers = array(
    "Api-Key: 34819d7beeabb9260a5c854bc85b3e44",
    "Cache-Control: no-cache",
    "Postman-Token: e23e4623-63ef-4c21-95d9-f9863e1f72b1",
);
var_dump(request($url, 'GET', $params, $headers));
