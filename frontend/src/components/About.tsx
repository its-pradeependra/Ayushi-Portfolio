import { motion } from 'framer-motion';
import { Award, GraduationCap, Stethoscope, Users } from 'lucide-react';

const timelineData = [
  {
    year: '2008',
    title: 'Medical School',
    description: 'Graduated from Harvard Medical School',
    icon: GraduationCap,
  },
  {
    year: '2012',
    title: 'Residency',
    description: 'Completed Internal Medicine Residency at Mayo Clinic',
    icon: Stethoscope,
  },
  {
    year: '2015',
    title: 'Private Practice',
    description: 'Started private practice focusing on preventive care',
    icon: Users,
  },
  {
    year: '2020',
    title: 'Excellence Award',
    description: 'Received Medical Excellence Award',
    icon: Award,
  },
];

const About = () => {
  return (
    <section id='about' className="sm:py-40 bg-white py-12">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl font-bold text-gray-900 mb-4"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">About Dr. Ayushi Shakya</h2></motion.h2>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            <p className="text-gray-600 max-w-2xl mx-auto">
              Dedicated to providing exceptional medical care with a focus on patient
              education and preventive medicine. My journey in healthcare spans over a
              decade of continuous learning and patient care.
            </p>
          </motion.p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-pink-100" />

          {/* Timeline items */}
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex items-center justify-between mb-8 ${index % 2 === 0 ? 'flex-row-reverse' : ''
                }`}
            >
              <div className="w-5/12" />
              <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-12 h-12 rounded-full bg-pink-500 flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <div className="w-5/12">
                <div className="bg-pink-50 p-3 md:p-6 rounded-lg shadow-sm">
                  <span className="text-pink-500 font-semibold">{item.year}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-1">{item.title}</h3>
                  <p className="text-gray-600 mt-2">{item.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;