import React, { useEffect } from "react";
import { GET_INIT_EVENT_URL } from "../utils/constants";

const useInitSSE = (setter) => {
  useEffect(() => {
    const source = new EventSource(GET_INIT_EVENT_URL);

    source.addEventListener('open', () => {
      console.log("Subscribed!");
    });

    source.addEventListener('message', (message) => {
      console.log("Got", message);

      // Display the event data in the `content` div
      setter()
    });

    return () => {
      source.removeEventListener('open')
      source.removeEventListener('message')
    };
  }, []);
};

export default useInitSSE;
