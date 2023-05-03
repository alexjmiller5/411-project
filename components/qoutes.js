import Constants from 'expo-constants';

export function fetchApiCall() {

    var quote = "";
    var author = "";
    fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "quotes15.p.rapidapi.com",
                "x-rapidapi-key": process.env.xRapidAPIKey
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log("content: ", response.content);
            quote = response.content
            console.log("name: ", response.originator.name)
            author = response.originator.name
        })
        .catch(err => {
            console.log("error: ", err);
        });
    return quote, author
}