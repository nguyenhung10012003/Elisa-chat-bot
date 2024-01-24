const removeCharFromString = (str, char) => {
    let regex = new RegExp(char, 'g');
    return str.replace(regex, '');
}

const replaceCharFromString = (str, char, newChar) => {
    let regex = new RegExp(char, 'g');
    return str.replace(regex, newChar);
}

const removeSpacesAndLowercase = (input) => {
    let output = input.toLowerCase();
    output = output.replace(/\s/g, '');
    return output;
}

const camelCaseToProperName = (str) => {
    let result = '';
    const romanNumerals = ['I', 'V'];

    for (let i = 0; i < str.length; i++) {
        if (str[i] === str[i].toUpperCase() && !romanNumerals.includes(str[i])) {
            if (i !== 0) {
                result += ' ';
            }
        } else if (romanNumerals.includes(str[i]) && i !== 0 && !str[i - 1].match(/[A-Z]/g) && !romanNumerals.includes(str[i - 1])) {
            result += ' ';
        }
        result += str[i];
    }

    return result.charAt(0).toUpperCase() + result.slice(1);
}


module.exports = {
    removeCharFromString,
    replaceCharFromString,
    removeSpacesAndLowercase
}