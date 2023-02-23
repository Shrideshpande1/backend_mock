const mongoose = require("mongoose");

const bookingSchema = mongoose.Schema({
   
    user : { type:String, ref: 'user' },
    flight : { type:String, ref: 'flight'}
});

const BookingModel = mongoose.model("booking",bookingSchema)

module.exports={BookingModel}
