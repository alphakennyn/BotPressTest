import React, { useEffect } from "react";
import { GET_INIT_EVENT_URL } from "../utils/constants";

const useInitSSE = (setPathChanged, setClientId ) => {

  const openHandler = () => (message) => {
    console.log('Successfully subscribed!');
  }

  const messageHandler = (message) => {
    const data = JSON.parse(message.data);
    console.log("Message received: ", data);
    if (data.clientId) {
      setClientId(data.clientId)
    } else if (data.path) {
      setPathChanged(data.path)
    }
  }

  useEffect(() => {
    const source = new EventSource(GET_INIT_EVENT_URL);

    source.addEventListener('open', openHandler);
    source.addEventListener('message', messageHandler);

    return () => {
      source.removeEventListener('open', openHandler)
      source.removeEventListener('message', messageHandler)
    };
  }, []);
};

export default useInitSSE;
