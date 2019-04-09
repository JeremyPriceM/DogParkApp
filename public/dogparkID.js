'use strict';

const searchURL = "http://localhost:8080/dogparks/";
const dogURL = window.location.href;
console.log(dogURL);
//const dogID = dogURL.slice(0, -1);
//console.log(dogID);

function getDogparksData() {
    fetch(searchURL + dogID)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })  
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`something went wrong ${err.message}`);
    });
}

function displayResults(responseJson) {
    $('#park-info').empty('');
     {
        $('#park-info').append(`
        <div class="parkCard">
            <div class="column">
                <h3 class="parkTitle">${responseJson.parkName}</h3>
                <img src="${responseJson.parkImage}" class="parkURL" height="200" width="400">
                <p class="parkLoc">${responseJson.parkCity}, ${responseJson.parkState}</p>
            </div>
        </div>`)};
}


$(function() {
    getDogparksData();
});