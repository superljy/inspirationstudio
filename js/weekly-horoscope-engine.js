// Weekly Horoscope Calculation Engine
// Professional astrological analysis for weekly forecasts

class WeeklyHoroscopeEngine {
    constructor() {
        this.weeklyCache = new Map();
        this.cacheTimeout = 6 * 60 * 60 * 1000; // 6 hours cache
    }

    // Calculate weekly horoscope for a specific sign
    async calculateWeeklyHoroscope(sign, startDate = null) {
        try {
            const weekStart = startDate || this.getWeekStart(new Date());
            const weekEnd = new Date(weekStart);
            weekEnd.setDate(weekStart.getDate() + 6);

            console.log(`Calculating weekly horoscope for ${sign} (${weekStart.toDateString()} - ${weekEnd.toDateString()})`);
            
            // Check cache first
            const cacheKey = `weekly_${sign}_${weekStart.toISOString().split('T')[0]}`;
            if (this.weeklyCache.has(cacheKey)) {
                const cached = this.weeklyCache.get(cacheKey);
                if (Date.now() - cached.timestamp < this.cacheTimeout) {
                    console.log('Using cached weekly horoscope');
                    return cached.data;
                }
            }

            // Calculate weekly planetary influences
            const weeklyInfluences = this.calculateWeeklyInfluences(sign, weekStart, weekEnd);
            
            // Calculate weekly trends
            const weeklyTrends = this.calculateWeeklyTrends(sign, weeklyInfluences);
            
            // Calculate best days of the week
            const bestDays = this.calculateBestDays(sign, weekStart, weeklyInfluences);
            
            // Calculate weekly themes and guidance
            const weeklyThemes = this.calculateWeeklyThemes(sign, weeklyInfluences);
            
            // Generate weekly advice
            const weeklyAdvice = this.generateWeeklyAdvice(sign, weeklyInfluences, weeklyTrends);
            
            // Calculate overall weekly score
            const overallScore = this.calculateWeeklyScore(weeklyInfluences, weeklyTrends);

            const weeklyHoroscope = {
                sign: sign,
                weekStart: weekStart.toISOString().split('T')[0],
                weekEnd: weekEnd.toISOString().split('T')[0],
                weekNumber: this.getWeekNumber(weekStart),
                overallScore: overallScore,
                weeklyInfluences: weeklyInfluences,
                trends: weeklyTrends,
                bestDays: bestDays,
                themes: weeklyThemes,
                advice: weeklyAdvice,
                keyPlanets: this.identifyKeyWeeklyPlanets(weeklyInfluences),
                luckyElements: this.generateWeeklyLuckyElements(sign, weekStart, weeklyInfluences),
                challenges: this.identifyWeeklyChallenges(weeklyInfluences),
                opportunities: this.identifyWeeklyOpportunities(weeklyInfluences),
                timestamp: Date.now()
            };

            // Cache the result
            this.weeklyCache.set(cacheKey, {
                data: weeklyHoroscope,
                timestamp: Date.now()
            });

            console.log('Weekly horoscope calculation completed');
            return weeklyHoroscope;

        } catch (error) {
            console.error(`Failed to calculate weekly horoscope for ${sign}:`, error);
            return this.getFallbackWeeklyHoroscope(sign, startDate);
        }
    }

    // Get the start of the week (Monday)
    getWeekStart(date) {
        const d = new Date(date);
        const day = d.getDay();
        const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
        return new Date(d.setDate(diff));
    }

    // Get week number
    getWeekNumber(date) {
        const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
        const dayNum = d.getUTCDay() || 7;
        d.setUTCDate(d.getUTCDate() + 4 - dayNum);
        const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    }

    // Calculate weekly planetary influences
    calculateWeeklyInfluences(sign, weekStart, weekEnd) {
        const influences = {};
        const signData = zodiacSigns[sign];
        
        // Calculate for each day of the week
        for (let day = 0; day < 7; day++) {
            const currentDate = new Date(weekStart);
            currentDate.setDate(weekStart.getDate() + day);
            
            // Check if getCurrentPlanetaryPositions is available
            let dayPositions = {};
            if (typeof getCurrentPlanetaryPositions === 'function') {
                dayPositions = getCurrentPlanetaryPositions(currentDate);
            } else {
                // Fallback planetary positions
                dayPositions = this.getFallbackPlanetaryPositions(currentDate);
            }
            const dayInfluences = this.calculateDayInfluences(sign, dayPositions, {});
            
            influences[this.getDayName(day)] = {
                date: currentDate.toISOString().split('T')[0],
                planetary: dayInfluences,
                energy: this.calculateDayEnergy(dayInfluences),
                focus: this.getDayFocus(day, dayInfluences)
            };
        }

        return influences;
    }

