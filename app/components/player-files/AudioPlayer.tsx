"use client";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { setBookDuration } from "@/app/redux/booksSlice";
import TrackInfo from "../../components/player-files/TrackInfo";
import Controls from "../../components/player-files/Controls";
import ProgressBar from "../../components/player-files/ProgressBar";
import {Book} from "@/app/types/books"

interface Props{
    book:Book
}
function AudioPlayer({ book }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const dispatch = useDispatch();

  // Play or pause audio
  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  // Rewind 10 seconds
  const rewind = () => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.currentTime = Math.max(0, audio.currentTime - 10);
  };

  const fastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        duration,
        audioRef.current.currentTime + 10
      );
    }
  };

  // Track Progress and duration Sync current time
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    

    const updateDuration = () => {
  setDuration(audio.duration);
  dispatch(setBookDuration({ bookId: book.id, duration: audio.duration }));
};

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
    };
  }, []);

  // Handle progress bar seek
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = Number(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <>
      <audio src={book.audioLink} ref={audioRef}></audio>
      <TrackInfo book={book} />
      <Controls
        isPlaying={isPlaying}
        togglePlay={togglePlay}
        rewind={rewind}
        fastForward={fastForward}
      />
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        onSeek={handleSeek}
      />
    </>
  );
}
export default AudioPlayer;

// Helper: format seconds as mm:ss
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const secs = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${secs}`;
}
