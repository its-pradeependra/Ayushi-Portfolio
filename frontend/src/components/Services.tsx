import React from 'react';
import { motion } from 'framer-motion';
import { Droplet, Syringe, Activity } from 'lucide-react';

const ServiceCard = ({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) => (
  
  <div className="service-card group relative p-4 lg:p-6 rounded-lg bg-white shadow-lg transition-transform transform md:hover:scale-110 hover:shadow-xl">
    <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-pink-500 group-hover:ring-2 group-hover:ring-pink-300 transition-all"></div>
    <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-pink-200 transition-colors">
      <Icon className="h-8 w-8 text-pink-600" />
    </div>
    <h3 className="text-xl font-semibold mb-4">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);


const Services = () => {
  const services = [
    {
      icon: Droplet,
      title: "Hematologic Malignancies",
      description: "Specialized treatment for blood-related cancers with personalized care plans."
    },
    {
      icon: Syringe,
      title: "Chemotherapy and Immunotherapy",
      description: "Advanced treatment options using the latest therapeutic approaches."
    },
    {
      icon: Activity,
      title: "Blood Transfusions and Bone Marrow Biopsies",
      description: "Expert diagnostic and therapeutic procedures with careful monitoring."
    }
  ];

  return (
    <section  id='services' className="min-h-screen py-8 md:py-16 bg-gradient-to-b from-pink-50/50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-4 w-full">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-8 md:mb-12"
        >
          Our Services
        </motion.h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">      
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;