import { motion } from 'framer-motion';
import { Stethoscope } from 'lucide-react';
import doctor from '../assets/images/doctor.png'

const Hero = () => {

  return (
    <section id='home' className="md:py-0  relative min-h-screen bg-gradient-to-b from-pink-50 to-white overflow-hidden">
      {/* Animated background elements */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 bg-pink-100 rounded-full"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
      
      <div className="container mx-auto px-6 h-screen flex items-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: -1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <Stethoscope className="w-8 h-8 text-pink-500" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Dedicated to Your
              <span className="text-pink-500"> Health & Wellness</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8">
              With over 15 years of experience in internal medicine, providing comprehensive
              care with a patient-centered approach.
            </p>
            <a href="#appointment">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors"
            >
              Book Appointment
            </motion.button>
            </a>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="relative hidden md:block"
          >
            <img
              src={doctor}
              alt="Doctor"
              className="w-full max-w-md mx-auto" style={{
                transform: 'scaleX(-1)'
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;