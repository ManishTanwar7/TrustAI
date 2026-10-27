from datetime import datetime, timezone

SEED_THREATS = [
    {
        "scan_id": "scan_int_001",
        "target_identifier": "GlobalTech Remote Internship - Data Analyst",
        "category": "internship",
        "trust_score": 12,
        "verdict": "SCAM LIKELY",
        "verdict_badge_color": "red",
        "confidence_percentage": 94,
        "executive_summary": "High-confidence fake internship recruitment ring demanding $250 laptop insurance deposit via Crypto/Zelle with zero registered entity credentials.",
        "key_concerns": [
            "Mandatory upfront equipment security deposit ($250)",
            "Recruiter using non-corporate @gmail.com on Telegram",
            "No state or corporate registrar filing found",
            "Unrealistic $45/hr entry-level stipend"
        ],
        "immediate_actions": [
            "Cease communication immediately and block recruiter contacts",
            "Never transfer money or deposit checks for equipment",
            "Report posting to student career services"
        ],
        "created_at": "2026-10-26T14:22:00Z",
        "scam_risk": 95,
        "privacy_index": 20,
        "contract_fairness": 5,
        "dark_pattern_severity": 85,
        "credibility_index": 10
    },
    {
        "scan_id": "scan_contract_002",
        "target_identifier": "ApexDesign Freelance Contractor Agreement",
        "category": "contract",
        "trust_score": 42,
        "verdict": "HIGH RISK",
        "verdict_badge_color": "orange",
        "confidence_percentage": 89,
        "executive_summary": "Extremely one-sided contractor terms containing perpetual IP assignment of pre-existing work and unilateral non-compete clauses.",
        "key_concerns": [
            "Assigns all personal intellectual property created during contract term",
            "2-year worldwide non-compete covenant",
            "Unlimited contractor indemnification without reciprocal client protections",
            "Mandatory binding arbitration in Delaware"
        ],
        "immediate_actions": [
            "Request deletion of Section 8 (IP Overreach) and Section 12 (Non-Compete)",
            "Add mutual $5,000 liability cap"
        ],
        "created_at": "2026-10-25T09:15:00Z",
        "scam_risk": 20,
        "privacy_index": 60,
        "contract_fairness": 32,
        "dark_pattern_severity": 40,
        "credibility_index": 70
    },
    {
        "scan_id": "scan_privacy_003",
        "target_identifier": "QuickLoansMobile.io Privacy Policy",
        "category": "privacy",
        "trust_score": 28,
        "verdict": "HIGH RISK",
        "verdict_badge_color": "orange",
        "confidence_percentage": 91,
        "executive_summary": "Predatory consumer data collection selling user contacts, call logs, and continuous GPS location to credit brokers and marketing aggregators.",
        "key_concerns": [
            "Explicit right to sell contact book and geolocation to third-party brokers",
            "Persistent device fingerprinting and cross-app tracking",
            "Indefinite retention of financial telemetries"
        ],
        "immediate_actions": [
            "Deny contacts and location permissions in mobile OS settings",
            "Submit GDPR/CCPA Article 17 erasure request"
        ],
        "created_at": "2026-10-24T18:40:00Z",
        "scam_risk": 60,
        "privacy_index": 18,
        "contract_fairness": 30,
        "dark_pattern_severity": 75,
        "credibility_index": 45
    },
    {
        "scan_id": "scan_url_004",
        "target_identifier": "https://secure-apple-id-verify.account-update.xyz",
        "category": "website",
        "trust_score": 4,
        "verdict": "SCAM LIKELY",
        "verdict_badge_color": "red",
        "confidence_percentage": 98,
        "executive_summary": "Active credential phishing domain spoofing Apple ID verification with homoglyph branding and immediate credential harvest payloads.",
        "key_concerns": [
            "Explicit brand spoofing and deceptive subdomain nesting",
            "High-risk .xyz disposable TLD registered 48 hours ago",
            "Matched global anti-phishing threat intelligence signatures"
        ],
        "immediate_actions": [
            "Do not enter passwords or two-factor codes",
            "Close browser tab immediately"
        ],
        "created_at": "2026-10-27T08:10:00Z",
        "scam_risk": 99,
        "privacy_index": 5,
        "contract_fairness": 0,
        "dark_pattern_severity": 95,
        "credibility_index": 2
    },
    {
        "scan_id": "scan_url_005",
        "target_identifier": "https://linear.app",
        "category": "website",
        "trust_score": 96,
        "verdict": "SAFE",
        "verdict_badge_color": "emerald",
        "confidence_percentage": 96,
        "executive_summary": "Exemplary digital credibility with ethical UX practices, valid enterprise TLS, transparent corporate registration, and GDPR-compliant privacy posture.",
        "key_concerns": [
            "Standard session telemetry and essential performance cookies"
        ],
        "immediate_actions": [
            "Safe to use following standard enterprise security hygiene"
        ],
        "created_at": "2026-10-27T09:30:00Z",
        "scam_risk": 2,
        "privacy_index": 92,
        "contract_fairness": 94,
        "dark_pattern_severity": 5,
        "credibility_index": 98
    }
]
