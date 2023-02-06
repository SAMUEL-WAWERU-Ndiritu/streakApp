"use strict";
class Activity {
    constructor(name, image, startDate) {
        this.name = name;
        this.image = image;
        this.startDate = startDate;
    }
}
class ActivityManager {
    constructor() {
        this.activities = [];
        const addButton = document.querySelector('#add-button');
        const addForm = document.querySelector('#add-form');
        const activitiesContainer = document.querySelector('#activities');
        const notification = document.querySelector('#notification');
        addButton.addEventListener('click', () => {
            addForm.style.display = 'block';
            addButton.style.display = 'none';
        });
        addForm.addEventListener('submit', (event) => {
            event.preventDefault();
            const nameInput = addForm.elements.namedItem('name');
            const imageInput = addForm.elements.namedItem('image');
            const startDateInput = addForm.elements.namedItem('start-date');
            const activity = new Activity(nameInput.value, imageInput.value, new Date(startDateInput.value));
            this.activities.push(activity);
            nameInput.value = '';
            imageInput.value = '';
            startDateInput.value = '';
            addForm.style.display = 'none';
            addButton.style.display = 'block';
            notification.innerHTML = 'Activity added';
            notification.style.display = 'block';
            setTimeout(() => {
                notification.style.display = 'none';
            }, 3000);
            this.renderActivities();
        });
        this.renderActivities = this.renderActivities.bind(this);
    }
    renderActivities() {
        const activitiesContainer = document.querySelector('#activities');
        const MainDiv = document.querySelector(".MainDiv");
        activitiesContainer.innerHTML = '';
        this.activities.forEach((activity) => {
            const activityElement = document.createElement('div');
            activityElement.innerHTML = `
          
          <img src="${activity.image}" />
          <p>${activity.startDate.toLocaleDateString()}</p>
          <h3 class="viewPopUp" >${activity.name}</h3>
          <h3>Hello</h3>
        `;
            // popUp Element
            const popUp = activityElement.querySelector('.viewPopUp');
            const ViewDiv = document.createElement("div");
            popUp.addEventListener('click', () => {
                ViewDiv.innerHTML = `
        <img src="${activity.image}" />
        <p>${activity.startDate.toLocaleDateString()}</p>
        <h3>${activity.name}</h3>
        // <button data-index="${this.activities.indexOf(activity)}" class="update-button">Update</button>
        // <button data-index="${this.activities.indexOf(activity)}" class="delete-button">Delete</button>
      `;
            });
            const deleteButton = activityElement.querySelector('.delete-button');
            deleteButton.addEventListener('click', () => {
                const index = parseInt(deleteButton.getAttribute('data-index'), 10);
                this.activities.splice(index, 1);
                this.renderActivities();
            });
            const updateButton = activityElement.querySelector('.update-button');
            updateButton.addEventListener('click', () => {
                const index = parseInt(updateButton.getAttribute('data-index'), 10);
                const updateForm = document.querySelector('#update-form');
                const nameInput = updateForm.elements.namedItem('name');
                const imageInput = updateForm.elements.namedItem('image');
                const startDateInput = updateForm.elements.namedItem('start-date');
                nameInput.value = this.activities[index].name;
                imageInput.value = this.activities[index].image;
                startDateInput.value = this.activities[index].startDate.toLocaleDateString();
                updateForm.style.display = 'block';
                addForm.style.display = 'none';
                addButton.style.display = 'none';
                updateForm.addEventListener('submit', (event) => {
                    event.preventDefault();
                    this.activities[index].name = nameInput.value;
                    this.activities[index].image = imageInput.value;
                    this.activities[index].startDate = new Date(startDateInput.value);
                    updateForm.style.display = 'none';
                    addButton.style.display = 'block';
                    this.renderActivities();
                    nameInput.value = '';
                    imageInput.value = '';
                    startDateInput.value = '';
                    notification.innerHTML = 'Activity updated';
                    notification.style.display = 'block';
                    setTimeout(() => {
                        notification.style.display = 'none';
                    }, 3000);
                });
            });
            activitiesContainer.appendChild(activityElement);
            // MainDiv.appendChild(activitiesContainer);
            activitiesContainer.style.display = "flex";
        });
    }
}
