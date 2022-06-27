//user allows us to input any user on github
var getUserReops = function(user) {
    //format the github api url with the user info
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        response.json().then(function(data) {
            console.log(data);
        });
    });

};

getUserReops();