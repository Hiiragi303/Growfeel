import numpy as np
from deepface import DeepFace

def detect_emotion(img: np.ndarray) -> str:
    """
    DeepFaceを使って画像から感情を推定する関数

    Args:
        img (np.ndarray): RGB形式の画像データ

    Returns:
        str: 検出された感情(例: "happy", "sad", "-"など)
    
    Raises:
        ValueError: 結果が空や不正な場合
    """
    
    # 感情認識
    result = DeepFace.analyze(img, actions=["emotion"], enforce_detection=False)
    
    # 出力結果のチェック
    if not result or not isinstance(result, list) or len(result) == 0:
        raise ValueError("感情を検出できませんでした")
    
    # 最も確率の高い感情を取得
    emotion = result[0].get("dominant_emotion")
    if emotion is None:
        raise ValueError("感情データが不正です")
    
    return emotion
