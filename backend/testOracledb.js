const oracledb = require('oracledb');

const test = () => {
    try {
        oracledb.initOracleClient({libDir: 'C:\Program Files\instantclient_19_15_SDK'});
    } catch (err) {
        console.error('Whoops!');
        console.error(err);
        process.exit(1);
    }
}

test();

