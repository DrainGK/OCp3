// Function to do ajax request post method using fetch
function get_token(email, password) {
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // Pour les requetes api qui ont besoin du token 'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  })
    .then((response) => {
      switch (response.status) {
        case 200:
          return response.json();
        case 401:
        case 404:
          throw new Error("Invalid credentials");
        default:
          throw new Error("Something went wrong");
      }
    })
    .then((data) => {
      if (data.token !== undefined && data.token !== "") {
        sessionStorage.setItem("token", data.token);
        window.location.href = "index.html";
      }
    })
    .catch((error) => {
      alert("pd");
    });
}

const loginButton = document.getElementById("login-submit");
const loginForm = document.getElementById("login-form");

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("E-mail").value;
  const password = document.getElementById("password").value;

  get_token(email, password);
});
