import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./calendar.css";

// Event {
//   title: string,
//   start: Date,
//   end: Date,
//   allDay?: boolean
//   resource?: any,
// }

export default function RequestsCalendar({ events }) {
  const localizer = momentLocalizer(moment);

  // Function to set event styles based on event type
  const eventStyleGetter = (event, start, end, isSelected) => {
    let backgroundColor = "";

    // Set background color based on event type
    switch (event.type) {
      case "Open" || "Pending":
        backgroundColor = "#667EEA";
        if (isSelected) {
          backgroundColor = "#44549e";
        }
        break;
      case "Accepted" || "Assigned":
        backgroundColor = "#38B2AC";
        if (isSelected) {
          backgroundColor = "#236b68";
        }
        break;
      case "Closed" || "Completed":
        backgroundColor = "#535a63";
        if (isSelected) {
          backgroundColor = "#303338";
        }
        break;
      case "In-Progress":
        backgroundColor = "#de9921";
        if (isSelected) {
          backgroundColor = "#875e16";
        }
        break;
      default:
        backgroundColor = "#43756a";
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
    <div className="calendar">
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
