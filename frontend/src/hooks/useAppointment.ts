import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { appointmentService } from '../services/api';
import { AppointmentFormData } from '../types/appointment';
import useSound from 'use-sound';

export const useAppointment = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState('');
    const [tempAppointmentData, setTempAppointmentData] = useState<AppointmentFormData | null>(null);
    const [playSuccess] = useSound('/sounds/appointment-success.mp3');
    const [playError] = useSound('/sounds/appointment-error.mp3');

    const handleAppointmentSubmit = async (formData: AppointmentFormData) => {
        setIsSubmitting(true);
        const loadingToast = toast.loading('Booking appointment...');

        try {
            const response = await appointmentService.createAppointment(formData);
            const data = response.data;

            if (data.success && data.requiresOTP) {
                setShowOTPInput(true);
                setTempAppointmentData(formData);
                toast.success('Please check your email for verification code.');
            } else if (!data.success) {
                playError();
                toast.error(data.message);
            }
        } catch (error) {
            playError();
            toast.error('Failed to book appointment. Please try again.');
        } finally {
            toast.dismiss(loadingToast);
            setIsSubmitting(false);
        }
    };

    const handleOTPVerification = async () => {
        if (!tempAppointmentData) return;

        const loadingToast = toast.loading('Verifying...');
        
        try {
            const response = await appointmentService.verifyAppointment(otp, tempAppointmentData);
            const data = response.data;

            if (data.success) {
                playSuccess();
                toast.success('Appointment verified and booked successfully!');
                resetForm();
            } else {
                playError();
                toast.error(data.message || 'Invalid or expired verification code');
            }
        } catch (error) {
            playError();
            toast.error('Failed to verify OTP. Please try again.');
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    const resetForm = () => {
        setShowOTPInput(false);
        setOTP('');
        setTempAppointmentData(null);
    };

    return {
        isSubmitting,
        showOTPInput,
        otp,
        setOTP,
        handleAppointmentSubmit,
        handleOTPVerification,
        resetForm
    };
}; 