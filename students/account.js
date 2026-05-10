let currentuser = null;

const account_info = document.getElementById("account-info");
const info_form = document.getElementById("info-form");
const form_header = document.getElementById("form-header");
const user_toggle = document.getElementById("user-toggle");



async function initUser() {
   const { data: { session } } = await supabaseClient.auth.getSession();
   currentuser = session?.user || null;
   console.log(currentuser);

   if (!currentuser) return;

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
      account_info.classList.add("hide");
      info_form.classList.remove("hide");
      form_header.classList.remove("hide")
   }
   else {
      account_info.classList.remove("hide");
      info_form.classList.add("hide");
      form_header.classList.add("hide")
      Displayinfo(currentuser.id);
      editstudent(currentuser.id);
      editguardian(currentuser.id);
      edit_stud_submit_btn.addEventListener("click", async (e) => {
         e.preventDefault();
         await updateStudent(currentuser.id);
      })
      edit_guard_submit_btn.addEventListener("click", async (e) => {
         e.preventDefault();
         await updateGuardian(currentuser.id);
      })
   }
}

// console.log(currentuser);
async function initapp() {
   await initUser();
}
initapp();

const edit_cancel = document.getElementById("edit-cancel");
const edit_student = document.getElementById("edit-container");
const edit_cancel_guardian = document.getElementById("edit-cancel-guardian");
const edit_guardian = document.getElementById("edit-container-guardian");
const main_container = document.getElementById("main-container");
const guardian_edit_btn = document.getElementById("guardian-edit-btn");
const student_edit_btn = document.getElementById("student-edit-btn");
// student_info//
const studentinfo_container = document.getElementById("studentinfo-container");
const edit_stud_container = document.getElementById("edit-stud-container");
const student_firstname = document.getElementById("student-firstname");
const student_lastname = document.getElementById("student-lastname");
const student_email = document.getElementById("student-email");
const student_phone = document.getElementById("student-phone");
const student_id = document.getElementById("student-id");
const student_gender = document.getElementById("student-gender");
const student_address = document.getElementById("student-address");
// student_form//
const stud_firstname = document.getElementById("stud-firstname");
const stud_lastname = document.getElementById("stud-lastname");
const stud_email = document.getElementById("stud-email");
const stud_phone = document.getElementById("stud-phone");
const stud_gender = document.getElementById("stud-gender");
const stud_address = document.getElementById("stud-address");
const stud_btn = document.getElementById("stud-submit-btn")
//guardian_info//
const guardianinfo_container = document.getElementById("guardianinfo-container");
const edit_guard_container = document.getElementById("edit-guard-container");
const guardian_fistname = document.getElementById("guardian-firstname");
const guardian_lastname = document.getElementById("guardian-lastname");
const guardian_email = document.getElementById("guardian-email");
const guardian_phone = document.getElementById("guardian-phone");
const guardian_address = document.getElementById("guardian-address");
// guardian_form//
const guard_fistname = document.getElementById("guard-firstname");
const guard_lastname = document.getElementById("guard-lastname");
const guard_email = document.getElementById("guard-email");
const guard_phone = document.getElementById("guard-phone");
const guard_address = document.getElementById("guard-address");

