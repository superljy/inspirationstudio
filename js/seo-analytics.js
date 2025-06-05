// SEO分析和用户行为追踪工具
class SEOAnalytics {
    constructor() {
        this.startTime = Date.now();
        this.pageViews = 0;
        this.userInteractions = [];
        this.scrollDepth = 0;
        this.maxScrollDepth = 0;
        this.sessionId = this.generateSessionId();
        
        this.initAnalytics();
        this.initUserTracking();
        this.initPerformanceTracking();
    }
    
    // 生成会话ID
    generateSessionId() {
        return 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    }
    
    // 初始化分析工具
    initAnalytics() {
        // Google Analytics 4 配置
        if (typeof gtag !== 'undefined') {
            gtag('config', 'GA_MEASUREMENT_ID', {
                page_title: document.title,
                page_location: window.location.href,
                content_group1: this.getContentCategory(),
                custom_map: {
                    'custom_dimension_1': 'language',
                    'custom_dimension_2': 'zodiac_sign',
                    'custom_dimension_3': 'user_type'
                }
            });
        }
        
        // 页面加载完成事件
        window.addEventListener('load', () => {
            this.trackPageLoad();
        });
    }
    
    // 初始化用户行为追踪
    initUserTracking() {
        // 滚动深度追踪
        window.addEventListener('scroll', this.throttle(() => {
            this.trackScrollDepth();
        }, 100));
        
        // 点击事件追踪
        document.addEventListener('click', (e) => {
            this.trackClick(e);
        });
        
        // 表单提交追踪
        document.addEventListener('submit', (e) => {
            this.trackFormSubmission(e);
        });
        
        // 页面停留时间追踪
        window.addEventListener('beforeunload', () => {
            this.trackPageExit();
        });
        
        // 语言切换追踪
        if (window.languageManager) {
            const originalSwitch = window.languageManager.switchLanguage;
            window.languageManager.switchLanguage = (lang) => {
                this.trackLanguageSwitch(lang);
                originalSwitch.call(window.languageManager, lang);
            };
        }
    }
    
