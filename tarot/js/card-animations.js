// Card Animations and Visual Effects
// ==================================

// 卡牌动画效果
class CardAnimations {
    constructor() {
        this.init();
    }

    init() {
        this.setupCardHoverEffects();
        this.setupReadingCardAnimations();
        this.addParticleEffects();
    }

    // 设置卡牌悬停效果
    setupCardHoverEffects() {
        const cards = document.querySelectorAll('.reading-card, .spread-card, .tarot-card');
        
        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.addCardGlow(card);
                this.createSparkles(card);
            });

            card.addEventListener('mouseleave', () => {
                this.removeCardGlow(card);
            });
        });
    }

    // 添加卡牌发光效果
    addCardGlow(card) {
        card.style.transition = 'all 0.3s ease';
        card.style.transform = 'translateY(-5px) scale(1.02)';
        card.style.boxShadow = '0 15px 30px rgba(255, 107, 157, 0.4)';
    }

    // 移除卡牌发光效果
    removeCardGlow(card) {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
    }

    // 创建星花效果
    createSparkles(card) {
        const sparkleCount = 5;
        const rect = card.getBoundingClientRect();

        for (let i = 0; i < sparkleCount; i++) {
            const sparkle = document.createElement('div');
            sparkle.innerHTML = '✨';
            sparkle.style.cssText = `
                position: fixed;
                left: ${rect.left + Math.random() * rect.width}px;
                top: ${rect.top + Math.random() * rect.height}px;
                font-size: ${Math.random() * 10 + 15}px;
                pointer-events: none;
                z-index: 1000;
                animation: sparkleFloat 2s ease-out forwards;
                opacity: 0.8;
            `;

            document.body.appendChild(sparkle);

            // 2秒后移除
            setTimeout(() => {
                if (sparkle.parentNode) {
                    sparkle.parentNode.removeChild(sparkle);
                }
            }, 2000);
        }
    }

    // 设置读牌卡片动画
    setupReadingCardAnimations() {
        const readingCards = document.querySelectorAll('.reading-card');
        
        readingCards.forEach((card, index) => {
            // 延迟显示动画
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }

    // 添加粒子效果
    addParticleEffects() {
        this.createFloatingParticles();
        this.addScrollParticles();
    }

    // 创建漂浮粒子
    createFloatingParticles() {
        const particleCount = 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            const symbols = ['💫', '✨', '🌟', '💖', '💕'];
            const symbol = symbols[Math.floor(Math.random() * symbols.length)];
            
            particle.innerHTML = symbol;
            particle.style.cssText = `
                position: fixed;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
                font-size: ${Math.random() * 15 + 10}px;
                opacity: ${Math.random() * 0.3 + 0.1};
                pointer-events: none;
                z-index: -1;
                animation: floatParticle ${Math.random() * 20 + 10}s infinite linear;
            `;

            document.body.appendChild(particle);
        }
    }

    // 添加滚动粒子效果
    addScrollParticles() {
        let lastScrollY = window.scrollY;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            const scrollDifference = Math.abs(currentScrollY - lastScrollY);

            if (scrollDifference > 50) {
                this.createScrollParticle();
                lastScrollY = currentScrollY;
            }
        });
    }

    // 创建滚动粒子
    createScrollParticle() {
        const particle = document.createElement('div');
        particle.innerHTML = '💫';
        particle.style.cssText = `
            position: fixed;
            left: ${Math.random() * 100}vw;
            top: 50vh;
            font-size: 20px;
            opacity: 0.6;
            pointer-events: none;
            z-index: 1000;
            animation: scrollParticle 1.5s ease-out forwards;
        `;

        document.body.appendChild(particle);

        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 1500);
    }
}

// CSS动画样式
const animationStyles = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0.8;
            transform: translateY(0) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateY(-20px) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translateY(-40px) scale(0.8);
        }
    }

    @keyframes floatParticle {
        0% {
            transform: translateY(0px) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
        100% {
            transform: translateY(0px) rotate(360deg);
        }
    }

    @keyframes scrollParticle {
        0% {
            opacity: 0.6;
            transform: translateY(0) scale(1);
        }
        50% {
            opacity: 1;
            transform: translateY(-30px) scale(1.3);
        }
        100% {
            opacity: 0;
            transform: translateY(-60px) scale(0.5);
        }
    }

    @keyframes cardPulse {
        0%, 100% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.05);
        }
    }

    /* 卡牌点击效果 */
    .card-clicked {
        animation: cardPulse 0.6s ease-in-out;
    }

    /* 读牌按钮悬停效果 */
    .reading-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(255, 107, 157, 0.4);
    }

    .spread-btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 20px rgba(102, 126, 234, 0.4);
    }
`;

// 添加CSS样式到页面
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = animationStyles;
    document.head.appendChild(style);
}

// 初始化动画系统
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    new CardAnimations();
});

// 导出动画类供其他脚本使用
window.CardAnimations = CardAnimations; 