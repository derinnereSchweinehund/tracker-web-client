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
    return n < 10 ? n < 0 ? "00" : "0"+String(n) : String(n)
  }

  function process(n: number): string {
    let sec = helppro(n%60);
    let min = helppro(~~(n/60)%60);
    let hrs = helppro(~~(n/3600));
    return hrs + ":" + min + ":" + sec;
  }

  return (
    <main>
        <p className="text-[100px]">{process(~~(update/1000))}</p>
        
        <button className="bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={!active} onClick={startStopWatch}> Play </button>
        <button className="bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={active} onClick={stopStopWatch}> Pause </button>
        <button className="bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={!update} onClick={resetStopWatch}> Reset </button>
    </main>
  );
}
