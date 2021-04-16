import {render, screen} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import SummaryForm from '../SummaryForm'

test('inital conditions', () =>  {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });

  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
  
});

test('Checkbox enables button on first click and disables on second click', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole('button', {
    name: /confirm order/i,
  });
  userEvent.click(checkbox);
  expect(confirmButton).toBeEnabled();
  userEvent.click(checkbox);
  expect(confirmButton).toBeDisabled();
  
});

test('popover responds to hover', () => {
  //popover starts out hidden
  
  //appears when hovered

  //dissapers after mouse over
});
