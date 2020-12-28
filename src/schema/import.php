<?php

$content = file_get_contents('./signals.json');
$rows = json_decode($content, true);

$mysql = new mysqli('localhost', 'root', '', 'cdp_scheme');

foreach ($rows as $key => $row) {
    $stm = $mysql->prepare('INSERT INTO `signal` (`signal_id`,`signal_uid`,`loconet_id`,`name`,`type`,`construction`,`last_auto_block`,`lights`) VALUES (?,?,?,?,?,?,?,?)');
    $tmp0 = $row['construction'] ?? null;
    $tmp1 = isset($row['spec']);
    $tmp2 = join(',', $row['lights']);
    $stm->bind_param('isisssis',
        $row['loconetId'],
        $key,
        $row['loconetId'],
        $row['name'],
        $row['type'],
        $tmp0,
        $tmp1,
        $tmp2);
    $stm->execute();
    var_dump($mysql->error);
}
