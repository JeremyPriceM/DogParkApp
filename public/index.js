// var dogparkContainer = document.getElementById("letsGo");

// btn.addEventListener("click", function() {

// function getDogparks() {
//     var ourRequest = new XMLHttpRequest();
//     ourRequest.open('GET', 'http://localhost:8080/dogparks');
//     ourRequest.onload = function() {
//         var ourData = JSON.parse(ourRequest.responseText);
//         dogparks(ourData);
//     };
//     ourRequest.send();
// };

// function dogparks(data) {
//     var dogparkString = "";
//     for(i=0; i< data.length; i++) {
//         "<p>" + data[i].parkName + "</p>" +
//     "<img src=" + `"`+ data[i].parkImage + `"` + " height=" + `"200"` + " width=" + `"400"` + ">";
//     }

//     dogparkContainer.insertAdjacentHTML('beforeend', dogparkString);

// }