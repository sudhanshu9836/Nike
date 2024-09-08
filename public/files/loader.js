window.onload = function() {
    setTimeout(function() {
      // Hide the loader and show the content after 5 seconds
      document.getElementById('loader').style.display = 'none';
      const content = document.getElementById('main-page');
      content.classList.add('visible');
    }, 1000); 
  };