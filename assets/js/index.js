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

// Boot Sequence Handler
(function bootSequence() {
  const bootEl = document.getElementById('boot-sequence');
  if (bootEl) {
    setTimeout(() => {
      bootEl.style.display = 'none';
    }, 3000);
  }
})();

// Enhanced Typer with vanilla JavaScript (no jQuery dependency)
var Typer = {
  text: "",
  accessCountimer: null,
  index: 0,
  speed: 2,
  file: "",
  accessCount: 0,
  deniedCount: 0,
  consoleElement: null,
  
  init: function () {
    this.consoleElement = document.getElementById('console');
    
    // Update cursor animation
    this.accessCountimer = setInterval(function () {
      Typer.updLstChr();
    }, 500);
    
    // Load content using fetch API
    fetch(this.file)
      .then(response => response.text())
      .then(data => {
        Typer.text = data.slice(0, data.length - 1);
      })
      .catch(error => {
        console.error('Failed to load content file:', error);
        Typer.text = '<span id="b">Error: Could not load portfolio content.</span>';
      });
  },

  content: function () {
    return this.consoleElement ? this.consoleElement.innerHTML : "";
  },

  write: function (str) {
    if (this.consoleElement) {
      this.consoleElement.innerHTML += str;
    }
    return false;
  },

  addText: function (key) {
    // Handle special keys
    if (key.keyCode == 18) {
      Typer.accessCount++;
      if (Typer.accessCount >= 3) {
        Typer.makeAccess && Typer.makeAccess();
      }
    } else if (key.keyCode == 20) {
      Typer.deniedCount++;
      if (Typer.deniedCount >= 3) {
        Typer.makeDenied && Typer.makeDenied();
      }
    } else if (key.keyCode == 27) {
      Typer.hidepop && Typer.hidepop();
    } else if (Typer.text) {
      var cont = Typer.content();
      
      // Remove cursor if present
      if (cont.substring(cont.length - 1, cont.length) == "|") {
        if (Typer.consoleElement) {
          Typer.consoleElement.innerHTML = cont.substring(0, cont.length - 1);
        }
      }
      
      // Handle backspace
      if (key.keyCode != 8) {
        Typer.index += Typer.speed;
      } else {
        if (Typer.index > 0) Typer.index -= Typer.speed;
      }
      
      // Update displayed text
      var text = Typer.text.substring(0, Typer.index);
      var rtn = new RegExp("\n", "g");
      
      if (Typer.consoleElement) {
        Typer.consoleElement.innerHTML = text.replace(rtn, "<br/>");
      }
      
      // Smooth scroll
      window.scrollBy({
        top: 50,
        behavior: 'smooth'
      });
    }

    // Prevent default behavior
    if (key.preventDefault && key.keyCode != 122) {
      key.preventDefault();
    }

    if (key.keyCode != 122) {
      key.returnValue = false;
    }
  },

  updLstChr: function () {
    var cont = this.content();

    if (cont.substring(cont.length - 1, cont.length) == "|") {
      if (this.consoleElement) {
        this.consoleElement.innerHTML = cont.substring(0, cont.length - 1);
      }
    } else {
      this.write("|");
    }
  }
};

// URL replacement helper
function replaceUrls(text) {
  var http = text.indexOf("http://");
  var space = text.indexOf(".me ", http);

  if (space != -1) {
    var url = text.slice(http, space - 1);
    return text.replace(url, '<a href="' + url + '" target="_blank" rel="noopener noreferrer">' + url + "</a>");
  } else {
    return text;
  }
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initTyper);
} else {
  initTyper();
}

function initTyper() {
  // Initialize Typer
  Typer.speed = 3;
  Typer.file = "rimijoker.html";
  Typer.init();

  // Auto-typing with better performance
  var timer = setInterval(function() {
    Typer.addText({ keyCode: 123748 });

    if (Typer.index > Typer.text.length) {
      clearInterval(timer);
    }
  }, 30);

  // Keyboard event listener for manual typing (optional)
  document.addEventListener('keydown', function(e) {
    // Allow F11 for fullscreen
    if (e.keyCode === 122) return;
    
    // Alt key for access
    if (e.keyCode === 18) {
      Typer.addText(e);
    }
  });

  // Handle window resize for better responsiveness
  var resizeTimer;
  window.addEventListener('resize', function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function() {
      // Layout adjusted automatically via CSS
    }, 250);
  });

  // Performance optimization - Remove cursor blinking when typing is complete
  setTimeout(function() {
    var checkComplete = setInterval(function() {
      if (Typer.index >= Typer.text.length) {
        clearInterval(checkComplete);
        // Keep the cursor visible but static
      }
    }, 100);
  }, 3000);
}
