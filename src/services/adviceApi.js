import axios from "axios";

const configuredBaseUrl = import.meta.env.VITE_ADVICE_API_URL?.trim();

const adviceClient = axios.create({
  baseURL: configuredBaseUrl || undefined,
  timeout: 5000,
  headers: {
    Accept: 'application/json',
  }
});


/**
 * Validate external data at the application boundary before components use it.
 */
function normalizeAdvice(data) {
  const id = data?.slip?.id;
  const text = data?.slip?.advice;

  if (!Number.isInteger(id) || typeof text !== 'string' || text.trim() === '') {
    throw new Error('The advice service returned an unexpected response.');
  }

  return {
    id,
    text: text.trim(),
  };
}

/**
 * Request one random advice slip while supporting AbortController cancellation.
 */
export async function getRandomAdvice({ signal } = {}) {
  if (!configuredBaseUrl) {
    throw new Error('VITE_ADVICE_API_URL is not configured.');
  }

  try {
    const response = await adviceClient.get('/advice', { signal });
    
    return normalizeAdvice(response.data);
  } catch (error) {
    if (axios.isCancel(error)) {
      throw error;
    }

    if (error instanceof Error && error.message.startsWith('VITE_')) {
      throw error;
    }

    if (
      error instanceof Error &&
      error.message === 'The advice service returned an unexpected response.'
    ) {
      throw error;
    }

    throw new Error('We could not load advice. Check the connection and try again.', { cause: error });
  }
}
