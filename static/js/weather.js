const color = {
    deepGray: "#232323",
    darkGray: "#444444",
    gray: "#afafaf",
    skyBlue: "#87ceeb",
    white: "#ffffff",
    red: "#ff0000",
    blue: "#0004ff",
    yellow: "#ffe100",
}

export function drawBackground(ctx, width, height, type="neutral") {
    switch (type) {
        case "neutral":
            drawSky(ctx, width, height);
            break;
    }
}

export function drawSky(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.skyBlue);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.white);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawLightning(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.deepGray);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.darkGray);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawThickFog(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.gray);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.white);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawTyphoon(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.darkGray);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.gray);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawSunny(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.skyBlue);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.white);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawRainy(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.gray);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.darkGray);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}

export function drawRainbow(ctx, width, height) {
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.yellow);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.white);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}