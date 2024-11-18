import React, { useRef, useEffect } from 'react';

interface VideoPlayerProps {
  videoUrl: string;
  subtitles?: string;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoUrl, subtitles }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoUrl, subtitles]);

  return (
    <div className="w-full max-w-2xl rounded-lg overflow-hidden shadow-lg bg-black">
      <video
        ref={videoRef}
        className="w-full"
        controls
        crossOrigin="anonymous"
      >
        <source src={videoUrl} type="video/mp4" />
        {subtitles && (
          <track
            default
            kind="subtitles"
            srcLang="en"
            src={subtitles}
            label="English"
          />
        )}
      </video>
    </div>
  );
};