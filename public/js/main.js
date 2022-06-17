console.log('Hey its working')

const checkMarks = document.querySelectorAll('.fa-check')

checkMarks.forEach(check => check.addEventListener('click', markAsDone))

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