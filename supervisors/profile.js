let currentuser = null;

const account_info = document.getElementById("account-info");
const info_form = document.getElementById("info-form");
const supervisor_submit_btn = document.getElementById("supervisor-submit-btn");
const sup_edit_btn = document.getElementById("sup-edit-btn");
const sup_update_btn = document.getElementById("sup-update-btn");
const edit_form = document.getElementById("edit-form");



async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);
    console.log(currentuser.id);

    if (!currentuser) return;

    const { data, error } = await supabaseClient
        .from('supervisor')
        .select()
        .eq("id", currentuser.id)
        .maybeSingle()

    console.log(data);
    if (error) {
        console.log(error)
        return;
    }

    if (data == null || "") {
        account_info.classList.add("hide");
        info_form.classList.remove("hide");
    }
    else {
        account_info.classList.remove("hide");
        info_form.classList.add("hide");
        displaysdetails(data);
        sup_update_btn.addEventListener("click", async (e) => {
            e.preventDefault();
            await editsupervisor(currentuser.id);
        })
    }

}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();


const supervisor_firstname = document.getElementById("supervisor-firstname");
const supervisor_lastname = document.getElementById("supervisor-lastname");
const supervisor_email = document.getElementById("supervisor-email");
const supervisor_gender = document.getElementById("supervisor-gender");
const supervisor_phone = document.getElementById("supervisor-phone");


// error//
const supervisor_firstname_error = document.getElementById("supervisor-firstname-error");
const supervisor_lastname_error = document.getElementById("supervisor-lastname-error");
const supervisor_email_error = document.getElementById("supervisor-email-error");
const supervisor_gender_error = document.getElementById("supervisor-gender-error");
const supervisor_phone_error = document.getElementById("supervisor-phone-error");
const supervisor_update_btn = document.getElementById("sup-update-btn");
// edit//
const sup_firstname = document.getElementById("sup-firstname");
const sup_lastname = document.getElementById("sup-lastname");
const sup_email = document.getElementById("sup-email");
const sup_gender = document.getElementById("sup-gender");
const sup_phone = document.getElementById("sup-phone");
const sup_id = document.getElementById("sup-id");
// error//
const sup_firstname_error = document.getElementById("sup-firstname-error");
const sup_lastname_error = document.getElementById("sup-lastname-error");
const sup_email_error = document.getElementById("sup-email-error");
const sup_gender_error = document.getElementById("sup-gender-error");
const sup_phone_error = document.getElementById("sup-phone-error");

const sup_update_firstname = document.getElementById("sup-update-firstname");
const sup_update_lastname = document.getElementById("sup-update-lastname");
const sup_update_email = document.getElementById("sup-update-email");
const sup_update_gender = document.getElementById("sup-update-gender");
const sup_update_phone = document.getElementById("sup-update-phone");


const sup_update_firstname_error = document.getElementById("sup-update-firstname-error");
const sup_update_lastname_error = document.getElementById("sup-update-lastname-error");
const sup_update_email_error = document.getElementById("sup-update-email-error");
const sup_update_gender_error = document.getElementById("sup-update-gender-error");
const sup_update_phone_error = document.getElementById("sup-update-phone-error");


const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");

const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");


const sup_cancel_btn = document.getElementById("sup-update-btn");

sup_cancel_btn.addEventListener("click", () => {
    edit_form.classList.add("hide");
    account_info.classList.remove("hide");
})

sup_edit_btn.addEventListener("click", async () => {
    account_info.classList.add("hide");
    edit_form.classList.remove("hide")
})

function displaysdetails(supervisor) {
    console.log(supervisor);

    let names = supervisor.name.split(" ");

    sup_firstname.innerHTML = names[0];
    sup_lastname.innerHTML = names[1];
    sup_email.innerHTML = supervisor.email;
    sup_gender.innerHTML = supervisor.gender.charAt(0).toUpperCase();
    sup_phone.innerHTML = supervisor.phone;
    sup_id.innerHTML = supervisor.supervisor_id;

    sup_update_firstname.value = names[0];
    sup_update_lastname.value = names[1];
    sup_update_email.value = supervisor.email;
    sup_update_gender.value = supervisor.gender;
    sup_update_phone.value = supervisor.phone;
}

