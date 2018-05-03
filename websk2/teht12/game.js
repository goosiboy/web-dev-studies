
module.exports = {
    // If no arguments are passed, defaults to 1, 10.
    randomInt: function (min, max) {
        const _min = min || 1;
        const _max = max || 10;

        return Math.floor(Math.random() * _max) + _min;
    },

    randomName: function() {
        const adjArray = ['Great', 'Bad', 'Wonderful', 'Little', 'Big', 'Good', 'Sassy', 'Yellow', 'Green', 'Huge', 'Lonely', 'Nerdy'];
        const subArray = ['Banana', 'OneUpper', 'Whipper', 'Gangsta', 'Dipper', 'Zipper', 'Hippo', 'Blaster', 'Dudette', 'Muppet', 'Wabbit', 'Gasser'];

        let randAdj = adjArray[Math.floor(Math.random() * adjArray.length)];
        let randSub = subArray[Math.floor(Math.random() * subArray.length)];

        let randNam = randAdj + randSub;

        return randNam;
    }

}

