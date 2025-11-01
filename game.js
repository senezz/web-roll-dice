const rollForPlayerBtn = document.getElementById("rollForPlayerBtn")

const namesOfPlayersString = sessionStorage.getItem('namesOfPlayers')
const namesOfPlayers = JSON.parse(namesOfPlayersString)
console.log(namesOfPlayers)
const players = namesOfPlayers.map(thisName => ({
    name: thisName,
    score: 0
}))
console.log(players)

const GAME = {
    MAX_ROUNDS: 7,  // max rounds
    ROUND: 0,       // current round
    TURN: 0,        // index of player
}
rollForPlayerBtn.addEventListener('click', nextTurn)

function getRolledDice() {
    let firstDie = Math.ceil(Math.random() * 6)
    let secondDie = Math.ceil(Math.random() * 6)
    return [firstDie, secondDie]
}


// rolledDice = [3, 1]
function getRolledDiceValue(rolledDice) {
   return rolledDice[0] + rolledDice[1]
}

function updatePlayerScore(player, value) {
    player.score += value
    updatePlayerTable(value)
}

function updatePlayerTable(value) {
    const playerTable = document.getElementById("players-table")
    const tbody = playerTable.getElementsByTagName('tbody')[0]
    const totalVals = tbody.querySelectorAll('.total-val')

    const currTotal = Number(totalVals[GAME.TURN].innerText)
    totalVals[GAME.TURN].innerText = currTotal + value

    const rows = tbody.querySelectorAll('TR')
    const playerRow = rows[GAME.TURN]
    const cells = playerRow.querySelectorAll('TD')
    const currentCell = cells[Math.min(2, GAME.ROUND)]
    currentCell.innerText = value
}

// dice = [3, 1]
function updateDiceImages(dice) {
    const diceImg = document.getElementsByClassName("dice-img")
    diceImg[0].src = `./assets/DICE_${dice[0]}.svg`
    diceImg[1].src = `./assets/DICE_${dice[1]}.svg`
}

function updateScore(rolledDiceValue) {
    const score = document.getElementById("num-score")
    score.innerText = rolledDiceValue
}

function nextTurn() {
    let rolledDice = getRolledDice()
    updateDiceImages(rolledDice)
    let rolledDiceValue = getRolledDiceValue(rolledDice)
    updateScore(rolledDiceValue)
    updatePlayerScore(players[GAME.TURN], rolledDiceValue)

    GAME.TURN++
    if (GAME.TURN >= players.length) {
        nextRound()
    }
    rollForPlayerBtn.innerText = `Roll for ${players[GAME.TURN].name}`
}

function updatePlayerRoundTable() {
    const playerTable = document.getElementById("players-table")
    const tbody = playerTable.getElementsByTagName('tbody')[0]
    const rows = tbody.querySelectorAll('TR')
    for (const row of rows) {
        const cells = row.querySelectorAll('TD')
        const firstCell = cells[0]
        const preLastCell = cells[cells.length - 2]
        preLastCell.insertAdjacentHTML('afterend', `<td>-</td>`)
        firstCell.remove()
    }

    const thead = playerTable.getElementsByTagName('thead')[0]
    const roundCols = thead.querySelectorAll('.round-cols')
    const firstRoundCol = roundCols[0]
    const lastRoundCol = roundCols[roundCols.length - 1]
    const newRoundCol = `<th class="round-cols" scope="col">R${GAME.ROUND + 1}</th>`
    lastRoundCol.insertAdjacentHTML("afterend", newRoundCol)
    firstRoundCol.remove()
}

function nextRound() {
    GAME.TURN = 0
    GAME.ROUND++
    // 0-indexed round numeration (+1)
    if (GAME.ROUND + 1 > GAME.MAX_ROUNDS) {
        announceWinner()
    } else {
        if (GAME.ROUND > 2) updatePlayerRoundTable()
    }
}

function getWinner() {
    let winner = players[0]
    for (const player of players) {
        if (player.score > winner.score){
            winner = player
        }
    }

    return winner
}

function gotoPage(pageName) {
    const paths = window.location.pathname.split('/')
    paths[paths.length - 1] = pageName
    window.location.pathname = paths.join('/')
}

function announceWinner() {
    const winner = getWinner()
    sessionStorage.setItem("winner", JSON.stringify(winner))
    gotoPage('/announce-winner.html')
}

function initTable() {
    const playerTable = document.getElementById("players-table")
    const tbody = playerTable.getElementsByTagName('tbody')[0]
    for (const player of players) {
        const row = `<tr>
                <th scope="row">${player.name}</th>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td class="total-val">0</td>
            </tr>`
        tbody.insertAdjacentHTML('beforeend', row);
    }
}

function main() {
    rollForPlayerBtn.innerText = `Roll for ${players[0].name}`
    initTable()
}
main()