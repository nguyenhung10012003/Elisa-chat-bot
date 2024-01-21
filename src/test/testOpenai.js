const openai = require('../api/openai');

const tests = [
    {
        id: 'test1',
        description: '',
        excute: async () => {
            const imgs = await openai.textToImage("A girl with black hair");
            console.log(imgs)
        }
    },
    {
        id: 'test2',
        description: '',
        excute: async () => {
            const chat = await openai.chat("what is facebook");
            console.log(chat)
        }
    },
]

const testOne = (testId) => {
    tests.forEach((test) => {
        if (test.id === testId) test.excute();
    })
}

const testAll = () => {
    tests.forEach((test) => {
        test.excute();
    })
}

testOne('test2');