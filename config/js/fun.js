window.onload = function() {
  // 서버에서 세션 유효성 검증 실패시 로그인 페이지로 리다이렉트 되도록 설정
  if (window.location.pathname === '/login') {
      alert('Your session has expired. Please log in again.');
  }
  // setInterval(checkSession, 3000); 
  if(`<%- data.CONTENT %>`!==undefined){
    const content=document.getElementById("dataContent").innerHTML=`<%= data.CONTENT %>`
  }
  // setInterval(loadMessages,1000);
  setInterval(function() {
    console.log('Attempting to load messages...');
    loadMessages();
  }, 1000);
  //
//   setInterval(function() {
//     fetch('/check-session')
//         .then(response => {
//             if (!response.ok) {
//                 window.location.href = '/logout'; // 세션 만료 시 로그아웃 처리
//             }
//         })
//         .catch(console.error);
// }, 5000);
// 주기적으로 세션이 존재하는 지 검사하는 코드
};
//세션 확인
// function checkSession() {
//   fetch('/check-session')
//       .then(response => response.json())
//       .then(data => {
//           if (!data.loggedIn) {
//               console.log('Session expired or user not logged in');
//               // Optionally redirect to login page
//               // window.location.href = '/login.html';
//           } else {
//               console.log('User is still logged in');
//           }
//       })
//       .catch(error => console.error('Error checking session:', error));
// }

// Check session every 5 minutes

