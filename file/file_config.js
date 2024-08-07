const multer = require("multer");
const stg = multer.diskStorage({
    destination : ( req , file, cb ) => {
        cb(null,  "upload_file")
    },
    filename : ( req, file, cb) => {
        cb(null, Date.now()+"-"+file.originalname );
    }
})

const f_filter = (req, file, cb) =>{
    const type = file.mimetype.split("/");
    if( type[0] != "image"){
        cb(null, true);
    }else{
        req.fileValidation = "코드파일 저장"
        cb(null, false);
    }
}
const upload = multer({storage : stg, fileFilter : f_filter })
module.exports = upload;