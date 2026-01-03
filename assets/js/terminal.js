// Terminal CLI Implementation
class Terminal {
  constructor() {
    this.consoleElement = document.getElementById('console');
    this.currentDirectory = '~';
    this.commandHistory = [];
    this.historyIndex = -1;
    this.startTime = Date.now(); // Store initialization time
    this.fileSystem = {
      '~': {
        'About_Me': {
          'iamharshit188.txt': 'file'
        },
        'Projects': {},
        'Skills': {}
      }
    };
    this.userData = {
      name: 'Harshit Tiwari',
      username: 'iamharshit188',
      location: 'Lucknow, Uttar Pradesh, India',
      education: 'Class 12th (PCM + CS)',
      github: 'https://github.com/iamharshit188',
      twitter: 'https://twitter.com/iamharshit188',
      email: 'iamharshit188@gmail.com'
    };
    this.init();
  }

  init() {
    this.showWelcome();
    this.createInputLine();
    this.setupEventListeners();
  }

  showWelcome() {
    const welcome = `
<span style="color: #00ff00; font-weight: bold;">
╔═══════════════════════════════════════════════════════════════╗
║                                                               ║
║   ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗   ║
║   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗  ║
║      ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║  ║
║      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║  ║
║      ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║  ║
║      ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝  ║
║                                                               ║
║              Welcome to Harshit Tiwari's Portfolio            ║
║                      ArchLinux Terminal                       ║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
</span>

<span style="color: #00a3cc;">Type '<span style="color: #ffff00;">help</span>' to see available commands.</span>
<span style="color: #00a3cc;">Type '<span style="color: #ffff00;">neofetch</span>' to see system information.</span>
<span style="color: #00a3cc;">Type '<span style="color: #ffff00;">about</span>' to learn more about me.</span>
`;
    this.writeLine(welcome);
  }

  createInputLine() {
    const inputLine = document.createElement('div');
    inputLine.className = 'input-line';
    inputLine.innerHTML = `
      <span class="input-prompt">[${this.userData.username}@ArchLinux]:<span style="color: #ff0844;">${this.currentDirectory}</span>$ </span>
      <input type="text" id="command-input" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false">
    `;
    this.consoleElement.appendChild(inputLine);
    
    this.inputElement = document.getElementById('command-input');
    this.inputElement.focus();
  }

