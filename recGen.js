const key = "21c8f0a42bd09c6fe2afb8fed7b15d6c"; //api key 
const apiKey = "94fbe7ee" //This is the application ID, you should send with each API request.

const submitBtn = document.querySelector('.generate');
//Random Button - when clicking this a random recipe will be collected from the API

//Limits random clicks to 5 per minute
const generate = document.querySelector('.generate');
generate.addEventListener('click', counter);

var clickCount = 0;

function myFunction() {
    if (clickCount > 0) {
        clickCount = clickCount - 1;
        console.log(clickCount);
    } else {
        clickCount == 0;
        console.log(clickCount);
    }
}

function counter() {
    var clickLimit = 5; //Max number of clicks
    if (clickCount == clickLimit) {
        console.log("5");
        alert("you may only get 5 recipes per minute, sorry!");
        return false;
    } else {
        fetchResults();
        clickCount++;
        console.log(clickCount);
        return true;
    }
}

//url = baseURL + '?q=' + query + '&app_id=' + apiKey + '&app_key' + key + "&from=0&to=100";
function fetchResults() {
    let random = Math.floor((Math.random() * 100) + 1);
    let query = ["chicken", "beef", "cake", "iceCream", "fish", "burger", "steak"]; //an empty query that will be generated randomly
    let randQuery = query[Math.floor(Math.random() * query.length)];
    console.log(randQuery);
    console.log(random);
    const testURL = `https://api.edamam.com/search?q=${randQuery}&app_id=${apiKey}&app_key=${key}&from=0&to=100`; //search for recipes in english from edamam
    fetch(testURL, {
            mode: 'cors'
        })
        .then(function (response) {
            //console.log(response);
            return response.json();
        })
        .then((json) => {
            console.log(json);
            console.log(json.hits[`${random}`].recipe.image);
            displayResults(json);
            //display the recipe
            function displayResults(json) {
                const section = document.querySelector('section'); 
                //results section
                while (section.firstChild)
                    { //when button is clicked:removes prior articles to make room for next 
                        section.removeChild(section.firstChild); 
                    }
                //breaks
                let break1 = document.createElement("br");
                let break2 = document.createElement("br");
                let break3 = document.createElement("br");
                let break4 = document.createElement("br");
                section.appendChild(break1);
                //picture
                let pictureURL = json.hits[`${random}`].recipe.image;
                let img = document.createElement('img');
                img.src = pictureURL;
                console.log(pictureURL);
                section.appendChild(img);
                section.appendChild(break2);
                //ingredients
                let ingredients = json.hits[`${random}`].recipe.ingredientLines
                let items = document.createElement('items');
                let ingSt = ingredients.toString();
                var textnode = document.createTextNode(ingSt); 
                items.appendChild(textnode);                              
                section.appendChild(items);
                section.appendChild(break3);
                //url
                let URL = json.hits[`${random}`].recipe.url
                let url = document.createElement('url');
                let urlSt = URL.toString();
                var textnode2 = document.createTextNode(urlSt);       
                url.appendChild(textnode2);                          
                section.appendChild(url);
                
            }
        })
        .catch()
}

