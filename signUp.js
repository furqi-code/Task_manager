let usersArray = [] ;

if(localStorage.getItem('data'))
    usersArray = JSON.parse(localStorage.getItem('data')) ;

class User{
    constructor(firstName, lastName, email, password, gender)
    {
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.Email = email ;
        this.Password = password ;
        this.Gender = gender ;
    }
}

$("#signupBtn").on("click",function(){
    let firstName = $(".fname").val() ;
    let lastName = $(".lname").val() ;
    let email = $(".mail").val() ;
    let pass = $(".pass").val() ; 
    let gender = $(".gender").val() ;

    let obj = new User(firstName, lastName, email, pass, gender) ;
    usersArray.push(obj) ;
    localStorage.setItem('data', JSON.stringify(usersArray)) ;
    $(".fname, .lname, .mail, .pass").val("") ;
    alert("User Signed up succesfully! ");
    setTimeout(function(){
        window.open("C:\Users\Dell\Desktop\Task_manager\signIn.html") ;
    },1000)
})