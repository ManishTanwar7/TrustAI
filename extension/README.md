# TrustAI Browser Extension (Manifest V3)

The TrustAI Chrome Extension provides real-time ambient protection against predatory internships, phishing domains, dark UX patterns, and manipulative fine print.

## Key Capabilities

1. **Active Website Monitoring**: Inspects domains as you navigate and calculates an instant Trust Score (0–100).
2. **Dynamic Shield Badge**: Extension toolbar badge shows numerical score and color codes (Emerald = Safe, Amber = Caution, Red = Scam Likely).
3. **In-Page Dark Pattern Scanner**: Content script scans the DOM for false urgency timers, pre-selected checkboxes, hidden fees, and confirmshaming.
4. **Floating Security Pill**: Injects an elegant, non-intrusive indicator into web pages with one-click threat warnings.
5. **Aria AI Security Consultant**: Embedded conversational consultant available right inside the popup. Ask Aria about any offer, email, or domain.

## How to Install (Developer Mode)

1. Open Google Chrome (or Brave, Edge, Opera).
2. Navigate to `chrome://extensions/`.
3. In the top-right corner, toggle on **Developer mode**.
4. Click **Load unpacked** in the top-left corner.
5. Select the `trustai/extension` folder.
6. The TrustAI shield icon will now appear in your browser toolbar!

## Connecting to Backend

The extension is pre-configured to communicate with the local TrustAI FastAPI backend at `http://localhost:8000`.
Make sure the backend is running (`uvicorn app.main:app --reload`) so the extension can stream live multi-agent assessments. If offline, the extension seamlessly switches to built-in heuristic pattern evaluation.
