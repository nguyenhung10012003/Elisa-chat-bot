const hexToInt = (hex) => {
    if (typeof hex !== 'string' || !hex.match(/^#[0-9A-Fa-f]{6}$/)) {
        throw new Error('Invalid hex string');
    }

    return parseInt(hex.substring(1), 16);
}

const getRandomColorInt = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);

    return (red << 16) | (green << 8) | blue;
}

module.exports = {
    hexToInt,
    getRandomColorInt,
}