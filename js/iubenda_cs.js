// Iubenda Cookie Solution Stub
// This is a placeholder for cookie consent functionality

// Basic cookie consent functionality
window.iubenda = window.iubenda || {};
window.iubenda.cs = {
    init: function() {
        console.log('Cookie consent initialized');
    },
    
    acceptAllCookies: function() {
        console.log('All cookies accepted');
        localStorage.setItem('cookies_accepted', 'true');
    },
    
    rejectAllCookies: function() {
        console.log('All cookies rejected');
        localStorage.setItem('cookies_accepted', 'false');
    },
    
    showPreferences: function() {
        console.log('Cookie preferences shown');
    }
};

// Auto-initialize
document.addEventListener('DOMContentLoaded', function() {
    if (window.iubenda && window.iubenda.cs) {
        window.iubenda.cs.init();
    }
}); 