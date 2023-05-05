export async function getRandomQuote(fail) {
    if (fail > 10) {
        return null
    }
    var quote = "";
    var author = "";
    var resp = null;
    await fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
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
            resp = response
        })
        .catch(err => {
            console.log("error: ", err);
            //getRandomQuote(fail+1)
        });
    return resp
}