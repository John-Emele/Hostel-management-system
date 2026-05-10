
let currentuser = null;

let allStudents = [];
let students = [];
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

    if (role.role == "supervisor") {
        const { data, error } = await supabaseClient
            .from('booked_students')
            .select()
            .eq("supervisor_id", role.id)
        //   .maybeSingle()
        console.log(data);

        if (error) {
            console.log(error)
            return;
        }

        const { data: stud, error: stud_error } = await supabaseClient
            .from('students')
            .select('*')
        //   .maybeSingle()

        // Students = data;
        console.log(stud);

        if (stud_error) {
            console.log(stud_error)
            return;
        }
        else {
            allStudents = stud;
            Students = data;
            display(allStudents, Students);
            searchForStudent(allStudents, Students);
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
// const view_btn = document.getElementById("view-btn");
const cancel_btn = document.getElementById("cancel-btn");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
const table_body = document.getElementById("table-body");
const table_container = document.getElementById("table-container");
const student_search = document.getElementById("search-student");
const stud_firstname = document.getElementById("student-firstname");
const stud_lastname = document.getElementById("student-lastname");
const stud_email = document.getElementById("student-email");
const stud_phone = document.getElementById("student-phone");
const stud_gender = document.getElementById("student-gender");
const stud_id = document.getElementById("student-id");
const stud_address = document.getElementById("student-address");
const stud_image = document.getElementById("student-image");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const guard_firstname = document.getElementById("guardian-firstname");
const guard_lastname = document.getElementById("guardian-lastname");
const guard_email = document.getElementById("guardian-email");
const guard_phone = document.getElementById("guardian-phone");
const guard_address = document.getElementById("guardian-address");

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

// view_btn.addEventListener("click", () => {
//     student_info.classList.remove("hide");
//     main_container.classList.add("fade");
// })

cancel_btn.addEventListener("click", () => {
    student_info.classList.add("hide");
    main_container.classList.remove("fade");
})


async function searchForStudent(student, stud) {
    // student_search.addEventListener("")
    student_search.addEventListener("input", async () => {
        let search_check = false;

        // let query = "";
        if (!Array.isArray(stud)) {
            stud = [stud];
        }


        if (student_search.value.trim() == "") {
            search_check = true;
            await display(student, stud);
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

                const filtered = student.filter(s => {
                    console.log(s);
                    const name = s.student_name.toLowerCase();
                    console.log(name);
                    return name.startsWith(query) || name.includes(query);
                });
                await display(filtered, stud);
            }
        }
        catch (err) {
            console.log(err);
        }
    })

}
// searchForStudent();

function display(array, stud) {
    console.log(stud);
    // 👉 normalize input
    console.log(array);
    if (!Array.isArray(array)) {
        array = [array];
    }

    if (!Array.isArray(stud)) {
        stud = [stud];
    }

    let student_details = "";
    array.forEach(arr => {
        stud.forEach((student, index) => {
            if (arr.id === student.id) {
                console.log(student);
                // let booked = array.find(s => s.id === student.id);
                // console.log(booked);
                // let final =  ["booked.hostel_name", "booked_room_number"];
                // if(booked = null || []){
                //     final = ["Not registered", "not registered"];
                // }
                student_details += `
         <tr data-id="${student.id}" class="student-row border-b-1 border-b-solid border-b-blue-800 text-blue-800 text-center">
                                <td class="py-1 font-medium">${index + 1}</td>
                                <td class="py-1 text-blue-600 font-bold">${arr.student_id}</td>
                                <td class="py-1 font-medium">${arr.student_name}</td>
                                <td class="py-1 font-medium">${student.hostel_name}</td>
                              <td class="py-1 font-medium">${student.room_number}</td>
                              <td class="py-2">
                                    <div  class="flex  items-center gap-3 lg:w-[50%] w-[80%] mx-auto ">
                                        <button type="button" data-id="${student.id}"
                                            class="view-btn md:text-xs text-[12px] bg-blue-500 text-white lg:px-5 px-3 py-2 rounded-[5px] uppercase font-bold">view</button>
                                    </div>
                                </td>
                            </tr>
        `;
            }
            else {
                table_body.innerHTML = `<tr><td colspan="5">No results found</td></tr>`;
                return;
            }

        })
        table_body.innerHTML = student_details;
        // table_container.append(table_body);

        const student_row = document.querySelectorAll(".student-row");
        const view_btn = document.querySelectorAll(".view-btn");
        // const remove_btn = document.querySelectorAll(".remove-btn");

        view_btn.forEach(btn => {
            btn.addEventListener("click", (e) => {
                e.preventDefault();
                const view_id = btn.dataset.id;
                displayStudentDetails(array, view_id);
                student_info.classList.add("smooth-entry");
                student_info.classList.remove("smooth-leave");
                setTimeout(() => {
                    student_info.classList.remove("hide");
                    // main_container.classList.add("blur-background")
                }, 250);
            })
        })

    })

    // else {

    // }


    //  remove_btn.forEach(btn => {
    //         btn.addEventListener("click", () => {
    //             const delete_id = btn.dataset.id;
    //                 console.log(delete_id);
    //             displayStudentDetails(array, delete_id);
    //             caution_container.classList.remove("smooth-exit");
    //             caution_container.classList.remove("smooth-return");
    //             caution_container.classList.add("smooth");
    //             setTimeout(() => {
    //                 caution_container.classList.remove("hide");
    //             }, 250);

    //             final_delete.addEventListener("click", async (e) => {
    //                 e.preventDefault();
    //                 deletestudent(delete_id);
    //             })
    //         })
    //     })


}

function displayStudentDetails(allStudent, student_id) {

    allStudents = allStudent;
    console.log(allStudents);
    // allStudent.forEach(data => {


    const data = allStudents.find(s => s.id === student_id);

    console.log(data);

    const stud_names = data.student_name.split(" ");
    const gaurd_names = data.guardian_name.split(" ");




    stud_firstname.innerHTML = stud_names[0].charAt(0).toUpperCase() + stud_names[0].slice(1).toLowerCase();
    stud_lastname.innerHTML = stud_names[1].charAt(0).toUpperCase() + stud_names[1].slice(1).toLowerCase();
    stud_id.innerHTML = data.student_id;
    stud_phone.innerHTML = data.student_phone;
    stud_gender.innerHTML = data.gender.charAt(0).toUpperCase();
    stud_email.innerHTML = data.student_email;
    stud_address.innerHTML = data.student_address;
    stud_image.src = data.image_url;
    // stud_image.src = data
    // guard//
    
    guard_firstname.innerHTML = gaurd_names[0].charAt(0).toUpperCase() + gaurd_names[0].slice(1).toLowerCase();
    guard_lastname.innerHTML = gaurd_names[1].charAt(0).toUpperCase() + gaurd_names[1].slice(1).toLowerCase();
    guard_phone.innerHTML = data.guardian_phone;
    guard_email.innerHTML = data.guardian_email;
    guard_address.innerHTML = data.guardian_address;
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
        // main_container.classList.remove("blur-background");
        // caution_container.classList.remove("smooth");
        // caution_container.classList.remove("smooth-return");
        // caution_container.classList.add("smooth-exit");


        setTimeout(() => {
            // caution_container.classList.add("hide");
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


    // final_delete.innerHTML = "Delete";
}