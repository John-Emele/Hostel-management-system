let currentuser = null;

const room_add_btn = document.getElementById("add-room-btn");

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

    if (role.role == "admin") {
        room_add_btn.addEventListener("click", async (e) => {
            e.preventDefault();
            await createRooms();
        })
        displayTotal();
        roomsfunction();
    }
    else {
        create_hostel_function(
            "You're not an Admin",
            "error"
        );
        return;
    }


}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();

const create_room = document.getElementById("create_room");
const cancel_btn = document.getElementById("cancel-btn");
const edit_cancel_btn = document.getElementById("edit-cancel-btn");
const discard_btn = document.getElementById("discard-btn");
const save_room = document.getElementById("save-room");
const add_btn = document.getElementById("add-btn");
const btn_container = document.getElementById("btn-container");
const add_hostel_btn = document.getElementById("add-hostel-btn");
const discard_hostel_btn = document.getElementById("discard-hostel-btn");
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
const caution_container = document.getElementById("caution-container");
const caution_function_cancel = document.getElementById("caution-function-cancel");
const final_delete = document.getElementById("final-delete");
const main_container = document.getElementById("main-container");
const body_container = document.getElementById("body-container");
const table_container = document.getElementById("table-container");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const room_type_warning = document.getElementById("room-type-warning");
const total_rooms = document.getElementById("total-rooms");
const total_room_types = document.getElementById("total-room-types");

async function displayTotal() {
    async function displayTotalRoomTypes() {
        const { data: rooms, error: rooms_error } = await supabaseClient
            .from('rooms')
            .select('*')

        console.log(rooms)
        total_room_types.innerHTML = rooms.length;

        if (rooms_error) {
            create_hostel_function(
                rooms_error.message || "something went wrong",
                "error"
            );
            return;
        }
    }
    displayTotalRoomTypes();

    async function displayTotalRooms() {
        const { data: room, error: room_error } = await supabaseClient
            .from('room')
            .select('*')

        console.log(room)
        total_rooms.innerHTML = room.length;

        if (room_error) {
            create_hostel_function(
                room_error.message || "something went wrong",
                "error"
            );
            return;
        }

    }
    displayTotalRooms();
}
// displayTotal();

caution_function_cancel.addEventListener("click", () => {
    caution_container.classList.remove("smooth");
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.add("smooth-return");
    setTimeout(() => {
        caution_container.classList.add("hide");
    }, 250)
    // hostel_details.classList.remove("blur-background");
    main_container.classList.remove("blur-background");
})


final_delete.addEventListener("click", () => {
    let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
    final_delete.innerHTML = delete_emote;
    setTimeout(() => {
        caution_container.classList.remove("smooth");
        caution_container.classList.remove("smooth-return");
        caution_container.classList.add("smooth-exit");
        setTimeout(() => {
            caution_container.classList.add("hide");
        }, 250)
        main_container.classList.remove("blur-background");
        final_delete.innerHTML = "Delete";
    }, 3000)

})


// view_btn.addEventListener("click", () => {
//     edit_container.classList.remove("smooth-exit");
//     edit_container.classList.add("smooth-entry");
//     setTimeout(() => {
//         edit_container.classList.remove("hide");
//     });
// })
// delete_btn.addEventListener("click", () => {
//     caution_container.classList.remove("smooth-exit");
//     caution_container.classList.remove("smooth-return");
//     caution_container.classList.add("smooth");
//     caution_container.classList.remove("hide");
//     // hostel_details.classList.add("blur-background");
//     main_container.classList.add("blur-background", "z-11111");
// })


cancel_btn.addEventListener("click", () => {
    create_room.classList.remove("toggle_3");
    create_room.classList.add("toggle_5");
    setTimeout(() => {
        create_room.classList.add("hide");
    }, 950)
});

add_btn.addEventListener("click", () => {
    create_room.classList.remove("toggle_5");
    create_room.classList.add("toggle_3");
    setTimeout(() => {
        create_room.classList.remove("hide");
    })
})

