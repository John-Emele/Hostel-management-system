const hostels = document.getElementById("hostels");
const rooms = document.getElementById("rooms");
const room_list = document.getElementById("room-list");
const hostel_list = document.getElementById("hostel-list");
const filter_btn = document.getElementById("filter-btn");
const sort_menu = document.getElementById("sort-menu");

function display(){
    filter_btn.addEventListener("click", ()=> {
      if(sort_menu.classList.contains("hide")){
        sort_menu.classList.remove("hide");
      }
      else{
        sort_menu.classList.add("hide");
      }
    })
    hostels.addEventListener("mouseover", ()=> {
        hostel_list.classList.remove("hide");
    });
    rooms.addEventListener("mouseover", ()=> {
        room_list.classList.remove("hide");
    });
    // hostels.addEventListener("mouseleave", ()=> {
    //     hostel_list.classList.add("hide");
    // });
    hostel_list.addEventListener("mouseleave", () => {
        hostel_list.classList.add("hide");
    })
    room_list.addEventListener("mouseleave", ()=> {
        room_list.classList.add("hide");
    });
}
// display();


// const image_box =  document.getElementById("image");
// const image_box_2 =  document.getElementById("image-2");
// const image_box_3 =  document.getElementById("image-3");
// const image_box_4 =  document.getElementById("image-4");
// const info_box = document.getElementById("info");
// const info_box_2 = document.getElementById("info-2");
// const info_box_3 = document.getElementById("info-3");
// const info_box_4 = document.getElementById("info-4");


// image_box.addEventListener("mouseenter", () => {
//     info_box.classList.remove("hide");
//     image_box.classList.add("image_shake");
// })

// info_box.addEventListener("mouseleave", () => {
//     info_box.classList.add("hide");
//     image_box.classList.remove("image_shake");
// })

// image_box_2.addEventListener("mouseenter", () => {
//     info_box_2.classList.remove("hide");
//     image_box_2.classList.add("image_shake");
// })

// info_box_2.addEventListener("mouseleave", () => {
//     info_box_2.classList.add("hide");
//     image_box_2.classList.remove("image_shake");
// })

// image_box_3.addEventListener("mouseenter", () => {
//     info_box_3.classList.remove("hide");
//     image_box_3.classList.add("image_shake");
// })

// info_box_3.addEventListener("mouseleave", () => {
//     info_box_3.classList.add("hide");
//     image_box_3.classList.remove("image_shake");
// })

// image_box_4.addEventListener("mouseenter", () => {
//     info_box_4.classList.remove("hide");
//     image_box_4.classList.add("image_shake");
// })

// info_box_4.addEventListener("mouseleave", () => {
//     info_box_4.classList.add("hide");
//     image_box_4.classList.remove("image_shake");
// })

// image_box.add("mouseleave", () => {
//     info_box.classList.add("hide");
// })

// const view_hostel = document.getElementById("view-hostel");
// const hostel_details = document.getElementById("hostel-detail");
// const cancel_btn = document.getElementById("cancel")

// view_hostel.addEventListener("click", () => {
//     hostel_details.classList.remove("hide");
// })

// cancel.addEventListener("click", () => {
//     hostel_details.classList.add("hide");
// })

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