const mongoose = require("mongoose");
const dbName = "jobSearchDB";
require("./jobOpening-model");

const dbURL = "mongodb://localhost:27017/"+dbName;


mongoose.connect(dbURL, {useNewUrlParser:true, useUnifiedTopology:true})

mongoose.connection.on("connected", function() {
   

        console.log("yes connected")

    
})
mongoose.connection.on("disconnected", function() {
    
        console.log("server disconnected")
    
})

mongoose.connection.on("error", function() {
    
        console.log("error occured")
    
})