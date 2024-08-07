module.exports=(app)=>{
   
    const router =require("express").Router();


    router.get("/",(req,res)=>{ //메인 폴더 연결
        res.render("./welcomePage.ejs")
    })

   //로그인 기능 연결
    const authRouter=require("./src/auth/router/auth_router");
    app.use("/auth",authRouter);

    //코드연결
    const codeRouter = require("./src/board/router/board_code_router");
    app.use("/board", codeRouter)
    
    return router;
}