// Moon Sign Calculator and Lunar Information System
class MoonSignCalculator {
    constructor() {
        this.moonSigns = [
            'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
            'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'
        ];
        this.moonPhases = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 
                          'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
        this.init();
    }

    init() {
        this.updateCurrentMoonInfo();
        this.setupCalculator();
        this.setupRealTimeUpdates();
    }

    // Calculate moon sign based on birth data
    calculateMoonSign(birthDate, birthTime, birthLocation) {
        // Simplified moon sign calculation (in real application, use astronomical libraries)
        const date = new Date(birthDate);
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        
        // Add time adjustment (simplified)
        const timeAdjustment = birthTime ? parseInt(birthTime.split(':')[0]) / 24 : 0;
        
        // Calculate approximate moon position (this is simplified - real calculation requires ephemeris data)
        const moonCycle = 29.53; // days
        const moonPosition = ((dayOfYear + timeAdjustment) % moonCycle) / moonCycle;
        const signIndex = Math.floor(moonPosition * 12);
        
        return this.moonSigns[signIndex];
    }

    // Get current moon phase
    getCurrentMoonPhase() {
        const now = new Date();
        const newMoon = new Date('2024-01-11'); // Reference new moon
        const daysSinceNewMoon = Math.floor((now - newMoon) / (1000 * 60 * 60 * 24));
        const lunarCycle = 29.53;
        const phasePosition = (daysSinceNewMoon % lunarCycle) / lunarCycle;
        const phaseIndex = Math.floor(phasePosition * 8);
        
        return {
            phase: this.moonPhases[phaseIndex],
            illumination: this.calculateIllumination(phasePosition),
            emoji: this.getMoonEmoji(phaseIndex)
        };
    }

    calculateIllumination(phasePosition) {
        // Calculate moon illumination percentage
        const illumination = Math.abs(Math.cos(phasePosition * 2 * Math.PI)) * 100;
        return Math.round(illumination);
    }

    getMoonEmoji(phaseIndex) {
        const moonEmojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
        return moonEmojis[phaseIndex] || '🌙';
    }

    // Get current moon sign
    getCurrentMoonSign() {
        const now = new Date();
        const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const moonSignCycle = 2.5; // Moon changes sign approximately every 2.5 days
        const signIndex = Math.floor((dayOfYear / moonSignCycle) % 12);
        
        return this.moonSigns[signIndex];
    }

    // Get lunar energy description
    getLunarEnergy() {
        const moonPhase = this.getCurrentMoonPhase();
        const moonSign = this.getCurrentMoonSign();
        
        const energyDescriptions = {
            'New Moon': 'New beginnings, setting intentions, planting seeds for the future',
            'Waxing Crescent': 'Growing energy, taking action on goals, building momentum',
            'First Quarter': 'Decision time, overcoming obstacles, pushing through challenges',
            'Waxing Gibbous': 'Refinement, adjustment, fine-tuning your approach',
            'Full Moon': 'Peak energy, manifestation, completion, heightened emotions',
            'Waning Gibbous': 'Gratitude, sharing wisdom, giving back',
            'Last Quarter': 'Release, letting go, forgiveness, clearing space',
            'Waning Crescent': 'Rest, reflection, preparation for new cycle'
        };

        const signEnergies = {
            'Aries': 'Bold, pioneering, assertive energy',
            'Taurus': 'Stable, sensual, grounding energy',
            'Gemini': 'Communicative, curious, adaptable energy',
            'Cancer': 'Nurturing, intuitive, emotional energy',
            'Leo': 'Creative, confident, expressive energy',
            'Virgo': 'Practical, analytical, perfectionist energy',
            'Libra': 'Harmonious, diplomatic, aesthetic energy',
            'Scorpio': 'Intense, transformative, mysterious energy',
            'Sagittarius': 'Adventurous, philosophical, optimistic energy',
            'Capricorn': 'Ambitious, disciplined, structured energy',
            'Aquarius': 'Innovative, humanitarian, unconventional energy',
            'Pisces': 'Intuitive, compassionate, dreamy energy'
        };

        return {
            phase: energyDescriptions[moonPhase.phase],
            sign: signEnergies[moonSign],
            combined: `${moonPhase.phase} in ${moonSign}: ${energyDescriptions[moonPhase.phase]} combined with ${signEnergies[moonSign].toLowerCase()}`
        };
    }

