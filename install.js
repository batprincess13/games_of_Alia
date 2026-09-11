if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('/games_of_Alia/service-worker.js', {scope:'/games_of_Alia/'}));
}
