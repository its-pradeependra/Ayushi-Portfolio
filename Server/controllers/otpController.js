import OTP from '../models/otp.js'
import { sendOTP } from '../services/emailService.js'
import NodeCache from 'node-cache'

const otpCache = new NodeCache({ stdTTL: 600 }) // 10 minutes TTL

export const generateAndSendOTP = async (email, name) => {
    try {
        const { otp, mailPromise } = await sendOTP(email, name)
        await Promise.all([
            OTP.create({ email, otp }),
            mailPromise,
            otpCache.set(`${email}:${otp}`, true)
        ])
        return otp
    } catch (error) {
        console.error('Error generating OTP:', error);
        throw new Error('Failed to generate and send OTP');
    }
}

export const verifyOTP = async (email, otp) => {
    try {
        // Check cache first
        if (otpCache.get(`${email}:${otp}`)) {
            otpCache.del(`${email}:${otp}`);
            return true;
        }

        // Fallback to database check
        const otpRecord = await OTP.findOne({ email, otp })
        if (otpRecord) {
            await OTP.deleteOne({ _id: otpRecord._id })
            return true;
        }
        return false;
    } catch (error) {
        console.error('Error verifying OTP:', error);
        throw new Error('Failed to verify OTP');
    }
} 