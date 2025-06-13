// How Does He Feel About Me - JavaScript Functionality
// ===================================================

// 感情占卜卡牌数据
const feelingCards = [
    {
        name: "The Lovers",
        icon: "💕",
        meaning: "He feels a deep romantic connection and is drawn to you emotionally. There's genuine love and attraction present.",
        interpretation: "This card reveals that he has strong romantic feelings for you. He sees you as someone special and feels a deep emotional and spiritual connection. There's potential for a meaningful relationship if you both nurture this connection.",
        feelings: {
            romantic: 95,
            thinking: 88,
            future: 92
        },
        actions: [
            "Be open and authentic when communicating with him",
            "Create opportunities for deeper one-on-one conversations",
            "Show your genuine interest in getting to know him better",
            "Trust the connection and allow it to develop naturally"
        ]
    },
    {
        name: "Two of Cups",
        icon: "🥂",
        meaning: "He feels mutual attraction and sees potential for partnership. His feelings are growing stronger each day.",
        interpretation: "He's developing genuine feelings for you and sees you as relationship material. There's a beautiful reciprocal energy between you both, and he feels emotionally balanced when he's around you.",
        feelings: {
            romantic: 85,
            thinking: 90,
            future: 88
        },
        actions: [
            "Reciprocate his energy and show your interest",
            "Plan activities you both enjoy together",
            "Be emotionally available and supportive",
            "Celebrate small moments and connections"
        ]
    },
    {
        name: "Queen of Cups",
        icon: "👑",
        meaning: "He admires your emotional intelligence and feels safe to be vulnerable around you. You make him feel understood.",
        interpretation: "He sees you as emotionally mature and nurturing. You make him feel comfortable expressing his feelings, and he values your empathetic nature. He feels emotionally supported in your presence.",
        feelings: {
            romantic: 78,
            thinking: 95,
            future: 82
        },
        actions: [
            "Continue being your authentic, caring self",
            "Listen actively when he shares his thoughts",
            "Create a safe space for emotional intimacy",
            "Show appreciation for his vulnerability"
        ]
    },
    {
        name: "Ten of Cups",
        icon: "🌈",
        meaning: "He envisions a happy future with you and feels complete when you're together. Family and long-term commitment are on his mind.",
        interpretation: "His feelings run deep and he's thinking long-term. He sees you fitting into his future plans and dreams of creating a beautiful life together. This is serious romantic interest with commitment potential.",
        feelings: {
            romantic: 92,
            thinking: 85,
            future: 98
        },
        actions: [
            "Share your future goals and dreams with him",
            "Show interest in his family and friends",
            "Discuss your values and what's important to you",
            "Be patient as he processes these deep feelings"
        ]
    },
    {
        name: "Ace of Cups",
        icon: "💖",
        meaning: "New romantic feelings are blossoming in his heart. He's experiencing the beginning stages of love.",
        interpretation: "Fresh romantic feelings are emerging within him. While these feelings are new, they're genuine and growing stronger. He's opening his heart to the possibility of love with you.",
        feelings: {
            romantic: 75,
            thinking: 82,
            future: 80
        },
        actions: [
            "Give these new feelings time to develop",
            "Be patient and don't rush the process",
            "Show consistency in your interactions",
            "Create positive, memorable experiences together"
        ]
    },
    {
        name: "The Star",
        icon: "⭐",
        meaning: "You inspire hope and healing in his life. He feels spiritually connected to you and sees you as his guiding light.",
        interpretation: "You represent hope and positivity in his life. He feels uplifted and inspired when he thinks about you. There's a spiritual element to his feelings, and he sees you as someone who brings out the best in him.",
        feelings: {
            romantic: 88,
            thinking: 92,
            future: 85
        },
        actions: [
            "Continue being a positive influence in his life",
            "Share your dreams and aspirations with him",
            "Support his goals and encourage his growth",
            "Maintain your optimistic and inspiring energy"
        ]
    },
    {
        name: "Knight of Cups",
        icon: "🏇",
        meaning: "He's ready to pursue you romantically and express his feelings. Expect romantic gestures and declarations soon.",
        interpretation: "He's moving from feelings to action. His romantic interest is strong enough that he's planning to make his move. Expect him to be more expressive about his feelings and potentially make romantic gestures.",
        feelings: {
            romantic: 90,
            thinking: 88,
            future: 87
        },
        actions: [
            "Be receptive to his romantic advances",
            "Encourage his efforts to express himself",
            "Show appreciation for his romantic gestures",
            "Be clear about your own feelings when appropriate"
        ]
    },
    {
        name: "Six of Cups",
        icon: "🎠",
        meaning: "He feels nostalgic and comfortable with you, like you've known each other forever. There's a soul connection.",
        interpretation: "He feels an instant familiarity and comfort with you that goes beyond normal attraction. You feel like 'home' to him, and he senses a deeper soul connection that transcends the physical realm.",
        feelings: {
            romantic: 82,
            thinking: 90,
            future: 90
        },
        actions: [
            "Embrace the natural flow of your connection",
            "Share childhood memories and stories",
            "Create new memories that feel timeless",
            "Trust the spiritual bond between you"
        ]
    }
];

