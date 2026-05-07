async function first() {
    const { data: { user } } = await supabaseClient.auth.getUser();

     console.log("User role:", user);
    const { data, error } = await supabaseClient
        .from("profile")
        .select("*")
        .eq("id", user.id)
        .single();

    if (error) {
        console.error(error);
    }

    if(data.role != "admin"){
        window.location.href = "../error.html";
        return;
    }

    
}
first();


const edit_container = document.getElementById("edit-container");
const main_container = document.getElementById("main-container");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const final_delete = document.getElementById("final-delete");
const caution_container = document.getElementById("caution-container");
const caution_function_cancel = document.getElementById("caution-function-cancel");

const edit_cancel = document.getElementById("edit-cancel");

edit_cancel.addEventListener("click", () => {
    edit_container.classList.remove("smooth");
    edit_container.classList.remove("smooth-exit");
    edit_container.classList.add("smooth-return");
    setTimeout(() => {
        edit_container.classList.add("hide");
    }, 250);
})

// async function protectPage() {
//     const { data } = await supabaseClient.auth.getSession();

//     if (!data.session) {
//         window.location.href = "/login.html";
//     }

//     return data.session?.user;
// }

// window.addEventListener("DOMContentLoaded", async () => {
//     const user = await protectPage(supabase);
//     console.log(user);
// });

// const filter_role = document.getElementById("filter-role");
// const pop_sort = document.getElementById("pop-sort");

// filter_role.addEventListener("click", () => {
//     if (pop_sort.classList.contains("hide")) {
//         pop_sort.classList.remove("hide");
//     }
//     else {
//         pop_sort.classList.add("hide");
//     }
// })

// console.log(supabaseClient);

async function displaytotals() {
    const total_student = document.getElementById("total-students");
    const total_supervisor = document.getElementById("total-supervisors");
    const total_hostel = document.getElementById("total-hostel");
    const total_users = document.getElementById("total-users");

    async function displaystudents() {
        const { data, error } = await supabaseClient
            .from("students")
            .select("*")

        if (error) {
            console.log(error)
        }

        total_student.innerHTML = data.length;
        //    console.log(data);
        //    console.log(data.length);
    }
    displaystudents();

    async function displaysupervisors() {
        const { data, error } = await supabaseClient
            .from("supervisor")
            .select("*")

        if (error) {
            console.log(error)
        }

        total_supervisor.innerHTML = data.length;

        //    console.log(data);
        //    console.log(data.length);
    }
    displaysupervisors();


    async function displayusers() {
        const { data, error } = await supabaseClient
            .from('profile')
            .select('*')

        //    console.log(data);
        //    console.log(data.length);

        if (error) {
            console.log(error)
        }

        total_users.innerHTML = data.length;


    }
    displayusers();

    async function displayhostels() {
        const { data, error } = await supabaseClient
            .from('hostel')
            .select('*')

        if (error) {
            console.log(error)
        }

        total_hostel.innerHTML = data.length;
    }
    displayhostels();


}
displaytotals();


async function userfunction() {
    const body_container = document.getElementById("body-container");
    const table_container = document.getElementById("table-container");

    const { data, error } = await supabaseClient
        .from('profile')
        .select('*')

    console.log(data);

    if (error) {
        console.log(error);
    }

    let profile_details = ""
    data.forEach((profile, index) => {
        profile_details += `
         <tr data-id="${profile.id}" class="data-row border-t border-t-1 border-t-solid border-t-blue-900">
                        <td class="uppercase text-center text-blue-900 font-bold text-sm py-2">${index + 1}</td>
                        <td class="uppercase text-center text-blue-500 font-bold text-[10px] py-2">${profile.id}</td>
                        <td class="text-center text-blue-900 font-bold text-sm py-2">${profile.name}</td>
                        <td class="uppercase text-center text-black font-bold text-xs py-2">${profile.role}</td>
                        <td class="uppercase text-center text-black font-bold text-xs py-2">${profile.status}</td>
                        <td class="py-2">
                            <div class="flex gap-2 items-center w-[30%] mx-auto">
                                <!-- <img src="" alt=""> -->
                                <p data-id="${profile.id}" data-role="${profile.role}" class="view-btn text-center text-xs bg-blue-900 hover:bg-blue-700 font-bold text-white py-1 px-2 rounded-[5px]">view</p>
                                <p data-id="${profile.id}" class="delete-btn text-center text-xs cursor-pointer">🗑️</p>
                                <!-- <img src="" alt=""> -->
                            </div>
                        </td>
        </tr>             
    `;
        body_container.innerHTML = profile_details;
        table_container.append(body_container);
    })

    const view_btn = document.querySelectorAll(".view-btn");
    const delete_btn = document.querySelectorAll(".delete-btn");


    view_btn.forEach(btn => {
        btn.addEventListener("click", () => {
            const role = btn.dataset.role
            console.log(role);
            const id = btn.dataset.id
            console.log(id);

            if (role == "student") {
                window.location.href = `student.html?id=${id}`;
            }
            else if (role == "supervisor") {
                window.location.href = `supervisor.html?id=${id}`;
            }
            // const id = p_d.dataset.id
            // window.location.href = `?id=${id}`;
        })
    })

    deleteuser();

}
userfunction();


