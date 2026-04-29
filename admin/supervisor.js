const main_container = document.getElementById("main-container");
const student_info = document.getElementById("info-container");
const view_btn = document.getElementById("view-btn");
const add_btn = document.getElementById("add-btn");
const remove_btn = document.getElementById("remove-btn");
const cancel_btn = document.getElementById("cancel-btn");
const edit_cancel = document.getElementById("edit-cancel");
const loading_image = document.getElementById("loading-image");
const caution_container = document.getElementById("caution-container");
const final_delete = document.getElementById("final-delete");
const caution_function_cancel =  document.getElementById("caution-function-cancel");
const edit = document.getElementById("edit-container");
const add_form_button = document.getElementById("stud-submit-btn");

view_btn.addEventListener("click", () => {
    student_info.classList.remove("hide");
    main_container.classList.add("blur-background");
})

cancel_btn.addEventListener("click", () => {
    student_info.classList.add("hide");
    main_container.classList.remove("blur-background");
})

remove_btn.addEventListener("click", () => {
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.remove("smooth-return");
    caution_container.classList.add("smooth");
    caution_container.classList.remove("hide");
    main_container.classList.add("blur-background");
})

final_delete.addEventListener("click", ()=> {
    let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
    final_delete.innerHTML = delete_emote;    
    setTimeout( () => {
        caution_container.classList.remove("smooth");
        caution_container.classList.remove("smooth-return");
        caution_container.classList.add("smooth-exit");
       setTimeout(() => {
        caution_container.classList.add("hide");
       }, 300)
       main_container.classList.remove("blur-background");
       final_delete.innerHTML = "Delete";
    }, 3000)
    
})

caution_function_cancel.addEventListener("click", ()=> {
    caution_container.classList.remove("smooth");
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.add("smooth-return");
    setTimeout(() => {
        caution_container.classList.add("hide");
    }, 300)
    student_info.classList.remove("blur-background");
    main_container.classList.remove("blur-background");
})

add_btn.addEventListener("click", () => {
    edit.classList.remove("smooth-exit");
    edit.classList.remove("smooth-return");
    edit.classList.add("smooth");
    edit.classList.remove("hide");
    setTimeout(()=>{
        main_container.classList.add("blur-background");
    },250)
})

edit_cancel.addEventListener("click", () => {
    edit.classList.remove("smooth");
    edit.classList.add("smooth-return");
    setTimeout( ()=> {
        edit.classList.add("hide");
    },250 )
    main_container.classList.remove("blur-background");
})


add_form_button.addEventListener("click", ()=> {
    let add_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">adding...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
    add_form_button.innerHTML = add_emote;    
    setTimeout( () => {
        edit.classList.remove("smooth");
        edit.classList.remove("smooth-return");
        edit.classList.add("smooth-exit");
       setTimeout(() => {
        edit.classList.add("hide");
       }, 300)
       main_container.classList.remove("blur-background");
       add_form_button.innerHTML = "Add";
    }, 3000)
    
})
