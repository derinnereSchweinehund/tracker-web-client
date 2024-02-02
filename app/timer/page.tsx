"use client";

import { useState } from "react";

let stopWatchInterval: NodeJS.Timeout;

let startTime: number;
let timePaused: number = 0;

export default function Home() {
  const [active, setActive] = useState(true)
  const [update, setUpdate] = useState(0)

  const startStopWatch = () => {
    startTime = new Date().getTime();
    setActive(!active);
    stopWatchInterval = setInterval(updateStopWatch, 1000);
  }

  const stopStopWatch = () => {
    setActive(!active);
    clearInterval(stopWatchInterval);
    timePaused += new Date().getTime() - startTime;
  }

  const resetStopWatch = () => {
    setUpdate(0);
    stopStopWatch();
    timePaused = 0;
  }

  const updateStopWatch = () => {
    setUpdate(timePaused + new Date().getTime() - startTime);
  }

  return (
    <main>
        Timer
        {~~(update/1000)}
        <button className="btn-blue" disabled={!active} onClick={startStopWatch}> Start </button>
        <button className="btn" disabled={active} onClick={stopStopWatch}> Pause </button>
        <button className="btn" disabled={active} onClick={resetStopWatch}> Reset </button>
    </main>
  );
}
