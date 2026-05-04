export const EXPLORE_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'tabler:sparkles' },
  { id: 'mental-health', label: 'Mental health', icon: 'tabler:brain' },
  { id: 'vitality', label: 'Vitality', icon: 'tabler:leaf' },
  { id: 'beauty', label: 'Beauty', icon: 'tabler:brush' },
  { id: 'wellness', label: 'Wellness', icon: 'tabler:flower' }
];

export const EXPLORE_NEEDS = [
  { label: 'Talk to someone', category: 'mental-health', icon: 'tabler:messages' },
  { label: 'Reset your body', category: 'vitality', icon: 'tabler:stretching' },
  { label: 'Look and feel refreshed', category: 'beauty', icon: 'tabler:brush' },
  { label: 'Urgent help', category: 'urgent', icon: 'tabler:heart-plus' }
];

export const EXPLORE_RESOURCES = [
  {
    id: 'mental-health-authority-gh',
    name: 'Mental Health Authority Ghana',
    categories: ['mental-health', 'wellness'],
    tags: ['Mental health', 'Support services'],
    location: 'Accra and nationwide',
    summary: 'National body promoting mental well-being and accessible care for all.',
    actionLabel: 'View',
    href: 'tel:0800111222',
    logoText: 'MHA',
    featured: true
  },
  {
    id: 'basicneeds-ghana-explore',
    name: 'BasicNeeds Ghana',
    categories: ['mental-health', 'wellness'],
    tags: ['Mental health', 'Community support'],
    location: 'Accra',
    summary: 'Affordable counselling and community support for individuals and families.',
    actionLabel: 'View',
    href: 'tel:+233302518861',
    logoText: 'BNG',
    featured: true
  },
  {
    id: 'accra-psychiatric-hospital-explore',
    name: 'Accra Psychiatric Hospital',
    categories: ['mental-health'],
    tags: ['Clinical care', 'Public facility'],
    location: 'Accra',
    summary: 'Specialist psychiatric assessment and treatment for continued support.',
    actionLabel: 'View',
    href: 'https://www.google.com/maps/search/?api=1&query=Accra+Psychiatric+Hospital',
    logoText: 'APH',
    featured: true
  },
  {
    id: 'pantang-hospital-explore',
    name: 'Pantang Hospital',
    categories: ['mental-health'],
    tags: ['Psychiatry', 'Referral care'],
    location: 'Greater Accra',
    summary: 'Public mental health facility for ongoing psychiatric care.',
    actionLabel: 'View',
    href: 'https://www.google.com/maps/search/?api=1&query=Pantang+Hospital',
    logoText: 'PH',
    featured: false
  },
  {
    id: 'body-reset-guide',
    name: 'Body Reset Guide',
    categories: ['vitality', 'wellness'],
    tags: ['Movement', 'Breathing'],
    location: 'At home',
    summary: 'A low-pressure routine for stretching, breathing, and coming back to yourself.',
    actionLabel: 'View',
    href: '#s-format',
    logoText: 'BR',
    featured: false
  },
  {
    id: 'beauty-self-care-guide',
    name: 'Beauty Self-Care Guide',
    categories: ['beauty', 'wellness'],
    tags: ['Self-care', 'Rest'],
    location: 'Accra',
    summary: 'Gentle care ideas for days when looking after your body helps your mind settle.',
    actionLabel: 'View',
    href: '#s-content',
    logoText: 'SC',
    featured: false
  }
];
