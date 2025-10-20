window.addEventListener("DOMContentLoaded", () => {
  document.addEventListener("click", (e) => {
    if (e.target.id === "formSavebutton") {
      console.log("step one run");

      const PhoneNumber = document.getElementById("users_telNumber").value;
      console.log(PhoneNumber);

      const Emailaddress = document.getElementById("users_addressEmail").value;
      console.log(Emailaddress);

      const UserName = document.getElementById("username").value;
      console.log(UserName);

      document.cookie = `telNumber=${PhoneNumber}; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/`;
      document.cookie = `Email=${Emailaddress}; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/`;
      document.cookie = `name=${UserName}; expires=Fri, 31 Dec 2025 23:59:59 GMT; path=/`;

      console.log("Cookies set:", document.cookie);

      users_telNumber.value = "";
      users_addressEmail.value = "";
      username.value = "";

      console.log("Form cleared!");
    }
  });
  async function getcookie() {
    let c = [];
    c = await cookieStore.getAll();

    for (let i = 0; i < 3; i++) {
      console.log(i);
      console.log(c[i].name);

      if (c[i].name !== "name") {
        await i++;
      } else {
        alert("welcome back" + c[i].value);
      }
    }
  }
  getcookie();
});
