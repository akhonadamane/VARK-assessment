// Questions and options
const questions = [
    {
        question: "If you are learning how to cook, what works for you?",
        options: [
            "A) Watching a video of the steps.",
            "B) Listening to someone explain the recipe.",
            "C) Reading the recipe.",
            "D) Cooking and tasting the food yourself."
        ]
    },
    {
        question: "When solving a problem, what helps you most?",
        options: [
            "A) Seeing a flowchart or diagram.",
            "B) Hearing someone explain it.",
            "C) Reading step-by-step instructions.",
            "D) Trying it yourself."
        ]
    },
    {
        question: "How do you remember things best?",
        options: [
            "A) By drawing pictures or looking at images.",
            "B) By repeating the information out loud.",
            "C) By writing it down and reviewing it.",
            "D) By using it in a real-life situation."
        ]
    },
    {
        question: "How do you prefer to remember your homework tasks?",
        options: [
            "A) Writing them on a colorful planner.",
            "B) Saying them out loud to yourself.",
            "C) Writing a list in your notebook.",
            "D) Associating them with something you did in class."
        ]
    },
    {
        question: "If you want to learn more about something, what do you do?",
        options: [
            "A) Look at pictures or diagrams.",
            "B) Talk to someone about it.",
            "C) Read about it or write notes.",
            "D) Try it out yourself."
        ]
    },
    {
        question: "When your facilitator/teacher explains something, what do you focus on?",
        options: [
            "A) Watching them write or draw on the board.",
            "B) Listening to their voice.",
            "C) Reading notes on the topic.",
            "D) Doing the task they are explaining."
        ]
    },
    {
        question: "When working on a project, what helps you organize your ideas?",
        options: [
            "A) Drawing a mind map or flowchart.",
            "B) Talking about your ideas with others.",
            "C) Writing out a list or plan.",
            "D) Building or creating something related to the project."
        ]
    },
    {
        question: "How do you prefer to learn about different cultures in South Africa?",
        options: [
            "A) Looking at traditional clothing or pictures.",
            "B) Listening to someone talk about the culture.",
            "C) Reading stories about the culture.",
            "D) Reading stories about the culture."
        ]
    },
    {
        question: "When working in a group, how do you contribute best?",
        options: [
            "A) Creating a colorful presentation.",
            "B) Explaining ideas aloud to others.",
            "C) Writing down ideas and sharing them.",
            "D) Building or demonstrating the ideas."
        ]
    },
    {
        question: "What do you enjoy most about learning?",
        options: [
            "A) Drawing or looking at pictures of what I learn.",
            "B) Listening to someone explain new things.",
            "C) Reading books and writing notes.",
            "D) Doing activities like building or role-playing."
        ]
    },

];

// Store user answers
let userAnswers = [];

// Start the quiz
function startQuiz() {
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();

    if (!name || !age) {
        alert("Please enter your name and age to begin.");
        return;
    }

    document.getElementById("intro-section").style.display = "none";
    document.getElementById("quiz-section").style.display = "block";

    loadQuestions();
}

// Load questions dynamically with horizontal lines
function loadQuestions() {
    const questionsContainer = document.getElementById("questions-container");
    questionsContainer.innerHTML = ""; // Clear any existing content

    questions.forEach((q, index) => {
        // Build the question HTML with a horizontal line
        const questionHTML = `
            <div class="question">
                <p><strong>${index + 1}. ${q.question}</strong></p>
                ${q.options.map((option, i) => `
                    <label>
                        <input type="radio" name="question_${index}" value="${option.charAt(0)}" required>
                        ${option}
                    </label>
                `).join('')}
            </div>
            ${index < questions.length - 1 ? '<hr>' : ''} <!-- Add an <hr> except after the last question -->
        `;

        questionsContainer.insertAdjacentHTML("beforeend", questionHTML);
    });
}


// Handle form submission
document.getElementById("quiz-form").addEventListener("submit", function(event) {
    event.preventDefault();

    userAnswers = [];
    questions.forEach((_, index) => {
        const answer = document.querySelector(`input[name="question_${index}"]:checked`);
        if (answer) userAnswers.push(answer.value);
    });

    displayResults();
});

// Calculate and display results
function displayResults() {
    const resultSection = document.getElementById("result-section");
    const quizSection = document.getElementById("quiz-section");
    quizSection.style.display = "none";
    resultSection.style.display = "block";

    // Count answers
    const counts = { A: 0, B: 0, C: 0, D: 0 };
    userAnswers.forEach(answer => counts[answer]++);

    // Determine learning style
    let result = "";
    let tips = [];
    const maxAnswer = Math.max(counts.A, counts.B, counts.C, counts.D);

    if (counts.A === maxAnswer) {
        result = "Visual Learner";
        tips = ["Use diagrams, charts, and videos.", "Highlight important information with colors."];
    } else if (counts.B === maxAnswer) {
        result = "Auditory Learner";
        tips = ["Discuss concepts with others.", "Listen to podcasts or recorded lectures."];
    } else if (counts.C === maxAnswer) {
        result = "Reading/Writing Learner";
        tips = ["Take detailed notes.", "Read and rewrite material to reinforce learning."];
    } else if (counts.D === maxAnswer) {
        result = "Kinesthetic Learner";
        tips = ["Engage in hands-on activities.", "Use physical objects or role-playing to learn."];
    }

    // Display result
    document.getElementById("result-text").innerText = `Your learning style is: ${result}`;
    document.getElementById("learning-tips").innerHTML = tips.map(tip => `<li>${tip}</li>`).join('');
}

// Reset the quiz
function resetQuiz() {
    document.getElementById("result-section").style.display = "none";
    document.getElementById("intro-section").style.display = "block";
    document.getElementById("name").value = "";
    document.getElementById("age").value = "";
}
