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

/// เช็คว่ารหัสบัตรประชาชนที่รับเข้ามาเคยลงทะเบียนไปหรือยัง
const id_cardValidator = async (value, helpers) => {
    let result;
    const conn = await pool.getConnection();
    try{
        result = await conn.execute("SELECT ID_CARD FROM USERS WHERE ID_CARD = :id",{id:{val:value}},{outFormat: oracledb.OBJECT})
    }catch(err){
        console.log(err.toString())
    }finally{
        conn.close();
    }
    
    if (result.rows.length > 0) {
        const message = 'รหัสบัตรประชาชนนี้เคยลงทะเบียนแล้ว'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

/// เช็คว่า เบอร์โทรศัพท์ ที่รับเข้ามาเคยลงทะเบียนไปหรือยัง
const mobileValidator = async (value, helpers) => {
    let result;
    const conn = await pool.getConnection();
    try{
        result = await conn.execute("SELECT MOBILE FROM USERS WHERE MOBILE = :mobile", {mobile:{val:value}},{outFormat: oracledb.OBJECT})
    }catch(err){
        console.log(err.toString())
    }finally{
        conn.close();
    }
    if (result.rows.length > 0) {
        const message = 'หมายเลขโทรศัพท์นี้เคยลงทะเบียนแล้ว'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}

/// validate ข้อมูล(เบอร์โทรศัพท์)ก่อนส่ง OTP
const sentOtpSchema = Joi.object({
    mobile: Joi.string().required().pattern(/0[0-9]{9}/).external(mobileValidator),  
})

/// return เวลาปัจจุบัน และ เวลาปัจจุบัน + 15นาที(อายุ OTP)
function gettime(){
    const timeNow =  new Date().toLocaleString();
    var timeEnd =  new Date();
    timeEnd.setMinutes(timeEnd.getMinutes() + 15);
    timeEnd = timeEnd.toLocaleString();
    return {timeNow:timeNow,timeEnd:timeEnd}
}

/// ตั้งเวลาลบ OTP ใน Database auto
async function autoDeleteOtp(mobile){
    const conn = await pool.getConnection();
    var recursivecooldown = 905000;

    const deleteOTP = async() =>{
        const result = await conn.execute(`SELECT END_DATE FROM OTP WHERE MOBILE = :v1`,
        {v1:mobile},
        {outFormat:oracledb.OUT_FORMAT_OBJECT})
        const time = gettime()
        if(result.rows[0]){
            if(time.timeNow > result.rows[0].END_DATE){
                try{
                    await conn.execute(`DELETE FROM OTP WHERE MOBILE = :v1`, 
                    {v1:mobile}, {autoCommit:true})
                    console.log('OTP เบอร์ '+mobile+' หมดอายุแล้ว')
                    if(conn){
                        try{
                            conn.close();
                            console.log('ปิด pool Delete OTP แล้ว')
                        }catch(err){
                            console.log(err.toString())
                        }
                    }
                    clearTimeout(callTimeout)
                }catch(err){
                    conn.rollback
                    console.log(err.toString())
                }
            }else{
                console.log("มีการส่ง OTP เบอร์ "+mobile+" ใหม่ OTP ปัจจุบันยังไม่หมดอายุ")
                recursivecooldown = Date.parse(result.rows[0].END_DATE) - Date.parse(time.timeNow) +5000
                console.log(recursivecooldown)
                callTimeout();  
            } 
        }else{}
    }
    const callTimeout = () => {setTimeout(deleteOTP,recursivecooldown)}

    try{
        callTimeout()
        console.log('เรียก timeout')
    }
    catch(err){
        console.log(err.toString())

    }
}

/// สร้าง และ ส่ง OTP
router.post('/sentotp', async (req,res) => {
    try {
        await sentOtpSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err.toString())
    }
    const conn = await pool.getConnection()
    const otp = generateOTP()
    const hashotp = bcrypt.hashSync(otp, 10);
    const mobile = req.body.mobile;
    const time = gettime();
    try{
        ///เช็คว่าเบอร์ที่จะส่ง OTP มี OTP ที่ทำงานอยู่มั่ย
        const result = await conn.execute(`SELECT * FROM OTP WHERE MOBILE = :v1`,{v1:mobile},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        ///ตั้ง Default execute เป็นเพิ่ม otp ลง DB 
        var q = `INSERT INTO OTP(OTP, MOBILE, START_DATE, END_DATE) VALUES(:v1, :v2, :v3, :v4)`     
        ///ถ้ามีเบอร์นี้มี OTP ที่ทำงานอยู่เปลี่ยนเป็น Update table แทน
        if(result.rows[0]){
            q = `UPDATE OTP SET OTP = :v1, START_DATE = :v3, END_DATE = :v4 WHERE MOBILE = :v2`
        }
        /// Run execute
        await conn.execute(q, {v1:hashotp, v2:mobile, v3:time.timeNow, v4:time.timeEnd}, {autoCommit:true}) 
        /// external api mailbit

        console.log(otp)
        res.status(201).json({msg:"OTP ถูกส่งไปยังหมายเลขโทรศัพท์ "+mobile+" แล้ว"})

        // แบบ1
        // setTimeout(()=>autoDeleteOtp(mobile), 65000)
        // แบบ2
        autoDeleteOtp(mobile);

    }catch(err){
        conn.rollback
        console.log(err.toString())
        res.status(400).json({msg:err.toString()})
    }finally{
        if(conn){
            try{
                conn.close();
                console.log('ปิด pool หลักแล้ว')
            }catch(err){
                console.log(err.toString())
            }
        }
    }
})

/// validate ข้อมูลที่ใช้ SingUp
const signupSchema = Joi.object({
    first_name: Joi.string().required().max(20),
    last_name: Joi.string().required().max(20),
    mobile: Joi.string().required().pattern(/0[0-9]{9}/).external(mobileValidator),  
    id_card: Joi.string().required().pattern(/[0-9]{13}/).external(id_cardValidator),
    agency: Joi.string().required(),
    otp: Joi.string().required().min(6).max(6),
})

/// API SingUp
router.post('/signup', async (req, res, next) => {
    try {
        await signupSchema.validateAsync(req.body, { abortEarly: false })
    } catch (err) {
        return res.status(400).send(err.toString())
    }

    const conn = await pool.getConnection();

    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    const id_card = req.body.id_card;
    const agency = req.body.agency;
    const mobile = req.body.mobile;
    const otp = req.body.otp;
    try{
        const hashOTP = await conn.execute(`SELECT OTP FROM OTP WHERE MOBILE = :v1`,{v1:mobile},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        if(hashOTP.rows[0]){
            const compare = bcrypt.compareSync(otp,hashOTP.rows[0].OTP)
            if(compare){
                try {
                    await conn.execute(`INSERT INTO USERS(FIRST_NAME, LAST_NAME, ID_CARD, MOBILE, AGENCY) VALUES(:v1, :v2, :v3, :v4, :v5)`,
                    {v1:first_name, v2:last_name, v3:id_card, v4:mobile, v5:agency}, {autoCommit:true})
                    await conn.execute(`DELETE FROM OTP WHERE MOBILE = :v1`,{v1:mobile},{autoCommit:true})
                    console.log("Successfully sign up: "+first_name)
                    res.status(201).json({msg:"ลงทะเบียนสำเร็จ"})
                } catch (err) {
                    conn.rollback()
                    res.status(400).json(err.toString());
                }
            }else{
                res.status(400).json({msg:"รหัส OTP ไม่ถูกต้อง"})
            }
        }else{
            res.status(404).json({msg:"เบอร์โทรศัพท์ที่ไม่รู้จัก กรุณากดส่ง OTP อีกครั้ง"})
        }
    }catch(err){
        console.log(err.toString())
    }finally{
        if(conn){
            try{
                conn.close();
                console.log('close Connection')
            }catch(err){
                console.log(err.toString())
            }
        }
    }
})


/// validate ข้อมูลที่ใช้ SingUp
const loginSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
})

/// login
router.post('/signin',async (req,res) => {
    try{
        await loginSchema.validateAsync(req.body, { abortEarly: false })
    }catch(err){
        return res.status(400).send(err.toString())
    }
    const id_card = req.body.username;
    const mobile = req.body.password;
    const conn = await pool.getConnection();
    try{
        const users = await conn.execute(`SELECT * FROM USERS WHERE ID_CARD = :v1`,
        {v1:id_card},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        const user = users.rows[0];
        if(!user){
            throw new Error('username หรือ password ไม่ถูกต้อง')
        }
        if(!(mobile == user.MOBILE)){
            throw new Error('username หรือ password ไม่ถูกต้อง')
        }

        const tokens = await conn.execute(`SELECT * FROM TOKENS WHERE USER_ID = :v1`,
        {v1:user.USER_ID},{outFormat:oracledb.OUT_FORMAT_OBJECT})
        var token = tokens.rows[0]?.TOKEN
        if(!token){
            token = generateToken()
            await conn.execute(`INSERT INTO TOKENS(USER_ID, TOKEN) VALUES(:v1, :v2)`,
            {v1:user.USER_ID, v2:token}, {autoCommit:true})
        }
        console.log(token)
        res.status(200).json({token: token})
    }catch(err){
        conn.rollback()
        res.status(400).json(err.toString())
    }finally{
        if(conn){
            try{
                conn.close();
                console.log('close Connection')
            }catch(err){
                console.log(err)
            }
        }
    }
})

module.exports = router;