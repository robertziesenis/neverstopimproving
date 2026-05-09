// Array für die Posts
const postsList = [];
const feedUrl = "./rss-proxy.php";
const fallbackFeedUrl =
  "https://api.allorigins.win/raw?url=" +
  encodeURIComponent(
    "https://www.reddit.com/r/selfimprovement/new.rss?limit=100",
  );

async function fetchFeed(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok)
    throw new Error(`Fehler beim Laden des RSS-Feeds von ${url}`);

  const feedText = await response.text();
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(feedText, "application/xml");
  if (xmlDoc.querySelector("parsererror")) {
    throw new Error("Ungültiger XML-Inhalt im Feed");
  }

  return xmlDoc;
}

// Funktion zum Laden der Posts aus dem Reddit RSS-Feed
async function loadPosts() {
  try {
    let xmlDoc;
    try {
      xmlDoc = await fetchFeed(feedUrl);
    } catch (primaryError) {
      console.warn(
        "Primärer RSS-Feed fehlgeschlagen, versuche Fallback:",
        primaryError,
      );
      xmlDoc = await fetchFeed(fallbackFeedUrl);
    }

    const entries = Array.from(xmlDoc.querySelectorAll("entry"));
    if (entries.length === 0) {
      throw new Error("Keine Einträge im RSS-Feed gefunden");
    }

    const posts = entries.map((entry) => {
      const title =
        entry.querySelector("title")?.textContent?.trim() || "Kein Titel";
      const link =
        entry.querySelector('link[rel="alternate"]')?.getAttribute("href") ||
        entry.querySelector("link")?.textContent ||
        "#";
      const author =
        entry.querySelector("author > name")?.textContent?.trim() || "";

      return { title, link, author };
    });

    postsList.length = 0;
    postsList.push(...posts);
    updateNews();
  } catch (error) {
    console.error("Fehler beim Laden des Reddit-RSS-Feeds:", error);
  }
}

function updateNews() {
  const newsTicker = document.getElementById("news-ticker");
  const postItems = postsList
    .map((news) => `<span>${news.title}</span>`)
    .join("");

  // Duplicate content to ensure smooth looping
  newsTicker.innerHTML = postItems + postItems;
}

// Posts laden und alle 60 Sekunden aktualisieren
loadPosts();
setInterval(loadPosts, 60000);
