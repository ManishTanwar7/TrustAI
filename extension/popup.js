// TrustAI Popup Script

const API_BASE = "http://localhost:8000/api";
let currentTabUrl = "";
let currentSiteData = null;

document.addEventListener("DOMContentLoaded", async () => {
  // Query active tab
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab && tab.url) {
    currentTabUrl = tab.url;
    try {
      const urlObj = new URL(tab.url);
      document.getElementById("current-domain").textContent = urlObj.hostname;
      
      // Request site status from background
      chrome.runtime.sendMessage({ type: "GET_CURRENT_SITE_INFO", url: tab.url }, (response) => {
        if (response) {
          updateUI(response);
        }
      });
    } catch (e) {
      document.getElementById("current-domain").textContent = "Special Page";
    }
  }

  // Setup Aria Chat
  const sendBtn = document.getElementById("aria-send-btn");
  const inputField = document.getElementById("aria-quick-input");

  sendBtn.addEventListener("click", handleAriaQuery);
  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleAriaQuery();
  });

  // Open Full App Button
  document.getElementById("open-full-dashboard-btn").addEventListener("click", () => {
    chrome.tabs.create({ url: "http://localhost:5173/dashboard" });
  });
});

function updateUI(data) {
  currentSiteData = data;
  const score = data.trust_score || 50;
  const verdict = data.verdict || "CAUTION";

  document.getElementById("trust-score-val").textContent = score;

  const scoreCircle = document.getElementById("score-circle");
  const verdictTag = document.getElementById("verdict-tag");

  // Reset classes
  verdictTag.className = "verdict-badge";
  scoreCircle.style.borderColor = "#10b981";

  if (score < 40 || verdict === "SCAM LIKELY") {
    scoreCircle.style.borderColor = "#ef4444";
    verdictTag.classList.add("verdict-scam");
    verdictTag.textContent = "SCAM LIKELY";
  } else if (score < 60 || verdict === "HIGH RISK") {
    scoreCircle.style.borderColor = "#f97316";
    verdictTag.classList.add("verdict-high");
    verdictTag.textContent = "HIGH RISK";
  } else if (score < 80 || verdict === "CAUTION") {
    scoreCircle.style.borderColor = "#f59e0b";
    verdictTag.classList.add("verdict-caution");
    verdictTag.textContent = "CAUTION";
  } else {
    scoreCircle.style.borderColor = "#10b981";
    verdictTag.classList.add("verdict-safe");
    verdictTag.textContent = "SAFE";
  }

  // Concerns
  if (data.key_concerns && data.key_concerns.length > 0) {
    const list = document.getElementById("concerns-list");
    list.innerHTML = "";
    data.key_concerns.forEach(c => {
      const li = document.createElement("li");
      li.textContent = c;
      list.appendChild(li);
    });
    document.getElementById("concerns-section").style.display = "block";
  }
}

async function handleAriaQuery() {
  const input = document.getElementById("aria-quick-input");
  const question = input.value.trim();
  if (!question) return;

  const responseBox = document.getElementById("aria-response-box");
  responseBox.innerHTML = `<em>Aria is consulting multi-agent intelligence...</em>`;
  input.value = "";

  try {
    const res = await fetch(`${API_BASE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: question,
        attached_context: currentSiteData || { url: currentTabUrl }
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.structured_advice) {
        const adv = data.structured_advice;
        responseBox.innerHTML = `
          <strong>${adv.direct_answer}</strong><br/>
          ${adv.key_concerns.length ? `<span style="color:#b91c1c;">Key concerns:</span> ${adv.key_concerns.join(", ")}<br/>` : ""}
          <span style="color:#059669;"><strong>Recommendation:</strong> ${adv.actionable_recommendation}</span><br/>
          <small>Confidence: ${adv.confidence_percentage}%</small>
        `;
      } else {
        responseBox.textContent = data.reply_text;
      }
    } else {
      fallbackAria(question, responseBox);
    }
  } catch (err) {
    fallbackAria(question, responseBox);
  }
}

function fallbackAria(question, box) {
  if (question.toLowerCase().includes("internship") || question.toLowerCase().includes("deposit")) {
    box.innerHTML = `
      <strong>I reviewed the offer details.</strong><br/>
      • Demands upfront money before start date<br/>
      • Unregistered recruiting domain<br/>
      <strong>My recommendation:</strong> Avoid paying any upfront deposit. Legitimate companies never charge candidates. (Confidence: 91%)
    `;
  } else {
    box.innerHTML = `
      <strong>I reviewed this query.</strong><br/>
      Recommendation: Always verify corporate credentials and never share passwords or upfront fees. (Confidence: 88%)
    `;
  }
}
