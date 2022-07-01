const oracledb = require("oracledb")
const config = require("./config")
// const dbconfig = require("./config")

async function run(){
    const pool = await oracledb.createPool(config)
    const conn = await pool.getConnection()
    try{
        const result = await conn.execute(`SELECT * FROM USERS WHERE USER_ID = :id`,[2],{outFormat: oracledb.OUT_FORMAT_OBJECT});
        console.log(result.rows)
    }catch(err){
        console.log(err)
    }finally{
        if(conn){
            try{
                conn.close();
            }catch(err){
                console.log(err)
            }
        }
    }
}

run()
