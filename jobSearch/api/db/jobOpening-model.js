const mongoose = require("mongoose");

const jobOpeningSchema = new mongoose.Schema({

    title: {
        type: String,
        required: false
    },

    salary: Number,
    location:{
        coordinates:{
            type:[Number],
            required: false,
        } ,
        type: {
            type: String, 
            enum: ['Point'], 
          },
    },
    description: String,

    experience: Number,

    skills: [String],

    postDate: {
        type: Date,
        "default": Date.now
    }


});

jobOpeningSchema.index({'$**': 'text'}); //index mongodb for text search

mongoose.model("Job", jobOpeningSchema, "jobopening");