export function EventsPage() {
  return (
    <section className="screen screen--dark is-active" id="s-events" aria-label="Events">
      <div className="screen__inner page-shell events-shell">
        <div className="info-grid events-content">
              <p className="section-label">Events</p>
              <h2 className="title">Wellness events are coming soon.</h2>
              <p className="body-copy">Accra Coded events will bring local practitioners, spaces, and community members together for grounded wellness experiences.</p>
              <div className="resources-actions">
                <button type="button" className="c-button c-button--ghost resources-about-btn" data-action="open-waitlist">Join the waitlist</button>
                <button type="button" className="c-button c-button--ghost resources-about-btn" data-action="go-to" data-target="s-explore">Explore spaces</button>
              </div>
            </div>
      </div>
    </section>
  );
}


