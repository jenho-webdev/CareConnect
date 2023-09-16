import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

export default function RequestsCalendar() {
  const localizer = momentLocalizer(moment);

  const now = new Date();
  const events = [
    {
      id: 1,
      title: "Test Event",
      start: now,
      end: now,
      type: "pending-request", // Event type
    },
    //add more events here to test
    {
      id: 15,
      title: "Test Event2",
      start: now,
      end: now,
      type: "accepted-request", // Event type
    },
    // Add more events with different types here
  ];
  // Function to set event styles based on event type
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";

    // Set background color based on event type
    switch (event.type) {
      case "pending-request":
        backgroundColor = "#F56565"; // Customize with your desired color
        break;
      case "accepted-request":
        backgroundColor = "#38B2AC"; // Customize with your desired color
        break;
      case "accepted-offer":
        backgroundColor = "#667EEA"; // Customize with your desired color
        break;
      // Add more cases for other event types
      default:
        backgroundColor = "#A0AEC0"; // Default color for unknown types
        break;
    }

    return {
      style: {
        backgroundColor,
      },
    };
  };
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
        eventPropGetter={eventStyleGetter} // Apply custom styles to events
      />
    </div>
  );
}
