// 1. Playlist: replace these with your actual file paths/URLs
    const audioFiles = ['./songs/bringYourself.mp3', './songs/holdYourHeadHigh.mp3', './songs/keepMeHere.mp3', './songs/sellYourself.mp3'];

    // 2. DOM refs
    const player = document.getElementById('player');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const playPauseBtn = document.getElementById('play-pause');
    const list = document.getElementById('track-list');

    // 3. Current track index (starts at 0)
    let currentIndex = 0;

    // 4. Render track list (simple: shows "1. song1.mp3", etc.)
    function renderList() {
      list.innerHTML = ''; // clear
      audioFiles.forEach((url, i) => {
        const filename = url.split('/').pop(); // e.g., "song1.mp3"
        const li = document.createElement('li');
        li.innerHTML = `${i + 1}. ${filename}`; // "1. song1.mp3"
        list.appendChild(li);
      });
    }

    // 5. Load current track into the <audio> element
    function loadCurrent() {
      player.src = audioFiles[currentIndex];
      player.load(); // required after changing src
    }

    // 6. Initial setup
    renderList();
    loadCurrent();

    // 7. Button actions (tiny logic)
    prevBtn.onclick = () => {
      currentIndex = (currentIndex - 1 + audioFiles.length) % audioFiles.length;
      loadCurrent();
    };

    nextBtn.onclick = () => {
      currentIndex = (currentIndex + 1) % audioFiles.length;
      loadCurrent();
    };

    playPauseBtn.onclick = () => {
      // Toggle play/pause (browser handles the actual play state)
      player.paused = !player.paused;
      playPauseBtn.textContent = player.paused ? 'Play' : 'Pause';
    };

    // Optional: auto-advance to next after current ends (uncomment if wanted)
    player.addEventListener('ended', () => {
      currentIndex = (currentIndex + 1) % audioFiles.length;
      loadCurrent();
    });