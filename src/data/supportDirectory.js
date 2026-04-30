const DIRECTORY_GROUP_ORDER = ['urgent', 'clinical', 'community'];

export const DIRECTORY_GROUPS = {
  urgent: {
    title: 'Urgent support now',
    description: 'Use these first if there is immediate risk or severe distress.'
  },
  clinical: {
    title: 'Clinical support in Accra',
    description: 'Public specialist and referral pathways for continued care.'
  },
  community: {
    title: 'Community and trusted support',
    description: 'People and organizations that can help you stay supported day to day.'
  }
};

export const SUPPORT_DIRECTORY = [
  {
    id: 'emergency-services-gh',
    name: 'Emergency Services (Ghana)',
    group: 'urgent',
    offerings: 'Immediate emergency response',
    coverage: 'Accra and nationwide',
    summary: 'If there is immediate danger to life or safety, call emergency services now.',
    crisisPriority: 1,
    showInCrisis: true,
    contacts: [
      { kind: 'phone', value: '999', label: 'Call 999', variant: 'danger' },
      { kind: 'phone', value: '112', label: 'Call 112', variant: 'danger' }
    ]
  },
  {
    id: 'mental-health-authority-gh',
    name: 'Mental Health Authority Ghana',
    group: 'urgent',
    offerings: 'National mental health support line',
    coverage: 'Accra and nationwide',
    summary: 'Free and confidential mental health support line.',
    crisisPriority: 2,
    showInCrisis: true,
    contacts: [
      { kind: 'phone', value: '0800111222', label: 'Call 0800-111-222', variant: 'primary' }
    ]
  },
  {
    id: 'basicneeds-ghana',
    name: 'BasicNeeds Ghana',
    group: 'community',
    offerings: 'Community-based mental health support',
    coverage: 'Accra and nearby communities',
    summary: 'Community mental health support with a practical, person-centered approach.',
    crisisPriority: 3,
    showInCrisis: true,
    contacts: [
      { kind: 'phone', value: '+233302518861', label: 'Call +233 302 518 861', variant: 'primary' }
    ]
  },
  {
    id: 'accra-psychiatric-hospital',
    name: 'Accra Psychiatric Hospital',
    group: 'clinical',
    offerings: 'Specialist psychiatric assessment and treatment',
    coverage: 'Accra',
    summary: 'Public specialist psychiatric care for adults needing structured clinical support.',
    showInCrisis: false,
    contacts: [
      {
        kind: 'link',
        href: 'https://www.google.com/maps/search/?api=1&query=Accra+Psychiatric+Hospital',
        label: 'Open map',
        variant: 'secondary'
      }
    ]
  },
  {
    id: 'pantang-hospital',
    name: 'Pantang Hospital',
    group: 'clinical',
    offerings: 'Psychiatric and mental health treatment services',
    coverage: 'Greater Accra',
    summary: 'Public specialist mental health facility for ongoing psychiatric care.',
    showInCrisis: false,
    contacts: [
      {
        kind: 'link',
        href: 'https://www.google.com/maps/search/?api=1&query=Pantang+Hospital',
        label: 'Open map',
        variant: 'secondary'
      }
    ]
  },
  {
    id: 'korle-bu-psychiatry',
    name: 'Korle Bu Teaching Hospital (Psychiatry)',
    group: 'clinical',
    offerings: 'Hospital-based psychiatric referral and specialist services',
    coverage: 'Accra',
    summary: 'Use for referral-level care and specialist psychiatric support at a major teaching hospital.',
    showInCrisis: false,
    contacts: [
      {
        kind: 'link',
        href: 'https://www.google.com/maps/search/?api=1&query=Korle+Bu+Teaching+Hospital+Psychiatry',
        label: 'Open map',
        variant: 'secondary'
      }
    ]
  },
  {
    id: 'trusted-person',
    name: 'Talk to someone you trust',
    group: 'community',
    offerings: 'Immediate social support',
    coverage: 'Anywhere',
    summary: 'A friend, pastor, mentor, or family member can be a strong first support step.',
    showInCrisis: false,
    contacts: [
      {
        kind: 'sms',
        href: 'sms:?body=Hi%2C%20I%20need%20someone%20to%20talk%20to.',
        label: 'Send a message',
        variant: 'secondary'
      }
    ]
  }
];

export function getResourcesByGroup() {
  return DIRECTORY_GROUP_ORDER.map((groupKey) => ({
    key: groupKey,
    ...DIRECTORY_GROUPS[groupKey],
    entries: SUPPORT_DIRECTORY.filter((entry) => entry.group === groupKey)
  })).filter((group) => group.entries.length > 0);
}

export function getCrisisEntries() {
  return SUPPORT_DIRECTORY
    .filter((entry) => entry.showInCrisis)
    .sort((a, b) => (a.crisisPriority || 99) - (b.crisisPriority || 99));
}

