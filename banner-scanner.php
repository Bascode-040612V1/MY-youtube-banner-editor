<?php
header('Content-Type: application/json');

$files = scandir('.');

$banners = array();
foreach ($files as $file) {
    if (preg_match('/^Banner(\d*)\.(jpg|jpeg|png|gif)$/i', $file)) {
        $banners[] = $file;
    }
}

usort($banners, function($a, $b) {
    $numA = intval(preg_replace('/[^0-9]/', '', $a));
    $numB = intval(preg_replace('/[^0-9]/', '', $b));
    
    if (strpos($a, 'Banner.jpg') !== false) $numA = 0;
    if (strpos($b, 'Banner.jpg') !== false) $numB = 0;
    
    return $numA - $numB;
});

echo json_encode($banners);
?>