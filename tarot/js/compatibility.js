// Love Compatibility JavaScript Functions

// 12 Zodiac Signs Data and Professional Matching Algorithm
const zodiacSigns = {
    aries: { name: 'Aries', element: 'fire', quality: 'cardinal', ruler: 'mars' },
    taurus: { name: 'Taurus', element: 'earth', quality: 'fixed', ruler: 'venus' },
    gemini: { name: 'Gemini', element: 'air', quality: 'mutable', ruler: 'mercury' },
    cancer: { name: 'Cancer', element: 'water', quality: 'cardinal', ruler: 'moon' },
    leo: { name: 'Leo', element: 'fire', quality: 'fixed', ruler: 'sun' },
    virgo: { name: 'Virgo', element: 'earth', quality: 'mutable', ruler: 'mercury' },
    libra: { name: 'Libra', element: 'air', quality: 'cardinal', ruler: 'venus' },
    scorpio: { name: 'Scorpio', element: 'water', quality: 'fixed', ruler: 'pluto' },
    sagittarius: { name: 'Sagittarius', element: 'fire', quality: 'mutable', ruler: 'jupiter' },
    capricorn: { name: 'Capricorn', element: 'earth', quality: 'cardinal', ruler: 'saturn' },
    aquarius: { name: 'Aquarius', element: 'air', quality: 'fixed', ruler: 'uranus' },
    pisces: { name: 'Pisces', element: 'water', quality: 'mutable', ruler: 'neptune' }
};

// Zodiac Compatibility Matrix (Based on Traditional Astrology)
const zodiacCompatibility = {
    aries: { aries: 75, taurus: 60, gemini: 85, cancer: 55, leo: 90, virgo: 65, libra: 80, scorpio: 70, sagittarius: 95, capricorn: 50, aquarius: 88, pisces: 58 },
    taurus: { aries: 60, taurus: 80, gemini: 65, cancer: 85, leo: 70, virgo: 90, libra: 75, scorpio: 88, sagittarius: 55, capricorn: 85, aquarius: 60, pisces: 80 },
    gemini: { aries: 85, taurus: 65, gemini: 75, cancer: 70, leo: 88, virgo: 70, libra: 90, scorpio: 65, sagittarius: 85, capricorn: 60, aquarius: 95, pisces: 68 },
    cancer: { aries: 55, taurus: 85, gemini: 70, cancer: 80, leo: 75, virgo: 85, libra: 65, scorpio: 95, sagittarius: 58, capricorn: 80, aquarius: 60, pisces: 90 },
    leo: { aries: 90, taurus: 70, gemini: 88, cancer: 75, leo: 75, virgo: 65, libra: 85, scorpio: 78, sagittarius: 90, capricorn: 68, aquarius: 85, pisces: 70 },
    virgo: { aries: 65, taurus: 90, gemini: 70, cancer: 85, leo: 65, virgo: 80, libra: 75, scorpio: 85, sagittarius: 60, capricorn: 88, aquarius: 68, pisces: 82 },
    libra: { aries: 80, taurus: 75, gemini: 90, cancer: 65, leo: 85, virgo: 75, libra: 78, scorpio: 70, sagittarius: 82, capricorn: 70, aquarius: 90, pisces: 75 },
    scorpio: { aries: 70, taurus: 88, gemini: 65, cancer: 95, leo: 78, virgo: 85, libra: 70, scorpio: 85, sagittarius: 68, capricorn: 85, aquarius: 65, pisces: 88 },
    sagittarius: { aries: 95, taurus: 55, gemini: 85, cancer: 58, leo: 90, virgo: 60, libra: 82, scorpio: 68, sagittarius: 80, capricorn: 65, aquarius: 88, pisces: 70 },
    capricorn: { aries: 50, taurus: 85, gemini: 60, cancer: 80, leo: 68, virgo: 88, libra: 70, scorpio: 85, sagittarius: 65, capricorn: 78, aquarius: 70, pisces: 75 },
    aquarius: { aries: 88, taurus: 60, gemini: 95, cancer: 60, leo: 85, virgo: 68, libra: 90, scorpio: 65, sagittarius: 88, capricorn: 70, aquarius: 80, pisces: 72 },
    pisces: { aries: 58, taurus: 80, gemini: 68, cancer: 90, leo: 70, virgo: 82, libra: 75, scorpio: 88, sagittarius: 70, capricorn: 75, aquarius: 72, pisces: 85 }
};

