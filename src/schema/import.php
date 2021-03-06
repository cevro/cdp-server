<?php

// $content = file_get_contents('./signals.json');
// $content = file_get_contents('./turnouts.json');
$content = file_get_contents('./sectors.json');
$rows = json_decode($content, true);

$mysql = new mysqli('localhost', 'root', '', 'cdp_scheme');
/*
foreach ($rows as $key => $row) {
    $stm = $mysql->prepare('INSERT INTO `signal` (`signal_uid`,`loconet_id`,`name`,`type`,`construction`,`last_auto_block`,`lights`) VALUES (?,?,?,?,?,?,?,?)');
    $tmp0 = $row['construction'] ?? null;
    $tmp1 = isset($row['spec']);
    $tmp2 = join(',', $row['lights']);
    $stm->bind_param('sisssis',
        $key,
        $row['loconetId'],
        $row['name'],
        $row['type'],
        $tmp0,
        $tmp1,
        $tmp2);
    $stm->execute();
    var_dump($mysql->error);
}*/

/*
foreach ($rows as $key => $row) {
    $stm = $mysql->prepare('INSERT INTO `turnout` (`turnout_uid`,`name`,`base_position`) VALUES (?,?,?)');
    $tmp = $row['home'] == -1 ? 'D' : 'S';
    $stm->bind_param('sss',
        $key,
        $row['name'],
        $tmp
    );
    $stm->execute();
    var_dump($mysql->error);
}
*/

var_dump($rows);

foreach ($rows as $row) {
    $stm = $mysql->prepare('INSERT INTO `sector` (`sector_uid`,`name`) VALUES (?,?)');
    $tmp = isset($row['SVGData']['label']) ? $row['name'] : null;
    $temp1 = 'zst.pu.s.' . $row['name'];
    $stm->bind_param('ss',
        $temp1,
        $tmp
    );
    $stm->execute();
    var_dump($mysql->error);
}
