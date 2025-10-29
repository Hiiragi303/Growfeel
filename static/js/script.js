import { drawSky } from "./weather.js";

// 要素取得
const video = document.getElementById('camera');
const canvas = document.getElementById('canvas');
const result = document.getElementById('result');
const gameCanvas = document.getElementById('game-canvas');
// コンテキスト用意
const ctx = canvas.getContext('2d');
const gameCtx = gameCanvas.getContext('2d');

// 感情を格納
currentEmotion = "neutral";

// 感情と天候のマップ
const weatherMap = {
    angry: drawLightning,
    disgust: drawThickFog,
    fear: drawTyphoon,
    happy: drawSunny,
    sad: drawRainy,
    surprise: drawRainbow,
    neutral: drawSky,
}

/**
 * カメラから動画を取得
 * @see {@link // https://developer.mozilla.org/ja/docs/Web/API/MediaDevices/getUserMedia}
 */
async function initCamera() {
    // getUserMedia(constraints)
    // constraints: 制約
    // constraints: {video: false, audio: false}
    // if both false throw NotFoundError(DOMException)
    // もし保護されたコンテキストで読み込まれなければnavigator.mediaDeviceがundefinedでTypeErrorが発生
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true})
        video.srcObject = stream;
    } catch (e) {
        if (e.name === "NotAllowedError") {
            alert("カメラの使用が拒否されました。設定を確認してください");
        } else if (e.name === "NotFoundError") {
            alert("カメラデバイスが見つかりません");
        } else if (e.name === "TypeError") {
            alert("このページは保護されたコンテキスト内で読み込んでください");
        } else if (e.name === "NotReadableError") {
            alert("カメラが使用中です");
        } else if (e instanceof DOMException) {
            console.error("想定外のDOMException: ", e.name, e.message);
        } else {
            console.error("その他エラー: ", e);
        }
    }
}

/**
 * フレームをPython側に送るメソッド
 * 
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderingContext2D/drawImage}  CanvasRenderingContext2D: drawImage()
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/Blob}  Blob
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/HTMLCanvasElement/toDataURL}  toDataURL()
 */
async function sendFrame() {
    // canvasのwとhの設定
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // canvasに動画のフレームを描く
    ctx.drawImage(video, 0, 0);
    // toDataURL(type)
    // type: 規定("image/png"), toDataURL("image/jpeg", 1.0)など数値を入れることで画質を設定可能
    // 戻り値: "data:image/jpeg;base64,..."(...はエンコードされた画像データ)
    const imageData = canvas.toDataURL('image/jpeg');

    // サーバーに
    const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: imageData })
    });

    const data = await res.json();
    result.textContent = `感情：${data.emotion}`;
}

function render() {
    drawSky(gameCtx, gameCanvas.width, gameCanvas.height);
    requestAnimationFrame(render)
}

initCamera();
/**
 * @see {@link https://developer.mozilla.org/ja/docs/Web/API/Window/setInterval}
 */
setInterval(sendFrame, 5000);
render()