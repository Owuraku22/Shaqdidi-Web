import axios from 'axios';
import { faker } from '@faker-js/faker';

const api = axios.create({
  baseURL: 'https://api.shaqd-d.com', // Replace with your actual API base URL
});

export interface Staff {
  id: string;
  name: string;
  role: string;
  email: string;
  phoneNumber: string;
  image: string;
}

export interface Order {
  id: string;
  title: string;
  location: string;
  status: 'Pending' | 'Completed' | 'Cancelled';
  price: string;
  date: string;
  staffName: string;
  image: string;
  note: string;
  phoneNumber: string;
}

export interface UserProfile extends Staff {
  bio: string;
  joinDate: string;
}

const useFaker = import.meta.env.VITE_REACT_APP_USE_FAKER === 'true';

const generateFakeStaff = (count: number): Staff[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    role: faker.person.jobTitle(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number({style: 'human'}),
    image: faker.image.avatar(),
  }));
};

const generateFakeOrders = (count: number): Order[] => {
  return Array.from({ length: count }, () => ({
    id: faker.string.uuid(),
    title: faker.commerce.productName(),
    location: faker.location.streetAddress(),
    status: faker.helpers.arrayElement(['Pending', 'Completed', 'Cancelled']),
    price: faker.commerce.price({ min: 10, max: 100, dec: 2, symbol: 'GHS' }),
    date: faker.date.recent().toISOString(),
    staffName: faker.person.fullName(),
    image: faker.image.urlLoremFlickr({ category: 'food' }),
    note: faker.lorem.sentence(),
    phoneNumber: faker.phone.number({style: 'human'}),
  }));
};

export const fetchStaffMembers = async (search: string = ''): Promise<Staff[]> => {
  if (useFaker) {
    const fakeStaff = generateFakeStaff(20);
    return fakeStaff.filter(staff => 
      staff.name.toLowerCase().includes(search.toLowerCase()) ||
      staff.role.toLowerCase().includes(search.toLowerCase())
    );
  }
  try {
    const response = await api.get<Staff[]>(`/staff?search=${encodeURIComponent(search)}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch staff members. Please try again later.');
  }
};

export const fetchTodayOrders = async (): Promise<Order[]> => {
  if (useFaker) {
    return generateFakeOrders(10).map(order => ({ ...order, status: 'Pending' }));
  }
  try {
    const response = await api.get<Order[]>('/orders/today');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch today\'s orders. Please try again later.');
  }
};

export const fetchPreviousOrders = async (): Promise<Order[]> => {
  if (useFaker) {
    return generateFakeOrders(20).map(order => ({ ...order, status: 'Completed' }));
  }
  try {
    const response = await api.get<Order[]>('/orders/previous');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch previous orders. Please try again later.');
  }
};

export const markOrderCompleted = async (orderId: string): Promise<{ success: boolean }> => {
  if (useFaker) {
    return { success: true };
  }
  try {
    const response = await api.post<{ success: boolean }>(`/orders/${orderId}/complete`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to mark order as completed. Please try again later.');
  }
};

export const fetchUserProfile = async (): Promise<UserProfile> => {
  if (useFaker) {
    return {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      role: faker.person.jobTitle(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number({style: 'human'}),
      image: faker.image.avatar(),
      bio: faker.lorem.paragraph(),
      joinDate: faker.date.past().toISOString(),
    };
  }
  try {
    const response = await api.get<UserProfile>('/user/profile');
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch user profile. Please try again later.');
  }
};