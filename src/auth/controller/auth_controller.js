const service = require("../service/auth_service")
const authView = {
    
    loginForm: (req, res) => {
        
       res.render("loginForm");
    },
    registerForm:()=>{
        res.render("registerForm");
    }
    
};

const authProcess={
    loginCheck : async(req, res) => {
        console.log(req.body)
        const loginCheckresult = await service.authProcess.loginCheck( req.body );
        if( loginCheckresult.result === 1){
            req.session.username = loginCheckresult.name;
            res.locals.sessionUsername = req.session.username;
            res.render("mainView",{session:req.session.username})
         }else{
            res.send(loginCheckresult.msg)
        }
        
        
        
     },
    registerCheck : (req, res) => {
        res.render("registerCheck");
     },
   
     
}





module.exports={authView,authProcess};