# 星辰占卜 - 专业占星学运势分析平台

<div align="center">
  <img src="images/constellation-logo.svg" alt="星辰占卜" width="100" height="100">
  
  **你的专属星座指南**
  
  基于千年占星学传统，融合现代天文学精确计算
  
  [![Website](https://img.shields.io/badge/Website-Live-brightgreen)](https://superljy.github.io/inspirationstudio/)
  [![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
  [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](CONTRIBUTING.md)
</div>

## 📚 项目简介

星辰占卜是一个基于传统占星学和现代天体力学的专业运势分析平台。通过精确的天文计算，为用户提供个性化的星象分析、运势预测和占星指导。

### ✨ 核心特色

- 🎯 **精准天文计算** - 实时行星位置和月相数据
- 🔮 **个性化分析** - 深度星座特质解读
- 📱 **响应式设计** - 完美适配所有设备
- 🌟 **专业内容** - 基于传统占星学理论
- ⚡ **性能优化** - 快速加载，流畅体验

## 🚀 在线体验

**网站地址**: [https://superljy.github.io/inspirationstudio/](https://superljy.github.io/inspirationstudio/)

## 📋 功能特性

### 🎨 用户界面
- **现代化设计** - 清新的蓝紫色渐变主题
- **星座图标** - 精美的SVG矢量图标系统
- **动画效果** - 平滑的交互动画和过渡效果
- **多设备适配** - 桌面端、平板、手机完美显示

### 🔮 占星功能
- **十二星座分析** - 完整的星座特质解读
- **实时运势计算** - 基于当前天象的运势预测
- **幸运元素** - 颜色、数字、方向等幸运指南
- **星座配对** - 专业的星座兼容性分析
- **行星影响** - 详细的行星位置和影响分析

### 📊 数据系统
- **天文API集成** - 实时获取行星位置数据
- **月相计算** - 精确的月相周期追踪
- **生命周期分析** - 个人成长阶段解读
- **每日建议** - 基于星象的生活指导

## 🛠️ 技术栈

### 前端技术
- **HTML5** - 语义化标签，SEO优化
- **CSS3** - 现代CSS特性，Flexbox/Grid布局
- **JavaScript (ES6+)** - 模块化开发，异步处理
- **SVG图标** - 矢量图形，完美缩放

### 响应式设计
- **移动优先** - Mobile-first设计理念
- **断点适配** - 768px / 480px / 360px断点
- **触摸优化** - 移动端交互优化

### 性能优化
- **资源压缩** - CSS/JS代码优化
- **图片优化** - SVG矢量图标系统
- **缓存策略** - 智能缓存机制
- **懒加载** - 按需加载资源

## 📁 项目结构

```
星辰占卜/
├── index.html              # 主页面
├── css/                    # 样式文件
│   ├── style.css          # 主样式表
│   └── mobile-fix.css     # 移动端优化
├── js/                     # JavaScript文件
│   └── script.js          # 主脚本文件
├── images/                 # 图片资源
│   ├── favicon.svg        # 网站图标
│   └── constellation-logo.svg # Logo图标
├── config/                 # 配置文件
│   └── astronomical-apis.js # 天文API配置
├── utils/                  # 工具函数
│   └── astronomical-api.js # 天文数据处理
├── pages/                  # 其他页面
│   ├── about.html         # 关于页面
│   └── guide.html         # 使用指南
├── data/                   # 数据文件
├── components/             # 组件文件
├── fonts/                  # 字体文件
└── assets/                 # 其他资源
```

## 🎯 快速开始

### 环境要求
- 现代浏览器 (Chrome 60+, Firefox 55+, Safari 12+)
- 支持ES6+的JavaScript环境

### 本地运行
1. **克隆项目**
   ```bash
   git clone https://github.com/superljy/inspirationstudio.git
   cd inspirationstudio
   ```

2. **启动服务**
   ```bash
   # 使用Python简单服务器
   python -m http.server 8000
   
   # 或使用Node.js live-server
   npx live-server
   ```

3. **访问网站**
   ```
   http://localhost:8000
   ```

### 部署到GitHub Pages
1. Fork本仓库
2. 在仓库设置中启用GitHub Pages
3. 选择主分支作为发布源
4. 访问 `https://yourusername.github.io/inspirationstudio/`

## 📱 响应式设计

### 桌面端 (1200px+)
- 完整功能展示
- 多栏布局
- 丰富的动画效果
- Logo: 32px × 32px

### 平板端 (768px - 1199px)
- 自适应布局
- 触摸优化
- 导航简化
- Logo: 24px × 24px

### 手机端 (< 768px)
- 单栏垂直布局
- 大按钮设计
- 滑动交互
- Logo: 20px × 20px

## 🔧 开发指南

### 代码规范
- **HTML**: 语义化标签，无障碍设计
- **CSS**: BEM命名规范，模块化设计
- **JavaScript**: ES6+语法，函数式编程

### 样式组织
```css
/* 全局样式 */
style.css

/* 移动端优化 */
mobile-fix.css
```

### 主要功能模块
1. **星座选择** - 用户交互界面
2. **运势计算** - 核心算法逻辑
3. **结果展示** - 数据可视化
4. **响应式布局** - 多设备适配

## 🌟 核心算法

### 运势计算逻辑
```javascript
// 综合运势 = 行星影响 × 元素和谐度 × 质量协调度 × 季节因子
overallScore = (planetaryScore * elementalHarmony * qualityInteraction * seasonalFactor) * 100
```

### 行星影响分析
- **太阳系行星位置** - 实时天文数据
- **黄道十二宫** - 传统占星学理论
- **相位关系** - 行星间角度影响
- **逆行效应** - 特殊天象考量

## 📈 性能指标

- **首屏加载** < 2秒
- **Lighthouse评分** > 90分
- **移动端适配** 100%兼容
- **浏览器支持** 95%+覆盖率

## 🔄 更新日志

### v2.0.0 (2024-12)
- ✨ 添加专业Logo和Favicon
- 🎨 全面的移动端优化
- 📱 响应式设计重构
- ⚡ 性能优化提升

### v1.0.0 (2024-11)
- 🎉 项目初始发布
- 🔮 基础占星功能
- 📊 天文数据集成
- 🎯 核心算法实现

## 🤝 贡献指南

我们欢迎所有形式的贡献！

### 贡献方式
1. **Bug报告** - 提交Issue描述问题
2. **功能建议** - 分享您的想法
3. **代码贡献** - 提交Pull Request
4. **文档完善** - 改进项目文档

### 开发流程
1. Fork项目
2. 创建功能分支
3. 提交更改
4. 发起Pull Request

## 📞 联系我们

- **项目作者**: [superljy](https://github.com/superljy)
- **项目地址**: [GitHub Repository](https://github.com/superljy/inspirationstudio)
- **问题反馈**: [Issues](https://github.com/superljy/inspirationstudio/issues)

## 📄 开源协议

本项目采用 [MIT License](LICENSE) 开源协议。

## 🙏 致谢

感谢以下开源项目和资源：
- **天文数据** - NASA JPL Horizons System
- **字体资源** - Google Fonts
- **图标设计** - 自主设计SVG图标
- **占星理论** - 传统占星学文献

---

<div align="center">
  <strong>⭐ 如果这个项目对您有帮助，请给我们一个Star！⭐</strong>
  
  Made with ❤️ by [superljy](https://github.com/superljy)
</div> 