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
        //console.log(clickCount);
    } else {
        clickCount == 0;
        //console.log(clickCount);
    }
}

function counter() {
    var clickLimit = 5; //Max number of clicks
    if (clickCount == clickLimit) {
        //console.log("5");
        alert("you may only get 5 recipes per minute, sorry!");
        return false;
    } else {
        fetchResults();
        clickCount++;
        //console.log(clickCount);
        return true;
    }
}


function fetchResults() {
    let query = ["chicken", "beef", "cake", "ice%20cream", "fish", "burger", "steak", "drinks",]; //an empty query that will be generated randomly
    let randQuery = query[Math.floor(Math.random() * query.length)];
    //console.log("randQuery =",randQuery);
    const baseURL = `https://api.edamam.com/search?q=${randQuery}&app_id=${apiKey}&app_key=${key}&from=0&to=100`; //search for recipes in english from edamam
    fetch(baseURL, {

            mode: 'cors'
        })
        .then(function (response) {
            //console.log("response =",response);
            return response.json();
        })
        .then((json) => {
            if (json.count >= 100) 
            {
                random = Math.floor((Math.random() * 100) + 1);
                //console.log("random =",random);
            } else {
                random = Math.floor((Math.random() * json.count) + 1);
                console.log("random(else) =",random);
            }
            //console.log("json =",json);
            //console.log("image =",json.hits[`${random}`].recipe.image);
            //console.log("count =",json.count)
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
                let break21 = document.createElement("br");
                let break3 = document.createElement("br");
                section.appendChild(break1);
                //name 
                let labels = json.hits[`${random}`].recipe.label;
                let label = document.createElement('label');
                let labelSt = labels.toString();
                var textnode1 = document.createTextNode(labelSt); 
                label.appendChild(textnode1);                              
                section.appendChild(label);
                label.id = "label";
                section.appendChild(break2);
                section.appendChild(break21);
                //picture
                let pictureURL = json.hits[`${random}`].recipe.image;
                let img = document.createElement('img');
                img.src = pictureURL;
                img.id="img";
                section.appendChild(img);
                section.appendChild(break3);
                //ingredients
                let ingredients = json.hits[`${random}`].recipe.ingredientLines.length;
                let items = document.createElement('ol');
                section.appendChild(items);
                //console.log("legnth =",json.hits[`${random}`].recipe.ingredients.length);
                    for (let i = 0; i <=ingredients; i++){
                        if (i !== ingredients) {
                        var recipeIngredients = json.hits[`${random}`].recipe.ingredients[i].text;  
                        let points = document.createElement('li');
                        points.append(recipeIngredients);
                        //console.log(points);
                        items.appendChild(points);
                        }
                        else{
                            break;
                        }
                    }
                
                //url
                let recURL = json.hits[`${random}`].recipe.url;
                let URL = document.createElement('a');
                let button = document.createElement('button');
                let message = document.createTextNode("Link to recipe's website!");
                URL.href = recURL;  
                URL.target = "_blank";
                URL.id = "link";
                button.id = "button";                 
                section.appendChild(URL);
                URL.appendChild(button);
                button.appendChild(message);
                
            }
        })
        .catch(() => console.log("catch"))
}

