const unlockDate = new Date('2025-02-20T00:00:00').getTime();
const password = 'lvxuanyi'; // 设置您的密码

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

    intensifyBackground();

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
    triggerConfetti(); // Trigger confetti animation
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
    
    // Create static stars
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
        
        // Random starting position in the top-right corner
        const startX = window.innerWidth;
        const startY = Math.random() * (window.innerHeight * 0.3);
        
        star.style.left = `${startX}px`;
        star.style.top = `${startY}px`;
        
        // Random duration for the animation
        const duration = 1.5 + Math.random();
        star.style.animation = `shooting ${duration}s linear forwards`;
        
        container.appendChild(star);
        
        setTimeout(() => star.remove(), duration * 1000);
    }
    
    setInterval(createStar, 2000);
}

function intensifyBackground() {
    const lockScreen = document.querySelector('.lock-screen');
    const now = new Date().getTime();
    const timeLeft = unlockDate - now;
    const daysLeft = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    
    // 调整为紫色系渐变
    const intensity = Math.max(0, Math.min(1, (30 - daysLeft) / 30));
    const color1 = interpolateColors(
        [26, 11, 46],  // #1a0b2e
        [82, 45, 128], // #522d80
        intensity
    );
    const color2 = interpolateColors(
        [57, 38, 87],  // #392657
        [147, 87, 186], // #9357ba
        intensity
    );
    
    lockScreen.style.background = `linear-gradient(45deg, 
        rgb(${color1.join(',')}), 
        rgb(${color2.join(',')}))`;
}

function interpolateColors(start, end, factor) {
    return start.map((startVal, i) => {
        return Math.round(startVal + (end[i] - startVal) * factor);
    });
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

// Initialize stars when the page loads
document.addEventListener('DOMContentLoaded', () => {
    createStars();
    createShootingStars();
});

function updateDaysKnown() {
    const startDate = new Date('2019-09-01T00:00:00'); // 设置你们相识的日期
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

document.addEventListener('DOMContentLoaded', () => {
    updateDaysKnown();
    setWishesAnimation();
});

// 每天更新一次天数
setInterval(updateDaysKnown, 24 * 60 * 60 * 1000);

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
