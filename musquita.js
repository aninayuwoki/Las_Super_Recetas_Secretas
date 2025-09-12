
const button = document.getElementById('playMusicButton');
const audio = document.getElementById('backgroundMusic');
    
button.addEventListener('click', () => {
    if (audio.paused) {
        audio.play().catch(error => {
            console.error('Error al reproducir el audio:', error);
        });
    } else {
        audio.pause();
    }
});
