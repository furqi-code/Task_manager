let tasksArray = [];
let activeUser = {} ;

if(localStorage.getItem("active"))
  activeUser = JSON.parse(localStorage.getItem("active"));

if(localStorage.getItem("taskArray"))
  tasksArray = JSON.parse(localStorage.getItem('taskArray')) ;

class Task {
  id;
  title;
  description;
  created_at;
  updated_at;
  due_date;
  Email;
  static count = 0;

  constructor(title, description, due_date, email) {
    this.id = ++Task.count;
    this.title = title;
    this.description = description;
    this.created_at = new Date().toLocaleDateString();
    this.updated_at = new Date().toLocaleDateString();
    this.due_date = new Date(due_date);
    this.Email = email ;
  }
}

function deleteTask(id)
{
  const itemIndex = tasksArray.findIndex(function (item) {
    return item.id === id ? true : false;
  });
  tasksArray.splice(itemIndex, 1);
  localStorage.clear() ;
  localStorage.setItem("taskArray", JSON.stringify(tasksArray));   // update the localStorage after removal of an Obj
  $("#viewList").trigger("click") ;   // display the updated list
}

function editTask(id) {
  console.log(id);
  const task = tasksArray.find(function (item) {
    return item.id === id ? true : false;
  });
  // if(!task){
  //   alert("Task Not Found");
  // }
  $(".updatedTitle").val(task.title);
  $(".updatedDescription").val(task.description);
  $(".updatedDate").val(task.due_date);
  $(".updateTask").attr("id", `updateTask-${id}`);
}

$(".updateTask").on("click", function (e) {
  const itemId = parseInt(e.target.id.split("-")[1]);
  console.log(itemId);
  const task = tasksArray.find(function (item) {
    return item.id === itemId ? true : false;
  });
  task.title = $(".updatedTitle").val();
  task.description = $(".updatedDescription").val();
  task.due_date = $(".updatedDate").val();
  $('#viewList').trigger('click');
});

$("#save").on("click", function(){
  const title = $(".title").val() ;
  const description = $(".desc").val() ;
  const due_date = $(".currentDate").val() ;

  const newTask = new Task(title, description, due_date, activeUser.Email);
  tasksArray.push(newTask);
  localStorage.setItem("taskArray", JSON.stringify(tasksArray));
  $(".title, .desc, .currentDate").val("") ;

  let html1 = `<div class="mt-2"><p>Task of id - <b>${newTask.id}</b> added in the List</p></div>`
  $("#taskAdded").append(html1) ;
})

// if(item.Email === activeUser.Email) iski jagah agar hm logout pe remove taskArray bhi kre from localStorage aur
// har ek user k login pe ek new taskArray store kre to sirf usi user ka task display hoga na?? chl gaya pr aise nhi krna
$("#viewList").on("click",function(){
    $(".details").remove();
    let html = "" ;
    tasksArray.forEach(function(item){
      if(item.Email === activeUser.Email)
      {
        html += `<div class="details" mb-2>
        <h6>${item.title}</h6>
        <p>${item.description}</p>
        <p>Due Date: ${item.due_date}</p>
        <div class="d-flex gap-3">
          <button type="button" class="btn btn-danger" onclick="deleteTask(${item.id})">Remove</button>
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editTask" onclick="editTask(${item.id})">Edit</button>
        </div>`
        html += `</div>` ;
      }
    })
    $("#content").append(html) ;
})

$("#logOut").on("click",function(){
  activeUser = {} ;
  localStorage.removeItem("active") ;
  window.open("C:\Users\Dell\Desktop\Task_manager\index.js") ;
})

// to display the only div which is clicked
$("#save").on("click", function(){
    $("#taskAdded").removeClass("d-none") ;
    $("#content").addClass("d-none");
});
  
$("#viewList").on("click", function(){
    $("#content").removeClass("d-none");
    $("#taskAdded").addClass("d-none");
});