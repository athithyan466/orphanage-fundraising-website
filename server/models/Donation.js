const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema({
    name: String,
    amount: Number,
});

module.exports = mongoose.model("Donation", donationSchema);