export type HomeCategoryMetric = {
  category: string;
  className: string;
  enabled?: boolean;
  icon: string;
  id: string;
  label: string;
  meta: string;
  sortOrder?: number;
};

export const FALLBACK_HOME_CATEGORY_METRICS: HomeCategoryMetric[] = [
  {
    id: 'mental-health',
    className: 'discover-card--mental-health',
    category: 'mental-health',
    icon: 'tabler:brain',
    label: 'Mental Health',
    meta: '42 spaces',
    sortOrder: 10
  },
  {
    id: 'fitness-movement',
    className: 'discover-card--fitness',
    category: 'vitality',
    icon: 'tabler:stretching',
    label: 'Fitness & Movement',
    meta: '68 spaces',
    sortOrder: 20
  },
  {
    id: 'beauty-self-care',
    className: 'discover-card--beauty',
    category: 'beauty',
    icon: 'tabler:brush',
    label: 'Beauty & Self-Care',
    meta: '57 spaces',
    sortOrder: 30
  },
  {
    id: 'nutrition',
    className: 'discover-card--nutrition',
    category: 'vitality',
    icon: 'tabler:salad',
    label: 'Nutrition',
    meta: '49 spaces',
    sortOrder: 40
  },
  {
    id: 'holistic-wellness',
    className: 'discover-card--holistic',
    category: 'wellness',
    icon: 'tabler:flower',
    label: 'Holistic Wellness',
    meta: '64 spaces',
    sortOrder: 50
  },
  {
    id: 'community-support',
    className: 'discover-card--community',
    category: 'wellness',
    icon: 'tabler:users',
    label: 'Community Support',
    meta: '38 spaces',
    sortOrder: 60
  },
  {
    id: 'retreats-experiences',
    className: 'discover-card--retreats',
    category: 'wellness',
    icon: 'tabler:sun',
    label: 'Retreats & Experiences',
    meta: '31 spaces',
    sortOrder: 70
  }
];
