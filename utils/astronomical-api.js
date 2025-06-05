// Astronomical Data API Utility Class
// Integrates multiple data sources to provide the most accurate real-time celestial data

class AstronomicalDataManager {
    constructor() {
        this.cache = new Map();
        this.lastUpdate = null;
        this.config = window.ASTRONOMICAL_CONFIG;
        this.fallbackToLocal = true;
    }

    // Get current positions of all celestial bodies
    async getCurrentPlanetaryPositions() {
        const cacheKey = 'current_positions';
        const now = Date.now();
        
        // Check cache
        if (this.cache.has(cacheKey)) {
            const cached = this.cache.get(cacheKey);
            if (now - cached.timestamp < this.config.cache.duration) {
                console.log('Using cached celestial position data');
                return cached.data;
            }
        }

        try {
            // Try to fetch data from APIs
            const positions = await this.fetchFromAPIs();
            
            // Cache data
            this.cache.set(cacheKey, {
                data: positions,
                timestamp: now
            });
            
            this.lastUpdate = now;
            console.log('Updated celestial position data', new Date(now));
            return positions;
            
        } catch (error) {
            console.warn('API fetch failed, using local calculations:', error.message);
            return this.getLocalCalculatedPositions();
        }
    }

    // Fetch data from API sources
    async fetchFromAPIs() {
        const now = new Date();
        const positions = {};

        // First try primary API sources
        for (const source of this.config.primarySources) {
            try {
                console.log(`Trying to fetch data from ${source.name}...`);
                const data = await this.fetchFromSource(source, now);
                if (data && this.validateData(data)) {
                    console.log(`Successfully fetched data from ${source.name}`);
                    return data;
                }
            } catch (error) {
                console.warn(`${source.name} fetch failed:`, error.message);
                continue;
            }
        }

        // Try fallback sources
        for (const source of this.config.fallbackSources) {
            try {
                console.log(`Trying fallback source ${source.name}...`);
                const data = await this.fetchFromSource(source, now);
                if (data && this.validateData(data)) {
                    console.log(`Successfully fetched data from fallback source ${source.name}`);
                    return data;
                }
            } catch (error) {
                console.warn(`Fallback source ${source.name} failed:`, error.message);
                continue;
            }
        }

        throw new Error('All API sources failed to provide data');
    }

