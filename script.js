document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const categoryInput = document.getElementById("categoryInput");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    const loadTasks = () => {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(task => addTaskToDOM(task.text, task.category, task.completed));
    };

    const saveTasks = () => {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector(".task-text").textContent,
                category: taskItem.querySelector(".task-category").textContent,
                completed: taskItem.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

    const addTaskToDOM = (taskText, taskCategory, completed = false) => {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        if (completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
            <span class="task-text">${taskText}</span>
            <span class="task-category">${taskCategory}</span>
            <div class="buttons">
                <button class="edit">Edit</button>
                <button class="remove">Remove</button>
            </div>
        `;

        taskItem.querySelector(".task-text").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        taskItem.querySelector(".edit").addEventListener("click", () => {
            const newText = prompt("Edit task", taskItem.querySelector(".task-text").textContent);
            if (newText) {
                taskItem.querySelector(".task-text").textContent = newText;
                saveTasks();
            }
        });

        taskItem.querySelector(".remove").addEventListener("click", () => {
            taskList.removeChild(taskItem);
            saveTasks();
        });

        taskList.appendChild(taskItem);
    };

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        const taskCategory = categoryInput.value;
        if (taskText !== "") {
            addTaskToDOM(taskText, taskCategory);
            saveTasks();
            taskInput.value = "";
        }
    });

    loadTasks();
});
