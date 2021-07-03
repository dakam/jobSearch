angular.module("jobSearch").controller("jobslistController", jobslistController);

function jobslistController(dataFactory, $location) {

    const vm = this;

    vm.geo=false;
    vm.searching = false;

    
 
    var off=parseInt($location.search().offset,0)
    if(isNaN(off)) {
        off= 0;
    }

    let st = "";


    dataFactory.getAll(off, st).then(function(response) {
        vm.jobs= response;
        if(off) {
            
            vm.offset= off;

            if(off >=5) {
                vm.Previous= off-5;
            } else {
                vm.previous=0;
            }
            vm.next = off+5;
            
        } else {

            vm.previous = 0;
            vm.next = 5;
        }

       

        console.log(vm.previous)
        console.log(vm.next)
      

    })

    vm.showGeo = function() {

        vm.geo = !vm.geo;

    }

    vm.showSearch = function() {
        vm.searching = !vm.searching;

    }

    vm.GeosearchJobs = function(offset, next) {

       

        dataFactory.getAllGeo(off, vm.longitude, vm.latitude).then(function(response) {
            vm.jobs= response;
            if(off) {
                
                vm.offset= off;
    
                if(off >=5) {
                    vm.Previous= off-5;
                } else {
                    vm.previous=0;
                }
                vm.next = off+5;
                
            } else {
    
                vm.previous = 0;
                vm.next = 5;
            }
    
           
    
            console.log(vm.previous)
            console.log(vm.next)
          
    
        }) 
    
        }

    vm.searchJobs = function(offset, next) {

       

    dataFactory.getAll(off, vm.searchText).then(function(response) {
        vm.jobs= response;
        if(off) {
            
            vm.offset= off;

            if(off >=5) {
                vm.Previous= off-5;
            } else {
                vm.previous=0;
            }
            vm.next = off+5;
            
        } else {

            vm.previous = 0;
            vm.next = 5;
        }

       

        console.log(vm.previous)
        console.log(vm.next)
      

    }) 

    }

    vm.deleteJob  = function(id) {
        if (confirm("Are you sure you want to delete this Job Opening?, action can not be reversed"))
        {
            console.log("JobId to delete", id)

            dataFactory.deleteOneJob(id).then(function(response) {
    
              
               
                $location.path("/");
    
            }).catch(function(error) {
    
                
                
            })

        } else {

         console.log("user not allowed", id)

        }
    }
}