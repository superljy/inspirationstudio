// Cosmic Data and Celestial Information
const CosmicData = {
    // Zodiac Signs Data
    zodiacSigns: {
        aries: {
            name: 'Aries',
            symbol: '♈',
            element: 'Fire',
            quality: 'Cardinal',
            ruler: 'Mars',
            dates: 'Mar 21 - Apr 19',
            traits: ['Leadership', 'Courage', 'Impulsiveness'],
            compatibility: ['Leo', 'Sagittarius', 'Gemini', 'Aquarius']
        },
        taurus: {
            name: 'Taurus',
            symbol: '♉',
            element: 'Earth',
            quality: 'Fixed',
            ruler: 'Venus',
            dates: 'Apr 20 - May 20',
            traits: ['Stability', 'Sensuality', 'Determination'],
            compatibility: ['Virgo', 'Capricorn', 'Cancer', 'Pisces']
        },
        gemini: {
            name: 'Gemini',
            symbol: '♊',
            element: 'Air',
            quality: 'Mutable',
            ruler: 'Mercury',
            dates: 'May 21 - Jun 21',
            traits: ['Communication', 'Adaptability', 'Curiosity'],
            compatibility: ['Libra', 'Aquarius', 'Aries', 'Leo']
        },
        cancer: {
            name: 'Cancer',
            symbol: '♋',
            element: 'Water',
            quality: 'Cardinal',
            ruler: 'Moon',
            dates: 'Jun 22 - Jul 22',
            traits: ['Nurturing', 'Emotional', 'Protective'],
            compatibility: ['Scorpio', 'Pisces', 'Taurus', 'Virgo']
        },
        leo: {
            name: 'Leo',
            symbol: '♌',
            element: 'Fire',
            quality: 'Fixed',
            ruler: 'Sun',
            dates: 'Jul 23 - Aug 22',
            traits: ['Creativity', 'Confidence', 'Generosity'],
            compatibility: ['Aries', 'Sagittarius', 'Gemini', 'Libra']
        },
        virgo: {
            name: 'Virgo',
            symbol: '♍',
            element: 'Earth',
            quality: 'Mutable',
            ruler: 'Mercury',
            dates: 'Aug 23 - Sep 22',
            traits: ['Analysis', 'Service', 'Perfectionism'],
            compatibility: ['Taurus', 'Capricorn', 'Cancer', 'Scorpio']
        },
        libra: {
            name: 'Libra',
            symbol: '♎',
            element: 'Air',
            quality: 'Cardinal',
            ruler: 'Venus',
            dates: 'Sep 23 - Oct 23',
            traits: ['Balance', 'Harmony', 'Diplomacy'],
            compatibility: ['Gemini', 'Aquarius', 'Leo', 'Sagittarius']
        },
        scorpio: {
            name: 'Scorpio',
            symbol: '♏',
            element: 'Water',
            quality: 'Fixed',
            ruler: 'Pluto',
            dates: 'Oct 24 - Nov 22',
            traits: ['Intensity', 'Transformation', 'Mystery'],
            compatibility: ['Cancer', 'Pisces', 'Virgo', 'Capricorn']
        },
        sagittarius: {
            name: 'Sagittarius',
            symbol: '♐',
            element: 'Fire',
            quality: 'Mutable',
            ruler: 'Jupiter',
            dates: 'Nov 23 - Dec 21',
            traits: ['Adventure', 'Philosophy', 'Optimism'],
            compatibility: ['Aries', 'Leo', 'Libra', 'Aquarius']
        },
        capricorn: {
            name: 'Capricorn',
            symbol: '♑',
            element: 'Earth',
            quality: 'Cardinal',
            ruler: 'Saturn',
            dates: 'Dec 22 - Jan 19',
            traits: ['Ambition', 'Discipline', 'Responsibility'],
            compatibility: ['Taurus', 'Virgo', 'Scorpio', 'Pisces']
        },
        aquarius: {
            name: 'Aquarius',
            symbol: '♒',
            element: 'Air',
            quality: 'Fixed',
            ruler: 'Uranus',
            dates: 'Jan 20 - Feb 18',
            traits: ['Innovation', 'Independence', 'Humanitarianism'],
            compatibility: ['Gemini', 'Libra', 'Aries', 'Sagittarius']
        },
        pisces: {
            name: 'Pisces',
            symbol: '♓',
            element: 'Water',
            quality: 'Mutable',
            ruler: 'Neptune',
            dates: 'Feb 19 - Mar 20',
            traits: ['Intuition', 'Compassion', 'Creativity'],
            compatibility: ['Cancer', 'Scorpio', 'Taurus', 'Capricorn']
        }
    },

    // Planetary Data
    planets: {
        sun: {
            name: 'Sun',
            symbol: '☀️',
            meaning: 'Core identity, ego, life purpose',
            element: 'Fire',
            dayOfWeek: 'Sunday',
            color: 'Gold',
            metal: 'Gold'
        },
        moon: {
            name: 'Moon',
            symbol: '🌙',
            meaning: 'Emotions, instincts, subconscious',
            element: 'Water',
            dayOfWeek: 'Monday',
            color: 'Silver',
            metal: 'Silver'
        },
        mercury: {
            name: 'Mercury',
            symbol: '☿',
            meaning: 'Communication, thinking, learning',
            element: 'Air',
            dayOfWeek: 'Wednesday',
            color: 'Gray',
            metal: 'Mercury'
        },
        venus: {
            name: 'Venus',
            symbol: '♀',
            meaning: 'Love, beauty, values, relationships',
            element: 'Earth',
            dayOfWeek: 'Friday',
            color: 'Green',
            metal: 'Copper'
        },
        mars: {
            name: 'Mars',
            symbol: '♂',
            meaning: 'Action, energy, passion, conflict',
            element: 'Fire',
            dayOfWeek: 'Tuesday',
            color: 'Red',
            metal: 'Iron'
        },
        jupiter: {
            name: 'Jupiter',
            symbol: '♃',
            meaning: 'Expansion, luck, philosophy',
            element: 'Fire',
            dayOfWeek: 'Thursday',
            color: 'Purple',
            metal: 'Tin'
        },
        saturn: {
            name: 'Saturn',
            symbol: '♄',
            meaning: 'Discipline, responsibility, limitations',
            element: 'Earth',
            dayOfWeek: 'Saturday',
            color: 'Black',
            metal: 'Lead'
        },
        uranus: {
            name: 'Uranus',
            symbol: '♅',
            meaning: 'Innovation, rebellion, sudden changes',
            element: 'Air',
            color: 'Electric Blue',
            metal: 'Uranium'
        },
        neptune: {
            name: 'Neptune',
            symbol: '♆',
            meaning: 'Dreams, intuition, spirituality',
            element: 'Water',
            color: 'Sea Blue',
            metal: 'Platinum'
        },
        pluto: {
            name: 'Pluto',
            symbol: '♇',
            meaning: 'Transformation, power, regeneration',
            element: 'Water',
            color: 'Deep Purple',
            metal: 'Plutonium'
        }
    },

    // Astrological Houses
    houses: {
        1: {
            name: 'First House',
            meaning: 'Self, Identity, Appearance',
            naturalSign: 'Aries',
            naturalRuler: 'Mars',
            keywords: ['Personality', 'First impressions', 'Physical body']
        },
        2: {
            name: 'Second House',
            meaning: 'Money, Possessions, Values',
            naturalSign: 'Taurus',
            naturalRuler: 'Venus',
            keywords: ['Material resources', 'Self-worth', 'Talents']
        },
        3: {
            name: 'Third House',
            meaning: 'Communication, Learning, Siblings',
            naturalSign: 'Gemini',
            naturalRuler: 'Mercury',
            keywords: ['Short trips', 'Daily communication', 'Learning']
        },
        4: {
            name: 'Fourth House',
            meaning: 'Home, Family, Roots',
            naturalSign: 'Cancer',
            naturalRuler: 'Moon',
            keywords: ['Ancestry', 'Emotional foundation', 'Private life']
        },
        5: {
            name: 'Fifth House',
            meaning: 'Creativity, Romance, Children',
            naturalSign: 'Leo',
            naturalRuler: 'Sun',
            keywords: ['Creative expression', 'Joy', 'Recreation']
        },
        6: {
            name: 'Sixth House',
            meaning: 'Health, Work, Service',
            naturalSign: 'Virgo',
            naturalRuler: 'Mercury',
            keywords: ['Daily routine', 'Health habits', 'Service to others']
        },
        7: {
            name: 'Seventh House',
            meaning: 'Partnerships, Marriage, Others',
            naturalSign: 'Libra',
            naturalRuler: 'Venus',
            keywords: ['Committed relationships', 'Business partnerships', 'Open enemies']
        },
        8: {
            name: 'Eighth House',
            meaning: 'Transformation, Shared Resources',
            naturalSign: 'Scorpio',
            naturalRuler: 'Pluto',
            keywords: ['Death and rebirth', 'Shared finances', 'Occult']
        },
        9: {
            name: 'Ninth House',
            meaning: 'Philosophy, Higher Learning, Travel',
            naturalSign: 'Sagittarius',
            naturalRuler: 'Jupiter',
            keywords: ['Higher education', 'Long-distance travel', 'Spirituality']
        },
        10: {
            name: 'Tenth House',
            meaning: 'Career, Reputation, Public Image',
            naturalSign: 'Capricorn',
            naturalRuler: 'Saturn',
            keywords: ['Professional life', 'Social status', 'Authority']
        },
        11: {
            name: 'Eleventh House',
            meaning: 'Friends, Groups, Hopes',
            naturalSign: 'Aquarius',
            naturalRuler: 'Uranus',
            keywords: ['Social networks', 'Future goals', 'Group activities']
        },
        12: {
            name: 'Twelfth House',
            meaning: 'Spirituality, Subconscious, Hidden',
            naturalSign: 'Pisces',
            naturalRuler: 'Neptune',
            keywords: ['Hidden enemies', 'Spiritual growth', 'Sacrifice']
        }
    },

    // Moon Phases
    moonPhases: {
        newMoon: {
            name: 'New Moon',
            symbol: '🌑',
            meaning: 'New beginnings, setting intentions',
            energy: 'Planting seeds, fresh starts'
        },
        waxingCrescent: {
            name: 'Waxing Crescent',
            symbol: '🌒',
            meaning: 'Building momentum, taking action',
            energy: 'Growing intentions, first steps'
        },
        firstQuarter: {
            name: 'First Quarter',
            symbol: '🌓',
            meaning: 'Challenges, decision-making',
            energy: 'Overcoming obstacles, commitment'
        },
        waxingGibbous: {
            name: 'Waxing Gibbous',
            symbol: '🌔',
            meaning: 'Refinement, adjustment',
            energy: 'Fine-tuning, perseverance'
        },
        fullMoon: {
            name: 'Full Moon',
            symbol: '🌕',
            meaning: 'Culmination, release, manifestation',
            energy: 'Peak energy, completion, revelation'
        },
        waningGibbous: {
            name: 'Waning Gibbous',
            symbol: '🌖',
            meaning: 'Gratitude, sharing wisdom',
            energy: 'Reflection, teaching, giving back'
        },
        lastQuarter: {
            name: 'Last Quarter',
            symbol: '🌗',
            meaning: 'Release, forgiveness',
            energy: 'Letting go, forgiveness, clearing'
        },
        waningCrescent: {
            name: 'Waning Crescent',
            symbol: '🌘',
            meaning: 'Rest, reflection, preparation',
            energy: 'Introspection, healing, preparation'
        }
    },

    // Elements and Qualities
    elements: {
        fire: {
            name: 'Fire',
            signs: ['Aries', 'Leo', 'Sagittarius'],
            qualities: ['Passionate', 'Energetic', 'Spontaneous', 'Enthusiastic'],
            keywords: ['Action', 'Inspiration', 'Spirit', 'Creativity']
        },
        earth: {
            name: 'Earth',
            signs: ['Taurus', 'Virgo', 'Capricorn'],
            qualities: ['Practical', 'Stable', 'Grounded', 'Reliable'],
            keywords: ['Material', 'Sensual', 'Physical', 'Structured']
        },
        air: {
            name: 'Air',
            signs: ['Gemini', 'Libra', 'Aquarius'],
            qualities: ['Intellectual', 'Social', 'Communicative', 'Objective'],
            keywords: ['Mental', 'Ideas', 'Communication', 'Social']
        },
        water: {
            name: 'Water',
            signs: ['Cancer', 'Scorpio', 'Pisces'],
            qualities: ['Emotional', 'Intuitive', 'Sensitive', 'Psychic'],
            keywords: ['Feeling', 'Intuition', 'Emotion', 'Subconscious']
        }
    },

    qualities: {
        cardinal: {
            name: 'Cardinal',
            signs: ['Aries', 'Cancer', 'Libra', 'Capricorn'],
            meaning: 'Initiators, leaders, starters',
            energy: 'Beginning, leadership, action'
        },
        fixed: {
            name: 'Fixed',
            signs: ['Taurus', 'Leo', 'Scorpio', 'Aquarius'],
            meaning: 'Maintainers, persistent, stable',
            energy: 'Sustaining, determination, focus'
        },
        mutable: {
            name: 'Mutable',
            signs: ['Gemini', 'Virgo', 'Sagittarius', 'Pisces'],
            meaning: 'Adapters, flexible, changeable',
            energy: 'Transformation, adaptability, change'
        }
    },

    // Aspects
    aspects: {
        conjunction: {
            name: 'Conjunction',
            symbol: '☌',
            angle: 0,
            orb: 8,
            meaning: 'Unity, blending of energies',
            nature: 'Neutral'
        },
        sextile: {
            name: 'Sextile',
            symbol: '⚹',
            angle: 60,
            orb: 6,
            meaning: 'Opportunity, harmony',
            nature: 'Positive'
        },
        square: {
            name: 'Square',
            symbol: '□',
            angle: 90,
            orb: 8,
            meaning: 'Tension, challenge, growth',
            nature: 'Challenging'
        },
        trine: {
            name: 'Trine',
            symbol: '△',
            angle: 120,
            orb: 8,
            meaning: 'Flow, ease, natural talent',
            nature: 'Positive'
        },
        opposition: {
            name: 'Opposition',
            symbol: '☍',
            angle: 180,
            orb: 8,
            meaning: 'Balance, integration, awareness',
            nature: 'Challenging'
        }
    }
};

