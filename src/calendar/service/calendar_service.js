const dao = require("../dao/calendar_dao")

const readViews = {
    readCal : async () => {
        const result = await dao.readViews.calRead()
        console.log("ser ", result.rows)
        
        return result.rows
    },
    teamGetter : async (team) => {
        let teamName = team.replace('_', ' ')
        const result = await dao.readViews.teamGetter(teamName)
        console.log("teamGetter ser", result.rows)
        return result.rows
    },
    teamGroupMake : async () => {
        const result = await dao.readViews.infoRead()
        let group = []
        result.rows.forEach((dict) => {
            if (group.indexOf(dict.TEAM) == -1)
                group.push(dict.TEAM)
        })
        
        return group;
    },
    privateRead : async () => {
        const result = await dao.readViews.privateRead()
        console.log("privateRead", result.rows)
        return result.rows
    }
}

const writeInsert = {
    addSchedule : async (body) => {
        if(!('private' in body)){
            body.private = 'off'
        } 
        
        console.log("ser writeInsert body", body)
        const result = await dao.writeInsert.addSchedule(body)
        console.log("ser result", result)
        return result.rowsAffected;
    },
    
}

const writeDelete = {
    deleteSchedule : async (body) => {
        console.log("del ser body", body)
        const result = await dao.writeDelete.deleteSchedule(body)
        console.log("del ser result", result)
        return result.rowsAffected;
    }
}
const writeModify = {
    dragModify : async (body) => {
         
        console.log("drag event body", body)
        const result = await dao.writeModify.dragModify(body)
        console.log("del ser result", result)
        return result.rowsAffected;
    },
    modifySchedule : async (body) => {
        if(body[0].private){
            body[0].private = 'on'
        } else {
            body[0].private = 'off'
        }
        if(!('private' in body[1])){
            body[1].private = 'off'
        } 
        console.log("ser modi-writeInsert body", body)
        const result = await dao.writeModify.modifySchedule(body)
        console.log("ser modi-result", result)
        return result.rowsAffected;
    },
}

module.exports = {readViews, writeInsert, writeDelete, writeModify}