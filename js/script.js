// Professional Astrological Fortune Calculation System - Advanced Version
// Based on traditional astrology and modern astrological theories

// Precise planetary data and influence system
const planets = {
    sun: { 
        name: 'Sun', 
        symbol: '☉',
        influence: 1.0, 
        keywords: ['Self', 'Willpower', 'Leadership', 'Authority', 'Vitality', 'Father', 'Creation'],
        houses: [1, 5],
        aspects: ['Conjunction', 'Opposition', 'Trine', 'Square', 'Sextile'],
        orbitalPeriod: 365.25,
        avgDaily: 0.9856,
        dignity: { exaltation: 'aries', detriment: 'aquarius', fall: 'libra' }
    },
    moon: { 
        name: 'Moon', 
        symbol: '☽',
        influence: 0.9, 
        keywords: ['Emotions', 'Intuition', 'Memory', 'Maternal', 'Subconscious', 'Family', 'Security'],
        houses: [4, 2],
        aspects: ['Conjunction', 'Sextile', 'Trine', 'Square'],
        orbitalPeriod: 27.32,
        avgDaily: 13.176,
        dignity: { exaltation: 'taurus', detriment: 'capricorn', fall: 'scorpio' }
    },
    mercury: { 
        name: 'Mercury', 
        symbol: '☿',
        influence: 0.7, 
        keywords: ['Communication', 'Thinking', 'Learning', 'Travel', 'Business', 'Skills', 'Adaptation'],
        houses: [3, 6],
        aspects: ['Conjunction', 'Sextile', 'Square', 'Trine'],
        orbitalPeriod: 87.97,
        avgDaily: 4.092,
        dignity: { exaltation: 'virgo', detriment: 'sagittarius', fall: 'pisces' }
    },
    venus: { 
        name: 'Venus', 
        symbol: '♀',
        influence: 0.8, 
        keywords: ['Love', 'Aesthetics', 'Money', 'Harmony', 'Art', 'Values', 'Enjoyment'],
        houses: [2, 7],
        aspects: ['Conjunction', 'Trine', 'Sextile', 'Square'],
        orbitalPeriod: 224.7,
        avgDaily: 1.602,
        dignity: { exaltation: 'pisces', detriment: 'aries', fall: 'virgo' }
    },
    mars: { 
        name: 'Mars', 
        symbol: '♂',
        influence: 0.7, 
        keywords: ['Action', 'Impulse', 'Competition', 'Sexual Energy', 'Courage', 'Conflict', 'Pioneering'],
        houses: [1, 8],
        aspects: ['Opposition', 'Square', 'Conjunction', 'Trine'],
        orbitalPeriod: 686.98,
        avgDaily: 0.524,
        dignity: { exaltation: 'capricorn', detriment: 'libra', fall: 'cancer' }
    },
    jupiter: { 
        name: 'Jupiter', 
        symbol: '♃',
        influence: 0.6, 
        keywords: ['Expansion', 'Philosophy', 'Luck', 'Wisdom', 'Religion', 'Law', 'Higher Education'],
        houses: [9, 12],
        aspects: ['Trine', 'Sextile', 'Conjunction', 'Opposition'],
        orbitalPeriod: 4332.59,
        avgDaily: 0.083,
        dignity: { exaltation: 'cancer', detriment: 'gemini', fall: 'capricorn' }
    },
    saturn: { 
        name: 'Saturn', 
        symbol: '♄',
        influence: 0.5, 
        keywords: ['Restriction', 'Responsibility', 'Structure', 'Time', 'Authority', 'Discipline', 'Maturity'],
        houses: [10, 11],
        aspects: ['Square', 'Opposition', 'Conjunction', 'Trine'],
        orbitalPeriod: 10759.22,
        avgDaily: 0.033,
        dignity: { exaltation: 'libra', detriment: 'cancer', fall: 'aries' }
    },
    uranus: {
        name: 'Uranus',
        symbol: '♅',
        influence: 0.4,
        keywords: ['Innovation', 'Breakthrough', 'Freedom', 'Technology', 'Rebellion', 'Independence', 'Future'],
        houses: [11, 1],
        aspects: ['Square', 'Opposition', 'Conjunction', 'Trine'],
        orbitalPeriod: 30688.5,
        avgDaily: 0.012,
        dignity: { exaltation: 'scorpio', detriment: 'leo', fall: 'taurus' }
    },
    neptune: {
        name: 'Neptune',
        symbol: '♆',
        influence: 0.4,
        keywords: ['Dreams', 'Illusion', 'Spirituality', 'Art', 'Compassion', 'Sacrifice', 'Deception'],
        houses: [12, 9],
        aspects: ['Trine', 'Sextile', 'Square', 'Conjunction'],
        orbitalPeriod: 60190,
        avgDaily: 0.006,
        dignity: { exaltation: 'leo', detriment: 'virgo', fall: 'aquarius' }
    },
    pluto: {
        name: 'Pluto',
        symbol: '♇',
        influence: 0.3,
        keywords: ['Transformation', 'Rebirth', 'Deep', 'Power', 'Death', 'Regeneration', 'Hidden'],
        houses: [8, 1],
        aspects: ['Conjunction', 'Square', 'Opposition', 'Trine'],
        orbitalPeriod: 90465,
        avgDaily: 0.004,
        dignity: { exaltation: 'leo', detriment: 'taurus', fall: 'aquarius' }
    },
    northNode: {
        name: 'North Node',
        symbol: '☊',
        influence: 0.3,
        keywords: ['Destiny', 'Growth', 'Goals', 'Future', 'Development', 'Learning'],
        orbitalPeriod: 6798.38,
        avgDaily: -0.053,
        isNode: true
    },
    southNode: {
        name: 'South Node',
        symbol: '☋',
        influence: 0.2,
        keywords: ['Past', 'Talents', 'Habits', 'Release', 'Completion'],
        orbitalPeriod: 6798.38,
        avgDaily: -0.053,
        isNode: true
    }
};

// Enhanced astrological twelve houses system
const houses = {
    1: { 
        name: 'First House (Ascendant)', 
        theme: 'Self-image, personality, appearance, first impression', 
        keywords: ['Identity', 'Appearance', 'Beginning', 'Vitality'],
        element: 'cardinal',
        significance: 'angular'
    },
    2: { 
        name: 'Second House', 
        theme: 'Money, material possessions, values, self-worth', 
        keywords: ['Income', 'Property', 'Values', 'Resources'],
        element: 'fixed',
        significance: 'succedent'
    },
    3: { 
        name: 'Third House', 
        theme: 'Communication, learning, short trips, siblings', 
        keywords: ['Communication', 'Thinking', 'Learning', 'Neighbors'],
        element: 'mutable',
        significance: 'cadent'
    },
    4: { 
        name: 'Fourth House (Nadir)', 
        theme: 'Family, roots, property, inner self', 
        keywords: ['Family', 'Childhood', 'Roots', 'Privacy'],
        element: 'cardinal',
        significance: 'angular'
    },
    5: { 
        name: 'Fifth House', 
        theme: 'Creativity, romance, entertainment, children', 
        keywords: ['Creativity', 'Love', 'Entertainment', 'Speculation'],
        element: 'fixed',
        significance: 'succedent'
    },
    6: { 
        name: 'Sixth House', 
        theme: 'Work, health, daily routine, service', 
        keywords: ['Work', 'Health', 'Service', 'Habits'],
        element: 'mutable',
        significance: 'cadent'
    },
    7: { 
        name: 'Seventh House (Descendant)', 
        theme: 'Partnerships, marriage, open enemies, cooperation', 
        keywords: ['Partners', 'Marriage', 'Cooperation', 'Others'],
        element: 'cardinal',
        significance: 'angular'
    },
    8: { 
        name: 'Eighth House', 
        theme: 'Deep transformation, death, others\' resources, mysteries', 
        keywords: ['Transformation', 'Shared', 'Investment', 'Mysteries'],
        element: 'fixed',
        significance: 'succedent'
    },
    9: { 
        name: 'Ninth House', 
        theme: 'Philosophy, higher education, long journeys, religion', 
        keywords: ['Philosophy', 'Education', 'Travel', 'Beliefs'],
        element: 'mutable',
        significance: 'cadent'
    },
    10: { 
        name: 'Tenth House (Midheaven)', 
        theme: 'Career, reputation, social status, goals', 
        keywords: ['Career', 'Fame', 'Authority', 'Goals'],
        element: 'cardinal',
        significance: 'angular'
    },
    11: { 
        name: 'Eleventh House', 
        theme: 'Friends, hopes, groups, social consciousness', 
        keywords: ['Friendship', 'Hopes', 'Social', 'Ideals'],
        element: 'fixed',
        significance: 'succedent'
    },
    12: { 
        name: 'Twelfth House', 
        theme: 'Subconscious, hidden, charity, karma', 
        keywords: ['Subconscious', 'Hidden', 'Spiritual', 'Sacrifice'],
        element: 'mutable',
        significance: 'cadent'
    }
};

// Precise lunar phase system
const moonPhases = {
    newMoon: { 
        name: 'New Moon', 
        symbol: '🌑',
        influence: 0.3, 
        keywords: ['New Beginnings', 'Seeds', 'Intention Setting', 'Introspection'],
        energy: 'Inward Gathering',
        bestFor: ['Making Plans', 'Meditation', 'Setting Intentions']
    },
    waxingCrescent: { 
        name: 'Waxing Crescent', 
        symbol: '🌒',
        influence: 0.5, 
        keywords: ['Growth', 'Building', 'Accumulation', 'Action'],
        energy: 'Outward Expansion',
        bestFor: ['Taking Action', 'Learning New Skills', 'Building Relationships']
    },
    firstQuarter: { 
        name: 'First Quarter', 
        symbol: '🌓',
        influence: 0.7, 
        keywords: ['Challenges', 'Decisions', 'Action', 'Breakthroughs'],
        energy: 'Dynamic Balance',
        bestFor: ['Making Decisions', 'Overcoming Obstacles', 'Adjusting Plans']
    },
    waxingGibbous: { 
        name: 'Waxing Gibbous', 
        symbol: '🌔',
        influence: 0.8, 
        keywords: ['Refinement', 'Perfection', 'Persistence', 'Preparation'],
        energy: 'Approaching Completion',
        bestFor: ['Refining Details', 'Strengthening Efforts', 'Preparing for Harvest']
    },
    fullMoon: { 
        name: 'Full Moon', 
        symbol: '🌕',
        influence: 1.0, 
        keywords: ['Culmination', 'Completion', 'Release', 'Awakening'],
        energy: 'Polarized Manifestation',
        bestFor: ['Completing Projects', 'Celebrating Achievements', 'Releasing Emotions']
    },
    waningGibbous: { 
        name: 'Waning Gibbous', 
        symbol: '🌖',
        influence: 0.8, 
        keywords: ['Gratitude', 'Sharing', 'Distribution', 'Giving'],
        energy: 'Outward Giving',
        bestFor: ['Sharing Results', 'Teaching Others', 'Giving Back']
    },
    lastQuarter: { 
        name: 'Last Quarter', 
        symbol: '🌗',
        influence: 0.5, 
        keywords: ['Release', 'Clearing', 'Reflection', 'Letting Go'],
        energy: 'Inward Clearing',
        bestFor: ['Decluttering', 'Forgiveness', 'Environmental Clearing']
    },
    waningCrescent: { 
        name: 'Waning Crescent', 
        symbol: '🌘',
        influence: 0.3, 
        keywords: ['Rest', 'Recovery', 'Preparation', 'Contemplation'],
        energy: 'Deep Internalization',
        bestFor: ['Rest and Recovery', 'Deep Thinking', 'Preparing for New Cycle']
    }
};