    // Update current moon information on page
    updateCurrentMoonInfo() {
        const moonPhase = this.getCurrentMoonPhase();
        const moonSign = this.getCurrentMoonSign();
        const lunarEnergy = this.getLunarEnergy();

        // Update moon phase display
        const phaseElement = document.querySelector('.current-moon-phase');
        if (phaseElement) {
            phaseElement.innerHTML = `
                <div class="moon-info">
                    <span class="moon-emoji">${moonPhase.emoji}</span>
                    <div class="moon-details">
                        <h3>${moonPhase.phase}</h3>
                        <p>${moonPhase.illumination}% illuminated</p>
                    </div>
                </div>
            `;
        }

        // Update moon sign display
        const signElement = document.querySelector('.moon-in-sign');
        if (signElement) {
            signElement.innerHTML = `
                <div class="sign-info">
                    <h3>Moon in ${moonSign}</h3>
                    <p>${lunarEnergy.sign}</p>
                </div>
            `;
        }

        // Update lunar energy display
        const energyElement = document.querySelector('.lunar-energy');
        if (energyElement) {
            energyElement.innerHTML = `
                <div class="energy-info">
                    <h3>Current Lunar Energy</h3>
                    <p>${lunarEnergy.combined}</p>
                </div>
            `;
        }

        // Update any "Calculating..." placeholders
        document.querySelectorAll('.calculating').forEach(element => {
            element.classList.remove('calculating');
        });
    }

