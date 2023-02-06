"use strict";
const currentDate = new Date();
class Activity {
    // currentDate:Date;
    constructor(name, image, startDate) {
        this.name = name;
        this.image = image;
        this.startDate = startDate;
    }
}
class ActivityManager {
    constructor() {
        this.activities = [];
        this.container = document.querySelector('.container');
        const addButton = document.querySelector('#add-button');
        const addForm = document.querySelector('#add-form');
        const activitiesContainer = document.querySelector('#activities');
        const notification = document.querySelector('#notification');
        const img2 = document.querySelector("#img3");
        const cancel = document.querySelector("#cancel");
        const con = document.querySelector(".er");
        const error = document.createElement('div');
        addButton.addEventListener('click', () => {
            addForm.style.display = 'block';
            addButton.style.display = 'none';
            this.container.style.display = 'none';
        });
        cancel.addEventListener('click', () => {
            addForm.style.display = 'none';
            addButton.style.display = 'block';
            this.container.style.display = 'block';
        });
        addForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = addForm.elements.namedItem('name');
            const imageInput = addForm.elements.namedItem('image');
            const startDateInput = addForm.elements.namedItem('start-date');
            if (nameInput.value === "" || imageInput.value === "" || startDateInput.value === "") {
                let msg = "Kindly input all fields";
                error.innerText = msg;
                error.style.backgroundColor = "red";
                error.style.color = "white";
                error.style.width = "38vw";
                error.style.padding = "10px";
                con.appendChild(error);
                setTimeout(() => {
                    error.style.display = 'none';
                }, 3000);
                console.log("There was an error");
            }
            else {
                const activity = new Activity(nameInput.value, imageInput.value, new Date(startDateInput.value));
                this.activities.push(activity);
                const differenceInMilliseconds = currentDate.getTime() - new Date(startDateInput.value).getTime();
                const differenceInDays = Math.round(differenceInMilliseconds / (1000 * 60 * 60 * 24));
                console.log(differenceInDays);
                nameInput.value = '';
                imageInput.value = '';
                startDateInput.value = '';
                img2.style.height = '40vh';
                this.container.style.height = '50vh';
                this.container.style.display = "flex";
                addForm.style.display = 'none';
                addButton.style.display = 'block';
                notification.innerHTML = 'Activity added';
                notification.style.display = 'flex';
                setTimeout(() => {
                    notification.style.display = 'none';
                }, 3000);
                this.renderActivities();
            }
        });
        this.renderActivities = this.renderActivities.bind(this);
    }
    renderActivities() {
        const activitiesContainer = document.querySelector('#activities');
        activitiesContainer.style.background = "white-smoke";
        activitiesContainer.style.width = "200px";
        activitiesContainer.style.padding = "10px";
        activitiesContainer.style.margin = "30px";
        activitiesContainer.style.textAlign = "center";
        activitiesContainer.style.display = "flex";
        activitiesContainer.style.flexWrap = "wrap";
        // activitiesContainer.innerHTML = '';
        // activitiesContainer.setAttribute("id", "hg");
        this.activities.forEach((activity) => {
            const activityElement = document.createElement('div');
            activityElement.style.margin = "20px";
            activityElement.style.objectFit = "contain";
            activityElement.innerHTML = `
      <img id="id_img" src="${activity.image}" />
       <p data-index="${this.activities.indexOf(activity)}" >${activity.startDate.toLocaleDateString()}</p>
        <h3 data-index="${this.activities.indexOf(activity)}">${activity.name}</h3>
      
         <button  class="delete-button">Delete</button>
        <button class="update-button">Updated</button>
      `;
            const deleteButton = activityElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                const index = parseInt(deleteButton.getAttribute('data-index'), 10);
                this.activities.splice(index, 1);
                this.renderActivities();
            });
            const updateButton = activityElement.querySelector('.update-button');
            updateButton.addEventListener('click', () => {
                const index = parseInt(updateButton.getAttribute('data-index'), 10);
                const updateForm = document.createElement('form');
                updateForm.setAttribute("id", "forrm");
                updateForm.innerHTML = `

        <button id="show-modal">Open Modal</button>

        <dialog id="modal">
        <img src="${activity.image}" />
        <p data-index="${this.activities.indexOf(activity)}" >${activity.startDate.toLocaleDateString()}</p>
        <h3 data-index="${this.activities.indexOf(activity)}">${activity.name}</h3>
          <button id="close-modal">Close</button>
        </dialog>

        `;
                const showModalButton = document.getElementById('show-modal');
                const modal = document.getElementById('modal');
                const closeModalButton = document.getElementById('close-modal');
                showModalButton.addEventListener('click', () => {
                    modal.showModal();
                });
                closeModalButton.addEventListener('click', () => {
                    modal.close();
                });
                activityElement.style.display = "none";
                updateForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    const nameInput = updateForm.elements.namedItem('name');
                    const imageInput = updateForm.elements.namedItem('image');
                    const startDateInput = updateForm.elements.namedItem('start-date');
                    this.activities[index].name = nameInput.value;
                    this.activities[index].image = imageInput.value;
                    this.activities[index].startDate = new Date(startDateInput.value);
                    activityElement.replaceWith(activityElement);
                    this.renderActivities();
                });
                activityElement.innerHTML = '';
                activityElement.appendChild(updateForm);
                activityElement.style.display = "flex";
            });
            activitiesContainer.appendChild(activityElement);
        });
    }
}
const activityManager = new ActivityManager();