// Professional Compatibility Analysis Content
const compatibilityAnalysis = {
    high: {
        level: 'Perfect Match',
        description: 'You are a natural pair! Your zodiac energies are highly harmonious, with deep emotional foundation and shared values. This relationship is full of passion and understanding, with very optimistic future prospects.',
        advice: [
            { title: 'Cherish Each Other', content: 'Your connection is rare and precious. Treasure this beautiful relationship and nurture it with care.' },
            { title: 'Keep Communicating', content: 'Even though you are very compatible, maintain open communication and share your inner thoughts and feelings.' },
            { title: 'Grow Together', content: 'Set goals together, support each other, and let this relationship be the driving force for your growth.' }
        ],
        predictions: {
            short: 'Your relationship will become even sweeter in the near future, with possible important progress or decisions.',
            medium: 'In the next 6 months to a year, your relationship will become more solid, possibly considering deeper commitments.',
            long: 'In the long run, you have great potential to move towards marriage and build a happy family.'
        }
    },
    medium: {
        level: 'Great Potential',
        description: 'Your compatibility is good. Although there may be some differences, these very differences attract you to each other. Through understanding and tolerance, this relationship has great development potential.',
        advice: [
            { title: 'Understand Differences', content: 'Accept and appreciate each other\'s differences, approach disagreements with tolerance.' },
            { title: 'Deepen Understanding', content: 'Spend more time getting to know each other deeply and discover more common ground.' },
            { title: 'Patient Cultivation', content: 'Good relationships need time and patience. Don\'t rush things.' }
        ],
        predictions: {
            short: 'You need more patience and understanding recently. You may encounter some minor friction but can resolve it.',
            medium: 'After a period of adjustment, you will find the most suitable way to get along.',
            long: 'If you can continue to nurture it, this relationship has the potential to develop into a stable long-term relationship.'
        }
    },
    low: {
        level: 'Requires Effort',
        description: 'Your zodiac traits have certain differences, and you may not easily understand each other in some aspects. But love can overcome all obstacles. As long as both parties are willing to work hard, you can still have a beautiful relationship.',
        advice: [
            { title: 'Strengthen Communication', content: 'Spend more time talking and try to understand each other\'s thoughts and feelings.' },
            { title: 'Find Common Ground', content: 'Discover your common interests and values to build emotional connections.' },
            { title: 'Learn to Compromise', content: 'Learn to give in and compromise in disagreements, making efforts for the relationship.' }
        ],
        predictions: {
            short: 'There may be some challenges recently that require both parties to put in more effort.',
            medium: 'Through persistence and hard work, you have the chance to overcome difficulties and gradually improve the relationship.',
            long: 'If you can persist, this relationship will help both of you grow tremendously.'
        }
    }
};

// Initialize after page loads
document.addEventListener('DOMContentLoaded', function() {
    setupCompatibilityForm();
});

// Setup compatibility form
function setupCompatibilityForm() {
    const form = document.getElementById('compatibilityForm');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
    }
}

// Handle form submission
async function handleFormSubmit(event) {
    event.preventDefault();
    
    // Get form data
    const formData = new FormData(event.target);
    const data = {
        yourName: formData.get('yourName'),
        yourBirthday: formData.get('yourBirthday'),
        yourGender: formData.get('yourGender'),
        partnerName: formData.get('partnerName'),
        partnerBirthday: formData.get('partnerBirthday'),
        partnerGender: formData.get('partnerGender'),
        relationshipStatus: formData.get('relationshipStatus')
    };
    
    // Show loading state
    const btn = event.target.querySelector('.analyze-btn');
    const btnText = btn.querySelector('.btn-text');
    const btnLoading = btn.querySelector('.btn-loading');
    
    btnText.style.display = 'none';
    btnLoading.style.display = 'inline';
    btn.disabled = true;
    
    // Simulate analysis process
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Perform compatibility analysis
    const result = analyzeCompatibility(data);
    
    // Display results
    displayCompatibilityResult(result);
    
    // Restore button state
    btnText.style.display = 'inline';
    btnLoading.style.display = 'none';
    btn.disabled = false;
}

// Analyze compatibility
function analyzeCompatibility(data) {
    // Get zodiac signs
    const yourZodiac = getZodiacSign(data.yourBirthday);
    const partnerZodiac = getZodiacSign(data.partnerBirthday);
    
    // Calculate various compatibility scores
    const zodiacScore = zodiacCompatibility[yourZodiac][partnerZodiac];
    const birthdayScore = calculateBirthdayCompatibility(data.yourBirthday, data.partnerBirthday);
    const personalityScore = calculatePersonalityCompatibility(yourZodiac, partnerZodiac);
    const loveScore = calculateLovePotential(data);
    
    // Calculate overall compatibility score
    const overallScore = Math.round((zodiacScore * 0.3 + birthdayScore * 0.2 + personalityScore * 0.25 + loveScore * 0.25));
    
    // Determine compatibility level
    let level;
    if (overallScore >= 80) level = 'high';
    else if (overallScore >= 60) level = 'medium';
    else level = 'low';
    
    return {
        yourName: data.yourName,
        partnerName: data.partnerName,
        yourZodiac: zodiacSigns[yourZodiac].name,
        partnerZodiac: zodiacSigns[partnerZodiac].name,
        overallScore,
        zodiacScore,
        birthdayScore,
        personalityScore,
        loveScore,
        level,
        analysis: compatibilityAnalysis[level]
    };
}

