import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormProgress } from '../components/FormProgress';

const steps = ['Your Info', 'Choose Time', 'Topic', 'Review'];
const slots = ['Break', 'First Lunch', 'Second Lunch'];
const topics = ['Academic Stress', 'Friendships', 'Boarding Life', 'Homesickness', 'Confidence', 'Other'];

type BookingFormState = {
  name: string;
  email: string;
  yearGroup: string;
  date: string;
  slot: string;
  topic: string;
  notes: string;
};

const initialState: BookingFormState = {
  name: '',
  email: '',
  yearGroup: '',
  date: '',
  slot: '',
  topic: '',
  notes: '',
};

export function BookingForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const update = (field: keyof BookingFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const currentErrors = useMemo(() => {
    if (step === 0) {
      const messages = [];
      if (!form.name.trim()) messages.push('Name is required.');
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) messages.push('A valid school email is required.');
      if (!form.yearGroup.trim()) messages.push('Year group is required.');
      return messages;
    }
    if (step === 1) {
      const messages = [];
      if (!form.date) messages.push('Date is required.');
      if (!form.slot) messages.push('Please choose a session.');
      return messages;
    }
    if (step === 2 && !form.topic) return ['Please choose a topic.'];
    return [];
  }, [form, step]);

  const next = () => {
    if (currentErrors.length) {
      setErrors(currentErrors);
      return;
    }
    setErrors([]);
    setStep((value) => Math.min(value + 1, steps.length - 1));
  };

  const submit = () => {
    setSubmitted(true);
  };

  return (
    <main className="page form-page">
      <section className="form-topbar">
        <Link className="back-link" to="/form">← Back</Link>
        <h1>Peer Mentor Booking Form</h1>
      </section>
      <FormProgress steps={steps} currentStep={step} />
      <form className="multi-step-form" onSubmit={(event) => event.preventDefault()}>
        {errors.length > 0 && (
          <div className="error-box" role="alert">
            {errors.map((error) => <p key={error}>{error}</p>)}
          </div>
        )}

        {step === 0 && (
          <fieldset>
            <legend>Your Information</legend>
            <label>Name<input value={form.name} onChange={(event) => update('name', event.target.value)} required /></label>
            <label>School Email<input type="email" value={form.email} onChange={(event) => update('email', event.target.value)} required /></label>
            <label>Year Group<input value={form.yearGroup} onChange={(event) => update('yearGroup', event.target.value)} required /></label>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend>Choose Time</legend>
            <label>Date<input type="date" value={form.date} onChange={(event) => update('date', event.target.value)} required /></label>
            <div className="choice-grid">
              {slots.map((slot) => (
                <button key={slot} type="button" className={form.slot === slot ? 'choice-card selected' : 'choice-card'} onClick={() => update('slot', slot)}>
                  {slot}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Topic</legend>
            <div className="choice-grid topics">
              {topics.map((topic) => (
                <button key={topic} type="button" className={form.topic === topic ? 'choice-card selected' : 'choice-card'} onClick={() => update('topic', topic)}>
                  {topic}
                </button>
              ))}
            </div>
            <label>Additional Notes<textarea value={form.notes} onChange={(event) => update('notes', event.target.value)} placeholder="Optional" /></label>
          </fieldset>
        )}

        {step === 3 && (
          <section className="review-panel" aria-label="Booking review">
            <h2>Review</h2>
            <dl>
              <dt>Student name</dt><dd>{form.name}</dd>
              <dt>Selected date</dt><dd>{form.date}</dd>
              <dt>Selected time</dt><dd>{form.slot}</dd>
              <dt>Selected topic</dt><dd>{form.topic}</dd>
              <dt>Notes</dt><dd>{form.notes || 'None'}</dd>
            </dl>
            {submitted && <p className="success-box" role="status">Your request has been sent to a peer mentor.</p>}
          </section>
        )}

        <div className="form-actions">
          <button className="button secondary" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))}>Back</button>
          {step < 3 ? (
            <button className="button primary" type="button" onClick={next}>Next</button>
          ) : (
            <button className="button primary" type="button" onClick={submit}>Send Booking Request</button>
          )}
        </div>
      </form>
    </main>
  );
}