// Precise planetary aspect angle system
const aspectAngles = {
    conjunction: { 
        name: 'Conjunction', 
        symbol: '☌',
        angle: 0, 
        orb: 8, 
        nature: 'neutral', 
        strength: 1.0,
        meaning: 'Energy fusion, enhanced influence'
    },
    sextile: { 
        name: 'Sextile', 
        symbol: '⚹',
        angle: 60, 
        orb: 6, 
        nature: 'harmonious', 
        strength: 0.6,
        meaning: 'Harmonious opportunities, easy development'
    },
    square: { 
        name: 'Square', 
        symbol: '□',
        angle: 90, 
        orb: 8, 
        nature: 'challenging', 
        strength: 0.8,
        meaning: 'Tension and conflict, action required'
    },
    trine: { 
        name: 'Trine', 
        symbol: '△',
        angle: 120, 
        orb: 8, 
        nature: 'harmonious', 
        strength: 0.9,
        meaning: 'Natural harmony, innate talents'
    },
    opposition: { 
        name: 'Opposition', 
        symbol: '☍',
        angle: 180, 
        orb: 8, 
        nature: 'challenging', 
        strength: 1.0,
        meaning: 'Polar opposition, balance needed'
    },
    quintile: {
        name: 'Quintile',
        symbol: 'Q',
        angle: 72,
        orb: 2,
        nature: 'creative',
        strength: 0.4,
        meaning: 'Creative gifts, special talents'
    },
    semisextile: {
        name: 'Semisextile',
        symbol: '⚺',
        angle: 30,
        orb: 3,
        nature: 'minor',
        strength: 0.3,
        meaning: 'Subtle adjustments, potential opportunities'
    }
};

// Enhanced elemental properties
const elementProperties = {
    fire: {
        quality: 'Active and Enterprising',
        energy: 'Yang',
        season: ['Spring', 'Summer'],
        colors: ['Flame Red', 'Sun Orange', 'Vibrant Yellow', 'Passionate Gold'],
        stones: ['Ruby', 'Garnet', 'Citrine', 'Amber', 'Fire Agate'],
        herbs: ['Cinnamon', 'Clove', 'Rosemary', 'Ginger', 'Chili'],
        metals: ['Gold', 'Iron'],
        direction: 'South',
        keywords: ['Passion', 'Impulse', 'Leadership', 'Creation', 'Courage']
    },
    earth: {
        quality: 'Stable and Practical',
        energy: 'Yin',
        season: ['Autumn'],
        colors: ['Earth Brown', 'Forest Green', 'Stable Beige', 'Calm Black'],
        stones: ['Jade', 'Agate', 'Tiger Eye', 'Jasper', 'Malachite'],
        herbs: ['Sage', 'Lavender', 'Cedar', 'Patchouli'],
        metals: ['Copper', 'Lead'],
        direction: 'North',
        keywords: ['Stability', 'Practical', 'Reliable', 'Patient', 'Material']
    },
    air: {
        quality: 'Flexible and Adaptable',
        energy: 'Yang',
        season: ['Spring'],
        colors: ['Sky Blue', 'Cloud White', 'Fresh Silver', 'Wisdom Purple'],
        stones: ['Sapphire', 'Lapis Lazuli', 'Aquamarine', 'Crystal', 'Amethyst'],
        herbs: ['Mint', 'Lemongrass', 'Eucalyptus', 'Fennel'],
        metals: ['Mercury', 'Aluminum'],
        direction: 'East',
        keywords: ['Thinking', 'Communication', 'Freedom', 'Rational', 'Social']
    },
    water: {
        quality: 'Emotional and Intuitive',
        energy: 'Yin',
        season: ['Winter'],
        colors: ['Deep Sea Blue', 'Mysterious Purple', 'Pearl Silver', 'Moonlight White'],
        stones: ['Moonstone', 'Pearl', 'Aquamarine', 'Labradorite', 'Chalcedony'],
        herbs: ['Chamomile', 'Jasmine', 'Rose', 'Willow Bark'],
        metals: ['Silver', 'Platinum'],
        direction: 'West',
        keywords: ['Emotion', 'Intuition', 'Compassion', 'Depth', 'Flow']
    }
};

// Enhanced detailed information for the twelve zodiac signs
const zodiacSigns = {
    aries: {
        name: 'Aries',
        symbol: '♈',
        element: 'fire',
        quality: 'cardinal',
        ruler: 'mars',
        dates: 'Mar 21 - Apr 19',
        decanRulers: ['mars', 'sun', 'jupiter'],
        traits: ['Impulsive', 'Passionate', 'Brave', 'Independent', 'Leadership', 'Direct'],
        shadow: ['Hot-tempered', 'Selfish', 'Impulsive', 'Impatient'],
        bodyParts: ['Head', 'Brain', 'Face'],
        lifeTheme: 'I Am - Pioneering Self-Identity',
        description: 'Mars energy is strong today, your leadership abilities and pioneering spirit will be fully displayed. Pay attention to controlling your temper in interpersonal relationships, use your passion to inspire others rather than force them. There are opportunities for breakthrough progress in your career.'
    },
    taurus: {
        name: 'Taurus',
        symbol: '♉',
        element: 'earth',
        quality: 'fixed',
        ruler: 'venus',
        dates: 'Apr 20 - May 20',
        decanRulers: ['venus', 'mercury', 'saturn'],
        traits: ['Stable', 'Stubborn', 'Practical', 'Enjoying', 'Loyal', 'Persistent'],
        shadow: ['Obstinate', 'Greedy', 'Lazy', 'Possessive'],
        bodyParts: ['Neck', 'Throat', 'Thyroid'],
        lifeTheme: 'I Have - Building Stable Values',
        description: 'Venus\' elegant energy is particularly strong today, both wealth and love fortunes are enhanced. Your steady attitude will earn others\' trust, suitable for handling important financial decisions. You will have special enjoyment in food and art.'
    },
    gemini: {
        name: 'Gemini',
        symbol: '♊',
        element: 'air',
        quality: 'mutable',
        ruler: 'mercury',
        dates: 'May 21 - Jun 21',
        decanRulers: ['mercury', 'venus', 'uranus'],
        traits: ['Witty', 'Changeable', 'Curious', 'Communicative', 'Adaptable', 'Intelligent'],
        shadow: ['Superficial', 'Fickle', 'Gossipy', 'Unfocused'],
        bodyParts: ['Arms', 'Hands', 'Lungs', 'Nervous System'],
        lifeTheme: 'I Think - Collecting and Spreading Information',
        description: 'Mercury grants you extraordinary communication talents, today is suitable for important negotiations, learning new skills, or releasing important information. Your versatility will leave a deep impression on others, but pay attention to focus.'
    },
    cancer: {
        name: 'Cancer',
        symbol: '♋',
        element: 'water',
        quality: 'cardinal',
        ruler: 'moon',
        dates: 'Jun 22 - Jul 22',
        decanRulers: ['moon', 'pluto', 'neptune'],
        traits: ['Sensitive', 'Nurturing', 'Protective', 'Emotionally Rich', 'Intuitive', 'Gentle'],
        shadow: ['Moody', 'Overprotective', 'Negative', 'Nostalgic'],
        bodyParts: ['Chest', 'Stomach', 'Digestive System'],
        lifeTheme: 'I Feel - Nurturing Emotional Security',
        description: 'The Moon\'s gentle energy makes your intuition particularly sharp, family relationships are today\'s focus. Your empathy and ability to care for others will be recognized. Suitable for emotional exchanges and family gatherings.'
    },
    leo: {
        name: 'Leo',
        symbol: '♌',
        element: 'fire',
        quality: 'fixed',
        ruler: 'sun',
        dates: 'Jul 23 - Aug 22',
        decanRulers: ['sun', 'jupiter', 'mars'],
        traits: ['Confident', 'Generous', 'Dramatic', 'Leadership', 'Creative', 'Noble'],
        shadow: ['Arrogant', 'Self-centered', 'Domineering', 'Vain'],
        bodyParts: ['Heart', 'Back', 'Spine'],
        lifeTheme: 'I Create - Expressing Creative Self',
        description: 'The Sun\'s brilliance is particularly dazzling today, you are the center of everyone\'s attention. Creative projects will have major breakthroughs, your performance talent and leadership charm are unstoppable. Remember to warm others with your light.'
    },
    virgo: {
        name: 'Virgo',
        symbol: '♍',
        element: 'earth',
        quality: 'mutable',
        ruler: 'mercury',
        dates: 'Aug 23 - Sep 22',
        decanRulers: ['mercury', 'saturn', 'venus'],
        traits: ['Perfectionist', 'Analytical', 'Service-oriented', 'Practical', 'Detailed', 'Modest'],
        shadow: ['Critical', 'Anxious', 'Over-analytical', 'Self-critical'],
        bodyParts: ['Abdomen', 'Intestines', 'Digestive System'],
        lifeTheme: 'I Analyze - Perfecting and Serving',
        description: 'Mercury grants you precise analytical abilities, today you can discover important details that others overlook at work. Your service spirit and professional attitude will be appreciated. Health management needs special attention.'
    },
    libra: {
        name: 'Libra',
        symbol: '♎',
        element: 'air',
        quality: 'cardinal',
        ruler: 'venus',
        dates: 'Sep 23 - Oct 23',
        decanRulers: ['venus', 'uranus', 'mercury'],
        traits: ['Balanced', 'Harmonious', 'Diplomatic', 'Aesthetic', 'Fair', 'Cooperative'],
        shadow: ['Indecisive', 'Dependent', 'Superficial', 'Conflict-avoidant'],
        bodyParts: ['Lower back', 'Kidneys', 'Skin'],
        lifeTheme: 'I Balance - Seeking Harmonious Relationships',
        description: 'Venus\' elegant energy makes you a natural mediator, interpersonal relationships are particularly harmonious. Your aesthetic sense and diplomatic skills are especially prominent today. Suitable for handling cooperative relationships and aesthetic-related matters.'
    },
    scorpio: {
        name: 'Scorpio',
        symbol: '♏',
        element: 'water',
        quality: 'fixed',
        ruler: 'pluto',
        dates: 'Oct 24 - Nov 22',
        decanRulers: ['pluto', 'neptune', 'moon'],
        traits: ['Mysterious', 'Deep', 'Transformative', 'Intuitive', 'Intense', 'Insightful'],
        shadow: ['Vengeful', 'Jealous', 'Controlling', 'Suspicious'],
        bodyParts: ['Reproductive organs', 'Excretory system'],
        lifeTheme: 'I Transform - Deep Revolutionary Rebirth',
        description: 'Pluto\'s deep energy brings your insight to its peak, able to see through the essence of things. Today is suitable for deep research, psychological analysis, or handling mysterious affairs. There may be important breakthroughs in relationships.'
    },
    sagittarius: {
        name: 'Sagittarius',
        symbol: '♐',
        element: 'fire',
        quality: 'mutable',
        ruler: 'jupiter',
        dates: 'Nov 23 - Dec 21',
        decanRulers: ['jupiter', 'mars', 'sun'],
        traits: ['Free', 'Adventurous', 'Philosophical', 'Optimistic', 'Wise', 'Honest'],
        shadow: ['Reckless', 'Irresponsible', 'Exaggerating', 'Lacking detail'],
        bodyParts: ['Thighs', 'Liver', 'Hips'],
        lifeTheme: 'I Understand - Exploring Life\'s Meaning',
        description: 'Jupiter\'s expansive energy fills you with wisdom and foresight, today is suitable for making long-term plans or engaging in philosophical thinking. Your optimistic attitude will infect those around you, good luck in travel and learning.'
    },
    capricorn: {
        name: 'Capricorn',
        symbol: '♑',
        element: 'earth',
        quality: 'cardinal',
        ruler: 'saturn',
        dates: 'Dec 22 - Jan 19',
        decanRulers: ['saturn', 'venus', 'mercury'],
        traits: ['Responsible', 'Practical', 'Traditional', 'Hardworking', 'Authoritative', 'Mature'],
        shadow: ['Pessimistic', 'Stubborn', 'Cold', 'Overly strict'],
        bodyParts: ['Knees', 'Bones', 'Skin'],
        lifeTheme: 'I Use - Building Lasting Achievements',
        description: 'Saturn\'s rigorous energy brings your organizational abilities to their peak, career fortune is particularly strong. Your professional attitude and sense of responsibility will be recognized by authority figures, you may get important promotion opportunities.'
    },
    aquarius: {
        name: 'Aquarius',
        symbol: '♒',
        element: 'air',
        quality: 'fixed',
        ruler: 'uranus',
        dates: 'Jan 20 - Feb 18',
        decanRulers: ['uranus', 'mercury', 'venus'],
        traits: ['Independent', 'Innovative', 'Humanitarian', 'Future-oriented', 'Idealistic', 'Friendly'],
        shadow: ['Detached', 'Rebellious', 'Unrealistic', 'Stubborn'],
        bodyParts: ['Calves', 'Ankles', 'Circulatory system'],
        lifeTheme: 'I Know - Innovating Human Consciousness',
        description: 'Uranus\' innovative energy stimulates your creativity, unique insights will be appreciated by others. Play an important role in teamwork, especially good luck in technology and humanitarian-related fields.'
    },
    pisces: {
        name: 'Pisces',
        symbol: '♓',
        element: 'water',
        quality: 'mutable',
        ruler: 'neptune',
        dates: 'Feb 19 - Mar 20',
        decanRulers: ['neptune', 'moon', 'pluto'],
        traits: ['Intuitive', 'Compassionate', 'Artistic', 'Dreamy', 'Spiritual', 'Sacrificial'],
        shadow: ['Escapist', 'Victim-like', 'Chaotic', 'Addictive'],
        bodyParts: ['Feet', 'Immune system'],
        lifeTheme: 'I Believe - Connecting Universal Consciousness',
        description: 'Neptune\'s dreamy energy makes your artistic inspiration and intuition particularly rich, suitable for creative activities, meditation, or helping others. Your compassion and kindness will bring you unexpected good fortune.'
    }
};

