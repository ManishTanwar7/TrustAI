// TrustAI Content Script: Dark Pattern Scanner & Trust Pill

(function () {
  // Avoid re-injecting
  if (window.__trustai_injected) return;
  window.__trustai_injected = true;

  const url = window.location.href;
  const pageText = document.body ? document.body.innerText.substring(0, 15000) : "";

  // Scan DOM for deceptive UX patterns
  function detectDarkPatterns() {
    const patterns = [];
    const textLower = pageText.toLowerCase();

    // 1. False Urgency / Countdown
    const countdownRegex = /\b(\d{1,2}\s*(minutes?|hours?|seconds?)\s*left|expires in|hurry|only \d+ left in stock)\b/i;
    if (countdownRegex.test(pageText)) {
      patterns.push({
        type: "False Urgency",
        description: "Countdown timers or artificial scarcity pressure detected."
      });
    }

    // 2. Confirmshaming
    const shamePhrases = [
      "no thanks, i prefer paying full price",
      "no, i don't want to save",
      "no, i like paying more",
      "i don't care about my security"
    ];
    if (shamePhrases.some(p => textLower.includes(p))) {
      patterns.push({
        type: "Confirmshaming",
        description: "Emotional manipulation designed to make you feel guilty for opting out."
      });
    }

    // 3. Pre-selected checkboxes
    const preCheckedBoxes = document.querySelectorAll('input[type="checkbox"][checked]');
    if (preCheckedBoxes.length > 0) {
      patterns.push({
        type: "Pre-selected Add-on",
        description: "Checkboxes are pre-selected by default to opt you into subscriptions or extras."
      });
    }

    // 4. Internship upfront payment flags
    if (/security deposit|registration fee|laptop deposit|training fee/i.test(pageText)) {
      patterns.push({
        type: "Upfront Fee Warning",
        description: "Website mentions upfront security deposit or registration fee for employment."
      });
    }

    return patterns;
  }

  const detected = detectDarkPatterns();

  // Create subtle floating pill
  function injectTrustPill() {
    const pill = document.createElement("div");
    pill.id = "trustai-floating-pill";
    
    const hasCritical = detected.some(d => d.type === "Upfront Fee Warning");
    const pillColor = hasCritical ? "#EF4444" : (detected.length > 0 ? "#F59E0B" : "#10B981");
    const statusText = hasCritical ? "Scam Warning" : (detected.length > 0 ? `${detected.length} Dark Patterns` : "Site Monitored");

    pill.innerHTML = `
      <div class="trustai-pill-inner" style="border-left: 4px solid ${pillColor};">
        <div class="trustai-shield-icon">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
          </svg>
        </div>
        <span class="trustai-pill-label">TrustAI: <strong>${statusText}</strong></span>
        <button id="trustai-close-pill" title="Dismiss">&times;</button>
      </div>
    `;

    document.body.appendChild(pill);

    document.getElementById("trustai-close-pill")?.addEventListener("click", (e) => {
      e.stopPropagation();
      pill.style.display = "none";
    });

    pill.addEventListener("click", () => {
      // Notify background to open extension or show modal
      if (detected.length > 0) {
        alert(
          `TrustAI Security Alert:\n\n` +
          detected.map(d => `• ${d.type}: ${d.description}`).join("\n\n") +
          `\n\nOpen TrustAI popup to consult Aria AI Security Assistant.`
        );
      }
    });
  }

  // Inject if document ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectTrustPill);
  } else {
    injectTrustPill();
  }
})();
