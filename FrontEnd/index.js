const projectsContainer = document.querySelector(".gallery");
const galleryContainer = document.querySelector(".gallery-photo");
let projectsData = [];

async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projectsData = data));
  projectsDisplay(projectsData);
  galleryDisplay(projectsData);
}

function projectsDisplay(projects) {
  projectsContainer.innerHTML = projects
    .map(
      (project) =>
        `
            <figure>
            <img crossorigin="anonymous" src=${project.imageUrl} alt="photo ${project.title}">
             <figcaption>${project.title}</figcaption>
                                                                                            </figure>
            `
    )
    .join("");
}

function galleryDisplay(projects) {
  galleryContainer.innerHTML = projects
    .map(
      (project) =>
        `
          <div class="photos-card">
            <div id="binIcon" class="bin"> <i class="fa-regular fa-trash-can"></i> </div>
            <img id="modale-photos" crossorigin="anonymous" src=${project.imageUrl} alt="photo ${project.title}">
            <a>éditer</a>
          </div>
          `
    )
    .join("");
  console.log(projects);
}

function projectDelete() {
  fetch("http://localhost:5678/api/works", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      // Pour les requetes api qui ont besoin du token 'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    },
  }).then((response) => {
    switch (response.status) {
      case 200:
        return response.json();
      case 401:
      case 500:
        throw new Error("Unexpected Behaviour");
      default:
        throw new Error("Something went wrong");
    }
  });
}
const filterBtns = document.querySelectorAll(".btn");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const categories = e.currentTarget.dataset.id;
    const projectCategory = projectsData.filter(function (project) {
      if (project.category.name === categories) return project;
    });
    if (categories === "Tous") projectsDisplay(projectsData);
    else projectsDisplay(projectCategory);
  });
});

const Tous = window.addEventListener("load", fetchProjects);

function isConnected() {
  return (
    sessionStorage.getItem("token") !== null &&
    sessionStorage.getItem("token") !== ""
  );
}

if (isConnected()) {
  document.getElementById("login").style.display = "none";
  document.getElementById("logout").style.display = "block";
  document.getElementById("modify-bar").style.display = "block";
  document.getElementById("modify-icon").style.display = "block";
  document.getElementById("modify-icon-2").style.display = "block";
} else {
  document.getElementById("login").style.display = "block";
  document.getElementById("logout").style.display = "none";
  document.getElementById("modify-bar").style.display = "none";
  document.getElementById("modify-icon").style.display = "none";
  document.getElementById("modify-icon-2").style.display = "none";
}

function logout() {
  sessionStorage.removeItem("token");
}

const modifyGallery = document.getElementById("modify-icon-2");

modifyGallery.addEventListener("click", (e) => {
  document.querySelector(".modale").style.visibility = "visible";
  document.querySelector(".modale-container").style.visibility = "visible";
  document.querySelector(".modale-back").style.visibility = "visible";
  e.preventDefault();
});

const closeModale = document.getElementById("cross-icon");

closeModale.addEventListener("click", (e) => {
  document.querySelector(".modale").style.visibility = "hidden";
  document.querySelector(".modale-container").style.visibility = "hidden";
  document.querySelector(".modale-back").style.visibility = "hidden";
  e.preventDefault();
});

const addPhotos = document.getElementById("btn-photo");

addPhotos.addEventListener("click", (e) => {
  document.querySelector(".modale-container").style.visibility = "hidden";
  document.querySelector(".add-photo").style.visibility = "visible";
  e.preventDefault();
});
const previousModale = document.getElementById("left-arrow");

previousModale.addEventListener("click", (e) => {
  document.querySelector(".add-photo").style.visibility = "hidden";
  document.querySelector(".modale-container").style.visibility = "visible";
  e.preventDefault();
});

const deleteProject = document.getElementById("binIcon");

deleteProject.addEventListener("click", (e) => {
  console.log("clicked");
  e.preventDefault();
});
