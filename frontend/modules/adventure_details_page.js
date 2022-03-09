import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
 
  // Place holder for functionality to work in the Stubs
  return search.split("=")[1];
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const url = config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`;
      const apiData= await fetch(url);
      const jsonData = await apiData.json();
      return jsonData;
    } catch (err) {
      return null;
    }

  // Place holder for functionality to work in the Stubs
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  let heading = document.getElementById("adventure-name");
  heading.textContent = adventure.name;

  let subtitle = document.getElementById("adventure-subtitle");
  subtitle.textContent = adventure.subtitle;

  let cardContainer= document.getElementById("photo-gallery");

  //adding images to photo-gallery;
  let images = adventure.images
  images.forEach(image=>
    {
      let cardImg = document.createElement("img");
      cardImg.src = image;
      cardImg.className = "activity-card-image";
      cardContainer.append(cardImg);
    })
    let cardContent = document.getElementById("adventure-content");
    cardContent.textContent = adventure.content;
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images

  let carouselContainer = document.getElementById("photo-gallery");
  carouselContainer.id = "carouselExampleIndicators";
  
  //Removing older pictures added in addAdventureDetailsToDOM(adventure) method
   let oldImages =   carouselContainer.getElementsByClassName("activity-card-image");
 
    Array.from(oldImages).forEach(image=>
      {
        image.remove();
      })

  // Creating new Carousel picture gallery
  let innerCarousel = document.getElementById("inner");
 
  images.forEach(image=>{
      let carouselItem = document.createElement("div");
      carouselItem.className = "carousel-item";

      let cardImg = document.createElement("img");
      cardImg.src = image
      cardImg.className = "activity-card-image";

      carouselItem.append(cardImg);
       innerCarousel.append(carouselItem);
  })
  
    innerCarousel.firstChild.classList.add("active");
    carouselContainer.append(innerCarousel);

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
