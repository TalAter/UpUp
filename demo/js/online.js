var vidShowAndTell = document.querySelector('video');
// Start playing the video as soon as the user scrolls
var scrollAction = function() {
  window.removeEventListener('scroll', scrollAction);
  vidShowAndTell.play();
};
window.addEventListener('scroll', scrollAction);

vidShowAndTell.addEventListener('ended', function() {vidShowAndTell.play();});