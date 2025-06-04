// 专业占星学运势计算系统 - 高级版本
// 基于传统占星学和现代占星学理论

// 精确的行星数据和影响力系统
const planets = {
    sun: { 
        name: '太阳', 
        symbol: '☉',
        influence: 1.0, 
        keywords: ['自我', '意志力', '领导力', '权威', '生命力', '父亲', '创造'],
        houses: [1, 5],
        aspects: ['合相', '对冲', '三分相', '四分相', '六分相'],
        orbitalPeriod: 365.25,
        avgDaily: 0.9856,
        dignity: { exaltation: 'aries', detriment: 'aquarius', fall: 'libra' }
    },
    moon: { 
        name: '月亮', 
        symbol: '☽',
        influence: 0.9, 
        keywords: ['情感', '直觉', '记忆', '母性', '潜意识', '家庭', '安全感'],
        houses: [4, 2],
        aspects: ['合相', '六分相', '三分相', '四分相'],
        orbitalPeriod: 27.32,
        avgDaily: 13.176,
        dignity: { exaltation: 'taurus', detriment: 'capricorn', fall: 'scorpio' }
    },
    mercury: { 
        name: '水星', 
        symbol: '☿',
        influence: 0.7, 
        keywords: ['沟通', '思维', '学习', '旅行', '商业', '技能', '适应'],
        houses: [3, 6],
        aspects: ['合相', '六分相', '四分相', '三分相'],
        orbitalPeriod: 87.97,
        avgDaily: 4.092,
        dignity: { exaltation: 'virgo', detriment: 'sagittarius', fall: 'pisces' }
    },
    venus: { 
        name: '金星', 
        symbol: '♀',
        influence: 0.8, 
        keywords: ['爱情', '美感', '金钱', '和谐', '艺术', '价值观', '享受'],
        houses: [2, 7],
        aspects: ['合相', '三分相', '六分相', '四分相'],
        orbitalPeriod: 224.7,
        avgDaily: 1.602,
        dignity: { exaltation: 'pisces', detriment: 'aries', fall: 'virgo' }
    },
    mars: { 
        name: '火星', 
        symbol: '♂',
        influence: 0.7, 
        keywords: ['行动力', '冲动', '竞争', '性能量', '勇气', '争斗', '开拓'],
        houses: [1, 8],
        aspects: ['对冲', '四分相', '合相', '三分相'],
        orbitalPeriod: 686.98,
        avgDaily: 0.524,
        dignity: { exaltation: 'capricorn', detriment: 'libra', fall: 'cancer' }
    },
    jupiter: { 
        name: '木星', 
        symbol: '♃',
        influence: 0.6, 
        keywords: ['扩展', '哲学', '幸运', '智慧', '宗教', '法律', '高等教育'],
        houses: [9, 12],
        aspects: ['三分相', '六分相', '合相', '对冲'],
        orbitalPeriod: 4332.59,
        avgDaily: 0.083,
        dignity: { exaltation: 'cancer', detriment: 'gemini', fall: 'capricorn' }
    },
    saturn: { 
        name: '土星', 
        symbol: '♄',
        influence: 0.5, 
        keywords: ['限制', '责任', '结构', '时间', '权威', '纪律', '成熟'],
        houses: [10, 11],
        aspects: ['四分相', '对冲', '合相', '三分相'],
        orbitalPeriod: 10759.22,
        avgDaily: 0.033,
        dignity: { exaltation: 'libra', detriment: 'cancer', fall: 'aries' }
    },
    uranus: {
        name: '天王星',
        symbol: '♅',
        influence: 0.4,
        keywords: ['革新', '突破', '自由', '科技', '反叛', '独立', '未来'],
        houses: [11, 1],
        aspects: ['四分相', '对冲', '合相', '三分相'],
        orbitalPeriod: 30688.5,
        avgDaily: 0.012,
        dignity: { exaltation: 'scorpio', detriment: 'leo', fall: 'taurus' }
    },
    neptune: {
        name: '海王星',
        symbol: '♆',
        influence: 0.4,
        keywords: ['梦想', '幻象', '灵性', '艺术', '同情', '牺牲', '欺骗'],
        houses: [12, 9],
        aspects: ['三分相', '六分相', '四分相', '合相'],
        orbitalPeriod: 60190,
        avgDaily: 0.006,
        dignity: { exaltation: 'leo', detriment: 'virgo', fall: 'aquarius' }
    },
    pluto: {
        name: '冥王星',
        symbol: '♇',
        influence: 0.3,
        keywords: ['转化', '重生', '深层', '权力', '死亡', '再生', '隐秘'],
        houses: [8, 1],
        aspects: ['合相', '四分相', '对冲', '三分相'],
        orbitalPeriod: 90465,
        avgDaily: 0.004,
        dignity: { exaltation: 'leo', detriment: 'taurus', fall: 'aquarius' }
    },
    northNode: {
        name: '北交点',
        symbol: '☊',
        influence: 0.3,
        keywords: ['命运', '成长', '目标', '未来', '发展', '学习'],
        orbitalPeriod: 6798.38,
        avgDaily: -0.053,
        isNode: true
    },
    southNode: {
        name: '南交点',
        symbol: '☋',
        influence: 0.2,
        keywords: ['过去', '天赋', '习惯', '释放', '完成'],
        orbitalPeriod: 6798.38,
        avgDaily: -0.053,
        isNode: true
    }
};

// 增强的占星学十二宫位系统
const houses = {
    1: { 
        name: '命宫（上升宫）', 
        theme: '自我形象、个性、外貌、第一印象', 
        keywords: ['身份', '外表', '开始', '活力'],
        element: 'cardinal',
        significance: 'angular'
    },
    2: { 
        name: '财帛宫', 
        theme: '金钱、物质、价值观、自我价值', 
        keywords: ['收入', '财产', '价值', '资源'],
        element: 'fixed',
        significance: 'succedent'
    },
    3: { 
        name: '兄弟宫', 
        theme: '沟通、学习、短途旅行、兄弟姐妹', 
        keywords: ['沟通', '思维', '学习', '邻居'],
        element: 'mutable',
        significance: 'cadent'
    },
    4: { 
        name: '田宅宫（天底）', 
        theme: '家庭、根基、房产、内在自我', 
        keywords: ['家庭', '童年', '根基', '私密'],
        element: 'cardinal',
        significance: 'angular'
    },
    5: { 
        name: '子女宫', 
        theme: '创造力、恋爱、娱乐、子女', 
        keywords: ['创意', '爱情', '娱乐', '投机'],
        element: 'fixed',
        significance: 'succedent'
    },
    6: { 
        name: '奴仆宫', 
        theme: '工作、健康、日常、服务', 
        keywords: ['工作', '健康', '服务', '习惯'],
        element: 'mutable',
        significance: 'cadent'
    },
    7: { 
        name: '夫妻宫（下降宫）', 
        theme: '伙伴关系、婚姻、公开敌人、合作', 
        keywords: ['伙伴', '婚姻', '合作', '他人'],
        element: 'cardinal',
        significance: 'angular'
    },
    8: { 
        name: '疾厄宫', 
        theme: '深层转化、死亡、他人资源、神秘', 
        keywords: ['转化', '共享', '投资', '神秘'],
        element: 'fixed',
        significance: 'succedent'
    },
    9: { 
        name: '迁移宫', 
        theme: '哲学、高等教育、远行、宗教', 
        keywords: ['哲学', '教育', '旅行', '信念'],
        element: 'mutable',
        significance: 'cadent'
    },
    10: { 
        name: '官禄宫（天顶）', 
        theme: '事业、声誉、社会地位、目标', 
        keywords: ['事业', '名声', '权威', '目标'],
        element: 'cardinal',
        significance: 'angular'
    },
    11: { 
        name: '福德宫', 
        theme: '朋友、希望、团体、社会意识', 
        keywords: ['友谊', '希望', '社交', '理想'],
        element: 'fixed',
        significance: 'succedent'
    },
    12: { 
        name: '玄秘宫', 
        theme: '潜意识、隐藏、慈善、业力', 
        keywords: ['潜意识', '隐秘', '精神', '牺牲'],
        element: 'mutable',
        significance: 'cadent'
    }
};

