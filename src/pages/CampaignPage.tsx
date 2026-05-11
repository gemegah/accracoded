import botanicalSprig from '../assets/campaign/ChatGPT Image May 8, 2026, 12_33_29 PM (1).png';
import botanicalArch from '../assets/campaign/ChatGPT Image May 8, 2026, 12_33_30 PM (2).png';
import { CAMPAIGN_VIDEOS } from '../data/campaignVideos.js';
import { useTransparentPng } from '../hooks/useTransparentPng';
import { useMemo } from 'react';

export function CampaignPage() {
  const cleanBotanicalSprig = useTransparentPng(botanicalSprig);
  const cleanBotanicalArch = useTransparentPng(botanicalArch);
  const selectedVideo = useMemo(
    () => CAMPAIGN_VIDEOS[Math.floor(Math.random() * CAMPAIGN_VIDEOS.length)],
    []
  );

  return (
    <>
      <section className="screen screen--surface is-active campaign-entry-screen" id="s-campaign" aria-label="QR campaign entry">
        <div className="screen__inner page-shell campaign-entry__shell">
          <div className="campaign-entry">
            <img className="campaign-entry__arch" src={cleanBotanicalArch} alt="" aria-hidden="true" />
            <div className="campaign-entry__copy">
              <h1 className="campaign-entry__title">
                Feeling the pressure?
                <br />
                You are not <span>alone.</span>
              </h1>

              <p className="campaign-entry__body">
                Accra is intense. Sometimes your mind needs a pause. This space gives you one short moment to reset.
              </p>

              <p className="campaign-entry__prompt">
                <em>&ldquo;Wo ho te s3n?&rdquo;</em> How are you, really?
              </p>
            </div>

            <img
              className="campaign-entry__botanical"
              src={cleanBotanicalSprig}
              alt=""
              aria-hidden="true"
            />

            <div className="campaign-entry__actions">
              <button type="button" className="campaign-entry__cta campaign-entry__cta--primary" data-action="go-to" data-target="s-campaign-format">
                I am ready. Take a breath with me
              </button>
              <button type="button" className="campaign-entry__cta campaign-entry__cta--secondary" data-action="show-crisis">
                In immediate danger? Get help now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="screen screen--surface" id="s-campaign-format" aria-label="Choose format">
        <div className="screen__inner page-shell">
          <div className="progress-dots" aria-hidden="true">
            <span className="dot"></span>
            <span className="dot is-active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>

          <div className="info-grid">
            <p className="section-label">How you would like to receive this</p>
            <h2 className="title">Choose your format</h2>
            <p className="body-sub">All three carry the same message. Pick what feels right for you right now.</p>
            <div className="c-badge">
              <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="10" width="14" height="10" rx="2"></rect><path d="M8 10V7a4 4 0 1 1 8 0v3"></path></svg>
              <span>No sign-in. No tracking. This is private.</span>
            </div>
          </div>

          <div className="format-options">
            <button type="button" className="format-card is-selected" id="fmt-video" data-action="select-format" data-format="video" aria-pressed="true">
              <span className="format-card__icon" aria-hidden="true">
                <svg className="c-icon c-icon--lg" viewBox="0 0 24 24"><polygon points="8 6 18 12 8 18 8 6"></polygon></svg>
              </span>
              <span>
                <span className="format-card__title">Watch</span>
                <span className="format-card__desc">A short video from a real person in Accra. About 90 seconds.</span>
              </span>
            </button>

            {/* <button type="button" className="format-card" id="fmt-audio" data-action="select-format" data-format="audio" aria-pressed="false">
              <span className="format-card__icon" aria-hidden="true">
                <svg className="c-icon c-icon--lg" viewBox="0 0 24 24"><path d="M4 13v-2a2 2 0 0 1 2-2h2v6H6a2 2 0 0 1-2-2z"></path><path d="M20 13v-2a2 2 0 0 0-2-2h-2v6h2a2 2 0 0 0 2-2z"></path><path d="M8 9a4 4 0 0 1 8 0"></path></svg>
              </span>
              <span>
                <span className="format-card__title">Listen</span>
                <span className="format-card__desc">Audio-only format for busy spaces and lower data use.</span>
              </span>
            </button> */}

            <button type="button" className="format-card" id="fmt-text" data-action="select-format" data-format="text" aria-pressed="false">
              <span className="format-card__icon" aria-hidden="true">
                <svg className="c-icon c-icon--lg" viewBox="0 0 24 24"><path d="M6 4h12a1 1 0 0 1 1 1v14l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1z"></path></svg>
              </span>
              <span>
                <span className="format-card__title">Read</span>
                <span className="format-card__desc">A quiet letter. Works reliably on any connection.</span>
              </span>
            </button>
          </div>

          <div className="spacer" aria-hidden="true"></div>

          <div className="screen__footer campaign-screen__footer campaign-screen__footer--plain">
            <button type="button" className="c-button c-button--secondary" data-action="campaign-back" data-scope="route" data-fallback="s-campaign">Back</button>
          </div>
        </div>
      </section>
      <section className="screen" id="s-content" aria-label="Content options">
        <div className="screen__inner page-shell">
          <div className="c-tabs" role="group" aria-label="Content format">
            <button type="button" className="c-tab" id="tb-video" data-action="switch-view" data-format="video" aria-pressed="true">
              <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true"><polygon points="8 6 18 12 8 18 8 6"></polygon></svg>
              <span>Video</span>
            </button>
            {/* <button type="button" className="c-tab" id="tb-audio" data-action="switch-view" data-format="audio" aria-pressed="false">
              <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 13v-2a2 2 0 0 1 2-2h2v6H6a2 2 0 0 1-2-2z"></path><path d="M20 13v-2a2 2 0 0 0-2-2h-2v6h2a2 2 0 0 0 2-2z"></path><path d="M8 9a4 4 0 0 1 8 0"></path></svg>
              <span>Audio</span>
            </button> */}
            <button type="button" className="c-tab" id="tb-text" data-action="switch-view" data-format="text" aria-pressed="false">
              <svg className="c-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 4h12a1 1 0 0 1 1 1v14l-3-2-3 2-3-2-3 2V5a1 1 0 0 1 1-1z"></path></svg>
              <span>Read</span>
            </button>
          </div>
      
          <div className="content-stack">
            <div className="view" id="view-video">
              <div className="media-shell media-shell--video-embed">
                <div className="media-shell__inner media-shell__inner--video-embed">
                  <iframe
                    id="campaign-video-iframe"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}`}
                    title={selectedVideo.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  ></iframe>
                </div>
                <p className="media-caption" id="campaign-video-caption">{selectedVideo.quote}</p>
              </div>
              <button type="button" className="c-button c-button--secondary campaign-next-video-btn" data-action="next-video">
                Next video
              </button>
      
              <div className="c-card c-card--solid">
                <p className="detail-name">A shared city voice</p>
                <p className="detail-sub">When you are ready, a short check-in helps us understand who we are reaching so we can keep building this.</p>
              </div>
      
            </div>
      
            {/* <div className="view is-hidden" id="view-audio">
              <div className="c-card c-card--solid audio-panel" id="audio-panel">
                <div className="audio-wave" aria-hidden="true">
                  <span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span>
                  <span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span><span className="wave-bar"></span>
                </div>
      
                <button type="button" className="audio-toggle" id="audio-toggle" data-action="toggle-audio" aria-pressed="false" aria-label="Play audio message">
                  <svg className="c-icon c-icon--lg icon-play" viewBox="0 0 24 24" aria-hidden="true"><polygon points="8 6 18 12 8 18 8 6"></polygon></svg>
                  <svg className="c-icon c-icon--lg icon-pause" viewBox="0 0 24 24" aria-hidden="true"><line x1="9" y1="6" x2="9" y2="18"></line><line x1="15" y1="6" x2="15" y2="18"></line></svg>
                </button>
      
                <div>
                  <p className="detail-name detail-name--center">Kofi, 31, Tema</p>
                  <p className="detail-sub">1:32 - Stress and finding stillness</p>
                </div>
      
                <div className="c-card c-card--subtle">
                  <p className="body-sub">"Some days Accra takes too much from you. I used to think that was weakness. It is not."</p>
                </div>
              </div>
      
            </div> */}
      
            <div className="view is-hidden" id="view-text">
              <div className="c-card c-card--solid letter">
                <p className="letter-head">A letter from Accra</p>
                <div className="letter-body" id="letter-body">
                  <p>Dear you,</p>
                  <p>I know how it feels when Accra asks too much of you.</p>
                  <p>The trotro. The deadline. The call from home you have not returned. The thing you cannot say out loud because no one seems to have time for it.</p>
                  <p>I have been there. In a crowded place, but completely alone with it.</p>
                  <p>What I want you to know is that feeling it does not mean you are falling apart. It means you are paying attention.</p>
                  <p>You do not have to fix it today. You only have to stay with it long enough to let something shift.</p>
                  <p>You are still here. That already says something.</p>
                </div>
                <p className="letter-sign" id="letter-sign">- Kofi, 31, Tema<br /><span className="copy-soft">Shared anonymously with Accra Coded</span></p>
              </div>
      
              <button type="button" className="c-button c-button--primary" data-action="cycle-message">See another message</button>
            </div>
          </div>
      
          <div className="screen__footer nav-row campaign-screen__footer--plain campaign-content__footer">
            <button type="button" className="c-button c-button--secondary" data-action="campaign-back" data-fallback="s-campaign-format">Back</button>
            <button type="button" className="c-button c-button--primary" data-action="go-to" data-target="s-checkin">Next</button>
          </div>
        </div>
      </section>
      
      <section className="screen" id="s-checkin" aria-label="Quick check-in">
        <div className="screen__inner page-shell">
          <div className="progress-dots" aria-hidden="true">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot is-active"></span>
          </div>
      
          <div className="info-grid">
            <p className="section-label">Quick check-in</p>
            <h2 className="title">How are you feeling now?</h2>
            <p className="body-sub">No names and no personal account. This only helps us understand who this reaches.</p>
            <p className="form-error" id="checkin-error" role="alert" hidden>Please choose a feeling, age range, and gender before continuing.</p>
          </div>
      
          <div className="check-group">
            <p className="check-label">After that experience:</p>
            <div className="mood-options" role="group" aria-label="Mood selection">
              <button type="button" className="mood-btn" data-action="select-mood" data-mood="heavy" aria-pressed="false">
                <span className="mood-icon" aria-hidden="true"><svg className="c-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M8 15c1.1-1 2.4-1.5 4-1.5s2.9.5 4 1.5"></path><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line></svg></span>
                <span>Still heavy</span>
              </button>
      
              <button type="button" className="mood-btn" data-action="select-mood" data-mood="better" aria-pressed="false">
                <span className="mood-icon" aria-hidden="true"><svg className="c-icon" viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"></circle><path d="M8 14c1 1.2 2.3 1.8 4 1.8s3-.6 4-1.8"></path><line x1="9" y1="10" x2="9.01" y2="10"></line><line x1="15" y1="10" x2="15.01" y2="10"></line></svg></span>
                <span>A bit better</span>
              </button>
      
              <button type="button" className="mood-btn" data-action="select-mood" data-mood="needed" aria-pressed="false">
                <span className="mood-icon" aria-hidden="true"><svg className="c-icon" viewBox="0 0 24 24"><path d="M12 21s-6.5-4.1-9-8.2C.7 9 .9 5.8 3.3 4.2c2.1-1.4 4.8-.9 6.7 1.1 1.9-2 4.6-2.5 6.7-1.1 2.4 1.6 2.6 4.8.3 8.6-2.5 4.1-9 8.2-9 8.2z"></path></svg></span>
                <span>I needed this</span>
              </button>
            </div>
          </div>
          <div className="check-group">
            <p className="check-label">About you</p>
            <div className="input-grid">
              <div className="field">
                <label htmlFor="age-select">Age range</label>
                <select className="c-select" id="age-select" name="age-range">
                  <option value="">Select age range</option>
                  <option value="under-18">Under 18</option>
                  <option value="18-24">18-24</option>
                  <option value="25-34">25-34</option>
                  <option value="35-44">35-44</option>
                  <option value="45-plus">45+</option>
                </select>
              </div>
      
              <div className="field">
                <label htmlFor="gender-select">Gender</label>
                <select className="c-select" id="gender-select" name="gender">
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="non-binary">Non-binary</option>
                  <option value="prefer-not">Prefer not to say</option>
                </select>
              </div>
            </div>
          </div>
      
          <div className="spacer" aria-hidden="true"></div>
      
          <div className="screen__footer campaign-screen__footer--plain campaign-content__footer">
            <button type="button" className="c-button c-button--primary" data-action="submit-checkin">Submit and see support options</button>
            <button type="button" className="c-button c-button--ghost" data-action="campaign-back" data-fallback="s-content">Back</button>
          </div>
        </div>
      </section>
    </>
  );
}


