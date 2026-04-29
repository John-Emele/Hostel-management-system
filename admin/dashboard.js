window.addEventListener("DOMContentLoaded", async () => {
  const { data, error } = await supabaseClient.auth.getSession();

  if (!data.session) {
    window.location.href = "../login.html";
  }

  console.log("User:", data.session?.user);
});

window.addEventListener("DOMContentLoaded", async () => {
  const user = await protectPage(supabase);
  console.log(user);
});

const filter_role = document.getElementById("filter-role");
const pop_sort = document.getElementById("pop-sort");

filter_role.addEventListener("click", ()=> {
    if(pop_sort.classList.contains("hide")){
        pop_sort.classList.remove("hide");
    }
    else{
        pop_sort.classList.add("hide");
    }
})