// 精确的月相系统
const moonPhases = {
    newMoon: { 
        name: '新月', 
        symbol: '🌑',
        influence: 0.3, 
        keywords: ['新开始', '种子', '意图设定', '内省'],
        energy: '内向收敛',
        bestFor: ['制定计划', '冥想', '意图设定']
    },
    waxingCrescent: { 
        name: '娥眉月', 
        symbol: '🌒',
        influence: 0.5, 
        keywords: ['成长', '建设', '积累', '行动'],
        energy: '外向扩展',
        bestFor: ['开始行动', '学习新技能', '建立关系']
    },
    firstQuarter: { 
        name: '上弦月', 
        symbol: '🌓',
        influence: 0.7, 
        keywords: ['挑战', '决策', '行动', '突破'],
        energy: '动态平衡',
        bestFor: ['做决定', '克服阻碍', '调整计划']
    },
    waxingGibbous: { 
        name: '盈凸月', 
        symbol: '🌔',
        influence: 0.8, 
        keywords: ['调整', '完善', '坚持', '准备'],
        energy: '趋向完整',
        bestFor: ['完善细节', '加强努力', '准备收获']
    },
    fullMoon: { 
        name: '满月', 
        symbol: '🌕',
        influence: 1.0, 
        keywords: ['高潮', '完成', '释放', '觉醒'],
        energy: '极化显现',
        bestFor: ['完成项目', '庆祝成就', '释放情感']
    },
    waningGibbous: { 
        name: '亏凸月', 
        symbol: '🌖',
        influence: 0.8, 
        keywords: ['感谢', '分享', '传播', '给予'],
        energy: '外向给予',
        bestFor: ['分享成果', '教导他人', '回馈社会']
    },
    lastQuarter: { 
        name: '下弦月', 
        symbol: '🌗',
        influence: 0.5, 
        keywords: ['释放', '清理', '反思', '放下'],
        energy: '内向清理',
        bestFor: ['断舍离', '原谅', '清理环境']
    },
    waningCrescent: { 
        name: '残月', 
        symbol: '🌘',
        influence: 0.3, 
        keywords: ['休息', '恢复', '准备', '静思'],
        energy: '深度内化',
        bestFor: ['休息恢复', '深度思考', '准备新周期']
    }
};

// 精确的行星相位角度系统
const aspectAngles = {
    conjunction: { 
        name: '合相', 
        symbol: '☌',
        angle: 0, 
        orb: 8, 
        nature: 'neutral', 
        strength: 1.0,
        meaning: '能量融合，强化影响'
    },
    sextile: { 
        name: '六分相', 
        symbol: '⚹',
        angle: 60, 
        orb: 6, 
        nature: 'harmonious', 
        strength: 0.6,
        meaning: '和谐机会，轻松发展'
    },
    square: { 
        name: '四分相', 
        symbol: '□',
        angle: 90, 
        orb: 8, 
        nature: 'challenging', 
        strength: 0.8,
        meaning: '紧张冲突，需要行动'
    },
    trine: { 
        name: '三分相', 
        symbol: '△',
        angle: 120, 
        orb: 8, 
        nature: 'harmonious', 
        strength: 0.9,
        meaning: '天然和谐，天赋才能'
    },
    opposition: { 
        name: '对冲', 
        symbol: '☍',
        angle: 180, 
        orb: 8, 
        nature: 'challenging', 
        strength: 1.0,
        meaning: '极化对立，需要平衡'
    },
    quintile: {
        name: '五分相',
        symbol: 'Q',
        angle: 72,
        orb: 2,
        nature: 'creative',
        strength: 0.4,
        meaning: '创造天赋，特殊才能'
    },
    semisextile: {
        name: '半六分相',
        symbol: '⚺',
        angle: 30,
        orb: 3,
        nature: 'minor',
        strength: 0.3,
        meaning: '微妙调整，潜在机会'
    }
};

// 增强的元素相关详细属性
const elementProperties = {
    fire: {
        quality: '主动进取',
        energy: '阳性',
        season: ['春', '夏'],
        colors: ['烈焰红', '太阳橙', '活力黄', '热情金'],
        stones: ['红宝石', '石榴石', '黄水晶', '琥珀', '火玛瑙'],
        herbs: ['肉桂', '丁香', '迷迭香', '姜', '辣椒'],
        metals: ['金', '铁'],
        direction: '南',
        keywords: ['热情', '冲动', '领导', '创造', '勇敢']
    },
    earth: {
        quality: '稳定务实',
        energy: '阴性',
        season: ['秋'],
        colors: ['大地棕', '森林绿', '稳重米', '沉静黑'],
        stones: ['翡翠', '玛瑙', '虎眼石', '碧玉', '孔雀石'],
        herbs: ['鼠尾草', '薰衣草', '雪松', '广藿香'],
        metals: ['铜', '铅'],
        direction: '北',
        keywords: ['稳定', '实用', '可靠', '耐心', '物质']
    },
    air: {
        quality: '灵活变通',
        energy: '阳性',
        season: ['春'],
        colors: ['天空蓝', '云朵白', '清新银', '智慧紫'],
        stones: ['蓝宝石', '青金石', '海蓝宝石', '水晶', '紫水晶'],
        herbs: ['薄荷', '柠檬草', '尤加利', '茴香'],
        metals: ['水银', '铝'],
        direction: '东',
        keywords: ['思维', '沟通', '自由', '理性', '社交']
    },
    water: {
        quality: '感性直觉',
        energy: '阴性',
        season: ['冬'],
        colors: ['深海蓝', '神秘紫', '珍珠银', '月光白'],
        stones: ['月长石', '珍珠', '海蓝宝', '拉长石', '玉髓'],
        herbs: ['洋甘菊', '茉莉', '玫瑰', '柳树皮'],
        metals: ['银', '铂'],
        direction: '西',
        keywords: ['情感', '直觉', '同情', '深度', '流动']
    }
};

