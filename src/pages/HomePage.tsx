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
    <section className="screen screen--surface is-active overflow-x-clip" id="s-landing" aria-label="Welcome">
      <div className="home-shell w-full max-w-360 overflow-x-clip px-4 sm:px-6 md:px-7 lg:px-6.5">

        <div className="home-hero grid min-w-0 overflow-x-clip gap-6 sm:gap-8 md:gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,0.92fr)] lg:gap-14">
          <div className="home-hero__content min-w-0 max-w-full">
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
            <div className="home-cta-row grid w-full min-w-0 gap-3 sm:grid-cols-2 md:max-w-176 lg:flex lg:w-fit lg:max-w-none lg:flex-nowrap">
              <button type="button" className="home-cta home-cta--primary w-full min-w-0" data-action="go-to" data-target="s-explore">
                <span className="min-w-0 whitespace-normal">Explore Resources</span>
                <span className="home-cta__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
              <button type="button" className="home-cta home-cta--secondary w-full min-w-0" data-action="go-to" data-target="s-membership">
                <span className="min-w-0 whitespace-normal">Join the Wellness List</span>
                <span className="home-cta__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            </div>
          </div>

          <div className="home-hero__visual min-w-0 max-w-full justify-self-center md:w-full lg:justify-self-end">
            <div className="home-main-card max-w-full overflow-hidden">
              <picture className="home-main-card__media">
                <source media="(max-width: 767px)" srcSet="./src/assets/home/home-hero-main-mobile.png" />
                <img className="h-full w-full object-cover" src="./src/assets/home/home-hero-main-desktop.png" alt="Woman meditating in a wellness space" />
              </picture>
            </div>
            <div className="home-texture-panel max-w-full overflow-hidden">
              <div className="home-caption max-w-[calc(100%-34px)] min-w-0">
                <span className="home-caption__rule" aria-hidden="true" />
                <p className="min-w-0 whitespace-normal">
                  Reclaim balance.
                  <br />
                  Connect locally.
                  <br />
                  Live well.
                </p>
              </div>
              <img className="home-caption__sun" src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
            </div>
            <div className="home-vase-card max-w-full overflow-hidden">
              <img className="h-full w-full object-cover" src="./src/assets/home/home-hero-still-life.png" alt="Ceramic vase with leaf arrangement" />
            </div>
          </div>
        </div>

        <section className="home-partners min-w-0 overflow-x-clip py-8 sm:py-10 md:py-12" aria-label="Trusted partners">
          <p className="home-partners__label">Trusted Partners</p>
          <div className="home-partners__list grid min-w-0 grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-7 md:grid-cols-4 lg:gap-x-0">
            {partnerLogos.map((partner) => (
              <div className="home-partner min-w-0" key={partner.alt}>
                <img className="home-partner__logo max-w-full" src={partner.src} alt={partner.alt} loading="lazy" decoding="async" />
              </div>
            ))}
          </div>
        </section>

        <div className="home-divider" aria-hidden="true" />

        <section className="home-discover min-w-0 overflow-x-clip py-8 sm:py-10 md:py-12 lg:py-14" aria-labelledby="home-discover-title">
          <div className="home-discover__header grid min-w-0 gap-4 md:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="home-discover__intro min-w-0 max-w-full">
              <p className="home-discover__eyebrow min-w-0">
                <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
                <span className="min-w-0 wrap-break-word">Discover. Connect. Thrive.</span>
              </p>
              <h2 className="home-discover__title" id="home-discover-title">
                Explore Wellness in Accra
              </h2>
              <span className="home-discover__rule" aria-hidden="true" />
              <p className="home-discover__copy">
                Find trusted practitioners, spaces and experiences that support your well-being, mind, body and soul.
              </p>
            </div>
            <button type="button" className="home-discover__link flex w-full min-w-0 justify-between sm:w-fit lg:justify-start" data-action="go-to" data-target="s-explore">
              <span className="min-w-0 wrap-break-word">View All Categories</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="home-discover__grid min-w-0 max-w-full overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-[repeat(3,minmax(0,1fr))_minmax(200px,0.78fr)]">
            {discoverCards.map((card) => (
              <button
                type="button"
                className={`discover-card min-w-0 ${card.className}`}
                data-action="go-to-filter-explore"
                data-target="s-explore"
                data-category={card.category}
                key={card.title}
              >
                <span className="discover-card__icon">
                  <iconify-icon icon={card.icon}></iconify-icon>
                </span>
                <span className="discover-card__body min-w-0">
                  <span className="discover-card__title wrap-break-word">{card.title}</span>
                  <span className="discover-card__meta">{card.meta}</span>
                </span>
                <span className="discover-card__arrow" aria-hidden="true">
                  &rarr;
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="home-featured min-w-0 overflow-x-clip py-8 sm:py-10 md:py-12 lg:py-14" aria-labelledby="home-featured-title">
          <div className="home-featured__header grid min-w-0 gap-4 md:gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="home-featured__intro min-w-0 max-w-full">
              <p className="home-featured__eyebrow min-w-0">
                <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
                <span className="min-w-0 wrap-break-word">Featured Listings</span>
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
            <button type="button" className="home-featured__link flex w-full min-w-0 justify-between sm:w-fit lg:justify-start" data-action="go-to" data-target="s-explore">
              <span className="min-w-0 wrap-break-word">View All Listings</span>
              <span aria-hidden="true">&rarr;</span>
            </button>
          </div>

          <div className="home-featured__controls grid min-w-0 gap-3 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
            <div className="home-featured__filters min-w-0 max-w-full overflow-x-auto" id="home-featured-filters" role="group" aria-label="Featured listing categories" />
            <button type="button" className="home-featured__filter-cta w-full min-w-0 md:w-fit" data-action="go-to" data-target="s-explore">
              <span className="min-w-0 wrap-break-word">Filter</span>
              <iconify-icon icon="tabler:adjustments-horizontal" aria-hidden="true"></iconify-icon>
            </button>
          </div>

          <div className="home-featured__cards min-w-0 max-w-full overflow-x-auto sm:grid sm:grid-cols-2 md:grid-cols-3" id="home-featured-cards" />
        </section>
      </div>
    </section>
  );
}

