document.addEventListener('DOMContentLoaded', function () {
    const tasksUl = document.getElementById('tasks');
    const doneTasksUl = document.getElementById('done-tasks');
    const overdueTasksUL = document.getElementById('overdue-tasks');
    const addTaskButton = document.getElementById('add-task');
    const deleteAllTasksButton = document.getElementById('delete-all-tasks');
    const currentTimeElement = document.getElementById('current-time');
    const userNameInput = document.getElementById('profile-name');
    const userPositionInput = document.getElementById('profile-role');
    const saveUserInfoButton = document.getElementById('save-profile');
    const navUsername = document.getElementById('nav-username');
    const navPosition = document.getElementById('nav-position');
    const role = document.getElementById("user-role").textContent.trim(); 
    const avatar = document.getElementById("user-avatar");
  
    // Avatar berdasarkan role
  const avatarMap = {
    "Frontend Developer": "https://cdn-icons-png.flaticon.com/128/1995/1995415.png", // Laptop
    "Backend Developer": "https://cdn-icons-png.flaticon.com/128/2875/2875112.png", // Gear
    "UI/UX Designer": "https://cdn-icons-png.flaticon.com/128/1995/1995489.png", // Palette
    "Manager": "https://cdn-icons-png.flaticon.com/128/3135/3135731.png", // Business Suit
    "Default": "https://cdn-icons-png.flaticon.com/128/847/847969.png" // Generic User
};

// Cek role, set avatar
avatar.src = avatarMap[role] || avatarMap["Default"];
});

    // Load user info from localStorage
    function loadUserInfo() {
        const name = localStorage.getItem('userName') || 'User';
        const position = localStorage.getItem('userPosition') || '';

        navUsername.textContent = name;
        userNameInput.value = name !== 'User' ? name : '';
    
        navPosition.textContent = position || 'Position';
        if (position) {
            userPositionInput.value = position;
        }
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
    
            // Show notification success
            const confirmationMessage = document.getElementById('confirmation-message');
            confirmationMessage.textContent = "Profile updated successfully!";
            confirmationMessage.style.display = "block";
            confirmationMessage.style.opacity = "1";
    
            // Remove after 3 seconds
            setTimeout(() => {
                confirmationMessage.style.opacity = "0";
                setTimeout(() => {
                    confirmationMessage.style.display = "none";
                }, 500);
            }, 3000);
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
    
        const timeElement = document.getElementById("current-time");
        if (timeElement) timeElement.textContent = formattedTime;
    }
    
    // Jalankan setiap detik
    setInterval(updateDateTime, 1000);
    updateDateTime();
    
    

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
