import { useRef, useEffect, useState } from "react";
import musicFile from "../assets/music.mp3";

const AutoMusic = () => {
  const audioRef = useRef(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleStart = async () => {
      if (started) return;
      setStarted(true);

      // Slow down playback
      audio.playbackRate = 0.80;
      audio.loop = true;
      audio.volume = 0.10;

      try {
        await audio.play();
        console.log("🎵 Music started");
      } catch (err) {
        console.log("❌ Music blocked, try another click", err);
      }

      window.removeEventListener("click", handleStart);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        audio.pause(); // pause when tab is hidden or mobile back
      } else if (started) {
        audio.play().catch(() => {}); // resume if tab comes back
      }
    };

    // Add click listener for first interaction
    window.addEventListener("click", handleStart);

    // Pause when page hidden / mobile back
    document.addEventListener("visibilitychange", handleVisibilityChange);

    
    const handleUnload = () => {
      audio.pause();
    };
    window.addEventListener("beforeunload", handleUnload);

    return () => {
      window.removeEventListener("click", handleStart);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("beforeunload", handleUnload);
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
