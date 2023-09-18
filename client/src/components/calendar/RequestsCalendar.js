import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

export default function RequestsCalendar({ events }) {
  const localizer = momentLocalizer(moment);

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
  // Define the views you want to display in the calendar
  const availableViews = {
    month: true,
    week: true,
    day: true,
  };

  return (
    <div className="calendar shadow">
      <Calendar
        localizer={localizer}
        defaultDate={new Date()}
        defaultView="month"
        events={events}
        style={{ height: "500px", width: "600px" }}
        startAccessor="start"
        endAccessor="end"
        eventPropGetter={eventStyleGetter} // Apply custom styles to events
        views={availableViews} // Set the available views
      />
    </div>
  );
}
