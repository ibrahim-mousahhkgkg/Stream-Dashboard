const state = {
    currentFilter: 'all',
    searchQuery: '',
    streams: [
        { id: 1, streamer: 'Alex_Live', title: 'Championship Grand Finals! | Drops Active', category: 'Gaming', viewers: '4.2k', live: true, avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=60' },
        { id: 2, streamer: 'DevWrapper', title: 'Building a relational database layer from scratch', category: 'Coding', viewers: '1.1k', live: true, avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=60' },
        { id: 3, streamer: 'LofiRadio Station', title: 'Late night beats to study / debug to ☕', category: 'Music', viewers: '12.5k', live: true, avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&auto=format&fit=crop&q=60' },
        { id: 4, streamer: 'QueryOptimizer', title: 'Oracle SQL execution paths & indexing models', category: 'Coding', viewers: '850', live: false, avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=80&auto=format&fit=crop&q=60' },
        { id: 5, streamer: 'Speedrunner_X', title: 'Glitchless 100% Run Attempts [PB inside]', category: 'Gaming', viewers: '3.1k', live: true, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&auto=format&fit=crop&q=60' }
    ]
};

const DOM = {
    sidebar: document.getElementById('sidebar'),
    sidebarToggle: document.getElementById('toggle-sidebar-btn'),
    searchBar: document.getElementById('search-streams'),
    streamGrid: document.getElementById('stream-grid'),
    filterTabs: document.querySelectorAll('.filter-tab')
};

function renderStreams() {
    if (!DOM.streamGrid) return;

    const filtered = state.streams.filter(stream => {
        const matchesSearch = stream.streamer.toLowerCase().includes(state.searchQuery) || 
                              stream.title.toLowerCase().includes(state.searchQuery);
        
        if (state.currentFilter === 'live') return matchesSearch && stream.live;
        if (state.currentFilter === 'offline') return matchesSearch && !stream.live;
        return matchesSearch;
    });

    DOM.streamGrid.innerHTML = filtered.map(stream => `
        <div class="stream-card ${stream.live ? 'is-live' : 'is-offline'}">
            <div class="card-thumbnail">
                <span class="badge">${stream.live ? 'LIVE' : 'OFFLINE'}</span>
                ${stream.live ? `<span class="viewer-count">${stream.viewers} viewers</span>` : ''}
            </div>
            <div class="card-details">
                <img src="${stream.avatar}" alt="${stream.streamer}" class="streamer-avatar">
                <div class="card-text">
                    <h4 class="streamer-name">${stream.streamer}</h4>
                    <p class="stream-title">${stream.title}</p>
                    <span class="category-tag">${stream.category}</span>
                </div>
            </div>
        </div>
    `).join('');
}

function initEventListeners() {
    if (DOM.sidebarToggle && DOM.sidebar) {
        DOM.sidebarToggle.addEventListener('click', () => {
            DOM.sidebar.classList.toggle('collapsed');
        });
    }

    if (DOM.searchBar) {
        DOM.searchBar.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.toLowerCase().trim();
            renderStreams();
        });
    }

    DOM.filterTabs.forEach(tab => {
        tab.addEventListener('click', (e) => {
            DOM.filterTabs.forEach(t => t.classList.remove('active'));
            e.target.classList.add('active');
            
            state.currentFilter = e.target.dataset.filter || 'all';
            renderStreams();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initEventListeners();
    renderStreams();
});