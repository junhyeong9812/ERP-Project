const router = require("express").Router();
const boardCtrl =require("../controller/board_controller")
router.get("/",boardCtrl.board_views.list)
router.get("/data/:num",boardCtrl.board_views.data);
router.get('data', (req, res) => {
    const num = req.params.num;
    // 데이터를 조회하고 응답을 처리하는 로직
    res.send('Data for ' + num);
});
router.get("/write_form/:userId",boardCtrl.board_views.write_form)
// router.post("/write",boardCtrl.board_views.write)

//파일 업로드 구현
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log('req:',req.body);
        console.log("file :",file)
        console.log("cb: ",cb)
        
      cb(null, 'upload_file/') // 업로드 디렉토리 설정
  },
  filename: function (req, file, cb) {
      cb(null, Date.now()+"-"+file.originalname) // 파일명 설정
  }
});
const f_filter=(req,file,cb)=>{
    console.log("f_filter file",file.mimetype.split("/"));
    const type=file.mimetype.split("/");
    if(type[0]=="image"){
        cb(null,true)
    }else{
        req.fileValidation="이미지만 저장하세요";
        cb(null,false)
    }
}


// const fileCtrl=require("../controller/file_controller")

const upload = multer({ storage: storage, fileFilter:f_filter });
router.post('/upload', upload.single('upload'), (req, res) => {
    if (req.fileValidation) {
        return res.status(400).json({ error: req.fileValidation });
    }
    const url = `${req.protocol}://${req.get('host')}/board/givedata/${req.file.filename}`;
    console.log(url)
    res.json({
        uploaded: true,
        url: url
    });
});
router.get('/givedata/:filename',boardCtrl.board_process.givedata)
router.post("/write",boardCtrl.board_process.write)
router.get("/delete/:writeNo",boardCtrl.board_process.delete);
module.exports=router;