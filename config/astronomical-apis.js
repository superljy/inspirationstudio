// 天文数据API配置
// 多重数据源确保准确性和可靠性

const ASTRONOMICAL_CONFIG = {
    // 主要API源
    primarySources: [
        {
            name: 'NASA JPL Horizons',
            endpoint: 'https://ssd.jpl.nasa.gov/api/horizons.api',
            type: 'nasa_jpl',
            priority: 1,
            description: '美国NASA喷气推进实验室天体历表系统'
        },
        {
            name: 'VSOP87 Swiss Ephemeris',
            endpoint: 'https://www.astro.com/swisseph/',
            type: 'swiss_ephemeris',
            priority: 2,
            description: '瑞士星历表，天文学标准'
        }
    ],
    
    // 备用数据源
    fallbackSources: [
        {
            name: 'USNO Astronomical Applications',
            endpoint: 'https://aa.usno.navy.mil/api/',
            type: 'usno',
            priority: 3,
            description: '美国海军天文台'
        },
        {
            name: 'TimeAndDate Astronomy',
            endpoint: 'https://api.timeanddate.com/v1/astronomy/',
            type: 'timeanddate',
            priority: 4,
            description: '时间和日期天文API'
        }
    ],
    
    // 本地计算作为最后备选
    localCalculation: {
        name: 'Local VSOP87 Implementation',
        type: 'local_vsop87',
        priority: 99,
        description: '本地VSOP87算法实现'
    },
    
    // 需要获取的天体数据
    celestialBodies: [
        'sun', 'moon', 'mercury', 'venus', 'mars', 
        'jupiter', 'saturn', 'uranus', 'neptune', 'pluto',
        'northNode', 'southNode', 'chiron', 'ceres'
    ],
    
    // 需要的数据类型
    dataTypes: [
        'position',      // 黄道坐标位置
        'velocity',      // 运动速度（判断逆行）
        'distance',      // 距离地球距离
        'magnitude',     // 视星等
        'phase',         // 相位角（月相等）
        'aspects',       // 与其他天体的相位关系
        'house_position' // 宫位位置
    ],
    
    // 更新频率（分钟）
    updateInterval: 15,
    
    // 缓存设置
    cache: {
        enabled: true,
        duration: 900000, // 15分钟缓存
        key: 'astronomical_data'
    },
    
    // 精度要求
    precision: {
        coordinates: 0.01,    // 角度精度到0.01度
        time: 1,             // 时间精度到1分钟
        retrograde: 0.1      // 逆行判断精度
    }
};

// API密钥管理（如果需要）
const API_KEYS = {
    // timeanddate: 'your_api_key_here',
    // 其他需要密钥的服务
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ASTRONOMICAL_CONFIG, API_KEYS };
} else if (typeof window !== 'undefined') {
    window.ASTRONOMICAL_CONFIG = ASTRONOMICAL_CONFIG;
    window.API_KEYS = API_KEYS;
} 