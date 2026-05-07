const partnerLogos = [
  {
    src: './src/assets/partners/partner-skin-medics.png',
    alt: 'Skin Medics'
  },
  {
    src: './src/assets/partners/partner-fulfilled.png',
    alt: 'Fulfilled Medspa Clinic'
  },
  {
    src: './src/assets/partners/partner-growth.png',
    alt: 'Growth Wellness Spa'
  },
  {
    src: './src/assets/partners/partner-kukun.png',
    alt: 'Kukun'
  }
];

const discoverCards = [
  {
    className: 'discover-card--mental-health',
    category: 'mental-health',
    icon: 'tabler:brain',
    title: 'Mental Health',
    meta: '42 spaces'
  },
  {
    className: 'discover-card--fitness',
    category: 'vitality',
    icon: 'tabler:stretching',
    title: 'Fitness & Movement',
    meta: '68 spaces'
  },
  {
    className: 'discover-card--beauty',
    category: 'beauty',
    icon: 'tabler:brush',
    title: 'Beauty & Self-Care',
    meta: '57 spaces'
  },
  {
    className: 'discover-card--nutrition',
    category: 'vitality',
    icon: 'tabler:salad',
    title: 'Nutrition',
    meta: '49 spaces'
  },
  {
    className: 'discover-card--holistic',
    category: 'wellness',
    icon: 'tabler:flower',
    title: 'Holistic Wellness',
    meta: '64 spaces'
  },
  {
    className: 'discover-card--community',
    category: 'wellness',
    icon: 'tabler:users',
    title: 'Community Support',
    meta: '38 spaces'
  },
  {
    className: 'discover-card--retreats',
    category: 'wellness',
    icon: 'tabler:sun',
    title: 'Retreats & Experiences',
    meta: '31 spaces'
  }
];

export function HomePage() {
  return (
    <section className="screen screen--surface is-active" id="s-landing" aria-label="Welcome">
      <div className="home-shell">

        <div className="home-hero">
          <div className="home-hero__content">
            <h1 className="home-title">
              Wellness,
              <br />
              Rooted in Accra
            </h1>
            <span className="home-title-rule" aria-hidden="true" />
            <p className="home-copy">
              Discover trusted wellness spaces, practitioners and experiences in Accra. Or join our community for
              curated picks, events and exclusive benefits.
            </p>
            <div className="home-cta-row">
              <button type="button" className="home-cta home-cta--primary" data-action="go-to" data-target="s-explore">
                <span>Explore Resources</span>
                <span className="home-cta__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
              <button type="button" className="home-cta home-cta--secondary" data-action="go-to" data-target="s-membership">
                <span>Join the Wellness List</span>
                <span className="home-cta__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </div>
          </div>

          <div className="home-hero__visual">
            <div className="home-main-card">
              <picture className="home-main-card__media">
                <source media="(max-width: 767px)" srcSet="./src/assets/home/home-hero-main-mobile.png" />
                <img src="./src/assets/home/home-hero-main-desktop.png" alt="Woman meditating in a wellness space" />
              </picture>
            </div>
            <div className="home-texture-panel">
              <div className="home-caption">
                <span className="home-caption__rule" aria-hidden="true" />
                <p>
                  Reclaim balance.
                  <br />
                  Connect locally.
                  <br />
                  Live well.
                </p>
              </div>
              <img className="home-caption__sun" src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
            </div>
            <div className="home-vase-card">
              <img src="./src/assets/home/home-hero-still-life.png" alt="Ceramic vase with leaf arrangement" />
            </div>
          </div>
        </div>

        <section className="home-partners" aria-label="Trusted partners">
          <p className="home-partners__label">Trusted Partners</p>
          <div className="home-partners__list">
            {partnerLogos.map((partner) => (
              <div className="home-partner" key={partner.alt}>
                <img className="home-partner__logo" src={partner.src} alt={partner.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </section>

        <div className="home-divider" aria-hidden="true" />

        <section className="home-discover" aria-labelledby="home-discover-title">
          <div className="home-discover__header">
            <div className="home-discover__intro">
              <p className="home-discover__eyebrow">
                <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
                <span>Discover. Connect. Thrive.</span>
              </p>
              <h2 className="home-discover__title" id="home-discover-title">
                Explore Wellness in Accra
              </h2>
              <span className="home-discover__rule" aria-hidden="true" />
              <p className="home-discover__copy">
                Find trusted practitioners, spaces and experiences that support your well-being, mind, body and soul.
              </p>
            </div>
            <button type="button" className="home-discover__link" data-action="go-to" data-target="s-explore">
              <span>View All Categories</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="home-discover__grid">
            {discoverCards.map((card) => (
              <button
                type="button"
                className={`discover-card ${card.className}`}
                data-action="go-to-filter-explore"
                data-target="s-explore"
                data-category={card.category}
                key={card.title}
              >
                <span className="discover-card__icon">
                  <iconify-icon icon={card.icon}></iconify-icon>
                </span>
                <span className="discover-card__body">
                  <span className="discover-card__title">{card.title}</span>
                  <span className="discover-card__meta">{card.meta}</span>
                </span>
                <span className="discover-card__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-featured" aria-labelledby="home-featured-title">
          <div className="home-featured__header">
            <div className="home-featured__intro">
              <p className="home-featured__eyebrow">
                <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
                <span>Featured Listings</span>
              </p>
              <h2 className="home-featured__title" id="home-featured-title">
                Featured Wellness Spots
              </h2>
              <span className="home-featured__rule" aria-hidden="true" />
              <p className="home-featured__copy">
                Handpicked wellness spaces, practitioners and experiences in Accra. Curated for quality, community and
                impact.
              </p>
            </div>
            <button type="button" className="home-featured__link" data-action="go-to" data-target="s-explore">
              <span>View All Listings</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="home-featured__controls">
            <div className="home-featured__filters" id="home-featured-filters" role="group" aria-label="Featured listing categories" />
            <button type="button" className="home-featured__filter-cta" data-action="go-to" data-target="s-explore">
              <span>Filter</span>
              <iconify-icon icon="tabler:adjustments-horizontal" aria-hidden="true"></iconify-icon>
            </button>
          </div>

          <div className="home-featured__cards" id="home-featured-cards" />
        </section>
      </div>
    </section>
  );
}


