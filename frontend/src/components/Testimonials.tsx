import { Quote } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    quote: "Dr. Smith's expertise and compassionate care made a significant difference in my treatment journey. His ability to explain complex medical terms in simple language helped me understand my condition better.",
    name: "Sarah Johnson"
  },
  {
    quote: "The level of care and attention I received from Dr. Smith and his team was exceptional. They were always available to answer my questions and address my concerns.",
    name: "Michael Chen"
  },
  {
    quote: "I'm grateful for Dr. Smith's thorough approach to my treatment. His expertise and dedication to patient care are truly remarkable.",
    name: "Emily Rodriguez"
  }
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h2 className="md:text-4xl text-3xl font-bold text-center mb-12 md:pb-12">
              Valuable Appreciations from Former Patients
            </h2>
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-white shadow-md transition-transform transform hover:scale-110 hover:shadow-lg"
              >
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-pink-500 group-hover:ring-2 group-hover:ring-pink-300 transition-all"></div>
                <Quote className="h-8 w-8 text-pink-600 mb-4" />
                <p className="text-gray-600 mb-4">{testimonial.quote}</p>
                <p className="font-medium text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
