// Log a message to the console to ensure the script is linked correctly
console.log('JavaScript file is linked correctly.');

document.addEventListener('DOMContentLoaded', function() {
const screens = {
splash: document.querySelector('.splash-screen'),
start: document.querySelector('.start-screen'),
howToPlay: document.querySelector('.how-to-play-screen'),
game: document.querySelector('.game-screen'),
gameOver: document.querySelector('.game-over-screen'),
error: document.querySelector('.error-screen')
};
document.getElementById('pause-btn').addEventListener('click', () => {
document.querySelector('.pause-menu').style.display = 'flex';
});
document.getElementById('resume-btn').addEventListener('click', () => {
document.querySelector('.pause-menu').style.display = 'none';
});
function showScreen(screenName) {
Object.values(screens).forEach(screen => {
  screen.classList.remove('active');
  screen.style.display = 'none';
});
screens[screenName].style.display = 'flex';
setTimeout(() => {
  screens[screenName].classList.add('active');
}, 0);
}
function initializeGame() {
showScreen('splash');
document.querySelector('.pollutant-challenge').style.display = 'none';
setTimeout(() => {
showScreen('start');
}, 2000);
}
document.getElementById('start-game-btn').addEventListener('click', () => {
showScreen('game');
});
document.getElementById('how-to-play-btn').addEventListener('click', () => {
showScreen('howToPlay');
});
document.getElementById('back-to-start-btn').addEventListener('click', () => {
showScreen('start');
});
document.getElementById('lets-go-btn').addEventListener('click', () => {
showScreen('game');
});
document.getElementById('return-menu-btn').addEventListener('click', () => {
showScreen('start');
});
document.getElementById('exit-btn').addEventListener('click', () => {
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
document.getElementById('cancel-exit-btn').addEventListener('click', () => {
document.body.removeChild(confirmDialog);
});
document.getElementById('confirm-exit-btn').addEventListener('click', () => {
document.body.removeChild(confirmDialog);
showScreen('start');
document.querySelector('.pause-menu').style.display = 'none';
});
});
initializeGame();
});
