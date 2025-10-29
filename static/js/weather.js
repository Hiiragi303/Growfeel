export function drawSky(ctx, width, height) {
    const color = {
        skyBlue: "#87ceeb",
        white: "#ffffff",
    }
    
    const gradient = ctx.createLinearGradient(0, 0, 0, height);  // 上(0,0)から下(0,height)へグラデーション
    gradient.addColorStop(0, color.skyBlue);  // 色の位置範囲(0.0 ~ 1.0)
    gradient.addColorStop(1, color.white);  // 色の位置範囲(0.0 ~ 1.0)

    ctx.fillStyle = gradient;  // グラデーションの指定
    ctx.fillRect(0, 0, width, height);
}