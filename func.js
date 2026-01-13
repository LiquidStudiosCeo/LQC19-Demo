let selectedTheme = null;
const promptInput = document.getElementById('prompt-input');

// --- Theme Selection ---
function selectTheme(theme) {
    selectedTheme = theme;
    document.querySelectorAll('.theme-card').forEach(card => card.classList.remove('selected'));
    const selectedCard = document.querySelector(`.${theme}-theme`);
    if (selectedCard) selectedCard.classList.add('selected');
    applyTheme(theme);
}

function applyTheme(theme) {
    const sidebar = document.getElementById('floating-sidebar');
    if (theme === 'dark') {
        document.documentElement.style.setProperty('--bg-color', '#18191a');
        document.documentElement.style.setProperty('--text-color', '#e4e6eb');
        document.documentElement.style.setProperty('--card-bg', '#242526');
        if (sidebar) sidebar.classList.add('dark-mode-sidebar');
    } else {
        document.documentElement.style.setProperty('--bg-color', '#f0f2f5');
        document.documentElement.style.setProperty('--text-color', '#1c1e21');
        document.documentElement.style.setProperty('--card-bg', '#ffffff');
        if (sidebar) sidebar.classList.remove('dark-mode-sidebar');
    }
}

// --- Navigation & Modal Control ---
document.getElementById('confirm-theme').addEventListener('click', () => {
    if (selectedTheme) {
        const modal = document.querySelector('.theme-modal');
        const overlay = document.getElementById('theme-modal-overlay');
        const sidebar = document.getElementById('floating-sidebar');
        const mainCard = document.getElementById('main-card');
        const dreamText = document.getElementById('dream-text');
        
        modal.classList.add('dismiss');
        overlay.classList.add('fade-out');
        
        setTimeout(() => {
            overlay.classList.add('hidden');
            document.getElementById('main-content').classList.remove('hidden');
            setTimeout(() => {
                if (sidebar) sidebar.classList.add('active');
                if (mainCard) mainCard.classList.add('active');
                if (dreamText) dreamText.classList.add('active');
            }, 100);
        }, 500); 
    } else {
        alert('Please select a theme first!');
    }
});

// --- Input Handling ---
function handleSend() {
    const prompt = promptInput.value;
    
    if (prompt.trim()) {
        console.log("User Prompt Sent:", prompt);
        
        // Add the smooth exit animation class
        promptInput.classList.add('text-sending');
        
        // Wait for animation to finish before clearing
        setTimeout(() => {
            promptInput.value = '';
            promptInput.classList.remove('text-sending');
            
            // Optional: Refocus after clearing
            promptInput.focus();
        }, 300); // Matches the 0.3s CSS animation duration
    }
}

// Ensure the rest of your event listeners call this handleSend
document.addEventListener('click', (e) => {
    if (e.target.closest('#send-btn')) handleSend();
});

document.addEventListener('keydown', (e) => {
    if (document.activeElement === promptInput && e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});