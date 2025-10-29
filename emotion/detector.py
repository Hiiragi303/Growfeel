import numpy as np
from deepface import DeepFace
from collections import deque

current_emotion = ''
emotion_score = 0.0
emotion_history = deque(maxlen=20)

def detect_emotion(img: np.ndarray) -> str:
    global current_emotion, emotion_score, emotion_history
    try:
        # 感情認識
        result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)
        
        if not result:
            return "-"
        
        current_emotion = result[0]["dominant_emotion"]  # 感情抽出
        emotion_score = result[0]["emotion"][current_emotion]  # スコア抽出
        emotion_history.append(current_emotion)  # 感情履歴登録
        
        print(f"感情検出しました、(感情, スコア): ({current_emotion}, {emotion_score})")
        return current_emotion
    
    except Exception as e:
        print(f"感情検出中エラー: {e}")
        return "-"