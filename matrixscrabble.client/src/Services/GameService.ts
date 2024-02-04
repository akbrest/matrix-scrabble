class GameService {
    
    async getExample() {

        var dataToSend = JSON.stringify({ id: "value1", name: "value2" });

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: dataToSend
        };
        fetch('word', requestOptions)
            .then(response => response.json())
            .then(data => console.log(data));
    }

    async ConfirmGame(word: String[][]) {

        var dataToSend = JSON.stringify({ "Main": word, "name": "value2" });
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
