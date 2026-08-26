import AdviceButton from './AdviceButton.jsx';

/**
 * AdviceCard renders the challenge content and delegates interaction to AdviceButton.
 */
function AdviceCard({ adviceId, adviceText, onGenerateAdvice }) {
  return (
    <article className="advice-card" aria-labelledby="advice-heading">
      <p className="advice-card__eyebrow" id="advice-heading">
        Advice #{adviceId}
      </p>

      <blockquote className="advice-card__quote">“{adviceText}”</blockquote>

      <picture className="advice-card__divider" aria-hidden="true">
        <source
          media="(min-width: 36rem)"
          srcSet="/images/pattern-divider-desktop.svg"
        />
        <img src="/images/pattern-divider-mobile.svg" alt="" />
      </picture>

      <AdviceButton onClick={onGenerateAdvice} />
    </article>
  );
}

export default AdviceCard;