// 增强的十二星座详细信息
const zodiacSigns = {
    aries: {
        name: '白羊座',
        symbol: '♈',
        element: 'fire',
        quality: 'cardinal',
        ruler: 'mars',
        dates: '3.21-4.19',
        decanRulers: ['mars', 'sun', 'jupiter'],
        traits: ['冲动', '热情', '勇敢', '独立', '领导', '直接'],
        shadow: ['暴躁', '自私', '冲动', '缺乏耐心'],
        bodyParts: ['头部', '大脑', '面部'],
        lifeTheme: '我是 - 开拓自我认同',
        description: '今天火星能量强劲，你的领导才能和开拓精神将得到充分展现。在人际关系中要注意控制脾气，用你的热情感染他人而非强迫。事业上有突破性进展的机会。'
    },
    taurus: {
        name: '金牛座',
        symbol: '♉',
        element: 'earth',
        quality: 'fixed',
        ruler: 'venus',
        dates: '4.20-5.20',
        decanRulers: ['venus', 'mercury', 'saturn'],
        traits: ['稳重', '固执', '务实', '享受', '忠诚', '坚持'],
        shadow: ['顽固', '贪婪', '懒惰', '占有欲'],
        bodyParts: ['颈部', '喉咙', '甲状腺'],
        lifeTheme: '我拥有 - 建立稳定价值',
        description: '金星的优雅能量今天特别强烈，财运和感情运势都有提升。你的稳重态度会让他人信赖，适合处理重要的财务决策。在美食、艺术方面会有特别的享受。'
    },
    gemini: {
        name: '双子座',
        symbol: '♊',
        element: 'air',
        quality: 'mutable',
        ruler: 'mercury',
        dates: '5.21-6.21',
        decanRulers: ['mercury', 'venus', 'uranus'],
        traits: ['机智', '多变', '好奇', '沟通', '适应', '聪明'],
        shadow: ['肤浅', '善变', '八卦', '不专注'],
        bodyParts: ['手臂', '手', '肺部', '神经系统'],
        lifeTheme: '我思考 - 收集和传播信息',
        description: '水星赋予你超凡的沟通天赋，今天适合进行重要谈判、学习新技能或发布重要信息。你的多才多艺会给人留下深刻印象，但要注意专注度。'
    },
    cancer: {
        name: '巨蟹座',
        symbol: '♋',
        element: 'water',
        quality: 'cardinal',
        ruler: 'moon',
        dates: '6.22-7.22',
        decanRulers: ['moon', 'pluto', 'neptune'],
        traits: ['敏感', '母性', '保护', '情感丰富', '直觉', '温和'],
        shadow: ['情绪化', '过度保护', '消极', '怀旧'],
        bodyParts: ['胸部', '胃部', '消化系统'],
        lifeTheme: '我感受 - 培养情感安全',
        description: '月亮的温柔能量让你的直觉特别敏锐，家庭关系是今天的重点。你的同理心和照顾他人的能力会得到认可。适合进行情感交流和家庭聚会。'
    },
    leo: {
        name: '狮子座',
        symbol: '♌',
        element: 'fire',
        quality: 'fixed',
        ruler: 'sun',
        dates: '7.23-8.22',
        decanRulers: ['sun', 'jupiter', 'mars'],
        traits: ['自信', '慷慨', '戏剧性', '领导力', '创造', '高贵'],
        shadow: ['傲慢', '自负', '专制', '虚荣'],
        bodyParts: ['心脏', '背部', '脊椎'],
        lifeTheme: '我创造 - 表达创意自我',
        description: '太阳的光辉今天格外耀眼，你就是众人瞩目的焦点。创意项目将有重大突破，你的表演天赋和领导魅力无人可挡。记住用你的光芒温暖他人。'
    },
    virgo: {
        name: '处女座',
        symbol: '♍',
        element: 'earth',
        quality: 'mutable',
        ruler: 'mercury',
        dates: '8.23-9.22',
        decanRulers: ['mercury', 'saturn', 'venus'],
        traits: ['完美主义', '分析', '服务', '实用', '细致', '谦逊'],
        shadow: ['挑剔', '焦虑', '过度分析', '自我批评'],
        bodyParts: ['腹部', '肠道', '消化系统'],
        lifeTheme: '我分析 - 完善和服务',
        description: '水星赋予你精确的分析能力，今天在工作中能发现他人忽视的重要细节。你的服务精神和专业态度会获得赞赏。健康管理需要特别关注。'
    },
    libra: {
        name: '天秤座',
        symbol: '♎',
        element: 'air',
        quality: 'cardinal',
        ruler: 'venus',
        dates: '9.23-10.23',
        decanRulers: ['venus', 'uranus', 'mercury'],
        traits: ['平衡', '和谐', '外交', '美感', '公正', '合作'],
        shadow: ['犹豫不决', '依赖', '肤浅', '避免冲突'],
        bodyParts: ['腰部', '肾脏', '皮肤'],
        lifeTheme: '我平衡 - 寻求和谐关系',
        description: '金星的优雅能量让你成为天然的调解者，人际关系特别和谐。你的审美眼光和外交手腕在今天格外突出。适合处理合作关系和美学相关事务。'
    },
    scorpio: {
        name: '天蝎座',
        symbol: '♏',
        element: 'water',
        quality: 'fixed',
        ruler: 'pluto',
        dates: '10.24-11.22',
        decanRulers: ['pluto', 'neptune', 'moon'],
        traits: ['神秘', '深度', '转化', '直觉', '强烈', '洞察'],
        shadow: ['报复', '嫉妒', '控制', '猜疑'],
        bodyParts: ['生殖器官', '排泄系统'],
        lifeTheme: '我转化 - 深度变革重生',
        description: '冥王星的深层能量让你的洞察力达到巅峰，能够看透事物的本质。今天适合进行深度研究、心理分析或处理神秘事务。感情上可能有重要突破。'
    },
    sagittarius: {
        name: '射手座',
        symbol: '♐',
        element: 'fire',
        quality: 'mutable',
        ruler: 'jupiter',
        dates: '11.23-12.21',
        decanRulers: ['jupiter', 'mars', 'sun'],
        traits: ['自由', '冒险', '哲学', '乐观', '智慧', '诚实'],
        shadow: ['鲁莽', '不负责任', '夸大', '缺乏细节'],
        bodyParts: ['大腿', '肝脏', '臀部'],
        lifeTheme: '我理解 - 探索人生意义',
        description: '木星的扩展能量让你充满智慧和远见，今天适合制定长远计划或进行哲学思考。你的乐观态度会感染周围的人，旅行和学习方面有好运。'
    },
    capricorn: {
        name: '摩羯座',
        symbol: '♑',
        element: 'earth',
        quality: 'cardinal',
        ruler: 'saturn',
        dates: '12.22-1.19',
        decanRulers: ['saturn', 'venus', 'mercury'],
        traits: ['责任感', '实际', '传统', '努力', '权威', '成熟'],
        shadow: ['悲观', '固执', '冷漠', '过度严格'],
        bodyParts: ['膝盖', '骨骼', '皮肤'],
        lifeTheme: '我使用 - 建立持久成就',
        description: '土星的严谨能量让你的组织能力达到高峰，事业运势特别强劲。你的专业态度和责任感会得到权威人士的认可，可能获得重要提升机会。'
    },
    aquarius: {
        name: '水瓶座',
        symbol: '♒',
        element: 'air',
        quality: 'fixed',
        ruler: 'uranus',
        dates: '1.20-2.18',
        decanRulers: ['uranus', 'mercury', 'venus'],
        traits: ['独立', '创新', '人道主义', '未来', '理想', '友谊'],
        shadow: ['冷漠', '叛逆', '不切实际', '固执'],
        bodyParts: ['小腿', '脚踝', '循环系统'],
        lifeTheme: '我知道 - 革新人类意识',
        description: '天王星的革新能量激发你的创造力，独特的见解会得到他人赞赏。在团队合作中发挥重要作用，科技、人道主义相关领域有特别好运。'
    },
    pisces: {
        name: '双鱼座',
        symbol: '♓',
        element: 'water',
        quality: 'mutable',
        ruler: 'neptune',
        dates: '2.19-3.20',
        decanRulers: ['neptune', 'moon', 'pluto'],
        traits: ['直觉', '同情', '艺术', '梦想', '灵性', '牺牲'],
        shadow: ['逃避', '受害者', '混乱', '上瘾'],
        bodyParts: ['脚部', '免疫系统'],
        lifeTheme: '我相信 - 连接宇宙意识',
        description: '海王星的梦幻能量让你的艺术灵感和直觉力特别丰富，适合从事创作、冥想或帮助他人的活动。你的同情心和善良会为你带来意想不到的好运。'
    }
};

