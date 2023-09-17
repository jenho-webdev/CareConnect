import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_REQUEST } from "../utils/mutations";
import { Button, Input, Textarea } from "@nextui-org/react";

const RequestForm = () => {
  const [request, setRequest] = useState({
    requestTitle: "",
    streetAddress: "",
    city: "",
    state: "",
    zip: "",
    type: "",
    startDateTime: "",
    endDateTime: "",
    requestText: "",
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const [createRequest, { error }] = useMutation(ADD_REQUEST);

  // Check if the event time is valid
  const isEventTimeValid = () => {
    const { startDateTime, endDateTime } = request;
    const current = new Date();
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    return start <= end && start >= current;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    let eventStart = "";
    let eventEnd = "";
    // Combine the separate address fields into a single "location" value
    const { streetAddress, city, state, zip } = request;
    const combinedLocation = `${streetAddress}, ${city}, ${state} ${zip}`;

    if (!isEventTimeValid) {
      // Request time is invalid, show an alert and return
      setShowAlert(true);
      setAlertMessage(
        "Invalid event time. Please check your event start and end time."
      );
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
      }, 3000); // Adjust the time as needed (measured in milliseconds)
      return;
    }

    // Use eventStart and eventEnd in your logic
    console.log("Event Start:", eventStart);
    console.log("Event End:", eventEnd);

    try {
      const mutationResponse = await createRequest({
        variables: {
          requestTitle: request.requestTitle,
          location: combinedLocation,
          type: "Request",
          startTime: request.startDateTime,
          endTime: request.endDateTime,
          requestText: request.requestText,
        },
      });
      if (!mutationResponse.data.createRequest) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
        }, 3000); // Adjust the time as needed (measured in milliseconds)
        return;
      }

      setRequest("");
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({
      ...request,
      [name]: value,
    });
  };

  return (
    <div className="flex-wrap my-1">
      <h4>Create a request below.</h4>

      {Auth.loggedIn() ? (
        <form onSubmit={handleFormSubmit}>
          <div className="flex-row my-1 w-full">
            <Input
              isRequired
              name="requestTitle"
              id="requestTitle"
              type="requestTitle"
              label="Request Title"
              placeholder="Name your Request"
              className="min-w-full shadow-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row my-1 w-full">
            <Input
              isRequired
              name="streetAddress"
              type="streetAddress"
              label="Street address"
              placeholder="12345, Main St"
              id="streetAddress"
              className="min-w-full shadow-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row my-1 w-full">
            <Input
              isRequired
              name="city"
              type="city"
              label="City"
              placeholder="Irvine"
              id="city"
              className="min-w-full shadow-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row my-1 w-full">
            <Input
              isRequired
              name="state"
              type="state"
              label="State"
              placeholder="CA"
              id="state"
              className="min-w-full shadow-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row my-1 w-full">
            <Input
              isRequired
              name="zip"
              type="zip"
              label="ZipCode"
              placeholder="92618"
              id="Zip"
              className="min-w-full shadow-lg"
              onChange={handleChange}
            />
          </div>
          <div className="flex-row my-1 w-full">
            <Textarea
              label="Description"
              name="requestText"
              id="requestText"
              labelPlacement="inside"
              placeholder="Enter your description"
              className="max-w-full shadow"
              onChange={handleChange}
            />
          </div>
          {/* day and time pickers */}
          <div className="flex flex-row">
            {/* <label className="self-center">End Date and Time:</label> */}
            <Input
              name="startDateTime"
              id="startDateTime"
              className="self-center my-5 "
              label="Start Date and Time"
              labelPlacement="outside-left"
              type="datetime-local"
              selected={request.startDay}
              onChange={handleChange}
            />
          </div>

          <div className="flex flex-row">
            {/* <label>End Date and Time:</label> */}
            <Input
              name="endDateTime"
              id="endDateTime"
              label="End Date and Time"
              labelPlacement="outside-left"
              type="datetime-local"
              selected={request.startDay}
              onChange={handleChange}
            />
          </div>

          {/* buttons row */}
          <div className="flex-row my-5 justify-center">
            <Button
              type="submit"
              className="w-full max-w-sm bg-gradient-to-tr from-teal-600 to-zinc-800 text-white shadow-lg"
            >
              Create Request
            </Button>
          </div>
          {(error || showAlert) && (
            <div className="col-12 my-3 bg-danger text-white p-3">
              {error.message}
            </div>
          )}
        </form>
      ) : (
        <div className="justify-center">
          <h1>
            You need to be logged in to create request. Please{" "}
            <Link className="underline" to="/login">
              login
            </Link>{" "}
            or{" "}
            <Link className="underline" to="/signup">
              signup.
            </Link>
          </h1>
        </div>
      )}
    </div>
  );
};

export default RequestForm;
