// Love Tarot JavaScript Functionality
// ====================================

// 塔罗牌数据
const tarotCards = [
    {
        name: "The Lovers",
        icon: "💕",
        meaning: "Deep connection and harmony in relationships. A time for important choices in love.",
        advice: "Trust your heart and embrace the love that surrounds you."
    },
    {
        name: "Two of Cups",
        icon: "🥂",
        meaning: "Mutual attraction and partnership. A new romantic beginning or deepening bond.",
        advice: "Open your heart to genuine connections and emotional intimacy."
    },
    {
        name: "Queen of Cups",
        icon: "👑",
        meaning: "Emotional maturity and intuitive understanding in relationships.",
        advice: "Lead with compassion and trust your emotional intelligence."
    },
    {
        name: "Ten of Cups",
        icon: "🌈",
        meaning: "Emotional fulfillment and happiness in love. Family harmony and joy.",
        advice: "Appreciate the love you have and create beautiful memories together."
    },
    {
        name: "Ace of Cups",
        icon: "💖",
        meaning: "New love beginning or a fresh start in existing relationships.",
        advice: "Be open to new romantic opportunities and emotional renewal."
    },
    {
        name: "The Star",
        icon: "⭐",
        meaning: "Hope and healing in love. Divine guidance in romantic matters.",
        advice: "Have faith in love and trust that the universe supports your happiness."
    },
    {
        name: "The Sun",
        icon: "☀️",
        meaning: "Joy, success, and vitality in relationships. Pure happiness in love.",
        advice: "Embrace the positive energy and let your love shine brightly."
    },
    {
        name: "Three of Cups",
        icon: "🎉",
        meaning: "Celebration of love and friendship. Community and shared joy.",
        advice: "Celebrate your relationships and cherish your connections."
    }
];

// 爱情能量状态
const loveEnergies = [
    { label: "Harmonious", emoji: "✨", color: "#ff6b9d" },
    { label: "Passionate", emoji: "🔥", color: "#c44569" },
    { label: "Gentle", emoji: "🌸", color: "#ffb3d1" },
    { label: "Mystical", emoji: "🌙", color: "#8b2635" },
    { label: "Transformative", emoji: "🦋", color: "#ff1744" }
];

const venusPositions = [
    { label: "Favorable", emoji: "💕" },
    { label: "Powerful", emoji: "💪" },
    { label: "Inspiring", emoji: "✨" },
    { label: "Protective", emoji: "🛡️" },
    { label: "Magnetic", emoji: "🧲" }
];

const romanceForecasts = [
    { label: "Passionate", emoji: "🔥" },
    { label: "Tender", emoji: "💐" },
    { label: "Exciting", emoji: "⚡" },
    { label: "Dreamy", emoji: "☁️" },
    { label: "Magical", emoji: "✨" }
];

// DOM元素
let currentCard = null;
let isCardFlipped = false;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeLoveEnergy();
    initializeDailyCard();
    setupEventListeners();
    startBackgroundAnimations();
});

// 初始化爱情能量显示 - 基于日期的每日固定内容
function initializeLoveEnergy() {
    const loveEnergyEl = document.getElementById('loveEnergy');
    const venusPositionEl = document.getElementById('venusPosition');
    const romanceForecastEl = document.getElementById('romanceForecast');

    // 获取今日日期作为种子
    const today = new Date();
    const dateString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const seed = hashCode(dateString);

    if (loveEnergyEl) {
        const energyIndex = Math.abs(seed) % loveEnergies.length;
        const todayEnergy = loveEnergies[energyIndex];
        loveEnergyEl.textContent = `${todayEnergy.label} ${todayEnergy.emoji}`;
        loveEnergyEl.style.color = todayEnergy.color;
    }

    if (venusPositionEl) {
        const venusIndex = Math.abs(seed * 2) % venusPositions.length;
        const todayVenus = venusPositions[venusIndex];
        venusPositionEl.textContent = `${todayVenus.label} ${todayVenus.emoji}`;
    }

    if (romanceForecastEl) {
        const romanceIndex = Math.abs(seed * 3) % romanceForecasts.length;
        const todayRomance = romanceForecasts[romanceIndex];
        romanceForecastEl.textContent = `${todayRomance.label} ${todayRomance.emoji}`;
    }
}

