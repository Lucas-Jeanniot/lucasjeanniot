// Audio control with user interaction requirement
function initAudioControl() {
    const audio = document.getElementById('background-music');
    const volumeSlider = document.getElementById('volume');

    if (!audio || !volumeSlider) return;

    // Set initial volume but don't play yet
    audio.volume = 0.1;

    // Play audio on first user interaction with volume slider
    let hasInteracted = false;
    volumeSlider.addEventListener('input', function(e) {
        audio.volume = e.target.value;
        if (!hasInteracted && e.target.value > 0) {
            audio.play().catch(err => {
                console.log('Audio autoplay prevented:', err);
            });
            hasInteracted = true;
        }
    });

    // Also allow clicking anywhere to start audio
    const startAudio = () => {
        if (!hasInteracted && audio.paused) {
            audio.play().catch(err => {
                console.log('Audio autoplay prevented:', err);
            });
            hasInteracted = true;
        }
    };

    document.addEventListener('click', startAudio, { once: true });
}

// Sparkle cursor trail
class Sparkle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1 - 0.5;
        this.speedX = Math.random() * 1 - 0.5;
        this.life = 30;
        this.colors = ['#ffff00', '#ffffff', '#00ff00'];
        this.color = this.colors[Math.floor(Math.random() * this.colors.length)];
    }
}

let sparkles = [];
let canvas, ctx;
let animationFrameId = null;
let isAnimating = false;

function createSparkleTrail(e) {
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    for (let i = 0; i < 3; i++) {
        sparkles.push(new Sparkle(x, y));
    }

    // Start animation only if not already running
    if (!isAnimating) {
        isAnimating = true;
        drawSparkles();
    }
}

function drawSparkles() {
    if (!ctx || !canvas) return;

    // Clear only if we have sparkles to render
    if (sparkles.length > 0) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Use reverse iteration and batch operations
        for (let i = sparkles.length - 1; i >= 0; i--) {
            const s = sparkles[i];

            // Update properties
            s.x += s.speedX;
            s.y += s.speedY;
            s.life--;
            s.size *= 0.95;

            // Remove dead sparkles
            if (s.life <= 0) {
                sparkles.splice(i, 1);
                continue;
            }

            // Draw sparkle
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = s.color;
            ctx.fill();
        }

        // Continue animation
        animationFrameId = requestAnimationFrame(drawSparkles);
    } else {
        // Stop animation when no sparkles remain
        isAnimating = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function initSparkleEffect() {
    canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', createSparkleTrail);
    resizeCanvas();
    drawSparkles();
}

// Mobile shoutbox modal with lazy iframe loading
function initMobileShoutbox() {
    const modal = document.querySelector('.mobile-shoutbox-modal');
    const btn = document.querySelector('.mobile-hatemail-btn');
    const closeBtn = document.querySelector('.mobile-shoutbox-close');
    const iframe = modal?.querySelector('iframe');

    if (!modal || !btn || !closeBtn) return;

    let iframeLoaded = false;

    btn.addEventListener('click', function() {
        modal.classList.add('active');

        // Lazy load iframe on first open
        if (!iframeLoaded && iframe && iframe.dataset.src) {
            iframe.src = iframe.dataset.src;
            iframeLoaded = true;
        }
    });

    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
}

// Pause marquee on hover and center text
function initMarqueePause() {
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
}

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initAudioControl();
    initSparkleEffect();
    initMobileShoutbox();
    initMarqueePause();
});
