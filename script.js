document.addEventListener("DOMContentLoaded", function () {
    let taskCompletedElement = document.getElementById("completed_task");
    let taskAssignedElement = document.getElementById("assigned_task");
    let taskCompleted = parseInt(taskCompletedElement.innerText);
    let taskAssigned = parseInt(taskAssignedElement.innerText);
    let activityLog = document.getElementById("activity");
    let day=document.querySelector(".day");
    let date=document.querySelector(".date");
    let changeColor=document.getElementById("color-wheel-btn");
    let clearHistoryBtn = document.getElementById("clear-history-btn");

    //color change
    changeColor.addEventListener("click", changeBackgroundColor);

    function changeBackgroundColor() {
        const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        document.body.style.backgroundColor = randomColor;
    }

    // Set current date
    let currentDate = new Date();
    let options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let dateParts = currentDate.toLocaleDateString('en-US', options).replace(',', '').split(' ');
    day.innerText = `${dateParts[0]},`;
    date.innerText = `${dateParts[1]} ${dateParts[2]} ${dateParts[3]}`;


    // Function to handle task completion
    function completeTask(event) {
        let button = event.target;
        let taskCard = button.closest(".shadow-lg");
        let taskTitle = taskCard.querySelector("h3").innerText;

        if (!button.disabled) {
            //alert
            alert(`Task "${taskTitle}" marked as completed!`);

            // Update Count
            if (taskAssigned > 0) {
                taskAssigned -= 1; // Decrease Task Assigned
                taskAssignedElement.innerText = taskAssigned;
            }
            taskCompleted += 1; // Increase Task Completed
            taskCompletedElement.innerText = taskCompleted;

            // Disable
            button.disabled = true;
            button.classList.add("opacity-50", "cursor-not-allowed");

            // Add activity
            let logEntry = document.createElement("p");
            logEntry.innerText = `You have successfully completed ${taskTitle} at time ${new Date().toLocaleTimeString()}`;
            logEntry.classList.add("text-sm", "text-gray-700", "mt-2", "p-2", "rounded");
            activityLog.appendChild(logEntry);
        }
    }
    clearHistoryBtn.addEventListener("click", clearActivityLog);
    function clearActivityLog() {
        activityLog.innerHTML = "";
    }

    // Attach event listeners to all "Completed" buttons
    let completeButtons = document.querySelectorAll(".complete-btn");
    completeButtons.forEach(button => {
        button.addEventListener("click", completeTask);
    });
});