    // Setup calculator form
    setupCalculator() {
        const calculateBtn = document.querySelector('.calculate-moon-sign');
        if (calculateBtn) {
            calculateBtn.addEventListener('click', () => {
                this.handleCalculation();
            });
        }

        const form = document.querySelector('.moon-calculator-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleCalculation();
            });
        }
    }

    handleCalculation() {
        const birthDate = document.querySelector('#birthDate')?.value;
        const birthTime = document.querySelector('#birthTime')?.value;
        const birthLocation = document.querySelector('#birthLocation')?.value;

        if (!birthDate) {
            this.showError('Please enter your birth date');
            return;
        }

        const moonSign = this.calculateMoonSign(birthDate, birthTime, birthLocation);
        const interpretation = this.getMoonSignInterpretation(moonSign);
        
        this.displayResults(moonSign, interpretation);
    }

    getMoonSignInterpretation(moonSign) {
        const interpretations = {
            'Aries': {
                traits: 'Impulsive, passionate, quick to react emotionally',
                needs: 'Freedom, excitement, independence in emotional expression',
                challenges: 'Impatience, anger management, need for instant gratification'
            },
            'Taurus': {
                traits: 'Steady, comfort-seeking, emotionally stable',
                needs: 'Security, physical comfort, routine and predictability',
                challenges: 'Stubbornness, resistance to emotional change'
            },
            'Gemini': {
                traits: 'Curious, communicative, emotionally adaptable',
                needs: 'Mental stimulation, variety, social connection',
                challenges: 'Emotional inconsistency, tendency to overthink feelings'
            },
            'Cancer': {
                traits: 'Nurturing, intuitive, deeply emotional',
                needs: 'Home, family, emotional security and belonging',
                challenges: 'Moodiness, oversensitivity, clinging to the past'
            },
            'Leo': {
                traits: 'Dramatic, generous, needs emotional recognition',
                needs: 'Appreciation, creative expression, being center of attention',
                challenges: 'Pride, need for constant validation, emotional drama'
            },
            'Virgo': {
                traits: 'Practical, analytical, emotionally reserved',
                needs: 'Order, usefulness, helping others improve',
                challenges: 'Criticism, perfectionism, worry and anxiety'
            },
            'Libra': {
                traits: 'Diplomatic, harmony-seeking, emotionally balanced',
                needs: 'Peace, beauty, partnership and cooperation',
                challenges: 'Indecisiveness, people-pleasing, avoiding conflict'
            },
            'Scorpio': {
                traits: 'Intense, mysterious, emotionally transformative',
                needs: 'Deep connections, privacy, emotional authenticity',
                challenges: 'Jealousy, possessiveness, emotional extremes'
            },
            'Sagittarius': {
                traits: 'Optimistic, adventurous, emotionally free',
                needs: 'Freedom, adventure, philosophical understanding',
                challenges: 'Restlessness, avoiding emotional depth, commitment issues'
            },
            'Capricorn': {
                traits: 'Responsible, disciplined, emotionally controlled',
                needs: 'Achievement, structure, respect and recognition',
                challenges: 'Emotional coldness, pessimism, workaholic tendencies'
            },
            'Aquarius': {
                traits: 'Independent, humanitarian, emotionally detached',
                needs: 'Freedom, friendship, intellectual stimulation',
                challenges: 'Emotional aloofness, rebelliousness, difficulty with intimacy'
            },
            'Pisces': {
                traits: 'Compassionate, intuitive, emotionally sensitive',
                needs: 'Spirituality, creativity, emotional connection',
                challenges: 'Escapism, emotional overwhelm, boundary issues'
            }
        };

        return interpretations[moonSign] || interpretations['Cancer'];
    }

    displayResults(moonSign, interpretation) {
        const resultsContainer = document.querySelector('#moon-sign-result');
        if (resultsContainer) {
            resultsContainer.innerHTML = `
                <div class="moon-sign-result" style="
                    background: linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(240, 248, 255, 0.95) 100%);
                    border: 2px solid #4682b4;
                    border-radius: 25px;
                    padding: 3rem;
                    margin: 3rem auto;
                    max-width: 900px;
                    box-shadow: 0 15px 40px rgba(70, 130, 180, 0.2), 0 8px 20px rgba(0, 0, 0, 0.1);
                    backdrop-filter: blur(15px);
                ">
                    <h3 style="color: #2c3e50; font-size: 2.2rem; text-align: center; margin-bottom: 2rem; font-weight: 600;">Your Moon Sign: ${moonSign}</h3>
                    
                    <div class="interpretation-section" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(70, 130, 180, 0.1); border-radius: 15px;">
                        <h4 style="color: #2c3e50; font-size: 1.4rem; margin-bottom: 1rem; font-weight: 600;">Emotional Nature</h4>
                        <p style="color: #34495e; line-height: 1.6; font-size: 1.1rem;">${interpretation.traits}</p>
                    </div>
                    
                    <div class="interpretation-section" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(70, 130, 180, 0.1); border-radius: 15px;">
                        <h4 style="color: #2c3e50; font-size: 1.4rem; margin-bottom: 1rem; font-weight: 600;">Emotional Needs</h4>
                        <p style="color: #34495e; line-height: 1.6; font-size: 1.1rem;">${interpretation.needs}</p>
                    </div>
                    
                    <div class="interpretation-section" style="margin-bottom: 2rem; padding: 1.5rem; background: rgba(70, 130, 180, 0.1); border-radius: 15px;">
                        <h4 style="color: #2c3e50; font-size: 1.4rem; margin-bottom: 1rem; font-weight: 600;">Potential Challenges</h4>
                        <p style="color: #34495e; line-height: 1.6; font-size: 1.1rem;">${interpretation.challenges}</p>
                    </div>
                    
                    <div class="moon-sign-compatibility" style="padding: 1.5rem; background: rgba(70, 130, 180, 0.1); border-radius: 15px;">
                        <h4 style="color: #2c3e50; font-size: 1.4rem; margin-bottom: 1rem; font-weight: 600;">Compatible Moon Signs</h4>
                        <p style="color: #34495e; line-height: 1.6; font-size: 1.1rem;">${this.getCompatibleSigns(moonSign).join(', ')}</p>
                    </div>
                </div>
            `;
            resultsContainer.classList.remove('hidden');
            resultsContainer.style.display = 'block';
        }
    }

    getCompatibleSigns(moonSign) {
        const compatibility = {
            'Aries': ['Leo', 'Sagittarius', 'Gemini', 'Aquarius'],
            'Taurus': ['Virgo', 'Capricorn', 'Cancer', 'Pisces'],
            'Gemini': ['Libra', 'Aquarius', 'Aries', 'Leo'],
            'Cancer': ['Scorpio', 'Pisces', 'Taurus', 'Virgo'],
            'Leo': ['Aries', 'Sagittarius', 'Gemini', 'Libra'],
            'Virgo': ['Taurus', 'Capricorn', 'Cancer', 'Scorpio'],
            'Libra': ['Gemini', 'Aquarius', 'Leo', 'Sagittarius'],
            'Scorpio': ['Cancer', 'Pisces', 'Virgo', 'Capricorn'],
            'Sagittarius': ['Aries', 'Leo', 'Libra', 'Aquarius'],
            'Capricorn': ['Taurus', 'Virgo', 'Scorpio', 'Pisces'],
            'Aquarius': ['Gemini', 'Libra', 'Sagittarius', 'Aries'],
            'Pisces': ['Cancer', 'Scorpio', 'Capricorn', 'Taurus']
        };
        return compatibility[moonSign] || [];
    }

    showError(message) {
        const errorElement = document.querySelector('.error-message') || this.createErrorElement();
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }

    createErrorElement() {
        const errorElement = document.createElement('div');
        errorElement.className = 'error-message';
        errorElement.style.cssText = `
            color: #e74c3c;
            background: #fee;
            padding: 10px;
            border-radius: 4px;
            margin: 10px 0;
            border: 1px solid #e74c3c;
        `;
        
        const form = document.querySelector('.moon-calculator-form');
        if (form) {
            form.appendChild(errorElement);
        }
        
        return errorElement;
    }

    // Setup real-time updates
    setupRealTimeUpdates() {
        // Update moon info every hour
        setInterval(() => {
            this.updateCurrentMoonInfo();
        }, 60 * 60 * 1000);

        // Update illumination every 15 minutes for more accurate display
        setInterval(() => {
            const moonPhase = this.getCurrentMoonPhase();
            const phaseElement = document.querySelector('.moon-info p');
            if (phaseElement) {
                phaseElement.textContent = `${moonPhase.illumination}% illuminated`;
            }
        }, 15 * 60 * 1000);
    }

    // Moon calendar functionality
    generateMoonCalendar(month, year) {
        const calendar = [];
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            const moonPhase = this.getMoonPhaseForDate(date);
            calendar.push({
                date: day,
                phase: moonPhase.phase,
                emoji: moonPhase.emoji
            });
        }
        
        return calendar;
    }

    getMoonPhaseForDate(date) {
        const newMoon = new Date('2024-01-11');
        const daysSinceNewMoon = Math.floor((date - newMoon) / (1000 * 60 * 60 * 24));
        const lunarCycle = 29.53;
        const phasePosition = (daysSinceNewMoon % lunarCycle) / lunarCycle;
        const phaseIndex = Math.floor(phasePosition * 8);
        
        return {
            phase: this.moonPhases[phaseIndex],
            emoji: this.getMoonEmoji(phaseIndex)
        };
    }
}

