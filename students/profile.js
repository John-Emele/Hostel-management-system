let currentuser = null;


const account_info = document.getElementById("account-info");
const info_form = document.getElementById("info-form");
const form_header = document.getElementById("form-header");



async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);

    if (!currentuser) return;

    const { data, error } = await supabaseClient
        .from('booked_students')
        .select()
        .eq("id", currentuser.id)

    console.log(data);
    if (error) {
        console.log(error)
        return;
    }

    if (data == null) {
        return;
    }
    else {
        displaydetails(data);
    }

}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();

const profile_picture = document.getElementById("profile-picture");
const add_picture = document.getElementById("add-image");
const plus_image = document.getElementById("plus-image");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
// const action_btn = document.getElementById("action-btn");
const action_list = document.getElementById("action-list");
const table_container = document.getElementById("table-container");
const table_body = document.getElementById("table-body");
const student_name = document.getElementById("student-name");
const student_id = document.getElementById("student-id");

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

// action_btn.addEventListener("click", () => {
//     if (action_list.classList.contains("hide")) {
//         action_list.classList.remove("hide");
//     }
//     else {
//         action_list.classList.add("hide");
//     }
// });

plus_image.addEventListener("click", () => {
    add_picture.click()
});

add_picture.addEventListener("change", async () => {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;

    const file = add_picture.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const image = URL.createObjectURL(file);
    const image_url = await uploadImage(file);
    console.log(image, image_url);
    profile_picture.src = image;

    const update = {
        image_url: image_url
    }

    const { error } = await supabaseClient
        .from('students')
        .update(update)
        .eq("id", currentuser.id)
        .select()

        if(error){
            console.log(error);
            return;
        }

});

async function displaydetails(student) {
    console.log(student);
    const { data, error } = await supabaseClient
        .from('students')
        .select()
        .eq("id", student[0].id)
        .single()

    if (error) {
        return;
    }

    student_name.innerHTML = data.student_name;
    student_id.innerHTML = data.student_id;

    let details = "";

    const date = new Date();
    let month = date.getMonth();
    console.log(month);

    if (month > 3 || month < 8) {
        semester = "2nd";
    }
    else {
        semester = "1st"
    }

    student.forEach(stud => {
        details += `
        <tr class="border-b-blue-800 border-b border-b-1 h-8">
                        <td class=" text-xs text-blue-800 font-medium">${stud.session}</td>
                        <td class=" text-xs  text-blue-800 font-bold">${semester}</td>
                        <td class=" text-xs  text-blue-800 font-bold">${stud.student_level}</td>
                        <td class=" text-xs  text-blue-800 font-bold">${stud.hostel_name}</td>
                        <td class="font-bold  text-green-600 uppercase text-[10px]">${stud.status}</td>
                        <td class="relative">
                            <img data-id="${stud.id}" src="../images/menu (1).png" alt="" class="action-btn w-6 h-6 py-1 px-1 hover:rounded-full hover:bg-blue-300">
                             <div id="action-list" class="hide bg-white z-100 action-drop  shadow-xl absolute ">
                                    <p data-id="${stud.id}" class="text-[10px] text-blue-600 border-t-blue-600 border-t border-t-1 px-2 hover:bg-blue-600 hover:text-white hover:font-bold">View</p>
                                    <p data-id="${stud.id}" class="text-[10px] text-blue-600 border-t-blue-600 border-t border-t-1 px-2 hover:bg-blue-600 hover:text-white hover:font-bold">Manage</p>
                                    <p data-id="${stud.id}" class="text-[10px] text-blue-600 border-t-blue-600 border-t border-t-1 px-2 hover:bg-blue-600 hover:text-white hover:font-bold">Roll over</p>
                                </div>                               
                        </td>
                    </tr>
        `;
    })
    table_body.innerHTML = details;

}


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