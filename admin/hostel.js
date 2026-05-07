const main_container = document.getElementById("main-container");
const view_hostel = document.getElementById("view-hostel");
const hostel_details = document.getElementById("hostel-detail");
const cancel_btn = document.getElementById("cancel");
const cancel_hostel = document.getElementById("cancel-hostel");
const caution_container = document.getElementById("caution-container");
const add_hostel_btn = document.getElementById("add-hostel");
const add_room = document.getElementById("edit-container");
const hostel_form_btn = document.getElementById("add-room-btn");
const final_delete = document.getElementById("final-delete");
const male_hostel_section = document.getElementById("male-hostel-section");
const female_hostel_section = document.getElementById("female-hostel-section");
const caution_function_cancel = document.getElementById("caution-function-cancel");
const male_hostel_container = document.getElementById("male-hostel-container");
const female_hostel_container = document.getElementById("female-hostel-container");
const upload_btn = document.getElementById("upload-btn");
const change_img = document.getElementById("changed-image");
const change_box = document.getElementById("change-box");
const create_hostel_btn = document.getElementById("create-hostel-btn");
const create_hostel = document.getElementById("create-hostel");
const hostel_back_btn = document.getElementById("hostel-back-btn");
const new_hostel_btn = document.getElementById("new-hostel-btn");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
// hostel-form name////
const hostel_name = document.getElementById("hostel-name");
const hostel_image = document.getElementById("hostel-image");
const hostel_gender = document.getElementById("hostel-gender");
// const hostel_details = document.getElementById("hostel-detail");
const hostel_container = document.getElementById("hostel-container");
const hostel_body = document.getElementById("hostel-body");
const room_type = document.getElementById("room-type");
const room_status = document.getElementById("room-status");
const available_spaces = document.getElementById("available-spaces");
// error//
const room_type_error = document.getElementById("room-type-error");
const room_status_error = document.getElementById("room-status-error");
const available_spaces_error = document.getElementById("available-spaces-error");
const caution_room_type = document.getElementById("caution-room-type");
const caution_hostel_name = document.getElementById("caution-hostel-name");



cancel_btn.addEventListener("click", () => {
    hostel_details.classList.remove("smooth-exit");
    hostel_details.classList.remove("smooth");
    hostel_details.classList.add("smooth-return");
    setTimeout(() => {
        hostel_details.classList.add("hide");
    }, 250)
})

add_hostel_btn.addEventListener("click", () => {
    add_room.classList.remove("smooth-exit");
    add_room.classList.remove("smooth-return");
    add_room.classList.add("smooth");
    add_room.classList.remove("hide");
    setTimeout(() => {
        main_container.classList.add("blur-background");
    }, 250)
})

cancel_hostel.addEventListener("click", () => {
    add_room.classList.remove("smooth");
    add_room.classList.remove("smooth-exit");
    add_room.classList.add("smooth-return");
    setTimeout(() => {
        add_room.classList.add("hide");
    }, 250)
    main_container.classList.remove("blur-background");
})



// hostel_form_btn.addEventListener("click", () => {
//     let add_emote = `
//       <div class="w-[50%] mx-auto flex justify-between items-center">
//         <p class="text-white text-lg">adding...</p> 
//         <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
//       </div>
//     `;
//     hostel_form_btn.innerHTML = add_emote;
//     setTimeout(() => {
//         add_hostel.classList.remove("smooth");
//         add_hostel.classList.remove("smooth-return");
//         add_hostel.classList.add("smooth-exit");
//         setTimeout(() => {
//             add_hostel.classList.add("hide");
//         }, 300)
//         hostel_details.classList.remove("blur-background");
//         main_container.classList.remove("blur-background");
//         hostel_form_btn.innerHTML = "Add";
//     }, 3000)

// })

// delete_btn.addEventListener("click", () => {
//     caution_container.classList.remove("smooth-exit");
//     caution_container.classList.remove("smooth-return");
//     caution_container.classList.add("smooth");
//     caution_container.classList.remove("hide");
//     // hostel_details.classList.add("blur-background");
//     main_container.classList.add("blur-background");
// })



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

