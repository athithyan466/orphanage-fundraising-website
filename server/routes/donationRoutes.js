const express = require("express");
const router = express.Router();

const Donation = require("../models/Donation");

router.post("/donate", async (req, res) => {
    const { name, amount } = req.body;

    const newDonation = new Donation({
        name,
        amount,
    });

    await newDonation.save();

    res.send("Donation Saved");
});

module.exports = router;