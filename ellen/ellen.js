// Access protection - only allow entry via Konami Code
(function() {
    // Check if the user has the unlock token
    const isUnlocked = sessionStorage.getItem('konami_unlocked');

    if (!isUnlocked || isUnlocked !== 'true') {
        // No token found - show access denied message
        document.body.innerHTML = `
            <style>
                body {
                    margin: 0;
                    padding: 0;
                    background: #000000;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100vh;
                    font-family: "Courier New", monospace;
                    overflow: hidden;
                }
                .access-denied-container {
                    text-align: center;
                    border: 3px solid #ff0000;
                    background: #1a0000;
                    padding: 40px;
                    box-shadow: 0 0 30px rgba(255, 0, 0, 0.6), inset 0 0 20px rgba(255, 0, 0, 0.2);
                    animation: shake 0.5s ease-in-out;
                    max-width: 600px;
                }
                .access-denied-title {
                    color: #ff0000;
                    font-size: 3em;
                    margin: 0 0 20px 0;
                    text-shadow: 0 0 10px #ff0000, 0 0 20px #ff0000;
                    animation: blink-red 1s infinite;
                }
                .access-denied-message {
                    color: #ff6666;
                    font-size: 1.3em;
                    margin-bottom: 20px;
                    line-height: 1.6;
                }
                .access-denied-hint {
                    color: #ffaaaa;
                    font-size: 0.9em;
                    font-style: italic;
                    margin-top: 30px;
                    opacity: 0.7;
                }
                .skull {
                    font-size: 4em;
                    margin: 20px 0;
                }
                @keyframes blink-red {
                    0%, 49%, 100% { opacity: 1; }
                    50%, 99% { opacity: 0.3; }
                }
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
            </style>
            <div class="access-denied-container">
                <div class="skull">☠️</div>
                <h1 class="access-denied-title">ACCESS DENIED</h1>
                <p class="access-denied-message">You're not getting in that easy!</p>
                <p class="access-denied-message">This page is protected by ancient internet magic.</p>
                <p class="access-denied-hint">Redirecting you back to safety...</p>
            </div>
        `;

        // Redirect after showing the message
        setTimeout(function() {
            window.location.href = '/';
        }, 3000);

        // Stop further script execution
        throw new Error('Access denied');
    }
})();

// Initialize after DOM loads
document.addEventListener('DOMContentLoaded', function() {
    // Add pause on hover for marquees
    const marquees = document.querySelectorAll('marquee');
    marquees.forEach(marquee => {
        marquee.addEventListener('mouseenter', function() {
            this.stop();
            this.style.textAlign = 'center';
            this.style.display = 'block';
        });
        marquee.addEventListener('mouseleave', function() {
            this.start();
            this.style.textAlign = '';
            this.style.display = '';
        });
    });
});
