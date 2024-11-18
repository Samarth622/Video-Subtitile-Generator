# Video Subtitle Generator

A modern web application that automatically generates and synchronizes subtitles for your videos using AI technology. Built with React, FastAPI, and OpenAI's Whisper model.

![Video Subtitle Generator](https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1200&h=400)

## Features

- 🎥 Support for multiple video formats (MP4, MOV, AVI, MKV)
- 🌍 Multi-language subtitle generation
- ⚡ Real-time subtitle synchronization
- 🎯 High-accuracy speech recognition
- 💻 Modern, responsive UI
- 🔄 Live confidence scoring

## Tech Stack

### Frontend
- React 18
- TypeScript
- Tailwind CSS
- Socket.IO Client
- Lucide React Icons

### Backend
- FastAPI
- Python 3.9+
- OpenAI Whisper
- Socket.IO
- PyTorch

## Getting Started

### Prerequisites

- Node.js 16+
- Python 3.9+
- pip

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/video-subtitle-generator.git
cd video-subtitle-generator
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
pip install -r requirements.txt
```

### Running the Application

1. Start the backend server:
```bash
cd backend
python main.py
```

2. Start the frontend development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Upload your video by dragging and dropping it into the upload area or clicking to select a file
2. Select your desired subtitle language from the dropdown menu
3. Wait for the AI to process your video and generate subtitles
4. Watch your video with synchronized subtitles

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenAI Whisper for the speech recognition model
- React and FastAPI communities for the excellent frameworks
- All contributors and users of this project

## Support

If you encounter any issues or have questions, please file an issue in the GitHub repository.