const testURL = "https://api.edamam.com/search?"; //search for recipes in english from edamam

const key = "21c8f0a42bd09c6fe2afb8fed7b15d6c"; //api key 
const apiKey = "94fbe7ee" //This is the application ID, you should send with each API request.
let query = "" //an empty query that will be generated randomly

const submitBtn = document.querySelector('.generate');

//Random Button - when clicking this a random recipe will be collected from the API
//submitBtn.addEventListener('click', fetchResults);

//Limits random clicks to 5 per minute
const generate = document.querySelector('.generate');
generate.addEventListener('click', counter);
var clickCount = 0;
function myFunction() 
{
    if (clickCount > 0)
    {
        clickCount = clickCount - 1;
        console.log(clickCount);
    }
    else 
    {
        clickCount == 0;
        console.log(clickCount);
    }
}
function counter() {
    var clickLimit = 5; //Max number of clicks
    if(clickCount==clickLimit) 
    {
        console.log("5");
        alert("you may only get 5 recipes per minute, sorry!");
        return false;
    }
    else
    {
    fetchResults();
    clickCount++;
    console.log(clickCount);
    return true;
    }
}
//look up how to randomize and fix below
//url = baseURL + '?q=' + query + '&app_id=' + apiKey + '&app_key' + key;
function fetchResults(data){
    fetch(testURL,{mode: 'cors'})
    .then(function(response) 
        {
            console.log(response);
            return response.json();
        }
    )
    .then((json) => {console.log(json)})
    .catch(function(error) {console.log("failed!");});
}

