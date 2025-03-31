import moment from "moment";

const RelativeTime = ({ timestamp }: { timestamp: string | Date }) => {
  const timeString =
    typeof timestamp === "string" ? timestamp : timestamp.toISOString();
  const relativeTime = moment(timeString).fromNow();

  return <span>{relativeTime}</span>;
};

export default RelativeTime;
