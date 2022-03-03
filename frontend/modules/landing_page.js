import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  console.log("From init()");
  console.log(config.backendEndpoint + "/cities");
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let url = config.backendEndpoint + '/cities';
  try{
  let cities = await fetch(url);
  let jsonData = await cities.json();
  console.log(jsonData);
  return jsonData;
  }
  catch(err)
  {
    return null;
  }

}
//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) 
{
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
   //Creating elements
   let parentDiv = document.getElementById("data");
 
   let newDiv = document.createElement("div");
   newDiv.className = "col-8 col-sm-6 col-lg-3";

   let cityCard = document.createElement('a');
   cityCard.setAttribute('href', `pages/adventures/?city=${id}`);
   cityCard.className = "tile";
   cityCard.id = id;
 
 
   let cardHeading = document.createElement("h3");
   cardHeading.innerText = city;
   cardHeading.className = "tile-text";
   cardHeading.id = "card-heading";
 
   let cardPara = document.createElement("p");
   cardPara.innerText = description;
   cardPara.className = "tile-text";
   cardPara.id = "card-para";
 
   let cardImage = document.createElement("img");
   cardImage.src = image;
   cardImage.className = "tile img";


   //Appending elements
   parentDiv.append(newDiv);
   newDiv.append(cityCard);
   cityCard.append(cardPara);
   cityCard.append(cardHeading);
   cityCard.append(cardImage);

 
}

export { init, fetchCities, addCityToDOM };
 