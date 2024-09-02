// Direct Event Handler for Input
function handleInput(event) {
    console.log('Input Value:', event.target.value);
  }
  
  // Direct Event Handler for Scroll
  function handleScroll() {
    console.log('Scroll Event');
  }
  
  // Attach Event Handlers
  document.getElementById('myInput').addEventListener('input', handleInput);
  window.addEventListener('scroll', handleScroll);
  