angular.module("jobSearch", ['ngRoute']).config(config);

function config($routeProvider) {

    $routeProvider.when("/", {

        templateUrl: "angular-app/welcome/welcome.html",
    }).when("/jobopenings", {
        templateUrl: "angular-app/jobsList/jobslist.html",
        controller: "jobslistController",
        controllerAs: "vm",
    }).when("/jobopenings/:id", {
        templateUrl: "angular-app/singlejob/singlejob.html",
        controller: "singlejobController",
        controllerAs: "vm",
    }).when("/jobopening/add", {
        templateUrl: "angular-app/addnewjob/addnewjob.html",
        controller: "addnewjobController",
        controllerAs: "vm",
    }).when("/jobopenings/:id/update", {
        templateUrl: "angular-app/fullupdatejob/fullupdatejob.html",
        controller: "fullupdatejobController",
        controllerAs: "vm",
    })

}