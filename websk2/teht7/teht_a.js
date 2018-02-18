module.exports = function (a, b) {

    const warn1 = "Warning: An invalid value was passed to the function";
    const warn2 = "Warning: randNum is undefined";

    if(typeof a !== 'undefined' && typeof b !== 'undefined') {
        if(checkInt(a) && checkInt(b)) {
            let loNum;
            let hiNum;
            let randNum;
            let numArray = [];
            let randArray = [];

            if(a < b) {
                loNum = a;
                hiNum = b;
            } else {
                loNum = b;
                hiNum = a;
            }

            for(let i = loNum; i <= hiNum; i++) {
                numArray.push(i);
            }

            randArray = shuffleArray(numArray);
            randNum = randArray[0];

            // Garbage collection - helper
            numArray = null;
            randArray = null;

            if (typeof randNum === 'undefined') {
                console.warn(warn2);
            } else {
                return randNum;
            }
        } else {
            console.warn(warn1);
        }
    } else {
        console.warn(warn1);
    }
}

// HELPER FUNCTIONS:--------------------------------
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

function checkInt(id) {
    return typeof(id) === 'number' && isFinite(id) && Math.round(id) === id;
}