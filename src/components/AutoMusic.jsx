import { useRef, useEffect, useState } from "react";
import musicFile from "../assets/music.mp3";

const AutoMusic = () => {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const handleStart = async () => {
      if (started) return;

      const audio = audioRef.current;
      if (!audio) return;

      setStarted(true);

      // Slow down playback
      audio.playbackRate = 0.80;
      audio.loop = true;
      audio.volume = 0.10;

      try {
        // Simple play
        await audio.play();
        console.log("🎵 Music started");
      } catch (err) {
        console.log("❌ Music blocked, try another click", err);
      }

      // Remove listener after first click
      window.removeEventListener("click", handleStart);
    };

    window.addEventListener("click", handleStart);

    return () => {
      window.removeEventListener("click", handleStart);
    };
  }, [started]);

  return (
    <>
      <audio ref={audioRef}>
        <source src={musicFile} type="audio/mp3" />
      </audio>
    </>
  );
};

export default AutoMusic;
