// Mock data for the TM Platform

export interface Alert {
  id: string;
  issueDate: string;
  alertDate: string;
  alertScore: number;
  subjectEntity: string;
  entityType: 'Person' | 'Corporate' | 'Fund' | 'Distributor';
  entityId: string;
  priorAlerts: number;
  triggeredRules: string[];
  counterparty: string;
  status: 'Pending review' | 'In review' | 'Escalated' | 'Closed no issue' | 'Filed & complete';
  alertAge: number;
  aged: boolean;
  owner: string | null;
  caseId: string | null;
  businessUnit: string;
  region: string;
  priority: 'High' | 'Medium' | 'Low';
  slaDue: string;
  slaRisk: boolean;
  rfiStatus: 'None' | 'Sent' | 'Awaiting' | 'Overdue' | 'Responded';
  watchers: number;
  lastActivity: string;
  attachments: number;
  narrativeDraft: boolean;
  closureReason?: string;
  typologyTags: string[];
  amount?: number;
  currency?: string;
}

export interface Entity {
  id: string;
  name: string;
  type: 'Person' | 'Corporate' | 'Fund' | 'Distributor';
  riskScore: number;
  jurisdiction: string;
  kycStatus: string;
  pepStatus: boolean;
  sanctionsHit: boolean;
  relationships: Array<{
    entityId: string;
    entityName: string;
    relationshipType: string;
    strength: number;
  }>;
  accounts: Array<{
    accountId: string;
    accountType: string;
    balance: number;
    currency: string;
  }>;
  alerts: string[];
  cases: string[];
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  currency: string;
  fromEntity: string;
  toEntity: string;
  fromAccount: string;
  toAccount: string;
  status: string;
  flagged: boolean;
}

export interface Case {
  id: string;
  createdDate: string;
  subject: string;
  status: 'Draft' | 'In Progress' | 'Pending QA' | 'SAR Filed' | 'Closed';
  priority: 'High' | 'Medium' | 'Low';
  assignee: string;
  alerts: string[];
  entities: string[];
  narrative: string;
  sarStatus?: 'Not Filed' | 'Preparing' | 'Filed' | 'Acknowledged';
  jurisdiction: string;
  filingDeadline?: string;
}

export interface RFI {
  id: string;
  type: 'Internal' | 'External';
  status: 'Draft' | 'Sent' | 'Awaiting' | 'Overdue' | 'Responded' | 'Verified' | 'Closed';
  subject: string;
  recipient: string;
  sentDate?: string;
  dueDate: string;
  relatedAlerts: string[];
  relatedEntities: string[];
  questions: Array<{
    question: string;
    response?: string;
    responseDate?: string;
  }>;
}

