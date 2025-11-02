import { gotoPage } from "./helper.js"

const menuBtn = document.querySelector(".menu-btn")
let winner = JSON.parse(sessionStorage.getItem("winner"))
console.log({winner})
const winnerNameLbl = document.getElementById("winnerName")
winnerNameLbl.innerText = `${winner.name} (${winner.score} points)`

menuBtn.addEventListener("click", backToMenuBtn)

function backToMenuBtn() {
gotoPage("index.html")
}