console.log("SCRIPT STARTED");
const button = document.querySelector(".create-project-button");
const backlogColumn = document.querySelector("#backlog-column");
const inProgressColumn = document.querySelector("#in-progress-column");
const reviewColumn = document.querySelector("#review-column");
const completedColumn = document.querySelector("#completed-column");
const projectNameInput = document.querySelector("#project-name");
const projectCategoryInput = document.querySelector("#project-category");
const projectNotesInput = document.querySelector("#project-notes");
const completedEmpty = document.querySelector("#completed-empty");
const projects = [
    {
        name: "Portfolio Website",
        category: "Web",
        notes: "Homepage layout done, need to add projects section",
        status: "in-progress"
    },
    {
        name: "Poster Design For Tech Fest",
        category: "Design",
        notes: "Creating the first draft",
        status: "backlog"
    },
    {
        name: "IoT Weather Station",
        category: "Hardware",
        notes: "Calibrating sensors",
        status: "review"
    }
];
function updateEmptyMessage() {
    if (completedColumn.querySelector(".project-card")) {
        completedEmpty.style.display = "none";
    } else {
        completedEmpty.style.display = "block";
    }
}
function createProjectCard(project) {

    const card = document.createElement("article");

    card.className = "project-card";

    card.innerHTML = `
        <h3>${project.name}</h3>
        <span class="category ${project.category.toLowerCase()}">${project.category}</span>
        <p>${project.notes}</p>
        <select class="project-status">
            <option value="backlog" ${project.status === "backlog" ? "selected" : ""}>Backlog</option>
            <option value="in-progress" ${project.status === "in-progress" ? "selected" : ""}>In Progress</option>
            <option value="review" ${project.status === "review" ? "selected" : ""}>Review</option>
            <option value="completed" ${project.status === "completed" ? "selected" : ""}>Completed</option>
        </select>
    `;
    const statusSelect = card.querySelector(".project-status");
    statusSelect.addEventListener("change", function () {
        const newStatus = statusSelect.value
        console.log("Status changed to: " + newStatus);
        project.status = newStatus;
        console.log(project);
        if (newStatus === "backlog") {
            backlogColumn.appendChild(card);
        } else if (newStatus === "in-progress") {
            inProgressColumn.appendChild(card);
        } else if (newStatus === "review") {
            reviewColumn.appendChild(card);
        } else if (newStatus === "completed") {
            completedColumn.appendChild(card);
        }
        updateEmptyMessage();
    });
    return card;
}

projects.forEach(function (project) {

    const card = createProjectCard(project);

    if (project.status === "backlog") {
        backlogColumn.appendChild(card);
    } else if (project.status === "in-progress") {
        inProgressColumn.appendChild(card);
    }
    else if (project.status === "review") {
        reviewColumn.appendChild(card);
    }  
    else if (project.status === "completed") {
        completedColumn.appendChild(card);
    }
    updateEmptyMessage();

});
button.addEventListener("click", function () {
    if (projectNameInput.value.trim() === "") {
        projectNameInput.value = "";
        return;
    }
    const project= {
        name: projectNameInput.value,
        category: projectCategoryInput.value,
        notes: projectNotesInput.value,
        status: "backlog"
    }
    projects.push(project);
    const card = createProjectCard(project);
    backlogColumn.appendChild(card);
    projectNameInput.value = "";
    projectCategoryInput.value = "design";
    projectNotesInput.value = "";
});