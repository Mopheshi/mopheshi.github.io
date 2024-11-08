document.addEventListener('DOMContentLoaded', function () {
    AOS.init();

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
    const speed = 200;
    let hasAnimated = false;

    const countUp = (counter, target) => {
        let currentCount = 0;
        const increment = Math.ceil(target / (speed / 30));

        const updateCounter = () => {
            if (currentCount < target) {
                currentCount += increment;
                if (currentCount > target) {
                    currentCount = target;
                }
                counter.innerText = `${currentCount}+`;
                requestAnimationFrame(updateCounter);
            } else {
                counter.innerText = `${target}+`;
            }
        };

        updateCounter();
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
    });

    observer.observe(document.querySelector('.stats'));
});