// final_delete.addEventListener("click", () => {
//     let delete_emote = `
//       <div class="w-[80%] mx-auto flex justify-between items-center">
//         <p class="text-white text-lg">Deleting...</p> 
//         <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
//       </div>
//     `;
//     final_delete.innerHTML = delete_emote;
//     setTimeout(() => {
//         caution_container.classList.remove("smooth");
//         caution_container.classList.remove("smooth-return");
//         caution_container.classList.add("smooth-exit");
//         setTimeout(() => {
//             caution_container.classList.add("hide");
//         }, 300)
//         main_container.classList.remove("blur-background");
//         final_delete.innerHTML = "Delete";
//     }, 3000)

// })

upload_btn.addEventListener("click", () => {
    hostel_image.click();
});

hostel_image.addEventListener("change", () => {
    const file = hostel_image.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const imageURL = URL.createObjectURL(file);
    console.log(imageURL);
    change_img.src = imageURL;
    upload_btn.style.display = "none";
    change_box.classList.remove("hide");
});

new_hostel_btn.addEventListener("click", () => {
    create_hostel.classList.add("smooth");
    create_hostel.classList.remove("smooth-exit");
    create_hostel.classList.remove("smooth-return");
    create_hostel.classList.remove("hide");
})

async function uploadImage(file) {
    if (!file) {
        throw new Error("No file selected");
    }

    const fileName = Date.now() + "-" + file.name;

    const { error } = await supabaseClient
        .storage
        .from("school_project") // MUST match bucket name exactly
        .upload(fileName, file);

    if (error) throw error;

    const { data } = supabaseClient
        .storage
        .from("school_project")
        .getPublicUrl(fileName);
    console.log(data.publicUrl);

    return data.publicUrl;
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
        create_hostel.classList.remove("smooth", "smooth-return");
        create_hostel.classList.add("smooth-exit");
        add_room.classList.remove("smooth");
        add_room.classList.remove("smooth-return");
        add_room.classList.add("smooth-exit");
        main_container.classList.remove("blur-background");
        caution_container.classList.remove("smooth");
        caution_container.classList.remove("smooth-return");
        caution_container.classList.add("smooth-exit");
        add_room.classList.remove("smooth");
        add_room.classList.remove("smooth-return");
        add_room.classList.add("smooth-exit");

        setTimeout(() => {
            create_hostel.classList.add("hide");
            add_room.classList.add("hide");
            caution_container.classList.add("hide");
        }, 250);

        create_hostel_btn.innerHTML = "Add";
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
        hostel_image.value = "";
        hostel_gender.value = "";
        hostel_name.value = "";
        change_img.src = "";
        upload_btn.style.display = "flex";
        change_box.classList.add("hide");
        room_type.value = "";
        room_status.value = "";
        available_spaces.value = "";
    }

    create_hostel_btn.innerHTML = "Add";
    hostel_form_btn.innerHTML = "Add";
}

hostel_back_btn.addEventListener("click", () => {
    create_hostel.classList.remove("smooth");
    create_hostel.classList.remove("smooth-exit");
    create_hostel.classList.add("smooth-return");
    setTimeout(() => {
        create_hostel.classList.add("hide");
    }, 250);
})


async function create_hostel_admin() {

    const image_file = hostel_image.files[0];

    let hostel_check = false;

    // ✅ FIXED validation (no resetting)
    if (hostel_name.value == "") {
        document.getElementById("hostel-name-error").innerHTML = "field must not be empty";
        hostel_check = true;
    } else {
        document.getElementById("hostel-name-error").innerHTML = "";
    }

    if (hostel_gender.value == "") {
        document.getElementById("hostel-gender-error").innerHTML = "field must not be empty";
        hostel_check = true;
    } else {
        document.getElementById("hostel-gender-error").innerHTML = "";
    }

    if (!image_file) {
        document.getElementById("error-image").innerHTML = "field must not be empty";
        hostel_check = true;
    } else {
        document.getElementById("error-image").innerHTML = "";
    }

    if (hostel_check) return; // stop if invalid

    try {

        let add_emote = `
        <div class="w-[40%] mx-auto flex justify-between items-center">
            <p class="text-white text-sm">adding...</p> 
            <img src="../images/loading (2).png" class="delete-function w-5 h-5">
        </div>
        `;

        create_hostel_btn.disabled = true;
        create_hostel_btn.innerHTML = add_emote;

        const image = await uploadImage(image_file);
        let final_name = hostel_name.value.trim().split(" ");
        console.log(final_name);
        let first_half = final_name[0].charAt(0).toUpperCase() + final_name[0].slice(1).toLowerCase();
        let second_half = final_name[1].charAt(0).toUpperCase() + final_name[1].slice(1).toLowerCase();

        const { data: hostel, error: hostel_error } = await supabaseClient
            .from("hostel")
            .insert([{
                name: first_half + " " + second_half,
                image_url: image,
                gender: hostel_gender.value.trim().charAt(0).toUpperCase() + hostel_gender.value.trim().slice(1).toLowerCase(),
            }]);

        // ❌ HANDLE ERROR
        if (hostel_error) {
            console.log(hostel_error);
            create_hostel_btn.disabled = false;

            create_hostel_function(
                hostel_error.message || "Something went wrong",
                "error"
            );

            return; // ❗ stop execution
        }
        // addNewHostelToUI({
        //     name: hostel_name.value,
        //     image_url: image,
        //     gender: hostel_gender.value
        // });
        display_hostel()


        // ✅ SUCCESS
        create_hostel_btn.disabled = false;

        create_hostel_function(
            "Hostel added successfully ✅",
            "success"
        );

    } catch (err) {
        console.log(err);

        create_hostel_btn.disabled = false;

        create_hostel_function(
            err.message || "Upload failed",
            "error"
        );
    }
}

