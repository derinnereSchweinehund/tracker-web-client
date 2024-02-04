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
    setActive(false);
    stopWatchInterval = setInterval(updateStopWatch, 100);
  }

  const stopStopWatch = () => {
    setActive(true);
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

  function helppro(n: number): string {
    if (n<10) {
      return "0"+String(n)
    }
    return String(n)
  }

  function process(n: number): string {
    let sec = helppro(n%60);
    let min = helppro(~~(n/60)%60);
    let hrs = helppro(~~(n/3600));

    return hrs + ":" + min + ":" + sec;
  }

  return (
    <main>
        {process(~~(update/1000))}
        <button className="btn-blue" disabled={!active} onClick={startStopWatch}> Play </button>
        <button className="btn" disabled={active} onClick={stopStopWatch}> Pause </button>
        <button className="btn" disabled={!update} onClick={resetStopWatch}> Reset </button>
    </main>
  );
}