// 简单的字符串哈希函数，用于基于日期生成固定种子
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // 转换为32位整数
    }
    return hash;
}

// 初始化每日卡牌
function initializeDailyCard() {
    currentCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    
    // 更新卡牌内容
    const cardNameEl = document.getElementById('cardName');
    const cardMeaningEl = document.getElementById('cardMeaning');
    const cardImageEl = document.querySelector('.card-image');
    
    if (cardNameEl) cardNameEl.textContent = currentCard.name;
    if (cardMeaningEl) cardMeaningEl.textContent = currentCard.meaning;
    if (cardImageEl) cardImageEl.textContent = currentCard.icon;

    // 生成每日建议
    generateDailyAdvice();
}

// 生成每日爱情建议
function generateDailyAdvice() {
    const adviceList = [
        "Be open to new romantic possibilities",
        "Express your feelings honestly and openly",
        "Trust your intuition in matters of the heart",
        "Focus on building deeper emotional connections",
        "Practice self-love and self-care",
        "Communicate with kindness and understanding",
        "Let go of past hurts and embrace new beginnings",
        "Show appreciation for your loved ones"
    ];

    const todayAdvice = adviceList.sort(() => 0.5 - Math.random()).slice(0, 4);
    const adviceEl = document.getElementById('dailyAdvice');
    
    if (adviceEl) {
        adviceEl.innerHTML = todayAdvice.map(advice => `<li>${advice}</li>`).join('');
    }
}

// 设置事件监听器
function setupEventListeners() {
    // 每日卡牌翻转
    const dailyCardBack = document.getElementById('dailyCardBack');
    if (dailyCardBack) {
        dailyCardBack.addEventListener('click', flipDailyCard);
    }

    // 导航下拉菜单
    setupNavigationDropdowns();

    // 平滑滚动
    setupSmoothScrolling();
}

// 翻转每日卡牌
function flipDailyCard() {
    if (isCardFlipped) return;

    const cardBack = document.getElementById('dailyCardBack');
    const cardFront = document.getElementById('dailyCardFront');

    if (cardBack && cardFront) {
        cardBack.style.transform = 'rotateY(-180deg)';
        cardBack.style.opacity = '0';
        
        setTimeout(() => {
            cardBack.style.display = 'none';
            cardFront.style.display = 'flex';
            cardFront.classList.remove('hidden');
            cardFront.style.transform = 'rotateY(0deg)';
            cardFront.style.opacity = '1';
        }, 300);

        isCardFlipped = true;

        // 添加特效
        createHeartParticles();
    }
}

// 创建爱心粒子特效
function createHeartParticles() {
    const particleCount = 15;
    const container = document.querySelector('.card-day-container');
    
    if (!container) return;

    for (let i = 0; i < particleCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '💕';
        heart.style.position = 'absolute';
        heart.style.fontSize = '20px';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '1000';
        heart.style.left = Math.random() * 100 + '%';
        heart.style.top = Math.random() * 100 + '%';
        heart.style.opacity = '0';
        heart.style.transform = 'scale(0)';
        heart.style.transition = 'all 1s ease-out';

        container.appendChild(heart);

        // 触发动画
        setTimeout(() => {
            heart.style.opacity = '1';
            heart.style.transform = 'scale(1) translateY(-50px)';
        }, i * 100);

        // 移除元素
        setTimeout(() => {
            heart.remove();
        }, 1500);
    }
}

