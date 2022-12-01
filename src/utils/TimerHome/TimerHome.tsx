import { useEffect, useMemo, useState } from "react";
import './TimerHome.scss'
const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

export const TimerHome = ({ deadline = new Date().toString(), keys }: {deadline: string, keys: number| string}) => {

  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000
    );
    return () => clearInterval(interval);
  }, [parsedDeadline]);

  return (
  <div key={keys} className="d-flex justify-content-start text-center mt-3">
      <div className="deals-countdown w-100">
      {Object.entries({
        Days: time / DAY,
        Hours: (time / HOUR) % 24,
        Minutes: (time / MINUTE) % 60,
        Seconds: (time / SECOND) % 60,
      }).map(([label, value], i) => (
          <span key={value + i} className="countdown-section">
            <span className="countdown-amount hover-up">{`${Math.floor(value)}`.padStart(2, "0")}</span>
            <span  className="countdown-period">{label}</span>
          </span>
      ))}
        </div>
    </div>
  );
};