function board_view(num){
  console.log(num)
    fetch(`/board/data/${num}`)
    .then(res=>res.text())
    .then(html =>{
     document.getElementById("dashboard").innerHTML=html;
    //  executeScripts(dashboard);
    })
    function executeScripts(container) {
      // container 내의 모든 스크립트를 찾습니다.
      const scripts = container.querySelectorAll('script');
  
      // 각 스크립트에 대하여
      scripts.forEach(oldScript => {
          const newScript = document.createElement('script');
  
          // 스크립트 속성 복사
          Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
  
          // 스크립트 내용 복사
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
  
          // 기존 스크립트를 대체
          oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
 }
 function board(){
    fetch(`/board`)
    .then(res=>res.text())
    .then(html =>{
     document.getElementById("dashboard").innerHTML=html; 
     $('#dataTable').DataTable({
      "lengthMenu": [[3, 5, 10, 25, 50, -1], [3, 5, 10, 25, 50, "All"]],
      "language": {
        "lengthMenu": 'Display <select>'+
          '<option value="3">3</option>'+
          '<option value="5">5</option>'+
          '<option value="10">10</option>'+
          '<option value="25">25</option>'+
          '<option value="50">50</option>'+
          '<option value="-1">All</option>'+
          '</select> records'
      }
    });
     //초기화 리로드 필수
    })
 }

 function write_form() {
  const userId = document.getElementById("userId").textContent;
  // const userId=session.result.name;
  fetch(`/board/write_form/` + userId)
    .then(res => res.text())
    .then(html => {
      document.getElementById("dashboard").innerHTML = html;
      if (!window.CKEditor) {
        loadScript('../../../static/ckeditor5-build-classic-41.3.1/build/ckeditor.js', () => {
          initializeEditor();
        });
      } else {
        initializeEditor();
      }
    });
}

function initializeEditor() {
  ClassicEditor
    .create(document.querySelector('#board_content'), {
      language: 'ko',
      simpleUpload: {
        uploadUrl: '/board/upload'
      }
    })
    .then(editor => {
      window.editor = editor;
      window.CKEditor = true; // CKEditor가 초기화되었음을 표시
    })
    .catch(error => {
      console.error('Error initializing editor:', error);
    });
}

function loadScript(src, callback) {
  let script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = src;
  script.onload = callback;
  document.head.appendChild(script);
}

function getEditorData() {
  const data = editor.getData();
  console.log(data);  // 콘솔에 에디터의 현재 내용을 출력
  return data;
}
document.querySelector('form').addEventListener('submit', function() {
  document.getElementById('board_content').value = editor.getData();
});

function deleteboard(num){
  
  fetch(`/board/delete/${num}`)
    .then(res=>res.json())
    .then(html =>{
     
    board();
     //초기화 리로드 필수
    })

}
//--------차트
function loadContribution() {     //  구글 chart api 가 로딩이안되니까 여기서 로딩 해버림 그냥
  fetch('/contribution/selectTeam')
      .then(response => response.text())
      .then(data => {
          console.log("codeline");
          document.getElementById('contributionContainer').innerHTML = data;
});
}


function loadMVP(){
  fetch('/contribution/MVP')
      .then(response => response.text())
      .then(data =>{
          console.log("MVP");     
          document.getElementById('contributionContainer').innerHTML = data;
          google.charts.load('current', {'packages':['bar']});
          google.charts.setOnLoadCallback(drawChart_MVP);
      })
}


function selectButton(button) {
let teamName = JSON.parse(button.getAttribute("data-team"));
console.log("teamname:",teamName);

$.ajax({   //ajax 는 controller의 res.json 만 받는다  
  type: "get",
  url: "/contribution/forEachTeamData" ,
  data: { team: teamName },
  success: function(response) {
    
    let contributionsForEachTeam = response.contributionsForEachTeam;
    contributionsForEachTeam=JSON.stringify(contributionsForEachTeam);
    let currenTeam= JSON.stringify(response.currenTeam);
    var piechart = document.getElementById("piechart");
    let html = `
      <a hidden id="teamName" data-teamName='${currenTeam}'></a>
      <a hidden id="ft" data-contributionsForEachTeam='${contributionsForEachTeam}'></a>
      <div id="employee_piechart_ForEachTeam" style="width: 500px; height: 500px; float: left;"></div>
    `;

    piechart.innerHTML = html;
    drawChart_contribution(currenTeam);
  },
  error: function(error) {
    console.error("Error sending data to server:", error);
  }
});
}


function drawChart_contribution(teamName) {
google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(function() { //sets a callback function to be executed when the Google Charts library has finished loading

let contributionsForEachTeamData = JSON.parse(document.getElementById("ft").getAttribute("data-contributionsForEachTeam"));
  
var data = google.visualization.arrayToDataTable(contributionsForEachTeamData);
var options = {
    title: teamName
  };
  var chart = new google.visualization.PieChart(document.getElementById('employee_piechart_ForEachTeam'));
  chart.draw(data, options);
});
}

function drawChart_MVP() {

  let tempArr=[];
  let voteArr=[];
  voteArr.push( ['name', 'likes']);
  tempArr=JSON.parse(document.getElementById("voteArr").getAttribute("data-mvpArr"));
  
  for(let i=0; i < tempArr.length ; i++){
      voteArr.push([tempArr[i].userName, tempArr[i].vote ]);
  }
  console.log("voteArr(drawchart):",voteArr);

  var data1 = google.visualization.arrayToDataTable(
      voteArr
  );
  
  var options1 = {
      chart: 
          {
          title: 'Reputation',
          subtitle: '',
          },

      bars: 'vertical' ,// Required for Material Bar Charts.

      series: {
          0: { color: 'red' },   
 
      }
  };

  var chart1 = new google.charts.Bar(document.getElementById('barchart_material'));
  chart1.draw(data1, google.charts.Bar.convertOptions(options1));
}   

//--------차트 끝


function calendar(){
  // document.getElementById("dashboard").innerText="달력";

  fetch(`/calendar`)
  .then(res=>res.text())
  .then(html =>{
    console.log(html)
   document.getElementById("dashboard").innerHTML=html; 
   executeScripts(dashboard);
  //  초기화 리로드 필수
  })
}
function executeScripts(container) {
  // container 내의 모든 스크립트를 찾습니다.
  const scripts = container.querySelectorAll('script');

  // 각 스크립트에 대하여
  scripts.forEach(oldScript => {
      // 새로운 script 엘리먼트 생성
      const newScript = document.createElement('script');
      
      // src 속성이 있는 경우
      if (oldScript.src) {
          // src 속성 복사
          newScript.src = oldScript.src;
      } else {
          // 내용이 있는 경우 내용 복사
          newScript.appendChild(document.createTextNode(oldScript.innerHTML));
      }

      // 스크립트 속성 복사
      Array.from(oldScript.attributes).forEach(attr => {
          if (attr.name !== 'src') {
              newScript.setAttribute(attr.name, attr.value);
          }
      });

      // 기존 스크립트를 대체
      oldScript.parentNode.replaceChild(newScript, oldScript);
  });
}

//  function write_form() {
//   const userId = document.getElementById("userId").textContent;
//   console.log("jsID", userId);
//   fetch(`/board/write_form/` + userId)
//     .then(res => res.text())
//     .then(html => {
//       document.getElementById("dashboard").innerHTML = html;
//       loadScripts([
//         `../../../static/ckeditor5-build-classic/ckeditor.js`, // CKEditor 스크립트를 로드
//         '../../../static/ckeditor5-build-classic/translations/ko.js'  // 언어팩 로드 (이 경로가 실제와 다를 수 있으므로 확인 필요)
//       ], () => {
//         // 모든 스크립트 로드 후 에디터 초기화
//         ClassicEditor
//           .create(document.querySelector('#board_content'), {
//             language: 'ko',
//             simpleUpload: {
//               uploadUrl: '/upload_file', // 서버 측 업로드 라우트
//               headers: {
//                   'X-CSRF-TOKEN': 'CSRF-Token', // 필요한 경우 CSRF 토큰 추가
//                   'Authorization': 'Bearer <JSON Web Token>' // 필요한 경우 JWT 추가
//               }
//           }
//           })
//           .then(editor => {
//             window.editor = editor;
//           })
//           .catch(error => {
//             console.error('Error initializing editor:', error);
//           });
//       });
//     });
// }

// function loadScripts(scripts, callback) {
//   const loadScript = (index) => {
//     if (index < scripts.length) {
//       let script = document.createElement('script');
//       script.type = 'text/javascript';
//       script.src = scripts[index];
//       script.onload = () => loadScript(index + 1); // 다음 스크립트 로드
//       document.head.appendChild(script);
//     } else {
//       callback(); // 모든 스크립트 로드 완료 후 콜백 실행
//     }
//   };

//   loadScript(0);
// }

 

  function updateStatus(event, element) {
    event.preventDefault();//a링크 이동을 막기 위해 사용
    var status = element.getAttribute('data-status');
    console.log(status)
    document.getElementById("sessionView").innerText=status;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/update-status", true);
    xhr.setRequestHeader("Content-Type", "application/json");

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        var responseData = JSON.parse(xhr.responseText);
        // console.log("responseData.data.status2",responseData.data.status)
        
        alert("current status changed to:" + responseData.data.status);
        

      }
    };
    xhr.send(JSON.stringify({ status: status }));
    //json
    // var status = document.getElementById('status').value;
    // fetch("/update-status/"+status,{method:"get"})
    //   .then(res=>res.json())
    //   .then(data=>{
    //       console.log("data:",data)
    //       alert(`${data.status} 상태입니다.`)
    //       // document.getElementById("status").textContent=data;
    //   })
  }

  



// function loadSessionData() {
//   fetch('/ForSessions')
//       .then(response => response.json())
//       .then(data => {
//           const onlineUsersDiv = document.getElementById('onlineUsers');
//           onlineUsersDiv.innerHTML = ''; // 기존 내용을 비웁니다.
//           data.userList.forEach(user => {
//               const userStatus = document.createElement('h3');
//               userStatus.textContent = `${user.name} ${user.status}`;
//               onlineUsersDiv.appendChild(userStatus);
//           });
//       })
//       .catch(error => {
//           console.error('Error loading session data:', error);
//       });
// }

//변경
let retryCount = 0;
const maxRetries = 5; // 최대 재시도 횟수를 정의합니다.
function loadSessionData() {
  fetch('/ForSessions')
      .then(response => {
         // 성공적으로 응답을 받으면 재시도 횟수를 리셋합니다.
      retryCount = 0;
      return response.json();
      })
      .then(data => {
        console.log("LoadData:",data);
          const onlineUsersDiv = document.getElementById('onlineUsers');
          onlineUsersDiv.innerHTML = ''; // 기존 내용을 비웁니다.

          // data.dbUserList.forEach(dbuser=>{
            
          //     const userDiv = document.createElement('div');
              
          //     const userName = document.createElement('span');
          //     const bar = document.createElement('span');
          //     const userStatus = document.createElement('span');
          //     const statusCircle = document.createElement('span');
          //     const userStatusView= document.getElementById("sessionView");
          //     userName.textContent = dbuser.USER_ID;
          //     bar.textContent="-";
          //     let userView="";
          //     data.userList.forEach(user => {
          //       if(dbuser.USER_ID==user.name){
          //         statusCircle.className = `status-circle ${getStatusClass(user.status)}`; // 상태에 따라 클래스 추가
          //         userStatus.textContent = user.status;
          //         userView=user.status;
          //       }else{
          //         statusCircle.className = `status-circle ${getStatusClass("offline")}`; // 상태에 따라 클래스 추가
          //         userStatus.textContent = "offline";
          //         userView="offline";
          //       }
          //    });

          //    userDiv.appendChild(userName);
          //    userDiv.appendChild(bar);
          //    userDiv.appendChild(userStatus);
          //    userDiv.appendChild(statusCircle);
          //    onlineUsersDiv.appendChild(userDiv);
          //    userStatusView.innerHTML=userView;
          // })
//---------------------2번쨰 방법
data.dbUserList.forEach(dbuser => {
      const userDiv = document.createElement('div');
              
              const userName = document.createElement('span');
              const bar = document.createElement('span');
              const userStatus = document.createElement('span');
              const statusCircle = document.createElement('span');
              const userStatusView= document.getElementById("sessionView");
              userName.textContent = dbuser.USER_ID;
              bar.textContent="-";
              let userView="";

  // userList에서 현재 dbuser의 상태를 찾습니다.
  const currentUser = data.userList.find(user => user.name === dbuser.USER_ID);

  // 상태를 설정합니다.
  if (currentUser) {
    statusCircle.className = `status-circle ${getStatusClass(currentUser.status)}`;
    userStatus.textContent = currentUser.status;
    userView = currentUser.status;
  } else {
    statusCircle.className = `status-circle ${getStatusClass("offline")}`;
    userStatus.textContent = "offline";
    userView = "offline";
  }
     userDiv.appendChild(userName);
             userDiv.appendChild(bar);
             userDiv.appendChild(userStatus);
             userDiv.appendChild(statusCircle);
             onlineUsersDiv.appendChild(userDiv);
          
            
});

          setTimeout(loadSessionData, 1000);  
             
          
      })
      .catch(error => {
        console.error('Error loading session data:', error);
        
      });
}

function getStatusClass(status) {
  switch (status.toLowerCase()) {
      case 'online':
          return 'online';
      case 'offline':
          return 'offline';
      case 'away':
          return 'away';
      case 'do not disturb':
          return 'do-not-disturb';
      default:
          return 'offline';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  loadSessionData();
});

// document.addEventListener('DOMContentLoaded',()=>{
// setInterval(loadSessionData, 1000);  // 5000 밀리초(5초) 간격으로 반복 호출
// });


//유저목록에 따른 메신저 위치 지정
function updateMessengerPosition() {
  const onlineUsers = document.getElementById('onlineUsers');
  const messenger = document.getElementById('messenger');

  // online-users의 visible 클래스가 있는지 확인하고 위치를 가져옴
  if (onlineUsers.classList.contains('visible')) {
    // getBoundingClientRect() 메소드를 사용하여 요소의 상대 위치 및 크기 정보를 가져옴
    const rect = onlineUsers.getBoundingClientRect();

    // online-users의 하단 위치에 messenger를 배치
    messenger.style.top = `${rect.bottom}px`; // rect.bottom은 online-users의 하단 위치
  } else {
    // online-users가 숨겨져 있으면 messenger를 상단으로 이동
    messenger.style.top = '0px';
  }
}

// 페이지 로드시 위치 업데이트
window.onload = updateMessengerPosition;

// 윈도우 크기 변경에 따라 위치 재조정
window.onresize = updateMessengerPosition;

// online-users의 상태 변경에 따라 위치 업데이트 필요시 호출
function OnlineUsers() {
  const onlineUsers = document.getElementById('onlineUsers');
  onlineUsers.classList.toggle('visible');
  updateMessengerPosition(); // 상태 변경 후 위치 업데이트
}
// msgElement.classList.add('user-message'); // 사용자 메시지 클래스 추가


// -------------------------소캣으로 재구현 필요
//메세지 전송
// function sendMessage() {
//   const message = document.getElementById('chatInput').value;

//   const userName=document.getElementById('userName').textContent;
//   if (message.trim() === '') return;

//   // 메시지를 서버에 전송(post)
//   fetch('/setmessages', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({ text: message,userName:userName })
//   })
//   .then(response => response.json())
//   .then(data => {
//     console.log('Message sent:', data);
//     document.getElementById('chatInput').value = ''; // 입력 필드 초기화
//     loadMessages(); // 새 메시지를 포함하여 메시지를 다시 로드
//   })
//   .catch(error => console.error('Error sending message:', error));
// }
// //메세지 받기(get)
// function loadMessages() {
//   console.log("load함수 시작")
//   fetch('/getmessages')
//   .then(response => response.json())
//   .then(messages => {
//     console.log("funcMessage:",messages)
//     const chatMessages = document.getElementById('chatMessages');
//     const userName=document.getElementById('userName').textContent;
//     chatMessages.innerHTML = ''; // 기존 메시지를 지우고 새로운 메시지로 대체
//     messages.forEach(message => {
//       const msgElement = document.createElement('div');
//       let msg=``
//       if(userName==message.ID){
//         msgElement.classList.add('user-message');
//         msg+=`<span style="font-size: 16px;">${message.CONTENT}</span>`        
//       }else{
//         msg+=`<span style="font-size: 8px;">${message.ID}</span><br>`
//         msg+=`<span style="font-size: 16px;">${message.CONTENT}</span>`
//       }
//       msgElement.innerHTML = msg;
//       chatMessages.appendChild(msgElement);
//     });
//     chatMessages.scrollTop = chatMessages.scrollHeight; // 스크롤을 아래로
//     setTimeout(loadMessages,3000);
//   })
//   .catch(error => {console.error('Error loading messages:', error);setTimeout(loadMessages, 3000);});
  
// }

// // 페이지 로드 시 메시지 로드
// document.addEventListener('DOMContentLoaded', loadMessages);

//소켓을 이용한 방식
var socket = io();

socket.on('load old messages', function(messages) {
  console.log("Received messages:", messages);
  messages.forEach(message => {
    displayMessage(message);
  });
});

document.addEventListener('DOMContentLoaded', function() {
  var chatForm = document.getElementById('chatForm');
  if (chatForm) {
    chatForm.onsubmit = function(e) {
      e.preventDefault();
      var input = document.getElementById('chatInput');
      
      if (input.value) {
        socket.emit('chat message', { CONTENT: input.value, ID: document.getElementById('userName').textContent });
        input.value = '';
      }
    }
  };

  socket.on('chat message', function(msg) {
    displayMessage(msg);
  });
});

function displayMessage(msg) {
  const chatMessages = document.getElementById('chatMessages');
  const msgElement = document.createElement('div');
  let messageContent = `<span style="font-size: 8px;">${msg.ID}</span><br><span style="font-size: 16px;">${msg.CONTENT}</span>`;
  msgElement.innerHTML = messageContent;
  chatMessages.appendChild(msgElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// window.addEventListener('resize', function() {
//   // 현재 창의 너비가 768픽셀보다 크면 페이지를 새로고침
//   if (window.innerWidth > 767.98) {
//     location.reload();
//   }
// });

function updateMessengerPosition() {
  var sidebarWidth = document.getElementById('accordionSidebar').offsetWidth;
  var messenger = document.getElementById('messenger');
  messenger.style.left = sidebarWidth + 'px';
}

// 윈도우 리사이즈 이벤트 또는 사이드바 너비 변경 로직에 이 함수를 호출
// window.addEventListener('resize', updateMessengerPosition);

function delmessages() {
  messenger.style.width = '0';  // 메시지 창 숨기기
  messenger.style.padding = '0'; // 패딩을 0으로 설정
}
messenger.addEventListener('transitionend', function() {
  if (messenger.style.width === '0px') {
      messenger.style.display = 'none';  // 너비가 0이면 숨김
  } else {
      messenger.style.display = 'block';  // 그 외의 경우 보임
  }
});