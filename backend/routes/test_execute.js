const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");
const multer = require('multer')
const path = require('path')


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

function generateOTP () {
    const result = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
   }
   return result.join('');
}

router.put('/testapi',(req,res)=>{
    const link = req.body.link;
    try{
        request({
            uri:link,
            function(err,res,body){
                if(!err && res.statusCode === 200){
                    console.log(body)
                }
            }
        })
        const otp = generateOTP()
        res.status(200).json({link:link,otp:otp})
    }catch(err){
        res.status(400).json(err.toString());
    }
})

router.post("/uploadsingle",upload.single("ImgSingle"), (req, res, next) => {
    res.render("Uploaded")
})

router.post("/uploadmultiple",upload.array("photos",5), (req, res, next) => {
    const files = req.files
    if(!files){
        const error = new Error("Please choose files")
        error.httpStatusCode = 400
        return next(error)
    }
    res.send(files)
})

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../static/uploads')
    },
    filename: (req, file, cb)=> {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage: storage })
module.exports = router;
