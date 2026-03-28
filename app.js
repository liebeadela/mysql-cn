// 暗夜塔罗 - 应用逻辑
var currentCategory = null;
var currentSpread = null;
var selectedCards = [];
var canSelect = true;
var userConfusion = "";

function selectCategory(category) {
    currentCategory = category;
    document.getElementById('categorySelection').style.display = 'none';
    document.getElementById('intentionSection').style.display = 'block';
    
    var intentionTag = document.getElementById('intentionTag');
    var cat = categoryInfo[category];
    intentionTag.querySelector('.tag-icon').textContent = cat.icon;
    intentionTag.querySelector('.tag-text').textContent = cat.name;
}

function continueToSpread() {
    userConfusion = document.getElementById('confusionInput').value;
    document.getElementById('intentionSection').style.display = 'none';
    document.getElementById('spreadSelection').style.display = 'block';
    
    var categoryTag = document.getElementById('categoryTag');
    var cat = categoryInfo[currentCategory];
    categoryTag.querySelector('.tag-icon').textContent = cat.icon;
    categoryTag.querySelector('.tag-text').textContent = cat.name;
    categoryTag.style.display = 'inline-flex';
}

function backToCategory() {
    currentCategory = null;
    currentSpread = null;
    selectedCards = [];
    userConfusion = "";
    document.getElementById('spreadSelection').style.display = 'none';
    document.getElementById('intentionSection').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    document.getElementById('confusionInput').value = "";
}

function backToIntention() {
    document.getElementById('spreadSelection').style.display = 'none';
    document.getElementById('intentionSection').style.display = 'block';
}

function selectSpread(spread) {
    currentSpread = spread;
    selectedCards = [];
    canSelect = true;
    document.getElementById('spreadSelection').style.display = 'none';
    document.getElementById('readingArea').style.display = 'block';
    var titles = {single:'点击选择 1 张牌',three:'点击选择 3 张牌',celtic:'点击选择 10 张牌'};
    document.getElementById('readingTitle').textContent = titles[spread];
    showAllCardBacks();
}

