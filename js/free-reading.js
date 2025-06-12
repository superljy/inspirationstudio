// Free Astrology Reading Generator
class FreeReadingGenerator {
    constructor() {
        this.cosmicData = window.cosmicData || this.getBasicCosmicData();
        this.init();
    }

    init() {
        this.setupFormValidation();
        this.initializeCosmicInfo();
    }

    getBasicCosmicData() {
        return {
            zodiacSigns: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'],
            planets: ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto'],
            elements: {
                'Fire': ['Aries', 'Leo', 'Sagittarius'],
                'Earth': ['Taurus', 'Virgo', 'Capricorn'],
                'Air': ['Gemini', 'Libra', 'Aquarius'],
                'Water': ['Cancer', 'Scorpio', 'Pisces']
            }
        };
    }

    setupFormValidation() {
        const form = document.querySelector('.free-reading-form');
        if (!form) return;

        const inputs = form.querySelectorAll('input[required], select[required]');
        inputs.forEach(input => {
            input.addEventListener('blur', () => this.validateField(input));
            input.addEventListener('input', () => this.clearFieldError(input));
        });
    }

    validateField(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }

        if (!field.value.trim()) {
            this.showFieldError(field, 'This field is required');
            return false;
        }

        if (field.type === 'date') {
            const date = new Date(field.value);
            const now = new Date();
            if (date > now) {
                this.showFieldError(field, 'Birth date cannot be in the future');
                return false;
            }
        }

        if (field.type === 'text' && field.id === 'birthLocation') {
            if (field.value.length < 3) {
                this.showFieldError(field, 'Please enter a valid location');
                return false;
            }
        }

