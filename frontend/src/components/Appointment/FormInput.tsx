import React from 'react';
import { motion } from 'framer-motion';

interface FormInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const FormInput = ({ label, type, value, onChange, placeholder, required = true }: FormInputProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200"
      />
    </motion.div>
  );
};

export default FormInput;