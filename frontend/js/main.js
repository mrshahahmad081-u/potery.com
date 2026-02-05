// Main initialization file for frontend
// All major systems are initialized through DOMContentLoaded events

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Magical Website Frontend Loaded');
    
    // Initialize container
    const container = document.querySelector('.container');
    if (container) {
        container.style.minHeight = '100vh';
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.justifyContent = 'center';
        container.style.alignItems = 'center';
        container.style.padding = '20px';
    }
    
    // Add API endpoint configuration
    window.API_BASE_URL = localStorage.getItem('apiBaseUrl') || 'http://localhost:5000/api';
    
    console.log('✨ All systems initialized');
    console.log(`📡 API Base URL: ${window.API_BASE_URL}`);
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
});

// Prevent console errors from breaking functionality
window.addEventListener('unhandledrejection', (event) => {
    console.warn('Unhandled promise rejection:', event.reason);
});
