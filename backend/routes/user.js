const express = require("express");
const config = require("../config");
const oracledb = require("oracledb");
const path = require("path")


router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World!')
})

router.get('/test', async (req, res, next) => {
    const pool = oracledb.createPool(config);
    const conn = await pool.getConnection();
    try {
        const [user] = await conn.execute(
            "SELECT * FROM USERS"
        );
        console.log(user)
    } catch (err) {
        res.status(400).json(err);
    } finally {
        conn.release();
    }
})

exports.router = router