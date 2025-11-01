let winner = JSON.parse(sessionStorage.getItem("winner"))
console.log({winner})
const winnerNameLbl = document.getElementById("winnerName")
winnerNameLbl.innerText = `${winner.name} (${winner.score} points)`