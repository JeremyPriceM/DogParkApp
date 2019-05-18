function getError() {
    $('#signupForm').submit(function(event) {
        event.preventDefault();
        let username = $('#username')[0].value;
        let password = $('#password')[0].value;
        let url = "https://thedogparkapp.herokuapp.com/signup/"
        fetch(url,
            {
               method: 'POST',
                body: JSON.stringify({username: username, password: password}),
                headers: {
                    "Content-Type": "application/json"
                  }
            })
        .then(function(response) {
            if (response.status === 200) {
                window.location = "https://thedogparkapp.herokuapp.com/dogparks.html";
            }
            if (response.status === 422) {
                response.json().then(res=> {
                    $('#js-error-message').html(res.message);
                })   
            }
        })
        .catch(function(err) {
            //console.log(err);
        })
    });
}

$(getError);