import { useCallback, useEffect, useRef, useState } from 'react';
import { getRandomAdvice } from '../services/adviceApi.js';

const DEFAULT_COOLDOWN_MS = 2000;

/**
 * useAdvice owns the asynchronous state machine for loading one advice slip.
 */
export function useAdvice({ cooldownMs = DEFAULT_COOLDOWN_MS } = {}) {
  const [advice, setAdvice] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isCoolingDown, setIsCoolingDown] = useState(false);

  const requestInProgressRef = useRef(false);
  const cooldownActiveRef = useRef(false);
  const abortControllerRef = useRef(null);
  const cooldownTimerRef = useRef(null);

  const beginCooldown = useCallback(() => {
    window.clearTimeout(cooldownTimerRef.current);

    if (cooldownMs <= 0) {
      cooldownActiveRef.current = false;
      setIsCoolingDown(false);
      return;
    }

    cooldownActiveRef.current = true;
    setIsCoolingDown(true);

    cooldownTimerRef.current = window.setTimeout(() => {
      cooldownActiveRef.current = false;
      setIsCoolingDown(false);
    }, cooldownMs);
  }, [cooldownMs]);

  const fetchAdvice = useCallback(async () => {
    if (requestInProgressRef.current || cooldownActiveRef.current) {
      return;
    }

    requestInProgressRef.current = true;
    setIsLoading(true);
    setError('');

    const controller = new AbortController();
    abortControllerRef.current = controller;

    try {
      const nextAdvice = await getRandomAdvice({ signal: controller.signal });

      if (!controller.signal.aborted) {
        setAdvice(nextAdvice);
        beginCooldown();
      }
    } catch (requestError) {
      if (!controller.signal.aborted) {
        const message =
          requestError instanceof Error
            ? requestError.message
            : 'An unexpected error prevented the request.';

        setError(message);
      }
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
        requestInProgressRef.current = false;
      }

      if (!controller.signal.aborted) {
        setIsLoading(false);
      }
    }
  }, [beginCooldown]);

  useEffect(() => {
    const initialFetchTimer = window.setTimeout(() => {
      void fetchAdvice();
    }, 0);

    return () => {
      window.clearTimeout(initialFetchTimer);
      abortControllerRef.current?.abort();
      window.clearTimeout(cooldownTimerRef.current);
      requestInProgressRef.current = false;
      cooldownActiveRef.current = false;
    };
  }, [fetchAdvice]);

  return {
    advice,
    error,
    fetchAdvice,
    isCoolingDown,
    isLoading,
  };
}
