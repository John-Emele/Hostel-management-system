const main_container = document.getElementById("main-container");
const student_info = document.getElementById("info-container");
const view_btn = document.getElementById("view-btn");
const cancel_btn = document.getElementById("cancel-btn");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");


side_menu_btn.addEventListener("click", () => {
   if(side_menu.classList.contains("hide")){
    side_menu.classList.remove("menu-exit");
    side_menu.classList.add("menu-entrance");
    setTimeout( () => {
        side_menu.classList.remove("hide");
    },250);
   }
   else{
    side_menu.classList.remove("menu-entrance");
    side_menu.classList.add("menu-exit");
    setTimeout( () => {
        side_menu.classList.add("hide");
    },250);
   }
});

view_btn.addEventListener("click", () => {
    student_info.classList.remove("hide");
    main_container.classList.add("fade");
})

cancel_btn.addEventListener("click", () => {
    student_info.classList.add("hide");
    main_container.classList.remove("fade");
})