// Utility functions for moon calculations
function formatMoonData(data) {
    return {
        phase: data.phase || 'Unknown',
        sign: data.sign || 'Unknown',
        illumination: data.illumination || 0,
        nextPhase: data.nextPhase || 'Unknown'
    };
}

function getMoonSignElement(sign) {
    const elements = {
        'Aries': 'Fire', 'Leo': 'Fire', 'Sagittarius': 'Fire',
        'Taurus': 'Earth', 'Virgo': 'Earth', 'Capricorn': 'Earth',
        'Gemini': 'Air', 'Libra': 'Air', 'Aquarius': 'Air',
        'Cancer': 'Water', 'Scorpio': 'Water', 'Pisces': 'Water'
    };
    return elements[sign] || 'Unknown';
}

function getMoonSignQuality(sign) {
    const qualities = {
        'Aries': 'Cardinal', 'Cancer': 'Cardinal', 'Libra': 'Cardinal', 'Capricorn': 'Cardinal',
        'Taurus': 'Fixed', 'Leo': 'Fixed', 'Scorpio': 'Fixed', 'Aquarius': 'Fixed',
        'Gemini': 'Mutable', 'Virgo': 'Mutable', 'Sagittarius': 'Mutable', 'Pisces': 'Mutable'
    };
    return qualities[sign] || 'Unknown';
}

// Global function for onclick compatibility
function calculateMoonSign() {
    if (!window.moonCalculator) {
        window.moonCalculator = new MoonSignCalculator();
    }
    window.moonCalculator.handleCalculation();
}

// Initialize the moon calculator when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.moon-calculator') || document.querySelector('.lunar-info')) {
        window.moonCalculator = new MoonSignCalculator();
        
        // Add some loading animation removal after initialization
        setTimeout(() => {
            document.querySelectorAll('.loading').forEach(element => {
                element.classList.remove('loading');
            });
        }, 1000);
    }
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MoonSignCalculator };
} 