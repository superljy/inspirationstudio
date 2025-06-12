// Zodiac Compatibility Analysis System
// Real-time planetary calculations and compatibility analysis

// Real-time planetary position calculations
function getCurrentPlanetaryPositions() {
    const now = new Date();
    const julianDay = getJulianDay(now);
    
    // Simplified planetary position calculations
    const venusPosition = calculateVenusPosition(julianDay);
    const marsPosition = calculateMarsPosition(julianDay);
    const loveEnergy = calculateLoveEnergy(venusPosition, marsPosition);
    
    return {
        venus: venusPosition,
        mars: marsPosition,
        loveEnergy: loveEnergy
    };
}

function getJulianDay(date) {
    const a = Math.floor((14 - (date.getMonth() + 1)) / 12);
    const y = date.getFullYear() + 4800 - a;
    const m = (date.getMonth() + 1) + 12 * a - 3;
    
    return date.getDate() + Math.floor((153 * m + 2) / 5) + 365 * y + 
           Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function calculateVenusPosition(julianDay) {
    // Venus orbital calculation (simplified)
    const meanAnomaly = (julianDay - 2451545.0) * 0.01720209895;
    const venusLongitude = (meanAnomaly * 1.6021687) % (2 * Math.PI);
    const venusSign = getZodiacSign(venusLongitude);
    
    return {
        sign: venusSign,
        degrees: Math.floor((venusLongitude * 180 / Math.PI) % 30)
    };
}

function calculateMarsPosition(julianDay) {
    // Mars orbital calculation (simplified)
    const meanAnomaly = (julianDay - 2451545.0) * 0.01720209895;
    const marsLongitude = (meanAnomaly * 0.5240613) % (2 * Math.PI);
    const marsSign = getZodiacSign(marsLongitude);
    
    return {
        sign: marsSign,
        degrees: Math.floor((marsLongitude * 180 / Math.PI) % 30)
    };
}

function getZodiacSign(longitude) {
    const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                   'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
    const signIndex = Math.floor((longitude * 180 / Math.PI) / 30) % 12;
    return signs[signIndex];
}

function calculateLoveEnergy(venus, mars) {
    const venusEnergy = getSignEnergy(venus.sign);
    const marsEnergy = getSignEnergy(mars.sign);
    
    const combinedEnergy = (venusEnergy + marsEnergy) / 2;
    
    if (combinedEnergy >= 8) return "🔥 Intense Passion";
    if (combinedEnergy >= 6) return "💖 Strong Attraction";
    if (combinedEnergy >= 4) return "💕 Gentle Romance";
    return "🌸 Subtle Harmony";
}

function getSignEnergy(sign) {
    const energyLevels = {
        'Aries': 9, 'Leo': 9, 'Sagittarius': 8,
        'Gemini': 7, 'Libra': 6, 'Aquarius': 7,
        'Taurus': 5, 'Virgo': 4, 'Capricorn': 5,
        'Cancer': 6, 'Scorpio': 9, 'Pisces': 7
    };
    return energyLevels[sign] || 5;
}

// Update planetary displays
function updatePlanetaryDisplays() {
    const positions = getCurrentPlanetaryPositions();
    
    const venusElement = document.getElementById('venusPosition');
    const marsElement = document.getElementById('marsPosition');
    const loveEnergyElement = document.getElementById('loveEnergy');
    
    if (venusElement) {
        venusElement.textContent = `♀ in ${positions.venus.sign} ${positions.venus.degrees}°`;
    }
    
    if (marsElement) {
        marsElement.textContent = `♂ in ${positions.mars.sign} ${positions.mars.degrees}°`;
    }
    
    if (loveEnergyElement) {
        loveEnergyElement.textContent = positions.loveEnergy;
    }
}

// Zodiac Compatibility Data
const compatibilityData = {
    aries: {
        aries: {
            score: 85,
            summary: "Fiery and passionate, double Aries create an explosive and exciting relationship",
            strengths: ["High energy", "Mutual understanding", "Adventurous spirit", "Physical attraction"],
            challenges: ["Power struggles", "Impatience", "Competition", "Ego clashes"],
            advice: "Learn to take turns leading and practice patience with each other"
        },
        taurus: {
            score: 60,
            summary: "Fire meets earth - passionate Aries with steady Taurus creates interesting dynamics",
            strengths: ["Aries brings excitement", "Taurus provides stability", "Passionate attraction", "Complementary energies"],
            challenges: ["Different paces", "Stubbornness", "Values differences", "Communication styles"],
            advice: "Aries should slow down, Taurus should be more spontaneous"
        },
        gemini: {
            score: 80,
            summary: "Dynamic and stimulating partnership with mental and physical attraction",
            strengths: ["Intellectual connection", "High energy", "Social compatibility", "Adventurous nature"],
            challenges: ["Inconsistency", "Superficiality", "Different priorities", "Restlessness"],
            advice: "Focus on building deeper emotional connection alongside mental stimulation"
        },
        cancer: {
            score: 55,
            summary: "Opposite personalities that can either complement or clash significantly",
            strengths: ["Aries brings courage", "Cancer provides nurturing", "Protective instincts", "Emotional growth"],
            challenges: ["Sensitivity clashes", "Different needs", "Communication gaps", "Emotional intensity"],
            advice: "Aries should be more gentle, Cancer should express needs directly"
        },
        leo: {
            score: 90,
            summary: "Fire sign powerhouse with incredible passion and mutual admiration",
            strengths: ["Natural chemistry", "Shared enthusiasm", "Mutual respect", "Dynamic energy"],
            challenges: ["Ego battles", "Competition", "Drama", "Attention needs"],
            advice: "Share the spotlight and celebrate each other's achievements"
        },
        virgo: {
            score: 50,
            summary: "Very different approaches to life that require significant compromise",
            strengths: ["Aries brings spontaneity", "Virgo brings organization", "Growth potential", "Balance"],
            challenges: ["Different values", "Criticism vs spontaneity", "Pace conflicts", "Detail orientation"],
            advice: "Appreciate each other's strengths and be patient with differences"
        },
        libra: {
            score: 75,
            summary: "Attractive opposites with strong physical and aesthetic connection",
            strengths: ["Physical attraction", "Social harmony", "Balance", "Mutual fascination"],
            challenges: ["Decision making", "Different priorities", "Conflict styles", "Independence vs togetherness"],
            advice: "Learn to compromise and appreciate different approaches to relationships"
        },
        scorpio: {
            score: 70,
            summary: "Intense and passionate connection with deep emotional undercurrents",
            strengths: ["Intense attraction", "Passionate connection", "Loyalty", "Transformation"],
            challenges: ["Power struggles", "Jealousy", "Control issues", "Emotional intensity"],
            advice: "Build trust and respect each other's independence"
        },
        sagittarius: {
            score: 85,
            summary: "Adventure-loving fire signs with shared enthusiasm for life",
            strengths: ["Adventure compatibility", "Optimism", "Freedom loving", "Intellectual connection"],
            challenges: ["Commitment issues", "Restlessness", "Bluntness", "Different goals"],
            advice: "Focus on building stability while maintaining your adventurous spirit"
        },
        capricorn: {
            score: 45,
            summary: "Very different life approaches requiring significant understanding",
            strengths: ["Aries brings energy", "Capricorn brings stability", "Goal orientation", "Complementary skills"],
            challenges: ["Different paces", "Values conflicts", "Authority issues", "Priority differences"],
            advice: "Respect each other's approaches and find common ground"
        },
        aquarius: {
            score: 75,
            summary: "Innovative and exciting partnership with intellectual and physical attraction",
            strengths: ["Intellectual connection", "Innovation", "Independence", "Unique bond"],
            challenges: ["Emotional distance", "Unpredictability", "Different priorities", "Communication styles"],
            advice: "Balance independence with emotional intimacy"
        },
        pisces: {
            score: 65,
            summary: "Fire and water combination requiring patience and understanding",
            strengths: ["Aries brings confidence", "Pisces brings intuition", "Emotional depth", "Growth potential"],
            challenges: ["Sensitivity levels", "Different approaches", "Communication gaps", "Energy differences"],
            advice: "Aries should be more gentle, Pisces should be more direct"
        }
    }
    // Add more zodiac combinations following the same pattern...
};

// Get compatibility analysis
function getCompatibilityAnalysis() {
    const sign1 = document.getElementById('sign1Select').value;
    const sign2 = document.getElementById('sign2Select').value;
    
    if (!sign1 || !sign2) {
        alert('Please select both zodiac signs to get compatibility analysis.');
        return;
    }
    
    const compatibility = getCompatibilityInfo(sign1, sign2);
    displayCompatibilityResult(compatibility, sign1, sign2);
}

function getCompatibilityInfo(sign1, sign2) {
    // Check if we have data for this combination
    if (compatibilityData[sign1] && compatibilityData[sign1][sign2]) {
        return compatibilityData[sign1][sign2];
    }
    
    // If not found, try reverse order
    if (compatibilityData[sign2] && compatibilityData[sign2][sign1]) {
        return compatibilityData[sign2][sign1];
    }
    
    // Default compatibility calculation
    return calculateDefaultCompatibility(sign1, sign2);
}

function calculateDefaultCompatibility(sign1, sign2) {
    const elements = {
        aries: 'fire', taurus: 'earth', gemini: 'air', cancer: 'water',
        leo: 'fire', virgo: 'earth', libra: 'air', scorpio: 'water',
        sagittarius: 'fire', capricorn: 'earth', aquarius: 'air', pisces: 'water'
    };
    
    const element1 = elements[sign1];
    const element2 = elements[sign2];
    
    let score = 50; // Base compatibility
    
    // Element compatibility
    if (element1 === element2) score += 20;
    else if ((element1 === 'fire' && element2 === 'air') || 
             (element1 === 'air' && element2 === 'fire') ||
             (element1 === 'earth' && element2 === 'water') ||
             (element1 === 'water' && element2 === 'earth')) {
        score += 15;
    } else if ((element1 === 'fire' && element2 === 'earth') ||
               (element1 === 'earth' && element2 === 'fire') ||
               (element1 === 'air' && element2 === 'water') ||
               (element1 === 'water' && element2 === 'air')) {
        score -= 10;
    }
    
    return {
        score: score,
        summary: `${capitalize(sign1)} and ${capitalize(sign2)} create an interesting combination`,
        strengths: ["Mutual growth", "Learning opportunities", "Complementary traits", "Unique perspective"],
        challenges: ["Different approaches", "Communication needs", "Understanding required", "Patience needed"],
        advice: "Focus on understanding each other's differences and finding common ground"
    };
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function displayCompatibilityResult(compatibility, sign1, sign2) {
    const resultSection = document.getElementById('compatibility-result');
    const sign1Symbol = getZodiacSymbol(sign1);
    const sign2Symbol = getZodiacSymbol(sign2);
    
    const scoreColor = compatibility.score >= 80 ? '#4CAF50' : 
                      compatibility.score >= 60 ? '#FF9800' : '#f44336';
    
    resultSection.innerHTML = `
        <div class="compatibility-analysis">
            <div class="compatibility-header">
                <h3>${sign1Symbol} ${capitalize(sign1)} & ${sign2Symbol} ${capitalize(sign2)} Compatibility</h3>
                <div class="compatibility-score" style="color: ${scoreColor};">
                    ${compatibility.score}% Compatible
                </div>
            </div>
            
            <div class="compatibility-summary">
                <p>${compatibility.summary}</p>
            </div>
            
            <div class="compatibility-details">
                <div class="detail-section">
                    <h4>💪 Strengths</h4>
                    <ul>
                        ${compatibility.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>⚠️ Challenges</h4>
                    <ul>
                        ${compatibility.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="detail-section">
                    <h4>💡 Relationship Advice</h4>
                    <p class="advice-text">${compatibility.advice}</p>
                </div>
            </div>
        </div>
    `;
    
    resultSection.classList.remove('hidden');
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

function getZodiacSymbol(sign) {
    const symbols = {
        aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
        leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
        sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
    };
    return symbols[sign] || '⭐';
}

function quickCompatibility(sign1, sign2) {
    document.getElementById('sign1Select').value = sign1;
    document.getElementById('sign2Select').value = sign2;
    getCompatibilityAnalysis();
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    updatePlanetaryDisplays();
    
    // Update planetary positions every 30 seconds
    setInterval(updatePlanetaryDisplays, 30000);
}); 