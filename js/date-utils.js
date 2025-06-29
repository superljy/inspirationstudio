// Date and Time Utility Functions for Astrological Calculations
class DateUtils {
    constructor() {
        this.monthNames = [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ];
        
        this.dayNames = [
            'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
        ];
        
        this.zodiacDates = [
            { sign: 'capricorn', start: [12, 22], end: [1, 19] },
            { sign: 'aquarius', start: [1, 20], end: [2, 18] },
            { sign: 'pisces', start: [2, 19], end: [3, 20] },
            { sign: 'aries', start: [3, 21], end: [4, 19] },
            { sign: 'taurus', start: [4, 20], end: [5, 20] },
            { sign: 'gemini', start: [5, 21], end: [6, 21] },
            { sign: 'cancer', start: [6, 22], end: [7, 22] },
            { sign: 'leo', start: [7, 23], end: [8, 22] },
            { sign: 'virgo', start: [8, 23], end: [9, 22] },
            { sign: 'libra', start: [9, 23], end: [10, 23] },
            { sign: 'scorpio', start: [10, 24], end: [11, 22] },
            { sign: 'sagittarius', start: [11, 23], end: [12, 21] }
        ];
    }

    // Format date for display
    formatDate(date, format = 'full') {
        if (!(date instanceof Date)) {
            date = new Date(date);
        }
        
        const day = date.getDate();
        const month = date.getMonth();
        const year = date.getFullYear();
        const weekDay = date.getDay();
        
        switch (format) {
            case 'full':
                return `${this.dayNames[weekDay]}, ${this.monthNames[month]} ${day}, ${year}`;
            case 'short':
                return `${this.monthNames[month]} ${day}, ${year}`;
            case 'numeric':
                return `${month + 1}/${day}/${year}`;
            case 'iso':
                return date.toISOString().split('T')[0];
            default:
                return date.toLocaleDateString();
        }
    }

    // Get current date information
    getCurrentDateInfo() {
        const now = new Date();
        return {
            date: now,
            formatted: this.formatDate(now),
            dayOfWeek: this.dayNames[now.getDay()],
            month: this.monthNames[now.getMonth()],
            year: now.getFullYear(),
            dayOfYear: this.getDayOfYear(now),
            weekOfYear: this.getWeekOfYear(now),
            zodiacSign: this.getZodiacSign(now.getMonth() + 1, now.getDate())
        };
    }

    // Get day of year (1-366)
    getDayOfYear(date) {
        const start = new Date(date.getFullYear(), 0, 0);
        const diff = date - start;
        return Math.floor(diff / (1000 * 60 * 60 * 24));
    }

    // Get week of year
    getWeekOfYear(date) {
        const firstDay = new Date(date.getFullYear(), 0, 1);
        const pastDaysOfYear = (date - firstDay) / 86400000;
        return Math.ceil((pastDaysOfYear + firstDay.getDay() + 1) / 7);
    }

    // Get zodiac sign for a given date
    getZodiacSign(month, day) {
        for (const zodiac of this.zodiacDates) {
            const [startMonth, startDay] = zodiac.start;
            const [endMonth, endDay] = zodiac.end;

            if (startMonth === endMonth) {
                if (month === startMonth && day >= startDay && day <= endDay) {
                    return zodiac.sign;
                }
            } else {
                if ((month === startMonth && day >= startDay) || 
                    (month === endMonth && day <= endDay)) {
                    return zodiac.sign;
                }
            }
        }
        return 'capricorn';
    }

    // Calculate age from birth date
    calculateAge(birthDate) {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    }

    // Get lunar phase information
    getLunarPhase(date = new Date()) {
        // Simplified lunar phase calculation
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Known new moon date (approximate)
        const knownNewMoon = new Date(2025, 0, 11); // January 11, 2025
        const daysSinceKnown = Math.floor((date - knownNewMoon) / (1000 * 60 * 60 * 24));
        const lunarCycle = 29.53; // Average lunar cycle in days
        const phase = (daysSinceKnown % lunarCycle) / lunarCycle;
        
        if (phase < 0.03 || phase > 0.97) return 'New Moon 🌑';
        if (phase < 0.22) return 'Waxing Crescent 🌒';
        if (phase < 0.28) return 'First Quarter 🌓';
        if (phase < 0.47) return 'Waxing Gibbous 🌔';
        if (phase < 0.53) return 'Full Moon 🌕';
        if (phase < 0.72) return 'Waning Gibbous 🌖';
        if (phase < 0.78) return 'Last Quarter 🌗';
        return 'Waning Crescent 🌘';
    }

