document.querySelectorAll('.instrument-card').forEach(card => {
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

//spotify api
const SPOTIFY_CLIENT_ID = 'd7e14b6084f54019bd72bfa15c6a2e69';
const SPOTIFY_CLIENT_SECRET = 'd386ef0aae8e424f996bc5259c5b4e4c';

async function getSpotifyToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(SPOTIFY_CLIENT_ID + ':' + SPOTIFY_CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });
    
    const data = await response.json();
    return data.access_token;
}

async function getMyPlaylists() {
    try {
        const token = await getSpotifyToken();
        const playlistIds = [
            '3rM77Ke8uNTm3m0yybZOPD',
            '2onoqoukPHwVsB4ChZKq3S'
        ];
        const playlistPromises = playlistIds.map(id => 
            fetch(`https://api.spotify.com/v1/playlists/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            }).then(res => res.json())
        );
        
        const playlists = await Promise.all(playlistPromises);
        return playlists;
    } catch (error) {
        console.error('Error fetching Spotify playlists:', error);
        return [];
    }
}

function displayPlaylists(playlists) {
    const container = document.getElementById('spotify-playlists');
    
    if (playlists.length === 0) {
        container.innerHTML = '<p class="loading">Could not load playlists. Please check your API credentials.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    playlists.forEach(playlist => {
        const card = document.createElement('div');
        card.className = 'playlist-card';
        
        card.innerHTML = `
            <img src="${playlist.images[0]?.url || 'images/placeholder.jpg'}" alt="${playlist.name}" class="playlist-image">
            <div class="playlist-info">
                <h3 class="playlist-name">${playlist.name}</h3>
                <p class="playlist-description">${playlist.description || 'A great playlist!'}</p>
                <p class="playlist-tracks">${playlist.tracks.total} tracks</p>
                <a href="${playlist.external_urls.spotify}" target="_blank" class="playlist-link">
                    ▶️ Play on Spotify
                </a>
            </div>
        `;
        
        container.appendChild(card);
    });
}

async function loadSpotifyPlaylists() {
    const playlists = await getMyPlaylists();
    displayPlaylists(playlists);
}

if (document.getElementById('spotify-playlists')) {
    loadSpotifyPlaylists();
}