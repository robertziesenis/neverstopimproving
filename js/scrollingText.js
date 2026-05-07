// Array für die Posts
    const postsList = [];

    // Funktion zum Laden der Posts aus der lokalen JSON-Datei
    async function loadPosts() {
      try {
        const response = await fetch(`./posts.json?ts=${Date.now()}`);
        if (!response.ok) throw new Error('Fehler beim Laden der Posts');
        const posts = await response.json();

        // Alte Posts ersetzen, damit die Anzeige immer die aktuelle JSON-Datei verwendet
        postsList.length = 0;
        postsList.push(...posts);

        // Laufschrift aktualisieren
        updateNews();
      } catch (error) {
        document.getElementById('error').textContent = `Fehler: ${error.message}`;
        console.error('Fehler beim Laden der Posts:', error);
      }
    }

    function updateNews() {
        const newsTicker = document.getElementById("news-ticker");
        const postItems = postsList.map(news => `<span>${news.title}</span>`).join("");
        
        // Duplicate content to ensure smooth looping
        newsTicker.innerHTML = postItems + postItems;
    }

    // Posts laden und alle 60 Sekunden aktualisieren
    loadPosts();
    setInterval(loadPosts, 60000);