const main_container = document.getElementById("main-container");
const student_info = document.getElementById("info-container");
const view_btn = document.getElementById("view-btn");
const cancel_btn = document.getElementById("cancel-btn");

view_btn.addEventListener("click", () => {
    student_info.classList.remove("hide");
    main_container.classList.add("fade");
})

cancel_btn.addEventListener("click", () => {
    student_info.classList.add("hide");
    main_container.classList.remove("fade");
})