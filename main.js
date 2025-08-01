let highest = 0
let lowest = Infinity
let total = 0
let num = 0
let luck = 1
let time = 0
let started = false
let subwaySurfers = `<iframe width="100%" height="100%" src="https://www.youtube.com/embed/zZ7AimPACzc?autoplay=1&mute=0&showinfo=0&controls=0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen id="subwayVideo"></iframe><br/>`

const formatSecondsToTime = function (seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    // Pad with leading zeros if needed
    const formattedTime = [
        String(hours).padStart(2, '0'),
        String(minutes).padStart(2, '0'),
        String(secs).padStart(2, '0')
    ].join(':');

    return formattedTime;
}

const pushToLogs = function (text) {
    let p = document.createElement('p')
    p.innerHTML = `<b>${formatSecondsToTime(time)}</b>: ${text}`
    p.classList.add("animate__animated", "animate__fadeInDown")
    document.getElementById("logs").prepend(p);
}

const buttonPressed = function () {
    if (started) {
        return
    }
    started = true
    document.getElementById("freeRobuck").innerHTML = "";
    document.getElementById("subwaySurfers").innerHTML = subwaySurfers
    document.getElementById("logText").innerHTML = "<b>Logs:</b>"
    document.getElementById("subwayButton").innerHTML = `<button onclick="killVideo()">toggle subway surfers</button>`
    document.getElementById("logsContainerContainer").innerHTML = `<div id="logs"></div>`
    setInterval(() => {
        let lastRoll = 0;
        let batchHighest = highest;
        let batchLowest = lowest;
        let batchNum = num;
        let batchTotalSum = total;
        for (let i = 0; i < 500; i++) {
            var rng = Math.pow(Math.random(), luck)
            var roll = 1 / rng
            batchNum += 1
            batchTotalSum += roll
            lastRoll = roll
            if (roll > batchHighest) {
                batchHighest = roll;
                pushToLogs(`New Highest: <b>${batchHighest}</b>`)
            }
            if (roll < batchLowest) {
                batchLowest = roll
                pushToLogs(`New Lowest: <b>${batchLowest}</b>`)
            }
        }
        num = batchNum;
        total = batchTotalSum;
        highest = batchHighest;
        lowest = batchLowest;
        document.getElementById("robuckContainer").innerHTML = `<p>you gained <b>${lastRoll}</b> robuck!!!</p>`;
        document.getElementById("totalRobuck").innerHTML = `Total: <b>${total}</b>`;
        document.getElementById("totalRolls").innerHTML = `Rolls: <b>${num}</b>`;
        document.getElementById("averageRobuck").innerHTML = `Average: <b>${total/num}</b>`;
        document.getElementById("highestRoll").innerHTML = `Highest roll: <b>${highest}</b> (RNG: ${1/highest})`;
        document.getElementById("lowestRoll").innerHTML = `Lowest roll: <b>${lowest}</b> (RNG: ${1/lowest})`;
        let overOrUnder = "Under"
        if (highest / num >= 1) {
            overOrUnder = "Over"
        }
        document.getElementById("onOdds").innerHTML = `% ${overOrUnder} Odds: <b>${((highest/num) * 100).toFixed(0)}%</b>`;
    }, 1);
    document.getElementById("timer").innerHTML = `<b>${formatSecondsToTime(time)}</b>`
    document.getElementById("RPM").innerHTML = "Rolls/Sec: <b>0</b>"
    setInterval(() => {
        time += 1
        document.getElementById("timer").innerHTML = `<b>${formatSecondsToTime(time)}</b>`
        document.getElementById("RPM").innerHTML = `Rolls/Sec: <b>${(num/(time))}</b>`
    }, 1000);
}

const killVideo = function () {
    if (document.getElementById("subwaySurfers").innerHTML == "") {
        document.getElementById("subwaySurfers").innerHTML = subwaySurfers
    } else {
        document.getElementById("subwaySurfers").innerHTML = ""
    }
}