// ===== DOM Elements =====
const elements = {
    loadingScreen: document.getElementById('loadingScreen'),
    counter: document.getElementById('counter'),
    tasbihBtn: document.getElementById('tasbihBtn'),
    resetBtn: document.getElementById('resetBtn'),
    progressCircle: document.getElementById('progressCircle'),
    duaText: document.getElementById('duaText'),
    duaDots: document.getElementById('duaDots'),
    timerBar: document.getElementById('timerBar'),
    prevDua: document.getElementById('prevDua'),
    nextDua: document.getElementById('nextDua'),
    milestoneBadge: document.getElementById('milestoneBadge'),
    shareWhatsapp: document.getElementById('shareWhatsapp'),
    copyLink: document.getElementById('copyLink'),
    toast: document.getElementById('toast'),
    toastText: document.getElementById('toastText'),
    particles: document.getElementById('particles'),
    themeToggle: document.getElementById('themeToggle')
};

// ===== State =====
let state = {
    count: parseInt(localStorage.getItem('tasbihCount')) || 0,
    currentDuaIndex: 0,
    duaInterval: null,
    timerInterval: null,
    timerProgress: 0,
    isLightMode: localStorage.getItem('theme') === 'light'
};

// ===== Duas List =====
const duas = [
    "اللهم اغفر لعمرو العيسوي وارحمه",
    "اللهم اجعل قبره روضة من رياض الجنة",
    "اللهم نوّر له قبره ووسّع له فيه",
    "اللهم اجعل هذه الصدقة الجارية نورًا له",
    "اللهم ارفع درجته في المهديين",
    "اللهم أبدله دارًا خيرًا من داره",
    "اللهم اجمعنا به في جنات النعيم",
    "اللهم اجعل مثواه الجنة"
];

// ===== Tasbih Texts =====
const tasbihTexts = [
    "سُبْحَانَ اللهِ وَبِحَمْدِهِ",
    "سُبْحَانَ اللهِ العَظِيم",
    "لا إله إلا الله",
    "الله أكبر",
    "الحمد لله"
];

// ===== Vibration =====
function vibrate() {
    if ('vibrate' in navigator) {
        navigator.vibrate(25);
    }
}

// ===== Counter Functions =====
function updateCounter() {
    elements.counter.textContent = state.count;
    localStorage.setItem('tasbihCount', state.count);
    updateProgressRing();
}

function updateProgressRing() {
    const circumference = 2 * Math.PI * 90;
    const progress = (state.count % 100) / 100;
    const offset = circumference * (1 - progress);
    elements.progressCircle.style.strokeDashoffset = offset;
}

function incrementCounter() {
    state.count++;
    updateCounter();
    
    // Bump animation
    elements.counter.classList.add('bump');
    setTimeout(() => elements.counter.classList.remove('bump'), 150);
    
    // Ripple effect
    const ripple = elements.tasbihBtn.querySelector('.btn-ripple');
    ripple.classList.remove('animate');
    void ripple.offsetWidth;
    ripple.classList.add('animate');
    
    // Vibration
    vibrate();
    
    // Check milestones
    checkMilestone();
    
    // Change tasbih text every 33
    if (state.count % 33 === 0) {
        const randomIndex = Math.floor(Math.random() * tasbihTexts.length);
        document.getElementById('tasbihText').textContent = tasbihTexts[randomIndex];
    }
}

function resetCounter() {
    if (confirm('هل تريد تصفير العداد؟')) {
        state.count = 0;
        updateCounter();
        elements.milestoneBadge.classList.remove('show');
        showToast('تم تصفير العداد');
    }
}

function checkMilestone() {
    const milestones = [100, 500, 1000, 5000, 10000];
    if (milestones.includes(state.count)) {
        elements.milestoneBadge.querySelector('.badge-text').textContent = 
            `ما شاء الله! أكملت ${state.count} تسبيحة`;
        elements.milestoneBadge.classList.add('show');
        
        setTimeout(() => {
            elements.milestoneBadge.classList.remove('show');
        }, 4000);
    }
}


// ===== Sound Toggle =====
// Removed - no sound functionality

// ===== Theme Toggle =====
function toggleTheme() {
    state.isLightMode = !state.isLightMode;
    document.body.classList.toggle('light-mode', state.isLightMode);
    localStorage.setItem('theme', state.isLightMode ? 'light' : 'dark');
}

function initTheme() {
    if (state.isLightMode) {
        document.body.classList.add('light-mode');
    }
}

