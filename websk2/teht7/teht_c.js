module.exports = {

    state: {
        numberArray: undefined,
        averageNumber: undefined
    },

    randomNumer: function(a, b, c) {
        const warn1 = "Warning: An invalid value was passed to the function";
        const warn2 = "Warning: randNum is undefined";

        if (typeof a !== 'undefined' && typeof b !== 'undefined') {
            if (checkInt(a) && checkInt(b)) {
                let loNum;
                let hiNum;
                let randNum;
                let numArray = [];
                let randArray = [];
                let calcAvg = c || false;

                if (a < b) {
                    loNum = a;
                    hiNum = b;
                } else {
                    loNum = b;
                    hiNum = a;
                }

                for (let i = loNum; i <= hiNum; i++) {
                    numArray.push(i);
                }

                this.state.numberArray = numArray.slice();

                randArray = shuffleArray(numArray);
                randNum = randArray[0];

                if (typeof randNum === 'undefined') {
                    console.warn(warn2);
                } else {
                    if (calcAvg === true) {
                        this.calcAverage();
                    }
                    return randNum;
                }
            } else {
                console.warn(warn1);
            }
        } else {
            console.warn(warn1);
        }
    },

    calcAverage: function (array) {

        let arr = array || this.state.numberArray;

        if (typeof arr !== 'undefined') {

            const sum = arr.reduce(function (a, b) {
                return a + b;
            });

            const avg = sum / arr.length;
            this.state.averageNumber = avg;

            console.log("Average number: ", avg);

            return avg;

        } else {
            console.warn("Warning: calcAverage expects a parameter");
        }

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