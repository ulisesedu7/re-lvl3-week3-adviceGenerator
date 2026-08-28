/**
 * AdviceButton keeps the interactive control independent from the card layout.
 */
function AdviceButton({
  onClick,
  isDisabled = false,
  isLoading = false,
  label = 'Generate another example advice',
}) {
  return (
    <button
      className="advice-button"
      type="button"
      aria-label={label}
      aria-busy={isLoading}
      disabled={isDisabled}
      onClick={onClick}
    >
      {isLoading ? (
        <span className="advice-button__spinner" aria-hidden="true" />
      ) : (
        <img
          className="advice-button__icon"
          src="/images/icon-dice.svg"
          alt=""
          aria-hidden="true"
        />
      )}
    </button>
  );
}

export default AdviceButton;
