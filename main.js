// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileNav = document.querySelector('.mobile-nav');
  
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
      mobileNav.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!mobileNav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
        mobileNav.classList.remove('active');
      }
    });
  }
  
  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  document.querySelectorAll('.card, .stat-card, .team-card').forEach(el => {
    observer.observe(el);
  });
});

// Scanner specific code
const assetIDElement = document.getElementById('assetID');
if (assetIDElement) {
  const assetObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.textContent !== 'None') {
        mutation.target.classList.add('scanned');
        setTimeout(() => mutation.target.classList.remove('scanned'), 500);
      }
    });
  });
  assetObserver.observe(assetIDElement, { childList: true, characterData: true, subtree: true });
}

// Enhanced popup functions
function openPopup() {
  const popup = document.getElementById('borrowPopup');
  if (popup) popup.classList.add('active');
}

function closePopup() {
  const popup = document.getElementById('borrowPopup');
  if (popup) popup.classList.remove('active');
}

// Override the original confirmBorrow to use new popup
const originalConfirmBorrow = window.confirmBorrow;
window.confirmBorrow = function() {
  if (originalConfirmBorrow) {
    originalConfirmBorrow();
  }
  openPopup();
};

// Status message styling
const statusElement = document.getElementById('status');
if (statusElement) {
  const statusObserver = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      const text = mutation.target.textContent.toLowerCase();
      mutation.target.classList.remove('success', 'error', 'info');
      if (text.includes('success') || text.includes('borrowed') || text.includes('returned')) {
        mutation.target.classList.add('success');
      } else if (text.includes('error') || text.includes('failed')) {
        mutation.target.classList.add('error');
      } else if (text.length > 0) {
        mutation.target.classList.add('info');
      }
    });
  });
  statusObserver.observe(statusElement, { childList: true, characterData: true, subtree: true });
}

// Keyboard accessibility for popup
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    closePopup();
  }
});

// Close popup when clicking outside
const borrowPopup = document.getElementById('borrowPopup');
if (borrowPopup) {
  borrowPopup.addEventListener('click', function(e) {
    if (e.target === this) {
      closePopup();
    }
  });
}
