const router =require("express").Router();

const authCtrl =require("../controller/auth_controller");


router.get("/loginForm",authCtrl.authView.loginForm);
router.get("/registerForm",authCtrl.authView.registerForm);
router.post("/loginCheck",authCtrl.authProcess.loginCheck);
router.post("/registerCheck",authCtrl.authProcess.registerCheck);





module.exports=router;