// error//
// stud_error//
const stud_firstname_error = document.getElementById("stud-firstname-error");
const stud_lastname_error = document.getElementById("stud-lastname-error");
const stud_email_error = document.getElementById("stud-email-error");
const stud_gender_error = document.getElementById("stud-gender-error");
const stud_phone_error = document.getElementById("stud-phone-error");
const stud_address_error = document.getElementById("stud-address-error");
// guard_error
const guard_firstname_error = document.getElementById("guard-firstname-error");
const guard_lastname_error = document.getElementById("guard-lastname-error");
const guard_email_error = document.getElementById("guard-email-error");
const guard_phone_error = document.getElementById("guard-phone-error");
const guard_address_error = document.getElementById("guard-address-error");
// edit stud///
const edit_stud_firstname = document.getElementById("edit_stud-firstname");
const edit_stud_lastname = document.getElementById("edit_stud-lastname");
const edit_stud_email = document.getElementById("edit_stud-email");
const edit_stud_gender = document.getElementById("edit_stud-gender");
const edit_stud_phone = document.getElementById("edit_stud-phone");
const edit_stud_address = document.getElementById("edit_stud-address");
const edit_stud_submit_btn = document.getElementById("edit_stud-submit-btn");
// edit stud errors//
const edit_stud_firstname_error = document.getElementById("edit_stud-firstname-error");
const edit_stud_lastname_error = document.getElementById("edit_stud-lastname-error");
const edit_stud_email_error = document.getElementById("edit_stud-email-error");
const edit_stud_gender_error = document.getElementById("edit_stud-gender-error");
const edit_stud_phone_error = document.getElementById("edit_stud-phone-error");
const edit_stud_address_error = document.getElementById("edit_stud-address-error");
// edit guard///
const edit_guard_firstname = document.getElementById("edit_guard-firstname");
const edit_guard_lastname = document.getElementById("edit_guard-lastname");
const edit_guard_email = document.getElementById("edit_guard-email");
const edit_guard_phone = document.getElementById("edit_guard-phone");
const edit_guard_address = document.getElementById("edit_guard-address");
const edit_guard_submit_btn = document.getElementById("edit_guard-submit-btn");
// edit guard errors//
const edit_guard_firstname_error = document.getElementById("edit_guard-firstname-error");
const edit_guard_lastname_error = document.getElementById("edit_guard-lastname-error");
const edit_guard_email_error = document.getElementById("edit_guard-email-error");
const edit_guard_phone_error = document.getElementById("edit_guard-phone-error");
const edit_guard_address_error = document.getElementById("edit_guard-address-error");
////toggle//
const student_toggle = document.getElementById("student-toggle");
const guardian_toggle = document.getElementById("guardian-toggle");
const student_information = document.getElementById("student-information");
const guardian_information = document.getElementById("guardian-information");
const toggle_background = document.getElementById("toggle-background");
///side-menu///
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");

const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");


student_toggle.addEventListener("click", () => {
   student_toggle.classList.remove("hover:bg-blue-600", "hover:text-white")
   toggle_background.classList.remove("toggle");
   toggle_background.classList.remove("toggle_1");
   toggle_background.classList.add("toggle_2");
   student_information.classList.remove("hidden");
   // guardian_toggle.classList.remove("text-white font-bold bg-blue-700 rounded-[5px]")
   setTimeout(() => {
      student_toggle.className = "p-1 text-sm text-white font-bold z-10";
      guardian_toggle.className = "p-1 text-sm text-blue-600 z-1 font-bold hover:bg-blue-600 hover:rounded-[5px] hover:text-white";
   }, 550)
   guardian_information.classList.add("hidden");
})

guardian_toggle.addEventListener("click", () => {
   guardian_toggle.classList.remove("hover:bg-blue-600", "hover:text-white")
   toggle_background.classList.remove("toggle");
   toggle_background.classList.remove("toggle_2");
   toggle_background.classList.add("toggle_1");
   guardian_information.classList.remove("hidden");
   setTimeout(() => {
      guardian_toggle.className = "p-1 text-sm text-white font-bold z-10";
      student_toggle.className = "p-1 text-sm text-blue-600 z-1 font-bold hover:bg-blue-600 hover:rounded-[5px] hover:text-white";
   }, 550)
   student_information.classList.add("hidden");
})

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

