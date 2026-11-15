document.addEventListener("DOMContentLoaded", function () {
    /* ==========================================
       1. CONTACT FORM VALIDATION & EMAILJS
       ========================================== */
    const contactForm = document.getElementById("contactForm");
    const phoneInput = document.getElementById("phone");

    if (phoneInput) {
        phoneInput.addEventListener("input", function () {
            this.value = this.value.replace(/[^0-9]/g, "").slice(0, 11);
        });
    }

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            event.preventDefault();
            sendMail();
        });
    }

    /* ==========================================
       2. ACADEMIC PLANNER SYSTEM
       ========================================== */
    const taskForm27 = document.getElementById("taskForm27");
    if (taskForm27) {
        initializePlanner();
    }
});

function showFieldError(inputId, errorId, show, messageText) {
    const inputEl = document.getElementById(inputId);
    const errorEl = document.getElementById(errorId);
    if (!inputEl || !errorEl) return;

    if (show) {
        inputEl.classList.add("input-error");
        if (messageText) errorEl.textContent = messageText;
        errorEl.style.display = "block";
    } else {
        inputEl.classList.remove("input-error");
        errorEl.style.display = "none";
    }
}

function sendMail() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const statusBox = document.getElementById("formStatus");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{1,11}$/;

    let isValid = true;

    // 1. Check empty fields
    if (name === "") {
        showFieldError("name", "nameError", true, "Full Name can't be blank.");
        isValid = false;
    } else {
        showFieldError("name", "nameError", false);
    }

    // 2. Check valid email format
    if (email === "") {
        showFieldError("email", "emailError", true, "Email Address can't be blank.");
        isValid = false;
    } else if (!emailRegex.test(email)) {
        showFieldError("email", "emailError", true, "Please enter a valid email address (e.g., name@example.com).");
        isValid = false;
    } else {
        showFieldError("email", "emailError", false);
    }

    // 3. Check digits-only phone number
    if (phone === "") {
        showFieldError("phone", "phoneError", true, "Phone Number can't be blank.");
        isValid = false;
    } else if (!phoneRegex.test(phone)) {
        showFieldError("phone", "phoneError", true, "Phone number must contain digits only (1–11 numbers).");
        isValid = false;
    } else {
        showFieldError("phone", "phoneError", false);
    }

    if (subject === "") {
        showFieldError("subject", "subjectError", true, "Subject can't be blank.");
        isValid = false;
    } else {
        showFieldError("subject", "subjectError", false);
    }

    if (message === "") {
        showFieldError("message", "messageError", true, "Message can't be blank.");
        isValid = false;
    } else {
        showFieldError("message", "messageError", false);
    }

    if (!isValid) {
        if (statusBox) {
            statusBox.className = "form-status error";
            statusBox.textContent = "Please fix the highlighted fields before submitting.";
        }
        return;
    }

    const params = { name, email, message, subject, phone };
    const serviceID = "service_o5co6bs";
    const templateID = "template_1f3uz4q";

    if (statusBox) {
        statusBox.className = "form-status sending";
        statusBox.textContent = "Sending your message...";
    }

    emailjs
        .send(serviceID, templateID, params)
        .then((res) => {
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            document.getElementById("phone").value = "";
            document.getElementById("subject").value = "";

            if (statusBox) {
                statusBox.className = "form-status success";
                statusBox.textContent = "Your message was sent successfully! Thank you for reaching out.";
            }
            console.log(res);
        })
        .catch((err) => {
            if (statusBox) {
                statusBox.className = "form-status error";
                statusBox.textContent = "Failed to send message via server. Please try again later.";
            }
            console.log(err);
        });
}

/* ==========================================
   ACADEMIC PLANNER STATE & FUNCTIONS
   ========================================== */
const tasks = JSON.parse(localStorage.getItem("academicTasks")) || [
    {
        id: 1,
        name: "Complete COS 106 Practical Term Project",
        priority: "High",
        completed: false
    },
    {
        id: 2,
        name: "Review MTH 101 Functions and Domains",
        priority: "Medium",
        completed: false
    }
];

const events = JSON.parse(localStorage.getItem("academicEvents")) || [
    {
        id: 1,
        name: "COS 106 Portfolio Submission",
        date: "2026-11-20"
    },
    {
        id: 2,
        name: "Semester Mid-Term CBT Exam",
        date: "2026-11-28"
    }
];

let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("academicTasks", JSON.stringify(tasks));
}

function saveEvents() {
    localStorage.setItem("academicEvents", JSON.stringify(events));
}

