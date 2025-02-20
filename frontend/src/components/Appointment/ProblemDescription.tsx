import React from 'react';
import { motion } from 'framer-motion';

interface ProblemDescriptionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const ProblemDescription = ({ value, onChange }: ProblemDescriptionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl text-center font-semibold mb-4 text-gray-900">Problem Description</h3>
      <textarea
        className="w-full px-4 py-2 rounded-lg border-gray-300 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all duration-200 min-h-[170px] resize-y"
        value={value}
        onChange={onChange}
        placeholder="Please describe your medical concern in detail..."
        required
      />
    </motion.div>
  );
};

export default ProblemDescription;