// Utility functions for cosmic calculations
const CosmicUtils = {
    // Get current moon phase
    getCurrentMoonPhase() {
        const date = new Date();
        const phases = Object.keys(CosmicData.moonPhases);
        const phaseIndex = Math.floor((date.getDate() / 30) * phases.length) % phases.length;
        return CosmicData.moonPhases[phases[phaseIndex]];
    },

    // Get zodiac sign for a given date
    getZodiacSign(month, day) {
        const zodiacDates = [
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

        for (const zodiac of zodiacDates) {
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
        return 'capricorn'; // Default fallback
    },

    // Get compatibility score between two signs
    getCompatibilityScore(sign1, sign2) {
        const signData1 = CosmicData.zodiacSigns[sign1];
        const signData2 = CosmicData.zodiacSigns[sign2];
        
        if (!signData1 || !signData2) return 50;
        
        // Check if they're in each other's compatibility list
        if (signData1.compatibility.includes(signData2.name) || 
            signData2.compatibility.includes(signData1.name)) {
            return 85 + Math.floor(Math.random() * 15); // 85-100%
        }
        
        // Check element compatibility
        if (signData1.element === signData2.element) {
            return 70 + Math.floor(Math.random() * 15); // 70-85%
        }
        
        // Check complementary elements
        const complementary = {
            'Fire': 'Air',
            'Air': 'Fire',
            'Earth': 'Water',
            'Water': 'Earth'
        };
        
        if (complementary[signData1.element] === signData2.element) {
            return 65 + Math.floor(Math.random() * 15); // 65-80%
        }
        
        // Default compatibility
        return 40 + Math.floor(Math.random() * 30); // 40-70%
    },

    // Get element information for a sign
    getElementInfo(sign) {
        const signData = CosmicData.zodiacSigns[sign];
        if (!signData) return null;
        
        return CosmicData.elements[signData.element.toLowerCase()];
    },

    // Get quality information for a sign
    getQualityInfo(sign) {
        const signData = CosmicData.zodiacSigns[sign];
        if (!signData) return null;
        
        return CosmicData.qualities[signData.quality.toLowerCase()];
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { CosmicData, CosmicUtils };
} 