// 获取精确的当前行星位置（包含逆行状态和更精确的计算）
function getCurrentPlanetaryPositions() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes();
    
    // 计算儒略日数（更精确的天体计算基础）
    const julianDay = calculateJulianDay(year, month, day, hour, minute);
    const centuriesSinceJ2000 = (julianDay - 2451545.0) / 36525.0;
    
    // 考虑岁差和章动的影响
    const precessionCorrection = 1.396971278 * centuriesSinceJ2000;
    
    // 计算各行星的精确位置
    const positions = {};
    
    // 太阳位置（基于地球轨道）
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
    
    // 月亮位置（更精确的月球轨道计算）
    const moonMeanLongitude = (218.3164477 + 481267.88123421 * centuriesSinceJ2000 - 0.0015786 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const moonMeanAnomaly = (134.9633964 + 477198.8675055 * centuriesSinceJ2000 + 0.0087414 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    const moonArgument = (93.2720950 + 483202.0175233 * centuriesSinceJ2000 - 0.0036539 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    
    // 月球主要摄动项
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
    
    // 内行星位置计算（水星、金星）
    positions.mercury = calculateInnerPlanetPosition('mercury', centuriesSinceJ2000, precessionCorrection);
    positions.venus = calculateInnerPlanetPosition('venus', centuriesSinceJ2000, precessionCorrection);
    
    // 外行星位置计算（火星及以外）
    positions.mars = calculateOuterPlanetPosition('mars', centuriesSinceJ2000, precessionCorrection);
    positions.jupiter = calculateOuterPlanetPosition('jupiter', centuriesSinceJ2000, precessionCorrection);
    positions.saturn = calculateOuterPlanetPosition('saturn', centuriesSinceJ2000, precessionCorrection);
    positions.uranus = calculateOuterPlanetPosition('uranus', centuriesSinceJ2000, precessionCorrection);
    positions.neptune = calculateOuterPlanetPosition('neptune', centuriesSinceJ2000, precessionCorrection);
    positions.pluto = calculateOuterPlanetPosition('pluto', centuriesSinceJ2000, precessionCorrection);
    
    // 月交点计算
    const nodePosition = (125.0445279 - 1934.1362891 * centuriesSinceJ2000 + 0.0020754 * centuriesSinceJ2000 * centuriesSinceJ2000) % 360;
    positions.northNode = {
        degree: (nodePosition + precessionCorrection) % 360,
        retrograde: true, // 交点总是逆行
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

// 朱利安日计算（天文学标准时间转换）
function calculateJulianDay(year, month, day, hour = 12, minute = 0) {
    // 调整月份和年份（朱利安历法规则）
    if (month <= 2) {
        year--;
        month += 12;
    }
    
    // 格里高利历调整
    const a = Math.floor(year / 100);
    const b = 2 - a + Math.floor(a / 4);
    
    // 朱利安日计算公式
    const julianDay = Math.floor(365.25 * (year + 4716)) + 
                     Math.floor(30.6001 * (month + 1)) + 
                     day + b - 1524.5 + 
                     (hour + minute / 60) / 24;
    
    return julianDay;
}

// 计算内行星位置（水星、金星）
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
    
    // 检查逆行状态
    const daysFromEpoch = T * 36525;
    const retroPeriod = data.synodic;
    const retroPhase = (daysFromEpoch % retroPeriod) / retroPeriod;
    const isRetrograde = retroPhase > 0.4 && retroPhase < 0.6; // 逆行约占轨道周期的20%
    
    const trueLongitude = meanLongitude + 
        1.914 * eccentricity * Math.sin(meanLongitude * Math.PI / 180) +
        0.02 * eccentricity * Math.sin(2 * meanLongitude * Math.PI / 180);
    
    return {
        degree: (trueLongitude + precession) % 360,
        retrograde: isRetrograde,
        house: Math.floor(((trueLongitude + precession) % 360) / 30) + 1,
        intensity: isRetrograde ? 0.7 : 1.0 // 逆行时影响力减弱但更深层
    };
}

// 计算外行星位置（火星及以外）
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
    
    // 更精确的逆行计算
    const daysFromEpoch = T * 36525;
    const yearsSinceEpoch = daysFromEpoch / 365.25;
    const retroCyclePosition = (yearsSinceEpoch % data.retroCycle) / data.retroCycle;
    
    // 根据行星特性确定逆行时期
    let isRetrograde = false;
    const retroStart = 0.4; // 逆行开始位置
    const retroEnd = 0.6;   // 逆行结束位置
    
    if (retroCyclePosition >= retroStart && retroCyclePosition <= retroEnd) {
        isRetrograde = true;
    }
    
    // 计算行星的真实位置
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

// 获取月相强度
function getCurrentMoonPhaseIntensity(julianDay) {
    const lunarCycle = 29.530588853; // 精确的朔望月周期
    const knownNewMoon = 2451550.1; // J2000.0时期的新月
    const cyclesSinceKnown = (julianDay - knownNewMoon) / lunarCycle;
    const cyclePosition = cyclesSinceKnown - Math.floor(cyclesSinceKnown);
    
    // 计算月相强度（新月时最弱，满月时最强）
    const phaseAngle = cyclePosition * 2 * Math.PI;
    const intensity = 0.5 + 0.5 * Math.cos(phaseAngle - Math.PI); // 从0到1的变化
    
    return intensity;
}

// 增强的行星影响力计算（完全基于占星学原理）
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
            if (aspect.name === '合相' || aspect.name === '对冲') {
                aspectWeight = 1.0; // 主要相位
            } else if (aspect.name === '三分相' || aspect.name === '四分相') {
                aspectWeight = 0.8; // 重要相位
            } else if (aspect.name === '六分相') {
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
            houseName: houses[planetPosition.house] ? houses[planetPosition.house].name : '未知宫位',
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
        description += `（逆行）正在引导你进行深层的内省和反思，`;
    } else {
        description += `正为你带来`;
    }
    
    // 相位影响描述
    const strongestAspect = aspectInfluences.reduce((max, current) => 
        current.strength > max.strength ? current : max, { strength: 0 });
    
    if (strongestAspect.strength > 0.5) {
        if (strongestAspect.nature === 'harmonious') {
            description += `和谐的能量流动，${strongestAspect.meaning}，`;
        } else if (strongestAspect.nature === 'challenging') {
            description += `具有挑战性的动力，${strongestAspect.meaning}，`;
        } else {
            description += `独特的创造性能量，${strongestAspect.meaning}，`;
        }
    } else {
        description += `稳定的影响力，`;
    }
    
    // 尊贵状态描述
    if (dignityInfluence > 1.1) {
        description += `在当前位置表现出色，发挥最佳状态。`;
    } else if (dignityInfluence < 0.9) {
        description += `需要额外努力来发挥潜能，但仍有积极作用。`;
    } else {
        description += `在${planetData.keywords.slice(0, 2).join('和')}方面表现稳定。`;
    }
    
    // 宫位特殊影响
    if (houseInfluence > 1.2) {
        const house = houses[planetPosition.house];
        description += ` 在${house.name}中的位置特别有利于${house.theme}。`;
    }
    
    return description;
}

// 获取尊贵状态描述
function getDignityStatus(planetKey, sign) {
    const planetData = planets[planetKey];
    if (!planetData || !planetData.dignity) return '中性';
    
    if (planetData.dignity.exaltation === sign) return '擢升';
    if (planetData.dignity.detriment === sign) return '失势';
    if (planetData.dignity.fall === sign) return '落陷';
    if (zodiacSigns[sign].ruler === planetKey) return '守护';
    
    return '客座';
}

// 分类影响力强度
function categorizeInfluenceStrength(score) {
    if (score > 0.8) return '极强';
    if (score > 0.6) return '强';
    if (score > 0.4) return '中等';
    if (score > 0.2) return '弱';
    return '微弱';
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
        colorPool = colorPool.concat(['月光银', '星辰金', '夜空紫']);
    }
    const luckyColor = colorPool[Math.floor(seedValue) % colorPool.length];
    
    // 幸运宝石（考虑星座特性）
    let stonePool = [...elementData.stones];
    if (signData.ruler in planets) {
        const rulerPlanet = planets[signData.ruler];
        if (rulerPlanet.keywords.includes('权威')) {
            stonePool = stonePool.concat(['紫水晶', '黄水晶']);
        }
        if (rulerPlanet.keywords.includes('爱情')) {
            stonePool = stonePool.concat(['玫瑰石英', '粉水晶']);
        }
    }
    const luckyStone = stonePool[Math.floor(seedValue * 2) % stonePool.length];
    
    // 幸运植物（考虑季节和元素）
    let herbPool = [...elementData.herbs];
    const season = getSeason(today.getMonth() + 1);
    const seasonalHerbs = {
        'spring': ['樱花', '紫罗兰', '薄荷'],
        'summer': ['玫瑰', '茉莉', '薰衣草'],
        'autumn': ['桂花', '菊花', '迷迭香'],
        'winter': ['松针', '冬青', '肉桂']
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
    const directions = ['东', '南', '西', '北', '东南', '西南', '东北', '西北'];
    const elementDirection = elementData.direction;
    let directionPool = [elementDirection];
    
    // 根据时间调整方向
    const hour = today.getHours();
    if (hour >= 6 && hour < 12) directionPool.push('东');
    else if (hour >= 12 && hour < 18) directionPool.push('南');
    else if (hour >= 18 && hour < 24) directionPool.push('西');
    else directionPool.push('北');
    
    const luckyDirection = directionPool[Math.floor(seedValue * 5) % directionPool.length];
    
    // 幸运时间段
    const timeSlots = ['早晨(6-9时)', '上午(9-12时)', '下午(12-15时)', '傍晚(15-18时)', '夜晚(18-21时)', '深夜(21-24时)'];
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
        let compatibilityLevel = '一般';
        let description = '';
        
        // 元素兼容性评分
        const elementComp = elementCompatibility[signData.element];
        if (elementComp.high.includes(targetData.element)) {
            compatibilityScore += 30;
            description += '元素高度和谐，';
        } else if (elementComp.medium.includes(targetData.element)) {
            compatibilityScore += 15;
            description += '元素相互理解，';
        } else {
            compatibilityScore -= 10;
            description += '元素需要磨合，';
        }
        
        // 质量兼容性评分
        const qualityComp = qualityCompatibility[signData.quality];
        if (qualityComp.high.includes(targetData.quality)) {
            compatibilityScore += 20;
            description += '行为模式互补';
        } else if (qualityComp.medium.includes(targetData.quality)) {
            compatibilityScore += 10;
            description += '行为模式相似';
        } else {
            compatibilityScore -= 5;
            description += '行为模式有差异';
        }
        
        // 主宰行星的影响
        const rulerCompatibility = calculateRulerCompatibility(signData.ruler, targetData.ruler);
        compatibilityScore += rulerCompatibility;
        
        // 特殊配对加分
        const specialBonus = getSpecialPairingBonus(sign, targetSign);
        compatibilityScore += specialBonus;
        
        // 确定兼容性等级
        if (compatibilityScore >= 85) compatibilityLevel = '天作之合';
        else if (compatibilityScore >= 75) compatibilityLevel = '高度匹配';
        else if (compatibilityScore >= 60) compatibilityLevel = '良好匹配';
        else if (compatibilityScore >= 45) compatibilityLevel = '需要努力';
        else compatibilityLevel = '充满挑战';
        
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
        return `你们的${signData1.element}元素与${signData2.element}元素形成完美和谐，建议多发挥各自优势，互相支持成长。`;
    } else if (score >= 60) {
        return `你们有良好的基础，建议多沟通理解，欣赏彼此的不同特质。`;
    } else if (score >= 45) {
        return `需要更多耐心和包容，关注共同兴趣，避免在价值观上的冲突。`;
    } else {
        return `虽然挑战较大，但如果真心相爱，可以通过学习和成长来克服差异。`;
    }
}

// 主要的占星运势获取函数
async function getHoroscope() {
    const select = document.getElementById('zodiacSelect');
    const selectedSign = select.value;
    
    if (!selectedSign) {
        alert('请选择一个星座！');
        return;
    }
    
    // 显示加载状态
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = `
        <div class="loading">
            <div style="margin-bottom: 1rem;">🌟 正在获取最新的天象数据...</div>
            <div style="font-size: 0.9rem; color: #666;">
                正在连接专业天文数据库，为您计算最精确的星座运势
            </div>
        </div>
    `;
    resultDiv.style.display = 'block';
    resultDiv.classList.remove('hidden');
    
    try {
        // 使用新的API系统获取天体位置数据
        let planetaryPositions;
        
        if (typeof astronomicalAPI !== 'undefined') {
            console.log('使用增强的天文API系统获取数据...');
            planetaryPositions = await astronomicalAPI.getCurrentPlanetaryPositions();
            
            // 显示数据源信息
            const status = astronomicalAPI.getDataSourceStatus();
            console.log('天文数据状态:', status);
        } else {
            console.log('API系统不可用，使用本地计算...');
            planetaryPositions = getCurrentPlanetaryPositions();
        }
        
        // 使用获取的数据计算占星运势
        const horoscope = calculateAstrologicalHoroscope(selectedSign, planetaryPositions);
        displayHoroscope(horoscope);
        
    } catch (error) {
        console.error('运势计算失败:', error);
        
        // 出错时显示友好的错误信息并尝试本地计算
        resultDiv.innerHTML = `
            <div class="error">
                <h3>⚠️ 数据获取遇到问题</h3>
                <p>正在尝试本地计算...</p>
            </div>
        `;
        
        setTimeout(() => {
            try {
                const localPositions = getCurrentPlanetaryPositions();
                const horoscope = calculateAstrologicalHoroscope(selectedSign, localPositions);
                displayHoroscope(horoscope);
            } catch (localError) {
                console.error('本地计算也失败:', localError);
                resultDiv.innerHTML = `
                    <div class="error">
                        <h3>❌ 计算失败</h3>
                        <p>抱歉，当前无法获取运势数据。请稍后再试。</p>
                        <button onclick="getHoroscope()" style="margin-top: 1rem;">🔄 重新尝试</button>
                    </div>
                `;
            }
        }, 1000);
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
                    <span class="score-label">综合运势</span>
                    <span class="score-value ${horoscope.overallScore >= 80 ? 'excellent' : horoscope.overallScore >= 60 ? 'good' : 'average'}">
                        ${Math.round(horoscope.overallScore)}/100
                    </span>
                </div>
                <div class="lifecycle-phase">
                    <span class="phase-label">生命周期</span>
                    <span class="phase-value">${horoscope.lifecyclePhase.phase}</span>
                </div>
            </div>
            
            <div class="horoscope-content">
                <div class="main-description">
                    <h3>${horoscope.lifeTheme}</h3>
                    <div class="sign-info">
                        <span class="info-item"><strong>元素:</strong> ${horoscope.element}</span>
                        <span class="info-item"><strong>性质:</strong> ${horoscope.quality}</span>
                        <span class="info-item"><strong>主宰:</strong> ${horoscope.rulerSymbol} ${horoscope.ruler}</span>
                    </div>
                    <p><strong>核心特质:</strong> ${horoscope.traits.join(' • ')}</p>
                    <p><strong>成长挑战:</strong> ${horoscope.shadow.join(' • ')}</p>
                    <p class="description">${horoscope.description}</p>
                    <div class="lifecycle-description">
                        <p><strong>当前生命阶段:</strong> ${horoscope.lifecyclePhase.description}</p>
                        <p><strong>阶段指导:</strong> ${horoscope.lifecyclePhase.guidance}</p>
                    </div>
                </div>
                
                <div class="moon-phase-section">
                    <h3>${horoscope.moonPhase.symbol} 当前月相: ${horoscope.moonPhase.name}</h3>
                    <div class="moon-info">
                        <p><strong>月相能量:</strong> ${horoscope.moonPhase.energy}</p>
                        <p><strong>关键词:</strong> ${horoscope.moonPhase.keywords.join(' • ')}</p>
                        <p><strong>最适合:</strong> ${horoscope.moonPhase.bestFor.join(' • ')}</p>
                    </div>
                </div>
                
                <div class="lucky-elements">
                    <h3>✨ 今日幸运元素</h3>
                    <div class="lucky-grid">
                        <div class="lucky-item">
                            <div class="lucky-icon">🎨</div>
                            <span class="lucky-text">幸运颜色: ${horoscope.luckyElements.color}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">💎</div>
                            <span class="lucky-text">幸运宝石: ${horoscope.luckyElements.stone}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🌿</div>
                            <span class="lucky-text">幸运植物: ${horoscope.luckyElements.herb}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🔢</div>
                            <span class="lucky-text">主幸运数字: ${horoscope.luckyElements.number}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">📊</div>
                            <span class="lucky-text">次要数字: ${horoscope.luckyElements.secondaryNumbers.join(', ')}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">🧭</div>
                            <span class="lucky-text">幸运方向: ${horoscope.luckyElements.direction}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">⏰</div>
                            <span class="lucky-text">幸运时段: ${horoscope.luckyElements.time}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">${horoscope.luckyElements.symbol}</div>
                            <span class="lucky-text">护身符号: ${horoscope.luckyElements.symbol}</span>
                        </div>
                        <div class="lucky-item">
                            <div class="lucky-icon">⚡</div>
                            <span class="lucky-text">幸运金属: ${horoscope.luckyElements.metal}</span>
                        </div>
                    </div>
                </div>
                
                <div class="planetary-influences">
                    <h3>🪐 行星影响分析</h3>
                    <div class="harmony-indicators">
                        <div class="harmony-item">
                            <span>元素和谐度:</span>
                            <div class="harmony-bar">
                                <div class="harmony-fill" style="width: ${(horoscope.elementalHarmony || 0) * 100}%"></div>
                            </div>
                            <span>${Math.round((horoscope.elementalHarmony || 0) * 100)}%</span>
                        </div>
                        <div class="harmony-item">
                            <span>质量协调度:</span>
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
        const strengthClass = (influence.strength || '中等').toLowerCase().replace(/[^a-z]/g, '');
        html += `
            <div class="planet-item ${strengthClass}">
                <div class="planet-header">
                    <span class="planet-name">${planetName}</span>
                    <span class="influence-strength ${strengthClass}">${influence.strength || '中等'}</span>
                    ${influence.retrograde ? '<span class="retrograde-indicator">⟲</span>' : ''}
                </div>
                <div class="planet-details">
                    <div class="planet-keywords">${influence.keywords.join(' • ')}</div>
                    <div class="planet-house">宫位: ${influence.houseName}</div>
                    <div class="planet-dignity">尊贵: ${influence.dignity || '中性'}</div>
                    ${influence.aspects && influence.aspects.length > 0 ? `
                        <div class="planet-aspects">
                            主要相位: ${influence.aspects.slice(0, 2).map(aspect => 
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
                    <h3>🌌 当前天象事件</h3>
                    <div class="events-grid">
                        ${horoscope.celestialEvents.map(event => `
                            <div class="event-item">
                                <h4>${event.type}</h4>
                                <p class="event-description">${event.description}</p>
                                <p class="event-significance"><strong>意义:</strong> ${event.significance}</p>
                                <p class="event-advice"><strong>建议:</strong> ${event.advice}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                ` : ''}
                
                <div class="compatibility">
                    <h3>💕 星座配对分析 (前6名)</h3>
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
                    <span class="compatibility-score">${match.score || 0}分</span>
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
                    <h3>🔮 今日占星建议</h3>
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
                    <h3>🫀 身心连接</h3>
                    <p><strong>对应身体部位:</strong> ${horoscope.bodyParts.join(' • ')}</p>
                    <p class="body-advice">今日特别关注这些部位的健康，适当进行相关的护理和锻炼。</p>
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
        '红色': '#ff4757',
        '烈焰红': '#e74c3c',
        '粉红': '#ff6b9d',
        '橙色': '#ffa502',
        '太阳橙': '#f39c12',
        '黄色': '#ffdd59',
        '活力黄': '#f1c40f',
        '金色': '#f39c12',
        '热情金': '#d4af37',
        '绿色': '#26de81',
        '森林绿': '#27ae60',
        '大地棕': '#8b4513',
        '稳重米': '#deb887',
        '沉静黑': '#2c3e50',
        '蓝色': '#3742fa',
        '天空蓝': '#3498db',
        '深海蓝': '#2980b9',
        '云朵白': '#ecf0f1',
        '清新银': '#bdc3c7',
        '智慧紫': '#9b59b6',
        '神秘紫': '#8e44ad',
        '珍珠银': '#95a5a6',
        '月光白': '#f8f9fa',
        '月光银': '#c0c0c0',
        '星辰金': '#ffd700',
        '夜空紫': '#483d8b',
        '白色': '#ffffff',
        '黑色': '#2f3542',
        '银色': '#95a5a6',
        '褐色': '#8b4513'
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
    const knownNewMoon = new Date('2024-01-11T11:57:00Z'); // 已知新月时间（UTC）
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
        date: new Date().toLocaleDateString('zh-CN'),
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
    
    // 基础运势建议
    if (overallScore >= 85) {
        advice.push('🌟 今天是你的超级幸运日！宇宙能量与你完美共振，大胆追求你的梦想吧！');
    } else if (overallScore >= 70) {
        advice.push('✨ 运势强劲，是展现才华和推进重要计划的绝佳时机。');
    } else if (overallScore >= 55) {
        advice.push('🌙 运势平稳，保持积极乐观的心态，稳步前进。');
    } else if (overallScore >= 40) {
        advice.push('⚠️ 今天需要更加谨慎，避免冲动决定，多倾听内心声音。');
    } else {
        advice.push('🧘‍♀️ 今天适合内省和休息，为下一个上升期积蓄能量。');
    }
    
    // 基于月相给出建议
    const moonPhase = planetaryData.moonPhase;
    if (moonPhase.name === '新月') {
        advice.push(`🌑 ${moonPhase.name}能量：${moonPhase.bestFor.join('、')}的最佳时机。种下意图的种子，等待发芽。`);
    } else if (moonPhase.name === '满月') {
        advice.push(`🌕 ${moonPhase.name}能量：${moonPhase.bestFor.join('、')}的高峰期。情感丰富，适合完成重要事务。`);
    } else if (moonPhase.name.includes('上')) {
        advice.push(`🌓 ${moonPhase.name}能量：${moonPhase.bestFor.join('、')}的行动期。勇敢迈出第一步。`);
    } else {
        advice.push(`🌗 ${moonPhase.name}能量：${moonPhase.bestFor.join('、')}的反思期。智慧来自于放下。`);
    }
    
    // 基于最强行星影响给出建议
    const influences = Object.entries(planetaryData.influences);
    if (influences.length > 0) {
        const strongestPlanet = influences.reduce((max, current) => 
            current[1].score > max[1].score ? current : max);
        
        const planetName = strongestPlanet[0];
        const planetInfo = strongestPlanet[1];
        
        switch (planetName) {
            case '太阳':
                advice.push('☉ 太阳能量强盛：展现你的领导力和自信，今天是发光发热的日子。');
                break;
            case '月亮':
                advice.push('☽ 月亮能量敏感：相信你的直觉，关注内心感受和家庭关系。');
                break;
            case '水星':
                advice.push('☿ 水星能量活跃：沟通交流是重点，学习新知识会有意外收获。');
                break;
            case '金星':
                advice.push('♀ 金星能量和谐：关注人际关系和美的事物，爱情运势特别好。');
                break;
            case '火星':
                advice.push('♂ 火星能量充沛：行动力强盛，但要控制冲动，将激情导向正确方向。');
                break;
            case '木星':
                advice.push('♃ 木星能量扩展：适合制定宏伟计划，拓展视野，学习新的哲学思想。');
                break;
            case '土星':
                advice.push('♄ 土星能量稳定：专注于长期目标，承担责任，建立持久的结构。');
                break;
            case '天王星':
                advice.push('♅ 天王星能量革新：拥抱变化，尝试创新，突破常规思维模式。');
                break;
            case '海王星':
                advice.push('♆ 海王星能量灵性：适合艺术创作、冥想或帮助他人的活动。');
                break;
            case '冥王星':
                advice.push('♇ 冥王星能量转化：深度变革的时期，勇敢面对内心的阴影。');
                break;
        }
        
        // 逆行特殊建议
        if (planetInfo.retrograde) {
            advice.push(`⟲ ${planetName}逆行影响：这是回顾、反思和重新评估的时期，避免急于做出重大决定。`);
        }
    }
    
    // 基于星座元素给出建议
    const element = signData.element;
    const elementAdvice = {
        'fire': '🔥 火元素提醒：保持热情但避免过度冲动，将你的创造力转化为实际行动。',
        'earth': '🌍 土元素提醒：脚踏实地，专注于实际的目标，你的坚持会带来丰厚回报。',
        'air': '🌬️ 风元素提醒：多与他人交流思想，你的智慧和沟通能力是今天的财富。',
        'water': '💧 水元素提醒：倾听内心的声音，情感的深度是你力量的源泉。'
    };
    advice.push(elementAdvice[element]);
    
    // 特殊时期建议
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // 节气建议
    if ((month === 3 && day >= 20) || (month === 6 && day >= 21) || 
        (month === 9 && day >= 23) || (month === 12 && day >= 22)) {
        advice.push('🌸 节气能量：今天是天地能量转换的特殊日子，特别适合制定新的人生计划。');
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
                        type: '行星合相',
                        description: `${planets[planet1]?.name || planet1}与${planets[planet2]?.name || planet2}形成紧密合相`,
                        significance: '能量融合，影响力加强',
                        advice: '关注这两个行星代表的生活领域，可能有重要发展'
                    });
                }
            }
        }
    }
    
    // 检查逆行行星
    const retrogradeCount = Object.values(positions).filter(pos => pos?.retrograde).length;
    if (retrogradeCount >= 3) {
        events.push({
            type: '多行星逆行',
            description: `当前有${retrogradeCount}颗行星处于逆行状态`,
            significance: '集体反思期，重新评估期',
            advice: '避免匆忙决定，多花时间回顾和整理过去的经验'
        });
    }
    
    // 月相特殊影响
    const moonPhase = getCurrentMoonPhase();
    if (moonPhase === 'fullMoon' && positions.moon) {
        events.push({
            type: '满月高能',
            description: '满月能量达到顶峰',
            significance: '情感、直觉和创造力的高峰期',
            advice: '利用这股强大的能量完成重要项目，但要注意情绪管理'
        });
    }
    
    return events;
}

