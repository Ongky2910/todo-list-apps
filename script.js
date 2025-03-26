document.addEventListener('DOMContentLoaded', function () {
    const tasksUl = document.getElementById('tasks');
    const doneTasksUl = document.getElementById('done-tasks');
    const overdueTasksUl = document.getElementById('overdue-tasks');
    const addTaskButton = document.getElementById('add-task');
    const deleteAllTasksButton = document.getElementById('delete-all-tasks');
    const currentTimeElement = document.getElementById('current-time');
    const userNameInput = document.getElementById('profile-name');
    const userPositionInput = document.getElementById('profile-role');
    const saveUserInfoButton = document.getElementById('save-profile');
    const navUsername = document.getElementById('nav-username');
    const navPosition = document.getElementById('nav-position');
    const roleElement = document.getElementById("user-role");
    const avatar = document.getElementById("user-avatar");

    // Cek apakah elemen role ada sebelum mengambil textContent
    const role = roleElement ? roleElement.textContent.trim() : "Default";

    // Avatar berdasarkan role
    const avatarMap = {
    "manager": "assets/project-manager.png", 
    "frontend": "assets/frontend.png", 
    "backend": "assets/development.png", 
    "uidesigner": "assets/ui-design.png",
    "uxdesigner": "assets/ux-designer.png", 
    "default": "https://cdn-icons-png.flaticon.com/128/847/847969.png" // Generic User
    };

    // Cek role, set avatar jika elemen avatar ada
    if (avatar) {
        avatar.src = avatarMap[role] || avatarMap["Default"];
    }

    // Load user info from localStorage
    function loadUserInfo() {
        const name = localStorage.getItem('userName') || 'User';
        const position = localStorage.getItem('userPosition') || '';
        console.log("Stored User Position in localStorage:", localStorage.getItem('userPosition'));

        console.log("User Position:", position);

        if (navUsername) navUsername.textContent = name;
        if (userNameInput) userNameInput.value = name !== 'User' ? name : '';

        if (navPosition) navPosition.textContent = position || 'Position';
        if (userPositionInput) userPositionInput.value = position || '';

        avatar.src = avatarMap[position] || avatarMap["default"];

        console.log("Avatar Map Key:", Object.keys(avatarMap));
console.log("Avatar Chosen:", avatarMap[position] || avatarMap["default"]);

    }

    // Save user info to localStorage
    function saveUserInfo() {
        const name = userNameInput.value.trim();
        const position = userPositionInput.value.trim();
        
        if (name && position) {
            localStorage.setItem('userName', name);
            localStorage.setItem('userPosition', position);
            
            loadUserInfo();
            window.location.hash = "#user-info";
            
            // Show success message
            const confirmationMessage = document.getElementById('confirmation-message');
            if (confirmationMessage) {
                confirmationMessage.textContent = "Profile updated successfully!";
                confirmationMessage.style.display = "block";
                confirmationMessage.style.opacity = "1";
    
                setTimeout(() => {
                    confirmationMessage.style.opacity = "0";
                    setTimeout(() => {
                        confirmationMessage.style.display = "none";
                    }, 500);
                }, 3000);
            }
        }
    }
    

    // Display current date and time
    function updateDateTime() {
        const now = new Date();

        // Format Tanggal
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' };
        const formattedDate = now.toLocaleDateString('en-GB', optionsDate);

        // Format Waktu (12 jam dengan AM/PM)
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const formattedTime = now.toLocaleTimeString('en-US', optionsTime);

        // Update elemen yang menampilkan tanggal & waktu
        const dateTimeElement = document.getElementById('date-time');
        if (dateTimeElement) {
            dateTimeElement.innerHTML = `<i class="fa-regular fa-calendar"></i> ${formattedDate} - <i class="fa-regular fa-clock"></i> ${formattedTime}`;
        }

        const dateElement = document.getElementById("current-date");
        if (dateElement) dateElement.textContent = formattedDate;

        if (currentTimeElement) currentTimeElement.textContent = formattedTime;
    }

    // Jalankan setiap detik
    setInterval(updateDateTime, 1000);
    updateDateTime();

    // Add new task
    if (addTaskButton) {
        addTaskButton.addEventListener('click', function () {
            const taskTitle = document.getElementById('task-title').value.trim();
            const taskDueDate = new Date(document.getElementById('due-date').value);
            const taskPriority = document.querySelector('input[name="priority"]:checked')?.value;

            if (!taskTitle || isNaN(taskDueDate)) return;

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
                overdueTasksUl.appendChild(taskItem);
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
    }

    // Delete all tasks
    if (deleteAllTasksButton) {
        deleteAllTasksButton.addEventListener('click', function () {
            tasksUl.innerHTML = '';
            doneTasksUl.innerHTML = '';
            overdueTasksUl.innerHTML = '';
        });
    }

    // Load user info on page load
    loadUserInfo();

    // Event listener for saving user info
    if (saveUserInfoButton) {
        saveUserInfoButton.addEventListener('click', saveUserInfo);
    }
});