// Get precise current planetary positions (including retrograde status and more accurate calculations)
function getCurrentPlanetaryPositions() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // Calculate Julian Day (more precise astronomical calculation basis)
    const julianDay = calculateJulianDay(year, month, day, hour, minute);
    const centuriesSinceJ2000 = (julianDay - 2451545.0) / 36525.0;
    
    // Consider precession and nutation effects
    const precessionCorrection = 1.396971278 * centuriesSinceJ2000;
    
    // Calculate precise positions of all planets
    const positions = {};
    
    // Sun position (based on Earth's orbit)
    const sunMeanLongitude = (280.46646 + 36000.76983 * centuriesSinceJ2000 + 0.0003032 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const sunMeanAnomaly = (357.52911 + 35999.05029 * centuriesSinceJ2000 - 0.0001537 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const sunEccentricity = 0.016708634 - 0.000042037 * centuriesSinceJ2000 - 0.0000001267 * centuriesSinceJ2000 * centuriesSinceJ2000;
    const sunTrueLongitude = sunMeanLongitude + (1.914602 - 0.004817 * centuriesSinceJ2000 - 0.000014 * centuriesSinceJ2000 * centuriesSinceJ2000) * Math.sin(sunMeanAnomaly * Math.PI / 180);
    
    positions.sun = {
        degree: (sunTrueLongitude + precessionCorrection) % 360,
        retrograde: false,
        house: Math.floor(((sunTrueLongitude + precessionCorrection) % 360) / 30) + 1,
        intensity: 1.0 + 0.1 * Math.sin((julianDay % 365.25) / 365.25 * 2 * Math.PI)
    };
    
    // Moon position (more precise lunar orbital calculation)
    const moonMeanLongitude = (218.3164477 + 481267.88123421 * centuriesSinceJ2000 - 0.0015786 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const moonMeanAnomaly = (134.9633964 + 477198.8675055 * centuriesSinceJ2000 + 0.0087414 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const moonArgument = (93.2720950 + 483202.0175233 * centuriesSinceJ2000 - 0.0036539 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    
    // Main lunar perturbation terms
    const moonLongitudeCorrection = 
        6.288774 * Math.sin(moonMeanAnomaly * Math.PI / 180) +
        1.274027 * Math.sin((2 * moonArgument - moonMeanAnomaly) * Math.PI / 180) +
        0.658314 * Math.sin(2 * moonArgument * Math.PI / 180);
    
    const moonTrueLongitude = moonMeanLongitude + moonLongitudeCorrection;
    
    positions.moon = {
        degree: (moonTrueLongitude + precessionCorrection) % 360,
        retrograde: false,
        house: Math.floor(((moonTrueLongitude + precessionCorrection) % 360) / 30) + 1,
        intensity: getCurrentMoonPhaseIntensity(julianDay)
    };
    
    // Inner planet position calculations (Mercury, Venus)
    positions.mercury = calculateInnerPlanetPosition('mercury', centuriesSinceJ2000, precessionCorrection);
    positions.venus = calculateInnerPlanetPosition('venus', centuriesSinceJ2000, precessionCorrection);
    
    // Outer planet position calculations (Mars and beyond)
    positions.mars = calculateOuterPlanetPosition('mars', centuriesSinceJ2000, precessionCorrection);
    positions.jupiter = calculateOuterPlanetPosition('jupiter', centuriesSinceJ2000, precessionCorrection);
    positions.saturn = calculateOuterPlanetPosition('saturn', centuriesSinceJ2000, precessionCorrection);
    positions.uranus = calculateOuterPlanetPosition('uranus', centuriesSinceJ2000, precessionCorrection);
    positions.neptune = calculateOuterPlanetPosition('neptune', centuriesSinceJ2000, precessionCorrection);
    positions.pluto = calculateOuterPlanetPosition('pluto', centuriesSinceJ2000, precessionCorrection);
    
    // Lunar node calculations
    const nodePosition = (125.0445279 - 1934.1362891 * centuriesSinceJ2000 + 0.0020754 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    positions.northNode = {
        degree: (nodePosition + precessionCorrection) % 360,
        retrograde: true, // Nodes are always retrograde
        house: Math.floor(((nodePosition + precessionCorrection) % 360) / 30) + 1,
        intensity: 0.8
    };
    
    positions.southNode = {
        degree: (nodePosition + 180 + precessionCorrection) % 360,
        retrograde: true,
        house: Math.floor(((nodePosition + 180 + precessionCorrection) % 360) / 30) + 1,
        intensity: 0.6
    };
    
    return positions;
}

// Julian Day calculation (astronomical standard time conversion)
function calculateJulianDay(year, month, day, hour = 12, minute = 0) {
    // Adjust month and year (Julian calendar rules)
    if (month <= 2) {
        year--;
        month += 12;
    }
    
    // Gregorian calendar adjustment
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    // Julian Day calculation formula
    const julianDay = Math.floor(365.25 * (year + 4716)) + 
                     Math.floor(30.6001 * (month + 1)) + 
                     day + b - 1524.5 + 
                     (hour + minute / 60) / 24;
    
    return julianDay;
}

// Calculate inner planet positions (Mercury, Venus)
function calculateInnerPlanetPosition(planet, T, precession) {
    const planetData = {
        mercury: {
            L0: 252.250906, L1: 149472.6746358, L2: -0.00000535,
            a0: 0.3870983098, e0: 0.2056306509, i0: 7.0049782,
            retroCycle: 0.2408467, synodic: 115.88
        },
        venus: {
            L0: 181.979801, L1: 58517.8156760, L2: 0.00000165,
            a0: 0.7233298200, e0: 0.0067720164, i0: 3.3946969,
            retroCycle: 0.6151973, synodic: 583.92
        }
    };
    
    const data = planetData[planet];
    if (!data) return null;
    
    const meanLongitude = (data.L0 + data.L1 * T + data.L2 * T * T) % 360;
    const eccentricity = data.e0 * (1 - 0.0000001 * T);
    
    // Check retrograde status
    const daysFromEpoch = T * 36525;
    const retroPeriod = data.synodic;
    const retroPhase = (daysFromEpoch % retroPeriod) / retroPeriod;
    const isRetrograde = retroPhase > 0.4 && retroPhase < 0.6; // Retrograde accounts for about 20% of orbital cycle
    
    const trueLongitude = meanLongitude + 
        1.914 * eccentricity * Math.sin(meanLongitude * Math.PI / 180) +
        0.02 * eccentricity * Math.sin(2 * meanLongitude * Math.PI / 180);
    
    return {
        degree: (trueLongitude + precession) % 360,
        retrograde: isRetrograde,
        house: Math.floor(((trueLongitude + precession) % 360) / 30) + 1,
        intensity: isRetrograde ? 0.7 : 1.0 // During retrograde, influence weakens but becomes deeper
    };
}

// Calculate outer planet positions (Mars and beyond)
function calculateOuterPlanetPosition(planet, T, precession) {
    const planetData = {
        mars: {
            L0: 355.433000, L1: 19140.2993313, L2: 0.00000261,
            a0: 1.5236793419, e0: 0.0934006477, period: 686.98,
            retroCycle: 2.135, retroDuration: 72
        },
        jupiter: {
            L0: 34.351519, L1: 3034.9056606, L2: -0.00008501,
            a0: 5.2025957668, e0: 0.0484979255, period: 4332.59,
            retroCycle: 12.95, retroDuration: 121
        },
        saturn: {
            L0: 50.077444, L1: 1222.1138488, L2: 0.00021004,
            a0: 9.5549091915, e0: 0.0555481426, period: 10759.22,
            retroCycle: 29.46, retroDuration: 138
        },
        uranus: {
            L0: 314.055005, L1: 428.4669983, L2: -0.00000486,
            a0: 19.2184460618, e0: 0.0463812221, period: 30688.5,
            retroCycle: 84.32, retroDuration: 151
        },
        neptune: {
            L0: 304.348665, L1: 218.4862002, L2: 0.00000059,
            a0: 30.1103868694, e0: 0.0094557470, period: 60190,
            retroCycle: 164.88, retroDuration: 158
        },
        pluto: {
            L0: 238.958116, L1: 145.1780361, L2: -0.00000031,
            a0: 39.4450697257, e0: 0.2482273077, period: 90465,
            retroCycle: 248.59, retroDuration: 160
        }
    };
    
    const data = planetData[planet];
    if (!data) return null;
    
    const meanLongitude = (data.L0 + data.L1 * T + data.L2 * T * T) % 360;
    
    // More precise retrograde calculation
    const daysFromEpoch = T * 36525;
    const yearsSinceEpoch = daysFromEpoch / 365.25;
    const retroCyclePosition = (yearsSinceEpoch % data.retroCycle) / data.retroCycle;
    
    // Determine retrograde periods based on planetary characteristics
    let isRetrograde = false;
    const retroStart = 0.4; // Retrograde start position
    const retroEnd = 0.6;   // Retrograde end position
    
    if (retroCyclePosition >= retroStart && retroCyclePosition <= retroEnd) {
        isRetrograde = true;
    }
    
    // Calculate the planet's true position
    const eccentricity = data.e0;
    const trueLongitude = meanLongitude + 
        2 * eccentricity * Math.sin(meanLongitude * Math.PI / 180) * (180 / Math.PI) +
        1.25 * eccentricity * eccentricity * Math.sin(2 * meanLongitude * Math.PI / 180) * (180 / Math.PI);
    
    return {
        degree: (trueLongitude + precession) % 360,
        retrograde: isRetrograde,
        house: Math.floor(((trueLongitude + precession) % 360) / 30) + 1,
        intensity: isRetrograde ? 0.8 : 1.0
    };
}

// Get moon phase intensity
function getCurrentMoonPhaseIntensity(julianDay) {
    const lunarCycle = 29.530588853; // Precise synodic month cycle
    const knownNewMoon = 2451550.1; // New moon at J2000.0 epoch
    const cyclesSinceKnown = (julianDay - knownNewMoon) / lunarCycle;
    const cyclePosition = cyclesSinceKnown - Math.floor(cyclesSinceKnown);
    
    // Calculate moon phase intensity (weakest at new moon, strongest at full moon)
    const phaseAngle = cyclePosition * 2 * Math.PI;
    const intensity = 0.5 + 0.5 * Math.cos(phaseAngle - Math.PI); // Variation from 0 to 1
    
    return intensity;
}

// Enhanced planetary influence calculation (fully based on astrological principles)
function calculatePlanetaryInfluence(sign, currentPositions) {
    const signData = zodiacSigns[sign];
    const signStartAngle = getSignStartAngle(sign);
    let totalScore = 0;
    const influences = {};
    
    // 获取当前月相
    const currentMoonPhase = getCurrentMoonPhase();
    const moonInfluence = moonPhases[currentMoonPhase];
    
    // 计算星座的元素和质量加权
    const elementBonus = calculateElementalHarmony(sign, currentPositions);
    const qualityBonus = calculateQualityInteraction(sign, currentPositions);
    
    // 基于真实天文数据的日变化因子
    const today = new Date();
    const julianDay = calculateJulianDay(today.getFullYear(), today.getMonth() + 1, today.getDate(), today.getHours(), today.getMinutes());
    const dailyVariation = Math.sin((julianDay % 365.25) / 365.25 * 2 * Math.PI) * 0.15; // ±15% 的日变化
    
    Object.entries(planets).forEach(([planetKey, planetData]) => {
        const planetPosition = currentPositions[planetKey];
        if (!planetPosition) return;
        
        // 1. 基于精确角距的影响力计算（遵循传统占星学度数系统）
        const angleFromSign = Math.abs(planetPosition.degree - signStartAngle);
        const normalizedAngle = Math.min(angleFromSign, 360 - angleFromSign);
        
        // 传统占星学中，行星在星座的不同区域有不同影响力
        let angleImpact;
        if (normalizedAngle <= 5) {
            angleImpact = 1.0; // 紧密合相，最强影响
        } else if (normalizedAngle <= 15) {
            angleImpact = 0.85; // 强影响区域
        } else if (normalizedAngle <= 30) {
            angleImpact = 0.7; // 中等影响区域（星座内）
        } else if (normalizedAngle <= 60) {
            angleImpact = 0.5; // 弱影响区域
        } else {
            angleImpact = 0.3; // 最弱影响区域
        }
        
        // 2. 行星本身的基础影响力（基于传统占星学行星等级）
        let baseInfluence = planetData.influence * (planetPosition.intensity || 1.0);
        
        // 3. 逆行影响（基于传统占星学逆行理论）
        if (planetPosition.retrograde) {
            if (planetKey === 'mercury') {
                baseInfluence *= 0.6; // 水星逆行影响最明显
            } else if (planetKey === 'venus' || planetKey === 'mars') {
                baseInfluence *= 0.7; // 内行星逆行影响较大
            } else {
                baseInfluence *= 0.8; // 外行星逆行影响较小
            }
            
            // 主宰行星逆行的特殊处理
            if (planetKey === signData.ruler) {
                baseInfluence *= 1.1; // 主宰行星逆行时内省力量增强
            }
        }
        
        // 4. 精确相位计算（基于传统相位理论）
        const aspectInfluences = calculatePreciseAspects(planetPosition.degree, signStartAngle);
        let aspectScore = 0;
        aspectInfluences.forEach(aspect => {
            // 根据相位的性质和精确度调整影响
            let aspectWeight = 1.0;
                    if (aspect.name === 'Conjunction' || aspect.name === 'Opposition') {
            aspectWeight = 1.0; // 主要相位
        } else if (aspect.name === 'Trine' || aspect.name === 'Square') {
            aspectWeight = 0.8; // 重要相位
        } else if (aspect.name === 'Sextile') {
            aspectWeight = 0.6; // 次要相位
        } else {
            aspectWeight = 0.3; // 微相位
        }
            
            aspectScore += aspect.strength * aspect.precision * aspectWeight;
        });
        
        // 5. 宫位影响（基于传统宫位重要性）
        const houseInfluence = calculateAdvancedHouseInfluence(planetPosition.house, planetKey, signData);
        
        // 6. 行星尊贵系统（传统占星学的核心概念）
        const dignityInfluence = calculatePlanetaryDignity(planetKey, sign, planetPosition.degree);
        
        // 7. 主宰行星特殊权重（基于传统占星学主宰理论）
        let rulerBonus = 0;
        if (signData.ruler === planetKey) {
            rulerBonus = 0.4; // 主宰行星有额外权重
            if (dignityInfluence > 1.2) {
                rulerBonus *= 1.5; // 主宰行星在有利位置时权重更大
            }
        }
        
        // 8. 月相对不同行星的差异化影响
        let moonPhaseBonus = 0;
        if (planetKey === 'moon') {
            moonPhaseBonus = moonInfluence.influence * 0.3; // 月亮受月相影响最大
        } else if (planetKey === 'sun') {
            moonPhaseBonus = (1 - moonInfluence.influence) * 0.1; // 太阳与月相呈反比关系
        } else if (['venus', 'neptune'].includes(planetKey)) {
            moonPhaseBonus = moonInfluence.influence * 0.15; // 感性行星受月相影响较大
        } else {
            moonPhaseBonus = moonInfluence.influence * 0.05; // 其他行星受月相影响较小
        }
        
        // 9. 元素相性（基于四元素理论）
        const elementMultiplier = getAdvancedElementMultiplier(signData.element, planetKey, planetPosition.degree);
        
        // 10. 季节影响（基于自然周期理论）
        const seasonalInfluence = calculateSeasonalInfluence(planetKey, new Date()) * 0.2;
        
        // 11. 综合计算行星分数（所有因素加权）
        const baseScore = baseInfluence * dignityInfluence + rulerBonus + moonPhaseBonus + seasonalInfluence;
        const aspectAdjustment = aspectScore * 0.3; // 相位作为调节因子
        const houseAdjustment = (houseInfluence - 1) * 0.25; // 宫位作为调节因子
        
        const planetScore = (baseScore + aspectAdjustment + houseAdjustment) * 
                           angleImpact * elementMultiplier * 
                           (1 + elementBonus * 0.15 + qualityBonus * 0.15);
        
        totalScore += planetScore;
        
        influences[planetData.name] = {
            score: planetScore,
            keywords: planetData.keywords,
            description: generateAdvancedPlanetDescription(planetData, aspectInfluences, houseInfluence, dignityInfluence, planetPosition),
            retrograde: planetPosition.retrograde,
            house: planetPosition.house,
            houseName: houses[planetPosition.house] ? houses[planetPosition.house].name : 'Unknown House',
            dignity: getDignityStatus(planetKey, sign),
            aspects: aspectInfluences,
            strength: categorizeInfluenceStrength(planetScore),
            angleImpact: angleImpact,
            dignityScore: dignityInfluence
        };
    });
    
    // 12. 优化的归一化算法（确保合理的分数分布）
    const planetCount = Object.keys(influences).length;
    let normalizedScore = totalScore / Math.max(planetCount * 0.8, 1); // 调整分母，提高基础分数
    
    // 13. 应用每日天文变化
    normalizedScore += dailyVariation;
    
    // 14. 基于传统占星学的分数分布优化
    // 调整为更合理的分数分布，避免过低的分数
    if (normalizedScore < 0.4) {
        // 提升低分区间
        normalizedScore = 0.4 + (normalizedScore * 0.8);
    } else if (normalizedScore > 1.2) {
        // 压缩过高分数
        normalizedScore = 0.85 + (normalizedScore - 1.2) * 0.1;
    }
    
    // 15. 添加积极的基础能量（每个星座都有其基本的生命力）
    const baseLifeEnergy = 0.25; // 25%的基础生命能量
    normalizedScore = baseLifeEnergy + (normalizedScore * 0.65); // 基础25% + 65%的变化范围
    
    // 16. 星座特性微调（每个星座的独特能量模式）
    const signEnergyBonus = Math.abs((signData.name.charCodeAt(0) % 17) * 0.02 - 0.15); // 0-15%的星座能量加成
    normalizedScore += signEnergyBonus;
    
    // 17. 最终分数限制在占星学的实际范围内（30%-95%）
    normalizedScore = Math.max(0.30, Math.min(0.95, normalizedScore));
    
    return { 
        score: normalizedScore, 
        influences,
        moonPhase: {
            name: moonInfluence.name,
            symbol: moonInfluence.symbol,
            influence: moonInfluence.influence,
            keywords: moonInfluence.keywords,
            energy: moonInfluence.energy,
            bestFor: moonInfluence.bestFor
        },
        elementalHarmony: elementBonus,
        qualityInteraction: qualityBonus,
        calculationDetails: {
            totalPlanets: planetCount,
            averageInfluence: totalScore / planetCount,
            dailyVariation: dailyVariation,
            baseEnergy: baseLifeEnergy,
            signBonus: signEnergyBonus,
            finalScore: normalizedScore
        }
    };
}

// 计算星座的元素和质量加权
function calculateElementalHarmony(sign, currentPositions) {
    const signData = zodiacSigns[sign];
    const element = signData.element;
    let harmonyScore = 0;
    let totalPlanets = 0;
    
    Object.entries(planets).forEach(([planetKey, planetData]) => {
        const planetPosition = currentPositions[planetKey];
        if (!planetPosition) return;
        
        totalPlanets++;
        const planetSign = determinePlanetSign(planetPosition.degree);
        const planetElement = zodiacSigns[planetSign]?.element;
        
        if (planetElement === element) {
            harmonyScore += 0.3; // 同元素加分
        } else if (isCompatibleElement(element, planetElement)) {
            harmonyScore += 0.1; // 相容元素小加分
        }
    });
    
    return totalPlanets > 0 ? harmonyScore / totalPlanets : 0;
}

// 计算星座的质量交互
function calculateQualityInteraction(sign, currentPositions) {
    const signData = zodiacSigns[sign];
    const quality = signData.quality;
    let interactionScore = 0;
    let totalPlanets = 0;
    
    Object.entries(planets).forEach(([planetKey, planetData]) => {
        const planetPosition = currentPositions[planetKey];
        if (!planetPosition) return;
        
        totalPlanets++;
        const planetSign = determinePlanetSign(planetPosition.degree);
        const planetQuality = zodiacSigns[planetSign]?.quality;
        
        if (planetQuality === quality) {
            interactionScore += 0.2; // 同质量加分
        } else if (isComplementaryQuality(quality, planetQuality)) {
            interactionScore += 0.1; // 互补质量小加分
        }
    });
    
    return totalPlanets > 0 ? interactionScore / totalPlanets : 0;
}

// 确定行星所在星座
function determinePlanetSign(degree) {
    const signIndex = Math.floor(degree / 30);
    const signKeys = Object.keys(zodiacSigns);
    return signKeys[signIndex] || 'aries';
}

// 检查元素相容性
function isCompatibleElement(element1, element2) {
    const compatibility = {
        fire: ['air'],
        earth: ['water'],
        air: ['fire'],
        water: ['earth']
    };
    return compatibility[element1]?.includes(element2) || false;
}

// 检查质量互补性
function isComplementaryQuality(quality1, quality2) {
    const complementary = {
        cardinal: ['mutable'],
        fixed: ['cardinal'],
        mutable: ['fixed']
    };
    return complementary[quality1]?.includes(quality2) || false;
}

// 计算高级宫位影响
function calculateAdvancedHouseInfluence(houseNumber, planetKey, signData) {
    const house = houses[houseNumber];
    const planet = planets[planetKey];
    
    if (!house || !planet) return 1.0;
    
    let influence = 1.0;
    
    // 行星在自己守护的宫位
    if (planet.houses && planet.houses.includes(houseNumber)) {
        influence *= 1.4;
    }
    
    // 角宫（1、4、7、10宫）的特殊影响
    if (house.significance === 'angular') {
        influence *= 1.3;
    } else if (house.significance === 'succedent') {
        influence *= 1.1;
    } else if (house.significance === 'cadent') {
        influence *= 0.9;
    }
    
    // 宫位元素与星座的协调性
    const houseElement = house.element;
    if (houseElement === signData.element) {
        influence *= 1.2;
    }
    
    // 星座特质与宫位关键词的匹配
    if (house.keywords.some(keyword => 
        signData.traits.some(trait => trait.includes(keyword) || keyword.includes(trait))
    )) {
        influence *= 1.15;
    }
    
    return influence;
}

// 计算高级元素乘数
function getAdvancedElementMultiplier(element, planetKey, planetDegree) {
    const elementPlanetMap = {
        'fire': ['mars', 'sun'],
        'water': ['moon', 'neptune'],
        'air': ['mercury', 'uranus'],
        'earth': ['saturn', 'venus']
    };
    
    let multiplier = 1.0;
    
    // 基础元素相性
    if (elementPlanetMap[element] && elementPlanetMap[element].includes(planetKey)) {
        multiplier *= 1.3;
    }
    
    // 根据行星在星座中的位置调整
    const planetSign = determinePlanetSign(planetDegree);
    const planetSignData = zodiacSigns[planetSign];
    
    if (planetSignData) {
        // 行星在同元素星座中
        if (planetSignData.element === element) {
            multiplier *= 1.2;
        }
        // 行星在相容元素星座中
        else if (isCompatibleElement(element, planetSignData.element)) {
            multiplier *= 1.1;
        }
        // 行星在对立元素星座中
        else {
            multiplier *= 0.9;
        }
    }
    
    return multiplier;
}

// 计算季节影响
function calculateSeasonalInfluence(planetKey, date) {
    const month = date.getMonth() + 1; // JavaScript月份从0开始
    const season = getSeason(month);
    const planetData = planets[planetKey];
    
    if (!planetData) return 0;
    
    let influence = 0;
    
    // 根据行星特性和季节匹配
    const seasonalAffinities = {
        'spring': ['mars', 'venus'], // 春季：行动和生长
        'summer': ['sun', 'jupiter'], // 夏季：光明和扩展
        'autumn': ['saturn', 'mercury'], // 秋季：收获和思考
        'winter': ['moon', 'neptune'] // 冬季：内省和梦想
    };
    
    if (seasonalAffinities[season] && seasonalAffinities[season].includes(planetKey)) {
        influence += 0.2;
    }
    
    // 特殊日期影响（春分、夏至、秋分、冬至）
    const specialDates = getSpecialDates(date.getFullYear());
    const currentDate = `${month}-${date.getDate()}`;
    
    if (specialDates.includes(currentDate)) {
        influence += 0.1;
    }
    
    return influence;
}

// 获取季节
function getSeason(month) {
    if (month >= 3 && month <= 5) return 'spring';
    if (month >= 6 && month <= 8) return 'summer';
    if (month >= 9 && month <= 11) return 'autumn';
    return 'winter';
}

// 获取特殊日期
function getSpecialDates(year) {
    // 简化的二分二至日期（实际应该更精确计算）
    return ['3-20', '6-21', '9-23', '12-22'];
}

// 计算精确相位
function calculatePreciseAspects(planetDegree, signStartAngle) {
    const aspects = [];
    
    Object.entries(aspectAngles).forEach(([aspectName, aspectData]) => {
        const angle = Math.abs(planetDegree - signStartAngle);
        const normalizedAngle = Math.min(angle, 360 - angle);
        const deviation = Math.abs(normalizedAngle - aspectData.angle);
        
        if (deviation <= aspectData.orb) {
            // 计算相位的精确程度（越接近精确角度，影响越强）
            const precision = 1 - (deviation / aspectData.orb);
            const adjustedStrength = aspectData.strength * precision;
            
            aspects.push({
                name: aspectData.name,
                symbol: aspectData.symbol,
                angle: normalizedAngle,
                exactAngle: aspectData.angle,
                deviation: deviation,
                orb: aspectData.orb,
                nature: aspectData.nature,
                strength: adjustedStrength,
                precision: precision,
                meaning: aspectData.meaning,
                modifier: aspectData.nature === 'harmonious' ? (1 + precision * 0.3) : 
                         aspectData.nature === 'challenging' ? (1 - precision * 0.2) : 
                         (1 + precision * 0.1)
            });
        }
    });
    
    // 按影响力排序
    return aspects.sort((a, b) => b.strength - a.strength);
}

// 计算行星尊贵
function calculatePlanetaryDignity(planetKey, sign, planetDegree) {
    const planetData = planets[planetKey];
    if (!planetData || !planetData.dignity) return 1.0;
    
    let dignity = 1.0;
    
    // 检查各种尊贵状态
    if (planetData.dignity.exaltation === sign) {
        dignity = 1.4; // 擢升
    } else if (zodiacSigns[sign].ruler === planetKey) {
        dignity = 1.3; // 守护
    } else if (planetData.dignity.detriment === sign) {
        dignity = 0.7; // 失势
    } else if (planetData.dignity.fall === sign) {
        dignity = 0.6; // 落陷
    }
    
    // 度数尊贵（某些特定度数有特殊意义）
    const specialDegrees = getSpecialDegrees(sign);
    const degreeInSign = planetDegree % 30;
    
    if (specialDegrees.exaltation && Math.abs(degreeInSign - specialDegrees.exaltation) <= 1) {
        dignity *= 1.1;
    }
    
    return dignity;
}

// 获取特殊度数
function getSpecialDegrees(sign) {
    const specialDegrees = {
        'aries': { exaltation: 19 }, // 太阳擢升度
        'taurus': { exaltation: 3 },  // 月亮擢升度
        'cancer': { exaltation: 15 }, // 木星擢升度
        'virgo': { exaltation: 15 },  // 水星擢升度
        'libra': { exaltation: 27 },  // 土星擢升度
        'capricorn': { exaltation: 28 }, // 火星擢升度
        'pisces': { exaltation: 27 }  // 金星擢升度
    };
    
    return specialDegrees[sign] || {};
}

// 生成高级行星描述
function generateAdvancedPlanetDescription(planetData, aspectInfluences, houseInfluence, dignityInfluence, planetPosition) {
    let description = `${planetData.symbol} ${planetData.name}`;
    
    // 逆行状态描述
    if (planetPosition.retrograde) {
        description += `(Retrograde) is guiding you through deep introspection and reflection, `;
    } else {
        description += `is bringing you `;
    }
    
    // 相位影响描述
    const strongestAspect = aspectInfluences.reduce((max, current) => 
        current.strength > max.strength ? current : max, { strength: 0 });
    
    if (strongestAspect.strength > 0.5) {
        if (strongestAspect.nature === 'harmonious') {
            description += `harmonious energy flow, ${strongestAspect.meaning}, `;
        } else if (strongestAspect.nature === 'challenging') {
            description += `challenging dynamics, ${strongestAspect.meaning}, `;
        } else {
            description += `unique creative energy, ${strongestAspect.meaning}, `;
        }
    } else {
        description += `stable influence, `;
    }
    
    // 尊贵状态描述
    if (dignityInfluence > 1.1) {
        description += `performing excellently in current position, expressing full potential.`;
    } else if (dignityInfluence < 0.9) {
        description += `requiring extra effort to unlock potential, but still has positive effects.`;
    } else {
        description += `showing stability in ${planetData.keywords.slice(0, 2).join(' and ')} areas.`;
    }
    
    // 宫位特殊影响
    if (houseInfluence > 1.2) {
        const house = houses[planetPosition.house];
        description += ` Position in ${house.name} is particularly beneficial for ${house.theme}.`;
    }
    
    return description;
}

// 获取尊贵状态描述
function getDignityStatus(planetKey, sign) {
    const planetData = planets[planetKey];
    if (!planetData || !planetData.dignity) return 'Neutral';
    
    if (planetData.dignity.exaltation === sign) return 'Exaltation';
    if (planetData.dignity.detriment === sign) return 'Detriment';
    if (planetData.dignity.fall === sign) return 'Fall';
    if (zodiacSigns[sign].ruler === planetKey) return 'Domicile';
    
    return 'Peregrine';
}

// 分类影响力强度
function categorizeInfluenceStrength(score) {
    if (score > 0.8) return 'Extremely Strong';
    if (score > 0.6) return 'Strong';
    if (score > 0.4) return 'Moderate';
    if (score > 0.2) return 'Weak';
    return 'Very Weak';
}

// 生成幸运元素
function generateLuckyElements(sign, planetaryScore) {
    const signData = zodiacSigns[sign];
    const elementData = elementProperties[signData.element];
    
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
    const moonPhase = getCurrentMoonPhase();
    const moonInfluence = moonPhases[moonPhase];
    
    // 结合多种因素的种子值
    const seedValue = dayOfYear + today.getMonth() * 31 + planetaryScore * 100 + moonInfluence.influence * 50;
    
    // 幸运颜色（考虑元素和月相）
    let colorPool = [...elementData.colors];
    if (moonInfluence.influence > 0.7) {
        colorPool = colorPool.concat(['Moonlight Silver', 'Stellar Gold', 'Night Sky Purple']);
    }
    const luckyColor = colorPool[Math.floor(seedValue) % colorPool.length];
    
    // 幸运宝石（考虑星座特性）
    let stonePool = [...elementData.stones];
    if (signData.ruler in planets) {
        const rulerPlanet = planets[signData.ruler];
        if (rulerPlanet.keywords.includes('Authority')) {
            stonePool = stonePool.concat(['Amethyst', 'Citrine']);
        }
        if (rulerPlanet.keywords.includes('Love')) {
            stonePool = stonePool.concat(['Rose Quartz', 'Pink Crystal']);
        }
    }
    const luckyStone = stonePool[Math.floor(seedValue * 2) % stonePool.length];
    
    // 幸运植物（考虑季节和元素）
    let herbPool = [...elementData.herbs];
    const season = getSeason(today.getMonth() + 1);
    const seasonalHerbs = {
        'spring': ['Cherry Blossom', 'Violet', 'Mint'],
        'summer': ['Rose', 'Jasmine', 'Lavender'],
        'autumn': ['Osmanthus', 'Chrysanthemum', 'Rosemary'],
        'winter': ['Pine Needle', 'Holly', 'Cinnamon']
    };
    herbPool = herbPool.concat(seasonalHerbs[season] || []);
    const luckyHerb = herbPool[Math.floor(seedValue * 3) % herbPool.length];
    
    // 幸运数字（基于行星影响和个人运势）
    const numerologyBase = (planetaryScore * 100) % 9 + 1;
    const luckyNumber = numerologyBase;
    
    // 次要幸运数字
    const secondaryNumbers = [
        (numerologyBase + 2) % 9 + 1,
        (numerologyBase + 5) % 9 + 1
    ];
    
    // 幸运方向（考虑元素和时间）
    const directions = ['East', 'South', 'West', 'North', 'Southeast', 'Southwest', 'Northeast', 'Northwest'];
    const elementDirection = elementData.direction;
    let directionPool = [elementDirection];
    
    // 根据时间调整方向
    const hour = today.getHours();
    if (hour >= 6 && hour < 12) directionPool.push('East');
    else if (hour >= 12 && hour < 18) directionPool.push('South');
    else if (hour >= 18 && hour < 24) directionPool.push('West');
    else directionPool.push('North');
    
    const luckyDirection = directionPool[Math.floor(seedValue * 5) % directionPool.length];
    
    // 幸运时间段
    const timeSlots = ['Early Morning (6-9 AM)', 'Morning (9 AM-12 PM)', 'Afternoon (12-3 PM)', 'Evening (3-6 PM)', 'Night (6-9 PM)', 'Late Night (9 PM-12 AM)'];
    const luckyTime = timeSlots[Math.floor(seedValue * 7) % timeSlots.length];
    
    // 幸运符号或咒语
    const symbols = ['☽', '☉', '⭐', '🔮', '✨', '🌟', '💫', '🌙'];
    const luckySymbol = symbols[Math.floor(seedValue * 11) % symbols.length];
    
    return {
        color: luckyColor,
        stone: luckyStone,
        herb: luckyHerb,
        number: luckyNumber,
        secondaryNumbers: secondaryNumbers,
        direction: luckyDirection,
        time: luckyTime,
        symbol: luckySymbol,
        metal: elementData.metals[Math.floor(seedValue * 13) % elementData.metals.length]
    };
}

// 计算星座配对
function calculateCompatibility(sign) {
    const signData = zodiacSigns[sign];
    const compatibility = [];
    
    // 基于元素的兼容性
    const elementCompatibility = {
        fire: { high: ['air'], medium: ['fire'], low: ['earth', 'water'] },
        earth: { high: ['water'], medium: ['earth'], low: ['fire', 'air'] },
        air: { high: ['fire'], medium: ['air'], low: ['earth', 'water'] },
        water: { high: ['earth'], medium: ['water'], low: ['fire', 'air'] }
    };
    
    // 基于质量的兼容性
    const qualityCompatibility = {
        cardinal: { high: ['cardinal'], medium: ['mutable'], low: ['fixed'] },
        fixed: { high: ['fixed'], medium: ['cardinal'], low: ['mutable'] },
        mutable: { high: ['mutable'], medium: ['fixed'], low: ['cardinal'] }
    };
    
    Object.entries(zodiacSigns).forEach(([targetSign, targetData]) => {
        if (targetSign === sign) return;
        
        let compatibilityScore = 50; // 基础分数
        let compatibilityLevel = 'Average';
        let description = '';
        
        // 元素兼容性评分
        const elementComp = elementCompatibility[signData.element];
        if (elementComp.high.includes(targetData.element)) {
            compatibilityScore += 30;
            description += 'Elements in high harmony, ';
        } else if (elementComp.medium.includes(targetData.element)) {
            compatibilityScore += 15;
            description += 'Elements understand each other, ';
        } else {
            compatibilityScore -= 10;
            description += 'Elements need adjustment, ';
        }
        
        // 质量兼容性评分
        const qualityComp = qualityCompatibility[signData.quality];
        if (qualityComp.high.includes(targetData.quality)) {
            compatibilityScore += 20;
            description += 'behavioral patterns complement each other';
        } else if (qualityComp.medium.includes(targetData.quality)) {
            compatibilityScore += 10;
            description += 'behavioral patterns are similar';
        } else {
            compatibilityScore -= 5;
            description += 'behavioral patterns have differences';
        }
        
        // 主宰行星的影响
        const rulerCompatibility = calculateRulerCompatibility(signData.ruler, targetData.ruler);
        compatibilityScore += rulerCompatibility;
        
        // 特殊配对加分
        const specialBonus = getSpecialPairingBonus(sign, targetSign);
        compatibilityScore += specialBonus;
        
        // 确定兼容性等级
        if (compatibilityScore >= 85) compatibilityLevel = 'Perfect Match';
        else if (compatibilityScore >= 75) compatibilityLevel = 'Highly Compatible';
        else if (compatibilityScore >= 60) compatibilityLevel = 'Good Match';
        else if (compatibilityScore >= 45) compatibilityLevel = 'Needs Effort';
        else compatibilityLevel = 'Challenging';
        
        compatibility.push({
            sign: targetData.name,
            symbol: targetData.symbol,
            element: targetData.element,
            quality: targetData.quality,
            compatibility: compatibilityLevel,
            score: Math.max(0, Math.min(100, compatibilityScore)),
            description: description,
            advice: generateCompatibilityAdvice(sign, targetSign, compatibilityScore)
        });
    });
    
    // 按兼容性评分排序
    return compatibility.sort((a, b) => b.score - a.score);
}

// 计算主宰行星兼容性
function calculateRulerCompatibility(ruler1, ruler2) {
    const planetCompatibility = {
        'sun': { 'moon': 15, 'mercury': 10, 'venus': 12, 'mars': 8, 'jupiter': 18, 'saturn': 5 },
        'moon': { 'sun': 15, 'mercury': 8, 'venus': 20, 'mars': 5, 'jupiter': 12, 'saturn': 3 },
        'mercury': { 'sun': 10, 'moon': 8, 'venus': 15, 'mars': 12, 'jupiter': 14, 'saturn': 8 },
        'venus': { 'sun': 12, 'moon': 20, 'mercury': 15, 'mars': 18, 'jupiter': 16, 'saturn': 6 },
        'mars': { 'sun': 8, 'moon': 5, 'mercury': 12, 'venus': 18, 'jupiter': 10, 'saturn': 15 },
        'jupiter': { 'sun': 18, 'moon': 12, 'mercury': 14, 'venus': 16, 'mars': 10, 'saturn': 8 },
        'saturn': { 'sun': 5, 'moon': 3, 'mercury': 8, 'venus': 6, 'mars': 15, 'jupiter': 8 },
        'uranus': { 'mercury': 12, 'venus': 8, 'mars': 10, 'jupiter': 6, 'saturn': 5 },
        'neptune': { 'moon': 15, 'venus': 18, 'jupiter': 12, 'saturn': 3 },
        'pluto': { 'mars': 20, 'saturn': 12, 'uranus': 8 }
    };
    
    return planetCompatibility[ruler1]?.[ruler2] || 0;
}

// 获取特殊配对加分
function getSpecialPairingBonus(sign1, sign2) {
    const specialPairs = {
        'aries-libra': 15,      // 对宫和谐
        'taurus-scorpio': 12,   // 对宫互补
        'gemini-sagittarius': 10, // 对宫平衡
        'cancer-capricorn': 8,  // 对宫稳定
        'leo-aquarius': 6,      // 对宫创新
        'virgo-pisces': 14,     // 对宫完美
        'aries-leo': 18,        // 火象三角
        'aries-sagittarius': 16,
        'leo-sagittarius': 15,
        'taurus-virgo': 17,     // 土象三角
        'taurus-capricorn': 14,
        'virgo-capricorn': 13,
        'gemini-libra': 16,     // 风象三角
        'gemini-aquarius': 15,
        'libra-aquarius': 14,
        'cancer-scorpio': 19,   // 水象三角
        'cancer-pisces': 17,
        'scorpio-pisces': 16
    };
    
    const pair1 = `${sign1}-${sign2}`;
    const pair2 = `${sign2}-${sign1}`;
    
    return specialPairs[pair1] || specialPairs[pair2] || 0;
}

// 生成配对建议
function generateCompatibilityAdvice(sign1, sign2, score) {
    const signData1 = zodiacSigns[sign1];
    const signData2 = zodiacSigns[sign2];
    
    if (score >= 75) {
        return `Your ${signData1.element} element forms perfect harmony with ${signData2.element} element. It's recommended to leverage each other's strengths and support mutual growth.`;
    } else if (score >= 60) {
        return `You have a good foundation. It's recommended to communicate and understand more, appreciating each other's different qualities.`;
    } else if (score >= 45) {
        return `More patience and tolerance are needed. Focus on common interests and avoid conflicts in values.`;
    } else {
        return `Although the challenges are significant, if you truly love each other, you can overcome differences through learning and growth.`;
    }
}

// 主要的占星运势获取函数
async function getHoroscope() {
    const select = document.getElementById('zodiacSelect');
    const selectedSign = select.value;
    
    if (!selectedSign) {
        alert('Please select a zodiac sign!');
        return;
    }
    
    // 显示加载状态
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading">
            <div style="margin-bottom: 1rem;">🌟 Retrieving latest celestial data...</div>
            <div style="font-size: 0.9rem; color: #666;">
                Connecting to professional astronomical database to calculate your most precise horoscope
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';
    resultDiv.classList.remove('hidden');
    
    try {
        // 使用本地计算获取天体位置数据
        const planetaryPositions = getCurrentPlanetaryPositions();
        
        // 使用获取的数据计算占星运势
        const horoscope = calculateAstrologicalHoroscope(selectedSign, planetaryPositions);
        displayHoroscope(horoscope);
        
    } catch (error) {
        console.error('Horoscope calculation failed:', error);
        
        // 出错时显示友好的错误信息
        resultDiv.innerHTML = `
            <div class="error">
                <h3>❌ Calculation Failed</h3>
                <p>Sorry, unable to retrieve horoscope data at this time. Please try again later.</p>
                <button onclick="getHoroscope()" style="margin-top: 1rem;">🔄 Try Again</button>
            </div>
        `;
    }
}

// 显示运势结果
function displayHoroscope(horoscope) {
    const resultDiv = document.getElementById('result');
    
    let html = `
        <div class="horoscope-result">
            <div class="horoscope-header">
                <h2>${horoscope.symbol} ${horoscope.sign} - ${horoscope.date}</h2>
                <div class="overall-score">
                    <span class="score-label">Overall Fortune</span>
                    <span class="score-value ${horoscope.overallScore >= 80 ? 'excellent' : horoscope.overallScore >= 60 ? 'good' : 'average'}">
                        ${Math.round(horoscope.overallScore)}/100
                    </span>
                </div>
                <div class="lifecycle-phase">
                    <span class="phase-label">Life Cycle</span>
                    <span class="phase-value">${horoscope.lifecyclePhase.phase}</span>
                </div>
            </div>
            
            <div class="horoscope-content">
                <div class="main-description">
                    <h3>${horoscope.lifeTheme}</h3>
                    <div class="sign-info">
                        <span class="info-item"><strong>Element:</strong> ${horoscope.element}</span>
                        <span class="info-item"><strong>Quality:</strong> ${horoscope.quality}</span>
                        <span class="info-item"><strong>Ruler:</strong> ${horoscope.rulerSymbol} ${horoscope.ruler}</span>
                    </div>
                    <p><strong>Core Traits:</strong> ${horoscope.traits.join(' • ')}</p>
                    <p><strong>Growth Challenges:</strong> ${horoscope.shadow.join(' • ')}</p>
                    <p class="description">${horoscope.description}</p>
                    <div class="lifecycle-description">
                        <p><strong>Current Life Phase:</strong> ${horoscope.lifecyclePhase.description}</p>
                        <p><strong>Phase Guidance:</strong> ${horoscope.lifecyclePhase.guidance}</p>
                    </div>
                </div>
                
                <div class="moon-phase-section">
                    <h3>${horoscope.moonPhase.symbol} Current Moon Phase: ${horoscope.moonPhase.name}</h3>
                    <div class="moon-info">
                        <p><strong>Lunar Energy:</strong> ${horoscope.moonPhase.energy}</p>
                        <p><strong>Keywords:</strong> ${horoscope.moonPhase.keywords.join(' • ')}</p>
                        <p><strong>Best For:</strong> ${horoscope.moonPhase.bestFor.join(' • ')}</p>
                    </div>
                </div>
                
                <div class="lucky-elements">
                    <h3>✨ Today's Lucky Elements</h3>
                    <div class="lucky-grid">
                        <div class="lucky-item">
                            <div class="lucky-icon">🎨</div>
                            <span class="lucky-text">Lucky Color: ${horoscope.luckyElements.color}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">💎</div>
                            <span class="lucky-text">Lucky Stone: ${horoscope.luckyElements.stone}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🌿</div>
                            <span class="lucky-text">Lucky Plant: ${horoscope.luckyElements.herb}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🔢</div>
                            <span class="lucky-text">Primary Lucky Number: ${horoscope.luckyElements.number}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">📊</div>
                            <span class="lucky-text">Secondary Numbers: ${horoscope.luckyElements.secondaryNumbers.join(', ')}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🧭</div>
                            <span class="lucky-text">Lucky Direction: ${horoscope.luckyElements.direction}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">⏰</div>
                            <span class="lucky-text">Lucky Time: ${horoscope.luckyElements.time}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">${horoscope.luckyElements.symbol}</div>
                            <span class="lucky-text">Protection Symbol: ${horoscope.luckyElements.symbol}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">⚡</div>
                            <span class="lucky-text">Lucky Metal: ${horoscope.luckyElements.metal}</span>
                        </div>
                    </div>
                </div>
                
                <div class="planetary-influences">
                    <h3>🪐 Planetary Influence Analysis</h3>
                    <div class="harmony-indicators">
                        <div class="harmony-item">
                            <span>Elemental Harmony:</span>
                            <div class="harmony-bar">
                                <div class="harmony-fill" style="width: ${(horoscope.elementalHarmony || 0) * 100}%"></div>
                            </div>
                            <span>${Math.round((horoscope.elementalHarmony || 0) * 100)}%</span>
                        </div>
                        <div class="harmony-item">
                            <span>Quality Coordination:</span>
                            <div class="harmony-bar">
                                <div class="harmony-fill" style="width: ${(horoscope.qualityInteraction || 0) * 100}%"></div>
                            </div>
                            <span>${Math.round((horoscope.qualityInteraction || 0) * 100)}%</span>
                        </div>
                    </div>
                    <div class="planet-grid">
    `;
    
    // 添加行星影响
    Object.entries(horoscope.planetaryInfluences).forEach(([planetName, influence]) => {
        const strengthClass = (influence.strength || 'Moderate').toLowerCase().replace(/[^a-z]/g, '');
        html += `
            <div class="planet-item ${strengthClass}">
                <div class="planet-header">
                    <span class="planet-name">${planetName}</span>
                    <span class="influence-strength ${strengthClass}">${influence.strength || 'Moderate'}</span>
                    ${influence.retrograde ? '<span class="retrograde-indicator">⟲</span>' : ''}
                </div>
                <div class="planet-details">
                    <div class="planet-keywords">${influence.keywords.join(' • ')}</div>
                    <div class="planet-house">House: ${influence.houseName}</div>
                    <div class="planet-dignity">Dignity: ${influence.dignity || 'Neutral'}</div>
                    ${influence.aspects && influence.aspects.length > 0 ? `
                        <div class="planet-aspects">
                            Major Aspects: ${influence.aspects.slice(0, 2).map(aspect => 
                                `${aspect.symbol || ''} ${aspect.name}`).join(', ')}
                        </div>
                    ` : ''}
                </div>
                <div class="planet-description">${influence.description}</div>
            </div>
        `;
    });
    
    html += `
                    </div>
                </div>
                
                ${horoscope.celestialEvents && horoscope.celestialEvents.length > 0 ? `
                <div class="celestial-events">
                    <h3>🌌 Current Celestial Events</h3>
                    <div class="celestial-events-table">
                        <table class="events-table">
                            <thead>
                                <tr>
                                    <th>Event Type</th>
                                    <th>Detailed Description</th>
                                    <th>Astrological Significance</th>
                                    <th>Practical Advice</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${horoscope.celestialEvents.map(event => `
                                    <tr class="event-row">
                                        <td class="event-type">${event.type}</td>
                                        <td class="event-description">${event.description}</td>
                                        <td class="event-significance">${event.significance}</td>
                                        <td class="event-advice">${event.advice}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
                ` : ''}
                
                <div class="compatibility">
                    <h3>💕 Zodiac Compatibility Analysis (Top 6)</h3>
                    <div class="compatibility-grid">
    `;
    
    // 添加配对分析
    horoscope.compatibility.forEach((match, index) => {
        const rankClass = index < 2 ? 'top-match' : index < 4 ? 'good-match' : 'okay-match';
        html += `
            <div class="compatibility-item ${rankClass}">
                <div class="match-header">
                    <span class="rank">#${index + 1}</span>
                    <span class="compatible-sign">${match.symbol || ''} ${match.sign}</span>
                    <span class="compatibility-score">${match.score || 0} pts</span>
                </div>
                <div class="match-level">${match.compatibility}</div>
                <div class="match-description">${match.description || ''}</div>
                <div class="match-advice">${match.advice || ''}</div>
            </div>
        `;
    });
    
    html += `
                    </div>
                </div>
                
                <div class="daily-advice">
                    <h3>🔮 Daily Astrological Advice</h3>
                    <div class="advice-list">
    `;
    
    // 添加每日建议
    horoscope.advice.forEach((advice, index) => {
        html += `<div class="advice-item advice-${index}">${advice}</div>`;
    });
    
    html += `
                    </div>
                </div>
                
                <div class="body-connection">
                    <h3>🫀 Mind-Body Connection</h3>
                    <p><strong>Associated Body Parts:</strong> ${horoscope.bodyParts.join(' • ')}</p>
                    <p class="body-advice">Pay special attention to the health of these areas today, and engage in appropriate care and exercise.</p>
                </div>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.remove('hidden');
    
    // 改进的滚动逻辑，避免跳动问题
    setTimeout(() => {
        const resultTop = resultDiv.offsetTop;
        const headerHeight = 80; // 导航栏高度
        const buffer = 20; // 额外缓冲区
        const targetPosition = resultTop - headerHeight - buffer;
        
        // 使用更平滑的滚动
        window.scrollTo({
            top: Math.max(0, targetPosition),
            behavior: 'smooth'
        });
    }, 200);
    
    // 添加交互式元素
    setTimeout(() => {
        addInteractiveElements();
    }, 400);
}

// 添加交互式元素
function addInteractiveElements() {
    // 为行星项目添加悬停效果
    const planetItems = document.querySelectorAll('.planet-item');
    planetItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 25px rgba(0,0,0,0.15)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0,0,0,0.1)';
        });
    });
    
    // 为配对项目添加点击展开效果
    const compatibilityItems = document.querySelectorAll('.compatibility-item');
    compatibilityItems.forEach(item => {
        item.addEventListener('click', function() {
            const advice = this.querySelector('.match-advice');
            const description = this.querySelector('.match-description');
            
            if (advice && description) {
                if (advice.style.display === 'none' || advice.style.display === '') {
                    advice.style.display = 'block';
                    description.style.display = 'block';
                    this.classList.add('expanded');
                } else {
                    advice.style.display = 'none';
                    description.style.display = 'none';
                    this.classList.remove('expanded');
                }
            }
        });
    });
    
    // 为建议项目添加渐入动画
    const adviceItems = document.querySelectorAll('.advice-item');
    adviceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        
        setTimeout(() => {
            item.style.transition = 'all 0.5s ease-out';
            item.style.opacity = '1';
            item.style.transform = 'translateX(0)';
        }, index * 200);
    });
}

