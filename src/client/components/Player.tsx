import React, {useRef, useState} from 'react'
import {fmtTime, fmtPct} from '../utils/helpers.ts'
import './player.css';

const AudioPlayHead = ({position}) => {
  const outerCircleRadius = 50;
  const playHeadRadius = 10;
  const svgSize = 120;

  const center = svgSize /2 ;
  const cx = center + Math.cos(position * 2 * Math.PI) * outerCircleRadius;
  const cy = center + Math.sin(position * 2 * Math.PI) * outerCircleRadius; 
  console.log(cy)
  return (
    <svg width={svgSize} height={svgSize}>
      {/* Outer Circle */}
      <circle
        cx={center}
        cy={center}
        r={outerCircleRadius}
        stroke="black"
        strokeWidth="2"
        fill="none"
      />
      {/* Play head circle */}
      <circle
        cx={cx}
        cy={cy}
        r={playHeadRadius}
        fill="red"
      />
    </svg>
  )
}
const Player = () => {
  const pctPlayedStatusBar = useRef<HTMLHeadingElement>(null);
  const [trackDuration, setTrackDuration] = useState<string | number>("00:00")
  const [currentTime, setCurrentTime] = useState<string | number>("00:00")
  const [percentPlayed , setPercentagePlayed] = useState<string | number>("0%")
  const [trackPosition, setTrackPosition] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);

  const handleLoadedData = (e) => {
    const {duration} = e.target;
    setTrackDuration(fmtTime(duration));
  }

  const handleTimeUpdate = (e) => {
    const {duration,currentTime} = e.target;
    const percentage = currentTime / duration;
    setTrackPosition(percentage);
    if (percentage > .9) {
      setComplete(true);
    }

    if (complete) {
      setPercentagePlayed("COMPLETE")
    }

    if (duration && !complete) {
      setPercentagePlayed(fmtPct(percentage));
    }

    if (duration) {
      if (pctPlayedStatusBar.current) {
        pctPlayedStatusBar.current.style.background = `linear-gradient(to right, green ${fmtPct(percentage)}, red ${fmtPct(percentage)}, red 100%)`;
      }
    }


    setCurrentTime(fmtTime(currentTime));

    
    
  } 
  return (
    <div id="mainContent">
    <h5>Classic Jazz</h5>
    <h1>Street Groove</h1>
    <h2>Ben Stanley</h2>
    <p>
      <span id="currTime">{currentTime}</span> | <span id="trackDuration">{trackDuration}</span>
    </p>
    <div id="artContainer">
      <img id="albumArt" src="/albumArt" alt="" />
    </div>
    <audio  controls id="myAudio" onLoadedData={handleLoadedData} onTimeUpdate={handleTimeUpdate} src="/music" ></audio>
    <div>
      <h1>Percentage Played:</h1>
      <h3 ref={pctPlayedStatusBar} id="pctPlayed">{percentPlayed}</h3>
    </div>
    <AudioPlayHead position={trackPosition} />
  </div>
  )
}

export default Player