// Matrix Rain Effect
(function initMatrixRain() {
  const canvas = document.getElementById('matrix-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Matrix characters
  const chars = 'アィイウェエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const charArray = chars.split('');
  
  const fontSize = 14;
  let columns = Math.floor(canvas.width / fontSize);
  let drops = Array(columns).fill(1);
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Recalculate columns and drops when resized
    columns = Math.floor(canvas.width / fontSize);
    drops = Array(columns).fill(1);
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#0f0';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const char = charArray[Math.floor(Math.random() * charArray.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      ctx.fillText(char, x, y);
      
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 33);
})();

// Dock Functionality
(function initDock() {
  const dockItems = document.querySelectorAll('.dock-item');
  
  dockItems.forEach(item => {
    item.addEventListener('click', function() {
      const app = this.getAttribute('data-app');
      handleDockClick(app);
    });
  });
  
  function handleDockClick(app) {
    const terminal = window.terminalInstance;
    
    switch(app) {
      case 'terminal':
        if (terminal) {
          terminal.executeCommand('clear');
          terminal.executeCommand('banner');
        }
        break;
      case 'github':
        window.open('https://github.com/iamharshit188', '_blank', 'noopener,noreferrer');
        break;
      case 'about':
        if (terminal) {
          terminal.executeCommand('about');
        }
        break;
      case 'email':
        window.open('mailto:iamharshit188@gmail.com', '_blank', 'noopener,noreferrer');
        break;
      case 'twitter':
        window.open('https://twitter.com/iamharshit188', '_blank', 'noopener,noreferrer');
        break;
    }
  }
})();

// Boot Sequence Handler and Terminal Initialization
(function bootSequence() {
  const bootEl = document.getElementById('boot-sequence');
  if (bootEl) {
    setTimeout(() => {
      bootEl.style.display = 'none';
      // Initialize terminal after boot
      initializeTerminal();
    }, 3000);
  }
})();

// Initialize Terminal
function initializeTerminal() {
  // Load the terminal script
  const script = document.createElement('script');
  script.src = 'assets/js/terminal.js';
  script.onload = function() {
    // Create terminal instance
    window.terminalInstance = new window.Terminal();
  };
  document.body.appendChild(script);
}

