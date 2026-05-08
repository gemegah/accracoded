import { useState, type FormEvent } from 'react';

import { postJson } from '../lib/apiClient.js';

export function WaitlistSection() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'succeeded' | 'failed'>('idle');
  const [formError, setFormError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setFormState('submitting');
    setFormError('');

    try {
      await postJson('/waitlist', {
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        interest: String(data.get('interest') || ''),
        location: String(data.get('location') || ''),
        source: 'homepage'
      });
      form.reset();
      setFormState('succeeded');
    } catch {
      setFormState('failed');
      setFormError('We could not add you to the list just now. Please try again.');
    }
  }

  return (
    <section className="app-waitlist-section w-full overflow-x-clip px-[18px] sm:px-6 md:px-7 lg:px-[26px]" aria-labelledby="waitlist-title">
      <div className="footer-waitlist grid min-w-0 max-w-[1440px] overflow-x-clip gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(320px,0.75fr)] lg:grid-cols-[minmax(0,1.35fr)_minmax(360px,0.92fr)_minmax(320px,0.9fr)] lg:gap-14">
        <div className="footer-waitlist__copy order-1 min-w-0">
          <p className="footer-waitlist__eyebrow min-w-0">
            <img src="./src/assets/home/home-sun-icon.svg" alt="" aria-hidden="true" />
            <span className="min-w-0 break-words">Accra's wellness directory & membership community</span>
          </p>
          <h2 className="footer-waitlist__title break-words" id="waitlist-title">
            Stay close to wellness in Accra
          </h2>
          <span className="footer-waitlist__rule" aria-hidden="true" />
          <p className="footer-waitlist__body break-words">
            Join the Wellness List for handpicked spaces, practitioner recommendations, upcoming events and exclusive
            member perks. Be the first to know. Live well, every day.
          </p>
          <p className="footer-privacy min-w-0">
            <span className="footer-privacy__icon" aria-hidden="true">
              <iconify-icon icon="tabler:lock" />
            </span>
            <span className="min-w-0 break-words">
              We respect your privacy.
              <br />
              No spam, ever.
            </span>
          </p>
        </div>

        <form className="footer-waitlist__form order-3 min-w-0 lg:order-2" onSubmit={handleSubmit} aria-label="Wellness list form">
          <input type="hidden" name="subject" value="New Accra Coded waitlist signup" />
          <label className="footer-field min-w-0">
            <span>Name</span>
            <input className="w-full min-w-0" type="text" name="name" placeholder="Your full name" autoComplete="name" required />
          </label>
          <label className="footer-field min-w-0">
            <span>Email</span>
            <input className="w-full min-w-0" type="email" name="email" placeholder="you@example.com" autoComplete="email" required />
          </label>
          <label className="footer-field min-w-0">
            <span>Wellness interest</span>
            <select className="w-full min-w-0" name="interest" defaultValue="" required>
              <option value="" disabled>
                Select your primary interest
              </option>
              <option value="mental-health">Mental health</option>
              <option value="fitness">Fitness and movement</option>
              <option value="beauty">Beauty and self-care</option>
              <option value="community">Community support</option>
            </select>
          </label>
          <label className="footer-field footer-field--icon min-w-0">
            <span>Location</span>
            <input className="w-full min-w-0" type="text" name="location" placeholder="Where are you based?" autoComplete="address-level2" />
            <iconify-icon icon="tabler:map-pin" aria-hidden="true" />
          </label>
          <button type="submit" className="footer-submit w-full min-w-0" disabled={formState === 'submitting' || formState === 'succeeded'}>
            <span className="min-w-0 break-words">{formState === 'submitting' ? 'Joining...' : formState === 'succeeded' ? 'You are on the list' : 'Join the wellness list'}</span>
            <span aria-hidden="true">&rarr;</span>
          </button>
          {formError ? <p className="footer-form-error footer-form-error--form">{formError}</p> : null}
          {formState === 'succeeded' ? (
            <p className="footer-form-success" role="status">
              Thanks. You are on the Accra Coded wellness list.
            </p>
          ) : null}
          <p className="footer-consent">
            By joining, you agree to receive updates from Accra Coded. You can unsubscribe at any time.
          </p>
        </form>

        <figure className="footer-still-life order-2 min-w-0 max-w-full overflow-x-clip md:col-span-2 md:justify-self-center lg:order-3 lg:col-span-1 lg:overflow-visible" aria-hidden="true">
          <img className="max-w-full" src="./src/assets/home/home-membership-still-life.png" alt="" loading="lazy" decoding="async" />
          <img className="footer-still-life__sun" src="./src/assets/home/home-sun-icon.svg" alt="" />
        </figure>
      </div>
    </section>
  );
}