// 增强的颜色代码映射
function getColorCode(colorName) {
    const colorMap = {
        'Red': '#ff4757',
        'Fiery Red': '#e74c3c',
        'Pink': '#ff6b9d',
        'Orange': '#ffa502',
        'Solar Orange': '#f39c12',
        'Yellow': '#ffdd59',
        'Vibrant Yellow': '#f1c40f',
        'Gold': '#f39c12',
        'Passionate Gold': '#d4af37',
        'Green': '#26de81',
        'Forest Green': '#27ae60',
        'Earth Brown': '#8b4513',
        'Stable Beige': '#deb887',
        'Quiet Black': '#2c3e50',
        'Blue': '#3742fa',
        'Sky Blue': '#3498db',
        'Deep Sea Blue': '#2980b9',
        'Cloud White': '#ecf0f1',
        'Fresh Silver': '#bdc3c7',
        'Wisdom Purple': '#9b59b6',
        'Mysterious Purple': '#8e44ad',
        'Pearl Silver': '#95a5a6',
        'Moonlight White': '#f8f9fa',
        'Moonlight Silver': '#c0c0c0',
        'Stellar Gold': '#ffd700',
        'Night Sky Purple': '#483d8b',
        'White': '#ffffff',
        'Black': '#2f3542',
        'Silver': '#95a5a6',
        'Brown': '#8b4513'
    };
    return colorMap[colorName] || '#666666';
}

