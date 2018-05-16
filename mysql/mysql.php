<?php
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'laravel';
$table = 'test1';
$type = 'prepare';

$mysqli = new mysqli($host, $user, '', $dbname);

if ($mysqli->connect_error) {
    die('Connect Error (' . $mysqli->connect_errno . ') ' . $mysqli->connect_error);
}

$mysqli->set_charset("utf8");

if ($type === 'prepare') {

    /* create a prepared statement */
    if ($stmt = $mysqli->prepare("SELECT * FROM {$table} WHERE id > ?")) { // 

        $id = 1;
        /* bind parameters for markers */
        $stmt->bind_param("i", $id);
        /* execute query */
        $stmt->execute();
        
        /* bind result variables */
        $stmt->bind_result($name, $code);

        /* fetch values */
        while ($stmt->fetch()) {
            printf ("%s (%s)\n", $name, $code);
        }
        /* close statement */
        $stmt->close();
    }

} else {
    /* If we have to retrieve large amount of data we use MYSQLI_USE_RESULT */
    $result = $mysqli->query("SELECT * FROM {$table}", MYSQLI_USE_RESULT);
    /* fetch object array */
    while ($row = $result->fetch_assoc()) {
        printf ("%d (%s) <br>", $row['id'], $row['test1']);
    }
}

/* close connection */
$mysqli->close();

?>