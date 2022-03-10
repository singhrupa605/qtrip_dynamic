import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  const url = config.backendEndpoint + "/reservations/";
  try {
    const apiCall = await fetch(url);
    const jsonData = await apiCall.json();
    return jsonData;
  } catch (err) {
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
  if(reservations.length === 0)
  {
     document.getElementById("no-reservation-banner").style.display = "block";
     document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("reservation-table-parent").style.display = "block";
    document.getElementById("no-reservation-banner").style.display = "none";
  }
  
  let reservationTable = document.getElementById("reservation-table");
 
 
  reservations.forEach(res =>
    {
      //formatting Boooking time 
      var timeOptions = {year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second : 'numeric', hour12: true };
      let time = new Date(res.time);
      let bookingTime = time.toLocaleDateString('en-IN', timeOptions);
    

      //Formatting date
      var dateOptions = {year: 'numeric', month: 'numeric', day: 'numeric'}
      let date = new Date(res.date);
      let bookingDate = date.toLocaleDateString('en-IN', dateOptions);
     
      let row = document.createElement("tr");
      row.innerHTML = `<td>${res.id}</td>
                      <td>${res.name}</td> 
                      <td>${res.adventureName}</td>
                      <td>${res.person}</td>
                      <td>${bookingDate}</td>
                      <td>${res.price}</td>
                      <td>${bookingTime}</td>
                      <td id = ${res.id}> <a href = /frontend/pages/adventures/detail/?adventure=${res.adventure}> <button class =
                      reservation-visit-button > Visit Adventure </button> </a> </td>` 

      reservationTable.append(row);
    })
  }

export { fetchReservations, addReservationToTable };
