import { usePlayer } from "@/stores/usePlayer";
import { useEffect, useRef } from "react";

const AudioPlayer = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const prevSongRef = useRef<string | null>(null);

  const { currentSong, isPlaying, isRepeating, repeatSong, playNext } =
    usePlayer();

  // handle play/pause logic
  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying]);

  // handle song ends

  useEffect(() => {
    const audio = audioRef.current;

    const handleEnded = () => {
      if (isRepeating) {
        repeatSong();
      } else {
        playNext();
      }
    };

    audio?.addEventListener("ended", handleEnded);

    return () => audio?.removeEventListener("ended", handleEnded);
  }, [isRepeating, playNext, repeatSong]);

  //handle song changes
  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;

    // check if this is actually a new song
    const isSongChange = prevSongRef.current !== currentSong?.audioUrl;

    if (isSongChange) {
      audio.src = currentSong?.audioUrl;
      // reset the playback position
      audio.currentTime = 0;

      prevSongRef.current = currentSong?.audioUrl;

      if (isPlaying) {
        audio.play();
      }
    }
  }, [currentSong, isPlaying]);

  // Set loop property based on isRepeating state
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.loop = isRepeating;
    }
  }, [isRepeating]);

  return <audio ref={audioRef} />;
};

export default AudioPlayer;