// 计算生命周期影响
function calculateLifecycleInfluence(sign, positions) {
    const signData = zodiacSigns[sign];
    const ruler = positions[signData.ruler];
    
    if (!ruler) return { phase: '稳定期', description: '当前处于相对稳定的发展阶段' };
    
    const rulerHouse = ruler.house;
    const isRetrograde = ruler.retrograde;
    
    let phase = '成长期';
    let description = '';
    
    // 基于主宰行星宫位判断生命阶段
    if (rulerHouse <= 3) {
        phase = isRetrograde ? '内省期' : '新生期';
        description = isRetrograde ? 
            '适合深度自我探索，重新认识自己的时期' : 
            '充满新可能性，适合开始新项目的活跃期';
    } else if (rulerHouse <= 6) {
        phase = isRetrograde ? '调整期' : '建设期';
        description = isRetrograde ? 
            '需要调整现有的计划和方向，优化工作方式' : 
            '稳步建设和发展的时期，专注于技能提升';
    } else if (rulerHouse <= 9) {
        phase = isRetrograde ? '释放期' : '扩展期';
        description = isRetrograde ? 
            '放下不再适合的关系和模式，为新发展让路' : 
            '向外拓展，建立新的合作关系和社会连接';
    } else {
        phase = isRetrograde ? '转化期' : '成就期';
        description = isRetrograde ? 
            '深层次的转化正在发生，为下一个人生阶段准备' : 
            '收获前期努力的成果，在社会中发挥更大影响力';
    }
    
    return {
        phase: phase,
        description: description,
        guidance: generateLifecycleGuidance(phase)
    };
}

