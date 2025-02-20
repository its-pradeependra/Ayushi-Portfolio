import api from './api';
import { AppointmentFormData } from '../types/appointment';

export const appointmentService = {
    createAppointment: async (formData: AppointmentFormData) => {
        return api.post('/appointments', formData);
    },

    verifyAppointment: async (otp: string, appointmentData: AppointmentFormData) => {
        try {
            const response = await api.post('/verify-appointment', {
                otp,
                appointmentData
            });
            return response;
        } catch (error: any) {
            console.error('Verification error:', error);
            throw error;
        }
    }
};

export default appointmentService; 