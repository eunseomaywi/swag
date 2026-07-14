import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FormProgress } from '../components/FormProgress';

const steps = ['About You', 'Your Concern', 'Additional Info', 'Review'];
const categories = ['Mental & Emotional', 'Relationships', 'Academic & Future', 'Home & Daily Life', 'Safety', 'Other'];
const contactOptions = ['Email', "I'd prefer to stay anonymous"];

type ConcernState = {
  name: string;
  yearGroup: string;
  anonymous: boolean;
  preferredResponse: string;
  category: string;
  message: string;
  additionalInfo: string;
  followUp: boolean;
  immediateDanger: string;
};

const initialState: ConcernState = {
  name: '',
  yearGroup: '',
  anonymous: false,
  preferredResponse: '',
  category: '',
  message: '',
  additionalInfo: '',
  followUp: false,
  immediateDanger: '',
};

export function ConcernForm() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const update = <K extends keyof ConcernState>(field: K, value: ConcernState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const currentErrors = useMemo(() => {
    if (step === 0) {
      const messages = [];
      if (!form.yearGroup.trim()) messages.push('Year group is required.');
      if (!form.preferredResponse) messages.push('Preferred response is required.');
      return messages;
    }
    if (step === 1 && !form.category) return ['Please choose a concern category.'];
    if (step === 2) {
      const messages = [];
      if (!form.message.trim()) messages.push('Please tell us what has been happening.');
      if (!form.immediateDanger) messages.push('Please answer the immediate danger question.');
      return messages;
    }
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

  return (
    <main className="page form-page concern-page">
      <section className="form-topbar">
        <Link className="back-link" to="/form">← Back</Link>
        <h1>Concern Form</h1>
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
            <legend>About You</legend>
            <label>Name (Optional)<input value={form.name} onChange={(event) => update('name', event.target.value)} disabled={form.anonymous} /></label>
            <label>Year Group<input value={form.yearGroup} onChange={(event) => update('yearGroup', event.target.value)} required /></label>
            <p className="field-prompt">How would you like us to contact you?</p>
            <label className="toggle-row"><input type="checkbox" checked={form.anonymous} onChange={(event) => update('anonymous', event.target.checked)} /> Submit anonymously</label>
            <div className="choice-grid">
              {contactOptions.map((option) => (
                <button key={option} type="button" className={form.preferredResponse === option ? 'choice-card selected' : 'choice-card'} onClick={() => update('preferredResponse', option)}>
                  {option}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 1 && (
          <fieldset>
            <legend>Your Concern</legend>
            <div className="choice-grid topics">
              {categories.map((category) => (
                <button key={category} type="button" className={form.category === category ? 'choice-card selected' : 'choice-card'} onClick={() => update('category', category)}>
                  {category}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {step === 2 && (
          <fieldset>
            <legend>Additional Info</legend>
            <label>Tell us what has been happening.<textarea value={form.message} onChange={(event) => update('message', event.target.value)} required /></label>
            <label>Is there anything else you would like us to know?<textarea value={form.additionalInfo} onChange={(event) => update('additionalInfo', event.target.value)} placeholder="Optional" /></label>
            <label className="toggle-row"><input type="checkbox" checked={form.followUp} onChange={(event) => update('followUp', event.target.checked)} /> I would like someone from SWAG to follow up.</label>
            <fieldset className="nested-fieldset">
              <legend>Are you or someone else in immediate danger?</legend>
              <div className="choice-grid">
                {['Yes', 'No'].map((answer) => (
                  <button key={answer} type="button" className={form.immediateDanger === answer ? 'choice-card selected' : 'choice-card'} onClick={() => update('immediateDanger', answer)}>
                    {answer}
                  </button>
                ))}
              </div>
            </fieldset>
            {form.immediateDanger === 'Yes' && (
              <div className="warning-box" role="alert">
                This form is not an emergency service. Please contact a teacher, House staff member, safeguarding lead, or another trusted adult immediately.
              </div>
            )}
          </fieldset>
        )}

        {step === 3 && (
          <section className="review-panel" aria-label="Concern review">
            <h2>Review</h2>
            <dl>
              <dt>Name</dt><dd>{form.anonymous ? 'Anonymous' : form.name || 'Not provided'}</dd>
              <dt>Year group</dt><dd>{form.yearGroup}</dd>
              <dt>Preferred response</dt><dd>{form.preferredResponse}</dd>
              <dt>Category</dt><dd>{form.category}</dd>
              <dt>Immediate danger</dt><dd>{form.immediateDanger}</dd>
              <dt>Follow up</dt><dd>{form.followUp ? 'Yes' : 'No'}</dd>
              <dt>Concern</dt><dd>{form.message}</dd>
              <dt>Additional info</dt><dd>{form.additionalInfo || 'None'}</dd>
            </dl>
            {submitted && (
              <p className="success-box" role="status">
                Thank you for sharing this with us. A designated SWAG staff member will review your concern.
              </p>
            )}
          </section>
        )}

        <div className="form-actions">
          <button className="button secondary" type="button" disabled={step === 0} onClick={() => setStep((value) => Math.max(value - 1, 0))}>Back</button>
          {step < 3 ? (
            <button className="button primary" type="button" onClick={next}>Next</button>
          ) : (
            <button className="button primary" type="button" onClick={() => setSubmitted(true)}>Submit Concern</button>
          )}
        </div>
      </form>
    </main>
  );
}
