const oracledb = require("oracledb")
const config = require("./config")
// const dbconfig = require("./config")

async function run(){
    const pool = await oracledb.createPool(config)
    const conn = await pool.getConnection()
    try{
        const result = await conn.execute("SELECT * FROM USERS",[],{outFormat: oracledb.OBJECT});
        console.log(result.rows)
    }catch(err){
        console.log(err)
    }finally{
        conn.close();
    }



    // ex2
    // const connection = await pool.getConnection()
    // try{
    //     const result = await connection.execute("SELECT * FROM USERS;",)
    //     console.log(result)
    // }catch(err){
    //     console.log(err)
    // }finally{
    //     if(conn){
    //         try{
    //          conn.close();
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    // }

    // ex1
    // let conn;
    // try{
    //     conn = await oracledb.getConnection({
    //         user: dbconfig.user,
    //         password: dbconfig.password,
    //         connectionString: dbconfig.connectString
    //     })
    //     console.log("Successfully connected to Oracle Database")

    //     const result = await conn.execute("SELECT * FROM USERS;",)
    //     console.log(result)
    // }catch(err){
    //     console.log("Ereor :" + err)
    // }finally{
    //     if(conn){
    //         try{
    //             conn.close();
    //         }catch(err){
    //             console.log(err)
    //         }
    //     }
    // }
}

run()
// oracledb.getConnection(
//     {
//         user: dbconfig.user,
//         password: dbconfig.password,
//         connectionString: dbconfig.connectString,
//     },
//     (err, connection) => {
//         if(err){
//             console.log("Error : connection")
//             return;
//         }
//         try{
//             const [result] = connection.execute("SELECT * FROM USERS WHERE user_id = 2;",)
//             console.log(result)
//         }catch(err){
//             console.log("Error : STATEMENT")
//             console.log(err.message)
//         }finally{
//             doRelease(connection);
//         }
//     }
// )

// const doRelease = (connection) => {
//     try{
//         connection.close()
//     }catch(err){
//         console.log("Error : doRelease")
//         console.log(err.message)
//     }
// }

// async function Test(){
//     const conn = await oracledb.getConnection({
//         user: 'HELPDESK',
//         password: '1234567',
//         connectString: "(DESCRIPTION   =  (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.13.138)(PORT = 1521))(CONNECT_DATA = (SID = orcl)) )"
//     })
    
//     let users = conn.execute("SELECT * FROM USERS")
//     console.log(users)
// }

// Test()
