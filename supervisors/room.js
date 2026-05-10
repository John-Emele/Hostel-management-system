async function initUser() {
  const { data: { session } } = await supabaseClient.auth.getSession();
  currentuser = session?.user || null;
  console.log(currentuser);

  if (!currentuser) return;
  const { data: role, error: role_error } = await supabaseClient
    .from('supervisor')
    .select()
    .eq("id", currentuser.id)
    .single()

  if (role_error) {
    console.log(role_error);
    return;
  }

  const r = role.rooms.split(",");
  console.log(r);
  let allrooms = [];
  let allStudents = [];
  // r.forEach(async (num) => {
    const { data: room, error: room_error } = await supabaseClient
      .from('room')
      .select()
      .eq("hostel", role.hostel)
      .eq("supervisor_id", role.id)

    if (room_error) {
      console.log(room_error);
      return;
    }
    console.log(room)
    allrooms = Array.isArray(room)
      ? room
      : [room];
  // })
  console.log(allrooms);


  // rooms = room;

  if (role) {
    console.log(role);



    const { data, error } = await supabaseClient
      .from('booked_students')
      .select()
      .eq("supervisor_id", currentuser.id)

    // allStudents = data;
    console.log(data);
    if (error) {
      console.log(error)
      return;
    }
    else {
      // data.forEach(async (bk) => {
        const { data: stud, error: stud_error } = await supabaseClient
          .from('students')
          .select("*")
          // .eq("id", id)

        if (stud_error) {
          console.log(stud_error);
          returnl
        }
        // console.log(stud);
        allStudents = Array.isArray(stud)
      ? stud
      : [stud];;
        console.log(allStudents);
      // })

      roomDetails(data, allrooms, allStudents);
      // searchForSupervisor(allSups);
    }
  }
  else {
    create_hostel_function(
      "Unauthorized Access",
      "error"
    );
    return;
  }

}
async function initapp() {
  await initUser();
}
initapp();

// window.addEventListener("DOMContentLoaded", async () => {
//   const user = await protectPage(supabase);
//   console.log(user);
// });

const main_container = document.getElementById("main-container");
const resident_actions = document.getElementById("resident-actions");
const room_students = document.getElementById("room-students")
const add_new_student = document.getElementById("add-new-student");
const remove_btn = document.getElementById("remove-btn");
const cancel_btn = document.getElementById("cancel-btn");
const add_btn = document.getElementById("add-btn");
const new_btn = document.getElementById("new-btn");
// const caution_cancel = document.getElementById("caution-cancel");
// const caution_container = document.getElementById("caution-container");
// const final_delete = document.getElementById("final-delete");
// const caution_function_cancel = document.getElementById("caution-function-cancel");
// const room_image = document.getElementById("room-image");
const room_container = document.getElementById("roomcontainer");
const room_cancel = document.getElementById("room-cancel");
const loading_image = document.getElementById("loading-image");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
const room_box = document.getElementById("room-box");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const table_body = document.getElementById("table-body");
const room_type = document.getElementById("room-type");
const room_number = document.getElementById("room-number");

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



// add_btn.addEventListener("click", () => {
//   room_students.classList.add("hide");
//   resident_actions.classList.add("hide");
//   add_new_student.classList.remove("hide");
// })

// new_btn.addEventListener("click", () => {
//   room_students.classList.remove("hide");
//   resident_actions.classList.remove("hide");
//   add_new_student.classList.add("hide");
// })

// cancel_btn.addEventListener("click", () => {
//   room_students.classList.remove("hide");
//   resident_actions.classList.remove("hide");
//   add_new_student.classList.add("hide");
// })

// remove_btn.addEventListener("click", () => {
//   caution_container.classList.remove("hide");
//   main_container.classList.add("blur-background");
//   room_container.classList.add("blur-background");
// })

// room_image.addEventListener("click", () => {
//   room_container.classList.remove("hide");
//   main_container.classList.add("blur-background")
// })
room_cancel.addEventListener("click", () => {
  main_container.classList.remove("blur-background");
  room_container.classList.add("hide");
})


// caution_cancel.addEventListener("click", () => {
//   caution_container.classList.add("hide");
//   main_container.classList.remove("blur-background");
//   room_container.classList.remove("blur-background");
// })



// caution_function_cancel.addEventListener("click", () => {
//   caution_container.classList.add("hide");
//   room_container.classList.remove("blur-background");
// })

// final_delete.addEventListener("click", () => {
//   let delete_emote = `
//       <div class="w-[80%] mx-auto flex justify-between items-center">
//         <p class="text-white text-lg">Deleting...</p> 
//         <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
//       </div>
//     `;
//   final_delete.innerHTML = delete_emote;
//   // loading_image.classList.remove("hide");
//   // final_delete.innerText = "deleting..."

