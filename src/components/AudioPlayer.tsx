import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = 0.5;
      // Intentar reproducir automáticamente
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Autoplay fue bloqueado, mostrar como pausado
          setIsPlaying(false);
        });
      }
    }
  }, []);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <>
      <audio ref={audioRef} loop>
        <source src="/audio/La_Fiesta_en_Rayuela_V2.mp3" type="audio/mpeg" />
      </audio>
      <button
        onClick={togglePlay}
        className="fixed bottom-4 left-4 z-50 bg-rayuela-pink hover:bg-rayuela-pink/80 text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110"
        aria-label={isPlaying ? 'Pausar música' : 'Reproducir música'}
      >
        {isPlaying ? (
          <Volume2 className="w-6 h-6" />
        ) : (
          <VolumeX className="w-6 h-6" />
        )}
      </button>
    </>
  );
};

export default AudioPlayer;
