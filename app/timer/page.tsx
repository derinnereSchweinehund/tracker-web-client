"use client";

import { useState } from "react";

let stopWatchInterval: NodeJS.Timeout;

let startTime: number;
let timePaused: number = 0;
export default function Home() {
  const [active, setActive] = useState(true)
  const [update, setUpdate] = useState(0)
  const [countDownTime, setCountDownTime] = useState(86400)

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
    
    if (!active && countDownTime-~~(update/1000) < 0) {
      if (!active) {
        setActive(!active);
        requestAnimationFrame(() => {
          document.body.style.backgroundColor = "red";
          requestAnimationFrame(() => {resetStopWatch(); alert("TIMER DONE"); document.body.style.backgroundColor = ""});
        });      
        
      }
    } //  intervals dont update internal variables to global state
    return hrs + ":" + min + ":" + sec;
  }

  return (
    <main>
      <p className="text-[100px] m-5">
        {process(countDownTime-~~(update/1000))}
      </p>       
      <p>        
        <input className="m-5 text-[gray]"
          value={countDownTime} 
          onChange={ e => {
            let val = Number(e.target.value.replace(/\D/,''))
            val < 86400 ? setCountDownTime(val) : setCountDownTime(countDownTime);
            }
          }
        />
      </p> 
    <button className="border rounded-full px-4 py-2 bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={!active} onClick={startStopWatch}> Play </button>
    <button className="border rounded-full px-4 py-2 bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={active} onClick={stopStopWatch}> Pause </button>
    <button className="border rounded-full px-4 py-2 bg-blue-500 hover:bg-green-500 disabled:bg-slate-600 m-5" disabled={!update} onClick={resetStopWatch}> Reset </button>
    </main>
  );
}
