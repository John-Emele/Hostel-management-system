console.log("Dashboard JS loaded");

// async function protectPage() {
//    const { data } = await supabaseClient.auth.getSession();

//    if (!data.session) {
//       window.location.href = "/login.html";
//    }

//    return data.session?.user;
// }
// window.addEventListener("DOMContentLoaded", async () => {
//    const user = await protectPage(supabase);
//    console.log(user);
// });

async function initUser() {
   const { data: { session } } = await supabaseClient.auth.getSession();
   currentuser = session?.user || null;
   console.log(currentuser);

   if (!currentuser) return;
   const { data: role, error: role_error } = await supabaseClient
      .from('profile')
      .select()
      .eq("id", currentuser.id)
      .single()

   if (role_error) {
      console.log(role_error);
      return;
   }
   console.log(role);


   // rooms = room;

   if (role.role == "supervisor") {
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

      const { data: room, error: r_error } = await supabaseClient
         .from('room')
         .select()
         .eq("supervisor_id", currentuser.id)


      if (r_error) {
         console.log(error)
         return;
      }
      console.log(room);
      displayTotal(data, room);
      roomManagement(room);

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




const notification_cancel = document.getElementById("notification-cancel");
const notification_container = document.getElementById("notification-box");
const notification_btn = document.getElementById("notification-btn");
const main_container = document.getElementById("main-container");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
////toggle//
const management_toggle = document.getElementById("management-toggle");
const request_toggle = document.getElementById("request-toggle");
const management_section = document.getElementById("management-section");
const request_section = document.getElementById("request-section");
const action_toggle_background = document.getElementById("action-toggle-background");
const drop_down = document.getElementById("drop-down");
const dropdown_menu = document.getElementById("dropdown-menu");
const toggle_background = document.getElementById("toggle-background");
const total_room = document.getElementById("total-room");
const student_toggle = document.getElementById("student-toggle");
const total_student = document.getElementById("total-student");
const room_toggle = document.getElementById("room-toggle");
// const occupied_room = document.getElementById("occupied-room");
// const available_room = document.getElementById("available-room");
const total_room_btn = document.getElementById("total-room-btn");
const total_student_btn = document.getElementById("total-student-btn");
const occupied_room_btn = document.getElementById("occupied-room-btn");
const available_room_btn = document.getElementById("available-room-btn");
const log_out_btn = document.getElementById("log-out-btn")
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const management_body = document.getElementById("manangement-body");
const request_body = document.getElementById("request-body");



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

      setTimeout(() => {
         success_message.classList.remove("successful");
         success_message.classList.add("successful-2");

         setTimeout(() => {
            success_message.classList.add("hide");
         }, 200);
      }, 5000);

   });


}


// drop_down.addEventListener("click", () => {
//    if (dropdown_menu.classList.contains("hide")) {
//       dropdown_menu.classList.remove("hide");
//    }
//    else {
//       dropdown_menu.classList.add("hide");
//    }
// })

