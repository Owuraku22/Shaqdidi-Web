import axios, { AxiosError } from "axios";
import { faker } from "@faker-js/faker";
import { useStoreData } from "@/store/state";

export const api = axios.create({
  baseURL: "https://didi.shaqexpress.com/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    // Retrieve the token from the Zustand store
    const token = useStoreData.getState().authToken ?? "";
    console.log(token);

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Handle request error
    return Promise.reject(error);
  }
);

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
    name: string;
    email: string;
    phone_number: number;
    account_type: string;
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
// export interface Personnel {
//   personnels: [];
//   id: number;
//   name: string;
// }

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

// Defining a single food joint
export interface FoodJoint {
  id: number;
  name: string;
  address: string;
  image_url: string;
}

// Defining the full response containing the message and an array of joints
export interface FoodJointResponse {
  message: string;
  joints: FoodJoint[];
}
// Defines a single personnel item
export interface Personnel {
  id: number;
  name: string;
  email: string;
  phone_number: number;
  account_type: string;
}

// Defines the full response containing a message and an array of personnel
export interface PersonnelResponse {
  message: string;
  personnels: Personnel[];
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
        name: userData.full_name,
        email: faker.internet.email({ firstName: faker.person.fullName() }),
        account_type: "staff",
        phone_number: faker.number.int(),
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
  fb_token: string;
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
        name: faker.person.fullName(),
        account_type: "staff",
        email: faker.internet.email({ firstName: faker.person.fullName() }),
        phone_number: faker.number.int(),
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
        name: faker.person.fullName(),
        account_type: "staff",
        phone_number: faker.number.int(),
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



export const fetchAvailablePersonnels = async (): Promise<
  PersonnelResponse 
> => {
  try {
    const response = await api.get<PersonnelResponse>("/personnels/available");
    console.log("API response data personnel:", response.data); // Logs the full response
    return response.data; // Returns the entire PersonnelResponse object
  } catch (error) {
   return handleApiError(error);
    ;
  }
};

export const fetchFoodJoints = async (): Promise<
  FoodJointResponse
> => {
  try {
    const response = await api.get<FoodJointResponse>("/joints");
    console.log("API response data:", response.data); // Logs the full response
    return response.data; // This returns the entire FoodJointResponse object
  } catch (error) {
   return handleApiError(error);
    ;
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