async function updateRoom(edit_btn_id) {
    console.log(edit_btn_id);
    add_hostel_btn.addEventListener("click", async () => {
        let room_check = false;

        if (edit_type.value == "") {
            edit_type_error.innerHTML = "Field mjust not be empty";
            room_check = true;
        }
        else {
            edit_type_error.innerHTML = "";
            room_check = false;
        }
        if (edit_spaces.value == "") {
            edit_spaces_error.innerHTML = "Field mjust not be empty";
            room_check = true;
        }
        else {
            edit_spaces_error.innerHTML = "";
            room_check = false;
        }
        if (edit_price.value == "") {
            edit_price_error.innerHTML = "Field mjust not be empty";
            room_check = true;
        }
        else {
            edit_price_error.innerHTML = "";
            room_check = false;
        }
        if (edit_status.value == "") {
            edit_status_error.innerHTML = "Field mjust not be empty";
            room_check = true;
        }
        else {
            edit_status_error.innerHTML = "";
            room_check = false;
        }
        try {
            if (room_check == false) {
                const new_details = {
                    room_type: edit_type.value,
                    price: edit_price.value,
                    bed_spaces: edit_spaces.value,
                    status: edit_status.value,
                };

                let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
            `;
                add_hostel_btn.disabled = true;
                add_hostel_btn.innerHTML = delete_emote;

                const { data: edit, error: edit_error } = await supabaseClient
                    .from('rooms')
                    .update(new_details)
                    .eq("id", edit_btn_id)
                    .select()

                if (edit_error) {
                    console.log(edit_error);
                    add_hostel_btn.disabled = false
                    create_hostel_function(
                        "Access Denied",
                        "error"
                    );
                    return;
                }
                console.log(edit);
                add_hostel_btn.disabled = false;
                roomsfunction();
                create_hostel_function(
                    "Deleted successfully",
                    "success"
                );
            }
            edit_container.classList.add("smooth-leave");
            btn_container.classList.remove("smooth-leave");
            setTimeout(() => {
                edit_container.classList.add("hide");
            }, 250)
        }
        catch (err) {
            console.log(err);

            add_hostel_btn.disabled = false;

            create_hostel_function(
                err.message || "Upload failed",
                "error"
            );
        }
    })


}

edit_cancel_btn.addEventListener("click", () => {
    btn_container.classList.remove("hide")
    edit_container.classList.add("hide");
    btn_container.classList.remove("smooth-exit");
    btn_container.classList.remove("smooth-entry");
    btn_container.classList.remove("smooth-leave");
    edit_container.classList.remove("smooth-exit");
    edit_container.classList.remove("smooth-entry");
    edit_container.classList.remove("smooth-leave");
    // setTimeout(() => {
    //     edit_container.classList.add("hide");
    // }, 250)
});

discard_btn.addEventListener("click", () => {
    btn_container.classList.remove("smooth-exit");
    btn_container.classList.remove("smooth-entry");
    btn_container.classList.add("smooth-leave");
    edit_container.classList.remove("smooth-exit");
    edit_container.classList.remove("smooth-entry");
    edit_container.classList.remove("smooth-leave");
    setTimeout(() => {
        btn_container.classList.add("hide");
    }, 250)
})

save_room.addEventListener("click", () => {
    btn_container.classList.remove("smooth-exit");
    btn_container.classList.remove("smooth-entry");
    btn_container.classList.add("smooth-leave");
    edit_container.classList.remove("hide");
    edit_container.classList.remove("smooth-exit");
    edit_container.classList.remove("smooth-entry");
    edit_container.classList.remove("smooth-leave");

    setTimeout(() => {
        btn_container.classList.add("hide");
    }, 250)
})



async function roomsfunction() {
    const { data, error } = await supabaseClient
        .from("rooms")
        .select("*")

    console.log(data);

    let room_details = "";
    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN"
        }).format(amount);
    }

    data.forEach(room => {
        room_details += `
        <tr data-id = "${room.id}"  class="room-row border-b-1 border-b-solid border-b-blue-800 text-blue-800 text-center uppercase">
                                <td class="py-1">${room.room_type}</td>
                                <td class="py-1">${room.bed_spaces}</td>
                                <td class="py-1 text-green-600 font-bold">${formatCurrency(room.price)}</td>
                                <td class="py-2">
                                    <div class="flex  items-center gap-3 w-[50%] mx-auto ">
                                        <button data-id = "${room.id}"
                                            class="edit-btn text-xs bg-blue-500 text-white px-5 py-2 rounded-[5px] uppercase font-bold">edit</button>
                                        <button data-id = "${room.id}"
                                            class="delete-btn bg-red-500 text-white text-xs px-5 py-2 rounded-[5px] uppercase font-bold">remove</button>
                                    </div>
                                </td>
                            </tr>
        `;
    })
    body_container.innerHTML = room_details;
    table_container.append(body_container);

    const edit_btn = document.querySelectorAll(".edit-btn");
    const delete_btn = document.querySelectorAll(".delete-btn");

    edit_btn.forEach(btn => {
        btn.addEventListener("click", () => {
            const btn_id = btn.dataset.id;
            console.log(btn_id);
            edit_container.classList.remove("smooth-leave");
            edit_container.classList.remove("smooth-exit");
            edit_container.classList.add("smooth-entry");
            setTimeout(() => {
                edit_container.classList.remove("hide");
            });

            editRooms(btn_id);
            updateRoom(btn_id)

        })
    })

    delete_btn.forEach(btn => {
        btn.addEventListener("click", async () => {
            const del_id = btn.dataset.id;
            const { data, error } = await supabaseClient
                .from('rooms')
                .select()
                .eq("id", del_id)
                .single()

            console.log(data);

            if (error) {
                create_hostel_function(
                    error.message || "something went wrong",
                    "error"
                );
                return;
            }
            room_type_warning.innerHTML = data.room_type;
            console.log(del_id);
            caution_container.classList.remove("smooth-exit");
            caution_container.classList.remove("smooth-return");
            caution_container.classList.add("smooth");
            setTimeout(() => {
                caution_container.classList.remove("hide");
            }, 250)
            // hostel_details.classList.add("blur-background");
            // main_container.classList.add("blur-background", "z-11111");
            // deleterooms(del_id);
            final_delete.addEventListener("click", (e) => {
                e.preventDefault();
                deleterooms(del_id);
            })
        })


    })




}
// roomsfunction();

async function createRooms() {
    let room_check = false;

    if (room_type.value == "") {
        room_type_error.innerHTML = "Field mjust not be empty";
        room_check = true;
    }
    else {
        room_type_error.innerHTML = "";
        room_check = false;
    }
    if (room_spaces.value == "") {
        room_spaces_error.innerHTML = "Field mjust not be empty";
        room_check = true;
    }
    else {
        room_spaces_error.innerHTML = "";
        room_check = false;
    }
    if (room_price.value == "") {
        room_price_error.innerHTML = "Field mjust not be empty";
        room_check = true;
    }
    else {
        room_price_error.innerHTML = "";
        room_check = false;
    }
    if (room_status.value == "") {
        room_status_error.innerHTML = "Field mjust not be empty";
        room_check = true;
    }
    else {
        room_status_error.innerHTML = "";
        room_check = false;
    }

    try {
        let add_emote = `
        <div class="w-[40%] mx-auto flex justify-between items-center">
            <p class="text-white text-sm">adding...</p> 
            <img src="../images/loading (2).png" class="delete-function w-5 h-5">
        </div>
        `;

        room_add_btn.disabled = true;
        room_add_btn.innerHTML = add_emote;

        if (room_check == false) {
            console.log([
                room_type.value,
                room_spaces.value,
                room_price.value,
                room_status.value
            ])

            const { data: rooms, error: rooms_error } = await supabaseClient
                .from("rooms")
                .insert([{
                    room_type: room_type.value,
                    price: room_price.value,
                    bed_spaces: room_spaces.value,
                    status: room_status.value,
                }])

            console.log(rooms);

            if (rooms_error) {
                room_add_btn.disabled = false;
                console.log(rooms_error);

                create_hostel_function(
                    rooms_error.message || "Something went wrong",
                    "error"
                );
                return;
            }
            // success
            room_add_btn.disabled = false;

            create_hostel_function(
                "Room added successfully ✅",
                "success"
            );
            roomsfunction();
        }
    }
    catch (err) {
        console.log(err);

        room_add_btn.disabled = false;

        create_hostel_function(
            err.message || "Upload failed",
            "error"
        );
    }
}
// room_add_btn.addEventListener("click", async (e) => {
//     e.preventDefault();
//     await createRooms();
// })

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
        create_room.classList.remove("smooth", "smooth-return", "toggle_3");
        create_room.classList.add("smooth-exit");
        caution_container.classList.remove("smooth", "smooth-return");
        caution_container.classList.add("smooth-exit");
        edit_container.classList.remove("smooth-exit", "smooth-entry");
        edit_container.classList.add("smooth-leave");
        btn_container.classList.remove("smooth-exit", "smooth-entry");
        btn_container.classList.add("smooth-leave");

        setTimeout(() => {
            create_room.classList.add("hide");
            caution_container.classList.add("hide");
            edit_container.classList.add("hide");
            main_container.classList.remove("blur-background")
        }, 250);

        room_add_btn.innerHTML = "Add";
        final_delete.innerHTML = "Delete";
        add_hostel_btn.innerHTML = "save changes";
        discard_btn.innerHTML = "discard changes";
        // Hide after 5s
        setTimeout(() => {
            success_message.classList.remove("successful");
            success_message.classList.add("successful-2");

            setTimeout(() => {
                success_message.classList.add("hide");
            }, 200);
        }, 5000);

    });

    // ✅ ONLY reset form on success
    if (type === "success") {
        room_type.value = "";
        room_spaces.value = "";
        room_price.value = "";
        room_status.src = "";
        // upload_btn.style.display = "flex";
        // change_box.classList.add("hide");
    }
}

// async function create_hostel_function(message, type = "success") {
// setTimeout(() => {
//     success_message.classList.remove("hide", "successful", "successful-2");

//     // Apply styles
//     if (type === "success") {
//         success_message.classList.add("successful");
//         success_text.classList.add("text-green-500");
//     } else {
//         success_message.classList.add("successful");
//         success_text.classList.add("text-red-500");
//     }

//     success_text.innerHTML = message;

//     // Animate form
//     create_hostel.classList.remove("smooth", "smooth-return");
//     create_hostel.classList.add("smooth-exit");

//     setTimeout(() => {
//         create_hostel.classList.add("hide");
//     }, 250);

//     create_hostel_btn.innerHTML = "Add";
//     // Hide after 5s
//     setTimeout(() => {
//         success_message.classList.remove("successful");
//         success_message.classList.add("successful-2");

//         setTimeout(() => {
//             success_message.classList.add("hide");
//         }, 200);
//     }, 5000);

// });

// // ✅ ONLY reset form on success
// if (type === "success") {
//     hostel_image.value = "";
//     hostel_gender.value = "";
//     hostel_name.value = "";
//     change_img.src = "";
//     upload_btn.style.display = "flex";
//     change_box.classList.add("hide");
// }

// room_add_btn.innerHTML = "Add";
// }
async function deleterooms(del_btn_id) {
    try {
        console.log(del_btn_id);
        let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
        final_delete.disabled = true;
        final_delete.innerHTML = delete_emote;


        // const del_id = btn.dataset.id;
        // console.log(del_id);

        const { data: p_d, error } = await supabaseClient
            .from('rooms')
            .delete()
            .eq("id", del_btn_id)
            .select()

        console.log(p_d);

        if (error) {
            console.log(error);
            final_delete.disabled = false;
            create_hostel_function(
                error.message || "Something went wrong",
                "error"
            );
            return;
        }

        if (p_d == null || "") {
            create_hostel_function(
                "Acess Denied",
                "error"
            );
            return;
        }
        const room_row = document.querySelectorAll(".room-row");
        room_row.forEach(row => {
            const row_id = row.dataset.id;
            console.log(row_id);
            if (row_id == del_btn_id) {
                row.classList.add("hide");
            }
            else {
                return;
            }
        })

        final_delete.disabled = false;
        create_hostel_function(
            "Deleted successfully",
            "success"
        );
        roomsfunction();

    }
    catch (err) {
        final_delete.disabled = false;
        console.log(err);
        create_hostel_function(
            err.message || "Delete failed",
            "error"
        );
        return;
    }
}

async function editRooms(edit_btn_id) {
    const { data: rooms, error: rooms_error } = await supabaseClient
        .from("rooms")
        .select()
        .eq("id", edit_btn_id)
        .single()

    console.log(rooms);

    if (rooms_error) {
        console.log(rooms_error);
        return;
    }

    edit_type.value = rooms.room_type;
    edit_spaces.value = rooms.bed_spaces;
    edit_price.value = rooms.price;
    edit_status.value = rooms.status;

}
