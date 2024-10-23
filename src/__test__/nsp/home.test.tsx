import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from '../../routes/home';
import '@testing-library/jest-dom'

const queryClient = new QueryClient();

const mockOrders = [
  {
    id: 1,
    joint_name: 'Test Joint',
    address: 'Test Address',
    status: 'Pending',
    amount: 'GHS 50',
    date: new Date().toISOString(),
    name: 'John Doe',
    note: 'Test note',
    phone_number: '1234567890',
  },
];

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => ({ orders: mockOrders }),
}));

describe('Home component', () => {
  it('renders without crashing', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Manage Your Assigned Orders')).toBeInTheDocument();
  });

  it('displays today\'s orders', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(screen.getByText('Test Joint')).toBeInTheDocument();
  });

  it('switches to previous orders tab', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </MemoryRouter>
      </QueryClientProvider>
    );

    fireEvent.click(screen.getByText('Previous Orders'));
    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument();
  });
});