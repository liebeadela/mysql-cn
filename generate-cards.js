// 生成占位卡图片
const fs = require('fs');
const path = require('path');

// 22张大阿卡纳牌
const cards = [
    { id: 0, name: "愚人", symbol: "☀", color: "#f4d03f" },
    { id: 1, name: "魔术师", symbol: "☿", color: "#c9a227" },
    { id: 2, name: "女祭司", symbol: "☽", color: "#9b59b6" },
    { id: 3, name: "皇后", symbol: "♀", color: "#e91e63" },
    { id: 4, name: "皇帝", symbol: "♂", color: "#3498db" },
    { id: 5, name: "教皇", symbol: "♃", color: "#8e44ad" },
    { id: 6, name: "恋人", symbol: "♋", color: "#e74c3c" },
    { id: 7, name: "战车", symbol: "♌", color: "#f39c12" },
    { id: 8, name: "力量", symbol: "♍", color: "#1abc9c" },
    { id: 9, name: "隐士", symbol: "♎", color: "#95a5a6" },
    { id: 10, name: "命运之轮", symbol: "☸", color: "#c0392b" },
    { id: 11, name: "正义", symbol: "⚖", color: "#2980b9" },
    { id: 12, name: "倒吊人", symbol: "⚛", color: "#16a085" },
    { id: 13, name: "死神", symbol: "☠", color: "#2c3e50" },
    { id: 14, name: "节制", symbol: "∿", color: "#00bcd4" },
    { id: 15, name: "恶魔", symbol: "🔥", color: "#8b0000" },
    { id: 16, name: "高塔", symbol: "⚡", color: "#9c27b0" },
    { id: 17, name: "星星", symbol: "★", color: "#03a9f4" },
    { id: 18, name: "月亮", symbol: "☾", color: "#673ab7" },
    { id: 19, name: "太阳", symbol: "☀", color: "#ffeb3b" },
    { id: 20, name: "审判", symbol: "⚰", color: "#e91e63" },
    { id: 21, name: "世界", symbol: "♉", color: "#4caf50" }
];

const cardsDir = path.join(__dirname, 'cards');

// 创建 SVG 牌面
cards.forEach(card => {
    const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg${card.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a12"/>
            <stop offset="50%" style="stop-color:#1a0a2e"/>
            <stop offset="100%" style="stop-color:#0d0d1a"/>
        </linearGradient>
        <linearGradient id="glow${card.id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:${card.color};stop-opacity:0.8"/>
            <stop offset="100%" style="stop-color:${card.color};stop-opacity:0.2"/>
        </linearGradient>
    </defs>
    
    <!-- 背景 -->
    <rect width="400" height="600" fill="url(#bg${card.id})"/>
    
    <!-- 边框 -->
    <rect x="15" y="15" width="370" height="570" rx="15" fill="none" stroke="${card.color}" stroke-width="3" opacity="0.8"/>
    <rect x="25" y="25" width="350" height="550" rx="10" fill="none" stroke="${card.color}" stroke-width="1" opacity="0.4"/>
    
    <!-- 星星装饰 -->
    <circle cx="50" cy="80" r="2" fill="${card.color}" opacity="0.6"/>
    <circle cx="350" cy="120" r="1.5" fill="${card.color}" opacity="0.5"/>
    <circle cx="80" cy="520" r="1" fill="${card.color}" opacity="0.4"/>
    <circle cx="320" cy="480" r="2" fill="${card.color}" opacity="0.5"/>
    
    <!-- 主符号 -->
    <text x="200" y="260" font-family="serif" font-size="180" fill="url(#glow${card.id})" 
          text-anchor="middle" dominant-baseline="middle">${card.symbol}</text>
    
    <!-- 牌名 -->
    <text x="200" y="450" font-family="serif" font-size="32" fill="${card.color}" 
          text-anchor="middle">${card.name}</text>
    
    <!-- 编号 -->
    <text x="55" y="75" font-family="serif" font-size="24" fill="${card.color}" 
          text-anchor="middle" opacity="0.7">${card.id}</text>
    
    <!-- 英文名 -->
    <text x="200" y="500" font-family="serif" font-size="16" fill="${card.color}" 
          text-anchor="middle" opacity="0.5">The ${card.nameEn}</text>
    
    <!-- 底部符号 -->
    <text x="345" y="545" font-family="serif" font-size="20" fill="${card.color}" 
          text-anchor="middle" opacity="0.6">✦</text>
</svg>`;
    
    fs.writeFileSync(path.join(cardsDir, `${card.id}.svg`), svg);
    console.log(`Created: ${card.name}.svg`);
});

console.log('All 22 tarot card images created!');
