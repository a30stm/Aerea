const audioFiles = ['audio/test.mp3']; // ← replace ONLY this if you use different filenames

// Get DOM elements (same IDs as HTML)
const playlistContainer = document.getElementById('playlist-container');

// Create simple list (optional but shown; matches earlier behavior)
const list = document.createElement('ul');
list.id = 'track-list';
playlistContainer.appendChild(list);

// Helper: update list items
function updateList() {
  list.innerHTML = ''; // clear
  audioFiles.forEach((file, i) => {
    const li = document.createElement('li');
    li.textContent = (i + 1) + '. ' + file.replace('audio/', ''); // show "test.mp3", not
"audio/test.mp3"
    list.appendChild(li);
  });
}

// Player element (same as before)
const player = document.createElement('audio');
player.id = 'audio-player';
playlistContainer.appendChild(player);

// Initial list
updateList();

// Button handlers (same logic)
const prevBtn = document.createElement('button');
prevBtn.textContent = 'Prev';
playlistContainer.appendChild(prevBtn);

const nextBtn = document.createElement('button');
nextBtn.textContent = 'Next';
playlistContainer.appendChild(nextBtn);

const playPauseBtn = document.createElement('button');
playPauseBtn.textContent = 'Play';
playlistContainer.appendChild(playPauseBtn);

let currentIndex = 0;

function loadCurrentFile() {
  player.src = audioFiles[currentIndex];
  player.load(); // REQUIRED: reload the file
}

loadCurrentFile(); // load first file

// Prev button
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
  loadCurrentFile();
  updateList();
});

// Next button
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % audioFiles.length;
  loadCurrentFile();
  updateList();
});

// Play/Pause button
playPauseBtn.addEventListener('click', () => {
  player.paused ? player.play() : player.pause();
  playPauseBtn.textContent = player.paused ? 'Play' : 'Pause';
});

// Optional: auto-advance on end (uncomment if wanted)
player.addEventListener('ended', () => {
  currentIndex = (currentIndex + 1) % audioFiles.length;
  loadCurrentFile();
  updateList();
});