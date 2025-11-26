# ==== ベース ====
FROM node:20

# ==== 作業ディレクトリ ====
WORKDIR /app

# ==== パッケージインストール ====
COPY package*.json ./
RUN npm install

# ==== アプリ本体 ====
COPY . .