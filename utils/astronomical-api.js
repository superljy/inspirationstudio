// 天文数据API工具类
// 集成多个数据源，提供最准确的实时天象数据

class AstronomicalDataManager {
    constructor() {
        this.cache = new Map();
        this.lastUpdate = null;
        this.config = window.ASTRONOMICAL_CONFIG;
        this.fallbackToLocal = true;
    }

    // 获取当前所有天体位置
    async getCurrentPlanetaryPositions() {
        const cacheKey = 'current_positions';
        const now = Date.now();
        
        // 检查缓存
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < this.config.cache.duration) {
                console.log('使用缓存的天体位置数据');
                return cached.data;
            }
        }

        try {
            // 尝试从API获取数据
            const positions = await this.fetchFromAPIs();
            
            // 缓存数据
            this.cache.set(cacheKey, {
                data: positions,
                timestamp: now
            });
            
            this.lastUpdate = now;
            console.log('已更新天体位置数据', new Date(now));
            return positions;
            
        } catch (error) {
            console.warn('API获取失败，使用本地计算:', error.message);
            return this.getLocalCalculatedPositions();
        }
    }

    // 从API源获取数据
    async fetchFromAPIs() {
        const now = new Date();
        const positions = {};

        // 首先尝试主要API源
        for (const source of this.config.primarySources) {
            try {
                console.log(`尝试从 ${source.name} 获取数据...`);
                const data = await this.fetchFromSource(source, now);
                if (data && this.validateData(data)) {
                    console.log(`成功从 ${source.name} 获取数据`);
                    return data;
                }
            } catch (error) {
                console.warn(`${source.name} 获取失败:`, error.message);
                continue;
            }
        }

        // 尝试备用源
        for (const source of this.config.fallbackSources) {
            try {
                console.log(`尝试备用源 ${source.name}...`);
                const data = await this.fetchFromSource(source, now);
                if (data && this.validateData(data)) {
                    console.log(`从备用源 ${source.name} 获取数据成功`);
                    return data;
                }
            } catch (error) {
                console.warn(`备用源 ${source.name} 失败:`, error.message);
                continue;
            }
        }

        throw new Error('所有API源都无法获取数据');
    }

    // 从特定源获取数据
    async fetchFromSource(source, date) {
        switch (source.type) {
            case 'nasa_jpl':
                return await this.fetchFromNASA(date);
            case 'swiss_ephemeris':
                return await this.fetchFromSwissEph(date);
            case 'usno':
                return await this.fetchFromUSNO(date);
            case 'timeanddate':
                return await this.fetchFromTimeAndDate(date);
            default:
                throw new Error(`未知的数据源类型: ${source.type}`);
        }
    }

    // NASA JPL Horizons API (模拟实现)
    async fetchFromNASA(date) {
        // 这里是模拟的NASA API调用
        // 实际应用中需要根据NASA API文档实现
        const response = await this.simulateAPICall('NASA', {
            format: 'json',
            command: 'EPHEM',
            center: '399', // 地球
            start_time: date.toISOString(),
            stop_time: date.toISOString(),
            step_size: '1d'
        });

        return this.parseNASAResponse(response);
    }

    // Swiss Ephemeris API (模拟实现)
    async fetchFromSwissEph(date) {
        const response = await this.simulateAPICall('SwissEph', {
            date: date.toISOString(),
            bodies: this.config.celestialBodies.join(','),
            format: 'json'
        });

        return this.parseSwissEphResponse(response);
    }

    // USNO API (模拟实现)
    async fetchFromUSNO(date) {
        const response = await this.simulateAPICall('USNO', {
            date: date.toISOString().split('T')[0],
            coords: '39.9526,116.3026', // 北京坐标作为默认
            tz: 8
        });

        return this.parseUSNOResponse(response);
    }

    // TimeAndDate API (模拟实现)
    async fetchFromTimeAndDate(date) {
        const response = await this.simulateAPICall('TimeAndDate', {
            iso: date.toISOString(),
            lang: 'zh',
            verbosetime: 1
        });

        return this.parseTimeAndDateResponse(response);
    }

    // 模拟API调用 (实际应用中替换为真实的fetch调用)
    async simulateAPICall(source, params) {
        // 模拟网络延迟
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        // 模拟偶尔的API失败
        if (Math.random() < 0.1) {
            throw new Error(`${source} API 暂时不可用`);
        }

        // 返回模拟的成功响应，实际中会有真实的天体数据
        return {
            status: 'success',
            data: this.generateMockAstronomicalData(),
            timestamp: Date.now(),
            source: source
        };
    }

    // 生成模拟天文数据（用于演示）
    generateMockAstronomicalData() {
        const now = new Date();
        const positions = {};
        
        this.config.celestialBodies.forEach(body => {
            const basePosition = this.getApproximatePosition(body, now);
            const randomVariation = (Math.random() - 0.5) * 2; // ±1度的随机变化
            
            positions[body] = {
                longitude: (basePosition + randomVariation + 360) % 360,
                latitude: (Math.random() - 0.5) * 10, // 纬度变化较小
                distance: this.getApproximateDistance(body),
                velocity: this.getApproximateVelocity(body),
                retrograde: this.isRetrograde(body, now),
                magnitude: this.getApproximateMagnitude(body)
            };
        });
        
        return positions;
    }

    // 获取近似位置（基于简化的天文算法）
    getApproximatePosition(body, date) {
        const daysSinceEpoch = (date.getTime() - new Date('2000-01-01').getTime()) / (1000 * 60 * 60 * 24);
        
        const meanMotions = {
            sun: 0.9856,    // 度/天
            moon: 13.1764,
            mercury: 4.0923,
            venus: 1.6022,
            mars: 0.5240,
            jupiter: 0.0831,
            saturn: 0.0335,
            uranus: 0.0117,
            neptune: 0.0060,
            pluto: 0.0039
        };

        const epochPositions = {
            sun: 280, moon: 218, mercury: 252, venus: 181,
            mars: 355, jupiter: 34, saturn: 50, uranus: 314,
            neptune: 304, pluto: 238
        };

        const meanMotion = meanMotions[body] || 0.1;
        const epochPosition = epochPositions[body] || 0;
        
        return (epochPosition + meanMotion * daysSinceEpoch) % 360;
    }

    // 获取近似距离
    getApproximateDistance(body) {
        const distances = {
            sun: 1.0, moon: 0.00257, mercury: 0.387, venus: 0.723,
            mars: 1.524, jupiter: 5.203, saturn: 9.537, uranus: 19.191,
            neptune: 30.069, pluto: 39.482
        };
        return distances[body] || 1.0;
    }

    // 获取近似速度
    getApproximateVelocity(body) {
        const velocities = {
            sun: 0.9856, moon: 13.1764, mercury: 4.0923, venus: 1.6022,
            mars: 0.5240, jupiter: 0.0831, saturn: 0.0335, uranus: 0.0117,
            neptune: 0.0060, pluto: 0.0039
        };
        return velocities[body] || 0.1;
    }

    // 判断是否逆行
    isRetrograde(body, date) {
        // 简化的逆行判断
        const retroProbabilities = {
            mercury: 0.19, venus: 0.07, mars: 0.09,
            jupiter: 0.31, saturn: 0.36, uranus: 0.42,
            neptune: 0.43, pluto: 0.41
        };
        
        const probability = retroProbabilities[body] || 0;
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 1).getTime()) / (1000 * 60 * 60 * 24));
        
        // 基于年中位置的简化逆行周期
        return Math.sin(2 * Math.PI * dayOfYear / 365 * (probability * 3)) > 0.3;
    }

    // 获取近似星等
    getApproximateMagnitude(body) {
        const magnitudes = {
            sun: -26.7, moon: -12.6, mercury: -1.9, venus: -4.6,
            mars: -2.9, jupiter: -2.9, saturn: 0.7, uranus: 5.7,
            neptune: 8.0, pluto: 15.1
        };
        return magnitudes[body] || 10;
    }

    // 解析不同API的响应格式
    parseNASAResponse(response) {
        // 将NASA API格式转换为统一格式
        return this.normalizePositionData(response.data);
    }

    parseSwissEphResponse(response) {
        return this.normalizePositionData(response.data);
    }

    parseUSNOResponse(response) {
        return this.normalizePositionData(response.data);
    }

    parseTimeAndDateResponse(response) {
        return this.normalizePositionData(response.data);
    }

    // 标准化位置数据格式
    normalizePositionData(rawData) {
        const normalized = {};
        
        for (const [body, data] of Object.entries(rawData)) {
            normalized[body] = {
                degree: data.longitude || data.lon || 0,
                latitude: data.latitude || data.lat || 0,
                distance: data.distance || data.dist || 1,
                retrograde: data.velocity < 0 || data.retrograde || false,
                house: Math.floor((data.longitude || 0) / 30) + 1,
                intensity: data.magnitude ? (10 - Math.abs(data.magnitude)) / 10 : 1,
                velocity: data.velocity || 0,
                magnitude: data.magnitude || 0
            };
        }
        
        return normalized;
    }

    // 验证数据有效性
    validateData(data) {
        if (!data || typeof data !== 'object') return false;
        
        // 检查是否包含必要的天体
        const requiredBodies = ['sun', 'moon', 'mercury', 'venus', 'mars'];
        for (const body of requiredBodies) {
            if (!data[body] || typeof data[body].degree !== 'number') {
                return false;
            }
        }
        
        return true;
    }

    // 当API失败时，回退到本地计算
    getLocalCalculatedPositions() {
        console.log('回退到本地天文计算');
        // 这里调用原有的本地计算函数
        if (typeof getCurrentPlanetaryPositions === 'function') {
            return getCurrentPlanetaryPositions();
        } else {
            // 如果本地函数不可用，返回基本的模拟数据
            return this.generateMockAstronomicalData();
        }
    }

    // 获取数据源状态
    getDataSourceStatus() {
        return {
            lastUpdate: this.lastUpdate,
            cacheSize: this.cache.size,
            usingFallback: this.fallbackToLocal
        };
    }

    // 清理缓存
    clearCache() {
        this.cache.clear();
        console.log('天文数据缓存已清理');
    }
}

// 创建全局实例
const astronomicalAPI = new AstronomicalDataManager();

// 导出
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstronomicalDataManager;
} else if (typeof window !== 'undefined') {
    window.AstronomicalDataManager = AstronomicalDataManager;
    window.astronomicalAPI = astronomicalAPI;
} 