const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");
const Joi = require('joi')
const bcrypt = require('bcrypt');
const { generateToken } = require("../utils/token");
const { isLoggedIn } = require('../middlewares/index')
let pool;
const cPool = async() =>{
    pool = await oracledb.createPool(config);
}
cPool();

router = express.Router();

router.post('/newreport', async (req,res) => {
    const conn = await pool.getConnection()
    try{
        await conn.execute("INSERT INTO PROBLEM_REPORT (ID, COL1) VALUES(:id, :col1)",{
            id: {val:req.body.id},
            col1: {val:req.body.col1}
        },{autoCommit:true})
        res.status(201).json({msg:"Insert completed"})
    }catch(err){
        console.log(err)
        res.status(400).json(err.toString());
    }finally{
        if(conn){
            try{conn.close();}
            catch(err){console.log(err)}
        }
    }
}) 

module.exports = router;