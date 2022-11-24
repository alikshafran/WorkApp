const addBtn = document.getElementById('add')
const notePost = document.querySelector('.notes-block')
const currentNotes = JSON.parse(localStorage.getItem('notes'))

addBtn.addEventListener('click', () => addNewNote())

if(currentNotes) {
    currentNotes.forEach(note => addNewNote(note))
}

function addNewNote(text = '') {
    const note = document.createElement('div')
    note.classList.add('note')

    note.innerHTML = `
        <div class="tools">
            <button class="edit"><i class="fa fa-edit"></i></button>
            <button class="delete"><i class="fa fa-trash-o"></i></button>
        </div> 

        <div class="main ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}"></textarea>
        `
        const editBtn = note.querySelector('.edit')
        const deleteBtn = note.querySelector('.delete')
        const main = note.querySelector('.main')
        const textArea = note.querySelector('textarea')

        textArea.value = text
        main.innerHTML = text



        deleteBtn.addEventListener('click', () => {
            note.remove()

            updateLS()
        })

        editBtn.addEventListener('click', () => {
            main.classList.toggle('hidden')
            textArea.classList.toggle('hidden')


        })

        textArea.addEventListener('input', (e) => {
            const {value} = e.target

            main.innerHTML = value

            updateLS()
        })


        notePost.appendChild(note)
}

function updateLS() {
    const notesText = document.querySelectorAll('textarea')
    const notes = []

    notesText.forEach(note => {
        notes.push(note.value)
    })
    localStorage.setItem('notes', JSON.stringify(notes))
    console.log('notes --->',notes);
}
