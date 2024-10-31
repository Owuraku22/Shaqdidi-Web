import { redirect } from "react-router-dom";
import { createOrder, signIn, signUp } from "./api";
import { useStoreData } from "@/store/state";

export const handleSignInAction = async (request: Request) => {
  const formData = await request.formData();
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    // const fb_token = useStoreData.getState().fbToken ?? ''
    // calling the singin api and passing the form data to it
    const response = await signIn({ email, password, fb_token: "qwerty" });

    //checking if the response is successful
    if (!response)
      throw new Error("Signing In failed. Please check your credentials.");

    return { data: response };
  } catch (error: Error | any) {
    return {
      data: {
        error: {
          message:
            error.message || "Account Authentication failed. Please retry",
        },
      },
    };
  }
};

export const handleSignUpAction = async (request: Request) => {
  const formData = await request.formData();
  const account_type = formData.get("account_type") as string;
  const full_name = formData.get("full_name") as string;
  const email = formData.get("email") as string;
  const phone_number = formData.get("phone_number") as string;
  const password = formData.get("password") as string;
  // const role = formData.get("role") as string;
  // const fb_token = formData.get("fb_token") as string;

  try {
    // const fb_token = useStoreData.getState().fbToken ?? ''
    // calling the singin api and passing the form data to it
    const response = await signUp({
      account_type,
      email,
      password,
      phone_number,
      full_name,
      fb_token: "qwerty",
    });

    if (!response) throw new Error("Account registration failed. Please retry");

    return { data: response };
  } catch (error: Error | any) {
    return {
      data: {
        error: {
          message: error.message || "Account registration failed. Please retry",
        },
      },
    };
  }
};

export const handleCreateOrder = async (request: Request) => {
  const formData = await request.formData();
  const joint_id = +(formData.get("joint_id") as string, 10);
  const note = formData.get("note") as string;
  const amount = formData.get("amount") as string;
  const personnel_id = +(formData.get("personnel_id") as string);
  const staff_id = +(formData.get("staff_id") as string);

  try {
    const response = await createOrder({
      amount,
      joint_id,
      note,
      personnel_id,
      staff_id,
    });

    if (!response) throw new Error("Order creation failed. Please retry");

    return response;
  } catch (error) {
    console.log("Failed to create order try again", error);
  }
};
