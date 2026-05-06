const asset = (path) => new URL(path, import.meta.url).href;

export const EXPLORE_CATEGORIES = [
  { id: 'all', label: 'All', icon: 'tabler:sparkles' },
  { id: 'mental-health', label: 'Mental health', icon: 'tabler:brain' },
  { id: 'vitality', label: 'Vitality', icon: 'tabler:leaf' },
  { id: 'beauty', label: 'Beauty', icon: 'tabler:brush' },
  { id: 'wellness', label: 'Wellness', icon: 'tabler:flower' }
];

export const HOME_FEATURED_FILTERS = [
  { id: 'all', label: 'All Categories' },
  { id: 'vitality', label: 'Movement & Vitality' },
  { id: 'wellness', label: 'Wellness Spaces' },
  { id: 'mental-health', label: 'Therapists & Support' },
  { id: 'beauty', label: 'Beauty & Spa' }
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
    resourceType: 'organization',
    name: 'Mental Health Authority Ghana',
    categories: ['mental-health', 'wellness'],
    tags: ['Mental health', 'Support services'],
    location: 'Old Race Course Road, Accra',
    summary: 'National public authority coordinating mental health promotion, support, and referrals in Ghana.',
    description:
      'The Mental Health Authority promotes mental health, supports prevention and treatment pathways, and helps people find accessible community-oriented care across Ghana.',
    actionLabel: 'View',
    href: 'tel:0800678678',
    logoText: 'MHA',
    featured: true,
    featuredRank: 4,
    cardImage: asset('../assets/listings/listing-office.png'),
    cardType: 'Mental health support',
    cardLocation: 'Accra Central',
    cardDescription: 'Trusted public guidance, referrals and mental health support pathways for people seeking care in Accra.',
    cardBadges: ['Verified', 'Support line', 'Public'],
    gallery: [
      {
        src: asset('../assets/explore-detail/mha-building.webp'),
        alt: 'Mental Health Authority Ghana building exterior',
        width: 960,
        height: 720
      },
      {
        src: asset('../assets/explore-detail/mha-logo.webp'),
        alt: 'Mental Health Authority Ghana logo',
        width: 960,
        height: 720
      }
    ],
    about: [
      'The Authority describes its mission as promoting mental health, preventing mental illness, and supporting quality, integrated, community-oriented mental health care in Ghana.',
      'It is a strong first stop when someone needs a trusted public institution, psychosocial support direction, or help locating the right next mental health service.'
    ],
    services: [
      'Toll-free mental health call centre',
      'Health promotion and public mental health education',
      'Referral guidance to hospitals and mental health services',
      'Mental health prevention, treatment, and rehabilitation pathways',
      'Community-oriented mental health support coordination'
    ],
    contactLabel: 'Call toll-free line',
    contactHref: 'tel:0800678678',
    email: 'info@mha.gov.gh',
    mapHref: 'https://maps.app.goo.gl/NzvZosTKQHxCWyhj9'
  },
  {
    id: 'basicneeds-ghana-explore',
    resourceType: 'organization',
    name: 'BasicNeeds Ghana',
    categories: ['mental-health', 'wellness'],
    tags: ['Mental health', 'Community support'],
    location: 'Abelenkpe, Accra',
    summary: 'Community-based mental health and development support for individuals, families, and carers.',
    description:
      'BasicNeeds Ghana combines mental health support with community development, advocacy, and livelihoods work so people can access care and live more fully in their communities.',
    actionLabel: 'View',
    href: 'tel:+233244572733',
    logoText: 'BNG',
    featured: true,
    featuredRank: 3,
    cardImage: asset('../assets/listings/listing-community.png'),
    cardType: 'Community support',
    cardLocation: 'Abelenkpe',
    cardDescription: 'Community-rooted psychosocial support, advocacy and care pathways for individuals, families, and carers.',
    cardBadges: ['Verified', 'In-person', 'Community'],
    gallery: [],
    about: [
      'BasicNeeds Ghana presents itself as a mental health and development advocacy organisation working with people with mental illness or epilepsy, their families, and communities.',
      'Its model brings together integrated mental health care, social and economic support, community participation, and policy advocacy rather than acting like a single clinic office.'
    ],
    services: [
      'Community-oriented mental health support',
      'Family and carer engagement',
      'Livelihood and social inclusion support',
      'Stakeholder training and sensitization',
      'Evidence, advocacy, and policy influence'
    ],
    contactLabel: 'Call BasicNeeds',
    contactHref: 'tel:+233244572733',
    email: 'info@basicneedsghana.org',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=BasicNeeds+Ghana+Abelenkpe+Accra'
  },
  {
    id: 'accra-psychiatric-hospital-explore',
    resourceType: 'clinic',
    name: 'Accra Psychiatric Hospital',
    categories: ['mental-health'],
    tags: ['Clinical care', 'Public facility'],
    location: 'Castle Road, Accra',
    summary: 'Public specialist hospital offering 24-hour psychiatric assessment, treatment, and support services.',
    description:
      'Accra Psychiatric Hospital is a major public mental health facility in Accra for emergency, outpatient, inpatient, and multidisciplinary psychiatric care.',
    actionLabel: 'View',
    href: 'tel:+233302228688',
    logoText: 'APH',
    featured: true,
    featuredRank: 5,
    cardImage: asset('../assets/listings/listing-hospital.png'),
    cardType: 'Psychiatric hospital',
    cardLocation: 'Castle Road',
    cardDescription: '24-hour psychiatric assessment, outpatient follow-up and specialist clinical care in central Accra.',
    cardBadges: ['Verified', '24/7 care', 'Public'],
    gallery: [
      {
        src: asset('../assets/explore-detail/aph-building.webp'),
        alt: 'Accra Psychiatric Hospital building exterior',
        width: 960,
        height: 720
      }
    ],
    about: [
      'The hospital describes itself as a leading psychiatric institution in Ghana, providing 24-hour services and multidisciplinary care for mental health needs.',
      'This profile is best for someone who needs structured clinical care, emergency psychiatric support, inpatient services, or a specialist treatment setting.'
    ],
    services: [
      'Outpatient psychiatric consultations',
      '24-hour emergency mental health care',
      'Inpatient psychiatric services',
      'Clinical psychology and social work services',
      'Occupational therapy and rehabilitation support',
      'Pharmacy and laboratory services'
    ],
    contactLabel: 'Call APH',
    contactHref: 'tel:+233302228688',
    email: 'info@accrapsychiatrichospital.org',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=Accra+Psychiatric+Hospital+Castle+Road+Accra'
  },
  {
    id: 'pantang-hospital-explore',
    resourceType: 'clinic',
    name: 'Pantang Hospital',
    categories: ['mental-health'],
    tags: ['Psychiatry', 'Referral care'],
    location: 'Pantang-Abokobi Road, Greater Accra',
    summary: 'Large public mental health hospital for psychiatric care, follow-up, and broader health support.',
    description:
      'Pantang Hospital is one of Ghana’s major mental health hospitals, serving Greater Accra with psychiatric treatment and ongoing follow-up support.',
    actionLabel: 'View',
    href: 'https://www.google.com/maps/search/?api=1&query=Pantang+Hospital',
    logoText: 'PH',
    featured: false,
    featuredRank: 6,
    cardImage: asset('../assets/listings/listing-therapist.png'),
    cardType: 'Specialist clinic',
    cardLocation: 'Pantang',
    cardDescription: 'Ongoing psychiatric treatment and referral-led mental health care within a major public hospital setting.',
    cardBadges: ['Verified', 'Referral care', 'Public'],
    gallery: [],
    about: [
      'Pantang Hospital is widely referenced as one of the country’s principal psychiatric hospitals and a place people turn to for ongoing public mental health treatment.',
      'Use this option when someone needs specialist follow-up, psychiatric care in a larger hospital setting, or a public referral destination in Greater Accra.'
    ],
    services: [
      'Psychiatric assessment and treatment',
      'Outpatient mental health follow-up',
      'Inpatient psychiatric care',
      'Referral-based public mental health support',
      'General and maternal health support alongside mental health services'
    ],
    contactLabel: 'Open map',
    contactHref: 'https://www.google.com/maps/search/?api=1&query=Pantang+Hospital',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=Pantang+Hospital'
  },
  {
    id: 'skinmedics-aesthetic-centre',
    resourceType: 'clinic',
    name: 'Skinmedics Aesthetic Centre',
    categories: ['beauty', 'wellness'],
    tags: ['Skincare', 'Aesthetic wellness'],
    location: 'Osu, Accra',
    summary: 'Aesthetic and beauty clinic in Osu offering skincare, contouring, laser, and consultation services.',
    description:
      'Skinmedics Aesthetic Centre offers appointment-based aesthetic care in Osu, with services spanning facials, contouring, laser work, and consultation-led treatments.',
    actionLabel: 'View',
    href: 'tel:+233203009627',
    logoText: 'SM',
    featured: true,
    featuredRank: 2,
    cardImage: asset('../assets/listings/listing-skincare.png'),
    cardType: 'Aesthetic clinic',
    cardLocation: 'Osu',
    cardDescription: 'Consultation-led skincare, facials, and aesthetic treatments in a polished appointment-based setting.',
    cardBadges: ['Verified', 'In-person', 'Premium'],
    gallery: [],
    about: [
      'Skinmedics presents itself as an aesthetic centre in Accra with a broad menu of facial, body, laser, and beauty services available by booking.',
      'It fits best when someone wants a physical beauty or skin clinic rather than an internal self-care guide.'
    ],
    services: [
      'Facial care and sculpting facials',
      'Body contouring treatments',
      'Skincare and anti-aging treatments',
      'Semi-permanent makeup and lashes',
      'Laser hair removal and waxing',
      'Consultations and skin concern review'
    ],
    contactLabel: 'Call Skinmedics',
    contactHref: 'tel:+233203009627',
    email: 'info@mintbeautybarghana.com',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=Mint+Beauty+Bar+Ghana+Osu+Accra'
  },
  {
    id: 'fulfilled-med-spa-clinic',
    resourceType: 'clinic',
    name: 'Fulfilled Med Spa Clinic',
    categories: ['beauty', 'wellness', 'vitality'],
    tags: ['Med spa', 'Clinical skincare'],
    location: 'Osu, Accra',
    summary: 'Medical-grade aesthetics and wellness clinic with beauty, skin, and spa treatments in Accra.',
    description:
      'Fulfilled Med Spa Clinic is a beauty, aesthetics, and wellness clinic in Accra offering medical-grade skin, aesthetic, and spa services with a strong emphasis on tailored care.',
    actionLabel: 'View',
    href: 'https://www.fulfilledmedspaclinic.com',
    logoText: 'FM',
    featured: true,
    featuredRank: 1,
    cardImage: asset('../assets/listings/listing-spa-house.png'),
    cardType: 'Med spa clinic',
    cardLocation: 'Osu',
    cardDescription: 'Medical-grade beauty, skin, and spa rituals paired with tailored wellness care and premium treatment plans.',
    cardBadges: ['Verified', 'In-person', 'Premium'],
    gallery: [
      {
        src: asset('../assets/explore-detail/fulfilled-logo.webp'),
        alt: 'Fulfilled Med Spa Clinic logo',
        width: 960,
        height: 720
      }
    ],
    about: [
      'Fulfilled describes itself as a leading aesthetics, beauty centre, and spa clinic in Ghana, founded in the UK and now operating permanent clinics in Accra.',
      'Its service model combines nurse-led aesthetics, customised treatment planning, and aftercare, making it a stronger fit for people seeking a real in-person clinic experience.'
    ],
    services: [
      'Aesthetic treatments such as Botox, fillers, PDO threads, and skin boosters',
      'Skin care treatments including facials, microneedling, chemical peels, and HIFU',
      'Beauty services such as ombre brows, pink lip blush, and teeth whitening',
      'Spa treatments including massage, lymphatic drainage, waxing, and wood therapy',
      'IV infusions and selected wellness-focused treatments'
    ],
    contactLabel: 'Visit website',
    contactHref: 'https://www.fulfilledmedspaclinic.com',
    email: 'info@fulfilledmedspaclinic.com',
    mapHref: 'https://www.google.com/maps/search/?api=1&query=18+Abebrese+Street+Osu+Accra+Ghana'
  }
];