// DOM 加载完成后初始化
document.addEventListener('DOMContentLoaded', function() {
    const horoscopeForm = document.getElementById('horoscopeForm');
    const getHoroscopeBtn = document.getElementById('getHoroscopeBtn');
    const zodiacSelect = document.getElementById('zodiacSelect');
    
    // 表单提交事件
    if (horoscopeForm) {
        horoscopeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            getHoroscope();
        });
    }
    
    // 按钮点击事件
    if (getHoroscopeBtn) {
        getHoroscopeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            getHoroscope();
        });
    }
    
    // 回车键事件
    if (zodiacSelect) {
        zodiacSelect.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                getHoroscope();
            }
        });
    }
    
    // 更新页面顶部的宇宙信息
    updateCosmicInfo();
    
    // 每5分钟更新一次宇宙信息
    setInterval(updateCosmicInfo, 5 * 60 * 1000);
});

// 获取星座起始角度
function getSignStartAngle(sign) {
    const signOrder = ['aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo', 
                      'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'];
    return signOrder.indexOf(sign) * 30;
}

// 获取当前月相
function getCurrentMoonPhase() {
    const today = new Date();
    const lunarCycle = 29.530588853; // 精确的朔望月周期
    const knownNewMoon = new Date('2025-01-11T11:57:00Z'); // 已知新月时间（UTC）
    const daysSinceNewMoon = (today - knownNewMoon) / (1000 * 60 * 60 * 24);
    const cyclePosition = (daysSinceNewMoon % lunarCycle) / lunarCycle;
    
    // 更精确的月相划分
    if (cyclePosition < 0.0625) return 'newMoon';
    if (cyclePosition < 0.1875) return 'waxingCrescent';
    if (cyclePosition < 0.3125) return 'firstQuarter';
    if (cyclePosition < 0.4375) return 'waxingGibbous';
    if (cyclePosition < 0.5625) return 'fullMoon';
    if (cyclePosition < 0.6875) return 'waningGibbous';
    if (cyclePosition < 0.8125) return 'lastQuarter';
    return 'waningCrescent';
}

