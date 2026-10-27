// TrustAI Background Service Worker (Manifest V3)

const API_BASE = "http://localhost:8000/api/extension";
const cache = new Map();

// Helper to sanitize hostname
function getDomain(url) {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return parsed.hostname;
    }
  } catch (e) {
    return null;
  }
  return null;
}

// Check domain risk and update extension badge
async function auditTab(tabId, url) {
  const domain = getDomain(url);
  if (!domain || domain.includes("localhost") || domain.includes("chrome://")) {
    chrome.action.setBadgeText({ tabId, text: "" });
    return;
  }

  // Check cache
  if (cache.has(domain)) {
    updateBadge(tabId, cache.get(domain));
    return;
  }

  try {
    const response = await fetch(`${API_BASE}/check-domain?url=${encodeURIComponent(url)}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      const data = await response.json();
      cache.set(domain, data);
      updateBadge(tabId, data);
    } else {
      // Fallback local heuristic
      const mockResult = evaluateLocalDomain(domain);
      cache.set(domain, mockResult);
      updateBadge(tabId, mockResult);
    }
  } catch (err) {
    // Offline/Fallback calculation
    const mockResult = evaluateLocalDomain(domain);
    cache.set(domain, mockResult);
    updateBadge(tabId, mockResult);
  }
}

function updateBadge(tabId, data) {
  const score = data.trust_score || 50;
  const badgeText = `${score}`;
  chrome.action.setBadgeText({ tabId, text: badgeText });

  let color = "#10B981"; // Emerald
  if (score < 40) {
    color = "#EF4444"; // Red
  } else if (score < 75) {
    color = "#F59E0B"; // Amber
  }

  chrome.action.setBadgeBackgroundColor({ tabId, color });
}

function evaluateLocalDomain(domain) {
  const isSuspiciousTLD = /\.(xyz|top|buzz|click|sbs|work|cfd)$/i.test(domain);
  const isTyposquat = /(amaz0n|paypa1|g00gle|apple-verify|intern-offer)/i.test(domain);

  let score = 88;
  let verdict = "SAFE";
  const concerns = [];

  if (isTyposquat) {
    score = 15;
    verdict = "SCAM LIKELY";
    concerns.push("Suspicious domain impersonation detected");
  } else if (isSuspiciousTLD) {
    score = 42;
    verdict = "HIGH RISK";
    concerns.push("Disposable top-level domain frequently used in scam campaigns");
  }

  return {
    domain,
    trust_score: score,
    verdict,
    badge_color: score >= 75 ? "emerald" : score >= 45 ? "amber" : "red",
    key_concerns: concerns
  };
}

// Tab navigation listeners
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete" && tab.url) {
    auditTab(tabId, tab.url);
  }
});

chrome.tabs.onActivated.addListener(async (activeInfo) => {
  const tab = await chrome.tabs.get(activeInfo.tabId);
  if (tab.url) {
    auditTab(activeInfo.tabId, tab.url);
  }
});

// Message listener from popup and content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === "GET_CURRENT_SITE_INFO") {
    const domain = getDomain(request.url);
    if (cache.has(domain)) {
      sendResponse(cache.get(domain));
    } else {
      auditTab(sender.tab ? sender.tab.id : undefined, request.url).then(() => {
        sendResponse(cache.get(domain) || evaluateLocalDomain(domain));
      });
      return true; // async reply
    }
  }
});
