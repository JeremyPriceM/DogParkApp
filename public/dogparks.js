'use strict';

const searchURL = "http://localhost:8080/dogparks";

function getDogparksData() {
    fetch(searchURL)
    .then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error(response.statusText);
    })  
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
        $('#js-error-message').text(`something went wrong" ${err.message}`);
    });
}

function displayResults(responseJson) {
    $('#park-info').empty('');
    let length = responseJson.length;
    for (let i=0; i< length; i++) {
        $('#park-info').append(`
        <div class="parkCard">
            <div class="column">
                <h3 class="parkTitle">${responseJson[i].parkName}</h3>
                <img src="${responseJson[i].parkImage}" class="parkURL" height="200" width="400">
                <p class="parkLoc">${responseJson[i].parkCity}, ${responseJson[i].parkState}</p>
                <p class="id-hidden">${responseJson[i]._id}</p>
                <form method="GET" action="/dogparks/${responseJson[i]._id}">
                <input type="hidden" class="id-hidden" value="${responseJson[i]._id}">
                <button>More Info</button>
                </form>
            </div>
        </div>`)};
}


$(function() {
    getDogparksData();
});