// 设置导航下拉菜单
function setupNavigationDropdowns() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    
    dropdowns.forEach(dropdown => {
        const toggle = dropdown.querySelector('.dropdown-toggle');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (toggle && menu) {
            toggle.addEventListener('click', (e) => {
                e.preventDefault();
                dropdown.classList.toggle('active');
            });
        }
    });

    // 点击外部关闭下拉菜单
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('active');
            });
        }
    });
}

// 设置平滑滚动
function setupSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 启动背景动画
function startBackgroundAnimations() {
    // 添加浮动的爱心
    createFloatingHearts();
    
    // 添加星星闪烁效果
    createTwinklingStars();
}

// 创建浮动爱心
function createFloatingHearts() {
    const heartSymbols = ['💕', '💖', '💗', '💘', '💝'];
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.innerHTML = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
        heart.style.position = 'fixed';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = '100vh';
        heart.style.fontSize = Math.random() * 20 + 15 + 'px';
        heart.style.opacity = '0.3';
        heart.style.pointerEvents = 'none';
        heart.style.zIndex = '-1';
        heart.style.transition = 'all 8s linear';
        
        document.body.appendChild(heart);
        
        // 开始上升动画
        setTimeout(() => {
            heart.style.top = '-100px';
            heart.style.opacity = '0';
        }, 100);
        
        // 移除元素
        setTimeout(() => {
            heart.remove();
        }, 8000);
    }, 3000);
}

// 创建闪烁星星
function createTwinklingStars() {
    const starCount = 20;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.innerHTML = '✨';
        star.style.position = 'fixed';
        star.style.left = Math.random() * 100 + 'vw';
        star.style.top = Math.random() * 100 + 'vh';
        star.style.fontSize = Math.random() * 15 + 10 + 'px';
        star.style.opacity = '0.5';
        star.style.pointerEvents = 'none';
        star.style.zIndex = '-1';
        star.style.animation = `twinkle ${Math.random() * 3 + 2}s infinite`;
        
        document.body.appendChild(star);
    }
}

// 占卜功能
function startReading(type) {
    const readingMessages = {
        'daily-love': "Drawing your daily love card...",
        'how-he-feels': "Revealing his true feelings...",
        'relationship': "Exploring your relationship dynamics..."
    };

    const message = readingMessages[type] || "Preparing your reading...";
    showReadingProcess(message, type);
}

// 显示占卜过程
function showReadingProcess(message, type) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 400px;
        width: 90%;
        box-shadow: 0 20px 40px rgba(255, 20, 147, 0.3);
    `;

    content.innerHTML = `
        <div style="font-size: 3em; margin-bottom: 20px;">🔮</div>
        <h2 style="color: #c44569; margin-bottom: 15px; font-family: 'Playfair Display', serif;">${message}</h2>
        <div style="display: flex; justify-content: center; gap: 10px; margin: 20px 0;">
            <div class="loading-dot" style="width: 10px; height: 10px; background: #ff6b9d; border-radius: 50%; animation: bounce 1.4s infinite;"></div>
            <div class="loading-dot" style="width: 10px; height: 10px; background: #c44569; border-radius: 50%; animation: bounce 1.4s infinite 0.2s;"></div>
            <div class="loading-dot" style="width: 10px; height: 10px; background: #8b2635; border-radius: 50%; animation: bounce 1.4s infinite 0.4s;"></div>
        </div>
        <p style="color: #666; font-size: 0.9em;">The cards are aligning for you...</p>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 3秒后显示结果
    setTimeout(() => {
        showReadingResult(type);
        modal.remove();
        style.remove();
    }, 3000);
}

