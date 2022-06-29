const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");

const pool = await oracledb.createPool(config);

router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/alluser', (req, res) => {
    const conn = await pool.getConnection()
    try{
        const result = await conn.execute("SELECT * FROM USERS",[],{outFormat: oracledb.OBJECT});
        console.log(result.rows)
        res.status(200).json(result.row)
 
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
})

// router.post('/signup', async (req, res, next) => {
//     const data = req.data
//     const pool = oracledb.createPool(config);
//     const conn = await pool.getConnection();
//     try {
//         const [user] = await conn.execute(
//             "SELECT * FROM USERS"
//         );
//         console.log(user)
//     } catch (err) {
//         res.status(400).json(err);
//     } finally {
//         conn.release();
//     }
// })

exports.router = router