// 主要占星运势计算函数
function calculateAstrologicalHoroscope(sign, positions) {
    const currentPositions = positions || getCurrentPlanetaryPositions();
    const planetaryData = calculatePlanetaryInfluence(sign, currentPositions);
    const luckyElements = generateLuckyElements(sign, planetaryData.score);
    const compatibility = calculateCompatibility(sign);
    const signData = zodiacSigns[sign];
    
    // 综合运势评分
    const overallScore = Math.round(planetaryData.score * 100);
    
    // 今日建议
    const advice = generateDailyAdvice(sign, planetaryData, overallScore);
    
    // 特殊天象影响
    const celestialEvents = calculateCelestialEvents(currentPositions);
    
    // 生命周期分析
    const lifecycleAnalysis = calculateLifecycleInfluence(sign, currentPositions);
    
    return {
        sign: signData.name,
        symbol: signData.symbol,
        date: new Date().toLocaleDateString('en-US'),
        overallScore: overallScore,
        description: signData.description,
        planetaryInfluences: planetaryData.influences,
        moonPhase: planetaryData.moonPhase,
        luckyElements: luckyElements,
        compatibility: compatibility.slice(0, 6), // 只返回前6个最匹配的
        traits: signData.traits,
        shadow: signData.shadow,
        bodyParts: signData.bodyParts,
        lifeTheme: signData.lifeTheme,
        advice: advice,
        element: signData.element,
        quality: signData.quality,
        ruler: planets[signData.ruler].name,
        rulerSymbol: planets[signData.ruler].symbol,
        elementalHarmony: planetaryData.elementalHarmony,
        qualityInteraction: planetaryData.qualityInteraction,
        celestialEvents: celestialEvents,
        lifecyclePhase: lifecycleAnalysis
    };
}

