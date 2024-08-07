const memberDAO = require("../../database/member/member_dao")

const getList = async () => {
    const result = await memberDAO.getList();
    console.log("service!!! :", result);
    return result.rows;
}

const insert = async () => {
    const result = await memberDAO.insert()
    let msg = "", url ="";
    console.log(result)
}

module.exports= {
    getList, insert
}