export const mockAlerts: Alert[] = [
  {
    id: 'ALT-2024-001234',
    issueDate: '2024-11-08T14:23:00',
    alertDate: '2024-11-08T15:00:00',
    alertScore: 87,
    subjectEntity: 'Horizon Capital Partners Ltd',
    entityType: 'Corporate',
    entityId: 'ENT-00451',
    priorAlerts: 3,
    triggeredRules: ['Rapid Movement', 'High Risk Corridor', '3rd Party Payout'],
    counterparty: 'Multiple (8)',
    status: 'Pending review',
    alertAge: 2,
    aged: false,
    owner: null,
    caseId: null,
    businessUnit: 'Asset Management',
    region: 'EMEA',
    priority: 'High',
    slaDue: '2024-11-12T15:00:00',
    slaRisk: false,
    rfiStatus: 'None',
    watchers: 0,
    lastActivity: '2024-11-08T15:00:00',
    attachments: 0,
    narrativeDraft: false,
    typologyTags: ['Rapid Movement', '3rd Party Payment', 'High Risk Corridor'],
    amount: 4750000,
    currency: 'EUR'
  },
  {
    id: 'ALT-2024-001189',
    issueDate: '2024-11-05T09:15:00',
    alertDate: '2024-11-05T10:00:00',
    alertScore: 92,
    subjectEntity: 'Zhang Wei',
    entityType: 'Person',
    entityId: 'ENT-03294',
    priorAlerts: 0,
    triggeredRules: ['Structuring', 'Velocity Anomaly', 'Network Risk'],
    counterparty: 'Pacific Trade Corp',
    status: 'In review',
    alertAge: 5,
    aged: false,
    owner: 'Sarah Chen',
    caseId: 'CASE-2024-0089',
    businessUnit: 'Private Banking',
    region: 'APAC',
    priority: 'High',
    slaDue: '2024-11-09T10:00:00',
    slaRisk: true,
    rfiStatus: 'Sent',
    watchers: 2,
    lastActivity: '2024-11-09T16:45:00',
    attachments: 3,
    narrativeDraft: true,
    typologyTags: ['Structuring', 'Layering'],
    amount: 1250000,
    currency: 'USD'
  },
  {
    id: 'ALT-2024-001156',
    issueDate: '2024-11-02T11:30:00',
    alertDate: '2024-11-02T12:00:00',
    alertScore: 68,
    subjectEntity: 'Emerald Fund SICAV',
    entityType: 'Fund',
    entityId: 'ENT-01122',
    priorAlerts: 7,
    triggeredRules: ['Rapid Switching', 'Omnibus Pattern'],
    counterparty: 'Multiple (12)',
    status: 'In review',
    alertAge: 8,
    aged: true,
    owner: 'Marcus Rodriguez',
    caseId: null,
    businessUnit: 'Asset Servicing',
    region: 'EMEA',
    priority: 'Medium',
    slaDue: '2024-11-06T12:00:00',
    slaRisk: true,
    rfiStatus: 'Awaiting',
    watchers: 1,
    lastActivity: '2024-11-10T09:20:00',
    attachments: 5,
    narrativeDraft: false,
    typologyTags: ['Rapid Switching', 'Omnibus'],
    amount: 8900000,
    currency: 'GBP'
  },
  {
    id: 'ALT-2024-001078',
    issueDate: '2024-10-28T16:00:00',
    alertDate: '2024-10-28T17:00:00',
    alertScore: 75,
    subjectEntity: 'Global Distributors AG',
    entityType: 'Distributor',
    entityId: 'ENT-00892',
    priorAlerts: 2,
    triggeredRules: ['Concentration Risk', 'Cross Border Anomaly'],
    counterparty: 'Apex Trust Services',
    status: 'Escalated',
    alertAge: 13,
    aged: true,
    owner: 'James Park',
    caseId: 'CASE-2024-0085',
    businessUnit: 'Distribution',
    region: 'EMEA',
    priority: 'High',
    slaDue: '2024-11-01T17:00:00',
    slaRisk: true,
    rfiStatus: 'Responded',
    watchers: 4,
    lastActivity: '2024-11-10T11:00:00',
    attachments: 8,
    narrativeDraft: true,
    typologyTags: ['Concentration', 'Cross Border'],
    amount: 12300000,
    currency: 'CHF'
  },
  {
    id: 'ALT-2024-001012',
    issueDate: '2024-10-25T13:45:00',
    alertDate: '2024-10-25T14:00:00',
    alertScore: 45,
    subjectEntity: 'Northern Pension Fund',
    entityType: 'Fund',
    entityId: 'ENT-02341',
    priorAlerts: 1,
    triggeredRules: ['Turnover Threshold'],
    counterparty: 'State Street Custodian',
    status: 'Closed no issue',
    alertAge: 16,
    aged: false,
    owner: 'Emma Williams',
    caseId: null,
    businessUnit: 'Asset Servicing',
    region: 'Americas',
    priority: 'Low',
    slaDue: '2024-10-29T14:00:00',
    slaRisk: false,
    rfiStatus: 'None',
    watchers: 0,
    lastActivity: '2024-10-27T10:30:00',
    attachments: 1,
    narrativeDraft: false,
    closureReason: 'Normal business activity - pension rebalancing',
    typologyTags: ['Turnover'],
    amount: 2100000,
    currency: 'USD'
  },
  {
    id: 'ALT-2024-000989',
    issueDate: '2024-10-23T08:20:00',
    alertDate: '2024-10-23T09:00:00',
    alertScore: 94,
    subjectEntity: 'Nexus Holdings BV',
    entityType: 'Corporate',
    entityId: 'ENT-01567',
    priorAlerts: 5,
    triggeredRules: ['Shell Company Risk', 'UBO Anomaly', 'Round Trip'],
    counterparty: 'Multiple (15)',
    status: 'Filed & complete',
    alertAge: 18,
    aged: false,
    owner: 'David Kumar',
    caseId: 'CASE-2024-0081',
    businessUnit: 'Asset Management',
    region: 'EMEA',
    priority: 'High',
    slaDue: '2024-10-27T09:00:00',
    slaRisk: false,
    rfiStatus: 'Responded',
    watchers: 3,
    lastActivity: '2024-11-05T14:20:00',
    attachments: 12,
    narrativeDraft: true,
    closureReason: 'SAR filed with FinCEN',
    typologyTags: ['Shell Company', 'Layering', 'Round Trip'],
    amount: 18700000,
    currency: 'EUR'
  }
];

