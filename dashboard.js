document.addEventListener('DOMContentLoaded', () => {
    
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar-btn');

    if (sidebar && toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('collapsed');
        });
    }


    const searchBar = document.getElementById('search-streams');
  
    const streamCards = document.querySelectorAll('.stream-card'); 

    if (searchBar && streamCards.length > 0) {
        searchBar.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();

            streamCards.forEach(card => {
                const cardText = card.textContent.toLowerCase();
                if (cardText.includes(query)) {
                    card.style.display = ''; 
                } else {
                    card.style.display = 'none'; 
                }
            });
        });
    }
});