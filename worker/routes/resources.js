import { json } from '../utils/response.js';

const STATIC_RESOURCES = [
  {
    id: 'emergency-services-gh',
    group: 'urgent',
    name: 'Emergency Services (Ghana)',
    summary: 'If there is immediate danger to life or safety, call emergency services now.',
    coverage: 'Accra and nationwide',
    offerings: 'Immediate emergency response',
    contacts: [
      { kind: 'phone', value: '999', label: 'Call 999', variant: 'danger' },
      { kind: 'phone', value: '112', label: 'Call 112', variant: 'danger' }
    ]
  },
  {
    id: 'mental-health-authority-gh',
    group: 'urgent',
    name: 'Mental Health Authority Ghana',
    summary: 'Free and confidential mental health support line.',
    coverage: 'Accra and nationwide',
    offerings: 'National mental health support line',
    contacts: [{ kind: 'phone', value: '0800111222', label: 'Call 0800-111-222', variant: 'primary' }]
  }
];

export async function handleResources(_request, env) {
  if (!env.DB) {
    return json({ groups: [], entries: STATIC_RESOURCES });
  }

  const query = await env.DB.prepare(
    'SELECT id, group_key AS "group", name, summary, coverage, offerings, contacts_json FROM resources_catalog ORDER BY priority ASC'
  ).all();

  if (!query?.results?.length) {
    return json({ groups: [], entries: STATIC_RESOURCES }, 200, { 'Cache-Control': 'public, max-age=300' });
  }

  const entries = query.results.map((row) => ({
    id: row.id,
    group: row.group,
    name: row.name,
    summary: row.summary,
    coverage: row.coverage,
    offerings: row.offerings,
    contacts: JSON.parse(row.contacts_json || '[]')
  }));

  return json({ entries }, 200, { 'Cache-Control': 'public, max-age=300' });
}
