# 生成占位卡图片 - Python版本
import os

# 22张大阿卡纳牌数据
cards = [
    (0, "愚人", "The Fool", "☀", "#f4d03f"),
    (1, "魔术师", "The Magician", "☿", "#c9a227"),
    (2, "女祭司", "The High Priestess", "☽", "#9b59b6"),
    (3, "皇后", "The Empress", "♀", "#e91e63"),
    (4, "皇帝", "The Emperor", "♂", "#3498db"),
    (5, "教皇", "The Hierophant", "♃", "#8e44ad"),
    (6, "恋人", "The Lovers", "♋", "#e74c3c"),
    (7, "战车", "The Chariot", "♌", "#f39c12"),
    (8, "力量", "Strength", "♍", "#1abc9c"),
    (9, "隐士", "The Hermit", "♎", "#95a5a6"),
    (10, "命运之轮", "Wheel of Fortune", "☸", "#c0392b"),
    (11, "正义", "Justice", "⚖", "#2980b9"),
    (12, "倒吊人", "The Hanged Man", "⚛", "#16a085"),
    (13, "死神", "Death", "☠", "#2c3e50"),
    (14, "节制", "Temperance", "∿", "#00bcd4"),
    (15, "恶魔", "The Devil", "🔥", "#8b0000"),
    (16, "高塔", "The Tower", "⚡", "#9c27b0"),
    (17, "星星", "The Star", "★", "#03a9f4"),
    (18, "月亮", "The Moon", "☾", "#673ab7"),
    (19, "太阳", "The Sun", "☀", "#ffeb3b"),
    (20, "审判", "Judgement", "⚰", "#e91e63"),
    (21, "世界", "The World", "♉", "#4caf50"),
]

cards_dir = r"C:\Users\liebe\.qclaw\workspace\tarot-site\cards"
os.makedirs(cards_dir, exist_ok=True)

# 创建 SVG 牌面
for card_id, name, name_en, symbol, color in cards:
    svg_content = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg{card_id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0a12"/>
            <stop offset="50%" style="stop-color:#1a0a2e"/>
            <stop offset="100%" style="stop-color:#0d0d1a"/>
        </linearGradient>
        <linearGradient id="glow{card_id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:{color};stop-opacity:0.8"/>
            <stop offset="100%" style="stop-color:{color};stop-opacity:0.2"/>
        </linearGradient>
    </defs>
    
    <!-- 背景 -->
    <rect width="400" height="600" fill="url(#bg{card_id})"/>
    
    <!-- 边框 -->
    <rect x="15" y="15" width="370" height="570" rx="15" fill="none" stroke="{color}" stroke-width="3" opacity="0.8"/>
    <rect x="25" y="25" width="350" height="550" rx="10" fill="none" stroke="{color}" stroke-width="1" opacity="0.4"/>
    
    <!-- 星星装饰 -->
    <circle cx="50" cy="80" r="2" fill="{color}" opacity="0.6"/>
    <circle cx="350" cy="120" r="1.5" fill="{color}" opacity="0.5"/>
    <circle cx="80" cy="520" r="1" fill="{color}" opacity="0.4"/>
    <circle cx="320" cy="480" r="2" fill="{color}" opacity="0.5"/>
    
    <!-- 主符号 -->
    <text x="200" y="260" font-family="serif" font-size="180" fill="url(#glow{card_id})" 
          text-anchor="middle" dominant-baseline="middle">{symbol}</text>
    
    <!-- 牌名 -->
    <text x="200" y="450" font-family="serif" font-size="32" fill="{color}" 
          text-anchor="middle">{name}</text>
    
    <!-- 编号 -->
    <text x="55" y="75" font-family="serif" font-size="24" fill="{color}" 
          text-anchor="middle" opacity="0.7">{card_id}</text>
    
    <!-- 英文名 -->
    <text x="200" y="500" font-family="serif" font-size="16" fill="{color}" 
          text-anchor="middle" opacity="0.5">{name_en}</text>
    
    <!-- 底部符号 -->
    <text x="345" y="545" font-family="serif" font-size="20" fill="{color}" 
          text-anchor="middle" opacity="0.6">✦</text>
</svg>'''
    
    with open(os.path.join(cards_dir, f'{card_id}.svg'), 'w', encoding='utf-8') as f:
        f.write(svg_content)
    print(f'Created: {name}.svg')

print('All 22 tarot card images created!')