// 显示所有牌背供选择 - 扇形排列
function showAllCardBacks() {
    var container = document.getElementById('deckContainer');
    container.innerHTML = '';
    var positions = spreadPositions[currentSpread];
    var cardCount = positions.length;
    
    // 洗牌提示
    var shuffleContainer = document.createElement('div');
    shuffleContainer.style.cssText = 'width:100%;text-align:center;';
    
    var shuffleGif = document.createElement('div');
    shuffleGif.className = 'shuffle-gif';
    shuffleContainer.appendChild(shuffleGif);
    
    var shuffleDiv = document.createElement('div');
    shuffleDiv.className = 'shuffle-text';
    shuffleDiv.id = 'shuffleText';
    shuffleDiv.innerHTML = '正在洗牌...';
    shuffleContainer.appendChild(shuffleDiv);
    
    container.appendChild(shuffleContainer);
    
    // 已抽牌区域 - 放在最上方
    var drawnArea = document.createElement('div');
    drawnArea.className = 'drawn-area';
    drawnArea.id = 'drawnArea';
    drawnArea.style.cssText = 'display:flex;justify-content:center;gap:25px;min-height:200px;flex-wrap:wrap;margin-bottom:30px;';
    container.appendChild(drawnArea);
    
    // 提示文字 - 扇形正上方
    var instruction = document.createElement('div');
    instruction.id = 'selectionInstruction';
    instruction.innerHTML = '点击选择一张牌';
    instruction.style.cssText = 'text-align:center;font-size:1.2rem;color:#c9a227;margin-bottom:20px;letter-spacing:0.15em;opacity:0;transition:opacity 0.5s ease;';
    container.appendChild(instruction);
    
    // 扇形牌组容器 - 页面正中，更大
    var fanContainer = document.createElement('div');
    fanContainer.id = 'fanContainer';
    fanContainer.style.cssText = 'position:relative;width:100%;max-width:1100px;height:320px;margin:0 auto;opacity:0;transition:opacity 0.5s ease;';
    container.appendChild(fanContainer);
    
    // 随机打乱牌
    var shuffledCards = tarotCards.slice().sort(function() { return Math.random() - 0.5; });
    
    // 创建扇形排列的牌 - 更大
    shuffledCards.forEach(function(card, index) {
        var cardWrapper = document.createElement('div');
        cardWrapper.id = 'card-' + card.id;
        
        var totalCards = shuffledCards.length;
        var angleStep = 4.5;
        var middleIndex = totalCards / 2;
        var angle = (index - middleIndex) * angleStep;
        
        var offsetX = Math.sin(angle * Math.PI / 180) * 220;
        var offsetY = Math.abs(Math.cos(angle * Math.PI / 180)) * 60;
        var rotation = angle * 0.9;
        
        cardWrapper.style.cssText = 'position:absolute;left:50%;top:50%;transform-origin:center bottom;transform:translate(-50%,-50%) translateX(' + offsetX + 'px) translateY(-' + offsetY + 'px) rotate(' + rotation + 'deg);transition:all 0.3s ease;cursor:pointer;z-index:1;';
        
        var cardBack = document.createElement('div');
        cardBack.className = 'card-back-select fan-card';
        
        var symbol = document.createElement('div');
        symbol.className = 'card-symbol-center';
        symbol.textContent = '☽';
        cardBack.appendChild(symbol);
        
        ['tl','tr','bl','br'].forEach(function(pos) {
            var corner = document.createElement('div');
            corner.className = 'card-corner ' + pos;
            cardBack.appendChild(corner);
        });
        
        var stars = document.createElement('div');
        stars.className = 'card-stars';
        for(var i=0;i<4;i++){
            var star = document.createElement('div');
            star.className = 'card-star';
            stars.appendChild(star);
        }
        cardBack.appendChild(stars);
        
        cardWrapper.addEventListener('mouseenter', function(){
            this.style.transform = 'translate(-50%,-50%) translateX(' + offsetX + 'px) translateY(-' + (offsetY + 25) + 'px) rotate(' + rotation + 'deg) scale(1.2)';
            this.style.zIndex = 50;
        });
        
        cardWrapper.addEventListener('mouseleave', function(){
            this.style.transform = 'translate(-50%,-50%) translateX(' + offsetX + 'px) translateY(-' + offsetY + 'px) rotate(' + rotation + 'deg) scale(1)';
            this.style.zIndex = '1';
        });
        
        cardBack.addEventListener('click', function(){drawCard(card, cardWrapper, offsetX, offsetY, rotation)});
        cardWrapper.appendChild(cardBack);
        fanContainer.appendChild(cardWrapper);
    });
    
    // 洗牌动画
    performShuffleAnimation(3, function(){
        shuffleContainer.style.display = 'none';
        
        fanContainer.style.opacity = '1';
        
        // 初始聚拢
        var allCards = fanContainer.querySelectorAll('div[id^="card-"]');
        allCards.forEach(function(card, i){
            card.style.transform = 'translate(-50%,-50%) scale(0.2)';
        });
        
        // 散开动画
        setTimeout(function(){
            allCards.forEach(function(card, i){
                card.style.transitionDelay = (i * 15) + 'ms';
                var totalCards = allCards.length;
                var middleIndex = totalCards / 2;
                var angle = (i - middleIndex) * 4.5;
                var offsetX = Math.sin(angle * Math.PI / 180) * 220;
                var offsetY = Math.abs(Math.cos(angle * Math.PI / 180)) * 60;
                var rotation = angle * 0.9;
                card.style.transform = 'translate(-50%,-50%) translateX(' + offsetX + 'px) translateY(-' + offsetY + 'px) rotate(' + rotation + 'deg)';
            });
            
            // 散开完成后显示提示
            setTimeout(function(){
                instruction.style.opacity = '1';
            }, 800);
        }, 100);
    });
}