// 全局变量
let selectedCard = null;
let isReading = false;

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    initializeFeelingsPage();
    setupEventListeners();
    addVisualEffects();
});

// 初始化感情页面
function initializeFeelingsPage() {
    // 添加卡牌悬停效果
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
            if (!isReading) {
                card.style.transform = 'translateY(-10px) scale(1.05)';
                card.style.boxShadow = '0 15px 30px rgba(255, 107, 157, 0.4)';
                
                // 添加发光效果
                const pattern = card.querySelector('.card-pattern');
                if (pattern) {
                    pattern.style.fontSize = '2.5em';
                    pattern.style.textShadow = '0 0 20px rgba(255, 107, 157, 0.8)';
                }
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!isReading) {
                card.style.transform = '';
                card.style.boxShadow = '';
                
                const pattern = card.querySelector('.card-pattern');
                if (pattern) {
                    pattern.style.fontSize = '';
                    pattern.style.textShadow = '';
                }
            }
        });
    });

    // 添加FAQ折叠功能
    setupFAQAccordion();
}

// 揭示感情结果
function revealFeeling(cardNumber) {
    if (isReading) return;
    
    isReading = true;
    selectedCard = feelingCards[Math.floor(Math.random() * feelingCards.length)];
    
    // 禁用所有卡牌
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach((card, index) => {
        if (index + 1 !== cardNumber) {
            card.style.opacity = '0.3';
            card.style.pointerEvents = 'none';
        } else {
            card.style.transform = 'scale(1.1)';
            card.style.boxShadow = '0 20px 40px rgba(255, 107, 157, 0.6)';
        }
    });

    // 显示加载过程
    showLoadingProcess();
    
    // 3秒后显示结果
    setTimeout(() => {
        displayFeelingResult();
        scrollToResult();
    }, 3000);
}

