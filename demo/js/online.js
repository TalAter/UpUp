var vidShowAndTell = document.querySelector('video');
// Start playing the video as soon as the user scrolls
var scrollAction = function() {
  window.removeEventListener('scroll', scrollAction);
  vidShowAndTell.play();
};
window.addEventListener('scroll', scrollAction);

// ugh... mobile hack... forgive me.
if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
  vidShowAndTell.poster = "img/upup-poster-play.jpg"
}
