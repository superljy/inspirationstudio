// Monthly Horoscope Calculation Engine
// Professional astrological analysis for monthly forecasts

class MonthlyHoroscopeEngine {
    constructor() {
        this.monthlyCache = new Map();
        this.cacheTimeout = 24 * 60 * 60 * 1000; // 24 hours cache for monthly data
    }

    // Calculate monthly horoscope for a specific sign
    async calculateMonthlyHoroscope(sign, targetMonth = null, targetYear = null) {
        try {
            const today = new Date();
            const month = targetMonth || today.getMonth();
            const year = targetYear || today.getFullYear();
            const monthStart = new Date(year, month, 1);
            const monthEnd = new Date(year, month + 1, 0);

            console.log(`Calculating monthly horoscope for ${sign} (${monthStart.toDateString()} - ${monthEnd.toDateString()})`);
            
            // Check cache first
            const cacheKey = `monthly_${sign}_${year}_${month}`;
            if (this.monthlyCache.has(cacheKey)) {
                const cached = this.monthlyCache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.cacheTimeout) {
                    console.log('Using cached monthly horoscope');
                    return cached.data;
                }
            }

            // Calculate major planetary transits for the month
            const monthlyTransits = this.calculateMonthlyTransits(sign, monthStart, monthEnd);
            
            // Calculate monthly phases and cycles
            const monthlyPhases = this.calculateMonthlyPhases(monthStart, monthEnd);
            
            // Calculate long-term trends
            const longTermTrends = this.calculateLongTermTrends(sign, monthlyTransits);
            
            // Calculate key periods within the month
            const keyPeriods = this.calculateKeyMonthlyPeriods(sign, monthStart, monthEnd, monthlyTransits);
            
            // Calculate monthly themes
            const monthlyThemes = this.calculateMonthlyThemes(sign, monthlyTransits, monthlyPhases);
            
            // Generate monthly guidance
            const monthlyGuidance = this.generateMonthlyGuidance(sign, monthlyTransits, longTermTrends);
            
            // Calculate overall monthly score
            const overallScore = this.calculateMonthlyScore(monthlyTransits, longTermTrends);

            const monthlyHoroscope = {
                sign: sign,
                month: month,
                year: year,
                monthName: this.getMonthName(month),
                monthStart: monthStart.toISOString().split('T')[0],
                monthEnd: monthEnd.toISOString().split('T')[0],
                overallScore: overallScore,
                transits: monthlyTransits,
                phases: monthlyPhases,
                trends: longTermTrends,
                keyPeriods: keyPeriods,
                themes: monthlyThemes,
                guidance: monthlyGuidance,
                majorEvents: this.identifyMajorMonthlyEvents(monthlyTransits, monthlyPhases),
                luckyElements: this.generateMonthlyLuckyElements(sign, monthStart, monthlyTransits),
                challenges: this.identifyMonthlyChallenges(monthlyTransits),
                opportunities: this.identifyMonthlyOpportunities(monthlyTransits),
                forecast: this.generateMonthlyForecast(sign, monthlyTransits, longTermTrends),
                timestamp: Date.now()
            };

            // Cache the result
            this.monthlyCache.set(cacheKey, {
                data: monthlyHoroscope,
                timestamp: Date.now()
            });

            console.log('Monthly horoscope calculation completed');
            return monthlyHoroscope;

        } catch (error) {
            console.error(`Failed to calculate monthly horoscope for ${sign}:`, error);
            return this.getFallbackMonthlyHoroscope(sign, targetMonth, targetYear);
        }
    }

    // Calculate major planetary transits for the month
    calculateMonthlyTransits(sign, monthStart, monthEnd) {
        const transits = {
            major: [],
            minor: [],
            retrogrades: [],
            newMoons: [],
            fullMoons: []
        };

        const signIndex = this.getSignIndex(sign);
        
        // Sample the month at regular intervals to capture transits
        const sampleDates = this.generateSampleDates(monthStart, monthEnd, 10);
        
        sampleDates.forEach(date => {
            // Check if getCurrentPlanetaryPositions is available
            let positions = {};
            if (typeof getCurrentPlanetaryPositions === 'function') {
                positions = getCurrentPlanetaryPositions(date);
            } else {
                // Fallback planetary positions
                positions = this.getFallbackPlanetaryPositions(date);
            }
            
            Object.keys(positions).forEach(planetKey => {
                const planetPos = positions[planetKey];
                if (planetPos && planetPos.degree !== undefined) {
                    const planetSignIndex = Math.floor(planetPos.degree / 30);
                    const aspect = this.calculateSignAspect(signIndex, planetSignIndex);
                    
                    // Identify significant transits
                    if (aspect.harmony >= 0.8 || aspect.harmony <= 0.2) {
                        const transitType = aspect.harmony >= 0.8 ? 'major' : 'minor';
                        
                        transits[transitType].push({
                            planet: planetKey,
                            date: date.toISOString().split('T')[0],
                            aspect: aspect,
                            strength: this.calculateTransitStrength(planetKey, aspect),
                            influence: this.getTransitInfluence(planetKey, aspect),
                            duration: this.estimateTransitDuration(planetKey)
                        });
                    }
                    
                    // Track retrogrades
                    if (planetPos.isRetrograde) {
                        transits.retrogrades.push({
                            planet: planetKey,
                            date: date.toISOString().split('T')[0],
                            influence: this.getRetrogradeInfluence(planetKey)
                        });
                    }
                }
            });
            
            // Calculate lunar phases
            const moonPhase = this.calculateMoonPhase(date);
            if (moonPhase.isNewMoon) {
                transits.newMoons.push({
                    date: date.toISOString().split('T')[0],
                    sign: this.getMoonSign(date),
                    influence: 'New beginnings and fresh starts'
                });
            }
            if (moonPhase.isFullMoon) {
                transits.fullMoons.push({
                    date: date.toISOString().split('T')[0],
                    sign: this.getMoonSign(date),
                    influence: 'Culmination and completion'
                });
            }
        });

        // Remove duplicates and sort by importance
        transits.major = this.deduplicateTransits(transits.major);
        transits.minor = this.deduplicateTransits(transits.minor);
        
        return transits;
    }

    // Calculate monthly phases and cycles
    calculateMonthlyPhases(monthStart, monthEnd) {
        const phases = {
            beginning: { // Days 1-10
                start: monthStart.toISOString().split('T')[0],
                end: new Date(monthStart.getTime() + 9 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                theme: 'New Beginnings',
                description: 'Time for setting intentions and starting new projects',
                energy: 'Building'
            },
            middle: { // Days 11-20
                start: new Date(monthStart.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                end: new Date(monthStart.getTime() + 19 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                theme: 'Peak Activity',
                description: 'Prime time for action and implementation',
                energy: 'Active'
            },
            end: { // Days 21-end
                start: new Date(monthStart.getTime() + 20 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                end: monthEnd.toISOString().split('T')[0],
                theme: 'Completion & Reflection',
                description: 'Time for wrapping up and preparing for next cycle',
                energy: 'Reflecting'
            }
        };

        return phases;
    }

    // Calculate long-term trends for the month
    calculateLongTermTrends(sign, monthlyTransits) {
        const trends = {
            love: this.calculateMonthlyLoveTrend(monthlyTransits),
            career: this.calculateMonthlyCareerTrend(monthlyTransits),
            wealth: this.calculateMonthlyWealthTrend(monthlyTransits),
            health: this.calculateMonthlyHealthTrend(monthlyTransits),
            personal: this.calculatePersonalGrowthTrend(monthlyTransits),
            overall: 0
        };

        trends.overall = (trends.love + trends.career + trends.wealth + trends.health + trends.personal) / 5;
        
        return {
            scores: trends,
            direction: this.getTrendDirection(trends.overall),
            stability: this.calculateTrendStability(monthlyTransits),
            growth: this.calculateGrowthPotential(monthlyTransits)
        };
    }

    // Calculate monthly love trend
    calculateMonthlyLoveTrend(monthlyTransits) {
        let score = 50; // Base score
        
        // Venus influences
        monthlyTransits.major.forEach(transit => {
            if (transit.planet === 'venus') {
                score += transit.strength * 30 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
        });
        
        // Moon influences
        monthlyTransits.newMoons.forEach(moon => {
            score += 10; // New moons generally positive for new relationships
        });
        
        return Math.max(0, Math.min(100, score));
    }

    // Calculate monthly career trend
    calculateMonthlyCareerTrend(monthlyTransits) {
        let score = 50; // Base score
        
        // Sun influences
        monthlyTransits.major.forEach(transit => {
            if (transit.planet === 'sun') {
                score += transit.strength * 25 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
            if (transit.planet === 'saturn') {
                score += transit.strength * 20 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
            if (transit.planet === 'mars') {
                score += transit.strength * 15 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
        });
        
        return Math.max(0, Math.min(100, score));
    }

    // Calculate monthly wealth trend
    calculateMonthlyWealthTrend(monthlyTransits) {
        let score = 50; // Base score
        
        // Jupiter influences
        monthlyTransits.major.forEach(transit => {
            if (transit.planet === 'jupiter') {
                score += transit.strength * 35 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
            if (transit.planet === 'venus') {
                score += transit.strength * 20 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
        });
        
        return Math.max(0, Math.min(100, score));
    }

    // Calculate monthly health trend
    calculateMonthlyHealthTrend(monthlyTransits) {
        let score = 65; // Slightly positive base
        
        monthlyTransits.major.forEach(transit => {
            if (transit.planet === 'mars') {
                // Mars can be challenging for health if poorly aspected
                score += transit.strength * 15 * (transit.aspect.harmony > 0.6 ? 1 : -1);
            }
            if (transit.planet === 'saturn') {
                // Saturn can indicate health discipline needs
                score += transit.strength * 10 * (transit.aspect.harmony > 0.5 ? 1 : -1);
            }
        });
        
        return Math.max(0, Math.min(100, score));
    }

    // Calculate personal growth trend
    calculatePersonalGrowthTrend(monthlyTransits) {
        let score = 60; // Generally positive base
        
        monthlyTransits.major.forEach(transit => {
            if (transit.planet === 'jupiter') {
                score += transit.strength * 30;
            }
            if (transit.planet === 'uranus') {
                score += transit.strength * 25;
            }
            if (transit.planet === 'pluto') {
                score += transit.strength * 20;
            }
        });
        
        return Math.max(0, Math.min(100, score));
    }

    // Calculate key periods within the month
    calculateKeyMonthlyPeriods(sign, monthStart, monthEnd, monthlyTransits) {
        const periods = [];
        
        // Identify high-energy periods
        const highEnergyDates = monthlyTransits.major
            .filter(t => t.strength > 0.7)
            .map(t => t.date)
            .sort();
        
        if (highEnergyDates.length > 0) {
            periods.push({
                type: 'high-energy',
                dates: highEnergyDates.slice(0, 3), // Top 3 dates
                description: 'Peak energy days for important decisions and actions',
                recommendation: 'Schedule important meetings, launches, and decisions'
            });
        }
        
        // Add lunar phase periods
        monthlyTransits.newMoons.forEach(newMoon => {
            periods.push({
                type: 'new-moon',
                dates: [newMoon.date],
                description: 'Ideal for new beginnings and setting intentions',
                recommendation: 'Start new projects and make fresh plans'
            });
        });
        
        monthlyTransits.fullMoons.forEach(fullMoon => {
            periods.push({
                type: 'full-moon',
                dates: [fullMoon.date],
                description: 'Time for completion and release',
                recommendation: 'Complete projects and let go of what no longer serves'
            });
        });
        
        return periods.slice(0, 5); // Return top 5 periods
    }

    // Calculate monthly themes
    calculateMonthlyThemes(sign, monthlyTransits, monthlyPhases) {
        const themes = [];
        
        // Analyze dominant planetary influences
        const planetCounts = {};
        monthlyTransits.major.forEach(transit => {
            planetCounts[transit.planet] = (planetCounts[transit.planet] || 0) + transit.strength;
        });
        
        // Find top 3 most influential planets
        const topPlanets = Object.entries(planetCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 3);
        
        topPlanets.forEach(([planet, influence]) => {
            switch (planet) {
                case 'mercury':
                    themes.push({
                        theme: 'Communication & Mental Growth',
                        description: 'A month focused on learning, communication, and intellectual development.',
                        influence: influence / topPlanets[0][1], // Normalize to strongest influence
                        areas: ['Education', 'Writing', 'Networking', 'Planning']
                    });
                    break;
                case 'venus':
                    themes.push({
                        theme: 'Love & Creative Expression',
                        description: 'Romance, art, beauty, and harmonious relationships are highlighted.',
                        influence: influence / topPlanets[0][1],
                        areas: ['Relationships', 'Art', 'Beauty', 'Harmony']
                    });
                    break;
                case 'mars':
                    themes.push({
                        theme: 'Action & Achievement',
                        description: 'High energy month perfect for taking bold action and pursuing goals.',
                        influence: influence / topPlanets[0][1],
                        areas: ['Leadership', 'Sports', 'Competition', 'Initiative']
                    });
                    break;
                case 'jupiter':
                    themes.push({
                        theme: 'Growth & Expansion',
                        description: 'Opportunities for growth, travel, education, and philosophical exploration.',
                        influence: influence / topPlanets[0][1],
                        areas: ['Travel', 'Education', 'Philosophy', 'Expansion']
                    });
                    break;
                case 'saturn':
                    themes.push({
                        theme: 'Structure & Discipline',
                        description: 'Focus on building solid foundations and long-term planning.',
                        influence: influence / topPlanets[0][1],
                        areas: ['Career', 'Responsibility', 'Discipline', 'Structure']
                    });
                    break;
            }
        });

        return themes;
    }

    // Helper methods
    getMonthName(monthIndex) {
        const months = ['January', 'February', 'March', 'April', 'May', 'June',
                       'July', 'August', 'September', 'October', 'November', 'December'];
        return months[monthIndex];
    }

    getSignIndex(sign) {
        const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        return signs.indexOf(sign.toLowerCase());
    }

    generateSampleDates(startDate, endDate, samples) {
        const dates = [];
        const totalDays = Math.ceil((endDate - startDate) / (24 * 60 * 60 * 1000));
        const interval = Math.floor(totalDays / samples);
        
        for (let i = 0; i < samples; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + (i * interval));
            dates.push(date);
        }
        
        return dates;
    }

    calculateSignAspect(sign1Index, sign2Index) {
        const diff = Math.abs(sign1Index - sign2Index);
        const minDiff = Math.min(diff, 12 - diff);
        
        if (minDiff === 0) return { type: 'conjunction', harmony: 1.0 };
        if (minDiff === 1) return { type: 'semisextile', harmony: 0.3 };
        if (minDiff === 2) return { type: 'sextile', harmony: 0.8 };
        if (minDiff === 3) return { type: 'square', harmony: 0.2 };
        if (minDiff === 4) return { type: 'trine', harmony: 0.9 };
        if (minDiff === 5) return { type: 'quincunx', harmony: 0.1 };
        if (minDiff === 6) return { type: 'opposition', harmony: 0.4 };
        
        return { type: 'neutral', harmony: 0.5 };
    }

    calculateTransitStrength(planetKey, aspect) {
        const baseStrength = planets[planetKey]?.influence || 0.5;
        return baseStrength * aspect.harmony;
    }

    // Simplified implementations for remaining helper methods
    getTransitInfluence(planetKey, aspect) {
        const influences = {
            sun: 'Core identity and vitality',
            moon: 'Emotions and intuition',
            mercury: 'Communication and thinking',
            venus: 'Love and relationships',
            mars: 'Energy and action',
            jupiter: 'Growth and opportunities',
            saturn: 'Structure and responsibility'
        };
        return influences[planetKey] || 'General influence';
    }

    getRetrogradeInfluence(planetKey) {
        const retrogradeInfluences = {
            mercury: 'communication delays and technology issues',
            venus: 'relationship re-evaluation and financial review',
            mars: 'energy setbacks and project delays',
            jupiter: 'slowed growth and re-examination of beliefs',
            saturn: 'structural challenges and responsibility reviews',
            uranus: 'disrupted innovations and unexpected reversals',
            neptune: 'spiritual confusion and illusion challenges',
            pluto: 'deep transformation resistance and power struggles'
        };
        
        return retrogradeInfluences[planetKey] || 'general disruptions in planetary energy';
    }

    estimateTransitDuration(planetKey) {
        const durations = {
            sun: '1 month', moon: '2-3 days', mercury: '2-3 weeks',
            venus: '3-4 weeks', mars: '1-2 months', jupiter: '1 year',
            saturn: '2-3 years'
        };
        return durations[planetKey] || '1 month';
    }

    calculateMoonPhase(date) {
        // Simplified moon phase calculation
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        const moonCycle = (dayOfYear % 29.5) / 29.5;
        
        return {
            phase: moonCycle,
            isNewMoon: moonCycle < 0.1 || moonCycle > 0.9,
            isFullMoon: moonCycle > 0.4 && moonCycle < 0.6
        };
    }

    getMoonSign(date) {
        const signs = ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
                      'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'];
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        return signs[Math.floor((dayOfYear * 12 / 365) % 12)];
    }

    deduplicateTransits(transits) {
        const seen = new Set();
        return transits.filter(transit => {
            const key = `${transit.planet}_${transit.date}_${transit.aspect.type}`;
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        });
    }

    getTrendDirection(overallScore) {
        if (overallScore >= 70) return 'rising';
        if (overallScore >= 50) return 'stable';
        return 'declining';
    }

    calculateTrendStability(monthlyTransits) {
        const volatility = monthlyTransits.major.length + monthlyTransits.retrogrades.length;
        return volatility < 5 ? 'stable' : volatility < 10 ? 'moderate' : 'volatile';
    }

    calculateGrowthPotential(monthlyTransits) {
        const growthTransits = monthlyTransits.major.filter(t => 
            ['jupiter', 'uranus', 'pluto'].includes(t.planet) && t.strength > 0.6
        );
        return growthTransits.length > 2 ? 'high' : growthTransits.length > 0 ? 'moderate' : 'low';
    }

    generateMonthlyGuidance(sign, monthlyTransits, longTermTrends) {
        const guidance = [];
        
        if (longTermTrends.scores.overall >= 75) {
            guidance.push("🌟 Exceptional month ahead! The stars align to support your goals and aspirations.");
        } else if (longTermTrends.scores.overall >= 60) {
            guidance.push("✨ Positive month with good opportunities for growth and progress.");
        } else {
            guidance.push("🔮 Transformative month requiring patience and wisdom to navigate challenges.");
        }
        
        // Add specific guidance based on strongest trends
        const trends = longTermTrends.scores;
        const maxTrend = Object.keys(trends).reduce((a, b) => trends[a] > trends[b] ? a : b);
        
        switch(maxTrend) {
            case 'love':
                guidance.push("💖 Love and relationships are your strongest area this month. Nurture connections.");
                break;
            case 'career':
                guidance.push("💼 Career opportunities abound. Focus on professional development and networking.");
                break;
            case 'wealth':
                guidance.push("💰 Financial growth is favored. Consider investments and new income sources.");
                break;
            case 'health':
                guidance.push("🏥 Health and vitality are highlighted. Establish healthy routines and habits.");
                break;
            case 'personal':
                guidance.push("🌱 Personal growth takes center stage. Embrace learning and self-improvement.");
                break;
        }
        
        return guidance;
    }

    calculateMonthlyScore(monthlyTransits, longTermTrends) {
        return {
            overall: Math.round(longTermTrends.scores.overall),
            love: Math.round(longTermTrends.scores.love),
            career: Math.round(longTermTrends.scores.career),
            wealth: Math.round(longTermTrends.scores.wealth),
            health: Math.round(longTermTrends.scores.health),
            personal: Math.round(longTermTrends.scores.personal)
        };
    }

    // Additional helper methods
    identifyMajorMonthlyEvents(monthlyTransits, monthlyPhases) {
        const events = [];
        
        // Major transits
        monthlyTransits.major.slice(0, 3).forEach(transit => {
            events.push({
                type: 'transit',
                date: transit.date,
                description: `${transit.planet.charAt(0).toUpperCase() + transit.planet.slice(1)} ${transit.aspect.type}`,
                impact: transit.strength > 0.8 ? 'high' : 'moderate'
            });
        });
        
        // Lunar events
        monthlyTransits.newMoons.forEach(moon => {
            events.push({
                type: 'lunar',
                date: moon.date,
                description: `New Moon in ${moon.sign}`,
                impact: 'moderate'
            });
        });
        
        return events.slice(0, 5);
    }

    generateMonthlyLuckyElements(sign, monthStart, monthlyTransits) {
        // Default zodiac sign data
        const defaultSignData = {
            colors: ['Blue', 'Silver'],
            stones: ['Crystal', 'Moonstone'],
            element: 'cosmic'
        };
        
        // Try to get sign data from global zodiacSigns if available
        const signData = (typeof zodiacSigns !== 'undefined' && zodiacSigns[sign]) ? zodiacSigns[sign] : defaultSignData;
        
        return {
            colors: signData.colors || defaultSignData.colors,
            numbers: [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 20) + 10, Math.floor(Math.random() * 10) + 30],
            gemstones: signData.stones || defaultSignData.stones,
            days: ['Tuesday', 'Friday', 'Sunday'],
            metals: (signData.element || 'cosmic') === 'fire' ? ['Gold', 'Copper'] : 
                   (signData.element || 'cosmic') === 'earth' ? ['Silver', 'Lead'] :
                   (signData.element || 'cosmic') === 'air' ? ['Mercury', 'Platinum'] : ['Tin', 'Zinc']
        };
    }

    identifyMonthlyChallenges(monthlyTransits) {
        const challenges = [];
        
        // 1. 逆行行星影响
        if (monthlyTransits.retrogrades && monthlyTransits.retrogrades.length > 0) {
            monthlyTransits.retrogrades.forEach(retrograde => {
                const planetName = retrograde.planet.charAt(0).toUpperCase() + retrograde.planet.slice(1);
                switch (retrograde.planet) {
                    case 'mercury':
                        challenges.push(`${planetName} retrograde may cause communication delays and technology issues`);
                        break;
                    case 'venus':
                        challenges.push(`${planetName} retrograde may bring relationship misunderstandings and financial concerns`);
                        break;
                    case 'mars':
                        challenges.push(`${planetName} retrograde may lead to energy setbacks and project delays`);
                        break;
                    default:
                        challenges.push(`${planetName} retrograde may cause ${retrograde.influence || 'disruptions in its associated areas'}`);
                }
            });
        }
        
        // 2. 困难行星相位
        if (monthlyTransits.major && monthlyTransits.major.length > 0) {
            monthlyTransits.major.filter(t => t.aspect && t.aspect.harmony < 0.3).forEach(transit => {
                const planetName = transit.planet.charAt(0).toUpperCase() + transit.planet.slice(1);
                const aspectType = transit.aspect.type;
                
                switch (transit.planet) {
                    case 'saturn':
                        challenges.push(`${planetName} ${aspectType} may bring increased responsibilities and time constraints`);
                        break;
                    case 'mars':
                        challenges.push(`${planetName} ${aspectType} may cause impatience and conflicts in relationships`);
                        break;
                    case 'mercury':
                        challenges.push(`${planetName} ${aspectType} may lead to miscommunication and decision-making difficulties`);
                        break;
                    default:
                        challenges.push(`Challenging ${planetName} ${aspectType} requires careful attention and patience`);
                }
            });
        }
        
        // 3. 基于月份的普遍挑战模式
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const seasonalChallenges = this.getSeasonalChallenges(month);
        challenges.push(...seasonalChallenges);
        
        // 4. 基于星座特性的个人挑战
        // 这里我们从主要计算中获取星座信息，如果没有则使用通用挑战
        const personalChallenges = this.getPersonalChallenges();
        challenges.push(...personalChallenges);
        
        // 5. 确保至少有2-4个挑战项目
        if (challenges.length === 0) {
            challenges.push(...this.getUniversalChallenges());
        }
        
        // 去重并限制数量
        const uniqueChallenges = [...new Set(challenges)];
        return uniqueChallenges.slice(0, Math.max(2, Math.min(4, uniqueChallenges.length)));
    }

    // 季节性挑战模式
    getSeasonalChallenges(month) {
        const challenges = [];
        
        // 春季 (3-5月): 新开始带来的不确定性
        if (month >= 2 && month <= 4) {
            challenges.push("Spring energy may bring restlessness and impatience with slow progress");
            challenges.push("New beginnings require leaving comfort zones which may feel challenging");
        }
        // 夏季 (6-8月): 高强度活动期的压力
        else if (month >= 5 && month <= 7) {
            challenges.push("Summer intensity may lead to burnout if work-life balance is neglected");
            challenges.push("High social expectations during peak season may cause stress");
        }
        // 秋季 (9-11月): 收获期的压力和变化
        else if (month >= 8 && month <= 10) {
            challenges.push("Autumn transitions may bring uncertainty about future directions");
            challenges.push("Harvest season pressures require careful time and resource management");
        }
        // 冬季 (12-2月): 内省期的情绪挑战
        else {
            challenges.push("Winter introspection may trigger mood fluctuations and energy dips");
            challenges.push("Holiday season financial and family pressures may create stress");
        }
        
        return challenges;
    }

    // 个人成长相关的挑战
    getPersonalChallenges() {
        const challenges = [
            "Old patterns and habits may resist necessary changes for growth",
            "Balancing personal desires with responsibilities requires conscious effort",
            "Communication in close relationships may need extra attention and patience",
            "Financial decisions require careful consideration and long-term planning",
            "Health and wellness routines need consistent attention despite busy schedules",
            "Career advancement may require stepping outside established comfort zones",
            "Time management becomes crucial as multiple priorities compete for attention",
            "Emotional boundaries in relationships may need reinforcement and clarity"
        ];
        
        // 随机选择1-2个个人挑战
        const shuffled = challenges.sort(() => 0.5 - Math.random());
        return shuffled.slice(0, 2);
    }

    // 通用挑战作为最后的保障
    getUniversalChallenges() {
        return [
            "Communication misunderstandings may require extra patience and clarity",
            "Time management challenges need attention as responsibilities increase",
            "Balancing personal and professional priorities requires conscious planning",
            "Financial decisions benefit from careful research and patience"
        ];
    }

    identifyMonthlyOpportunities(monthlyTransits) {
        const opportunities = [];
        
        monthlyTransits.major.filter(t => t.aspect.harmony > 0.7).forEach(transit => {
            opportunities.push(`Favorable ${transit.planet} energy supports ${transit.influence}`);
        });
        
        monthlyTransits.newMoons.forEach(moon => {
            opportunities.push(`New Moon in ${moon.sign} offers fresh start opportunities`);
        });
        
        return opportunities.slice(0, 4);
    }

    generateMonthlyForecast(sign, monthlyTransits, longTermTrends) {
        const forecast = {
            overall: this.generateOverallForecast(longTermTrends.scores.overall),
            love: this.generateLoveForecast(longTermTrends.scores.love),
            career: this.generateCareerForecast(longTermTrends.scores.career),
            wealth: this.generateWealthForecast(longTermTrends.scores.wealth),
            health: this.generateHealthForecast(longTermTrends.scores.health)
        };
        
        return forecast;
    }

    generateOverallForecast(score) {
        if (score >= 80) return "Outstanding month with multiple opportunities for success and growth.";
        if (score >= 60) return "Positive month with good prospects for achieving your goals.";
        if (score >= 40) return "Mixed month requiring balance and careful decision-making.";
        return "Challenging month that offers valuable lessons and growth opportunities.";
    }

    generateLoveForecast(score) {
        if (score >= 80) return "Romance flourishes with deep connections and meaningful relationships.";
        if (score >= 60) return "Stable relationships with opportunities for deeper understanding.";
        return "Relationships require patience and communication to overcome challenges.";
    }

    generateCareerForecast(score) {
        if (score >= 80) return "Career advancement and professional recognition are highly favored.";
        if (score >= 60) return "Steady career progress with new opportunities emerging.";
        return "Career challenges provide opportunities to develop new skills and resilience.";
    }

    generateWealthForecast(score) {
        if (score >= 80) return "Financial growth and profitable investments are strongly indicated.";
        if (score >= 60) return "Stable finances with moderate growth opportunities.";
        return "Financial caution advised; focus on budgeting and careful planning.";
    }

    generateHealthForecast(score) {
        if (score >= 80) return "Excellent vitality and energy support all your endeavors.";
        if (score >= 60) return "Good health with minor attention needed for wellness routines.";
        return "Health requires extra attention; prioritize rest and stress management.";
    }

    getFallbackMonthlyHoroscope(sign, targetMonth, targetYear) {
        const today = new Date();
        const month = targetMonth || today.getMonth();
        const year = targetYear || today.getFullYear();
        const monthStart = new Date(year, month, 1);
        const monthEnd = new Date(year, month + 1, 0);

        return {
            sign: sign,
            month: month,
            year: year,
            monthName: this.getMonthName(month),
            monthStart: monthStart.toISOString().split('T')[0],
            monthEnd: monthEnd.toISOString().split('T')[0],
            overallScore: { overall: 65, love: 60, career: 70, wealth: 60, health: 65, personal: 68 },
            trends: { scores: { overall: 65 }, direction: 'stable', stability: 'moderate' },
            themes: [{ 
                theme: 'Steady Progress', 
                description: 'A month of consistent development and growth',
                influence: 0.7,
                areas: ['Growth', 'Stability', 'Balance', 'Development']
            }],
            guidance: ['Focus on building solid foundations this month'],
            opportunities: ['Career advancement potential', 'Financial growth opportunities'],
            challenges: ['Minor delays in communication', 'Need for patience in relationships'],
            forecast: {
                overall: 'A balanced month with opportunities for steady progress',
                love: 'Stable relationships with potential for growth',
                career: 'Professional development opportunities emerge',
                wealth: 'Financial stability with moderate growth potential',
                health: 'Good overall health with emphasis on balance'
            },
            luckyElements: {
                colors: ['Blue', 'Silver'],
                numbers: [7, 14, 28],
                gemstones: ['Crystal', 'Moonstone'],
                metals: ['Silver', 'Copper'],
                days: ['Tuesday', 'Friday', 'Sunday']
            },
            fallback: true,
            timestamp: Date.now()
        };
    }

    // Fallback planetary positions generator
    getFallbackPlanetaryPositions(date) {
        const dayOfYear = Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
        
        return {
            sun: { degree: (dayOfYear * 360 / 365) % 360, isRetrograde: false },
            moon: { degree: (dayOfYear * 13 * 360 / 365) % 360, isRetrograde: false },
            mercury: { degree: (dayOfYear * 4 * 360 / 365) % 360, isRetrograde: Math.random() < 0.2 },
            venus: { degree: (dayOfYear * 1.6 * 360 / 365) % 360, isRetrograde: Math.random() < 0.1 },
            mars: { degree: (dayOfYear * 0.53 * 360 / 365) % 360, isRetrograde: Math.random() < 0.1 },
            jupiter: { degree: (dayOfYear * 0.08 * 360 / 365) % 360, isRetrograde: Math.random() < 0.3 },
            saturn: { degree: (dayOfYear * 0.03 * 360 / 365) % 360, isRetrograde: Math.random() < 0.3 }
        };
    }
} 