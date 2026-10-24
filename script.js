document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.toggle("home-page", document.getElementById("home").classList.contains("active"));

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
<<<<<<< HEAD
      "mountain", "frontend", "developer", "sequence", "language", "hardware", "terminal",
      "browser", "project", "network", "function", "variable", "element", "response",
      "document", "feature", "database", "interface", "creative", "solution", "reliable",
      "computer", "journey", "careful", "discover", "complete", "between", "another",
      "without", "together", "remember", "building", "focused", "learning", "improve",
      "example", "picture", "morning", "holiday", "friendly", "important", "different",
      "experience", "beautiful", "wonderful", "adventure", "community", "confidence",
      "education", "excellent", "curiosity", "celebrate"
=======
      "mountain", "frontend", "developer", "sequence", "language", "hardware", "terminal"
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    ],
    difficult: [
      "synchronize", "infrastructure", "architecture", "microcontroller",
      "cryptography", "optimization", "implementation", "unpredictable", "asynchronous"
    ]
  };
<<<<<<< HEAD
  const DIFFICULT_SENTENCES = [
    "Cryptography shields private messages.",
    "Optimization improves complex systems.",
    "Implementation transforms careful designs.",
    "Infrastructure supports growing networks.",
    "Asynchronous processes coordinate separate services.",
    "Microcontrollers translate electrical signals.",
    "Unpredictable behavior challenges patient researchers.",
    "Architecture balances reliability against performance.",
    "Synchronize distributed components before deployment.",
    "Engineers analyze sophisticated algorithms daily.",
    "Precision prevents catastrophic engineering failures.",
    "Advanced encryption protects valuable information."
  ];

  // Public-domain titles available from Project Gutenberg. Passages below are short
  // public-domain excerpts or brief reading prompts, not full copyrighted texts.
  const STORYBOOKS = {
    "alice": { title: "Alice’s Adventures in Wonderland", author: "Lewis Carroll", url: "https://www.gutenberg.org/ebooks/11", passages: {
      easy: ["Alice was beginning to get very tired of sitting by her sister on the bank.", "Suddenly a White Rabbit with pink eyes ran close by her.", "There was nothing very remarkable in that.", "The rabbit took a watch out of its waistcoat-pocket.", "Alice followed it across the field."],
      medium: ["The rabbit actually took a watch out of its waistcoat-pocket and looked at it.", "Burning with curiosity, Alice ran across the field after it.", "The rabbit-hole went straight on like a tunnel for some way.", "Down, down, down. Would the fall never come to an end?", "Alice began to wonder what was going to happen next."],
      difficult: ["She found herself falling down a very deep well, though it was not at all like an ordinary well.", "There were cupboards and book-shelves on the sides of the passage.", "Alice had plenty of time to look about her as she descended.", "She tried to look down and make out what she was coming to.", "Her strange adventure had only just begun."] } },
    "pride": { title: "Pride and Prejudice", author: "Jane Austen", url: "https://www.gutenberg.org/ebooks/1342", passages: {
      easy: ["It is a truth universally acknowledged.", "A single man in possession of a good fortune must be in want of a wife.", "Mr. Bennet was among the earliest of those who waited on Mr. Bingley.", "Mrs. Bennet had been making plans for their new neighbour.", "The family soon began to discuss the news."],
      medium: ["However little known the feelings or views of such a man may be on his first entering a neighbourhood.", "This truth is so well fixed in the minds of the surrounding families.", "Mr. Bennet was so odd a mixture of quick parts, sarcastic humour, reserve, and caprice.", "The business of her life was to get her daughters married.", "Jane was admired, and Elizabeth was lively and clever."],
      difficult: ["The astonishment of the ladies was just what he wished; that of Mrs. Bennet perhaps exceeded the rest.", "She had always intended to visit him, though to the last always assuring her husband that she should not go.", "Elizabeth listened with delight to the lively conversation and the many opinions around her.", "Every new introduction offered another chance for misunderstanding.", "Their first impressions would prove difficult to forget."] } },
    "frankenstein": { title: "Frankenstein", author: "Mary Wollstonecraft Shelley", url: "https://www.gutenberg.org/ebooks/84", passages: {
      easy: ["I am by birth a Genevese.", "My family is one of the most distinguished of that republic.", "I was their only child for several years.", "My parents were guided by affection and kindness.", "My early life was full of care and hope."],
      medium: ["No human being could have passed a happier childhood than myself.", "My mother watched over the education of her children with great care.", "We were brought up together, and our friendship grew with every year.", "The world seemed to offer endless possibilities to a curious mind.", "I began to seek knowledge beyond the familiar home."],
      difficult: ["When I had attained the age of seventeen, my parents resolved that I should become a student at the university.", "I had hitherto attended the schools of Geneva, but my father thought it necessary for me to complete my education elsewhere.", "The pursuit of knowledge gradually took possession of my imagination.", "I studied the secrets of nature with a determination that left little room for rest.", "Ambition would soon lead me toward consequences I could not foresee."] } },
    "sherlock": { title: "The Adventures of Sherlock Holmes", author: "Arthur Conan Doyle", url: "https://www.gutenberg.org/ebooks/1661", passages: {
      easy: ["To Sherlock Holmes she is always the woman.", "I had seen little of Holmes lately.", "He was not a man who found it easy to share his feelings.", "One morning I called at Baker Street.", "A new mystery was waiting for us."],
      medium: ["In his eyes she eclipses and predominates the whole of her sex.", "It was not that he felt any emotion akin to love for Irene Adler.", "There was but one woman to him, and that woman was the late Irene Adler.", "Holmes had an extraordinary gift for noticing the smallest details.", "A clue that others overlooked could reveal the truth."],
      difficult: ["I had seen little of Holmes lately, for my marriage had drifted us away from each other.", "My own complete happiness, and the home-centred interests which rise up around the man who first finds himself master of his own establishment, were sufficient to absorb all my attention.", "Holmes remained the most exacting observer I had ever known.", "He studied the evidence with a patience that seemed almost inhuman.", "Before long, the mystery began to yield its secrets."] } },
    "little-women": { title: "Little Women", author: "Louisa May Alcott", url: "https://www.gutenberg.org/ebooks/37106", passages: {
      easy: ["Christmas won't be Christmas without any presents.", "Jo was the first to speak.", "The four young faces looked brighter than usual.", "Meg was the oldest of the four sisters.", "Amy dreamed of beautiful things."],
      medium: ["Jo said she did not think it fair for some girls to have plenty of pretty things.", "Meg was too fond of luxury, and Amy cared too much about her appearance.", "Beth was the peacemaker of the family, gentle and quiet.", "The sisters tried to make the best of a difficult season.", "Their mother reminded them that kindness mattered most."],
      difficult: ["Sitting on the rug in the twilight, with the December wind blowing outside and the fire crackling cheerfully within, the four sisters were knitting away.", "The room was very cosy, with the curtains drawn and the fire glowing warmly.", "The girls had little money, but they shared their hopes and worries freely.", "Each sister had a different dream, and each would have to learn what mattered most.", "Their story began with a small act of generosity."] } },
    "secret-garden": { title: "The Secret Garden", author: "Frances Hodgson Burnett", url: "https://www.gutenberg.org/ebooks/113", passages: {
      easy: ["When Mary Lennox was sent to Misselthwaite Manor to live with her uncle, everybody said she was the most disagreeable-looking child ever seen.", "She had a little thin face and a little thin body.", "Her hair was yellow, and her face was yellow.", "Mary had always been left to herself.", "The great house seemed full of secrets."],
      medium: ["She had been born in India and had always been ill in one way or another.", "Her father had held a position under the English Government.", "The house stood on the edge of a wide moor.", "Mary wandered through the long corridors and listened to the wind.", "One day she discovered a garden that had been locked for years."],
      difficult: ["The wind swept across the moor with a wild, lonely sound, and the great house seemed to hold its breath.", "Mary had never been allowed to explore freely, and every hidden passage filled her with curiosity.", "A robin appeared among the branches and seemed to invite her to follow.", "The old garden was waiting beneath tangled vines and forgotten leaves.", "With patience and care, the sleeping garden would begin to live again."] } }
=======

  const STORYBOOKS = {
    "moonlit-map": {
      title: "The Moonlit Map",
      passages: {
        easy: [
          "Mira found a silver map.",
          "It shone beneath the moon.",
          "A star marked the old well.",
          "She followed the quiet path.",
          "A blue door waited below."
        ],
        medium: [
          "The map shimmered whenever Mira moved toward the harbor.",
          "Beneath the old well, a staircase curled into the earth.",
          "Tiny lights drifted past her like stars under the city.",
          "A brass key rested beside a door carved with waves.",
          "Mira turned the key, and the hidden harbor woke."
        ],
        difficult: [
          "Beyond the doorway, an underground city glittered beneath a ceiling of crystal.",
          "The map redrew itself, tracing a route through streets no visitor had seen.",
          "At the silent observatory, Mira discovered her family name among the stars.",
          "She placed the map in the empty telescope, revealing the city's forgotten dawn.",
          "When morning reached the surface, every lantern below shone like a promise."
        ]
      }
    },
    "clockwork-forest": {
      title: "The Clockwork Forest",
      passages: {
        easy: [
          "Tavi heard a bell in the woods.",
          "The trees stood still and silent.",
          "A copper bird led the way.",
          "He found a clock under a root.",
          "One small gear began to turn."
        ],
        medium: [
          "The copper bird fluttered toward a tower wrapped in vines.",
          "Inside, Tavi found gears scattered across a dusty floor.",
          "A wooden fox guarded the spring that powered the forest.",
          "He fitted the smallest gear into a space near the heart.",
          "The great clock gave one clear chime after many quiet years."
        ],
        difficult: [
          "Branches unfolded like careful hands as the forest's ancient machinery stirred.",
          "Tavi listened for the rhythm hidden beneath the churning iron roots.",
          "Each turning wheel carried a warm pulse through the mossy ground.",
          "The wooden fox bowed, its painted eyes reflecting a thousand waking leaves.",
          "By sunrise, every tree swayed again, keeping time with the brightening sky."
        ]
      }
    },
    "last-lighthouse": {
      title: "The Last Lighthouse",
      passages: {
        easy: [
          "Rowan sailed into the storm.",
          "A dark island rose ahead.",
          "The lighthouse lamp was cold.",
          "He climbed the winding stairs.",
          "A little flame came alive."
        ],
        medium: [
          "Waves tossed Rowan's small boat toward the rocky shore.",
          "He carried a lantern through the rain to the silent tower.",
          "At the top, he found a cracked lens beneath a heavy cloth.",
          "A note explained how the beacon could guide lost ships home.",
          "Rowan lit the lamp and watched its golden beam cross the water."
        ],
        difficult: [
          "Through the driving rain, distant sailors searched the horizon for a signal.",
          "Rowan aligned the ancient lens with a narrow opening in the storm clouds.",
          "The beacon swept across the waves, revealing a safe passage between rocks.",
          "One by one, the stranded ships answered with lanterns of their own.",
          "At dawn, the lighthouse keeper welcomed Rowan as the guardian of the shore."
        ]
      }
    },
    "paper-dragon": {
      title: "The Paper Dragon",
      passages: {
        easy: [
          "Nia folded a red paper dragon.",
          "It fluttered beside her window.",
          "The dragon tugged at her sleeve.",
          "They flew above the rooftops.",
          "A bright cloud showed the way."
        ],
        medium: [
          "The paper dragon circled the chimney and pointed toward the hills.",
          "Nia climbed onto its back and held tight to its folded wings.",
          "They sailed past rooftops where sleepy cats watched them go.",
          "A silver feather had fallen beside a quiet mountain lake.",
          "The dragon tucked the feather away and glowed with delight."
        ],
        difficult: [
          "A sudden gust carried Nia and her dragon beyond the edge of the familiar town.",
          "They discovered an island where forgotten paper creatures gathered in the breeze.",
          "Nia used her sketchbook to repair a wing torn by the mountain wind.",
          "The dragon's scarlet scales shimmered as its friends rose into the sunset.",
          "Together they flew home, leaving a trail of tiny stars across the evening sky."
        ]
      }
    },
    "sky-train": {
      title: "The Midnight Sky Train",
      passages: {
        easy: [
          "Eli heard a whistle at midnight.",
          "A blue train crossed the sky.",
          "Its doors opened with a chime.",
          "He found a seat by the stars.",
          "The moon waved as they passed."
        ],
        medium: [
          "The conductor punched Eli's ticket with a tiny silver star.",
          "Outside the window, planets drifted like lanterns in the dark.",
          "A friendly robot served warm cocoa in a paper cup.",
          "Their next stop was a station built on a ringed planet.",
          "Eli stepped onto the platform and watched the train glow."
        ],
        difficult: [
          "The sky train raced along a ribbon of light between the distant constellations.",
          "Eli helped the conductor read a map whose destinations shifted every hour.",
          "They paused beside a quiet planet where the aurora danced above the station.",
          "A lost passenger found their home constellation marked on Eli's ticket.",
          "As dawn approached, the train carried Eli back beneath his own familiar stars."
        ]
      }
    },
    "secret-garden": {
      title: "The Secret Garden Gate",
      passages: {
        easy: [
          "June found a key in the rain.",
          "A green gate stood behind the wall.",
          "She heard birds inside the garden.",
          "A small path led to a pond.",
          "One golden flower began to bloom."
        ],
        medium: [
          "The key turned slowly, and ivy curled away from the old green gate.",
          "June followed a line of smooth stones through the overgrown garden.",
          "A painted robin carried a ribbon toward the dry fountain.",
          "She filled the fountain with water from a rain barrel nearby.",
          "The garden seemed to brighten as birds returned to the trees."
        ],
        difficult: [
          "Behind the fountain, June uncovered a note written by the garden's first keeper.",
          "It described a hidden seed that would bloom only when the whole garden was cared for.",
          "June cleared the tangled paths and invited her neighbors to help plant the beds.",
          "Together they found the seed tucked beneath a stone shaped like a heart.",
          "By spring, the secret garden had become a bright refuge for the entire neighborhood."
        ]
      }
    }
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
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
<<<<<<< HEAD
    playerName: localStorage.getItem("lr_playerName") || "",
=======
    playerName: localStorage.getItem("lr_playerName") || "Your Name",
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    difficulty: "medium",
    durationSeconds: 60,
    timeRemaining: 60,
    isActive: false,
    isPaused: false,
<<<<<<< HEAD
    practiceKeysmash: false,
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    timerId: null,
    countdownIntervalId: null,
    countdownStartTimeoutId: null,
    
    currentPhrase: "",
<<<<<<< HEAD
    timedWordsRemaining: [],
    timedWordsUsed: [],
    lastTimedWord: "",
    lastTimedWords: [],
    difficultSentencesRemaining: [],
    lastDifficultSentence: "",
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    typedChars: 0,
    correctChars: 0,
    incorrectChars: 0,
    score: 0,
<<<<<<< HEAD
    storyChapter: 1,
    storyTotalChapters: 12,
    storyChapterProgress: 0,
    storyCompletedPassages: 0,
    sessionStartedAt: 0,
    selectedStoryId: "alice",
=======
    storyLevel: 1,
    storyLives: 3,
    storyLevelProgress: 0,
    selectedStoryId: "moonlit-map",
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c

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
  const gameModeHint = document.getElementById("gameModeHint");
  const difficultyGroup = document.getElementById("difficultyGroup");
  const typingLabel = document.querySelector(".typing-label");
  
  const gameSetup = document.getElementById("gameSetup");
  const practiceSetup = document.getElementById("practiceSetup");
  const storySetup = document.getElementById("storySetup");
  const storyPage = document.getElementById("story");
  const storyEndPanel = document.getElementById("storyEndPanel");
  const storyEndTitle = document.getElementById("storyEndTitle");
  const storyEndMessage = document.getElementById("storyEndMessage");
  const storyBookButtons = document.querySelectorAll("[data-storybook]");
  const storySelection = document.getElementById("storySelection");
  const storyActiveTitle = document.getElementById("storyActiveTitle");
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
  const storyStartBtn = document.getElementById("storyStart");
  const storyRestartBtn = document.getElementById("storyRestart");
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
<<<<<<< HEAD
  const storyChapterIndicator = document.getElementById("storyChapterIndicator");
  const storyEndExitBtn = document.getElementById("storyEndExit");
  const gameModeExitBtn = document.getElementById("gameModeExit");
  const resultElapsed = document.getElementById("resultElapsed");
  const resultProgress = document.getElementById("resultProgress");
=======
  const storyLevelEl = document.getElementById("storyLevel");
  const storyLivesEl = document.getElementById("storyLives");
  const storyLevelProgressEl = document.getElementById("storyLevelProgress");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
  const feedbackEl = document.getElementById("feedback");
  
  const playerNameEl = document.getElementById("playerName");
  const editProfileBtn = document.getElementById("editProfile");
  const profileDisplay = document.getElementById("profileDisplay");
  const profileForm = document.getElementById("profileForm");
  const nameInput = document.getElementById("nameInput");
  const saveNameBtn = document.getElementById("saveName");
  const homeGreeting = document.getElementById("homeGreeting");
  const profileGamesPlayed = document.getElementById("profileGamesPlayed");
  const profileTotalScore = document.getElementById("profileTotalScore");
  const profileAverageWpm = document.getElementById("profileAverageWpm");
  const profileAverageAccuracy = document.getElementById("profileAverageAccuracy");
  const profileBestScore = document.getElementById("profileBestScore");
  const profileBestWpm = document.getElementById("profileBestWpm");
  const profileStoryBestLevel = document.getElementById("profileStoryBestLevel");
  const profileStoryBestScore = document.getElementById("profileStoryBestScore");
<<<<<<< HEAD
  const profileKeysmashGames = document.getElementById("profileKeysmashGames");
  const profileKeysmashBestScore = document.getElementById("profileKeysmashBestScore");
  const profileKeysmashBestWpm = document.getElementById("profileKeysmashBestWpm");
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
  const profileHistory = document.getElementById("profileHistory");

  const resultWpm = document.getElementById("resultWpm");
  const resultAccuracy = document.getElementById("resultAccuracy");
  const resultScore = document.getElementById("resultScore");
  const resultDifficulty = document.getElementById("resultDifficulty");
<<<<<<< HEAD
  const resultDifficultyRow = document.getElementById("resultDifficultyRow");

  const soundToggle = document.getElementById("soundToggle");
  const lightModeToggle = document.getElementById("lightModeToggle");
=======

  const soundToggle = document.getElementById("soundToggle");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
  const appearanceToggle = document.getElementById("appearanceToggle");
  const appearanceSection = document.getElementById("appearanceSection");
  const appearancePreset = document.getElementById("appearancePreset");
  const resetAppearance = document.getElementById("resetAppearance");

  const primaryColorInput = document.getElementById("primaryColor");
  const backgroundColorInput = document.getElementById("backgroundColor");
  const buttonColorInput = document.getElementById("buttonColor");
  const accentColorInput = document.getElementById("accentColor");
  const textColorInput = document.getElementById("textColor");
  const colorControls = [
    { input: primaryColorInput, property: "--primary-color", themeKey: "primary", hexLabel: "primaryHex" },
    { input: backgroundColorInput, property: "--bg-color", themeKey: "bg", hexLabel: "backgroundHex" },
    { input: buttonColorInput, property: "--button-bg", themeKey: "button", hexLabel: "buttonHex" },
    { input: accentColorInput, property: "--accent-color", themeKey: "accent", hexLabel: "accentHex" },
    { input: textColorInput, property: "--text-color", themeKey: "text", hexLabel: "textHex" }
  ];

  /* ==========================================================================
<<<<<<< HEAD
     ACCOUNT & AUTHENTICATION
     ========================================================================== */
  const AUTH_ACCOUNTS_KEY = "lr_authAccounts";
  const AUTH_SESSION_KEY = "lr_authSession";
  const AUTH_HASH_ITERATIONS = 210000;
  const LEGACY_PROGRESS_KEYS = ["lr_gameHistory", "lr_gameSummary", "lr_storyBest"];
  const authMessage = document.getElementById("authMessage");
  const authHeading = document.getElementById("authHeading");
  const authDescription = document.getElementById("authDescription");
  const authForms = document.getElementById("authForms");
  const loginForm = document.getElementById("loginForm");
  const signupForm = document.getElementById("signupForm");
  const authSwitchPrompt = document.querySelector(".auth-switch-prompt");
  const authSwitchText = document.getElementById("authSwitchText");
  const authSwitchButton = document.getElementById("authSwitchButton");
  const accountDashboard = document.getElementById("accountDashboard");
  const accountName = document.getElementById("accountName");
  const accountEmail = document.getElementById("accountEmail");
  const signOutButton = document.getElementById("signOutButton");
  let authMode = "login";
  let activeAccount = null;
  let authBusy = false;

  function getProgressStorageKey(key) {
    return activeAccount ? `${key}:${encodeURIComponent(activeAccount.email)}` : null;
  }

  function clearGuestProgress() {
    LEGACY_PROGRESS_KEYS.forEach(key => localStorage.removeItem(key));
  }

  function showAuthMessage(message, type) {
    if (!authMessage) return;
    authMessage.textContent = message;
    authMessage.classList.remove("hidden", "error", "success");
    authMessage.classList.add(type);
  }

  function clearAuthMessage() {
    if (!authMessage) return;
    authMessage.textContent = "";
    authMessage.classList.add("hidden");
    authMessage.classList.remove("error", "success");
  }

  function setAuthMode(mode) {
    if (activeAccount) return;
    authMode = mode;
    clearAuthMessage();
    loginForm?.reset();
    signupForm?.reset();
    document.querySelectorAll("[data-password-toggle]").forEach(button => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (input) input.type = "password";
      button.textContent = "SHOW";
      button.setAttribute("aria-label", "Show password");
      button.setAttribute("aria-pressed", "false");
    });
    loginForm?.classList.toggle("hidden", mode !== "login");
    signupForm?.classList.toggle("hidden", mode !== "signup");
    if (authHeading) authHeading.textContent = mode === "login" ? "Welcome back" : "Create your account";
    if (authDescription) {
      authDescription.textContent = mode === "login"
        ? "Sign in to continue to your account."
        : "Create an account to get started with LetterRush.";
    }
    if (authSwitchText) authSwitchText.textContent = mode === "login" ? "Don't have an account?" : "Already have an account?";
    if (authSwitchButton) authSwitchButton.textContent = mode === "login" ? "Sign up" : "Log in";
  }

  function renderAuthPage() {
    const signedIn = Boolean(activeAccount);
    document.body.classList.toggle("authenticated", signedIn);
    if (authForms) authForms.classList.toggle("hidden", signedIn);
    if (authSwitchPrompt) authSwitchPrompt.classList.toggle("hidden", signedIn);
    if (accountDashboard) accountDashboard.classList.toggle("hidden", !signedIn);
    if (signedIn) {
      if (authHeading) authHeading.textContent = "Your account";
      if (authDescription) authDescription.textContent = "Manage your LetterRush sign-in.";
      if (accountName) accountName.textContent = activeAccount.name;
      if (accountEmail) accountEmail.textContent = activeAccount.email;
    } else {
      setAuthMode(authMode);
    }
  }

  function loadAuthAccounts() {
    const savedAccounts = localStorage.getItem(AUTH_ACCOUNTS_KEY);
    if (!savedAccounts) return [];

    const accounts = JSON.parse(savedAccounts);
    if (!Array.isArray(accounts) || accounts.some(account =>
      !account ||
      typeof account.name !== "string" ||
      typeof account.email !== "string" ||
      !/^[a-f\d]{32}$/i.test(account.salt) ||
      !/^[a-f\d]{64}$/i.test(account.passwordHash)
    )) {
      throw new TypeError("Saved account data has an invalid format.");
    }
    return accounts;
  }

  function loadAuthSession() {
    const savedSession = localStorage.getItem(AUTH_SESSION_KEY);
    if (!savedSession) return null;

    const session = JSON.parse(savedSession);
    if (!session || typeof session.email !== "string") {
      throw new TypeError("Saved sign-in data has an invalid format.");
    }
    const account = loadAuthAccounts().find(item => item.email === session.email.toLowerCase());
    if (!account) throw new TypeError("The saved account for this sign-in could not be found.");
    return { name: account.name, email: account.email };
  }

  function bytesToHex(bytes) {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
  }

  async function derivePasswordHash(password, salt) {
    if (!window.crypto?.subtle) {
      throw new Error("Secure password processing is unavailable. Open LetterRush on HTTPS or localhost and try again.");
    }
    const key = await window.crypto.subtle.importKey(
      "raw",
      new TextEncoder().encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    const bits = await window.crypto.subtle.deriveBits({
      name: "PBKDF2",
      salt,
      iterations: AUTH_HASH_ITERATIONS,
      hash: "SHA-256"
    }, key, 256);
    return new Uint8Array(bits);
  }

  async function createPasswordRecord(password) {
    const salt = window.crypto.getRandomValues(new Uint8Array(16));
    const hash = await derivePasswordHash(password, salt);
    return { salt: bytesToHex(salt), passwordHash: bytesToHex(hash) };
  }

  async function verifyPassword(password, saltHex, expectedHash) {
    const salt = Uint8Array.from(saltHex.match(/.{2}/g), byte => Number.parseInt(byte, 16));
    const actualHash = await derivePasswordHash(password, salt);
    const expectedBytes = Uint8Array.from(expectedHash.match(/.{2}/g), byte => Number.parseInt(byte, 16));
    let difference = actualHash.length ^ expectedBytes.length;
    for (let index = 0; index < actualHash.length; index++) {
      difference |= actualHash[index] ^ expectedBytes[index];
    }
    return difference === 0;
  }

  function setAuthLoading(form, isLoading) {
    authBusy = isLoading;
    document.querySelectorAll("#auth button").forEach(button => {
      button.disabled = isLoading;
    });
    if (!form) return;
    form.setAttribute("aria-busy", String(isLoading));
    const spinner = form.querySelector(".auth-spinner");
    const label = form.querySelector(".auth-submit-label");
    if (spinner) spinner.classList.toggle("hidden", !isLoading);
    if (label) label.textContent = isLoading ? "PLEASE WAIT..." : (form === loginForm ? "LOG IN" : "CREATE ACCOUNT");
  }

  function validateAuthForm(form, emailInput) {
    emailInput.value = emailInput.value.trim();
    if (!form.checkValidity()) {
      form.reportValidity();
      showAuthMessage("Please complete all required fields with a valid email address.", "error");
      return false;
    }
    return true;
  }

  function persistAuthSession(account) {
    localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify({
      email: account.email,
      name: account.name
    }));
    activeAccount = { name: account.name, email: account.email };
    state.playerName = account.name;
    localStorage.setItem("lr_playerName", account.name);
    updateProfileUI();
    renderProfileStats();
    renderAuthPage();
  }

  if (authSwitchButton) {
    authSwitchButton.addEventListener("click", () => {
      if (authBusy) return;
      setAuthMode(authMode === "login" ? "signup" : "login");
    });
  }

  document.querySelectorAll("[data-password-toggle]").forEach(button => {
    button.addEventListener("click", () => {
      const input = document.getElementById(button.dataset.passwordToggle);
      if (!input || authBusy) return;
      const showPassword = input.type === "password";
      input.type = showPassword ? "text" : "password";
      button.textContent = showPassword ? "HIDE" : "SHOW";
      button.setAttribute("aria-label", showPassword ? "Hide password" : "Show password");
      button.setAttribute("aria-pressed", String(showPassword));
    });
  });

  if (loginForm) {
    loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (authBusy) return;
      const emailInput = document.getElementById("loginEmail");
      const passwordInput = document.getElementById("loginPassword");
      if (!emailInput || !passwordInput || !validateAuthForm(loginForm, emailInput)) return;

      clearAuthMessage();
      setAuthLoading(loginForm, true);
      try {
        const email = emailInput.value.toLowerCase();
        const account = loadAuthAccounts().find(item => item.email === email);
        if (!account || !await verifyPassword(passwordInput.value, account.salt, account.passwordHash)) {
          showAuthMessage("Email or password is incorrect.", "error");
          return;
        }

        persistAuthSession(account);
        loginForm.reset();
        navigateTo("home");
        showAuthMessage(`Welcome back, ${account.name}! You are now signed in.`, "success");
      } catch (error) {
        console.error("Unable to sign in.", error);
        showAuthMessage(error instanceof Error ? error.message : "Unable to sign in. Please try again.", "error");
      } finally {
        setAuthLoading(loginForm, false);
      }
    });
  }

  if (signupForm) {
    signupForm.addEventListener("submit", async event => {
      event.preventDefault();
      if (authBusy) return;
      const nameInput = document.getElementById("signupName");
      const emailInput = document.getElementById("signupEmail");
      const passwordInput = document.getElementById("signupPassword");
      const confirmPasswordInput = document.getElementById("confirmPassword");
      if (!nameInput || !emailInput || !passwordInput || !confirmPasswordInput) return;
      nameInput.value = nameInput.value.trim();
      if (!nameInput.value) {
        showAuthMessage("Please enter your full name.", "error");
        nameInput.focus();
        return;
      }
      if (!validateAuthForm(signupForm, emailInput)) return;
      if (passwordInput.value !== confirmPasswordInput.value) {
        showAuthMessage("Your passwords do not match. Please try again.", "error");
        confirmPasswordInput.focus();
        return;
      }

      clearAuthMessage();
      setAuthLoading(signupForm, true);
      try {
        const email = emailInput.value.toLowerCase();
        const accounts = loadAuthAccounts();
        if (accounts.some(account => account.email === email)) {
          showAuthMessage("An account with this email already exists. Please log in instead.", "error");
          return;
        }

        const passwordRecord = await createPasswordRecord(passwordInput.value);
        const account = { name: nameInput.value, email, ...passwordRecord };
        localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify([...accounts, account]));
        localStorage.removeItem(AUTH_SESSION_KEY);
        activeAccount = null;
        state.playerName = "";
        localStorage.removeItem("lr_playerName");
        signupForm.reset();
        setAuthMode("login");
        renderAuthPage();
        showAuthMessage("Account created successfully. Log in to continue.", "success");
      } catch (error) {
        console.error("Unable to create an account.", error);
        showAuthMessage(error instanceof Error ? error.message : "Unable to create your account. Please try again.", "error");
      } finally {
        setAuthLoading(signupForm, false);
      }
    });
  }

  if (signOutButton) {
    signOutButton.addEventListener("click", () => {
      if (authBusy) return;
      try {
        localStorage.removeItem(AUTH_SESSION_KEY);
        activeAccount = null;
        state.playerName = "";
        localStorage.removeItem("lr_playerName");
        clearGuestProgress();
        if (profileForm) profileForm.classList.add("hidden");
        if (profileDisplay) profileDisplay.classList.remove("hidden");
        updateProfileUI();
        renderProfileStats();
        loginForm?.reset();
        signupForm?.reset();
        setAuthMode("login");
        renderAuthPage();
        showAuthMessage("You have been signed out.", "success");
      } catch (error) {
        console.error("Unable to sign out.", error);
        showAuthMessage("Unable to sign out. Please try again.", "error");
      }
    });
  }

  try {
    activeAccount = loadAuthSession();
    if (activeAccount) {
      state.playerName = activeAccount.name;
      localStorage.setItem("lr_playerName", activeAccount.name);
      updateProfileUI();
    } else {
      state.playerName = "";
      localStorage.removeItem("lr_playerName");
      clearGuestProgress();
    }
    renderAuthPage();
  } catch (error) {
    console.error("Unable to restore the saved sign-in.", error);
    activeAccount = null;
    state.playerName = "";
    localStorage.removeItem(AUTH_SESSION_KEY);
    localStorage.removeItem("lr_playerName");
    clearGuestProgress();
    updateProfileUI();
    renderAuthPage();
    showAuthMessage("Your saved sign-in could not be restored. Please log in again.", "error");
  }

  /* ==========================================================================
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
     5. ROUTING & PAGE NAVIGATION
     ========================================================================== */
  function navigateTo(pageId) {
    if (state.isActive && !confirm("Leaving this page will forfeit your current round. Continue?")) {
      return;
    }
    resetGameState();

    const destinationPageId = pageId === "keysmash" ? "game" : pageId;
    pages.forEach(page => {
      if (page.id === destinationPageId) {
        page.classList.add("active");
      } else {
        page.classList.remove("active");
      }
    });
    document.body.classList.toggle("home-page", pageId === "home");

    navButtons.forEach(btn => {
      if (btn.dataset.page === pageId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
    const isGameCategory = ["game-menu", "game", "story", "keysmash"].includes(pageId);
    const gameNavButton = document.querySelector('nav [data-page="game-menu"]');
    if (gameNavButton) gameNavButton.classList.toggle("active", isGameCategory);

    if (pageId === "profile") renderProfileStats();

    if (pageId === "game-menu") {
      setupGameUI("timed");
    } else if (pageId === "game" || pageId === "keysmash") {
      setupGameUI(pageId === "keysmash" ? "keysmash" : "timed");
    } else if (pageId === "story") {
      setupGameUI("story");
    } else if (pageId === "practice") {
      setupGameUI("practice");
    }
  }

  navButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const page = btn.getAttribute("data-page");
      if (page) {
        navigateTo(page);
      }
    });
  });

  /* ==========================================================================
     6. GAME SETUP & ENGINE
     ========================================================================== */
  function setupGameUI(mode) {
    state.mode = mode;
<<<<<<< HEAD
    const scoreStat = document.getElementById("scoreStat");
    if (scoreStat) scoreStat.classList.toggle("hidden", mode === "story");
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    if (gameModeHint) {
      gameModeHint.textContent = mode === "keysmash"
        ? "Keysmash: type each random string of 6–8 lowercase letters before time runs out."
        : "";
      gameModeHint.classList.toggle("hidden", mode !== "keysmash");
    }
    if (difficultyGroup) difficultyGroup.classList.toggle("hidden", mode === "keysmash" || mode === "story");
    if (typingLabel) {
      typingLabel.textContent = mode === "keysmash" ? "TYPE THE STRING BELOW" : "TYPE THE TEXT BELOW";
    }
    if (storyActiveTitle) {
      storyActiveTitle.textContent = STORYBOOKS[state.selectedStoryId]?.title || "";
      storyActiveTitle.classList.toggle("hidden", mode !== "story");
    }
    
    if (mode === "practice" || mode === "story") {
      const destinationPage = mode === "story" ? storyPage : document.getElementById("practice");
      if (destinationPage && gameStage && gameStage.parentElement !== destinationPage) {
        destinationPage.appendChild(gameStage);
      }
      if (destinationPage && pausePanel && pausePanel.parentElement !== destinationPage) {
        destinationPage.appendChild(pausePanel);
      }
      if (destinationPage && countdownOverlay && countdownOverlay.parentElement !== destinationPage) {
        destinationPage.appendChild(countdownOverlay);
      }
      if (mode === "practice" && practiceSetup) practiceSetup.classList.remove("hidden");
      if (mode === "story" && storySetup) storySetup.classList.remove("hidden");
      if (gameSetup) gameSetup.classList.add("hidden");
    } else {
      if (gameCard && gameStage && gameStage.parentElement !== gameCard) {
        gameCard.appendChild(gameStage);
      }
      if (gameCard && pausePanel && pausePanel.parentElement !== gameCard) {
        gameCard.appendChild(pausePanel);
      }
      if (gameCard && countdownOverlay && countdownOverlay.parentElement !== gameCard) {
        gameCard.appendChild(countdownOverlay);
      }
      if (gameSetup) gameSetup.classList.remove("hidden");
      if (practiceSetup) practiceSetup.classList.add("hidden");
    }

    if (mode !== "story" && storySetup) storySetup.classList.add("hidden");
    if (gameStage) gameStage.classList.add("hidden");
    if (countdownOverlay) countdownOverlay.classList.add("hidden");
    if (pausePanel) pausePanel.classList.add("hidden");
    if (storyEndPanel) storyEndPanel.classList.add("hidden");

    const timedOnlyElements = document.querySelectorAll(".timed-only");
    const practiceOnlyElements = document.querySelectorAll(".practice-only");
    const storyOnlyElements = document.querySelectorAll(".story-only");

    timedOnlyElements.forEach(el => el.classList.toggle("hidden", mode !== "timed" && mode !== "keysmash"));
    practiceOnlyElements.forEach(el => el.classList.toggle("hidden", mode !== "practice"));
    storyOnlyElements.forEach(el => el.classList.toggle("hidden", mode !== "story"));
  }

  function startStoryMode() {
    if (state.isActive || state.isPaused) return;
    state.mode = "story";
<<<<<<< HEAD
    state.storyChapter = 1;
    state.storyChapterProgress = 0;
    state.storyCompletedPassages = 0;
    state.difficulty = "easy";
    if (!STORYBOOKS[state.selectedStoryId]) state.selectedStoryId = "alice";
=======
    state.storyLevel = 1;
    state.storyLives = 3;
    state.storyLevelProgress = 0;
    state.difficulty = "easy";
    if (!STORYBOOKS[state.selectedStoryId]) state.selectedStoryId = "moonlit-map";
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    if (storySetup) storySetup.classList.add("hidden");
    if (storyEndPanel) storyEndPanel.classList.add("hidden");
    document.body.classList.add("story-countdown");
    beginCountdown();
  }

  function startCountdown() {
    if (state.isActive || state.isPaused) {
      return;
    }

    if (difficultySelect) state.difficulty = difficultySelect.value;
    
    let duration = Number.parseInt(timerAmountInput ? timerAmountInput.value : "60", 10);
    if (!Number.isFinite(duration) || duration < 1) duration = 60;
    if (timerUnitSelect && timerUnitSelect.value === "minutes") duration *= 60;
    state.durationSeconds = duration;
    state.timeRemaining = duration;

    clearInterval(state.countdownIntervalId);
    clearTimeout(state.countdownStartTimeoutId);
    state.countdownIntervalId = null;
    state.countdownStartTimeoutId = null;

    if (gameSetup) gameSetup.classList.add("hidden");
    beginCountdown();
  }

  function beginCountdown() {
    if (countdownOverlay) countdownOverlay.classList.remove("hidden");

    let count = 3;
    if (countdownNumber) countdownNumber.textContent = count;
    
    playSound("beep");
    state.countdownIntervalId = setInterval(() => {
      count--;
      if (count > 0) {
        if (countdownNumber) countdownNumber.textContent = count;
        playSound("beep");
      } else {
        if (countdownNumber) countdownNumber.textContent = "START!";
        playSound("beep");
        clearInterval(state.countdownIntervalId);
        state.countdownIntervalId = null;
        state.countdownStartTimeoutId = setTimeout(() => {
          state.countdownStartTimeoutId = null;
          if (countdownOverlay) countdownOverlay.classList.add("hidden");
          document.body.classList.remove("story-countdown");
          initiateRound();
        }, 500);
      }
    }, 1000);
  }

  function initiateRound() {
    clearInterval(state.countdownIntervalId);
    clearTimeout(state.countdownStartTimeoutId);
    state.countdownIntervalId = null;
    state.countdownStartTimeoutId = null;

    state.isActive = true;
    state.isPaused = false;
<<<<<<< HEAD
    state.sessionStartedAt = Date.now();
    state.timedWordsRemaining = [];
    state.timedWordsUsed = [];
    state.lastTimedWord = "";
    state.lastTimedWords = [];
    state.difficultSentencesRemaining = [];
    state.lastDifficultSentence = "";
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    state.score = 0;
    state.typedChars = 0;
    state.correctChars = 0;
    state.incorrectChars = 0;
    state.streak = 0;
    state.maxStreak = 0;
    if (feedbackEl) feedbackEl.textContent = "";

    if (gameSetup) gameSetup.classList.add("hidden");
    if (practiceSetup) practiceSetup.classList.add("hidden");
    if (storySetup) storySetup.classList.add("hidden");
    if (storyEndPanel) storyEndPanel.classList.add("hidden");
    if (countdownOverlay) countdownOverlay.classList.add("hidden");
    if (pausePanel) pausePanel.classList.add("hidden");
    
    if (gameStage) gameStage.classList.remove("hidden");
    document.body.classList.add("game-session");
    document.body.classList.toggle("practice-session", state.mode === "practice");
    document.body.classList.toggle("story-session", state.mode === "story");
    document.body.classList.remove("story-countdown");

    if (typingInput) {
      typingInput.disabled = false;
      typingInput.value = "";
      typingInput.focus();
    }

    if (pauseGameBtn) pauseGameBtn.disabled = false;
    if (stopGameBtn) stopGameBtn.disabled = false;

    updateStatsDisplay();
    nextPhrase();

    if (state.mode === "timed" || state.mode === "keysmash") {
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
    if (state.mode === "keysmash") {
      const length = 6 + Math.floor(Math.random() * 3);
      const letters = "abcdefghijklmnopqrstuvwxyz";
      state.currentPhrase = Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
      if (typingInput) typingInput.value = "";
      renderWordDisplay();
      return;
    }

    let diff = state.difficulty;
    if (state.mode === "practice") {
<<<<<<< HEAD
      const keys = ["keysmash", "easy", "medium", "difficult"];
      diff = keys[Math.floor(Math.random() * keys.length)];
      if (diff === "keysmash") {
        state.practiceKeysmash = true;
        const length = 6 + Math.floor(Math.random() * 3);
        const letters = "abcdefghijklmnopqrstuvwxyz";
        state.currentPhrase = Array.from({ length }, () => letters[Math.floor(Math.random() * letters.length)]).join("");
        if (currentDifficultyEl) currentDifficultyEl.textContent = "Keysmash";
      } else {
        state.practiceKeysmash = false;
        if (currentDifficultyEl) {
          currentDifficultyEl.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
        }
      }
      if (diff === "keysmash") {
        if (typingInput) typingInput.value = "";
        renderWordDisplay();
        return;
      }
    } else if (state.mode === "story") {
      diff = state.storyChapter <= 4 ? "easy" : state.storyChapter <= 8 ? "medium" : "difficult";
=======
      const keys = ["easy", "medium", "difficult"];
      diff = keys[Math.floor(Math.random() * keys.length)];
      if (currentDifficultyEl) {
        currentDifficultyEl.textContent = diff.charAt(0).toUpperCase() + diff.slice(1);
      }
    } else if (state.mode === "story") {
      diff = state.storyLevel === 1 ? "easy" : state.storyLevel === 2 ? "medium" : "difficult";
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
      state.difficulty = diff;
      const story = STORYBOOKS[state.selectedStoryId];
      if (!story) throw new Error(`Unknown story book: ${state.selectedStoryId}`);
      const passages = story.passages[diff];
<<<<<<< HEAD
      state.currentPhrase = passages[state.storyChapterProgress % passages.length];
=======
      state.currentPhrase = passages[state.storyLevelProgress % passages.length];
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
      if (typingInput) typingInput.value = "";
      renderWordDisplay();
      return;
    }

    const pool = WORDS[diff] || WORDS["medium"];
<<<<<<< HEAD
    if ((state.mode === "timed" || state.mode === "practice") && diff === "difficult") {
      if (state.difficultSentencesRemaining.length === 0) {
        state.difficultSentencesRemaining = DIFFICULT_SENTENCES.filter(sentence => sentence !== state.lastDifficultSentence);
        for (let index = state.difficultSentencesRemaining.length - 1; index > 0; index--) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [state.difficultSentencesRemaining[index], state.difficultSentencesRemaining[swapIndex]] =
            [state.difficultSentencesRemaining[swapIndex], state.difficultSentencesRemaining[index]];
        }
      }
      state.currentPhrase = state.difficultSentencesRemaining.pop();
      state.lastDifficultSentence = state.currentPhrase;
      if (typingInput) typingInput.value = "";
      renderWordDisplay();
      return;
    }

    if ((state.mode === "timed" || state.mode === "practice") && (diff === "easy" || diff === "medium")) {
      const minWords = diff === "easy" ? 1 : 3;
      const maxWords = diff === "easy" ? 2 : 4;
      if (state.timedWordsRemaining.length < maxWords) {
        const usedWords = new Set(state.timedWordsUsed);
        let nextWords = pool.filter(word => !usedWords.has(word));
        if (nextWords.length < maxWords) {
          const previousPromptWords = new Set(state.lastTimedWords);
          state.timedWordsUsed = [];
          nextWords = pool.filter(word => !previousPromptWords.has(word));
        }
        for (let index = nextWords.length - 1; index > 0; index--) {
          const swapIndex = Math.floor(Math.random() * (index + 1));
          [nextWords[index], nextWords[swapIndex]] = [nextWords[swapIndex], nextWords[index]];
        }
        state.timedWordsRemaining = nextWords;
      }

      const wordCount = minWords + Math.floor(Math.random() * (maxWords - minWords + 1));
      const selection = [];
      while (selection.length < wordCount && state.timedWordsRemaining.length > 0) {
        const word = state.timedWordsRemaining.pop();
        selection.push(word);
        state.lastTimedWord = word;
        state.timedWordsUsed.push(word);
      }
      state.currentPhrase = selection.join(" ");
      state.lastTimedWords = selection;
      if (typingInput) typingInput.value = "";
      renderWordDisplay();
      return;
    }

=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    let selection = [];
    for (let i = 0; i < 4; i++) {
      selection.push(pool[Math.floor(Math.random() * pool.length)]);
    }
    state.currentPhrase = selection.join(" ");
    
    if (typingInput) typingInput.value = "";
    renderWordDisplay();
  }

  function renderWordDisplay() {
    if (!wordDisplay || !typingInput) return;
    const val = typingInput.value;
    let html = "";
<<<<<<< HEAD
    for (let i = 0; i < state.currentPhrase.length; i++) {
      const targetChar = state.currentPhrase[i];
      const typedChar = val[i];
      if (typedChar == null) {
        html += i === val.length ? `<span class="char-current">${targetChar}</span>` : `<span>${targetChar}</span>`;
=======

    for (let i = 0; i < state.currentPhrase.length; i++) {
      const targetChar = state.currentPhrase[i];
      const typedChar = val[i];

      if (typedChar == null) {
        if (i === val.length) {
          html += `<span class="char-current">${targetChar}</span>`;
        } else {
          html += `<span>${targetChar}</span>`;
        }
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
      } else if (typedChar === targetChar) {
        html += `<span class="char-correct">${targetChar}</span>`;
      } else {
        html += `<span class="char-incorrect">${targetChar}</span>`;
      }
    }
<<<<<<< HEAD
    if (state.mode === "story") {
      const book = STORYBOOKS[state.selectedStoryId];
      const difficulty = state.storyChapter <= 4 ? "easy" : state.storyChapter <= 8 ? "medium" : "difficult";
      const passages = book?.passages?.[difficulty] || [];
      const nextOne = passages[(state.storyChapterProgress + 1) % passages.length];
      const upcomingKey = nextOne || "";
      let currentElement = wordDisplay.querySelector(".story-sentence.current");
      let upcomingElement = wordDisplay.querySelector(".story-sentence.upcoming");

      if (!currentElement) {
        currentElement = document.createElement("span");
        currentElement.className = "story-sentence current";
        wordDisplay.appendChild(currentElement);
      }
      currentElement.innerHTML = html;

      if (upcomingKey) {
        if (!upcomingElement) {
          upcomingElement = document.createElement("span");
          upcomingElement.className = "story-sentence upcoming";
          wordDisplay.appendChild(upcomingElement);
        }
        if (upcomingElement.dataset.key !== upcomingKey) {
          upcomingElement.dataset.key = upcomingKey;
          upcomingElement.textContent = upcomingKey;
        }
      } else if (upcomingElement) {
        upcomingElement.remove();
      }
      wordDisplay.scrollTop = 0;
      return;
    }
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
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
        for (let i = 0; i < val.length; i++) {
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

<<<<<<< HEAD
        if (state.mode === "story" && phraseErrors === 0) {
          state.storyChapterProgress++;
          state.storyCompletedPassages++;
          if (state.storyChapterProgress >= 5) {
            state.storyChapterProgress = 0;
            if (state.storyChapter >= state.storyTotalChapters) {
              updateStatsDisplay();
              finishStory(true);
              return;
            }
            state.storyChapter++;
            if (feedbackEl) feedbackEl.textContent = "";
          } else if (feedbackEl) {
            feedbackEl.textContent = "";
=======
        if (state.mode === "story") {
          if (phraseErrors === 0) {
            state.storyLevelProgress++;
            if (state.storyLevelProgress >= 5) {
              state.storyLevel++;
              state.storyLevelProgress = 0;
              const difficulty = state.storyLevel === 2 ? "Medium" : "Difficult";
              if (feedbackEl) feedbackEl.textContent = `Level ${state.storyLevel}! The challenge is now ${difficulty}.`;
            } else if (feedbackEl) {
              feedbackEl.textContent = "Phrase complete. Keep going!";
            }
          } else {
            state.storyLives--;
            if (feedbackEl) {
              feedbackEl.textContent = state.storyLives > 0
                ? `Mistake! ${state.storyLives} ${state.storyLives === 1 ? "life" : "lives"} remaining.`
                : "You have used all your lives.";
            }
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
          }
          saveStoryBest();
        }

        triggerExplosiveEffect(wordDisplay, 40);
<<<<<<< HEAD
=======
        if (state.mode === "story" && state.storyLives <= 0) {
          updateStatsDisplay();
          finishStory(true);
          return;
        }
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
        nextPhrase();
        updateStatsDisplay();
      } else {
        updateStatsDisplay();
      }
    });
  }

  function getTypingTotals() {
    let typedChars = state.typedChars;
    let correctChars = state.correctChars;

    if (typingInput && typingInput.value.length > 0) {
      const currentInput = typingInput.value;
      typedChars += currentInput.length;
      for (let i = 0; i < currentInput.length; i++) {
        if (currentInput[i] === state.currentPhrase[i]) {
          correctChars++;
        }
      }
    }

    return { typedChars, correctChars };
  }

  function updateStatsDisplay() {
    const timeElapsedMin = Math.max((state.durationSeconds - state.timeRemaining) / 60, 0.01);
    const { typedChars, correctChars } = getTypingTotals();
    const wpm = Math.round((state.correctChars / 5) / timeElapsedMin) || 0;
    const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

    if (wpmEl) wpmEl.textContent = wpm;
    if (accuracyEl) accuracyEl.textContent = `${accuracy}%`;
    if (scoreEl) scoreEl.textContent = state.score;

    if (correctCountEl) correctCountEl.textContent = state.correctChars;
    if (incorrectCountEl) incorrectCountEl.textContent = state.incorrectChars;
<<<<<<< HEAD
    if (storyChapterIndicator) storyChapterIndicator.textContent = `Chapter ${state.storyChapter} of ${state.storyTotalChapters}`;
    if (progressBar && state.mode === "story") {
      progressBar.style.width = `${(state.storyChapterProgress / 5) * 100}%`;
=======
    if (storyLevelEl) storyLevelEl.textContent = state.storyLevel;
    if (storyLivesEl) storyLivesEl.textContent = state.storyLives;
    if (storyLevelProgressEl) storyLevelProgressEl.textContent = `${state.storyLevelProgress} / 5`;
    if (progressBar && state.mode === "story") {
      progressBar.style.width = `${(state.storyLevelProgress / 5) * 100}%`;
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    }
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
    if (state.mode === "story") {
      finishStory(false);
      return;
    }

    clearInterval(state.timerId);
    clearInterval(state.countdownIntervalId);
    clearTimeout(state.countdownStartTimeoutId);
    state.timerId = null;
    state.countdownIntervalId = null;
    state.countdownStartTimeoutId = null;
    hideComboHud();
    state.isActive = false;

<<<<<<< HEAD
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - (state.sessionStartedAt || Date.now())) / 1000));
    const timeElapsedMin = Math.max(elapsedSeconds / 60, 1 / 60);
    const { typedChars, correctChars } = getTypingTotals();
    const finalWpm = Math.round((correctChars / 5) / timeElapsedMin) || 0;
=======
    const timeElapsedMin = Math.max(state.durationSeconds / 60, 0.01);
    const { typedChars, correctChars } = getTypingTotals();
    const finalWpm = Math.round((state.correctChars / 5) / timeElapsedMin) || 0;
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    const finalAcc = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

    if (resultWpm) resultWpm.textContent = finalWpm;
    if (resultAccuracy) resultAccuracy.textContent = `${finalAcc}%`;
    if (resultScore) resultScore.textContent = state.score;
<<<<<<< HEAD
    if (resultDifficultyRow) resultDifficultyRow.classList.toggle("hidden", state.mode !== "timed");
    if (resultDifficulty && state.mode === "timed") {
      resultDifficulty.textContent = state.difficulty.toUpperCase();
    }
    if (resultElapsed) resultElapsed.textContent = formatTime(elapsedSeconds);
    if (resultProgress) resultProgress.textContent = `${Math.min(100, Math.round((elapsedSeconds / Math.max(1, state.durationSeconds)) * 100))}%`;
=======
    if (resultDifficulty) resultDifficulty.textContent = state.difficulty.toUpperCase();
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c

    if (state.mode === "timed" || state.mode === "keysmash") {
      saveGameResult({
        playedAt: new Date().toISOString(),
<<<<<<< HEAD
        mode: state.mode,
        difficulty: state.mode === "keysmash" ? "keysmash" : state.difficulty,
=======
        difficulty: state.difficulty,
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
        score: state.score,
        wpm: finalWpm,
        accuracy: finalAcc
      });
    }

    triggerExplosiveEffect(null, 120);
    playSound("finish");
    navigateTo("results");
  }

  function resetGameState() {
    clearInterval(state.timerId);
    clearInterval(state.countdownIntervalId);
    clearTimeout(state.countdownStartTimeoutId);
    state.timerId = null;
    state.countdownIntervalId = null;
    state.countdownStartTimeoutId = null;
    hideComboHud();
    state.isActive = false;
    state.isPaused = false;
<<<<<<< HEAD
    state.practiceKeysmash = false;
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    state.streak = 0;
    if (countdownOverlay) countdownOverlay.classList.add("hidden");
    if (typingInput) {
      typingInput.value = "";
      typingInput.disabled = true;
    }
    document.body.classList.remove("game-session");
    document.body.classList.remove("practice-session");
    document.body.classList.remove("story-session", "story-countdown");
    if (pauseGameBtn) pauseGameBtn.disabled = true;
    if (stopGameBtn) stopGameBtn.disabled = true;
    if (progressBar) progressBar.style.width = "100%";
  }

