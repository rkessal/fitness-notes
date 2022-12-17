import { useEffect, useState } from "react";

const useTimer = () => {
  const [totalTime, setTotalTime] = useState(0);
  const [seconds, setSeconds] = useState(totalTime);
  const [minutes, setMinutes] = useState(totalTime);
  const [timer, setTimer] = useState<NodeJS.Timer>();
  const [start, setStart] = useState(false);

  useEffect(() => {
    setSeconds(() => totalTime % 60);
    setMinutes(() => Math.floor(totalTime / 60));
  }, [totalTime]);

  const resetTimer = () => {
    stopTimer();
    setStart(false);
    setTotalTime(() => 0);
  };

  const manageTimer = (state: boolean) => {
    !state ? startTimer() : stopTimer();
  };

  const startTimer = () => {
    setTimer(() => setInterval(() => setTotalTime((curr) => curr + 1), 1000));
  };

  const stopTimer = () => {
    clearInterval(timer);
  };

  return {
    minutes,
    seconds,
    start,
    totalTime,
    setStart,
    manageTimer,
    resetTimer,
  };
};

export default useTimer;
