import React, { useRef, useState } from 'react';
import { fmtTime, fmtPct, map } from '../utils/helpers.ts';

const AudioPlayHead = ({ position, size }) => {
  const outerCircleRadius = size * 0.45;
  const playHeadRadius = 10;
  const svgSize = size;

  const center = svgSize / 2;

  const angle = map(position, 0, 1, Math.PI, 2 * Math.PI);
  const cx = center + Math.cos(angle) * outerCircleRadius;
  const cy = center + Math.sin(angle) * outerCircleRadius;

  return (
    <svg id="playHead" width={svgSize} height={svgSize}>
      {/* Outer Circle */}
      <circle
        cx={center}
        cy={center}
        r={outerCircleRadius}
        stroke="black"
        strokeWidth="5"
        fill="none"
      />
      {/* Play head circle */}
      <circle
        cx={cx}
        cy={cy}
        r={playHeadRadius}
        strokeWidth="4"
        fill={position > 0.9 ? 'green' : 'red'}
      />
    </svg>
  );
};
const Player = () => {
  const pctPlayedStatusBar = useRef<HTMLHeadingElement>(null);
  const albumImageRef = useRef<HTMLImageElement>(null);

  const [trackDuration, setTrackDuration] = useState<string | number>('00:00');
  const [currentTime, setCurrentTime] = useState<string | number>('00:00');
  const [percentPlayed, setPercentagePlayed] = useState<string | number>('0%');
  const [trackPosition, setTrackPosition] = useState<number>(0);
  const [complete, setComplete] = useState<boolean>(false);

  const handleLoadedAudioData = (e) => {
    const { duration } = e.target;
    setTrackDuration(fmtTime(duration));
  };

  const handleTimeUpdate = (e) => {
    const { duration, currentTime } = e.target;
    const percentage = currentTime / duration;
    setTrackPosition(percentage);
    if (percentage > 0.9) {
      setComplete(true);
    }
    if (complete) {
      setPercentagePlayed('COMPLETE');
    }
    if (duration && !complete) {
      setPercentagePlayed(fmtPct(percentage));
    }
    if (duration) {
      if (pctPlayedStatusBar.current) {
        pctPlayedStatusBar.current.style.background = `linear-gradient(to right, green ${fmtPct(
          percentage
        )}, red ${fmtPct(percentage)}, red 100%)`;
      }
    }
    setCurrentTime(fmtTime(currentTime));
  };

  const handleLoadedImageData = (e) => {};
  return (
    <div id="mainContent">
      <h5>Classic Jazz</h5>
      <h1>Street Groove</h1>
      <h2>Ben Stanley</h2>
      <p>
        <span id="currTime">{currentTime}</span> |{' '}
        <span id="trackDuration">{trackDuration}</span>
      </p>
      {/* <div id="artContainer">
        {albumImageRef && (
          <AudioPlayHead
            position={trackPosition}
            size={albumImageRef.current?.width * 1.2}
          />
        )}
        <img
          onLoad={handleLoadedImageData}
          ref={albumImageRef}
          id="albumArt"
          src="/albumArt"
          alt=""
        />
      </div> */}
      <audio
        controls
        id="myAudio"
        onLoadedData={handleLoadedAudioData}
        onTimeUpdate={handleTimeUpdate}
        src="/music"
      ></audio>
      <div>
        {/* <h1>Percentage Played:</h1> */}
        {/* <h3 ref={pctPlayedStatusBar} id="pctPlayed">{percentPlayed}</h3> */}
      </div>
      <img
        src={'../../assets/Instagram_Glyph_Gradient.png'}
        alt="Icon description"
      ></img>
    </div>
  );
};

export default Player;
