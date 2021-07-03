angular.module("jobSearch").directive("jobsearchNavigation", JobopeningNavigation);

function JobopeningNavigation() {

    return {
        restrict: "E",
        templateUrl:"angular-app/jobsearch-navigation/jobsearch-navigation.html"
    }
}