// Array für die Posts
    const postsList = [];

    // CORS-Proxy-URL (alternative proxies)
    const proxyUrl = 'https://corsproxy.io/?';
    const redditUrl = 'https://www.reddit.com/r/selfimprovement/new.json?limit=100';

    // Funktion zum Abrufen der Posts
    async function fetchPosts() {
      try {
        const response = await fetch(proxyUrl + encodeURIComponent(redditUrl));
        if (!response.ok) throw new Error('Netzwerkfehler');
        const data = await response.json();

        // Posts extrahieren
        const newPosts = data.data.children.map(child => ({
          title: child.data.title,
          author: child.data.author,
          url: `https://reddit.com${child.data.permalink}`,
          created: new Date(child.data.created_utc * 1000).toLocaleString('de-DE')
        }));

        // Nur neue Posts hinzufügen (Vermeidung von Duplikaten)
        newPosts.forEach(newPost => {
          if (!postsList.some(existing => existing.title === newPost.title)) {
            postsList.push(newPost);
          }
        });

        // Laufschrift aktualisieren
        updateNews();
      } catch (error) {
        document.getElementById('error').textContent = `Fehler: ${error.message}`;
        console.error('Fehler beim Abrufen der Posts:', error);
      }
    }

    function updateNews() {
        const newsTicker = document.getElementById("news-ticker");
        const postItems = postsList.map(news => `<span>${news.title}</span>`).join("");
        
        // Duplicate content to ensure smooth looping
        newsTicker.innerHTML = postItems + postItems;

        // Set random font-variation-settings for each span
        // const spans = newsTicker.querySelectorAll("span");
        // spans.forEach(span => {
        //     const randomSrff = Math.random() * 100; // Slant from 0 to 100
        //     span.style.fontVariationSettings = `"ital" 0, "srff" ${randomSrff.toFixed(2)}`;
        // });
    }

    // Alle 60 Sekunden abfragen
    fetchPosts(); // Initialer Aufruf
    setInterval(fetchPosts, 60000);