// 显示占卜结果
function showReadingResult(type) {
    const selectedCard = tarotCards[Math.floor(Math.random() * tarotCards.length)];
    
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        backdrop-filter: blur(10px);
    `;

    const content = document.createElement('div');
    content.style.cssText = `
        background: white;
        padding: 40px;
        border-radius: 20px;
        text-align: center;
        max-width: 500px;
        width: 95%;
        box-shadow: 0 20px 40px rgba(255, 20, 147, 0.3);
    `;

    const readingTitles = {
        'daily-love': "Your Daily Love Reading",
        'how-he-feels': "How He Feels About You",
        'relationship': "Your Relationship Reading",
        'three-card': "Three Card Love Spread",
        'celtic-cross': "Celtic Cross Love Reading",
        'soulmate': "Soulmate Connection Reading"
    };

    const spreadAdvice = {
        'three-card': "This card represents a key aspect of your love journey - past influences, present energy, or future potential. Use this insight to understand your romantic path better.",
        'celtic-cross': "This card reveals important information about your relationship dynamics. The Celtic Cross offers deep insights into the complexities of your love life.",
        'soulmate': "This card connects to your soulmate energy and divine love connection. Trust in the universe's plan for your romantic destiny."
    };

    const currentTitle = readingTitles[type] || "Your Love Reading";
    const currentAdvice = spreadAdvice[type] || selectedCard.advice;

    content.innerHTML = `
        <div style="font-size: 4em; margin-bottom: 20px;">${selectedCard.icon}</div>
        <h2 style="color: #c44569; margin-bottom: 10px; font-family: 'Playfair Display', serif;">${currentTitle}</h2>
        <h3 style="color: #8b2635; margin-bottom: 20px; font-family: 'Playfair Display', serif;">${selectedCard.name}</h3>
        <p style="color: #666; line-height: 1.6; margin-bottom: 25px; font-size: 1.1em;">${selectedCard.meaning}</p>
        <div style="background: rgba(255, 107, 157, 0.1); padding: 20px; border-radius: 15px; margin-bottom: 25px;">
            <h4 style="color: #c44569; margin-bottom: 10px;">💝 Guidance for You:</h4>
            <p style="color: #666; line-height: 1.5;">${currentAdvice}</p>
        </div>
        <div style="margin-bottom: 25px;">
            <button onclick="this.parentElement.parentElement.remove()" style="
                background: linear-gradient(135deg, #ff6b9d, #c44569);
                color: white;
                border: none;
                padding: 12px 30px;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                margin-right: 10px;
            ">Close Reading</button>
            ${type.includes('card') || type.includes('cross') || type.includes('soulmate') ? 
                `<button onclick="window.location.href='pages/${type === 'three-card' ? 'three-card-love' : type === 'celtic-cross' ? 'celtic-cross-love' : 'soulmate-spread'}.html'" style="
                    background: linear-gradient(135deg, #667eea, #764ba2);
                    color: white;
                    border: none;
                    padding: 12px 30px;
                    border-radius: 25px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                ">Full Reading</button>` : ''
            }
        </div>
    `;

    modal.appendChild(content);
    document.body.appendChild(modal);

    // 添加关闭功能
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

// 选择牌阵
function selectSpread(spreadType) {
    const spreadMessages = {
        'three-card': "Preparing your Three Card Love Spread...",
        'celtic-cross': "Setting up your Celtic Cross Love Reading...",
        'soulmate': "Connecting with your Soulmate energy..."
    };

    const message = spreadMessages[spreadType] || "Preparing your spread...";
    showSpreadReading(message, spreadType);
}

// 显示牌阵占卜
function showSpreadReading(message, spreadType) {
    showReadingProcess(message, spreadType);
}

// 工具函数：格式化日期
function formatDate(date) {
    const options = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
}

// 更新页面时间
function updateDateTime() {
    const now = new Date();
    const dateElements = document.querySelectorAll('.current-date');
    
    dateElements.forEach(el => {
        el.textContent = formatDate(now);
    });
}

// 初始化时间更新
updateDateTime();
setInterval(updateDateTime, 60000); // 每分钟更新一次

// 导出函数供全局使用
window.startReading = startReading;
window.selectSpread = selectSpread; 