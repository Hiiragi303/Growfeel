# ベースイメージ
FROM python:3.9-slim

# 軽量化のため
# .pycファイルの生成抑制と標準出力などのバッファリングの無効化
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# コンテナ側のワークディレクトリの指定
WORKDIR /app

# ホスト側のrequirements.txtをコンテナ側のワークディレクトリにコピー
COPY requirements.txt .

# 以下コマンドについて行ごとに解説
# 1. パッケージ一覧の最新化
# 2. OSライブラリをインストール、必要最低限だけ入れる(イメージを軽くするため)
# 3. OpenGLの共有ライブラリ(OpenCVの画像表示やデコード系で必要)
# 4. GLibのインストール(OpenCVのvideoioなどで要求されることがある)
# 5. aptの一時キャッシュを削除(イメージを軽くするため)
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# 必要なライブラリのインストール
RUN pip install --no-cache-dir -r requirements.txt

# ホスト側のディレクトリ構造をコンテナ側にコピー
COPY . .

# Dockerを実行したときに実行されるコマンド
CMD ["python", "app.py"]