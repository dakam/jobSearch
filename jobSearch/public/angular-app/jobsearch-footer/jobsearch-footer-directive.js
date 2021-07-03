angular.module("jobSearch").directive("jobsearchFooter", jobopeningFooter);

function jobopeningFooter() {

    return {
        retrict: "E",
        templateUrl:"angular-app/jobsearch-footer/jobsearch-footer.html",
    }

}