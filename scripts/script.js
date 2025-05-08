document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        AOS.init({disable: true});
    } else {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            offset: 100,
            once: true
        });
    }

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

    const counters = document.querySelectorAll('.stats h3');
    const speed = 200; // No longer used, but kept for compatibility
    let hasAnimated = false;

    const countUp = (counter, target) => {
        const startTime = performance.now();
        const duration = 2000;

        const easeInOutQuad = (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

        const updateCounter = (currentTime) => {
            const elapsed = currentTime - startTime;
            if (elapsed < duration) {
                const progress = elapsed / duration;
                const easedProgress = easeInOutQuad(progress);
                const currentValue = Math.floor(easedProgress * target);
                counter.innerText = `${currentValue}+`;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = `${target}+`;
            }
        };

        requestAnimationFrame(updateCounter);
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !hasAnimated) {
                hasAnimated = true;
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    countUp(counter, target);
                });
            }
        });
    }, {
        threshold: 1.0 // Trigger when 100% of the element is visible
    });

    observer.observe(document.querySelector('.stats'));
});