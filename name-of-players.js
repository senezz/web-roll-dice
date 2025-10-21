const nextBtn = document.getElementById("next-btn")
const proceedBtn = document.getElementById("proceed-btn")
const nameOfPlayer = document.getElementById("name-of-player")

const params = new URLSearchParams(window.location.search)
let numOfPlayers = Number(params.get('inp-number-of-players'))

const isNumber = !Number.isNaN(numOfPlayers)
const isInRange = numOfPlayers >= 2 && numOfPlayers <= 4
const isValidInput = isNumber && isInRange
if (!isValidInput) {
    numOfPlayers = 2
}
    
nextBtn.addEventListener("click", onNextClick)
proceedBtn.addEventListener('click', onProceedBtn)

let namesOfPlayers = []
function onNextClick() {
    namesOfPlayers.push(nameOfPlayer.value)
    nameOfPlayer.value = ""
    if (namesOfPlayers.length === numOfPlayers - 1) {
        nextBtn.classList.add('hidden')
        proceedBtn.classList.remove('hidden')
    }
}

function onProceedBtn() {
    sessionStorage.setItem('namesOfPlayers', JSON.stringify(namesOfPlayers))
    sessionStorage.getItem('namesOfPlayers')
}