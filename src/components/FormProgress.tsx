type FormProgressProps = {
  steps: string[];
  currentStep: number;
};

export function FormProgress({ steps, currentStep }: FormProgressProps) {
  return (
    <ol className="form-progress" aria-label="Form progress">
      {steps.map((step, index) => (
        <li key={step} className={index <= currentStep ? 'active' : ''} aria-current={index === currentStep ? 'step' : undefined}>
          <span>{index + 1}</span>
          {step}
        </li>
      ))}
    </ol>
  );
}
