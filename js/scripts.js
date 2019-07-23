/***************
 * 
 * Project 5 - Public API Request
 * 
***************/

//Using AJAX to request the API via jQuery
$.ajax({
  //the url we want to pull our data from 
  //I had to create a query string to customize the amount of users wanted on the page & nationality of the users.
  url: 'https://randomuser.me/api/?results=12&nat=us',  
  dataType: 'json',
  success: function(data) {
    //referring to the results format from the Random Generated User API's documentation
    dataResults = data.results;



    //using the forEach loop to generate a new user with their own information
    dataResults.forEach( employees => {

      //assigning the variables for the user's unique information
      let image = employees.picture.medium;
      let firstName = employees.name.first;
      let lastName = employees.name.last;
      let email = employees.email;
      let city = employees.location.city;
      let state = employees.location.state;

      //layout of generated user's card
      const card = `<div class="card">
      <div class="card-img-container">
        <img class="card-img" src=${image} alt="profile picture">
      </div>
      <div class="card-info-container">
        <h3 id="name" class="card-name cap"> ${firstName} ${lastName}</h3>
        <p class="card-text">${email}</p>
        <p class="card-text cap">${city}, ${state}</p>
      </div>`

      //appending these users to the gallery id
      $('#gallery').append(card);  
    });
  }
});

function modalPopUp(i) {
  //re-asssigning these variables since they're not globally assigned
  let image = dataResults[i].picture.medium;
  let firstName = dataResults[i].name.first;
  let lastName = dataResults[i].name.last;
  let email = dataResults[i].email;
  let city = dataResults[i].location.city.toUpperCase();
  let state = dataResults[i].location.state.toUpperCase();

  //more detailed information for the modal container assigned to variables
  let streetName = dataResults[i].location.street.toUpperCase();
  let postalCode = dataResults[i].location.postcode;
  let birthMonth = dataResults[i].dob.date.slice(5,7);
  let birthDay = dataResults[i].dob.date.slice(8,10);
  let birthYear = dataResults[i].dob.date.slice(2,4);
  let phoneNumber = dataResults[i].cell;

  //layout of the modal container
  const thumbnail = 
  `<div class="modal-container">
    <div class="modal">
    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
    <div class="modal-info-container">
      <img class="modal-img" src=${image} alt="profile picture">
      <h3 id="name" class="modal-name cap">${firstName} ${lastName}</h3>
      <p class="modal-text">${email}</p>
      <p class="modal-text cap">${city}</p>
      <hr>
      <p class="modal-text">${phoneNumber}</p>
      <p class="modal-text">${streetName}, ${city}, ${state} ${postalCode}</p>
      <p class="modal-text">Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
    </div>
  </div>` 

  //appending the modal to the body
  $('body').append(thumbnail); 
  
  //to exit out of the modal container and go back to main screen
  $('#modal-close-btn').on('click', () => {
    $('.modal-container').remove();
  });
} 
 
//only when a user's card is clicked, the modal container will appear
$('#gallery').on('click', '.card', function() {
  i = ($(this).index())
  modalPopUp(i);
});