async function createsupervisor() {

    const { data: { session } } = await supabaseClient.auth.getSession();
    let currentstudent = session?.user || null;
    console.log(currentstudent);

    let form_check = false;

    if (supervisor_firstname.value.trim() == "") {
        form_check = true;
        supervisor_firstname_error.innerHTML = "Field must not empty";
    }
    else {
        supervisor_firstname_error.innerHTML = "";
    }
    if (supervisor_lastname.value.trim() == "") {
        form_check = true;
        supervisor_lastname_error.innerHTML = "Field must not empty";
    }
    else {
        supervisor_lastname_error.innerHTML = "";
    }
    if (supervisor_email.value.trim() == "") {
        form_check = true;
        supervisor_email_error.innerHTML = "Field must not empty";
    }
    else {
        supervisor_email_error.innerHTML = "";
    }
    if (supervisor_gender.value.trim() == "") {
        form_check = true;
        supervisor_gender_error.innerHTML = "Field must not empty";
    }
    else {
        supervisor_gender_error.innerHTML = "";
    }
    if (supervisor_phone.value.trim() == "") {
        form_check = true;
        supervisor_phone_error.innerHTML = "Field must not empty";
    }
    else {
        supervisor_phone_error.innerHTML = "";
    }

    if (form_check) {
        return;
    }
    try {

        if (!form_check) {
            let add_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Submiting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

            supervisor_submit_btn.disabled = true;
            supervisor_submit_btn.innerHTML = add_emote;
            console.log(currentstudent.id);

            const f_name = supervisor_firstname.value.trim().charAt(0).toUpperCase() + supervisor_firstname.value.trim().slice(1).toLowerCase();
            const l_name = supervisor_lastname.value.trim().charAt(0).toUpperCase() + supervisor_lastname.value.trim().slice(1).toLowerCase();
            const s_id = "SPVSR" + "-" + supervisor_firstname.value.trim().charAt(0).toUpperCase() + supervisor_lastname.value.trim().charAt(0).toUpperCase();

            const { data, error } = await supabaseClient
                .from('supervisor')
                .insert([{
                    id: currentstudent.id,
                    name: f_name + " " + l_name,
                    supervisor_id: s_id,
                    gender: supervisor_gender.value.trim(),
                    email: supervisor_email.value.trim(),
                    phone: supervisor_phone.value.trim(),
                }])
            // .select()

            if (error) {
                console.log(error);
                supervisor_submit_btn.disabled = false;
                create_hostel_function(
                    error.message || "Something went wrong",
                    "error"
                );
                return;
            }

            console.log(data);
            supervisor_submit_btn.disabled = false;
            create_hostel_function(
                "Submitted ✅",
                "success"
            );



        }
    }
    catch (err) {
        console.log(err);
        supervisor_submit_btn.disabled = false;
        create_hostel_function(
            error.message || "Something went wrong",
            "error"
        );
        return;
    }
}
supervisor_submit_btn.addEventListener("click", async (e) => {
    console.log("hello");
    e.preventDefault();
    await createsupervisor();
})

async function editsupervisor(sup_id) {
    let form_check = false;

    if (sup_update_firstname.value.trim() == "") {
        form_check = true;
        sup_update_firstname_error.innerHTML = "Field must not empty";
    }
    else {
        sup_update_firstname_error.innerHTML = "";
    }
    if (sup_update_lastname.value.trim() == "") {
        form_check = true;
        sup_update_lastname_error.innerHTML = "Field must not empty";
    }
    else {
        sup_update_lastname_error.innerHTML = "";
    }
    if (sup_update_email.value.trim() == "") {
        form_check = true
        sup_update_email_error.innerHTML = "Field must not empty";
    }
    else {
        sup_update_email_error.innerHTML = "";
    }
    if (sup_update_gender.value.trim() == "") {
        form_check = true;
        sup_update_gender_error.innerHTML = "Field must not empty";
    }
    else {
        sup_update_gender_error.innerHTML = "";
    }
    if (sup_update_phone.value.trim() == "") {
        form_check = true;
        sup_update_phone_error.innerHTML = "Field must not empty";
    }
    else {
        sup_update_phone_error.innerHTML = "";
    }

    if (form_check) {
        return;
    }

    try {
        if (!form_check) {

            let add_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Updating...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

            supervisor_update_btn.disabled = true;
            supervisor_update_btn.innerHTML = add_emote;
            
            const f_name = sup_update_firstname.value.trim().charAt(0).toUpperCase() + sup_update_firstname.value.trim().slice(1).toLowerCase();
            const l_name = sup_update_lastname.value.trim().charAt(0).toUpperCase() + sup_update_lastname.value.trim().slice(1).toLowerCase();


            const update = {
                name: f_name + " " + l_name,
                gender: sup_update_gender.value.trim().charAt(0).toUpperCase() + sup_update_gender.value.trim().slice(1).toLowerCase(),
                email: sup_update_email.value.trim(),
                phone: sup_update_phone.value.trim(),
            };
            console.log(update);


            // const f_name = supervisor_firstname.value.trim().charAt(0).toUpperCase() + supervisor_firstname.value.trim().slice(1).toLowerCase();
            // const l_name = supervisor_lastname.value.trim().charAt(0).toUpperCase() + supervisor_lastname.value.trim().slice(1).toLowerCase();
            // const s_id = "SPVSR" + "-" + supervisor_firstname.value.trim().charAt(0).toUpperCase() + supervisor_lastname.value.trim().charAt(0).toUpperCase();

            const { data, error } = await supabaseClient
                .from('supervisor')
                .update(update)
                .eq("id", sup_id)
                .select()

            if (error) {
                sup_update_btn.disabled = false;
                create_hostel_function(
                    error.message || "Something went wrong",
                    "error"
                );
                return;
            }

            console.log(data);
            supervisor_update_btn.disabled = false;
            create_hostel_function(
                "Submitted ✅",
                "success"
            );

            const { data: sup, error: sup_error } = await supabaseClient
                .from('supervisor')
                .select()
                .eq("id", sup_id)
                .single()


            if (sup_error) {
                console.log(sup_error);
            }

            displaysdetails(sup);
        }
    }
    catch (err) {
        console.log(err);
        supervisor_update_btn.disabled = false;
        create_hostel_function(
            err.message || "Something went wrong",
            "error"
        );
        return;
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
        info_form.classList.add("hide");
        edit_form.classList.add("hide");
        account_info.classList.remove("hide");


        setTimeout(() => {

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

    // ✅ ONLY reset form on success
    if (type === "success") {

    }

    supervisor_submit_btn.innerHTML = "Submit";
    sup_update_btn.innerHTML = "Update"
}