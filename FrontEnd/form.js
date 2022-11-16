const loginForm = document.getElementById("login-form");
const loginButton = document.getElementById("login-submit");

// fetch("http://localhost:5678/api/works")
//   .then((res) => res.json())
//   .then((data) => console.log(data));

loginButton.addEventListener("click", (e) => {
  e.preventDefault();
  const username = document.getElementById("E-mail").value;
  const password = document.getElementById("password").value;

  if (username === "sophie.bluel@test.tldr" && password === "S0phie") {
    alert("You have successfully logged in.");
    window.location = "index.html";
  } else {
    alert("email ou mot de passe incorrect");
  }
});
