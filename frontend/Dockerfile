# ==== ベース ====
FROM node:20-alpine

# ==== 作業ディレクトリ ====
WORKDIR /app

# ==== パッケージインストール ====
COPY package.json package-lock.json ./
RUN npm install

# ==== アプリ本体 ====
COPY . .