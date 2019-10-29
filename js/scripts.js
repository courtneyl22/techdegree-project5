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
    dataResults.forEach(employees => {
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
        <p class="card-text">${city}, ${state}</p>
      </div>`

      //appending these users to the gallery id
      $('#gallery').append(card);  
    });
    console.log(data);
  }
});

function modalPopUp(i) {
  //re-asssigning these variables since they're not globally assigned
  let image = dataResults[i].picture.large;
  let firstName = dataResults[i].name.first;
  let lastName = dataResults[i].name.last;
  let email = dataResults[i].email;
  let city = dataResults[i].location.city;
  let state = dataResults[i].location.state;

  //more detailed information for the modal container assigned to variables
  let streetNumber = dataResults[i].location.street.number;
  let streetName = dataResults[i].location.street.name;
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
      <p class="modal-text cap">${city}, ${state}</p>
      <hr>
      <p class="modal-text">${phoneNumber}</p>
      <p class="modal-text">${streetNumber} ${streetName}, ${city}, ${state} ${postalCode}</p>
      <p class="modal-text">Birthday: ${birthMonth}/${birthDay}/${birthYear}</p>
    </div>
    <div class="modal-btn-container">
      <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
      <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>
  </div>` 

  //appending the modal to the body
  $('body').append(thumbnail); 
  
  //to exit out of the modal container and go back to main screen
  $('#modal-close-btn').on('click', () => {
    $('.modal-container').remove();
  });

  // //to go to the next employee modal
  // $('#modal-prev').on('click', () => {
    
  // });

  // //to go to the previous employee modal
  // $('#modal-next').on('click', () => {

  // });
} 

//only when a user's card is clicked, the modal container will appear
$('#gallery').on('click', '.card', function() {
  i = ($(this).index())
  modalPopUp(i);
});

//appending the search bar to the search-container div
const searchBar = `<form action="#" method="get">
  <input type="search" id="search-input" class="search-input" placeholder="Search...">
  <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
</form>`

$('.search-container').append(searchBar);
$('#gallery').before('<label id="no-result"><font color="white">OOPS! We found no results.</font></label>');
$('#no-result').hide();

let searchResults = [];

//search functionality
const searchInput = () => {
  searchResults = [];
  for (let i = 0; i < $('#gallery .card').length; i++) {                                     
    if ($('#gallery .card')[i].textContent.toLowerCase().includes($('#search-input').val().toLowerCase())) {                        
      $('#gallery .card')[i].style.display = "block";                 
      searchResults.push($('#gallery .card')[i]);                   
    } else {
      $('#gallery .card')[i].style.display = "none";              
    }
  }
  if(searchResults.length === 0) {
    $('#no-result').show();
  } else {
    $('#no-result').hide();
  }
}

//adding 'click' eventListener
$('#search-submit').on('click', () => {
  searchInput();             
});

$('#search-input').on('keyup', () => {
  searchInput();
});