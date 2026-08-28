import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import AdviceButton from './AdviceButton.jsx';

describe('AdviceButton', () => {
  it('announces its purpose and handles an enabled click', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <AdviceButton
        label="Generate new advice"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', {
      name: /generate new advice/i,
    });

    await user.click(button);

    expect(button).toBeEnabled();
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('prevents interaction while disabled', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      <AdviceButton
        isDisabled
        label="Loading new advice"
        onClick={handleClick}
      />,
    );

    const button = screen.getByRole('button', {
      name: /loading new advice/i,
    });

    await user.click(button);

    expect(button).toBeDisabled();
    expect(handleClick).not.toHaveBeenCalled();
  });
});
