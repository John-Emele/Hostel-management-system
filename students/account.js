let currentuser = null;

async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);
}

console.log(currentuser);
async function initapp(){
   await initUser();
   await update_form();
}
initapp();

const edit_cancel = document.getElementById("edit-cancel");
const edit = document.getElementById("edit-container");
const edit_cancel_guardian = document.getElementById("edit-cancel-guardian");
const edit_guardian = document.getElementById("edit-container-guardian");
const main_container = document.getElementById("main-container");
const guardian_edit_btn= document.getElementById("guardian-edit-btn");
const student_edit_btn = document.getElementById("student-edit-btn");
// student_info//
const student_firstname = document.getAnimations("student-firstname");
const student_lastname = document.getElementById("student-lastname");
const student_email = document.getElementById("student-email");
const student_phone = document.getElementById("student-phone");
const student_id = document.getElementById("student-id");
const student_address = document.getElementById("student-address");
// student_form//
const stud_firstname = document.getAnimations("stud-firstname");
const stud_lastname = document.getElementById("stud-lastname");
const stud_email = document.getElementById("stud-email");
const stud_phone = document.getElementById("stud-phone");
const stud_id = document.getElementById("stud-id");
const stud_address = document.getElementById("stud-address");
const stud_btn = document.getElementById("stud-submit-btn")
//guardian_info//
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
const guard_btn = document.getElementById("guard-submit-btn");
// error//
// stud_error//
const stud_firstname_error = document.getElementById("stud-firstname-error");
const stud_lastname_error = document.getElementById("stud-lastname-error");
const stud_email_error = document.getElementById("stud-email-error");
const stud_phone_error = document.getElementById("stud-phone-error");
const stud_address_error = document.getElementById("stud-address-error");
// guard_error
const guard_firstname_error = document.getElementById("guard-firstname-error");
const guard_lastname_error = document.getElementById("guard-lastname-error");
const guard_email_error = document.getElementById("guard-email-error");
const guard_phone_error = document.getElementById("guard-phone-error");
const guard_address_error = document.getElementById("guard-address-error");



function display(){
   student_edit_btn.addEventListener("click", ()=> {
    edit.classList.remove("hide")
    main_container.classList.add("opacity-40");
   })

   edit_cancel.addEventListener("click",() => {
    edit.classList.add("hide");
    main_container.classList.remove("opacity-40");
   })

   guardian_edit_btn.addEventListener("click", ()=> {
    edit_guardian.classList.remove("hide")
    main_container.classList.add("opacity-40");
   })

   edit_cancel_guardian.addEventListener("click",() => {
    edit_guardian.classList.add("hide");
    main_container.classList.remove("opacity-40");
   })
}
display();

async function update_form(){
   let form_check = false;

   console.log(currentuser.id);

   if(stud_firstname.value == ""){
      form_check = true;
      stud_firstname_error.innerHTML = "Field must not be empty"
   }
   else{
      form_check = false;
      stud_firstname_error.innerHTML = "";
   }
   
   if(stud_lastname.value == ""){
      form_check = true;
      stud_lastname_error.innerHTML = "Field must not be empty"
   }
   else{
      form_check = false;
      stud_lastname_error.innerHTML = "";
   }

   if(stud_email.value == ""){
      form_check = true;
      stud_email_error.innerHTML = "Field must not be empty"
   }
   else{
      form_check = false;
      stud_email_error.innerHTML = "";
   }

   if(stud_phone.value == ""){
      form_check = true;
      stud_phone_error.innerHTML = "Field must not be empty"
   }
   else{
      form_check = false;
      stud_phone_error.innerHTML = "";
   }
   
   if(stud_address.value == ""){
      form_check = true;
      stud_address_error.innerHTML = "Field must not be empty"
   }
   else{
      form_check = false;
      stud_address_error.innerHTML = "";
   }

   if(form_check == flase){
      const {data:user_info, error:info_data} = await supabaseClient
      .from("student-info")
      .insert([{
         id: currentuser.id,
         firstname: stud_firstname.value,
         lastname: stud_lastname.value,
         email: stud_email.value,
         phone:stud_phone.value,
         student_id:stud_id.value,
         address:stud_address.value,
      }])
   }
}