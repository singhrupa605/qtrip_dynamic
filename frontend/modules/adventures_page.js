import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city = search.split("=")[1];
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = config.backendEndpoint + `/adventures?city=${city}`;
  try {
    const apiCall = await fetch(url);
    const jsonData = await apiCall.json();
    return jsonData;
  } catch (err) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  let dataDiv = document.getElementById("data");

  adventures.forEach((city) => {
    let parentDiv = document.createElement("div");
    parentDiv.className = "col-8 col-sm-6 col-lg-3";
    parentDiv.id = "card-container";

    let card = document.createElement("a");
    card.setAttribute("href", `detail/?adventure=${city.id}`);
    card.className = "activity-card";
    card.id = city.id;

    let cardImage = document.createElement("img");
    cardImage.src = city.image;
    cardImage.className = "activity-card img";

    let Banner = document.createElement("p");
    Banner.textContent = city.category;
    Banner.className = "category-banner";

    let cardPrice = document.createElement("div");
    cardPrice.innerHTML = `<div>${city.name}</div>  <div>&#8377 ${city.costPerHead}</div>`;
    cardPrice.className = "card-data";

    let cardDuration = document.createElement("div");
    cardDuration.innerHTML = `<div>Duration</div>  <div> ${city.duration} hours</div>`;
    cardDuration.className = "card-data";


    card.append(Banner);
    card.append(cardImage);
    card.append(cardPrice);
    card.append(cardDuration);
    parentDiv.append(card);
    dataDiv.append(parentDiv);
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = list.filter((adventure) => {
    return (adventure.duration > low) && (adventure.duration <= high);

  })
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = list.filter((adventure) => {
    return categoryList.indexOf(adventure.category) !== -1;
  });
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods

  // Place holder for functionality to work in the Stubs

  if (filters.category.length > 0 && filters.duration.length <= 0)
   {
    list = filterByCategory(list, filters.category);
   }
   else if(filters.category.length <= 0 && filters.duration.length > 0)
   {
      let low = parseInt(filters.duration.split("-")[0]);
      let high = parseInt(filters.duration.split("-")[1]);
      list = filterByDuration(list, low, high);

    }
    else if(filters.category.length > 0 && filters.duration.length > 0)
    {
      list = filterByCategory(list, filters.category);
      let low = parseInt(filters.duration.split("-")[0]);
      let high = parseInt(filters.duration.split("-")[1]);
      list = filterByDuration(list, low, high);
    }
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  
    localStorage.setItem("filters", JSON.stringify(filters));
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  let items = localStorage.getItem("filters");
   return JSON.parse(items);
   
  
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills

   let durationDropdownOptions = document.querySelectorAll("#duration-select option");
   if(filters.duration !==null)
   {
     durationDropdownOptions[0].selected = false;
    durationDropdownOptions.forEach((option)=>
    {
      if(option.value.toString() === filters.duration)
      {
        option.selected = "true";
      }
   })
  }
 
  let categoryContainer = document.getElementById("category-list");
  let selectedCategories = [];
  filters.category.forEach((adventureType) => {
    let filter = document.createElement("div");
    filter.className = "category-filter";
    filter.id = "filter-id";
    filter.textContent = adventureType;
    let clear = document.createElement("button");;
    clear.innerText = "x";
    clear.className = "clearButton"
    categoryContainer.append(filter);
    filter.append(clear);
    selectedCategories.push(filter);
  });

 
}

export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
