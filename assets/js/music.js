document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.getElementById('startOverlay');

  const toggleBtn = document.getElementById('toggleBtn');
  const nextBtn   = document.getElementById('nextBtn');
  const playerState = document.getElementById('playerState');
  const trackTitle = document.getElementById('trackTitle');
  const volumeControl = document.getElementById('volumeControl');

  const audio = new Audio();
  const tracks = [
    "assets/music/Gangnam Style - PSY.ogg",
    "assets/music/Mandanga Style - DJ Theo.mp3",
    "assets/music/GTG - Shotgun Willy.mp3",
    "assets/music/Breakdance - Shotgun Willy.mp3",
    "assets/music/Humpty Dumpty - Shotgun Willy.mp3",
    "assets/music/Apatrullando La Ciudad - El Fary.mp3",
    "assets/music/Danza Kuduro - Don Omar.mp3",
    "assets/music/Vamos a la Playa - Loona.mp3",
    "assets/music/You Spin Me Round - Dead Or Alive.mp3",
    "assets/music/We Like To Party - The Vengabus.mp3",
    "assets/music/Mr. Money Bags - Shotgun Willy.mp3",
    "assets/music/Bombs Away - Shotgun Willy.mp3",
    "assets/music/So What？ - Shotgun Willy.mp3",
    "assets/music/Winnebago - Shotgun Willy.mp3",
    "assets/music/Danny Devito - Shotgun Willy.mp3",
    "assets/music/Blue Clues - Shotgun Willy.mp3",
    "assets/music/Respected Man - Shotgun Willy.mp3"
  ];

  let currentIndex = Math.floor(Math.random() * tracks.length);

  function loadTrack(i){
    if(!tracks[i]) return;
    audio.src = tracks[i];
    const fileName = tracks[i].split('/').pop().replace(/\.[^/.]+$/, "");
    if(trackTitle) trackTitle.textContent = fileName;
  }

  loadTrack(currentIndex);
  audio.loop = true;
  audio.preload = 'auto';
  audio.volume = 0.5;
  if(volumeControl) volumeControl.value = audio.volume;

  function tryAutoplay(){
    const p = audio.play();
    if(p && typeof p.then === "function"){
      p.then(() => {
        if(playerState && toggleBtn){
          playerState.textContent = "Reproduciendo";
          toggleBtn.textContent = "⏸";
        }
      }).catch(() => {
        if(playerState && toggleBtn){
          playerState.textContent = "Autoplay bloqueado — toca ▶";
          toggleBtn.textContent = "▶";
        }
      });
    }
  }

  if(toggleBtn){
    toggleBtn.addEventListener('click', ()=>{
      if(audio.paused){
        audio.play().then(()=>{
          if(playerState && toggleBtn){
            playerState.textContent = "Reproduciendo";
            toggleBtn.textContent = "⏸";
          }
        }).catch(()=>{ if(playerState) playerState.textContent="No se pudo reproducir"; });
      } else {
        audio.pause();
        if(playerState && toggleBtn){
          playerState.textContent = "Pausado";
          toggleBtn.textContent = "▶";
        }
      }
    });
  }

  if(nextBtn){
    nextBtn.addEventListener('click', ()=>{
      let nextIndex;
      do {
        nextIndex = Math.floor(Math.random() * tracks.length);
      } while(nextIndex === currentIndex && tracks.length>1);
      currentIndex = nextIndex;
      loadTrack(currentIndex);
      audio.play().then(()=>{
        if(playerState && toggleBtn){
          playerState.textContent = "Reproduciendo";
          toggleBtn.textContent = "⏸";
        }
      }).catch(()=>{ if(playerState && toggleBtn){ playerState.textContent="Autoplay bloqueado — toca ▶"; toggleBtn.textContent="▶"; } });
    });
  }

  if(volumeControl){
    volumeControl.addEventListener('input', (e)=>{
      audio.volume = parseFloat(e.target.value);
    });
  }

  /* Overlay inicial */
  if(overlay){
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
      tryAutoplay();
    });
  } else {
    tryAutoplay();
  }

});
