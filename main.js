let highest = 0
let lowest = 100000000
let total = 0
let num = 0
let luck = 1
let time = 0
let started = false

const formatSecondsToTime = function(seconds) {
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

const buttonPressed = function() {
    if (started) {
        return
    }
    started = true
    setInterval(() => {
        let lastRoll = 0;
        let batchTotal = 0;
        let batchHighest = highest;
        let batchLowest = lowest;
        let batchNum = num;
        let batchTotalSum = total;
        let batchHtml = "";
        for (let i = 0; i < 500; i++) {
            var rng = Math.pow(Math.random(), luck)
            var roll = 1/rng
            batchNum += 1
            batchTotalSum += roll
            lastRoll = roll
            if (roll > batchHighest) {
                batchHighest = roll;
            }
            if (roll < batchLowest) {
                batchLowest = roll;
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
        if (highest/num >= 1) {
            overOrUnder = "Over"
        }
        document.getElementById("onOdds").innerHTML = `% ${overOrUnder} Odds: <b>${((highest/num) * 100).toFixed(0)}%</b>`;
    }, 1);
    document.getElementById("timer").innerHTML = `<b>${formatSecondsToTime(time)}</b>`
    document.getElementById("RPM").innerHTML = "Rolls/Min: <b>0</b>"
    setInterval(() => {
        time += 1
        document.getElementById("timer").innerHTML = `<b>${formatSecondsToTime(time)}</b>`
        document.getElementById("RPM").innerHTML = `Rolls/Min: <b>${(num/(time/60))}</b>`
    }, 1000);
}

const killVideo = function() {
    document.getElementById("subwaySurfers").innerHTML = ""
}