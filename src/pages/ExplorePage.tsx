export function ExplorePage() {
  return (
    <>
      <section className="screen explore-screen is-active" id="s-explore" aria-label="Explore support in Ghana">
        <div className="screen__inner page-shell explore-shell">
          <div className="explore-hero">
                <div className="explore-hero__copy">
                  <h1 className="explore-title">Find support in Ghana</h1>
                  <p className="explore-intro">Mental health, self-care, and trusted support in Accra.</p>
                </div>
              </div>
          
              <div className="explore-search">
                <label className="sr-only" htmlFor="explore-search">Search support resources</label>
                <iconify-icon icon="tabler:search" aria-hidden="true"></iconify-icon>
                <input id="explore-search" type="search" placeholder="Search therapy, care, reset, support..." autoComplete="off" />
              </div>
          
              <div className="explore-chips" id="explore-categories" role="group" aria-label="Explore categories"></div>
          
              <section className="explore-section" aria-labelledby="explore-needs-title">
                <h2 className="explore-section__title" id="explore-needs-title">What do you need today?</h2>
                <div className="need-grid" id="explore-needs"></div>
              </section>
          
              <section className="explore-section explore-section--resources" aria-labelledby="explore-resources-title">
                <div className="explore-section__head">
                  <h2 className="explore-section__title" id="explore-resources-title">Featured resources</h2>
                </div>
                <div className="explore-resources" id="explore-resources"></div>
                <p className="explore-empty" id="explore-empty" hidden>No matching resources yet. Try a broader search or view all.</p>
              </section>
        </div>
      </section>
      <section className="screen explore-detail-screen" id="s-explore-detail" aria-label="Resource profile">
        <div className="screen__inner page-shell explore-detail-shell">
          <button type="button" className="explore-detail-back" data-action="go-to" data-target="s-explore">
                <iconify-icon icon="tabler:arrow-left" aria-hidden="true"></iconify-icon>
                <span>Back to Explore</span>
              </button>
          
              <div className="explore-detail" id="explore-detail"></div>
        </div>
      </section>
    </>
  );
}


