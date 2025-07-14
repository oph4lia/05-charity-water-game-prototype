// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

// Wait until the HTML page is fully loaded
document.addEventListener('DOMContentLoaded', function () {
  // --- Daily Challenge (Wordle-style) ---
  // List of 5-letter words related to charity: water's mission
  const dailyWords = ["water", "clean", "dirty", "human", "wells", "drink", "earth", "thrive", "hope", "girls"];
  let dailyWord = "";
  let dailyGuesses = [];
  let dailyActive = false;

  // Helper to pick a daily word (could be improved to use the date)
  function pickDailyWord() {
    // For simplicity, pick a random word each time (students: you can use the date for a real daily word)
    return dailyWords[Math.floor(Math.random() * dailyWords.length)];
  }

  // Show the daily challenge modal
  function showDailyChallenge() {
    dailyWord = pickDailyWord();
    dailyGuesses = [];
    dailyActive = true;
    // Create modal
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full relative">
        <button class="daily-close-btn absolute top-4 right-4 text-gray-400 hover:text-primary text-2xl font-bold leading-none focus:outline-none" aria-label="Close">&times;</button>
        <h3 class="text-2xl font-bold text-center mb-4">Daily Challenge</h3>
        <p class="text-gray-600 text-center mb-6">Guess the 5-letter word related to clean water!</p>
        <div id="daily-board" class="flex flex-col items-center gap-2 mb-4"></div>
        <div class="flex mb-4">
          <input type="text" maxlength="5" class="custom-input" id="daily-input" placeholder="Enter 5-letter word..." style="text-transform:uppercase;" />
          <button class="ml-3 bg-primary text-white px-6 py-2 !rounded-button hover:bg-blue-600 transition whitespace-nowrap" id="daily-submit-btn">Submit</button>
        </div>
        <div class="text-center text-green-600 font-medium" id="daily-feedback"></div>
        <div class="flex justify-center mt-4">
          <!-- Close button removed, replaced by × icon -->
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    function updateBoard() {
      const board = modal.querySelector('#daily-board');
      board.innerHTML = '';
      for (let guess of dailyGuesses) {
        let row = document.createElement('div');
        row.className = 'flex gap-1';
        for (let i = 0; i < 5; i++) {
          let box = document.createElement('div');
          box.className = 'w-10 h-10 flex items-center justify-center border rounded font-bold text-lg';
          box.textContent = guess.word[i]?.toUpperCase() || '';
          // Color: green = correct, yellow = in word, gray = not in word
          if (guess.result[i] === 'correct') {
            box.style.background = '#4FCB53';
            box.style.color = 'white';
          } else if (guess.result[i] === 'present') {
            box.style.background = '#FFC907';
            box.style.color = '#333';
          } else {
            box.style.background = '#e0e0e0';
            box.style.color = '#888';
          }
          row.appendChild(box);
        }
        board.appendChild(row);
      }
    }

    function checkDailyGuess() {
      const input = modal.querySelector('#daily-input');
      const feedback = modal.querySelector('#daily-feedback');
      let guess = input.value.trim().toLowerCase();
      if (guess.length !== 5) {
        feedback.textContent = 'Please enter a 5-letter word.';
        return;
      }
      // Only allow valid words (students: you can add a real dictionary)
      if (!dailyWords.includes(guess)) {
        feedback.textContent = 'Not a valid word for this game.';
        return;
      }
      // Check guess
      let result = [];
      for (let i = 0; i < 5; i++) {
        if (guess[i] === dailyWord[i]) {
          result.push('correct');
        } else if (dailyWord.includes(guess[i])) {
          result.push('present');
        } else {
          result.push('absent');
        }
      }
      dailyGuesses.push({ word: guess, result });
      updateBoard();
      input.value = '';
      if (guess === dailyWord) {
        feedback.textContent = 'Congratulations! You solved the daily challenge!';
        input.disabled = true;
        modal.querySelector('#daily-submit-btn').disabled = true;
      } else if (dailyGuesses.length >= 6) {
        feedback.textContent = `Out of tries! The word was "${dailyWord.toUpperCase()}".`;
        input.disabled = true;
        modal.querySelector('#daily-submit-btn').disabled = true;
      } else {
        feedback.textContent = '';
      }
    }

    modal.querySelector('#daily-submit-btn').onclick = checkDailyGuess;
    modal.querySelector('#daily-input').onkeydown = function(e) {
      if (e.key === 'Enter') checkDailyGuess();
    };
    // Daily modal close icon
    modal.querySelector('.daily-close-btn').onclick = function() {
      document.body.removeChild(modal);
      dailyActive = false;
    };
    updateBoard();
    modal.querySelector('#daily-input').focus();
  }

  // --- Make an Impact Button (External Link) ---
  function showImpactConfirm() {
    // Show a confirmation modal before redirecting
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full">
        <h3 class="text-xl font-bold text-center mb-4">Leave Wordlingo?</h3>
        <p class="text-gray-600 text-center mb-8">You are about to visit charitywater.org to learn more or donate. Continue?</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="bg-gray-100 text-gray-700 font-semibold py-3 px-6 !rounded-button hover:bg-gray-200 transition whitespace-nowrap" id="impact-cancel-btn">Cancel</button>
          <button class="bg-yellow-500 text-white font-semibold py-3 px-6 !rounded-button hover:bg-yellow-600 transition whitespace-nowrap" id="impact-confirm-btn">Go to charity: water</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#impact-cancel-btn').onclick = function() {
      document.body.removeChild(modal);
    };
    modal.querySelector('#impact-confirm-btn').onclick = function() {
      window.open('https://www.charitywater.org', '_blank');
      document.body.removeChild(modal);
    };
  }
  // Store references to each main screen
  const screens = {
    splash: document.querySelector('.splash-screen'),
    start: document.querySelector('.start-screen'),
    howToPlay: document.querySelector('.how-to-play-screen'),
    game: document.querySelector('.game-screen'),
    gameOver: document.querySelector('.game-over-screen'),
    error: document.querySelector('.error-screen')
  };


  // --- Puzzle Bank ---
  // Each puzzle has a sentence with a blank (use ___), and the correct answer
  const puzzleBank = [
    { sentence: "Clean water is essential for human ___ and well-being.", answer: "health" },
    { sentence: "Every person deserves access to safe ___ to drink.", answer: "water" },
    { sentence: "Children can spend more time in ___ when they have clean water.", answer: "school" },
    { sentence: "Women and girls often walk miles each day to collect ___ water.", answer: "dirty" },
    { sentence: "Charity: water helps build ___ wells in communities in need.", answer: "clean" },
    { sentence: "Access to clean water can break the cycle of ___.", answer: "poverty" },
    { sentence: "Safe water means less ___ and more hope.", answer: "disease" },
    { sentence: "Together, we can make a ___ for families around the world.", answer: "difference" },
    { sentence: "Water is our most precious ___ on Earth.", answer: "resource" },
    { sentence: "With clean water, communities can grow ___ and thrive.", answer: "food" }
  ];
  let usedPuzzleIndexes = [];
  let currentPuzzleIndex = null;

  // --- Game State Variables ---
  let score = 0; // Start score at 0
  let timer = 60; // Timer starts at 60 seconds
  let timerInterval = null;
  let gameActive = false;

  // --- DOM Elements ---
  const scoreDisplay = document.getElementById('score-display');
  let scoreDisplayDesktop = document.getElementById('score-display-desktop');
  const timerDisplay = document.getElementById('timer-display');
  const answerInput = document.getElementById('answer-input');
  const submitAnswerBtn = document.getElementById('submit-answer-btn');
  const feedbackMessage = document.getElementById('feedback-message');
  // Find the puzzle text container (the <p> with the blank)
  const puzzleText = document.querySelector('.game-screen .puzzle-blank')?.parentElement;

  // Keep both score displays in sync (for mobile/desktop switching)
  function updateScoreDisplays() {
    // Re-query in case the DOM changes (e.g. on resize)
    scoreDisplayDesktop = document.getElementById('score-display-desktop');
    if (scoreDisplay) scoreDisplay.textContent = score;
    if (scoreDisplayDesktop) scoreDisplayDesktop.textContent = score;
  }

  // --- Well Progress Bar Elements ---
  // Find the well bar and fill elements on the game screen
  const wellProgress = document.querySelector('.game-screen .well-progress');
  const wellFill = document.querySelector('.game-screen .well-fill');

  // Remove any existing water can image from the well bar
  function removeWaterCanImg() {
    // Remove all water-can-img elements inside the well-progress bar
    const cans = document.querySelectorAll('.game-screen .well-progress .water-can-img');
    cans.forEach(can => can.remove());
  }

  // Helper to show the water can at the top of the vertical bar with animation
  // Show the water can animating along the vertical well bar
  function showWaterCanAtEnd() {
    removeWaterCanImg();
    // Place the can absolutely relative to the well bar's container
    const wellBarContainer = wellProgress?.parentElement;
    if (!wellBarContainer || !wellProgress) return;
    const can = document.createElement('img');
    can.src = 'img/water-can-transparent.png';
    can.alt = 'Water Can';
    can.className = 'water-can-img';
    can.style.position = 'absolute';
    can.style.opacity = '0';
    can.style.transform = 'rotate(-30deg) scale(1.2)';
    can.style.transition = 'opacity 0.3s, top 0.7s cubic-bezier(0.4,0,0.2,1), transform 0.7s cubic-bezier(0.4,0,0.2,1)';
    can.style.zIndex = '20';
    // Make sure the container is positioned
    wellBarContainer.style.position = 'relative';

    // Calculate the vertical position for the can
    const barRect = wellProgress.getBoundingClientRect();
    const containerRect = wellBarContainer.getBoundingClientRect();
    const barHeight = barRect.height;
    const canHeight = Math.min(48, barHeight * 0.4); // Responsive can height
    can.style.width = `${canHeight}px`;
    can.style.height = `${canHeight}px`;
    
    // The can should animate from the current fill position to the new fill position
    const percent = Math.max(0, Math.min(100, wellProgressPercent));
    const barTopInContainer = barRect.top - containerRect.top;
    const barLeftInContainer = barRect.left - containerRect.left;
    // Calculate the previous fill percent (before increment)
    let prevPercent = percent - (100 / maxWellProgress);
    if (prevPercent < 0) prevPercent = 0;
    // Start at the previous fill position
    const startTop = barTopInContainer + (barHeight - canHeight) * (1 - prevPercent / 100);
    // End at the new fill position
    const endTop = barTopInContainer + (barHeight - canHeight) * (1 - percent / 100);
    // Place the can closer to the bar (overlapping by responsive amount)
    const overlap = Math.min(8, wellProgress.offsetWidth * 0.25);
    const canLeft = barLeftInContainer + wellProgress.offsetWidth - overlap;

    // Set initial position (before fade in)
    can.style.left = `${canLeft}px`;
    can.style.top = `${startTop}px`;

    wellBarContainer.appendChild(can);

    // Fade in and animate to the new top position
    setTimeout(() => {
      can.style.opacity = '1';
      can.style.top = `${endTop}px`;
      can.style.transform = 'rotate(0deg) scale(1.35)';
    }, 50);
    // After a short time, fade out
    setTimeout(() => {
      can.style.opacity = '0';
    }, 1000);
    // Remove from DOM after fade out
    setTimeout(() => {
      can.remove();
    }, 1400);
  }

  // --- Power-Up State ---
  // Track how many of each power-up the player has
  let powerUps = { hint: 0, time: 0, purify: 0 };

  // --- Well Progress State ---
  // The well fills as the player gets correct answers
  let wellProgressPercent = 0; // 0 to 100
  // Randomize maxWellProgress between 2, 3, or 4 each game start
  let maxWellProgress = 3; // Will be set at game start

  // Helper to update the well bar
  function setWellProgress(percent) {
    // Clamp percent between 0 and 100
    percent = Math.max(0, Math.min(100, percent));
    // Animate the blue bar
    if (wellFill) {
      wellFill.style.height = `${percent}%`;
    }
  }

  // Helper to increment the well bar when a correct answer is given
  function incrementWellProgress() {
    // Each correct answer fills 1 step
    wellProgressPercent += 100 / maxWellProgress;
    if (wellProgressPercent > 100) wellProgressPercent = 100;
    setWellProgress(wellProgressPercent);
    // Show the water can at the end of the bar with animation
    showWaterCanAtEnd();
    // If the well is now full, trigger a random event and reset the well
    if (wellProgressPercent >= 100) {
      if (gameMode === 'classic') {
        // Pause the timer and game while modal is up
        gameActive = false;
        clearInterval(timerInterval);
        setTimeout(() => {
          showClassicLevelCompleteModal();
        }, 800);
      } else {
        // 50% chance for power-up, 50% for pollution level
        if (Math.random() < 0.5) {
          giveRandomPowerUp();
        } else {
          triggerPollutionLevel();
        }
        // Reset the well so the user has to fill it again
        setTimeout(() => {
          wellProgressPercent = 0;
          setWellProgress(wellProgressPercent);
          removeWaterCanImg();
        }, 1200); // Wait for the water can animation to finish
      }
    }
  }

  // Helper to reset the well bar
  function resetWellProgress() {
    wellProgressPercent = 0;
    setWellProgress(wellProgressPercent);
    removeWaterCanImg();
  }

  // --- Timer Functions ---
  function startTimer() {
    // Clear any previous timer
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      if (!gameActive) return;
      timer--;
      updateTimerDisplay();
      if (timer <= 0) {
        timer = 0;
        updateTimerDisplay();
        endGame();
      }
    }, 1000);
  }

  function updateTimerDisplay() {
    // Format as M:SS
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  }

  // --- Score Functions ---
  function addScore(points) {
    score += points;
    updateScoreDisplays();
  }

  // --- Game Control Functions ---
  function startGame(mode = 'ultimate') {
    score = 0;
    classicLevel = 1;
    if (mode === 'classic') {
      timer = 20;
    } else {
      timer = 60;
    }
    gameActive = true;
    usedPuzzleIndexes = [];
    // Randomize maxWellProgress between 2 and 4 (inclusive) at the start of each game
    maxWellProgress = Math.floor(Math.random() * 3) + 2; // 2, 3, or 4
    // Start with 5 hints, 2 time power-ups, and 1 purify power-up
    powerUps = { hint: 5, time: 2, purify: 1 };
    updatePowerUpUI();
    currentPuzzleIndex = getRandomPuzzleIndex();
    updateTimerDisplay();
    updateScoreDisplays(); // Reset both displays
    feedbackMessage.textContent = '';
    showPuzzle(currentPuzzleIndex);
    resetWellProgress(); // Reset the well bar at the start
    startTimer();
    
    // Check logo overflow after game starts
    setTimeout(checkLogoOverflow, 200);
  }

  function endGame(reason) {
    gameActive = false;
    clearInterval(timerInterval);
    // If reason is 'completed', show a congratulatory modal
    if (reason === 'completed') {
      showCompletionModal();
    } else if (reason === 'classic-exit') {
      showScreen('start');
    } else {
      feedbackMessage.textContent = 'Time is up!';
      // Optionally, show game over screen here
    }
  }

  // Show the level complete modal in classic mode
  function showClassicLevelCompleteModal() {
    // Create modal overlay
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center relative">
        <h3 class="text-2xl font-bold mb-4">Level ${classicLevel} Complete!</h3>
        <p class="text-gray-700 mb-6">You filled the well!<br>Score: <span class="font-semibold">${score}</span></p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-2">
          <button class="bg-primary text-white font-semibold py-3 px-6 !rounded-button hover:bg-blue-600 transition whitespace-nowrap" id="classic-continue-btn">Continue</button>
          <button class="bg-gray-100 text-gray-700 font-semibold py-3 px-6 !rounded-button hover:bg-gray-200 transition whitespace-nowrap" id="classic-exit-btn">Exit</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    // Continue: reset well, timer, resume game
    document.getElementById('classic-continue-btn').onclick = function() {
      document.body.removeChild(modal);
      classicLevel++;
      timer = 20;
      wellProgressPercent = 0;
      setWellProgress(wellProgressPercent);
      removeWaterCanImg();
      updateTimerDisplay();
      gameActive = true;
      startTimer();
    };

    // Exit: end game
    document.getElementById('classic-exit-btn').onclick = function() {
      document.body.removeChild(modal);
      endGame('classic-exit');
    };
  }

  // Show a congratulatory modal when all puzzles are completed
  function showCompletionModal() {
    // Create modal
    let modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    modal.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center" style="position:relative;overflow:hidden;">
        <div id="confetti-canvas-container" style="position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:1;"></div>
        <h2 class="text-3xl font-bold mb-4 text-primary" style="position:relative;z-index:2;">Congratulations!</h2>
        <p class="text-lg text-gray-700 mb-6" style="position:relative;z-index:2;">You completed all the puzzles and learned about the importance of clean water! Thank you for your commitment to making a difference with charity: water.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4 mb-4" style="position:relative;z-index:2;">
          <button class="bg-yellow-500 text-white font-semibold py-3 px-6 !rounded-button hover:bg-yellow-600 transition whitespace-nowrap" id="visit-charitywater-btn">Visit charity: water</button>
          <button class="bg-gray-100 text-gray-700 font-semibold py-3 px-6 !rounded-button hover:bg-gray-200 transition whitespace-nowrap" id="exit-game-btn">Exit Game</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    // Confetti animation (simple DOM-based for beginners)
    function launchConfetti() {
      const container = modal.querySelector('#confetti-canvas-container');
      for (let i = 0; i < 60; i++) {
        const conf = document.createElement('div');
        // Random color from a water/charity: water palette
        const colors = ['#1fb6ff', '#FFC907', '#2E9DF7', '#8BD1CB', '#4FCB53', '#FF902A', '#F5402C'];
        conf.style.background = colors[Math.floor(Math.random() * colors.length)];
        conf.style.position = 'absolute';
        conf.style.width = `${Math.random() * 8 + 6}px`;
        conf.style.height = `${Math.random() * 16 + 8}px`;
        conf.style.left = `${Math.random() * 100}%`;
        conf.style.top = '-30px';
        conf.style.opacity = '0.85';
        conf.style.borderRadius = '2px';
        conf.style.transform = `rotate(${Math.random() * 360}deg)`;
        conf.style.zIndex = '2';
        // Animate falling
        const duration = Math.random() * 1.2 + 1.8; // 1.8s to 3s
        const delay = Math.random() * 0.5;
        conf.animate([
          { top: '-30px', opacity: 0.85 },
          { top: `${Math.random() * 60 + 60}%`, opacity: 1 },
          { top: '110%', opacity: 0.2 }
        ], {
          duration: duration * 1000,
          delay: delay * 1000,
          easing: 'cubic-bezier(0.4,0,0.2,1)',
          fill: 'forwards'
        });
        setTimeout(() => { container.removeChild(conf); }, (duration + delay) * 1000);
        container.appendChild(conf);
      }
    }
    launchConfetti();
    // Visit charity: water
    modal.querySelector('#visit-charitywater-btn').onclick = function() {
      window.open('https://www.charitywater.org', '_blank');
      document.body.removeChild(modal);
    };
    // Exit game
    modal.querySelector('#exit-game-btn').onclick = function() {
      document.body.removeChild(modal);
      // Return to start screen
      showScreen('start');
    };
  }

  // --- Answer Checking (Simple Example) ---
  // For now, let's assume the correct answer is 'health' for the demo puzzle
  function checkAnswer() {
    if (!gameActive) return;
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = puzzleBank[currentPuzzleIndex].answer.toLowerCase();
    if (userAnswer === correctAnswer) {
      addScore(20); // Add 20 points for correct answer
      feedbackMessage.textContent = 'Correct! +20 points';
      answerInput.value = '';
      usedPuzzleIndexes.push(currentPuzzleIndex);
      // Animate the well bar and water can
      incrementWellProgress();
      // Pick a new random puzzle that hasn't been used
      const nextIndex = getRandomPuzzleIndex();
      if (nextIndex !== null) {
        currentPuzzleIndex = nextIndex;
        showPuzzle(currentPuzzleIndex);
      } else {
        feedbackMessage.textContent = 'You finished all puzzles!';
        // Fill the well to 100% if not already
        setWellProgress(100);
        endGame('completed');
      }
    } else {
      feedbackMessage.textContent = 'Try again!';
    }
  }

  // --- Event Listeners for Game ---
  if (submitAnswerBtn && answerInput) {
    submitAnswerBtn.addEventListener('click', checkAnswer);
    answerInput.addEventListener('keydown', function(e) {
      if (e.key === 'Enter') {
        checkAnswer();
      }
    });
  }

  // Show the pause menu when pause button is clicked
  document.getElementById('pause-btn').addEventListener('click', () => {
    document.querySelector('.pause-menu').style.display = 'flex';
    gameActive = false; // Pause the timer
  });

  // Hide the pause menu when resume button is clicked
  document.getElementById('resume-btn').addEventListener('click', () => {
    document.querySelector('.pause-menu').style.display = 'none';
    gameActive = true; // Resume the timer
  });

  // Restart Level button: restarts the game with a new random puzzle
  document.getElementById('restart-btn').addEventListener('click', () => {
    document.querySelector('.pause-menu').style.display = 'none';
    showScreen('game');
    startGame(); // This resets timer, score, and picks a new puzzle
  });

  // How to Play button: go to how-to-play screen from pause menu
  document.getElementById('how-to-play-pause-btn').addEventListener('click', () => {
    document.querySelector('.pause-menu').style.display = 'none';
    showScreen('howToPlay');
  });

  // Function to show only the selected screen
  function showScreen(screenName) {
    Object.values(screens).forEach(screen => {
      screen.classList.remove('active');
      screen.style.display = 'none';
    });
    screens[screenName].style.display = 'flex';
    setTimeout(() => {
      screens[screenName].classList.add('active');
    }, 0);
    
    // Check logo overflow when showing game screen
    if (screenName === 'game') {
      setTimeout(checkLogoOverflow, 100);
    }
  }

  // Function to start the game by showing the splash, then start screen
  function initializeGame() {
    showScreen('splash');
    document.querySelector('.pollutant-challenge').style.display = 'none';
    setTimeout(() => {
      showScreen('start');
    }, 2000); // Show splash for 2 seconds
  }


  // --- Title Screen Button Event Listeners ---
  // Start Game
  document.getElementById('start-game-btn').addEventListener('click', () => {
    // Show the mode selection modal
    document.getElementById('mode-select-modal').style.display = 'flex';
  });

  // Mode selection modal logic
  let gameMode = 'ultimate'; // default
  let classicLevel = 1;
  document.getElementById('classic-mode-btn').addEventListener('click', () => {
    gameMode = 'classic';
    document.getElementById('mode-select-modal').style.display = 'none';
    showScreen('game');
    startGame('classic');
  });
  document.getElementById('ultimate-mode-btn').addEventListener('click', () => {
    gameMode = 'ultimate';
    document.getElementById('mode-select-modal').style.display = 'none';
    showScreen('game');
    startGame('ultimate');
  });
  document.getElementById('close-mode-modal').addEventListener('click', () => {
    document.getElementById('mode-select-modal').style.display = 'none';
  });

  // How to Play close icon logic
  const closeHowToPlayBtn = document.getElementById('close-how-to-play');
  function showHowToPlayCloseIcon(show) {
    if (show) {
      closeHowToPlayBtn.style.display = 'block';
    } else {
      closeHowToPlayBtn.style.display = 'none';
    }
  }
  closeHowToPlayBtn.addEventListener('click', () => {
    showHowToPlayCloseIcon(false);
    showScreen('start');
  });

  // Show/hide close icon when switching screens
  const originalShowScreen = showScreen;
  showScreen = function(screenName) {
    originalShowScreen(screenName);
    if (screenName === 'howToPlay') {
      showHowToPlayCloseIcon(true);
    } else {
      showHowToPlayCloseIcon(false);
    }
  };

  // How to Play
  document.getElementById('how-to-play-btn').addEventListener('click', () => {
    showScreen('howToPlay');
  });
  // Daily Challenge (first card)
  const dailyCard = document.querySelectorAll('.start-screen .grid > div')[0];
  if (dailyCard) {
    dailyCard.style.cursor = 'pointer';
    dailyCard.onclick = showDailyChallenge;
  }
  // Make an Impact (second card)
  const impactCard = document.querySelectorAll('.start-screen .grid > div')[1];
  if (impactCard) {
    impactCard.style.cursor = 'pointer';
    impactCard.onclick = showImpactConfirm;
  }

  document.getElementById('lets-go-btn').addEventListener('click', () => {
    showScreen('game');
    startGame();
  });

  document.getElementById('return-menu-btn').addEventListener('click', () => {
    showScreen('start');
  });

  // Exit game confirmation dialog
  document.getElementById('exit-btn').addEventListener('click', () => {
    // Create a simple confirmation dialog
    const confirmDialog = document.createElement('div');
    confirmDialog.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
    confirmDialog.innerHTML = `
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-sm w-full mx-4">
        <h3 class="text-xl font-bold text-center mb-4">Exit Game</h3>
        <p class="text-gray-600 text-center mb-8">Are you sure you want to exit? Your current progress will be lost.</p>
        <div class="flex flex-col sm:flex-row justify-center gap-4">
          <button class="bg-gray-100 text-gray-700 font-semibold py-3 px-6 !rounded-button hover:bg-gray-200 transition whitespace-nowrap" id="cancel-exit-btn">
            Cancel
          </button>
          <button class="bg-red-500 text-white font-semibold py-3 px-6 !rounded-button hover:bg-red-600 transition whitespace-nowrap" id="confirm-exit-btn">
            Exit Game
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(confirmDialog);

    // Cancel button closes the dialog
    document.getElementById('cancel-exit-btn').addEventListener('click', () => {
      document.body.removeChild(confirmDialog);
    });

    // Confirm button exits to start screen and closes pause menu
    document.getElementById('confirm-exit-btn').addEventListener('click', () => {
      document.body.removeChild(confirmDialog);
      showScreen('start');
      document.querySelector('.pause-menu').style.display = 'none';
    });
  });

  // --- Puzzle Navigation Functions ---
  function getRandomPuzzleIndex() {
    if (usedPuzzleIndexes.length >= puzzleBank.length) {
      return null; // All puzzles used
    }
    let idx;
    do {
      idx = Math.floor(Math.random() * puzzleBank.length);
    } while (usedPuzzleIndexes.includes(idx));
    return idx;
  }

  function showPuzzle(index) {
    const puzzle = puzzleBank[index];
    if (!puzzleText) return;
    const html = puzzle.sentence.replace('___', '<span class="puzzle-blank"></span>');
    puzzleText.innerHTML = html;
  }

  // --- Well Progress Bar Styles ---
  // Make the well bar vertical
  if (wellProgress && wellFill) {
    wellProgress.style.width = '32px';
    wellProgress.style.height = '120px';
    wellProgress.style.display = 'flex';
    wellProgress.style.flexDirection = 'column-reverse';
    wellFill.style.width = '100%';
    wellFill.style.height = '0%';
    wellFill.style.transition = 'height 0.5s cubic-bezier(0.4,0,0.2,1)';
  }

  // --- Power-Up UI ---
  // Show the number of each power-up (students: you can improve this UI!)
  function updatePowerUpUI() {
    // Update the number next to each power-up image and name
    const hintCount = document.getElementById('hint-count');
    const timeCount = document.getElementById('time-count');
    const purifyCount = document.getElementById('purify-count');
    if (hintCount) hintCount.textContent = powerUps.hint;
    if (timeCount) timeCount.textContent = powerUps.time;
    if (purifyCount) purifyCount.textContent = powerUps.purify;
  }

  // --- Power-Up Logic ---
  // Give a random power-up
  function giveRandomPowerUp() {
    // 0 = hint, 1 = time, 2 = purify
    const type = Math.floor(Math.random() * 3);
    if (type === 0) {
      powerUps.hint++;
      feedbackMessage.textContent = 'You gained a Hint power-up!';
    } else if (type === 1) {
      powerUps.time++;
      feedbackMessage.textContent = 'You gained a +10s power-up!';
    } else {
      powerUps.purify++;
      feedbackMessage.textContent = 'You gained a Purify power-up!';
    }
    updatePowerUpUI();
  }

  // --- Pollution Level Logic ---
  // Scramble a puzzle sentence for the pollution level
  function scrambleSentence(sentence) {
    // Simple scramble: shuffle letters in each word (students: you can make this harder!)
    return sentence.split(' ').map(word => {
      if (word.length <= 3 || word === '___') return word;
      let arr = word.split('');
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
      }
      return arr.join('');
    }).join(' ');
  }

  // Show the pollution challenge overlay
  function triggerPollutionLevel() {
    if (gameMode === 'classic') return; // No pollutant in classic mode
    // Pick a random puzzle
    const idx = getRandomPuzzleIndex();
    if (idx === null) return; // fallback
    const puzzle = puzzleBank[idx];
    // Scramble the sentence
    const scrambled = scrambleSentence(puzzle.sentence);
    // Show the overlay
    const overlay = document.querySelector('.pollutant-challenge');
    overlay.style.display = 'flex';
    // Set the scrambled puzzle text
    const puzzleText = overlay.querySelector('#pollutant-puzzle-text');
    puzzleText.textContent = scrambled;
    // Clear previous feedback
    overlay.querySelector('#pollutant-feedback-message').textContent = '';
    // Set up timer (15 seconds)
    let polluteTime = 15;
    const polluteTimer = overlay.querySelector('#pollutant-timer');
    polluteTimer.textContent = `0:${polluteTime < 10 ? '0' : ''}${polluteTime}`;
    let polluteInterval = setInterval(() => {
      polluteTime--;
      polluteTimer.textContent = `0:${polluteTime < 10 ? '0' : ''}${polluteTime}`;
      if (polluteTime <= 0) {
        clearInterval(polluteInterval);
        overlay.querySelector('#pollutant-feedback-message').textContent = 'Time is up!';
        setTimeout(() => { overlay.style.display = 'none'; }, 1200);
      }
    }, 1000);

    // Handle answer submission
    function checkPollutantAnswer() {
      const userAnswer = overlay.querySelector('#pollutant-answer-input').value.trim().toLowerCase();
      const correctAnswer = puzzle.answer.toLowerCase();
      if (userAnswer === correctAnswer) {
        overlay.querySelector('#pollutant-feedback-message').textContent = 'Correct! You cleared the pollution!';
        clearInterval(polluteInterval);
        setTimeout(() => { overlay.style.display = 'none'; }, 1200);
      } else {
        overlay.querySelector('#pollutant-feedback-message').textContent = 'Try again!';
      }
    }
    overlay.querySelector('#pollutant-submit-answer-btn').onclick = checkPollutantAnswer;
    overlay.querySelector('#pollutant-answer-input').onkeydown = function(e) {
      if (e.key === 'Enter') checkPollutantAnswer();
    };

    // Purify button logic (only in this modal)
    overlay.querySelector('#pollutant-purify-btn').onclick = function() {
      if (powerUps.purify > 0) {
        powerUps.purify--;
        updatePowerUpUI();
        overlay.querySelector('#pollutant-feedback-message').textContent = 'Purify used! Pollution removed.';
        clearInterval(polluteInterval);
        setTimeout(() => { overlay.style.display = 'none'; }, 1200);
      } else {
        overlay.querySelector('#pollutant-feedback-message').textContent = 'No Purify power-up available!';
      }
    };
    // Update purify count in modal
    const purifyCount = overlay.querySelector('#purify-count');
    if (purifyCount) purifyCount.textContent = powerUps.purify;
  }

  // --- Power-Up Button Listeners ---
  // Hint button
  if (document.getElementById('hint-btn')) {
    document.getElementById('hint-btn').onclick = function() {
      if (powerUps.hint > 0) {
        powerUps.hint--;
        updatePowerUpUI();
        feedbackMessage.textContent = 'Hint: The answer starts with "' + puzzleBank[currentPuzzleIndex].answer[0] + '".';
      } else {
        feedbackMessage.textContent = 'No Hint power-up available!';
      }
    };
  }
  // Time button
  if (document.getElementById('time-btn')) {
    document.getElementById('time-btn').onclick = function() {
      if (powerUps.time > 0) {
        powerUps.time--;
        timer += 10;
        updateTimerDisplay();
        updatePowerUpUI();
        feedbackMessage.textContent = '+10 seconds added!';
      } else {
        feedbackMessage.textContent = 'No +10s power-up available!';
      }
    };
  }
  // Purify button (does nothing unless in pollution level)
  if (document.getElementById('purify-btn')) {
    document.getElementById('purify-btn').onclick = function() {
      feedbackMessage.textContent = 'Use Purify during a pollution challenge!';
    };
  }

  // Function to check if the logo would overflow and switch to droplet if needed
  function checkLogoOverflow() {
    const logoElement = document.querySelector('.wordlingo-desktop');
    const headerContainer = document.querySelector('.game-screen .max-w-4xl');
    const dropletContainer = document.querySelector('.game-screen .hidden.sm\\:flex.items-center span:last-child');
    
    if (!logoElement || !headerContainer) return;
    
    // Check if the logo would cause horizontal overflow
    const logoRect = logoElement.getBoundingClientRect();
    const containerRect = headerContainer.getBoundingClientRect();
    const logoWidth = logoRect.width;
    const availableWidth = containerRect.width * 0.25; // Reserve 25% of header width for logo
    
    if (logoWidth > availableWidth) {
      // Hide the text logo and show droplet
      logoElement.style.opacity = '0';
      setTimeout(() => {
        logoElement.style.display = 'none';
      }, 300);
      
      if (dropletContainer) {
        dropletContainer.style.display = 'flex';
        dropletContainer.style.fontSize = '1.5rem';
        dropletContainer.style.width = 'auto';
        dropletContainer.style.height = 'auto';
        dropletContainer.style.padding = '0.5rem';
        dropletContainer.style.borderRadius = '50%';
        dropletContainer.style.backgroundColor = 'rgba(31, 182, 255, 0.1)';
        dropletContainer.style.transition = 'all 0.3s ease';
        dropletContainer.style.opacity = '0';
        setTimeout(() => {
          dropletContainer.style.opacity = '1';
        }, 50);
      }
    } else {
      // Show the text logo and hide droplet
      if (dropletContainer) {
        dropletContainer.style.opacity = '0';
        setTimeout(() => {
          dropletContainer.style.display = 'none';
        }, 300);
      }
      
      logoElement.style.display = 'inline-block';
      setTimeout(() => {
        logoElement.style.opacity = '1';
      }, 50);
    }
  }

  // Add resize listener to check logo overflow on window resize
  window.addEventListener('resize', () => {
    if (document.querySelector('.game-screen.active')) {
      checkLogoOverflow();
    }
  });

  // Start the game when the page loads
  initializeGame();
});
