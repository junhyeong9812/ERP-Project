const con =require("../../../config/database/db_connection");


const authProcess={
    loginCheck : async (id)=>{
        const sql=`select * from members where id='${id}'`;
        let idCheck_result=0;
        try{
            idCheck_result = await(await con).execute(sql);
        }catch(err){
            console.log( err );
        }
        return idCheck_result;
    }
}

module.exports={authProcess};