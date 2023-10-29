
const crypto = require("crypto");

const razorpayPaymentVerification = async (req, res) => {
    try {
        const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

            // console.log("reci "+ razorpay_signature)
            // console.log("gen "+generated_signature)

        if (generated_signature == razorpay_signature) {
            return res.status(200).send({ success: true });
        }
    } catch (error) {
        return res.status(500).send({ error: error });
    }
};

module.exports = razorpayPaymentVerification