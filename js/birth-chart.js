// Birth Chart Analysis Engine
class BirthChartEngine {
    constructor() {
        this.planets = {
            sun: '☀️',
            moon: '🌙', 
            mercury: '☿',
            venus: '♀',
            mars: '♂',
            jupiter: '♃',
            saturn: '♄',
            uranus: '♅',
            neptune: '♆',
            pluto: '♇'
        };
        
        this.signs = {
            aries: '♈', taurus: '♉', gemini: '♊', cancer: '♋',
            leo: '♌', virgo: '♍', libra: '♎', scorpio: '♏',
            sagittarius: '♐', capricorn: '♑', aquarius: '♒', pisces: '♓'
        };
        
        this.houses = [
            'Self & Identity', 'Money & Possessions', 'Communication', 'Home & Family',
            'Creativity & Romance', 'Health & Service', 'Partnerships', 'Transformation',
            'Philosophy & Travel', 'Career & Reputation', 'Friends & Hopes', 'Spirituality & Subconscious'
        ];
        
        this.init();
    }
    
    init() {
        this.updateCosmicInfo();
        this.setupFormHandlers();
    }
    
    updateCosmicInfo() {
        // Update active planets
        const activePlanets = this.getCurrentActivePlanets();
        document.getElementById('activePlanets').textContent = activePlanets;
        
        // Update current aspects
        const currentAspects = this.getCurrentAspects();
        document.getElementById('currentAspects').textContent = currentAspects;
        
        // Update chart energy
        const chartEnergy = this.getCurrentChartEnergy();
        document.getElementById('chartEnergy').textContent = chartEnergy;
    }
    
    getCurrentActivePlanets() {
        const date = new Date();
        const activePlanets = [];
        
        // Simulate active planets based on current date
        const planetList = ['Sun', 'Moon', 'Mercury', 'Venus', 'Mars'];
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
        
        for (let i = 0; i < 3; i++) {
            const planetIndex = (dayOfYear + i) % planetList.length;
            activePlanets.push(planetList[planetIndex]);
        }
        
        return activePlanets.join(', ');
    }
    
    getCurrentAspects() {
        const aspects = ['Conjunction', 'Trine', 'Square', 'Opposition', 'Sextile'];
        const date = new Date();
        const aspectIndex = date.getDate() % aspects.length;
        
        return `${aspects[aspectIndex]} Active`;
    }
    
    getCurrentChartEnergy() {
        const energies = ['High Intensity', 'Balanced Flow', 'Transformative', 'Creative', 'Stabilizing'];
        const date = new Date();
        const energyIndex = (date.getMonth() + date.getDate()) % energies.length;
        
        return energies[energyIndex];
    }
    
    setupFormHandlers() {
        // Add event listeners for form inputs
        const birthDate = document.getElementById('birthDate');
        const birthTime = document.getElementById('birthTime');
        const birthLocation = document.getElementById('birthLocation');
        
        if (birthDate) {
            birthDate.addEventListener('change', () => this.validateForm());
        }
        if (birthTime) {
            birthTime.addEventListener('change', () => this.validateForm());
        }
        if (birthLocation) {
            birthLocation.addEventListener('change', () => this.validateForm());
        }
    }
    
    validateForm() {
        const birthDate = document.getElementById('birthDate').value;
        const birthTime = document.getElementById('birthTime').value;
        const birthLocation = document.getElementById('birthLocation').value;
        
        const submitBtn = document.querySelector('.submit-btn');
        if (birthDate && birthTime && birthLocation) {
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
        } else {
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.6';
        }
    }
}

// Birth Chart Generation Function
function generateBirthChart() {
    const birthDate = document.getElementById('birthDate').value;
    const birthTime = document.getElementById('birthTime').value;
    const birthLocation = document.getElementById('birthLocation').value;
    
    if (!birthDate || !birthTime || !birthLocation) {
        alert('Please fill in all birth information fields.');
        return;
    }
    
    // Show loading state
    const resultDiv = document.getElementById('birth-chart-result');
    resultDiv.classList.remove('hidden');
    resultDiv.innerHTML = `
        <div class="loading-state">
            <div class="loading-spinner"></div>
            <p>Calculating your birth chart...</p>
        </div>
    `;
    
    // Simulate chart generation
    setTimeout(() => {
        const chartData = generateChartData(birthDate, birthTime, birthLocation);
        displayBirthChart(chartData);
        
        // Track analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'birth_chart_generated', {
                event_category: 'engagement',
                event_label: 'birth_chart_analysis'
            });
        }
    }, 2000);
}

