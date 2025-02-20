import { useState } from 'react';
import { Calendar, Loader2, X } from 'lucide-react';
import { Toaster } from 'react-hot-toast';
import { useAppointment } from '../../hooks/useAppointment';
import { AppointmentFormData } from '../../types/appointment';
// ... rest of the imports

const AppointmentForm = () => {
    const {
        isSubmitting,
        showOTPInput,
        otp,
        setOTP,
        handleAppointmentSubmit,
        handleOTPVerification,
        resetForm
    } = useAppointment();

    const [formData, setFormData] = useState<AppointmentFormData>({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    });

    // ... rest of the component code
}; 