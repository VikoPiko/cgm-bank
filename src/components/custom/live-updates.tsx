"use client";

import { useState, useEffect } from "react";

export default function LiveData() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const eventSource = new EventSource("/api/server-events/updates");

    eventSource.onmessage = (event) => {
      try {
        setData(JSON.parse(event.data));
      } catch (error) {
        console.error("Error parsing SSE data:", error);
      }
    };

    eventSource.onerror = () => {
      console.error("SSE connection error, reconnecting...");
      eventSource.close();
      setTimeout(() => {
        const newEventSource = new EventSource("/api/server-events/updates");
        newEventSource.onmessage = eventSource.onmessage;
      }, 2500); // Reconnect after 2.5s
    };

    return () => eventSource.close();
  }, []);

  return (
    <div>
      <h2>Live Updates</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
