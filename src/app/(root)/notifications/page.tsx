import RelativeTime from "@/components/custom/RelativeTime";
import React from "react";

const Notifications = () => {
  const eventTimestamp = "2025-02-19T01:00:00"; // Replace with an actual timestamp
  return (
    <div>
      <h1>Event occurred</h1>
      <p>
        Event happened <RelativeTime timestamp={eventTimestamp} />
      </p>
    </div>
  );
};

export default Notifications;
