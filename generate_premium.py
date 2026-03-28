import os
import shutil

# 先备份旧文件夹
cards_dir = r'C:\Users\liebe\.qclaw\workspace\tarot-site\cards'
backup_dir = r'C:\Users\liebe\.qclaw\workspace\tarot-site\cards_backup'

if os.path.exists(backup_dir):
    shutil.rmtree(backup_dir)
if os.path.exists(cards_dir):
    shutil.move(cards_dir, backup_dir)
os.makedirs(cards_dir)

# 22张牌的高级神秘设计
cards = [
    (0, '愚人', 'The Fool', '☀', '#FFD700'),
    (1, '魔术师', 'The Magician', '☿', '#C0C0C0'),
    (2, '女祭司', 'High Priestess', '☽', '#9370DB'),
    (3, '皇后', 'The Empress', '♀', '#FF69B4'),
    (4, '皇帝', 'The Emperor', '♂', '#4169E1'),
    (5, '教皇', 'The Hierophant', '♃', '#8B4513'),
    (6, '恋人', 'The Lovers', '♋', '#FF4500'),
    (7, '战车', 'The Chariot', '♌', '#CFB53B'),
    (8, '力量', 'Strength', '♍', '#20B2AA'),
    (9, '隐士', 'The Hermit', '♎', '#A9A9A9'),
    (10, '命运之轮', 'Wheel of Fortune', '☸', '#8B0000'),
    (11, '正义', 'Justice', '⚖', '#FFD700'),
    (12, '倒吊人', 'Hanged Man', '⚛', '#4B0082'),
    (13, '死神', 'Death', '☠', '#1C1C1C'),
    (14, '节制', 'Temperance', '∿', '#00CED1'),
    (15, '恶魔', 'The Devil', '🔥', '#8B0000'),
    (16, '高塔', 'The Tower', '⚡', '#9400D3'),
    (17, '星星', 'The Star', '★', '#87CEEB'),
    (18, '月亮', 'The Moon', '☾', '#4B0082'),
    (19, '太阳', 'The Sun', '☀', '#FFA500'),
    (20, '审判', 'Judgement', '⚰', '#DC143C'),
    (21, '世界', 'The World', '♉', '#32CD32'),
]

for card_id, name, name_en, symbol, color in cards:
    svg = '''<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="600" xmlns="http://www.w3.org/2000/svg">
    <defs>
        <linearGradient id="bg''' + str(card_id) + '''" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#0a0612"/>
            <stop offset="30%" style="stop-color:#150a25"/>
            <stop offset="70%" style="stop-color:#0d0818"/>
            <stop offset="100%" style="stop-color:#050308"/>
        </linearGradient>
        <radialGradient id="glow''' + str(card_id) + '''" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:''' + color + ''';stop-opacity:0.9"/>
            <stop offset="50%" style="stop-color:''' + color + ''';stop-opacity:0.4"/>
            <stop offset="100%" style="stop-color:''' + color + ''';stop-opacity:0"/>
        </radialGradient>
        <linearGradient id="border''' + str(card_id) + '''" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#c9a227"/>
            <stop offset="50%" style="stop-color:#e8c547"/>
            <stop offset="100%" style="stop-color:#c9a227"/>
        </linearGradient>
        <pattern id="mystic''' + str(card_id) + '''" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <circle cx="30" cy="30" r="1" fill="#c9a227" opacity="0.1"/>
            <circle cx="0" cy="0" r="0.5" fill="#c9a227" opacity="0.15"/>
            <circle cx="60" cy="60" r="0.5" fill="#c9a227" opacity="0.15"/>
        </pattern>
    </defs>
    
    <rect width="400" height="600" fill="url(#bg''' + str(card_id) + ''')"/>
    <rect width="400" height="600" fill="url(#mystic''' + str(card_id) + ''')"/>
    <ellipse cx="200" cy="250" rx="180" ry="180" fill="url(#glow''' + str(card_id) + ''')" opacity="0.15"/>
    
    <rect x="12" y="12" width="376" height="576" rx="16" fill="none" stroke="url(#border''' + str(card_id) + ''')" stroke-width="3"/>
    <rect x="20" y="20" width="360" height="560" rx="12" fill="none" stroke="url(#border''' + str(card_id) + ''')" stroke-width="1" opacity="0.5"/>
    
    <path d="M 12 50 L 12 12 L 50 12" fill="none" stroke="#c9a227" stroke-width="2" opacity="0.6"/>
    <path d="M 350 12 L 388 12 L 388 50" fill="none" stroke="#c9a227" stroke-width="2" opacity="0.6"/>
    <path d="M 388 550 L 388 588 L 350 588" fill="none" stroke="#c9a227" stroke-width="2" opacity="0.6"/>
    <path d="M 50 588 L 12 588 L 12 550" fill="none" stroke="#c9a227" stroke-width="2" opacity="0.6"/>
    
    <text x="200" y="240" font-family="serif" font-size="140" fill="url(#glow''' + str(card_id) + ''')" text-anchor="middle" dominant-baseline="middle" font-weight="bold">''' + symbol + '''</text>
    <circle cx="200" cy="240" r="100" fill="none" stroke="''' + color + '''" stroke-width="0.5" opacity="0.3"/>
    <circle cx="200" cy="240" r="120" fill="none" stroke="''' + color + '''" stroke-width="0.3" opacity="0.2"/>
    
    <text x="200" y="80" font-family="serif" font-size="14" fill="#c9a227" text-anchor="middle" letter-spacing="4" opacity="0.7">ARCANA</text>
    <text x="200" y="430" font-family="serif" font-size="36" fill="url(#border''' + str(card_id) + ''')" text-anchor="middle" font-weight="500">''' + name + '''</text>
    <text x="50" y="70" font-family="serif" font-size="24" fill="#c9a227" text-anchor="middle" opacity="0.8">''' + str(card_id) + '''</text>
    <text x="200" y="480" font-family="serif" font-size="14" fill="#c9a227" text-anchor="middle" opacity="0.6" letter-spacing="2">''' + name_en.upper() + '''</text>
    <text x="350" y="560" font-family="serif" font-size="16" fill="#c9a227" text-anchor="middle" opacity="0.5">✦</text>
    
    <circle cx="60" cy="100" r="1.5" fill="#fff" opacity="0.6">
        <animate attributeName="opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/>
    </circle>
    <circle cx="340" cy="150" r="1" fill="#fff" opacity="0.5">
        <animate attributeName="opacity" values="0.5;1;0.5" dur="3s" repeatCount="indefinite"/>
    </circle>
    <circle cx="80" cy="450" r="1.2" fill="#fff" opacity="0.4">
        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2.5s" repeatCount="indefinite"/>
    </circle>
    <circle cx="320" cy="420" r="1" fill="#fff" opacity="0.5">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="3.5s" repeatCount="indefinite"/>
    </circle>
</svg>'''
    
    with open(os.path.join(cards_dir, str(card_id) + '.svg'), 'w', encoding='utf-8') as f:
        f.write(svg)
    print('Created: ' + name + '.svg')

print('All 22 premium tarot card images created!')
