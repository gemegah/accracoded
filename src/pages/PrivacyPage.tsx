const privacySections = [
  {
    title: 'What we collect',
    body: [
      'Accra Coded can collect lightweight check-in responses, selected content format, anonymous session activity, QR scan source information, and wellness list submissions.',
      'If you open Accra Coded through a QR code, your browser may ask for location permission. We only receive location coordinates when you choose to allow that permission.'
    ]
  },
  {
    title: 'How we use it',
    body: [
      'We use this information to keep the service working, understand which resources people use, improve the directory, protect the site from abuse, and respond to wellness list signups.',
      'Admin tools use the same data to manage directory content, homepage metrics, waitlist submissions, and QR scan summaries.'
    ]
  },
  {
    title: 'What we do not do',
    body: [
      'You do not need an account to use Accra Coded. We do not ask for clinical records through the public flow, and we do not sell personal information.',
      'Crisis and emergency links may open phone, email, map, or third-party services. Those services have their own privacy practices.'
    ]
  },
  {
    title: 'Storage and third parties',
    body: [
      'Production data is stored with Cloudflare services used by this site, including Workers, D1, and KV. Some waitlist submissions may also be forwarded to Formspree when that integration is enabled.',
      'The site uses external services for some links, maps, social sharing, embedded video, and icon delivery.'
    ]
  },
  {
    title: 'Contact',
    body: [
      'For privacy questions or data requests, contact hello@accracoded.com.'
    ]
  }
];

export function PrivacyPage() {
  return (
    <section className="screen is-active" id="s-privacy" aria-label="Privacy policy">
      <div className="screen__inner page-shell about-shell privacy-shell">
        <div className="privacy-layout">
          <header className="privacy-header">
            <p className="section-label about-label">Privacy Policy</p>
            <h1 className="title privacy-title">How Accra Coded handles information</h1>
            <span className="about-rule" aria-hidden="true" />
            <p className="body-copy privacy-intro">
              Accra Coded is designed for low-friction access to wellness resources in Accra. This policy explains what
              information may be collected and how it is used.
            </p>
            <p className="privacy-updated">Last updated: May 10, 2026</p>
          </header>

          <div className="privacy-sections">
            {privacySections.map((section) => (
              <article className="c-card c-card--solid privacy-card" key={section.title}>
                <h2>{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
