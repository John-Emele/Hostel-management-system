let currentuser = null;

emailjs.init("1Y6z6QVOhu5JnGDHf");

let all_hostels = [];
let rooms = [];

let date = new Date();
let year = date.getFullYear();

if (date.getMonth() < 8) {
    year--;
}

const full = `${year}/${year + 1}`;

console.log(full);



const select_level = document.getElementById("select-level");
const student_level = document.getElementById("student-level");
const student_level_error = document.getElementById("student-level-error");
const level_submit_btn = document.getElementById("level-submit-btn");
const hostel_header = document.getElementById("hostel-header");

async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);

    if (!currentuser) return;

    const { data: hostel, error: hostel_error } = await supabaseClient
        .from('hostel')
        .select('*')


    console.log(hostel);

    all_hostels = hostel;
    if (hostel_error) {
        console.log(hostel_error)
        return;
    }

    // rooms//
    const { data: room, error: room_error } = await supabaseClient
        .from('rooms')
        .select('*')

    if (room_error) {
        console.log(room_error);
        return;
    }

    let rom = Array.isArray(room)
        ? room
        : [];

    rooms = rom;




    // students
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
        level_submit_btn.disabled = true;
        student_level.disabled = true;
        level_submit_btn.classList.remove("cursor-pointer");
        level_submit_btn.classList.add("cursor-not-allowed");
        hostel_body.classList.add("hide");
        alert("Unregistered")
        return;
    }
    else {
        const { data: stud, error: stud_error } = await supabaseClient
            .from('booked_students')
            .select()
            .eq("id", currentuser.id)
            .maybeSingle()

        if (stud_error) {
            return;
        }
        console.log(stud);


        if (stud == null) {
            level_submit_btn.disabled = false;
            student_level.disabled = false;
            level_submit_btn.classList.add("cursor-pointer");
            level_submit_btn.classList.remove("cursor-not-allowed");
            level_submit_btn.addEventListener("click", async (e) => {
                e.preventDefault();
                await book_room(all_hostels, currentuser.id, rooms);
            })
            return;
        }
        else if (stud != null) {
            if (stud.status == "paid") {
                alert("you already have a room okpo🙄🙄");
                level_submit_btn.disabled = true;
                student_level.disabled = true;
                return;
            }
        }
    }
}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();


const hostel_name = document.getElementById("hostel-name");
const hostel_details = document.getElementById("hostel-detail");
const hostel_container = document.getElementById("hostel-container");
const hostel_body = document.getElementById("hostel-body");
const hostels = document.getElementById("hostels");
// const rooms = document.getElementById("rooms");
const room_list = document.getElementById("room-list");
const hostel_list = document.getElementById("hostel-list");
const filter_btn = document.getElementById("filter-btn");
const sort_menu = document.getElementById("sort-menu");
const cancel_btn = document.getElementById("cancel");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");


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

function display() {
    filter_btn.addEventListener("click", () => {
        if (sort_menu.classList.contains("hide")) {
            sort_menu.classList.remove("hide");
        }
        else {
            sort_menu.classList.add("hide");
        }
    })
    hostels.addEventListener("mouseover", () => {
        hostel_list.classList.remove("hide");
    });
    rooms.addEventListener("mouseover", () => {
        room_list.classList.remove("hide");
    });
    // hostels.addEventListener("mouseleave", ()=> {
    //     hostel_list.classList.add("hide");
    // });
    hostel_list.addEventListener("mouseleave", () => {
        hostel_list.classList.add("hide");
    })
    room_list.addEventListener("mouseleave", () => {
        room_list.classList.add("hide");
    });
}

cancel_btn.addEventListener("click", () => {
    hostel_details.classList.add("smooth-return");
    hostel_details.classList.remove("smooth-exit");
    hostel_details.classList.remove("smooth");
    setTimeout(() => {
        hostel_details.classList.add("hide");
    }, 250);
})

