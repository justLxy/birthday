
const unlockDate = new Date('2025-02-20T00:00:00').getTime();
const password = 'lvxuanyi'; // 设置您的密码

const gradientColors = [
    { day: 365, colors: [[26, 11, 46], [57, 38, 87]] },
    { day: 355, colors: [[30, 20, 70], [60, 40, 100]] },
    { day: 345, colors: [[35, 30, 90], [65, 45, 120]] },
    { day: 335, colors: [[50, 35, 110], [75, 50, 130]] },
    { day: 325, colors: [[70, 45, 130], [90, 60, 150]] },
    { day: 315, colors: [[85, 60, 150], [100, 70, 170]] },
    { day: 305, colors: [[100, 70, 180], [120, 80, 190]] },
    { day: 295, colors: [[120, 90, 200], [140, 100, 210]] },
    { day: 285, colors: [[140, 110, 220], [160, 120, 230]] },
    { day: 275, colors: [[160, 130, 240], [180, 140, 250]] },
    { day: 265, colors: [[180, 150, 255], [190, 160, 255]] },
    { day: 255, colors: [[100, 80, 180], [150, 100, 220]] },
    { day: 245, colors: [[120, 100, 200], [170, 110, 230]] },
    { day: 235, colors: [[140, 120, 210], [190, 130, 240]] },
    { day: 225, colors: [[150, 140, 230], [210, 150, 255]] },
    { day: 215, colors: [[130, 120, 210], [180, 140, 240]] },
    { day: 205, colors: [[110, 100, 190], [150, 120, 210]] },
    { day: 195, colors: [[90, 80, 170], [120, 100, 190]] },
    { day: 185, colors: [[70, 60, 150], [100, 80, 170]] },
    { day: 175, colors: [[50, 40, 130], [80, 60, 150]] },
    { day: 165, colors: [[30, 20, 110], [60, 40, 130]] },
    { day: 155, colors: [[20, 10, 90], [50, 30, 120]] },
    { day: 145, colors: [[25, 15, 100], [55, 35, 130]] },
    { day: 135, colors: [[30, 20, 110], [60, 40, 140]] },
    { day: 125, colors: [[40, 30, 120], [70, 50, 150]] },
    { day: 115, colors: [[50, 40, 130], [80, 60, 160]] },
    { day: 105, colors: [[60, 50, 140], [90, 70, 170]] },
    { day: 95,  colors: [[70, 60, 150], [100, 80, 180]] },
    { day: 85,  colors: [[80, 70, 160], [110, 90, 190]] },
    { day: 75,  colors: [[90, 80, 170], [120, 100, 200]] },
    { day: 65,  colors: [[100, 90, 180], [130, 110, 210]] },
    { day: 55,  colors: [[110, 100, 190], [140, 120, 220]] },
    { day: 45,  colors: [[120, 110, 200], [150, 130, 230]] },
    { day: 35,  colors: [[130, 120, 210], [160, 140, 240]] },
    { day: 25,  colors: [[140, 130, 220], [170, 150, 250]] },
    { day: 15,  colors: [[150, 140, 230], [180, 160, 255]] },
    { day: 5,   colors: [[160, 150, 240], [190, 170, 255]] },
    { day: 0,   colors: [[120, 100, 210], [180, 140, 255]] }
];

//
// 倒计时及其他相关函数
//
function updateCountdown() {
    const now = new Date().getTime();
    const distance = unlockDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');

    if (distance < 0) {
        clearInterval(countdownTimer);
        createConfetti();
        setTimeout(unlockPage, 2000);
    }
}

function unlockPage() {
    clearInterval(countdownTimer);
    clearInterval(friendshipTimer);
    document.getElementById('lockScreen').style.display = 'none';
    triggerConfetti(); // 触发彩纸动画
}

function checkPassword() {
    const input = document.getElementById('passwordInput').value;
    if (input === password) {
        unlockPage();
    } else {
        alert('密码错误');
    }
}

const countdownTimer = setInterval(updateCountdown, 1000);
const friendshipTimer = setInterval(updateFriendshipTime, 1000);

// 检查是否已经过了解锁日期
if (new Date().getTime() > unlockDate) {
    unlockPage();
}

function updateFriendshipTime() {
    const startDate = new Date('2019-09-01T00:00:00');
    const now = new Date();
    const difference = now - startDate;

    const years = Math.floor(difference / (1000 * 60 * 60 * 24 * 365));
    const days = Math.floor((difference % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));

    const totalDays = Math.floor(difference / (1000 * 60 * 60 * 24));

    const friendshipTimeElement = document.getElementById('friendship-time');
    const totalDaysElement = document.getElementById('total-days');
    
    friendshipTimeElement.textContent = `${years}年 ${days}天 ${hours}时 ${minutes}分`;
    totalDaysElement.textContent = `也就是 ${totalDays} 天`;
}

