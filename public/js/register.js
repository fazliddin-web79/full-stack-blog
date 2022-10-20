const registrForm = document.querySelector("#register-Form");

registrForm &&
  registrForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    const result = {};

    await fetch("/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        email,
      }),
    })
      .then((res) => {
        result.status = res.status;
        return res.json();
      })
      .then((res) => {
        result.data = res;
      });

    const errorText = document.getElementById("error-text");
    const successText = document.getElementById("error-success");

    if (result.status === 400 || result.status === 401)
      errorText.innerHTML = "* " + result.data.error;
    if (result.status === 200) {
      errorText.innerHTML = "";
      successText.innerHTML = result.data.data;
      console.log(result.data);
      window.location.href = "/";
    }
  });
