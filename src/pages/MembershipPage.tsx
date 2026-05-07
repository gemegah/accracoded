export function MembershipPage() {
  return (
    <section className="screen screen--surface is-active" id="s-membership" aria-label="Membership">
      <div className="screen__inner page-shell home-shell">
        <section className="home-membership" aria-labelledby="home-membership-title">
              <div className="home-membership__trust">
                <div className="home-membership__intro">
                  <p className="home-membership__eyebrow">Why Accra Coded</p>
                  <span className="home-membership__rule" aria-hidden="true"></span>
                  <h2 className="home-membership__title" id="home-membership-title">Wellness that’s local, trusted, and made for you.</h2>
                </div>
        
                <div className="home-membership__values">
                  <article className="trust-tile">
                    <span className="trust-tile__icon"><img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" /></span>
                    <div className="trust-tile__body">
                      <h3 className="trust-tile__title">Curated</h3>
                      <span className="trust-tile__rule" aria-hidden="true"></span>
                      <p className="trust-tile__copy">Handpicked wellness spaces, practitioners and events you can trust.</p>
                    </div>
                  </article>
        
                  <article className="trust-tile">
                    <span className="trust-tile__icon"><iconify-icon icon="tabler:map-pin" aria-hidden="true"></iconify-icon></span>
                    <div className="trust-tile__body">
                      <h3 className="trust-tile__title">Local</h3>
                      <span className="trust-tile__rule" aria-hidden="true"></span>
                      <p className="trust-tile__copy">Rooted in Accra and powered by people who know the city.</p>
                    </div>
                  </article>
        
                  <article className="trust-tile">
                    <span className="trust-tile__icon"><iconify-icon icon="tabler:search" aria-hidden="true"></iconify-icon></span>
                    <div className="trust-tile__body">
                      <h3 className="trust-tile__title">Easy to Explore</h3>
                      <span className="trust-tile__rule" aria-hidden="true"></span>
                      <p className="trust-tile__copy">Search, discover and explore wellness experiences with ease.</p>
                    </div>
                  </article>
        
                  <article className="trust-tile">
                    <span className="trust-tile__icon"><iconify-icon icon="tabler:users-group" aria-hidden="true"></iconify-icon></span>
                    <div className="trust-tile__body">
                      <h3 className="trust-tile__title">Built for Ghana</h3>
                      <span className="trust-tile__rule" aria-hidden="true"></span>
                      <p className="trust-tile__copy">Created for our community, our culture and our wellbeing.</p>
                    </div>
                  </article>
                </div>
        
                <img className="home-membership__botanical" src="./src/assets/home/home-membership-botanical.png" alt="" aria-hidden="true" />
              </div>
        
              <div className="membership-teaser">
                <div className="membership-teaser__copy">
                  <p className="membership-teaser__eyebrow"><img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" /><span>Membership Teaser</span></p>
                  <h3 className="membership-teaser__title">More access.<br />More benefits.</h3>
                  <p className="membership-teaser__coming">Coming soon.</p>
                  <p className="membership-teaser__body">Accra Coded Membership unlocks exclusive perks designed to support your wellness journey.</p>
                </div>
        
                <div className="membership-teaser__visual">
                  <img src="./src/assets/home/home-membership-still-life.png" alt="Ceramic vase with olive branch" />
                </div>
        
                <ul className="membership-teaser__list">
                  <li className="membership-teaser__item"><iconify-icon icon="tabler:calendar-event" aria-hidden="true"></iconify-icon><span>Member-only wellness events</span></li>
                  <li className="membership-teaser__item"><iconify-icon icon="tabler:book-2" aria-hidden="true"></iconify-icon><span>Private guides &amp; expert content</span></li>
                  <li className="membership-teaser__item"><iconify-icon icon="tabler:tag" aria-hidden="true"></iconify-icon><span>Partner discounts &amp; offers</span></li>
                  <li className="membership-teaser__item"><iconify-icon icon="tabler:star" aria-hidden="true"></iconify-icon><span>Curated experiences</span></li>
                  <li className="membership-teaser__item"><iconify-icon icon="tabler:users-group" aria-hidden="true"></iconify-icon><span>Community access &amp; connections</span></li>
                </ul>
        
                <button type="button" className="membership-teaser__cta" data-action="open-waitlist">
                  <span>Join the Waitlist</span>
                  <span className="membership-teaser__cta-arrow" aria-hidden="true">&rarr;</span>
                </button>
        
                <div className="membership-teaser__closing">
                  <span className="membership-teaser__closing-rule" aria-hidden="true"></span>
                  <p>Better choices.<br />Deeper connections.<br />Real wellness.</p>
                </div>
              </div>
            </section>
      </div>
    </section>
  );
}


