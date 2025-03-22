const simulatedHTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Tech News Today</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="main.css">
  <script src="https://cdn.google-analytics.com/ga.js"></script>
  <script src="https://ads.google.com/ads.js"></script>
  <script src="https://facebook.net/track.js"></script>
  <script src="https://cdn.cookieconsent.com/banner.js"></script>
</head>
<body>
  <header>
    <h1>Tech News Today</h1>
    <nav>
      <a href="/">Home</a> | <a href="/latest">Latest</a> | <a href="/privacy">Privacy</a>
    </nav>
  </header>

  <main>
    <article>
      <h2>Big Tech Acquires Startup</h2>
      <p>In a surprising move, Big Tech has acquired...</p>
    </article>

    <aside>
      <h3>Sponsored</h3>
      <iframe src="https://ads.doubleclick.net/frame1"></iframe>
      <iframe src="https://ads.doubleclick.net/frame2"></iframe>
    </aside>

    <section>
      <h3>Follow Us</h3>
      <div class="social-widget">
        <iframe src="https://www.facebook.com/plugins/like.php"></iframe>
        <script src="https://twitter.com/widgets.js"></script>
      </div>
    </section>

    <section class="video-section">
      <h3>Watch Our Latest Video</h3>
      <script src="https://cdn.videotrack.com/player.js"></script>
    </section>
  </main>

  <footer>
    <p>© 2025 Tech News Today</p>
    <script src="https://analytics.example.com/custom.js"></script>
  </footer>
</body>
</html>
`;

const trackerData = [
  {
    snippet: "<script src=\"https://cdn.google-analytics.com/ga.js\"></script>",
    info: { name: "Google Analytics", category: "Analytics", company: "Google" }
  },
  {
    snippet: "<script src=\"https://ads.google.com/ads.js\"></script>",
    info: { name: "Google Ads", category: "Advertising", company: "Google" }
  },
  {
    snippet: "<script src=\"https://facebook.net/track.js\"></script>",
    info: { name: "Facebook Tracker", category: "Social Media", company: "Meta" }
  },
  {
    snippet: "<script src=\"https://cdn.cookieconsent.com/banner.js\"></script>",
    info: { name: "Cookie Consent", category: "Consent Tool", company: "CookieConsent" }
  },
  {
    snippet: "<iframe src=\"https://ads.doubleclick.net/frame1\"></iframe>",
    info: { name: "DoubleClick Ad 1", category: "Advertising", company: "Google" }
  },
  {
    snippet: "<iframe src=\"https://ads.doubleclick.net/frame2\"></iframe>",
    info: { name: "DoubleClick Ad 2", category: "Advertising", company: "Google" }
  },
  {
    snippet: "<iframe src=\"https://www.facebook.com/plugins/like.php\"></iframe>",
    info: { name: "Facebook Like", category: "Social Media", company: "Meta" }
  },
  {
    snippet: "<script src=\"https://twitter.com/widgets.js\"></script>",
    info: { name: "Twitter Widgets", category: "Social Media", company: "Twitter" }
  },
  {
    snippet: "<script src=\"https://cdn.videotrack.com/player.js\"></script>",
    info: { name: "Video Tracker", category: "Media", company: "VideoTrack Inc." }
  },
  {
    snippet: "<script src=\"https://analytics.example.com/custom.js\"></script>",
    info: { name: "Custom Analytics", category: "Analytics", company: "Analytics Co." }
  }
];

function escapeHTML(html) {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function highlightTrackers(html, trackerData) {
  let escapedHTML = escapeHTML(html);
  trackerData.forEach((tracker, index) => {
    const escapedSnippet = escapeHTML(tracker.snippet);
    const highlighted = `<span class="tracker-highlight" data-index="${index}">${escapedSnippet}</span>`;
    escapedHTML = escapedHTML.replace(escapedSnippet, highlighted);
  });
  return escapedHTML;
}

function showPopup(event, tracker) {
  const popup = document.getElementById('tracker-popup');
  popup.innerHTML = `
    <strong>${tracker.name}</strong><br>
    Category: ${tracker.category}<br>
    Company: ${tracker.company}
  `;
  popup.style.top = `${event.pageY + 10}px`;
  popup.style.left = `${event.pageX + 10}px`;
  popup.style.display = 'block';
}

function hidePopup() {
  document.getElementById('tracker-popup').style.display = 'none';
}

document.addEventListener('DOMContentLoaded', () => {
  const htmlContent = document.getElementById('html-content');
  htmlContent.innerHTML = highlightTrackers(simulatedHTML, trackerData);

  document.querySelectorAll('.tracker-highlight').forEach(el => {
    el.addEventListener('click', (e) => {
      const index = parseInt(el.dataset.index);
      showPopup(e, trackerData[index].info);
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tracker-highlight')) {
      hidePopup();
    }
  });
});
