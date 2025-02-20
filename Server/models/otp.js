import mongoose from 'mongoose'

const otpSchema = new mongoose.Schema({
    email: { type: String, required: true },
    otp: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: 600 }
})

// Add compound index for better query performance
otpSchema.index({ email: 1, otp: 1, createdAt: 1 });

// Add TTL index if not exists
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 600 });

export default mongoose.model('OTP', otpSchema) 