// Astrology Guide and Learning Platform JavaScript
class AstrologyGuide {
    constructor() {
        this.currentModule = 1;
        this.totalModules = 12;
        this.progress = this.loadProgress();
        this.init();
    }

    init() {
        this.setupProgressTracking();
        this.setupQuizzes();
        this.setupInteractiveElements();
        this.updateProgress();
    }

    // Progress tracking system
    setupProgressTracking() {
        const moduleCards = document.querySelectorAll('.learning-step');
        moduleCards.forEach((card, index) => {
            card.addEventListener('click', () => {
                this.markModuleComplete(index + 1);
                this.updateProgress();
            });
        });
    }

    markModuleComplete(moduleNumber) {
        if (!this.progress.completedModules.includes(moduleNumber)) {
            this.progress.completedModules.push(moduleNumber);
            this.saveProgress();
            this.showCompletionMessage(moduleNumber);
        }
    }

    showCompletionMessage(moduleNumber) {
        const message = document.createElement('div');
        message.className = 'completion-message';
        message.innerHTML = `
            <div class="message-content">
                <span class="completion-icon">✨</span>
                <p>Great! You've completed Module ${moduleNumber}</p>
            </div>
        `;
        document.body.appendChild(message);
        
        setTimeout(() => {
            message.remove();
        }, 3000);
    }

    updateProgress() {
        const progressBars = document.querySelectorAll('.progress-bar');
        const completedCount = this.progress.completedModules.length;
        const percentage = (completedCount / this.totalModules) * 100;
        
        progressBars.forEach(bar => {
            bar.style.width = `${percentage}%`;
        });

        // Update progress text
        const progressTexts = document.querySelectorAll('.progress-text');
        progressTexts.forEach(text => {
            text.textContent = `${completedCount}/${this.totalModules} modules completed`;
        });
    }

