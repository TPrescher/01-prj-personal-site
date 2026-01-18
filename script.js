
// ------------------------------
// Back to Top button
// ------------------------------
// Grab the button from the page
const backToTopBtn = document.getElementById('backToTop');

// Only run this code if the button exists
if (backToTopBtn) {
  // Show the button after the user scrolls down a bit
  window.addEventListener('scroll', function () {
    if (window.scrollY > 200) {
      backToTopBtn.classList.remove('hidden');
    } else {
      backToTopBtn.classList.add('hidden');
    }
  });

  // Scroll smoothly back to the top when clicked
  backToTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
