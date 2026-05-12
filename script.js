let timer;
let timeLeft;
let isRunning = false;
let mode = 'focus'; // 'focus' or 'rest'

const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('start-btn');
const cancelBtn = document.getElementById('cancel-btn');
const timerStatus = document.getElementById('timer-status');
const timerCard = document.getElementById('timer-card');
const focusInput = document.getElementById('focus-time');
const restInput = document.getElementById('rest-time');
const focusVal = document.getElementById('focus-val');
const restVal = document.getElementById('rest-val');

// Initialize
timeLeft = focusInput.value * 60;
updateDisplay();

// Sliders
focusInput.addEventListener('input', () => {
    focusVal.textContent = focusInput.value;
    if (!isRunning && mode === 'focus') {
        timeLeft = focusInput.value * 60;
        updateDisplay();
    }
});

restInput.addEventListener('input', () => {
    restVal.textContent = restInput.value;
    if (!isRunning && mode === 'rest') {
        timeLeft = restInput.value * 60;
        updateDisplay();
    }
});

// Controls
startBtn.addEventListener('click', () => {
    if (isRunning) {
        pauseTimer();
    } else {
        startTimer();
    }
});

cancelBtn.addEventListener('click', resetTimer);

function startTimer() {
    isRunning = true;
    startBtn.textContent = 'Pause Session';
    cancelBtn.classList.remove('hidden');
    
    timerCard.classList.add(mode === 'focus' ? 'focus-mode' : 'rest-mode');
    
    timer = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            switchMode();
        }
    }, 1000);
}

function pauseTimer() {
    isRunning = false;
    clearInterval(timer);
    startBtn.textContent = 'Resume Session';
}

function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    mode = 'focus';
    timeLeft = focusInput.value * 60;
    
    startBtn.textContent = 'Start Session';
    cancelBtn.classList.add('hidden');
    timerStatus.textContent = 'Ready to Focus?';
    timerCard.classList.remove('focus-mode', 'rest-mode');
    
    updateDisplay();
}

function switchMode() {
    if (mode === 'focus') {
        mode = 'rest';
        timeLeft = restInput.value * 60;
        timerStatus.textContent = 'Time for a break! ☕';
        timerCard.classList.remove('focus-mode');
        timerCard.classList.add('rest-mode');
    } else {
        mode = 'focus';
        timeLeft = focusInput.value * 60;
        timerStatus.textContent = 'Back to work! 🚀';
        timerCard.classList.remove('rest-mode');
        timerCard.classList.add('focus-mode');
    }
    
    // Auto-start next session
    updateDisplay();
    startTimer();
}

function updateDisplay() {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;
    
    minutesDisplay.textContent = mins.toString().padStart(2, '0');
    secondsDisplay.textContent = secs.toString().padStart(2, '0');
    
    // Update Browser Tab Title
    document.title = `${minutesDisplay.textContent}:${secondsDisplay.textContent} - PomoFocus`;
}
