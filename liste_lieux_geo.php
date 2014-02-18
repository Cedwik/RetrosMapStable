<?php 

$server = "mysql51-104.perso";
$username = "argosappsql";
$password = "ilest11h29";
$database = "argosappsql";

$con = mysql_connect($server, $username, $password) or die ("Could not connect: " . mysql_error());

mysql_select_db($database, $con);
	mysql_query("SET NAMES UTF8");
$selectInfoLieu = "SELECT*FROM retro_lieu WHERE latitude != 0 " ;

$requeteInfo = mysql_query($selectInfoLieu, $con);

/*echo "<table border= solid 1px green>";
	
	while($row=mysql_fetch_array($requeteInfo)) {

		echo "<tr>";
			echo "<td>";
			echo ( $row["nom_lieu"] );
			echo "</td> <td>";
			echo ( $row["latitude"]);
			echo "</td>";
			echo "<td>";
			echo ( $row["longitude"]);
			echo "</td>";
		echo "</tr>";

	}
	echo "</table>";*/

	$markers = array();
	
	while($row = mysql_fetch_assoc($requeteInfo)) {
	$markers[] = $row;
	}
	echo $_GET['jsoncallback'] . '(' . json_encode($markers) . ');';
	
?>