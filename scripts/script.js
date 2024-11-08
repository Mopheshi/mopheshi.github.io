document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
    
    // Theme switching functionality
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
    
    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
    }

    const counters = document.querySelectorAll('.stats h3');
    const speed = 200;
    let hasAnimated = false; // To prevent multiple triggers

    const countUp = (counter, target) => {
        let currentCount = 0;
        const increment = Math.ceil(target / (speed / 30)); // Calculate increment per frame

        const updateCounter = () => {
            if (currentCount < target) {
                currentCount += increment;
                if (currentCount > target) {
                    currentCount = target; // Ensure we don't exceed the target
                }
                counter.innerText = `${currentCount}+`;
                requestAnimationFrame(updateCounter); // Request next frame
            } else {
                counter.innerText = `${target}+`; // Ensure it ends at the target
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true; // Prevents re-triggering
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    countUp(counter, target); // Start counting for each counter
                });
            }
        });
    });

    observer.observe(document.querySelector('.stats')); // Observe the stats section

    const scrollDown = document.querySelector('.scroll-down');
    const learnMoreBtn = document.getElementById('learn-more-btn');

    const scrollToAboutMe = () => {
        window.scrollTo({
            top: document.querySelector('.about-me').offsetTop,
            behavior: 'smooth'
        });
    };

    scrollDown.addEventListener('click', scrollToAboutMe);
    learnMoreBtn.addEventListener('click', scrollToAboutMe);

    // const counters = document.querySelectorAll('.stats h3');
    // const speed = 200;
    // let hasAnimated = false; // To prevent multiple triggers
    //
    // const countUp = (counter, target) => {
    //     let currentCount = 0;
    //     const increment = Math.ceil(target / (speed / 30)); // Calculate increment per frame
    //
    //     const updateCounter = () => {
    //         if (currentCount < target) {
    //             currentCount += increment;
    //             if (currentCount > target) {
    //                 currentCount = target; // Ensure we don't exceed the target
    //             }
    //             counter.innerText = `${currentCount}+`;
    //             requestAnimationFrame(updateCounter); // Request next frame
    //         } else {
    //             counter.innerText = `${target}+`; // Ensure it ends at the target
    //         }
    //     };
    //
    //     updateCounter();
    // };
    //
    // const observer = new IntersectionObserver((entries) => {
    //     entries.forEach(entry => {
    //         if (entry.isIntersecting && !hasAnimated) {
    //             hasAnimated = true; // Prevents re-triggering
    //             counters.forEach(counter => {
    //                 const target = +counter.getAttribute('data-target');
    //                 countUp(counter, target); // Start counting for each counter
    //             });
    //         }
    //     });
    // });

    observer.observe(document.querySelector('.stats')); // Observe the stats section
});