function displayroom() {
   //total student///
   student_toggle.addEventListener("click", () => {
      if (toggle_background.classList.contains("toggle_4")) {
         student_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_3");
         total_student.classList.remove("hidden");
         setTimeout(() => {
            student_toggle.className = "p-1 text-xs text-white font-bold z-10";
            room_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         // available_room.classList.add("hidden");
         total_room.classList.add("hidden");
         // occupied_room.classList.add("hidden");
         // dropdown_menu.classList.add("hide");
      }
      else {
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_3");
         toggle_background.classList.add("toggle_4");
         student_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         total_student.classList.remove("hidden");
         setTimeout(() => {
            student_toggle.className = "p-1 text-xs text-white font-bold z-10";
            room_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         // available_room.classList.add("hidden");
         total_room.classList.add("hidden");
         // occupied_room.classList.add("hidden");
         // dropdown_menu.classList.add("hide");
      }
   })
   // total rooms//
   room_toggle.addEventListener("click", () => {
      // toggle_background.classList.remove("toggle");
      toggle_background.classList.remove("toggle_4")
      toggle_background.classList.add("toggle");
      if (toggle_background.classList.contains("toggle_3")) {
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         // total_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         // occupied_room.classList.add("hidden");
         // available_room.classList.add("hidden");
         // dropdown_menu.classList.add("hide");
      }
      else {
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         toggle_background.classList.add("toggle_3");
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         total_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         // occupied_room.classList.add("hidden");
         // available_room.classList.add("hidden");
         // dropdown_menu.classList.add("hide");
      }
   })
   //occupied rooms//
   // occupied_room_btn.addEventListener("click", () => {
   //    if (toggle_background.classList.contains("toggle_3")) {
   //       room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   //       toggle_background.classList.remove("toggle");
   //       toggle_background.classList.remove("toggle_4");
   //       occupied_room.classList.remove("hidden");
   //       setTimeout(() => {
   //          room_toggle.className = "p-1 text-xs text-white font-bold z-10";
   //          student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   //       }, 550)
   //       total_student.classList.add("hidden");
   //       total_room.classList.add("hidden");
   //       available_room.classList.add("hidden");
   //       dropdown_menu.classList.add("hide");
   //    }
   //    else {
   //       toggle_background.classList.remove("toggle");
   //       toggle_background.classList.remove("toggle_4");
   //       toggle_background.classList.add("toggle_3");
   //       room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   //       occupied_room.classList.remove("hidden");
   //       setTimeout(() => {
   //          room_toggle.className = "p-1 text-xs text-white font-bold z-10";
   //          student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   //       }, 550)
   //       total_student.classList.add("hidden");
   //       total_room.classList.add("hidden");
   //       available_room.classList.add("hidden");
   //       dropdown_menu.classList.add("hide");
   //    }
   // })
   // //available rooms//
   // available_room_btn.addEventListener("click", () => {
   //    if (toggle_background.classList.contains("toggle_3")) {
   //       room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   //       toggle_background.classList.remove("toggle");
   //       toggle_background.classList.remove("toggle_4");
   //       available_room.classList.remove("hidden");
   //       setTimeout(() => {
   //          room_toggle.className = "p-1 text-xs text-white font-bold z-10";
   //          student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   //       }, 550)
   //       total_student.classList.add("hidden");
   //       total_room.classList.add("hidden");
   //       occupied_room.classList.add("hidden");
   //       dropdown_menu.classList.add("hide");
   //    }
   //    else {
   //       toggle_background.classList.remove("toggle");
   //       toggle_background.classList.remove("toggle_4");
   //       toggle_background.classList.add("toggle_3");
   //       room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   //       available_room.classList.remove("hidden");
   //       setTimeout(() => {
   //          room_toggle.className = "p-1 text-xs text-white font-bold z-10";
   //          student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   //       }, 550)
   //       total_student.classList.add("hidden");
   //       total_room.classList.add("hidden");
   //       occupied_room.classList.add("hidden");
   //       dropdown_menu.classList.add("hide");
   //    }
   // })
}
// displayroom();

management_toggle.addEventListener("click", () => {
   management_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   action_toggle_background.classList.remove("toggle");
   action_toggle_background.classList.remove("toggle_3");
   action_toggle_background.classList.add("toggle_4");
   management_section.classList.remove("hidden");
   setTimeout(() => {
      management_toggle.className = "p-1 text-xs text-white font-bold z-10";
      request_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   }, 550)
   request_section.classList.add("hidden");
})
request_toggle.addEventListener("click", () => {
   request_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
   action_toggle_background.classList.remove("toggle");
   action_toggle_background.classList.remove("toggle_4");
   action_toggle_background.classList.add("toggle_3");
   request_section.classList.remove("hidden");
   setTimeout(() => {
      request_toggle.className = "p-1 text-xs text-white font-bold z-10";
      management_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
   }, 550)
   management_section.classList.add("hidden");
})


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

notification_btn.addEventListener("click", () => {
   notification_container.classList.remove("hide");
   main_container.classList.add("fade");
})

notification_cancel.addEventListener("click", () => {
   notification_container.classList.add("hide");
   main_container.classList.remove("fade");
})

const handleLogout = async () => {
   await supabaseClient.auth.signOut();
   window.location.href = "../login.html";
};

log_out_btn.addEventListener("click", async (e) => {
   e.preventDefault();
   await handleLogout();
})

async function displayTotal(students, rooms) {
   total_room.innerHTML = rooms.length;
   total_student.innerHTML = students.length;
}

async function roomManagement(rooms) {
   let details = ""

   rooms.forEach(s => {
      details += `
         <tr data-id="${s.id}" class="border-b-1 border-b-solid border-b-blue-500 py-1 h-10 text-center">
                                <td class=" text-blue-800 text-xs font-bold">Room ${s.room_number}</td>
                                <td class=" text-blue-800 text-xs font-bold">${s.room_type}</td>
                                <td class=" text-blue-800 text-xs font-bold">${s.bed_spaces_occupied}/${s.bed_spaces}</td>
                            </tr>
      `;
   })
  management_body.innerHTML = details;
}

async function request(rooms) {
   let details = ""

   rooms.forEach(s => {
      details += `
         <tr data-id="${s.id}" class="border-b-1 border-b-solid border-b-blue-500 py-1 h-10 text-center">
                                <td class=" text-blue-800 text-xs font-bold">Room ${s.room_number}</td>
                                <td class=" text-blue-800 text-xs font-bold">${s.room_type}</td>
                                <td class=" text-blue-800 text-xs font-bold">${s.bed_spaces_occupied}/${s.bed_spaces}</td>
                            </tr>
      `;
   })
  management_body.innerHTML = details;
}