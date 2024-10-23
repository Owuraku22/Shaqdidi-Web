import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';


export const handlers = [
  http.get('https://api.shaqdidi.com/orders', ({request: req, }) => {
    return HttpResponse.json({
        orders: [
          {
            id: 1,
            joint_name: 'Test Joint',
            address: 'Test Address',
            status: 'Pending',
            amount: 'GHS 50',
            date: '2023-05-01',
            name: 'John Doe',
            note: 'Test note',
            phone_number: '1234567890',
          },
        ],
      }
    );
  }),

  http.post('https://api.shaqdidi.com/orders/manage', () => {
    return HttpResponse.json({ message: 'Order status successfully updated' });
  }),
];

export const server = setupServer(...handlers);