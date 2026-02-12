// Background script - Side panel behavior is now handled in service-worker.js
// This file is kept for compatibility with service-worker-loader.js

chrome.runtime.onInstalled.addListener(() => {
    console.log("NetFlow AI Extension Installed");
});
