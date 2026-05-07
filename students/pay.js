let currentuser = [];

let stud = [];

emailjs.init("1Y6z6QVOhu5JnGDHf");

const top_btn = document.getElementById("top-btn");
const enter_amount = document.getElementById("enter-amount");
const amount_input = document.getElementById("amount-input");
const enter_btn = document.getElementById("enter-btn");
const success_message = document.getElementById("successful-message");
const success_text = document.getElementById("successful-text");
const bal_available = document.getElementById("bal-available");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");
const amount = amount_input.value.trim();

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

async function initUser() {
    const { data: { session } } = await supabaseClient.auth.getSession();
    currentuser = session?.user || null;
    console.log(currentuser);

    if (!currentuser) return;

    // students
    const { data, error } = await supabaseClient
        .from('students')
        .select()
        .eq("id", currentuser.id)
        .maybeSingle()

    if (error) {
        console.log(error)
        return;
    }
    let stud = data;

    console.log(data);
    console.log(stud);
    displaydetails(data);

    enter_btn.addEventListener("click", () => {

        let amount_check = false;
        const amount = amount_input.value.trim();

        if (amount == null) {
            amount_check = true;
        }

        if (amount_check) {
            return;
        }

        if (!amount_check) {
            let delete_emote = `
      <div class="w-[45%] mx-auto flex justify-between items-center">
        <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
      </div>
    `;

            enter_btn.disabled = true;
            enter_btn.innerHTML = delete_emote;

            fakePayment(stud, amount);
        }

    })

    console.log(data);

}

// console.log(currentuser);
async function initapp() {
    await initUser();
}
initapp();





// enter_btn.addEventListener("click", () => {
//     let delete_emote = `
//       <div class="w-[45%] mx-auto flex justify-between items-center">
//         <img id="loading-image" src="../images/loading (2).png" alt="" class="w-5 h-5 delete-function">
//       </div>
//     `;

//     enter_btn.disabled = true;
//     enter_btn.innerHTML = delete_emote;

//     payWithPaystack(data.email, amount)
// })


top_btn.addEventListener("click", () => {
    enter_amount.classList.remove("hide");
    top_btn.classList.add("hide");
})


// function payWithPaystack(email, amount) {
//     let handler = PaystackPop.setup({
//         key: "pk_test_0eac4d7c3cd2e4fff71767bf5f0f6a5087a12104",
//         email: email,
//         amount: amount * 100, // kobo
//         currency: "NGN",

//         callback: function (response) {
//             console.log("Payment success:", response.reference);
//             verifyPayment(response.reference);
//         },

//         onClose: function () {
//             alert("Payment cancelled");
//         }
//     });

//     handler.openIframe();
// };

// async function verifyPayment(reference) {
//     try {
//         const res = await fetch(
//             "https://YOUR_PROJECT_ID.functions.supabase.co/verify-payment",
//             {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({ reference }),
//             }
//         );

//         const data = await res.json();
//         console.log(data);

//         if (data.status === "success") {
//             console.log("Payment verified ✅");

//             // 👉 NOW update DB
//             await bookRoomAfterPayment();

//         } else {
//             console.log("Payment failed ❌");
//         }

//     } catch (err) {
//         console.log(err);
//     }
// }
async function displaydetails(student) {
    console.log(student);

    const {data, error} = await supabaseClient
    .from('students')
    .select()
    .eq("id", student.id)

    if(error){
        return;
    }

    console.log(data);

    if (data.account_bal != 0 || null) {
        bal_available.innerHTML = data[0].account_bal;
    }

}


async function fakePayment(student, amnt) {
    console.log(student);

    try {
        if (!student) {
            alert("Login first");
            return window.location.href = "login.html"
        }

        function formatCurrency(amount) {
            return new Intl.NumberFormat("en-NG", {
                style: "currency",
                currency: "NGN"
            }).format(amount);
        }

        let old_amnt = Number(student.account_bal.replace(/[^0-9.-]+/g, ""));
        console.log(old_amnt);
        const final_bal = Number(old_amnt) + Number(amnt);
        console.log(Number(final_bal));

        const update = {
            account_bal: formatCurrency(final_bal),
        };

        const { data, error } = await supabaseClient
            .from('students')
            .update(update)
            .eq("id", student.id)
            .select()

        if (error) {
            console.log(error);
            return;
        }
        console.log(data);
        // console.log(data.account_bal);

        let reference = "FAKEPAY_" + Date.now();
        console.log(reference);

        const { data: trans, error: trans_error } = await supabaseClient
            .from('transactions')
            .insert([{
                student_id: student.id,
                amount: formatCurrency(amnt),
                reference: reference
            }])
            .select()

        if (error) {
            console.log(error);
            return;
        }
        console.log(trans);

        enter_btn.disabled = false;
        create_hostel_function(
            "payment successfull",
            "success"
        );
        displaydetails(student);
        sendEmail(student, amnt);
    }
    catch (err) {
        enter_btn.disabled = false;
        create_hostel_function(
            err.message || "payment failed",
            "error"
        );
        return;
    }
}

async function sendEmail(student, amount) {

    function formatCurrency(amount) {
        return new Intl.NumberFormat("en-NG", {
            style: "currency",
            currency: "NGN"
        }).format(amount);
    }

    const names = student.student_name.split(" ");

    emailjs.send("service_qk71ecd", "template_hgkzm9h", {
        email: student.student_email,
        name: names[0],
        amount: amount,
    })
        .then(() => {
            console.log("Email sent ✅");
        })
        .catch((error) => {
            console.log("Email error ❌", error);
        });
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
        top_btn.classList.remove("hide");
        enter_amount.classList.add("hide");



        // Hide after 5s
        setTimeout(() => {
            success_message.classList.remove("successful");
            success_message.classList.add("successful-2");

            setTimeout(() => {
                success_message.classList.add("hide");
            }, 200);
        }, 5000);

    });

    enter_btn.innerHTML = "ENTER";

}