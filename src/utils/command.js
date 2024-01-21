const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../asset/data', 'commands.json');

const getAllGroupCommand = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.commands
    } catch (err) {
        console.error('Đã có lỗi khi đọc file:', err);
        return null;
    }
}

const getAllCommand = () => {
    try {
        const data = fs.readFileSync(filePath, 'utf8');
        const jsonData = JSON.parse(data);
        return jsonData.commands.reduce((acc, group) => {
            return acc.concat(group.commands)
        }, [])
    } catch (err) {
        console.error('Đã có lỗi khi đọc file:', err);
        return null;
    }
}

module.exports = {
    getAllGroupCommand,
    getAllCommand
}