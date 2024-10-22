import { render, screen, fireEvent } from '@testing-library/react';
import EmptyState from '../../components/nsp/empty-state';
import '@testing-library/jest-dom'

describe('EmptyState component', () => {
  it('renders message correctly', () => {
    render(<EmptyState message="No data available" onRefresh={() => {}} />);
    expect(screen.getByText('No data available')).toBeInTheDocument();
  });

  it('calls onRefresh when refresh button is clicked', () => {
    const mockOnRefresh = jest.fn();
    render(<EmptyState message="No data available" onRefresh={mockOnRefresh} />);

    fireEvent.click(screen.getByText('Refresh'));
    expect(mockOnRefresh).toHaveBeenCalled();
  });
});