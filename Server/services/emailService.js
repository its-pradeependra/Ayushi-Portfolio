import transporter from '../config/email.js'
import env from '../config/env.js'
import crypto from 'crypto'

export const sendPatientConfirmation = async (appointment) => {
    const { name, email, date, time } = appointment
    
    const mailOptions = {
        from: `"Dr. Ayushi Shakya" <${env.DOCTOR_EMAIL}>`,
        to: email,
        subject: 'Your Appointment Confirmation with Dr. Ayushi Shakya',
        html: `
            <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2C5282; margin: 0;">Appointment Confirmation</h1>
                    <p style="color: #4A5568; font-size: 16px;">Thank you for choosing Dr. Ayushi Shakya</p>
                </div>
                <p style="color: #2D3748; font-size: 16px;">Dear ${name},</p>
                <p style="color: #2D3748; font-size: 16px;">This email confirms your appointment with Dr. Ayushi Shakya. Here are your appointment details:</p>
                <div style="background-color: #EBF8FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <p style="margin: 10px 0; color: #2C5282;"><strong>📅 Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p style="margin: 10px 0; color: #2C5282;"><strong>⏰ Time:</strong> ${time}</p>
                    <p style="margin: 10px 0; color: #2C5282;"><strong>👩‍⚕️ Doctor:</strong> Dr. Ayushi Shakya</p>
                </div>
                <div style="margin-top: 20px;">
                    <h3 style="color: #2C5282;">Important Information:</h3>
                    <ul style="color: #2D3748; font-size: 14px;">
                        <li>Please arrive 10 minutes before your scheduled appointment time</li>
                        <li>Bring any relevant medical records or test results</li>
                        <li>If you need to reschedule, please contact us at least 24 hours in advance</li>
                    </ul>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0;">
                    <p style="color: #2D3748; margin: 5px 0;">Best regards,</p>
                    <p style="color: #2C5282; font-weight: bold; margin: 5px 0;">Dr. Ayushi Shakya</p>
                    <p style="color: #718096; font-size: 14px;">Specialist Physician</p>
                </div>
            </div>
        `
    }

    return transporter.sendMail(mailOptions)
}

export const sendDoctorNotification = async (appointment) => {
    const { name, email, date, time, message, phone } = appointment
    
    const mailOptions = {
        from: `"Appointment System" <${env.DOCTOR_EMAIL}>`,
        to: env.NOTIFICATION_EMAIL,
        subject: 'New Patient Appointment Scheduled',
        html: `
            <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2C5282; margin: 0;">New Patient Appointment</h1>
                </div>
                <div style="background-color: #EBF8FF; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2C5282; margin-top: 0;">Patient Information:</h3>
                    <p style="margin: 10px 0; color: #2D3748;"><strong>Name:</strong> ${name}</p>
                    <p style="margin: 10px 0; color: #2D3748;"><strong>Email:</strong> ${email}</p>
                    <p style="margin: 10px 0; color: #2D3748;"><strong>Phone:</strong> ${phone}</p>
                    <p style="margin: 10px 0; color: #2D3748;"><strong>Date:</strong> ${new Date(date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p style="margin: 10px 0; color: #2D3748;"><strong>Time:</strong> ${time}</p>
                </div>
                <div style="background-color: #F7FAFC; padding: 20px; border-radius: 8px; margin: 20px 0;">
                    <h3 style="color: #2C5282; margin-top: 0;">Patient's Message:</h3>
                    <p style="color: #2D3748; font-style: italic;">${message || 'No message provided'}</p>
                </div>
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
                    <p style="color: #718096; font-size: 14px;">This is an automated notification from your appointment system</p>
                </div>
            </div>
        `
    }

    return transporter.sendMail(mailOptions)
}

export const sendOTP = async (email, name) => {
    const otp = crypto.randomInt(100000, 999999).toString()
    
    const mailOptions = {
        from: `"Dr. Ayushi Shakya" <${env.DOCTOR_EMAIL}>`,
        to: email,
        subject: 'Appointment Verification Code',
        html: `
            <div style="font-family: 'Helvetica', Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #ffffff; border-radius: 10px; box-shadow: 0 0 10px rgba(0,0,0,0.1);">
                <div style="text-align: center; margin-bottom: 30px;">
                    <h1 style="color: #2C5282; margin: 0;">Verify Your Appointment</h1>
                    <p style="color: #4A5568; font-size: 16px;">Thank you for choosing Dr. Ayushi Shakya</p>
                </div>
                
                <div style="background-color: #EBF8FF; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center;">
                    <h2 style="color: #2C5282; margin: 0 0 10px 0;">Your Verification Code</h2>
                    <div style="background-color: #ffffff; padding: 15px; border-radius: 6px; display: inline-block; margin: 10px 0;">
                        <span style="font-size: 32px; letter-spacing: 4px; color: #2D3748; font-weight: bold;">${otp}</span>
                    </div>
                    <p style="color: #4A5568; margin: 10px 0 0 0; font-size: 14px;">This code will expire in 10 minutes</p>
                </div>

                <div style="margin-top: 20px; padding: 20px; background-color: #F7FAFC; border-radius: 8px;">
                    <p style="color: #4A5568; margin: 0; font-size: 14px;">
                        • Please enter this code to verify your appointment<br>
                        • Do not share this code with anyone<br>
                        • If you didn't request this code, please ignore this email
                    </p>
                </div>

                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #E2E8F0; text-align: center;">
                    <p style="color: #2D3748; margin: 5px 0;">Best regards,</p>
                    <p style="color: #2C5282; font-weight: bold; margin: 5px 0;">Dr. Ayushi Shakya</p>
                    <p style="color: #718096; font-size: 12px;">If you need assistance, please contact us</p>
                </div>
            </div>
        `
    }

    return { otp, mailPromise: transporter.sendMail(mailOptions) }
} 