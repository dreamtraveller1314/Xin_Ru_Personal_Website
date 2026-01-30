let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    
    lastScrollTop = scrollTop;
});


//portfolio
const slider = document.querySelector('.achievements-slider');
const prevBut = document.querySelector('.prev-but');
const nextBut = document.querySelector('.next-but');

if (slider && prevBut && nextBut) {
    const slideWidth = 320;
    
    nextBut.addEventListener('click', function() {
        slider.scrollBy({
            left: slideWidth,
            behavior: 'smooth'
        });
    });
    prevBut.addEventListener('click', function() {
        slider.scrollBy({
            left: -slideWidth,
            behavior: 'smooth'
        });
    });
}