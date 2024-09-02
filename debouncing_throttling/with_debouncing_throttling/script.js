// Debounce Function
function debounce(func, wait) {
    let timeout;
    return function(...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }
  
  // Throttle Function
  function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function(...args) {
      const context = this;
      if (!lastRan) {
        func.apply(context, args);
        lastRan = Date.now();
      } else {
        clearTimeout(lastFunc);
        lastFunc = setTimeout(() => {
          if ((Date.now() - lastRan) >= limit) {
            func.apply(context, args);
            lastRan = Date.now();
          }
        }, limit - (Date.now() - lastRan));
      }
    };
  }
  
  // Test Debouncing
  const handleInputDebounce = debounce((event) => {
    console.log('Debounced Input Value:', event.target.value);
  }, 300);
  
  document.getElementById('myInput').addEventListener('input', handleInputDebounce);
  
  // Test Throttling
  const handleScrollThrottle = throttle(() => {
    console.log('Throttled Scroll Event');
  }, 200);
  
  window.addEventListener('scroll', handleScrollThrottle);
  