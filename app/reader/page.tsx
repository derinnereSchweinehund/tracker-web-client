"use client"

import { useEffect, useState, useRef } from "react"


//note this uses local storage which has a 5MB cap meaning that perhaps at some point, a user must clear their cache to continue saving

//let audioFile: string; //React.RefObject<HTMLInputElement>= React.createRef();
export default function Reader() {
    const [audioFile, setAudioFile] = useState("");
    const [audioFileName, setAudioFileName] = useState("");
    const [playTime, setPlayTime] = useState("0");
    const time = useRef<HTMLAudioElement>();
    function handleFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        if (event.target.files) 
        {
            const file = event.target.files[0];
            setAudioFile(URL.createObjectURL(file));
            setAudioFileName(file.name);
        }
        
    }

    let n;
    function setTime() {
        if (audioFile && time.current) {
            localStorage.setItem(audioFileName, `${~~time.current.currentTime}`)
            ////console.log(localStorage.getItem(audioFileName))
        }
    }
    // useEffect(() => {        
    //     return () => {
    //         if (audioFile && time.current) {
    //             localStorage.setItem(audioFileName, `${~~time.current.currentTime}`)
    //         }
    //         }
    //     }, 
    //     [audioFile]) //useEffect is basically deprecated now, the call is in onTimeUpdate
    function adjustTime(n: number) {
            time.current ?
            time.current.currentTime+=n : 1+1
            //setPlayTime(String(~~(time.current.currentTime+n))) : setPlayTime(playTime);
        }

    function getPlayTime() {
        useEffect(() => {
            let a = localStorage.getItem(audioFileName)
            a ? setPlayTime(a) : setPlayTime("0")
            return () => {}}, [audioFileName])
            //////console.log(playTime);
            return playTime;
        }

    return (
    <main>
        <div>
            Reader
        </div>
        <audio controls onTimeUpdate={setTime} id="audioBox" src={audioFile+`#t=${getPlayTime()}`} ref={node => {
        if (node) {time.current = node}
      }}> </audio>
        <input type="file" accept="audio/*" id="fileBox" onChange={handleFileUpload} />
        <p id="buttonBar">
                <button onClick={() => adjustTime(-3600)} id="back60" title="Rewind one hour"> -60m </button>
                <button onClick={() => adjustTime(-600)} title="Rewind ten minutes"> -10m </button>
                <button onClick={() => adjustTime(-60)} title="Rewind one minute"> -1m </button>
                <button onClick={() => adjustTime(-10)} title="Rewind 10 seconds"> -10s </button>
                <button onClick={() => adjustTime(10)} title="Skip ahead 10 seconds"> 10s </button>
                <button onClick={() => adjustTime(60)} title="Skip ahead one minute"> 1m </button>
                <button onClick={() => adjustTime(600)} title="Skip ahead ten minutes"> 10m </button>
                <button onClick={() => {adjustTime(3600); time.current?.play()}} title="Skip ahead one hour"> 60m </button>
                </p>
    </main>
    )
}   