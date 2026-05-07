let currentuser = null;

let allSups = [];

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
        console.log(role);
        const { data, error } = await supabaseClient
            .from('supervisor')
            .select('*')
        //   .maybeSingle()

        // allStudents = data;
        console.log(data);
        if (error) {
            console.log(error)
            return;
        }
        else {
            allSups = data;
            display(allSups);
            searchForSupervisor(allSups);
        }
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


const main_container = document.getElementById("main-container");
const supervisor_info = document.getElementById("info-container");
const view_btn = document.getElementById("view-btn");
const supervisor_search = document.getElementById("supervisor-search");
const add_btn = document.getElementById("add-btn");
const remove_btn = document.getElementById("remove-btn");
const cancel_btn = document.getElementById("cancel-btn");
const edit_cancel = document.getElementById("edit-cancel");
const loading_image = document.getElementById("loading-image");
const caution_container = document.getElementById("caution-container");
const final_delete = document.getElementById("final-delete");
const caution_function_cancel = document.getElementById("caution-function-cancel");
const edit = document.getElementById("edit-container");
const student_supervisor = document.getElementById("student-supervisor");
const table_container = document.getElementById("table-container");
const table_body = document.getElementById("table-body");
const caution_supervisor_id = document.getElementById("caution-supervisor-id");
const caution_supervisor_name = document.getElementById("caution-supervisor-name");
const sup_firstname = document.getElementById("sup-firstname");
const sup_lastname = document.getElementById("sup-lastname");
const sup_email = document.getElementById("sup-email");
const sup_phone = document.getElementById("sup-phone");
const sup_gender = document.getElementById("sup-gender");
const sup_id = document.getElementById("sup-id");
const sup_image = document.getElementById("sup-image");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");






cancel_btn.addEventListener("click", () => {
    supervisor_info.classList.remove("smooth-entry");
    supervisor_info.classList.add("smooth-leave");
    setTimeout(() => {
        supervisor_info.classList.add("hide");
    }, 250)
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

caution_function_cancel.addEventListener("click", () => {
    caution_container.classList.remove("smooth");
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.add("smooth-return");
    setTimeout(() => {
        caution_container.classList.add("hide");
    }, 300)
    supervisor_info.classList.remove("blur-background");
    main_container.classList.remove("blur-background");
})

// add_btn.addEventListener("click", () => {
//     edit.classList.remove("smooth-exit");
//     edit.classList.remove("smooth-return");
//     edit.classList.add("smooth");
//     edit.classList.remove("hide");
//     setTimeout(() => {
//         main_container.classList.add("blur-background");
//     }, 250)
// })

// edit_cancel.addEventListener("click", () => {
//     edit.classList.remove("smooth");
//     edit.classList.add("smooth-return");
//     setTimeout(() => {
//         edit.classList.add("hide");
//     }, 250)
//     main_container.classList.remove("blur-background");
// })






async function displaySupervisor() {
    const { data, error } = await supabaseClient
        .from('supervisor')
        .select('*')

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);

    allSups = data;

    // await display(allSups);
    // return data
}


function display(array) {
    // 👉 normalize input
    if (!Array.isArray(array)) {
        array = [array];
    }

    if (array.length === 0) {
        table_body.innerHTML = `<tr><td colspan="5">No results found</td></tr>`;
        return;
    }
    let supervisor_details = "";

    array.forEach((supervisor, index) => {
        console.log(supervisor);
        supervisor_details += `
         <tr data-id="${supervisor.id}" class="supervisor-row border-b-1 border-b-solid border-b-blue-800 text-blue-800 text-center">
                                <td class="py-1 font-bold">${index + 1}</td>
                                <td class="py-1 text-blue-600 font-bold">${supervisor.supervisor_id}</td>
                                <td class="py-1 font-medium">${supervisor.name}</td>
                                <td class="py-1 font-medium">${supervisor.hostel}</td>
                                <td class="py-2">
                                    <div  class="flex  items-center gap-3 w-[50%] mx-auto ">
                                        <button type="button" data-id="${supervisor.id}"
                                            class="view-btn text-xs bg-blue-500 text-white px-5 py-2 rounded-[5px] uppercase font-bold">view</button>
                                        <button data-id="${supervisor.id}"  type="button"
                                            class="remove-btn bg-red-500 text-white text-xs px-5 py-2 rounded-[5px] uppercase font-bold">remove</button>
                                    </div>
                                </td>
                            </tr>
        `;
    })
    table_body.innerHTML = supervisor_details;
    table_container.append(table_body);

    const sup_row = document.querySelectorAll(".supervisor-row");
    const view_btn = document.querySelectorAll(".view-btn");
    const remove_btn = document.querySelectorAll(".remove-btn");

    sup_row.forEach(sup => {
        const sup_id = sup.dataset.id;


        view_btn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const view_id = btn.dataset.id;
                console.log(view_id);
                if (view_id == sup_id) {
                    console.log(view_id);
                    displaySupervisorDetails(array, view_id);
                }
                supervisor_info.classList.add("smooth-entry");
                supervisor_info.classList.remove("smooth-leave");
                setTimeout(() => {
                    supervisor_info.classList.remove("hide");
                }, 250);
            })
        })

        remove_btn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const delete_id = btn.dataset.id;
                if (delete_id == sup_id) {
                    console.log(delete_id);
                    console.log(sup_id);
                }
                displaySupervisorDetails(array, delete_id);
                caution_container.classList.remove("smooth-exit");
                caution_container.classList.remove("smooth-return");
                caution_container.classList.add("smooth");
                setTimeout(() => {
                    caution_container.classList.remove("hide");
                }, 250);

                final_delete.addEventListener("click", async (e) => {
                    e.preventDefault();
                    deleteSupervisor(delete_id);
                })
            })


        })
    })


}


