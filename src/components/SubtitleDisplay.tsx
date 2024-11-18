import React from 'react';

interface SubtitleDisplayProps {
  text: string;
  confidence: number;
}

export const SubtitleDisplay: React.FC<SubtitleDisplayProps> = ({ text, confidence }) => {
  return (
    <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-4 mt-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm text-gray-500">Live Transcription</span>
        <span className="text-sm text-gray-500">
          Confidence: {(confidence * 100).toFixed(1)}%
        </span>
      </div>
      <p className="text-lg text-gray-800 font-medium">{text}</p>
    </div>
  );
};