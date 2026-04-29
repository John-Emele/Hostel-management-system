const swap = document.getElementById("swap");
const checkout = document.getElementById("checkout");
const cancel_swap = document.getElementById("cancel-swap");
const cancel_checkout = document.getElementById("cancel-checkout");
const swap_btn = document.getElementById("swap-btn");
const checkout_btn = document.getElementById("checkout-btn");
const side_menu = document.getElementById("side-menu");
const side_menu_btn = document.getElementById("side-menu-btn");


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

side_menu_btn.addEventListener("click", () => {
   if(side_menu.classList.contains("hide")){
    side_menu.classList.remove("menu-exit");
    side_menu.classList.add("menu-entrance");
    setTimeout( () => {
        side_menu.classList.remove("hide");
    },250);
   }
   else{
    side_menu.classList.remove("menu-entrance");
    side_menu.classList.add("menu-exit");
    setTimeout( () => {
        side_menu.classList.add("hide");
    },250);
   }
});