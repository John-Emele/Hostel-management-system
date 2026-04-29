const action_btn = document.getElementById("action-btn");
const action_option = document.getElementById("action-option");
const view_btn = document.getElementById("view-btn");
const accept_btn = document.getElementById("accept-btn");
const reject_btn = document.getElementById("reject-btn");
const action_view_btn = document.getElementById("action-view-btn");
const action_accept_btn = document.getElementById("action-accept-btn");
const action_reject_btn = document.getElementById("action-reject-btn");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");

side_menu_btn.addEventListener("click", () => {
   if (side_menu.classList.contains("hide")) {
      side_menu.classList.remove("menu-exit");
      side_menu.classList.add("menu-entrance");
      setTimeout(() => {
         side_menu.classList.remove("hide");
      }, 250);
   }
   else {
      side_menu.classList.remove("menu-entrance");
      side_menu.classList.add("menu-exit");
      setTimeout(() => {
         side_menu.classList.add("hide");
      }, 250);
   }
});

function buttonAction(){
    action_btn.addEventListener("click", () => {
        if(action_option.classList.contains("hide")){
            action_option.classList.remove("hide");
        }
        else{
            action_option.classList.add("hide");
        }
    })
}
buttonAction();