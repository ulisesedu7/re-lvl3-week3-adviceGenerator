import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.jsx';
import { getRandomAdvice } from './services/adviceApi.js';

vi.mock('./services/adviceApi.js', () => ({
  getRandomAdvice: vi.fn(),
}));

describe('App', () => {
  beforeEach(() => {
    getRandomAdvice.mockReset();
  });

  it('loads and renders the first advice slip', async () => {
    getRandomAdvice.mockResolvedValueOnce({
      id: 101,
      text: 'Test behavior from the user perspective.',
    });

    render(<App cooldownMs={0} />);

    expect(screen.getByRole('status')).toHaveTextContent(/loading advice/i);
    expect(
      await screen.findByText('“Test behavior from the user perspective.”'),
    ).toBeInTheDocument();
    expect(screen.getByText(/advice #101/i)).toBeInTheDocument();
    expect(getRandomAdvice).toHaveBeenCalledTimes(1);
  });

  it('requests and displays another advice slip after a click', async () => {
    const user = userEvent.setup();

    getRandomAdvice
      .mockResolvedValueOnce({ id: 1, text: 'First advice.' })
      .mockResolvedValueOnce({ id: 2, text: 'Second advice.' });

    render(<App cooldownMs={0} />);

    expect(await screen.findByText('“First advice.”')).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: /generate new advice/i,
    });

    await waitFor(() => expect(button).toBeEnabled());
    await user.click(button);

    expect(await screen.findByText('“Second advice.”')).toBeInTheDocument();
    expect(screen.getByText(/advice #2/i)).toBeInTheDocument();
    expect(getRandomAdvice).toHaveBeenCalledTimes(2);
  });

  it('shows a retryable error when the service rejects', async () => {
    getRandomAdvice.mockRejectedValueOnce(new Error('The test network is offline.'));

    render(<App cooldownMs={0} />);

    expect(await screen.findByRole('alert')).toHaveTextContent(
      /the test network is offline/i,
    );
    expect(
      screen.getByRole('button', { name: /try loading advice again/i }),
    ).toBeEnabled();
  });
});
