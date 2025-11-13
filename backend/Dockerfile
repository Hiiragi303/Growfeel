# ==== ベース ====
FROM python:3.9-slim

# ==== 軽量化 ====
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

# ==== 作業ディレクトリ ====
WORKDIR /app

# ==== OSライブラリ ====
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    libgl1 \
    libglib2.0-0 \
    && rm -rf /var/lib/apt/lists/*

# ==== Pythonライブラリ ====
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# ==== アプリ本体 ====
COPY . .

# ==== エントリーポイント ====
CMD ["python", "app.py"]