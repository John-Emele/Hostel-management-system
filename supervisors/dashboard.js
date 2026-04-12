const notification_cancel = document.getElementById("notification-cancel");
const notification_container = document.getElementById("notification-box");
const notification_btn = document.getElementById("notification-btn");
const main_container = document.getElementById("main-container");

notification_btn.addEventListener("click", () => {
    notification_container.classList.remove("hide");
    main_container.classList.add("fade");
})

notification_cancel.addEventListener("click", () => {
    notification_container.classList.add("hide");
    main_container.classList.remove("fade");
})