function generateChartData(birthDate, birthTime, birthLocation) {
    const date = new Date(birthDate + 'T' + birthTime);
    
    // Generate planetary positions based on birth data
    const planets = {
        sun: generatePlanetaryPosition(date, 'sun'),
        moon: generatePlanetaryPosition(date, 'moon'),
        mercury: generatePlanetaryPosition(date, 'mercury'),
        venus: generatePlanetaryPosition(date, 'venus'),
        mars: generatePlanetaryPosition(date, 'mars'),
        jupiter: generatePlanetaryPosition(date, 'jupiter'),
        saturn: generatePlanetaryPosition(date, 'saturn'),
        uranus: generatePlanetaryPosition(date, 'uranus'),
        neptune: generatePlanetaryPosition(date, 'neptune'),
        pluto: generatePlanetaryPosition(date, 'pluto')
    };
    
    // Generate houses
    const houses = generateHousePositions(date);
    
    // Generate aspects
    const aspects = generateAspects(planets);
    
    return {
        birthDate,
        birthTime,
        birthLocation,
        planets,
        houses,
        aspects,
        bigThree: {
            sun: planets.sun,
            moon: planets.moon,
            rising: generateRisingSign(date, birthTime)
        }
    };
}

function generatePlanetaryPosition(date, planet) {
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    // Simulate planetary position based on date and planet
    const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / 86400000);
    const planetOffset = ['sun', 'moon', 'mercury', 'venus', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'].indexOf(planet);
    const signIndex = (dayOfYear + planetOffset * 30) % 12;
    const degree = (dayOfYear + planetOffset * 7) % 30;
    
    return {
        sign: signs[signIndex],
        degree: degree,
        house: ((dayOfYear + planetOffset * 5) % 12) + 1
    };
}

function generateHousePositions(date) {
    const houses = [];
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    for (let i = 0; i < 12; i++) {
        const signIndex = (Math.floor(date.getTime() / 86400000) + i) % 12;
        houses.push({
            number: i + 1,
            sign: signs[signIndex],
            degree: (date.getDate() + i * 3) % 30
        });
    }
    
    return houses;
}

function generateAspects(planets) {
    const aspects = [];
    const planetNames = Object.keys(planets);
    const aspectTypes = [
        { name: 'Conjunction', angle: 0, orb: 8 },
        { name: 'Sextile', angle: 60, orb: 6 },
        { name: 'Square', angle: 90, orb: 8 },
        { name: 'Trine', angle: 120, orb: 8 },
        { name: 'Opposition', angle: 180, orb: 8 }
    ];
    
    // Generate some sample aspects
    for (let i = 0; i < 5; i++) {
        const planet1 = planetNames[i % planetNames.length];
        const planet2 = planetNames[(i + 1) % planetNames.length];
        const aspect = aspectTypes[i % aspectTypes.length];
        
        aspects.push({
            planet1,
            planet2,
            aspect: aspect.name,
            angle: aspect.angle,
            strength: Math.random() > 0.5 ? 'Strong' : 'Moderate'
        });
    }
    
    return aspects;
}

function generateRisingSign(date, time) {
    const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                  'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    
    const hour = parseInt(time.split(':')[0]);
    const signIndex = (date.getDate() + hour) % 12;
    
    return {
        sign: signs[signIndex],
        degree: (hour * 2 + date.getMinutes()) % 30
    };
}

