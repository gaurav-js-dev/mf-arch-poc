import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';

jest.mock('film/module', () => ({ Films: jest.fn() }), { virtual: true });
it('should render successfully', () => {
  const { baseElement } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(baseElement).toBeTruthy();
});

it('should have a greeting as the title', () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getByText(/Welcome Home/)).toBeTruthy();
});

it('should have films title', async () => {
  const { getByText } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  expect(getByText(/Films/)).toBeTruthy();
  act(() => {
    fireEvent.click(getByText(/Films/));
  });
  await waitFor(() => expect(getByText(/loading/)).toBeTruthy());
});
