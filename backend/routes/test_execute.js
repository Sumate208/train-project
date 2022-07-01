const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");

let pool;
const cPool = async() =>{
    pool = await oracledb.createPool(config);
}
cPool();

router = express.Router();

router.get('/get_demo', async (req,res) => {
    const conn = await pool.getConnection()
    try{
        const result = await conn.execute("SELECT * FROM TABLE_DEMO",{},{outFormat: oracledb.OBJECT})
        console.log(result.rows)
        res.status(201).json(result.rows)
    }catch(err){
        console.log(err)
    }finally{
        if(conn){
            try{conn.close();}
            catch(err){console.log(err);}
        }
    }
})

router.post('/insert_demo',async(req,res) => {
    const conn = await pool.getConnection()
    try{
        await conn.execute(`INSERT INTO TABLE_DEMO (COL1) VALUES(:col1)`,
        {col1:req.body.col1},{autoCommit:true})
        res.status(201).json({msg:"Successfully insert"})
    }catch(err){
        console.log(err)
        res.status(400).json(err.toString());
    }finally{
        if(conn){
            try{conn.close();}
            catch(err){console.log(err);}
        }
    }
})

router.post('/NM_TABLE',async(req,res) => {
    const conn = await pool.getConnection()
    try{
        await conn.execute(
            `INSERT INTO NM_TABLE VALUES(:v1, :v2)`,
            {v1:req.body.id, v2:req.body.discript},
            {autoCommit:true,}
        )
        res.status(201).json({msg:"Successfully insert"})
    }catch(err){
        console.log(err)
        res.status(400).json(err.toString());
    }finally{
        if(conn){
            try{conn.close();}
            catch(err){console.log(err);}
        }
    }
})

router.get('/NM_TABLE', async(req,res) => {
    const conn = await pool.getConnection()
    try{
        const result = await conn.execute(
            `SELECT * FROM NM_TABLE WHERE ID = :v1`,
            [req.body.id],{outFormat: oracledb.OUT_FORMAT_OBJECT}
        )
        res.status(201).json(result.rows)
    }catch(err){
        console.log(err)
        res.status(400).json(err.toString());
    }finally{
        if(conn){
            try{conn.close();}
            catch(err){console.log(err);}
        }
    }
})

module.exports = router;
