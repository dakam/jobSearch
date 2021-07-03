
angular.module('jobSearch').factory("dataFactory", dataFactory);

function dataFactory($http) {

    return {
        getAll: GetAllJobs,
        getOne: GetOneJob,
        addnewJob:addNewJob,
        deleteOneJob,
        fullupdateJob,
        getAllGeo:GetAllJobsGeo
        
    }

    function deleteOneJob(id) {

        return $http.delete("/api/jobopenings/"+id).then(complete).catch(failed);

    }

    function addNewJob(newjob) {

        return $http.post("/api/jobopenings/", newjob).then(completed).catch(failed);

    }

    function fullupdateJob(job, id) {

        return $http.put("/api/jobopenings/"+id, job).then(completed).catch(failed);

    }

    function GetOneJob(id) {
        return $http.get("/api/jobopenings/"+id).then(completed).catch(failed);
    }

    function GetAllJobsGeo(offset, lng,lat) {
    
      
      
   
        return $http.get("/api/jobopenings?offset="+offset+"&count=4&lng="+lng+"&lat="+lat).then(completed).catch(failed);
    }

    function GetAllJobs(offset, stext) {
        let search = "";
        if(stext) {
            search = stext;

        } else {
            search="";

        }
      
      
        console.log("offset",offset, "search="+search)
        return $http.get("/api/jobopenings?offset="+offset+"&count=4&search="+search).then(completed).catch(failed);
    }

    function completed(response) {
        console.log(response.data);
        return response.data;

    }

    function failed(error) {
        return error;
    }
}