// 生成每日建议
function generateDailyAdvice(sign, planetaryData, overallScore) {
    let advice = [];
    const signData = zodiacSigns[sign];
    
    // Basic fortune advice
    if (overallScore >= 85) {
        advice.push('🌟 Today is your super lucky day! Cosmic energy resonates perfectly with you. Boldly pursue your dreams!');
    } else if (overallScore >= 70) {
        advice.push('✨ Strong fortune ahead. An excellent time to showcase talents and advance important plans.');
    } else if (overallScore >= 55) {
        advice.push('🌙 Stable fortune. Maintain a positive and optimistic mindset, moving forward steadily.');
    } else if (overallScore >= 40) {
        advice.push('⚠️ Extra caution needed today. Avoid impulsive decisions and listen more to your inner voice.');
    } else {
        advice.push('🧘‍♀️ Today is suitable for introspection and rest, accumulating energy for the next upward cycle.');
    }
    
    // Moon phase based advice
    const moonPhase = planetaryData.moonPhase;
    if (moonPhase.name === 'New Moon') {
        advice.push(`🌑 ${moonPhase.name} Energy: Optimal time for ${moonPhase.bestFor.join(', ')}. Plant the seeds of intention and await their sprouting.`);
    } else if (moonPhase.name === 'Full Moon') {
        advice.push(`🌕 ${moonPhase.name} Energy: Peak period for ${moonPhase.bestFor.join(', ')}. Rich emotions, perfect for completing important matters.`);
    } else if (moonPhase.name.includes('Waxing')) {
        advice.push(`🌓 ${moonPhase.name} Energy: Action period for ${moonPhase.bestFor.join(', ')}. Courageously take the first step.`);
    } else {
        advice.push(`🌗 ${moonPhase.name} Energy: Reflection period for ${moonPhase.bestFor.join(', ')}. Wisdom comes from letting go.`);
    }
    
    // 基于最强行星影响给出建议
    const influences = Object.entries(planetaryData.influences);
    if (influences.length > 0) {
        const strongestPlanet = influences.reduce((max, current) => 
            current[1].score > max[1].score ? current : max);
        
        const planetName = strongestPlanet[0];
        const planetInfo = strongestPlanet[1];
        
        switch (planetName) {
            case 'Sun':
                advice.push('☉ Strong Solar Energy: Showcase your leadership and confidence. Today is a day to shine bright.');
                break;
            case 'Moon':
                advice.push('☽ Sensitive Lunar Energy: Trust your intuition, focus on inner feelings and family relationships.');
                break;
            case 'Mercury':
                advice.push('☿ Active Mercury Energy: Communication is key. Learning new knowledge will bring unexpected rewards.');
                break;
            case 'Venus':
                advice.push('♀ Harmonious Venus Energy: Focus on relationships and beautiful things. Love fortune is especially good.');
                break;
            case 'Mars':
                advice.push('♂ Abundant Mars Energy: Action power is strong, but control impulses and direct passion in the right direction.');
                break;
            case 'Jupiter':
                advice.push('♃ Expansive Jupiter Energy: Perfect for making grand plans, broadening horizons, learning new philosophical ideas.');
                break;
            case 'Saturn':
                advice.push('♄ Stable Saturn Energy: Focus on long-term goals, take responsibility, build lasting structures.');
                break;
            case 'Uranus':
                advice.push('♅ Revolutionary Uranus Energy: Embrace change, try innovation, break conventional thinking patterns.');
                break;
            case 'Neptune':
                advice.push('♆ Spiritual Neptune Energy: Perfect for artistic creation, meditation, or activities helping others.');
                break;
            case 'Pluto':
                advice.push('♇ Transformative Pluto Energy: A period of deep transformation. Courageously face inner shadows.');
                break;
        }
        
        // 逆行特殊建议
        if (planetInfo.retrograde) {
            advice.push(`⟲ ${planetName} Retrograde Influence: This is a time for review, reflection, and re-evaluation. Avoid making hasty major decisions.`);
        }
    }
    
    // Zodiac element based advice
    const element = signData.element;
    const elementAdvice = {
        'fire': '🔥 Fire Element Reminder: Maintain enthusiasm but avoid excessive impulsiveness. Transform your creativity into practical action.',
        'earth': '🌍 Earth Element Reminder: Stay grounded, focus on practical goals. Your persistence will bring rich rewards.',
        'air': '🌬️ Air Element Reminder: Communicate ideas with others more. Your wisdom and communication skills are today\'s wealth.',
        'water': '💧 Water Element Reminder: Listen to your inner voice. Emotional depth is the source of your power.'
    };
    advice.push(elementAdvice[element]);
    
    // 特殊时期建议
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Seasonal transition advice
    if ((month === 3 && day >= 20) || (month === 6 && day >= 21) || 
        (month === 9 && day >= 23) || (month === 12 && day >= 22)) {
        advice.push('🌸 Seasonal Energy: Today is a special day of energy transformation between heaven and earth, particularly suitable for making new life plans.');
    }
    
    return advice;
}

