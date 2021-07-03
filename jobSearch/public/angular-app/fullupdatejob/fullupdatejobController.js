angular.module("jobSearch").controller("fullupdatejobController", fullupdatejobController);


function fullupdatejobController(dataFactory, $routeParams) {

    let id = $routeParams.id;
    const vm = this;

    vm.err = false;
    vm.success=false;
    vm.error = "";
    vm.message="";
    



    vm.fullupdateJobOpening = function(id, title, description, salary, experience,lng,lat, skills) {
        

        console.log("job id to full update", id)

        const job = {
            title: !vm.title?title:vm.title,
            salary: !vm.salary?salary:vm.salary,
            description: !vm.description? description:vm.description,
            skills: !vm.skills?skills:vm.skills,
            experience: !vm.experience?experience:vm.experience,
            lng: !vm.lng?lng:vm.lng,
            lat: !vm.lat?lat:vm.lat,
        

    }
    console.log("submitted json", job);

    dataFactory.fullupdateJob(job, id).then(function(response) {
        vm.success=true;
        vm.message= "Full job update sucessful sucessfully"
        vm.err= false;
        vm.error="";
        console.log("submited response", response);

    }).catch(function(error) {

        vm.success=false;
        vm.message= ""
        vm.err= true;
        vm.error="Unable to update job details, try again later";
        console.log("error occured during job update", error);

    })

    }
    dataFactory.getOne(id).then(function(response) {

        vm.job = response;
        vm.myskills = vm.job.skills.toString();
       

    })



}