import { render, screen, fireEvent } from '@testing-library/react';
import OrderCard from '../../components/nsp/order-card';
import { describe, it } from 'node:test';
import '@testing-library/jest-dom'
import { Order } from '@/lib/api';


const mockOrder = {
  id: 1,
  joint_name: 'Test Joint',
  address: 'Test Address',
  status: 'Pending',
  amount: 'GHS 50',
  date: '2023-05-01',
  name: 'John Doe',
  note: 'Test note',
  phone_number: '1234567890',
} satisfies Order;

describe('OrderCard component', () => {
  it('renders order details correctly', () => {
    render(<OrderCard {...mockOrder} onMarkCompleted={() => {}} activeTab="today" />);

    expect(screen.getByText('Test Joint')).toBeInTheDocument();
    expect(screen.getByText('Test Address')).toBeInTheDocument();
    expect(screen.getByText('GHS 50')).toBeInTheDocument();
  });

  it('opens modal on card click', () => {
    render(<OrderCard {...mockOrder} onMarkCompleted={() => {}} activeTab="today" />);

    fireEvent.click(screen.getByText('Test Joint'));
    expect(screen.getByText('Confirm Order')).toBeInTheDocument();
  });

  it('calls onMarkCompleted when confirm button is clicked', () => {
    const mockOnMarkCompleted = jest.fn();
    render(<OrderCard {...mockOrder} onMarkCompleted={mockOnMarkCompleted} activeTab="today" />);

    fireEvent.click(screen.getByText('Test Joint'));
    fireEvent.click(screen.getByText('Confirm Order'));

    expect(mockOnMarkCompleted).toHaveBeenCalledWith(1);
  });
});