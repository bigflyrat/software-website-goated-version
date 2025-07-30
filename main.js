let highest = 0
let lowest = 100000000
let total = 0
let num = 0
let luck = 1
let started = false

const buttonPressed = function() {
    // buttonPressed = function(){}
    if (started) {
        return
    }
    started = true
    setInterval(() => {
        for (let i = 0; i < 200; i++) {
            var rng = Math.pow(Math.random(), luck)
            var roll = 1/rng
            num += 1
            document.getElementById("robuckContainer").innerHTML = "<p>you gained <b>" + roll + "</b> robuck!!!</p>"
            total += roll
            document.getElementById("totalRobuck").innerHTML = "Total: <b>" + total + "</b>"
            document.getElementById("totalRolls").innerHTML = "Rolls: <b>" + num + "</b>"
            document.getElementById("averageRobuck").innerHTML = "Average: <b>" + total/num + "</b>"
            if (roll >= highest) {
                highest = roll
                document.getElementById("highestRoll").innerHTML = "Highest roll: <b>" + highest + "</b> (RNG: " + 1/highest + ")"
            }
            if (roll <= lowest) {
                lowest = roll
                document.getElementById("lowestRoll").innerHTML = "Lowest roll: <b>" + lowest + "</b> (RNG: " + 1/lowest + ")"
            }
            let overOrUnder = "Under"
            if (highest/num >= 1) {
                overOrUnder = "Over"
            }
            document.getElementById("onOdds").innerHTML = "% " + overOrUnder + " Odds: <b>" + ((highest/num) * 100).toFixed(0) + "%</b>"
        }
    }, 1);
}