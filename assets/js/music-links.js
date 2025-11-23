document.addEventListener('DOMContentLoaded', () => {

  const overlay = document.getElementById('startOverlay');

  const toggleBtn = document.getElementById('toggleBtn');
  const playerState = document.getElementById('playerState');
  const trackTitle = document.getElementById('trackTitle');
  const volumeControl = document.getElementById('volumeControl');

  const audio = new Audio();

  const track = "assets/music/Tell Me Now - Gloria Tells.mp3";

  function loadTrack(){
    audio.src = track;
    const fileName = track.split('/').pop().replace(/\.[^/.]+$/, "");
    if(trackTitle) trackTitle.textContent = fileName;
  }

  loadTrack();

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
        }).catch(()=>{ 
          if(playerState) playerState.textContent="No se pudo reproducir"; 
        });
      } else {
        audio.pause();
        if(playerState && toggleBtn){
          playerState.textContent = "Pausado";
          toggleBtn.textContent = "▶";
        }
      }
    });
  }

  if(volumeControl){
    volumeControl.addEventListener('input', (e)=>{
      audio.volume = parseFloat(e.target.value);
    });
  }

  if(overlay){
    overlay.addEventListener('click', () => {
      overlay.classList.add('hidden');
      tryAutoplay();
    });
  } else {
    tryAutoplay();
  }

});
