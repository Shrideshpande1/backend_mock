const mongoose = require('mongoose');
require("dotenv").config()
const connections=mongoose.connect("mongodb+srv://shripad:shri@cluster0.rgvcxa3.mongodb.net/mockten?retryWrites=true&w=majority")

module.exports={connections}