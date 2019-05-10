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

function checkNav() {
    checkUserNav();
}

$(checkNav);