// 生成生命周期指导
function generateLifecycleGuidance(phase) {
    const guidance = {
        '新生期': '勇敢尝试新事物，设定清晰的目标，为未来投资。',
        '内省期': '花时间了解自己，清理内心的杂念，准备内在的成长。',
        '建设期': '专注于技能发展，建立稳固的基础，耐心积累经验。',
        '调整期': '灵活应对变化，修正方向，优化现有的生活方式。',
        '扩展期': '积极社交，建立有意义的连接，拓展人生的可能性。',
        '释放期': '勇敢放下过去，为新的机会创造空间，轻装前行。',
        '成就期': '享受成功的果实，同时承担更大的责任，指导他人。',
        '转化期': '拥抱深层次的改变，为人生的下一个篇章做准备。',
        '稳定期': '保持现状，稳定发展，为未来的突破积蓄力量。'
    };
    
    return guidance[phase] || '保持开放的心态，随时准备迎接生活的变化。';
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
        name: '太阳',
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

// 简化的农历计算（基础版本）
function getLunarDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    
    // 简化的农历计算，这里使用近似算法
    // 实际应用中应该使用完整的农历转换库
    const baseYear = 1900;
    const daysFromBase = Math.floor((now - new Date(1900, 0, 31)) / (1000 * 60 * 60 * 24));
    
    // 农历月份名称
    const lunarMonths = ['正月', '二月', '三月', '四月', '五月', '六月', 
                        '七月', '八月', '九月', '十月', '冬月', '腊月'];
    
    // 农历日期名称
    const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                      '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                      '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
    
    // 简单的农历近似计算
    const lunarCycle = 29.53; // 农历月平均长度
    const monthsFromBase = Math.floor(daysFromBase / lunarCycle);
    const lunarYear = Math.floor(monthsFromBase / 12) + baseYear;
    const lunarMonth = (monthsFromBase % 12);
    const lunarDay = Math.floor((daysFromBase % lunarCycle)) + 1;
    
    const lunarMonthName = lunarMonths[lunarMonth] || '正月';
    const lunarDayName = lunarDays[Math.min(lunarDay - 1, 29)] || '初一';
    
    return `${lunarMonthName}${lunarDayName}`;
}

