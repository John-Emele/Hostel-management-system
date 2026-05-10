let currentuser = null;

const swap_btn = document.getElementById("swap-btn");
const checkout_btn = document.getElementById("checkout-btn");

async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);

    if (!currentuser) return;

    const { data, error } = await supabaseClient
        .from('students')
        .select()
        .eq("id", currentuser.id)
        .maybeSingle()

    console.log(data);
    if (error) {
        console.log(error)
        return;
    }

    if (data == null || "") {
        swap_btn.disabled = true;
        checkout_btn.disabled = true;
        swap_btn.classList.remove("cursor-pointer");
        swap_btn.classList.add("cursor-not-allowed");
        checkout_btn.classList.remove("cursor-pointer");
        checkout_btn.classList.add("cursor-not-allowed")
        return;
    }
    else {
        swap_btn.disabled = false;
        swap_btn.classList.remove("cursor-not-allowed");
        swap_btn.classList.add("cursor-pointer");
        checkout_btn.disabled = false;
        checkout_btn.classList.remove("cursor-not-allowed");
        checkout_btn.classList.add("cursor-pointer");
        display_form(currentuser.id);
    }
}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();



const room_type = document.getElementById("room-type");
const room_number = document.getElementById("room-number");
const room_space = document.getElementById("bed-space");
const room_supervisor = document.getElementById("room-supervisor");
const room_session = document.getElementById("room-session");
const room_level = document.getElementById("room-level");
const swap = document.getElementById("swap");
const checkout = document.getElementById("checkout");
const cancel_swap = document.getElementById("cancel-swap");
const cancel_checkout = document.getElementById("cancel-checkout");
const hostel_name = document.getElementById("hostel-name");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");

swap_btn.addEventListener("click", () => {
    swap.classList.remove("hide");
})
checkout_btn.addEventListener("click", () => {
    checkout.classList.remove("hide");
})

async function display_form(student_id) {
    const { data, error } = await supabaseClient
        .from('booked_students')
        .select()
        .eq("id", student_id)
        .single()

    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
    const names =  data.supervisor_name.split(" ");
    console.log(names);
    const f_name = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
    const l_name = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();

    hostel_name.innerHTML = data.hostel_name;
    room_type.innerHTML = data.room_type;
    room_number.innerHTML = data.room_number;
    room_space.innerHTML = data.bed_space;
    room_level.innerHTML = data.student_level;
    room_session.innerHTML = data.session;
    room_supervisor.innerHTML = f_name + " " + l_name; 
}

function cancel() {
    cancel_swap.addEventListener("click", () => {
        swap.classList.add("hide");
    })
    cancel_checkout.addEventListener("click", () => {
        checkout.classList.add("hide");
    })
}
cancel();

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