// Get zodiac sign from birthday
function getZodiacSign(birthday) {
    const date = new Date(birthday);
    const month = date.getMonth() + 1;
    const day = date.getDate();
    
    if ((month == 3 && day >= 21) || (month == 4 && day <= 19)) return 'aries';
    if ((month == 4 && day >= 20) || (month == 5 && day <= 20)) return 'taurus';
    if ((month == 5 && day >= 21) || (month == 6 && day <= 20)) return 'gemini';
    if ((month == 6 && day >= 21) || (month == 7 && day <= 22)) return 'cancer';
    if ((month == 7 && day >= 23) || (month == 8 && day <= 22)) return 'leo';
    if ((month == 8 && day >= 23) || (month == 9 && day <= 22)) return 'virgo';
    if ((month == 9 && day >= 23) || (month == 10 && day <= 22)) return 'libra';
    if ((month == 10 && day >= 23) || (month == 11 && day <= 21)) return 'scorpio';
    if ((month == 11 && day >= 22) || (month == 12 && day <= 21)) return 'sagittarius';
    if ((month == 12 && day >= 22) || (month == 1 && day <= 19)) return 'capricorn';
    if ((month == 1 && day >= 20) || (month == 2 && day <= 18)) return 'aquarius';
    if ((month == 2 && day >= 19) || (month == 3 && day <= 20)) return 'pisces';
}

// Calculate birthday compatibility
function calculateBirthdayCompatibility(birthday1, birthday2) {
    const date1 = new Date(birthday1);
    const date2 = new Date(birthday2);
    
    // Calculate life numbers
    const lifeNumber1 = calculateLifeNumber(date1);
    const lifeNumber2 = calculateLifeNumber(date2);
    
    // 生命数字匹配度
    const numberCompatibility = {
        1: { 1: 70, 2: 85, 3: 90, 4: 65, 5: 80, 6: 75, 7: 70, 8: 85, 9: 80 },
        2: { 1: 85, 2: 75, 3: 70, 4: 90, 5: 65, 6: 95, 7: 80, 8: 70, 9: 85 },
        3: { 1: 90, 2: 70, 3: 80, 4: 65, 5: 95, 6: 80, 7: 75, 8: 70, 9: 90 },
        4: { 1: 65, 2: 90, 3: 65, 4: 85, 5: 60, 6: 85, 7: 90, 8: 95, 9: 70 },
        5: { 1: 80, 2: 65, 3: 95, 4: 60, 5: 75, 6: 70, 7: 85, 8: 75, 9: 85 },
        6: { 1: 75, 2: 95, 3: 80, 4: 85, 5: 70, 6: 80, 7: 75, 8: 80, 9: 90 },
        7: { 1: 70, 2: 80, 3: 75, 4: 90, 5: 85, 6: 75, 7: 85, 8: 70, 9: 80 },
        8: { 1: 85, 2: 70, 3: 70, 4: 95, 5: 75, 6: 80, 7: 70, 8: 80, 9: 75 },
        9: { 1: 80, 2: 85, 3: 90, 4: 70, 5: 85, 6: 90, 7: 80, 8: 75, 9: 85 }
    };
    
    return numberCompatibility[lifeNumber1][lifeNumber2] || 70;
}

// 计算生命数字
function calculateLifeNumber(date) {
    let sum = date.getFullYear() + (date.getMonth() + 1) + date.getDate();
    while (sum > 9) {
        sum = sum.toString().split('').reduce((a, b) => parseInt(a) + parseInt(b), 0);
    }
    return sum;
}

// 计算性格互补度
function calculatePersonalityCompatibility(zodiac1, zodiac2) {
    const sign1 = zodiacSigns[zodiac1];
    const sign2 = zodiacSigns[zodiac2];
    
    let score = 70; // 基础分
    
    // 元素匹配
    if (sign1.element === sign2.element) score += 10;
    else if ((sign1.element === 'fire' && sign2.element === 'air') || 
             (sign1.element === 'air' && sign2.element === 'fire') ||
             (sign1.element === 'earth' && sign2.element === 'water') ||
             (sign1.element === 'water' && sign2.element === 'earth')) {
        score += 15;
    }
    
    // 模式匹配
    if (sign1.quality !== sign2.quality) score += 10;
    
    // 守护星匹配
    if (sign1.ruler === sign2.ruler) score += 5;
    else if ((sign1.ruler === 'venus' && sign2.ruler === 'mars') ||
             (sign1.ruler === 'mars' && sign2.ruler === 'venus')) {
        score += 15;
    }
    
    return Math.min(score, 100);
}

