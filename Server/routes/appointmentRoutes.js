import express from 'express'
import * as appointmentController from '../controllers/appointmentController.js'
import * as otpController from '../controllers/otpController.js'
import { body, validationResult } from 'express-validator'

const router = express.Router()

const validateAppointment = [
    body('date').isDate(),
    body('time').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
    body('email').isEmail(),
    body('name').trim().notEmpty(),
    body('phone').trim().notEmpty(),
]

router.post('/appointments', validateAppointment, async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Invalid input data',
            errors: errors.array()
        })
    }
    try {
        const { date, time } = req.body;
        
        // Validate appointment time
        const appointmentDateTime = new Date(date);
        const [hours, minutes] = time.split(':').map(Number);
        appointmentDateTime.setHours(hours, minutes, 0, 0);
        
        const now = new Date();
        now.setMinutes(now.getMinutes() + 15); // Add 30 minutes buffer

        if (appointmentDateTime < now) {
            return res.status(400).json({
                success: false,
                message: 'Cannot book appointments for past dates or times'
            });
        }

        const existingAppointment = await appointmentController.checkAvailability(req.body.date, req.body.time)
        
        if (existingAppointment) {
            return res.status(400).json({
                success: false,
                message: 'Time slot is not available. Please select another time.'
            });
        }

        await otpController.generateAndSendOTP(req.body.email, req.body.name)

        res.status(200).json({
            success: true,
            message: 'Please check your email for verification code.',
            requiresOTP: true
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error processing appointment',
            error: error.message
        })
    }
})

router.post('/verify-appointment', async (req, res) => {
    try {
        const { otp, appointmentData } = req.body
        
        // Verify OTP
        const isValid = await otpController.verifyOTP(appointmentData.email, otp)
        
        if (!isValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid or expired verification code'
            })
        }

        // Create appointment if OTP is valid
        const appointment = await appointmentController.createAppointment(appointmentData)

        res.status(200).json({
            success: true,
            message: 'Appointment booked successfully',
            appointment
        })
    } catch (error) {
        console.error('Verification error:', error)
        res.status(500).json({
            success: false,
            message: 'Error verifying appointment',
            error: error.message
        })
    }
})

router.get('/appointments', async (req, res) => {
    try {
        const appointments = await appointmentController.getAppointments()
        res.json({
            success: true,
            appointments
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching appointments',
            error: error.message
        })
    }
})

export default router 