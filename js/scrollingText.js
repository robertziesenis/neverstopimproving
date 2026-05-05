// Array für die Posts
    const postsList = [];

    // Funktion zum Laden der Posts aus der lokalen JSON-Datei
    async function loadPosts() {
      try {
        const response = await fetch('./posts.json');
        if (!response.ok) throw new Error('Fehler beim Laden der Posts');
        const posts = await response.json();

        // Posts zur Liste hinzufügen
        posts.forEach(post => {
          if (!postsList.some(existing => existing.title === post.title)) {
            postsList.push(post);
          }
        });

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

        // Set random font-variation-settings for each span
        // const spans = newsTicker.querySelectorAll("span");
        // spans.forEach(span => {
        //     const randomSrff = Math.random() * 100; // Slant from 0 to 100
        //     span.style.fontVariationSettings = `"ital" 0, "srff" ${randomSrff.toFixed(2)}`;
        // });
    }

    // Posts laden und alle 60 Sekunden aktualisieren
    loadPosts();
    setInterval(loadPosts, 60000);