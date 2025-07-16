
// Get the Back to Top button
const backToTopBtn = document.getElementById('backToTop');

// Show the button when the user scrolls down 200px from the top
window.addEventListener('scroll', function() {
  if (window.scrollY > 200) {
    backToTopBtn.classList.remove('hidden');
  } else {
    backToTopBtn.classList.add('hidden');
  }
});

// When the button is clicked, scroll smoothly to the top
backToTopBtn.addEventListener('click', function() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
