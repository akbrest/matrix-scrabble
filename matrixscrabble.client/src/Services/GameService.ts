class GameService {

    async getExample() {

        const dataToSend = JSON.stringify({ id: "value1", name: "value2" });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataToSend
        };
        fetch('word', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    async PostExample(word: string[][]) {

        const dataToSend = JSON.stringify({ "Main": word, "name": "value2" });
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataToSend
        };
        fetch('word/ConfirmGame', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }
}

export default GameService;
