// GoatCounter visitor tracking initialization
function initGoatCounter() {
    const statsContainer = document.getElementById('stats');

    if (!statsContainer) return;

    const checkInterval = setInterval(function() {
        if (window.goatcounter && window.goatcounter.visit_count) {
            clearInterval(checkInterval);
            window.goatcounter.visit_count({
                append: '#stats',
                style: `
                    div {
                        border: 1px solid #ffff00;
                        background: #000066;
                        width: 100%;
                        padding: 5px;
                        color: #00ff00;
                        font-family: "Times New Roman", serif;
                    }
                    #gcvc-by {display: none;}
                `
            });
        }
    }, 100);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initGoatCounter();
});
