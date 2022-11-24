// const menu = document.querySelector(".navmenu")
// // const nav = document.querySelector(".nav")

// menu.addEventListener('click', menuCall);

// function menuCall(e) {
//     e.preventDefault();
//     menu.classList.toggle('tab');
// }

const toggle = document.querySelector('.toggle')

toggle.addEventListener('click', (e) => {
    const html = document.querySelector('html')
    if(html.classList.contains('dark')) {
        html.classList.remove('dark')
        e.target.innerHTML = 'Dark mode'
    } else {
        html.classList.add('dark')
        e.target.innerHTML = 'Light mode'
    }
})

const timeEl = document.querySelector('.time')
const dateEl = document.querySelector('.date')

const day = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", 
"Friday", "Suturday"];

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", 
"Sep", "Oct", "Nov", "Dec"];

function setTime() {
    const time = new Date();
    const hours = time.getHours();
    const month = time.getMonth();
    const days = time.getDay();
    const date = time.getDate();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();


    timeEl.innerHTML = `${hours}:${minutes < 10 ? `0${minutes}`: minutes}`
    dateEl.innerHTML = `${day[days]}, ${months[month]} <span
    class="circle">${date}</span>`
}

setTime()

const form = document.getElementById('form')
const input = document.getElementById('input')
const todosUL = document.getElementById('todos')

const todos = JSON.parse(localStorage.getItem('todos'))

if(todos) {
    todos.forEach(todo => addTodo(todo))
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    addTodo()
})

function addTodo(todo) {
    let todoText = input.value

    if(todo) {
        todoText = todo.text
    }

    if(todoText) {
        const todoEl = document.createElement('li')
        if(todo && todo.completed) {
            todoEl.classList.add('completed')
        }

        todoEl.innerText = todoText

        todoEl.addEventListener('click', () => {
            todoEl.classList.toggle('completed')
            updateLS()
        })

        todoEl.addEventListener('contextmenu', (e) => {
            e.preventDefault()

            todoEl.remove()
            updateLS()
        })

        todosUL.appendChild(todoEl)

        input.value = ''

        updateLS()
    }
}

function updateLS() {
    todosEl = document.querySelectorAll('li')

    const todos = []

    todosEl.forEach(todoEl => {
        todos.push({
            text: todoEl.innerText, 
            completed: todoEl.classList.contains('completed')
        })

    })

    localStorage.setItem('todos', JSON.stringify(todos))
}
