document.addEventListener('DOMContentLoaded', function () {
    const tasksUl = document.getElementById('tasks');
    const doneTasksUl = document.getElementById('done-tasks');
    const overdueTasksUL = document.getElementById('overdue-tasks');
    const addTaskButton = document.getElementById('add-task');
    const deleteAllTasksButton = document.getElementById('delete-all-tasks');
    const currentTimeElement = document.getElementById('current-time');

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

        console.log("Task Item Created:", taskItem);

        //check overdue 
        if (taskDueDate < now) {
            taskItem.classList.add('overdue');
            overdueTasksUL.appendChild(taskItem);
            console.log("Task is overdue. Added to overdue tasks.");
        } else {
            tasksUl.appendChild(taskItem);
            console.log("Task added to regular tasks.");
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
});



