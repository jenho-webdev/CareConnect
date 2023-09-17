import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../App.css";
export default function RequestsCalendar() {
  const localizer = momentLocalizer(moment);

  const now = new Date();
  const events = [
    {
      id: 15,
      title: "balh",
      start: now,
      end: now,
    },
    //add more events here to test
  ];

  return (
    <div>
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "50vh", width: "w-0.5" }}
        startAccessor="start"
        endAccessor="end"
      />
    </div>
  );
}