// 计算天象事件
function calculateCelestialEvents(positions) {
    const events = [];
    
    // 检查行星合相
    const planetKeys = Object.keys(positions);
    for (let i = 0; i < planetKeys.length; i++) {
        for (let j = i + 1; j < planetKeys.length; j++) {
            const planet1 = planetKeys[i];
            const planet2 = planetKeys[j];
            const pos1 = positions[planet1];
            const pos2 = positions[planet2];
            
            if (pos1 && pos2) {
                const angleDiff = Math.abs(pos1.degree - pos2.degree);
                const normalizedDiff = Math.min(angleDiff, 360 - angleDiff);
                
                if (normalizedDiff <= 5) { // 5度内视为合相
                    events.push({
                        type: 'Planetary Conjunction',
                        description: `${planets[planet1]?.name || planet1} forms a tight conjunction with ${planets[planet2]?.name || planet2}`,
                        significance: 'Energy fusion, enhanced influence',
                        advice: 'Pay attention to the life areas represented by these two planets, there may be important developments'
                    });
                }
            }
        }
    }
    
    // 检查逆行行星
    const retrogradeCount = Object.values(positions).filter(pos => pos?.retrograde).length;
    if (retrogradeCount >= 3) {
        events.push({
            type: 'Multiple Planet Retrograde',
            description: `Currently ${retrogradeCount} planets are in retrograde state`,
            significance: 'Collective reflection period, re-evaluation time',
            advice: 'Avoid hasty decisions, spend more time reviewing and organizing past experiences'
        });
    }
    
    // 月相特殊影响
    const moonPhase = getCurrentMoonPhase();
    if (moonPhase === 'fullMoon' && positions.moon) {
        events.push({
            type: 'Full Moon High Energy',
            description: 'Full moon energy reaches its peak',
            significance: 'Peak period for emotions, intuition and creativity',
            advice: 'Use this powerful energy to complete important projects, but pay attention to emotional management'
        });
    }
    
    return events;
}

// 计算生命周期影响
function calculateLifecycleInfluence(sign, positions) {
    const signData = zodiacSigns[sign];
    const ruler = positions[signData.ruler];
    
    if (!ruler) return { phase: 'Stable Period', description: 'Currently in a relatively stable development phase', guidance: 'Keep an open mind and be ready to embrace life\'s changes.' };
    
    const rulerHouse = ruler.house;
    const isRetrograde = ruler.retrograde;
    
    let phase = 'Growth Period';
    let description = '';
    
    // Determine life phase based on ruling planet house position
    if (rulerHouse <= 3) {
        phase = isRetrograde ? 'Introspection Period' : 'New Birth Period';
        description = isRetrograde ? 
            'Suitable for deep self-exploration and re-knowing yourself' : 
            'Full of new possibilities, an active period suitable for starting new projects';
    } else if (rulerHouse <= 6) {
        phase = isRetrograde ? 'Adjustment Period' : 'Building Period';
        description = isRetrograde ? 
            'Need to adjust existing plans and directions, optimize working methods' : 
            'A period of steady building and development, focusing on skill enhancement';
    } else if (rulerHouse <= 9) {
        phase = isRetrograde ? 'Release Period' : 'Expansion Period';
        description = isRetrograde ? 
            'Let go of relationships and patterns that no longer serve, making way for new developments' : 
            'Expanding outward, establishing new cooperative relationships and social connections';
    } else {
        phase = isRetrograde ? 'Transformation Period' : 'Achievement Period';
        description = isRetrograde ? 
            'Deep transformation is occurring, preparing for the next life stage' : 
            'Harvesting the fruits of previous efforts, exerting greater influence in society';
    }
    
    return {
        phase: phase,
        description: description,
        guidance: generateLifecycleGuidance(phase)
    };
}

// Generate lifecycle guidance
function generateLifecycleGuidance(phase) {
    const guidance = {
        'New Birth Period': 'Bravely try new things, set clear goals, and invest in the future.',
        'Introspection Period': 'Take time to understand yourself, clear mental clutter, and prepare for inner growth.',
        'Building Period': 'Focus on skill development, establish solid foundations, and patiently accumulate experience.',
        'Adjustment Period': 'Flexibly respond to changes, correct direction, and optimize existing lifestyle.',
        'Expansion Period': 'Actively socialize, build meaningful connections, and expand life possibilities.',
        'Release Period': 'Bravely let go of the past, create space for new opportunities, and travel light.',
        'Achievement Period': 'Enjoy the fruits of success while taking on greater responsibilities and guiding others.',
        'Transformation Period': 'Embrace deep changes and prepare for the next chapter of life.',
        'Stable Period': 'Maintain the status quo, develop steadily, and accumulate strength for future breakthroughs.'
    };
    
    return guidance[phase] || 'Keep an open mind and be ready to embrace life\'s changes.';
}

// 计算当前主导行星
function getCurrentDominantPlanet() {
    const currentPositions = getCurrentPlanetaryPositions();
    let strongestPlanet = null;
    let maxInfluence = 0;
    
    // 计算各行星的综合影响力
    Object.entries(currentPositions).forEach(([planetKey, position]) => {
        const planetData = planets[planetKey];
        if (!planetData || !position) return;
        
        // 基于行星位置、逆行状态和基础影响力计算综合权重
        let influence = planetData.influence;
        
        // 考虑逆行影响
        if (position.retrograde) {
            influence *= 0.8; // 逆行时影响力稍减但更深层
        }
        
        // 考虑行星强度
        influence *= (position.intensity || 1.0);
        
        // 考虑宫位影响（角宫更强）
        if ([1, 4, 7, 10].includes(position.house)) {
            influence *= 1.3; // 角宫加权
        } else if ([2, 5, 8, 11].includes(position.house)) {
            influence *= 1.1; // 继宫稍加权
        }
        
        if (influence > maxInfluence) {
            maxInfluence = influence;
            strongestPlanet = planetData;
        }
    });
    
    return strongestPlanet ? {
        name: strongestPlanet.name,
        symbol: strongestPlanet.symbol,
        influence: maxInfluence
    } : {
        name: 'Sun',
        symbol: '☉',
        influence: 1.0
    };
}

// 计算当前宇宙能量指数
function getCurrentCosmicEnergy() {
    const currentPositions = getCurrentPlanetaryPositions();
    const moonPhase = getCurrentMoonPhase();
    const moonInfluence = moonPhases[moonPhase];
    
    // 基础能量计算
    let totalEnergy = 0;
    let planetCount = 0;
    
    // 累计所有行星的能量贡献
    Object.entries(currentPositions).forEach(([planetKey, position]) => {
        const planetData = planets[planetKey];
        if (!planetData || !position) return;
        
        planetCount++;
        let planetEnergy = planetData.influence;
        
        // 月相对能量的影响
        if (planetKey === 'moon') {
            planetEnergy *= moonInfluence.influence * 1.5; // 月亮受月相影响最大
        } else if (planetKey === 'sun') {
            planetEnergy *= (2 - moonInfluence.influence); // 太阳与月相呈反比
        } else {
            planetEnergy *= (0.8 + moonInfluence.influence * 0.4); // 其他行星受月相适度影响
        }
        
        // 逆行影响
        if (position.retrograde) {
            planetEnergy *= 0.9; // 逆行时能量稍微内敛
        }
        
        // 行星强度影响
        planetEnergy *= (position.intensity || 1.0);
        
        totalEnergy += planetEnergy;
    });
    
    // 归一化能量值
    const averageEnergy = planetCount > 0 ? totalEnergy / planetCount : 0.5;
    
    // 添加时间因子（一天内的能量变化）
    const now = new Date();
    const hour = now.getHours();
    const timeBonus = Math.sin((hour - 6) * Math.PI / 12) * 0.1; // 中午能量最强，夜晚最弱
    
    // 添加季节因子
    const month = now.getMonth() + 1;
    const seasonBonus = Math.sin((month - 3) * Math.PI / 6) * 0.05; // 春夏能量较强
    
    const finalEnergy = Math.max(0.1, Math.min(1.0, averageEnergy + timeBonus + seasonBonus));
    
    return Math.round(finalEnergy * 100); // 转换为百分比
}

// Simplified lunar calendar calculation (basic version)
function getLunarDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // Simplified lunar calculation using approximation algorithm
    // In real applications, should use complete lunar conversion library
    const baseYear = 1900;
    const daysFromBase = Math.floor((now - new Date(1900, 0, 31)) / (1000 * 60 * 60 * 24));
    
    // Lunar month names
    const lunarMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Lunar day ordinals
    const lunarDays = ['1st', '2nd', '3rd', '4th', '5th', '6th', '7th', '8th', '9th', '10th',
                      '11th', '12th', '13th', '14th', '15th', '16th', '17th', '18th', '19th', '20th',
                      '21st', '22nd', '23rd', '24th', '25th', '26th', '27th', '28th', '29th', '30th'];
    
    // Simple lunar approximation calculation
    const lunarCycle = 29.53; // Average lunar month length
    const monthsFromBase = Math.floor(daysFromBase / lunarCycle);
    const lunarYear = Math.floor(monthsFromBase / 12) + baseYear;
    const lunarMonth = (monthsFromBase % 12);
    const lunarDay = Math.floor((daysFromBase % lunarCycle)) + 1;
    
    const lunarMonthName = lunarMonths[lunarMonth] || 'Jan';
    const lunarDayName = lunarDays[Math.min(lunarDay - 1, 29)] || '1st';
    
    return `Lunar ${lunarMonthName} ${lunarDayName}`;
}

// Update cosmic information display in page header
function updateCosmicInfo() {
    // Update date information
    const currentDateElement = document.getElementById('currentDate');
    const lunarDateElement = document.getElementById('lunarDate');
    const weekDayElement = document.getElementById('weekDay');
    
    if (currentDateElement || lunarDateElement || weekDayElement) {
        const now = new Date('2025-06-29');
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        // Format Gregorian date
        const formattedDate = `${month}/${day}/${year}`;
        
        // Get weekday
        const weekDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const weekDay = weekDays[now.getDay()];
        
        // Get lunar date
        const lunarDate = getLunarDate();
        
        if (currentDateElement) {
            currentDateElement.textContent = formattedDate;
        }
        if (lunarDateElement) {
            lunarDateElement.textContent = lunarDate;
        }
        if (weekDayElement) {
            weekDayElement.textContent = weekDay;
        }
    }
    
    // Update moon phase information
    const moonPhaseElement = document.getElementById('currentMoonPhase');
    if (moonPhaseElement) {
        const currentPhase = getCurrentMoonPhase();
        const moonPhases = {
            'newMoon': '🌑 New Moon',
            'waxingCrescent': '🌒 Waxing Crescent',
            'firstQuarter': '🌓 First Quarter',
            'waxingGibbous': '🌔 Waxing Gibbous',
            'fullMoon': '🌕 Full Moon',
            'waningGibbous': '🌖 Waning Gibbous',
            'lastQuarter': '🌗 Last Quarter',
            'waningCrescent': '🌘 Waning Crescent'
        };
        moonPhaseElement.textContent = moonPhases[currentPhase] || '🌔 Waxing Gibbous';
    }
    
    // Update dominant planet information
    const dominantPlanetElement = document.getElementById('dominantPlanet');
    if (dominantPlanetElement) {
        const dominantPlanet = getCurrentDominantPlanet();
        dominantPlanetElement.textContent = `${dominantPlanet.symbol} ${dominantPlanet.name}`;
    }
    
    // Update energy index
    const cosmicEnergyElement = document.getElementById('cosmicEnergy');
    if (cosmicEnergyElement) {
        const energyLevel = getCurrentCosmicEnergy();
        let energyStatus = '';
        
        if (energyLevel >= 80) {
            energyStatus = 'Extremely High ⚡';
        } else if (energyLevel >= 65) {
            energyStatus = 'High 🔥';
        } else if (energyLevel >= 50) {
            energyStatus = 'Moderate ⭐';
        } else if (energyLevel >= 35) {
            energyStatus = 'Stable 🌙';
        } else {
            energyStatus = 'Low 💤';
        }
        
        cosmicEnergyElement.textContent = `${energyLevel}% ${energyStatus}`;
    }
}