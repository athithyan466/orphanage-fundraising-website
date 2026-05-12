const express = require("express");
const router = express.Router();

const razorpay = require("../utils/razorpay");

router.post("/create-order", async (req, res) => {

    try {

        const options = {
            amount: req.body.amount * 100,
            currency: "INR",
        };

        const order = await razorpay.orders.create(options);

        res.json(order);

    } catch (error) {

        console.log(error);
    }
});

module.exports = router;