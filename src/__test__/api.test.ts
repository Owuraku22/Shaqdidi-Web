import { fetchOrders, manageOrder } from '../lib/api';

describe('API functions', () => {
  it('fetches orders successfully', async () => {
    const orders = await fetchOrders();
    expect(orders).toHaveLength(1);
    expect(orders?.[0]).toHaveProperty('joint_name', 'Test Joint');
  });

  it('manages order successfully', async () => {
    const result = await manageOrder(1, 'Completed');
    expect(result).toEqual({ message: 'Order status successfully updated' });
  });
});