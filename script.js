// Get references to the form, input field, and unordered list
const form = document.getElementById("form");
const input = document.getElementById("input");
const todosUL = document.getElementById("todos");

// Retrieve the todos from local storage and display them on the page
const todos = JSON.parse(localStorage.getItem("todos"));

if (todos) {
    todos.forEach((todo) => {
        addTodo(todo);
    });
}

// Add a listener to the form to handle adding new todos
form.addEventListener("submit", (e) => {
    e.preventDefault();

    addTodo();
});

// Define a function to add a new todo to the list
function addTodo(todo) {
    let todoText = input.value;

    if (todo) {
        todoText = todo.text;
    }

    if (todoText) {
        // Create a new list item element for the todo
        const todoEl = document.createElement("li");

        // If the todo is already completed, add a class to the element
        if (todo && todo.completed) {
            todoEl.classList.add("completed");
        }

        // Set the text content of the element to the todo text
        todoEl.innerText = todoText;

        // Add event listeners to toggle the completed class and delete the todo
        todoEl.addEventListener("click", () => {
            todoEl.classList.toggle("completed");

            updateLS();
        });

        todoEl.addEventListener("contextmenu", (e) => {
            e.preventDefault();

            todoEl.remove();

            updateLS();
        });

        // Append the new todo element to the unordered list
        todosUL.appendChild(todoEl);

        // Clear the input field
        input.value = "";

        // Update local storage with the new todo
        updateLS();
    }
}

// Define a function to update local storage with the current list of todos
function updateLS() {
    const todosEl = document.querySelectorAll("li");

    const todos = [];

    // Iterate over each todo element and add its text and completed status to the todos array
    todosEl.forEach((todoEl) => {
        todos.push({
            text: todoEl.innerText,
            completed: todoEl.classList.contains("completed"),
        });
    });

    // Save the todos array to local storage as a JSON string
    localStorage.setItem("todos", JSON.stringify(todos));
}
