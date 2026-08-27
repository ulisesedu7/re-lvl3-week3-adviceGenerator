import AdviceCard from "./components/AdviceCard";
import { useAdvice } from "./hooks/useAdvice";

function App({ cooldownMs }) {
  const { advice, error, fetchAdvice, isCoolingDown, isLoading } = useAdvice({
    cooldownMs,
  });

  return (
    <main className="app-shell">
      <AdviceCard
        adviceId={advice?.id ?? null}
        adviceText={advice?.text ?? ''}
        error={error}
        isCoolingDown={isCoolingDown}
        isLoading={isLoading}
        onGenerateAdvice={fetchAdvice}
      />
    </main>
  );
}

export default App;
