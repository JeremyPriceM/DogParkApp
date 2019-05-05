'use strict';

const searchURL = "http://localhost:8080/dogparks";


function checkUserNav() {
    window.getCookie = function(name) {
        var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
        if (match) return match[2];
    }
    const authToken = window.getCookie('authToken');
    if (!authToken) {
        $('#logoutNav').addClass('hidden');
        $('#AddParkNav').addClass('hidden');
    } else {
        $('#loginNav').addClass('hidden');
        $('#signupNav').addClass('hidden');
    }
}

//////// GET ALL DOG PARKS //////////////////////

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
                <button class="btn more-Info" id=${responseJson[i]._id}>More Info</button>
            </div>
        </div>`)};
}


////////////// GET SPECIFIC DOG PARK //////////////////////

function GetID() {
    $('main').on('click', '.more-Info', function (event){
        event.preventDefault();
        var id = $(this).attr('id');
        window.getCookie = function(name) {
            var match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
            if (match) return match[2];
          }
        const authToken = window.getCookie('authToken');
        fetch(searchURL + '/' + id, {
            method: "GET",
            credentials: 'include',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': authToken
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })  
        .then(responseJson => displayPark(responseJson))
        .catch(err => {
            $('#js-error-message').text(`something went wrong" ${err.message}`);
        });
    });
}

function displayPark(responseJson) {
    if(responseJson.success !== undefined && responseJson.success == false ) {
        return window.alert("Please Log In");
    }
    $('#park-moreInfo').empty('');
    $('#park-moreInfo').append(`
        <div class="parkCard">  
            <div class="columns">
                <h3 class="parkTitle">${responseJson.parkName}</h3>
                <img src="${responseJson.parkImage}" class="parkURL" height="200" width="400">
                <p class="parkArea">${responseJson.parkCity}, ${responseJson.parkState}</p>               
                    <button class="dp btn delete" id=${responseJson._id}>Delete Park</button>
                    <button class="dp btn edit" id=${responseJson._id}>Edit Park</button>
                    <form action="/dogparks.html">
                        <input class="btn" type="submit" value="Return to Dog Parks"/>
                    </form>
            </div>
        </div>`)
    $("#park-info").css('display', 'none');
    
};

///////////// DELETE DOG PARK ////////////////////

function deleteDogPark() {
    $('main').on('click', '.delete', function (event) {
        event.preventDefault();
        var id = $(this).attr('id');
        fetch(searchURL + '/' + id, {
            method: "Delete"
        })
        .then(function() {
            location.reload();
        })
    });
}

////////////// EDIT DOG PARK /////////////////////////

function editDogPark() {
    $('main').on('click', '.edit', function (event) {
        event.preventDefault();
        var id = $(this).attr('id');
        fetch(searchURL + '/' + id) 
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        })  
        .then(responseJson => displayParkEdit(responseJson))
        .catch(err => {
            $('#js-error-message').text(`something went wrong" ${err.message}`);
        });
    });
}

function displayParkEdit(responseJson) {
    $('#park-update').empty('');
    $('#park-update').append(`
        <div class="parkEditForm">  
            <form method="POST" action="/dogparks/${responseJson._id}?_method=PUT"  class="formClass" id="dogparksForm">
            <h1 class="formTitle">Edit Dog Park</h1>
  
            <div class="field">
              <label>Park Name</label>
              <input type="text" name="parkName" value="${responseJson.parkName}"><br />
  
              <label>City</label>
              <input type="text" name="parkCity" value="${responseJson.parkCity}"><br />
  
              <label>State</label>
              <input type="text" name="parkState" value="${responseJson.parkState}"><br />
  
              <label>Image URL</label>
              <input type="text" name="parkImage" value="${responseJson.parkImage}"><br />
      
              <input type="submit" class="btn submit" value="Submit">
            </div>
          </form>
        </div>`)
    $("#park-info").css('display', 'none');
};


function runDogparks() {
    checkUserNav()
    getDogparksData();
    GetID();
    deleteDogPark();
    editDogPark();
}

$(runDogparks);