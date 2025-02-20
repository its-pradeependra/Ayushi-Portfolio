import axios from 'axios';
import { AppointmentFormData } from '../types/appointment';
import config from '../config/config';

const api = axios.create({
    baseURL: config.apiUrl,
    headers: {
        'Content-Type': 'application/json'
    }
});

export default api;

export const appointmentService = {
    createAppointment: async (formData: AppointmentFormData) => {
        return api.post('/appointments', formData);
    },

    verifyAppointment: async (otp: string, appointmentData: AppointmentFormData) => {
        return api.post('/verify-appointment', { otp, appointmentData });
    }
}; 