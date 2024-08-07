const con = require("../../../config/database/db_connection")

const readViews = {
    calRead : async () => {
        const sql = "select * from calendar where private='off' OR user_id='hhh'";
        const result = (await con).execute(sql);
        console.log("calRead", result)
        return result;  
    },
    teamGetter : async (teamName) => {
        const sql = `select * from calendar where team='${teamName}' and private='off'`
        const result = (await con).execute(sql);
        return result
    },
    infoRead : async () => {
        const sql = "select * from user_accounts";
        const result = (await con).execute(sql);
        console.log("infoRead", result)
        return result;  
    },
    privateRead : async () => {
        const sql = "select * from calendar where private='on' and user_id='hhh'";
        const result = (await con).execute(sql);
        console.log("infoRead", result)
        return result;  
    },
}
const writeInsert = {
    addSchedule : async (body) => {
        console.log("new calendar body", body)
        const sql = `insert into calendar (title, startdate, enddate, color, team, user_id, private)
                    select '${body.title}', '${body.start}', '${body.end}', '${body.color}', ua.team, ua.user_id, '${body.private}'
                    from user_accounts ua
                    where user_id='hhh'`

        console.log("sql", sql)
        let result = 0;
        try{
            result =await(await con).execute(sql)
        }catch(err) {
            console.log(err)
        }
        console.log("result", result)
        
        return result;
    }
}
const writeDelete = {
    deleteSchedule : async (body) => {
        const sql = `delete from calendar where cal_id='${body.id}'`;
        let result = 0;
        
        try{
            result = await (await con).execute(sql)
        } catch(err) {
            console.log(err)
        }
        console.log("del dao result", result)

        return result
    }
}
const writeModify = {
    dragModify : async (body) => {
        console.log("body[0]", body[0])
        console.log("body[1]", body[1])
        let sql = '';
        if(body[0].end === ''){
            sql = `update calendar set title='${body[1].title}', startdate='${body[1].start}', private='${body[1].private}'
                            where cal_id='${body[0].id}'`
            
        }else {
            sql = `update calendar set title= '${body[1].title}', startdate='${body[1].start}', enddate='${body[1].end}'
                            , color='${body[1].color}'
                          where cal_id='${body[0].id}'`
        }
        console.log("sql", sql)
        let result = 0;
        try{
            result = await (await con).execute(sql)
        }catch(err){
            console.log(err)
        }
        console.log("dragModify dao", result);
        return result;
    },
    modifySchedule  : async (body) => {
        console.log("body", body)
       let sql = ''
       if(body[0].end === ''){
        sql = `update calendar set title='${body[1].title}', startdate='${body[1].start}', color='${body[1].color}' , private='${body[1].private}'
                            where cal_id='${body[0].id}'`
        
        }else {
            sql = `update calendar set title= '${body[1].title}', startdate='${body[1].start}', enddate='${body[1].end}'
                            , color='${body[1].color}', private='${body[1].private}'
                            where cal_id='${body[0].id}'`
        }
        console.log("sql", sql)
        let result = 0;
        try{
            result = await (await con).execute(sql)
        }catch(err) {
            console.log(err)
        }
        console.log("result", result)
        
        return result;
    }
}

module.exports = {readViews, writeInsert, writeDelete, writeModify}