async function Studentform() {

   const { data: { session } } = await supabaseClient.auth.getSession();
   currentstudent = session?.user || null;
   console.log(currentuser);

   let form_check = false;

   console.log(currentstudent.id);
   // student//
   if (stud_firstname.value.trim() == "") {
      form_check = true;
      stud_firstname_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_firstname_error.innerHTML = "";
   }

   if (stud_lastname.value.trim() == "") {
      form_check = true;
      stud_lastname_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_lastname_error.innerHTML = "";
   }
   if (stud_gender.value.trim() == "") {
      form_check = true;
      stud_gender_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_gender_error.innerHTML = "";
   }

   if (stud_email.value.trim() == "") {
      form_check = true;
      stud_email_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_email_error.innerHTML = "";
   }

   if (stud_phone.value.trim() == "") {
      form_check = true;
      stud_phone_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_phone_error.innerHTML = "";
   }

   if (stud_address.value.trim() == "") {
      form_check = true;
      stud_address_error.innerHTML = "Field must not be empty"
   }
   else {
      stud_address_error.innerHTML = "";
   }
   // guaardian//
   if (guard_fistname.value.trim() == "") {
      form_check = true;
      guard_firstname_error.innerHTML = "Field must not be empty"
   }
   else {
      guard_firstname_error.innerHTML = "";
   }

   if (guard_lastname.value.trim() == "") {
      form_check = true;
      guard_lastname_error.innerHTML = "Field must not be empty"
   }
   else {
      guard_lastname_error.innerHTML = "";
   }

   if (guard_email.value.trim() == "") {
      form_check = true;
      guard_email_error.innerHTML = "Field must not be empty"
   }
   else {
      guard_email_error.innerHTML = "";
   }

   if (guard_phone.value.trim() == "") {
      form_check = true;
      guard_phone_error.innerHTML = "Field must not be empty"
   }
   else {
      guard_phone_error.innerHTML = "";
   }

   if (guard_address.value.trim() == "") {
      form_check = true;
      guard_address_error.innerHTML = "Field must not be empty"
   }
   else {
      guard_address_error.innerHTML = "";
   }


   try {
      if (form_check) {
         return;
      }

      if (!form_check) {
         console.log({
            id: currentstudent.id,
            gender: stud_gender.value,
            firstname: stud_firstname.value.trim(),
            lastname: stud_lastname.value.trim(),
            email: stud_email.value.trim(),
            phone: stud_phone.value.trim(),
            address: stud_address.value.trim(),
            guardfirstname: guard_fistname.value.trim(),
            guardlastname: guard_lastname.value.trim(),
            guardemail: guard_email.value.trim(),
            guardphone: guard_phone.value.trim(),
            guard_address: guard_address.value.trim(),
         })

         let delete_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Submiting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
         stud_btn.disabled = true;
         stud_btn.innerHTML = delete_emote;
         const { data: user_info, error: info_error } = await supabaseClient
            .from("students")
            .insert([{
               id: currentuser.id,
               // room_type: "NaN",
               // bed_space: "NaN",
               // room_id: "NaN",
               // supervisor_name: "NaN",
               // supervisor_id: "",
               gender: stud_gender.value.trim().charAt(0).toUpperCase() + stud_gender.value.trim().slice(1).toLowerCase(),
               student_name: stud_firstname.value.trim().charAt(0).toUpperCase() + stud_firstname.value.trim().slice(1).toLowerCase() + " " + stud_lastname.value.trim().charAt(0).toUpperCase() + stud_lastname.value.trim().slice(1).toLowerCase(),
               student_email: stud_email.value.trim(),
               student_phone: stud_phone.value.trim(),
               student_id: "STDNT" + "-" + stud_firstname.value.trim().charAt(0).toUpperCase() + stud_lastname.value.trim().charAt(0).toUpperCase(),
               student_address: stud_address.value.trim(),
               guardian_name: guard_fistname.value.trim() + " " + guard_lastname.value.trim(),
               guardian_email: guard_email.value.trim(),
               guardian_phone: guard_phone.value.trim(),
               guardian_address: guard_address.value.trim(),
            }])

         if (info_error) {
            console.log(info_error);
            stud_btn.disabled = false;
            create_hostel_function(
               info_error.message || "submit failed",
               "error"
            );
            return;

         }

         stud_btn.disabled = false;
         create_hostel_function(
            "submited successfully",
            "success"
         );
         Displayinfo(currentuser.id);
      }
   }
   catch (err) {
      stud_btn.disabled = false;
      stud_btn.innerHTML = "Submit"
      console.log(err);
      create_hostel_function(
         err.message || "submit failed",
         "error"
      );
      return;
   }
}
stud_btn.addEventListener("click", async (e) => {
   e.preventDefault()
   await Studentform();
})