<<<<<<< HEAD
  function finishStory(completed = false) {
    const wasActive = state.isActive;
=======
  function finishStory(outOfLives) {
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    state.isActive = false;
    state.isPaused = false;
    clearInterval(state.timerId);
    clearInterval(state.countdownIntervalId);
    clearTimeout(state.countdownStartTimeoutId);
<<<<<<< HEAD
    state.timerId = state.countdownIntervalId = state.countdownStartTimeoutId = null;
=======
    state.timerId = null;
    state.countdownIntervalId = null;
    state.countdownStartTimeoutId = null;
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    hideComboHud();
    document.body.classList.remove("game-session", "practice-session", "story-session", "story-countdown");
    if (typingInput) typingInput.disabled = true;
    if (pauseGameBtn) pauseGameBtn.disabled = true;
    if (stopGameBtn) stopGameBtn.disabled = true;
    if (gameStage) gameStage.classList.add("hidden");
    if (pausePanel) pausePanel.classList.add("hidden");
<<<<<<< HEAD
    const elapsedSeconds = Math.max(0, Math.floor((Date.now() - (state.sessionStartedAt || Date.now())) / 1000));
    const { typedChars, correctChars } = getTypingTotals();
    const elapsedMinutes = Math.max(elapsedSeconds / 60, 1 / 60);
    const finalWpm = Math.round((correctChars / 5) / elapsedMinutes) || 0;
    const finalAccuracy = typedChars ? Math.round((correctChars / typedChars) * 100) : 100;
    if (resultWpm) resultWpm.textContent = finalWpm;
    if (resultAccuracy) resultAccuracy.textContent = `${finalAccuracy}%`;
    if (resultScore) resultScore.textContent = state.score;
    if (resultDifficultyRow) resultDifficultyRow.classList.add("hidden");
    if (resultDifficulty) resultDifficulty.textContent = "";
    if (resultElapsed) resultElapsed.textContent = formatTime(elapsedSeconds);
    if (resultProgress) resultProgress.textContent = `${Math.min(100, Math.round((state.storyChapter / state.storyTotalChapters) * 100))}%`;
    if (storyEndTitle) storyEndTitle.textContent = completed ? "You completed the story!" : `You reached Chapter ${state.storyChapter} of ${state.storyTotalChapters}`;
    if (storyEndMessage) storyEndMessage.textContent = completed
      ? `Congratulations! You finished ${STORYBOOKS[state.selectedStoryId]?.title || "the book"}.`
      : `Your session ended after ${formatTime(elapsedSeconds)}. You can resume by starting the story again.`;
    if (storyEndPanel) storyEndPanel.classList.remove("hidden");
    if (wasActive) playSound("finish");
    if (!completed) navigateTo("results");
=======
    if (storyEndTitle) storyEndTitle.textContent = `You reached Level ${state.storyLevel}`;
    if (storyEndMessage) {
      storyEndMessage.textContent = outOfLives
        ? "Your lives are gone, but the journey can begin again."
        : `You ended your journey with ${state.storyLives} ${state.storyLives === 1 ? "life" : "lives"} remaining.`;
    }
    if (storyEndPanel) storyEndPanel.classList.remove("hidden");
    playSound("finish");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
  }

  /* ==========================================================================
     10. PROFILE & SETTINGS SYSTEM
     ========================================================================== */
  function loadGameHistory() {
<<<<<<< HEAD
    const storageKey = getProgressStorageKey("lr_gameHistory");
    if (!storageKey) return [];
    const savedHistory = localStorage.getItem(storageKey);
=======
    const savedHistory = localStorage.getItem("lr_gameHistory");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    if (!savedHistory) return [];

    try {
      const history = JSON.parse(savedHistory);
      if (!Array.isArray(history)) {
        throw new TypeError("Saved game history must be an array.");
      }

      return history.filter(game =>
        game &&
        typeof game.playedAt === "string" &&
        Number.isFinite(Date.parse(game.playedAt)) &&
<<<<<<< HEAD
        ["easy", "medium", "difficult", "keysmash"].includes(game.difficulty) &&
=======
        ["easy", "medium", "difficult"].includes(game.difficulty) &&
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
        Number.isFinite(game.score) &&
        Number.isFinite(game.wpm) &&
        Number.isFinite(game.accuracy)
      ).slice(0, 10);
    } catch (error) {
      console.error("Unable to read saved game history.", error);
      return [];
    }
  }

  function loadStoryBest() {
<<<<<<< HEAD
    const storageKey = getProgressStorageKey("lr_storyBest");
    if (!storageKey) return { level: 0, score: 0 };
    const savedBest = localStorage.getItem(storageKey);
=======
    const savedBest = localStorage.getItem("lr_storyBest");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    if (!savedBest) return { level: 0, score: 0 };

    try {
      const best = JSON.parse(savedBest);
      if (
        !best ||
        !Number.isInteger(best.level) ||
        best.level < 0 ||
        !Number.isFinite(best.score) ||
        best.score < 0
      ) {
        throw new TypeError("Saved Story Mode record has an invalid format.");
      }
      return best;
    } catch (error) {
      console.error("Unable to read saved Story Mode record.", error);
      return { level: 0, score: 0 };
    }
  }

  function saveStoryBest() {
<<<<<<< HEAD
    const storageKey = getProgressStorageKey("lr_storyBest");
    if (!storageKey) return;
    const best = loadStoryBest();
    const updatedBest = {
      level: Math.max(best.level, state.storyChapter),
      score: Math.max(best.score, state.score)
    };
    localStorage.setItem(storageKey, JSON.stringify(updatedBest));
=======
    const best = loadStoryBest();
    const updatedBest = {
      level: Math.max(best.level, state.storyLevel),
      score: Math.max(best.score, state.score)
    };
    localStorage.setItem("lr_storyBest", JSON.stringify(updatedBest));
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    renderStoryBest(updatedBest);
  }

  function renderStoryBest(best = loadStoryBest()) {
    if (profileStoryBestLevel) profileStoryBestLevel.textContent = best.level;
    if (profileStoryBestScore) profileStoryBestScore.textContent = best.score.toLocaleString();
  }

  function summarizeGames(history) {
    return history.reduce((summary, game) => ({
      gamesPlayed: summary.gamesPlayed + 1,
      totalScore: summary.totalScore + game.score,
      totalWpm: summary.totalWpm + game.wpm,
      totalAccuracy: summary.totalAccuracy + game.accuracy,
      bestScore: Math.max(summary.bestScore, game.score),
      bestWpm: Math.max(summary.bestWpm, game.wpm)
    }), {
      gamesPlayed: 0,
      totalScore: 0,
      totalWpm: 0,
      totalAccuracy: 0,
      bestScore: 0,
      bestWpm: 0
    });
  }

  function loadGameSummary(history = loadGameHistory()) {
<<<<<<< HEAD
    const storageKey = getProgressStorageKey("lr_gameSummary");
    if (!storageKey) return summarizeGames(history);
    const savedSummary = localStorage.getItem(storageKey);
=======
    const savedSummary = localStorage.getItem("lr_gameSummary");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    if (!savedSummary) return summarizeGames(history);

    try {
      const summary = JSON.parse(savedSummary);
      const isValid = summary &&
        Number.isInteger(summary.gamesPlayed) &&
        summary.gamesPlayed >= 0 &&
        ["totalScore", "totalWpm", "totalAccuracy", "bestScore", "bestWpm"]
          .every(key => Number.isFinite(summary[key]) && summary[key] >= 0);
      if (!isValid) throw new TypeError("Saved game summary has an invalid format.");
      return summary;
    } catch (error) {
      console.error("Unable to read saved game summary.", error);
      return summarizeGames(history);
    }
  }

  function saveGameResult(game) {
<<<<<<< HEAD
    if (!activeAccount) return;
=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    const previousHistory = loadGameHistory();
    const previousSummary = loadGameSummary(previousHistory);
    const history = [game, ...previousHistory].slice(0, 10);
    const summary = {
      gamesPlayed: previousSummary.gamesPlayed + 1,
      totalScore: previousSummary.totalScore + game.score,
      totalWpm: previousSummary.totalWpm + game.wpm,
      totalAccuracy: previousSummary.totalAccuracy + game.accuracy,
      bestScore: Math.max(previousSummary.bestScore, game.score),
      bestWpm: Math.max(previousSummary.bestWpm, game.wpm)
    };

<<<<<<< HEAD
    localStorage.setItem(getProgressStorageKey("lr_gameHistory"), JSON.stringify(history));
    localStorage.setItem(getProgressStorageKey("lr_gameSummary"), JSON.stringify(summary));
=======
    localStorage.setItem("lr_gameHistory", JSON.stringify(history));
    localStorage.setItem("lr_gameSummary", JSON.stringify(summary));
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    renderProfileStats(history, summary);
  }

  function renderProfileStats(history = loadGameHistory(), summary = loadGameSummary(history)) {
    const gamesPlayed = summary.gamesPlayed;
    const averageWpm = gamesPlayed
      ? Math.round(summary.totalWpm / gamesPlayed)
      : 0;
    const averageAccuracy = gamesPlayed
      ? summary.totalAccuracy / gamesPlayed
      : 0;

    if (profileGamesPlayed) profileGamesPlayed.textContent = gamesPlayed;
    if (profileTotalScore) profileTotalScore.textContent = summary.totalScore.toLocaleString();
    if (profileAverageWpm) profileAverageWpm.textContent = averageWpm;
    if (profileAverageAccuracy) profileAverageAccuracy.textContent = `${averageAccuracy.toFixed(1)}%`;
    if (profileBestScore) profileBestScore.textContent = summary.bestScore.toLocaleString();
    if (profileBestWpm) profileBestWpm.textContent = summary.bestWpm;
<<<<<<< HEAD

    const keysmashGames = history.filter(game => game.mode === "keysmash" || game.difficulty === "keysmash");
    if (profileKeysmashGames) profileKeysmashGames.textContent = keysmashGames.length;
    if (profileKeysmashBestScore) {
      profileKeysmashBestScore.textContent = keysmashGames.reduce((best, game) => Math.max(best, game.score), 0).toLocaleString();
    }
    if (profileKeysmashBestWpm) {
      profileKeysmashBestWpm.textContent = keysmashGames.reduce((best, game) => Math.max(best, game.wpm), 0);
    }

=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    renderStoryBest();

    if (!profileHistory) return;
    profileHistory.replaceChildren();

    if (history.length === 0) {
      const emptyMessage = document.createElement("p");
      emptyMessage.className = "profile-history-empty";
      emptyMessage.textContent = "No timed games played yet. Complete a game to see your results here.";
      profileHistory.appendChild(emptyMessage);
      return;
    }

    const table = document.createElement("table");
    table.className = "profile-history-table";
    const header = table.createTHead().insertRow();
    ["DATE", "DIFFICULTY", "SCORE", "WPM", "ACCURACY"].forEach(label => {
      const cell = document.createElement("th");
      cell.scope = "col";
      cell.textContent = label;
      header.appendChild(cell);
    });

    const body = table.createTBody();
    history.forEach(game => {
      const row = body.insertRow();
      const dateCell = row.insertCell();
      dateCell.textContent = new Date(game.playedAt).toLocaleDateString();
<<<<<<< HEAD
      row.insertCell().textContent = (game.mode === "keysmash" || game.difficulty === "keysmash")
        ? "Keysmash"
        : game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1);
=======
      row.insertCell().textContent = game.difficulty.charAt(0).toUpperCase() + game.difficulty.slice(1);
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
      row.insertCell().textContent = game.score.toLocaleString();
      row.insertCell().textContent = game.wpm;
      row.insertCell().textContent = `${game.accuracy}%`;
    });

    profileHistory.appendChild(table);
  }

  function updateProfileUI() {
<<<<<<< HEAD
    const savedName = typeof state.playerName === "string" ? state.playerName.trim() : "";
    state.playerName = savedName;
    if (playerNameEl) playerNameEl.textContent = savedName || "Not set";
    if (homeGreeting) {
      if (savedName) {
        homeGreeting.textContent = `Welcome Back, ${savedName}!`;
        homeGreeting.classList.remove("hidden");
      } else {
        homeGreeting.textContent = "";
        homeGreeting.classList.add("hidden");
      }
=======
    if (playerNameEl) playerNameEl.textContent = state.playerName;
    if (homeGreeting) {
      homeGreeting.textContent = state.playerName === "Your Name"
        ? "Welcome Back"
        : `Welcome Back, ${state.playerName}!`;
      homeGreeting.classList.remove("hidden");
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    }
  }

  if (editProfileBtn) {
    editProfileBtn.addEventListener("click", () => {
<<<<<<< HEAD
      if (!activeAccount) {
        navigateTo("auth");
        showAuthMessage("Please log in first to add or edit your profile name.", "error");
        return;
      }
      if (profileDisplay) profileDisplay.classList.add("hidden");
      if (profileForm) profileForm.classList.remove("hidden");
      // Start with an empty box so the user can enter a new name directly.
      if (nameInput) {
        nameInput.value = "";
        nameInput.focus();
      }
=======
      if (profileDisplay) profileDisplay.classList.add("hidden");
      if (profileForm) profileForm.classList.remove("hidden");
      if (nameInput) nameInput.value = state.playerName;
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
    });
  }

  if (saveNameBtn) {
    saveNameBtn.addEventListener("click", () => {
<<<<<<< HEAD
      if (!activeAccount) {
        if (profileForm) profileForm.classList.add("hidden");
        if (profileDisplay) profileDisplay.classList.remove("hidden");
        navigateTo("auth");
        showAuthMessage("Please log in first to add or edit your profile name.", "error");
        return;
      }
      const newName = nameInput ? nameInput.value.trim() : "";
      if (!newName) {
        window.alert("Please enter a name before saving.");
        nameInput?.focus();
        return;
      }

      try {
        const accounts = loadAuthAccounts();
        const account = accounts.find(item => item.email === activeAccount.email);
        if (!account) throw new Error("Your account could not be found. Please sign in again.");
        account.name = newName;
        localStorage.setItem(AUTH_ACCOUNTS_KEY, JSON.stringify(accounts));
        activeAccount.name = newName;
        localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(activeAccount));
      } catch (error) {
        console.error("Unable to save the profile name.", error);
        window.alert(error instanceof Error ? error.message : "Unable to save your name. Please try again.");
        return;
      }

      state.playerName = newName;
      localStorage.setItem("lr_playerName", newName);
      updateProfileUI();
      renderAuthPage();
=======
      const newName = nameInput ? nameInput.value.trim() : "";
      state.playerName = newName || "Your Name";
      if (state.playerName === "Your Name") {
        localStorage.removeItem("lr_playerName");
      } else {
        localStorage.setItem("lr_playerName", newName);
      }
      updateProfileUI();
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
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

<<<<<<< HEAD
  function applyLightMode(enabled) {
    document.body.classList.toggle("light-mode", enabled);
    document.documentElement.style.colorScheme = enabled ? "light" : "dark";
    if (lightModeToggle) lightModeToggle.checked = enabled;
  }

  const savedLightMode = localStorage.getItem("lr_lightMode") === "true";
  applyLightMode(savedLightMode);

  if (lightModeToggle) {
    lightModeToggle.addEventListener("change", () => {
      const enabled = lightModeToggle.checked;
      applyLightMode(enabled);
      localStorage.setItem("lr_lightMode", String(enabled));
    });
  }

=======
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
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
    colorControls.forEach(({ input, property, themeKey, hexLabel: hexLabelId }) => {
      if (!input) return;
      input.value = theme[themeKey];
      document.documentElement.style.setProperty(property, theme[themeKey]);
      const hexLabel = document.getElementById(hexLabelId);
      if (hexLabel) hexLabel.textContent = input.value.toUpperCase();
    });
  }

  colorControls.forEach(({ input, property, hexLabel }) => {
    if (!input) return;
    input.addEventListener("input", () => {
      document.documentElement.style.setProperty(property, input.value);
      const label = document.getElementById(hexLabel);
      if (label) label.textContent = input.value.toUpperCase();
      if (appearancePreset) appearancePreset.value = "custom";
    });
  });

  if (resetAppearance) {
    resetAppearance.addEventListener("click", () => {
      if (appearancePreset) appearancePreset.value = "default";
      applyTheme(PRESETS.default);
    });
  }

  /* ==========================================================================
<<<<<<< HEAD
     BACKGROUND MUSIC PLAYER (persists across in-app page navigation)
     ========================================================================== */
  const musicToggle = document.getElementById("musicToggle");
  const musicFile = document.getElementById("musicFile");
  const musicPlayBtn = document.getElementById("musicPlay");
  const musicPauseBtn = document.getElementById("musicPause");
  const musicStopBtn = document.getElementById("musicStop");
  const musicMuteBtn = document.getElementById("musicMute");
  const musicVolume = document.getElementById("musicVolume");
  const musicVolumeLabel = document.getElementById("musicVolumeLabel");
  const musicStatus = document.getElementById("musicStatus");
  const backgroundAudio = document.getElementById("backgroundAudio");
  let localMusicObjectUrl = null;

  function setMusicStatus(message) {
    if (musicStatus) musicStatus.textContent = message;
  }
  function persistMusicSettings() {
    try {
      localStorage.setItem("lr_musicPrefs", JSON.stringify({
        enabled: !!musicToggle?.checked,
        volume: Number(musicVolume?.value ?? 0.35),
        muted: !!backgroundAudio?.muted
      }));
    } catch (error) { console.warn("Music preferences could not be saved.", error); }
  }
  function playBackgroundMusic() {
    if (!backgroundAudio) return;
    if (!backgroundAudio.src) {
      setMusicStatus("Choose a local audio file first.");
      if (musicToggle) musicToggle.checked = false;
      persistMusicSettings();
      return;
    }
    backgroundAudio.play().then(() => {
      setMusicStatus("Playing background music.");
      persistMusicSettings();
    }).catch(() => {
      setMusicStatus("Playback was blocked. Press Play after interacting with the page, or check your browser permissions.");
    });
  }
  if (backgroundAudio) {
    try {
      const prefs = JSON.parse(localStorage.getItem("lr_musicPrefs") || "{}");
      if (musicVolume && Number.isFinite(Number(prefs.volume))) musicVolume.value = String(Math.max(0, Math.min(1, Number(prefs.volume))));
      if (musicVolumeLabel) musicVolumeLabel.textContent = `${Math.round(Number(musicVolume?.value || 0.35) * 100)}%`;
      if (musicToggle) musicToggle.checked = !!prefs.enabled;
      backgroundAudio.volume = Number(musicVolume?.value || 0.35);
      backgroundAudio.muted = !!prefs.muted;
      if (musicMuteBtn) {
        musicMuteBtn.setAttribute("aria-pressed", String(backgroundAudio.muted));
        musicMuteBtn.setAttribute("aria-label", backgroundAudio.muted ? "Unmute background music" : "Mute background music");
        musicMuteBtn.title = backgroundAudio.muted ? "Unmute" : "Mute";
        const icon = musicMuteBtn.querySelector("span[aria-hidden='true']");
        if (icon) icon.textContent = "🔇";
      }
      if (prefs.enabled) setMusicStatus("Music preference restored. Press Play to resume playback after refresh.");
    } catch (error) { console.warn("Music preferences could not be restored.", error); }
  }
  if (musicFile) musicFile.addEventListener("change", () => {
    const file = musicFile.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("audio/") && !/\.(mp3|wav|ogg|oga|m4a|aac|flac)$/i.test(file.name)) {
      setMusicStatus("Unsupported file type. Choose an audio file such as MP3, WAV, or OGG.");
      return;
    }
    if (localMusicObjectUrl) URL.revokeObjectURL(localMusicObjectUrl);
    localMusicObjectUrl = URL.createObjectURL(file);
    backgroundAudio.src = localMusicObjectUrl;
    backgroundAudio.load();
    if (musicToggle) musicToggle.checked = true;
    setMusicStatus(`Selected: ${file.name}. Press Play to start.`);
    persistMusicSettings();
  });
  if (musicToggle) musicToggle.addEventListener("change", () => {
    if (musicToggle.checked) playBackgroundMusic();
    else { backgroundAudio?.pause(); setMusicStatus("Background music is off."); }
    persistMusicSettings();
  });
  if (musicPlayBtn) musicPlayBtn.addEventListener("click", () => {
    if (musicToggle) musicToggle.checked = true;
    playBackgroundMusic();
  });
  if (musicPauseBtn) musicPauseBtn.addEventListener("click", () => {
    backgroundAudio?.pause(); setMusicStatus("Music paused."); persistMusicSettings();
  });
  if (musicStopBtn) musicStopBtn.addEventListener("click", () => {
    if (backgroundAudio) { backgroundAudio.pause(); backgroundAudio.currentTime = 0; }
    setMusicStatus("Music stopped."); persistMusicSettings();
  });
  if (musicMuteBtn) musicMuteBtn.addEventListener("click", () => {
    if (!backgroundAudio) return;
    backgroundAudio.muted = !backgroundAudio.muted;
    const icon = musicMuteBtn.querySelector("span[aria-hidden='true']");
    if (icon) icon.textContent = backgroundAudio.muted ? "�" : "🔇";
    musicMuteBtn.setAttribute("aria-pressed", String(backgroundAudio.muted));
    musicMuteBtn.setAttribute("aria-label", backgroundAudio.muted ? "Unmute background music" : "Mute background music");
    musicMuteBtn.title = backgroundAudio.muted ? "Unmute" : "Mute";
    setMusicStatus(backgroundAudio.muted ? "Music muted." : "Music unmuted.");
    persistMusicSettings();
  });
  if (musicVolume) musicVolume.addEventListener("input", () => {
    if (backgroundAudio) backgroundAudio.volume = Number(musicVolume.value);
    if (musicVolumeLabel) musicVolumeLabel.textContent = `${Math.round(Number(musicVolume.value) * 100)}%`;
    persistMusicSettings();
  });
  if (backgroundAudio) backgroundAudio.addEventListener("error", () => {
    setMusicStatus("This audio could not be played. The URL may not be a direct audio file or the host may block playback.");
  });

  /* ==========================================================================
     11. EVENT BINDINGS
     ========================================================================== */
  storyBookButtons.forEach(button => {
    button.addEventListener("click", (event) => {
      if (event.target.closest("a")) return;
=======
     11. EVENT BINDINGS
     ========================================================================== */
  storyBookButtons.forEach(button => {
    button.addEventListener("click", () => {
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
      const storyId = button.dataset.storybook;
      const story = STORYBOOKS[storyId];
      if (!story) return;

      state.selectedStoryId = storyId;
      storyBookButtons.forEach(bookButton => {
        const isSelected = bookButton === button;
        bookButton.classList.toggle("selected", isSelected);
        bookButton.setAttribute("aria-pressed", String(isSelected));
      });
      if (storySelection) storySelection.textContent = `Selected: ${story.title}`;
      if (storyActiveTitle) storyActiveTitle.textContent = story.title;
    });
  });

  if (gameStartBtn) gameStartBtn.addEventListener("click", startCountdown);
<<<<<<< HEAD
  if (startGameHeroBtn) startGameHeroBtn.addEventListener("click", () => navigateTo("game-menu"));
  if (practiceStartBtn) practiceStartBtn.addEventListener("click", () => {
    state.mode = "practice";
    state.practiceKeysmash = false;
    initiateRound();
  });
=======
  if (startGameHeroBtn) startGameHeroBtn.addEventListener("click", () => navigateTo("game"));
  if (practiceStartBtn) practiceStartBtn.addEventListener("click", () => initiateRound());
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
  if (storyStartBtn) storyStartBtn.addEventListener("click", startStoryMode);
  if (storyRestartBtn) storyRestartBtn.addEventListener("click", startStoryMode);
  if (pauseGameBtn) pauseGameBtn.addEventListener("click", pauseGame);
  if (continueGameBtn) continueGameBtn.addEventListener("click", resumeGame);
  if (stopGameBtn) stopGameBtn.addEventListener("click", endRound);
  if (stopGameBtnModal) stopGameBtnModal.addEventListener("click", endRound);
<<<<<<< HEAD
  const exitToModes = () => {
    state.isActive = false;
    state.isPaused = false;
    resetGameState();
    navigateTo("game-menu");
  };
  if (storyEndExitBtn) storyEndExitBtn.addEventListener("click", exitToModes);
  if (gameModeExitBtn) gameModeExitBtn.addEventListener("click", exitToModes);

  updateProfileUI();
  if (activeAccount) navigateTo("home");
=======

  updateProfileUI();
>>>>>>> fb1f1175ec3f1f866c5a077051f736c7bfd5688c
});