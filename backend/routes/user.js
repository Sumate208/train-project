const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");
const Joi = require("joi")
const bcrypt = require("bcrypt");
const { generateToken } = require("../utils/token");
const { generateOTP } = require("../utils/otp");
const { isLoggedIn } = require("../middlewares/index");
let pool;
const cPool = async() =>{
    pool = await oracledb.createPool(config);
}
cPool();

router = express.Router();

const id_cardValidator = async (value, helpers) => {
    let result;
    const conn = await pool.getConnection();
    try{
        result = await conn.execute("SELECT ID_CARD FROM USERS WHERE ID_CARD = :id",{id:{val:value}},{outFormat: oracledb.OBJECT})
    }catch(err){
        console.log(err)
    }finally{
        conn.close();
    }
    
    if (result.rows.length > 0) {
        const message = 'รหัสบัตรประชาชนนี้เคยลงทะเบียนแล้ว'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const mobileValidator = async (value, helpers) => {
    let result;
    const conn = await pool.getConnection();
    try{
        result = await conn.execute("SELECT MOBILE FROM USERS WHERE MOBILE = :mobile", {mobile:{val:value}},{outFormat: oracledb.OBJECT})
    }catch(err){
        console.log(err)
    }finally{
        conn.close();
    }
    if (result.rows.length > 0) {
        const message = 'หมายเลขโทรศัพท์นี้เคยลงทะเบียนแล้ว'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

const signupSchema = Joi.object({
    first_name: Joi.string().required().max(20),
    last_name: Joi.string().required().max(20),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/).external(mobileValidator),  
    id_card: Joi.string().required().pattern(/[0-9]{13}/).external(id_cardValidator),
    agency: Joi.string().required(),
})

router.post('/signup', async (req, res, next) => {
    res.status(200)
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err)
    }

    const conn = await pool.getConnection();

    const first_name = req.body.first_name
    const last_name = req.body.last_name
    const id_card = req.body.id_card
    const agency = req.body.agency
    const mobile = req.body.mobile

    try {
        await conn.execute(
            "INSERT INTO USERS (USER_ID,first_name,last_name,id_card,mobile,agency) VALUES(:USERID_SEQ.nextval,:fname, :lname, :id, :mobile, :agency);",
            {   
                fname:{val:first_name},
                lname:{val:last_name},
                id:{val:id_card},
                mobile:{val:mobile},
                agency:{val:agency},
            },{autoCommit:true}
        );
        console.log("Successfully sign up: "+first_name)
        res.status(201).json({msg:"ลงทะเบียนสำเร็จ"})
    } catch (err) {
        conn.rollback()
        res.status(400).json(err.toString());
    } finally {
        conn.close();
    }
})


async function hashOTP(otp){
    const saltRounds = 10;
    var result = "";
    await bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(otp, salt, (err, hash)=>{
            result = hash
        })
    })
    return result;
}

router.post('/sentotp', async (req,res) => {
    const conn = await pool.getConnection()
    const otp = generateOTP();
    var hOtp = hashOTP(otp);
    // bcrypt.genSalt(10, (err, salt)=>{
    //     bcrypt.hash(otp, salt, (err, hash)=>{
    //         hOtp = hash
    //     })
    // })
    // const mobile = req.body.mobile
    try{
        console.log(otp)
        console.log(hOtp)
        // const result = await conn.execute(`SELECT * FROM OTP`,{},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        // if(result.rows){
        //     await conn.execute(`UPDATE OTP SET OTP = :v1 WHERE MOBILE = :v2`,
        //         {v1:otp, v2:mobile},
        //         {autoCommit:true})
        // }else{
        //     await conn.execute(`INSERT INTO OTP(OTP, MOBILE) VALUES(:v1, :v2)`,
        //         {v1:otp, v2:mobile},
        //         {autoCommit:true})
        // }
        // res.status(201).json({msg:"OTP ถูกส่งไปยังหมายเลขโทรศัพท์ "+mobile+" แล้ว"})
    }catch(err){
        conn.rollback
        console.log(err)
        res.status(400).json({msg:err})
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

module.exports = router;