// 更新页面头部的宇宙信息显示
function updateCosmicInfo() {
    // 更新日期信息
    const currentDateElement = document.getElementById('currentDate');
    const lunarDateElement = document.getElementById('lunarDate');
    const weekDayElement = document.getElementById('weekDay');
    
    if (currentDateElement || lunarDateElement || weekDayElement) {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1;
        const day = now.getDate();
        
        // 格式化公历日期
        const formattedDate = `${year}年${month}月${day}日`;
        
        // 获取星期
        const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
        const weekDay = `星期${weekDays[now.getDay()]}`;
        
        // 获取农历日期
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
    
    // 更新月相信息
    const moonPhaseElement = document.getElementById('currentMoonPhase');
    if (moonPhaseElement) {
        const currentPhase = getCurrentMoonPhase();
        const moonPhases = {
            'newMoon': '🌑 新月',
            'waxingCrescent': '🌒 娥眉月',
            'firstQuarter': '🌓 上弦月',
            'waxingGibbous': '🌔 盈凸月',
            'fullMoon': '🌕 满月',
            'waningGibbous': '🌖 亏凸月',
            'lastQuarter': '🌗 下弦月',
            'waningCrescent': '🌘 残月'
        };
        moonPhaseElement.textContent = moonPhases[currentPhase] || '🌔 盈凸月';
    }
    
    // 更新主导行星信息
    const dominantPlanetElement = document.getElementById('dominantPlanet');
    if (dominantPlanetElement) {
        const dominantPlanet = getCurrentDominantPlanet();
        dominantPlanetElement.textContent = `${dominantPlanet.symbol} ${dominantPlanet.name}`;
    }
    
    // 更新能量指数
    const cosmicEnergyElement = document.getElementById('cosmicEnergy');
    if (cosmicEnergyElement) {
        const energyLevel = getCurrentCosmicEnergy();
        let energyStatus = '';
        
        if (energyLevel >= 80) {
            energyStatus = '极强 ⚡';
        } else if (energyLevel >= 65) {
            energyStatus = '强 🔥';
        } else if (energyLevel >= 50) {
            energyStatus = '中等 ⭐';
        } else if (energyLevel >= 35) {
            energyStatus = '平稳 🌙';
        } else {
            energyStatus = '低调 💤';
        }
        
        cosmicEnergyElement.textContent = `${energyLevel}% ${energyStatus}`;
    }
}