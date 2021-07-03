const { response } = require("express");
const mongoose = require("mongoose");

const Job = mongoose.model("Job");


module.exports.DeleteOneJob = function(req, res) {

    const jobId = req.params.jobId;

    if(!jobId || !(jobId.length ==24)) {


        res.status(400).json({"message":"Job Id is invalid"})
    } else {

        Job.findByIdAndRemove(jobId).exec(function(err, job) {
            const response = {
                status: 200,
                message:job
            }

            if(err) {
                response.status=500;
                response.message=err;
            } else if(!job) {
                response.status=401;
                response.message="Job to be deleted was not found"

            }

            res.status(response.status).json(response.message);
        })
    }


}


module.exports.PartialUpdateOneJob = function(req, res) {

    if(req.params.jobId && req.params.jobId.length ==24) {
        const jobId = req.params.jobId;
    
        Job.findById(jobId).exec(function(err, job) {
            let response = {
                status:200,
                message:job
            }
    
            if(err) {
                response.status=500;
                response.message=err;
                res.status(response.status).json(response.message);
            } 
    
            if(!job) {
                response.status=401;
                response.message="Job details not found";
                
                res.status(401).json(response.message);
            }
    
            if(job) {
    
                   if(req.body.title) {

                    job.title =req.body.title;
                   }
                   
                   if(req.body.salary) {

                    job.salary=  parseInt(req.body.salary,0);

                   }
                   if(req.body.experience) {

                    job.experience=  parseInt(req.body.experience,0);

                   }
                 
                   if(req.body.description) {

                    job.description= req.body.description;

                   }
                
                   if(req.body.skills) {

                    job.skills= req.body.skills;

                   }
                    
              if(req.body.lng && req.body.lat) {

                const location= {
                    type: "Point",
                    coordinates: [req.body.lng, req.body.lat]
                }
               
                job.location = location;
              }
                 
             
                job.save(function(err, jobs) {
    
                    let response = {
                        status:201,
                        message:jobs
                    }
        
                    if(err) {
                        response.status=500;
                        response.message=err;
                        console.log(err)
                    }
                    else if(!jobs) {
                        response.status=400;
                        response.message="Partial update was not sucessful";
                    }
        
                    res.status(response.status).json(response.message);
    
                })
            }
            
        })
    
    } else {
    
        res.status(401).json({"message":"Please provide a valid Job opening ID"})
    }
       

}


module.exports.FullUpdateOneJob = function(req, res) {

    console.log("skill=",req.body.skills)
if(req.params.jobId && req.body.title && req.body.salary && req.body.skills && req.body.lng && req.body.lat && req.body.description && req.body.experience) {
    const jobId = req.params.jobId;

    Job.findById(jobId).exec(function(err, job) {
        let response = {
            status:200,
            message:job
        }

        if(err) {
            response.status=500;
            response.message=err;
            res.status(response.status).json(response.message);
        } 

        if(!job) {
            response.status=400;
            response.message="Job details not found";
            
            res.status(400).json(response.message);
        }

        if(job) {

                job.title =req.body.title;
                job.salary=  parseInt(req.body.salary,0);
                job.description= req.body.description;
                job.skills= [req.body.skills];
                job.experience= parseInt(req.body.experience,0);
          
                const location= {
                    type: "Point",
                    coordinates: [req.body.lng, req.body.lat]
                }
               
                job.location = location;
         
            job.save(function(err, jobs) {

                let response = {
                    status:201,
                    message:jobs
                }
    
                if(err) {
                    response.status=500;
                    response.message=err;
                    console.log(err)
                }
                else if(!jobs) {
                    response.status=400;
                    response.message="full update was not sucessful";
                }
    
                res.status(response.status).json(response.message);

            })
        }
        
    })

} else {

    res.status(400).json({"message":"Please provide all the required fields"})
}
   

}
module.exports.AddOneJob = function(req, res) {
    if(req.body && req.body.title && req.body.salary && req.body.skills && req.body.experience ) {

        const newJob ={
            title: req.body.title,
            salary: parseInt(req.body.salary,0),
            description: req.body.description,
            skills: req.body.skills,
            experience:parseInt(req.body.experience,0)
        }

        if(req.body.lng && req.body.lat) {

            const location= {
                type: "Point",
                coordinates: [req.body.lng, req.body.lat]
            }
           
            newJob.location = location;
        }



        Job.create(newJob, function(err, job) {
            let response = {
                status:201,
                message:job
            }

            if(err) {
                response.status=500;
                response.message=err;
                console.log(err)
            }
            else if(!job) {
                response.status=400;
                response.message="Creation not sucessful";
            }

            res.status(response.status).json(response.message);
        })
    } else {

        res.status(401).json({"message": "please provide all fields required"});
    }
}

module.exports.GetOneJob = function(req, res) {
    const jobId = req.params.jobId;

    if(!jobId || !(jobId.length ==24)) {


        res.status(400).json({"message":"Job Id is invalid"})
    } else {

        Job.findById(jobId).exec(function(err, job) {
            const response = {
                status: 200,
                message:job
            }

            if(err) {
                response.status=500;
                response.message=err;
            } else if(!job) {
                response.status=401;
                response.message="Job not found"

            }

            res.status(response.status).json(response.message);
        })
    }
}




module.exports.GetAllJobs = function(req, res) {

    let offset =0;
    let defaultmax=4;
    let count =4;

    if(req.query && req.query.offset && req.query.count) {
        offset = parseInt(req.query.offset, 0);
        
    } 

    console.log("offset=", offset, "count=",count)
    if(req.query && req.query.lng && req.query.lat) {

        let lng = parseFloat(req.query.lng,0);
        let lat = parseFloat(req.query.lat,0)
        let query ={};

        if(lng ==0 || lat==0) {


        query = {}

        } else {

         query=    {
                location: {
                   $near: {
                     $geometry: {
                        type: "Point" ,
                        coordinates: [ lng, lat ]
                     },
                     $maxDistance: 10000,
                     $minDistance: 0
                   }
                 }
              }

      

        }

        console.log("backend geo query=", query,"lng=",lng,"lat=",lat)
        Job.find(query).exec(function(error, job) {
            const response = {
                status:200,
                message:job,
            }
    
           console.log("in Geo Search", job)
            if(error) {
                response.status = 500;
                response.message=error;
            } else if(!job) {
                response.status= 400;
                response.message= "Job Openings not available";
            } 
    
            res.status(response.status).json(response.message);
           
        })

    

    }

    else if(req.query && req.query.search) {
        let search = req.query.search;
        Job.find({$text: {$search: search}}).exec(function(error, job) {
            const response = {
                status:200,
                message:job,
            }
    
           console.log("in search", job)
            if(error) {
                response.status = 500;
                response.message=error;
            } else if(!job) {
                response.status= 400;
                response.message= "Job Openings not available";
            } 
    
            res.status(response.status).json(response.message);
           
        })
    
    } else {
        Job.find().skip(offset).limit(count).exec(function(error, job) {
            const response = {
                status:200,
                message:job,
            }
    
           // console.log("job", job)
            if(error) {
                response.status = 500;
                response.message=error;
            } else if(!job) {
                response.status= 400;
                response.message= "Job Openings not available";
            } 
    
            res.status(response.status).json(response.message);
           
        })

    }

 



}
