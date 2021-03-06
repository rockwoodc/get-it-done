var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var languageButtonsEl = document.querySelector("#language-buttons")

var formSubmitHandler = function(event) {
    //prevents the browser from sending the form's input data to a URL
    event.preventDefault();
    // get value from input element
    var username = nameInputEl.value.trim();

    if (username) {
        getUserRepos(username);
        //clear out the form once it has been submitted
        repoContainerEl.textContent= "";
        nameInputEl.value = "";
        } else {
        //this will prompt the user if they left the input blank
        alert("Please enter a GitHub username");
        }
};

var buttonClickHandler = function(event) {
  // get the language attribute from the clicked element
  var language = event.target.getAttribute("data-language");

  if (language) {
    getFeaturedRepos(language);

    // clear old content
    repoContainerEl.textContent = "";
  }
};

//user allows us to input any user on github
var getUserRepos = function(user) {
    //format the github api url with the user info
    var apiUrl = "https://api.github.com/users/" + user + "/repos";

    //make a request to the url
    fetch(apiUrl).then(function(response){
        //if response is successful
        if (response.ok) {
            console.log(response);
            response.json().then(function(data) {
                console.log(data);
                displayRepos(data, user);
        });
        //if response is not valid
        }else {
            alert("Error: GitHub User Not Found");
        }
        })
        .catch(function(error){
            alert("Unable to connect to GitHub")

        });

};

var getFeaturedRepos = function(language) {
    //will format the url to search for the language type the user wants to see
    var apiUrl = "https://api.github.com/search/repositories?q=" + language + "+is:featured&sort=help-wanted-issues";

    //allowing search data to display and adding error handling
    fetch(apiUrl).then(function(response) {
        if (response.ok) {
            response.json().then(function(data) {
            displayRepos(data.items, language);
            });
        } else {
            alert('Error: GitHub User Not Found');
        }
    });
};


var displayRepos = function(repos, searchTerm) {
    //check if api returned any repos
    if (repos.length === 0) {
    repoContainerEl.textContent = "No Repositories found.";
    }
    repoSearchTerm.textContent = searchTerm;

    //loop over repos
    for (var i= 0; i < repos.length; i++) {
        //format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;

        //create a container for each repo
        var repoEl = document.createElement("a");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

        //create a span element to hold repo name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;

        //append to container
        repoEl.appendChild(titleEl);

        //create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";

        //check if current repo has issues or not
        if (repos[i].open_issues_count > 0) {
            statusEl.innerHTML =  "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        } else {
          statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
        }
        
        // append to container
        repoEl.appendChild(statusEl);
       

        //append container to the dom
        repoContainerEl.appendChild(repoEl);
    }
};

//add event listener to form
userFormEl.addEventListener("submit", formSubmitHandler);
languageButtonsEl.addEventListener("click", buttonClickHandler);