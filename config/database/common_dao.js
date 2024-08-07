const oracledb = require("oracledb")
const dbConfig = require("./db_config")
oracledb.autoCommit = true;
oracledb.outFormat = oracledb.OBJECT;

const dbcon = async () =>{
    return await oracledb.getConnection( dbConfig )
}
module.exports = dbcon;