async function Displayinfo(info_id) {
   const { data, error } = await supabaseClient
      .from('students')
      .select()
      .eq("id", info_id)
      .single()

   if (error) {
      console.log(error);
   }

   console.log(data);
   const student_name = data.student_name.split(" ");
   console.log(student_name);

   const guardian_name = data.guardian_name.split(" ");
   console.log(guardian_name);

   student_firstname.innerHTML = student_name[0];
   student_lastname.innerHTML = student_name[1];
   student_email.innerHTML = data.student_email;
   student_phone.innerHTML = data.student_phone;
   student_address.innerHTML = data.student_address;
   student_gender.innerHTML = data.gender;
   student_id.innerHTML = data.student_id;
   guardian_fistname.innerHTML = guardian_name[0];
   guardian_lastname.innerHTML = guardian_name[1];
   guardian_email.innerHTML = data.guardian_email;
   guardian_phone.innerHTML = data.guardian_phone;
   guardian_address.innerHTML = data.guardian_address;
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


      // info_form.classList.remove("hide");
      // form_header.classList.remove("hide");
      user_toggle.classList.remove("hide");
      account_info.classList.remove("hide");
      studentinfo_container.classList.remove("hide");
      edit_stud_container.classList.add("hide");
      guardianinfo_container.classList.remove("hide");
      edit_guard_container.classList.add("hide");
      info_form.classList.add("hide");
      form_header.classList.add("hide");
      // Hide after 5s
      setTimeout(() => {
         success_message.classList.remove("successful");
         success_message.classList.add("successful-2");

         setTimeout(() => {
            success_message.classList.add("hide");
         }, 200);
      }, 5000);

   });

   //  ✅ ONLY reset form on success
   if (type === "success") {
      stud_firstname.value = "";
      stud_lastname.value = "";
      stud_email.value = "";
      stud_phone.value = "";
      stud_id.value = "";
      stud_address.value = "";
      guard_fistname.value = "";
      guard_lastname.value = "";
      guard_email.value = "";
      guard_phone.value = "";
      guard_address.value = "";
   }

   stud_btn.innerHTML = "Submit";
   edit_stud_submit_btn.innerHTML = "Submit";
   edit_guard_submit_btn.innerHTML = "Submit"
}

student_edit_btn.addEventListener("click", () => {
   studentinfo_container.classList.add("hide");
   edit_stud_container.classList.remove("hide");
})

guardian_edit_btn.addEventListener("click", () => {
   guardianinfo_container.classList.add("hide");
   edit_guard_container.classList.remove("hide");
})

// async function editInfo() {
async function editstudent(student_id) {
   const { data, error } = await supabaseClient
      .from('students')
      .select()
      .eq("id", student_id)
      .single()

   if (error) {
      console.log(error)
      return;
   }

   console.log(data);
   const names = data.student_name.split(" ");
   const firstname = names[0].charAt(0).toUpperCase();
   const lastname = names[1].charAt(0).toUpperCase();
   // console.log(firstname);

   edit_stud_firstname.value = firstname + names[0].slice(1).toLowerCase();
   edit_stud_lastname.value = lastname + names[1].slice(1).toLowerCase();
   edit_stud_email.value = data.student_email;
   edit_stud_gender.value = data.gender.charAt(0).toUpperCase() + data.gender.slice(1).toLowerCase();
   edit_stud_phone.value = data.student_phone;
   edit_stud_address.value = data.student_address;
}
async function editguardian(guardian_id) {
   const { data, error } = await supabaseClient
      .from('students')
      .select()
      .eq("id", guardian_id)
      .single()

   if (error) {
      console.log(error)
      return;
   }

   console.log(data);
   const names = data.guardian_name.split(" ");
   const firstname = names[0].charAt(0).toUpperCase();
   const lastname = names[1].charAt(0).toUpperCase();
   // console.log(firstname);

   edit_guard_firstname.value = firstname + names[0].slice(1).toLowerCase();
   edit_guard_lastname.value = lastname + names[1].slice(1).toLowerCase();
   edit_guard_email.value = data.guardian_email;
   edit_guard_phone.value = data.guardian_phone;
   edit_guard_address.value = data.guardian_address;
}