    // 初始化性能追踪
    initPerformanceTracking() {
        // 页面性能监控
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.trackPerformanceMetrics();
                }, 0);
            });
        }
        
        // 网络状态监控
        if ('connection' in navigator) {
            this.trackNetworkInfo();
        }
    }
    
    // 追踪页面加载
    trackPageLoad() {
        const loadTime = Date.now() - this.startTime;
        const lang = new URLSearchParams(window.location.search).get('lang') || 'zh';
        
        this.sendEvent('page_view', {
            page_title: document.title,
            page_location: window.location.href,
            language: lang,
            load_time: loadTime,
            session_id: this.sessionId,
            timestamp: new Date().toISOString()
        });
        
        // 发送到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_view', {
                page_title: document.title,
                page_location: window.location.href,
                custom_dimension_1: lang,
                value: loadTime
            });
        }
    }
    
    // 追踪滚动深度
    trackScrollDepth() {
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        this.scrollDepth = Math.round((scrollTop + windowHeight) / documentHeight * 100);
        
        if (this.scrollDepth > this.maxScrollDepth) {
            this.maxScrollDepth = this.scrollDepth;
            
            // 追踪重要的滚动里程碑
            if (this.scrollDepth >= 25 && !this.scrollMilestones?.['25']) {
                this.trackScrollMilestone(25);
            }
            if (this.scrollDepth >= 50 && !this.scrollMilestones?.['50']) {
                this.trackScrollMilestone(50);
            }
            if (this.scrollDepth >= 75 && !this.scrollMilestones?.['75']) {
                this.trackScrollMilestone(75);
            }
            if (this.scrollDepth >= 90 && !this.scrollMilestones?.['90']) {
                this.trackScrollMilestone(90);
            }
        }
    }
    
    // 追踪滚动里程碑
    trackScrollMilestone(percentage) {
        if (!this.scrollMilestones) {
            this.scrollMilestones = {};
        }
        this.scrollMilestones[percentage] = true;
        
        this.sendEvent('scroll_milestone', {
            percentage: percentage,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        });
        
        if (typeof gtag !== 'undefined') {
            gtag('event', 'scroll', {
                event_category: 'engagement',
                event_label: `${percentage}%`,
                value: percentage
            });
        }
    }
    
    // 追踪点击事件
    trackClick(event) {
        const element = event.target;
        const tagName = element.tagName.toLowerCase();
        let eventData = {
            element_type: tagName,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        // 特殊元素追踪
        if (tagName === 'button') {
            eventData.button_text = element.textContent.trim();
            eventData.button_id = element.id || '';
            eventData.button_class = element.className || '';
        } else if (tagName === 'a') {
            eventData.link_text = element.textContent.trim();
            eventData.link_url = element.href || '';
            eventData.link_target = element.target || '';
        } else if (element.id === 'langSwitch') {
            eventData.action_type = 'language_switch';
        }
        
        this.sendEvent('click', eventData);
        
        // 发送到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'interaction',
                event_label: eventData.button_text || eventData.link_text || tagName,
                custom_dimension_2: eventData.action_type || 'general_click'
            });
        }
    }
    
    // 追踪表单提交
    trackFormSubmission(event) {
        const form = event.target;
        const formData = new FormData(form);
        const zodiacSign = formData.get('zodiac') || document.getElementById('zodiacSelect')?.value;
        
        const eventData = {
            form_id: form.id || '',
            zodiac_sign: zodiacSign,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        this.sendEvent('form_submission', eventData);
        
        // 发送到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'generate_lead', {
                event_category: 'engagement',
                event_label: 'horoscope_request',
                custom_dimension_2: zodiacSign,
                value: 1
            });
        }
    }
    
    // 追踪语言切换
    trackLanguageSwitch(newLang) {
        const eventData = {
            previous_language: window.languageManager?.currentLang || 'unknown',
            new_language: newLang,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        this.sendEvent('language_switch', eventData);
        
        // 发送到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'language_change', {
                event_category: 'engagement',
                event_label: `${eventData.previous_language}_to_${newLang}`,
                custom_dimension_1: newLang
            });
        }
    }
    
    // 追踪页面退出
    trackPageExit() {
        const timeOnPage = Date.now() - this.startTime;
        
        const eventData = {
            time_on_page: timeOnPage,
            max_scroll_depth: this.maxScrollDepth,
            interactions_count: this.userInteractions.length,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        };
        
        // 使用 navigator.sendBeacon 确保数据发送
        if (navigator.sendBeacon) {
            navigator.sendBeacon('/api/analytics', JSON.stringify({
                event: 'page_exit',
                data: eventData
            }));
        }
        
        // 发送到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_exit', {
                event_category: 'engagement',
                event_label: 'session_end',
                value: Math.round(timeOnPage / 1000) // 转换为秒
            });
        }
    }
    
    // 追踪性能指标
    trackPerformanceMetrics() {
        if (!('performance' in window)) return;
        
        const navigation = performance.getEntriesByType('navigation')[0];
        const paintEntries = performance.getEntriesByType('paint');
        
        const metrics = {
            // 页面加载时间
            load_time: navigation?.loadEventEnd - navigation?.loadEventStart,
            // DNS查询时间
            dns_time: navigation?.domainLookupEnd - navigation?.domainLookupStart,
            // TCP连接时间
            tcp_time: navigation?.connectEnd - navigation?.connectStart,
            // 请求响应时间
            response_time: navigation?.responseEnd - navigation?.requestStart,
            // DOM解析时间
            dom_parse_time: navigation?.domContentLoadedEventEnd - navigation?.domContentLoadedEventStart,
            // 首次内容绘制时间
            fcp: paintEntries.find(entry => entry.name === 'first-contentful-paint')?.startTime,
            // 最大内容绘制时间（需要额外监听）
            lcp: null,
            // 累积布局偏移（需要额外监听）
            cls: null,
            // 首次输入延迟（需要额外监听）
            fid: null
        };
        
        // 监听LCP
        if ('PerformanceObserver' in window) {
            try {
                new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    const lastEntry = entries[entries.length - 1];
                    metrics.lcp = lastEntry.startTime;
                }).observe({ entryTypes: ['largest-contentful-paint'] });
                
                // 监听CLS
                new PerformanceObserver((list) => {
                    let clsValue = 0;
                    for (const entry of list.getEntries()) {
                        if (!entry.hadRecentInput) {
                            clsValue += entry.value;
                        }
                    }
                    metrics.cls = clsValue;
                }).observe({ entryTypes: ['layout-shift'] });
                
                // 监听FID
                new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        metrics.fid = entry.processingStart - entry.startTime;
                    }
                }).observe({ entryTypes: ['first-input'] });
            } catch (e) {
                console.warn('Performance observer not supported:', e);
            }
        }
        
        this.sendEvent('performance_metrics', {
            metrics: metrics,
            page_location: window.location.href,
            timestamp: new Date().toISOString()
        });
        
        // 发送核心Web性能指标到Google Analytics
        if (typeof gtag !== 'undefined') {
            gtag('event', 'web_vitals', {
                event_category: 'performance',
                event_label: 'core_metrics',
                custom_metric_1: Math.round(metrics.load_time || 0),
                custom_metric_2: Math.round(metrics.fcp || 0)
            });
        }
    }
    
    // 追踪网络信息
    trackNetworkInfo() {
        const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        
        if (connection) {
            const networkData = {
                effective_type: connection.effectiveType,
                downlink: connection.downlink,
                rtt: connection.rtt,
                save_data: connection.saveData
            };
            
            this.sendEvent('network_info', {
                network: networkData,
                timestamp: new Date().toISOString()
            });
        }
    }
    
    // 获取内容分类
    getContentCategory() {
        const path = window.location.pathname;
        if (path.includes('about')) return 'about';
        if (path.includes('guide')) return 'guide';
        if (path.includes('zodiac')) return 'zodiac';
        return 'home';
    }
    
    // 发送事件数据
    sendEvent(eventType, data) {
        // 添加到本地存储用于离线分析
        this.storeEventLocally(eventType, data);
        
        // 尝试发送到服务器
        if (navigator.onLine) {
            this.sendToServer(eventType, data);
        }
    }
    
    // 本地存储事件
    storeEventLocally(eventType, data) {
        try {
            const events = JSON.parse(localStorage.getItem('seo_analytics_events') || '[]');
            events.push({
                type: eventType,
                data: data,
                timestamp: Date.now()
            });
            
            // 只保留最近1000个事件
            if (events.length > 1000) {
                events.splice(0, events.length - 1000);
            }
            
            localStorage.setItem('seo_analytics_events', JSON.stringify(events));
        } catch (e) {
            console.warn('无法存储分析事件:', e);
        }
    }
    
    // 发送到服务器
    sendToServer(eventType, data) {
        // 这里可以发送到你的分析服务器
        // fetch('/api/analytics', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({
        //         event: eventType,
        //         data: data
        //     })
        // }).catch(e => console.warn('分析数据发送失败:', e));
    }
    
    // 工具函数：节流
    throttle(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // 获取分析报告
    getAnalyticsReport() {
        try {
            const events = JSON.parse(localStorage.getItem('seo_analytics_events') || '[]');
            const now = Date.now();
            const oneDay = 24 * 60 * 60 * 1000;
            
            // 过滤最近24小时的事件
            const recentEvents = events.filter(event => now - event.timestamp < oneDay);
            
            const report = {
                totalEvents: recentEvents.length,
                pageViews: recentEvents.filter(e => e.type === 'page_view').length,
                formSubmissions: recentEvents.filter(e => e.type === 'form_submission').length,
                languageSwitches: recentEvents.filter(e => e.type === 'language_switch').length,
                averageTimeOnPage: this.calculateAverageTimeOnPage(recentEvents),
                averageScrollDepth: this.calculateAverageScrollDepth(recentEvents),
                popularZodiacSigns: this.getPopularZodiacSigns(recentEvents),
                languagePreference: this.getLanguagePreference(recentEvents)
            };
            
            return report;
        } catch (e) {
            console.warn('无法生成分析报告:', e);
            return null;
        }
    }
    
    calculateAverageTimeOnPage(events) {
        const exitEvents = events.filter(e => e.type === 'page_exit');
        if (exitEvents.length === 0) return 0;
        
        const totalTime = exitEvents.reduce((sum, event) => {
            return sum + (event.data.time_on_page || 0);
        }, 0);
        
        return Math.round(totalTime / exitEvents.length / 1000); // 转换为秒
    }
    
    calculateAverageScrollDepth(events) {
        const exitEvents = events.filter(e => e.type === 'page_exit');
        if (exitEvents.length === 0) return 0;
        
        const totalDepth = exitEvents.reduce((sum, event) => {
            return sum + (event.data.max_scroll_depth || 0);
        }, 0);
        
        return Math.round(totalDepth / exitEvents.length);
    }
    
    getPopularZodiacSigns(events) {
        const formEvents = events.filter(e => e.type === 'form_submission');
        const zodiacCounts = {};
        
        formEvents.forEach(event => {
            const sign = event.data.zodiac_sign;
            if (sign) {
                zodiacCounts[sign] = (zodiacCounts[sign] || 0) + 1;
            }
        });
        
        return Object.entries(zodiacCounts)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([sign, count]) => ({ sign, count }));
    }
    
    getLanguagePreference(events) {
        const langEvents = events.filter(e => e.type === 'language_switch' || e.type === 'page_view');
        const langCounts = { zh: 0, en: 0 };
        
        langEvents.forEach(event => {
            const lang = event.data.language || event.data.new_language;
            if (lang && langCounts.hasOwnProperty(lang)) {
                langCounts[lang]++;
            }
        });
        
        return langCounts;
    }
}

// 初始化SEO分析
window.addEventListener('DOMContentLoaded', function() {
    window.seoAnalytics = new SEOAnalytics();
    
    // 在控制台提供分析报告功能（仅开发环境）
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        window.getAnalyticsReport = () => {
            const report = window.seoAnalytics.getAnalyticsReport();
            console.table(report);
            return report;
        };
    }
}); 