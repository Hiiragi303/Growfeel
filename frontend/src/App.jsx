import { useEffect, useRef, useState } from "react";
import { Weather } from "./components/Weather";
import { SceneCanvas } from "./components/SceneCanvas";
import { emotionToWeather } from "./lib/emotionToWeather";

export default function App() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [emotion, setEmotion] = useState(null);
  const [loading, setLoading] = useState(false);

  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    videoRef.current.srcObject = stream;
  };

  const handleCapture = async () => {
    setLoading(true);

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const base64 = canvas.toDataURL("image/jpeg");

    const res = await fetch("http://localhost:5050/api/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ image: base64 })
    });

    const json = await res.json();
    if (json.ok) setEmotion(json.data.emotion);
    setLoading(false);
  }

  const [weather, setWeather] = useState("clear");

  useEffect(() => {
    if (!emotion) return;
    const nextWeather = emotionToWeather[emotion] ?? "clear";
    setWeather(nextWeather);
  }, [emotion])

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Three.jsの背景レイヤー */}
      <SceneCanvas weather={weather} />

      {/* UIレイヤー */}
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center gap-4 p-6">
        <h1 className="text-3xl font-bold">表情認識デモ</h1>

        <video ref={videoRef} autoPlay className="border rounded w-80" />
        <canvas ref={canvasRef} className="hidden" />

        <button onClick={startCamera} className="bg-blue-500 px-4 py-2 rounded text-white">
          カメラ開始
        </button>

        <button onClick={handleCapture} className="bg-green-500 px-4 py-2 rounded text-white">
          撮影して感情分析
        </button>

        {loading && <p className="pointer-events-auto">測定中...</p>}
        {emotion && <p className="text-2xl font-bold">感情: {emotion}</p>}

        {/* 天気UIは右上固定 */}
        <div className="absolute top-4 right-4">
          <Weather onChange={setWeather} />
        </div>
        
      </div>
    </div>
  );
}
