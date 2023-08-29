class MIST {
    constructor() {
        this.current_task = null;
        this.question_counter = 0;
        this.delay_time = 500;
        this.time_limit = 10;
        this.timer_running = false;
        this.timer_id = null;
        this.difficulty = 5;
        this.time_left = this.time_limit;

        this.tasks = [
            ["6 - 6", 0],
            ["5 - 3", 2],
            ["9 - 3", 6],
            ["6 - 15/5", 3],
            ["4 * 12 - 48", 0],
            ["55 - 12 * 4", 7],
            ["65 - 61 + 4", 8],
            ["59 + 1 - 56", 4],
            ["13 - 44 * 20/88", 3],
            ["35 + 52 - 40 - 44", 3],
            ["55/45/11 * 72", 8],
            ["55 * 14/55 - 14", 0],
            ["91 - 81 - 37/37", 9]
        ];

        this.shuffleTasks();

        this.initUI();
        this.generateAndShowTask();
    }

    shuffleTasks() {
        for (let i = this.tasks.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.tasks[i], this.tasks[j]] = [this.tasks[j], this.tasks[i]];
        }
    }

    generateTask() {
        const taskDetails = this.tasks.pop();
        return {
            question: `${taskDetails[0]} = ?`,
            answer: taskDetails[1]
        };
    }

    submitResponse(response) {
        this.timer_running = false;
        clearTimeout(this.timer_id);
        const feedback = this.current_task.answer == response ? "Correct" : "Incorrect";
        const feedbackLabel = document.getElementById("feedback-label");
        feedbackLabel.textContent = `Response: ${response} (${feedback})`;
        feedbackLabel.style.color = feedback === "Correct" ? "green" : "red";
    
        this.question_counter++;
    
        if (this.question_counter === 1) {
            const performanceLabel = document.getElementById("performance-label");
            performanceLabel.textContent = "Your performance is 10% worse than the average.";
        }
    
        if (this.question_counter < 13) {
            setTimeout(() => this.generateAndShowTask(), this.delay_time);
        } else {
            alert("You have completed 13 questions. The program will now exit.");
            window.close(); // Or any other ending behavior you prefer
        }
    }    

    generateAndShowTask() {
        this.current_task = this.generateTask();
        const taskLabel = document.getElementById("task-label");
        taskLabel.textContent = this.current_task.question;

        const feedbackLabel = document.getElementById("feedback-label");
        feedbackLabel.textContent = '';
        feedbackLabel.style.color = "black";

        this.startTimer();
    }

    initUI() {
        // Setup timer display
        this.timerLabel = document.getElementById("timer-label");
        this.timerLabel.textContent = "Time: " + this.time_limit + "s";
    
        // Setup the task display
        this.taskLabel = document.getElementById("task-label");
        this.taskLabel.textContent = "";
    
        // Setup feedback display
        this.feedbackLabel = document.getElementById("feedback-label");
        this.feedbackLabel.textContent = "";
    
        // Setup performance message based on difficulty
        const performanceLabel = document.getElementById("performance-label");
        if (this.difficulty <= 5) {
            performanceLabel.textContent = " ";
        } else {
            performanceLabel.textContent = " ";
        }
    
        const dialButtons = document.querySelectorAll(".dial-button");
        const circleRadius = 100; // Set the radius of the circle
        const totalButtons = dialButtons.length;
        
        dialButtons.forEach((button, index) => {
            const angle = (360 / totalButtons) * index;
            const radians = (angle * Math.PI) / 180;
            const x = circleRadius * Math.cos(radians);
            const y = circleRadius * Math.sin(radians);

            button.style.left = `calc(50% + ${x}px)`;
            button.style.top = `calc(50% + ${y}px)`;
            
            button.addEventListener("click", () => {
                this.submitResponse(parseInt(button.value));
            });
        });
    }

    startTimer() {
        if (this.difficulty === 5 && !this.timer_running) {
            this.timer_running = true;
            this.time_left = this.time_limit;
            this.updateTimer();
        }
    }

    updateTimer() {
        const timerLabel = document.getElementById("timer-label");
        timerLabel.textContent = `Time left: ${this.time_left}s`;

        if (this.timer_running) {
            this.time_left--;
            if (this.time_left <= 0) {
                this.submitResponse("Timeout");
                this.timer_running = false;
            } else {
                clearTimeout(this.timer_id);
                this.timer_id = setTimeout(() => this.updateTimer(), 1000);
            }
        }
    }
}

document.addEventListener("DOMContentLoaded", () => {
    new MIST();
});
