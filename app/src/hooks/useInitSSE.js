import React, { useEffect } from "react";
import { GET_INIT_EVENT_URL } from "../utils/constants";

const useInitSSE = (setPathChanged, setClientId ) => {
  useEffect(() => {
    const source = new EventSource(GET_INIT_EVENT_URL);

    source.addEventListener('open', (message) => {
      console.log('Successfully subscribed!');
    });

    source.addEventListener('message', (message) => {
      const data = JSON.parse(message.data);
      console.log("Message received: ", data);
      if (data.clientId) {
        setClientId(data.clientId)
      } else if (data.path) {
        setPathChanged(data.path)
      }
    });

    return () => {
      source.removeEventListener('open')
      source.removeEventListener('message')
    };
  }, []);
};

export default useInitSSE;