    // Calculate influences for a specific day
    calculateDayInfluences(sign, positions, signData) {
        const influences = {};
        const signIndex = this.getSignIndex(sign);
        
        Object.keys(positions).forEach(planetKey => {
            const planetPos = positions[planetKey];
            if (planetPos && planetPos.degree !== undefined) {
                const planetSignIndex = Math.floor(planetPos.degree / 30);
                const aspect = this.calculateSignAspect(signIndex, planetSignIndex);
                
                influences[planetKey] = {
                    position: planetPos,
                    aspect: aspect,
                    strength: this.calculatePlanetStrength(planetKey, aspect, planetPos),
                    influence: this.getPlanetInfluence(planetKey, aspect)
                };
            }
        });

        return influences;
    }

    // Calculate weekly trends
    calculateWeeklyTrends(sign, weeklyInfluences) {
        const trends = {
            love: this.calculateLoveTrend(weeklyInfluences),
            career: this.calculateCareerTrend(weeklyInfluences),
            wealth: this.calculateWealthTrend(weeklyInfluences),
            health: this.calculateHealthTrend(weeklyInfluences),
            overall: 0
        };

        trends.overall = (trends.love + trends.career + trends.wealth + trends.health) / 4;
        
        return {
            scores: trends,
            direction: this.getTrendDirection(trends),
            peak: this.findPeakDay(weeklyInfluences),
            low: this.findLowDay(weeklyInfluences)
        };
    }

    // Calculate love trend for the week
    calculateLoveTrend(weeklyInfluences) {
        let totalScore = 0;
        let dayCount = 0;

        Object.values(weeklyInfluences).forEach(dayData => {
            const venusInfluence = dayData.planetary.venus?.strength || 0;
            const moonInfluence = dayData.planetary.moon?.strength || 0;
            const dayScore = (venusInfluence * 0.7) + (moonInfluence * 0.3);
            totalScore += dayScore;
            dayCount++;
        });

        return dayCount > 0 ? (totalScore / dayCount) * 100 : 50;
    }

    // Calculate career trend for the week
    calculateCareerTrend(weeklyInfluences) {
        let totalScore = 0;
        let dayCount = 0;

        Object.values(weeklyInfluences).forEach(dayData => {
            const sunInfluence = dayData.planetary.sun?.strength || 0;
            const saturnInfluence = dayData.planetary.saturn?.strength || 0;
            const marsInfluence = dayData.planetary.mars?.strength || 0;
            const dayScore = (sunInfluence * 0.5) + (saturnInfluence * 0.3) + (marsInfluence * 0.2);
            totalScore += dayScore;
            dayCount++;
        });

        return dayCount > 0 ? (totalScore / dayCount) * 100 : 50;
    }

    // Calculate wealth trend for the week
    calculateWealthTrend(weeklyInfluences) {
        let totalScore = 0;
        let dayCount = 0;

        Object.values(weeklyInfluences).forEach(dayData => {
            const jupiterInfluence = dayData.planetary.jupiter?.strength || 0;
            const venusInfluence = dayData.planetary.venus?.strength || 0;
            const dayScore = (jupiterInfluence * 0.6) + (venusInfluence * 0.4);
            totalScore += dayScore;
            dayCount++;
        });

        return dayCount > 0 ? (totalScore / dayCount) * 100 : 50;
    }

    // Calculate health trend for the week
    calculateHealthTrend(weeklyInfluences) {
        let totalScore = 0;
        let dayCount = 0;

        Object.values(weeklyInfluences).forEach(dayData => {
            const marsInfluence = dayData.planetary.mars?.strength || 0;
            const saturnInfluence = dayData.planetary.saturn?.strength || 0;
            const dayScore = Math.max(0, 1 - (Math.abs(marsInfluence - 0.5) + Math.abs(saturnInfluence - 0.5)) / 2);
            totalScore += dayScore;
            dayCount++;
        });

        return dayCount > 0 ? (totalScore / dayCount) * 100 : 50;
    }

