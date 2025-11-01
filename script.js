document.addEventListener('DOMContentLoaded', function() {
    const bannerSelect = document.getElementById('banner-select');
    const layoutToggle = document.getElementById('layout-toggle');
    const titleToggle = document.getElementById('title-toggle');
    const saveButton = document.getElementById('save-button');
    const saveUltraHdButton = document.getElementById('save-ultra-hd-button'); // New ultra HD save button
    const bannerContainer = document.querySelector('.banner-container');
    // Color selection elements
    const titleColorSelector = document.getElementById('title-color-selector');
    const iconColorSelector = document.getElementById('icon-color-selector');
    
    let currentLayout = 'cutline';
    let titleFormat = 'single-line'; // 'two-lines' or 'single-line'
    
    // Set default banner
    bannerSelect.value = 'Banner.jpg';
    
    // Initialize title toggle state
    titleToggle.textContent = 'Title: Single Line';
    bannerContainer.classList.add('single-line-title');
    
    const layouts = {
        full: { width: 2560, height: 1440 },
        desktop: { width: 2560, height: 423 },
        tablet: { width: 1855, height: 423 },
        mobile: { width: 1546, height: 423 },
        cutline: { width: 2560, height: 1440 }
    };
    
    // Layout toggle functionality
    layoutToggle.addEventListener('click', function() {
        const layoutKeys = ['desktop', 'tablet', 'mobile', 'cutline'];
        const currentIndex = layoutKeys.indexOf(currentLayout);
        const nextIndex = (currentIndex + 1) % layoutKeys.length;
        currentLayout = layoutKeys[nextIndex];
        
        // Update button text
        layoutToggle.textContent = `Layout: ${currentLayout.charAt(0).toUpperCase() + currentLayout.slice(1)}`;
        
        // Update layout
        updateBannerAndLayout(currentLayout, bannerSelect.value);
    });
    
    // Banner selection functionality
    bannerSelect.addEventListener('change', function() {
        const selectedBanner = this.value;
        updateBannerAndLayout(currentLayout, selectedBanner);
    });
    
    // Title toggle functionality
    titleToggle.addEventListener('click', function() {
        titleFormat = titleFormat === 'two-lines' ? 'single-line' : 'two-lines';
        
        if (titleFormat === 'single-line') {
            titleToggle.textContent = 'Title: Single Line';
            bannerContainer.classList.add('single-line-title');
        } else {
            titleToggle.textContent = 'Title: Two Lines';
            bannerContainer.classList.remove('single-line-title');
        }
    });

    // Save button functionality
    saveButton.addEventListener('click', function() {
        captureAndSaveBanner(false); // Standard quality
    });

    // Ultra HD save button functionality
    saveUltraHdButton.addEventListener('click', function() {
        captureAndSaveBanner(true); // Ultra HD quality
    });

    // Function to capture and save the banner
    function captureAndSaveBanner(isUltraHd) {
        // Get the current banner container
        const bannerElement = document.querySelector('.banner-container');
        
        // Temporarily hide overlay elements that shouldn't be included in the saved image
        const overlayElements = bannerElement.querySelectorAll(
            '.cutline-overlay, .cutline-legend, .coordinate-display, .safe-area-indicator, .viewport-window'
        );
        const originalDisplay = [];
        
        overlayElements.forEach((el, index) => {
            originalDisplay[index] = el.style.display;
            el.style.display = 'none';
        });
        
        // Temporarily remove any transition effects for clean capture
        const originalTransition = bannerElement.style.transition;
        bannerElement.style.transition = 'none';
        
        // Determine quality settings
        // For ultra HD: 2560 x 1440 pixels optimized for ~6MB file size with maximum quality
        const scale = isUltraHd ? 4 : 2;
        const quality = isUltraHd ? 1.0 : 0.92;
        const filenameSuffix = isUltraHd ? '-ultra-hd' : '';
        const targetWidth = isUltraHd ? 2560 : null;
        const targetHeight = isUltraHd ? 1440 : null;
        
        // Add a small delay to ensure UI updates are complete
        setTimeout(() => {
            try {
                // Use html2canvas to capture the banner with maximum quality settings
                html2canvas(bannerElement, {
                    backgroundColor: null, // Use transparent background
                    scale: scale, // 4x scaling for ultra HD quality
                    useCORS: true, // Enable cross-origin images
                    logging: false, // Disable logging for cleaner output
                    allowTaint: true, // Allow tainted images
                    imageTimeout: 20000, // Increased timeout for better image loading
                    // Maximum quality rendering options
                    foreignObjectRendering: false,
                    letterRendering: true,
                    // Force high DPI rendering
                    dpi: 300,
                    quality: quality,
                    // Set specific dimensions
                    width: targetWidth,
                    height: targetHeight,
                    // Additional options for maximum text clarity
                    pixelRatio: 2, // Force higher pixel ratio
                    scrollX: 0,
                    scrollY: 0
                }).then(canvas => {
                    // Ensure exact dimensions for YouTube compliance
                    let finalCanvas = canvas;
                    if (isUltraHd && (canvas.width !== 2560 || canvas.height !== 1440)) {
                        // Create a new canvas with exact dimensions
                        finalCanvas = document.createElement('canvas');
                        finalCanvas.width = 2560;
                        finalCanvas.height = 1440;
                        const ctx = finalCanvas.getContext('2d');
                        // Use maximum quality image smoothing
                        ctx.imageSmoothingEnabled = true;
                        ctx.imageSmoothingQuality = 'high';
                        // Draw with high-quality interpolation
                        ctx.patternQuality = 'best';
                        ctx.quality = 'best';
                        ctx.drawImage(canvas, 0, 0, 2560, 1440);
                    }
                    
                    // Restore original display settings
                    overlayElements.forEach((el, index) => {
                        el.style.display = originalDisplay[index] || '';
                    });
                    
                    // Restore original transition
                    bannerElement.style.transition = originalTransition;
                    
                    // Create download link with custom filename
                    const link = document.createElement('a');
                    link.download = 'Joshua_pavia_basco_YT_banner-' + getCurrentLayoutName() + '-' + getCurrentTimestamp() + filenameSuffix + '.png';
                    
                    // Use maximum PNG quality for ~6MB file size
                    link.href = finalCanvas.toDataURL('image/png', 1.0);
                    link.click();
                }).catch(error => {
                    console.error('Error capturing banner:', error);
                    alert('Failed to save banner. Please try again. Error: ' + error.message);
                    
                    // Restore original display settings in case of error
                    overlayElements.forEach((el, index) => {
                        el.style.display = originalDisplay[index] || '';
                    });
                    
                    // Restore original transition in case of error
                    bannerElement.style.transition = originalTransition;
                });
            } catch (error) {
                console.error('Error initializing html2canvas:', error);
                alert('Failed to save banner. Please try again. Error: ' + error.message);
                
                // Restore original display settings in case of error
                overlayElements.forEach((el, index) => {
                    el.style.display = originalDisplay[index] || '';
                });
                
                // Restore original transition in case of error
                bannerElement.style.transition = originalTransition;
            }
        }, 150); // Increased delay to ensure UI updates
    }

    // Helper function to get current layout name
    function getCurrentLayoutName() {
        if (bannerContainer.classList.contains('desktop-view')) return 'desktop';
        if (bannerContainer.classList.contains('tablet-view')) return 'tablet';
        if (bannerContainer.classList.contains('mobile-view')) return 'mobile';
        if (bannerContainer.classList.contains('cutline-view')) return 'cutline';
        return 'cutline';
    }

    // Helper function to get current timestamp
    function getCurrentTimestamp() {
        const now = new Date();
        return now.getFullYear() + '-' + 
               String(now.getMonth() + 1).padStart(2, '0') + '-' + 
               String(now.getDate()).padStart(2, '0') + '-' +
               String(now.getHours()).padStart(2, '0') + '-' +
               String(now.getMinutes()).padStart(2, '0') + '-' +
               String(now.getSeconds()).padStart(2, '0');
    }

    // Title color selection
    titleColorSelector.addEventListener('change', function() {
        const selectedColor = this.value;
        document.documentElement.style.setProperty('--title-color', selectedColor);
        
        // Change shadow color to white when black is selected for better visibility
        if (selectedColor === '#000000') {
            document.documentElement.style.setProperty('--title-shadow-color', 'rgba(255, 255, 255, 0.8)');
        } else {
            document.documentElement.style.setProperty('--title-shadow-color', 'rgba(0, 0, 0, 0.8)');
        }
    });
    
    // Icon name color selection
    iconColorSelector.addEventListener('change', function() {
        const selectedColor = this.value;
        document.documentElement.style.setProperty('--icon-color', selectedColor);
        
        // Change shadow color to white when black is selected for better visibility
        if (selectedColor === '#000000') {
            document.documentElement.style.setProperty('--icon-shadow-color', 'rgba(255, 255, 255, 0.8)');
        } else {
            document.documentElement.style.setProperty('--icon-shadow-color', 'rgba(0, 0, 0, 0.8)');
        }
    });
    
    function updateBannerAndLayout(layout, banner) {
        // Reset classes
        bannerContainer.className = 'banner-container';
        
        // Add layout class
        if (layout === 'cutline') {
            bannerContainer.classList.add('cutline');
        } else {
            bannerContainer.classList.add('cutline');
            bannerContainer.classList.add(`${layout}-overlay`);
        }
        
        // Add banner class if not default
        if (banner !== 'Banner.jpg') {
            // Extract the banner name without extension and remove "Banner" prefix
            const bannerName = banner.replace(/\.[^/.]+$/, ""); // Remove extension
            const bannerClass = bannerName.toLowerCase();
            bannerContainer.classList.add(bannerClass);
        }
        
        // Maintain title format
        if (titleFormat === 'single-line') {
            bannerContainer.classList.add('single-line-title');
        }
    }
    
    // Coordinate display functionality
    const coordinateDisplay = document.getElementById('coordinates');
    
    bannerContainer.addEventListener('mousemove', function(e) {
        const rect = bannerContainer.getBoundingClientRect();
        
        const x = Math.round(e.clientX - rect.left);
        const y = Math.round(e.clientY - rect.top);
        
        coordinateDisplay.textContent = `X: ${x}px, Y: ${y}px`;
    });
    
    bannerContainer.addEventListener('mouseleave', function() {
        coordinateDisplay.textContent = 'X: 0px, Y: 0px';
    });
    
    // Initialize
    updateBannerAndLayout(currentLayout, 'Banner.jpg');
});