<meta charset="utf-8">


<?php   $dbhost = "192.168.13.138";  
        $dbuser = "HELPDESK";
        $dbpass = "1234567";
        $dbname = "orcl";

$TNS = "(DESCRIPTION   =  (ADDRESS = (PROTOCOL = TCP)(HOST = ".$dbhost.")(PORT = 1521))

(CONNECT_DATA = (SID = ".$dbname.")) )";

$conn = oci_connect($dbuser,$dbpass,$TNS,'AL32UTF8');

 if(!$conn){
  echo "xxx";
  echo $e = oci_error();
 
 }

?>