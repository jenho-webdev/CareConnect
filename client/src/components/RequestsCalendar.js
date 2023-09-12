import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function RequestsCalendar() 
{
  const localizer = momentLocalizer(moment);

  const events = [
    {
      title: 'Event 1',
      start: new Date(2023, 0, 1),
      end: new Date(2023, 0, 2),
    },
    // Add more events here
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
