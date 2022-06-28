var issueContainerEl = document.querySelector("#issues-container");

var getRepoIssues = function(repo) {
    console.log(repo);

    //holds the query
    var apiUrl = "http://api.github.com/repos/" + repo + "/issues?direction=asc";

    fetch(apiUrl).then(function(response){
        //request was successful
        if (response.ok) {
            response.json().then(function(data) {
                //pass response data to dom function
                displayIssues(data);
            });
        }
        // //request was NOT successful
        // else {
        //     alert("There was a problem with your request!")
        // }
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

getRepoIssues("rockwoodc/robot-gladiators");