async function updateStudent(student_id) {
   let form_check = false;
   console.log(student_id);

   if (edit_stud_firstname.value.trim() == "") {
      form_check = true;
      edit_stud_firstname_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_firstname_error.innerHTML = "";
   }
   if (edit_stud_lastname.value.trim() == "") {
      form_check = true;
      edit_stud_lastname_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_lastname_error.innerHTML = "";
   }
   if (edit_stud_gender.value.trim() == "") {
      form_check = true;
      edit_stud_gender_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_gender_error.innerHTML = "";
   }
   if (edit_stud_email.value.trim() == "") {
      form_check = true;
      edit_stud_email_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_email_error.innerHTML = "";
   }
   if (edit_stud_phone.value.trim() == "") {
      form_check = true;
      edit_stud_phone_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_phone_error.innerHTML = "";
   }
   if (edit_stud_address.value.trim() == "") {
      form_check = true;
      edit_stud_address_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_stud_address_error.innerHTML = "";
   }

   try {
      if (form_check) {
         return;
      }

      if (form_check == false) {
         const new_detail = {
            gender: edit_stud_gender.value.trim().charAt(0).toUpperCase() + edit_stud_gender.value.trim().slice(1).toLowerCase(),
            student_name: edit_stud_firstname.value.trim().charAt(0).toUpperCase() + edit_stud_firstname.value.trim().slice(1).toLowerCase() + " " + edit_stud_lastname.value.trim().charAt(0).toUpperCase() + edit_stud_lastname.value.trim().slice(1).toLowerCase(),
            student_email: edit_stud_email.value.trim(),
            student_phone: edit_stud_phone.value.trim(),
            student_address: edit_stud_address.value.trim(),
         }

         console.log(new_detail)
         let delete_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Submiting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
         edit_stud_submit_btn.disabled = true;
         edit_stud_submit_btn.innerHTML = delete_emote;

         const { data, error } = await supabaseClient
            .from('students')
            .update(new_detail)
            .eq("id", student_id)
            .single();

         if (error) {
            console.log(error);
            edit_stud_submit_btn.disabled = false;
            create_hostel_function(
               error.message || "update failed",
               "error"
            );
            return;
         }
         edit_stud_submit_btn.disabled = false;
         create_hostel_function(
            "updated successfully",
            "success"
         );
         await Displayinfo(student_id);
      }
   }
   catch (err) {
      edit_stud_submit_btn.disabled = false;
      edit_stud_submit_btn.innerHTML = "Submit"
      console.log(err);
      create_hostel_function(
         err.message || "update failed",
         "error"
      );
      return;
   }
}

async function updateGuardian(guardian_id) {
   let form_check = false;
   console.log(student_id);

   if (edit_guard_firstname.value.trim() == "") {
      form_check = true;
      edit_guard_firstname_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_guard_firstname_error.innerHTML = "";
   }
   if (edit_guard_lastname.value.trim() == "") {
      form_check = true;
      edit_guard_lastname_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_guard_lastname_error.innerHTML = "";
   }
   if (edit_stud_email.value.trim() == "") {
      form_check = true;
      edit_guard_email_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_guard_email_error.innerHTML = "";
   }
   if (edit_guard_phone.value.trim() == "") {
      form_check = true;
      edit_guard_phone_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_guard_phone_error.innerHTML = "";
   }
   if (edit_guard_address.value.trim() == "") {
      form_check = true;
      edit_guard_address_error.innerHTML = "Field must not be empty";
   }
   else {
      edit_guard_address_error.innerHTML = "";
   }

   try {
      if (form_check) {
         return;
      }

      if (form_check == false) {
         const new_detail = {
            guardian_name: edit_guard_firstname.value.trim().charAt(0).toUpperCase() + edit_guard_firstname.value.trim().slice(1).toLowerCase() + " " + edit_guard_lastname.value.trim().charAt(0).toUpperCase() + edit_guard_lastname.value.trim().slice(1).toLowerCase(),
            guardian_email: edit_guard_email.value.trim(),
            guardian_phone: edit_guard_phone.value.trim(),
            guardian_address: edit_guard_address.value.trim(),
         }

         console.log(new_detail)
         let delete_emote = `
      <div class="w-[50%] mx-auto flex justify-between items-center">
        <p class="text-white text-lg">Submiting...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;
         edit_guard_submit_btn.disabled = true;
         edit_guard_submit_btn.innerHTML = delete_emote;

         const { data, error } = await supabaseClient
            .from('students')
            .update(new_detail)
            .eq("id", guardian_id)
            .single();

         if (error) {
            console.log(error);
            edit_guard_submit_btn.disabled = false;
            create_hostel_function(
               error.message || "update failed",
               "error"
            );
            return;
         }
         edit_guard_submit_btn.disabled = false;
         create_hostel_function(
            "updated successfully",
            "success"
         );
         await Displayinfo(guardian_id);
      }
   }
   catch (err) {
      edit_guard_submit_btn.disabled = false;
      edit_guard_submit_btn.innerHTML = "Submit"
      console.log(err);
      create_hostel_function(
         err.message || "update failed",
         "error"
      );
      return;
   }
}