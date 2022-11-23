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
            <div id="binIcon" class="bin" onclick="deleteProject(${project.id})"> <i class="fa-regular fa-trash-can"></i> </div>
            <img id="modale-photos" crossorigin="anonymous" src=${project.imageUrl} alt="photo ${project.title}">
            <a>éditer</a>
          </div>
          `
    )
    .join("");
  console.log(projects);
}

const title = document.getElementById("add_title");
const newProjectCategory = document.getElementById("category");

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
  document.getElementById("modify-bar").style.display = "flex";
  document.getElementById("modify-icon").style.display = "flex";
  document.getElementById("modify-icon-2").style.display = "flex";
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
  document.querySelector(".modale").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".modale-back").classList.toggle("hidden");
  e.preventDefault();
});

const closeModale = document.getElementById("cross-icon");

closeModale.addEventListener("click", (e) => {
  document.querySelector(".modale").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".modale-back").classList.toggle("hidden");
  e.preventDefault();
});

const addPhotos = document.getElementById("btn-photo");

addPhotos.addEventListener("click", (e) => {
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".add-photo").classList.toggle("hidden");
  e.preventDefault();
});
const previousModale = document.getElementById("left-arrow");

previousModale.addEventListener("click", (e) => {
  document.querySelector(".add-photo").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
  e.preventDefault();
});

function deleteProject(id) {
  deleteProject(id);
}

async function deleteProject(id) {
  let token = sessionStorage.getItem("token");

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => (projectsData = data));
  projectsDisplay(projectsData);
  galleryDisplay(projectsData);
}

async function postProject() {
  let token = sessionStorage.getItem("token");

  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      // Pour les requetes api qui ont besoin du token 'Authorization': 'Bearer ' + sessionStorage.getItem("token")
    },
    body: JSON.stringify({
      categoryId: newProjectCategory.value,
      title: title.value,
      imageUrl: `url(${uploaded_image})`,
    }),
  })
    .then((res) => res.json())
    .then((data) => (projectsData = data));
  projectsDisplay(projectsData);
  galleryDisplay(projectsData);
}

const image_input = document.querySelector("#image_input");
var uploaded_image = "";

image_input.addEventListener("change", function () {
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    uploaded_image = reader.result;
    document.querySelector(
      "#display_image"
    ).style.backgroundImage = `url(${uploaded_image})`;
  });
  reader.readAsDataURL(this.files[0]);

  if ((uploaded_image = true)) {
    document.getElementById("image-icon").style.display = "none";
    document.getElementById("display_image").style.display = "block";
  } else {
    document.getElementById("image-icon").style.display = "block";
    document.getElementById("display_image").style.display = "none";
  }
});

const addPhotosBtn = document.getElementById("add-photo-btn");

addPhotosBtn.addEventListener("click", (e) => {
  const clickPhotoBtn = document.getElementById("image_input");
  clickPhotoBtn.click();
});

const newProjectBtn = document.getElementById("submit-photo-id");

newProjectBtn.addEventListener("click", (e) => {
  e.preventDefault;
});
