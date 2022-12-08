const projectsContainer = document.querySelector(".gallery");
const galleryContainer = document.querySelector(".gallery-photo");
let projectsData = [];

async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => {
      projectsData = data;
      projectsDisplay(projectsData);
      galleryDisplay(projectsData);
    });
}

function projectsDisplay(projects) {
  while (projectsContainer.firstChild)
    projectsContainer.removeChild(projectsContainer.firstChild);

  projects.forEach((project) => {
    figure = document.createElement("figure");

    img = document.createElement("img");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", project.imageUrl);
    img.setAttribute("alt", project.title);

    figcaption = document.createElement("figcaption");
    title = document.createTextNode(project.title);
    figcaption.appendChild(title);

    figure.appendChild(img);
    figure.appendChild(figcaption);

    projectsContainer.appendChild(figure);
  });
}

function galleryDisplay(projects) {
  while (galleryContainer.firstChild)
    galleryContainer.removeChild(galleryContainer.firstChild);

  projects.forEach((image) => {
    photosCard = document.createElement("div");
    photosCard.classList.add("photos-card");
    photosCard.dataset.id = image.id;

    binIconContainer = document.createElement("button");
    binIconContainer.setAttribute("type", "button");
    binIconContainer.classList.add("bin");
    binIconContainer.setAttribute("id", "binIcon");
    binIconContainer.addEventListener(
      "click",
      (e) => {
        deleteProject(image.id, photosCard);
      },
      false
    );

    icon = document.createElement("i");
    classIcon = ["fa-regular", "fa-trash-can"];
    icon.classList.add(...classIcon);

    binIconContainer.appendChild(icon);

    img = document.createElement("img");
    img.setAttribute("id", "modale-photos");
    img.setAttribute("crossorigin", "anonymous");
    img.setAttribute("src", image.imageUrl);
    img.setAttribute("alt", image.title);

    editLink = document.createElement("a");
    editText = document.createTextNode("éditer");

    editLink.appendChild(editText);

    photosCard.appendChild(binIconContainer);
    photosCard.appendChild(img);
    photosCard.appendChild(editLink);

    galleryContainer.appendChild(photosCard);
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
  window.location.href = "index.html";
}

const modifyGallery = document.getElementById("modify-icon-2");

modifyGallery.addEventListener("click", (e) => {
  e.preventDefault();
  // disableScrolling();
  document.querySelector(".modale").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".modale-back").classList.toggle("hidden");
});

function closeModale(elt) {
  elt.closest(".modale").classList.toggle("hidden");
  elt.closest(".modale-container").classList.toggle("hidden");
  document.querySelector(".modale-back").classList.toggle("hidden");
  // enableScrolling();
}

const closeCross = document.querySelectorAll(".cross");

closeCross.forEach((elt) => {
  elt.addEventListener("click", function (e) {
    e.preventDefault();
    closeModale(this);
  });
});

const overlay = document.querySelector(".modale-back");

overlay.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".modale").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".modale-back").classList.toggle("hidden");
});

const addPhotos = document.querySelector("#btn-photo");

addPhotos.addEventListener("click", (e) => {
  e.preventDefault();
  fetchProjects();
  document.querySelector(".modale-container").classList.toggle("hidden");
  document.querySelector(".add-photo").classList.toggle("hidden");
});

const previousModale = document.getElementById("left-arrow");

previousModale.addEventListener("click", (e) => {
  e.preventDefault();
  backModale();
});

function backModale() {
  document.querySelector(".add-photo").classList.toggle("hidden");
  document.querySelector(".modale-container").classList.toggle("hidden");
}

async function deleteProject(id, elt) {
  let token = sessionStorage.getItem("token");

  await fetch(`http://localhost:5678/api/works/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.ok) {
        elt.remove();
        fetchProjects();
      }
    })
    .then((data) => (projectsData = data));
}

const image_input = document.querySelector("#image_input");

image_input.addEventListener("change", function () {
  var uploaded_image = "";
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
  e.preventDefault();
  document.getElementById("image_input").click();
});

document.querySelector("form[name='form']").addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("token"),
    },
    body: formData,
  }).then(() => {
    backModale();
    fetchProjects();
  });
});