async function displayroomtype() {
    const { data, error } = await supabaseClient
        .from('rooms')
        .select('*')

    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
    let room_types = "";
    data.forEach(room => {
        let ops = document.createElement("option");
        ops.value = room.room_type;
        ops.textContent = room.room_type;
        console.log(ops);
        room_type.appendChild(ops);
    })
}
displayroomtype();

async function addRooms(hostel_id) {
    let new_room = [];
    let form_check = false;

    if (room_type.value.trim() == "") {
        form_check = true;
        room_type_error.innerHTML = "select a type";
    }
    else {
        room_type_error.innerHTML = "";
    }
    if (available_spaces.value.trim() == "") {
        form_check = true;
        available_spaces_error.innerHTML = "Enter available spaces";
    }
    else {
        available_spaces_error.innerHTML = "";
    }
    if (room_status.value.trim() == "") {
        form_check = true;
        room_status_error.innerHTML = "select status";
    }
    else {
        room_status_error.innerHTML = "";
    }

    if (form_check) {
        return;
    }

    try {

        const { data: hostel, error: hostel_error } = await supabaseClient
            .from("hostel")
            .select("room_types")
            .eq("id", hostel_id)
            .single();

        if (hostel_error) {
            return;
        }

        // console.log(Room_types);
        // console.log(typeof Room_types);

        // let update_info = [...Room_types, slots];

        if (!form_check) {

            const hostel_room = room_type.value.trim();
            const hostel_spaces = available_spaces.value.trim()

            new_room.push(hostel_room, hostel_spaces);
            console.log(new_room);

            let add_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Adding...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
            hostel_form_btn.disabled = true;
            hostel_form_btn.innerHTML = add_emote;


            let Room_types = Array.isArray(hostel.room_types)
                ? [...hostel.room_types]
                : [];

            const existingTypes = Room_types.map(item =>
                item.split(":")[0].trim().toLowerCase()
            );

            // 3. check for duplicate
            let type_check = false;
            if (existingTypes.includes(room_type.value.trim().toLowerCase())) {
                hostel_form_btn.disabled = false;
                hostel_form_btn.innerHTML = "Add";
                room_type_error.innerHTML = "Room type already exists ❌";
                type_check = true;
            }
            if (type_check) {
                return;
            }
            if (!type_check) {


                const slots = room_type.value.trim() + ":" + available_spaces.value.trim() + ":" + room_status.value.trim();
                console.log(slots);
                console.log(hostel_id);


                // console.log(Room_types);
                Room_types.push(slots);

                const { data, error } = await supabaseClient
                    .from('hostel')
                    .update({
                        room_types: Room_types,
                    })
                    .eq("id", hostel_id)
                    .select()



                if (error) {
                    console.log(error);
                    hostel_form_btn.disabled = false;
                    create_hostel_function(
                        error.message || "Something went wrong",
                        "error"
                    );
                    return;
                }
                console.log(data);
                createindividualroom(data, new_room)

                hostel_form_btn.disabled = false;
                // hosteldetails(hostel_id);
                create_hostel_function(
                    "Room added successfully ✅",
                    "success"
                );
                await hosteldetails(hostel_id);
            }
        }
    }
    catch (err) {
        console.log(err);
        hostel_form_btn.disabled = false;
        create_hostel_function(
            err.message || "Something went wrong",
            "error"
        );
    }
}

