// Lädt Navigation, Footer und Cookie-Banner beim Seitenladen per fetch
(function () {
    const components = [
        { id: 'site-nav', url: 'components/navigation.html' },
        { id: 'site-footer', url: 'components/footer.html' },
        { id: 'cookie-banner', url: 'components/cookie-banner-html' }
    ];

    function loadComponent(item) {
        const container = document.getElementById(item.id);
        if (!container) {
            console.warn(`Kein Container mit id="${item.id}" gefunden.`);
            return Promise.resolve();
        }

        return fetch(item.url, { cache: 'no-cache' })
            .then(response => {
                if (!response.ok) throw new Error(`${item.url} returned ${response.status}`);
                return response.text();
            })
            .then(html => {
                container.innerHTML = html;
            })
            .catch(err => {
                console.error(`Fehler beim Laden von ${item.url}:`, err);
            });
    }

    document.addEventListener('DOMContentLoaded', () => {
        Promise.all(components.map(loadComponent)).then(() => {
            // Optional: dispatch event when all components sind geladen
            document.dispatchEvent(new Event('components:loaded'));
            console.info('Alle Komponenten geladen.');
        });
    });
})();
