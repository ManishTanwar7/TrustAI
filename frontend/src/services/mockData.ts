import { ChiefVerdict, SecurityMetrics } from '../types';

export const INITIAL_METRICS: SecurityMetrics = {
  total_entities_analyzed: 14892,
  scams_averted: 4218,
  average_trust_score: 72,
  safe_verified_count: 8940,
  active_protection_nodes: 6,
  agent_fleet_status: 'All 6 Gemini Agents Healthy'
};

export const SAMPLE_VERDICTS: ChiefVerdict[] = [
  {
    scan_id: 'scan_demo_intern_01',
    target_identifier: 'ApexGlobal Solutions — Remote Data Analyst Intern',
    category: 'internship',
    trust_score: 16,
    verdict: 'SCAM LIKELY',
    verdict_badge_color: 'red',
    confidence_percentage: 92,
    executive_summary: 'Severe scam indicators detected. The recruiter demands a $200 upfront laptop deposit, conducts interviews solely over Telegram, and has no registered corporate presence.',
    key_concerns: [
      'Demands $200 upfront equipment security deposit',
      'Recruiter communication routed through unofficial Telegram channel',
      'Zero company registration records found in state business registries',
      'Unrealistically inflated entry-level wage ($45/hr) with no screening'
    ],
    immediate_actions: [
      'Do NOT pay any security deposit or equipment fees under any circumstance.',
      'Cease all messaging with this recruiter immediately.',
      'Report posting to campus or platform fraud teams.'
    ],
    created_at: '2026-10-27T08:14:00Z',
    scam_risk: 94,
    privacy_index: 25,
    contract_fairness: 10,
    dark_pattern_severity: 80,
    credibility_index: 12,
    scam_analysis: {
      agent_name: 'Scam Detection Agent',
      risk_score: 94,
      verdict: 'SCAM LIKELY',
      reasons: [
        'Demands upfront monetary deposit before onboarding',
        'Directs candidate to encrypted messaging apps (Telegram) instead of corporate ATS',
        'Unrealistic promises of guaranteed high income'
      ],
      evidence: [
        'Quote: "Candidate must submit refundable $200 laptop security deposit via Zelle/USDT."'
      ],
      scam_indicators: ['Advance-fee fraud indicator', 'Untraceable communication channel'],
      suspicious_claims: ['$45/hr for unvetted entry-level data entry'],
      urgency_tactics: ['Requires deposit confirmation within 3 hours to secure spot'],
      recommendations: [
        'NEVER pay upfront fees or equipment deposits for any legitimate job or internship.'
      ]
    },
    credibility_analysis: {
      agent_name: 'Credibility Verification Agent',
      credibility_score: 12,
      is_corporate_registered: false,
      domain_age_days: 14,
      ssl_valid: true,
      contact_transparency: 'Non-existent',
      impersonation_risk: 'Suspected',
      findings: [
        'Official recruiter using public email provider (@gmail.com) instead of verified company domain',
        'No verifiable legal company registration or physical corporate address provided'
      ]
    }
  },
  {
    scan_id: 'scan_demo_contract_02',
    target_identifier: 'Freelance Master Services Agreement — BrandTech Ltd',
    category: 'contract',
    trust_score: 41,
    verdict: 'HIGH RISK',
    verdict_badge_color: 'orange',
    confidence_percentage: 88,
    executive_summary: 'Highly predatory independent contractor terms. Section 8 claims complete forfeiture of contractor pre-existing IP, and Section 14 binds signer to non-appealable arbitration in an out-of-state jurisdiction.',
    key_concerns: [
      'Perpetual personal IP assignment over pre-existing tools and libraries',
      '2-year worldwide non-compete covenant',
      'Uncapped indemnification obligations holding contractor solely liable',
      'Mandatory binding arbitration in Delaware with waiver of jury trial'
    ],
    immediate_actions: [
      'Request strike-out of IP Overreach clause (Section 8).',
      'Limit indemnification to total fees paid under this specific statement of work.',
      'Refuse non-compete covenant as an independent 1099 contractor.'
    ],
    created_at: '2026-10-26T15:20:00Z',
    scam_risk: 15,
    privacy_index: 55,
    contract_fairness: 28,
    dark_pattern_severity: 35,
    credibility_index: 75,
    contract_analysis: {
      agent_name: 'Contract Intelligence Agent',
      contract_risk_score: 72,
      verdict: 'PREDATORY',
      predatory_clauses: [
        {
          clause: 'Section 8: Comprehensive Intellectual Property Forfeiture',
          risk: 'Transfers all pre-existing tools, algorithms, and libraries to the client.',
          plain_english: 'Everything you have ever built or build during this period becomes their exclusive property.'
        },
        {
          clause: 'Section 14: Mandatory Binding Arbitration & Class Action Waiver',
          risk: 'Precludes you from suing in court or banding with other contractors.',
          plain_english: 'If they refuse to pay you, you cannot take them to small claims court.'
        }
      ],
      hidden_liabilities: [
        'One-way indemnification obligation holding user responsible for company legal expenses'
      ],
      cancellation_traps: [
        'Contract auto-renews unless written notice is received 60 days prior'
      ],
      arbitration_lockin: true,
      favorable_clauses: ['Net-30 invoice timeline'],
      summary: 'High risk for independent contractors due to IP overreach and uncapped indemnification.'
    }
  },
  {
    scan_id: 'scan_demo_url_03',
    target_identifier: 'https://linear.app',
    category: 'website',
    trust_score: 95,
    verdict: 'SAFE',
    verdict_badge_color: 'emerald',
    confidence_percentage: 95,
    executive_summary: 'Verified legitimate enterprise software service. Transparent terms, strict GDPR/CCPA privacy adherence, zero deceptive dark patterns, and authenticated company credentials.',
    key_concerns: [
      'Standard session analytics cookies with clear opt-out mechanism'
    ],
    immediate_actions: [
      'Safe to navigate and authorize standard OAuth credentials.'
    ],
    created_at: '2026-10-27T09:00:00Z',
    scam_risk: 4,
    privacy_index: 92,
    contract_fairness: 90,
    dark_pattern_severity: 6,
    credibility_index: 97
  }
];

