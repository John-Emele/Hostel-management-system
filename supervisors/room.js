const main_container = document.getElementById("main-container");
const resident_actions = document.getElementById("resident-actions");
const room_students = document.getElementById("room-students")
const add_new_student = document.getElementById("add-new-student");
const remove_btn = document.getElementById("remove-btn");
const cancel_btn = document.getElementById("cancel-btn");
const add_btn = document.getElementById("add-btn");
const new_btn = document.getElementById("new-btn");
const caution_cancel  = document.getElementById("caution-cancel");
const caution_container = document.getElementById("caution-container");
const final_delete = document.getElementById("final-delete");
const caution_function_cancel =  document.getElementById("caution-function-cancel");
const room_image = document.getElementById("room-image");
const room_container = document.getElementById("roomcontainer");
const room_cancel = document.getElementById("room-cancel");
const loading_image = document.getElementById("loading-image");

add_btn.addEventListener("click", ()=> {
  room_students.classList.add("hide");
  resident_actions.classList.add("hide");
  add_new_student.classList.remove("hide");
})

new_btn.addEventListener("click", () => {
    room_students.classList.remove("hide");
  resident_actions.classList.remove("hide");
  add_new_student.classList.add("hide");
})

cancel_btn.addEventListener("click", () => {
    room_students.classList.remove("hide");
  resident_actions.classList.remove("hide");
  add_new_student.classList.add("hide");
})


remove_btn.addEventListener("click", () => {
    caution_container.classList.remove("hide");
    main_container.classList.add("blur-background");
    room_container.classList.add("blur-background");
})


room_image.addEventListener("click", () => {
    room_container.classList.remove("hide");
    main_container.classList.add("blur-background")
})
room_cancel.addEventListener("click", () => {
    main_container.classList.remove("blur-background");
    room_container.classList.add("hide");
})


caution_cancel.addEventListener("click", () => {
    caution_container.classList.add("hide");
    main_container.classList.remove("blur-background");
    room_container.classList.remove("blur-background");
})



caution_function_cancel.addEventListener("click", ()=> {
    caution_container.classList.add("hide");
    room_container.classList.remove("blur-background");
})

final_delete.addEventListener("click", ()=> {
    let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
    final_delete.innerHTML = delete_emote;
    // loading_image.classList.remove("hide");
    // final_delete.innerText = "deleting..."
    
    setTimeout( () => {
       caution_container.classList.add("hide");
    room_container.classList.remove("blur-background");
    }, 3000)
    
})