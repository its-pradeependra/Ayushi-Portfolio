import { Award, Heart, Microscope, Users } from 'lucide-react';
import doctor2 from '../assets/images/doctor2.png'
import { motion } from 'framer-motion';

const WhyChoose = () => {
  const reasons = [
    {
      icon: Award,
      title: 'Experience and Expertise',
      description: 'With 14 years of experience in the field of hematology and oncology, Dr. Smith brings a wealth of knowledge and expertise to his practice.'
    },
    {
      icon: Heart,
      title: 'Compassionate Patient Care',
      description: 'We believe in a patient-centered approach, ensuring each individual receives personalized attention and comprehensive support throughout their treatment journey.'
    },
    {
      icon: Microscope,
      title: 'Cutting-edge Treatments',
      description: 'Access to the latest therapeutic approaches, including immunotherapy, targeted treatments, and clinical trials.'
    },
    {
      icon: Users,
      title: 'Community Involvement',
      description: 'Active participation in community health initiatives and ongoing commitment to patient education and support.'
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-b from-pink-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-16">
              Why Choose
              <span className="text-pink-600"> Dr. Ayushi Shakya</span>
            </h2>
            </motion.h2>
            <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: -1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                  <reason.icon className="h-8 w-8 text-pink-600 mb-4" />
                  <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
                  <p className="text-gray-600 text-sm">{reason.description}</p>
                </div>
              ))}
            </div>
              </motion.div>
          </div>
          

          <div className="relative">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden sm:block"
          >
            <img
              src={doctor2}
              alt="Dr. Ayushi Shakya"
              className="w-full max-w-md mx-auto"
            />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChoose;
