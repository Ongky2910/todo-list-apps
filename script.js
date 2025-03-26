document.addEventListener('DOMContentLoaded', function () {
    const tasksUl = document.getElementById('tasks');
    const doneTasksUl = document.getElementById('done-tasks');
    const overdueTasksUL = document.getElementById('overdue-tasks');
    const addTaskButton = document.getElementById('add-task');
    const deleteAllTasksButton = document.getElementById('delete-all-tasks');
    const currentTimeElement = document.getElementById('current-time');
    const userNameInput = document.getElementById('name');
    const userPositionInput = document.getElementById('position');
    const saveUserInfoButton = document.getElementById('save-user-info');
    const navUsername = document.getElementById('nav-username');
    const navPosition = document.getElementById('nav-position');

    // Load user info from localStorage
    function loadUserInfo() {
        const name = localStorage.getItem('userName') || 'User';
        const position = localStorage.getItem('userPosition') || 'Position';
        navUsername.textContent = name;
        navPosition.textContent = position;
        userNameInput.value = name !== 'User' ? name : '';
        userPositionInput.value = position !== 'Position' ? position : '';
    }

    // Save user info to localStorage
    function saveUserInfo() {
        const name = userNameInput.value.trim();
        const position = userPositionInput.value.trim();
        if (name && position) {
            localStorage.setItem('userName', name);
            localStorage.setItem('userPosition', position);
            loadUserInfo();
        }
    }

    // Display current date and time
    function updateTime() {
        const now = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        currentTimeElement.textContent = now.toLocaleDateString(undefined, options) + ' ' + now.toLocaleTimeString();
    }
    setInterval(updateTime, 1000);
    updateTime();

    // Add new task
    addTaskButton.addEventListener('click', function () {
        const taskTitle = document.getElementById('task-title').value.trim();
        const taskDueDate = new Date(document.getElementById('due-date').value);
        const taskPriority = document.querySelector('input[name="priority"]:checked').value;

        if (taskTitle === '') {
            return;
        }

        const now = new Date();
        const taskTime = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();

        const taskItem = document.createElement('li');
        taskItem.innerHTML = `
            <input type="checkbox" class="task-done-checkbox">
            <div>
                <strong>${taskTitle}</strong> - ${taskPriority} priority<br>
                <small>${taskTime}</small><br>
                <small>Due: ${taskDueDate.toLocaleDateString()}</small>
            </div>
        `;

        // Check overdue 
        if (taskDueDate < now) {
            taskItem.classList.add('overdue');
            overdueTasksUL.appendChild(taskItem);
        } else {
            tasksUl.appendChild(taskItem);
        }

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function () {
            taskItem.remove();
        });

        const doneCheckbox = taskItem.querySelector('.task-done-checkbox');
        doneCheckbox.addEventListener('change', function () {
            if (doneCheckbox.checked) {
                taskItem.classList.add('completed');
                doneTasksUl.appendChild(taskItem);
            } else {
                taskItem.classList.remove('completed');
                tasksUl.appendChild(taskItem);
            }
        });

        taskItem.appendChild(deleteBtn);
        document.getElementById('task-title').value = '';
    });

    // Delete all tasks
    deleteAllTasksButton.addEventListener('click', function () {
        tasksUl.innerHTML = '';
        doneTasksUl.innerHTML = '';
        overdueTasksUL.innerHTML = '';
    });

    // Load user info on page load
    loadUserInfo();

    // Event listener for saving user info
    saveUserInfoButton.addEventListener('click', saveUserInfo);
});
