import nodemailer from 'nodemailer'
import env from './env.js'

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: env.DOCTOR_EMAIL,
        pass: env.DOCTOR_PASS
    }
})

// Verify email connection
transporter.verify(function(error, success) {
    if (error) {
        console.error('SMTP connection error:', error)
    } else {
        console.log('SMTP server is ready to send emails✅')
    }
})

export default transporter 