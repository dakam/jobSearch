angular.module("jobSearch").controller("singlejobController", singlejobController);


function singlejobController(dataFactory, $routeParams) {

    let id = $routeParams.id;
    const vm = this;

    dataFactory.getOne(id).then(function(response) {

        vm.job = response;

    })



}