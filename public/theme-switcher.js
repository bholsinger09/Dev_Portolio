// IMMEDIATE cleanup of any old theme toggles
(function() {
  console.log('CLEANING UP OLD THEME TOGGLES...');
  // Remove by IDs
  ['theme-toggle-btn', 'force-theme-toggle', 'theme-button'].forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      console.log('Removed old element by ID:', id);
      el.remove();
    }
  });
  
  // Remove by text content
  document.querySelectorAll('button').forEach(btn => {
    if (btn.textContent && (btn.textContent.includes('THEME') || btn.textContent.includes('🌙'))) {
      console.log('Removed old theme button:', btn.textContent);
      btn.remove();
    }
  });
})();

function toggleTheme() {
  document.documentElement.classList.toggle('dark');
  localStorage.setItem('theme', 
    document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  );
  
  // Update button icon
  const button = document.getElementById('theme-toggle-btn');
  if (button) {
    button.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
  }
  
  console.log('Theme toggled! Dark mode is now: ' + document.documentElement.classList.contains('dark'));
}

// Load saved theme on page load
(function() {
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  }
  
  // Set initial icon when button is available
  setTimeout(function() {
    const button = document.getElementById('theme-toggle-btn');
    if (button) {
      button.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    }
  }, 100);
})();

// Inject theme toggle into the navigation
function injectThemeButton() {
  // Remove any existing theme buttons first - check for multiple possible IDs
  const existingIds = ['theme-toggle-btn', 'force-theme-toggle', 'theme-button'];
  existingIds.forEach(id => {
    const existing = document.getElementById(id);
    if (existing) {
      console.log('Removing old theme button:', id);
      existing.remove();
    }
  });
  
  // Also remove any buttons with theme-related text
  const allButtons = document.querySelectorAll('button');
  allButtons.forEach(btn => {
    if (btn.textContent && btn.textContent.includes('THEME')) {
      console.log('Removing old theme button by text content:', btn);
      btn.remove();
    }
  });
  
  // Look for navigation area to integrate properly
  const nav = document.querySelector('nav') || document.querySelector('header') || document.querySelector('.header');
  
  if (nav) {
    const button = document.createElement('button');
    button.id = 'theme-toggle-btn';
    button.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    button.onclick = toggleTheme;
    button.style.cssText = `
      background: transparent !important;
      color: currentColor !important;
      border: 1px solid currentColor !important;
      border-radius: 6px !important;
      padding: 8px 12px !important;
      cursor: pointer !important;
      font-size: 18px !important;
      margin-left: 12px !important;
      display: inline-flex !important;
      align-items: center !important;
      justify-content: center !important;
      transition: all 0.2s ease !important;
      min-width: 44px !important;
      height: 44px !important;
    `;
    
    // Add hover effects
    button.addEventListener('mouseenter', function() {
      this.style.background = 'rgba(255,255,255,0.1)';
    });
    button.addEventListener('mouseleave', function() {
      this.style.background = 'transparent';
    });
    
    nav.appendChild(button);
    console.log('Theme button integrated into navigation:', button);
    return button;
  } else {
    // Fallback to a more subtle fixed position
    const button = document.createElement('button');
    button.id = 'theme-toggle-btn';
    button.innerHTML = document.documentElement.classList.contains('dark') ? '☀️' : '🌙';
    button.onclick = toggleTheme;
    button.style.cssText = `
      position: fixed !important;
      top: 20px !important;
      right: 20px !important;
      background: rgba(0,0,0,0.1) !important;
      color: currentColor !important;
      border: 1px solid rgba(255,255,255,0.3) !important;
      border-radius: 50% !important;
      padding: 0 !important;
      cursor: pointer !important;
      font-size: 20px !important;
      width: 48px !important;
      height: 48px !important;
      display: flex !important;
      align-items: center !important;
      justify-content: center !important;
      z-index: 1000 !important;
      backdrop-filter: blur(10px) !important;
      transition: all 0.2s ease !important;
    `;
    
    document.body.appendChild(button);
    console.log('Theme button added with subtle fixed positioning:', button);
    return button;
  }
}

// Try multiple times
setTimeout(injectThemeButton, 100);
setTimeout(injectThemeButton, 500);
setTimeout(injectThemeButton, 1000);
setTimeout(injectThemeButton, 2000);

window.addEventListener('load', injectThemeButton);
document.addEventListener('DOMContentLoaded', injectThemeButton);

// Also try when the page becomes visible
document.addEventListener('visibilitychange', function() {
  if (!document.hidden) {
    injectThemeButton();
  }
});

console.log('NEW THEME SWITCHER SCRIPT LOADED! Updated for better layout - Version 2.0');