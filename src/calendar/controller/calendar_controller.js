const ser = require("../service/calendar_service")

const views = {
    calendar : async (req, res) => {
        const result = await ser.readViews.readCal()
        const group = await ser.readViews.teamGroupMake();
        res.render("calendar", {data : result, group})
        // res.render("calendar");
    },
    write_form : (req, res) => {

        res.json("write_form")
    },
    modifyFrom : (req, res) => {

        res.json("modify_form")
    },
    teamSelector : async (req, res) => {
        res.json("team_selector")
    }
}

const process = {
    calList : async (req, res) => {
        const result = await ser.readViews.readCal()
        console.log("ctrl ", result)
        res.json(result)
    },
    addSchedule : async (req, res) => {
        console.log("upload body", req.body)
        const result = await ser.writeInsert.addSchedule(req.body)
        console.log("ctrl result : ", result)
        res.json(result)
    },
    modifySchedule : async (req, res) => {
        console.log("body", req.body)
        const result = await ser.writeModify.modifySchedule(req.body)
        res.json(result)
    },
    delete : async (req, res) => {
        console.log("del ctrl body", req.body)
        const result = await ser.writeDelete.deleteSchedule(req.body)

        res.json(result)
    },
    dragModify : async (req, res) => {
        console.log("drag event", req.body)
        const result = await ser.writeModify.dragModify(req.body)

        res.json(result)
    },
    teamGetter : async (req, res) => {
        //팀명을 전달하여 팀별 정보를 가져옴
        const result = await ser.readViews.teamGetter(req.params.teamname)

        res.json(result)
    }, 
    privateRead : async (req, res) => {
        //개인 스케줄 가져오기
        const result = await ser.readViews.privateRead()

        res.json(result)
    }
}
module.exports = {views, process}