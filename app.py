from flask import Flask, render_template, request, jsonify
from backend.image_decoder import decode_base64_image
from backend.detector import detect_emotion
import logging

# Loggerの設定
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s"
)
logger = logging.getLogger(__name__)

# Flaskアプリの初期化
app = Flask(__name__)

# HTMLを返すルート
@app.route("/")
def index():
    return render_template("index.html")

# 感情認識を行うエンドポイント
@app.route("/api/predict", methods=["POST"])
def predict():
    try:
        # JSONのbodyを辞書型で受け取る
        data = request.get_json()
        # 辞書からimageを取り出す(Base64の文字列)
        img_data = data.get("image")
        
        # デコードを行う
        img = decode_base64_image(img_data)
        
        # 感情認識を行う
        emotion = detect_emotion(img)
        logger.info(f"検出結果: {emotion}")
        # 結果を返す
        return jsonify({"ok": True, "data": {"emotion": emotion}})
    
    except ValueError as e:
        logger.warning(f"入力データエラー: {e}")
        return jsonify({"ok": False, "error": {"message": str(e)}}), 400
    except Exception as e:
        logger.exception("predict処理中のエラー")
        return jsonify({"ok": False, "error": {"message": str(e)}}), 500

if __name__ == "__main__":
    # 開発段階ではdebug=True
    # 実際に運用する際にはdebug=Falseにすること
    logger.info("Flaskサーバーを起動します...")
    app.run(host="0.0.0.0", port=5050, debug=True)