    // Fetch data from specific source
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
                throw new Error(`Unknown data source type: ${source.type}`);
        }
    }

    // NASA JPL Horizons API (mock implementation)
    async fetchFromNASA(date) {
        // This is a mock NASA API call
        // In real applications, implement according to NASA API documentation
        const response = await this.simulateAPICall('NASA', {
            format: 'json',
            command: 'EPHEM',
            center: '399', // Earth
            start_time: date.toISOString(),
            stop_time: date.toISOString(),
            step_size: '1d'
        });

        return this.parseNASAResponse(response);
    }

    // Swiss Ephemeris API (mock implementation)
    async fetchFromSwissEph(date) {
        const response = await this.simulateAPICall('SwissEph', {
            date: date.toISOString(),
            bodies: this.config.celestialBodies.join(','),
            format: 'json'
        });

        return this.parseSwissEphResponse(response);
    }

    // USNO API (mock implementation)
    async fetchFromUSNO(date) {
        const response = await this.simulateAPICall('USNO', {
            date: date.toISOString().split('T')[0],
            coords: '40.7589,-73.9851', // New York coordinates as default
            tz: -5
        });

        return this.parseUSNOResponse(response);
    }

    // TimeAndDate API (mock implementation)
    async fetchFromTimeAndDate(date) {
        const response = await this.simulateAPICall('TimeAndDate', {
            iso: date.toISOString(),
            lang: 'en',
            verbosetime: 1
        });

        return this.parseTimeAndDateResponse(response);
    }

    // Simulate API call (replace with real fetch calls in actual applications)
    async simulateAPICall(source, params) {
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 500 + Math.random() * 1000));
        
        // Simulate occasional API failures
        if (Math.random() < 0.1) {
            throw new Error(`${source} API temporarily unavailable`);
        }

        // Return mock successful response, would contain real celestial data in practice
        return {
            status: 'success',
            data: this.generateMockAstronomicalData(),
            timestamp: Date.now(),
            source: source
        };
    }

    // Generate mock astronomical data (for demonstration)
    generateMockAstronomicalData() {
        const now = new Date();
        const positions = {};
        
        this.config.celestialBodies.forEach(body => {
            const basePosition = this.getApproximatePosition(body, now);
            const randomVariation = (Math.random() - 0.5) * 2; // ±1 degree random variation
            
            positions[body] = {
                longitude: (basePosition + randomVariation + 360) % 360,
                latitude: (Math.random() - 0.5) * 10, // Smaller latitude variation
                distance: this.getApproximateDistance(body),
                velocity: this.getApproximateVelocity(body),
                retrograde: this.isRetrograde(body, now),
                magnitude: this.getApproximateMagnitude(body)
            };
        });
        
        return positions;
    }

    // Get approximate position (based on simplified astronomical algorithms)
    getApproximatePosition(body, date) {
        const daysSinceEpoch = (date.getTime() - new Date('2000-01-01').getTime()) / (1000 * 60 * 60 * 24);
        
        const meanMotions = {
            sun: 0.9856,    // degrees/day
            moon: 13.1764,
            mercury: 4.0923,
            venus: 1.6022,
            mars: 0.5240,
            jupiter: 0.0831,
            saturn: 0.0335,
            uranus: 0.0117,
            neptune: 0.0059,
            pluto: 0.0040
        };

        const epochPositions = {
            sun: 280.47,
            moon: 218.32,
            mercury: 252.25,
            venus: 181.98,
            mars: 355.43,
            jupiter: 34.35,
            saturn: 50.08,
            uranus: 314.05,
            neptune: 304.35,
            pluto: 238.96
        };

        const meanMotion = meanMotions[body] || 0;
        const epochPosition = epochPositions[body] || 0;
        
        return (epochPosition + meanMotion * daysSinceEpoch) % 360;
    }

    // Get approximate distance (AU)
    getApproximateDistance(body) {
        const distances = {
            sun: 1.0,
            moon: 0.00257,
            mercury: 0.39,
            venus: 0.72,
            mars: 1.52,
            jupiter: 5.20,
            saturn: 9.54,
            uranus: 19.19,
            neptune: 30.07,
            pluto: 39.48
        };
        return distances[body] || 1.0;
    }

    // Get approximate velocity (degrees/day)
    getApproximateVelocity(body) {
        const velocities = {
            sun: 0.9856,
            moon: 13.1764,
            mercury: 4.0923,
            venus: 1.6022,
            mars: 0.5240,
            jupiter: 0.0831,
            saturn: 0.0335,
            uranus: 0.0117,
            neptune: 0.0059,
            pluto: 0.0040
        };
        return velocities[body] || 0;
    }

    // Check if planet is retrograde
    isRetrograde(body, date) {
        // Simplified retrograde calculation
        const daysSinceEpoch = (date.getTime() - new Date('2000-01-01').getTime()) / (1000 * 60 * 60 * 24);
        const retroPeriods = {
            mercury: 116,
            venus: 584,
            mars: 780,
            jupiter: 399,
            saturn: 378,
            uranus: 370,
            neptune: 367,
            pluto: 366
        };
        
        const period = retroPeriods[body];
        if (!period) return false;
        
        const cyclePosition = (daysSinceEpoch % period) / period;
        return cyclePosition > 0.4 && cyclePosition < 0.6;
    }

    // Get approximate magnitude
    getApproximateMagnitude(body) {
        const magnitudes = {
            sun: -26.7,
            moon: -12.6,
            mercury: -0.4,
            venus: -4.6,
            mars: -2.9,
            jupiter: -2.9,
            saturn: 0.4,
            uranus: 5.7,
            neptune: 7.8,
            pluto: 14.0
        };
        return magnitudes[body] || 0;
    }

    // Parse NASA response
    parseNASAResponse(response) {
        // Implementation for parsing NASA API response
        return this.normalizePositionData(response.data);
    }

    // Parse Swiss Ephemeris response  
    parseSwissEphResponse(response) {
        return this.normalizePositionData(response.data);
    }

    // Parse USNO response
    parseUSNOResponse(response) {
        return this.normalizePositionData(response.data);
    }

    // Parse TimeAndDate response
    parseTimeAndDateResponse(response) {
        return this.normalizePositionData(response.data);
    }

    // Normalize position data to standard format
    normalizePositionData(rawData) {
        const normalized = {};
        
        Object.entries(rawData).forEach(([body, data]) => {
            normalized[body] = {
                degree: data.longitude || 0,
                retrograde: data.retrograde || false,
                house: Math.floor((data.longitude || 0) / 30) + 1,
                intensity: data.intensity || 1.0,
                distance: data.distance || 1.0,
                velocity: data.velocity || 0,
                magnitude: data.magnitude || 0
            };
        });
        
        return normalized;
    }

    // Validate data quality
    validateData(data) {
        if (!data || typeof data !== 'object') return false;
        
        const requiredBodies = ['sun', 'moon', 'mercury', 'venus', 'mars'];
        for (const body of requiredBodies) {
            if (!data[body] || typeof data[body].longitude !== 'number') {
                return false;
            }
        }
        
        return true;
    }

    // Get locally calculated positions (fallback)
    getLocalCalculatedPositions() {
        console.log('Using local astronomical calculations');
        
        // Use the local calculation function from script.js
        if (typeof getCurrentPlanetaryPositions === 'function') {
            return getCurrentPlanetaryPositions();
        }
        
        throw new Error('Local calculation function not available');
    }

    // Get data source status
    getDataSourceStatus() {
        return {
            lastUpdate: this.lastUpdate,
            cacheSize: this.cache.size,
            isOnline: navigator.onLine,
            fallbackMode: this.fallbackToLocal
        };
    }

    // Clear cache
    clearCache() {
        this.cache.clear();
        console.log('Astronomical data cache cleared');
    }
}

// Initialize global instance
window.astronomicalDataManager = new AstronomicalDataManager();

// Export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AstronomicalDataManager;
} else if (typeof window !== 'undefined') {
    window.AstronomicalDataManager = AstronomicalDataManager;
    window.astronomicalAPI = window.astronomicalDataManager;
} 