async function book_room(hostels, student_id, h_rooms) {

    let level_check = false;
    if (student_level.value == "") {
        level_check = true;
        student_level_error.innerHTML = "select a level";
    }
    else {
        student_level_error.innerHTML = "";
    }

    if (level_check) {
        return;
    }

    try {
        let delete_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Submiting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
        level_submit_btn.disabled = true;
        level_submit_btn.innerHTML = delete_emote;


        if (!level_check) {

            const { data: student, error: student_error } = await supabaseClient
                .from('students')
                .update({
                    level: student_level.value.trim(),
                })
                .eq("id", student_id)
                .select()

            if (student_error) {
                console.log(student_error);
                level_submit_btn.disabled = false;
                create_hostel_function(
                    student_error.message || "submit failed",
                    "error"
                );
                return;
            }

            create_hostel_function(
                "submitted",
                "success"
            );
            console.log(student);

            displayHostel(hostels, student, h_rooms);
        }
    }
    catch (err) {
        console.log(err);
        level_submit_btn.disabled = false;
        create_hostel_function(
            err.message || "update failed",
            "error"
        );

    }
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
        select_level.classList.add("hide");
        hostel_body.classList.remove('hide');
        hostel_header.classList.remove("hide");
        hostel_details.classList.add("smooth-exit");
        hostel_details.classList.remove("smooth");
        hostel_details.classList.remove("smooth-return");

        setTimeout(() => {
            hostel_details.classList.add("hide");
        }, 250);

        // Hide after 5s
        setTimeout(() => {
            success_message.classList.remove("successful");
            success_message.classList.add("successful-2");

            setTimeout(() => {
                success_message.classList.add("hide");
            }, 200);
        }, 5000);

    });

    level_submit_btn.innerHTML = "Submit"
    // btn.innerHTML = "book";

}

async function displayHostel(hostels, student, h_rooms) {



    console.log(student[0]);
    // const { data: hostel, error: hostel_error } = await supabaseClient
    //     .from('hostel')
    //     .select()
    //     .eq("gender", student[0].gender)

    // if (hostel_error) {
    //     console.log(hostel_error);
    //     return;
    // }
    console.log(hostels);

    all_hostels = hostels;
    console.log(all_hostels);

    const studentData = Array.isArray(student) ? student[0] : student;

    const user_hostel = all_hostels.filter(
        s => s.gender === studentData.gender
    );

    console.log(user_hostel);

    let hostel_detail = "";
    user_hostel.forEach(hostel => {
        hostel_detail += `
      <div data-id="${hostel.id}" data-name="${hostel.name}" class="hostel-box w-full mx-auto relative overflow-hidden truncate rounded-[5px] dash-list-2">
                    <img src="${hostel.image_url}" class="image h-full rounded-[5px] w-full"
                        data-id="${hostel.id}">
                    <div data-id="${hostel.id}" class="info information_2 hide">
                        <h1 class="font-bold uppercase text-2xl text-white mb-5">${hostel.name}</h1>
                        <button data-id="${hostel.id}"
                            class="view-hostel rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">
                            View
                        </button>
                    </div>
                </div>
    `;
    })
    hostel_body.innerHTML = hostel_detail;
    hostel_container.append(hostel_body);
    const view_btn = document.querySelectorAll(".view-hostel");
    const hostel_info = document.querySelectorAll(".info");
    const hostel_box = document.querySelectorAll(".hostel-box");

    hostel_box.forEach(hostels => {
        const hostel_id = hostels.dataset.id;
        // console.log(hostel_id);
        hostels.addEventListener("mouseover", () => {
            hostel_info.forEach(info => {
                const info_id = info.dataset.id;
                if (hostel_id == info_id) {
                    info.classList.remove("hide");
                }
                else {
                    return;
                }
                // console.log(info_id);
            })

        })
        hostels.addEventListener("mouseleave", () => {
            hostel_info.forEach(info => {
                const info_id = info.dataset.id;
                if (hostel_id == info_id) {
                    info.classList.add("hide");
                }
                else {
                    return;
                }
                // console.log(info_id);
            })

        })

        view_btn.forEach(btn => {
            btn.addEventListener("click", () => {
                const view_id = btn.dataset.id;
                // console.log(view_id);
                if (hostel_id == view_id) {
                    console.log(view_id);
                    hostel_details.classList.add("smooth");
                    hostel_details.classList.remove("smooth-return");
                    hostel_details.classList.remove("smooth-exit");
                    setTimeout(() => {
                        hostel_details.classList.remove("hide");
                    }, 250);
                    hosteldetails(all_hostels, view_id, h_rooms, studentData)
                }
            })
        })
    })
}