    // Get seasonal information
    getSeasonInfo(date = new Date()) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        
        // Northern Hemisphere seasons
        if ((month === 12 && day >= 21) || month === 1 || month === 2 || (month === 3 && day < 21)) {
            return { season: 'Winter', emoji: '❄️', energy: 'Reflection and Rest' };
        } else if ((month === 3 && day >= 21) || month === 4 || month === 5 || (month === 6 && day < 21)) {
            return { season: 'Spring', emoji: '🌸', energy: 'Growth and Renewal' };
        } else if ((month === 6 && day >= 21) || month === 7 || month === 8 || (month === 9 && day < 23)) {
            return { season: 'Summer', emoji: '☀️', energy: 'Abundance and Activity' };
        } else {
            return { season: 'Autumn', emoji: '🍂', energy: 'Harvest and Preparation' };
        }
    }

    // Parse time string to decimal hours
    parseTimeToDecimal(timeString) {
        const [hours, minutes] = timeString.split(':').map(Number);
        return hours + (minutes / 60);
    }

    // Convert decimal hours back to time string
    decimalToTimeString(decimal) {
        const hours = Math.floor(decimal);
        const minutes = Math.round((decimal - hours) * 60);
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Calculate time zone offset
    getTimezoneOffset() {
        const offset = new Date().getTimezoneOffset();
        const hours = Math.floor(Math.abs(offset) / 60);
        const minutes = Math.abs(offset) % 60;
        const sign = offset <= 0 ? '+' : '-';
        return `UTC${sign}${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    }

    // Get planetary hours (traditional astrological timing)
    getPlanetaryHour(date = new Date()) {
        const planets = ['Sun', 'Venus', 'Mercury', 'Moon', 'Saturn', 'Jupiter', 'Mars'];
        const dayOfWeek = date.getDay();
        const hour = date.getHours();
        
        // Each day starts with its ruling planet
        const dayRulers = ['Sun', 'Moon', 'Mars', 'Mercury', 'Jupiter', 'Venus', 'Saturn'];
        const startPlanet = dayRulers[dayOfWeek];
        const startIndex = planets.indexOf(startPlanet);
        
        const planetIndex = (startIndex + hour) % 7;
        return planets[planetIndex];
    }

    // Validate birth data
    validateBirthData(date, time, location) {
        const errors = [];
        
        // Validate date
        if (!date) {
            errors.push('Birth date is required');
        } else {
            const birthDate = new Date(date);
            const now = new Date();
            
            if (birthDate > now) {
                errors.push('Birth date cannot be in the future');
            }
            
            if (birthDate < new Date('1900-01-01')) {
                errors.push('Birth date seems too far in the past');
            }
        }
        
        // Validate time
        if (!time) {
            errors.push('Birth time is required for accurate analysis');
        } else {
            const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
            if (!timeRegex.test(time)) {
                errors.push('Please enter a valid time in HH:MM format');
            }
        }
        
        // Validate location
        if (!location || location.trim().length < 2) {
            errors.push('Birth location is required');
        }
        
        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // Get astrological timing advice
    getTimingAdvice(date = new Date()) {
        const dayOfWeek = date.getDay();
        const hour = date.getHours();
        const lunarPhase = this.getLunarPhase(date);
        const planetaryHour = this.getPlanetaryHour(date);
        
        const dayAdvice = {
            0: 'Sunday - Day of the Sun. Good for self-expression and leadership.',
            1: 'Monday - Day of the Moon. Ideal for emotional matters and family.',
            2: 'Tuesday - Day of Mars. Perfect for action and assertiveness.',
            3: 'Wednesday - Day of Mercury. Excellent for communication and learning.',
            4: 'Thursday - Day of Jupiter. Great for expansion and opportunities.',
            5: 'Friday - Day of Venus. Wonderful for love and artistic pursuits.',
            6: 'Saturday - Day of Saturn. Best for discipline and long-term planning.'
        };
        
        return {
            dayAdvice: dayAdvice[dayOfWeek],
            lunarPhase: lunarPhase,
            planetaryHour: `Current planetary hour: ${planetaryHour}`,
            timing: this.getOptimalTiming(date)
        };
    }

    // Get optimal timing recommendations
    getOptimalTiming(date = new Date()) {
        const hour = date.getHours();
        
        if (hour >= 5 && hour < 9) {
            return 'Dawn hours - Excellent for new beginnings and meditation';
        } else if (hour >= 9 && hour < 12) {
            return 'Morning hours - Ideal for important communications and decisions';
        } else if (hour >= 12 && hour < 15) {
            return 'Noon hours - Perfect for peak energy activities and leadership';
        } else if (hour >= 15 && hour < 18) {
            return 'Afternoon hours - Good for collaboration and relationships';
        } else if (hour >= 18 && hour < 21) {
            return 'Evening hours - Great for reflection and planning';
        } else {
            return 'Night hours - Best for introspection and spiritual practices';
        }
    }

    // Calculate biorhythm cycles
    calculateBiorhythms(birthDate) {
        const birth = new Date(birthDate);
        const today = new Date();
        const daysSinceBirth = Math.floor((today - birth) / (1000 * 60 * 60 * 24));
        
        // Standard biorhythm cycles
        const physical = Math.sin(2 * Math.PI * daysSinceBirth / 23) * 100;
        const emotional = Math.sin(2 * Math.PI * daysSinceBirth / 28) * 100;
        const intellectual = Math.sin(2 * Math.PI * daysSinceBirth / 33) * 100;
        
        return {
            physical: Math.round(physical),
            emotional: Math.round(emotional),
            intellectual: Math.round(intellectual),
            daysSinceBirth: daysSinceBirth
        };
    }
}

// Utility functions for common date operations
const dateUtils = new DateUtils();

// Helper functions for easy access
function getCurrentDate() {
    return dateUtils.getCurrentDateInfo();
}

function formatCurrentDate() {
    return dateUtils.formatDate(new Date());
}

function getCurrentLunarPhase() {
    return dateUtils.getLunarPhase();
}

function getCurrentSeason() {
    return dateUtils.getSeasonInfo();
}

function getPlanetaryHour() {
    return dateUtils.getPlanetaryHour();
}

function getTimingAdvice() {
    return dateUtils.getTimingAdvice();
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DateUtils, dateUtils, getCurrentDate, formatCurrentDate, getCurrentLunarPhase, getCurrentSeason, getPlanetaryHour, getTimingAdvice };
} 