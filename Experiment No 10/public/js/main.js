// Simple live clock greeting (optional)
(function(){
  const tick = () => {
    const el = document.getElementById("clock");
    if (!el) return;
    el.textContent = new Date().toLocaleTimeString();
  };
  setInterval(tick, 1000);
})();
