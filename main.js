let highest = 0
let total = 0

function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const buttonPressed = function() {
    // buttonPressed = function(){}
    setInterval(() => {
        var rng = Math.random()
        var roll = 1/rng
        document.getElementById("robuckContainer").innerHTML = "<p>you gained <b>" + roll + "</b> robuck!!!</p>"
        total += roll
        document.getElementById("totalRobuck").innerHTML = "Total: <b>" + total + "</b>"
        if (roll >= highest) {
            highest = roll
            document.getElementById("highestRoll").innerHTML = "Highest roll: <b>" + highest + "</b> (RNG: " + 1/highest + ")"
        }
    }, 1);
}