// 计算爱情潜力
function calculateLovePotential(data) {
    let score = 75; // 基础分
    
    // 根据关系状态调整
    const statusBonus = {
        'single': 5,
        'dating': 10,
        'relationship': 15,
        'engaged': 20,
        'married': 25,
        'complicated': -5
    };
    
    score += statusBonus[data.relationshipStatus] || 0;
    
    // 年龄差异影响
    const yourAge = new Date().getFullYear() - new Date(data.yourBirthday).getFullYear();
    const partnerAge = new Date().getFullYear() - new Date(data.partnerBirthday).getFullYear();
    const ageDiff = Math.abs(yourAge - partnerAge);
    
    if (ageDiff <= 3) score += 10;
    else if (ageDiff <= 7) score += 5;
    else if (ageDiff > 15) score -= 10;
    
    return Math.min(Math.max(score, 30), 100);
}

// 显示匹配结果
function displayCompatibilityResult(result) {
    const resultSection = document.getElementById('compatibilityResult');
    const coupleNames = document.getElementById('coupleNames');
    
    // 更新标题
    coupleNames.textContent = `${result.yourName} & ${result.partnerName} 的爱情匹配报告`;
    
    // 显示结果区域
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // 动画显示总体匹配度
    animateCompatibilityScore(result.overallScore);
    
    // 更新匹配等级和描述
    document.getElementById('compatibilityLevel').textContent = result.analysis.level;
    document.getElementById('compatibilityDescription').textContent = result.analysis.description;
    
    // 动画显示各项分析
    setTimeout(() => animateAnalysisBars(result), 1000);
    
    // 显示建议和预测
    setTimeout(() => displayAdviceAndPredictions(result), 2000);
}

// 动画显示匹配度分数
function animateCompatibilityScore(score) {
    const scoreElement = document.getElementById('compatibilityScore');
    const circleElement = document.getElementById('compatibilityCircle');
    
    const circumference = 2 * Math.PI * 90; // r = 90
    const offset = circumference - (score / 100) * circumference;
    
    // 动画数字
    let currentScore = 0;
    const scoreAnimation = setInterval(() => {
        currentScore += 2;
        if (currentScore >= score) {
            currentScore = score;
            clearInterval(scoreAnimation);
        }
        scoreElement.textContent = currentScore;
    }, 50);
    
    // 动画圆圈
    circleElement.style.strokeDashoffset = offset;
    circleElement.style.transition = 'stroke-dashoffset 2s ease-in-out';
}

// 动画显示分析条
function animateAnalysisBars(result) {
    const bars = {
        zodiacBar: result.zodiacScore,
        birthdayBar: result.birthdayScore,
        personalityBar: result.personalityScore,
        loveBar: result.loveScore
    };
    
    const analyses = {
        zodiacAnalysis: `你们是${result.yourZodiac}和${result.partnerZodiac}的组合，星座配对指数为${result.zodiacScore}%`,
        birthdayAnalysis: `根据生日分析，你们的数字能量匹配度达到${result.birthdayScore}%`,
        personalityAnalysis: `性格互补分析显示，你们在性格方面的匹配度为${result.personalityScore}%`,
        loveAnalysis: `综合各项因素，你们的爱情发展潜力评分为${result.loveScore}%`
    };
    
    Object.keys(bars).forEach((barId, index) => {
        setTimeout(() => {
            const barElement = document.getElementById(barId);
            const analysisElement = document.getElementById(barId.replace('Bar', 'Analysis'));
            
            barElement.style.width = bars[barId] + '%';
            analysisElement.textContent = analyses[barId.replace('Bar', 'Analysis')];
        }, index * 500);
    });
}

// 显示建议和预测
function displayAdviceAndPredictions(result) {
    const adviceContent = document.getElementById('relationshipAdvice');
    adviceContent.innerHTML = '';
    
    result.analysis.advice.forEach(advice => {
        const adviceItem = document.createElement('div');
        adviceItem.className = 'advice-item';
        adviceItem.innerHTML = `
            <h4>${advice.title}</h4>
            <p>${advice.content}</p>
        `;
        adviceContent.appendChild(adviceItem);
    });
    
    // 更新预测内容
    document.getElementById('shortTermPrediction').textContent = result.analysis.predictions.short;
    document.getElementById('mediumTermPrediction').textContent = result.analysis.predictions.medium;
    document.getElementById('longTermPrediction').textContent = result.analysis.predictions.long;
}

// 重置测试
function resetTest() {
    const form = document.getElementById('compatibilityForm');
    const result = document.getElementById('compatibilityResult');
    
    form.reset();
    result.style.display = 'none';
    
    // 滚动回表单区域
    form.scrollIntoView({ behavior: 'smooth' });
} 