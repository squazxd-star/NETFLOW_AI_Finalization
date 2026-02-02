(async () => {
    try {
        if (!chrome?.runtime?.id) return;
        const url = chrome.runtime.getURL('src/content.js');
        if (!url || url.includes('chrome-extension://invalid/')) return;
        await import(url);
    } catch (e) {
        // Fail silently: this loader might run in contexts where extension APIs are unavailable
    }
})();
