// components/RelativeTime.js
import moment from 'moment';

const RelativeTime = ({ timestamp }: {timestamp: string}) => {
  const relativeTime = moment(timestamp).fromNow();

  return <span>{relativeTime}</span>;
};

export default RelativeTime;
