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


module.exports = {
    removeCharFromString,
    replaceCharFromString,
    removeSpacesAndLowercase
}