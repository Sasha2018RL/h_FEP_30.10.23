const formEl = document.querySelector('#create-todo-item');
const inputEl = document.querySelector('.js-add-todo');
const listEl = document.querySelector('.js-todo-list');

let allTodos = [];

// Restore from localStorage
if (localStorage.getItem('todo')) {
    allTodos = JSON.parse(localStorage.getItem('todo'));

    for (const item of allTodos) {
        addTodoToList(item);
    }
}

/**
 * Add todo item to the list
 * @param {*} todoItem - text for task
 */
function addTodoToList(todoItem) {
    const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center ${todoItem.status === 'completed' ? 'bg-secondary' : ''}">
            <input 
                class="form-check-input me-1" 
                type="checkbox" value="" 
                id="${todoItem.id}" 
                ${todoItem.status==="completed" ? "checked disabled" : ""}
            >
            <label class="form-check-label" for="${todoItem.id}">${todoItem.text}</label>
            <div>
                <button class="btn btn-sm btn-info" data-taskId="${todoItem.id}" onclick="editTask(this)">Edit</button>
                <button class="btn btn-sm btn-primary" data-taskId="${todoItem.id}" onclick="removeTask(this)">Del</button>
            </div>
        </li>
    `;
    listEl.innerHTML += html;
    inputEl.value = '';
}

/**
 * Complete task
 * @param {*} target - checkbox item element
 */
function completeTask(target) {
    const taskId = Number(target.id);
    target.setAttribute('disabled', true);

    target.parentElement.classList.add('bg-secondary');

    allTodos.forEach((todoItem) => {
        if (todoItem.id === taskId) {
            todoItem.status = 'completed';
        }
    });

    // save to localStorage
    localStorage.setItem('todo', JSON.stringify(allTodos));
}

/**
 * Edit task
 * @param {*} target - edit button item element
 */
function editTask(target) {
    const taskId = Number(target.getAttribute('data-taskId'));

    allTodos.forEach((todoItem) => {
        if (todoItem.id === taskId) {
            inputEl.value = todoItem.text;
            inputEl.setAttribute('edit-task-id', taskId.toString());
        }
    });
}

/**
 * Remove task
 * @param {*} target - delete button item element
 */
function removeTask(target) {
    const taskId = Number(target.getAttribute('data-taskId'));
    const parent = target.parentElement.parentElement;

    allTodos.forEach((todoItem) => {
        if (todoItem.id === taskId) {
            allTodos.splice(allTodos.indexOf(todoItem), 1);
        }
    });

    // save to localStorage
    localStorage.setItem('todo', JSON.stringify(allTodos));

    parent.remove();
}

// Form submit
formEl.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoItemText = inputEl.value;
    const edit_task_id = inputEl.getAttribute('edit-task-id');

    if(edit_task_id){
        inputEl.removeAttribute('edit-task-id');
        const taskId = Number(edit_task_id);

        allTodos.forEach((todoItem) => {
            if (todoItem.id === taskId) {
                todoItem.text = inputEl.value;
                todoItem.status = 'active';

                const label = document.querySelector(`label[for="${taskId}"]`);
                const input = document.getElementById(edit_task_id);
                input.removeAttribute('disabled');
                input.removeAttribute('checked');
                input.parentElement.classList.remove('bg-secondary');

                if (label){
                    label.innerText = todoItem.text;
                }
            }
        });

        inputEl.value = '';

        localStorage.setItem('todo', JSON.stringify(allTodos));

        return;
    }

    const existingTodoItem = allTodos.filter((item) => item.text === todoItemText);

    if (!existingTodoItem.length) { // change checking
        const todoItem = {
            id: new Date().getTime(),
            text: todoItemText,
            status: 'active'
        };

        addTodoToList(todoItem);

        allTodos.push(todoItem);

        // save to localStorage
        localStorage.setItem('todo', JSON.stringify(allTodos));
    } else {
        alert('This todo is already in the list');
    }
});

// List item click
listEl.addEventListener('click', (e) => {
    console.dir(e.target)
    if (e.target.tagName === 'INPUT') {
        // Complete task
        completeTask(e.target);
    }
});
