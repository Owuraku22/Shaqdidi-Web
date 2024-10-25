import axios, { AxiosError } from "axios";
import { faker } from "@faker-js/faker";
<<<<<<< HEAD
import { useStoreData } from "@/store/state";

export const api = axios.create({
=======

const api = axios.create({
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
  baseURL: "https://didi.shaqexpress.com/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});



export interface AuthResponse {
  message: string;
  authorization: {
    token: string;
    type?: string;
    refresh_ttl: string;
    ttl: string;
  };
  user: {
    id: number;
    full_name: string;
    email: string;
<<<<<<< HEAD
    account_type: string;
=======
    account_type?: string;
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
  };
}

export interface Staff {
  id: number;
  name: string;
  role: string;
  email: string;
  phone_number: string;
  status?: string;
}
export interface Personnel {
  id: number;
  name: string;
}

export interface Order {
  id: number;
  date: string;
  joint_name: string;
  address: string;
  amount: string;
  name: string;
  status: "Pending" | "Completed" | "Cancelled";
  note?: string;
  phone_number?: string;
}

export interface FoodJoint {
  id: number;
  name: string;
  address: string;
}

const useFaker = import.meta.env.VITE_REACT_APP_USE_FAKER === "true";

const handleApiError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError<{
      message: string;
      errors?: Record<string, string[]>;
    }>;
    if (axiosError.response) {
      if (
        axiosError.response.status === 422 &&
        axiosError.response.data.errors
      ) {
        throw new Error(
          Object.values(axiosError.response.data.errors).flat().join(", ")
        );
      }
      throw new Error(axiosError.response.data.message || axiosError.message);
    }
  }
  throw error;
};

export const signUp = async (userData: {
  full_name: string;
  email: string;
  password: string;
  account_type: string;
  phone_number: string;
  role?: string;
  fb_token?: string;
}): Promise<AuthResponse | undefined> => {
  if (useFaker) {
    return {
      message: "User signed up successfully",
      authorization: {
        token: faker.string.alphanumeric(64),
        type: "bearer",
        refresh_ttl: faker.date.future().toISOString(),
        ttl: faker.date.future().toISOString(),
      },
      user: {
        id: faker.number.int(),
        full_name: userData.full_name,
        email: faker.internet.email({ firstName: faker.person.fullName() }),
        account_type: "staff",
      },
    };
  }
  try {
    const response = await api.post<AuthResponse>("/auth/sign-up", userData);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signIn = async (credentials: {
  email: string;
  password: string;
<<<<<<< HEAD
  fb_token: string;
=======
  fb_token?: string;
>>>>>>> ecebbf9 (Created logic fetching food Joints and posting data login and sign up pages)
}): Promise<AuthResponse | undefined> => {
  if (useFaker) {
    return {
      message: "User signed in successful",
      authorization: {
        token: faker.string.alphanumeric(64),
        type: "bearer",
        refresh_ttl: faker.date.future().toISOString(),
        ttl: faker.date.future().toISOString(),
      },
      user: {
        id: faker.number.int(),
        full_name: faker.person.fullName(),
        account_type: "staff",
        email: faker.internet.email({ firstName: faker.person.fullName() }),
      },
    };
  }
  try {
    const response = await api.post<AuthResponse>("/auth/sign-in", credentials);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const signOut = async (
  fb_token: string
): Promise<{ message: string } | undefined> => {
  if (useFaker) {
    return { message: "User logged out successfully" };
  }
  try {
    const response = await api.post<{ message: string }>("/auth/sign-out", {
      fb_token,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const refreshToken = async (): Promise<AuthResponse | undefined> => {
  if (useFaker) {
    return {
      message: "User token was refreshed",
      authorization: {
        token: faker.string.alphanumeric(64),
        type: "bearer",
        refresh_ttl: faker.date.future().toISOString(),
        ttl: faker.date.future().toISOString(),
      },
      user: {
        id: faker.number.int(),
        email: faker.internet.email({ firstName: faker.person.fullName() }),
        full_name: faker.person.fullName(),
        account_type: "staff",
      },
    };
  }
  try {
    const response = await api.get<AuthResponse>("/auth/refresh");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

// export const fetchPersonnels = async (): Promise<Staff[] | undefined> => {
//   if (useFaker) {
//     return Array.from({ length: 10 }, () => ({
//       id: faker.number.int(),
//       name: faker.person.fullName(),
//       role: faker.person.jobTitle(),
//       status: faker.helpers.arrayElement(["Available", "Unavailable"]),
//       email: faker.internet.email(),
//       phone_number: faker.phone.number(),
//     }));
//   }
//   try {
//     const response = await api.get<{ message: string; personnels: Staff[] }>(
//       "/personnels"
//     );
//     return response.data.personnels;
//   } catch (error) {
//     handleApiError(error);
//   }
// };

export const fetchAvailablePersonnels = async (): Promise<
  Personnel[] | undefined
> => {
  if (useFaker) {
    return Array.from({ length: 5 }, () => ({
      id: faker.number.int(),
      name: faker.person.fullName(),
    }));
  }
  try {
    const response = await api.get<{
      message: string;
      personnels: Personnel[] | undefined;
    }>("/personnels/available");
    return response.data.personnels;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchFoodJoints = async (): Promise<FoodJoint[] | undefined> => {
  if (useFaker) {
    return Array.from({ length: 5 }, () => ({
      id: faker.number.int(),
      name: faker.company.name(),
      address: faker.location.streetAddress(),
    }));
  }
  try {
    const response = await api.get<{ message: string; joints: FoodJoint[] }>(
      "/joints"
    );
    return response.data.joints;
  } catch (error) {
    handleApiError(error);
  }
};

export const createOrder = async (orderData: {
  joint_id: number;
  note: string;
  amount: string;
  personnel_id: number;
  staff_id: number;
}): Promise<{ message: string } | undefined> => {
  if (useFaker) {
    return { message: "Order Created successful" };
  }
  try {
    const response = await api.post<{ message: string }>(
      "/orders/create",
      orderData
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchOrders = async (): Promise<Order[] | undefined> => {
  if (useFaker) {
    return Array.from({ length: 10 }, () => ({
      id: faker.number.int(),
      date: faker.date.recent().toISOString(),
      joint_name: faker.company.name(),
      address: faker.location.streetAddress(),
      amount: faker.commerce.price(),
      name: faker.person.fullName(),
      status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]),
    }));
  }
  try {
    const response = await api.get<{ message: string; orders: Order[] }>(
      "/orders"
    );
    return response.data.orders;
  } catch (error) {
    handleApiError(error);
  }
};

export const fetchOrderDetails = async (
  id: number
): Promise<Order | undefined> => {
  if (useFaker) {
    return {
      id,
      joint_name: faker.company.name(),
      note: faker.lorem.sentence(),
      date: faker.date.recent().toISOString(),
      amount: faker.commerce.price(),
      name: faker.person.fullName(),
      phone_number: faker.phone.number(),
      status: faker.helpers.arrayElement(["Pending", "Completed", "Cancelled"]),
      address: faker.location.streetAddress(),
    };
  }
  try {
    const response = await api.get<{ message: string; order: Order }>(
      `/orders/${id}`
    );
    return response.data.order;
  } catch (error) {
    handleApiError(error);
  }
};

export const manageOrder = async (
  order_id: number,
  status: string
): Promise<{ message: string } | undefined> => {
  if (useFaker) {
    return { message: "Order status successfully updated" };
  }
  try {
    const response = await api.post<{ message: string }>("/orders/manage", {
      order_id,
      status,
    });
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