// 显示加载过程
function showLoadingProcess() {
    const loadingModal = document.createElement('div');
    loadingModal.className = 'loading-modal';
    loadingModal.innerHTML = `
        <div class="loading-content">
            <div class="mystical-circle">
                <div class="inner-circle">
                    <div class="heart-pulse">💕</div>
                </div>
            </div>
            <h3>Reading His Heart...</h3>
            <p>The cards are connecting with his energy...</p>
            <div class="loading-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;

    document.body.appendChild(loadingModal);

    // 添加样式
    const style = document.createElement('style');
    style.textContent = `
        .loading-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            backdrop-filter: blur(10px);
        }
        .loading-content {
            text-align: center;
            color: white;
        }
        .mystical-circle {
            width: 150px;
            height: 150px;
            border: 2px solid #ff6b9d;
            border-radius: 50%;
            margin: 0 auto 20px;
            position: relative;
            animation: mysticalRotate 3s linear infinite;
        }
        .inner-circle {
            width: 100px;
            height: 100px;
            border: 1px solid #c44569;
            border-radius: 50%;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            justify-content: center;
        }
        .heart-pulse {
            font-size: 3em;
            animation: heartPulse 1s ease-in-out infinite;
        }
        .loading-dots span {
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #ff6b9d;
            margin: 0 3px;
            animation: loadingBounce 1.4s infinite;
        }
        .loading-dots span:nth-child(2) { animation-delay: 0.2s; }
        .loading-dots span:nth-child(3) { animation-delay: 0.4s; }
        
        @keyframes mysticalRotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        @keyframes heartPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.2); }
        }
        @keyframes loadingBounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1); }
        }
    `;
    document.head.appendChild(style);

    // 3秒后移除加载界面
    setTimeout(() => {
        loadingModal.remove();
        style.remove();
    }, 3000);
}

// 显示感情结果
function displayFeelingResult() {
    const resultDiv = document.getElementById('readingResult');
    
    // 更新结果内容
    document.getElementById('cardName').textContent = selectedCard.name;
    document.getElementById('cardIcon').textContent = selectedCard.icon;
    document.getElementById('cardMeaning').textContent = selectedCard.meaning;
    document.getElementById('interpretationContent').innerHTML = `<p>${selectedCard.interpretation}</p>`;

    // 更新感情分析条
    updateFeelingBars();
    
    // 更新建议列表
    updateActionsList();

    // 显示结果
    resultDiv.style.display = 'block';
    resultDiv.style.opacity = '0';
    resultDiv.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        resultDiv.style.transition = 'all 0.6s ease';
        resultDiv.style.opacity = '1';
        resultDiv.style.transform = 'translateY(0)';
    }, 100);

    // 添加特效
    createResultParticles();
}

// 更新感情分析条
function updateFeelingBars() {
    const feelings = selectedCard.feelings;
    
    // 延迟动画效果
    setTimeout(() => {
        animateBar('romanticFill', 'romanticPercent', feelings.romantic);
    }, 500);
    
    setTimeout(() => {
        animateBar('thinkingFill', 'thinkingPercent', feelings.thinking);
    }, 800);
    
    setTimeout(() => {
        animateBar('futureFill', 'futurePercent', feelings.future);
    }, 1100);
}

// 动画感情条
function animateBar(fillId, percentId, value) {
    const fill = document.getElementById(fillId);
    const percent = document.getElementById(percentId);
    
    if (fill && percent) {
        let current = 0;
        const increment = value / 50; // 50步动画
        
        const animation = setInterval(() => {
            current += increment;
            if (current >= value) {
                current = value;
                clearInterval(animation);
            }
            
            fill.style.width = current + '%';
            percent.textContent = Math.round(current) + '%';
            
            // 根据百分比设置颜色
            if (current >= 80) {
                fill.style.background = 'linear-gradient(90deg, #ff6b9d, #ff1744)';
            } else if (current >= 60) {
                fill.style.background = 'linear-gradient(90deg, #ffb3d1, #ff6b9d)';
            } else {
                fill.style.background = 'linear-gradient(90deg, #ffd1dc, #ffb3d1)';
            }
        }, 20);
    }
}

// 更新建议列表
function updateActionsList() {
    const actionsList = document.getElementById('actionsList');
    if (actionsList && selectedCard.actions) {
        actionsList.innerHTML = selectedCard.actions
            .map(action => `<li>${action}</li>`)
            .join('');
    }
}

// 滚动到结果区域
function scrollToResult() {
    setTimeout(() => {
        const resultDiv = document.getElementById('readingResult');
        if (resultDiv) {
            resultDiv.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }, 500);
}

// 创建结果特效
function createResultParticles() {
    const container = document.getElementById('readingResult');
    if (!container) return;

    const hearts = ['💕', '💖', '💗', '💘', '💝', '💟'];
    
    for (let i = 0; i < 12; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.position = 'absolute';
            heart.style.fontSize = Math.random() * 15 + 15 + 'px';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.top = '100%';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '1000';
            heart.style.opacity = '0.8';
            heart.style.transition = 'all 3s ease-out';
            
            container.appendChild(heart);
            
            setTimeout(() => {
                heart.style.top = '-50px';
                heart.style.opacity = '0';
                heart.style.transform = 'scale(1.5) rotate(360deg)';
            }, 100);
            
            setTimeout(() => {
                heart.remove();
            }, 3000);
        }, i * 200);
    }
}

// 设置FAQ手风琴
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item h3');
    
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            const answer = item.nextElementSibling;
            const isOpen = answer.style.display === 'block';
            
            // 关闭所有FAQ
            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.style.display = 'none';
            });
            
            // 移除所有active类
            document.querySelectorAll('.faq-item h3').forEach(h => {
                h.classList.remove('active');
            });
            
            // 如果当前项未打开，则打开它
            if (!isOpen) {
                answer.style.display = 'block';
                item.classList.add('active');
            }
        });
        
        // 添加点击样式
        item.style.cursor = 'pointer';
        item.style.transition = 'color 0.3s ease';
        
        item.addEventListener('mouseenter', () => {
            item.style.color = '#ff6b9d';
        });
        
        item.addEventListener('mouseleave', () => {
            if (!item.classList.contains('active')) {
                item.style.color = '';
            }
        });
    });
}

// 设置事件监听器
function setupEventListeners() {
    // 重新开始按钮（如果需要添加）
    const resetBtn = document.getElementById('resetReading');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetReading);
    }
}

// 重置占卜
function resetReading() {
    isReading = false;
    selectedCard = null;
    
    // 重置卡牌状态
    const cards = document.querySelectorAll('.tarot-card');
    cards.forEach(card => {
        card.style.opacity = '1';
        card.style.pointerEvents = 'auto';
        card.style.transform = '';
        card.style.boxShadow = '';
    });
    
    // 隐藏结果
    const resultDiv = document.getElementById('readingResult');
    if (resultDiv) {
        resultDiv.style.display = 'none';
    }
    
    // 重置进度条
    const fills = ['romanticFill', 'thinkingFill', 'futureFill'];
    const percents = ['romanticPercent', 'thinkingPercent', 'futurePercent'];
    
    fills.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.style.width = '0%';
    });
    
    percents.forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = '0%';
    });
}

// 添加视觉效果
function addVisualEffects() {
    // 添加页面加载动画
    const hero = document.querySelector('.page-hero');
    if (hero) {
        hero.style.opacity = '0';
        hero.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            hero.style.transition = 'all 1s ease';
            hero.style.opacity = '1';
            hero.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // 添加卡牌网格动画
    const cardsGrid = document.querySelector('.cards-grid');
    if (cardsGrid) {
        cardsGrid.style.opacity = '0';
        cardsGrid.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            cardsGrid.style.transition = 'all 0.8s ease';
            cardsGrid.style.opacity = '1';
            cardsGrid.style.transform = 'translateY(0)';
        }, 600);
    }
}

// 导出函数供全局使用
window.revealFeeling = revealFeeling;
window.resetReading = resetReading;