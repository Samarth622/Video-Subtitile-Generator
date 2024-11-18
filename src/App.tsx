import React, { useState, useEffect } from 'react';
import { VideoUploader } from './components/VideoUploader';
import { VideoPlayer } from './components/VideoPlayer';
import { LanguageSelector } from './components/LanguageSelector';
import { SubtitleDisplay } from './components/SubtitleDisplay';
import { useSocket } from './hooks/useSocket';
import { Loader2 } from 'lucide-react';

function App() {
  const [videoUrl, setVideoUrl] = useState<string>('');
  const [language, setLanguage] = useState<string>('en');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [subtitle, setSubtitle] = useState({ text: '', confidence: 0 });
  
  const socket = useSocket('http://localhost:8000');

  useEffect(() => {
    if (!socket) return;

    socket.on('subtitle', (data: { text: string; confidence: number }) => {
      setSubtitle(data);
    });

    socket.on('processing_complete', () => {
      setIsProcessing(false);
    });

    return () => {
      socket.off('subtitle');
      socket.off('processing_complete');
    };
  }, [socket]);

  const handleVideoUpload = async (file: File) => {
    setIsProcessing(true);
    const formData = new FormData();
    formData.append('video', file);
    formData.append('language', language);

    try {
      const response = await fetch('http://localhost:8000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    } catch (error) {
      console.error('Error uploading video:', error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Video Subtitle Generator
          </h1>
          <p className="text-lg text-gray-600">
            Upload your video and get instant subtitles in any language
          </p>
        </header>

        <div className="max-w-4xl mx-auto space-y-8">
          {!videoUrl && (
            <VideoUploader 
              onVideoUpload={handleVideoUpload} 
              isProcessing={isProcessing} 
            />
          )}

          {videoUrl && (
            <div className="space-y-6">
              <div className="flex justify-end">
                <LanguageSelector
                  selectedLanguage={language}
                  onLanguageChange={setLanguage}
                />
              </div>
              <VideoPlayer videoUrl={videoUrl} />
              {subtitle.text && (
                <SubtitleDisplay 
                  text={subtitle.text} 
                  confidence={subtitle.confidence} 
                />
              )}
            </div>
          )}

          {isProcessing && (
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Processing video...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;