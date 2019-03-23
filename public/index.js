var MOCK_PARK_UPDATES = {
    "parkUpdates": [
      {
        "userId": "aaaaaaa",
        "userName": "John Doe",
        "parkId": "9999999",
        "parkName": "Easthill Dog Park",
        "parkImage": "https://www.militarytownadvisor.com/file/wp-uploads/2013/07/Bayview-dog-beach.jpg",
        "parkCity": "Pensacola",
        "parkState": "Florida",
        "publishedAt": 1470016976609
      },
      {
        "userId": "bbbbbbb",
        "userName": "Jane Doe",
        "parkId": "9999999",
        "parkName": "West Pensacola Dog Park",
        "parkImage": "http://4.bp.blogspot.com/-QQ_mHEVdSZA/UaNqtJKPu3I/AAAAAAAAAh4/GgoiIr1i1z8/s1600/Beulah+Dog+Park+Pensacola+FL+32526.jpg",
        "parkCity": "Pensacola",
        "parkState": "Florida",
        "publishedAt": 1470012976609
      },
      {
        "userId": "ccccccc",
        "userName": "Janis Doe",
        "parkId": "9999999",
        "parkName": "P'cola Beach",
        "parkImage": "https://myescambia.com/images/default-source/pensacola-beach/pensacolabeachdogparksmap-jpg.jpg",
        "parkCity": "Pensacola",
        "parkState": "Florida",
        "publishedAt": 1470009976609
      }
    ]
  };
  
  
  function getRecentParkUpdates(callbackFn) {
    setTimeout(function() { callbackFn(MOCK_PARK_UPDATES)}, 100);
  }
  
  function displayParkUpdates(data) {
    for (index in data.parkUpdates) {
      $('body').append(
        "<p>"+ data.parkUpdates[index].parkName + "</p>" +
        "<img src='"+ data.parkUpdates[index].parkImage + "'" + "height='200'" + "width='400'" + ">" +
        "<p>"+ data.parkUpdates[index].parkCity + ", " + data.parkUpdates[index].parkState + "</p>"
        );
    }
  }
  
  function getAndDisplayParkUpdates() {
    getRecentParkUpdates(displayParkUpdates);
  }
  
  $(function() {
    getAndDisplayParkUpdates();
  })