async function hosteldetails(hostels, hostel_id, h_rooms, stud) {
    all_hostels = hostels;

    const data = all_hostels.find(s => s.id === hostel_id);

    hostel_name.innerHTML = data.name;

    const table_container = document.getElementById("table-container");
    const table_body = document.getElementById("table-body");
    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN"
        }).format(amount);
    }


    console.log(data.room_types);

    let room_type = Array.isArray(data.room_types)
        ? data.room_types
        : [];

    let hostel = "";
    room_type.forEach(type => {
        let r_types = type.split(":").map(t => t.trim());

        const hostel_room = h_rooms.find(
            r => r.room_type.toLowerCase() === r_types[0].toLowerCase()
        );

        if (!hostel_room) {
            console.log("No room match for:", r_types[0]);
            return;
        }

        console.log(r_types);
        hostel += `
      <tr class="border-b border-b-solid border-b-blue-600">
        <td class="uppercase text-blue-500 uppercase md:text-xs text-[10px] font-bold text-center">${r_types[0]}</td>
        <td class="uppercase text-blue-500 uppercase md:text-xs text-[10px] font-bold text-center">${r_types[1]}</td>
        <td class="uppercase text-green-500 uppercase md:text-sm text-[10px] font-bold text-center">${formatCurrency(hostel_room.price)}</td>
        <td class="uppercase text-green-500 uppercase md:text-sm text-[10px] font-light text-center">${r_types[2]}</td>
        <td class="p-2 text-center">
        <button type="button" data-id="${hostel_id}" 
            class="book-btn bg-blue-600 font-bold text-white p-3 md:w-20 w-15 rounded-[10px] uppercase text-xs hover:bg-blue-500">book
        </button>
        </td>
    </tr>
    `;
        table_body.innerHTML = hostel;

        const book_btn = document.querySelectorAll(".book-btn");

        book_btn.forEach(btn => {
            let r_types = type.split(":").map(t => t.trim());
            console.log()

            btn.addEventListener("click", (e) => {
                const btn_id = btn.dataset.id;
                console.log(btn_id);

                e.preventDefault();
                Allocate(btn, data, r_types[0], stud)
            })
        })
    })



}

