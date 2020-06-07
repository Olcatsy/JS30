// Get the elements
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');
const fullscreen = player.querySelector('.fullscreen');




// Build functions

// toggles play/pause
function togglePlay() {
  //call either .play() or .pause() on the video
  // if (video.paused) {
  //   video.play();
  // } else {
  //   video.pause();
  // }
  const method = video.paused ? 'play' : 'pause';
  video[method]();
}

// updates the icon of toggle button
function updateButton() {
  toggle.textContent = this.paused ? '►' : '❚ ❚';
}

// skip buttons 
function skip() {
  video.currentTime += parseFloat(this.dataset.skip); //data-skip value is a str and we need to convert it to a float 
}

function handleRangeUpdate() {
  video[this.name] = this.value;
}

function handleProgress() {
  const percent = video.currentTime / video.duration * 100;
  progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

function enterFullscreen() {
  if (!document.fullscreenElement) {
    player.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}


// Create event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton) //when video is played, the button icon will be changed
video.addEventListener('pause', updateButton) //same as above but for pausing
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => {
  button.addEventListener('click', skip);
});
ranges.forEach(range => {
  range.addEventListener('change', handleRangeUpdate);
})
ranges.forEach(range => {
  range.addEventListener('mouse', handleRangeUpdate);
})
video.addEventListener('timeupdate', handleProgress);
fullscreen.addEventListener('click', enterFullscreen);

let mousedown = false;
progress.addEventListener('click', scrub); // this is a neat shortcut. instead of writing an if statement that runs if mousedown is true, we write a one line condition that first evaluates mousedown and then runs the second part of the condition. if the first part evaluates to false, the eval breaks off and nothing is run
progress.addEventListener('mousedown', () => mousedown = true)
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mouseup', () => mousedown = false)

