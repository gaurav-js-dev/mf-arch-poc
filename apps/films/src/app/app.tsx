import { Film, Films } from '@ui';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Route, Routes } from 'react-router-dom';

export function App(props: { queryClient: QueryClient }) {
  return (
    <QueryClientProvider client={props.queryClient}>
      <Routes>
        <Route index element={<Films />} />
        <Route path="/:id" element={<Film />} />
      </Routes>
    </QueryClientProvider>
  );
}

export default App;
