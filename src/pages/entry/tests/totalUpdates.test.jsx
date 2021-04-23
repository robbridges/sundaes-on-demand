import { render, screen } from '../../../test-utils/testing-library-utils';
import userEvent from '@testing-library/user-event';
import Options from '../Options';


test('update scoop subtotal when scoops change', async () => {
  render(<Options optionType="scoops" />);

  const scoopsSubTotal = screen.getByText('Scoops total: $', {exact: false});

  expect(scoopsSubTotal).toHaveTextContent('0.00');

  const vanillaInput = await screen.findByRole('spinbutton', 
  { name: 'Vanilla', }
  );

  userEvent.clear(vanillaInput);
  userEvent.type(vanillaInput, '1');

  expect(scoopsSubTotal).toHaveTextContent('2.00');

  const chocolateInput = await screen.findByRole('spinbutton', 
  { name: 'Chocolate', }
  );
  
  userEvent.clear(chocolateInput);
  userEvent.type(chocolateInput, '2');
  expect(scoopsSubTotal).toHaveTextContent('6.00');

});