/**
 * Converts an integer to its English representation
 * @param {number} number - The integer to convert
 * @return {string} The English representation of the integer
 * @throws {Error} If the input value is less than zero or greater than 999 vigintillion
 * @see {@link convert_nn}
 * @see {@link convert_nnn}
 */
/*
 The function takes an integer as input and converts it to its English representation by breaking it down into smaller chunks and using the convert_nn and convert_nnn functions to convert the smaller chunks.
 */
module.exports = function toReadable (number) {
    const to_19 = [ "zero",  "one",   "two",  "three", "four",   "five",   "six",
        "seven", "eight", "nine", "ten",   "eleven", "twelve", "thirteen",
        "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen" ];
    const tens = [ "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

    // convert an integer to its English representation
        if (number < 100) {
            return convert_nn(number);
        }
        if (number < 1000) {
            return convert_nnn(number);
        }
        throw new Error("Should never get here, bottomed out in english_number");

    // convert a number < 100 to English
    function convert_nn(number) {
        if (number < 20) {
            return to_19[number];
        }
        let tensDigit = Math.floor(number / 10);
        let onesDigit = number % 10;
        return tens[tensDigit - 2] + (onesDigit > 0 ? ' '+ to_19[onesDigit] : '');
    }

    // convert a number < 1000 to english
    function convert_nnn(number) {
        let rem = Math.floor(number / 100);
        let mod = number % 100;
        return (rem > 0 ? to_19[rem] + " hundred" + (mod > 0 ? " " : "") : "") + (mod > 0 ? convert_nn(mod) : "");
    }
}
