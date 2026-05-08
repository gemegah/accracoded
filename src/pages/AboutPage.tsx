export function AboutPage() {
  return (
    <section className="screen is-active" id="s-about" aria-label="About Accra Coded">
      <div className="screen__inner page-shell about-shell">
        <div className="about-layout">
              <section className="about-overview" aria-labelledby="about-title">
                <div className="about-copy">
                  <p className="section-label about-label">About Accra Coded</p>
                  <h2 className="title about-title" id="about-title">A calmer way to find wellness in Accra</h2>
                  <span className="about-rule" aria-hidden="true"></span>
                  <p className="body-copy about-copy__body">Accra Coded is a care-centered wellness guide built for real life in the city, helping you reconnect through trusted spaces, grounded resources, and gentle moments of support.</p>
                </div>
        
                <figure className="about-illustration" aria-hidden="true">
                  <img src="./src/assets/about/about-illustration.svg" alt="" loading="lazy" decoding="async" />
                </figure>
              </section>
        
              <div className="about-cards" aria-label="About details">
                <article className="c-card c-card--solid about-card">
                  <div className="about-card__icon" aria-hidden="true">
                    <iconify-icon icon="tabler:heart"></iconify-icon>
                  </div>
                  <div className="about-card__content">
                    <h3 className="about-card__title">What you'll find</h3>
                    <p className="about-card__text">Curated wellness spaces, practitioners, events, and simple tools you can return to when you need steadiness.</p>
                  </div>
                </article>
        
                <article className="c-card c-card--solid about-card">
                  <div className="about-card__icon" aria-hidden="true">
                    <iconify-icon icon="tabler:x"></iconify-icon>
                  </div>
                  <div className="about-card__content">
                    <h3 className="about-card__title">Why it exists</h3>
                    <p className="about-card__text">Accra can be full, fast, and demanding. This space is for the moments when you want support that feels local, practical, and close to home.</p>
                  </div>
                </article>
        
                <article className="c-card c-card--solid about-card">
                  <div className="about-card__icon" aria-hidden="true">
                    <iconify-icon icon="tabler:lock"></iconify-icon>
                  </div>
                  <div className="about-card__content">
                    <h3 className="about-card__title">Privacy and care</h3>
                    <p className="about-card__text">Use it without an account and move at your own pace. If you are in immediate danger, seek emergency or crisis support right away.</p>
                  </div>
                </article>
              </div>
            </div>
      </div>
    </section>
  );
}