async function searchForSupervisor(supervisor) {
    // student_search.addEventListener("")
    supervisor_search.addEventListener("input", async () => {
        let search_check = false;

        // let query = "";


        if (supervisor_search.value.trim() == "") {
            search_check = true;
            await displaySupervisor(supervisor);
        }
        if (search_check) {
            return;
        }

        try {
            if (!search_check) {
                query = supervisor_search.value.trim().toLowerCase();

                console.log(supervisor);

                const filtered = supervisor.filter(sup => {
                    console.log(sup);
                    const name = sup.name.toLowerCase();
                    console.log(name);
                    return name.startsWith(query) || name.includes(query);
                });

                await display(filtered);
            }
        }
        catch (err) {
            console.log(err);
        }
    })

}



function displaySupervisorDetails(allSup, supervisor_id) {

    allSups = allSup;
    console.log(allSups);


    const data = allSups.find(s => s.id === supervisor_id);

    console.log(data);

    const names = data.name.split(" ");

    caution_supervisor_name.innerHTML = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase() + " " + names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase()
    caution_supervisor_id.innerHTML = data.supervisor_id;

    sup_firstname.innerHTML = names[0].charAt(0).toUpperCase() + names[0].slice(1).toLowerCase();
    sup_lastname.innerHTML = names[1].charAt(0).toUpperCase() + names[1].slice(1).toLowerCase();
    sup_id.innerHTML = data.supervisor_id;
    sup_phone.innerHTML = data.phone;
    sup_gender.innerHTML = data.gender.charAt(0).toUpperCase();
    sup_email.innerHTML = data.email;
    // stud_image.src = data

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
        main_container.classList.remove("blur-background");
        caution_container.classList.remove("smooth");
        caution_container.classList.remove("smooth-return");
        caution_container.classList.add("smooth-exit");


        setTimeout(() => {
            caution_container.classList.add("hide");
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


    final_delete.innerHTML = "Delete";
}

async function deleteSupervisor(supervisor_id) {

    let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

    final_delete.disabled = true;
    final_delete.innerHTML = delete_emote;
    try {
        const { data, error } = await supabaseClient
            .from('supervisor')
            .delete()
            .eq("id", supervisor_id)
            .select()

        console.log(data);

        if (error) {
            final_delete.disabled = false;
            create_hostel_function(
                error.message || "Delete failed",
                "error"
            );
            return;
        }

        final_delete.disabled = false;
        create_hostel_function(
            "Supervisor Deleted Successfully",
            "success"
        );
        await displaySupervisor();
    }
    catch (err) {
        final_delete.disabled = false;
        create_hostel_function(
            err.message || "Delete failed",
            "error"
        );
    }

}