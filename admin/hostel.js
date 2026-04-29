const main_container = document.getElementById("main-container");
const view_hostel = document.getElementById("view-hostel");
const hostel_details = document.getElementById("hostel-detail");
const cancel_btn = document.getElementById("cancel");
const cancel_hostel = document.getElementById("cancel-hostel");
const caution_container = document.getElementById("caution-container");
const add_hostel_btn = document.getElementById("add-hostel");
const add_hostel = document.getElementById("edit-container");
const hostel_form_btn = document.getElementById("add-hostel-btn");
const final_delete = document.getElementById("final-delete");
const delete_btn = document.getElementById("delete-btn");
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






cancel_btn.addEventListener("click", () => {
    hostel_details.classList.add("hide");
})

add_hostel_btn.addEventListener("click", () => {
    add_hostel.classList.remove("smooth-exit");
    add_hostel.classList.remove("smooth-return");
    add_hostel.classList.add("smooth");
    add_hostel.classList.remove("hide");
    setTimeout(() => {
        main_container.classList.add("blur-background");
    }, 250)
})

cancel_hostel.addEventListener("click", () => {
    add_hostel.classList.remove("smooth");
    add_hostel.classList.remove("smooth-exit");
    add_hostel.classList.add("smooth-return");
    setTimeout(() => {
        add_hostel.classList.add("hide");
    }, 250)
    main_container.classList.remove("blur-background");
})

hostel_form_btn.addEventListener("click", () => {
    let add_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">adding...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
    hostel_form_btn.innerHTML = add_emote;
    setTimeout(() => {
        add_hostel.classList.remove("smooth");
        add_hostel.classList.remove("smooth-return");
        add_hostel.classList.add("smooth-exit");
        setTimeout(() => {
            add_hostel.classList.add("hide");
        }, 300)
        hostel_details.classList.remove("blur-background");
        main_container.classList.remove("blur-background");
        hostel_form_btn.innerHTML = "Add";
    }, 3000)

})

delete_btn.addEventListener("click", () => {
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.remove("smooth-return");
    caution_container.classList.add("smooth");
    caution_container.classList.remove("hide");
    // hostel_details.classList.add("blur-background");
    main_container.classList.add("blur-background");
})


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
        }, 300)
        main_container.classList.remove("blur-background");
        final_delete.innerHTML = "Delete";
    }, 3000)

})


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

        setTimeout(() => {
            create_hostel.classList.add("hide");
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
    }

    create_hostel_btn.innerHTML = "Add";
}

hostel_back_btn.addEventListener("click", () => {
    create_hostel.classList.remove("smooth");
    create_hostel.classList.remove("smooth-exit");
    create_hostel.classList.add("smooth-return");
    setTimeout(() => {
        create_hostel.classList.add("hide");
    }, 250);
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

        const { data: hostel, error: hostel_error } = await supabaseClient
            .from("hostel")
            .insert([{
                name: hostel_name.value,
                image_url: image,
                gender: hostel_gender.value,
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
        addNewHostelToUI({
            name: hostel_name.value,
            image_url: image,
            gender: hostel_gender.value
        });


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

create_hostel_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    create_hostel_admin();
})

// async function display_hostel() {
//     try {
//         const { data: my_hostel, error: my_hostel_error } = await supabaseClient
//             .from('hostel')
//             .select("*")
//         console.log(my_hostel);

//         let details = "";
//         let female_details = "";
//         my_hostel.forEach(hostels => {
//             // male///
//             if(hostels.gender == "male"){
//                 // console.log(hostels);
//                 details += `
//         <div class="w-full mx-auto h-50 relative overflow-hidden truncate rounded-[5px] dash-list-2">
//                             <img id="image"
//                                 src="${hostels.image_url}"
//                                 alt="" class="h-full rounded-[5px] w-full">
//                             <div data-id="${hostels.id}" id="info" class="information_2 hide">
//                                 <h1 class="font-bold uppercase text-2xl text-white mb-5">${hostels.name}</h1>
//                                 <button data-id = "${hostels.id}" id="view-hostel"
//                                     class="rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">View</button>
//                             </div>
//         </div>
//         `;
//             male_hostel_container.innerHTML = details;
//             male_hostel_section.appendChild(male_hostel_container);
//             }
//              else {
//                 let details = "";
//                 male_hostel_container.innerHTML = details;
//                 male_hostel_section.appendChild(male_hostel_container);
//             }
//         });

//             my_hostel.forEach(female => {
//                  if(female.gender == "female"){
//                 console.log(female);
//                 female_details += `
//         <div class="w-full mx-auto h-50 relative overflow-hidden truncate rounded-[5px] dash-list-2">
//                             <img id="image"
//                                 src="${female.image_url}"
//                                 alt="" class="h-full rounded-[5px] w-full">
//                             <div data-id="${female.id}" id="info" class="information_2 hide">
//                                 <h1 class="font-bold uppercase text-2xl text-white mb-5">${female.name}</h1>
//                                 <button data-id = "${female.id}" id="view-hostel"
//                                     class="rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">View</button>
//                             </div>
//         </div>
//         `;
//             female_hostel_container.innerHTML = female_details;
//             female_hostel_section.appendChild(female_hostel_container);
//             }
//             //  else {
//             //     let female_details = "";
//             //     female_hostel_container.innerHTML = female_details;
//             //     female_hostel_section.appendChild(female_hostel_container);
//             // }
//             })
//         
//         if (my_hostel_error) {
//             console.log(my_hostel_error);
//         }
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

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
                    <button data-id="${hostel.id}"
                        class="view-hostel rounded-[20px] p-2 w-25 font-bold uppercase text-white hover:text-black bg-blue-600 hover:bg-white">
                        View
                    </button>
                </div>
            </div>
            `;

            // ✅ Separate by gender
            if (hostel.gender === "male") {
                male_hostel_container.innerHTML += card;
            } else if (hostel.gender === "female") {
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
                                hostel_details.classList.remove("hide");
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

// async function  add_room
