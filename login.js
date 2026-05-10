const login_email = document.getElementById("login-email");
const login_password = document.getElementById("login-password");
const email_error = document.getElementById("email-error");
const password_error = document.getElementById("password-error");
const login_btn = document.getElementById("login-btn");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");


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

    login_btn.innerHTML = "Login"
}


async function login() {
    let next_page;

    let form_check = false;

    if (login_email.value === "" || login_password.value === "") {
        form_check = true;
        alert("Please fill all fields");
        return;
    }
    if (form_check) {
        return;
    }


    try {
        // 1️⃣ login in via Supabase Auth
        if (form_check == false) {
            let delete_emote = `
      <div class="w-[80%] mx-auto flex justify-between items-center">
        <p class="text-blue-800 text-lg">Login in...</p> 
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

            login_btn.disabled = true;
            login_btn.innerHTML = delete_emote;

            const email = login_email.value;
            const password = login_password.value;

            const { data, error } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });
            console.log(data);

            if (error) {
                console.error(error);
                login_btn.disabled = false;// 👈 VERY IMPORTANT
                create_hostel_function(
                    error.message || "login failed",
                    "error"
                );
                return;
            }
            console.log(data.user.id);

            const { data: profile_user, error: profile_error } = await supabaseClient
                .from('profile')
                .select('*')
                .eq("id", data.user.id)
                .single()

            console.log(profile_user);

            if (profile_error) {
                console.log(profile_error);
            }

            const role = profile_user.role;
            console.log(role);

            if (role == "student") {
                next_page = "students/profile.html"
            }
            else if (role == "supervisor") {
                next_page = "supervisors/dashboard.html";
            }
            else if (role == "admin") {
                next_page = "admin/dashbaord.html";
            }
            else {
                create_hostel_function(
                    "Access Denied",
                    "error"
                );
                login_btn.disabled = false;
                login_btn.innerHTML = "login";
                return;
            }

            login_btn.disabled = false;
            create_hostel_function(
                "login succesfull",
                "success"
            );

            window.location = next_page;

        }
    }
    catch (err) {
        console.log(err);
        login_btn.disabled = false;
        create_hostel_function(
            err.message || "login failed",
            "error"
        );
        return;
    }

}

login_btn.addEventListener("click", async (e) => {
    e.preventDefault();
    await login();
})