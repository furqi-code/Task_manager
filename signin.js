let usersArray = [], tasksArray = [] ;
let activeUser = {} ;

// If user is already logged in, Go to homepage
if(localStorage.getItem("active"))
    window.open("C:\Users\Dell\Desktop\Web Deveploment\class work\Javascript\task & Log\home.html",'_parent') ;

if(localStorage.getItem("data"))
    usersArray = JSON.parse(localStorage.getItem('data')) ;

if(localStorage.getItem("taskArray"))
    tasksArray = JSON.parse(localStorage.getItem("taskArray")) ;

$("#signinBtn").on("click",function(){
    let recentEmail = $(".mailIn").val() ;
    let recentPass = $(".passIn").val() ;
    let userID = usersArray.find(function(element){ 
        return element.Email === recentEmail && element.Password === recentPass ? true : false ;
    }) 
    if(!userID)  
    {
        alert("Incorrect Email or Password. Try Again! ");
        $(".mailIn").val("") ;
        $(".passIn").val("") ;        
    }else{       
        $("#sUp, #sIn, #signIn").addClass("d-none") ;
        $("#taskmanager, #logOut, #userList").removeClass("d-none") ;
        $("#leftLoggedin").removeClass("d-none") ;
        // alert(`Welcome , ${userID.firstName} !`);
        activeUser = userID ;
        localStorage.setItem("active", JSON.stringify(activeUser)) ;
        $(".actuser").remove() ;
        html = `<div class="actuser mb-2">
                    <p>Full name : ${userID.firstName} ${userID.lastName}</p>
                    <p>Gender : ${activeUser.Gender}</p>
                </div>` ;
        $("#leftLoggedin").append(html) ;
    }
})

$("#logOut").on("click",function(){
    activeUser = {} ;
    localStorage.removeItem("active") ;
    window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\task & Log\\home.html") ;
})