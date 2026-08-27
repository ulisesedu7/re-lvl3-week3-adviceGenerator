import AdviceButton from './AdviceButton.jsx';


/**
 * AdviceCard renders the challenge content and delegates interaction to AdviceButton.
 */
function AdviceCard({
  adviceId,
  adviceText,
  error,
  isCoolingDown,
  isLoading,
  onGenerateAdvice,
}) {
  const hasAdvice = adviceId !== null && adviceText !== '';
  const isButtonDisabled = isLoading || isCoolingDown;

  let buttonLabel = 'Generate new advice';

  if (isLoading) {
    buttonLabel = 'Loading new advice';
  } else if (isCoolingDown) {
    buttonLabel = 'Please wait before requesting another advice';
  } else if (error) {
    buttonLabel = 'Try loading advice again';
  }

  return (
    <article className="advice-card" aria-labelledby="advice-heading">
      <p className="advice-card__eyebrow" id="advice-heading">
        {hasAdvice ? `Advice #${adviceId}` : 'Advice'}
      </p>

      {hasAdvice ? (
        <blockquote className="advice-card__quote">“{adviceText}”</blockquote>
      ) : isLoading ? (
        <div className="advice-card__status" role="status">
          <span className="advice-card__spinner" aria-hidden="true" />
          <span>Loading advice…</span>
        </div>
      ) : (
        <p className="advice-card__status advice-card__status--error" role="alert">
          {error || 'No advice is available yet.'}
        </p>
      )}

      {hasAdvice && isLoading ? (
        <p className="sr-only" role="status">
          Loading new advice.
        </p>
      ) : null}

      {hasAdvice && error ? (
        <p className="advice-card__inline-error" role="alert">
          {error}
        </p>
      ) : null}

      <picture className="advice-card__divider" aria-hidden="true">
        <source
          media="(min-width: 36rem)"
          srcSet="/images/pattern-divider-desktop.svg"
        />
        <img src="/images/pattern-divider-mobile.svg" alt="" />
      </picture>

      <AdviceButton
        isDisabled={isButtonDisabled}
        isLoading={isLoading}
        label={buttonLabel}
        onClick={onGenerateAdvice}
      />
    </article>
  );
}

export default AdviceCard;