//
// 特效渐变：使用 requestAnimationFrame 实现每一帧更新
//
let gradientPhase = 0;
function animateBackground() {
    const lockScreen = document.querySelector('.lock-screen');
    // 递增相位（可调整速度，数值越大变化越快）
    gradientPhase += 0.005;
    // 使用正弦函数，让因子在 0 ~ 1 之间往返变化
    const factor = (Math.sin(gradientPhase) + 1) / 2;

    // 这里我们选择初始颜色取自数组第一个，最终颜色取自数组最后一个
    const startGradient = { colors: gradientColors[0].colors };
    const endGradient = { colors: gradientColors[gradientColors.length - 1].colors };

    const color1 = interpolateColors(startGradient.colors[0], endGradient.colors[0], factor);
    const color2 = interpolateColors(startGradient.colors[1], endGradient.colors[1], factor);

    lockScreen.style.background = `linear-gradient(45deg, rgb(${color1.join(',')}), rgb(${color2.join(',')}))`;

    requestAnimationFrame(animateBackground);
}

function interpolateColors(start, end, factor) {
    return start.map((startVal, i) => Math.round(startVal + (end[i] - startVal) * factor));
}

function triggerConfetti() {
    const lockScreen = document.getElementById('lockScreen');
    for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.animationDelay = Math.random() * 3 + 's';
        lockScreen.appendChild(confetti);
    }
}

function createStars() {
    const container = document.querySelector('.lock-screen');
    const starCount = 150;
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = 1 + Math.random() * 2;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.setProperty('--duration', `${2 + Math.random() * 3}s`);
        star.style.setProperty('--delay', `${Math.random() * 2}s`);
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        container.appendChild(star);
    }
}

function createShootingStars() {
    const container = document.querySelector('.lock-screen');
    
    function createStar() {
        if (Math.random() > 0.3) return;
        
        const star = document.createElement('div');
        star.className = 'shooting-star';
        const startX = window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.3);
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        const duration = 1.5 + Math.random();
        star.style.animation = `shooting ${duration}s linear forwards`;
        container.appendChild(star);
        setTimeout(() => star.remove(), duration * 1000);
    }
    
    setInterval(createStar, 2000);
}

function createConfetti() {
    const container = document.createElement('div');
    container.className = 'celebration';
    document.body.appendChild(container);
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(confetti);
    }
    
    setTimeout(() => container.remove(), 6000);
}

//
// 初始化所有动画与特效
//
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createShootingStars();
    animateBackground();  // 启动平滑背景渐变动画
    updateDaysKnown();
    setWishesAnimation();
});

function updateDaysKnown() {
    const startDate = new Date('2019-09-01T00:00:00');
    const now = new Date();
    const difference = now - startDate;
    const daysKnown = Math.floor(difference / (1000 * 60 * 60 * 24));
    
    const daysKnownElement = document.getElementById('days-known');
    if (daysKnownElement) {
        daysKnownElement.textContent = daysKnown;
    }
}

function setWishesAnimation() {
    const wishes = document.querySelectorAll('.creative-wishes p');
    wishes.forEach((wish, index) => {
        wish.style.setProperty('--order', index);
    });
}

const wishes = [
    "生日快乐，我的金铲铲开黑伙伴！🎉🎮",
    "我们已经相识 {days} 天啦",
    "愿你的快乐像金铲铲连胜，源源不断🏆",
    "最后，愿我们的友谊如同最佳羁绊，珍稀又默契！🤝🌟"
];

function typeWriter(element, text, i = 0) {
    if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(() => typeWriter(element, text, i), 50);
    } else {
        element.classList.remove('typing');
        typeNextWish();
    }
}

let currentWish = 0;
function typeNextWish() {
    if (currentWish < wishes.length) {
        let element;
        if (currentWish === 0) {
            element = document.getElementById('mainWish');
        } else if (currentWish === 1) {
            element = document.getElementById('daysKnown');
        } else {
            element = document.querySelectorAll('#creativeWishes p')[currentWish - 2];
        }
        element.innerHTML = '';
        element.classList.add('typing');
        let wishText = wishes[currentWish];
        if (currentWish === 1) {
            const startDate = new Date('2019-09-01T00:00:00');
            const now = new Date();
            const difference = now - startDate;
            const daysKnown = Math.floor(difference / (1000 * 60 * 60 * 24));
            wishText = wishText.replace('{days}', daysKnown);
        }
        typeWriter(element, wishText);
        currentWish++;
    }
}

document.addEventListener('DOMContentLoaded', typeNextWish);
