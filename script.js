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

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalEmbedContainer = document.getElementById('modal-embed-container');

const projectEmbeds = {
    'ftc-video': {
        title: 'FIRST Tech Challenge - Match Video',
        embed: '<iframe src="https://drive.google.com/file/d/1SuLN-XCtBMETRn_qsCHXv-fnzuAgq0RP/preview" width="100%" height="500" allow="autoplay" class="modal-embed"></iframe>'
    },
    'castle-game': {
        title: 'Castle of Shadows - Play Now',
        embed: '<iframe height="167" frameborder="0" src="https://itch.io/embed/3802149" width="552"><a href="https://dreamtraveller1314.itch.io/castle-of-shadows">Castle of Shadows by dreamtraveller1314</a></iframe>'
    },
    'cad-mouse': {
    title: 'Custom Computer Mouse - 3D CAD Model',
    embed: `        <div style="text-align: center; padding: 40px;">
            <img src="img/cad_pic.png" alt="CAD Mouse Preview" style="max-width: 100%; border-radius: 12px; margin-bottom: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.1);">
            <h3 style="color: #2d3436; margin-bottom: 20px;">View Full 3D Model</h3>
            <p style="color: #636e72; margin-bottom: 30px; line-height: 1.6;">
                This ergonomic mouse design is fully parametric and ready for 3D printing. 
                Click below to explore the interactive 3D model in Onshape.
            </p>
            <a href="https://cad.onshape.com/documents/89a440595dc51c5ae372007d" 
               target="_blank" 
               style="display: inline-block; background: linear-gradient(135deg, #E8989F 0%, #D4757F 100%); color: white; padding: 15px 40px; border-radius: 50px; text-decoration: none; font-weight: 600; transition: transform 0.3s ease;"
               onmouseover="this.style.transform='translateY(-2px)'"
               onmouseout="this.style.transform='translateY(0)'">
                🔗 Open in Onshape
            </a>
        </div>
        `
    },
    'scratch-game': {
        title: 'Snake & Ladder - Scratch Game',
        embed: '<iframe src="https://scratch.mit.edu/projects/543620844/embed" width="100%" height="500" frameborder="0" allowfullscreen class="modal-embed"></iframe>'
    },
    'scratch-game-1': {
        title: 'Castle of Shadows - Scratch Game',
        embed: '<iframe src="https://scratch.mit.edu/projects/1067249356/embed" width="100%" height="500" frameborder="0" allowfullscreen class="modal-embed"></iframe>'
    }
};

document.querySelectorAll('.project-link[data-project]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const projectId = this.getAttribute('data-project');
        openModal(projectId);
    });
});

function openModal(projectId) {
    const project = projectEmbeds[projectId];
    if (project) {
        modalTitle.textContent = project.title;
        modalEmbedContainer.innerHTML = project.embed;
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    modal.classList.remove('active');
    modalEmbedContainer.innerHTML = '';
    document.body.style.overflow = 'auto'; 
}

modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});