export const mockEntities: Record<string, Entity> = {
  'ENT-00451': {
    id: 'ENT-00451',
    name: 'Horizon Capital Partners Ltd',
    type: 'Corporate',
    riskScore: 78,
    jurisdiction: 'Cayman Islands',
    kycStatus: 'Enhanced Due Diligence',
    pepStatus: true,
    sanctionsHit: false,
    relationships: [
      { entityId: 'ENT-00452', entityName: 'Horizon Investments LLC', relationshipType: 'Subsidiary', strength: 0.95 },
      { entityId: 'ENT-00453', entityName: 'Michael Chen', relationshipType: 'UBO', strength: 0.60 },
      { entityId: 'ENT-00454', entityName: 'Victoria Holdings', relationshipType: 'Parent', strength: 0.85 }
    ],
    accounts: [
      { accountId: 'ACC-10234', accountType: 'Investment', balance: 24500000, currency: 'EUR' },
      { accountId: 'ACC-10235', accountType: 'Operating', balance: 1200000, currency: 'USD' }
    ],
    alerts: ['ALT-2024-001234', 'ALT-2024-000876', 'ALT-2024-000654'],
    cases: []
  },
  'ENT-03294': {
    id: 'ENT-03294',
    name: 'Zhang Wei',
    type: 'Person',
    riskScore: 85,
    jurisdiction: 'Hong Kong',
    kycStatus: 'Enhanced Due Diligence',
    pepStatus: false,
    sanctionsHit: false,
    relationships: [
      { entityId: 'ENT-03295', entityName: 'Pacific Trade Corp', relationshipType: 'Director', strength: 0.90 },
      { entityId: 'ENT-03296', entityName: 'Eastern Investment Fund', relationshipType: 'Investor', strength: 0.45 }
    ],
    accounts: [
      { accountId: 'ACC-20445', accountType: 'Trading', balance: 3400000, currency: 'USD' },
      { accountId: 'ACC-20446', accountType: 'Savings', balance: 890000, currency: 'HKD' }
    ],
    alerts: ['ALT-2024-001189'],
    cases: ['CASE-2024-0089']
  }
};

export const mockTransactions: Transaction[] = [
  {
    id: 'TXN-20241108-00234',
    date: '2024-11-08T14:23:00',
    type: 'Wire Transfer',
    amount: 1250000,
    currency: 'EUR',
    fromEntity: 'Horizon Capital Partners Ltd',
    toEntity: 'Offshore Trust Services',
    fromAccount: 'ACC-10234',
    toAccount: 'ACC-98765',
    status: 'Completed',
    flagged: true
  },
  {
    id: 'TXN-20241108-00198',
    date: '2024-11-08T11:15:00',
    type: 'Wire Transfer',
    amount: 1500000,
    currency: 'EUR',
    fromEntity: 'Horizon Capital Partners Ltd',
    toEntity: 'Malta Trading Ltd',
    fromAccount: 'ACC-10234',
    toAccount: 'ACC-54321',
    status: 'Completed',
    flagged: true
  },
  {
    id: 'TXN-20241108-00167',
    date: '2024-11-08T09:30:00',
    type: 'Wire Transfer',
    amount: 2000000,
    currency: 'EUR',
    fromEntity: 'Victoria Holdings',
    toEntity: 'Horizon Capital Partners Ltd',
    fromAccount: 'ACC-11111',
    toAccount: 'ACC-10234',
    status: 'Completed',
    flagged: false
  }
];

