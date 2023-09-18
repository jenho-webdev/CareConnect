import React, { useEffect, useState } from "react";
import RequestForm from "../components/RequestForm";

const Request = () => {
  useEffect(() => {
    document.title = "CareConnect | "; // TODO: Pass in request title
  }, []);

  const [createBtnState, setCreateBtnState] = useState(false);

  return (
    <div>
      {/* TODO: 
                 A outer container for the request form and other components (if any) to goes inside
                
                RequestsList component ( A list that list all the global requests)
                    -A "filter" dropdown to filter the requests by "my request" and "all requests"
                    -Sign Up Button (if not creator of request) to offer help to the request 
                    - A Delete Button (if creator of request) to delete the request(row)
                    -Edit Button (if creator of request) to edit the request(row)


            */}

      {/* if create new request button clicked open the RequestForm */}
      {createBtnState && <RequestForm />}
    </div>
  );
};

export default Request;