create_hostel_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await create_hostel_admin();
})

async function display_hostel() {
    try {
        const { data: my_hostel, error } = await supabaseClient
            .from('hostel')
            .select("*");

        if (error) {
            console.log(error);
            return;
        }

        console.log(my_hostel);

        // ✅ Clear containers ONCE
        male_hostel_container.innerHTML = "";
        female_hostel_container.innerHTML = "";

        my_hostel.forEach(hostel => {

            const card = `
            <div  class="w-full mx-auto h-50 relative overflow-hidden truncate rounded-[5px] dash-list-2">
                <img src="${hostel.image_url}" class="image h-full rounded-[5px] w-full" data-id="${hostel.id}">
                <div data-id="${hostel.id}" class="info information_2 hide">
                    <h1 class="font-bold uppercase text-2xl text-white mb-5">${hostel.name}</h1>
                    <button data-id="${hostel.id}" type="button"
                        class="view-hostel rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">
                        View
                    </button>
                </div>
            </div>
            `;

            // ✅ Separate by gender
            if (hostel.gender === "Male") {
                male_hostel_container.innerHTML += card;
            } else if (hostel.gender === "Female") {
                female_hostel_container.innerHTML += card;
            }
        });

        // ✅ Append once
        male_hostel_section.appendChild(male_hostel_container);
        female_hostel_section.appendChild(female_hostel_container);

        const info_box = document.querySelectorAll(".info");
        const image_box = document.querySelectorAll(".image");
        const view_hostel = document.querySelectorAll(".view-hostel");

        image_box.forEach(image => {
            const image_id = image.dataset.id;
            info_box.forEach(info => {
                const info_id = info.dataset.id;
                if (image_id == info_id) {
                    image.addEventListener("mouseenter", () => {
                        console.log(info_id);
                        console.log(image_id);
                        info.classList.remove("hide");
                        image.classList.add("image_shake");
                    })
                    info.addEventListener("mouseleave", () => {
                        info.classList.add("hide");
                        image.classList.remove("image_shake");
                    })
                    view_hostel.forEach(view_btn => {
                        const view_btn_id = view_btn.dataset.id
                        if (image_id && info_id == view_btn_id) {
                            view_btn.addEventListener("click", () => {
                                console.log(view_btn_id);
                                hostel_details.classList.remove("smooth-exit");
                                hostel_details.classList.add("smooth");
                                hostel_details.classList.remove("smooth-return");
                                setTimeout(() => {
                                    hostel_details.classList.remove("hide");
                                }, 250);
                                hosteldetails(view_btn_id);
                                hostel_form_btn.addEventListener("click", async (e) => {
                                    e.preventDefault();
                                    await addRooms(view_btn_id);
                                })
                            })
                        }
                    })
                }
            })
        })
    } catch (err) {
        console.log(err);
    }
}
display_hostel();

// async function display_hostel() {
//     try {
//         const { data: my_hostel, error } = await supabaseClient
//             .from('hostel')
//             .select("*");

//         if (error) {
//             console.log(error);
//             return;
//         }

//         console.log(my_hostel);

//         // Clear once
//         male_hostel_container.innerHTML = "";
//         female_hostel_container.innerHTML = "";

//         // Render cards
//         my_hostel.forEach(hostel => {
//             const card = `
//             <div class="dash-list-2 w-full mx-auto h-50 relative overflow-hidden rounded-[5px]">
//                 <img src="${hostel.image_url}" class="image h-full w-full rounded-[5px]" data-id="${hostel.id}">

//                 <div data-id="${hostel.id}" class="info hide">
//                     <h1 class="font-bold uppercase text-2xl text-white mb-5">${hostel.name}</h1>

//                     <button data-id="${hostel.id}" class="view-hostel bg-blue-600 text-white p-2 rounded-[20px]">
//                         View
//                     </button>
//                 </div>
//             </div>
//             `;

//             if (hostel.gender === "Male") {
//                 male_hostel_container.innerHTML += card;
//             } else {
//                 female_hostel_container.innerHTML += card;
//             }
//         });

//         // Bind events AFTER render
//         setTimeout(() => {

//             const cards = document.querySelectorAll(".dash-list-2");

//             cards.forEach(card => {
//                 const image = card.querySelector(".image");
//                 const info = card.querySelector(".info");
//                 const btn = card.querySelector(".view-hostel");

//                 const id = image.dataset.id;