function displayTasks() {
    const taskList27 = document.getElementById("taskList27");
    if (!taskList27) return;

    taskList27.innerHTML = "";
    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList27.innerHTML = `<div class="empty">No tasks found in this view.</div>`;
        return;
    }

    filteredTasks.forEach(task => {
        const taskItem = document.createElement("div");
        taskItem.className = `task-item ${task.completed ? "completed" : ""}`;

        taskItem.innerHTML = `
            <input
                type="checkbox"
                class="task-check"
                ${task.completed ? "checked" : ""}
                onchange="toggleTask(${task.id})"
                aria-label="Mark ${task.name} as completed"
            >
            <div class="task-content">
                <div class="task-name">${task.name}</div>
                <span class="task-priority priority-${task.priority}">
                    ${task.priority} Priority
                </span>
            </div>
            <button
                class="delete-btn"
                onclick="deleteTask(${task.id})"
                type="button"
                title="Delete task"
            >
                <i data-lucide="trash-2"></i>
            </button>
        `;

        taskList27.appendChild(taskItem);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function addTask(name, priority) {
    tasks.push({
        id: Date.now(),
        name: name,
        priority: priority,
        completed: false
    });
    saveTasks();
    displayTasks();
    updateStatistics();
}

function toggleTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
    }
    saveTasks();
    displayTasks();
    updateStatistics();
}

function deleteTask(id) {
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
        tasks.splice(taskIndex, 1);
    }
    saveTasks();
    displayTasks();
    updateStatistics();
}

function displayEvents() {
    const eventList27 = document.getElementById("eventList27");
    if (!eventList27) return;

    eventList27.innerHTML = "";

    if (events.length === 0) {
        eventList27.innerHTML = `<div class="empty">No academic events added yet.</div>`;
        return;
    }

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    sortedEvents.forEach(event => {
        const eventItem = document.createElement("div");
        eventItem.className = "event-item";

        eventItem.innerHTML = `
            <div class="event-date">
                <i data-lucide="calendar-days"></i>
            </div>
            <div class="event-details">
                <h3>${event.name}</h3>
                <p>${formatDate(event.date)}</p>
            </div>
            <button
                class="delete-btn"
                onclick="deleteEvent(${event.id})"
                type="button"
                title="Delete event"
            >
                <i data-lucide="trash-2"></i>
            </button>
        `;

        eventList27.appendChild(eventItem);
    });

    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }
}

function formatDate(dateString) {
    const date = new Date(dateString + "T00:00:00");
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric"
    });
}

function addEvent(name, date) {
    events.push({
        id: Date.now(),
        name: name,
        date: date
    });
    saveEvents();
    displayEvents();
    updateStatistics();
}

function deleteEvent(id) {
    const eventIndex = events.findIndex(e => e.id === id);
    if (eventIndex !== -1) {
        events.splice(eventIndex, 1);
    }
    saveEvents();
    displayEvents();
    updateStatistics();
}

function updateStatistics() {
    const totalTasksEl = document.getElementById("totalTasks27");
    const completedTasksEl = document.getElementById("completedTasks27");
    const totalEventsEl = document.getElementById("totalEvents27");
    const progressTextEl = document.getElementById("progressText27");
    const progressFillEl = document.getElementById("progressFill27");

    if (!totalTasksEl) return;

    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const eventsTotal = events.length;

    totalTasksEl.textContent = total;
    completedTasksEl.textContent = completed;
    totalEventsEl.textContent = eventsTotal;

    const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
    progressTextEl.textContent = `${progress}%`;
    progressFillEl.style.width = `${progress}%`;
}

function initializePlanner() {
    const taskForm27 = document.getElementById("taskForm27");
    const taskInput27 = document.getElementById("taskInput27");
    const taskPriority27 = document.getElementById("taskPriority27");
    const eventForm27 = document.getElementById("eventForm27");
    const eventName27 = document.getElementById("eventName27");
    const eventDate27 = document.getElementById("eventDate27");
    const filters27 = document.querySelectorAll(".filter27");

    taskForm27.addEventListener("submit", function (event) {
        event.preventDefault();
        const taskName = taskInput27.value.trim();
        if (taskName === "") return;

        addTask(taskName, taskPriority27.value);
        taskInput27.value = "";
        taskPriority27.value = "Medium";
    });

    filters27.forEach(filter => {
        filter.addEventListener("click", function () {
            filters27.forEach(btn => btn.classList.remove("active"));
            this.classList.add("active");
            currentFilter = this.dataset.filter;
            displayTasks();
        });
    });

    eventForm27.addEventListener("submit", function (event) {
        event.preventDefault();
        const eventName = eventName27.value.trim();
        const eventDate = eventDate27.value;
        if (eventName === "" || eventDate === "") return;

        addEvent(eventName, eventDate);
        eventName27.value = "";
        eventDate27.value = "";
    });

    displayTasks();
    displayEvents();
    updateStatistics();
}