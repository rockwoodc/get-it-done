var repoNameEl = document.querySelector("#repo-name");
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");

var getRepoIssues = function(repo) {
    //format the api url
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";

    //make a request to the URL
    fetch(apiUrl).then(function(response) {
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);

                //check to see if there are issues
                if (response.headers.get("Link")) {
                    displayWarning(repo);
                }
            });
        }
        //request was NOT successful
        else {
            console.log(response);
            alert("There was a problem with your request!")
        }
    });
};

var displayIssues = function(issues) {
    if (issues.length === 0) {
        issueContainerEl.textContent = "This repo has no open issues!"
        return;
    }
    for (var i = 0; i < issues.length; i++) {
        //create a link element to take ussers to issue on GitHub
        var issueEl = document.createElement("a");
        issueEl.classList = "list-item flex-row justify-space-between align-center";
        issueEl.setAttribute("href", issues[i].html_url);
        issueEl.setAttribute("target", "_blank");

        //create a span to hold issue title
        var titleEl = document.createElement("span");
        //telling where to get the text from in the the index
        titleEl.textContent = issues[i].title;

        //append to container- replace empty "a" with the title
        issueEl.appendChild(titleEl);

        //create a type element to say whether it is an issue or pull request
        var typeEl = document.createElement("span");
        //check if issue is an actual issue or a pull request
        if (issues[i].pull_request) {
            typeEl.textContent = "(Pull request)";
        }else {
            typeEl.textContent = "(Issue)";
        }

        //append to container
        issueEl.appendChild(typeEl);

        issueContainerEl.appendChild(issueEl);
    }
};

var displayWarning = function(repo) {
    // add text to warning container
    limitWarningEl.textContent = "To see more than 30 issues, visit ";
  
    // create link element
    var linkEl = document.createElement("a");
    linkEl.textContent = "GitHub.com";
    linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
    linkEl.setAttribute("target", "_blank");
  
    // append to warning container
    limitWarningEl.appendChild(linkEl);
  };
  
  getRepoIssues("facebook/react");