// 洗牌动画
function performShuffleAnimation(times, callback) {
    var fanContainer = document.getElementById('fanContainer');
    var currentShuffle = 0;
    
    function shuffle() {
        if (currentShuffle < times) {
            currentShuffle++;
            var shuffleText = document.getElementById('shuffleText');
            shuffleText.textContent = '正在洗牌... 第 ' + currentShuffle + ' 次';
            
            if (fanContainer) {
                fanContainer.style.transition = 'transform 0.15s ease';
                fanContainer.style.transform = 'translate(-50%,-50%) rotate(5deg)';
                setTimeout(function(){
                    fanContainer.style.transform = 'translate(-50%,-50%) rotate(-5deg)';
                    setTimeout(function(){
                        fanContainer.style.transform = 'translate(-50%,-50%) rotate(0deg)';
                        setTimeout(shuffle, 400);
                    }, 150);
                }, 150);
            } else {
                shuffle();
            }
        } else {
            var shuffleText = document.getElementById('shuffleText');
            shuffleText.textContent = '洗牌完成！请抽牌';
            setTimeout(function(){
                if (callback) callback();
            }, 600);
        }
    }
    
    setTimeout(shuffle, 800);
}

// 抽牌 - 点击后翻转并移到下方
function drawCard(card, cardWrapper, offsetX, offsetY, rotation) {
    if (!canSelect) return;
    var positions = spreadPositions[currentSpread];
    var cardCount = positions.length;
    
    if (selectedCards.length >= cardCount) return;
    
    // 检查是否已抽过
    for (var i = 0; i < selectedCards.length; i++) {
        if (selectedCards[i].id === card.id) return;
    }
    
    // 随机正逆位
    var isUpright = Math.random() > 0.5;
    
    selectedCards.push({
        id: card.id,
        name: card.name,
        isUpright: isUpright,
        card: card
    });
    
    // 抽牌动画 - 飞向已选区域
    cardWrapper.style.transition = 'all 0.5s ease';
    cardWrapper.style.transform = 'translate(-50%,-100%) scale(0.6) rotate(0deg)';
    cardWrapper.style.opacity = '0';
    cardWrapper.style.zIndex = '999';
    
    // 显示翻转的牌
    var drawnArea = document.getElementById('drawnArea');
    var position = positions[selectedCards.length - 1];
    
    var flippedCard = document.createElement('div');
    flippedCard.className = 'flipped-card';
    flippedCard.style.cssText = 'text-align:center;animation:cardReveal 0.8s ease-out forwards;opacity:0;position:relative;z-index:' + (200 - selectedCards.length) + ';';
    
    var orientLabel = isUpright ? '正位' : '逆位';
    var orientSymbol = isUpright ? '↑' : '↓';
    var orientColor = isUpright ? '#4caf50' : '#f44336';
    
    flippedCard.innerHTML = '<div style="width:130px;height:195px;position:relative;transform:' + (isUpright ? 'rotate(0deg)' : 'rotate(180deg)') + ';transition:transform 0.8s ease;"><img src="cards/' + card.id + '.svg" style="width:100%;height:100%;object-fit:cover;border-radius:12px;border:3px solid ' + orientColor + ';"></div><div style="margin-top:10px;"><span style="background:' + orientColor + ';color:white;padding:4px 14px;border-radius:15px;font-size:0.85rem;font-weight:bold;">' + orientSymbol + ' ' + orientLabel + '</span></div><div style="color:#c9a227;font-size:0.95rem;margin-top:8px;font-weight:bold;">' + position.name + '</div>';
    
    drawnArea.appendChild(flippedCard);
    
    // 隐藏提示文字
    document.getElementById('selectionInstruction').style.display = 'none';
    
    // 抽完最后一张后，停留1秒再跳转
    if (selectedCards.length >= cardCount) {
        canSelect = false;
        
        // 1秒后跳转到结果页
        setTimeout(function(){
            showInterpretation();
        }, 1000);
    }
}

