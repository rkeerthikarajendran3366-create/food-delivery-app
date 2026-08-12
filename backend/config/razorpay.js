const Razorpay = require("razorpay");

const keyId = process.env.RAZORPAY_KEY_ID?.trim();
const keySecret = process.env.RAZORPAY_KEY_SECRET?.trim();

console.log("Razorpay Key ID loaded:", keyId ? "YES" : "NO");
console.log("Razorpay Key Secret loaded:", keySecret ? "YES" : "NO");

if (!keyId || !keySecret) {
  throw new Error(
    "Razorpay environment variables are missing. Check RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in backend/.env"
  );
}

const razorpay = new Razorpay({
  key_id: keyId,
  key_secret: keySecret,
});

module.exports = razorpay;