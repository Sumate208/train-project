const config = require("../config");
const oracledb = require("oracledb");
var pool;
const cPool = async() =>{
    pool = await oracledb.createPool(config);
}
cPool();

async function logger (req, res, next) {
    const timestamp = new Date().toISOString().substring(0, 19)
    console.log(`${timestamp} | ${req.method}: ${req.originalUrl}`)
    next()
}

async function isLoggedIn (req, res, next) {
    const conn = await pool.getConnection();
    let authorization = req.headers.authorization
    
    if (!authorization) {
        return res.status(401).send('You are not logged in')
    }
    
    let [part1, part2] = authorization.split(' ')
    if (part1 !== 'Bearer' || !part2) {
        return res.status(401).send('You are not logged in')
    }
        
    // Check token
    const tokens = await conn.execute(`SELECT * FROM TOKENS WHERE TOKEN = :v1`,{v1:part2},{outFormat:oracledb.OUT_FORMAT_OBJECT})
    const token = tokens.rows[0]
    if (!token) {
        return res.status(401).send('You are not logged in')
    }
    
    // Set user
    const users = await conn.execute(`SELECT * FROM USERS WHERE USER_ID = :v1`, 
        {v1:token.USER_ID},{outFormat:oracledb.OUT_FORMAT_OBJECT}
    )
    req.user = users.rows[0]

    next()
    }

module.exports = {
    logger,
    isLoggedIn
}