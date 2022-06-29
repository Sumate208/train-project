const oracledb = require("oracledb");

const pool = oracledb.createPool({
    user : "HELPDESK",
    password : "1234567",
    connectString : "(DESCRIPTION   =  (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.13.138)(PORT = 1521))(CONNECT_DATA = (SID = orcl)) )",
    waitForConnections: true,
    poolMax:5,
    poolMin:5,
 });

 module.exports = pool;

// module.exports = {
//     user : "HELPDESK",
//     password : "1234567",
//     connectString : "(DESCRIPTION   =  (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.13.138)(PORT = 1521))(CONNECT_DATA = (SID = orcl)) )",
// }