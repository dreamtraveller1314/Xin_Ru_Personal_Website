document.querySelectorAll('.instrument-card').forEach(card => {
    //button
    const slider = document.querySelector('.food-slider');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: 330, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -330, behavior: 'smooth' });
    });
    
    const expandBut = card.querySelector('.expand-but');
    const closeBut = card.querySelector('.close-but');
    
    expandBut.addEventListener('click', function(e) {
        e.stopPropagation();
        document.querySelectorAll('.instrument-card').forEach(c => {
            if (c !== card) c.classList.remove('expanded');
        });
        card.classList.add('expanded');
    });
    
    closeBut.addEventListener('click', function(e) {
        e.stopPropagation();
        card.classList.remove('expanded');
        const audio = card.querySelector('audio');
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    });
});

function playSound(id) {
  var music = document.getElementById(id);
  music.play();
}

//github api
const GITHUB_USERNAME = 'dreamtraveller1314';

async function getGitHubRepos() {
    try {
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=100`);
        const repos = await response.json();
        return repos;
    } catch (error) {
        console.error('Error fetching GitHub repos:', error);
        return [];
    }
}

function displayGitHubRepos(repos) {
    const container = document.getElementById('github-repos');
    
    if (repos.length === 0) {
        container.innerHTML = '<p class="loading">No repositories found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    repos.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'repo-card';
        
        card.innerHTML = `
            <div class="repo-header">
                <span class="repo-icon">📁</span>
                <h3 class="repo-name">${repo.name}</h3>
            </div>
            <p class="repo-description">${repo.description || 'No description available.'}</p>
            ${repo.language ? `<span class="repo-language">${repo.language}</span>` : ''}
            <br>
            <a href="${repo.html_url}" target="_blank" class="repo-link">View on GitHub</a>
        `;
        
        container.appendChild(card);
    });
}

async function loadGitHubRepos() {
    const repos = await getGitHubRepos();
    displayGitHubRepos(repos);
}

if (document.getElementById('github-repos')) {
    loadGitHubRepos();
}

//contribution graph
const CONTRIBUTION_REFRESH_INTERVAL = 60 * 60 * 1000;
let refreshTimer = null;
function getTimeString() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
}
function refreshContributionGraph() {
    const graphImg = document.getElementById('contribution-graph');
    const lastUpdatedEl = document.getElementById('last-updated');
    
    if (graphImg) {
        if (lastUpdatedEl) {
            lastUpdatedEl.textContent = 'Updating...';
        }
        const baseUrl = 'https://ghchart.rshah.org/FFB5A7/dreamtraveller1314';
        const timestamp = Date.now();
        graphImg.classList.remove('loaded');
        graphImg.src = `${baseUrl}?t=${timestamp}`;
        graphImg.onload = function() {
            this.classList.add('loaded');
            if (lastUpdatedEl) {
                lastUpdatedEl.textContent = `Updated at ${getTimeString()}`;
            }
            console.log('✅ Contribution graph refreshed at', getTimeString());
        };
        
        graphImg.onerror = function() {
            if (lastUpdatedEl) {
                lastUpdatedEl.textContent = 'Failed to load';
            }
            console.error('❌ Failed to load contribution graph');
        };
    }
}

function startAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
    }
    refreshContributionGraph();
    refreshTimer = setInterval(() => {
        console.log('🔄 Auto-refreshing contribution graph...');
        refreshContributionGraph();
    }, CONTRIBUTION_REFRESH_INTERVAL);
    
    console.log(`✅ Auto-refresh started (every ${CONTRIBUTION_REFRESH_INTERVAL / 60000} minutes)`);
}
function stopAutoRefresh() {
    if (refreshTimer) {
        clearInterval(refreshTimer);
        refreshTimer = null;
        console.log('⏹️ Auto-refresh stopped');
    }
}
if (document.getElementById('github-contributions')) {
    startAutoRefresh();
    window.addEventListener('beforeunload', stopAutoRefresh);
    document.addEventListener('visibilitychange', function() {
        if (document.hidden) {
            console.log('⏸️ Page hidden - pausing auto-refresh');
            stopAutoRefresh();
        } else {
            console.log('▶️ Page visible - resuming auto-refresh');
            startAutoRefresh();
        }
    });
}