//                 image.addEventListener("mouseenter", () => {
//                     info.classList.remove("hide");
//                 });

//                 card.addEventListener("mouseleave", () => {
//                     info.classList.add("hide");
//                 });

//                 btn.addEventListener("click", () => {
//                     hostel_details.classList.remove("hide");

//                     hosteldetails(id);

//                     hostel_form_btn.onclick = async (e) => {
//                         e.preventDefault();
//                         await addRooms(id);
//                     };
//                 });
//             });

//         }, 0);

//     } catch (err) {
//         console.log(err);
//     }
// }
// display_hostel();

function addNewHostelToUI(hostel) {
    const container = hostel.gender === "male"
        ? male_hostel_container
        : female_hostel_container;

    const div = document.createElement("div");

    div.className = "w-full mx-auto h-50 relative overflow-hidden truncate rounded-[5px] dash-list-2";

    div.innerHTML = `
        <img src="${hostel.image_url}" class="image h-full rounded-[5px] w-full" data-id="${hostel.id}">
        <div data-id="${hostel.id}" class="info information_2 hide">
            <h1 class="font-bold uppercase text-2xl text-white mb-5">${hostel.name}</h1>
            <button data-id="${hostel.id}"
                class="view-hostel rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">
                View
            </button>
        </div>
    `;

    container.append(div);// 🔥 THIS is the magic

    const info_box = document.querySelectorAll(".info");
    const image_box = document.querySelectorAll(".image");
    const view_hostel = document.querySelectorAll(".view-hostel");

    image_box.forEach(image => {
        const image_id = image.dataset.id;
        info_box.forEach(info => {
            const info_id = info.dataset.id;
            if (image_id == info_id) {
                image.addEventListener("mouseenter", () => {
                    console.log(info_id);
                    console.log(image_id);
                    info.classList.remove("hide");
                    image.classList.add("image_shake");
                })
                info.addEventListener("mouseleave", () => {
                    info.classList.add("hide");
                    image.classList.remove("image_shake");
                })
                view_hostel.forEach(view_btn => {
                    const view_btn_id = view_btn.dataset.id
                    if (image_id && info_id == view_btn_id) {
                        view_btn.addEventListener("click", () => {
                            console.log(view_btn_id);
                            hostel_details.classList.remove("hide");
                        })
                    }
                })
            }
        })
    })
}

async function hosteldetails(hostel_id) {
    const { data, error } = await supabaseClient
        .from('hostel')
        .select()
        .eq("id", hostel_id)
        .single()

    if (error) {
        console.log(error);
        return;
    }

    const room_type = Array.isArray(data.room_types)
        ? data.room_types
        : [];

    console.log(room_type);

    if (room_type == null) {
        return;
    }

    const room_detail = room_type.map(item =>
        item.split(":")[0].trim()
    );
    const room_status = room_type.map(item =>
        item.split(":")[2].trim()
    );
    const available_spaces = room_type.map(item =>
        item.split(":")[1].trim()
    );
    console.log(room_detail);

    const { data: rooms, error: rooms_error } = await supabaseClient
        .from('rooms')
        .select()
        .in("room_type", room_detail)

    if (rooms_error) {
        console.log(rooms_error);
        return;
    }
    console.log(rooms);

    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN"
        }).format(amount);
    }

    let hostel = "";

    const roomMap = {};

    room_type.forEach(item => {
        const [type, space, status] = item.split(":").map(v => v.trim());

        roomMap[type] = {
            space,
            status
        };
    });

    rooms.forEach(room => {
        const extra = roomMap[room.room_type] || {};


        hostel += `
      <tr class="border-b border-b-solid border-b-blue-600">
        <td class="uppercase text-blue-500 uppercase text-xs font-bold text-center">${room.room_type}</td>
        <td class="uppercase text-blue-500 uppercase text-xs font-bold text-center">${room.bed_spaces}</td>
        <td class="uppercase text-green-500 uppercase text-sm font-bold text-center">${formatCurrency(room.price)}</td>
        <td class="uppercase text-green-500 uppercase text-sm font-light text-center">${extra.space}</td>
        <td class="uppercase text-green-500 uppercase text-sm font-light text-center">${extra.status}</td>
        <td class="p-2 text-center">
        <button data-type="${room.room_type}" type="button"
            class="delete-btn bg-red-600 font-bold text-white p-3 w-20 rounded-[10px] uppercase text-xs hover:bg-red-600">delete
            </button>
        </td>
    </tr>
    `;
    })
    const table_container = document.getElementById("table-container");
    const table_body = document.getElementById("table-body");
    // console.log(hostel);
    table_body.innerHTML = hostel;
    table_container.append(table_body);

    const delete_btn = document.querySelectorAll(".delete-btn");
    console.log(delete_btn);

    delete_btn.forEach(btn => {
        console.log(btn);
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            caution_container.classList.add("smooth");
            caution_container.classList.remove("smooth-return")
            caution_container.classList.remove("smooth-exit")
            setTimeout(() => {
                caution_container.classList.remove("hide");
            }, 250)
            let delete_type = btn.dataset.type;
            // console.log(data.name)
            // console.log(delete_type);
            caution_room_type.innerHTML = delete_type;
            caution_hostel_name.innerHTML = data.name;
            final_delete.addEventListener("click", async (e) => {
                e.preventDefault();
                await deleteRoom(hostel_id, delete_type);
            })

        })
    })
}

