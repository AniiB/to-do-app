console.log('Hey its working')

const checkMarks = document.querySelectorAll('.fa-check')
const undoMarks = document.querySelectorAll('.fa-rotate-left')

checkMarks.forEach(check => check.addEventListener('click', markAsDone))
undoMarks.forEach(undo => undo.addEventListener('click', markUndone))
async function markAsDone(event) {
    let task = event.target.parentElement.previousElementSibling.outerText

    let response = await fetch('/markdone', {
        method: 'put',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({task})
    })
    let data = await response.json()
    console.log(data)
    location.reload()

}

async function markUndone(event) {
    let task = event.target.parentElement.previousElementSibling.outerText

    let response = await fetch('/markundone', {
        method: 'put',
        headers : { 'Content-Type' : 'application/json' },
        body : JSON.stringify({task})
    })
    let data = await response.json()
    console.log(data)
    location.reload()

}