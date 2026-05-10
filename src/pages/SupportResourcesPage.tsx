import { useEffect } from 'react';

import { renderSupportDirectory } from '../app/supportDirectoryView.js';

export function SupportResourcesPage() {
  useEffect(() => {
    renderSupportDirectory();
  }, []);

  return (
    <section className="screen screen--dark is-active" id="s-resources" aria-label="Support resources">
      <div className="screen__inner page-shell">
        <div className="progress-dots" aria-hidden="true">
              <span className="dot is-active"></span>
              <span className="dot is-active"></span>
              <span className="dot is-active"></span>
              <span className="dot is-active"></span>
            </div>
        
            <div className="info-grid">
              <h2 className="title">You are not doing this alone.</h2>
              <p className="body-copy">If you need more than one moment, support is available in Accra right now.</p>
              <div className="resources-actions">
                <button type="button" className="c-button c-button--ghost resources-about-btn" data-action="go-to" data-target="s-about">About Accra Coded</button>
                <button type="button" className="c-button c-button--ghost resources-about-btn" data-action="go-to" data-target="s-explore">Explore support in Ghana</button>
              </div>
            </div>
        
            <div className="resources-list" id="resources-directory"></div>
        
            <div className="share-card">
              <p className="resource-desc">Know someone who might need this? Share Accra Coded in one tap, or copy the link and send it your way.</p>
              <div className="share-grid">
                <a href="https://wa.me/?text=I%20found%20something%20that%20helped%20me%20today.%20Might%20help%20you%20too.%20https%3A%2F%2Faccracoded.com" className="c-button c-button--ghost share-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp">
                  <iconify-icon icon="tabler:brand-whatsapp" aria-hidden="true"></iconify-icon>
                  <span className="sr-only">WhatsApp</span>
                </a>
                <a href="https://twitter.com/intent/tweet?text=I%20found%20something%20that%20helped%20me%20today.%20Might%20help%20you%20too.&url=https%3A%2F%2Faccracoded.com" className="c-button c-button--ghost share-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Share on X">
                  <iconify-icon icon="tabler:brand-x" aria-hidden="true"></iconify-icon>
                  <span className="sr-only">X</span>
                </a>
                <a href="https://www.snapchat.com/" className="c-button c-button--ghost share-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Open Snapchat">
                  <iconify-icon icon="tabler:brand-snapchat" aria-hidden="true"></iconify-icon>
                  <span className="sr-only">Snapchat</span>
                </a>
                <a href="https://www.instagram.com/" className="c-button c-button--ghost share-icon-btn" target="_blank" rel="noopener noreferrer" aria-label="Open Instagram">
                  <iconify-icon icon="tabler:brand-instagram" aria-hidden="true"></iconify-icon>
                  <span className="sr-only">Instagram</span>
                </a>
                <button type="button" className="c-button c-button--ghost share-grid__wide" data-action="copy-link">
                  <iconify-icon icon="tabler:link" aria-hidden="true"></iconify-icon>
                  <span>Copy link</span>
                </button>
              </div>
            </div>
        
            <details className="c-list-item carers-collapsible">
              <summary className="carers-summary">
                <span className="resource-name">Message for Therapists &amp; Carers</span>
              </summary>
              <div className="carers-body support-copy">
                <p className="resource-desc">Caring for someone living with mental health challenges is an act of profound love, patience, and emotional endurance. Yet, one question is rarely asked... who cares for the carers?</p>
                <p className="resource-desc">Behind every person navigating mental illness, there is often a family member, partner, friend, or professional quietly carrying the emotional weight alongside them. Carers give their time, energy, stability, and compassion so freely, often placing the wellbeing of others before their own.</p>
                <p className="resource-desc">The responsibility can be overwhelming, isolating, and deeply exhausting. Many carers experience burnout, anxiety, grief, guilt, and chronic stress, yet still feel they must remain strong and steady for the person they support.</p>
                <p className="resource-desc">Today, I want to acknowledge the quiet, unseen love that carers and therapists offer every single day. The listening, the holding, the patience, and the hope you carry for others truly matters.</p>
                <p className="resource-desc">This Mental Health Month is a gentle reminder that your care is valuable, your wellbeing is important, and you too deserve rest, softness, and support.</p>
                <p className="resource-desc"><em>Love is not only what you give. Love is also what you allow yourself to receive.</em></p>
              </div>
            </details>
        
            <div className="screen__footer nav-row resources-footer">
              <button type="button" className="c-button c-button--secondary" data-action="go-to" data-target="s-checkin">Back</button>
              <button type="button" className="c-button c-button--ghost" data-action="go-to" data-target="s-landing">Start over</button>
            </div>
      </div>
    </section>
  );
}