// ===== Dua Functions =====
function createDuaDots() {
    elements.duaDots.innerHTML = '';
    duas.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `dua-dot ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToDua(index));
        elements.duaDots.appendChild(dot);
    });
}

function updateDuaDots() {
    const dots = elements.duaDots.querySelectorAll('.dua-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === state.currentDuaIndex);
    });
}

function changeDua(direction = 1) {
    elements.duaText.classList.add('fade-out');
    
    setTimeout(() => {
        state.currentDuaIndex = (state.currentDuaIndex + direction + duas.length) % duas.length;
        elements.duaText.textContent = duas[state.currentDuaIndex];
        elements.duaText.classList.remove('fade-out');
        updateDuaDots();
        resetTimer();
    }, 400);
}

function goToDua(index) {
    if (index === state.currentDuaIndex) return;
    
    elements.duaText.classList.add('fade-out');
    
    setTimeout(() => {
        state.currentDuaIndex = index;
        elements.duaText.textContent = duas[state.currentDuaIndex];
        elements.duaText.classList.remove('fade-out');
        updateDuaDots();
        resetTimer();
    }, 400);
}

function startDuaTimer() {
    state.timerProgress = 0;
    
    state.timerInterval = setInterval(() => {
        state.timerProgress += 2;
        elements.timerBar.style.width = `${state.timerProgress}%`;
        
        if (state.timerProgress >= 100) {
            changeDua(1);
        }
    }, 100);
}

function resetTimer() {
    state.timerProgress = 0;
    elements.timerBar.style.width = '0%';
}

// ===== Share Functions =====
function shareWhatsapp() {
    const text = `صدقة جارية لروح المرحوم عمرو العيسوي 🤲\n\nشاركنا الدعاء له بالرحمة والمغفرة\n\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
}

async function copyLink() {
    try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('تم نسخ الرابط ✓');
    } catch (err) {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.left = '-9999px';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showToast('تم نسخ الرابط ✓');
    }
}

// ===== Toast =====
function showToast(message) {
    elements.toastText.textContent = message;
    elements.toast.classList.add('show');
    
    setTimeout(() => {
        elements.toast.classList.remove('show');
    }, 2500);
}

// ===== Particles =====
function createParticles() {
    for (let i = 0; i < 15; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 8}s`;
        particle.style.animationDuration = `${6 + Math.random() * 4}s`;
        elements.particles.appendChild(particle);
    }
}

// ===== Parallax Effect =====
function initParallax() {
    let ticking = false;
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrolled = window.pageYOffset;
                const starsLayer = document.querySelector('.stars-layer');
                const pattern = document.querySelector('.islamic-pattern-bg');
                
                if (starsLayer) {
                    starsLayer.style.transform = `translateY(${scrolled * 0.15}px)`;
                }
                if (pattern) {
                    pattern.style.transform = `translateY(${scrolled * 0.1}px)`;
                }
                
                ticking = false;
            });
            ticking = true;
        }
    });
}


// ===== Initialize =====
function init() {
    // Init theme first
    initTheme();
    
    // Hide loading screen
    setTimeout(() => {
        elements.loadingScreen.classList.add('hidden');
    }, 1500);
    
    // Initialize AOS
    AOS.init({
        once: true,
        offset: 50,
        duration: 800,
        easing: 'ease-out-cubic'
    });
    
    // Set initial counter
    updateCounter();
    
    // Create dua dots
    createDuaDots();
    
    // Start dua timer
    startDuaTimer();
    
    // Create particles
    createParticles();
    
    // Init parallax
    initParallax();
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', init);

// Tasbih button
elements.tasbihBtn.addEventListener('click', incrementCounter);

// Reset button
elements.resetBtn.addEventListener('click', resetCounter);

// Dua navigation
elements.prevDua.addEventListener('click', () => changeDua(-1));
elements.nextDua.addEventListener('click', () => changeDua(1));

// Share buttons
elements.shareWhatsapp.addEventListener('click', shareWhatsapp);
elements.copyLink.addEventListener('click', copyLink);

// Theme toggle
elements.themeToggle.addEventListener('click', toggleTheme);

// Keyboard support for tasbih
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        incrementCounter();
    }
});

// Touch feedback for mobile
elements.tasbihBtn.addEventListener('touchstart', () => {
    elements.tasbihBtn.style.transform = 'scale(0.95)';
}, { passive: true });

elements.tasbihBtn.addEventListener('touchend', () => {
    elements.tasbihBtn.style.transform = '';
}, { passive: true });

// ===== Console Message =====
console.log('%c🤲 صدقة جارية لروح المرحوم عمرو العيسوي', 
    'font-size: 20px; color: #4ecdc4; font-weight: bold; text-shadow: 0 0 10px rgba(78,205,196,0.5);');
console.log('%cنسألكم الدعاء له بالرحمة والمغفرة', 
    'font-size: 14px; color: #ffd700;');
console.log('%c❤️ شارك هذه الصدقة الجارية ليدعو الناس للمرحوم', 
    'font-size: 12px; color: #a8c0d8;');
