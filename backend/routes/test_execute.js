const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt');

let pool;
const cPool = async() =>{
    pool = await oracledb.createPool(config);
}
cPool();

router = express.Router();

/////// gen OTP
function generateOTP () {
    const result = [];
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
      result.push(characters.charAt(Math.floor(Math.random() * characters.length)));
   }
   return result.join('');
}

router.get('/genotp',(req,res)=>{
    const otp = generateOTP()
    const saltRounds = 10
    bcrypt.genSalt(saltRounds, (err, salt)=>{
        bcrypt.hash(otp, salt, (err, hash)=>{
            res.status(201).json({otp:otp,ctext:hash})
        })
    })
})
router.put('/checkotp',(req,res)=>{
    const otp = req.body.otp
    const ct = req.body.ct
    // bcrypt.compare(otp, ct, (err, result) => {
    //     if(result)(res.status(201).json(result))
    //     else{res.status(400).json({msg:"OTP ไม่ถูกต้อง"})}
    // })
    const compareOTP = bcrypt.compareSync(otp, ct)
    console.log(compareOTP)
    if(compareOTP)(res.status(201).json({msg:"OTP ถูกต้อง"}))
    else{res.status(400).json({msg:"OTP ไม่ถูกต้อง"})}
})

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

var count = 1;
function testtime(){
    if(num == 4){
        console.log("Clear");
        clearTimeout(timeout);
    }else{
        console.log('hello: ' + count);
        count++;
        timeout();
    }


}

var timeout = () => {setTimeout(testtime(),5000)}

router.get('/testtimeout',(req,res)=>{
    var count = 1;
    const testtime = ()=>{
        if(count == 4){
            console.log("Clear");
            clearTimeout(timeout);
        }else{
            console.log('hello: ' + count);
            count++;
            timeout();
        }
    }
    const timeout = () => {setTimeout(testtime,5000)}

    try{
        timeout()
        res.status(200)
    }
    catch(err){
        res.status(400).json(err)
    }
})

/// upload image
// router.post("/upload", upload ,(req, res) => {
//     res.render("show", req.file)
// })

// router.post("/uploadmultiple",upload.array("photos",5), (req, res, next) => {
//     const files = req.files
//     if(!files){
//         const error = new Error("Please choose files")
//         error.httpStatusCode = 400
//         return next(error)
//     }
//     res.send(files)
// })

// var storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, '../static/uploads')
//     },
//     filename: (req, file, cb)=> {
//         cb(null, file.fieldname + '-' + Date.now())
//     }
// })

// var upload = multer({ storage: storage }).single("image")

router.get('/testdate', async (req,res) => {
    const conn  = await pool.getConnection();
    try{
        // const result = await conn.execute(`SELECT END_DATE FROM OTP WHERE MOBILE = :v1`,
        //                     {v1:'0111111111'},
        //                     {outFormat:oracledb.OUT_FORMAT_OBJECT})
        // const timeNow =  new Date();
        // var timeEnd =  new Date();
        // timeEnd.setMinutes(timeEnd.getMinutes() + 15);
        // timeEnd = timeEnd.toLocaleString();
        const timeNow =  new Date().toLocaleString();
        var timeEnd =  new Date();
        timeEnd.setMinutes(timeEnd.getMinutes() + 10);
        timeEnd = timeEnd.toLocaleString();
        const diff = Date.parse(timeEnd)-Date.parse(timeNow)

        res.status(200).json({TIME_NOW:timeNow,TIME_END:timeEnd,CHECK:diff})
    }catch(err){
        console.log(err)
    }finally{
        if(conn){
            try{
                conn.close()
            }catch(err){
                console.log(err)
            }
        }
    }
})

router.post('/insert', async(req,res) => {
    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const id_card = req.body.id_card
    const mobile = req.body.mobile
    const agency = req.body.agency
    const conn = await pool.getConnection();
    try{

        await conn.execute(`INSERT INTO USERS(FIRST_NAME, LAST_NAME, ID_CARD, MOBILE, AGENCY) VALUES(:v1, :v2, :v3, :v4, :v5)`,
        {v1:first_name, v2:last_name, v3:id_card, v4:mobile, v5:agency}, {autoCommit:true}) 
        // await conn.execute(
        //     `INSERT INTO USERS (FIRST_NAME, LAST_NAME, ID_CARD, MOBILE, AGENCY) VALUES(:v1, :v2, :v3, :v4, :v5);`,
        //     {v1:first_name, v2:last_name, v3:id_card, v4:mobile, v5:agency},
        //     {autoCommit:true}
        // )
        res.status(201).json({msg:"สมัครสมาชิกเรียบ100"})
    }catch(err){
        res.status(400).json(err.toString())
    }finally{
        if(conn){
            try{
                conn.close()
            }catch(err){
                console.log(err.toString())
            }
        }
    }
})

module.exports = router;