  setupEventListeners() {
    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.handleCommand();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        this.navigateHistory('up');
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        this.navigateHistory('down');
      } else if (e.key === 'Tab') {
        e.preventDefault();
        this.handleTabCompletion();
      }
    });

    // Keep focus on input
    document.addEventListener('click', () => {
      if (this.inputElement) {
        this.inputElement.focus();
      }
    });
  }

  handleCommand() {
    const command = this.inputElement.value.trim();
    if (command) {
      this.commandHistory.push(command);
      this.historyIndex = this.commandHistory.length;
    }

    // Echo the command
    const commandLine = `<span class="input-prompt">[${this.userData.username}@ArchLinux]:<span style="color: #ff0844;">${this.currentDirectory}</span>$ </span>${command}`;
    this.writeLine(commandLine);

    // Remove the input line
    this.inputElement.parentElement.remove();

    // Execute the command
    if (command) {
      this.executeCommand(command);
    }

    // Create new input line
    this.createInputLine();
    this.scrollToBottom();
  }

  executeCommand(commandString) {
    const parts = commandString.trim().split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const commands = {
      help: () => this.showHelp(),
      clear: () => this.clear(),
      ls: () => this.ls(args),
      pwd: () => this.pwd(),
      cd: () => this.cd(args),
      cat: () => this.cat(args),
      echo: () => this.echo(args),
      whoami: () => this.whoami(),
      date: () => this.date(),
      neofetch: () => this.neofetch(),
      about: () => this.about(),
      projects: () => this.projects(),
      skills: () => this.skills(),
      contact: () => this.contact(),
      github: () => this.openLink(this.userData.github),
      twitter: () => this.openLink(this.userData.twitter),
      email: () => this.openLink(`mailto:${this.userData.email}`),
      history: () => this.showHistory(),
      banner: () => this.showWelcome(),
      uname: () => this.uname()
    };

    if (commands[command]) {
      commands[command]();
    } else {
      this.writeLine(`<span class="error">bash: ${command}: command not found</span>`);
      this.writeLine(`<span class="info">Type 'help' to see available commands.</span>`);
    }
  }

  showHelp() {
    const help = `
<span style="color: #00ff00; font-weight: bold;">Available Commands:</span>

<span style="color: #ffff00;">System Commands:</span>
  <span style="color: #00a3cc;">help</span>       - Show this help message
  <span style="color: #00a3cc;">clear</span>      - Clear the terminal screen
  <span style="color: #00a3cc;">history</span>    - Show command history
  <span style="color: #00a3cc;">neofetch</span>   - Display system information
  <span style="color: #00a3cc;">whoami</span>     - Display current user
  <span style="color: #00a3cc;">date</span>       - Display current date and time
  <span style="color: #00a3cc;">uname</span>      - Display system information
  <span style="color: #00a3cc;">banner</span>     - Show welcome banner

<span style="color: #ffff00;">File System Commands:</span>
  <span style="color: #00a3cc;">ls</span>         - List directory contents
  <span style="color: #00a3cc;">pwd</span>        - Print working directory
  <span style="color: #00a3cc;">cd [dir]</span>   - Change directory
  <span style="color: #00a3cc;">cat [file]</span> - Display file contents
  <span style="color: #00a3cc;">echo [text]</span> - Display text

<span style="color: #ffff00;">Portfolio Commands:</span>
  <span style="color: #00a3cc;">about</span>      - Learn more about me
  <span style="color: #00a3cc;">projects</span>   - View my projects
  <span style="color: #00a3cc;">skills</span>     - View my skills
  <span style="color: #00a3cc;">contact</span>    - Get contact information
  <span style="color: #00a3cc;">github</span>     - Open GitHub profile
  <span style="color: #00a3cc;">twitter</span>    - Open Twitter profile
  <span style="color: #00a3cc;">email</span>      - Send me an email
`;
    this.writeLine(help);
  }

  clear() {
    this.consoleElement.innerHTML = '';
  }

  ls(args) {
    const showAll = args.includes('-a') || args.includes('-la') || args.includes('-al');
    const longFormat = args.includes('-l') || args.includes('-la') || args.includes('-al');
    
    let output = '';
    const items = ['About_Me', 'Projects', 'Skills'];
    
    if (longFormat) {
      output += '<span style="color: #00a3cc;">total 3</span>\n';
      items.forEach(item => {
        output += `<span style="color: #00ff00;">drwxr-xr-x</span> 2 ${this.userData.username} ${this.userData.username} 4096 Jan  3 12:00 <span style="color: #00a3cc; font-weight: bold;">${item}</span>\n`;
      });
    } else {
      output = items.map(item => `<span style="color: #00a3cc; font-weight: bold;">${item}</span>`).join('  ');
    }
    
    this.writeLine(output);
  }

  pwd() {
    this.writeLine(`<span style="color: #00ff00;">/home/${this.userData.username}/${this.currentDirectory === '~' ? '' : this.currentDirectory}</span>`);
  }

  cd(args) {
    if (!args.length || args[0] === '~') {
      this.currentDirectory = '~';
    } else {
      const validDirs = ['About_Me', 'Projects', 'Skills', '..'];
      if (args[0] === '..') {
        this.currentDirectory = '~';
      } else if (validDirs.includes(args[0])) {
        this.currentDirectory = args[0];
      } else {
        this.writeLine(`<span class="error">bash: cd: ${args[0]}: No such file or directory</span>`);
      }
    }
  }

  cat(args) {
    if (!args.length) {
      this.writeLine(`<span class="error">cat: missing file operand</span>`);
      return;
    }

    if (args[0] === 'iamharshit188.txt' || args[0] === 'About_Me/iamharshit188.txt') {
      this.about();
    } else {
      this.writeLine(`<span class="error">cat: ${args[0]}: No such file or directory</span>`);
    }
  }

  echo(args) {
    this.writeLine(args.join(' '));
  }

  whoami() {
    this.writeLine(`<span style="color: #00ff00;">${this.userData.username}</span>`);
  }

  date() {
    const now = new Date();
    this.writeLine(`<span style="color: #00ff00;">${now.toString()}</span>`);
  }

  uname() {
    this.writeLine(`<span style="color: #00ff00;">Linux ArchLinux 5.15.0 x86_64 GNU/Linux</span>`);
  }

  neofetch() {
    const logo = `
<div class="neofetch-container">
  <div class="neofetch-logo">
       /\\               
      /  \\              
     /\\   \\             
    /      \\            
   /   ,,   \\           
  /   |  |  -\\          
 /_-''    ''-_\\         
</div>
  <div class="neofetch-info">
    <div><span class="neofetch-label">${this.userData.username}@ArchLinux</span></div>
    <div><span style="color: #00ff00;">------------------------</span></div>
    <div><span class="neofetch-label">OS:</span> <span class="neofetch-value">Arch Linux x86_64</span></div>
    <div><span class="neofetch-label">Host:</span> <span class="neofetch-value">Terminal Portfolio</span></div>
    <div><span class="neofetch-label">Kernel:</span> <span class="neofetch-value">5.15.0-terminal</span></div>
    <div><span class="neofetch-label">Uptime:</span> <span class="neofetch-value">${this.getUptime()}</span></div>
    <div><span class="neofetch-label">Shell:</span> <span class="neofetch-value">bash 5.1.16</span></div>
    <div><span class="neofetch-label">Resolution:</span> <span class="neofetch-value">${window.screen.width}x${window.screen.height}</span></div>
    <div><span class="neofetch-label">Terminal:</span> <span class="neofetch-value">TerminalJS</span></div>
    <div><span class="neofetch-label">CPU:</span> <span class="neofetch-value">${navigator.hardwareConcurrency || 4} cores</span></div>
    <div><span class="neofetch-label">Browser:</span> <span class="neofetch-value">${this.getBrowserInfo()}</span></div>
    <div><span class="neofetch-label">Location:</span> <span class="neofetch-value">${this.userData.location}</span></div>
    <div style="margin-top: 10px;">
      <span style="background: #000; color: #000;">███</span><span style="background: #f00; color: #f00;">███</span><span style="background: #0f0; color: #0f0;">███</span><span style="background: #ff0; color: #ff0;">███</span><span style="background: #00f; color: #00f;">███</span><span style="background: #f0f; color: #f0f;">███</span><span style="background: #0ff; color: #0ff;">███</span><span style="background: #fff; color: #fff;">███</span>
    </div>
  </div>
</div>
`;
    this.writeLine(logo);
  }

  about() {
    const about = `
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color: #ffff00; font-weight: bold;">█ ABOUT ME █</span>
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color: #00a3cc;">Hi! I'm ${this.userData.name}</span>

I am from ${this.userData.location}. I recently passed Class 12th with 
Physics, Chemistry, Mathematics as my core subjects, and Computer Science 
being my optional subject. I am currently looking for a college for 
pursuing "Bachelor's in Computer Science".

I am learning to code and use ArchLinux on my laptop for my workflow 
with DWM window manager.

<span style="color: #00ff00;">├─</span> You may checkout my projects using the 'projects' command
<span style="color: #00ff00;">├─</span> For accessing source code: <a href="${this.userData.github}" target="_blank" rel="noopener noreferrer">GitHub Profile</a>
<span style="color: #00ff00;">└─</span> Check out my GitHub profile for more information :)

<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
`;
    this.writeLine(about);
  }

  projects() {
    const projects = `
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color: #ffff00; font-weight: bold;">█ PROJECTS █</span>
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color: #00a3cc; font-weight: bold;">1. Terminal Portfolio</span>
   A unique portfolio website styled as a Linux terminal
   <span style="color: #00ff00;">Tech:</span> HTML, CSS, JavaScript
   
<span style="color: #00a3cc; font-weight: bold;">2. DWM Configuration</span>
   Custom Dynamic Window Manager setup for ArchLinux
   <span style="color: #00ff00;">Tech:</span> C, Shell scripting

Visit my <a href="${this.userData.github}" target="_blank" rel="noopener noreferrer">GitHub</a> to see more projects!

<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
`;
    this.writeLine(projects);
  }

  skills() {
    const skills = `
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color: #ffff00; font-weight: bold;">█ SKILLS █</span>
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color: #00a3cc; font-weight: bold;">Programming Languages:</span>
  <span style="color: #00ff00;">├─</span> Python
  <span style="color: #00ff00;">├─</span> JavaScript
  <span style="color: #00ff00;">├─</span> C/C++
  <span style="color: #00ff00;">└─</span> Shell Scripting

<span style="color: #00a3cc; font-weight: bold;">Web Technologies:</span>
  <span style="color: #00ff00;">├─</span> HTML5 & CSS3
  <span style="color: #00ff00;">├─</span> JavaScript (ES6+)
  <span style="color: #00ff00;">└─</span> Responsive Design

<span style="color: #00a3cc; font-weight: bold;">Tools & Systems:</span>
  <span style="color: #00ff00;">├─</span> ArchLinux
  <span style="color: #00ff00;">├─</span> Git & GitHub
  <span style="color: #00ff00;">├─</span> DWM Window Manager
  <span style="color: #00ff00;">└─</span> Terminal/CLI

<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
`;
    this.writeLine(skills);
  }

  contact() {
    const contact = `
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
<span style="color: #ffff00; font-weight: bold;">█ CONTACT INFORMATION █</span>
<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>

<span style="color: #00a3cc;">Feel free to reach out to me through any of these channels:</span>

  <span style="color: #00ff00;">├─</span> Email: <a href="mailto:${this.userData.email}">${this.userData.email}</a>
  <span style="color: #00ff00;">├─</span> GitHub: <a href="${this.userData.github}" target="_blank" rel="noopener noreferrer">${this.userData.github}</a>
  <span style="color: #00ff00;">└─</span> Twitter: <a href="${this.userData.twitter}" target="_blank" rel="noopener noreferrer">${this.userData.twitter}</a>

<span style="color: #888;">Type 'email', 'github', or 'twitter' to open the respective link directly.</span>

<span style="color: #00ff00; font-weight: bold;">━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━</span>
`;
    this.writeLine(contact);
  }

  showHistory() {
    if (this.commandHistory.length === 0) {
      this.writeLine('<span class="info">No command history</span>');
      return;
    }
    this.commandHistory.forEach((cmd, index) => {
      this.writeLine(`<span style="color: #00a3cc;">${index + 1}</span>  ${cmd}`);
    });
  }

  openLink(url) {
    window.open(url, '_blank', 'noopener,noreferrer');
    this.writeLine(`<span class="success">Opening ${url}...</span>`);
  }

  navigateHistory(direction) {
    if (this.commandHistory.length === 0) return;

    if (direction === 'up') {
      if (this.historyIndex > 0) {
        this.historyIndex--;
        this.inputElement.value = this.commandHistory[this.historyIndex];
      }
    } else if (direction === 'down') {
      if (this.historyIndex < this.commandHistory.length - 1) {
        this.historyIndex++;
        this.inputElement.value = this.commandHistory[this.historyIndex];
      } else {
        this.historyIndex = this.commandHistory.length;
        this.inputElement.value = '';
      }
    }
  }

  handleTabCompletion() {
    const input = this.inputElement.value;
    const commands = ['help', 'clear', 'ls', 'pwd', 'cd', 'cat', 'echo', 'whoami', 'date', 
                     'neofetch', 'about', 'projects', 'skills', 'contact', 'github', 
                     'twitter', 'email', 'history', 'banner', 'uname'];
    
    const matches = commands.filter(cmd => cmd.startsWith(input));
    if (matches.length === 1) {
      this.inputElement.value = matches[0];
    } else if (matches.length > 1) {
      this.writeLine(`<span class="info">${matches.join('  ')}</span>`);
    }
  }

  writeLine(content) {
    const line = document.createElement('div');
    line.className = 'output-line';
    line.innerHTML = content;
    this.consoleElement.appendChild(line);
  }

  scrollToBottom() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }

  getUptime() {
    const now = Date.now();
    const diff = Math.floor((now - this.startTime) / 1000);
    const minutes = Math.floor(diff / 60);
    const seconds = diff % 60;
    return `${minutes}m ${seconds}s`;
  }

  getBrowserInfo() {
    const ua = navigator.userAgent;
    if (ua.includes('Firefox')) return 'Firefox';
    if (ua.includes('Chrome')) return 'Chrome';
    if (ua.includes('Safari')) return 'Safari';
    if (ua.includes('Edge')) return 'Edge';
    return 'Unknown';
  }
}

// Export for use in main script
window.Terminal = Terminal;