//   setTimeout(() => {
//     caution_container.classList.add("hide");
//     room_container.classList.remove("blur-background");
//   }, 3000)

// })

async function roomDetails(students, allrooms, all_studs) {

  console.log(allrooms);
  console.log(students);
  console.log(all_studs);

  let room_detail = "";
  allrooms.forEach(room => {
    room_detail += `
          <div data-id="${room.id}" class="room-image relative">
                        <img src="../images/door (1).png" alt="" class="lg:w-50 lg:h-50 md:w-37 md:h-37 h-55 w-55">
                        <p
                            class="absolute md:top-22 md:left-19 lg:left-25 lg:top-30 left-25 top-35 font-bold lg:text-3xl md:text-2xl text-2xl text-white">
                            ${room.room_number}</p>
                    </div>
    `;
  })
  room_box.innerHTML = room_detail;
  const room_image = document.querySelectorAll(".room-image");

  room_image.forEach(rm => {
    rm.addEventListener("click", () => {
      const room_id = rm.dataset.id;
      console.log(room_id);
      room_container.classList.add("smooth");
      room_container.classList.remove("smooth-return");
      setTimeout(() => {
        room_container.classList.remove("hide");
      }, 250);
      roomoccupants(room_id, students, allrooms, all_studs);
    })

  })

}



async function create_hostel_function(message, type = "success") {
  setTimeout(() => {
    success_message.classList.remove("hide", "successful", "successful-2");

    // Apply styles
    if (type === "success") {
      success_message.classList.add("successful");
      success_text.classList.add("text-green-500");
    } else {
      success_message.classList.add("successful");
      success_text.classList.add("text-red-500");
    }

    success_text.innerHTML = message;

    // Animate form


    // info_form.classList.remove("hide");
    // form_header.classList.remove("hide");
    // user_toggle.classList.remove("hide");
    // account_info.classList.remove("hide");
    // studentinfo_container.classList.remove("hide");
    // edit_stud_container.classList.add("hide");
    // guardianinfo_container.classList.remove("hide");
    // edit_guard_container.classList.add("hide");
    // info_form.classList.add("hide");
    // form_header.classList.add("hide");
    // Hide after 5s
    setTimeout(() => {
      success_message.classList.remove("successful");
      success_message.classList.add("successful-2");

      setTimeout(() => {
        success_message.classList.add("hide");
      }, 200);
    }, 5000);

  });

  //  ✅ ONLY reset form on success
  //  if (type === "success") {
  //     stud_firstname.value = "";
  //     stud_lastname.value = "";
  //     stud_email.value = "";
  //     stud_phone.value = "";
  //     stud_id.value = "";
  //     stud_address.value = "";
  //     guard_fistname.value = "";
  //     guard_lastname.value = "";
  //     guard_email.value = "";
  //     guard_phone.value = "";
  //     guard_address.value = "";
  //  }

  //  stud_btn.innerHTML = "Submit";
  //  edit_stud_submit_btn.innerHTML = "Submit";
  //  edit_guard_submit_btn.innerHTML = "Submit"
}

async function roomoccupants(room_id, students, allrooms, all_studs) {
  let details = "";
  console.log(students);
  console.log(all_studs);

  const room = allrooms.find(s => s.id === room_id);
  console.log(room.room_type);
  room_type.innerHTML = room.room_type;
  room_number.innerHTML = room.room_number;

  console.log(room);

  const studs = students.filter(st => st.room_number === room.room_number);
  console.log(studs)

  studs.forEach((s, index) => {
    const occpt = all_studs.find(m => m.id === s.id);
    console.log(occpt);
    details += `
   <tr data-id= "${s.id}" class="border-b-1 border-b-solid border-b-blue-800 text-center  text-blue-800">
                        <td class="text-sm py-2">${index + 1}</td>
                        <td class="text-blue-500 text-sm font-bold py-2">${occpt.student_id}</td>
                        <td class="text-xs uppercase py-2">${occpt.student_name}</td>
                        <td class=" text-sm py-2">${s.bed_space}</td>
                        <td class="text-green-600 text-light uppercase text-xs py-2">active</td>
                        <td class="p-2">
                            <button data-id= "${s.id}" 
                                class="view-btn bg-blue-800  text-xs px-3 py-1 rounded-[10px] text-white font-bold hover:bg-blue-700">view</button>
                        </td>
                    </tr>
  `;
  })
  table_body.innerHTML = details;
}