export const DEMO_PRESETS = {
  fakeInternship: {
    company_name: 'NovaTech Digital Labs',
    job_title: 'Junior Front-End Engineering Intern',
    recruiter_email: 'hr.novatech.careers@gmail.com',
    recruiter_channel: 'Telegram (@NovaTech_Recruit)',
    stipend_claimed: '$48 / hour',
    deposit_required: true,
    deposit_amount: '$250',
    website_url: 'https://novatech-careers-portal.xyz',
    offer_letter_text: `Congratulations on passing our screening! NovaTech Digital is pleased to offer you the Junior Front-End Engineering Internship at $48/hr.

To finalize your onboarding and courier your MacBook Pro M3 and testing hardware, you must transfer a refundable security deposit of $250 to our hardware logistics partner via Zelle or Crypto (USDT) before 5:00 PM today. This deposit will be refunded in full on your first paycheck.

Please connect with our HR Director on Telegram (@NovaTech_Recruit) with your transaction confirmation.`
  },
  predatoryContract: {
    contract_title: 'Software Development & Freelance Master Agreement',
    contract_type: 'Freelance',
    user_role: 'Independent Contractor',
    contract_text: `INDEPENDENT CONTRACTOR AGREEMENT

SECTION 4: TERMINATION & AUTO-RENEWAL
This Agreement shall automatically renew for successive one-year terms unless Contractor provides written certified mail notice exactly 60 days prior to term expiration.

SECTION 8: INTELLECTUAL PROPERTY ASSIGNMENT
Contractor hereby irrevocably assigns, transfers, and conveys to Client all worldwide right, title, and interest in and to any and all inventions, works of authorship, code, algorithms, libraries, tools, and ideas conceived, developed, or utilized by Contractor, including any pre-existing software, frameworks, or methodologies.

SECTION 11: INDEMNIFICATION
Contractor agrees to indemnify, defend, and hold harmless Client, its directors, officers, and clients from and against any and all claims, liabilities, damages, and legal fees arising out of any deliverables, without limitation of liability.

SECTION 14: DISPUTE RESOLUTION & ARBITRATION
Any dispute arising under this Agreement shall be resolved exclusively through confidential binding arbitration in Wilmington, Delaware. Contractor hereby waives any right to a trial by jury or to participate in any class action lawsuit.`
  },
  privacyPolicy: {
    service_name: 'CashQuick Mobile Credit',
    privacy_policy_url: 'https://cashquickmobile.io/privacy',
    privacy_policy_text: `CASHQUICK PRIVACY POLICY

DATA WE COLLECT:
We automatically access and collect your contacts list, call logs, SMS metadata, precise GPS coordinates continuously in the background, and device hardware identifiers.

HOW WE SHARE YOUR DATA:
We may sell, license, and transfer your personal information, financial telemetries, and geolocation history to third-party commercial data brokers, advertising aggregators, and credit rating partners.

DATA RETENTION:
We retain all collected data indefinitely on our servers. You acknowledge and agree that account deletion does not remove archived marketing profiles.`
  }
};