    // Quiz system
    setupQuizzes() {
        const quizButtons = document.querySelectorAll('.quiz-btn');
        quizButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const moduleId = e.target.dataset.module;
                this.showQuiz(moduleId);
            });
        });
    }

    showQuiz(moduleId) {
        const quizData = this.getQuizData(moduleId);
        const quizModal = this.createQuizModal(quizData);
        document.body.appendChild(quizModal);
    }

    getQuizData(moduleId) {
        const quizzes = {
            'basics': {
                title: 'Astrology Basics Quiz',
                questions: [
                    {
                        question: 'How many zodiac signs are there?',
                        options: ['10', '12', '13', '14'],
                        correct: 1
                    },
                    {
                        question: 'Which planet rules communication?',
                        options: ['Venus', 'Mars', 'Mercury', 'Jupiter'],
                        correct: 2
                    }
                ]
            },
            'signs': {
                title: 'Zodiac Signs Quiz',
                questions: [
                    {
                        question: 'Which element does Aries belong to?',
                        options: ['Earth', 'Fire', 'Air', 'Water'],
                        correct: 1
                    },
                    {
                        question: 'What quality is associated with Taurus?',
                        options: ['Cardinal', 'Fixed', 'Mutable', 'Variable'],
                        correct: 1
                    }
                ]
            }
        };
        return quizzes[moduleId] || quizzes['basics'];
    }

    createQuizModal(quizData) {
        const modal = document.createElement('div');
        modal.className = 'quiz-modal';
        modal.innerHTML = `
            <div class="quiz-content">
                <div class="quiz-header">
                    <h3>${quizData.title}</h3>
                    <button class="close-quiz">×</button>
                </div>
                <div class="quiz-body">
                    ${quizData.questions.map((q, index) => `
                        <div class="question-container">
                            <h4>Question ${index + 1}: ${q.question}</h4>
                            <div class="options">
                                ${q.options.map((option, optIndex) => `
                                    <label class="option">
                                        <input type="radio" name="q${index}" value="${optIndex}">
                                        <span>${option}</span>
                                    </label>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="quiz-footer">
                    <button class="submit-quiz">Submit Quiz</button>
                </div>
            </div>
        `;

        // Add event listeners
        modal.querySelector('.close-quiz').addEventListener('click', () => {
            modal.remove();
        });

        modal.querySelector('.submit-quiz').addEventListener('click', () => {
            this.checkQuizAnswers(modal, quizData);
        });

        return modal;
    }

    checkQuizAnswers(modal, quizData) {
        let correctAnswers = 0;
        const questions = modal.querySelectorAll('.question-container');
        
        questions.forEach((question, index) => {
            const selectedOption = question.querySelector('input[type="radio"]:checked');
            if (selectedOption && parseInt(selectedOption.value) === quizData.questions[index].correct) {
                correctAnswers++;
                question.classList.add('correct');
            } else {
                question.classList.add('incorrect');
            }
        });

        const score = (correctAnswers / quizData.questions.length) * 100;
        const resultMessage = score >= 70 ? 'Great job!' : 'Keep studying!';
        
        modal.querySelector('.quiz-footer').innerHTML = `
            <div class="quiz-results">
                <h4>${resultMessage}</h4>
                <p>Score: ${score.toFixed(0)}% (${correctAnswers}/${quizData.questions.length})</p>
                <button class="close-quiz">Close</button>
            </div>
        `;

        modal.querySelector('.close-quiz').addEventListener('click', () => {
            modal.remove();
        });
    }

    // Interactive elements
    setupInteractiveElements() {
        // Zodiac sign hover effects
        const zodiacCards = document.querySelectorAll('.zodiac-card');
        zodiacCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.showZodiacInfo(card);
            });
        });

        // Planet exploration
        const planetCards = document.querySelectorAll('.planet-card');
        planetCards.forEach(card => {
            card.addEventListener('click', () => {
                this.showPlanetDetails(card);
            });
        });
    }

    showZodiacInfo(card) {
        const sign = card.dataset.sign;
        const info = this.getZodiacInfo(sign);
        
        const tooltip = document.createElement('div');
        tooltip.className = 'zodiac-tooltip';
        tooltip.innerHTML = `
            <h4>${info.name}</h4>
            <p><strong>Element:</strong> ${info.element}</p>
            <p><strong>Quality:</strong> ${info.quality}</p>
            <p><strong>Ruling Planet:</strong> ${info.ruler}</p>
        `;
        
        card.appendChild(tooltip);
        
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 3000);
    }

    getZodiacInfo(sign) {
        const zodiacData = {
            'aries': { name: 'Aries', element: 'Fire', quality: 'Cardinal', ruler: 'Mars' },
            'taurus': { name: 'Taurus', element: 'Earth', quality: 'Fixed', ruler: 'Venus' },
            'gemini': { name: 'Gemini', element: 'Air', quality: 'Mutable', ruler: 'Mercury' },
            'cancer': { name: 'Cancer', element: 'Water', quality: 'Cardinal', ruler: 'Moon' },
            'leo': { name: 'Leo', element: 'Fire', quality: 'Fixed', ruler: 'Sun' },
            'virgo': { name: 'Virgo', element: 'Earth', quality: 'Mutable', ruler: 'Mercury' },
            'libra': { name: 'Libra', element: 'Air', quality: 'Cardinal', ruler: 'Venus' },
            'scorpio': { name: 'Scorpio', element: 'Water', quality: 'Fixed', ruler: 'Pluto' },
            'sagittarius': { name: 'Sagittarius', element: 'Fire', quality: 'Mutable', ruler: 'Jupiter' },
            'capricorn': { name: 'Capricorn', element: 'Earth', quality: 'Cardinal', ruler: 'Saturn' },
            'aquarius': { name: 'Aquarius', element: 'Air', quality: 'Fixed', ruler: 'Uranus' },
            'pisces': { name: 'Pisces', element: 'Water', quality: 'Mutable', ruler: 'Neptune' }
        };
        return zodiacData[sign] || { name: 'Unknown', element: 'Unknown', quality: 'Unknown', ruler: 'Unknown' };
    }

    // Progress persistence
    loadProgress() {
        const saved = localStorage.getItem('astrologyProgress');
        return saved ? JSON.parse(saved) : { completedModules: [], currentLevel: 1 };
    }

    saveProgress() {
        localStorage.setItem('astrologyProgress', JSON.stringify(this.progress));
    }

    // Study time tracking
    startStudySession() {
        this.studyStartTime = Date.now();
    }

    endStudySession() {
        if (this.studyStartTime) {
            const duration = Date.now() - this.studyStartTime;
            const totalStudyTime = localStorage.getItem('totalStudyTime') || 0;
            localStorage.setItem('totalStudyTime', parseInt(totalStudyTime) + duration);
        }
    }

    getStudyStats() {
        const totalTime = localStorage.getItem('totalStudyTime') || 0;
        const completedModules = this.progress.completedModules.length;
        const hours = Math.floor(totalTime / (1000 * 60 * 60));
        const minutes = Math.floor((totalTime % (1000 * 60 * 60)) / (1000 * 60));
        
        return {
            totalTime: `${hours}h ${minutes}m`,
            completedModules,
            completionRate: Math.round((completedModules / this.totalModules) * 100)
        };
    }
}

// Utility functions for the learning platform
function scrollToModule(moduleNumber) {
    const module = document.getElementById(`module-${moduleNumber}`);
    if (module) {
        module.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

function toggleModuleContent(moduleElement) {
    const content = moduleElement.querySelector('.module-content');
    const isExpanded = content.style.display === 'block';
    
    content.style.display = isExpanded ? 'none' : 'block';
    moduleElement.classList.toggle('expanded', !isExpanded);
}

function showElementalGuide() {
    const elements = {
        fire: { signs: ['Aries', 'Leo', 'Sagittarius'], traits: ['Passionate', 'Energetic', 'Spontaneous'] },
        earth: { signs: ['Taurus', 'Virgo', 'Capricorn'], traits: ['Practical', 'Stable', 'Grounded'] },
        air: { signs: ['Gemini', 'Libra', 'Aquarius'], traits: ['Intellectual', 'Social', 'Communicative'] },
        water: { signs: ['Cancer', 'Scorpio', 'Pisces'], traits: ['Emotional', 'Intuitive', 'Sensitive'] }
    };
    
    console.log('Elemental Guide:', elements);
    // This could be expanded to show a modal or dedicated page
}

// Initialize the learning platform
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.learning-path')) {
        window.astrologyGuide = new AstrologyGuide();
        
        // Start study session tracking
        window.astrologyGuide.startStudySession();
        
        // End session when user leaves
        window.addEventListener('beforeunload', () => {
            window.astrologyGuide.endStudySession();
        });
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { AstrologyGuide };
} 