// 显示解读
function showInterpretation() {
    document.getElementById('readingArea').style.display = 'none';
    document.getElementById('resultArea').style.display = 'block';
    
    var cardsDisplay = document.getElementById('cardsDisplay');
    cardsDisplay.innerHTML = '';
    var positions = spreadPositions[currentSpread];
    var cat = categoryInfo[currentCategory];
    
    // 显示牌面 - 大图无边框，关键词在下方
    selectedCards.forEach(function(selected, index) {
        var card = selected.card;
        var orientLabel = selected.isUpright ? '正位' : '逆位';
        var orientSymbol = selected.isUpright ? '↑' : '↓';
        var orientColor = selected.isUpright ? '#4caf50' : '#f44336';
        var keywords = selected.isUpright ? card.upright : card.reversed;
        var position = positions[index];
        var catKey = currentCategory + '_' + (selected.isUpright ? 'upright' : 'reversed');
        var meaning = card[catKey] || card.career_upright;
        
        var desc = document.createElement('div');
        desc.className = 'card-description';
        desc.style.opacity = '0';
        desc.style.transform = 'translateY(20px)';
        desc.style.transition = 'all 0.6s ease';
        
        // 大图 + 下方信息
        desc.innerHTML = '<div class="card-result-box"><img src="cards/' + card.id + '.svg" alt="' + card.name + '" style="width:180px;height:270px;object-fit:cover;border-radius:12px;' + (selected.isUpright ? '' : 'transform:rotate(180deg);') + '"></div><div class="card-result-info"><h4>' + card.name + '</h4><div style="margin:10px 0;"><span style="display:inline-block;background:' + orientColor + ';color:white;padding:4px 12px;border-radius:15px;font-size:0.85rem;font-weight:bold;">' + orientSymbol + ' ' + orientLabel + '</span></div><div style="color:#e8e6e3;font-size:1rem;margin-bottom:8px;">' + position.name + '</div><div style="color:#c9a227;font-size:0.9rem;">' + keywords + '</div></div></div>';
        
        cardsDisplay.appendChild(desc);
        
        setTimeout(function(){
            desc.style.opacity = '1';
            desc.style.transform = 'translateY(0)';
        }, index * 400 + 300);
    });
    
    // 综合解读
    var interpretation = document.getElementById('interpretation');
    interpretation.style.opacity = '0';
    
    var title = '';
    if (currentSpread === 'single') {
        title = '[' + cat.name + '] 牌面指引';
    } else if (currentSpread === 'three') {
        title = '[' + cat.name + '] 三牌综合解读';
    } else {
        title = '[' + cat.name + '] 凯尔特十字综合解读';
    }
    
    var content = '';
    
    if (currentSpread === 'three') {
        var pastCard = selectedCards[0];
        var presentCard = selectedCards[1];
        var futureCard = selectedCards[2];
        
        var pastMeaning = pastCard.card[currentCategory + '_' + (pastCard.isUpright ? 'upright' : 'reversed')] || pastCard.card.career_upright;
        var presentMeaning = presentCard.card[currentCategory + '_' + (presentCard.isUpright ? 'upright' : 'reversed')] || presentCard.card.career_upright;
        var futureMeaning = futureCard.card[currentCategory + '_' + (futureCard.isUpright ? 'upright' : 'reversed')] || futureCard.card.career_upright;
        
        var pastPos = pastCard.isUpright ? '正位' : '逆位';
        var presentPos = presentCard.isUpright ? '正位' : '逆位';
        var futurePos = futureCard.isUpright ? '正位' : '逆位';
        
        // 如果用户输入了困惑，针对性解读
        if (userConfusion && userConfusion.trim()) {
            content += '<div class="confusion-section"><h4>📝 你问：" ' + userConfusion + '"</h4></div>';
        }
        
        content += '<div class="summary-section"><h4>📍 过去的影响 · ' + pastCard.name + ' (' + pastPos + ')</h4><p>' + pastMeaning + '</p></div>';
        content += '<div class="summary-section"><h4>📍 现在的状况 · ' + presentCard.name + ' (' + presentPos + ')</h4><p>' + presentMeaning + '</p></div>';
        content += '<div class="summary-section"><h4>📍 未来的指引 · ' + futureCard.name + ' (' + futurePos + ')</h4><p>' + futureMeaning + '</p></div>';
        
        // 综合解读 - 深入分析，不是简单重复
        content += '<div class="summary-section confusion-insight"><h4>💡 综合指引</h4>';
        
        if (userConfusion && userConfusion.trim()) {
            content += '<p>针对你的困惑，牌面呈现了一个清晰的故事线：</p>';
            content += '<p><strong>' + pastCard.name + '</strong>出现在"过去"位置';
            if (pastCard.isUpright) {
                content += '，暗示这段经历为你奠定了基础，也许你之前做出的某个决定正在影响现在的情况。';
            } else {
                content += '（逆位），提醒你：过去的某些未解决的问题仍在影响着你，是时候放下那些不再服务于你的东西了。';
            }
            
            content += '</p><p><strong>' + presentCard.name + '</strong>是你此刻的核心课题';
            if (presentCard.isUpright) {
                content += '——牌面建议你顺应这个能量，信任自己的判断。';
            } else {
                content += '（逆位）——这提示你可能需要换个角度来看待问题，或者有些内在的阻碍需要先化解。';
            }
            
            content += '</p><p><strong>' + futureCard.name + '</strong>作为未来的指引';
            if (futureCard.isUpright) {
                content += '，预示着事情将向着积极的方向发展。保持开放的心态，机会正在靠近。';
            } else {
                content += '（逆位），提醒你：未来需要更多的耐心和内在功课。这不是阻碍，而是让你更成熟的邀请。';
            }
            
            content += '</p><p style="margin-top:15px;color:#c9a227;">🔮 <strong>行动建议：</strong>关注"现在"这张牌给你的启示，它是最关键的转折点。过去已成定局，未来还在形成，而此刻的选择决定了走向。</p>';
        } else {
            content += '<p>' + pastCard.name + '、' + presentCard.name + '、' + futureCard.name + '——三张牌串联起你的命运轨迹。</p>';
            content += '<p>过去塑造了你，现在是关键时刻，未来则充满可能性。信任这个过程，答案正在显现。</p>';
        }
        
        content += '</div><div class="summary-footer"><p class="footer-note">—— 命运的启示 · 仅供参考 ——</p></div>';
        
    } else if (currentSpread === 'single') {
        var selected = selectedCards[0];
        var meaning = selected.card[currentCategory + '_' + (selected.isUpright ? 'upright' : 'reversed')] || selected.card.career_upright;
        var posLabel = selected.isUpright ? '正位' : '逆位';
        
        if (userConfusion && userConfusion.trim()) {
            content += '<div class="confusion-section"><h4>📝 你问：" ' + userConfusion + '"</h4></div>';
            content += '<div class="summary-section"><h4>' + selected.name + ' (' + posLabel + ')</h4><p>' + meaning + '</p></div>';
            
            // 深入指引，不是重复牌义
            content += '<div class="summary-section confusion-insight"><h4>💡 深度指引</h4>';
            content += '<p><strong>' + selected.name + '</strong>出现在你的占卜中，不是偶然。';
            
            if (selected.isUpright) {
                content += '这张牌正向出现，意味着能量正在流动。你现在所需要的品质、机会或答案，其实已经在你周围——';
                content += '只是需要你去"看见"它。不要过度分析，信任直觉的指引。</p>';
                content += '<p style="margin-top:10px;color:#c9a227;">🔮 <strong>提醒：</strong>有时候答案很简单，是我们把它想复杂了。</p>';
            } else {
                content += '逆位并不代表"坏"，而是提示你：有些东西需要被重新审视。';
                content += '也许你一直在抗拒某个真相，或者对自己不够诚实。这张牌邀请你向内看，找到那个阻碍你前进的核心。</p>';
                content += '<p style="margin-top:10px;color:#c9a227;">🔮 <strong>提醒：</strong>逆位是转变的信号，不是障碍。问自己：我真正害怕的是什么？</p>';
            }
            content += '</p></div>';
        } else {
            content += '<div class="summary-section"><h4>' + selected.name + ' (' + posLabel + ')</h4><p>' + meaning + '</p></div>';
        }
        
        content += '<p class="footer-note">—— 命运的启示 · 仅供参考 ——</p>';
    } else {
        if (userConfusion && userConfusion.trim()) {
            content += '<div class="confusion-section"><h4>📝 你问：" ' + userConfusion + '"</h4></div>';
            content += '<div class="summary-section confusion-insight"><h4>💡 综合指引</h4>';
            content += '<p>凯尔特十字牌阵揭示了命运的深层结构。10张牌中，每一张都在讲述你故事的不同层面。</p>';
            content += '<p><strong>特别关注：</strong>第5张（潜意识）揭示了隐藏的动力，第9张（结果）指向最终走向。</p>';
            content += '<p style="margin-top:10px;color:#c9a227;">🔮 这个牌阵非常丰富，建议你花时间静心感受每张牌的信息，答案会在安静中浮现。</p></div>';
        }
        content += '<p class="footer-note">—— 命运的启示 · 仅供参考 ——</p>';
    }
    
    interpretation.innerHTML = '<h3>' + title + '</h3>' + content;
    setTimeout(function(){
        interpretation.style.transition = 'opacity 0.8s ease';
        interpretation.style.opacity = '1';
    }, selectedCards.length * 400 + 500);
}