function displayBirthChart(chartData) {
    const resultDiv = document.getElementById('birth-chart-result');
    
    const signNames = {
        aries: 'Aries ♈', taurus: 'Taurus ♉', gemini: 'Gemini ♊', cancer: 'Cancer ♋',
        leo: 'Leo ♌', virgo: 'Virgo ♍', libra: 'Libra ♎', scorpio: 'Scorpio ♏',
        sagittarius: 'Sagittarius ♐', capricorn: 'Capricorn ♑', aquarius: 'Aquarius ♒', pisces: 'Pisces ♓'
    };
    
    resultDiv.innerHTML = `
        <div class="birth-chart-results">
            <div class="chart-header">
                <h3>🌟 Your Personal Birth Chart</h3>
                <div class="chart-info">
                    <p><strong>Birth Date:</strong> ${new Date(chartData.birthDate).toLocaleDateString()}</p>
                    <p><strong>Birth Time:</strong> ${chartData.birthTime}</p>
                    <p><strong>Location:</strong> ${chartData.birthLocation}</p>
                </div>
            </div>
            
            <div class="big-three-analysis">
                <h4>Your "Big Three" Astrological Profile</h4>
                <div class="big-three-grid">
                    <div class="big-three-card">
                        <div class="planet-icon">☀️</div>
                        <h5>Sun Sign</h5>
                        <p class="sign-name">${signNames[chartData.bigThree.sun.sign]}</p>
                        <p class="degree">${chartData.bigThree.sun.degree}°</p>
                        <p class="description">Your core identity and life purpose</p>
                    </div>
                    <div class="big-three-card">
                        <div class="planet-icon">🌙</div>
                        <h5>Moon Sign</h5>
                        <p class="sign-name">${signNames[chartData.bigThree.moon.sign]}</p>
                        <p class="degree">${chartData.bigThree.moon.degree}°</p>
                        <p class="description">Your emotional nature and inner self</p>
                    </div>
                    <div class="big-three-card">
                        <div class="planet-icon">⬆️</div>
                        <h5>Rising Sign</h5>
                        <p class="sign-name">${signNames[chartData.bigThree.rising.sign]}</p>
                        <p class="degree">${chartData.bigThree.rising.degree}°</p>
                        <p class="description">Your outer personality and first impressions</p>
                    </div>
                </div>
            </div>
            
            <div class="planetary-positions">
                <h4>Planetary Positions in Your Chart</h4>
                <div class="planets-grid">
                    ${Object.entries(chartData.planets).map(([planet, data]) => `
                        <div class="planet-position">
                            <div class="planet-info">
                                <span class="planet-name">${planet.charAt(0).toUpperCase() + planet.slice(1)}</span>
                                <span class="planet-sign">${signNames[data.sign]}</span>
                                <span class="planet-house">House ${data.house}</span>
                                <span class="planet-degree">${data.degree}°</span>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="aspects-analysis">
                <h4>Major Planetary Aspects</h4>
                <div class="aspects-grid">
                    ${chartData.aspects.map(aspect => `
                        <div class="aspect-item">
                            <div class="aspect-planets">
                                ${aspect.planet1.charAt(0).toUpperCase() + aspect.planet1.slice(1)} 
                                ${aspect.aspect} 
                                ${aspect.planet2.charAt(0).toUpperCase() + aspect.planet2.slice(1)}
                            </div>
                            <div class="aspect-strength">${aspect.strength}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="chart-summary">
                <h4>Birth Chart Summary</h4>
                <div class="summary-content">
                    <p>Your birth chart reveals a unique cosmic blueprint that influences your personality, relationships, and life path. 
                    The combination of your ${signNames[chartData.bigThree.sun.sign]} Sun, 
                    ${signNames[chartData.bigThree.moon.sign]} Moon, and 
                    ${signNames[chartData.bigThree.rising.sign]} Rising creates a distinctive astrological profile.</p>
                    
                    <div class="next-steps">
                        <h5>Explore Further:</h5>
                        <div class="action-buttons">
                            <a href="zodiac-compatibility.html" class="action-btn">Check Compatibility</a>
                            <a href="daily-horoscope.html" class="action-btn">Get Daily Reading</a>
                            <a href="astrology-for-beginners.html" class="action-btn">Learn More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.birthChartEngine = new BirthChartEngine();
}); 