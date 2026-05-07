let currentuser = null;

let allStudents = [];

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
    console.log(role.user_email);

    if (role.role == "admin") {
        const { data, error } = await supabaseClient
            .from('students')
            .select('*')
        //   .maybeSingle()

        // allStudents = data;
        console.log(data);
        if (error) {
            console.log(error)
            return;
        }
        else {
            allStudents = data;
            display(allStudents);
            searchForStudent(allStudents);
        }
    }
    else {
        // console.log(role.role);
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
const student_info = document.getElementById("info-container");
const cancel_btn = document.getElementById("cancel-btn");
// const edit_cancel = document.getElementById("edit-cancel");
const loading_image = document.getElementById("loading-image");
const caution_container = document.getElementById("caution-container");
const final_delete = document.getElementById("final-delete");
const caution_function_cancel = document.getElementById("caution-function-cancel");
const edit = document.getElementById("edit-container");
const student_search = document.getElementById("student-search");
const table_container = document.getElementById("table-container");
const table_body = document.getElementById("table-body");
// info //
const stud_firstname = document.getElementById("stud-firstname");
const stud_lastname = document.getElementById("stud-lastname");
const stud_email = document.getElementById("stud-email");
const stud_phone = document.getElementById("stud-phone");
const stud_gender = document.getElementById("stud-gender");
const stud_id = document.getElementById("stud-id");
const stud_address = document.getElementById("stud-address");
const stud_image = document.getElementById("student-image");
// guard //
const guard_fistname = document.getElementById("guard-firstname");
const guard_lastname = document.getElementById("guard-lastname");
const guard_email = document.getElementById("guard-email");
const guard_phone = document.getElementById("guard-phone");
const guard_address = document.getElementById("guard-address");

const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");

const caution_student_id = document.getElementById("caution-student-id");
const caution_student_name = document.getElementById("caution-student-name");


cancel_btn.addEventListener("click", () => {
    student_info.classList.remove("smooth-entry");
    student_info.classList.add("smooth-leave");
    setTimeout(() => {
        student_info.classList.add("hide");
    }, 250)
    // main_container.classList.remove("blur-background");
})


caution_function_cancel.addEventListener("click", () => {
    caution_container.classList.remove("smooth");
    caution_container.classList.remove("smooth-exit");
    caution_container.classList.add("smooth-return");
    setTimeout(() => {
        caution_container.classList.add("hide");
    }, 250)
    student_info.classList.remove("blur-background");
    main_container.classList.remove("blur-background");
})

// edit_cancel.addEventListener("click", () => {
//     edit.classList.remove("smooth");
//     edit.classList.add("smooth-return");
//     setTimeout(() => {
//         edit.classList.add("hide");
//     }, 250)
//     main_container.classList.remove("blur-background");
// })

async function displayStudents() {
    const { data, error } = await supabaseClient
        .from('students')
        .select('*')

    if (error) {
        console.log(error);
        return;
    }

    console.log(data);

    allStudents = data;

    await display(allStudents);
    // return data
}
// displayStudents();

function display(array) {
    // 👉 normalize input
    if (!Array.isArray(array)) {
        array = [array];
    }

    if (array.length === 0) {
        table_body.innerHTML = `<tr><td colspan="5">No results found</td></tr>`;
        return;
    }
    let student_details = "";

    array.forEach((student, index) => {
        console.log(student);
        student_details += `
         <tr data-id="${student.id}" class="student-row border-b-1 border-b-solid border-b-blue-800 text-blue-800 text-center">
                                <td class="py-1 font-medium">${index + 1}</td>
                                <td class="py-1 text-blue-600 font-bold">${student.student_id}</td>
                                <td class="py-1 font-medium">${student.student_name}</td>
                                <td class="py-1 font-medium">${student.hostel}</td>
                                <td class="py-1 font-medium">${student.room_number}</td>
                                <td class="py-2">
                                    <div  class="flex  items-center gap-3 w-[50%] mx-auto ">
                                        <button type="button" data-id="${student.id}"
                                            class="view-btn text-xs bg-blue-500 text-white px-5 py-2 rounded-[5px] uppercase font-bold">view</button>
                                        <button data-id="${student.id}"  type="button"
                                            class="remove-btn bg-red-500 text-white text-xs px-5 py-2 rounded-[5px] uppercase font-bold">remove</button>
                                    </div>
                                </td>
                            </tr>
        `;
    })
    table_body.innerHTML = student_details;
    table_container.append(table_body);

    const student_row = document.querySelectorAll(".student-row");
    const view_btn = document.querySelectorAll(".view-btn");
    const remove_btn = document.querySelectorAll(".remove-btn");

    student_row.forEach(stud => {
        const stud_id = stud.dataset.id;


        view_btn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const view_id = btn.dataset.id;
                console.log(view_id);
                if (view_id == stud_id) {
                    console.log(view_id);
                    displayStudentDetails(array, view_id);
                }
                student_info.classList.add("smooth-entry");
                student_info.classList.remove("smooth-leave");
                setTimeout(() => {
                    student_info.classList.remove("hide");
                    // main_container.classList.add("blur-background")
                }, 250);
            })
        })

        remove_btn.forEach(btn => {
            btn.addEventListener("click", () => {
                const delete_id = btn.dataset.id;
                if (delete_id == stud_id) {
                    console.log(delete_id);
                    console.log(stud_id);
                }
                displayStudentDetails(array, delete_id);
                caution_container.classList.remove("smooth-exit");
                caution_container.classList.remove("smooth-return");
                caution_container.classList.add("smooth");
                setTimeout(() => {
                    caution_container.classList.remove("hide");
                }, 250);

                final_delete.addEventListener("click", async (e) => {
                    e.preventDefault();
                    deletestudent(delete_id);
                })
            })


        })
    })


}


