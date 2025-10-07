// Plain text CV toggle
function initPlainTextToggle() {
    const toggleBtn = document.querySelector('.plaintext-btn');

    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', function() {
        document.body.classList.toggle('plaintext-mode');

        // Update button text
        if (document.body.classList.contains('plaintext-mode')) {
            toggleBtn.textContent = 'View Styled CV';
        } else {
            toggleBtn.textContent = 'View Plain Text';
        }
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initPlainTextToggle();
});
