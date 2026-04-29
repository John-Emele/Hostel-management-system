console.log("Dashboard JS loaded");

window.addEventListener("DOMContentLoaded", async () => {
  const { data, error } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "../login.html";
  }

  console.log("User:", data.session?.user);
});

window.addEventListener("DOMContentLoaded", async () => {
  const user = await protectPage(supabase);
  console.log(user);
});

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
const occupied_room = document.getElementById("occupied-room");
const available_room = document.getElementById("available-room");
const total_room_btn = document.getElementById("total-room-btn");
const total_student_btn = document.getElementById("total-student-btn");
const occupied_room_btn = document.getElementById("occupied-room-btn");
const available_room_btn = document.getElementById("available-room-btn");
const log_out_btn = document.getElementById("log-out-btn")


drop_down.addEventListener("click", () => {
   if (dropdown_menu.classList.contains("hide")) {
      dropdown_menu.classList.remove("hide");
   }
   else {
      dropdown_menu.classList.add("hide");
   }
})

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
         available_room.classList.add("hidden");
         total_room.classList.add("hidden");
         occupied_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
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
         available_room.classList.add("hidden");
         total_room.classList.add("hidden");
         occupied_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
   })
   // total rooms//
   total_room_btn.addEventListener("click", () => {
      if (toggle_background.classList.contains("toggle_3")) {
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         total_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         occupied_room.classList.add("hidden");
         available_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
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
         occupied_room.classList.add("hidden");
         available_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
   })
   //occupied rooms//
   occupied_room_btn.addEventListener("click", () => {
      if (toggle_background.classList.contains("toggle_3")) {
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         occupied_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         total_room.classList.add("hidden");
         available_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
      else {
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         toggle_background.classList.add("toggle_3");
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         occupied_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         total_room.classList.add("hidden");
         available_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
   })
   //available rooms//
   available_room_btn.addEventListener("click", () => {
      if (toggle_background.classList.contains("toggle_3")) {
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         available_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         total_room.classList.add("hidden");
         occupied_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
      else {
         toggle_background.classList.remove("toggle");
         toggle_background.classList.remove("toggle_4");
         toggle_background.classList.add("toggle_3");
         room_toggle.classList.remove("hover:bg-blue-800", "hover:text-white")
         available_room.classList.remove("hidden");
         setTimeout(() => {
            room_toggle.className = "p-1 text-xs text-white font-bold z-10";
            student_toggle.className = "p-1 text-xs text-blue-800 z-1 font-bold hover:bg-blue-800 hover:rounded-[5px] hover:text-white";
         }, 550)
         total_student.classList.add("hidden");
         total_room.classList.add("hidden");
         occupied_room.classList.add("hidden");
         dropdown_menu.classList.add("hide");
      }
   })
}
displayroom();

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

// import { useEffect, useState } from "react";
// import { supabase } from "./supabaseClient";
// import { useNavigate } from "react-router-dom";

// export default function Dashboard() {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   // 🔐 Check if user is logged in
//   useEffect(() => {
//     checkUser();
//   }, []);

//   async function checkUser() {
//     const { data } = await supabase.auth.getUser();

//     if (!data.user) {
//       navigate("/login"); // 🚫 not logged in
//     } else {
//       setUser(data.user);
//     }
//   }

//   // 🚪 Logout function
//   async function handleLogout() {
//     await supabase.auth.signOut();
//     navigate("/login");
//   }
//   log_out_btn.addEventListener("click", () => {
//    await handleLogout();
//   })

// //   return (
// //     <div style={{ padding: "20px" }}>
// //       <h2>Dashboard</h2>

// //       <p>Welcome: {user?.email}</p>

// //       <button onClick={handleLogout}>
// //         Logout
// //       </button>
// //     </div>
// //   );
// }

const handleLogout = async () => {
   await supabaseClient.auth.signOut();
   window.location.href = "../login.html"; // optional redirect
   // const { data } = await supabaseClient.auth.getSession();
   // console.log(data.session); // should be null
};

log_out_btn.addEventListener("click", async (e) => {
   e.preventDefault();
   await handleLogout();
})