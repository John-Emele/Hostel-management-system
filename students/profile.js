const profile_picture = document.getElementById("profile-picture");
const add_picture = document.getElementById("add-image");
const plus_image = document.getElementById("plus-image");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
const action_btn = document.getElementById("action-btn");
const action_list = document.getElementById("action-list");

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

action_btn.addEventListener("click", () => {
  if(action_list.classList.contains("hide")){
    action_list.classList.remove("hide");
  }
  else{
    action_list.classList.add("hide");
  }
}); 

plus_image.addEventListener("click", ()=> {
    add_picture.click()
});

add_picture.addEventListener("change", () => {
    const file = add_picture.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const imageURL = URL.createObjectURL(file);
    console.log(imageURL);
    profile_picture.src = imageURL;
    // uploadBtn.style.display = "none";
    // change_box.style.display = "block";
});