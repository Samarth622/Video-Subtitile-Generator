import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, FileVideo } from 'lucide-react';

interface VideoUploaderProps {
  onVideoUpload: (file: File) => void;
  isProcessing: boolean;
}

export const VideoUploader: React.FC<VideoUploaderProps> = ({ onVideoUpload, isProcessing }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file && file.type.startsWith('video/')) {
      onVideoUpload(file);
    }
  }, [onVideoUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.mov', '.avi', '.mkv']
    },
    maxFiles: 1,
    disabled: isProcessing
  });

  return (
    <div
      {...getRootProps()}
      className={`w-full max-w-2xl p-8 border-2 border-dashed rounded-xl transition-colors
        ${isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'}
        ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
    >
      <input {...getInputProps()} />
      <div className="flex flex-col items-center justify-center space-y-4">
        {isDragActive ? (
          <Upload className="w-16 h-16 text-blue-500" />
        ) : (
          <FileVideo className="w-16 h-16 text-gray-400" />
        )}
        <div className="text-center">
          <p className="text-lg font-medium text-gray-700">
            {isDragActive ? 'Drop your video here' : 'Drag & drop your video here'}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            or click to select a file
          </p>
        </div>
        <p className="text-xs text-gray-400">
          Supports MP4, MOV, AVI, MKV (max 500MB)
        </p>
      </div>
    </div>
  );
};