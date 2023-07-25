import { act, fireEvent, render, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import App from './app';
import { Films } from './films';

// jest.mock('film/module', () => ({ Films: jest.fn() }), { virtual: true });

// jest.mock('./films', () => ({ Films: jest.fn() }));
// eslint-disable-next-line import/first
// eslint-disable-next-line @typescript-eslint/no-explicit-any
// (Films as any).mockImplementation(() => <div>Mock</div>);

// jest.mock('films/Module', () => ({
//   Film: () => {
//     return <Films />;
//   },
// }));

jest.mock('films/Module', () => ({
  Film: () => {
    return <Films />;
  },
}));

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
