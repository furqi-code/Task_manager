let usersArray = [] ;
let activeUser = {};

if (localStorage.getItem("active")) {
    activeUser = JSON.parse(localStorage.getItem("active"));
}else{
    // If user is not logged in, Go to homepage
    window.open("C:\\Users\\Dell\\Desktop\\Web Deveploment\\class work\\Javascript\\task & Log\\home.html",'_parent') ;
}

if(localStorage.getItem('data'))
    usersArray = JSON.parse(localStorage.getItem('data')) ;

$(".details").remove() ;
let html = "" ;
usersArray.forEach(function(element){
    html += `<div class="details mb-2">
                <p>Email : ${element.Email}</p>
                <p>Password : ${element.Password}</p>
                <p>Gender : ${element.Gender}</p>
            </div>` ;
})
$("#div_allUser").append(html) ;
