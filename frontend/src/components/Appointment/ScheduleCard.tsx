import { motion } from 'framer-motion';

const scheduleData = [
  { day: 'Monday', time: '10:00 AM to 5:00 PM' },
  { day: 'Tuesday', time: '9:00 AM to 4:00 PM' },
  { day: 'Wednesday', time: '10:00 AM to 5:00 PM' },
  { day: 'Thursday', time: '9:00 AM to 4:00 PM' },
  { day: 'Friday', time: '1:00 PM to 5:00 PM' }
];

const ScheduleCard = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-8 rounded-xl shadow-lg"
    >
      <h3 className="text-2xl text-center font-semibold mb-6 text-gray-900">Appointment Schedule</h3>
      <div className="space-y-4">
        {scheduleData.map((schedule, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="flex justify-between items-center border-b border-pink-100 pb-3"
          >
            <span className="font-medium text-gray-800">{schedule.day}</span>
            <span className="text-pink-600 font-medium">{schedule.time}</span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ScheduleCard;