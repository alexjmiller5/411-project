export function fetchApiCall() {

    var quote = "";
    var author = "";
    fetch("https://quotes15.p.rapidapi.com/quotes/random/?language_code=en", {
      "method": "GET",
      "headers": {
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": "b800edfc20msh96a2651d02c9a70p1bd011jsne85f644eae5f"
      }
    })
      .then(response => response.json())
      .then(response => {
        console.log("content: ", response.content);
        quote = response.content
        console.log("name: ",response.originator.name)
        author = response.originator.name
      })
      .catch(err => {
        console.log("error: ",err);
      });
      return quote,author
  }