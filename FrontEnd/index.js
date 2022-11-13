const projectsContainer = document.querySelector(".gallery");
let projectsData = [];

async function fetchProjects() {
  await fetch("http://localhost:5678/api/works")
    .then((res) => res.json())
    .then((data) => (projectsData = data));
  //   console.log(projectsData);
  projectsDisplay();
}

function projectsDisplay() {
  projectsContainer.innerHTML = projectsData
    .filter((project) => project.categoryId === 3)
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

const filterBtns = document.querySelectorAll(".btn");

filterBtns.forEach(function (btn) {
  btn.addEventListener("click", function (e) {
    const category = e.currentTarget.dataset.id;
    console.log(e.currentTarget.dataset.id);
    const projectCategory = projectsData.filter(function (project) {
      if (projectsData.categoryId === category) {
        return project;
      }
      console.log(projectsData.categoryId === 1);
    });
    console.log(projectCategory);
    if (category === "Tous") {
      projectsDisplay(projectsData);
    } else {
      projectsDisplay(projectCategory);
    }
  });
});

const Tous = window.addEventListener("load", fetchProjects);