    // Calculate best days of the week
    calculateBestDays(sign, weekStart, weeklyInfluences) {
        const dayScores = [];

        Object.entries(weeklyInfluences).forEach(([dayName, dayData]) => {
            const energy = dayData.energy;
            const planetaryScore = this.calculateDayPlanetaryScore(dayData.planetary);
            const totalScore = (energy * 0.4) + (planetaryScore * 0.6);

            dayScores.push({
                day: dayName,
                date: dayData.date,
                score: totalScore,
                energy: energy,
                focus: dayData.focus,
                recommendation: this.getDayRecommendation(totalScore, dayData.focus)
            });
        });

        // Sort by score
        dayScores.sort((a, b) => b.score - a.score);

        return {
            best: dayScores.slice(0, 2),
            good: dayScores.slice(2, 4),
            moderate: dayScores.slice(4, 7),
            overall: dayScores
        };
    }

    // Calculate weekly themes
    calculateWeeklyThemes(sign, weeklyInfluences) {
        const themes = [];
        
        // We don't need signData for this method, so we can remove that dependency
        
        // Analyze dominant planetary influences
        const dominantPlanets = this.findDominantWeeklyPlanets(weeklyInfluences);
        
        dominantPlanets.forEach(planet => {
            switch (planet.name) {
                case 'mercury':
                    themes.push({
                        theme: 'Communication & Learning',
                        description: 'A week focused on communication, learning new skills, and making important connections.',
                        intensity: planet.strength
                    });
                    break;
                case 'venus':
                    themes.push({
                        theme: 'Love & Relationships',
                        description: 'Romance, creativity, and harmonious relationships take center stage this week.',
                        intensity: planet.strength
                    });
                    break;
                case 'mars':
                    themes.push({
                        theme: 'Action & Energy',
                        description: 'High energy week perfect for taking initiative and pursuing ambitious goals.',
                        intensity: planet.strength
                    });
                    break;
                case 'jupiter':
                    themes.push({
                        theme: 'Growth & Expansion',
                        description: 'Opportunities for growth, expansion, and positive developments emerge.',
                        intensity: planet.strength
                    });
                    break;
                case 'saturn':
                    themes.push({
                        theme: 'Structure & Discipline',
                        description: 'Focus on building solid foundations and long-term planning.',
                        intensity: planet.strength
                    });
                    break;
            }
        });

        return themes.slice(0, 3); // Return top 3 themes
    }

    // Generate weekly advice
    generateWeeklyAdvice(sign, weeklyInfluences, weeklyTrends) {
        const advice = [];
        
        // Default sign data
        const defaultSignData = {
            element: 'cosmic',
            quality: 'adaptive',
            traits: ['intuitive']
        };
        
        // Try to get sign data from global zodiacSigns if available
        const signData = (typeof zodiacSigns !== 'undefined' && zodiacSigns[sign]) ? zodiacSigns[sign] : defaultSignData;

        // General weekly guidance
        if (weeklyTrends.scores.overall >= 75) {
            advice.push("⭐ Excellent week ahead! Your natural " + (signData.element || 'cosmic') + " energy is perfectly aligned with cosmic influences.");
        } else if (weeklyTrends.scores.overall >= 60) {
            advice.push("🌟 Good week with steady progress. Focus on your " + (signData.quality || 'adaptive') + " nature to maximize opportunities.");
        } else {
            advice.push("🔮 Challenging but transformative week. Use your " + (signData.traits?.[0] || 'intuitive') + " nature to navigate obstacles.");
        }

        // Specific area guidance
        if (weeklyTrends.scores.love >= 70) {
            advice.push("💕 Love is highlighted this week. Perfect time for romantic gestures and deepening connections.");
        }
        
        if (weeklyTrends.scores.career >= 70) {
            advice.push("💼 Career momentum builds this week. Take initiative on important projects and showcase your skills.");
        }
        
        if (weeklyTrends.scores.wealth >= 70) {
            advice.push("💰 Financial opportunities present themselves. Trust your " + (signData.element || 'cosmic') + " instincts for investments.");
        }

        // Peak day guidance
        if (weeklyTrends.peak) {
            advice.push(`🎯 ${weeklyTrends.peak.day} is your power day this week. Schedule important activities and decisions then.`);
        }

        return advice;
    }

