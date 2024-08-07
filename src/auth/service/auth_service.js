const authDAO=require("../dao/auth_dao")
const bcrypt = require("bcrypt");
const authProcess={
    loginCheck : async(body) => {
        let idCheck = await authDAO.authProcess.loginCheck( body.id );
        console.log("idCheck",idCheck)
        idCheck=idCheck.rows[0];
        let msg="",url="",authResult={};
        if(idCheck==0){
            msg="존재하지 않는 아이디입니다."
            url="/auth/login";
            authResult.result=0;
        }else{
            if(body.pwd===idCheck.PWD){
                //||bcrypt.compareSync(body.pwd,idCheck.PWD)
                msg=`${idCheck.NAME}님 환영합니다.`
                url="/main"
                authResult.result=1;
                authResult.name=idCheck.NAME;
            }else{
                msg="비밀번호가 틀렸습니다."
                url="/auth/login";
                authResult.result=0;
            }
        }
        authResult.msg=getMessage(msg,url);
        return authResult;
     },
    registerCheck : (req, res) => {
        res.render("registerCheck");
     },
}
const  getMessage = (msg, url) =>{
    return `<script>alert('${msg}'); location.href="${url}";</script>`;
}


module.exports={authProcess};