async function Allocate(btn, hostel, room_type, stud) {
    console.log(stud.id);

    try {
        const { data: student, error: student_error } = await supabaseClient
            .from('students')
            .select()
            .eq("id", stud.id)

        if (student_error) {
            console.log(student_error);
            return;
        }

        console.log(student);
        const user_detail = student;

        const { data: rooms, error: rooms_error } = await supabaseClient
            .from('rooms')
            .select()
            .eq("room_type", room_type)

        if (rooms_error) {
            console.log(rooms_error);
            return;
        }

        console.log(rooms);
        // const user_detail = students;




        let delete_emote = `
      <div class="w-[45%] mx-auto flex justify-between items-center">
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

        btn.disabled = true;
        btn.innerHTML = delete_emote;

        const users_room = rooms[0]
        console.log(users_room);

        let payment_status = "paid";

        let old_amnt = Number(user_detail[0].account_bal.replace(/[^0-9.-]+/g, ""));

        if (Number(users_room.price) > old_amnt) {
            payment_status = "not_paid";
        }
        console.log(payment_status);

        if (payment_status == "paid") {
            const new_bal = old_amnt - Number(users_room.price);

            const { data: room, error: r_error } = await supabaseClient
                .from('room')
                .select()
                .eq("hostel", hostel.name)
                .eq("room_type", room_type)
                .order("room_number", { ascending: true });

            console.log(room);

            if (r_error) {
                console.log(r_error);
                return;
            }

            const availableRoom = room.find(r =>
                r.bed_spaces_occupied < r.bed_spaces
            );

            console.log(availableRoom);
            // 3. no room available
            if (!availableRoom) {
                // console.log("No available room");
                create_hostel_function(
                    "No available room",
                    "error"
                );
                return;
            }



            console.log("Allocating to:", availableRoom.room_number);

            const bedSpace = availableRoom.bed_spaces_occupied + 1;
            console.log(bedSpace);

            const { data, error } = await supabaseClient
                .from('booked_students')
                .insert([{
                    id: stud.id,
                    room_id: availableRoom.id,
                    room_type: room_type,
                    hostel_name: hostel.name,
                    student_level: stud.level,
                    room_number: availableRoom.room_number,
                    bed_space: bedSpace,
                    status: payment_status,
                    session: full
                }])
                .select()

            assignSupervisor(availableRoom, stud, hostel);

            function formatCurrency(amount) {
                return new Intl.NumberFormat("en-NG", {
                    style: "currency",
                    currency: "NGN"
                }).format(amount);
            }

            const { data: s, error: s_Error } = await supabaseClient
                .from("students")
                .update({
                    account_bal: formatCurrency(new_bal)
                })
                .eq("id", stud.id)
                .select()

            if (s_Error) {
                console.log(s_Error);
                return;
            }

            // 5. increment room occupancy
            const { data: up_room, error: uproomError } = await supabaseClient
                .from("room")
                .update({
                    bed_spaces_occupied: availableRoom.bed_spaces_occupied + 1
                })
                .eq("id", availableRoom.id)
                .select()

            if (uproomError) {
                console.log(uproomError);
                return;
            }

            console.log(up_room);

            btn.disabled = false;
            create_hostel_function(
                "room allocated",
                "success"
            );
            sendAllocationEmail(stud);
        }
        else {
            btn.disabled = false;
            create_hostel_function(
                "insufficient Funds🙄",
                "error"
            );
            return;
        }
    }
    catch (err) {
        btn.disabled = false;
        create_hostel_function(
            err.message || "something went wrong",
            "error"
        );
        return;
    }

}

async function sendAllocationEmail(student) {
    const names = student.student_name.split(" ");

    emailjs.send("service_qk71ecd", "template_hmzospp", {
        email: student.student_email,
        name: names[0],
    })
        .then(() => {
            console.log("Email sent ✅");
        })
        .catch((error) => {
            console.log("Email error ❌", error);
        });
}

async function assignSupervisor(avail_rooms, stud, hostel) {

    const { data: studs, error: stud_error } = await supabaseClient
        .from('booked_students')
        .select()
        .eq("id", stud.id)

    if (stud_error) {
        console.log(stud_error);
        return;
    };

    console.log(studs);

    const { data, error } = await supabaseClient
        .from('supervisor')
        .select()
        .eq('hostel', hostel.name)

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);

    let room = [];
    let name;
    let name_id;
    data.forEach(sr => {
        console.log(avail_rooms);
        room = sr.rooms;

        const fr = room.split(",");
        // console.log(fr);
        fr.forEach(s => {
            if (s == avail_rooms.room_number) {
                // console.log(s);
                // console.log(sr.name);
                name = sr.name;
                name_id = sr.id;
            }
        })

    })

    console.log(name, name_id)
    const update = {
        supervisor_name: name,
        supervisor_id: name_id,
    }

    const { data: upstuds, error: upstud_error } = await supabaseClient
        .from('booked_students')
        .update(update)
        .eq("id", stud.id)
        .select()

    if (upstud_error) {
        console.log(stud_error);
        return;
    };

    console.log(upstuds);

    // rooms.forEach




}
