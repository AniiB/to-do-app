const checkMarks = document.querySelectorAll('.fa-check')
const undoMarks = document.querySelectorAll('.fa-rotate-left')
const deleteMarks = document.querySelectorAll('.fa-xmark')
const reset = document.querySelector('.reset')

checkMarks.forEach(check => check.addEventListener('click', markAsDone))
undoMarks.forEach(undo => undo.addEventListener('click', markUndone))
deleteMarks.forEach(del => del.addEventListener('click', deleteTask))
reset.addEventListener('click', deleteAllTasks)

async function markAsDone(event) {
    try {
        let task = event.target.parentElement.previousElementSibling.outerText

        let response = await fetch('/markdone', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        let data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.error(error)
    }


}

async function markUndone(event) {
    try {
        let task = event.target.parentElement.previousElementSibling.outerText

        let response = await fetch('/markundone', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        let data = await response.json()
        console.log(data)
        location.reload()
    } catch (error) {
        console.error(error)
    }


}

async function deleteTask(event) {
    try {
        let task = event.target.parentElement.previousElementSibling.outerText

        let response = await fetch('/deletetask', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ task })
        })
        let data = await response.json()
        console.log(data)
        location.reload()

    } catch (error) {
        console.error(error)
    }

}

async function deleteAllTasks() {
    try {
        let response = await fetch('/deleteall', {
            method: 'delete',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({})
        })
        let data = await response.json()
        console.log(data)
        location.reload()

    } catch (error) {
        console.error(error)
    }

}