async function searchForStudent(student) {
    // student_search.addEventListener("")
    student_search.addEventListener("input", async () => {
        let search_check = false;

        // let query = "";


        if (student_search.value.trim() == "") {
            search_check = true;
            await displayStudents(student);
        }
        if (search_check) {
            return;
        }

        try {
            if (!search_check) {
                query = student_search.value.trim().toLowerCase();

                // const { data: student, error: student_error } = await supabaseClient
                //     .from('students')
                //     .select('*')

                // if (student_error) {
                //     console.log(student_error);
                //     return;
                // }

                console.log(student);

                const filtered = student.filter(stud => {
                    console.log(stud);
                    const name = stud.student_name.toLowerCase();
                    console.log(name);
                    return name.startsWith(query) || name.includes(query);
                });

                await display(filtered);



                // for (const result of filtered) {
                //     // const { data, error } = await supabaseClient
                //     //     .from('students')
                //     //     .select()
                //     //     .eq("student_name", result);

                //     // if (error) {
                //     //     console.log(error);
                //     //     return;
                //     // }

                //     console.log(result);

                // }
            }
        }
        catch (err) {
            console.log(err);
        }
    })

}
// searchForStudent();

function displayStudentDetails(allStudent, student_id) {

    allStudents = allStudent;
    console.log(allStudents);
    // allStudent.forEach(data => {


    const data = allStudents.find(s => s.id === student_id);

    console.log(data);

    const stud_names = data.student_name.split(" ");
    const gaurd_names = data.guardian_name.split(" ");


    caution_student_name.innerHTML = stud_names[0].charAt(0).toUpperCase() + stud_names[0].slice(1).toLowerCase() + " " + stud_names[1].charAt(0).toUpperCase() + stud_names[1].slice(1).toLowerCase()
    caution_student_id.innerHTML = data.student_id;

    stud_firstname.innerHTML = stud_names[0].charAt(0).toUpperCase() + stud_names[0].slice(1).toLowerCase();
    stud_lastname.innerHTML = stud_names[1].charAt(0).toUpperCase() + stud_names[1].slice(1).toLowerCase();
    stud_id.innerHTML = data.student_id;
    stud_phone.innerHTML = data.student_phone;
    stud_gender.innerHTML = data.gender.charAt(0).toUpperCase();
    stud_email.innerHTML = data.student_email;
    stud_address.innerHTML = data.student_address;
    // stud_image.src = data
    // guard//
    guard_fistname.innerHTML = gaurd_names[0].charAt(0).toUpperCase() + gaurd_names[0].slice(1).toLowerCase();
    guard_lastname.innerHTML = gaurd_names[1].charAt(0).toUpperCase() + gaurd_names[1].slice(1).toLowerCase();
    guard_phone.innerHTML = data.student_phone;
    stud_email.innerHTML = data.student_email;
    stud_address.innerHTML = data.student_address;
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

async function deletestudent(student_id) {

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
            .from('students')
            .delete()
            .eq("id", student_id)
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
            "Student Deleted Successfully",
            "success"
        );
        await displayStudents();
    }
    catch (err) {
        final_delete.disabled = false;
        create_hostel_function(
            err.message || "Delete failed",
            "error"
        );
    }

}