        return true;
    }

    showFieldError(field, message) {
        const errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        errorElement.textContent = message;
        errorElement.style.cssText = `
            color: #e74c3c;
            font-size: 0.8rem;
            margin-top: 0.5rem;
        `;
        field.parentNode.appendChild(errorElement);
    }

    clearFieldError(field) {
        const errorElement = field.parentNode.querySelector('.field-error');
        if (errorElement) {
            errorElement.remove();
        }
    }

    calculateZodiacSign(birthDate) {
        const date = new Date(birthDate);
        const month = date.getMonth() + 1;
        const day = date.getDate();

        const zodiacDates = [
            { sign: 'Capricorn', start: [12, 22], end: [1, 19] },
            { sign: 'Aquarius', start: [1, 20], end: [2, 18] },
            { sign: 'Pisces', start: [2, 19], end: [3, 20] },
            { sign: 'Aries', start: [3, 21], end: [4, 19] },
            { sign: 'Taurus', start: [4, 20], end: [5, 20] },
            { sign: 'Gemini', start: [5, 21], end: [6, 21] },
            { sign: 'Cancer', start: [6, 22], end: [7, 22] },
            { sign: 'Leo', start: [7, 23], end: [8, 22] },
            { sign: 'Virgo', start: [8, 23], end: [9, 22] },
            { sign: 'Libra', start: [9, 23], end: [10, 23] },
            { sign: 'Scorpio', start: [10, 24], end: [11, 22] },
            { sign: 'Sagittarius', start: [11, 23], end: [12, 21] }
        ];

        for (const zodiac of zodiacDates) {
            const [startMonth, startDay] = zodiac.start;
            const [endMonth, endDay] = zodiac.end;

            if (
                (month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay) ||
                (startMonth > endMonth && (month === startMonth || month === endMonth))
            ) {
                return zodiac.sign;
            }
        }

        return 'Capricorn'; // Default fallback
    }

    generatePersonalityReading(sign, focus) {
        const personalities = {
            'Aries': {
                traits: 'Bold, energetic, and pioneering',
                strengths: 'Natural leadership, courage, determination',
                challenges: 'Impatience, impulsiveness, tendency to rush',
                element: 'Fire',
                quality: 'Cardinal'
            },
            'Taurus': {
                traits: 'Practical, reliable, and sensual',
                strengths: 'Stability, persistence, appreciation for beauty',
                challenges: 'Stubbornness, resistance to change, materialism',
                element: 'Earth',
                quality: 'Fixed'
            },
            'Gemini': {
                traits: 'Curious, adaptable, and communicative',
                strengths: 'Versatility, quick thinking, social skills',
                challenges: 'Inconsistency, superficiality, restlessness',
                element: 'Air',
                quality: 'Mutable'
            },
            'Cancer': {
                traits: 'Nurturing, intuitive, and protective',
                strengths: 'Emotional intelligence, loyalty, caring nature',
                challenges: 'Mood swings, over-sensitivity, clinging',
                element: 'Water',
                quality: 'Cardinal'
            },
            'Leo': {
                traits: 'Confident, creative, and generous',
                strengths: 'Charisma, creativity, warm-heartedness',
                challenges: 'Pride, need for attention, drama',
                element: 'Fire',
                quality: 'Fixed'
            },
            'Virgo': {
                traits: 'Analytical, helpful, and detail-oriented',
                strengths: 'Organization, service, perfectionism',
                challenges: 'Over-criticism, worry, nitpicking',
                element: 'Earth',
                quality: 'Mutable'
            },
            'Libra': {
                traits: 'Balanced, diplomatic, and artistic',
                strengths: 'Harmony, fairness, aesthetic sense',
                challenges: 'Indecision, people-pleasing, avoidance',
                element: 'Air',
                quality: 'Cardinal'
            },
            'Scorpio': {
                traits: 'Intense, passionate, and mysterious',
                strengths: 'Depth, transformation, intuition',
                challenges: 'Jealousy, secrecy, vindictiveness',
                element: 'Water',
                quality: 'Fixed'
            },
            'Sagittarius': {
                traits: 'Adventurous, philosophical, and optimistic',
                strengths: 'Freedom, wisdom, enthusiasm',
                challenges: 'Tactlessness, restlessness, over-confidence',
                element: 'Fire',
                quality: 'Mutable'
            },
            'Capricorn': {
                traits: 'Ambitious, disciplined, and practical',
                strengths: 'Achievement, responsibility, perseverance',
                challenges: 'Pessimism, coldness, workaholism',
                element: 'Earth',
                quality: 'Cardinal'
            },
            'Aquarius': {
                traits: 'Independent, innovative, and humanitarian',
                strengths: 'Originality, friendship, vision',
                challenges: 'Detachment, rebelliousness, aloofness',
                element: 'Air',
                quality: 'Fixed'
            },
            'Pisces': {
                traits: 'Compassionate, artistic, and intuitive',
                strengths: 'Empathy, creativity, spirituality',
                challenges: 'Escapism, confusion, victim mentality',
                element: 'Water',
                quality: 'Mutable'
            }
        };

        return personalities[sign] || personalities['Aries'];
    }

    generateFocusedReading(sign, focus) {
        const focusReadings = {
            'love': {
                'Aries': 'In love, you are passionate and direct. You seek excitement and adventure in relationships.',
                'Taurus': 'You approach love with loyalty and sensuality. Stability and comfort are important to you.',
                'Gemini': 'Communication and mental connection are key in your relationships. You need variety and stimulation.',
                'Cancer': 'You are nurturing and protective in love. Emotional security is your priority.',
                'Leo': 'You love with your whole heart and seek appreciation and admiration from partners.',
                'Virgo': 'You show love through service and attention to detail. You seek perfection in relationships.',
                'Libra': 'Harmony and balance are essential in your relationships. You are a natural romantic.',
                'Scorpio': 'You love intensely and seek deep, transformative connections with others.',
                'Sagittarius': 'Freedom and growth are important in your relationships. You need intellectual stimulation.',
                'Capricorn': 'You approach love seriously and seek long-term, committed partnerships.',
                'Aquarius': 'Friendship and independence are important in your relationships. You value uniqueness.',
                'Pisces': 'You love unconditionally and seek spiritual and emotional connections.'
            },
            'career': {
                'Aries': 'You excel in leadership roles and competitive environments. Consider careers in entrepreneurship or sports.',
                'Taurus': 'You thrive in stable, practical careers. Consider finance, real estate, or artistic fields.',
                'Gemini': 'Communication and variety are key to your career success. Consider media, education, or sales.',
                'Cancer': 'Nurturing careers suit you well. Consider healthcare, hospitality, or family-oriented businesses.',
                'Leo': 'Creative and leadership roles are perfect for you. Consider entertainment, management, or teaching.',
                'Virgo': 'Detail-oriented and service-based careers align with your nature. Consider healthcare or analysis.',
                'Libra': 'Diplomatic and aesthetic careers suit you. Consider law, design, or human resources.',
                'Scorpio': 'Investigative and transformative careers appeal to you. Consider psychology or research.',
                'Sagittarius': 'Adventure and learning-based careers suit you. Consider travel, education, or publishing.',
                'Capricorn': 'Structured and achievement-oriented careers are ideal. Consider business or government.',
                'Aquarius': 'Innovative and humanitarian careers appeal to you. Consider technology or social causes.',
                'Pisces': 'Creative and healing careers suit your nature. Consider arts, therapy, or spirituality.'
            }
        };

        const defaultReading = `As a ${sign}, you have unique qualities that influence your approach to ${focus}. Your natural tendencies guide you toward experiences that align with your core nature.`;
        
        return focusReadings[focus] && focusReadings[focus][sign] || defaultReading;
    }

    getCurrentCosmicInfluences() {
        const today = new Date();
        const influences = [
            'Mercury is enhancing communication and learning opportunities',
            'Venus is bringing harmony to relationships and creative endeavors',
            'Mars is providing energy and motivation for new projects',
            'Jupiter is expanding your horizons and bringing optimism',
            'The current lunar phase supports introspection and growth'
        ];

        return influences[today.getDate() % influences.length];
    }

    generateReading(formData) {
        const { fullName, birthDate, birthTime, birthLocation, readingFocus } = formData;
        const sunSign = this.calculateZodiacSign(birthDate);
        const personality = this.generatePersonalityReading(sunSign, readingFocus);
        const focusedReading = this.generateFocusedReading(sunSign, readingFocus);
        const cosmicInfluence = this.getCurrentCosmicInfluences();

        return {
            name: fullName,
            sunSign: sunSign,
            personality: personality,
            focusReading: focusedReading,
            cosmicInfluence: cosmicInfluence,
            birthInfo: {
                date: birthDate,
                time: birthTime,
                location: birthLocation
            }
        };
    }

    displayReading(reading) {
        const resultContainer = document.getElementById('free-reading-result');
        if (!resultContainer) return;

        const readingHTML = `
            <div class="reading-result">
                <div class="reading-header">
                    <h3>🌟 Your Free Astrology Reading</h3>
                    <p class="reading-name">For ${reading.name}</p>
                    <div class="sun-sign-display">
                        <span class="sun-sign-label">Your Sun Sign:</span>
                        <span class="sun-sign-value">${reading.sunSign}</span>
                    </div>
                </div>

                <div class="reading-sections">
                    <div class="reading-section">
                        <h4>🧭 Personality Profile</h4>
                        <div class="personality-overview">
                            <p><strong>Core Traits:</strong> ${reading.personality.traits}</p>
                            <p><strong>Natural Strengths:</strong> ${reading.personality.strengths}</p>
                            <p><strong>Growth Areas:</strong> ${reading.personality.challenges}</p>
                            <p><strong>Element:</strong> ${reading.personality.element} | <strong>Quality:</strong> ${reading.personality.quality}</p>
                        </div>
                    </div>

                    <div class="reading-section">
                        <h4>🎯 Focused Insights</h4>
                        <p>${reading.focusReading}</p>
                    </div>

                    <div class="reading-section">
                        <h4>✨ Current Cosmic Influences</h4>
                        <p>${reading.cosmicInfluence}</p>
                    </div>

                    <div class="reading-section">
                        <h4>🔮 Guidance for You</h4>
                        <div class="guidance-points">
                            <p>🌱 <strong>Growth Opportunity:</strong> Embrace your ${reading.personality.element} nature while working on ${reading.personality.challenges.toLowerCase()}.</p>
                            <p>💫 <strong>Today's Advice:</strong> Focus on leveraging your natural ${reading.personality.strengths.toLowerCase()} to overcome current challenges.</p>
                            <p>🌟 <strong>Life Path:</strong> Your ${reading.sunSign} energy guides you toward experiences that honor your authentic self.</p>
                        </div>
                    </div>
                </div>

                <div class="reading-footer">
                    <p class="reading-disclaimer">This reading is based on your sun sign and current cosmic influences. For a complete astrological analysis, consider getting a full birth chart reading.</p>
                    <div class="next-steps">
                        <a href="birth-chart-reading.html" class="next-step-link">📊 Get Full Birth Chart</a>
                        <a href="zodiac-compatibility.html" class="next-step-link">💕 Check Compatibility</a>
                    </div>
                </div>
            </div>
        `;

        resultContainer.innerHTML = readingHTML;
        resultContainer.classList.remove('hidden');
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    initializeCosmicInfo() {
        // Add some cosmic ambiance to the page
        const header = document.querySelector('.page-header');
        if (header && !header.querySelector('.cosmic-animation')) {
            const cosmicElement = document.createElement('div');
            cosmicElement.className = 'cosmic-animation';
            cosmicElement.innerHTML = '✨ 🌟 ⭐ 💫 🌙';
            cosmicElement.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                opacity: 0.3;
                font-size: 2rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                animation: twinkle 3s ease-in-out infinite alternate;
            `;
            header.style.position = 'relative';
            header.appendChild(cosmicElement);
        }
    }
}

// Main function called by the form button
function generateFreeReading() {
    const generator = window.freeReadingGenerator || new FreeReadingGenerator();
    
    // Get form data
    const formData = {
        fullName: document.getElementById('fullName')?.value,
        birthDate: document.getElementById('birthDate')?.value,
        birthTime: document.getElementById('birthTime')?.value,
        birthLocation: document.getElementById('birthLocation')?.value,
        readingFocus: document.getElementById('readingFocus')?.value
    };

    // Validate required fields
    if (!formData.fullName || !formData.birthDate || !formData.birthLocation || !formData.readingFocus) {
        alert('Please fill in all required fields to generate your reading.');
        return;
    }

    // Generate and display reading
    try {
        const reading = generator.generateReading(formData);
        generator.displayReading(reading);
    } catch (error) {
        console.error('Error generating reading:', error);
        alert('Sorry, there was an error generating your reading. Please try again.');
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.free-reading-form')) {
        window.freeReadingGenerator = new FreeReadingGenerator();
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FreeReadingGenerator };
} 