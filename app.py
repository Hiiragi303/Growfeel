from flask import Flask, render_template, request, jsonify
import cv2
import base64
import numpy as np
from emotion.detector import detect_emotion

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/api/predict", methods=["POST"])
def predict():
    # JSONのbodyを辞書型で受け取る
    data = request.get_json()
    # 辞書からimageを取り出してる(Base64の文字列)
    img_data = data.get('image')
    
    # img_dataがなかったり、data:image/jpeg;base64,...の","がなかったら
    if not img_data or "," not in img_data:
        return jsonify({"error": "Invalid image data"}), 400
    try:
        # 最大で1回カンマで区切ってエンコードされたデータのみ取り出す
        header, encoded = img_data.split(",", 1)
        img_bytes = base64.b64decode(encoded)
        # bytes型の生データをNumpyの配列に変換
        np_arr = np.frombuffer(img_bytes, np.uint8)
        if np_arr.size == 0:
            print("画像バイナリが空です")
            return jsonify({"error": "empty buffer"}), 400
        # Numpy配列を画像(BGR)に復元
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
        if img is None:
            raise ValueError("デコード失敗")
        
        # DeepFaceでanalyze
        emotion = detect_emotion(img)
        return jsonify({ "emotion": f"{emotion}" })
    except Exception as e:
        print(f"predict処理中のエラー: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=False)