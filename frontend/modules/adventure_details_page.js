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
  try {
    const url = config.backendEndpoint + `/adventures/detail/?adventure=${adventureId}`;
    const apiData = await fetch(url);
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

  let cardContainer = document.getElementById("photo-gallery");

  //adding images to photo-gallery;
  let images = adventure.images
  images.forEach(image => {
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
  let oldImages = carouselContainer.getElementsByClassName("activity-card-image");

  Array.from(oldImages).forEach(image => {
    image.remove();
  })

  // Creating new Carousel picture gallery
  let innerCarousel = document.getElementById("inner");

  images.forEach(image => {
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
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block"
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
  }
  else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none"

  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field

  let totalCost = document.getElementById("reservation-cost");

  let caculatedCost = persons * adventure.costPerHead;

  totalCost.textContent = caculatedCost;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    function makePostRequest(data, url) {
      fetch(url,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        }).then(alert("Sucess!")).catch("Failed!");
    }

    let details = { name: "", date: "", person: "", adventure };
    let name = form.elements["name"].value;
    details.name = name;

    let date = form.elements["date"].value;
    details.date = date;

    let person = form.elements["person"].value;
    details.person = person;

    let place = adventure.id;
    details.adventure = place;


    let url = config.backendEndpoint + "/reservations/new";
    makePostRequest(details, url);
    location.reload();
  })

}
//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved)
  {
    document.getElementById("reserved-banner").style.display = "block";
  }
   else
   {
    document.getElementById("reserved-banner").style.display = "none";
   }

}

   function validateForm(formId)
  {
    let form = document.getElementById(formId);
    let name = form.elements['name'];
    name.addEventListener("blur", (e)=>
    {

      let nameRegex =  /^[a-zA-Z ]{2,30}$/;
      console.log(nameRegex.test(name.value));
      if(nameRegex.test(name.value)===false)
      {
         alert("Invalid name!!  Name should only contain letters  with first name and last Name.");
      }

    })
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
  validateForm
};
