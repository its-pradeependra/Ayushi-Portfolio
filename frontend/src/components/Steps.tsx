import { PhoneCall, ClipboardList, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Steps = () => {
  const steps = [
    {
      icon: PhoneCall,
      title: "Call or make an online appointment",
      description: "Schedule your visit through our online booking system or call our office directly."
    },
    {
      icon: ClipboardList,
      title: "Provide your symptoms",
      description: "Share your medical history and current symptoms to help us prepare for your visit."
    },
    {
      icon: CheckCircle,
      title: "Get confirmation",
      description: "Receive appointment confirmation via email or phone with all necessary details."
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-pink-50/50 to-white">
              <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
        <h2 className="md:text-4xl text-3xl font-bold text-center mb-12 md:pb-12">
          Easy Steps and Get Your Solution
        </h2>
        </motion.h2>
    
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4 transition-transform transform group-hover:scale-105 group-hover:shadow-lg">
                <step.icon className="h-8 w-8 text-pink-600" />
                <div className="absolute inset-0 rounded-full border-2 border-transparent group-hover:ring-pink-300"></div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
            </div>
          ))}
        </div>

      </div>
      </motion.div>
    </section>
  );
};

export default Steps;