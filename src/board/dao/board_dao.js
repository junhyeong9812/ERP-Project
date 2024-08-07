const con =require("../../../config/database/db_connection")
const boardRead={
    data : async(num)=>{
        console.log("daoBD",num)
        const sql =`select * from board where write_no=${num}`;
        const data=await(await con).execute(sql);
        console.log("BDdao",data)
        //data는 promise로 오기 때문에 만약 data를 data함수 안에서 사용하기 위해서는
        //위 값에 대해 await을 한번 더 해줘야 된다.
        return data;
    },
    list :async (start,end)=>{
        // const sql ="select * from board";
        // const sql = `select * from (select rownum rn, A.* from 
        //     (select * from board order by write_no desc)A)
        //     where rn between ${start} and ${end}`;
        const sql = `select * from (select rownum rn, A.* from 
            (select * from board order by write_no desc)A)
            `;
        const list =(await con).execute(sql);
        //con을 직접 받을 때 await을 통해 con을 우선 처리해야된다.
        //우선처리 필수
        return list
    },
    totalContent : async () => {
        const sql = "select count(*) from board";
        const totalContent = await (await con).execute( sql );
        return  totalContent.rows[0]['COUNT(*)'];
    } ,
    writeform :async(id)=>{
        
        console.log("dao:",id)
        const sql = `select * from user_accounts where USER_ID='${id}'`;
        console.log(sql)
        const userData = await (await con).execute( sql );
        console.log("userData:",userData)
        return userData;
    }
}
boardUpdate={
    modify : async ( body )=>{
        const sql = `update board set title=:title, content=:content, 
            origin_file_name=:origin_file_name, 
            `;
        //    return (await con).execute( sql, body );
        let result=0;
        try{
            result=(await con).execute( sql, body );
        }catch(err){
            console.log(err);
        }
        return result;
    },
    delete : async (writeNo)=>{
        const sql = `delete from board where write_no=${writeNo}`;
        await(await con).execute(sql);
    },
    upHit :async(num)=>{
        const sql = `update board set hit=hit+1 where write_no=${num}`;
        (await con).execute(sql);
    },
}
const boardProcess={
    write:async(writeData)=>{
        console.log("daoBody:",writeData)
        const sql =`insert into board(write_no,id,title,content,origin_file_name,
            change_file_name) values((select max(write_no)from board)+1, :id, :title,:content,
            :origin_file_name, :origin_file_name)`;
        const result = await (await con).execute(sql,writeData);
        const sqlWn=`select max(WRITE_NO) from board`;
        const write_no = await (await con).execute(sqlWn);
        console.log("result :" , result);
        const resultWr={
            daoResult:result,
            num:write_no.rows[0]['MAX(WRITE_NO)']
        }
        return resultWr;
    }
}

module.exports={boardRead,boardUpdate,boardProcess}