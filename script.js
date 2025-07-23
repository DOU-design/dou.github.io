// 等待DOM加载完成
document.addEventListener('DOMContentLoaded', function() {
    // 鼠标移动事件处理
    let mouseX = 0;
    let mouseY = 0;
    
    document.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        // 计算鼠标位置的百分比
        const mouseXPercent = (mouseX / window.innerWidth) * 100;
        const mouseYPercent = (mouseY / window.innerHeight) * 100;
        
        // 设置CSS变量控制网格点亮位置
        document.body.style.setProperty('--mouse-x', mouseXPercent + '%');
        document.body.style.setProperty('--mouse-y', mouseYPercent + '%');
        
        // 显示网格点亮效果
        document.body.style.setProperty('--grid-opacity', '1');
        
        // 主视觉配图跟随鼠标
        const heroImage = document.querySelector('.hero-image');
        if (heroImage && heroImage.style.opacity === '1') {
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;
            
            const moveX = (mouseX - centerX) * 0.015; // 轻微跟随幅度
            const moveY = (mouseY - centerY) * 0.015;
            
            heroImage.style.transform = `translateY(-50%) translateX(${20 + moveX}px) translateY(${moveY}px)`;
        }
    });
    
    // 鼠标离开页面时隐藏网格光效
    document.addEventListener('mouseleave', function() {
        document.body.style.setProperty('--grid-opacity', '0');
    });
    
    // 气泡提示函数
    function showToast(message) {
        // 移除已存在的气泡
        const existingToast = document.querySelector('.toast');
        if (existingToast) {
            existingToast.remove();
        }
        
        // 创建新的气泡
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // 显示动画
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);
        
        // 3秒后隐藏并移除
        setTimeout(() => {
            toast.classList.add('hide');
            setTimeout(() => {
                toast.remove();
            }, 300);
        }, 3000);
    }
    
    // 导航项目悬停效果
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        if (!item.querySelector('.disabled')) {
            item.addEventListener('mouseenter', function() {
                const span = this.querySelector('span');
                span.style.color = 'var(--text-primary)';
            });
            
            item.addEventListener('mouseleave', function() {
                const span = this.querySelector('span');
                span.style.color = 'var(--text-secondary)';
            });
            
            // 为导航项添加点击事件
            item.addEventListener('click', function() {
                showToast('Please look forward to');
            });
        }
    });
    
    // CTA按钮鼠标跟随光源效果
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            this.style.setProperty('--mouse-x', x + '%');
            this.style.setProperty('--mouse-y', y + '%');
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            // 不重置鼠标位置，只是让光效淡出
        });
        
        // 为CTA按钮添加点击事件
        ctaButton.addEventListener('click', function(e) {
            e.preventDefault();
            showToast('Please look forward to');
        });
    }
    
    // 添加滚动动画效果
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    
    // 简单的入场动画
    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 300);
    
    setTimeout(() => {
        if (heroImage) {
            heroImage.style.opacity = '1';
            // 初始位置，后续会被鼠标跟随效果覆盖
            heroImage.style.transform = 'translateY(-50%) translateX(20px)';
        }
    }, 600);
});