async function deleteRoom(hostel_id, room_type_to_delete) {

    try {
        let delete_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
        final_delete.disabled = true;
        final_delete.innerHTML = delete_emote;

        const { data, error } = await supabaseClient
            .from('hostel')
            .select("room_types")
            .eq("id", hostel_id)
            .single()

        if (error) {
            console.log(error)
            return;
        }

        console.log(data);

        const room_type = Array.isArray(data.room_types)
            ? data.room_types
            : [];
        console.log(room_type);

        const updated = room_type.filter(item => {
            if (!item || item === "::") return false; // ❌ remove junk

            const [type, space, status] = item.split(":").map(v => v.trim());

            if (!type || !space || !status) return false; // ❌ remove invalid

            return type !== room_type_to_delete;
        });

        const { error: update_error } = await supabaseClient
            .from("hostel")
            .update({ room_types: updated })
            .eq("id", hostel_id);

        if (update_error) {
            console.log(update_error);
            final_delete.disabled = false;
            final_delete.innerHTML = "Delete";
            create_hostel_function(
                update_error.message || "Something went wrong",
                "error"
            );
            return;

        }


        final_delete.disabled = false;
        final_delete.innerHTML = "Delete";
        create_hostel_function(
            "Room deleted successfully ✅",
            "success"
        );
        // 4. Refresh UI
        hosteldetails(hostel_id);
    }
    catch (err) {
        final_delete.disabled = false;
        final_delete.innerHTML = "Delete";
        console.log(err);
        create_hostel_function(
            err.message || "Something went wrong",
            "error"
        );
    }
}

async function createindividualroom(hostel, Room_type) {

    console.count("createindividualroom called");

    console.log(hostel);
    console.log(Room_type);
    let room = [];

    const { data: r, error: r_error } = await supabaseClient
        .from('rooms')
        .select('*')

    if (r_error) {
        console.log(r_error);
        return;
    }
    console.log(r);
    allrooms = r;

    const { data: existingRooms } = await supabaseClient
        .from("room")
        .select("room_number")
        .eq("hostel", hostel[0].name)
        .order("room_number", { ascending: true });


    console.log(existingRooms);
    const lastRoom = existingRooms.at(-1);
    console.log(lastRoom);



    // let start = lastRoom
    //     ? Number(lastRoom.room_number) + 1
    //     : 1;

    let start = 1

    if (existingRooms.length > 0) {
        const lastRoom = existingRooms.at(-1);
        start = Number(lastRoom.room_number) + 1;
    }

    // if (existingRooms.length > 0) {
    //     start = parseInt(existingRooms[0].room_number, 10) + 1;
    // }
    console.log(start);

    // const parsedTypes = Room_type.map(rt => {
    //     const [type, count] = rt.split(":");
    //     return { type, count: Number(count) };
    // });

    // for (const { type, count } of parsedTypes) {

        const template = allrooms.find(r => r.room_type === Room_type[0]);

        for (let i = 1; i <= Room_type[1]; i++) {

            let roomNumber = String(start).padStart(3, "0");

            room.push({
                hostel: hostel[0].name,
                room_number: roomNumber,
                room_type: Room_type[0],
                bed_spaces: template.bed_spaces
            });

            start++;
        }

    console.log(room);

    const { data, error } = await supabaseClient
        .from('room')
        .insert(room)
        .select()

    if (error) {
        console.log(error);
        return;
    }
    console.log(data);
}