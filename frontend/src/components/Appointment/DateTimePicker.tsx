import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SCHEDULE_DATA, getAvailableTimeSlots } from '../utils/schedule';
import { toast } from "react-hot-toast";

interface DateTimePickerProps {
  value: { date: string; time: string };
  onChange: (value: { date: string; time: string }) => void;
  label: string;
}

const DateTimePicker = ({ value, onChange, label }: DateTimePickerProps) => {
  const [availableTimeSlots, setAvailableTimeSlots] = useState<string[]>([]);

  // Get today's date
  const today = new Date();

  // Get date 3 months from now
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);

  // Format dates to YYYY-MM-DD for the input
  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    const selectedDate = new Date(newDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      toast.error('Cannot select a past date', {
        icon: '📅',
        duration: 4000
      });
      return;
    }
    
    onChange({ date: newDate, time: "" });
  };

  // Validate if selected date is a working day
  const validateDate = (date: string) => {
    const selectedDate = new Date(date);
    const day = selectedDate.getDay();
    // Return true for Monday-Friday (1-5)
    return day >= 1 && day <= 5;
  };

  const isTimeSlotAvailable = (time: string): boolean => {
    if (!value.date) return true;

    const [hours, minutes] = time.split(':').map(Number);
    const selectedDateTime = new Date(value.date);
    selectedDateTime.setHours(hours, minutes, 0, 0);

    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);

    return selectedDateTime > now;
  };

  const getFilteredTimeSlots = () => {
    if (!value.date) return [];
    
    const now = new Date();
    now.setMinutes(now.getMinutes() + 15);
    
    // Cache the current timestamp for comparison
    const minTime = now.getTime();
    
    return availableTimeSlots.filter(timeSlot => {
      const [hours, minutes] = timeSlot
        .replace(" AM", ":00")
        .replace(" PM", ":00")
        .split(':')
        .map(Number);
        
      const selectedDateTime = new Date(value.date);
      selectedDateTime.setHours(hours, minutes, 0, 0);
      
      return selectedDateTime.getTime() > minTime;
    });
  };

  useEffect(() => {
    if (value.date) {
      const selectedDate = new Date(value.date);
      const slots = getAvailableTimeSlots(selectedDate);
      setAvailableTimeSlots(slots);
    }
  }, [value.date]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label} <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          value={value.date}
          onChange={handleDateChange}
          min={formatDate(today)}
          max={formatDate(maxDate)}
          required
          className="w-full px-3 py-2 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
        />
      </div>

      {value.date && !validateDate(value.date) && (
        <p className="text-red-500 text-sm">
          Please select a working day (Monday-Friday)
        </p>
      )}

      {value.date && validateDate(value.date) && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.3 }}
          className="space-y-2"
        >
          <label className="block text-sm font-medium text-gray-700">
            Available Time Slots <span className="text-red-500">*</span>
          </label>
          <div>
            <select
              id="timeSlot"
              value={value.time}
              onChange={(e) => onChange({ ...value, time: e.target.value })}
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-pink-500 focus:border-pink-500 text-sm"
              required
            >
              <option value="">Select Time</option>
              {getFilteredTimeSlots().map((timeSlot) => (
                <option 
                  key={timeSlot} 
                  value={timeSlot.replace(" AM", ":00").replace(" PM", ":00")}
                >
                  {timeSlot}
                </option>
              ))}
            </select>
            {getFilteredTimeSlots().length === 0 && (
              <p className="text-sm text-gray-500 mt-2">
                No available time slots for this date. Please select another date.
              </p>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default DateTimePicker;
