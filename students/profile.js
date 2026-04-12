const profile_picture = document.getElementById("profile-picture");
const add_picture = document.getElementById("add-image");
const plus_image = document.getElementById("plus-image");

plus_image.addEventListener("click", ()=> {
    add_picture.click()
})

add_picture.addEventListener("change", () => {
    const file = add_picture.files[0];

    if (!file) {
        console.log("No file selected");
        return;
    }
    const imageURL = URL.createObjectURL(file);
    console.log(imageURL);
    profile_picture.src = imageURL;
    // uploadBtn.style.display = "none";
    // change_box.style.display = "block";
});