    // Helper methods
    getDayName(dayIndex) {
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        return days[dayIndex];
    }

    getSignIndex(sign) {
        const signs = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
        return signs.indexOf(sign.toLowerCase());
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

    calculatePlanetStrength(planetKey, aspect, position) {
        // Default planet influences if planets object is not available
        const defaultPlanetInfluences = {
            sun: 0.8, moon: 0.7, mercury: 0.6, venus: 0.7, mars: 0.6,
            jupiter: 0.8, saturn: 0.7, uranus: 0.5, neptune: 0.5, pluto: 0.5
        };
        
        const baseStrength = (typeof planets !== 'undefined' && planets[planetKey]?.influence) 
            ? planets[planetKey].influence 
            : (defaultPlanetInfluences[planetKey] || 0.5);
        
        const aspectMultiplier = aspect.harmony;
        const retrogradeMultiplier = position?.isRetrograde ? 0.8 : 1.0;
        
        return baseStrength * aspectMultiplier * retrogradeMultiplier;
    }

    getPlanetInfluence(planetKey, aspect) {
        const influences = {
            sun: 'Core identity and vitality',
            moon: 'Emotions and intuition',
            mercury: 'Communication and thinking',
            venus: 'Love and relationships',
            mars: 'Energy and action',
            jupiter: 'Growth and opportunities',
            saturn: 'Structure and responsibility',
            uranus: 'Innovation and change',
            neptune: 'Dreams and spirituality',
            pluto: 'Transformation and power'
        };
        
        return influences[planetKey] || 'General influence';
    }

    // Additional helper methods would continue here...
    // (Implementing remaining methods for completeness)

    calculateDayEnergy(dayInfluences) {
        let totalEnergy = 0;
        let count = 0;
        
        Object.values(dayInfluences).forEach(influence => {
            totalEnergy += influence.strength;
            count++;
        });
        
        return count > 0 ? totalEnergy / count : 0.5;
    }

    getDayFocus(dayIndex, dayInfluences) {
        const focuses = [
            'New beginnings and fresh starts',
            'Building momentum and connections', 
            'Communication and planning',
            'Steady progress and development',
            'Creative expression and joy',
            'Reflection and relationships',
            'Rest and spiritual connection'
        ];
        
        return focuses[dayIndex];
    }

    calculateWeeklyScore(weeklyInfluences, weeklyTrends) {
        return {
            overall: Math.round(weeklyTrends.scores.overall),
            love: Math.round(weeklyTrends.scores.love),
            career: Math.round(weeklyTrends.scores.career),
            wealth: Math.round(weeklyTrends.scores.wealth),
            health: Math.round(weeklyTrends.scores.health)
        };
    }

    getFallbackWeeklyHoroscope(sign, startDate) {
        const weekStart = startDate || this.getWeekStart(new Date());
        const weekEnd = new Date(weekStart);
        weekEnd.setDate(weekStart.getDate() + 6);

        return {
            sign: sign,
            weekStart: weekStart.toISOString().split('T')[0],
            weekEnd: weekEnd.toISOString().split('T')[0],
            weekNumber: this.getWeekNumber(weekStart),
            overallScore: { overall: 65, love: 60, career: 70, wealth: 60, health: 65 },
            trends: { scores: { overall: 65 }, direction: 'stable' },
            bestDays: { 
                best: [{ day: 'Friday', date: weekStart.toISOString().split('T')[0], score: 0.8, recommendation: 'Good day for all activities' }],
                good: [{ day: 'Sunday', date: weekEnd.toISOString().split('T')[0], score: 0.7, recommendation: 'Favorable day for planning' }]
            },
            themes: [{ theme: 'Steady Progress', description: 'A week of consistent development', intensity: 0.7 }],
            advice: ['Focus on your natural strengths this week'],
            luckyElements: {
                colors: ['Blue', 'Silver'],
                numbers: [7, 14],
                days: ['Friday', 'Sunday'],
                gemstones: ['Crystal', 'Moonstone']
            },
            fallback: true,
            timestamp: Date.now()
        };
    }

    // Additional methods for weekly calculations would be implemented here
    generateWeeklyLuckyElements(sign, weekStart, weeklyInfluences) {
        // Default zodiac sign data
        const defaultSignData = {
            colors: ['Blue', 'Silver'],
            stones: ['Crystal', 'Moonstone']
        };
        
        // Try to get sign data from global zodiacSigns if available
        const signData = (typeof zodiacSigns !== 'undefined' && zodiacSigns[sign]) ? zodiacSigns[sign] : defaultSignData;
        
        return {
            colors: signData.colors || defaultSignData.colors,
            numbers: [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 10],
            days: ['Friday', 'Sunday'],
            gemstones: signData.stones || defaultSignData.stones
        };
    }

    identifyKeyWeeklyPlanets(weeklyInfluences) {
        // Implementation for identifying key planets
        return ['venus', 'mars'];
    }

    identifyWeeklyChallenges(weeklyInfluences) {
        const challenges = [];
        
        // 1. 分析每日能量水平，找出低能量日
        const lowEnergyDays = [];
        Object.entries(weeklyInfluences).forEach(([day, data]) => {
            if (data.energy < 0.4) {
                lowEnergyDays.push(day);
            }
        });
        
        if (lowEnergyDays.length > 0) {
            challenges.push(`Low energy levels on ${lowEnergyDays.join(' and ')} may require extra patience and self-care`);
        }
        
        // 2. 基于周中模式的挑战
        const midweekStress = Object.entries(weeklyInfluences).some(([day, data]) => 
            ['Wednesday', 'Thursday'].includes(day) && data.energy < 0.5
        );
        
        if (midweekStress) {
            challenges.push("Midweek communication and decision-making may need extra attention");
        }
        
        // 3. 周期性挑战模式
        const weeklyPatterns = [
            "Balancing work demands with personal time requires conscious planning",
            "Communication in relationships may need extra clarity and patience",
            "Time management becomes crucial as weekly responsibilities accumulate",
            "Energy fluctuations throughout the week require adaptive strategies",
            "Social obligations may compete with personal rest and recovery needs",
            "Financial decisions this week benefit from careful consideration",
            "Health routines may be disrupted by weekly schedule changes"
        ];
        
        // 随机选择1-2个适用的挑战
        const selectedChallenges = weeklyPatterns
            .sort(() => 0.5 - Math.random())
            .slice(0, 2);
        
        challenges.push(...selectedChallenges);
        
        // 4. 确保至少有2个挑战
        if (challenges.length < 2) {
            challenges.push("Weekly transitions require flexibility and patience");
            challenges.push("Managing multiple priorities needs focused attention");
        }
        
        // 去重并限制在2-3个
        const uniqueChallenges = [...new Set(challenges)];
        return uniqueChallenges.slice(0, 3);
    }

    identifyWeeklyOpportunities(weeklyInfluences) {
        return ['Strong networking potential', 'Creative breakthrough possible'];
    }

    findDominantWeeklyPlanets(weeklyInfluences) {
        return [{ name: 'venus', strength: 0.8 }];
    }

    findPeakDay(weeklyInfluences) {
        return { day: 'Friday', energy: 0.9 };
    }

    findLowDay(weeklyInfluences) {
        return { day: 'Tuesday', energy: 0.4 };
    }

    getTrendDirection(trends) {
        return trends.overall >= 70 ? 'rising' : trends.overall >= 50 ? 'stable' : 'declining';
    }

    calculateDayPlanetaryScore(planetary) {
        let score = 0;
        let count = 0;
        
        Object.values(planetary).forEach(planet => {
            score += planet.strength;
            count++;
        });
        
        return count > 0 ? score / count : 0.5;
    }

    getDayRecommendation(score, focus) {
        if (score >= 0.8) return 'Excellent day for important decisions and new initiatives';
        if (score >= 0.6) return 'Good day for productive activities and social connections';
        if (score >= 0.4) return 'Moderate day, focus on routine tasks and planning';
        return 'Challenging day, practice patience and avoid major decisions';
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