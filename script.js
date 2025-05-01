import gsap from "gsap";

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations with staggered effect for product cards
    const productCards = document.querySelectorAll('.product-card');
    gsap.from(productCards, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
    });

    // Header elements animation
    const headerElements = document.querySelectorAll('.header-content > *');
    gsap.from(headerElements, {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Filter chip functionality
    const filterChips = document.querySelectorAll('.filter-chips .chip');
    const productCardsFilter = document.querySelectorAll('.product-card');
    
    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            // Toggle active state
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            
            const filterValue = chip.getAttribute('data-filter');
            
            // Filter the products
            productCardsFilter.forEach(card => {
                // First hide all cards with animation
                gsap.to(card, {
                    scale: 0.95,
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                        // Then show only the ones that match the filter
                        if (filterValue === 'all') {
                            card.style.display = 'flex';
                            gsap.to(card, {
                                scale: 1,
                                opacity: 1,
                                duration: 0.3,
                                delay: 0.1
                            });
                        } else {
                            const cardBadge = card.querySelector('.badge');
                            if (cardBadge && cardBadge.classList.contains(filterValue)) {
                                card.style.display = 'flex';
                                gsap.to(card, {
                                    scale: 1,
                                    opacity: 1,
                                    duration: 0.3,
                                    delay: 0.1
                                });
                            } else {
                                card.style.display = 'none';
                            }
                        }
                    }
                });
            });
        });
    });

    // Card hover effects
    productCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                boxShadow: "0 12px 20px rgba(0, 0, 0, 0.15)",
                duration: 0.3
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                duration: 0.3
            });
        });
    });

    // Code tabs functionality
    const tabButtons = document.querySelectorAll('.code-tabs .tab-button');
    const codeBlocks = document.querySelectorAll('.code-block[data-tab-content]');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // Hide all code blocks
            codeBlocks.forEach(block => block.style.display = 'none');

            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding code block with animation
            const targetTab = button.getAttribute('data-tab');
            const targetBlock = document.querySelector(`.code-block[data-tab-content="${targetTab}"]`);
            if (targetBlock) {
                targetBlock.style.display = 'block';
                gsap.from(targetBlock, {
                    opacity: 0,
                    y: 10,
                    duration: 0.3
                });
            }
        });
    });

    // Copy button functionality
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const codeBlock = button.closest('.code-block');
            const codeElement = codeBlock.querySelector('code');
            const codeToCopy = codeElement.textContent;

            try {
                await navigator.clipboard.writeText(codeToCopy);
                
                // Change button text temporarily
                const originalText = button.textContent;
                button.textContent = 'Copied!';
                button.style.backgroundColor = '#28a745';
                button.style.color = 'white';
                button.style.borderColor = '#28a745';
                
                // Revert after 2 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '';
                    button.style.color = '';
                    button.style.borderColor = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy: ', err);
                button.textContent = 'Error!';
                button.style.backgroundColor = '#dc3545';
                button.style.color = 'white';
                
                setTimeout(() => {
                    button.textContent = 'Copy';
                    button.style.backgroundColor = '';
                    button.style.color = '';
                }, 2000);
            }
        });
    });
    
    // Copy All button functionality
    const copyAllButton = document.querySelector('.copy-all-button');
    if (copyAllButton) {
        copyAllButton.addEventListener('click', async () => {
            const activeTab = document.querySelector('.tab-button.active').getAttribute('data-tab');
            const activeCodeBlock = document.querySelector(`.code-block[data-tab-content="${activeTab}"]`);
            const codeElement = activeCodeBlock.querySelector('code');
            const codeToCopy = codeElement.textContent;
            
            try {
                await navigator.clipboard.writeText(codeToCopy);
                copyAllButton.textContent = 'Copied!';
                
                setTimeout(() => {
                    copyAllButton.textContent = 'Copy All';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy all: ', err);
            }
        });
    }
    
    // Search functionality setup
    const searchInput = document.querySelector('.search-input');
    const searchButton = document.querySelector('.search-button');
    
    if (searchInput && searchButton) {
        searchButton.addEventListener('click', () => {
            performSearch(searchInput.value);
        });
        
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch(searchInput.value);
            }
        });
    }
    
    function performSearch(query) {
        console.log(`Searching for: ${query}`);
        // Animate search results
        gsap.from('.product-card', {
            opacity: 0,
            y: 20,
            stagger: 0.05,
            duration: 0.4,
            ease: "power1.out"
        });
        // Actual search logic would be implemented here
    }
    
    // Update footer year
    const footerYear = document.querySelector('footer p');
    if (footerYear) {
        footerYear.textContent = ` 2025 Enterprise Templates & Solutions`;
    }

    // Accessibility widget functionality
    const accessibilityToggle = document.querySelector('.accessibility-toggle');
    const accessibilityWidget = document.querySelector('.accessibility-widget');
    
    if (accessibilityToggle) {
        accessibilityToggle.addEventListener('click', () => {
            accessibilityWidget.classList.toggle('closed');
            accessibilityWidget.classList.toggle('open');
        });
    }
    
    // Implement accessibility features
    const highContrastToggle = document.getElementById('high-contrast');
    const reducedMotionToggle = document.getElementById('reduced-motion');
    const colorBlindMode = document.getElementById('color-blind-mode');
    const textSizeSelector = document.getElementById('text-size');
    
    if (highContrastToggle) {
        highContrastToggle.addEventListener('change', () => {
            document.body.classList.toggle('high-contrast', highContrastToggle.checked);
        });
    }
    
    if (reducedMotionToggle) {
        reducedMotionToggle.addEventListener('change', () => {
            document.body.classList.toggle('reduced-motion', reducedMotionToggle.checked);
            
            // Update GSAP animations if reduced motion is enabled
            if (reducedMotionToggle.checked) {
                gsap.defaults({
                    duration: 0.1,
                    ease: "none"
                });
            } else {
                gsap.defaults({
                    duration: 0.6,
                    ease: "power2.out"
                });
            }
        });
    }
    
    if (colorBlindMode) {
        colorBlindMode.addEventListener('change', () => {
            // Remove any existing color blind classes
            document.body.classList.remove('protanopia', 'deuteranopia', 'tritanopia');
            
            // Add selected class if not 'none'
            if (colorBlindMode.value !== 'none') {
                document.body.classList.add(colorBlindMode.value);
            }
        });
    }
    
    if (textSizeSelector) {
        textSizeSelector.addEventListener('change', () => {
            // Remove existing text size classes
            document.body.classList.remove('large-text', 'x-large-text');
            
            // Add selected class if not 'normal'
            if (textSizeSelector.value !== 'normal') {
                document.body.classList.add(`${textSizeSelector.value}-text`);
            }
        });
    }
});
