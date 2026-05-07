export function AboutPage() {
  return (
    <section className="screen is-active" id="s-about" aria-label="About Accra Coded">
      <div className="screen__inner page-shell about-shell">
        <div className="about-layout">
              <section className="about-overview" aria-labelledby="about-title">
                <div className="about-copy">
                  <p className="section-label about-label">About this space</p>
                  <h2 className="title about-title" id="about-title">A short private reset for difficult days</h2>
                  <span className="about-rule" aria-hidden="true"></span>
                  <p className="body-copy about-copy__body">Accra Coded is a free, browser-only support flow built for moments when your mind feels overloaded and you need immediate grounding.</p>
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
                    <h3 className="about-card__title">What this is</h3>
                    <p className="about-card__text">A short video/audio/text moment followed by practical support options you can contact right away.</p>
                  </div>
                </article>
        
                <article className="c-card c-card--solid about-card">
                  <div className="about-card__icon" aria-hidden="true">
                    <iconify-icon icon="tabler:x"></iconify-icon>
                  </div>
                  <div className="about-card__content">
                    <h3 className="about-card__title">What this is not</h3>
                    <p className="about-card__text">It does not replace emergency or long-term clinical care. If you are in immediate danger, use emergency services now.</p>
                  </div>
                </article>
        
                <article className="c-card c-card--solid about-card">
                  <div className="about-card__icon" aria-hidden="true">
                    <iconify-icon icon="tabler:lock"></iconify-icon>
                  </div>
                  <div className="about-card__content">
                    <h3 className="about-card__title">Privacy stance</h3>
                    <p className="about-card__text">No sign-in. No account required. Optional check-in responses are designed to be lightweight and non-identifying.</p>
                  </div>
                </article>
              </div>
            </div>
      </div>
    </section>
  );
}


