const swap = document.getElementById("swap");
const checkout = document.getElementById("checkout");
const cancel_swap = document.getElementById("cancel-swap");
const cancel_checkout = document.getElementById("cancel-checkout");
const swap_btn = document.getElementById("swap-btn");
const checkout_btn = document.getElementById("checkout-btn");


function display_form() {
    swap_btn.addEventListener("click", () => {
        swap.classList.remove("hide");
    })
    checkout_btn.addEventListener("click", () => {
        checkout.classList.remove("hide");
    })
}
display_form();

function cancel() {
    cancel_swap.addEventListener("click", () => {
        swap.classList.add("hide");
    })
    cancel_checkout.addEventListener("click", () => {
        checkout.classList.add("hide");
    })
}
cancel();