export const mockCases: Case[] = [
  {
    id: 'CASE-2024-0089',
    createdDate: '2024-11-05T10:30:00',
    subject: 'Structuring and layering investigation - Zhang Wei',
    status: 'In Progress',
    priority: 'High',
    assignee: 'Sarah Chen',
    alerts: ['ALT-2024-001189'],
    entities: ['ENT-03294', 'ENT-03295'],
    narrative: 'Subject appears to be conducting structured transactions through Pacific Trade Corp to avoid reporting thresholds. Pattern of deposits just below $10k followed by rapid wire transfers to high-risk jurisdictions.',
    sarStatus: 'Preparing',
    jurisdiction: 'US',
    filingDeadline: '2024-11-15T23:59:59'
  },
  {
    id: 'CASE-2024-0085',
    createdDate: '2024-10-29T14:00:00',
    subject: 'Distributor concentration risk - Global Distributors AG',
    status: 'Pending QA',
    priority: 'High',
    assignee: 'James Park',
    alerts: ['ALT-2024-001078', 'ALT-2024-000945'],
    entities: ['ENT-00892', 'ENT-00893'],
    narrative: 'Unusual concentration of flows through single distributor to high-risk jurisdictions. Cross-border patterns suggest potential layering activity.',
    sarStatus: 'Preparing',
    jurisdiction: 'UK',
    filingDeadline: '2024-11-18T23:59:59'
  },
  {
    id: 'CASE-2024-0081',
    createdDate: '2024-10-24T09:15:00',
    subject: 'Shell company layering - Nexus Holdings BV',
    status: 'SAR Filed',
    priority: 'High',
    assignee: 'David Kumar',
    alerts: ['ALT-2024-000989', 'ALT-2024-000876', 'ALT-2024-000754'],
    entities: ['ENT-01567', 'ENT-01568', 'ENT-01569'],
    narrative: 'Complex layering scheme involving multiple shell companies. Round-trip transactions and unclear beneficial ownership structure. SAR filed with FinCEN on 2024-11-05.',
    sarStatus: 'Filed',
    jurisdiction: 'US'
  }
];

export const mockRFIs: RFI[] = [
  {
    id: 'RFI-2024-0045',
    type: 'External',
    status: 'Awaiting',
    subject: 'Source of funds verification - Emerald Fund redemption',
    recipient: 'State Street Transfer Agent',
    sentDate: '2024-11-07T10:00:00',
    dueDate: '2024-11-14T17:00:00',
    relatedAlerts: ['ALT-2024-001156'],
    relatedEntities: ['ENT-01122'],
    questions: [
      { question: 'Please provide documentation showing the source of the £8.9M subscription from October 2024' },
      { question: 'Confirm the identity and relationship of beneficial owners for account 445-2234' }
    ]
  },
  {
    id: 'RFI-2024-0043',
    type: 'Internal',
    status: 'Responded',
    subject: 'Front office verification - Horizon Capital transactions',
    recipient: 'Trading Desk - EMEA',
    sentDate: '2024-11-06T14:30:00',
    dueDate: '2024-11-13T17:00:00',
    relatedAlerts: ['ALT-2024-001234'],
    relatedEntities: ['ENT-00451'],
    questions: [
      { 
        question: 'Were the three wire transfers on Nov 8 pre-advised by the client?',
        response: 'Yes, all three transfers were part of a previously disclosed restructuring plan.',
        responseDate: '2024-11-08T16:20:00'
      }
    ]
  }
];
