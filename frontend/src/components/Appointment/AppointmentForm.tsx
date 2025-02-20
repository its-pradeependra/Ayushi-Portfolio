import React, { useState, useCallback } from 'react';
import { Calendar, Loader2, X } from 'lucide-react';
import { toast, Toaster } from 'react-hot-toast';
import ScheduleCard from './ScheduleCard';
import ProblemDescription from './ProblemDescription';
import FormInput from './FormInput';
import DateTimePicker from './DateTimePicker';
import useSound from 'use-sound';
import appointmentService from '../../services/appointmentService';

interface AppointmentFormData {
    name: string;
    email: string;
    phone: string;
    date: string;
    time: string;
    message: string;
}

interface DateTimeValue {
    date: string;
    time: string;
}


const OTPModal: React.FC<{
    isOpen: boolean;
    onClose: () => void;
    otp: string;
    setOTP: (value: string) => void;
    onVerify: () => void;
}> = ({ isOpen, onClose, otp, setOTP, onVerify }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            
            {/* Modal */}
            <div className="relative bg-white rounded-xl shadow-xl w-full max-w-md mx-4 p-6">
                {/* Close button */}
                <button 
                    onClick={onClose}
                    className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
                >
                    <X className="h-6 w-6" />
                </button>

                {/* Modal content */}
                <div className="text-center">
                    <div className="mb-6">
                        <div className="h-20 w-20 bg-red-100 rounded-full mx-auto flex items-center justify-center">
                            <span className="text-red-500 text-4xl">!</span>
                        </div>
                    </div>

                    <h3 className="text-xl font-semibold mb-2">
                        Enter Verification Code
                    </h3>
                    
                    <p className="text-gray-600 mb-6">
                        Please enter the verification code sent to your email.
                    </p>

                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOTP(e.target.value)}
                        placeholder="Enter 6-digit code"
                        maxLength={6}
                        className="w-48 px-4 py-3 text-center text-2xl tracking-widest rounded-lg border-2 border-gray-300 focus:border-pink-500 focus:outline-none mb-6"
                    />

                    <div className="flex gap-4">
                        <button 
                            onClick={onClose}
                            className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={onVerify}
                            className="flex-1 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600"
                        >
                            Verify
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const AppointmentForm: React.FC = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<AppointmentFormData>({
        name: '',
        email: '',
        phone: '',
        date: '',
        time: '',
        message: ''
    });
    const [playSuccess] = useSound('/sounds/appointment-success.mp3');
    const [playError] = useSound('/sounds/appointment-error.mp3');
    const [showOTPInput, setShowOTPInput] = useState(false);
    const [otp, setOTP] = useState('');
    const [tempAppointmentData, setTempAppointmentData] = useState<AppointmentFormData | null>(null);

    const handleChange = useCallback((field: keyof AppointmentFormData) => (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setFormData(prev => ({ ...prev, [field]: e.target.value }));
    }, []);

    const handleDateTimeChange = useCallback((value: DateTimeValue) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const selectedDate = new Date(value.date);
        selectedDate.setHours(0, 0, 0, 0);

        if (value.date && selectedDate < today) {
            toast.error('Cannot select a past date', { icon: '📅' });
            return;
        }

        setFormData(prev => ({ ...prev, date: value.date, time: value.time }));
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.date || !formData.time) {
            playError();
            toast.error('Please select both date and time');
            return;
        }

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
        } catch (error: any) {
            playError();
            // Check for specific error response
            if (error.response?.status === 400) {
                toast('Time slot is not available, Please select another slot', {
                    icon: '⚠️',
                    duration: 4000,
                    style: {
                      background: '#FFA500', // Orange color for warning
                      color: 'white',
                    },
                  });
            } else {
                toast.error('Failed to book appointment. Please try again.', {
                    duration: 4000,
                    icon: '❌'
                });
            }
        } finally {
            toast.dismiss(loadingToast);
            setIsSubmitting(false);
        }
    };

    const handleOTPVerification = async () => {
        const loadingToast = toast.loading('Verifying...');
        
        try {
            if (!otp || otp.length !== 6) {
                playError();
                toast.error('Please enter a valid 6-digit OTP code', {
                    duration: 4000,
                    icon: '❌'
                });
                return;
            }

            if (!tempAppointmentData) {
                playError();
                toast.error('Appointment data missing, please try again', {
                    duration: 4000,
                    icon: '❌'
                });
                return;
            }

            const response = await appointmentService.verifyAppointment(otp, tempAppointmentData);
            const data = response.data;

            if (data.success) {
                playSuccess();
                toast.success('Appointment verified and booked successfully!', {
                    duration: 5000,
                    icon: '✅'
                });
                setShowOTPInput(false);
                setOTP('');
                setTempAppointmentData(null);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    date: '',
                    time: '',
                    message: ''
                });
            } else {
                playError();
                toast.error(data.message || 'Invalid or expired verification code', {
                    duration: 4000,
                    icon: '❌'
                });
            }
        } catch (error: any) {
            playError();
            const errorMessage = error.response?.data?.message || 'Failed to verify OTP. Please try again.';
            toast.error(errorMessage, {
                duration: 4000,
                icon: '❌'
            });
            console.error('OTP Verification Error:', error);
        } finally {
            toast.dismiss(loadingToast);
        }
    };

    return (
        <section className=" min-h-screen py-8 md:py-16 bg-gradient-to-b from-pink-50/50 to-white flex items-center" id='appointment'>
            <Toaster 
                position="top-right"
                toastOptions={{
                    success: {
                        style: {
                            background: '#10B981',
                            color: 'white',
                        },
                    },
                    error: {
                        style: {
                            background: '#EF4444',
                            color: 'white',
                        },
                    },
                }}
            />

            {/* Add Modal */}
            <OTPModal 
                isOpen={showOTPInput}
                onClose={() => setShowOTPInput(false)}
                otp={otp}
                setOTP={setOTP}
                onVerify={handleOTPVerification}
            />

            <div className="max-w-7xl mx-auto px-4">
                <h2 className="text-4xl font-bold text-center text-gray-900 mb-14">
                    Schedule Your Visit
                </h2>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <ScheduleCard />

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <FormInput
                            label="Full Name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange('name')}
                            required
                        />

                        <div className="grid grid-cols-2 gap-4">
                            <FormInput
                                label="Phone"
                                type="tel"
                                value={formData.phone}
                                onChange={handleChange('phone')}
                                required
                            />
                            <FormInput
                                label="Email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange('email')}
                                required
                            />
                        </div>

                        <DateTimePicker
                            value={{ date: formData.date, time: formData.time }}
                            onChange={handleDateTimeChange}
                            label="Select Date and Time"
                        />
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg space-y-4">
                        <ProblemDescription
                            value={formData.message}
                            onChange={handleChange('message')}
                        />


                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-pink-500 text-white px-6 py-3 rounded-lg hover:bg-pink-600 
                                     disabled:bg-pink-300 disabled:cursor-not-allowed shadow-md"
                        >
                            {isSubmitting ? (
                                <Loader2 className="h-5 w-5 animate-spin mx-auto" />
                            ) : (
                                <span className="flex items-center justify-center gap-2">
                                    <Calendar className="h-5 w-5" />
                                    Schedule Appointment
                                </span>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default AppointmentForm;