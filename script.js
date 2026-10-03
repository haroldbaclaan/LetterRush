document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. CANVAS EXPLOSION ENGINE
     ========================================================================== */
  let canvas = document.getElementById("effectsCanvas");
  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "effectsCanvas";
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext("2d");
  let particles = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  class Particle {
    constructor(x, y, color) {
      this.x = x;
      this.y = y;
      this.color = color;
      this.radius = Math.random() * 4 + 2;
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 8 + 3;
      this.vx = Math.cos(angle) * velocity;
      this.vy = Math.sin(angle) * velocity;
      this.alpha = 1;
      this.decay = Math.random() * 0.02 + 0.015;
      this.gravity = 0.15;
    }

    update() {
      this.vx *= 0.98;
      this.vy *= 0.98;
      this.vy += this.gravity;
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(this.alpha, 0);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = this.color;
      ctx.fill();
      ctx.restore();
    }
  }

  function triggerExplosiveEffect(targetEl, count = 45) {
    const rect = targetEl ? targetEl.getBoundingClientRect() : { 
      left: window.innerWidth / 2, 
      top: window.innerHeight / 2, 
      width: 0, 
      height: 0 
    };
    const originX = rect.left + rect.width / 2;
    const originY = rect.top + rect.height / 2;
    
    const colors = ["#69d391", "#38a169", "#ffffff", "#48bb78", "#ecc94b", "#00e5ff"];
    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push(new Particle(originX, originY, color));
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw();
      if (particles[i].alpha <= 0) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  /* ==========================================================================
     2. WORD LIBRARIES & PRESETS
     ========================================================================== */
  const WORDS = {
    easy: [
      "cat", "dog", "sun", "run", "hat", "red", "big", "map", "box", "sky",
      "tree", "book", "fast", "blue", "lamp", "desk", "park", "game", "city", "star"
    ],
    medium: [
      "keyboard", "practice", "accuracy", "challenge", "sentence", "progress",
      "mountain", "frontend", "developer", "sequence", "language", "hardware", "terminal"
    ],
    difficult: [
      "synchronize", "infrastructure", "architecture", "microcontroller",
      "cryptography", "optimization", "implementation", "unpredictable", "asynchronous"
    ]
  };

  const PRESETS = {
    default: { primary: "#ffffff", bg: "#050505", button: "#ffffff", accent: "#69d391", text: "#f7f7f7" },
    ocean:   { primary: "#e0f7fa", bg: "#001e2b", button: "#4dd0e1", accent: "#00e5ff", text: "#e0f7fa" },
    forest:  { primary: "#e8f5e9", bg: "#0d2310", button: "#81c784", accent: "#66bb6a", text: "#e8f5e9" },
    sunset:  { primary: "#fff3e0", bg: "#260e04", button: "#ffb74d", accent: "#ff9800", text: "#fff3e0" },
    purple:  { primary: "#f3e5f5", bg: "#1a0022", button: "#ba68c8", accent: "#e040fb", text: "#f3e5f5" }
  };

  /* ==========================================================================
     3. GAME STATE
     ========================================================================== */
  let state = {
    mode: "timed",
    playerName: localStorage.getItem("lr_playerName") || "Your Name",
    difficulty: "medium",
    durationSeconds: 60,
    timeRemaining: 60,
    isActive: false,
    isPaused: false,
    timerId: null,
    
    currentPhrase: "",
    typedChars: 0,
    correctChars: 0,
    incorrectChars: 0,
    score: 0,

    // Strike / Streak mechanics & 10-second combo timer
    streak: 0,
    maxStreak: 0,
    comboTimerId: null,
    comboIntervalId: null,
    comboTimeRemaining: 10
  };

  /* ==========================================================================
     4. DOM ELEMENTS
     ========================================================================== */
  const pages = document.querySelectorAll(".page");
  const navButtons = document.querySelectorAll("[data-page]");
  
  const gameSetup = document.getElementById("gameSetup");
  const practiceSetup = document.getElementById("practiceSetup");
  const gameStage = document.getElementById("gameStage");
  const gameCard = document.querySelector("#game .game-card");
  const countdownOverlay = document.getElementById("countdownOverlay");
  const countdownNumber = document.getElementById("countdownNumber");
  const pausePanel = document.getElementById("pausePanel");
  
  const difficultySelect = document.getElementById("difficulty");
  const timerAmountInput = document.getElementById("timerAmount");
  const timerUnitSelect = document.getElementById("timerUnit");
  const gameStartBtn = document.getElementById("gameStart");
  const startGameHeroBtn = document.getElementById("startGame");
  const practiceStartBtn = document.getElementById("practiceStart");
  const pauseGameBtn = document.getElementById("pauseGame");
  const continueGameBtn = document.getElementById("continueGame");
  const stopGameBtn = document.getElementById("stopGame");
  const stopGameBtnModal = document.getElementById("stopGameButton");
  
  const wordDisplay = document.getElementById("wordDisplay");
  const typingInput = document.getElementById("typingInput");
  const progressBar = document.getElementById("progress");
  
  const timeEl = document.getElementById("time");
  const wpmEl = document.getElementById("wpm");
  const accuracyEl = document.getElementById("accuracy");
  const scoreEl = document.getElementById("score");
  const currentDifficultyEl = document.getElementById("currentDifficulty");
  const correctCountEl = document.getElementById("correctCount");
  const incorrectCountEl = document.getElementById("incorrectCount");
  
  const playerNameEl = document.getElementById("playerName");
  const editProfileBtn = document.getElementById("editProfile");
  const profileDisplay = document.getElementById("profileDisplay");
  const profileForm = document.getElementById("profileForm");
  const nameInput = document.getElementById("nameInput");
  const saveNameBtn = document.getElementById("saveName");
  const homeGreeting = document.getElementById("homeGreeting");

  const resultWpm = document.getElementById("resultWpm");
  const resultAccuracy = document.getElementById("resultAccuracy");
  const resultScore = document.getElementById("resultScore");
  const resultDifficulty = document.getElementById("resultDifficulty");

  const soundToggle = document.getElementById("soundToggle");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const appearanceToggle = document.getElementById("appearanceToggle");
  const appearanceSection = document.getElementById("appearanceSection");
  const appearancePreset = document.getElementById("appearancePreset");
  const resetAppearance = document.getElementById("resetAppearance");

  const primaryColorInput = document.getElementById("primaryColor");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const buttonColorInput = document.getElementById("buttonColor");
  const accentColorInput = document.getElementById("accentColor");
  const textColorInput = document.getElementById("textColor");

  /* ==========================================================================
     5. ROUTING & PAGE NAVIGATION
     ========================================================================== */
  function navigateTo(pageId) {
    if (state.isActive && !confirm("Leaving this page will forfeit your current round. Continue?")) {
      return;
    }
    resetGameState();

    pages.forEach(page => {
      if (page.id === pageId) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });

    navButtons.forEach(btn => {
      if (btn.dataset.page === pageId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    if (pageId === "game") {
      setupGameUI("timed");
    } else if (pageId === "practice") {
      setupGameUI("practice");
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.getAttribute("data-page");
      if (page) navigateTo(page);
    });
  });

  /* ==========================================================================
     6. GAME SETUP & ENGINE
     ========================================================================== */
  function setupGameUI(mode) {
    state.mode = mode;
    
    if (mode === "practice") {
      const practicePage = document.getElementById("practice");
      if (practicePage && gameStage && gameStage.parentElement !== practicePage) {
        practicePage.appendChild(gameStage);
      }
      if (practicePage && pausePanel && pausePanel.parentElement !== practicePage) {
        practicePage.appendChild(pausePanel);
      }
      if (practiceSetup) practiceSetup.classList.remove("hidden");
      if (gameSetup) gameSetup.classList.add("hidden");
    } else {
      if (gameCard && gameStage && gameStage.parentElement !== gameCard) {
        gameCard.appendChild(gameStage);
      }
      if (gameCard && pausePanel && pausePanel.parentElement !== gameCard) {
        gameCard.appendChild(pausePanel);
      }
      if (gameSetup) gameSetup.classList.remove("hidden");
      if (practiceSetup) practiceSetup.classList.add("hidden");
    }

    if (gameStage) gameStage.classList.add("hidden");
    if (countdownOverlay) countdownOverlay.classList.add("hidden");
    if (pausePanel) pausePanel.classList.add("hidden");

    const timedOnlyElements = document.querySelectorAll(".timed-only");
    const practiceOnlyElements = document.querySelectorAll(".practice-only");

    if (mode === "practice") {
      timedOnlyElements.forEach(el => el.classList.add("hidden"));
      practiceOnlyElements.forEach(el => el.classList.remove("hidden"));
    } else {
      timedOnlyElements.forEach(el => el.classList.remove("hidden"));
      practiceOnlyElements.forEach(el => el.classList.add("hidden"));
    }
  }

  function startCountdown() {
    if (difficultySelect) state.difficulty = difficultySelect.value;
    
    let duration = Number.parseInt(timerAmountInput ? timerAmountInput.value : "60", 10);
    if (!Number.isFinite(duration) || duration < 1) duration = 60;
    if (timerUnitSelect && timerUnitSelect.value === "minutes") duration *= 60;
    state.durationSeconds = duration;
    state.timeRemaining = duration;

    if (gameSetup) gameSetup.classList.add("hidden");
    if (countdownOverlay) countdownOverlay.classList.remove("hidden");

    let count = 3;
    if (countdownNumber) countdownNumber.textContent = count;
    
    playSound("beep");
    const countInterval = setInterval(() => {
      count--;
      if (count > 0) {
        if (countdownNumber) countdownNumber.textContent = count;
        playSound("beep");
      } else {
        clearInterval(countInterval);
        if (countdownOverlay) countdownOverlay.classList.add("hidden");
        initiateRound();
      }
    }, 1000);
  }

  function initiateRound() {
    state.isActive = true;
    state.isPaused = false;
    state.score = 0;
    state.typedChars = 0;
    state.correctChars = 0;
    state.incorrectChars = 0;
    state.streak = 0;
    state.maxStreak = 0;

    if (gameSetup) gameSetup.classList.add("hidden");
    if (practiceSetup) practiceSetup.classList.add("hidden");
    if (countdownOverlay) countdownOverlay.classList.add("hidden");
    if (pausePanel) pausePanel.classList.add("hidden");
    
    if (gameStage) gameStage.classList.remove("hidden");
    document.body.classList.add("game-session");
    document.body.classList.toggle("practice-session", state.mode === "practice");

    if (typingInput) {
      typingInput.disabled = false;
      typingInput.value = "";
      typingInput.focus();
    }

    if (pauseGameBtn) pauseGameBtn.disabled = false;
    if (stopGameBtn) stopGameBtn.disabled = false;

    updateStatsDisplay();
    nextPhrase();

    if (state.mode === "timed") {
      if (timeEl) timeEl.textContent = formatTime(state.timeRemaining);
      startTimer();
    }
  }

  function formatTime(totalSeconds) {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    clearInterval(state.timerId);
    state.timerId = setInterval(() => {
      if (!state.isPaused) {
        state.timeRemaining = Math.max(0, state.timeRemaining - 1);
        if (timeEl) timeEl.textContent = formatTime(state.timeRemaining);
        
        if (progressBar) {
          const pct = (state.timeRemaining / state.durationSeconds) * 100;
          progressBar.style.width = `${pct}%`;
        }

        updateStatsDisplay();

        if (state.timeRemaining <= 0) {
          endRound();
        }
      }
    }, 1000);
  }

  function nextPhrase() {
    let diff = state.difficulty;
    if (state.mode === "practice") {
      const keys = ["easy", "medium", "difficult"];
      diff = keys[Math.floor(Math.random() * keys.length)];
      if (currentDifficultyEl) {
        currentDifficultyEl.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
      }
    }

    const pool = WORDS[diff] || WORDS["medium"];
    let selection = [];
    for (let i = 0; i < 4; i++) {
      selection.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    state.currentPhrase = selection.join(" ");
    
    renderWordDisplay();
    if (typingInput) typingInput.value = "";
  }

  function renderWordDisplay() {
    if (!wordDisplay || !typingInput) return;
    const val = typingInput.value;
    let html = "";

    for (let i = 0; i < state.currentPhrase.length; i++) {
      const targetChar = state.currentPhrase[i];
      const typedChar = val[i];

      if (typedChar == null) {
        if (i === val.length) {
          html += `<span class="char-current">${targetChar}</span>`;
        } else {
          html += `<span>${targetChar}</span>`;
        }
      } else if (typedChar === targetChar) {
        html += `<span class="char-correct">${targetChar}</span>`;
      } else {
        html += `<span class="char-incorrect">${targetChar}</span>`;
      }
    }
    wordDisplay.innerHTML = html;
  }

  /* ==========================================================================
     7. STRIKE, DYNAMIC COMBO TIMER BAR & POPUP EFFECTS
     ========================================================================== */
  function startComboTimer() {
    clearTimeout(state.comboTimerId);
    clearInterval(state.comboIntervalId);

    // Ensure persistent HUD element for Combo & Timer Bar exists
    let comboHud = document.getElementById("comboHudContainer");
    if (!comboHud) {
      comboHud = document.createElement("div");
      comboHud.id = "comboHudContainer";
      comboHud.style.width = "260px";
      comboHud.style.margin = "10px auto";
      comboHud.style.textAlign = "center";
      comboHud.innerHTML = `
        <div id="comboHudText" style="font-weight: 800; font-size: 1.2rem; color: #ff9800; text-shadow: 0 0 8px rgba(255, 152, 0, 0.6);"></div>
        <div style="width: 100%; height: 8px; background: rgba(255, 255, 255, 0.2); border-radius: 4px; overflow: hidden; margin-top: 5px;">
          <div id="comboProgressBar" style="width: 100%; height: 100%; background: linear-gradient(90deg, #ff9800, #ffeb3b); transition: width 0.1s linear;"></div>
        </div>
      `;
      if (wordDisplay && wordDisplay.parentNode) {
        wordDisplay.parentNode.insertBefore(comboHud, wordDisplay.nextSibling);
      }
    }

    comboHud.style.display = "block";
    const comboHudText = document.getElementById("comboHudText");
    const comboProgressBar = document.getElementById("comboProgressBar");

    if (comboHudText) {
      comboHudText.innerText = `${state.streak}x STRIKE COMBO! 🔥`;
    }

    const totalDurationMs = 10000;
    const startTime = Date.now();

    state.comboIntervalId = setInterval(() => {
      if (state.isPaused) return;

      const elapsed = Date.now() - startTime;
      const remainingPct = Math.max(0, 100 - (elapsed / totalDurationMs) * 100);

      if (comboProgressBar) {
        comboProgressBar.style.width = `${remainingPct}%`;
      }

      if (elapsed >= totalDurationMs) {
        clearInterval(state.comboIntervalId);
      }
    }, 50);

    state.comboTimerId = setTimeout(() => {
      if (state.streak > 0) {
        state.streak = 0;
        if (comboHud) comboHud.style.display = "none";
        triggerComboResetPopup(wordDisplay);
      }
    }, totalDurationMs);
  }

  function hideComboHud() {
    clearTimeout(state.comboTimerId);
    clearInterval(state.comboIntervalId);
    const comboHud = document.getElementById("comboHudContainer");
    if (comboHud) comboHud.style.display = "none";
  }

  function triggerComboResetPopup(targetEl) {
    const rect = targetEl ? targetEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const banner = document.createElement("div");
    banner.innerText = "COMBO LOST ⏱️";
    banner.style.position = "fixed";
    banner.style.left = `${rect.left + rect.width / 2}px`;
    banner.style.top = `${rect.top - 20}px`;
    banner.style.transform = "translate(-50%, -50%) scale(0.8)";
    banner.style.color = "#e53e3e";
    banner.style.fontSize = "1.5rem";
    banner.style.fontWeight = "bold";
    banner.style.pointerEvents = "none";
    banner.style.zIndex = "10000";
    banner.style.textShadow = "0 0 8px rgba(229, 62, 62, 0.8)";
    banner.style.transition = "all 1.2s cubic-bezier(0.25, 1, 0.5, 1)";
    document.body.appendChild(banner);

    requestAnimationFrame(() => {
      banner.style.transform = "translate(-50%, -80%) scale(1)";
      banner.style.opacity = "0";
    });

    setTimeout(() => banner.remove(), 1800);
  }

  function triggerStrikeEffect(streakCount, targetEl) {
    // 1. Screen Shake
    document.body.classList.add("shake-effect");
    setTimeout(() => document.body.classList.remove("shake-effect"), 300);

    // 2. Longer Displaying Combo Banner Popup
    const rect = targetEl ? targetEl.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2 };
    const banner = document.createElement("div");
    banner.className = "strike-popup";
    banner.innerText = `${streakCount}x STRIKE! 🔥`;
    banner.style.position = "fixed";
    banner.style.left = `${rect.left + rect.width / 2}px`;
    banner.style.top = `${rect.top - 20}px`;
    banner.style.transform = "translate(-50%, -50%) scale(0.5)";
    banner.style.color = "#ff9800";
    banner.style.fontSize = "2rem";
    banner.style.fontWeight = "900";
    banner.style.pointerEvents = "none";
    banner.style.zIndex = "10000";
    banner.style.textShadow = "0 0 10px rgba(255, 152, 0, 0.8), 0 0 20px rgba(255, 235, 59, 0.8)";
    banner.style.transition = "transform 1.8s ease-out, opacity 1.8s ease-out";
    document.body.appendChild(banner);

    requestAnimationFrame(() => {
      banner.style.transform = "translate(-50%, -120%) scale(1.4)";
      banner.style.opacity = "0";
    });

    setTimeout(() => banner.remove(), 1800);
  }

  /* ==========================================================================
     8. INPUT HANDLING & CALCULATIONS
     ========================================================================== */
  if (typingInput) {
    typingInput.addEventListener("input", () => {
      if (!state.isActive || state.isPaused) return;

      const val = typingInput.value;
      renderWordDisplay();
      playSound("click");

      if (val.length >= state.currentPhrase.length) {
        let phraseErrors = 0;
        for (let i = 0; i < state.currentPhrase.length; i++) {
          state.typedChars++;
          if (val[i] === state.currentPhrase[i]) {
            state.correctChars++;
            state.score += 10;
          } else {
            state.incorrectChars++;
            phraseErrors++;
          }
        }

        // Check phrase accuracy
        if (phraseErrors === 0) {
          state.streak++;
          if (state.streak > state.maxStreak) {
            state.maxStreak = state.streak;
          }

          // Restart 10-second combo timer & bar on clean phrase completion
          startComboTimer();

          if (state.streak >= 2) {
            triggerStrikeEffect(state.streak, wordDisplay);
            playSound("strike");
          } else {
            playSound("wordSuccess");
          }
        } else {
          // Reset streak if errors were present in the word
          state.streak = 0;
          hideComboHud();
          playSound("wordSuccess");
        }

        triggerExplosiveEffect(wordDisplay, 40);
        updateStatsDisplay();
        nextPhrase();
      }
    });
  }

  function updateStatsDisplay() {
    const timeElapsedMin = Math.max((state.durationSeconds - state.timeRemaining) / 60, 0.01);
    const wpm = Math.round((state.correctChars / 5) / timeElapsedMin) || 0;
    const accuracy = state.typedChars > 0 ? Math.round((state.correctChars / state.typedChars) * 100) : 100;

    if (wpmEl) wpmEl.textContent = wpm;
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
    if (scoreEl) scoreEl.textContent = state.score;

    if (correctCountEl) correctCountEl.textContent = state.correctChars;
    if (incorrectCountEl) incorrectCountEl.textContent = state.incorrectChars;
  }

  /* ==========================================================================
     9. PAUSE / RESUME / END
     ========================================================================== */
  function pauseGame() {
    if (!state.isActive || state.isPaused) return;
    state.isPaused = true;
    if (gameStage) gameStage.classList.add("hidden");
    if (pausePanel) pausePanel.classList.remove("hidden");
  }

  function resumeGame() {
    if (!state.isActive || !state.isPaused) return;
    state.isPaused = false;
    if (pausePanel) pausePanel.classList.add("hidden");
    if (gameStage) gameStage.classList.remove("hidden");
    if (typingInput) typingInput.focus();
  }

  function endRound() {
    clearInterval(state.timerId);
    hideComboHud();
    state.isActive = false;

    const timeElapsedMin = Math.max(state.durationSeconds / 60, 0.01);
    const finalWpm = Math.round((state.correctChars / 5) / timeElapsedMin) || 0;
    const finalAcc = state.typedChars > 0 ? Math.round((state.correctChars / state.typedChars) * 100) : 100;

    if (resultWpm) resultWpm.textContent = finalWpm;
    if (resultAccuracy) resultAccuracy.textContent = `${finalAcc}%`;
    if (resultScore) resultScore.textContent = state.score;
    if (resultDifficulty) resultDifficulty.textContent = state.difficulty.toUpperCase();

    triggerExplosiveEffect(null, 120);
    playSound("finish");
    navigateTo("results");
  }

  function resetGameState() {
    clearInterval(state.timerId);
    hideComboHud();
    state.isActive = false;
    state.isPaused = false;
    state.streak = 0;
    if (typingInput) {
      typingInput.value = "";
      typingInput.disabled = true;
    }
    document.body.classList.remove("game-session");
    document.body.classList.remove("practice-session");
    if (pauseGameBtn) pauseGameBtn.disabled = true;
    if (stopGameBtn) stopGameBtn.disabled = true;
    if (progressBar) progressBar.style.width = "100%";
  }

  /* ==========================================================================
     10. PROFILE & SETTINGS SYSTEM
     ========================================================================== */
  function updateProfileUI() {
    if (playerNameEl) playerNameEl.textContent = state.playerName;
    if (homeGreeting && state.playerName && state.playerName !== "Your Name") {
      homeGreeting.textContent = `Welcome back, ${state.playerName}!`;
      homeGreeting.classList.remove("hidden");
    }
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
      if (profileDisplay) profileDisplay.classList.add("hidden");
      if (profileForm) profileForm.classList.remove("hidden");
      if (nameInput) nameInput.value = state.playerName;
    });
  }

  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", () => {
      const newName = nameInput ? nameInput.value.trim() : "";
      if (newName) {
        state.playerName = newName;
        localStorage.setItem("lr_playerName", newName);
        updateProfileUI();
      }
      if (profileForm) profileForm.classList.add("hidden");
      if (profileDisplay) profileDisplay.classList.remove("hidden");
    });
  }

  function playSound(type) {
    if (soundToggle && !soundToggle.checked) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();

      if (type === "click") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(400, ctx.currentTime);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === "beep") {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } else if (type === "wordSuccess") {
        const chord = [523.25, 659.25, 783.99];
        chord.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.04);
          gain.gain.setValueAtTime(0.06, ctx.currentTime + idx * 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.04 + 0.2);
          osc.start(ctx.currentTime + idx * 0.04);
          osc.stop(ctx.currentTime + idx * 0.04 + 0.2);
        });
      } else if (type === "strike") {
        const arpeggio = [440, 554.37, 659.25, 880, 1108.73];
        arpeggio.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = "triangle";
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.03);
          gain.gain.setValueAtTime(0.08, ctx.currentTime + idx * 0.03);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.03 + 0.15);
          osc.start(ctx.currentTime + idx * 0.03);
          osc.stop(ctx.currentTime + idx * 0.03 + 0.15);
        });
      } else if (type === "finish") {
        const notes = [440, 554.37, 659.25, 880];
        notes.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
          gain.gain.setValueAtTime(0.1, ctx.currentTime + idx * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.3);
          osc.start(ctx.currentTime + idx * 0.08);
          osc.stop(ctx.currentTime + idx * 0.08 + 0.3);
        });
      }
    } catch (e) {
      // Audio autoplay policy catch
    }
  }

  if (darkModeToggle) {
    darkModeToggle.addEventListener("change", (e) => {
      document.body.classList.toggle("dark-mode", e.target.checked);
    });
  }

  if (appearanceToggle && appearanceSection) {
    appearanceToggle.addEventListener("click", () => {
      const isHidden = appearanceSection.classList.toggle("hidden");
      appearanceToggle.setAttribute("aria-expanded", !isHidden);
    });
  }

  if (appearancePreset) {
    appearancePreset.addEventListener("change", (e) => {
      const presetKey = e.target.value;
      if (PRESETS[presetKey]) {
        applyTheme(PRESETS[presetKey]);
      }
    });
  }

  function applyTheme(theme) {
    document.documentElement.style.setProperty("--primary-color", theme.primary);
    document.documentElement.style.setProperty("--bg-color", theme.bg);
    document.documentElement.style.setProperty("--button-bg", theme.button);
    document.documentElement.style.setProperty("--accent-color", theme.accent);
    document.documentElement.style.setProperty("--text-color", theme.text);

    if (primaryColorInput) primaryColorInput.value = theme.primary;
    if (backgroundColorInput) backgroundColorInput.value = theme.bg;
    if (buttonColorInput) buttonColorInput.value = theme.button;
    if (accentColorInput) accentColorInput.value = theme.accent;
    if (textColorInput) textColorInput.value = theme.text;
  }

  if (resetAppearance) {
    resetAppearance.addEventListener("click", () => {
      if (appearancePreset) appearancePreset.value = "default";
      applyTheme(PRESETS.default);
    });
  }

  /* ==========================================================================
     11. EVENT BINDINGS
     ========================================================================== */
  if (gameStartBtn) gameStartBtn.addEventListener("click", startCountdown);
  if (startGameHeroBtn) startGameHeroBtn.addEventListener("click", () => navigateTo("game"));
  if (practiceStartBtn) practiceStartBtn.addEventListener("click", () => initiateRound());
  if (pauseGameBtn) pauseGameBtn.addEventListener("click", pauseGame);
  if (continueGameBtn) continueGameBtn.addEventListener("click", resumeGame);
  if (stopGameBtn) stopGameBtn.addEventListener("click", endRound);
  if (stopGameBtnModal) stopGameBtnModal.addEventListener("click", endRound);

  updateProfileUI();
});