const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const email_error = document.getElementById("email-error");
const password_error = document.getElementById("password-error");
const login_btn = document.getElementById("login-btn");
let form_check = false;

async function login() {
    // try {
    // if (login_email.value == "") {
    //     email_error.innerHTML = "Field must not be empty";
    //     form_check = true;
    // }
    // else {
    //     email_error.innerHTML = "";
    //     form_check = false;
    // }
    // if (login_password.value == "") {
    //     password_error.innerHTML = "Field must not be empty";
    //     form_check = true;
    // }
    // else {
    //     password_error.innerHTML = "";
    //     form_check = false;
    // }

    if (login_email.value === "" || login_password.value === "") {
        form_check = true;
        alert("Please fill all fields");
        return;
    }

    // if (form_check) {
        
    // }

    // if (form_check == false) {

    //     login_btn.disabled = true;
    //     login_btn.textContent = "Logging in...";

    //     const email = login_email.value;
    //     const password = login_password.value;

    //     const { data, error } = await supabaseClient.auth.signInWithPassword({
    //         email,
    //         password
    //     });
    //     console.log(data);

    //     if (error) {
    //         console.error(error); // 👈 VERY IMPORTANT
    //         alert(error.message);
    //         sign_btn.disabled = false;
    //         sign_btn.textContent = "login";
    //         return;
    //     }
    // }
    // alert("login successful!");

    login_btn.disabled = true;
    login_btn.textContent = "login in...";

    const email = login_email.value;
    const password = login_password.value;

    try {
        // 1️⃣ login in via Supabase Auth
        const { data, error } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error(error); // 👈 VERY IMPORTANT
            alert(error.message);
            return;
        }

        console.log(data.user);
        alert("Login successful!");
    }
    catch (err) {
        console.log(err);
        alert("something went wrong, please try again");
        return
    }
    finally {
        login_btn.disabled = false;
        login_btn.textContent = "login";
    }
    window.location = "profile.html"
}

login_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await login();
})