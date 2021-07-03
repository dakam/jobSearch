const express = require("express");
const router = express.Router();
const jobOpenings= require("../controllers/jobOpeningsController")


router.route("/jobopenings")
.get(jobOpenings.GetAllJobs)
.post(jobOpenings.AddOneJob)



router.route("/jobopenings/:jobId")
.get(jobOpenings.GetOneJob)
.put(jobOpenings.FullUpdateOneJob)
.patch(jobOpenings.PartialUpdateOneJob)
.delete(jobOpenings.DeleteOneJob)


module.exports = router;