import React from "react";

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  onSeek: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
function ProgressBar({ currentTime, duration, onSeek }: ProgressBarProps) {
    const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const progressPercent = (currentTime / duration) * 100 || 0;
    return(
        <>
        
         <div className="audio__progress--wrapper">
            <div className="audio__time">{formatTime(currentTime)}</div>
            <input
              type="range"
              className="audio__progress--bar"
              min={0}
              max={duration}
              value={currentTime}
              onChange={onSeek}
              style={{background:`linear-gradient(to right, rgb(43, 217, 124) ${progressPercent}%, rgb(109, 120, 125) ${progressPercent}%)`}}
            />
           
            <div className="audio__time">{formatTime(duration)}</div>
          </div>
        </>
    )
}
export default ProgressBar