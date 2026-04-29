const create_hostel = document.getElementById("create_hostel"); 
const cancel_btn = document.getElementById("cancel-btn");
const edit_cancel_btn = document.getElementById("edit-cancel-btn");
const add_btn = document.getElementById("add-btn");
const view_btn = document.getElementById("view-btn");
const edit_container = document.getElementById("edit-container");
// room inputs//
const room_type = document.getElementById("room-type");
const room_spaces = document.getElementById("room-spaces");
const room_price = document.getElementById("room-price");
const room_status = document.getElementById("room-status");
// room edit//
const edit_type = document.getElementById("edit-type");
const edit_spaces = document.getElementById("edit-spaces");
const edit_price = document.getElementById("edit-price");
const edit_status = document.getElementById("edit-status");
// room error//
const room_type_error = document.getElementById("room-type-error");
const room_spaces_error = document.getElementById("room-spaces-error");
const room_price_error = document.getElementById("room-price-error");
const room_status_error = document.getElementById("room-status-error");
//room edit error//
const edit_type_error = document.getElementById("edit-type-error");
const edit_spaces_error = document.getElementById("edit-spaces-error");
const edit_price_error = document.getElementById("edit-price-error");
const edit_status_error = document.getElementById("edit-status-error");
//room btns//
const room_add_btn = document.getElementById("add-room-btn");



view_btn.addEventListener("click", () => {
    edit_container.classList.remove("smooth-exit");
    edit_container.classList.add("smooth-entry");
  setTimeout( () => {
    edit_container.classList.remove("hide");
  });
})

cancel_btn.addEventListener("click", () => {
  create_hostel.classList.remove("toggle_3");
  create_hostel.classList.add("toggle_5");
  setTimeout( () => {
    create_hostel.classList.add("hide");
  },950)
});

add_btn.addEventListener("click", () => {
    create_hostel.classList.remove("toggle_5");
    create_hostel.classList.add("toggle_3");
    setTimeout( () => {
        create_hostel.classList.remove("hide");
    })
})

view_btn.addEventListener("click", () => {
    edit_container.classList.remove("smooth-leave");
    edit_container.classList.add("smooth-entry");
  setTimeout( () => {
    edit_container.classList.remove("hide");
  });
})

edit_cancel_btn.addEventListener("click", () => {
  edit_container.classList.remove("smooth-entry");
  edit_container.classList.add("smooth-leave");
  setTimeout( () => {
    edit_container.classList.add("hide");
  },250)
});

async function createRoom(){
    let form_check = false;

    if(room_type.value == ""){
        form_check = true;
        room_type_error.innerHTML = "Field must not be empty!!";
    }
    else{
        form_check = false;
        room_type_error.innerHTML = "";
    }
    if(room_spaces.value == ""){
        form_check = true;
        room_spaces_error.innerHTML = "Field must not be empty!!";
    }
    else{
        form_check = false;
        room_spaces_error.innerHTML = "";
    }
    if(room_price.value == ""){
        form_check = true;
        room_price_error.innerHTML = "Field must not be empty!!";
    }
    else{
        form_check = false;
        room_price_error.innerHTML = "";
    }
    if(room_status.value == ""){
        form_check = true;
        room_status_error.innerHTML = "Field must not be empty!!";
    }
    else{
        form_check = false;
        room_status_error.innerHTML = "";
    }
    console.log([
        room_type.value,
        room_spaces.value,
        room_price.value,
        room_status.value
    ])

    if(form_check == false){
       const {data, error} = await supabaseClient
    .from("rooms")
    .insert([{
        room_type: room_type.value,
        price: room_price.value,
        bed_spaces: room_spaces.value,
        status: status.value,
    }])

    if(error){
        console.log(error);
    }

    }

    
}
room_add_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await createRoom();
})

// let totalText = 5000000000;

// const formatted = new Intl.NumberFormat("en-NG", {
//   style: "currency",
//   currency: "NGN",
// }).format(totalText);

// // let total = Number(totalText.replace(/[^\d]/g, ""));
// console.log(formatted);