export interface TimeSlot {
    hour: number;
    minute: number;
  }
  
  export interface Schedule {
    day: string;
    startTime: TimeSlot;
    endTime: TimeSlot;
  }
  
  export const SCHEDULE_DATA: Schedule[] = [
    { day: 'Monday', startTime: { hour: 10, minute: 0 }, endTime: { hour: 17, minute: 0 } },
    { day: 'Tuesday', startTime: { hour: 9, minute: 0 }, endTime: { hour: 16, minute: 0 } },
    { day: 'Wednesday', startTime: { hour: 10, minute: 0 }, endTime: { hour: 17, minute: 0 } },
    { day: 'Thursday', startTime: { hour: 9, minute: 0 }, endTime: { hour: 16, minute: 0 } },
    { day: 'Friday', startTime: { hour: 13, minute: 0 }, endTime: { hour: 17, minute: 0 } }
  ];
  
  export const APPOINTMENT_DURATION = 30; // minutes
  
  export function isValidAppointmentDay(date: Date): boolean {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    return SCHEDULE_DATA.some(schedule => schedule.day === dayName);
  }
  
  export function getAvailableTimeSlots(date: Date): string[] {
    const dayName = date.toLocaleDateString('en-US', { weekday: 'long' });
    const schedule = SCHEDULE_DATA.find(s => s.day === dayName);
    
    if (!schedule) return [];
    
    const slots: string[] = [];
    const { startTime, endTime } = schedule;
    
    let currentHour = startTime.hour;
    let currentMinute = startTime.minute;
    
    while (
      currentHour < endTime.hour || 
      (currentHour === endTime.hour && currentMinute < endTime.minute)
    ) {
      slots.push(
        `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`
      );
      
      currentMinute += APPOINTMENT_DURATION;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }
    
    return slots;
  }