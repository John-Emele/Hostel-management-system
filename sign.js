const sign_email = document.getElementById("sign-email");
const sign_password = document.getElementById("sign-password");
const email_error = document.getElementById("email-error");
const password_error = document.getElementById("password-error");
const sign_btn = document.getElementById("sign-btn");
let form_check = false;

async function sign_up() {
    try {
        if (sign_email.value == "") {
            email_error.innerHTML = "Field must not be empty";
            form_check = true;
        }
        else {
            email_error.innerHTML = "";
            form_check = false;
        }
        if (sign_password.value == "") {
            password_error.innerHTML = "Field must not be empty";
            form_check = true;
        }
        else {
            password_error.innerHTML = "";
            form_check = false;
        }

        if (form_check == false) {

            sign_btn.disabled = true;
            sign_btn.textContent = "Signing up...";

            const email = sign_email.value;
            const password = sign_password.value;

            const { data, error } = await supabaseClient.auth.signUp({
                email,
                password
            });
            console.log(data);

            if (error) {
                console.log(error);
                return;
            }

            const user = data.user

            const { data: student, error: student_error } = await supabaseClient
                .from("profile")
                .insert([{
                    id: user.id,
                    user_email: user.email,
                    role: "student"
                }]);

            if (student_error) {
                console.log(student_error);
                return;
            }


        }
        alert("Signup successful!");
    }
    catch (err) {
        console.log(err);
        alert("something went wrong, please try again");
        return
    }
    finally {
        sign_btn.disabled = false;
        sign_btn.textContent = "Sign Up";
    }
    window.location = "login.html"
}
sign_btn.addEventListener("click", async () => {
    await sign_up();
})