function toggle() {
    const toggle = document.querySelectorAll("tab");

    const tabs = document.querySelectorAll(".tab");
    const slider = document.querySelector(".slider");

    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            // remove active
            tabs.forEach(t => {
                // t.classList.remove("active");
                t.classList.remove("text-white")
                t.classList.add("text-sm", "flex-1", "text-blue-900", "z-1", "font-bold", "text-center", "hover:bg-blue-200", "hover:rounded-[5px]");
            }
            );
            console.log(index)
            console.log(tab.innerHTML);
            tab.classList.remove("text-blue-900", "hover:bg-blue-200", "hover:rounded-[5px]")
            tab.classList.add("flex-1", "text-sm", "text-white", "z-1", "font-bold");

            // move slider
            // if(index == 2){
            //   slider.classList.remove("w-10");
            //   slider.classList.add("w-25");
            // }
            const targetX = index * 100;

            slider.animate(
                [
                    { transform: slider.style.transform || "translateX(0%)" }, // from
                    { transform: `translateX(${targetX}%)` }                      // to
                ],
                {
                    duration: 300,
                    easing: "ease",
                    fill: "forwards"
                }
            );

            // update final state so next click starts from correct position
            slider.style.transform = `translateX(${targetX}%)`;
            // slider.style.transform = `translateX()`;
        });
    });
}
toggle();

async function deleteuser() {
    try {
        const del_btn = document.querySelectorAll(".delete-btn");
        // console.log(del_btn);

        del_btn.forEach(btn => {
            btn.addEventListener("click", () => {
                caution_container.classList.remove("smooth-exit");
                caution_container.classList.remove("smooth-return");
                caution_container.classList.add("smooth");
                caution_container.classList.remove("hide");
                // hostel_details.classList.add("blur-background");
                main_container.classList.add("blur-background");
            })

            btn.addEventListener("click", async () => {
                final_delete.addEventListener("click", async () => {
                    let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Deleting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
                    final_delete.disabled = true;
                    final_delete.innerHTML = delete_emote;


                    const del_id = btn.dataset.id;
                    console.log(del_id);

                    const { data: p_d, error } = await supabaseClient
                        .from('profile')
                        .delete()
                        .eq("id", del_id)
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

                    if(p_d == null || ""){
                        create_hostel_function(
                            "Acess Denied",
                            "error"
                        );
                        return;
                    }
                    const data_row = document.querySelectorAll(".data-row");
                    data_row.forEach(row => {
                        const row_id = row.dataset.id;

                        if (row_id == del_id) {
                            row.classList.add("hide");
                        }
                    })

                    final_delete.disabled = false;
                    create_hostel_function(
                        "Deleted successfully",
                        "success"
                    );

                })
            })


        })

    }
    catch (err) {
        final_delete.disabled = false;
        final_delete.innerHTML = "Delete";
        console.log(err);

        create_hostel_function(
            err.message || "Delete failed",
            "error"
        );
    }
}
// deleteuser();


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
        caution_container.classList.remove("smooth", "smooth-return");
        caution_container.classList.add("smooth-exit");

        setTimeout(() => {
            caution_container.classList.add("hide");
            main_container.classList.remove("blur-background");
        }, 250);

        final_delete.innerHTML = "Delete";
        const total_users = document.getElementById("total-users");
                let new_users = total_users.innerHTML;
                total_users.innerHTML = Number(new_users - 1);

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
    // if (type === "success") {
    //     hostel_image.value = "";
    //     hostel_gender.value = "";
    //     hostel_name.value = "";
    //     change_img.src = "";
    //     upload_btn.style.display = "flex";
    //     change_box.classList.add("hide");
    // }

    // create_hostel_btn.innerHTML = "Add";
}

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




