async function protectPage(supabase) {
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    window.location.href = "/login.html";
  }

  return data.session?.user;
}
// protectPage()