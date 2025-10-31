import base64
import cv2
import numpy as np

def decode_base64_image(img_data: str) -> np.ndarray:
    """
    Base64形式の画像文字列をOpenCVで扱えるRGB画像(ndarray)に変換する関数
    
    Args:
        img_data (str): "data:image/jpeg;base64,..."形式の文字列
    
    Returns:
        np.ndarray: RGB形式の画像データ
        
    Raises:
        ValueError: 入力やデコードに失敗した場合
    """
    
    # 入力のチェック
    if not img_data or "," not in img_data:
        raise ValueError("Invalid image data")
    
    # ヘッダーとBase64データ部分を分割
    header, encoded = img_data.split(",", 1)
    # Base64文字列をバイト列にデコード
    img_bytes = base64.b64decode(encoded)
    # バイト列をnumpy配列に変換(uint8配列)
    np_arr = np.frombuffer(img_bytes, np.uint8)
    if np_arr.size == 0:
        raise ValueError("Empty buffer")
    
    # numpy配列をOpenCV画像(BGR)としてデコード
    img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)
    if img is None:
        raise ValueError("デコード失敗")
    # OpenCV(BGR)をDeepFace用にRGBに変換
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    return img