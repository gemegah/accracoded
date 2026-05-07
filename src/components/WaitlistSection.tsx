import { useForm, ValidationError } from '@formspree/react';

export function WaitlistSection() {
  const [state, handleSubmit] = useForm('xqendlve');

  return (
    <section className="app-waitlist-section" aria-labelledby="waitlist-title">
      <div className="footer-waitlist">
        <div className="footer-waitlist__copy">
          <p className="footer-waitlist__eyebrow">
            <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
            <span>Accra's wellness directory & membership community</span>
          </p>
          <h2 className="footer-waitlist__title" id="waitlist-title">
            Stay close to wellness in Accra
          </h2>
          <span className="footer-waitlist__rule" aria-hidden="true" />
          <p className="footer-waitlist__body">
            Join the Wellness List for handpicked spaces, practitioner recommendations, upcoming events and exclusive
            member perks. Be the first to know. Live well, every day.
          </p>
          <p className="footer-privacy">
            <span className="footer-privacy__icon" aria-hidden="true">
              <iconify-icon icon="tabler:lock" />
            </span>
            <span>
              We respect your privacy.
              <br />
              No spam, ever.
            </span>
          </p>
        </div>

        <form className="footer-waitlist__form" onSubmit={handleSubmit} aria-label="Wellness list form">
          <input type="hidden" name="subject" value="New Accra Coded waitlist signup" />
          <label className="footer-field">
            <span>Name</span>
            <input type="text" name="name" placeholder="Your full name" autoComplete="name" required />
            <ValidationError field="name" errors={state.errors} className="footer-form-error" />
          </label>
          <label className="footer-field">
            <span>Email</span>
            <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
            <ValidationError field="email" errors={state.errors} className="footer-form-error" />
          </label>
          <label className="footer-field">
            <span>Wellness interest</span>
            <select name="interest" defaultValue="" required>
              <option value="" disabled>
                Select your primary interest
              </option>
              <option value="mental-health">Mental health</option>
              <option value="fitness">Fitness and movement</option>
              <option value="beauty">Beauty and self-care</option>
              <option value="community">Community support</option>
            </select>
            <ValidationError field="interest" errors={state.errors} className="footer-form-error" />
          </label>
          <label className="footer-field footer-field--icon">
            <span>Location</span>
            <input type="text" name="location" placeholder="Where are you based?" autoComplete="address-level2" />
            <iconify-icon icon="tabler:map-pin" aria-hidden="true" />
            <ValidationError field="location" errors={state.errors} className="footer-form-error" />
          </label>
          <button type="submit" className="footer-submit" disabled={state.submitting || state.succeeded}>
            <span>{state.submitting ? 'Joining...' : state.succeeded ? 'You are on the list' : 'Join the wellness list'}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          <ValidationError errors={state.errors} className="footer-form-error footer-form-error--form" />
          {state.succeeded ? (
            <p className="footer-form-success" role="status">
              Thanks. You are on the Accra Coded wellness list.
            </p>
          ) : null}
          <p className="footer-consent">
            By joining, you agree to receive updates from Accra Coded. You can unsubscribe at any time.
          </p>
        </form>

        <figure className="footer-still-life" aria-hidden="true">
          <img src="./src/assets/home/home-membership-still-life.png" alt="" loading="lazy" decoding="async" />
          <img className="footer-still-life__sun" src="./src/assets/home/home-sun-icon.svg" alt="" />
        </figure>
      </div>
    </section>
  );
}