function restart() {
    currentCategory = null;
    currentSpread = null;
    selectedCards = [];
    canSelect = true;
    userConfusion = "";
    document.getElementById('resultArea').style.display = 'none';
    document.getElementById('readingArea').style.display = 'none';
    document.getElementById('spreadSelection').style.display = 'none';
    document.getElementById('intentionSection').style.display = 'none';
    document.getElementById('categorySelection').style.display = 'block';
    document.getElementById('confusionInput').value = "";
    var container = document.getElementById('deckContainer');
    container.innerHTML = '';
}

// 保存占卜记录到本地存储
function saveReading() {
    if (selectedCards.length === 0) return;
    
    var reading = {
        date: new Date().toLocaleString('zh-CN'),
        category: currentCategory,
        spread: currentSpread,
        confusion: userConfusion,
        cards: selectedCards.map(function(c) {
            return {
                name: c.name,
                isUpright: c.isUpright
            };
        })
    };
    
    var readings = JSON.parse(localStorage.getItem('tarotReadings') || '[]');
    readings.unshift(reading);
    if (readings.length > 20) readings = readings.slice(0, 20);
    localStorage.setItem('tarotReadings', JSON.stringify(readings));
    
    alert('占卜记录已保存！');
}

// 分享占卜结果
function shareReading() {
    var text = '🔮 暗夜塔罗占卜结果\n\n';
    text += '【' + (currentCategory === 'career' ? '事业' : currentCategory === 'love' ? '爱情' : '学习') + '】\n\n';
    
    selectedCards.forEach(function(c, i) {
        var pos = spreadPositions[currentSpread][i];
        text += pos.name + '：' + c.name + (c.isUpright ? ' ↑正位' : ' ↓逆位') + '\n';
    });
    
    text += '\n✨ 来自暗夜塔罗';
    
    // 复制到剪贴板
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            alert('已复制到剪贴板，可以分享给朋友！');
        });
    } else {
        alert(text);
    }
}

document.addEventListener('DOMContentLoaded', function(){
    console.log('暗夜塔罗已就绪');
});
