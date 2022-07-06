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
function gettime(){
    const timeNow =  new Date().toLocaleString();
    var timeEnd =  new Date();
    timeEnd.setMinutes(timeEnd.getMinutes() + 1);
    timeEnd = timeEnd.toLocaleString();
    return {timeNow:timeNow,timeEnd:timeEnd}
}

async function autoDeleteOtp(mobile){
        const conn = await pool.getConnection()
        const result = await conn.execute(`SELECT END_DATE FROM OTP WHERE MOBILE = :v1`,
        {v1:mobile},
        {outFormat:oracledb.OUT_FORMAT_OBJECT})
        const time = gettime()
        if(time.timeNow > result.rows[0].END_DATE){
            try{
                await conn.execute(`DELETE FROM OTP WHERE MOBILE = :v1`, 
                    {v1:mobile}, {autoCommit:true})
                console.log('OTP เบอร์ '+mobile+' หมดอายุแล้ว')
                return
            }catch(err){
                conn.rollback
                console.log(err)
            }
        }else{
            console.log("มีการส่ง OTP เบอร์ "+mobile+" ใหม่ OTP ปัจจุบันยังไม่หมดอายุ")
            const recursivecooldown = Date.parse(result.rows[0].END_DATE) - Date.parse(time.timeNow) +5000
            
            setTimeout(()=>autoDeleteOtp(mobile), recursivecooldown)
        }

        try{
            conn.close();
            console.log("ปิด pool drop OTP แล้ว")
        }catch(err){
            console.log(err)
        }
}
router.post('/sentotp', async (req,res) => {
    const conn = await pool.getConnection()
    const hashotp = bcrypt.hashSync(generateOTP(), 10);
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
        res.status(201).json({msg:"OTP ถูกส่งไปยังหมายเลขโทรศัพท์ "+mobile+" แล้ว"})
        /// ตั้งเวลาหมดอายุ OTP
        setTimeout(()=>autoDeleteOtp(mobile), 65000)
    }catch(err){
        conn.rollback
        console.log(err)
        res.status(400).json({msg:err})
    }finally{
        if(conn){
            try{
                conn.close();
                console.log('ปิด pool หลักแล้ว')
            }catch(err){
                console.log(err)
            }
        }
    }
})


module.exports = router;