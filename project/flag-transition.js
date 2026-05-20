// 国旗背景渐变切换器 - 使用真实国旗图片
class FlagTransition {
    constructor() {
        this.hero = document.querySelector('.hero');
        this.currentPhase = 'china';
        this.isTransitioning = false;
        this.southeastAsiaImageIndex = 0;
        
        // 国旗配置 - 使用真实图片
        this.flags = {
            china: {
                name: '中国',
                image: './picture/cn.png',
                colors: {
                    primary: '#DE2910',
                    secondary: '#FFD700',
                    light: '#FFE6E6'
                }
            },
            southeastAsia: {
                name: '东南亚',
                images: [
                    './picture/sg.png',
                    './picture/my.png', 
                    './picture/id.png',
                    './picture/th.png',
                    './picture/vn.png'
                ],
                countries: ['新加坡', '马来西亚', '印尼', '泰国', '越南'],
                colors: {
                    primary: '#00338F',
                    secondary: '#B22234',
                    light: '#E6E6FF'
                }
            }
        };
        
        // 时间配置
        this.chinaDisplayTime = 5000;
        this.transitionDuration = 2000;
        this.seaDisplayTime = 5000;
        this.imageRotateInterval = 3000;
        
        this.init();
    }
    
    init() {
        this.setupHeroBackground();
        this.addFlagOverlays();
        this.addCurrentPhaseIndicator();
        this.startCycle();
        
        console.log('国旗切换功能已启动 - 使用真实图片');
    }
    
    // 设置英雄区背景
    setupHeroBackground() {
        this.hero.style.transition = 'background 1.5s ease-in-out';
    }
    
    // 添加国旗覆盖层（使用图片）
    addFlagOverlays() {
        // 移除原有的flag-stripe
        const existingStripe = document.querySelector('.flag-stripe');
        if (existingStripe) {
            existingStripe.style.display = 'none';
        }
        
        // 添加国旗图片覆盖层
        const flagOverlay = document.createElement('div');
        flagOverlay.className = 'flag-image-overlay';
        flagOverlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0;
            transition: opacity 1.5s ease-in-out;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        `;
        this.hero.appendChild(flagOverlay);
        this.flagOverlayEl = flagOverlay;
        
        // 添加文本标签
        this.labelEl = document.createElement('div');
        this.labelEl.style.cssText = `
            position: fixed;
            bottom: 40px;
            right: 40px;
            font-size: 2rem;
            font-weight: bold;
            color: rgba(255, 255, 255, 0.9);
            text-shadow: 0 4px 20px rgba(0, 0, 0, 0.8);
            z-index: 10;
            transition: opacity 1s ease-in-out;
            pointer-events: none;
        `;
        this.hero.appendChild(this.labelEl);
    }
    
    // 添加当前阶段指示器
    addCurrentPhaseIndicator() {
        const indicator = document.createElement('div');
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: rgba(0, 0, 0, 0.6);
            color: white;
            padding: 10px 20px;
            border-radius: 20px;
            font-size: 14px;
            font-weight: bold;
            z-index: 100;
            transition: all 1s ease-in-out;
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
        `;
        this.hero.appendChild(indicator);
        this.phaseIndicator = indicator;
        this.updatePhaseIndicator('🇨🇳 中国');
    }
    
    // 设置背景
    setBackground(type) {
        let bgColor;
        let overlayImage = null;
        
        if (type === 'china') {
            bgColor = `linear-gradient(135deg, ${this.flags.china.colors.primary}, ${this.flags.china.colors.primary}33, ${this.flags.china.colors.secondary}22)`;
            overlayImage = this.flags.china.image;
        } else if (type === 'sea') {
            bgColor = `linear-gradient(135deg, ${this.flags.southeastAsia.colors.primary}, ${this.flags.southeastAsia.colors.primary}33, ${this.flags.southeastAsia.colors.secondary}22)`;
            overlayImage = this.flags.southeastAsia.images[this.southeastAsiaImageIndex];
        } else {
            // 过渡阶段
            bgColor = `linear-gradient(135deg, #DE2910, #8B008B, #00338F)`;
        }
        
        this.hero.style.background = bgColor;
        
        if (overlayImage) {
            this.flagOverlayEl.style.backgroundImage = `url('${overlayImage}')`;
            this.flagOverlayEl.style.opacity = '0.3';
        } else {
            this.flagOverlayEl.style.opacity = '0';
        }
    }
    
    // 更新标签文本
    updateLabel(type) {
        if (type === 'china') {
            this.labelEl.textContent = '中国 🇨🇳';
            this.labelEl.style.color = '#FFE6E6';
        } else if (type === 'sea') {
            this.labelEl.textContent = `东南亚 ${this.flags.southeastAsia.countries[this.southeastAsiaImageIndex]}`;
            this.labelEl.style.color = '#E6E6FF';
        }
    }
    
    // 显示国旗
    showFlag(show) {
        this.flagOverlayEl.style.opacity = show ? '0.3' : '0';
        this.labelEl.style.opacity = '1';
    }
    
    // 更新阶段指示器
    updatePhaseIndicator(text) {
        if (this.phaseIndicator) {
            this.phaseIndicator.textContent = text;
        }
    }
    
    // 切换到中国阶段
    switchToChina() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentPhase = 'china';
        
        this.updatePhaseIndicator('🔄 切换中...');
        
        // 开始过渡
        this.setBackground('transition');
        
        setTimeout(() => {
            this.setBackground('china');
            this.showFlag(true);
            this.updateLabel('china');
            this.isTransitioning = false;
            
            setTimeout(() => {
                this.switchToSea();
            }, this.chinaDisplayTime);
        }, this.transitionDuration);
    }
    
    // 切换到东南亚阶段
    switchToSea() {
        if (this.isTransitioning) return;
        this.isTransitioning = true;
        this.currentPhase = 'sea';
        
        this.updatePhaseIndicator('🔄 切换中...');
        
        // 开始过渡
        this.setBackground('transition');
        
        setTimeout(() => {
            this.setBackground('sea');
            this.showFlag(true);
            this.updateLabel('sea');
            this.isTransitioning = false;
            
            // 设置东南亚图片轮换
            this.startSeaImageRotation();
            
            setTimeout(() => {
                this.switchToChina();
            }, this.seaDisplayTime);
        }, this.transitionDuration);
    }
    
    // 东南亚图片轮换
    startSeaImageRotation() {
        if (this.seaImageInterval) {
            clearInterval(this.seaImageInterval);
        }
        
        this.seaImageInterval = setInterval(() => {
            if (this.currentPhase !== 'sea') {
                clearInterval(this.seaImageInterval);
                return;
            }
            
            this.southeastAsiaImageIndex = (this.southeastAsiaImageIndex + 1) % this.flags.southeastAsia.images.length;
            this.setBackground('sea');
            this.updateLabel('sea');
        }, this.imageRotateInterval);
    }
    
    // 开始循环
    startCycle() {
        // 初始延迟
        setTimeout(() => {
            this.switchToChina();
        }, 1000);
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    new FlagTransition();
});