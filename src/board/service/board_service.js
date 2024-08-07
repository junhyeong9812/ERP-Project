const dao =require("../dao/board_dao");
const fs = require('fs');
const path = require('path');
const boardRead={
    list :async(start)=>{
        const totalCounter=await dao.boardRead.totalContent();
        start=(start&&start>1)? Number(start) : 1;
        const page = pageOperation(start,totalCounter);
        let list =await dao.boardRead.list(page.startNum,page.endNum);

        // const list =await dao.boardRead.list();
        list=timeModify(list.rows);
        // let list =await dao.boardRead.list();
        // list =common.timeModify(list.rows);
        // return list;
        // return list.rows;
        data={}; data.totalPage=page.totPage;
        data.start=start; data.list=list;
        
        return data;
    },
    data : async(num)=>{
        boardUpdate.upHit(num);
        let data=await dao.boardRead.data(num);
        data=timeModify(data.rows);
        return data[0]
    },
    idCheck: async(id)=>{
        console.log("serID",id)
        let result=await dao.boardRead.writeform(id);
        return result.rows[0].USER_ID;
    }
}
boardUpdate={
    modify :async (body,file)=>{
        if(file !== undefined){
            body.origin_file_name=file.originalname;
            body.change_file_name=file.filename;
        }
        console.log("Body=>",body);
        // const result =await dao.boardUpdate.modify(body);
        let result=0;
        try{
        result=await dao.boardUpdate.modify(body);
        console.log("service ty:",result)
        }catch(err){
            console.log(err)
        }
        console.log("result=>",result);
        let msg,url;
        let message={};
        // message.result=result.rowsAffected;
        // // rousAffect를 사용해도 된다.
        // //결과값에 1이 들어갔는 지 아니면 언디파인인 지 
        // //rowsAffected에 대해 복습 
        // if(message.result==1){
        //     msg="수정되었습니다.";
        //     url=`/board/data/${body.write_no}`
        // }else{
        //     msg="문제 발생!!!";
        //     url=`/board/modify_form/${body.write_no}`
        // }
        // message.result=result.rowsAffected;
        // rousAffect를 사용해도 된다.
        //결과값에 1이 들어갔는 지 아니면 언디파인인 지 
        //rowsAffected에 대해 복습 
        if(result.rowsAffected==1){
            msg="수정되었습니다.";
            url=`/board/data/${body.write_no}`
        }else{
            msg="문제 발생!!!";
            url=`/board/modify_form/${body.write_no}`
        }
        message.msg=common.getMessage(msg,url);
        return message;
    },
    delete : async(writeNo)=>{
        console.log("serboard:",writeNo)
        let data=await dao.boardRead.data(writeNo);
        if(data.rows[0].ORIGIN_FILE_NAME){
        let result=data.rows[0].ORIGIN_FILE_NAME;
        delFile(result);
        await dao.boardUpdate.delete(writeNo);
        }
        return 1;
    },
    upHit:(num)=>{
        dao.boardUpdate.upHit(num);
    },
}
function delFile(fileList){
    if(fileList){
    const fileNames = fileList.split(',');
    fileNames.forEach(fileName => {
        const filePath = path.join(__dirname, 'upload_file', fileName);
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file ${fileName}: ${err.message}`);
            } else {
                console.log(`${fileName} was deleted successfully.`);
            }
        });
    });
    }else{

    }

// 각 파일을 /upload_file 디렉토리에서 삭제

}
const timeModify=(list)=>{
    //우리가 가져온 시간 값을 변경하여 다시 보내주도록 한다
    list=list.map((data)=>{
        //map은 연산을 통해 리턴 값을 연산에 넣어준다.
        // 모든 데이터가 1줄 씩 들어왔을 때
        data.SAVE_DATE=data.SAVE_DATE.toLocaleString();
        //시간의 데이터를 돌려주면
        return data;
        //data위치로 그대로 들어간다.
    });
    return list;
    
}
const pageOperation = (start, totalCounter)=>{
    let page = {};
    const pageNum = 3; //페이지당 보여줄 개수
    const num = (totalCounter % pageNum === 0)?0:1;

    page.totPage = parseInt( totalCounter / pageNum ) + num;
    
    page.startNum = (start-1) * pageNum + 1;
    page.endNum = start * pageNum;
    return page;
}

const boardProcess={
    write:async(body)=>{
        const imageData=extractImageFilenames(body.content)
        const contentImg=arrayToString(imageData)
        const writeData={
            id:body.id,
            title:body.title,
            content:body.content,
            origin_file_name:contentImg
        }
        const result =await dao.boardProcess.write(writeData);
        return result;
    },

}
function extractImageFilenames(content) {
    const regex = /givedata\/([^"]+)/g;
    const matches = [];

    let match;
    while ((match = regex.exec(content)) !== null) {
        matches.push(match[1]); // 파일 이름 부분만 추출
    }

    return matches;
}
function arrayToString(array) {
    // 배열의 요소를 쉼표로 구분하여 문자열로 변환
    return array.join(',');
}



module.exports={boardRead,boardProcess,boardUpdate}