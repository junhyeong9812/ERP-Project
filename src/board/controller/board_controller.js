const service = require("../service/board_service")

const board_views={
    data : async(req,res)=>{
        const data =await service.boardRead.data(req.params.num);
        //글의 값을 받아오기 위한 함수
        if(req.params.num==undefined){
            res.send(`<script>
            alert=("세션이 만료되었습니다.");
            window.location.href="/auth/loginForm";</script>`);
        }else{
            try{
        console.log(req.session.result.name)
        const username=req.session.result.name;
        //사용자와 데이터가 일치하는 지 로그인 사용자 유무
        // data,
        res.render("data",{data,username})
        }catch(err){
            console.log(err);
            res.redirect=("/auth/loginForm")
        }
        
    }
    },
    list :async (req,res)=>{
        const data =await service.boardRead.list(req.query.start);
        console.log("list:",data.list)
        console.log("start:",data.start)
        console.log("total:",data.totalPage)
        res.render("list",{list :data.list,
            start:data.start,
        totalPage : data.totalPage});

    },
   write_form: async(req,res)=>{
    console.log("ctrlDT",req.params)
    const data = await service.boardRead.idCheck(req.params.userId);
    console.log("CTRLDT:",data)
    res.render("write_form",{data})

   }
}
const path=require("path")
const board_process={
    write : async (req,res)=>{
        console.log("writeCTRL:",req.body)
        const result= await service.boardProcess.write(req.body);
        
        if(result.daoResult.rowsAffected==1){
            console.log(result)
        res.redirect(`data/${result.num}`)
        }else{
            res.redirect("write_form/");
        }
    },
    givedata:(req,res)=>{
        const filename = req.params.filename;
    const options = {
        root: path.join(__dirname, '..','..', '..', 'upload_file'), // 파일이 저장된 디렉토리 지정
        dotfiles: 'deny',  // 숨김 파일 접근 금지
        headers: {
            'x-timestamp': Date.now(),
            'x-sent': true
        }
    };

    res.sendFile(filename, options, (err) => {
        if (err) {
            console.log(err);
            res.status(404).send("File not found!");
        } else {
            console.log('Sent:', filename);
        }
    });
    },
    delete : async(req,res)=>{
        // 데이터베이스에서 삭제 성공 시 file삭제
        //성공이 되야 if문을 통해 파일 삭제
        console.log(req.params)
        console.log(req.params.write_No)
        const result= await service.boardUpdate.delete(req.params.writeNo);
        
        res.json(result)
       
    },
   
}

module.exports={board_views,board_process};