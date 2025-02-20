import Appointment from '../models/appointment.js'
import { sendPatientConfirmation, sendDoctorNotification } from '../services/emailService.js'

export const createAppointment = async (appointmentData) => {
    const appointment = new Appointment({
        ...appointmentData,
        date: new Date(appointmentData.date)
    })

    await appointment.save()
    
    await Promise.all([
        sendPatientConfirmation(appointment),
        sendDoctorNotification(appointment)
    ])

    return appointment
}

export const getAppointments = async () => {
    return await Appointment.find().sort({ date: 1, time: 1 })
}

export const checkAvailability = async (date, time) => {
    const appointmentDate = new Date(date)
    return await Appointment.findOne({ date: appointmentDate, time })
} 